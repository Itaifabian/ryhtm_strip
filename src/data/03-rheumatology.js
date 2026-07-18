// Rheumatology chapter — built from the uploaded Hebrew source (Yakar 2026, Dror Ben-Rubi).
// Rendered in English for consistency with the platform; content faithful to source.
const RHEUM_TOPICS = [
{
  id: "rheum-basics",
  name: "Rheumatology — Foundations",
  blurb: "Joint anatomy, inflammatory vs mechanical pain, arthritis patterns, imaging.",
  flashcards: [
    {front:"Three joint types (by structure)", back:"Synarthroses — suture joints (e.g. skull). Diarthroses — synovial, mobile joints. Amphiarthroses — fibrocartilage-linked, limited motion."},
    {front:"Normal synovial fluid characteristics", back:"Viscous but clear, few cells, small volume (a few mL), sterile. Leukocyte count separates non-inflammatory vs inflammatory vs septic; glucose can also help characterize the process."},
    {front:"The iron rule of monoarthritis", back:"Every monoarthritis is infectious (septic) arthritis until proven otherwise — synovial fluid culture is critical."},
    {front:"Polarized-light microscopy of synovial fluid", back:"Used to identify monosodium urate crystals characteristic of gout."},
    {front:"Inflammatory vs mechanical joint pain", back:"Mechanical — worse with use, improves with rest, morning stiffness <30 min. Inflammatory — present at rest, worse at night, improves through the day, morning stiffness >30 min."},
    {front:"Arthritis by time course", back:"Acute (days–weeks), subacute (up to 6 weeks), chronic. Can be migratory (classic for staph and RA), intermittent, or additive."},
    {front:"Mono- / oligo- / polyarthritis", back:"Monoarthritis — 1 joint. Oligoarthritis — up to 5 joints. Polyarthritis — 5 or more joints."},
    {front:"Imaging modalities in rheumatology", back:"X-ray (erosions, fractures, tumors), CT (bony processes), MRI (soft tissue, ligaments, bone-marrow edema), bone scan (technetium — metastases), US (joint space, synovium), PET-CT (classic for vasculitis — inflammatory uptake in vessel walls; myeloma lytic lesions)."},
    {front:"Common rheumatology blood tests", back:"Serum autoantibodies (e.g. rheumatoid factor), complement (rises as acute-phase, falls with overconsumption), ESR, CRP, ANA (by immunofluorescence — reported with titer and staining pattern), and ELISA for other antibodies."},
    {front:"Example of an amphiarthrosis", back:"The acromioclavicular joint — bones linked by fibrocartilage, limited motion."},
    {front:"Bone scan (technetium) — classic use", back:"Detects osteoblastic metastases, classically from breast and prostate cancer."}
  ],
  quiz: [
    {q:"A patient presents with a single acutely swollen joint. The overriding first principle is:", options:["Start NSAIDs and reassure","Assume septic arthritis until proven otherwise — culture the fluid","Order MRI first","Check rheumatoid factor"], answer:1, explain:"Every monoarthritis is infectious arthritis until proven otherwise; synovial fluid culture is critical."},
    {q:"Which feature points to INFLAMMATORY rather than mechanical joint pain?", options:["Morning stiffness under 30 minutes","Pain that improves with rest","Morning stiffness over 30 minutes, worse at night","Pain only with use"], answer:2, explain:"Inflammatory pain has morning stiffness >30 min, is present at rest and worse at night, improving through the day."},
    {q:"Which imaging is classically used to show inflammatory activity in vessel walls in vasculitis?", options:["Plain X-ray","PET-CT","Bone scan","Ultrasound"], answer:1, explain:"PET-CT shows metabolic (inflammatory) uptake along large-vessel walls — classic for vasculitis."},
    {q:"Migratory arthritis is classically associated with:", options:["Osteoarthritis","Staphylococcus and RA","Gout","Fibromyalgia"], answer:1, explain:"Migratory (joint-to-joint) arthritis is classic for staphylococcus and rheumatoid arthritis."},
    {q:"Monosodium urate crystals are identified using:", options:["Gram stain","Polarized-light microscopy","ELISA","Immunofluorescence"], answer:1, explain:"Polarized-light microscopy of synovial fluid reveals the urate crystals of gout."}
  ]
},
{
  id: "rheum-ra",
  name: "Rheumatoid Arthritis",
  blurb: "RF & anti-CCP, joint pattern, extra-articular disease, DMARDs & biologics.",
  flashcards: [
    {front:"RA — nature of the disease", back:"Chronic progressive inflammatory arthritis with pain, swelling and disability. Constant pain and stiffness, inflammatory pain, additive pattern (joints accumulate), loss of joint function."},
    {front:"Major RA risk factors", back:"Smoking and periodontitis."},
    {front:"RA multi-systemic effects", back:"Accelerated atherosclerosis, increased hepatic CRP and hepcidin, depression, insulin resistance."},
    {front:"Rheumatoid factor (RF)", back:"Classic marker; most common autoantibody in RA. An IgM pentamer that binds IgG. Present in 70–80% (seropositive). Not specific — also from other autoimmune disease, malignancy, and age. Seronegative RA tends to be milder without extra-articular involvement."},
    {front:"Anti-CCP antibodies", back:"Anti-cyclic citrullinated peptide antibodies — likely mechanistically involved in disease, and define seropositivity. Arthralgia + anti-CCP is a strong predictor of future RA."},
    {front:"Citrullination mechanism", back:"Smoking and periodontitis activate PAD enzyme, which citrullinates amino acids (NH→O) in a non-native way; citrullinated proteins may be recognized as non-self."},
    {front:"RA joint pattern", back:"Symmetric small-joint arthritis and synovitis; PIP commonly involved, DIP relatively spared; later wrist involvement. Similar picture in the feet. Over time: erosion, joint destruction, deformity."},
    {front:"Dangerous RA cervical involvement", back:"Atlas–dens (atlantoaxial) involvement from weakening of the stabilizing ligament — a risk to watch for."},
    {front:"Extra-articular RA and prognosis", back:"Eye, lung, and peri-articular compression (e.g. carpal tunnel). Interstitial lung disease is a poor prognostic marker and often a cause of death. Very active disease raises lymphoma risk. Renal complications are usually iatrogenic or from amyloidosis of long-standing untreated inflammation."},
    {front:"RA diagnostic criteria basis", back:"Number of involved joints (many small joints best), seropositivity (RF or anti-CCP), symptom duration >6 weeks, and acute-phase reactants (CRP, ESR)."},
    {front:"RA disease-activity scores", back:"ACR20/50/70 (percent improvement — used in trials) and DAS28 (uses tender/swollen joint counts and ESR; below a threshold = low activity, lower still = remission)."},
    {front:"RA symptomatic vs disease-modifying treatment", back:"Symptomatic: analgesics, NSAIDs, corticosteroids. Disease-modifying (start early to prevent irreversible damage): DMARDs — hydroxychloroquine (Plaquenil), low-dose methotrexate, sulfasalazine."},
    {front:"TNF-alpha inhibitors in RA", back:"Antibodies or antibody fragments: infliximab, adalimumab, golimumab, certolizumab pegol, etanercept. Synergistic with methotrexate (high remission rates) but expensive."},
    {front:"Non-TNF biologic mechanisms", back:"Abatacept — blocks CD80/86 on APC (prevents CD28 binding on T cells). Rituximab — anti-CD20 (mature B cells, not plasma cells); good when heart failure limits TNF inhibitors. Tocilizumab — IL-6 receptor inhibitor. JAK inhibitors."},
    {front:"Pre-biologic screening & JAK caution", back:"Screen for TB before biologics (TNF-alpha maintains granulomas; inhibition can cause miliary TB). JAK inhibitors carry cardiovascular risk — avoid in older patients."},
    {front:"RA chronic-arthritis deformities", back:"Ulnar deviation, swan-neck deformity, boutonnière deformity, carpal tunnel syndrome. Arthritis mutilans — irreversible deformity and loss of function — in severe cases."},
    {front:"RA and pericarditis", back:"Pericarditis can be the first presenting sign of RA."},
    {front:"Key RA pathogenic cytokines", back:"IL-6 and TNF-alpha drive synovitis and hepatic acute-phase reactant production — the rationale for IL-6 and TNF inhibitor therapy."},
    {front:"Anti-TNF caution beyond TB", back:"Anti-TNF agents can also exacerbate multiple sclerosis — assess neurologic history before starting."},
    {front:"RA classification joint-count scoring", back:"1 medium/large joint = 0; 2–10 medium/large = 1; 1–3 small = 2; 4–10 small = 3; >10 joints (≥1 small) = 5. Combined with serology, symptom duration, and acute-phase reactants, a total score ≥6 supports starting treatment."}
  ],
  quiz: [
    {q:"Which anti-TNF caution is in addition to TB reactivation risk?", options:["Renal failure","Multiple sclerosis exacerbation","Hepatotoxicity","QT prolongation"], answer:1, explain:"Anti-TNF agents can also exacerbate multiple sclerosis, so neurologic history should be assessed first."},
    {q:"The classic autoantibody of RA is an IgM pentamer that binds:", options:["IgA","IgG","Complement C3","Citrullinated peptide"], answer:1, explain:"Rheumatoid factor is an IgM pentamer that binds IgG; present in 70–80% (seropositive)."},
    {q:"Which finding is a strong predictor of future RA in a patient with joint pain?", options:["Positive ANA","Anti-CCP antibodies","Low complement","Elevated urate"], answer:1, explain:"Arthralgia plus anti-CCP strongly predicts progression to RA; anti-CCP is likely mechanistically involved."},
    {q:"Which joints are characteristically SPARED in RA?", options:["PIP","MCP","DIP","Wrist"], answer:2, explain:"RA favours symmetric small-joint disease at PIP/MCP and wrist, with the DIP relatively spared (DIP involvement suggests OA or psoriatic arthritis)."},
    {q:"Which extra-articular RA manifestation is a poor prognostic marker and common cause of death?", options:["Carpal tunnel syndrome","Interstitial lung disease","Scleritis","Anemia"], answer:1, explain:"Interstitial lung disease carries a poor prognosis and is frequently a cause of death in RA."},
    {q:"Before starting a TNF-alpha inhibitor, you must screen for:", options:["Hepatitis B","Tuberculosis","HIV","Diabetes"], answer:1, explain:"TNF-alpha maintains granulomas; inhibition can reactivate TB (miliary spread), so screen first."},
    {q:"Which RA biologic is preferred when a patient also has heart failure (a problem with TNF inhibitors)?", options:["Adalimumab","Rituximab","Etanercept","Infliximab"], answer:1, explain:"Rituximab (anti-CD20) is a good option in RA with heart failure, where TNF inhibitors are problematic."},
    {q:"Renal disease directly from RA is uncommon; when it occurs it is usually due to:", options:["Glomerulonephritis","Iatrogenic causes or amyloidosis","Nephrolithiasis","Renal vasculitis"], answer:1, explain:"Renal complications in RA are usually iatrogenic or from amyloidosis of long-standing untreated inflammation."}
  ]
},
{
  id: "rheum-spa",
  name: "Spondyloarthritis",
  blurb: "Axial SpA / ankylosing spondylitis, psoriatic arthritis, HLA-B27, CASPAR.",
  flashcards: [
    {front:"Spondyloarthritis (SpA) — definition", back:"A group of inflammatory arthropathies. The two most common are axial (ankylosing) spondyloarthritis and psoriatic arthritis. All are seronegative (no characteristic serology)."},
    {front:"Common SpA features", back:"Inflammatory back pain (onset <40, gradual, better with exercise not rest, worse at night, morning stiffness), large/medium joint pain, enthesitis (e.g. Achilles at calcaneus), anterior uveitis (red, painful eye, photophobia), sacroiliitis on imaging, raised ESR/CRP, good NSAID response, HLA-B27, and predisposing disease (infection, psoriasis, Crohn's)."},
    {front:"Enthesitis", back:"Inflammation/pain at the insertion of tendon to bone (e.g. Achilles at the calcaneus). Common across SpA."},
    {front:"Axial SpA definition", back:"Chronic back pain (>3 months, onset before 45) + one imaging finding of sacroiliitis + one SpA feature; OR chronic back pain + HLA-B27 + 2 SpA features."},
    {front:"Axial SpA progression to radiographic disease", back:"Pain + MRI findings → coarser plain-film changes → syndesmophytes (vertebral deformity), formerly diagnosed as ankylosing spondylitis."},
    {front:"Radiographic axial SpA (ankylosing spondylitis) hallmark", back:"Progressive ossification from sacrum upward, calcium deposition forming syndesmophytes → vertebral fusion → 'bamboo spine'. HLA-B27 positive in ~90%. Shoulder and pelvic girdle involvement common; enthesitis frequent."},
    {front:"Predictors of progression to radiographic axial SpA", back:"High MRI inflammation, raised inflammatory markers, buttock pain, male sex, HLA-B27 positive."},
    {front:"Axial SpA treatment ladder", back:"NSAIDs first (good response, clinical improvement in 24–48 h). If inadequate → DMARDs; first-line biologic usually TNF-alpha inhibitors. Second line JAK inhibitors or IL-17 inhibitors. IL-17 inhibitors are the only agents proven disease-modifying in advanced (syndesmophyte) disease."},
    {front:"Psoriatic arthritis (PsA) — overview", back:"SpA in psoriasis patients; ~20% of psoriasis develops seronegative arthritis (psoriasis usually precedes arthritis by ~a decade). Main risk factor: obesity (also reversibly linked to poor treatment response)."},
    {front:"PsA joint pattern vs RA", back:"Unlike RA (nearly always symmetric PIP polyarthritis), PsA can involve one or many joints, symmetric or asymmetric, DIP not just PIP, plus axial involvement. Five overlapping subtypes."},
    {front:"PsA characteristic findings", back:"Dactylitis (sausage digits) — typical of asymmetric oligoarthritis; 'ray' distribution. DIP arthritis (common in PsA, not RA), often with nail involvement. Conjunctivitis rather than uveitis. Enthesitis very common. X-ray shows both erosions (like RA) and bone growth (like axial SpA)."},
    {front:"CASPAR criteria for PsA", back:"Entry: inflammatory arthritis/enthesitis/axial disease. Active psoriasis = 2 points; personal/family history of psoriasis = 1. Other listed criteria each = 1 point. Total ≥3 → psoriatic arthritis."},
    {front:"PsA treatment", back:"NSAIDs and intra-articular steroids first; most need DMARDs. Peripheral polyarticular PsA → conventional DMARDs (methotrexate first). Biologics: TNF inhibitors (base), IL-17 (also for psoriasis; Crohn's side-effect), IL-12/23 and IL-23 (good for psoriasis but not axial SpA), JAK inhibitors, PDE4 inhibitors (weaker immunosuppression, preferred with malignancy). Avoid routine systemic steroids (psoriasis rebound)."},
    {front:"Reactive arthritis", back:"Post-infectious arthritis (usually >2 weeks after chlamydia or gastroenteritis), mostly mono/oligoarthritis of the lower limbs. Usually self-limiting; supportive treatment with NSAIDs/steroid injection."},
    {front:"Enteropathic (enterohepatic) arthritis", back:"Seronegative SpA associated with IBD. Peripheral mono/oligoarthritis (treated as Crohn's) or sacroiliitis (axial-SpA-like)."}
  ],
  quiz: [
    {q:"A 28-year-old man has chronic low-back pain improving with exercise, worse at night. The most useful genetic marker is:", options:["HLA-DR4","HLA-B27","Anti-CCP","ANA"], answer:1, explain:"HLA-B27 is strongly associated with axial SpA (~90% of radiographic disease)."},
    {q:"'Bamboo spine' from vertebral fusion is the hallmark of:", options:["Psoriatic arthritis","Radiographic axial SpA (ankylosing spondylitis)","Rheumatoid arthritis","Reactive arthritis"], answer:1, explain:"Progressive syndesmophyte formation and vertebral fusion produces the bamboo-spine appearance of radiographic axial SpA."},
    {q:"Dactylitis ('sausage digits') is a characteristic finding in:", options:["Rheumatoid arthritis","Osteoarthritis","Psoriatic arthritis","Gout"], answer:2, explain:"Dactylitis is typical of psoriatic (asymmetric oligoarticular) arthritis."},
    {q:"Which class is uniquely proven DISEASE-MODIFYING in advanced axial SpA with syndesmophytes?", options:["TNF inhibitors","IL-17 inhibitors","NSAIDs","Methotrexate"], answer:1, explain:"IL-17 inhibitors are the only agents shown to modify advanced (syndesmophyte-stage) axial SpA."},
    {q:"Which eye finding is typical of axial SpA (vs the conjunctivitis of PsA)?", options:["Anterior uveitis","Cataract","Scleromalacia","Retinal detachment"], answer:0, explain:"Anterior uveitis (red, painful, photophobic eye) is typical of axial SpA; PsA tends toward conjunctivitis."},
    {q:"On the CASPAR criteria, active psoriasis contributes how many points?", options:["1","2","3","0"], answer:1, explain:"Active psoriasis = 2 points; a personal/family history = 1. A total of ≥3 gives the diagnosis."},
    {q:"How quickly should NSAIDs improve symptoms in axial SpA?", options:["Within 24–48 hours","Within 2 weeks","Within 6 weeks","Only with DMARDs"], answer:0, explain:"Both radiographic and non-radiographic axial SpA should show clinical improvement within 24–48 hours of NSAIDs."}
  ]
},
{
  id: "rheum-vasculitis",
  name: "Vasculitis",
  blurb: "ANCA-associated (GPA/MPA/EGPA), PAN, immune-complex, large-vessel, PMR/GCA.",
  flashcards: [
    {front:"Clues to vasculitis", back:"Palpable purpura, pulmonary hemorrhage, glomerulonephritis, ischemic digits, mononeuritis multiplex. Can be life-threatening — actively seek major-organ involvement even if asymptomatic. Aim for biopsy of affected tissue."},
    {front:"The three ANCA-associated vasculitides", back:"Microscopic polyangiitis (MPA), Granulomatosis with polyangiitis (GPA/Wegener), Eosinophilic granulomatosis with polyangiitis (EGPA/Churg-Strauss). Necrotizing, small-vessel, pauci-immune (no immune-complex deposition)."},
    {front:"ANCA subtypes", back:"c-ANCA — mainly against proteinase-3 (PR3). p-ANCA — against myeloperoxidase (MPO). Antibody type points to the vasculitis type."},
    {front:"GPA (Wegener) features", back:"Upper AND lower respiratory tract involvement (nose/sinus destruction, nodules, cavitations), small vessels, frequent glomerulonephritis (pauci-immune with crescents), granulomas (hallmark, mainly lung), often c-ANCA/PR3. Subglottic stenosis can threaten the airway. Equal in men/women, any age."},
    {front:"MPA features", back:"Smaller vessels (capillaries), no granulomas, very frequent renal involvement — rapidly progressive glomerulonephritis (pauci-immune) — and alveolar hemorrhage in lungs. Characteristic antibody: p-ANCA (MPO)."},
    {front:"EGPA (Churg-Strauss) features", back:"Eosinophil-rich granulomas; almost all patients have an asthma background with blood/tissue eosinophilia. Three phases: asthma & allergy → eosinophilic infiltration → vasculitis. Most are ANCA-negative. Leading cause of death is cardiac involvement (eosinophilic cardiomyopathy). ANCA-positive cases tend to renal disease/neuropathy; ANCA-negative tend to cardiac/lung."},
    {front:"ANCA vasculitis — remission induction", back:"Steroids (very effective, never alone) PLUS cyclophosphamide, or rituximab (anti-CD20; safer, preferred in young patients). In non-organ/non-life-threatening cases, steroids + methotrexate. Avacopan (C5a-receptor inhibitor) can spare steroids with better renal outcomes. Plasmapheresis for very severe renal failure."},
    {front:"ANCA vasculitis — maintenance & EGPA-specific", back:"Rituximab in tapering doses is the most effective long-term maintenance, usually for 3–4 years after remission. Without treatment, survival averages ~5 months; with treatment ~80% survival but 50–70% relapse. EGPA: mepolizumab (anti-IL-5)."},
    {front:"Polyarteritis nodosa (PAN)", back:"Medium-vessel vasculitis, strongly linked to hepatitis B, mostly idiopathic. Segmental inflammation of medium muscular arteries. Renal involvement most common (non-glomerular — general decline without significant hematuria/proteinuria), plus skin, nerves, testes. Diagnosis by biopsy or angiography. Treatment mainly steroids."},
    {front:"Immune-complex small-vessel vasculitides", back:"Cryoglobulinemic vasculitis, IgA vasculitis (Henoch-Schönlein), hypocomplementemic urticarial vasculitis (anti-C1q)."},
    {front:"Cryoglobulinemic vasculitis", back:"Antibodies precipitate in cold, redissolve on warming. B-cell overactivation → immune-complex deposition. Triad: general malaise, arthralgia, purpura (esp. lower limbs); peripheral neuropathy common; renal = MPGN. Labs: raised inflammatory markers, HCV (type 2), low complement especially C4. Treat the driver of B-cell activation + rituximab + low-dose steroids; plasma exchange if life-threatening."},
    {front:"IgA vasculitis (Henoch-Schönlein)", back:"Usually children, usually mild, often post-viral. Purpuric rash, joint pain, GI symptoms, renal involvement. More severe in adults; renal biopsy shows IgA nephropathy."},
    {front:"Polymyalgia rheumatica (PMR)", back:"Most common rheumatic disease of the elderly (rare <50), more in women. Stiffness/pain in neck, shoulders (most common) and pelvic girdle, worse in the morning; malaise, low-grade fever. Labs: raised inflammatory markers, chronic-disease anemia, thrombocytosis, negative autoimmune serology and normal CPK. Manifests as bursitis. Treatment: low-dose corticosteroid (rapid relief) for ≥1 year; IL-6 inhibitors if it flares."},
    {front:"Giant cell arteritis (GCA)", back:"Large-vessel vasculitis (aorta and direct branches), a.k.a. temporal arteritis; most common vasculitis after 50; often accompanies PMR. Symptoms: headache, scalp tenderness, jaw claudication, arm claudication (subclavian), reduced pulses/pallor distal to inflammation. Feared complication: painless optic-nerve ischemia → blindness."},
    {front:"GCA diagnosis & treatment", back:"Temporal artery biopsy as early as possible (can be false-negative in large-vessel disease). Large-vessel disease seen on CTA/MRA/PET-CT (increased uptake along large vessels). Treatment: high-dose steroids urgently to prevent blindness, plus steroid-sparing immunomodulators."},
    {front:"Takayasu arteritis", back:"Similar to GCA but in the young, far more common in women. Rapid stenoses (including coronaries). PET-CT and MRA similar to GCA. Treatment: high-dose steroids."}
  ],
  quiz: [
    {q:"Which antibody is characteristic of microscopic polyangiitis (MPA)?", options:["c-ANCA (PR3)","p-ANCA (MPO)","Anti-CCP","Anti-dsDNA"], answer:1, explain:"MPA is characteristically p-ANCA (MPO); GPA is more often c-ANCA (PR3)."},
    {q:"Upper and lower airway granulomas with cavitations and nasal destruction suggest:", options:["MPA","GPA (Wegener)","EGPA","PAN"], answer:1, explain:"GPA involves upper AND lower respiratory tract with granulomas, nodules, cavitations, and sinus/nasal destruction."},
    {q:"Almost all patients with EGPA (Churg-Strauss) have a background of:", options:["Hepatitis B","Asthma with eosinophilia","HCV","HLA-B27"], answer:1, explain:"EGPA features eosinophil-rich granulomas; nearly all patients have asthma with blood/tissue eosinophilia."},
    {q:"Medium-vessel vasculitis strongly linked to hepatitis B is:", options:["GPA","Polyarteritis nodosa","Cryoglobulinemic vasculitis","GCA"], answer:1, explain:"PAN is a medium-vessel vasculitis strongly associated with hepatitis B; renal involvement is most common and non-glomerular."},
    {q:"The feared, PAINLESS complication of giant cell arteritis is:", options:["Jaw claudication","Optic-nerve ischemia causing blindness","Scalp tenderness","Stroke"], answer:1, explain:"Painless optic-nerve ischemia can cause blindness — the reason GCA needs urgent high-dose steroids."},
    {q:"Cryoglobulinemic vasculitis is most associated with which infection, and which complement drops?", options:["HBV; C3","HCV; C4","HIV; C1q","EBV; C2"], answer:1, explain:"Type-2 cryoglobulinemia links to HCV; C4 falls as it precipitates with the antibodies."},
    {q:"The most effective long-term maintenance agent in ANCA-associated vasculitis is:", options:["Methotrexate","Rituximab (tapering, 3–4 years)","Cyclophosphamide indefinitely","Avacopan alone"], answer:1, explain:"Tapering rituximab for 3–4 years after remission is the most effective maintenance; cyclophosphamide/rituximab + steroids induce remission."},
    {q:"An elderly woman has shoulder/pelvic-girdle stiffness, high ESR, normal CPK and negative serology. Best initial treatment:", options:["High-dose steroids","Low-dose corticosteroid","Methotrexate","Rituximab"], answer:1, explain:"This is polymyalgia rheumatica — low-dose corticosteroid gives rapid relief (contrast GCA, which needs high-dose)."}
  ]
},
{
  id: "rheum-gout",
  name: "Gout & Crystal Arthritis",
  blurb: "Uric acid, acute flares, tophi, allopurinol vs colchicine, CPPD.",
  flashcards: [
    {front:"Crystal-induced arthritis — cause", back:"Serum uric acid rising above the solubility threshold → crystal formation. Most patients have impaired uric-acid clearance; a minority overproduce."},
    {front:"Uric acid as a risk factor", back:"Above a threshold, gout risk rises sharply. Uric acid is an independent risk factor for cardiovascular disease, metabolic syndrome, and renal failure. Familial component; more common in men."},
    {front:"Drugs that RAISE urate", back:"Thiazide diuretics, low-dose aspirin, beta-blockers, others. Sometimes swapping one diuretic for another that lowers urate can help. Purine-rich diet (meat, seafood, alcohol) also raises it, though diet change is often insufficient given genetic background."},
    {front:"Acute gouty arthritis", back:"Sudden pain, usually the first MTP joint of the foot, often first appearing at night (core temperature drops in the foot → monosodium urate crystallizes in the synovial fluid). Usually monoarticular, sometimes polyarticular."},
    {front:"Tophus / chronic tophaceous gout", back:"Without treatment a tophus forms — a mass of monosodium urate crystals. Chronic tophaceous gout = accumulation of tophi that erode surrounding bone."},
    {front:"Recurrence rate after a gout attack", back:"About 60% have another attack within the following year — the course is recurrent acute flares progressing to a chronic stage."},
    {front:"Acute flare treatment", back:"Steroids (preferably intra-articular, otherwise systemic), NSAIDs, colchicine (PO not IV), ACTH in some cases."},
    {front:"Urate-lowering therapy (allopurinol)", back:"Allopurinol inhibits xanthine oxidase (purine metabolism → urate), leaving stable metabolites excreted in urine. Goals: prevent crystal formation/attacks, prevent urinary stones and tophaceous gout."},
    {front:"Colchicine WITH allopurinol at initiation", back:"Colchicine is given alongside allopurinol (not instead — a common error) for the first ~6 months: as allopurinol dissolves crystals, a fragment shedding into the fluid can trigger a paradoxical flare, which colchicine mitigates."},
    {front:"Adherence problem in gout", back:"Despite simple, effective therapy, most stop taking it once they feel well (more in women, ages 45–65, lower socioeconomic status, single) → frequent flares."},
    {front:"CPPD (pseudogout)", back:"Calcium pyrophosphate deposition; usually inflamed wrist or ankle, older population. Crystals differ from urate. No good treatment — sometimes drainage and intra-articular steroids."}
  ],
  quiz: [
    {q:"Most patients with gout have hyperuricemia because of:", options:["Uric-acid overproduction","Impaired uric-acid clearance","Vitamin C excess","Renal stones"], answer:1, explain:"The majority have impaired uric-acid clearance; only a minority overproduce."},
    {q:"Why does the first gout attack classically strike the first MTP joint at night?", options:["Higher blood flow","Core temperature drops in the foot, so urate crystallizes","Uric acid peaks at night","Weight-bearing during sleep"], answer:1, explain:"The foot's temperature falls, lowering urate solubility and precipitating monosodium urate crystals in that joint."},
    {q:"Colchicine started with allopurinol for the first ~6 months is intended to:", options:["Lower uric acid faster","Prevent a paradoxical flare as crystals dissolve","Replace allopurinol","Treat renal stones"], answer:1, explain:"As allopurinol dissolves crystals, shed fragments can trigger a paradoxical flare; colchicine prevents this. It is added to, not instead of, allopurinol."},
    {q:"Allopurinol lowers urate by inhibiting:", options:["COX-2","Xanthine oxidase","PAD enzyme","IL-1"], answer:1, explain:"Allopurinol inhibits xanthine oxidase in purine metabolism, reducing urate production."},
    {q:"Which drug RAISES uric acid and could be swapped to help gout?", options:["Losartan","Thiazide diuretic","Allopurinol","Colchicine"], answer:1, explain:"Thiazides raise urate; sometimes changing to a urate-lowering diuretic helps. Aspirin (low-dose) and beta-blockers also raise urate."},
    {q:"Which route of colchicine is used in an acute flare?", options:["IV","PO","Intra-articular","Subcutaneous"], answer:1, explain:"Colchicine is given PO (not IV) in acute gout."}
  ]
},
{
  id: "rheum-oa-pain",
  name: "Osteoarthritis & Pain Syndromes",
  blurb: "OA radiographic features, joints, treatment; NSAID pharmacology; fibromyalgia.",
  flashcards: [
    {front:"Osteoarthritis — nature", back:"Most common arthritis, mostly in older age, prevalence rising with age. Involves articular cartilage AND all other joint components; not just natural wear — an active inflammatory process drives it."},
    {front:"Four radiographic features of OA", back:"Joint-space narrowing, subchondral sclerosis/thickening, osteophyte formation, subchondral cysts."},
    {front:"Joints commonly affected by OA", back:"Hip, knee, PIP and DIP, cervical/lumbar spine, MTP1, and CMC1 (carpometacarpal). Ankle, shoulder, elbow, wrist and midfoot are uncommon."},
    {front:"Heberden vs Bouchard nodes", back:"DIP osteophytic nodes = Heberden's nodes; PIP = Bouchard's nodes."},
    {front:"OA risk factors", back:"Age (rare <40), female sex, obesity, occupations with joint loading or repetitive movement, smoking, family history. Recreational exercise is NOT a risk (protective); professional/occupational overuse (repeated microtrauma) is."},
    {front:"Primary vs secondary OA", back:"Secondary OA appears in younger people, atypical locations, from another disease — e.g. hypermobility syndromes, Ehlers-Danlos, neglected RA, metabolic disease. Look for the underlying cause."},
    {front:"OA pain character & diagnosis", back:"Gradual, localized to the joint, tender along the joint line; WORSE with use, better with rest (opposite of inflammatory pain); morning stiffness <30 min. Crepitus on movement is common. Diagnosis is clinical + X-ray; no raised inflammatory markers or specific antibodies."},
    {front:"Erosive (inflammatory) OA", back:"Relatively rare, more inflammatory, more pain/tenderness, usually small hand joints, 'seagull sign' on X-ray, poor response to anti-inflammatories."},
    {front:"OA treatment", back:"Not drug-based (drugs don't work well). Physiotherapy, exercise (aerobic, yoga, stretching, daily activity), weight loss. Braces/taping ease symptoms but aren't durable therapy. Topical NSAIDs/capsaicin; OTC analgesics (caution with high dose in the elderly); intra-articular steroids (limited benefit). Supplements/alternative medicine unhelpful. Definitive treatment: surgery (best for large joints)."},
    {front:"NSAID mechanism & platelet/endothelial balance", back:"NSAIDs inhibit COX. In platelets, COX-1 makes thromboxane A₂ (TXA₂ — aggregation, vasoconstriction). In endothelium, COX-2 makes prostacyclin (PGI₂ — anti-aggregation, vasodilation). Normally these balance."},
    {front:"Selective COX-2 inhibitors (coxibs) and CV risk", back:"Coxibs reduce PGI₂ while TXA₂ stays normal → pro-thrombotic → raised MI/stroke risk. Vioxx (rofecoxib), marketed as GI-safer, was withdrawn in 2004 after a rise in cardiovascular events. Non-selective NSAIDs inhibit both COX-1 and COX-2, so the TXA₂/PGI₂ balance is more even."},
    {front:"Low-dose aspirin — why it's cardioprotective", back:"It irreversibly inhibits COX-1 in platelets, reducing TXA₂ production — providing cardiovascular protection."},
    {front:"NSAID GI toxicity", back:"COX-1 makes protective prostaglandins (PGE₂, PGI₂ — mucus, bicarbonate, mucosal blood flow, less acid). COX-1 inhibition removes this protection → erosions/ulcers. NSAIDs also directly injure gastric mucosa (weak acids). Coxibs reduce ulcer risk vs non-selective NSAIDs but carry higher CV risk. Lowest dose, shortest duration, ± PPI."},
    {front:"Peripheral vs central pain", back:"Peripheral (nociceptive) pain is familiar and common. Central (non-nociceptive) pain is duller, from a central processing defect. Neuropathic pain combines both."},
    {front:"Fibromyalgia", back:"More common in women, prevalence rises with age. Chronic diffuse pain with sleep disturbance, fatigue, cognitive disturbance. 18 tender points aid diagnosis. Mechanism: amplified cortical pain processing → hyperalgesia and allodynia (pain from normally non-painful stimuli). Often diagnosed after traumatic events (links to PTSD)."},
    {front:"Fibromyalgia treatment", back:"Physical activity helps a lot; SNRIs partially; SSRIs don't work. Cannabis (CB1 receptor/CNS, THC for analgesia; CB2/peripheral, CBD) shows higher efficacy than SNRIs — roughly half of rheumatology patients use it formally or informally."},
    {front:"Cannabis formulations used in rheumatology/pain", back:"Nabilone — synthetic THC, anti-emetic. Sativex — THC+CBD, used in RA/MS. Epidiolex — pure CBD, for refractory epilepsy. Fibromyalgia protocols often use roughly 20% THC / 4% CBD."}
  ],
  quiz: [
    {q:"Which cannabis-derived product is pure CBD, used for refractory epilepsy?", options:["Nabilone","Sativex","Epidiolex","Dronabinol"], answer:2, explain:"Epidiolex is pure CBD, approved for refractory epilepsy; Sativex combines THC+CBD (RA/MS); Nabilone is synthetic THC (anti-emetic)."},
    {q:"Which is NOT one of the four radiographic features of osteoarthritis?", options:["Joint-space narrowing","Subchondral sclerosis","Marginal erosions with pannus","Osteophytes"], answer:2, explain:"OA shows joint-space narrowing, subchondral sclerosis, osteophytes and subchondral cysts. Marginal erosions with pannus are RA."},
    {q:"Osteophytic nodes at the DIP joints are called:", options:["Bouchard's nodes","Heberden's nodes","Osler's nodes","Janeway lesions"], answer:1, explain:"DIP = Heberden's nodes; PIP = Bouchard's nodes."},
    {q:"OA pain characteristically:", options:["Improves with use, worse at rest","Worsens with use, improves with rest, stiffness <30 min","Wakes the patient at night","Comes with high inflammatory markers"], answer:1, explain:"OA is mechanical: worse with use, better with rest, morning stiffness under 30 minutes, and no raised inflammatory markers."},
    {q:"Selective COX-2 inhibitors raise cardiovascular risk because they:", options:["Increase TXA₂","Reduce PGI₂ while TXA₂ stays normal (pro-thrombotic)","Inhibit platelets irreversibly","Increase bicarbonate"], answer:1, explain:"Coxibs lower endothelial prostacyclin (PGI₂) without reducing platelet TXA₂, creating a pro-thrombotic state — the reason Vioxx was withdrawn in 2004."},
    {q:"Low-dose aspirin is cardioprotective because it irreversibly inhibits:", options:["COX-2 in endothelium","COX-1 in platelets, reducing TXA₂","Xanthine oxidase","Prostacyclin synthesis"], answer:1, explain:"Irreversible COX-1 inhibition in platelets lowers TXA₂, giving cardiovascular protection."},
    {q:"The definitive treatment for advanced osteoarthritis of a large joint is:", options:["High-dose NSAIDs","Supplements","Surgery (joint replacement)","Intra-articular steroids"], answer:2, explain:"OA treatment is largely non-pharmacologic (exercise, weight loss, physio); surgery is the definitive option, best for large joints."},
    {q:"Which is TRUE of fibromyalgia treatment?", options:["SSRIs are first-line and highly effective","SNRIs cure it","Physical activity helps and SSRIs don't work","Opioids are first-line"], answer:2, explain:"Exercise helps substantially and SSRIs don't work; SNRIs help only partially; cannabis shows higher efficacy than SNRIs."}
  ]
},
{
  id: "rheum-myositis",
  name: "Inflammatory Myopathies",
  blurb: "Dermatomyositis, anti-synthetase syndrome, anti-MDA5, CPK, EMG, biopsy.",
  flashcards: [
    {front:"Inflammatory myopathies — overview", back:"Autoimmune diseases characterized by skeletal-muscle destruction from inflammatory-cell infiltration; can also involve skin, lungs and joints. Most patients can fully recover."},
    {front:"Clinical presentation", back:"Fever, fatigue, weight loss, proximal limb weakness (raising arms overhead, rising from a low chair/toilet), dysphagia (weakness of the upper third of the esophagus)."},
    {front:"Classic dermatomyositis rash", back:"Heliotrope rash (periorbital) is highly characteristic; various facial, hand, neck rashes and nail changes."},
    {front:"Current classification groups", back:"Dermatomyositis, polymyositis, inclusion body myositis, autoimmune necrotizing myopathy, anti-synthetase syndrome, overlap syndrome (e.g. scleroderma), clinically amyopathic dermatomyositis."},
    {front:"Myositis lab workup", back:"Raised inflammatory markers; CPK elevated (muscle breakdown — sometimes normal); ANA positive in 60–80% (non-specific, suggests autoimmunity). Myositis panel separates myositis-specific antibodies (MSA) from myositis-associated antibodies (MAA)."},
    {front:"EMG and biopsy in myositis", back:"EMG shows increased irritability (electrical activity without nerve stimulation) and guides biopsy to the most affected (inflamed) area. Each subtype has a characteristic inflammatory-cell pattern. MRI can show muscle enhancement."},
    {front:"Dermatomyositis treatment", back:"Corticosteroids alongside azathioprine/methotrexate (steroid-sparing immunomodulators). Severe or second-line: other immunomodulators such as calcineurin inhibitors."},
    {front:"Anti-synthetase syndrome (ASS)", back:"~30% of inflammatory myositis. Syndrome of myositis + interstitial lung disease. Common features: fever, Raynaud's, arthralgia, mechanic's hands. Caused by antibodies against tRNA synthetase; most common is anti-Jo1 (against histidyl-tRNA synthetase). Treatment: prednisone + methotrexate; if more needed, IVIG/rituximab."},
    {front:"Clinically amyopathic dermatomyositis & anti-MDA5", back:"Relatively rare but highly lethal — muscle disease mild but rapid pulmonary (ILD) deterioration, often with hand ulcers. Characteristic antibody: anti-MDA5."},
    {front:"Dermatomyositis skin findings beyond the heliotrope rash", back:"Gottron's papules over the joints, periungual erythema, V-sign/shawl rash over the chest and upper back, and painful subcutaneous calcinosis (mostly in children)."}
  ],
  quiz: [
    {q:"A rash over the anterior chest (V-sign) and upper back/shoulders (shawl sign) is characteristic of:", options:["Systemic lupus erythematosus","Dermatomyositis","Systemic sclerosis","Polymyalgia rheumatica"], answer:1, explain:"The V-sign/shawl rash affects sun-exposed chest and upper-back skin in dermatomyositis."},
    {q:"A periorbital (heliotrope) rash with proximal weakness and dysphagia points to:", options:["Polymyalgia rheumatica","Dermatomyositis","Fibromyalgia","Scleroderma"], answer:1, explain:"The heliotrope rash is highly characteristic of dermatomyositis, alongside proximal weakness and upper-esophageal dysphagia."},
    {q:"Which enzyme is elevated as a marker of muscle breakdown in myositis?", options:["ALT","CPK","Amylase","Troponin"], answer:1, explain:"CPK rises with muscle breakdown (though it is occasionally normal)."},
    {q:"Anti-Jo1 antibodies define which syndrome?", options:["Anti-synthetase syndrome","CREST","Lupus","GPA"], answer:0, explain:"Anti-Jo1 (anti-histidyl-tRNA synthetase) is the commonest antibody of anti-synthetase syndrome — myositis plus interstitial lung disease."},
    {q:"Clinically amyopathic dermatomyositis is dangerous mainly because of:", options:["Severe muscle destruction","Rapid interstitial lung disease","Renal failure","Cardiac tamponade"], answer:1, explain:"Muscle disease is mild but ILD deteriorates rapidly and is often fatal; the antibody is anti-MDA5, often with hand ulcers."},
    {q:"EMG in active myositis characteristically shows:", options:["Reduced electrical activity","Increased irritability (activity without nerve stimulation)","Normal findings","Conduction block only"], answer:1, explain:"Increased muscle irritability on EMG helps confirm myositis and directs the biopsy to the most inflamed area."},
    {q:"Which triad of features commonly accompanies anti-synthetase syndrome?", options:["Malar rash, oral ulcers, alopecia","Raynaud's, arthralgia, mechanic's hands","Purpura, arthralgia, GI pain","Uveitis, enthesitis, dactylitis"], answer:1, explain:"ASS commonly features fever, Raynaud's, arthralgia and mechanic's hands, together with myositis and ILD."}
  ]
},
{
  id: "rheum-sle-apla",
  name: "SLE & Antiphospholipid Syndrome",
  blurb: "ANA/anti-dsDNA, lupus nephritis, neuropsychiatric lupus, APLA thrombosis.",
  flashcards: [
    {front:"SLE — overview", back:"A connective-tissue disease with highly variable, multi-system autoimmune involvement from autoantibodies; can be acute, subacute or chronic. More common in women of childbearing age, and in non-white populations; low socioeconomic status predicts severe disease."},
    {front:"SLE triggers", back:"Rising estrogen (childbearing age / pregnancy / OCP), smoking, sun exposure, silica, obesity increase flares; moderate alcohol is associated with fewer flares. Higher EBV seropositivity in patients. Proposed mechanisms: cell damage exposing nuclear DNA fragments, or microbial molecular mimicry."},
    {front:"SLE hallmark antibody and specific antibodies", back:"ANA is the hallmark — almost mandatory for diagnosis (but present in ~14% of the general population, so sensitive not specific). More specific: anti-dsDNA and anti-Smith (anti-Sm). Anti-Ro/anti-La characterize lupus but also scleroderma."},
    {front:"Classic SLE manifestations", back:"Fever, malar (butterfly) rash, fatigue, pericarditis, arthralgia, glomerulonephritis."},
    {front:"SLE skin timeline", back:"Acute malar rash (raised over cheeks/nasal bridge, photosensitive, resolves with treatment — strongest association with systemic lupus) → subacute annular/papulosquamous rash → chronic discoid rash (scarring, weakest link to systemic disease — more cutaneous lupus)."},
    {front:"Jaccoud's arthropathy", back:"Looks like the swan-neck deformity of RA but does not involve ligaments — so it reduces (disappears) when the hand is pressed on a hard surface."},
    {front:"SLE hematologic involvement", back:">50% have involvement of all cell lines: anemia (chronic disease, iron deficiency, or autoimmune hemolytic), lymphopenia, neutropenia, thrombocytopenia — hence pancytopenia. Lymph nodes may enlarge; biopsy sometimes needed to exclude lymphoma."},
    {front:"Lupus nephritis", back:"Very common, with serious morbidity (dialysis/transplant often needed). Presents with proteinuria (edema) ± hematuria; raised creatinine and UPCR. Mostly immune-complex deposition (glomerular) with tubulointerstitial involvement too. Proteinuria tracks treatment response."},
    {front:"Lupus nephritis biopsy — 'full house'", back:"Biopsy is essential for classification. 'Full house' = deposition of IgA, IgG, IgM, C3 and C1q across glomeruli, tubules, interstitium and vessels. Classified into 6 classes; classes 3–4 are the most active and most treatment-responsive."},
    {front:"Neuropsychiatric lupus", back:"PNS: numbness, mononeuropathy, autonomic disturbance. CNS: seizures, psychosis, young strokes (from hypercoagulability), aseptic meningitis. Many symptoms are non-specific or secondary — requires high clinical suspicion."},
    {front:"SLE diagnosis & titer requirement", back:"Based on multi-system symptoms + antibodies with no better explanation. Modern criteria mix clinical and immunologic items; the entry requirement is ANA at a titer of at least 1:80."},
    {front:"SLE treatment", back:"Goal: remission (or low disease activity), started early to prevent irreversible damage. Steroids as pulse therapy in acute flares, then switch quickly to steroid-sparing therapy."},
    {front:"Hydroxychloroquine (Plaquenil) in SLE", back:"Immunomodulatory; all lupus patients take it for life unless they develop toxicity (mainly retinopathy). Do not stop — a very common cause of flare. Often add methotrexate or azathioprine. Emergencies: cyclophosphamide. Renal involvement first-line: mycophenolate mofetil. Class V nephritis: calcineurin inhibitors."},
    {front:"Antiphospholipid antibody syndrome (APLA) — three antibodies", back:"Anticardiolipin (aCL), anti-beta2-glycoprotein-1, lupus anticoagulant (LAC). Triple-positive is the most severe. Most common acquired thrombophilia."},
    {front:"APLA — the misleading name", back:"In vitro clotting times are prolonged, but clinically it causes hypercoagulability — both venous AND arterial (unlike most thrombophilias, which cause only one)."},
    {front:"APLA clinical features & diagnosis", back:"Primary or secondary (e.g. 10–15% of SLE). Features: DVT, stroke, coronary disease, mesenteric involvement, recurrent miscarriage. Diagnosis: a clinical thrombotic/obstetric event + one APLA antibody. Microvascular criteria now allowed: livedo reticularis, nephropathy (TMA), valve involvement, thrombocytopenia."},
    {front:"APLA treatment", back:"Asymptomatic carriers: low-dose aspirin (+ Plaquenil if lupus). First venous event: warfarin (DOACs failed in APLA). Recurrent/arterial events: higher-intensity warfarin ± aspirin. Around pregnancy: stop warfarin, switch to LMWH + aspirin (pregnancy/puerperium are hypercoagulable)."}
  ],
  quiz: [
    {q:"The entry immunologic requirement for classifying SLE is ANA at a titer of at least:", options:["1:40","1:80","1:160","1:320"], answer:1, explain:"Modern criteria require ANA ≥1:80 as the entry point, plus clinical and immunologic items."},
    {q:"Which antibody is HIGHLY SPECIFIC for SLE?", options:["ANA","Rheumatoid factor","Anti-dsDNA","HLA-B27"], answer:2, explain:"ANA is sensitive but not specific (present in ~14% of people). Anti-dsDNA and anti-Sm are highly specific for SLE."},
    {q:"Jaccoud's arthropathy differs from RA swan-neck deformity in that it:", options:["Causes erosions","Reduces when pressed on a hard surface (no ligament involvement)","Involves the DIP","Is seropositive"], answer:1, explain:"Jaccoud's does not involve ligaments, so the deformity disappears when the hand is pressed flat."},
    {q:"On lupus nephritis biopsy, the 'full house' pattern refers to deposition of:", options:["IgG and C3 only","IgA, IgG, IgM, C3 and C1q","IgM and C4","Only complement"], answer:1, explain:"'Full house' = IgA, IgG, IgM, C3 and C1q across glomeruli, tubules, interstitium and vessels; classes 3–4 are most active."},
    {q:"Which drug do all lupus patients take long-term unless toxicity develops, and stopping it commonly triggers flares?", options:["Methotrexate","Hydroxychloroquine","Cyclophosphamide","Mycophenolate"], answer:1, explain:"Hydroxychloroquine (Plaquenil) is lifelong unless retinopathy or other toxicity develops; stopping is a common flare trigger."},
    {q:"APLA is unusual among thrombophilias because it causes:", options:["Only venous thrombosis","Only arterial thrombosis","Both venous AND arterial thrombosis","Only bleeding"], answer:2, explain:"Despite prolonged in-vitro clotting times, APLA causes hypercoagulability that is both venous and arterial."},
    {q:"Preferred anticoagulant after a first venous event in APLA:", options:["A DOAC","Warfarin","Low-dose aspirin alone","LMWH lifelong"], answer:1, explain:"DOACs failed in APLA; warfarin is used. Around pregnancy switch to LMWH + aspirin."},
    {q:"Which is the most active, treatment-responsive class of lupus nephritis?", options:["Class I","Class II","Class III–IV","Class VI"], answer:2, explain:"Classes 3–4 are the most active and offer the most room for treatment effect."}
  ]
},
{
  id: "rheum-scleroderma-fmf",
  name: "Scleroderma & Autoinflammatory (FMF)",
  blurb: "Systemic sclerosis subtypes, renal crisis, CREST; FMF, colchicine, AA amyloidosis.",
  flashcards: [
    {front:"Scleroderma (systemic sclerosis) — pathogenesis", back:"Rare autoimmune disease; vascular injury plus autoimmune activation drive fibrosis."},
    {front:"Diagnostic skin finding", back:"Diffuse thickening of the skin of the hands is diagnostic; more localized thickening and puffy fingers are also characteristic and can support diagnosis. If there is no finger thickening/swelling, doubt the diagnosis."},
    {front:"Other cutaneous features of scleroderma", back:"Poikiloderma (salt-and-pepper appearance), cutaneous calcinosis, telangiectasias, skin thickening around the mouth restricting opening, pitting scars, acro-osteolysis (shortening of the distal phalanx). Myositis in 10–15%; synovitis (overlap with RA) common."},
    {front:"Raynaud's phenomenon in scleroderma", back:"Present in ~95%, often the first sign; relatively severe, causing hard-to-heal fingertip ulcers. With characteristic antibodies and abnormal nailfold capillaroscopy → 80% go to scleroderma. Secondary Raynaud's tends to be painful, later-onset, possibly asymmetric, with abnormal capillaroscopy."},
    {front:"Nailfold capillaroscopy", back:"Microscopic examination of skin around the nail bed. Normal capillaries are straight, thin, dense. In scleroderma they are chaotic, enlarged, and hemorrhagic."},
    {front:"GI involvement in systemic sclerosis", back:"Esophageal dilatation → reflux and swallowing difficulty, impaired gut motility, and gastric telangiectasias prone to bleeding (watermelon stomach)."},
    {front:"Scleroderma renal crisis", back:"Emergency: hypertensive emergency + microangiopathic hemolytic anemia + rapidly progressive renal failure (may need dialysis). Very responsive to ACE inhibitors. Red flags: diffuse (not localized) disease, RNA polymerase III antibodies, and steroid use."},
    {front:"Leading cause of death in scleroderma", back:"Interstitial lung disease — now the leading cause of death; in ~50% of diffuse scleroderma (also notable in localized disease). Cardiac involvement with conduction disturbance can also occur."},
    {front:"Scleroderma subtypes", back:"Diffuse cutaneous (dcSSc) — widespread skin ± visceral organs, higher risk of renal crisis and ILD, involves proximal not just distal areas. Limited cutaneous (lcSSc) — limited skin but can involve viscera; Raynaud's years before other symptoms; includes CREST. Sine scleroderma — visceral only, no skin involvement."},
    {front:"CREST syndrome", back:"Calcinosis, Raynaud's phenomenon, Esophageal dysmotility, Sclerodactyly, Telangiectasia — a subtype of limited cutaneous scleroderma."},
    {front:"Scleroderma treatment principles", back:"No routine chronic ACEi (it can mask a renal crisis that then presents too late) — used only when crisis develops. Otherwise: prevent vasculopathy (e.g. CCB), immunosuppression/anti-fibrosis (MTX, rituximab), and symptomatic GI treatment."},
    {front:"Autoinflammatory vs autoimmune diseases", back:"Autoinflammatory diseases stem from the INNATE immune system, not adaptive immunity/autoantibodies. So there are no specific antibody tests — only inflammatory markers, clinical diagnosis, and genetic identification. Three mechanisms: inflammasomopathies, interferonopathies, NF-κB-opathies & TNF dysregulation."},
    {front:"FMF — genetics and mechanism", back:"Familial Mediterranean fever: the classic autoinflammatory disease, autosomal recessive, MEFV mutation encoding pyrin → impaired inflammasome. Common around the Mediterranean. The M694V mutation (esp. homozygous) causes a particularly severe phenotype."},
    {front:"FMF — when to suspect autoinflammatory disease", back:"Recurrent inflammatory attacks with no clear cause and quiet intervals; usually a similar family history; inflammatory markers only during attacks; and NO response to immunosuppression (suggesting it isn't classic autoimmune)."},
    {front:"FMF — clinical presentation", back:"Diagnosis is CLINICAL, not genetic. Most common feature: peritonitis (severe self-limited abdominal pain resolving over ~2 days). Also pleuritis and synovitis of large lower-limb joints (usually monoarthritis), often with erysipeloid erythema. Attacks tend to recur in the same pattern per person."},
    {front:"Tel Hashomer criteria for FMF", back:"Major: recurrent fever + serositis, AA amyloidosis, response to colchicine. Minor: recurrent fever, erysipelas-like erythema, first-degree family history. (Livneh criteria also used — allows incomplete attacks; more useful now that amyloidosis is rarer.)"},
    {front:"AA amyloidosis in FMF", back:"The most problematic complication (historically ~50%, now rare with colchicine). Deposited material is AA, formed from SAA (uncontrolled hepatic production, a non-specific inflammatory marker). Proteinuria is usually the first sign, then thyroid/GI/hepatosplenomegaly; likely progresses to renal failure needing dialysis. Treat the underlying disease (colchicine in FMF)."},
    {front:"FMF treatment", back:"Two aims: prevent amyloidosis and prevent/treat attacks. Minimum colchicine dose proven to prevent amyloidosis is 0.5 mg twice daily, given for life from diagnosis. Titrate up to prevent attacks (max ~3 mg; diarrhea limits dose). If attacks persist at max dose → biologic anti-IL-1 (IL-1 is the key cytokine). FMF is the only periodic fever that responds to colchicine; IL-1 inhibitors help all of them."},
    {front:"PFAPA", back:"An exception among periodic fevers — not genetic; recurrent pharyngitis roughly every 3 weeks lasting 3–6 days, usually resolving after childhood."}
  ],
  quiz: [
    {q:"Scleroderma renal crisis is treated very effectively with:", options:["Beta-blockers","ACE inhibitors","Steroids","Calcium channel blockers"], answer:1, explain:"Renal crisis (hypertensive emergency + microangiopathic hemolytic anemia + rapidly progressive renal failure) responds well to ACE inhibitors. Steroids are actually a red flag for developing it."},
    {q:"Which antibody is a red flag for scleroderma renal crisis?", options:["Anti-centromere","RNA polymerase III","Anti-Jo1","Anti-Sm"], answer:1, explain:"Red flags for renal crisis: diffuse disease, RNA polymerase III antibodies, and steroid use."},
    {q:"CREST syndrome's 'E' stands for:", options:["Enthesitis","Esophageal dysmotility","Eosinophilia","Erythema"], answer:1, explain:"CREST = Calcinosis, Raynaud's, Esophageal dysmotility, Sclerodactyly, Telangiectasia — a limited cutaneous scleroderma subtype."},
    {q:"The leading cause of death in scleroderma is:", options:["Renal crisis","Interstitial lung disease","Stroke","GI bleeding"], answer:1, explain:"ILD is now the leading cause of death, present in ~50% of diffuse scleroderma."},
    {q:"Autoinflammatory diseases like FMF differ from SLE/RA in that they arise from:", options:["Adaptive immunity and autoantibodies","The innate immune system (no specific antibodies)","T-cell mediated cytotoxicity","Complement deficiency alone"], answer:1, explain:"Autoinflammatory diseases stem from innate immunity — no specific autoantibody tests, so diagnosis is clinical/genetic with inflammatory markers."},
    {q:"FMF is caused by a mutation in which gene, encoding pyrin?", options:["MEFV","MEFV encodes pyrin — correct","NLRP3","TNFRSF1A"], answer:0, explain:"FMF is autosomal recessive from an MEFV mutation encoding pyrin, impairing the inflammasome. M694V (homozygous) is a severe phenotype."},
    {q:"The most common clinical feature of an FMF attack is:", options:["Arthritis of the hands","Peritonitis (self-limited severe abdominal pain)","Malar rash","Uveitis"], answer:1, explain:"Peritonitis is the commonest feature — severe abdominal pain resolving over ~2 days; also pleuritis and large-joint synovitis with erysipeloid erythema."},
    {q:"The minimum colchicine dose proven to prevent AA amyloidosis in FMF is:", options:["0.5 mg once daily","0.5 mg twice daily","1 mg twice daily","3 mg once daily"], answer:1, explain:"0.5 mg twice daily is the minimum amyloidosis-preventing dose, given for life; the dose is then titrated up to control attacks (max ~3 mg)."},
    {q:"Which periodic-fever syndrome uniquely responds to colchicine?", options:["TRAPS","PFAPA","FMF","CAPS"], answer:2, explain:"FMF is the only periodic fever that responds to colchicine; IL-1 inhibitors benefit all of them."}
  ]
}
];
