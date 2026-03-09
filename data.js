window.PROVIDERS = [
  {
    "provider_id": "P001",
    "provider_name": "Dr. Michael Smith",
    "hospital": "Northwest Cancer Center",
    "specialty": "Thoracic Oncology",
    "tumor_focus": "Lung Cancer",
    "patient_volume": "480",
    "impact_score": 62,
    "crm_notes": [
      {
        "concern": "Concerned about turnaround times delaying therapy initiation",
        "summary": "TAT Concerns",
        "response": "For urgent lung cancer cases, our liquid biopsy xF test delivers results in 7-10 days, while our comprehensive xT tissue testing maintains a 9-14 day TAT with superior accuracy.",
        "metrics": [
          "Liquid biopsy in 7 days",
          "Tissue results in 9-14 days"
        ]
      },
      {
        "concern": "Hesitant to increase volume without sub-10-day guarantee",
        "summary": "Volume Commitment",
        "response": "For patients requiring fastest possible results, our xF liquid biopsy consistently delivers within 7-10 days, while our expedited xH heme testing achieves ~9 day TAT for acute clinical needs.",
        "metrics": [
          "xF TAT: 7-10 days",
          "xH TAT: ~9 days expedited"
        ]
      }
    ],
    "metrics": {
      "volume": {
        "label": "Volume Index",
        "weight": "50%",
        "value": "80%",
        "score": 80
      },
      "growth": {
        "label": "Growth Rate",
        "weight": "30%",
        "value": "+7%",
        "score": 46
      },
      "specialty": {
        "label": "Specialty Alignment",
        "weight": "20%",
        "value": "80%",
        "score": 80
      }
    }
  },
  {
    "provider_id": "P002",
    "provider_name": "Dr. Emily Lee",
    "hospital": "Lakeside Medical Group",
    "specialty": "Breast Oncology",
    "tumor_focus": "Breast Cancer",
    "patient_volume": "360",
    "impact_score": 52,
    "crm_notes": [],
    "metrics": {
      "volume": {
        "label": "Volume Index",
        "weight": "50%",
        "value": "60%",
        "score": 60
      },
      "growth": {
        "label": "Growth Rate",
        "weight": "30%",
        "value": "+5%",
        "score": 33
      },
      "specialty": {
        "label": "Specialty Alignment",
        "weight": "20%",
        "value": "80%",
        "score": 80
      }
    }
  },
  {
    "provider_id": "P003",
    "provider_name": "Dr. David Chen",
    "hospital": "Metro Oncology Institute",
    "specialty": "Thoracic Oncology",
    "tumor_focus": "Lung Cancer",
    "patient_volume": "600",
    "impact_score": 71,
    "crm_notes": [
      {
        "concern": "EMR integration bottleneck with manual pathology report entry",
        "summary": "EMR Integration",
        "response": "Tempus has validated EMR integration workflows with Epic that automate results delivery, eliminating manual entry bottlenecks for clinical teams.",
        "metrics": [
          "Automated results delivery to EMR systems",
          "Validated integration with Epic EHR platform"
        ]
      }
    ],
    "metrics": {
      "volume": {
        "label": "Volume Index",
        "weight": "50%",
        "value": "100%",
        "score": 100
      },
      "growth": {
        "label": "Growth Rate",
        "weight": "30%",
        "value": "+8%",
        "score": 53
      },
      "specialty": {
        "label": "Specialty Alignment",
        "weight": "20%",
        "value": "80%",
        "score": 80
      }
    }
  },
  {
    "provider_id": "P004",
    "provider_name": "Dr. Daniel Garcia",
    "hospital": "Midwest Oncology Associates",
    "specialty": "Thoracic Oncology",
    "tumor_focus": "Lung Cancer",
    "patient_volume": "312",
    "impact_score": 49,
    "crm_notes": [],
    "metrics": {
      "volume": {
        "label": "Volume Index",
        "weight": "50%",
        "value": "52%",
        "score": 52
      },
      "growth": {
        "label": "Growth Rate",
        "weight": "30%",
        "value": "+6%",
        "score": 40
      },
      "specialty": {
        "label": "Specialty Alignment",
        "weight": "20%",
        "value": "80%",
        "score": 80
      }
    }
  },
  {
    "provider_id": "P005",
    "provider_name": "Dr. Olivia Brown",
    "hospital": "Pacific Cancer Institute",
    "specialty": "Breast Oncology",
    "tumor_focus": "Breast Cancer",
    "patient_volume": "408",
    "impact_score": 56,
    "crm_notes": [],
    "metrics": {
      "volume": {
        "label": "Volume Index",
        "weight": "50%",
        "value": "68%",
        "score": 68
      },
      "growth": {
        "label": "Growth Rate",
        "weight": "30%",
        "value": "+7%",
        "score": 46
      },
      "specialty": {
        "label": "Specialty Alignment",
        "weight": "20%",
        "value": "80%",
        "score": 80
      }
    }
  },
  {
    "provider_id": "P006",
    "provider_name": "Dr. Priya Patel",
    "hospital": "Sunrise Health System",
    "specialty": "GI Oncology",
    "tumor_focus": "Colorectal Cancer",
    "patient_volume": "336",
    "impact_score": 51,
    "crm_notes": [],
    "metrics": {
      "volume": {
        "label": "Volume Index",
        "weight": "50%",
        "value": "56%",
        "score": 56
      },
      "growth": {
        "label": "Growth Rate",
        "weight": "30%",
        "value": "+6%",
        "score": 40
      },
      "specialty": {
        "label": "Specialty Alignment",
        "weight": "20%",
        "value": "80%",
        "score": 80
      }
    }
  },
  {
    "provider_id": "P007",
    "provider_name": "Dr. Robert Johnson",
    "hospital": "Valley Community Hospital",
    "specialty": "Medical Oncology",
    "tumor_focus": "Mixed Tumors",
    "patient_volume": "180",
    "impact_score": 38,
    "crm_notes": [],
    "metrics": {
      "volume": {
        "label": "Volume Index",
        "weight": "50%",
        "value": "30%",
        "score": 30
      },
      "growth": {
        "label": "Growth Rate",
        "weight": "30%",
        "value": "+3%",
        "score": 20
      },
      "specialty": {
        "label": "Specialty Alignment",
        "weight": "20%",
        "value": "80%",
        "score": 80
      }
    }
  },
  {
    "provider_id": "P008",
    "provider_name": "Dr. Sarah Kim",
    "hospital": "East Coast Academic Medical Center",
    "specialty": "Medical Oncology",
    "tumor_focus": "Mixed Tumors",
    "patient_volume": "420",
    "impact_score": 57,
    "crm_notes": [],
    "metrics": {
      "volume": {
        "label": "Volume Index",
        "weight": "50%",
        "value": "70%",
        "score": 70
      },
      "growth": {
        "label": "Growth Rate",
        "weight": "30%",
        "value": "+6%",
        "score": 40
      },
      "specialty": {
        "label": "Specialty Alignment",
        "weight": "20%",
        "value": "80%",
        "score": 80
      }
    }
  },
  {
    "provider_id": "P009",
    "provider_name": "Dr. Ethan Thompson",
    "hospital": "Riverside Medical Center",
    "specialty": "GI Oncology",
    "tumor_focus": "Colorectal Cancer",
    "patient_volume": "276",
    "impact_score": 46,
    "crm_notes": [],
    "metrics": {
      "volume": {
        "label": "Volume Index",
        "weight": "50%",
        "value": "46%",
        "score": 46
      },
      "growth": {
        "label": "Growth Rate",
        "weight": "30%",
        "value": "+5%",
        "score": 33
      },
      "specialty": {
        "label": "Specialty Alignment",
        "weight": "20%",
        "value": "80%",
        "score": 80
      }
    }
  },
  {
    "provider_id": "P010",
    "provider_name": "Dr. Luis Martinez",
    "hospital": "Central Hematology Center",
    "specialty": "Hematology",
    "tumor_focus": "Aml / Lymphoma",
    "patient_volume": "264",
    "impact_score": 45,
    "crm_notes": [],
    "metrics": {
      "volume": {
        "label": "Volume Index",
        "weight": "50%",
        "value": "44%",
        "score": 44
      },
      "growth": {
        "label": "Growth Rate",
        "weight": "30%",
        "value": "+5%",
        "score": 33
      },
      "specialty": {
        "label": "Specialty Alignment",
        "weight": "20%",
        "value": "80%",
        "score": 80
      }
    }
  },
  {
    "provider_id": "P011",
    "provider_name": "Dr. Hannah Nguyen",
    "hospital": "Women\u2019s Oncology Institute",
    "specialty": "Gynecologic Oncology",
    "tumor_focus": "Ovarian Cancer",
    "patient_volume": "384",
    "impact_score": 55,
    "crm_notes": [],
    "metrics": {
      "volume": {
        "label": "Volume Index",
        "weight": "50%",
        "value": "64%",
        "score": 64
      },
      "growth": {
        "label": "Growth Rate",
        "weight": "30%",
        "value": "+7%",
        "score": 46
      },
      "specialty": {
        "label": "Specialty Alignment",
        "weight": "20%",
        "value": "80%",
        "score": 80
      }
    }
  },
  {
    "provider_id": "P012",
    "provider_name": "Dr. Sophia Rodriguez",
    "hospital": "Southside Oncology Clinic",
    "specialty": "Medical Oncology",
    "tumor_focus": "Mixed Tumors",
    "patient_volume": "228",
    "impact_score": 42,
    "crm_notes": [],
    "metrics": {
      "volume": {
        "label": "Volume Index",
        "weight": "50%",
        "value": "38%",
        "score": 38
      },
      "growth": {
        "label": "Growth Rate",
        "weight": "30%",
        "value": "+4%",
        "score": 26
      },
      "specialty": {
        "label": "Specialty Alignment",
        "weight": "20%",
        "value": "80%",
        "score": 80
      }
    }
  },
  {
    "provider_id": "P013",
    "provider_name": "Dr. Benjamin Clark",
    "hospital": "Great Lakes Cancer Center",
    "specialty": "Urologic Oncology",
    "tumor_focus": "Prostate Cancer",
    "patient_volume": "360",
    "impact_score": 53,
    "crm_notes": [],
    "metrics": {
      "volume": {
        "label": "Volume Index",
        "weight": "50%",
        "value": "60%",
        "score": 60
      },
      "growth": {
        "label": "Growth Rate",
        "weight": "30%",
        "value": "+6%",
        "score": 40
      },
      "specialty": {
        "label": "Specialty Alignment",
        "weight": "20%",
        "value": "80%",
        "score": 80
      }
    }
  },
  {
    "provider_id": "P014",
    "provider_name": "Dr. James Wilson",
    "hospital": "Urology Cancer Specialists",
    "specialty": "Urologic Oncology",
    "tumor_focus": "Prostate Cancer",
    "patient_volume": "300",
    "impact_score": 47,
    "crm_notes": [],
    "metrics": {
      "volume": {
        "label": "Volume Index",
        "weight": "50%",
        "value": "50%",
        "score": 50
      },
      "growth": {
        "label": "Growth Rate",
        "weight": "30%",
        "value": "+4%",
        "score": 26
      },
      "specialty": {
        "label": "Specialty Alignment",
        "weight": "20%",
        "value": "80%",
        "score": 80
      }
    }
  }
];

