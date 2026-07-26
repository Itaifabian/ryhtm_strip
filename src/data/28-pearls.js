const EXAM_PEARLS = [
  {
    "id": "pearl-001",
    "chapter": "Nephrology",
    "text": "Dysmorphic RBCs on a urine sample indicate a nephritic syndrome — etiologies include ANCA-associated GN, IgA nephropathy, PSGN, MPGN, and RPGN.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-002",
    "chapter": "Hematology",
    "text": "For DVT, D-dimer is used to rule out low-risk cases; in high-risk cases proceed directly to a US Doppler.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-003",
    "chapter": "Hematology",
    "text": "Thrombocytosis presenting after an acute ischemic or inflammatory event is LIKELY reactive and should be monitored rather than treated.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-004",
    "chapter": "Allergy & Immunology",
    "text": "Chronic spontaneous urticaria should be treated with anti-IgE (omalizumab), since it is driven by activated mast cells.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-005",
    "chapter": "Endocrinology",
    "text": "An incidental thyroid nodule should prompt a TSH test to identify a toxic adenoma (low TSH) → thyroid mapping (scintigraphy).",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-006",
    "chapter": "Rheumatology",
    "text": "In dermatomyositis, obtain a chest X-ray to screen for ILD.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-007",
    "chapter": "Nephrology",
    "text": "CKD is diagnosed by GFR < 60, OR a nephropathic finding (albuminuria, urinary casts, or an imaging/biopsy abnormality), present for 3 months.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-008",
    "chapter": "Allergy & Immunology",
    "text": "Immunodeficiency presentation by defect: B cells — recurrent airway infections (otitis, sinusitis, pneumonia), which can overlap with autoimmune disease (e.g. ITP); neutrophils — mucosal/dermal and opportunistic infections; T cells — viral, fungal, and opportunistic infections; complement — recurrent Neisseria infections.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-009",
    "chapter": "Allergy & Immunology",
    "text": "Skin (prick) tests are used only for assessing type I hypersensitivity.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-010",
    "chapter": "Gastroenterology",
    "text": "In IBD, azathioprine is NOT an induction agent — it is used only for maintenance.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-011",
    "chapter": "Hematology",
    "text": "In an asymptomatic patient with suspected CLL, a bone marrow biopsy is not needed — diagnosis is based on flow cytometry (FACS).",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-012",
    "chapter": "Pulmonology",
    "text": "High-risk PE is defined by hemodynamic instability ONLY, and is treated with thrombolysis; intermediate-risk PE (RV strain, tachycardia, troponin elevation) is treated with anticoagulation (enoxaparin).",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-013",
    "chapter": "Cardiology",
    "text": "HFpEF is likely to be associated with pulmonary hypertension, since pressure overload raises pulmonary pressure.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-014",
    "chapter": "Cardiology",
    "text": "A reduced EF in a patient with paroxysmal AF suggests tachycardia-mediated cardiomyopathy and calls for rate control — pulmonary vein isolation (PVI).",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-015",
    "chapter": "Cardiology",
    "text": "P2Y12 inhibitors are indicated POST-PCI, not administered pre-PCI; pre-PCI, use aspirin combined with an anticoagulant (LMWH or fondaparinux, a factor Xa inhibitor).",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-016",
    "chapter": "Infectious Diseases",
    "text": "Mild CAP with no comorbidities is treated with monotherapy — a macrolide or amoxicillin.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-017",
    "chapter": "Cardiology",
    "text": "SCAD is a spontaneous coronary artery dissection, and is mostly self-limiting.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-018",
    "chapter": "Infectious Diseases",
    "text": "Leptospirosis is treated with penicillin G or ceftriaxone.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-019",
    "chapter": "Pulmonology",
    "text": "Comorbidities that destabilize asthma control: reflux, obesity, anxiety, OSA.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-020",
    "chapter": "Pulmonology",
    "text": "IPF with a UIP pattern on CT does not require biopsy; extrapulmonary symptoms (e.g. arthralgia) are highly uncommon and should prompt reconsideration.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-021",
    "chapter": "Endocrinology",
    "text": "Differential diagnosis for hyperprolactinemia: hypothyroidism, CKD, prolactinoma, liver cirrhosis, and hypothalamic-hypophyseal axis disruption.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-022",
    "chapter": "Endocrinology",
    "text": "Diagnosing an adrenal incidentaloma requires hormonal testing (e.g. a dexamethasone suppression test).",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-023",
    "chapter": "Endocrinology",
    "text": "MEN2 is correlated with pheochromocytoma and requires a urinary metanephrine test.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-024",
    "chapter": "Endocrinology",
    "text": "PTH-dependent hypercalcemia shows a normal PTH level — i.e. one that is not appropriately suppressed by the elevated calcium.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-025",
    "chapter": "Gastroenterology",
    "text": "D-lactic acidosis will not be detected on standard lab results, which measure L-lactate only.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-026",
    "chapter": "Gastroenterology",
    "text": "Gastric bypass surgery carries a high risk of small-intestinal bacterial infection; a D-xylose test is indicative and warrants antibiotics.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-027",
    "chapter": "Gastroenterology",
    "text": "Hepatic encephalopathy is caused by elevated ammonium and is treated with lactulose, which promotes its GI clearance.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-028",
    "chapter": "Gastroenterology",
    "text": "HBV antigens: HBsAg indicates active viremia, while HBcAb indicates past exposure and is an indication for prophylactic antiviral treatment before immunosuppression.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-029",
    "chapter": "Rheumatology",
    "text": "Behçet's disease is a vasculitis causing urogenital ulcers, erythema nodosum, and uveitis.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-030",
    "chapter": "Rheumatology",
    "text": "Secondary Raynaud's (e.g. from scleroderma) is associated with chronic ischemia and fingertip ulcers — differentiate from primary Raynaud's, which is triggered by cold exposure.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-031",
    "chapter": "Rheumatology",
    "text": "Low-risk antiphospholipid antibody carriers (lupus anticoagulant negative) are treated with aspirin; high-risk carriers (prior VTE) are treated with heparin.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-032",
    "chapter": "Rheumatology",
    "text": "FMF is treated with an anti-IL1 agent (targeting the inflammasome).",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-033",
    "chapter": "Rheumatology",
    "text": "Sjögren's syndrome is associated with type I (distal) RTA.",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-034",
    "chapter": "Allergy & Immunology",
    "text": "Hypereosinophilic syndrome without a FIP1L1-PDGFRA mutation is treated with mepolizumab (anti-IL5).",
    "session": "גשר קל 23א"
  },
  {
    "id": "pearl-035",
    "chapter": "Endocrinology",
    "text": "Osteoporosis treatment is indicated when the major fracture risk is > 20% or the hip fracture risk is > 3%.",
    "session": "גשר קל 23ב"
  },
  {
    "id": "pearl-036",
    "chapter": "Endocrinology",
    "text": "Denosumab is an anti-osteoclast agent; teriparatide is an osteoblast agonist.",
    "session": "גשר קל 23ב"
  },
  {
    "id": "pearl-037",
    "chapter": "Endocrinology",
    "text": "Diabetic nephropathy is a microvascular complication.",
    "session": "גשר קל 23ב"
  },
  {
    "id": "pearl-038",
    "chapter": "Endocrinology",
    "text": "Osteoporosis workup includes a 24-hour urine calcium collection.",
    "session": "גשר קל 23ב"
  },
  {
    "id": "pearl-039",
    "chapter": "Gastroenterology",
    "text": "Liver cirrhosis treatment: beta-blockers to reduce portal hypertension; spironolactone (Aldactone) plus a low-salt diet for ascites; lactulose for ammonium-induced encephalopathy.",
    "session": "גשר קל 23ב"
  },
  {
    "id": "pearl-040",
    "chapter": "Rheumatology",
    "text": "Pseudogout (CPPD) can present in the knee with a high joint WBC count; chondrocalcinosis on X-ray is a clear sign.",
    "session": "גשר קל 23ב"
  },
  {
    "id": "pearl-041",
    "chapter": "Endocrinology",
    "text": "Hypoglycemia can be used as a trigger/stimulation test for adrenal insufficiency.",
    "session": "גשר קל 23ב"
  },
  {
    "id": "pearl-042",
    "chapter": "Rheumatology",
    "text": "High cumulative steroid use is a major risk factor for scleroderma renal crisis, along with anti-RNA polymerase III positivity.",
    "session": "גשר קל 23ב"
  },
  {
    "id": "pearl-043",
    "chapter": "Rheumatology",
    "text": "First-line treatment for psoriasis is methotrexate.",
    "session": "גשר קל 23ב"
  },
  {
    "id": "pearl-044",
    "chapter": "Rheumatology",
    "text": "The FMF rash is erythematous and roseola-like.",
    "session": "גשר קל 23ב"
  },
  {
    "id": "pearl-045",
    "chapter": "Allergy & Immunology",
    "text": "CGD is characterized by neutrophil NADPH oxidase deficiency, causing granuloma formation.",
    "session": "גשר קל 23ב"
  },
  {
    "id": "pearl-046",
    "chapter": "Pulmonology",
    "text": "For unstable asthma, start or increase maintenance LABA + ICS; if there is no improvement, add a LAMA.",
    "session": "גשר קל 23ב"
  },
  {
    "id": "pearl-047",
    "chapter": "Cardiology",
    "text": "Norepinephrine is a strong alpha agonist and a weaker beta agonist, making it a good choice for cardiogenic shock.",
    "session": "גשר קל 23ב"
  },
  {
    "id": "pearl-048",
    "chapter": "Neurology",
    "text": "In subacute CVA, vasodilation is not recommended, as it may harm the remaining penumbra.",
    "session": "גשר קל 23ב"
  },
  {
    "id": "pearl-049",
    "chapter": "Nephrology",
    "text": "Low-complement nephritic syndromes: lupus nephritis, cryoglobulinemia, post-infectious GN, MPGN.",
    "session": "גשר קל 23ב"
  },
  {
    "id": "pearl-050",
    "chapter": "Infectious Diseases",
    "text": "Brucellosis complications present with osteoarticular involvement.",
    "session": "גשר קל 23ב"
  },
  {
    "id": "pearl-051",
    "chapter": "Hematology",
    "text": "Low thrombophilia risk (no personal or family VTE history) should receive coumadin only at childbirth.",
    "session": "גשר קל 23ב"
  },
  {
    "id": "pearl-052",
    "chapter": "Rheumatology",
    "text": "Dermatomyositis with anti-TIF1-gamma is correlated with underlying malignancy.",
    "session": "גשר קל 23ב"
  },
  {
    "id": "pearl-053",
    "chapter": "Endocrinology",
    "text": "In DKA, once glucose drops below 250, add glucose to the treatment to prevent hypoglycemia.",
    "session": "גשר קל 23ב"
  },
  {
    "id": "pearl-054",
    "chapter": "Rheumatology",
    "text": "Axial spondyloarthritis is treated with NSAIDs first-line, and anti-TNF or anti-IL17 second-line.",
    "session": "גשר קל 23ב"
  },
  {
    "id": "pearl-055",
    "chapter": "Hematology",
    "text": "HUS and TTP are associated with a proliferative (regenerative) anemia — i.e. an elevated reticulocyte count.",
    "session": "גשר קל 24א"
  },
  {
    "id": "pearl-056",
    "chapter": "Hematology",
    "text": "Factor XI deficiency usually presents with mild thrombophilia-independent hemorrhagic risk that is relatively low.",
    "session": "גשר קל 24א"
  },
  {
    "id": "pearl-057",
    "chapter": "Gastroenterology",
    "text": "Zollinger-Ellison syndrome is a gastrin-secreting NET causing peptic ulcers; it is diagnosed with a urinary/serum gastrin collection.",
    "session": "גשר קל 24א"
  },
  {
    "id": "pearl-058",
    "chapter": "Endocrinology",
    "text": "To differentiate HHS from DKA, use an ABG — a high anion gap metabolic acidosis (HAGMA) points to DKA.",
    "session": "גשר קל 24א"
  },
  {
    "id": "pearl-059",
    "chapter": "Rheumatology",
    "text": "Pleural effusion is the most common RA-associated lung complication.",
    "session": "גשר קל 24א"
  },
  {
    "id": "pearl-060",
    "chapter": "Nephrology",
    "text": "CKD patients are generally kept on RAAS-inhibitor monotherapy — combining agents can cause hyperkalemia and AKI.",
    "session": "גשר קל 24א",
    "flag": "Source text has an illegible/garbled word here (transcribed in some copies as “ernesto”) describing what happens when RAAS blockade is combined/escalated beyond monotherapy; the surrounding clinical point (monotherapy preferred, risk of hyperkalemia/AKI) is clear, but the exact qualifier is unclear in the source and was not guessed."
  },
  {
    "id": "pearl-061",
    "chapter": "Gastroenterology",
    "text": "Intestinal lymphoma can cause flattening (of the small-bowel mucosal folds) on imaging.",
    "session": "גשר קל 24א",
    "flag": "Source says only “can cause flattening” without specifying of what — most likely small-bowel fold/villous flattening on imaging, but this is not stated explicitly in the source."
  },
  {
    "id": "pearl-062",
    "chapter": "Infectious Diseases",
    "text": "AIDS is diagnosed by a CD4 count < 200 OR an AIDS-defining illness (e.g. TB, PJP, recurrent bacterial pneumonias).",
    "session": "גשר קל 24א"
  },
  {
    "id": "pearl-063",
    "chapter": "Gastroenterology",
    "text": "Pantoprazole is a PPI (same class as omeprazole).",
    "session": "גשר קל 24א"
  },
  {
    "id": "pearl-064",
    "chapter": "Hematology",
    "text": "TIBC reflects the blood's overall iron-carrying capacity and is elevated in iron deficiency.",
    "session": "גשר קל 24א",
    "flag": "Source adds “(elevated transferrin saturation)” as a parenthetical, which appears inconsistent with iron deficiency — transferrin saturation is typically LOW (not elevated) in iron deficiency, since serum iron falls while TIBC rises. Transcribed as written; flagged for reviewer verification against the source."
  },
  {
    "id": "pearl-065",
    "chapter": "Infectious Diseases",
    "text": "FUO is defined as fever > 38.3°C for > 3 months, with no diagnosis reached after 1 week of inpatient workup or 3 outpatient visits.",
    "session": "גשר קל 24א",
    "flag": "The classic (Petersdorf) FUO definition specifies fever of unknown origin for > 3 WEEKS, not 3 months — the source's “3 months” duration may be a transcription error. Transcribed as written; flagged for reviewer verification."
  },
  {
    "id": "pearl-066",
    "chapter": "Infectious Diseases",
    "text": "A positive Staph aureus blood culture is NEVER considered a contaminant.",
    "session": "גשר קל 24א"
  },
  {
    "id": "pearl-067",
    "chapter": "Infectious Diseases",
    "text": "Spotted fever (rickettsial disease) is treated with oral doxycycline.",
    "session": "גשר קל 24א"
  },
  {
    "id": "pearl-068",
    "chapter": "Infectious Diseases",
    "text": "Ceftazidime-avibactam is effective against KPC-producing carbapenem-resistant K. pneumoniae.",
    "session": "גשר קל 24א"
  },
  {
    "id": "pearl-069",
    "chapter": "Rheumatology",
    "text": "GPA can present with severe eye involvement and is associated with anti-proteinase 3 (PR3-ANCA) positive serology.",
    "session": "גשר קל 24א"
  },
  {
    "id": "pearl-070",
    "chapter": "Hematology",
    "text": "A family history of polycythemia hints at an EPOR mutation rather than polycythemia vera.",
    "session": "גשר קל 24א"
  },
  {
    "id": "pearl-071",
    "chapter": "Rheumatology",
    "text": "SLE is treated with hydroxychloroquine.",
    "session": "גשר קל 24א"
  },
  {
    "id": "pearl-072",
    "chapter": "Rheumatology",
    "text": "Limited systemic sclerosis is associated with chronic GERD.",
    "session": "גשר קל 24א"
  },
  {
    "id": "pearl-073",
    "chapter": "Nephrology",
    "text": "Post-obstructive diuresis carries a high risk of hypokalemia, while sodium levels tend to stay more stable.",
    "session": "גשר קל 24א"
  },
  {
    "id": "pearl-074",
    "chapter": "Cardiology",
    "text": "Elevated left atrial pressure in a mitral regurgitation patient is a strong indication for surgery, even if the patient is asymptomatic.",
    "session": "גשר קל 24א"
  },
  {
    "id": "pearl-075",
    "chapter": "Hematology",
    "text": "Early vitamin K deficiency affects PT/INR with no effect on PTT.",
    "session": "יק\"ר 27א"
  },
  {
    "id": "pearl-076",
    "chapter": "Neurology",
    "text": "Brainstem damage can present as an isolated cranial nerve palsy that is ipsilateral to the lesion.",
    "session": "יק\"ר 27א"
  },
  {
    "id": "pearl-077",
    "chapter": "Cardiology",
    "text": "SGLT2 inhibitors are the only effective therapy for HFpEF, but they do not reduce mortality — the benefit is symptomatic.",
    "session": "יק\"ר 27א"
  },
  {
    "id": "pearl-078",
    "chapter": "Rheumatology",
    "text": "Normal ESR is < 25 mm/hour.",
    "session": "יק\"ר 27א"
  },
  {
    "id": "pearl-079",
    "chapter": "Hematology",
    "text": "TTP presents with anemia (MAHA), thrombocytopenia, and renal injury.",
    "session": "יק\"ר 27א"
  },
  {
    "id": "pearl-080",
    "chapter": "Cardiology",
    "text": "Aortic valve replacement is indicated once LVEF < 50%.",
    "session": "יק\"ר 27א"
  },
  {
    "id": "pearl-081",
    "chapter": "Oncology",
    "text": "The MASCC score risk-stratifies febrile neutropenia using: disease burden, hypotension, COPD, cancer type, dehydration, inpatient status, and age > 60.",
    "session": "יק\"ר 27א",
    "flag": "Source describes the MASCC score as being for \"afebrile neutropenia\" — the MASCC index is standardly used to risk-stratify FEBRILE neutropenia (identifying low-risk patients); \"afebrile\" is likely a source typo. Transcribed with the standard indication; flagged for reviewer verification."
  },
  {
    "id": "pearl-082",
    "chapter": "Gastroenterology",
    "text": "Patients with positive anti-HBs and NEGATIVE anti-HBc are vaccinated, not previously infected — active infection is not suspected.",
    "session": "יק\"ר 27א"
  },
  {
    "id": "pearl-083",
    "chapter": "Gastroenterology",
    "text": "Gilbert syndrome is a harmless condition with benign indirect bilirubin elevation on stress or fasting.",
    "session": "יק\"ר 27א"
  },
  {
    "id": "pearl-084",
    "chapter": "Gastroenterology",
    "text": "Dermatitis herpetiformis is a cutaneous presentation of celiac disease.",
    "session": "יק\"ר 27א"
  },
  {
    "id": "pearl-085",
    "chapter": "Rheumatology",
    "text": "Leg edema can be the first presentation of FMF-associated (AA) amyloidosis.",
    "session": "יק\"ר 27א"
  },
  {
    "id": "pearl-086",
    "chapter": "Rheumatology",
    "text": "First-line treatment for GPA-associated RPGN is cyclophosphamide.",
    "session": "יק\"ר 27א"
  },
  {
    "id": "pearl-087",
    "chapter": "Endocrinology",
    "text": "Thyroiditis is treated with NSAIDs and beta-blockers.",
    "session": "יק\"ר 27א"
  },
  {
    "id": "pearl-088",
    "chapter": "Rheumatology",
    "text": "Lupus nephritis first-line treatment is steroids plus mycophenolate mofetil.",
    "session": "יק\"ר 27א"
  },
  {
    "id": "pearl-089",
    "chapter": "Emergency Medicine",
    "text": "Type A lactate elevation reflects hypoperfusion; type B reflects an inability to clear lactate.",
    "session": "יק\"ר 27א"
  },
  {
    "id": "pearl-090",
    "chapter": "Cardiology",
    "text": "Female sex contributes 1 point on the CHA2DS2-VASc score.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-091",
    "chapter": "Cardiology",
    "text": "In aortic stenosis, the murmur is accompanied by a loss of S2 and gets LOUDER with squatting.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-092",
    "chapter": "Cardiology",
    "text": "Restrictive cardiomyopathy caused by amyloidosis most often presents as HFpEF.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-093",
    "chapter": "Cardiology",
    "text": "Paroxysmal AF lasting > 48 hours requires ruling out atrial clot (TEE) before rhythm control.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-094",
    "chapter": "Cardiology",
    "text": "A diastolic murmur that worsens with IV fluids (pulmonary edema) suggests mitral stenosis.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-095",
    "chapter": "Hematology",
    "text": "Follicular lymphoma is indolent — with no systemic or organ-specific symptoms, it only needs monitoring.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-096",
    "chapter": "Infectious Diseases",
    "text": "Latent syphilis of unknown duration is treated with 3 doses of penicillin.",
    "session": "יק\"ר 27ב",
    "flag": "Source specifies “3 doses of IV penicillin” — the standard regimen for late-latent/unknown-duration syphilis is 3 weekly doses of IM benzathine penicillin G, not IV. Transcribed as written; flagged for reviewer verification."
  },
  {
    "id": "pearl-097",
    "chapter": "Infectious Diseases",
    "text": "Antibiotic treatment is appropriate for Shigella but dangerous in E. coli O157:H7 infection, where it can precipitate HUS.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-098",
    "chapter": "Gastroenterology",
    "text": "Spontaneous bacterial peritonitis is defined by ascitic fluid PMNs > 250 and is treated with ceftriaxone.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-099",
    "chapter": "Gastroenterology",
    "text": "Anti-HBc IgG indicates past HBV infection with potential for reactivation under immunosuppression — the virus can remain latent in hepatocytes.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-100",
    "chapter": "Gastroenterology",
    "text": "Type I autoimmune hepatitis is marked by ANA and ASMA; type II by anti-LKM antibodies.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-101",
    "chapter": "Gastroenterology",
    "text": "A stable patient with UGIB presenting as melena can be worked up and treated as an outpatient — urgent gastroscopy is not required.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-102",
    "chapter": "Gastroenterology",
    "text": "Achalasia is an inability of the lower esophageal sphincter to relax, presenting mostly at ages 20-30.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-103",
    "chapter": "Rheumatology",
    "text": "ILD is the leading cause of death in scleroderma.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-104",
    "chapter": "Rheumatology",
    "text": "Anti-CCP is a marker for erosive RA.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-105",
    "chapter": "Radiology",
    "text": "When staging an abdominal tumor, CT can be used for M-status (e.g. liver metastasis) and N-status (involved pericolic/retroperitoneal nodes) but NOT for T-status — MRI is needed to assess local tumor extent.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-106",
    "chapter": "Radiology",
    "text": "Liver metastases show ring enhancement; hemangiomas show centripetal filling; adenomas show early enhancement with washout.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-107",
    "chapter": "Gastroenterology",
    "text": "Urinary 5-HIAA is a clear marker of an intestinal NET (carcinoid), not pheochromocytoma, even though the two can present with overlapping symptoms.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-108",
    "chapter": "Endocrinology",
    "text": "In secondary hyperparathyroidism, test 25-OH-vitamin D levels — 1,25-OH vitamin D may read normal due to PTH compensation.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-109",
    "chapter": "Nephrology",
    "text": "Secondary hypertension is most likely once HTN is resistant to 3 drugs.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-110",
    "chapter": "Nephrology",
    "text": "Rhabdomyolysis with an elevated CPK is a major cause of ATN.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-111",
    "chapter": "Pulmonology",
    "text": "Diagnosing IPF requires a full serology workup to rule out an underlying systemic disease.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-112",
    "chapter": "Pulmonology",
    "text": "Asymptomatic sarcoidosis does not require treatment, as most cases are self-limited.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-113",
    "chapter": "Oncology",
    "text": "Performance status is measured with the ECOG scale.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-114",
    "chapter": "Neurology",
    "text": "Antihistamines can be used to treat vertigo.",
    "session": "יק\"ר 27ב"
  },
  {
    "id": "pearl-115",
    "chapter": "Hematology",
    "text": "The main difference between ITP and TTP: in TTP, expect anemia, fever, and neurologic and renal signs in addition to thrombocytopenia.",
    "session": "יק\"ר 25א"
  },
  {
    "id": "pearl-116",
    "chapter": "Oncology",
    "text": "Adenocarcinoma most often presents in the peripheral lung, and in about 25% of cases a treatable genetic mutation is detected.",
    "session": "יק\"ר 25א"
  },
  {
    "id": "pearl-117",
    "chapter": "Gastroenterology",
    "text": "Duodenal ulcer is the most common cause of UGIB.",
    "session": "יק\"ר 25א"
  },
  {
    "id": "pearl-118",
    "chapter": "Oncology",
    "text": "Nail clubbing signals a high malignancy risk and warrants a chest X-ray.",
    "session": "יק\"ר 25א"
  },
  {
    "id": "pearl-119",
    "chapter": "Radiology",
    "text": "A ground-glass opacity (GGO) pattern on lung CT can be seen in PCP.",
    "session": "יק\"ר 25א"
  },
  {
    "id": "pearl-120",
    "chapter": "Endocrinology",
    "text": "Adrenalectomy is indicated for an adrenal mass > 6 cm, or > 4 cm with associated symptoms.",
    "session": "יק\"ר 25א"
  },
  {
    "id": "pearl-121",
    "chapter": "Endocrinology",
    "text": "Pheochromocytoma should be treated surgically BEFORE genetic screening.",
    "session": "יק\"ר 25א"
  },
  {
    "id": "pearl-122",
    "chapter": "Allergy & Immunology",
    "text": "NSAIDs can induce urticaria by blocking COX-1 and shifting arachidonic acid metabolism toward leukotrienes.",
    "session": "יק\"ר 25א"
  },
  {
    "id": "pearl-123",
    "chapter": "Hematology",
    "text": "Primary polycythemia vera shows a positive JAK2 V617K OR exon 12 mutation.",
    "session": "יק\"ר 25א"
  },
  {
    "id": "pearl-124",
    "chapter": "Hematology",
    "text": "Localized follicular lymphoma (stage I-II) is treated with involved-site radiotherapy (ISRT).",
    "session": "יק\"ר 25א"
  },
  {
    "id": "pearl-125",
    "chapter": "Nephrology",
    "text": "Persistent fever in a treated pyelonephritis case should prompt evaluation for an anatomical abnormality.",
    "session": "יק\"ר 25א"
  },
  {
    "id": "pearl-126",
    "chapter": "Hematology",
    "text": "High suspicion for HUS: bloody diarrhea, mild fever, severe abdominal pain.",
    "session": "יק\"ר 25א"
  },
  {
    "id": "pearl-127",
    "chapter": "Gastroenterology",
    "text": "When endoscopic treatment of hemorrhagic varices fails, escalate immediately to balloon tamponade (temporary) and TIPS.",
    "session": "יק\"ר 25א"
  },
  {
    "id": "pearl-128",
    "chapter": "Rheumatology",
    "text": "With clear clinical signs of RA, start treatment immediately rather than waiting on a full downstream differential (e.g. psoriatic arthritis) workup.",
    "session": "יק\"ר 25א"
  },
  {
    "id": "pearl-129",
    "chapter": "Rheumatology",
    "text": "Anti-dsDNA correlates with SLE disease burden and can be used for routine follow-up.",
    "session": "יק\"ר 25א"
  },
  {
    "id": "pearl-130",
    "chapter": "Rheumatology",
    "text": "HBV patients can develop polyarteritis nodosa (PAN); abdominal angiography is the imaging of choice.",
    "session": "יק\"ר 25א",
    "flag": "Source names the condition \"polyarthritis nodosa\" — the standard term for HBV-associated vasculitis is polyarteritis nodosa (PAN), a vessel-wall inflammation, not a joint disease. Transcribed with the standard name; flagged for reviewer verification against the source spelling."
  },
  {
    "id": "pearl-131",
    "chapter": "Rheumatology",
    "text": "GCA/PMR treatment is steroids WITH tocilizumab (anti-IL6).",
    "session": "יק\"ר 25א"
  },
  {
    "id": "pearl-132",
    "chapter": "Gastroenterology",
    "text": "Syncope after severe diarrhea in an anticoagulated patient is highly suspicious for GI bleeding and warrants a rectal exam.",
    "session": "יק\"ר 25א"
  },
  {
    "id": "pearl-133",
    "chapter": "Gastroenterology",
    "text": "Severe steroid-resistant ulcerative colitis is treated with an anti-TNF agent first-line.",
    "session": "יק\"ר 25א"
  },
  {
    "id": "pearl-134",
    "chapter": "Nephrology",
    "text": "SGLT2 inhibitors significantly reduce mortality in CKD.",
    "session": "יק\"ר 25ב"
  },
  {
    "id": "pearl-135",
    "chapter": "Hematology",
    "text": "IVIG is a rapid-acting, first-line therapy for ITP, temporarily raising platelet counts by blocking antibody-mediated platelet destruction.",
    "session": "יק\"ר 25ב"
  },
  {
    "id": "pearl-136",
    "chapter": "Hematology",
    "text": "Testosterone can induce polycythemia by raising EPO.",
    "session": "יק\"ר 25ב"
  },
  {
    "id": "pearl-137",
    "chapter": "Rheumatology",
    "text": "Anti-IL6 therapy is NOT effective against psoriatic arthritis.",
    "session": "יק\"ר 25ב"
  },
  {
    "id": "pearl-138",
    "chapter": "Gastroenterology",
    "text": "Anti-gliadin antibodies are NOT used for celiac screening — anti-EMA, anti-tTG, and anti-DGP are used instead.",
    "session": "יק\"ר 25ב"
  },
  {
    "id": "pearl-139",
    "chapter": "Gastroenterology",
    "text": "Cirrhosis is the most common cause of portal hypertension in Western countries.",
    "session": "יק\"ר 25ב"
  },
  {
    "id": "pearl-140",
    "chapter": "Infectious Diseases",
    "text": "Anti-TB treatment can induce gout, since pyrazinamide and ethambutol raise uric acid levels.",
    "session": "יק\"ר 25ב"
  },
  {
    "id": "pearl-141",
    "chapter": "Endocrinology",
    "text": "Urinary calcium is tested in hypercalcemia to differentiate primary hyperparathyroidism from familial hypocalciuric hypercalcemia (low urinary calcium in the latter).",
    "session": "יק\"ר 25ב"
  },
  {
    "id": "pearl-142",
    "chapter": "Infectious Diseases",
    "text": "Macrolide-resistant Mycoplasma genitalium is treated with a fluoroquinolone (moxifloxacin).",
    "session": "יק\"ר 25ב"
  },
  {
    "id": "pearl-143",
    "chapter": "Allergy & Immunology",
    "text": "Diagnosing systemic mastocytosis requires identifying extra-dermal (e.g. bone marrow) mast cell infiltration.",
    "session": "יק\"ר 25ב"
  },
  {
    "id": "pearl-144",
    "chapter": "Nephrology",
    "text": "Furosemide reduces renal medullary osmolarity by blocking active sodium, potassium, and chloride reabsorption in the thick ascending limb of the loop of Henle.",
    "session": "יק\"ר 25ב"
  },
  {
    "id": "pearl-145",
    "chapter": "Endocrinology",
    "text": "Chronic untreated diabetes can cause an osmotic diuresis with hypovolemic hypernatremia.",
    "session": "יק\"ר 25ב"
  },
  {
    "id": "pearl-146",
    "chapter": "Nephrology",
    "text": "SIADH presents with an inappropriately high urinary sodium.",
    "session": "יק\"ר 25ב"
  },
  {
    "id": "pearl-147",
    "chapter": "Nephrology",
    "text": "Eosinophilia is a clear sign of drug-induced acute interstitial nephritis.",
    "session": "יק\"ר 25ב"
  },
  {
    "id": "pearl-148",
    "chapter": "Nephrology",
    "text": "Membranous nephropathy can be diagnosed without biopsy when nephrotic syndrome is accompanied by anti-PLA2R or anti-THSD7A positivity.",
    "session": "יק\"ר 25ב"
  },
  {
    "id": "pearl-149",
    "chapter": "Rheumatology",
    "text": "Anti-Ro antibodies can cross the placenta and cause neonatal lupus.",
    "session": "יק\"ר 25ב"
  },
  {
    "id": "pearl-150",
    "chapter": "Hematology",
    "text": "ITP treatment threshold: platelets < 30,000 with hemorrhage, or < 20,000 regardless of bleeding.",
    "session": "יק\"ר 26א"
  },
  {
    "id": "pearl-151",
    "chapter": "Gastroenterology",
    "text": "A prophylactic dose of thiamine (B1) is recommended to prevent refeeding syndrome.",
    "session": "יק\"ר 26א"
  },
  {
    "id": "pearl-152",
    "chapter": "Gastroenterology",
    "text": "Patients with an IBD flare are at high VTE risk and should receive anticoagulant prophylaxis during hospitalization.",
    "session": "יק\"ר 26א"
  },
  {
    "id": "pearl-153",
    "chapter": "Endocrinology",
    "text": "A history of hip fracture is sufficient to diagnose osteoporosis — DEXA is not required.",
    "session": "יק\"ר 26א"
  },
  {
    "id": "pearl-154",
    "chapter": "Cardiology",
    "text": "An HFpEF echo finding is left atrial enlargement.",
    "session": "יק\"ר 26א"
  },
  {
    "id": "pearl-155",
    "chapter": "Hematology",
    "text": "CML patients are treated with imatinib until a full pathologic response is achieved; a kinase-domain mutation can cause resistance.",
    "session": "יק\"ר 26א"
  },
  {
    "id": "pearl-156",
    "chapter": "Hematology",
    "text": "Tumor lysis syndrome is common in hematologic cancers; allopurinol can be used for symptomatic treatment.",
    "session": "יק\"ר 26א"
  },
  {
    "id": "pearl-157",
    "chapter": "Hematology",
    "text": "CLL can cause autoimmune hemolytic anemia (AIHA).",
    "session": "יק\"ר 26א"
  },
  {
    "id": "pearl-158",
    "chapter": "Gastroenterology",
    "text": "Gastroscopy is indicated for new dyspepsia in a patient over age 50.",
    "session": "יק\"ר 26א"
  },
  {
    "id": "pearl-159",
    "chapter": "Gastroenterology",
    "text": "Crohn's disease with joint pain suggests spondyloarthritis and should be treated with anti-TNF — steroids will only treat the intestinal flare.",
    "session": "יק\"ר 26א"
  },
  {
    "id": "pearl-160",
    "chapter": "Gastroenterology",
    "text": "Chronic HBV infection in the immune-tolerant phase (normal liver enzymes) only requires follow-up.",
    "session": "יק\"ר 26א"
  },
  {
    "id": "pearl-161",
    "chapter": "Gastroenterology",
    "text": "Refractory ascites is treated with TIPS.",
    "session": "יק\"ר 26א"
  },
  {
    "id": "pearl-162",
    "chapter": "Infectious Diseases",
    "text": "Post-traumatic meningitis is associated with pneumococcal infection.",
    "session": "יק\"ר 26א"
  },
  {
    "id": "pearl-163",
    "chapter": "Infectious Diseases",
    "text": "Acute Q fever (high phase II antibody titer) is treated with doxycycline; chronic Q fever (high phase I titer) adds hydroxychloroquine.",
    "session": "יק\"ר 26א"
  },
  {
    "id": "pearl-164",
    "chapter": "Rheumatology",
    "text": "Anti-Ro antibodies can cross the placenta and cause congenital heart block.",
    "session": "יק\"ר 26א"
  },
  {
    "id": "pearl-165",
    "chapter": "Nephrology",
    "text": "Nephrotic syndrome can cause a hypercoagulable state due to renal loss of anticoagulant proteins.",
    "session": "יק\"ר 26א"
  },
  {
    "id": "pearl-166",
    "chapter": "Rheumatology",
    "text": "Myositis refractory to steroids plus methotrexate is treated with IVIG.",
    "session": "יק\"ר 26א"
  },
  {
    "id": "pearl-167",
    "chapter": "Endocrinology",
    "text": "Inferior petrosal sinus sampling (IPSS), pre- and post-CRH, distinguishes a pituitary from a peripheral (ectopic) source of ACTH excess.",
    "session": "יק\"ר 26א"
  },
  {
    "id": "pearl-168",
    "chapter": "Cardiology",
    "text": "The leading etiology of pericarditis is idiopathic (presumed viral).",
    "session": "יק\"ר 24א"
  },
  {
    "id": "pearl-169",
    "chapter": "Endocrinology",
    "text": "Follow-up after pheochromocytoma excision requires urinary metanephrine testing.",
    "session": "יק\"ר 24א"
  },
  {
    "id": "pearl-170",
    "chapter": "Hematology",
    "text": "Cryoprecipitate contains factors VIII, XIII, and II, but NOT factor VII.",
    "session": "יק\"ר 24א"
  },
  {
    "id": "pearl-171",
    "chapter": "Gastroenterology",
    "text": "Small-bowel inflammation is NOT a driver of IBD-related malignancy risk.",
    "session": "יק\"ר 24א",
    "flag": "Source literally says \"small colon inflammation\" — kept as written since it is unclear whether \"colon\" was meant literally or as a slip for \"small bowel\"; flagged for reviewer verification."
  },
  {
    "id": "pearl-172",
    "chapter": "Gastroenterology",
    "text": "Left-sided colonic disease causes small-volume diarrhea.",
    "session": "יק\"ר 24א"
  },
  {
    "id": "pearl-173",
    "chapter": "Gastroenterology",
    "text": "Endoscopic ultrasound (EUS) can detect early acute pancreatitis and its underlying causes.",
    "session": "יק\"ר 24א"
  },
  {
    "id": "pearl-174",
    "chapter": "Endocrinology",
    "text": "Microcalcifications in a thyroid nodule are highly suspicious for papillary thyroid carcinoma.",
    "session": "יק\"ר 28א"
  },
  {
    "id": "pearl-175",
    "chapter": "Pulmonology",
    "text": "A mild acute asthma flare is treated with SABA and oral steroids.",
    "session": "יק\"ר 28א"
  },
  {
    "id": "pearl-176",
    "chapter": "Cardiology",
    "text": "Ventricular arrhythmia in a cardiomyopathy patient is an indication for a defibrillator.",
    "session": "יק\"ר 28א",
    "flag": "Source literally reads \"requires a defibrillator transplant\" — a garbled phrase, most likely intending ICD implantation. Transcribed as the clear clinical intent (defibrillator indicated); flagged for reviewer verification of the exact source wording."
  },
  {
    "id": "pearl-177",
    "chapter": "Cardiology",
    "text": "Primary mitral regurgitation without major leaflet damage (e.g. isolated posterior leaflet prolapse) favors surgical repair over replacement.",
    "session": "יק\"ר 28א"
  },
  {
    "id": "pearl-178",
    "chapter": "Cardiology",
    "text": "Most pregnancy-related cardiac complications normalize after delivery.",
    "session": "יק\"ר 28א"
  },
  {
    "id": "pearl-179",
    "chapter": "Gastroenterology",
    "text": "For high-risk CRC screening, colonoscopy is repeated every 5 years.",
    "session": "יק\"ר 28א"
  },
  {
    "id": "pearl-180",
    "chapter": "Infectious Diseases",
    "text": "Syphilis is diagnosed with ELISA; VDRL is used at follow-up to assess treatment response.",
    "session": "יק\"ר 28א"
  },
  {
    "id": "pearl-181",
    "chapter": "Infectious Diseases",
    "text": "ETEC does not cause bacteremia — it only attaches to enterocytes without invading.",
    "session": "יק\"ר 28א"
  },
  {
    "id": "pearl-182",
    "chapter": "Infectious Diseases",
    "text": "LTBI identified before starting a biologic is treated with isoniazid ONLY, for 9 months.",
    "session": "יק\"ר 28א"
  },
  {
    "id": "pearl-183",
    "chapter": "Gastroenterology",
    "text": "PSC with a diagnostic ERCP finding does not require biopsy; given its strong association with IBD, colonoscopy/ileoscopy is advised.",
    "session": "יק\"ר 28א"
  },
  {
    "id": "pearl-184",
    "chapter": "Rheumatology",
    "text": "Monoarthritis following direct trauma hints at pseudogout.",
    "session": "יק\"ר 28א"
  },
  {
    "id": "pearl-185",
    "chapter": "Endocrinology",
    "text": "Primary hyperaldosteronism is the most common cause of secondary hypertension.",
    "session": "יק\"ר 28א"
  },
  {
    "id": "pearl-186",
    "chapter": "Rheumatology",
    "text": "Refractory dermatomyositis is treated with IVIG.",
    "session": "יק\"ר 28א"
  },
  {
    "id": "pearl-187",
    "chapter": "Infectious Diseases",
    "text": "Pregnancy is NOT a recognized risk group for meningococcal disease — unlike children, post-splenectomy patients, or those with complement deficiency.",
    "session": "יק\"ר 28א"
  },
  {
    "id": "pearl-188",
    "chapter": "Radiology",
    "text": "Kerley B lines are thickened interlobular septa, indicative of cardiogenic pulmonary edema.",
    "session": "יק\"ר 28א"
  },
  {
    "id": "pearl-189",
    "chapter": "Neurology",
    "text": "Embolism (including paradoxical emboli) is a leading cause of ischemic stroke.",
    "session": "יק\"ר 28ב",
    "flag": "Source states embolism/paradoxical emboli is “the most common cause for stroke” in absolute terms — cardioembolic stroke overall (most often from atrial fibrillation) is a major mechanism, but paradoxical embolism specifically is a less common subtype typically invoked for cryptogenic stroke in younger patients with a PFO. Transcribed close to source intent; flagged for reviewer verification of the intended scope."
  },
  {
    "id": "pearl-190",
    "chapter": "Gastroenterology",
    "text": "Asymptomatic gallstones are an incidental finding that does not require treatment.",
    "session": "יק\"ר 28ב"
  },
  {
    "id": "pearl-191",
    "chapter": "Gastroenterology",
    "text": "Right-sided colon tumors tend to present with obscure bleeding (anemia); left-sided tumors are more symptomatic, with luminal narrowing.",
    "session": "יק\"ר 28ב"
  },
  {
    "id": "pearl-192",
    "chapter": "Endocrinology",
    "text": "MODY is purely genetic — no autoantibodies will be detected.",
    "session": "יק\"ר 28ב"
  },
  {
    "id": "pearl-193",
    "chapter": "Gastroenterology",
    "text": "A serum-ascites albumin gradient (SAAG) < 1.1 points to a non-portal-hypertensive etiology (e.g. nephrotic syndrome, malignancy).",
    "session": "יק\"ר 28ב"
  },
  {
    "id": "pearl-194",
    "chapter": "Infectious Diseases",
    "text": "Legionella infection causes a prolonged positive urinary antigen, which can persist for months after treatment.",
    "session": "יק\"ר 28ב"
  },
  {
    "id": "pearl-195",
    "chapter": "Infectious Diseases",
    "text": "In HIV patients with a fungal opportunistic infection, ART initiation is delayed by 4-6 weeks.",
    "session": "יק\"ר 28ב"
  },
  {
    "id": "pearl-196",
    "chapter": "Endocrinology",
    "text": "GLP-1 (incretin) agonists can cause acute pancreatitis.",
    "session": "יק\"ר 28ב"
  },
  {
    "id": "pearl-197",
    "chapter": "Cardiology",
    "text": "Since enteroviral infection is common, a positive serology is not sensitive for diagnosing myocarditis.",
    "session": "יק\"ר 28ב"
  },
  {
    "id": "pearl-198",
    "chapter": "Rheumatology",
    "text": "FMF can cause pericardial effusion.",
    "session": "יק\"ר 28ב"
  },
  {
    "id": "pearl-199",
    "chapter": "Rheumatology",
    "text": "SLE antibodies: anti-Sm is the most specific; anti-histone points to drug-induced lupus; anti-Ro is also detected in scleroderma.",
    "session": "יק\"ר 28ב"
  },
  {
    "id": "pearl-200",
    "chapter": "Cardiology",
    "text": "Peripartum cardiomyopathy usually self-resolves after delivery.",
    "session": "יק\"ר 28ב"
  },
  {
    "id": "pearl-201",
    "chapter": "Hematology",
    "text": "Chronic, asymptomatic thrombocytopenia with a low MPV is likely congenital.",
    "session": "יק\"ר 28ב"
  },
  {
    "id": "pearl-202",
    "chapter": "Nephrology",
    "text": "Acute symptomatic hyponatremia (e.g. with seizures) requires a bolus of hypertonic saline to address symptoms.",
    "session": "יק\"ר 28ב"
  },
  {
    "id": "pearl-203",
    "chapter": "Rheumatology",
    "text": "Severe diffuse scleroderma is treated with autologous bone marrow transplant.",
    "session": "יק\"ר 28ב"
  },
  {
    "id": "pearl-204",
    "chapter": "Rheumatology",
    "text": "Hydralazine, procainamide, and isoniazid can cause drug-induced lupus.",
    "session": "יק\"ר 28ב"
  },
  {
    "id": "pearl-205",
    "chapter": "Neurology",
    "text": "Spinal cord compression presents primarily with pain, with neurological deficits appearing only later.",
    "session": "יק\"ר 28ב"
  },
  {
    "id": "pearl-206",
    "chapter": "Pulmonology",
    "text": "IPF with desaturation is treated with high-dose oxygen — there is no need to change the treatment course or add steroids.",
    "session": "יק\"ר 28ב"
  },
  {
    "id": "pearl-207",
    "chapter": "Endocrinology",
    "text": "Acromegaly with diffuse pituitary hypertrophy (rather than a discrete adenoma) suggests a GHRH-secreting NET.",
    "session": "יק\"ר 29א"
  },
  {
    "id": "pearl-208",
    "chapter": "Endocrinology",
    "text": "The FRAX score is based on clinical risk factors (age, fracture history, BMI) plus femoral-neck BMD; a low BMI raises the risk.",
    "session": "יק\"ר 29א"
  },
  {
    "id": "pearl-209",
    "chapter": "Rheumatology",
    "text": "Rituximab is the first-choice agent for remission maintenance in ANCA-associated vasculitis.",
    "session": "יק\"ר 29א"
  },
  {
    "id": "pearl-210",
    "chapter": "Infectious Diseases",
    "text": "High risk for deep-tissue necrotizing fasciitis requires urgent surgical intervention.",
    "session": "יק\"ר 29א"
  },
  {
    "id": "pearl-211",
    "chapter": "Hematology",
    "text": "Multiple myeloma treatment combines biologics (proteasome inhibitors/anti-CD38 antibodies) with immunomodulators.",
    "session": "יק\"ר 29א"
  },
  {
    "id": "pearl-212",
    "chapter": "Endocrinology",
    "text": "A very low T-score (< -2.5) with a fracture history calls for an anabolic (osteoblast-stimulating) agent such as teriparatide.",
    "session": "יק\"ר 29א"
  },
  {
    "id": "pearl-213",
    "chapter": "Hematology",
    "text": "In febrile neutropenia, once the patient has recovered and the neutrophil count exceeds 500 for 72 hours, treatment can be stopped.",
    "session": "יק\"ר 29א"
  },
  {
    "id": "pearl-214",
    "chapter": "Rheumatology",
    "text": "Methotrexate is contraindicated in pregnancy.",
    "session": "יק\"ר 29א"
  },
  {
    "id": "pearl-215",
    "chapter": "Rheumatology",
    "text": "Suspected lupus nephritis requires a renal biopsy to determine the subtype and define the treatment plan.",
    "session": "יק\"ר 29א"
  },
  {
    "id": "pearl-216",
    "chapter": "Hematology",
    "text": "Secondary autoimmune neutropenia is caused by an underlying autoimmune disease, with no direct correlation between disease burden and neutropenia severity.",
    "session": "יק\"ר 29א"
  },
  {
    "id": "pearl-217",
    "chapter": "Cardiology",
    "text": "Amyloidosis-induced restrictive cardiomyopathy does not affect the conduction system.",
    "session": "יק\"ר 29א"
  },
  {
    "id": "pearl-218",
    "chapter": "Endocrinology",
    "text": "TZDs are contraindicated in CHF, as they cause fluid retention.",
    "session": "יק\"ר 29א"
  },
  {
    "id": "pearl-219",
    "chapter": "Cardiology",
    "text": "Hyperkalemia causes a prolonged PR interval.",
    "session": "יק\"ר 29א"
  },
  {
    "id": "pearl-220",
    "chapter": "Hematology",
    "text": "Pernicious anemia is caused by anti-parietal-cell antibodies, leading to reduced B12 absorption through loss of intrinsic factor.",
    "session": "יק\"ר 29א"
  },
  {
    "id": "pearl-221",
    "chapter": "Radiology",
    "text": "A bone scan (bone mapping) is used to detect osteoblastic activity.",
    "session": "יק\"ר 29א"
  },
  {
    "id": "pearl-222",
    "chapter": "Nephrology",
    "text": "Nephritic syndrome with leukocytosis and a low C3 is most likely caused by infective endocarditis.",
    "session": "יק\"ר 29א"
  },
  {
    "id": "pearl-223",
    "chapter": "Gastroenterology",
    "text": "Lipase is more specific than amylase for diagnosing acute pancreatitis.",
    "session": "יק\"ר 29א"
  },
  {
    "id": "pearl-224",
    "chapter": "Neurology",
    "text": "Muscle weakness that is localized on exam can hint at the exact neurological deficit involved.",
    "session": "יק\"ר 29א"
  },
  {
    "id": "pearl-225",
    "chapter": "Oncology",
    "text": "BRCA1 mutation is associated with pancreatic cancer.",
    "session": "יק\"ר 29ב"
  },
  {
    "id": "pearl-226",
    "chapter": "Oncology",
    "text": "Lynch syndrome is associated with colon, uterine, and urinary tract (bladder) tumors.",
    "session": "יק\"ר 29ב"
  },
  {
    "id": "pearl-227",
    "chapter": "Infectious Diseases",
    "text": "Septic arthritis with high risk for MSSA is treated with cefazolin.",
    "session": "יק\"ר 29ב"
  },
  {
    "id": "pearl-228",
    "chapter": "Radiology",
    "text": "Cardiogenic pulmonary edema presents with bilateral, central opacification (a \"bat-wing\" pattern).",
    "session": "יק\"ר 29ב"
  },
  {
    "id": "pearl-229",
    "chapter": "Pulmonology",
    "text": "A Wells score > 4 for PE means proceeding directly to CTA, without a D-dimer.",
    "session": "יק\"ר 29ב"
  },
  {
    "id": "pearl-230",
    "chapter": "Endocrinology",
    "text": "A positive Chvostek's sign indicates hypocalcemia (which can cause a long QT), most often from hypoparathyroidism.",
    "session": "יק\"ר 29ב"
  },
  {
    "id": "pearl-231",
    "chapter": "Pulmonology",
    "text": "SABA monotherapy is discouraged, even in patients with stable asthma and no flares.",
    "session": "יק\"ר 29ב"
  },
  {
    "id": "pearl-232",
    "chapter": "Endocrinology",
    "text": "High prolactin should prompt a TSH test — primary hypothyroidism can raise prolactin via elevated TRH.",
    "session": "יק\"ר 29ב"
  },
  {
    "id": "pearl-233",
    "chapter": "Endocrinology",
    "text": "Secondary hypoadrenalism shows no response to ACTH stimulation, due to chronic adrenal atrophy.",
    "session": "יק\"ר 29ב"
  },
  {
    "id": "pearl-234",
    "chapter": "Endocrinology",
    "text": "Gastroparesis (post-meal nausea and vomiting) is a form of diabetic autonomic neuropathy.",
    "session": "יק\"ר 29ב"
  },
  {
    "id": "pearl-235",
    "chapter": "Infectious Diseases",
    "text": "A leukemoid reaction can occur after C. difficile infection, with marked leukocytosis and a left shift.",
    "session": "יק\"ר 29ג"
  },
  {
    "id": "pearl-236",
    "chapter": "Gastroenterology",
    "text": "Dyspepsia is defined by postprandial fullness, early satiety, and epigastric pain — NOT reflux.",
    "session": "יק\"ר 29ג"
  },
  {
    "id": "pearl-237",
    "chapter": "Gastroenterology",
    "text": "Uveitis is NOT correlated with IBD disease burden, though it is a common extraintestinal presentation.",
    "session": "יק\"ר 29ג"
  },
  {
    "id": "pearl-238",
    "chapter": "Gastroenterology",
    "text": "Zollinger-Ellison syndrome tumors can be located in the pancreas, duodenum, or regional lymph nodes.",
    "session": "יק\"ר 29ג"
  },
  {
    "id": "pearl-239",
    "chapter": "Gastroenterology",
    "text": "Autoimmune hepatitis is treated indefinitely.",
    "session": "יק\"ר 29ג"
  },
  {
    "id": "pearl-240",
    "chapter": "Cardiology",
    "text": "Carcinoid syndrome can cause tricuspid regurgitation (carcinoid heart disease).",
    "session": "יק\"ר 29ג"
  },
  {
    "id": "pearl-241",
    "chapter": "Pulmonology",
    "text": "Pneumonia not resolving after 5-7 days warrants a CT to assess for empyema.",
    "session": "יק\"ר 29ג"
  },
  {
    "id": "pearl-242",
    "chapter": "Infectious Diseases",
    "text": "Ciprofloxacin is not indicated for pneumonia, while levofloxacin is.",
    "session": "יק\"ר 29ג"
  }
];
