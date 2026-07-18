// Drug reference — MOA / indications / contraindications & cautions.
// Grouped by chapter, then by pharmacologic group. Drawn from both lecture summaries.
const DRUGS = {
  "Cardiology": [
    {
      group: "Antiplatelets",
      items: [
        {name:"Aspirin", cls:"COX inhibitor (antiplatelet)", moa:"Irreversibly inhibits platelet COX-1, reducing thromboxane A₂ and platelet aggregation.", ind:"ACS (part of DAPT), secondary prevention.", contra:"Active bleeding; caution with peptic ulcer disease."},
        {name:"Clopidogrel (Plavix)", cls:"P2Y12 inhibitor (thienopyridine)", moa:"Irreversible P2Y12 antagonist; a prodrug requiring hepatic activation (effect 5–7 days).", ind:"DAPT in ACS/PCI.", contra:"Active bleeding. Unpredictable efficacy (hepatic first-pass → hypo/hyper-responders)."},
        {name:"Prasugrel", cls:"P2Y12 inhibitor (thienopyridine)", moa:"Irreversible P2Y12 antagonist, stronger antiplatelet effect than clopidogrel.", ind:"DAPT in ACS/PCI.", contra:"Prior CVA/TIA (contraindication). Reduced efficacy: age >75, weight <60 kg."},
        {name:"Ticagrelor (Brilinta)", cls:"P2Y12 inhibitor (reversible, CPTP)", moa:"Reversible P2Y12 antagonist, taken twice daily.", ind:"DAPT in ACS/PCI.", contra:"Active bleeding. Adverse effects: bradycardia, dyspnea, cough."},
        {name:"GP IIb/IIIa inhibitors", cls:"Glycoprotein IIb/IIIa antagonist", moa:"Block the final common pathway of platelet aggregation.", ind:"During PCI in high thrombus burden.", contra:"High bleeding risk — reserved for high-thrombus situations."}
      ]
    },
    {
      group: "Anticoagulants",
      items: [
        {name:"Unfractionated heparin (UFH)", cls:"Indirect thrombin/Xa inhibitor", moa:"Potentiates antithrombin; short half-life (~1 h), continuous infusion.", ind:"ACS, bridging to PCI.", contra:"Active bleeding; HIT history (use fondaparinux/bivalirudin instead)."},
        {name:"LMWH (enoxaparin / Clexane)", cls:"Low-molecular-weight heparin", moa:"Preferential anti-Xa activity; longer half-life, SC dosing twice daily.", ind:"ACS, VTE/PE.", contra:"Active bleeding; HIT history; caution in renal failure."},
        {name:"Fondaparinux / Bivalirudin", cls:"Factor-Xa / direct thrombin inhibitor", moa:"Anticoagulation without cross-reacting with HIT antibodies.", ind:"ACS when heparin is contraindicated.", contra:"Used specifically when there is a history of HIT."},
        {name:"Warfarin (Coumadin)", cls:"Vitamin-K antagonist", moa:"Inhibits vitamin-K-dependent clotting factors; narrow INR target 2–3.", ind:"AFib with mechanical valve/severe valve disease; APLA.", contra:"Pregnancy; many drug/food interactions; bleeding risk."},
        {name:"NOACs (rivaroxaban, apixaban, dabigatran)", cls:"Direct factor-Xa or IIa inhibitors", moa:"Rivaroxaban/apixaban inhibit factor Xa; dabigatran inhibits thrombin (IIa). Oral, broader window.", ind:"AFib anticoagulation; PE.", contra:"Dabigatran not for CKD; mechanical valves (use warfarin); DOACs failed in APLA."}
      ]
    },
    {
      group: "Reperfusion & lipid-lowering",
      items: [
        {name:"tPA (thrombolysis)", cls:"Plasminogen activator", moa:"Converts plasminogen to plasmin, dissolving fibrin clot.", ind:"STEMI when primary PCI unavailable.", contra:"High bleeding risk, recent CVA, active bleeding — PCI preferred when available."},
        {name:"High-intensity statins", cls:"HMG-CoA reductase inhibitor", moa:"Lower LDL cholesterol; plaque stabilization.", ind:"ACS (LDL target 55; extreme-risk 40).", contra:"Active liver disease; myopathy."},
        {name:"Ezetimibe", cls:"Cholesterol absorption inhibitor", moa:"Blocks intestinal cholesterol absorption.", ind:"Add-on if LDL target not met on statin at 6 weeks.", contra:"—"},
        {name:"PCSK9 inhibitors", cls:"Monoclonal antibody (SC)", moa:"Increase LDL-receptor recycling, sharply lowering LDL.", ind:"Add-on if LDL still off-target after statin + ezetimibe.", contra:"—"}
      ]
    },
    {
      group: "Neurohormonal & rate/rhythm",
      items: [
        {name:"Beta-blockers", cls:"β-adrenergic antagonist", moa:"Negative chronotropy/inotropy; reduce myocardial demand.", ind:"ACS demand reduction (esp. tachycardic), HF (EF <40%), AFib rate control.", contra:"Avoid in WPW pre-excited AF; caution in decompensated HF, bradycardia."},
        {name:"ACE inhibitors", cls:"RAAS inhibitor", moa:"Block angiotensin conversion → afterload reduction, remodeling benefit.", ind:"HF, HTN, DM, CKD; post-MI. Scleroderma renal crisis (rheum).", contra:"Pregnancy; hyperkalemia; angioedema history."},
        {name:"ARBs", cls:"Angiotensin-receptor blocker", moa:"Block AT1 receptor.", ind:"HF/post-MI when EF <40%; ACEi-intolerant.", contra:"Pregnancy; hyperkalemia."},
        {name:"MRA (spironolactone/eplerenone)", cls:"Mineralocorticoid-receptor antagonist", moa:"Aldosterone blockade.", ind:"HF (four-pillar); STEMI EF <40% + DM.", contra:"Hyperkalemia; renal failure."},
        {name:"Sacubitril/valsartan (Entresto)", cls:"ARNI (neprilysin inhibitor + ARB)", moa:"Sacubitril raises BNP (neprilysin inhibition); valsartan blocks AT1.", ind:"HFrEF (EF <35%, NYHA II, GFR >30) — replaces ACEi.", contra:"36-hour washout from ACEi to avoid angioedema."},
        {name:"SGLT2 inhibitors", cls:"Sodium-glucose cotransporter-2 inhibitor", moa:"Glucosuria with cardiorenal benefit; slows HF progression.", ind:"HFrEF, HFpEF (only proven agent), HFmrEF.", contra:"Caution: euglycemic DKA, genital infections."},
        {name:"Ivabradine (Coralan)", cls:"SA-node funny-channel inhibitor", moa:"Slows sinus rate without affecting contractility.", ind:"HF: EF <35%, NYHA II, sinus rate >75 on beta-blockers.", contra:"Requires sinus rhythm; not for AFib."},
        {name:"Digoxin", cls:"Cardiac glycoside", moa:"Slows AV-node conduction (rate control); positive inotrope.", ind:"AFib rate control.", contra:"Avoid in WPW pre-excited AF; narrow therapeutic index."},
        {name:"Amiodarone", cls:"Class III antiarrhythmic", moa:"Restores/maintains sinus rhythm.", ind:"AFib rhythm control.", contra:"Thyroid/lung/liver toxicity with chronic use."},
        {name:"Nitrates", cls:"Vasodilator (NO donor)", moa:"Venodilation → preload reduction; coronary vasodilation.", ind:"ACS pain relief; angina.", contra:"Hypotension; RV infarction; recent PDE5 inhibitor."},
        {name:"Dobutamine", cls:"β1 agonist (inotrope)", moa:"Positive inotropy to support cardiac output.", ind:"RV infarction, cardiogenic support, pharmacologic stress.", contra:"Tachyarrhythmia."}
      ]
    }
  ],
  "Rheumatology": [
    {
      group: "Symptomatic & analgesics",
      items: [
        {name:"NSAIDs (non-selective)", cls:"COX-1/COX-2 inhibitor", moa:"Inhibit both COX isoforms; balanced TXA₂/PGI₂ effect.", ind:"First-line symptom control across most rheumatic disease; excellent in SpA/gout.", contra:"Peptic ulcer/GI bleeding, renal impairment; caution CV disease. Not in myocarditis."},
        {name:"COX-2 inhibitors (coxibs; etoricoxib)", cls:"Selective COX-2 inhibitor", moa:"Spare COX-1 (less GI injury) but reduce endothelial PGI₂ → pro-thrombotic.", ind:"Pain with higher GI-ulcer risk.", contra:"Cardiovascular disease/risk (Vioxx withdrawn 2004 for CV events)."},
        {name:"Corticosteroids", cls:"Glucocorticoid", moa:"Broad anti-inflammatory/immunosuppressive.", ind:"Symptomatic control; pulse therapy in flares (SLE, vasculitis); PMR/GCA.", contra:"Red flag in scleroderma (renal crisis); avoid routine systemic use in psoriatic arthritis (rebound)."},
        {name:"Tramadol", cls:"Synthetic opioid + SNRI", moa:"μ-opioid agonism plus serotonin/noradrenaline reuptake inhibition; extended effect.", ind:"Chronic pain, osteoarthritis.", contra:"Seizure risk; serotonergic interactions."},
        {name:"Pregabalin (Lyrica)", cls:"GABA analogue / α2δ ligand", moa:"Reduces neuronal excitability.", ind:"Fibromyalgia, neuropathic pain.", contra:"Sedation, dependence."},
        {name:"SNRIs (duloxetine, venlafaxine)", cls:"Serotonin-noradrenaline reuptake inhibitor", moa:"Central pain modulation.", ind:"Fibromyalgia.", contra:"SSRIs, by contrast, do not work in fibromyalgia."},
        {name:"Cannabinoids (THC/CBD)", cls:"CB1/CB2 receptor agonists", moa:"CB1 (CNS) analgesia via THC; CB2 (peripheral/immune) anti-inflammatory via CBD. Analgesic, anti-emetic, sedative, vasodilatory.", ind:"Fibromyalgia (≈20% THC/4% CBD); Sativex (RA/MS); nabilone (anti-emetic); Epidiolex (refractory epilepsy).", contra:"Psychoactive effects; regulatory/bureaucratic limits."}
      ]
    },
    {
      group: "Conventional DMARDs",
      items: [
        {name:"Methotrexate (MTX)", cls:"Antifolate DMARD", moa:"Low weekly dose; anti-inflammatory (mechanism not fully defined). Synergistic with biologics.", ind:"RA (anchor), PsA, myositis, vasculitis (milder), SLE.", contra:"Pregnancy; hepatotoxicity; cytopenias."},
        {name:"Hydroxychloroquine (Plaquenil)", cls:"Antimalarial DMARD", moa:"Immunomodulatory (mechanism unclear).", ind:"RA; lifelong in SLE (stopping is a common flare trigger); APLA if lupus present.", contra:"Bull's-eye retinopathy — needs eye follow-up."},
        {name:"Sulfasalazine", cls:"Conventional DMARD", moa:"Aspirin linked to sulfate.", ind:"RA, especially with IBD comorbidity.", contra:"Sulfa allergy."},
        {name:"Azathioprine / Mycophenolate / Calcineurin inhibitors", cls:"Immunosuppressants (steroid-sparing)", moa:"Suppress lymphocyte proliferation (AZA, MMF) or T-cell activation (CNI).", ind:"Steroid-sparing in SLE/myositis; MMF (CellCept) first-line for lupus nephritis; CNI in class-V lupus nephritis.", contra:"Bone-marrow suppression; infection risk."},
        {name:"Cyclophosphamide", cls:"Alkylating immunosuppressant", moa:"Cytotoxic; potent remission induction.", ind:"Severe/organ-threatening vasculitis and SLE (with steroids).", contra:"Bladder toxicity, infertility, cytopenias — reserved for severe disease."},
        {name:"Colchicine", cls:"Anti-inflammatory (microtubule inhibitor)", moa:"Inhibits neutrophil microtubules/inflammasome.", ind:"Acute gout (PO); with allopurinol for first ~6 months; FMF (0.5 mg BID lifelong prevents amyloidosis). Pericarditis (cardio).", contra:"Diarrhea (dose-limiting); renal caution. FMF is the only periodic fever that responds."}
      ]
    },
    {
      group: "Urate-lowering (gout)",
      items: [
        {name:"Allopurinol", cls:"Xanthine oxidase inhibitor", moa:"Blocks purine metabolism → less urate; stable metabolites excreted renally.", ind:"Urate-lowering therapy; prevents flares, stones, tophi.", contra:"Rash, marrow suppression, hypotension; give with colchicine first 6 months (paradoxical flare)."},
        {name:"Febuxostat", cls:"Xanthine oxidase inhibitor", moa:"Non-purine XO inhibition; bile-eliminated.", ind:"Urate-lowering when renal impairment limits allopurinol.", contra:"CV caution."},
        {name:"Anakinra / Canakinumab", cls:"IL-1 inhibitors", moa:"Block IL-1-driven inflammation.", ind:"Recurrent gout flares (anakinra daily, canakinumab monthly); FMF and periodic fevers.", contra:"Infection risk."}
      ]
    },
    {
      group: "Biologics & targeted synthetics",
      items: [
        {name:"TNF-alpha inhibitors", cls:"Anti-TNF (mAb or receptor-Fc)", moa:"Neutralize TNF-alpha. Infliximab (chimeric mAb); etanercept (TNF-receptor–Fc fusion); adalimumab, golimumab, certolizumab.", ind:"RA (after DMARD failure, with MTX), axial SpA (first-line biologic), PsA.", contra:"Screen for TB first (granuloma breakdown → miliary TB); can worsen MS; caution in HF (prefer rituximab)."},
        {name:"Abatacept", cls:"CTLA-4-Ig co-stimulation blocker", moa:"Blocks CD80/86 on APC binding CD28 on T cells.", ind:"RA when anti-TNF fails.", contra:"Infection risk."},
        {name:"Rituximab", cls:"Anti-CD20 (B-cell depletion)", moa:"Depletes mature B cells (spares plasma cells).", ind:"RA (esp. with HF), ANCA-vasculitis induction & maintenance, cryoglobulinemia, refractory SLE/myositis.", contra:"Infection reactivation; PCP prophylaxis with heavy immunosuppression."},
        {name:"Tocilizumab", cls:"IL-6 receptor inhibitor", moa:"Blocks IL-6 signaling.", ind:"RA; GCA/PMR maintenance (steroid-sparing).", contra:"Infection, lipid/LFT changes."},
        {name:"IL-17 inhibitors", cls:"Anti-IL-17", moa:"Block IL-17.", ind:"Axial SpA (disease-modifying in syndesmophyte stage), PsA, psoriasis.", contra:"Can worsen Crohn's."},
        {name:"IL-12/23 & IL-23 inhibitors", cls:"Anti-IL-12/23 / anti-IL-23", moa:"Block IL-12/23 or IL-23.", ind:"PsA and psoriasis.", contra:"Do NOT work in axial SpA."},
        {name:"JAK inhibitors (tofacitinib)", cls:"Janus-kinase inhibitor (oral)", moa:"Block intracellular JAK signaling; fast-acting.", ind:"RA, axial SpA/PsA (2nd line), myositis.", contra:"Cardiovascular risk — avoid in age >65 or CV background."},
        {name:"PDE4 inhibitors", cls:"Phosphodiesterase-4 inhibitor", moa:"Weaker immunosuppression.", ind:"PsA — preferred when malignancy is a concern.", contra:"GI upset."},
        {name:"Avacopan", cls:"C5a-receptor antagonist", moa:"Blocks complement-driven neutrophil activation.", ind:"ANCA-vasculitis — steroid-sparing, better renal outcomes.", contra:"—"},
        {name:"Anti-IL-5 (mepolizumab, benralizumab)", cls:"Anti-IL-5 / anti-IL-5Rα", moa:"Reduce eosinophils.", ind:"EGPA (Churg-Strauss).", contra:"—"},
        {name:"Belimumab / Anifrolumab", cls:"Anti-BLyS / anti-type-I-interferon", moa:"Belimumab blocks B-lymphocyte stimulator; anifrolumab blocks interferon signaling.", ind:"SLE.", contra:"Infection risk."},
        {name:"Tafamidis", cls:"TTR stabilizer", moa:"Stabilizes the transthyretin tetramer (does NOT remove deposits).", ind:"ATTR cardiac amyloidosis (cardio) — slows HFpEF worsening.", contra:"—"}
      ]
    }
  ],
  "Infectious Diseases": [
    {
      group: "Penicillins",
      items: [
        {name:"Penicillin G / penicillin V", cls:"Natural penicillin", moa:"Inhibits PBPs/transpeptidases, blocking peptidoglycan cross-linking (bactericidal). Covers streptococci, susceptible pneumococcus, oral anaerobes, and Treponema pallidum.", ind:"Syphilis, strep pharyngitis, susceptible viridans endocarditis, actinomycosis.", contra:"No activity against MSSA/MRSA, most gram-negatives, or β-lactamase-producing organisms."},
        {name:"Nafcillin / oxacillin / dicloxacillin / flucloxacillin", cls:"Antistaphylococcal penicillin", moa:"PBP/transpeptidase inhibition (bactericidal); stable against staphylococcal penicillinase. Covers MSSA and streptococci.", ind:"MSSA bacteremia, endocarditis, osteomyelitis, cellulitis if MSSA suspected.", contra:"No activity against MRSA, Enterococcus, gram-negatives, or anaerobes."},
        {name:"Ampicillin / amoxicillin", cls:"Aminopenicillin", moa:"PBP/transpeptidase inhibition (bactericidal). Covers streptococci, Enterococcus faecalis, Listeria, and some H. influenzae/E. coli/Proteus if susceptible.", ind:"Otitis/sinusitis; Listeria meningitis (with other drugs); Enterococcus infections; dental infections.", contra:"Inactivated by β-lactamase-producing organisms; no MRSA or Pseudomonas coverage."},
        {name:"Amoxicillin-clavulanate / ampicillin-sulbactam", cls:"Aminopenicillin + β-lactamase inhibitor", moa:"Adds a β-lactamase inhibitor to the aminopenicillin, restoring activity against many β-lactamase producers. Adds MSSA, many oral anaerobes, H. influenzae, Moraxella, and bite flora to the aminopenicillin spectrum.", ind:"Animal/human bites, aspiration pneumonia, sinusitis/otitis, polymicrobial cellulitis, some intra-abdominal/pelvic infections.", contra:"No activity against MRSA or Pseudomonas; many ESBL/AmpC organisms remain resistant."},
        {name:"Piperacillin-tazobactam", cls:"Antipseudomonal penicillin + β-lactamase inhibitor", moa:"PBP inhibition plus a β-lactamase inhibitor. Broad gram-negative coverage including Pseudomonas, plus anaerobes, streptococci, MSSA, and many Enterococcus faecalis — one of the classic empiric \"big guns.\"", ind:"Sepsis, HAP/VAP, neutropenic fever, complicated intra-abdominal infection, diabetic foot infection.", contra:"No MRSA or VRE coverage, weak against atypicals, and many ESBL/CRE organisms are resistant — add vancomycin/linezolid/daptomycin when MRSA risk is meaningful."}
      ]
    },
    {
      group: "Cephalosporins",
      items: [
        {name:"Cefazolin (IV) / cephalexin (PO)", cls:"1st-generation cephalosporin", moa:"PBP inhibition (bactericidal). Covers MSSA, streptococci, and \"PEK\" organisms (Proteus, E. coli, Klebsiella).", ind:"Surgical prophylaxis, cellulitis, MSSA infections, uncomplicated UTI if susceptible.", contra:"No MRSA, Enterococcus, anaerobe, or Pseudomonas coverage."},
        {name:"Cefuroxime / cefaclor", cls:"2nd-generation cephalosporin", moa:"PBP inhibition; more H. influenzae/Moraxella activity than 1st-gen agents, plus some Enterobacterales coverage.", ind:"Respiratory infections, otitis/sinusitis, some CAP alternatives.", contra:"No MRSA, Enterococcus, or Pseudomonas coverage."},
        {name:"Cefoxitin / cefotetan", cls:"Cephamycin", moa:"PBP inhibition with added anaerobic activity compared with typical cephalosporins.", ind:"Pelvic/intra-abdominal infections; surgical prophylaxis for colorectal/gynecologic procedures.", contra:"No MRSA, Enterococcus, or Pseudomonas coverage; anaerobic resistance varies."},
        {name:"Ceftriaxone / cefotaxime", cls:"3rd-generation cephalosporin (non-pseudomonal)", moa:"PBP inhibition; covers Strep pneumoniae, H. influenzae, Neisseria, and many Enterobacterales, with good CNS penetration.", ind:"CAP inpatient, meningitis, gonorrhea, pyelonephritis, spontaneous bacterial peritonitis, sepsis of unclear source.", contra:"No Pseudomonas, MRSA, Enterococcus, anaerobe, or ESBL/AmpC coverage."},
        {name:"Ceftazidime", cls:"3rd-generation cephalosporin (antipseudomonal)", moa:"PBP inhibition; covers Pseudomonas and other gram-negatives.", ind:"Pseudomonal infections, nosocomial gram-negative infections.", contra:"Weak gram-positive coverage; no anaerobe or MRSA activity."},
        {name:"Cefepime", cls:"4th-generation cephalosporin", moa:"PBP inhibition; broad gram-negative coverage including Pseudomonas, with better gram-positive coverage than ceftazidime.", ind:"Neutropenic fever, HAP/VAP, sepsis, complicated UTI/pyelonephritis, AmpC-risk organisms.", contra:"No MRSA, Enterococcus, or anaerobe coverage."},
        {name:"Ceftaroline", cls:"5th-generation (anti-MRSA) cephalosporin", moa:"PBP inhibition including PBP2a — covers MRSA, MSSA, streptococci, and many respiratory gram-negatives.", ind:"MRSA skin infections; CAP when MRSA coverage is needed.", contra:"No Pseudomonas, Enterococcus, anaerobe, or ESBL/CRE coverage."},
        {name:"Ceftazidime-avibactam / ceftolozane-tazobactam / cefiderocol", cls:"Advanced cephalosporin ± β-lactamase inhibitor", moa:"PBP inhibition combined with a newer β-lactamase inhibitor (cefiderocol instead uses siderophore-mediated cell entry) to cover selected multidrug-resistant gram-negatives, depending on the specific agent.", ind:"CRE/KPC infections, difficult-to-treat Pseudomonas, selected resistant gram-negative infections.", contra:"Specialist/local-susceptibility-driven use — the agent must be matched to the specific resistance mechanism."}
      ]
    },
    {
      group: "Carbapenems & Monobactam",
      items: [
        {name:"Meropenem", cls:"Carbapenem (antipseudomonal)", moa:"PBP inhibition; very broad gram-negative coverage including Pseudomonas, plus anaerobes, MSSA, streptococci, and good ESBL activity.", ind:"Severe sepsis with ESBL risk, severe intra-abdominal infection, HAP/VAP with resistant gram-negative risk, meningitis when needed.", contra:"No MRSA, VRE, or atypical coverage."},
        {name:"Imipenem-cilastatin", cls:"Carbapenem (antipseudomonal)", moa:"Similar broad-spectrum activity to meropenem.", ind:"Severe polymicrobial infections, resistant gram-negative infections.", contra:"No MRSA, VRE, or atypical coverage; higher seizure risk than meropenem."},
        {name:"Doripenem", cls:"Carbapenem (antipseudomonal)", moa:"Similar antipseudomonal carbapenem activity to meropenem/imipenem.", ind:"Resistant gram-negative infections.", contra:"No MRSA, VRE, or atypical coverage."},
        {name:"Ertapenem", cls:"Carbapenem (non-antipseudomonal)", moa:"Broad Enterobacterales and anaerobic coverage with good ESBL activity — the classic choice for serious ESBL Enterobacterales infections.", ind:"Community intra-abdominal infection, complicated UTI, diabetic foot, outpatient once-daily therapy.", contra:"Not antipseudomonal — no Pseudomonas or Acinetobacter coverage; weak against Enterococcus."},
        {name:"Aztreonam", cls:"Monobactam", moa:"PBP inhibition limited to aerobic gram-negative rods, including Pseudomonas.", ind:"Gram-negative coverage in patients with a severe β-lactam allergy; often combined with vancomycin ± metronidazole.", contra:"No gram-positive or anaerobic coverage — must be paired with other agents if that coverage is needed."}
      ]
    },
    {
      group: "Glycopeptides & Other Cell Wall Agents",
      items: [
        {name:"Vancomycin (IV)", cls:"Glycopeptide", moa:"Binds D-Ala-D-Ala, blocking cell wall synthesis (bactericidal). Gram-positive only: MRSA, MSSA, streptococci, and Enterococcus faecalis/faecium if susceptible.", ind:"Empiric MRSA coverage in sepsis, HAP/VAP, catheter infection, meningitis combination therapy, endocarditis.", contra:"No gram-negative, atypical, or VRE coverage."},
        {name:"Vancomycin (PO)", cls:"Glycopeptide (enteral, local-gut use)", moa:"Same mechanism, but stays in the gut lumen rather than being absorbed — notable since vancomycin is otherwise IV-only.", ind:"C. difficile colitis.", contra:"Does not treat systemic infection — oral dosing has no role outside the GI lumen."},
        {name:"Dalbavancin / oritavancin / telavancin", cls:"Lipoglycopeptide", moa:"Cell wall inhibition ± membrane effects; bactericidal against gram-positive organisms including MRSA. Oritavancin has some VRE activity.", ind:"Long-acting skin/soft-tissue infection options (dalbavancin/oritavancin, mainly acute bacterial skin/skin-structure infections); telavancin also covers selected hospital/ventilator-associated S. aureus pneumonia.", contra:"Not active against gram-negative organisms."},
        {name:"Fosfomycin", cls:"Cell wall synthesis inhibitor (MurA inhibitor)", moa:"Inhibits MurA, blocking an early step of cell wall synthesis.", ind:"Uncomplicated cystitis, including some ESBL E. coli.", contra:"Not for pyelonephritis or bacteremia."},
        {name:"Bacitracin", cls:"Cell wall synthesis inhibitor (topical)", moa:"Blocks peptidoglycan transport.", ind:"Topical gram-positive coverage.", contra:"Not used systemically due to toxicity."},
        {name:"Cycloserine", cls:"Cell wall synthesis inhibitor", moa:"Inhibits alanine racemase/D-Ala-D-Ala formation.", ind:"Second-line TB drug.", contra:"—"}
      ]
    },
    {
      group: "Cell Membrane Active Agents",
      items: [
        {name:"Daptomycin", cls:"Lipopeptide", moa:"Depolarizes the gram-positive cell membrane (bactericidal). Covers MRSA, MSSA, streptococci, and VRE.", ind:"MRSA bacteremia, right-sided endocarditis, VRE bacteremia, complicated skin infection.", contra:"Not for pneumonia — inactivated by pulmonary surfactant."},
        {name:"Polymyxins (colistin / polymyxin B)", cls:"Polymyxin", moa:"Disrupts the gram-negative outer membrane. Covers MDR gram-negatives: Pseudomonas, Acinetobacter, some CRE.", ind:"Salvage therapy for highly resistant gram-negative infections.", contra:"Nephrotoxicity/neurotoxicity; no gram-positive or anaerobic coverage; Proteus/Serratia/Burkholderia are often resistant."}
      ]
    },
    {
      group: "Aminoglycosides",
      items: [
        {name:"Gentamicin / tobramycin / amikacin / streptomycin", cls:"Aminoglycoside", moa:"Irreversibly binds the 30S ribosomal subunit (bactericidal); oxygen-dependent uptake. Covers aerobic gram-negative rods including Pseudomonas, with synergy against some gram-positives when combined with a cell-wall agent.", ind:"Severe gram-negative sepsis combination therapy, complicated UTI/pyelonephritis, endocarditis synergy, plague/tularemia, some TB regimens.", contra:"No anaerobic coverage; poor monotherapy for most infections; nephrotoxicity/ototoxicity. Usually paired with a broad-spectrum β-lactam for severe suspected gram-negative bacillary infection, then stopped once susceptibilities allow."}
      ]
    },
    {
      group: "Macrolides",
      items: [
        {name:"Azithromycin / clarithromycin / erythromycin", cls:"Macrolide", moa:"Binds the 50S ribosomal subunit, inhibiting translocation. Covers atypicals (Mycoplasma, Chlamydophila, Legionella), Bordetella, some strep, and some Campylobacter.", ind:"CAP atypical coverage, pertussis, chlamydia alternative in pregnancy, MAC prophylaxis/treatment, traveler's diarrhea in selected regions.", contra:"Rising resistance in pneumococcus/strep; QT prolongation; clarithromycin/erythromycin have significant CYP interactions."}
      ]
    },
    {
      group: "Tetracyclines & Glycylcyclines",
      items: [
        {name:"Doxycycline / minocycline", cls:"Tetracycline", moa:"Binds the 30S ribosomal subunit, blocking tRNA binding. Covers atypicals, Chlamydia, Rickettsia, Borrelia, Vibrio, Brucella, and some CA-MRSA.", ind:"Tick-borne disease, Lyme disease, chlamydia, atypical CAP, acne, CA-MRSA skin infections, Vibrio, brucellosis combination therapy.", contra:"Not reliable for group A strep; avoid in pregnancy/young children when possible."},
        {name:"Tigecycline / eravacycline / omadacycline", cls:"Glycylcycline (broader tetracycline derivative)", moa:"Broader tetracycline-derived activity covering MRSA, VRE, and many anaerobes and gram-negatives; tigecycline lacks Pseudomonas/Proteus activity.", ind:"Complicated intra-abdominal infection, resistant polymicrobial infections.", contra:"Tigecycline has poor serum/urine levels — avoid for bacteremia or UTI."}
      ]
    },
    {
      group: "Lincosamides & Oxazolidinones",
      items: [
        {name:"Clindamycin", cls:"Lincosamide", moa:"Binds the 50S ribosome; bacteriostatic; decreases bacterial toxin production. Covers streptococci, MSSA, some CA-MRSA, and anaerobes (especially oral/above the diaphragm).", ind:"Skin/soft tissue infection, dental infection, aspiration with oral anaerobes; adjunct in necrotizing GAS infection or clostridial myonecrosis, useful with penicillin for toxin-producing streptococcal infections.", contra:"No aerobic gram-negative rod or Enterococcus coverage; poor CSF penetration; strongly associated with C. difficile colitis."},
        {name:"Linezolid / tedizolid", cls:"Oxazolidinone", moa:"Binds the 50S initiation complex. Covers MRSA, VRE, and streptococci.", ind:"MRSA pneumonia (penetrates lung well — daptomycin should not be used for pneumonia), VRE infections, skin/soft tissue infections.", contra:"Myelosuppression; serotonin syndrome risk; neuropathy with prolonged use."}
      ]
    },
    {
      group: "Chloramphenicol, Streptogramins & Pleuromutilins",
      items: [
        {name:"Chloramphenicol", cls:"Amphenicol", moa:"Broad-spectrum protein synthesis inhibitor, but toxic.", ind:"Rare use for meningitis/rickettsial disease when alternatives are unavailable.", contra:"Toxicity limits routine use."},
        {name:"Quinupristin-dalfopristin", cls:"Streptogramin", moa:"Protein synthesis inhibitor combination.", ind:"VRE faecium, MRSA; rarely used.", contra:"—"},
        {name:"Lefamulin", cls:"Pleuromutilin", moa:"Protein synthesis inhibitor.", ind:"CAP option.", contra:"Not a routine first-line hospital drug."}
      ]
    },
    {
      group: "Fluoroquinolones",
      items: [
        {name:"Ciprofloxacin", cls:"Fluoroquinolone (urinary/gram-negative)", moa:"Inhibits bacterial DNA gyrase/topoisomerase IV. Strong gram-negative rod coverage including Pseudomonas; weaker against pneumococcus.", ind:"Pyelonephritis, prostatitis, complicated UTI if susceptible, traveler's diarrhea, Pseudomonas oral step-down.", contra:"Weak strep/pneumococcal coverage; no anaerobic activity; tendinopathy, QT prolongation, dysglycemia, C. difficile risk, aortic risk — avoid overuse."},
        {name:"Levofloxacin / moxifloxacin", cls:"Fluoroquinolone (respiratory)", moa:"Inhibits bacterial DNA gyrase/topoisomerase IV. Covers pneumococcus and atypicals; levofloxacin retains some Pseudomonas activity, moxifloxacin covers anaerobes but has poor urinary levels and no Pseudomonas activity.", ind:"CAP in comorbid patients or with severe β-lactam allergy; selected HAP regimens.", contra:"Tendinopathy, QT prolongation, dysglycemia, C. difficile risk, aortic risk — avoid overuse. Moxifloxacin specifically is not antipseudomonal and has poor urinary penetration."}
      ]
    },
    {
      group: "Rifamycins, Nitroimidazoles & Other Agents",
      items: [
        {name:"Rifampin / rifabutin / rifapentine", cls:"Rifamycin", moa:"Inhibits DNA-dependent RNA polymerase.", ind:"TB, nontuberculous mycobacteria, adjunct for staphylococcal prosthetic/biofilm infections, meningococcal/Hib prophylaxis.", contra:"Never use alone for active infection — resistance develops rapidly; strong CYP inducer; causes orange body fluids."},
        {name:"Metronidazole", cls:"Nitroimidazole", moa:"Forms toxic free radicals in anaerobes/protozoa, causing DNA damage. Covers anaerobes below the diaphragm (Bacteroides, Clostridium species) and protozoa (Giardia, Entamoeba, Trichomonas).", ind:"Intra-abdominal infection (with ceftriaxone/cefepime), bacterial vaginosis, trichomoniasis, giardiasis, amebiasis, C. difficile alternative in limited situations.", contra:"No aerobic gram-positive or gram-negative coverage."},
        {name:"Nitrofurantoin", cls:"Nitrofuran", moa:"Reactive metabolites damage bacterial DNA/ribosomal proteins. Covers E. coli, Staph saprophyticus, Enterococcus, and some Klebsiella.", ind:"Uncomplicated cystitis only.", contra:"Not effective for pyelonephritis, prostatitis, or bacteremia."},
        {name:"Fidaxomicin", cls:"Macrocyclic (RNA polymerase inhibitor)", moa:"Inhibits the RNA polymerase sigma subunit; narrow gut activity.", ind:"C. difficile colitis — lower recurrence risk than older broad-spectrum agents.", contra:"—"}
      ]
    },
    {
      group: "Folate Pathway Inhibitors",
      items: [
        {name:"Sulfonamides", cls:"Sulfonamide", moa:"Inhibit dihydropteroate synthase; usually used in combination.", ind:"Part of TMP-SMX; PJP prophylaxis/treatment.", contra:"Hypersensitivity, SJS/TEN, hemolysis in G6PD deficiency."},
        {name:"Trimethoprim", cls:"Dihydrofolate reductase inhibitor", moa:"Inhibits dihydrofolate reductase. Covers urinary pathogens.", ind:"UTI, usually given as TMP-SMX.", contra:"Hyperkalemia, creatinine rise."},
        {name:"TMP-SMX", cls:"Folate pathway inhibitor combination", moa:"Sequential folate blockade (trimethoprim + sulfamethoxazole). Covers MRSA skin infections, many Enterobacterales, Stenotrophomonas, Nocardia, and Pneumocystis jirovecii.", ind:"Uncomplicated UTI, CA-MRSA abscess/cellulitis, PJP treatment/prophylaxis, Nocardia, Stenotrophomonas.", contra:"Not reliable for group A strep; avoid in late pregnancy when possible; hyperkalemia."},
        {name:"Dapsone", cls:"Folate antagonist", moa:"Folate antagonist.", ind:"PJP prophylaxis alternative, leprosy.", contra:"Check G6PD status first — risk of methemoglobinemia/hemolysis."}
      ]
    },
    {
      group: "Mycobacterial Antibiotics",
      items: [
        {name:"Isoniazid (INH)", cls:"Antimycobacterial", moa:"Inhibits mycolic acid synthesis.", ind:"Drug-susceptible TB, first-line combination (with rifampin, pyrazinamide, ethambutol).", contra:"—"},
        {name:"Pyrazinamide", cls:"Antimycobacterial", moa:"Active in acidic intracellular sites.", ind:"Drug-susceptible TB, first-line combination.", contra:"—"},
        {name:"Ethambutol", cls:"Antimycobacterial", moa:"Inhibits arabinosyl transferase/cell wall synthesis.", ind:"Drug-susceptible TB, first-line combination; also part of NTM/MAC therapy with a macrolide ± rifamycin.", contra:"—"},
        {name:"Bedaquiline / clofazimine (MDR-TB)", cls:"Antimycobacterial (MDR-TB)", moa:"Specialist-guided MDR-TB regimens combine bedaquiline and clofazimine with agents already listed above — linezolid, fluoroquinolones, cycloserine, and aminoglycosides — chosen by resistance pattern.", ind:"Multidrug-resistant tuberculosis.", contra:"Specialist-guided — regimen composition depends on the specific resistance pattern."}
      ]
    }
  ]
};
