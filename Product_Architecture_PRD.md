# Tempus Sales Copilot - Product Requirements & Technical Architecture

## 1. Product Overview
Tempus Sales Copilot is an intelligent, dual-pane application designed to empower Tempus sales representatives. By synthesizing Market Intelligence (CSV), Product Knowledge Base (KB), and CRM Notes, the Copilot dynamically ranks providers and generates personalized meeting scripts and objection-handling strategies. 

---

## 2. Information Architecture & UX

### **Main Screen — Adaptive Split-View Layout**
The main screen utilizes a **two-panel adaptive layout** designed for clean, efficient data consumption inspired by the Tempus design system and Shadcn UI.
* **Left Panel:** Ranked Provider List (scrollable, always accessible).
* **Right Panel:** Contextual Detail Section (Can be expanded or fully closed. When closed, only the provider list is visible).

### **UI/UX & Behavioral Principles**
* **Design Language:** Clean, minimalist, and data-focused. Adheres to Tempus product styling (IBM Plex Sans font, #F9F9FB backgrounds, #F0F0F0 delicate borders, subtle structural shadows).
* **Layout Stability:** The Left provider list remains persistently visible. Switching providers immediately refreshes the Right panel's context without breaking the layout.
* **AI Transparency:** Visually indicate when the AI is processing data. Expose the AI's reasoning process when it matches a CRM objection to a KB metric.
* **Micro-Interactions:** Smooth fade-ins, animated progress bars for score breakdowns, and toast notifications for copy actions.

---

## 3. Core Features & Screen States

### 3.1. Global Controls (Top Bar)
* **Search & Filters:** Filter providers by Name, Hospital, Cancer Type, Patient Volume, and Impact Score Threshold.
* **Behavior:** Filters update the Left Panel in real time. If the currently selected provider is filtered out, the Right Panel resets to an empty state.

### 3.2. Ranked Provider List (Left Panel)
* **Ranking Algorithm:** Providers are dynamically ranked based on a real **Impact Score** calculated through AI synthesis.
* **Card Layout:** Displays Provider Info (Name, Hospital, Specialty, Patient Volume), Score Badge, and Quick Actions (`Script` / `Objections`).

### 3.3. Provider Overview & Meeting Script (Right Panel)
* **Provider Overview:** Always visible at the top when a provider is selected. Displays Score Breakdown (Genomic Eligibility, Product Alignment, CRM Sentiment, Competitive Presence).
* **Meeting Script Module:**
  * **Mode Toggle:** Switch between *Narrative Mode* (full conversational script) and *Bullet Mode* (key talking points).
  * **Inline Editing:** Manual iteration of the generated script.
  * **Copy/Export:** One-click copy to clipboard.

### 3.4. Objection Handler (Right Panel)
* **AI-Driven Objection Mapping:** Analyzes CRM notes to extract specific doctor concerns (e.g., TAT, cost, accuracy) and maps them directly to the Product KB.
* **Response Generation:** AI provides structured responses including Concern Summary, Data-Backed Strategy, and Supporting Metrics.

---

## 4. Technical Architecture & Tech Stack

To ensure seamless AI integration, accurate data processing, and a modern UI, the application leverages a hybrid architecture splitting Data Pre-processing and Frontend Rendering.

### 4.1. Frontend Architecture
* **Framework:** React 18 (Standalone/Babel for rapid prototyping) -> Target Next.js
* **Styling & UI:** Tailwind CSS, custom inline SVG icons.
* **State Management:** React Hooks (`useState`, `useMemo`, `useEffect`) for real-time filtering and layout state.

### 4.2. AI & Data Pipeline (Python AI Scoring Engine)
To calculate dynamic and real `impact_score`s for healthcare providers instead of using mock data, the project uses a Python-based data processing pipeline (`calculate_ai_scores.py`).

* **Language & Environment:** Python 3 (industry standard for data science and AI scripting).
* **Libraries:** 
  * `openai` (Python AI SDK): Used as the universal standard for connecting to AI Gateways.
  * `python-dotenv`: Securely loading AI Gateway API Keys.
  * `csv` & `json`: Parsing raw data and generating `data.js`.
* **AI Gateway & Model:** 
  * **Vercel AI Gateway:** (`https://ai-gateway.vercel.sh/v1`) Serves as the unified routing layer providing observability and caching.
  * **Model:** `deepseek/deepseek-v3.1`. Highly capable of reading the Product Knowledge Base and evaluating semantic alignment.

### 4.3. Data Workflow & Scoring Formula
1. **Read Raw Data:** Extract `patient_volume`, `growth_rate`, and `cancer_type` from `market_intelligence.csv`. Parse `CRM Notes.txt`.
2. **Find Baseline:** Calculate `max_patient_volume` across the dataset.
3. **AI Evaluation (Specialty Match):** 
   * **Prompt Context:** Provide the AI with `Product Knowledge Base.md`.
   * **Task:** AI evaluates a specific `cancer_type` (e.g., "lung cancer") against Tempus products to output a `specialty_match` score between `0.0` (no match) and `1.0` (perfect product alignment).
4. **Compute Impact Score:** 
   * `Impact Score = 0.5 * (patient_volume / max_patient_volume) + 0.3 * growth_rate * 100 + 0.2 * specialty_match)`
5. **Update State:** Overwrite `data.js` with the AI-calculated data, allowing the React frontend to update instantly and render the true ranking.

```mermaid
graph TD
    %% 样式定义
    classDef frontend fill:#E8F0FE,stroke:#3A7BD5,stroke-width:2px,color:#1A1A1A
    classDef backend fill:#E8F5E9,stroke:#34A853,stroke-width:2px,color:#1A1A1A
    classDef ai fill:#F3E5F5,stroke:#9C27B0,stroke-width:2px,color:#1A1A1A
    classDef database fill:#FFF3E0,stroke:#FF9800,stroke-width:2px,color:#1A1A1A
    classDef file fill:#FAFAFA,stroke:#9E9E9E,stroke-width:1px,stroke-dasharray: 5 5

    %% 前端层
    subgraph Frontend [1. Frontend Layer (React / app.jsx)]
        UI[User Interface]
        State[React State]
        UI <-->|User Clicks / Inputs| State
    end

    %% 本地数据库层
    subgraph Database [2. Local Storage Layer]
        DataJS[(data.js)]
        State <-->|Read / Hydrate on Load| DataJS
    end

    %% 后端 API 层
    subgraph Backend [3. Backend Server (server.py)]
        API_Extract[/api/extract_objections]
        API_GenScript[/api/generate_script]
        API_SaveScript[/api/save_script]
        Watchdog((File Watcher))
    end

    %% 数据源层
    subgraph RawData [4. Raw Data Sources]
        CSV(market_intelligence.csv):::file
        CRM(CRM Notes.txt):::file
        KB(Product Knowledge Base.md):::file
    end

    %% AI 计算层
    subgraph AICore [5. AI Processing Engine (calculate_ai_scores.py)]
        CalcRank[Ranking & Specialty Match]
        ExtractObj[Extract Objections & Draft Response]
        GenPitch[Generate Elevator Pitch]
    end

    %% AI 网关层
    subgraph CloudAI [6. Cloud AI Services]
        Gateway{Vercel AI Gateway}
        DeepSeek((DeepSeek v3.1 Model))
        Gateway <--> DeepSeek
    end

    %% ===== 连接线 & 数据流向 =====

    %% 前端触发 API
    UI -->|Click Objections Tab| API_Extract
    UI -->|Click Script Tab / Send Chat| API_GenScript
    UI -->|Click Save/Edit Script| API_SaveScript

    %% API 触发 AI 引擎
    API_Extract -->|Pass Provider Info| ExtractObj
    API_GenScript -->|Pass Provider & Context| GenPitch
    
    %% API 直接写库 (Save)
    API_SaveScript -->|Overwrite| DataJS

    %% AI 引擎读取本地文件
    CalcRank -->|Read| CSV
    CalcRank -->|Read| KB
    ExtractObj -->|Read| CRM
    ExtractObj -->|Read| KB
    GenPitch -->|Read| CRM
    GenPitch -->|Read| KB

    %% AI 引擎连接云端
    CalcRank <-->|Prompt & Return Score| Gateway
    ExtractObj <-->|Prompt & Return JSON| Gateway
    GenPitch <-->|Prompt & Return JSON| Gateway

    %% AI 引擎写回数据库
    CalcRank -->|Write Full Ranked List| DataJS
    ExtractObj -->|Write 'crm_notes' array| DataJS
    GenPitch -->|Write 'generated_script' object| DataJS

    %% 文件监控流
    Watchdog -.->|Monitors| CSV
    Watchdog -->|Triggers on Save| CalcRank

    %% 应用样式
    class UI,State frontend
    class API_Extract,API_GenScript,API_SaveScript,Watchdog backend
    class CalcRank,ExtractObj,GenPitch ai
    class DataJS database
    class Gateway,DeepSeek ai
```