window.PRODUCT_KB = "# Tempus Product Knowledge Base\n## Overview\nTempus leverages one of the world\u2019s largest libraries of clinical and molecular data to provide physicians with actionable insights. This knowledge base serves as the \"Source of Truth\" for the Sales Copilot to bridge the data-to-insight gap.\n\n---\n\n## 1. Tempus xT (Broad Panel Solid Tumor)\n* **Description:** A comprehensive targeted assay designed to detect actionable genomic alterations in solid tumors.\n* **Gene Coverage:** 648 DNA genes.\n* **Methodology:** DNA sequencing + Whole Transcriptome Sequencing (RNA).\n* **Supported Cancers:** All malignant solid tumors (e.g., Lung, Breast, Colorectal, Pancreatic).\n* **Turnaround Time (TAT):** 9\u201314 days.\n* **Accuracy Metric:** 28% reduction in false-positive calls through Tumor + Normal matching.\n* **Clinical Utility:** Identifies SNVs, indels, CNVs, and rearrangements. Includes MSI and TMB status.\n\n## 2. Tempus xR (Whole Transcriptome)\n* **Description:** Unbiased RNA sequencing that complements DNA testing to provide a complete molecular picture.\n* **Gene Coverage:** 20,000+ genes (Whole Transcriptome).\n* **Methodology:** Whole Transcriptome Sequencing (RNA).\n* **Supported Cancers:** Integrated with all solid tumor and hematologic malignancy testing.\n* **Turnaround Time (TAT):** Delivered concurrently with xT (9\u201314 days).\n* **Accuracy Metric:** Identifies **29% to 33% more actionable fusions** often missed by DNA-only panels.\n* **Clinical Utility:** Superior detection of gene fusions (NTRK, ALK, ROS1) and splice variants (MET exon 14).\n\n## 3. Tempus xF / xF+ (Liquid Biopsy)\n* **Description:** Non-invasive blood-based test for patients when tissue is unavailable or for monitoring resistance.\n* **Gene Coverage:** 105 genes (ctDNA).\n* **Methodology:** Circulating tumor DNA (ctDNA) sequencing.\n* **Supported Cancers:** Advanced solid tumors; frequently used in Lung, Breast, and Ovarian cancers.\n* **Turnaround Time (TAT):** 7\u201310 days (xF+ may take up to 9\u201310 days).\n* **Accuracy Metric:** >99.9% specificity at \u22650.25% Variant Allele Frequency (VAF).\n* **Clinical Utility:** Ideal for \"tissue-first\" failures or rapid progression scenarios.\n\n## 4. Tempus xH (Heme - Myeloid & Lymphoid)\n* **Description:** Targeted panel specifically for hematologic malignancies.\n* **Gene Coverage:** 600+ DNA genes + Whole Transcriptome (RNA).\n* **Methodology:** DNA + RNA Sequencing.\n* **Supported Cancers:** Leukemia (AML), Lymphoma, Multiple Myeloma, and MDS.\n* **Turnaround Time (TAT):** ~9 days (Expedited for acute clinical needs).\n* **Accuracy Metric:** Combines DNA/RNA to capture prognostic markers missed by single-modality tests.\n\n## 5. Tempus xG / xG+ (Hereditary Cancer)\n* **Description:** Germline test to identify inherited genetic mutations that increase cancer risk.\n* **Gene Coverage:** 88 genes associated with hereditary cancer syndromes.\n* **Methodology:** Germline DNA sequencing (Blood or Saliva).\n* **Supported Cancers:** Risk assessment for Breast, Ovarian, Colorectal, and Pancreatic cancers.\n* **Turnaround Time (TAT):** 14\u201321 days (Expedited 7\u201310 day TAT available for standalone BRCAplus).\n* **Clinical Utility:** Informs surgical decisions and risk assessment for family members.\n\n## 6. Tempus xO (Whole Exome)\n* **Description:** Ultra-comprehensive research-grade panel for deep genomic exploration.\n* **Gene Coverage:** ~19,000+ genes (Protein-coding regions).\n* **Methodology:** Whole Exome Sequencing (WES).\n* **Supported Cancers:** Complex or rare cases where standard panels are inconclusive.\n* **Turnaround Time (TAT):** 8\u201310 days for sequencing completion.\n* **Clinical Utility:** Primary use in clinical trial matching and deep research.\n\n## 7. Tempus xM (Minimal Residual Disease - MRD)\n* **Description:** Personalized, tumor-informed liquid biopsy assay to detect molecular residual disease.\n* **Methodology:** Custom-designed based on the patient's unique tumor signature from initial xT test.\n* **Supported Cancers:** Serial monitoring for recurrence in previously diagnosed patients.\n* **Turnaround Time (TAT):** Varies based on serial draw schedule.\n* **Clinical Utility:** Monitors for recurrence earlier than standard imaging.\n\n## 8. AI-Enabled Tests (HRD & TO)\n* **HRD (Homologous Recombination Deficiency):** Digital pathology/genomic hybrid; predicts response to PARP inhibitors.\n* **TO (Tumor-Only) Algorithmic Normalization:** Machine learning that differentiates germline from somatic mutations when a normal sample is unavailable.\n* **Accuracy Metric:** 99.9% specificity in variant calling for Tumor-Only scenarios.\n\n---\n\n## Performance Quick-Reference for Objection Handling\n\n| Challenge | Tempus Data Point |\n| :--- | :--- |\n| **Turnaround Time (TAT)** | Liquid biopsy in **7 days**; Tissue results in **9\u201314 days**. |\n| **Accuracy / Noise** | **Tumor + Normal Match** reduces false positives by 28%. |\n| **Missing Fusions** | **Whole Transcriptome RNA** finds ~30% more actionable fusions than DNA-only. |\n| **Trial Access** | Every report matches patients to the **TIME Trial Network** (96% match rate). |\n\n\n";
