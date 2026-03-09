import csv
import json
import os
import time
import re
from dotenv import load_dotenv

# Try importing OpenAI (make sure to `pip install openai python-dotenv`)
try:
    from openai import OpenAI
except ImportError:
    print("Please install the required packages: pip install openai python-dotenv")
    exit(1)

# Load environment variables (API Keys, Gateway URL)
load_dotenv()

# Setup OpenAI Client to point to your AI Gateway
# If you are using a gateway like OpenRouter, Portkey, or Cloudflare, set BASE_URL in .env
# Example for OpenRouter: AI_GATEWAY_BASE_URL="https://openrouter.ai/api/v1"
client = OpenAI(
    base_url=os.getenv("AI_GATEWAY_BASE_URL", "https://api.openai.com/v1"), # Default or fallback
    api_key=os.getenv("AI_GATEWAY_API_KEY", "your-api-key-here")
)

MODEL_NAME = os.getenv("AI_MODEL_NAME", "deepseek/deepseek-v3.1")

def get_specialty_match_score(cancer_type, product_kb):
    """
    Uses the AI SDK / Gateway to call deepseek-v3.1 and evaluate the specialty match score.
    Returns a float between 0.0 and 1.0.
    """
    prompt = f"""
    You are an expert oncology matching AI.
    Below is the Tempus Product Knowledge Base:
    {product_kb}
    
    The provider specializes in treating: "{cancer_type}".
    
    Based ONLY on the products in the knowledge base, what is the alignment score between this cancer type and Tempus's offerings?
    - 1.0 = Perfect match (e.g., solid tumors, lung, breast, rare tumors with specific broad panel need).
    - 0.5 = Moderate match (some utility, but not primary focus).
    - 0.0 = No match.
    
    Return ONLY a single float number between 0.0 and 1.0. Do not include any other text or explanation.
    """
    
    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": "You are a helpful AI that strictly outputs floats."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.1,
            max_tokens=10
        )
        result_text = response.choices[0].message.content.strip()
        match = re.search(r"0\.\d+|1\.0|0|1", result_text)
        if match:
            return float(match.group())
        return 0.8 # Fallback safe score
    except Exception as e:
        print(f"Error calling AI Gateway for {cancer_type}: {e}")
        return 0.8 

def extract_concerns_from_notes(crm_notes, product_kb=""):
    """
    Uses the AI SDK to extract specific concerns from the CRM notes into a structured JSON list.
    """
    if not crm_notes or len(crm_notes.strip()) == 0:
        return []

    prompt = f"""
    You are an expert sales assistant AI for Tempus.
    Read the following CRM notes for a healthcare provider and extract their specific concerns, objections, requests, friction points, or needs.
    Even if the note is a positive request or interest, extract it as a point to address.
    Then, for each extracted point, draft a response strategy and identify supporting metrics from the provided Tempus Product Knowledge Base.
    
    CRM Notes:
    "{crm_notes}"
    
    Product Knowledge Base:
    "{product_kb}"
    
    Output the result STRICTLY as a valid JSON array of objects. 
    CRITICAL INSTRUCTIONS:
    1. Each object MUST have these EXACT keys: "concern", "summary", "response", "metrics".
    2. "concern": Ultra-concise, brief summary of the concern, need, or request (max 10 words).
    3. "summary": A 2-3 word topic summary (e.g. "TAT Concerns", "Cost Issues", "App Request").
    4. "response": A 1-2 sentence drafted response directly addressing the point using the KB.
    5. "metrics": A JSON array of 1-3 strings containing specific real performance data points from the KB supporting the response.
    6. Do NOT include any introductory or explanatory text.
    
    Example Output:
    [
      {{
        "concern": "Wants mobile dashboard for actionable variants",
        "summary": "Mobile App Request",
        "response": "Tempus offers a robust mobile dashboard for real-time notifications on actionable variants.",
        "metrics": ["Actionable fusions detected in 29-33% more cases", "Real-time push notifications available"]
      }}
    ]
    
    If there are absolutely no relevant points, return an empty array: []
    Do not output any markdown formatting, backticks, or extra text. ONLY output the JSON array.
    """
    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": "You are a helpful AI that strictly outputs valid JSON arrays."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.1,
            max_tokens=1000
        )
        result_text = response.choices[0].message.content.strip()
        
        # Clean up potential markdown formatting that some models stubbornly add
        if result_text.startswith("```json"):
            result_text = result_text[7:]
        if result_text.startswith("```"):
            result_text = result_text[3:]
        if result_text.endswith("```"):
            result_text = result_text[:-3]
            
        concerns = json.loads(result_text.strip())
        if isinstance(concerns, list):
            return concerns
        return []
    except Exception as e:
        print(f"Error extracting concerns: {e}")
        return []

