// Disease classification reference — high-level schemes per subject.
// Each subject holds one or more classification schemes (a title + rows of {label, detail}).
const CLASSIFICATIONS = {
  "Cardiology": [
    {
      subject: "Acute Coronary Syndrome",
      schemes: [
        {title:"Three types of ACS", rows:[
          {label:"STEMI", detail:"ST elevation — complete coronary occlusion."},
          {label:"NSTEMI", detail:"Troponin rise without ST elevation."},
          {label:"Unstable angina", detail:"Transient ischemia, no cardiomyocyte death."}
        ]},
        {title:"Universal MI classification", rows:[
          {label:"Type I", detail:"Plaque rupture with thrombus (STEMI or NSTEMI)."},
          {label:"Type II", detail:"Supply–demand mismatch (mostly NSTEMI)."},
          {label:"Type IV / V", detail:"Post-PCI (IV) / post-CABG (V) — treatment-associated."},
          {label:"MINOCA", detail:"MI with non-obstructive coronaries."},
          {label:"Takotsubo", detail:"Catecholamine-induced; distinguished by cardiac MRI."}
        ]},
        {title:"Killip class (pump failure)", rows:[
          {label:"I", detail:"No CHF."},
          {label:"II", detail:"S3 gallop / basilar rales."},
          {label:"III", detail:"Pulmonary edema."},
          {label:"IV", detail:"Cardiogenic shock."}
        ]}
      ]
    },
    {
      subject: "Heart Failure",
      schemes: [
        {title:"Stages A–D", rows:[
          {label:"Stage A", detail:"Pre-HF — risk factors (DM, HTN)."},
          {label:"Stage B", detail:"Asymptomatic structural HF."},
          {label:"Stage C", detail:"Symptomatic HF."},
          {label:"Stage D", detail:"Refractory, progresses on treatment."}
        ]},
        {title:"NYHA functional class", rows:[
          {label:"Class I", detail:"Asymptomatic."},
          {label:"Class II–III", detail:"Symptoms on mild/intermediate exertion."},
          {label:"Class IV", detail:"Symptoms at rest / minimal effort."}
        ]},
        {title:"By ejection fraction", rows:[
          {label:"HFrEF", detail:"Reduced EF, systolic; often ischemic (men)."},
          {label:"HFpEF", detail:"Preserved EF; often HTN (women); poor prognosis."},
          {label:"HFmrEF", detail:"Mildly reduced (40–50%), early disease."}
        ]}
      ]
    },
    {
      subject: "Atrial Fibrillation",
      schemes: [
        {title:"Temporal types", rows:[
          {label:"Paroxysmal", detail:"Up to 7 days."},
          {label:"Persistent", detail:"Week–year, still convertible."},
          {label:"Permanent", detail:"Chronic, no conversion potential."}
        ]}
      ]
    },
    {
      subject: "Valvular / Mitral",
      schemes: [
        {title:"Aortic stenosis severity", rows:[
          {label:"Severe area", detail:"Valve area <1 cm² (normal 3–4)."},
          {label:"Severe velocity/gradient", detail:"Peak velocity >4 m/s; mean gradient >40 mmHg."},
          {label:"Low-gradient variants", detail:"Classic (low LVEF) & paradoxical (low SV / preserved EF)."}
        ]},
        {title:"Mitral regurgitation (Carpentier)", rows:[
          {label:"Type 1", detail:"Normal leaflet motion (annular pathology)."},
          {label:"Type 2", detail:"Excess motion (prolapse)."},
          {label:"Type 3a", detail:"Restricted in systole & diastole (rheumatic)."},
          {label:"Type 3b", detail:"Restricted in systole only (HF)."}
        ]}
      ]
    },
    {
      subject: "Pulmonary Embolism",
      schemes: [
        {title:"Risk stratification", rows:[
          {label:"High", detail:"Cardiogenic shock, hypotension, positive biomarkers."},
          {label:"Intermediate", detail:"RV strain + positive troponin."},
          {label:"Mild", detail:"Stable with troponin elevation."},
          {label:"Low", detail:"No hemodynamic stress signs."}
        ]}
      ]
    },
    {
      subject: "Cardiomyopathies",
      schemes: [
        {title:"By morphology", rows:[
          {label:"Dilated (DCM)", detail:"Dilated, hypokinetic, normal wall thickness; systolic."},
          {label:"Hypertrophic (HCM/HOCM)", detail:"Thick LV, hyperkinetic; SAM causes LVOT obstruction."},
          {label:"Restrictive (RCM)", detail:"Stiff, normokinetic, high filling pressure (amyloid/sarcoid)."},
          {label:"ARVC / NDLVC", detail:"RV (±LV) fibrosis with arrhythmias / non-dilated LV dysfunction."}
        ]}
      ]
    }
  ],
  "Rheumatology": [
    {
      subject: "Arthritis pattern (general)",
      schemes: [
        {title:"By joint count", rows:[
          {label:"Monoarthritis", detail:"1 joint — septic until proven otherwise."},
          {label:"Oligoarthritis", detail:"Up to 5 joints."},
          {label:"Polyarthritis", detail:"5 or more joints."}
        ]},
        {title:"By pain type", rows:[
          {label:"Inflammatory", detail:"At rest/night, morning stiffness >30 min, improves through day."},
          {label:"Mechanical", detail:"Worse with use, better at rest, stiffness <30 min."}
        ]},
        {title:"By course & distribution", rows:[
          {label:"Course", detail:"Acute (days–wk) / subacute (≤6 wk) / chronic (>6 wk)."},
          {label:"Distribution", detail:"Migratory (RA, staph) / additive / symmetric vs asymmetric."}
        ]}
      ]
    },
    {
      subject: "Vasculitis",
      schemes: [
        {title:"By vessel size", rows:[
          {label:"Large vessel", detail:"Aorta & main branches — GCA, Takayasu, PMR-associated."},
          {label:"Medium vessel", detail:"Renal/abdominal arteries — PAN."},
          {label:"Small vessel", detail:"Arterioles/venules — ANCA-associated & immune-complex."}
        ]},
        {title:"ANCA-associated vasculitis", rows:[
          {label:"GPA (Wegener)", detail:"Upper+lower airway granulomas; mostly c-ANCA (PR3)."},
          {label:"MPA", detail:"Renal (RPGN) + alveolar hemorrhage; mostly p-ANCA (MPO)."},
          {label:"EGPA (Churg-Strauss)", detail:"Eosinophilic granulomas, asthma; often ANCA-negative."}
        ]},
        {title:"Immune-complex small-vessel", rows:[
          {label:"Cryoglobulinemic", detail:"Cold-precipitating antibodies; HCV, low C4."},
          {label:"IgA (Henoch-Schönlein)", detail:"Children, post-viral; IgA nephropathy."},
          {label:"Hypocomplementemic urticarial", detail:"Anti-C1q vasculitis."}
        ]}
      ]
    },
    {
      subject: "Spondyloarthritis",
      schemes: [
        {title:"SpA subtypes", rows:[
          {label:"Axial SpA", detail:"Chronic back pain + sacroiliitis; HLA-B27 in ~90%; → bamboo spine."},
          {label:"Psoriatic arthritis", detail:"SpA in psoriasis (~20%); DIP, dactylitis; CASPAR ≥3."},
          {label:"Reactive arthritis", detail:"Post-infection (chlamydia/GI), lower-limb oligoarthritis."},
          {label:"Enteropathic", detail:"IBD-associated; peripheral or axial."}
        ]},
        {title:"Psoriatic arthritis patterns", rows:[
          {label:"Polyarthritis", detail:"Asymmetric small joints."},
          {label:"Asymmetric oligoarthritis", detail:"Few joints; dactylitis (sausage digits)."},
          {label:"Axial", detail:"Like axial SpA."},
          {label:"DIP / arthritis mutilans", detail:"Distal disease / severe joint destruction."}
        ]}
      ]
    },
    {
      subject: "Inflammatory Myopathies",
      schemes: [
        {title:"Subtypes", rows:[
          {label:"Dermatomyositis", detail:"Proximal myositis + skin (heliotrope, Gottron); anti-Mi2."},
          {label:"Polymyositis", detail:"No skin disease; intramyofiber lymphocytes."},
          {label:"Anti-synthetase syndrome", detail:"Myositis + ILD; anti-Jo1; mechanic's hands."},
          {label:"CADM (amyopathic DM)", detail:"Mild muscle, rapid ILD; anti-MDA5, high ferritin."},
          {label:"IMNM (necrotizing)", detail:"Anti-SRP (cardiac/dysphagia) or statin-induced anti-HMG-CoA."},
          {label:"Inclusion body myositis", detail:"Older patients; distal involvement possible."}
        ]},
        {title:"Antibody groups", rows:[
          {label:"MSA (myositis-specific)", detail:"Anti-Mi2, anti-SRP, anti-Jo1."},
          {label:"MAA (associated)", detail:"Overlap with lupus, scleroderma, Sjögren's."}
        ]}
      ]
    },
    {
      subject: "SLE / Lupus Nephritis",
      schemes: [
        {title:"Lupus nephritis biopsy", rows:[
          {label:"'Full house'", detail:"IgA, IgG, IgM, C3, C1q across glomeruli, tubules, interstitium, vessels."},
          {label:"Classes 3–4", detail:"Most active and most treatment-responsive."},
          {label:"Class V", detail:"Membranous — calcineurin inhibitors used."}
        ]},
        {title:"Skin disease phases", rows:[
          {label:"Acute", detail:"Malar (butterfly) rash — strongest link to systemic lupus."},
          {label:"Subacute", detail:"Annular / papulosquamous rash."},
          {label:"Chronic", detail:"Discoid rash — scarring; weakest systemic link."}
        ]}
      ]
    },
    {
      subject: "Scleroderma",
      schemes: [
        {title:"Systemic sclerosis subtypes", rows:[
          {label:"Diffuse cutaneous (dcSSc)", detail:"Widespread skin + viscera; high renal-crisis/ILD risk; anti-Scl-70, anti-RNA-pol-III."},
          {label:"Limited cutaneous (lcSSc)", detail:"Limited skin; Raynaud's early; anti-centromere; includes CREST."},
          {label:"Sine scleroderma", detail:"Visceral only, no skin involvement."},
          {label:"Localized scleroderma", detail:"Isolated skin (morphea) — not systemic."}
        ]}
      ]
    },
    {
      subject: "Autoinflammatory (FMF)",
      schemes: [
        {title:"Mechanisms", rows:[
          {label:"Inflammasomopathies", detail:"e.g. FMF (MEFV/pyrin)."},
          {label:"Interferonopathies", detail:"Type-I interferon-driven."},
          {label:"NF-κB / TNF dysregulation", detail:"e.g. TRAPS."}
        ]},
        {title:"Tel Hashomer criteria (FMF)", rows:[
          {label:"Major", detail:"Recurrent fever + serositis; AA amyloidosis; response to colchicine."},
          {label:"Minor", detail:"Recurrent fever; erysipelas-like erythema; first-degree family history."}
        ]}
      ]
    },
    {
      subject: "Osteoarthritis",
      schemes: [
        {title:"Primary vs secondary", rows:[
          {label:"Primary OA", detail:"Age-related, typical joints (knee, hip, DIP/PIP, CMC1, MTP1)."},
          {label:"Secondary OA", detail:"Younger, atypical sites, from prior damage/congenital/neuropathy."},
          {label:"Erosive (inflammatory) OA", detail:"Small hand joints, 'seagull sign', poor NSAID response."}
        ]}
      ]
    }
  ]
};