def generate_meeting_script(provider_info, crm_notes, product_kb, custom_prompt=""):
    prompt = f"""
    You are a biotech sales assistant generating a 20–30 second elevator pitch for an oncologist.
    Write a concise, natural-sounding elevator pitch.
    
    Provider Info:
    Name: {provider_info.get('provider_name')}
    Hospital: {provider_info.get('hospital')}
    Specialty: {provider_info.get('specialty')}
    Tumor Focus: {provider_info.get('tumor_focus')}
    Patient Volume: {provider_info.get('patient_volume')}
    
    CRM Notes & Objections:
    "{crm_notes}"
    
    Tempus Product Knowledge Base:
    "{product_kb}"
    """
    
    if custom_prompt:
        prompt += f"\n\nUSER CUSTOM PROMPT (MUST INCORPORATE):\n{custom_prompt}\n"
    
    prompt += """
    Output STRICTLY as a valid JSON object.
    CRITICAL INSTRUCTIONS:
    1. MUST have exactly two keys: "narrative" and "bullet".
    2. "narrative": A concise, natural-sounding elevator pitch that:
       - References the physician’s specialty or practice context.
       - Mentions a clinical challenge relevant to this specialty.
       - Introduces the Tempus solution and its relevant capabilities based on the Product Knowledge Base, including persuasive real data/metrics to back up the claim.
       - Explains the clinical value.
       - Mentions workflow or efficiency benefits if the physician sees a high volume of patients.
       - Tackles the objection if the provider has an objection in the CRM Notes.
       - Ends with a light call-to-action.
       The tone should be professional, concise, and clinically focused. Avoid marketing buzzwords. The pitch should be no more than 4–5 sentences.
    3. "bullet": A highly concise, punchy bulleted list of only the most important key takeaways from the pitch (each point starting with a dash '-'). Keep each bullet point brief and impactful.
    4. Do NOT output any markdown formatting, backticks, or extra text. ONLY output the JSON object.
    
    Example Output:
    {
      "narrative": "Hi Dr. Smith, knowing your high volume in lung cancer, I understand turnaround time is a challenge. Tempus xT delivers comprehensive genomic profiling in 9-14 days. This allows you to start targeted therapies faster. Our portal also integrates directly with your EMR to streamline ordering. Would you be open to trialing xT on a few upcoming cases?",
      "bullet": "- Lung cancer focus & TAT challenge\n- Tempus xT: 9-14 days TAT\n- EMR integration for workflow efficiency\n- Trial xT on upcoming cases"
    }
    """
    
    try:
        response = client.chat.completions.create(
            model=MODEL_NAME,
            messages=[
                {"role": "system", "content": "You are a helpful AI that strictly outputs valid JSON objects."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7 if custom_prompt else 0.2,
            max_tokens=1000
        )
        result_text = response.choices[0].message.content.strip()
        
        if result_text.startswith("```json"):
            result_text = result_text[7:]
        if result_text.startswith("```"):
            result_text = result_text[3:]
        if result_text.endswith("```"):
            result_text = result_text[:-3]
            
        script_data = json.loads(result_text.strip())
        return script_data
    except Exception as e:
        print(f"Error generating script: {e}")
        return {"narrative": "Failed to generate script.", "bullet": "- Failed to generate script."}

def main():
    print("Loading Knowledge Base and CRM Notes...")
    # Read Product KB
    with open("Product Knowledge Base.md", "r") as f:
        product_kb = f.read()

    # Read CRM Notes
    crm_notes_dict = {}
    if os.path.exists("CRM Notes.txt"):
        with open("CRM Notes.txt", "r") as f:
            crm_text = f.read()
            blocks = crm_text.split("\n\n")
            for b in blocks:
                if b.strip():
                    lines = b.strip().split("\n")
                    name_part = lines[0].split("–")[0].split(". ", 1)[-1].strip()
                    note_content = "\n".join(lines[1:])
                    crm_notes_dict[name_part] = note_content

    # Read previously extracted concerns from data.js
    extracted_db = {}
    if os.path.exists("data.js"):
        try:
            with open("data.js", "r") as f:
                content = f.read()
                match = re.search(r'window\.PROVIDERS\s*=\s*(\[.*?\]);', content, re.DOTALL)
                if match:
                    old_providers = json.loads(match.group(1))
                    for p in old_providers:
                        if isinstance(p.get("crm_notes"), list) and len(p.get("crm_notes")) > 0:
                            extracted_db[p["provider_id"]] = p["crm_notes"]
        except Exception as e:
            print("Could not read previous concerns from data.js:", e)

    # Read Providers from CSV
    print("Reading market_intelligence.csv...")
    raw_providers = []
    max_patient_volume = 0
    
    with open("market_intelligence.csv", "r") as f:
        reader = csv.DictReader(f)
        for row in reader:
            vol = int(row["patient_volume"])
            if vol > max_patient_volume:
                max_patient_volume = vol
            raw_providers.append(row)

    print(f"Calculated max_patient_volume = {max_patient_volume}")

    providers_output = []
    
    print(f"Calculating AI Impact Scores using model: {MODEL_NAME}...")
    for i, row in enumerate(raw_providers):
        name = row["doctor"]
        hospital = row["hospital"]
        cancer_type = row["cancer_type"]
        vol = int(row["patient_volume"])
        
        # Parse growth rate (e.g. "7%" -> 0.07)
        growth_str = row["growth_rate"].replace("%", "").strip()
        growth_rate = float(growth_str) / 100.0
        
        print(f"[{i+1}/{len(raw_providers)}] Evaluating {name} ({cancer_type})...")
        # --- AI SCORING CALL ---
        # Note: If you don't have the API key configured yet, this will use the fallback.
        specialty_match = get_specialty_match_score(cancer_type, product_kb)
        print(f"    -> AI Specialty Match: {specialty_match}")
        
        # Calculate Real Impact Score
        # Formula: Impact Score = 10 + 90 × (0.5 × (patient_volume / max_patient_volume) + 0.3 × growth_rate + 0.2 × specialty_match)
        formula_val = (
            0.5 * (vol / max_patient_volume) +
            0.3 * growth_rate +
            0.2 * specialty_match
        )
        impact_score = int(10 + 90 * formula_val)
        
        # Cap score between 0 and 100 just in case
        impact_score = min(100, max(0, impact_score))

        # Re-attach CRM Notes
        c_note = crm_notes_dict.get(name, "")
        if not c_note:
            short_name = name.split("Dr. ")[-1].strip()
            c_note = crm_notes_dict.get(short_name, "")
        if not c_note:
            c_note = crm_notes_dict.get(name.split(" ")[-1], "")
            
        # Prepare for data.js
        provider_id = f"P{i+1:03d}"
        
        # Load extracted concerns from DB if they exist (lazy load)
        ai_extracted_concerns = extracted_db.get(provider_id, [])

        # Some basic specialty mapping for the UI
        specialties = {
            "lung cancer": "Thoracic Oncology",
            "breast cancer": "Breast Oncology",
            "colorectal cancer": "GI Oncology",
            "mixed tumors": "Medical Oncology",
            "AML / lymphoma": "Hematology",
            "ovarian cancer": "Gynecologic Oncology",
            "prostate cancer": "Urologic Oncology",
            "rare tumors": "Precision Oncology"
        }
        specialty = specialties.get(cancer_type, "Medical Oncology")

        # Calculate precise percentages for the new Real Metrics UI
        vol_score = int((vol / max_patient_volume) * 100)
        # Growth is usually single digit like 7%, so let's scale it to make a meaningful bar (e.g., 0-15% maps to 0-100%)
        # But to be accurate to the formula, the formula uses growth_rate directly. 
        # Let's map growth rate 0-15% to 0-100% for the progress bar display.
        growth_display_score = min(100, int((growth_rate / 0.15) * 100))
        match_display_score = int(specialty_match * 100)

        providers_output.append({
            "provider_id": provider_id,
            "provider_name": name,
            "hospital": hospital,
            "specialty": specialty,
            "tumor_focus": cancer_type.title(),
            "patient_volume": str(vol),
            "impact_score": impact_score,
            "crm_notes": ai_extracted_concerns,
            "metrics": {
                "volume": {
                    "label": "Volume Index",
                    "weight": "50%",
                    "value": f"{vol_score}%",
                    "score": vol_score
                },
                "growth": {
                    "label": "Growth Rate",
                    "weight": "30%",
                    "value": f"+{int(growth_rate * 100)}%",
                    "score": growth_display_score
                },
                "specialty": {
                    "label": "Specialty Alignment",
                    "weight": "20%",
                    "value": f"{int(specialty_match * 100)}%",
                    "score": match_display_score
                }
            }
        })
        
        # Small delay to avoid aggressive rate limiting on public gateways
        time.sleep(0.5)

    print("\nWriting results to data.js...")
    js_content = "window.PROVIDERS = " + json.dumps(providers_output, indent=2) + ";\n\n"
    js_content += "window.PRODUCT_KB = " + json.dumps(product_kb) + ";\n"
    
    with open("data.js", "w") as f:
        f.write(js_content)
    
    print("Done! Real AI impact scores have been generated and injected into your app.")

if __name__ == "__main__":
    main()

