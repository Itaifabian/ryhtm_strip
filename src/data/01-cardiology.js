// Cardiology learning data — extracted from user's lecture summary.
// Faithful to notes; obvious typos normalized (Takotsubo, Sgarbossa, Wellens, dyspnea, spasm).
const TOPICS = [
{
  id: "acs",
  name: "ACS — Overview & Classification",
  blurb: "Types of ACS, universal MI classification, ECG criteria for STEMI.",
  flashcards: [
    {front:"The three primary types of ACS", back:"STEMI (complete coronary occlusion, ST elevation), NSTEMI (troponin rise without ST elevation), and Unstable angina (transient ischemia, no cardiomyocyte death)."},
    {front:"STEMI — what does ST elevation indicate, and the time distinction?", back:"Complete coronary artery blockage. Transient = up to 20 minutes; persistent = more than 20 minutes."},
    {front:"Type I MI", back:"Ruptured plaque with thrombus formation. Can produce either STEMI or NSTEMI."},
    {front:"Type II MI", back:"Supply–demand mismatch — can occur without active coronary disease. Mostly NSTEMI but can be STEMI. Examples: GI bleed + tachycardia; drug-induced coronary vasospasm."},
    {front:"Type IV / V MI", back:"Treatment-associated ischemia — post-catheterization (IV) or post-CABG (V). Produces expected troponin elevation."},
    {front:"MINOCA", back:"Type I/II MI without obstructive findings on coronary catheterization. Causes include microvascular disease or idiopathic coronary spasm."},
    {front:"Takotsubo cardiomyopathy — cause and how to distinguish from MINOCA", back:"Catecholamine (stress)-induced cardiomyopathy. Distinguished from MINOCA using cardiac MRI."},
    {front:"STEMI ECG criteria (general)", back:"ST elevation in at least 2 adjacent leads: >1 mm in limb and chest leads (with special thresholds in V2–V3 and V7–V9)."},
    {front:"V2–V3 ST elevation thresholds", back:"Men <40 y: >2.5 mm. Men >40 y: >2 mm. Women: >1.5 mm."},
    {front:"V7–V9 ST elevation threshold", back:">0.5 mm (posterior leads)."},
    {front:"aVR elevation + V1 depression — significance", back:"Acute left main (LMCA)/Cx thrombosis, global ischemia (can be Type II MI), or triple-vessel disease."},
    {front:"Wellens syndrome", back:"Biphasic T waves in V2–V3 — associated with critical LAD stenosis."},
    {front:"De Winter T waves", back:"ST depression with hyperacute (tall) T waves — associated with LAD pathology (STEMI-equivalent)."},
    {front:"Pathological Q waves — timing and criteria", back:"Appear in late-arriving MI (hours post-AMI); always pathological in V1–V3. Criteria: >1 mm wide, >2 mm deep, or >25% of QRS complex size."},
    {front:"Cardiac biomarker for NSTEMI detection", back:"Troponin — combined with symptoms, ECG changes, and echo to assess severity."},
    {front:"Reperfusion timing: STEMI vs NSTEMI", back:"STEMI — immediate reperfusion (<90 min). NSTEMI — no proven benefit from early catheterization; up to 48 h (earlier if symptomatic/cardiogenic shock)."},
    {front:"ACS likelihood terminology", back:"Presentations are now also classified by likelihood — ACS non-likely, low-likely, or high-likely — based on symptoms and initial testing."},
    {front:"Atypical ACS symptoms", back:"Dyspnea, back pain, or ear/jaw pain, instead of classic chest pressure radiating to the arms/back."},
    {front:"Diagnosing STEMI with a new LBBB", back:"Standard ST-elevation criteria don't apply reliably — use Sgarbossa's criteria in a patient with an existing (or new) LBBB."},
    {front:"How often does NSTEMI show ischemic ECG changes?", back:"About 2/3 of NSTEMI cases show ischemic changes — ST depression, T-wave inversion, or Q waves."}
  ],
  quiz: [
    {q:"A patient with a known LBBB presents with chest pain. Which tool helps assess for STEMI on this ECG?", options:["Standard ST-elevation thresholds","Sgarbossa's criteria","Brugada algorithm","Wellens criteria"], answer:1, explain:"Standard ST-elevation criteria are unreliable with LBBB; Sgarbossa's criteria are used instead."},
    {q:"A 55-year-old man has troponin elevation but no ST elevation on ECG. Which ACS type best fits?", options:["STEMI","NSTEMI","Unstable angina","Prinzmetal angina"], answer:1, explain:"NSTEMI is defined by troponin elevation without ST elevation. Unstable angina would have no cardiomyocyte death (normal troponin)."},
    {q:"A patient with a large GI bleed and tachycardia develops troponin rise and chest pain with no plaque rupture. This is:", options:["Type I MI","Type II MI","Type IV MI","MINOCA"], answer:1, explain:"Type II MI is supply–demand mismatch. GI bleeding lowers oxygen supply while tachycardia raises demand — classic Type II."},
    {q:"For a 38-year-old man, what is the V2–V3 ST-elevation threshold for STEMI?", options:[">1 mm",">1.5 mm",">2 mm",">2.5 mm"], answer:3, explain:"Men under 40 require >2.5 mm in V2–V3. Over 40 it's >2 mm; women >1.5 mm."},
    {q:"Biphasic T waves in V2–V3 in a pain-free patient suggest:", options:["De Winter T waves","Wellens syndrome","Pericarditis","Posterior MI"], answer:1, explain:"Wellens syndrome — biphasic (or deeply inverted) T waves in V2–V3 signalling critical LAD stenosis."},
    {q:"Which test best distinguishes Takotsubo cardiomyopathy from MINOCA?", options:["Troponin","Coronary angiography","Cardiac MRI","Echocardiography"], answer:2, explain:"Cardiac MRI distinguishes stress (catecholamine)-induced Takotsubo from MINOCA."},
    {q:"aVR ST elevation with V1 depression most concerning for:", options:["Inferior STEMI","Left main / global ischemia","Pericarditis","Benign early repolarization"], answer:1, explain:"This pattern suggests acute LMCA/Cx thrombosis, global ischemia, or triple-vessel disease."}
  ]
},
{
  id: "nstemi",
  name: "NSTEMI ACS",
  blurb: "Chest-pain assessment, antiplatelets, anticoagulants, chronic therapy.",
  flashcards: [
    {front:"Key elements of chest-pain anamnesis in NSTE-ACS", back:"Describe the pain, time of onset, radiation to limbs/back, medical history, chronic drugs (e.g. aspirin), and prior chest-pain history."},
    {front:"Physical exam findings to seek in NSTE-ACS", back:"Heart sounds (murmurs), lung sounds (pulmonary edema), and limb exam (pitting edema = heart failure). Check BP and pulse for cardiogenic shock."},
    {front:"When to get a CT in suspected NSTE-ACS", back:"When there is high suspicion for PE or aortic dissection."},
    {front:"DAPT composition", back:"Dual antiplatelet therapy = aspirin (COX inhibitor) + a P2Y12 inhibitor."},
    {front:"Clopidogrel (Plavix) — class and pharmacology", back:"Thienopyridine, irreversible P2Y12 antagonist (effect 5–7 days). Prodrug with hepatic first-pass → unpredictable efficacy (hypo/hyper-responders)."},
    {front:"Prasugrel — key facts and where efficacy drops", back:"Thienopyridine, similar to clopidogrel but stronger antiplatelet effect. Reduced efficacy / caution: prior CVA or TIA (contraindication), age >75, weight <60 kg."},
    {front:"Ticagrelor (Brilinta) — class, dosing, adverse effects", back:"CPTP class, reversible P2Y12 antagonist, taken twice daily. Adverse effects: bradycardia, dyspnea, cough."},
    {front:"GP IIb/IIIa inhibitors — when used", back:"High bleeding risk — only given during PCI in high thrombus burden."},
    {front:"Unfractionated heparin (UFH) — half-life and use", back:"T½ ≈ 1 h; continuous treatment until asymptomatic."},
    {front:"LMWH (Clexane/enoxaparin) — use", back:"Longer half-life than UFH; subcutaneous injection twice daily."},
    {front:"Anticoagulant choice if history of HIT", back:"Fondaparinux or bivalirudin (avoid heparins)."},
    {front:"Cardiac demand-reducing drugs in NSTE-ACS", back:"Beta-blockers (negative chronotropy — mainly for tachycardic patients) and CCBs. Pain relief/vasodilation via opiates and nitrates."},
    {front:"Chronic therapy for Type I MI patients", back:"Statins + DAPT for 1 year."},
    {front:"Chronic antithrombotic in AFib + recent MI", back:"Triple therapy (NOAC + DAPT) for ~1 week, then step down to SAPT."},
    {front:"Add ACEi and beta-blockers/ARBs when?", back:"ACEi for HF/DM/HTN. Beta-blockers and ARBs when EF <40%."},
    {front:"Ultrasound role in NSTE-ACS", back:"Assesses hypokinetic regions, valve function, and pericardial effusion."},
    {front:"Catheterization strategy by risk in NSTE-ACS", back:"Unstable or high-risk patients are catheterized; non-high-risk patients can undergo elective catheterization."},
    {front:"Cardiac MRI role in NSTE-ACS", back:"Detects perimyocarditis and inflammation/edema suggestive of myocardial necrosis, when other tests are inconclusive."}
  ],
  quiz: [
    {q:"In NSTE-ACS, which imaging modality best detects perimyocarditis and myocardial inflammation/edema?", options:["Chest X-ray","Cardiac MRI","Stress ECG","Compression venous US"], answer:1, explain:"Cardiac MRI can detect perimyocarditis and inflammation/edema indicative of myocardial necrosis."},
    {q:"Which P2Y12 inhibitor is a reversible antagonist dosed twice daily?", options:["Clopidogrel","Prasugrel","Ticagrelor","Cangrelor"], answer:2, explain:"Ticagrelor is reversible and taken twice daily; adverse effects include bradycardia, dyspnea and cough."},
    {q:"Prasugrel is contraindicated in a patient with:", options:["Age <60","Prior stroke/TIA","Weight >60 kg","Diabetes"], answer:1, explain:"Prior CVA/TIA is a contraindication; efficacy also reduced with age >75 and weight <60 kg."},
    {q:"A patient with prior heparin-induced thrombocytopenia needs anticoagulation for NSTE-ACS. Best choice:", options:["Unfractionated heparin","Enoxaparin (LMWH)","Fondaparinux","Aspirin alone"], answer:2, explain:"With HIT history, avoid heparins — use fondaparinux or bivalirudin.", caseQ:true},
    {q:"Which makes clopidogrel's antiplatelet effect unpredictable?", options:["Reversible binding","Twice-daily dosing","Prodrug requiring hepatic activation","Direct thrombin inhibition"], answer:2, explain:"Clopidogrel is a prodrug with hepatic first-pass activation, producing hypo- and hyper-responders."},
    {q:"Standard chronic therapy after a Type I MI:", options:["Statin + DAPT for 1 year","ACEi alone for life","Warfarin for 3 months","Aspirin monotherapy indefinitely"], answer:0, explain:"Type I MI patients receive statins plus DAPT for 1 year."},
    {q:"NSTE-ACS demand reduction in a tachycardic patient is best achieved with:", options:["Nitrates","Opiates","Beta-blockers","GP IIb/IIIa inhibitors"], answer:2, explain:"Beta-blockers give negative chronotropy, most useful in tachycardic patients."}
  ]
},
{
  id: "stemi",
  name: "STEMI ACS",
  blurb: "Pathophysiology, biomarkers, reperfusion, complications.",
  flashcards: [
    {front:"STEMI pathophysiology — most common cause", back:"Ruptured plaque (~95% of cases). Rupture → platelet adhesion (vWF), degranulation, aggregation and coagulation (GP IIb/IIIa). Plaque monocytes produce tissue factor."},
    {front:"Classic vs atypical STEMI presentation", back:"Classic: persistent chest pain radiating to arms/jaw/back, with pallor, sweat, nausea, vomiting. Atypical (~15%): dyspnea, syncope, weakness/confusion."},
    {front:"Two major differentials for STEMI-like pain", back:"Aortic dissection (severe sharp pain, BP difference between arms) and PE (dyspnea, pleuritic pain)."},
    {front:"Biomarker: Myoglobin timeline", back:"Appears 2 h, peaks 12 h, normalizes 24 h. Low specificity."},
    {front:"Biomarker: CPK-MB timeline", back:"Appears 4–8 h, peaks 24 h, normalizes 2–3 days. Low specificity."},
    {front:"Biomarker: Troponin timeline", back:"Appears 3–4 h, peaks 4 days, normalizes 10–14 days. Gold standard."},
    {front:"Biomarker: LDH timeline", back:"Appears 48 h, peaks 3–5 days, normalizes 8 days."},
    {front:"'Time is myocardium' — infarct progression", back:"Ischemia begins around the blocked artery and spreads exponentially; after 6–12 h the region is fully necrotic."},
    {front:"Thrombolysis vs primary PCI", back:"Thrombolysis (tPA: plasminogen→plasmin) has lower efficacy, high recurrence risk, severe adverse effects. Primary PCI (mechanical revascularization) is always preferred."},
    {front:"Incomplete vs complete revascularization in PCI", back:"Incomplete = treat only the infarct-related artery (IRA) — used in cardiogenic shock. Complete = revascularize all blocked arteries, during primary PCI or up to 45 days post."},
    {front:"STEMI lipid target and escalation", back:"High-intensity statin, LDL target 55. No improvement at 6 wk → add ezetimibe; 6 more weeks → PCSK9 inhibitor (SC). Extreme-risk (MI on statin, additional artery disease): LDL target 40."},
    {front:"Additional STEMI drugs: beta-blocker, ACEi, MRA indications", back:"Beta-blockers if EF <40%. ACEi for symptomatic HF, HTN, DM, CKD. MRA if EF <40% + DM."},
    {front:"Killip score meaning", back:"Prognostic score predicting pump failure: I = no CHF; II = S3 gallop / basilar rales; III = pulmonary edema; IV = cardiogenic shock."},
    {front:"Pump failure vs cardiogenic shock thresholds", back:"Pump failure when 20–25% of heart mass damaged; >40% damage → cardiogenic shock."},
    {front:"RV infarction — signs and treatment", back:"~25% of RVI is hemodynamically significant (STE in V4R). Signs: hypotension, JVD, NO pulmonary edema. Treatment: urgent PCI, IV fluids to support LV filling, dobutamine (b1 agonist)."},
    {front:"Stent thrombosis timing and prevention", back:"Acute (<24 h) or subacute (<1 month). Prevented with DAPT."},
    {front:"STEMI differentials beyond dissection and PE", back:"Cardiac: aortic stenosis, pericarditis. Pulmonary: pneumothorax, pneumonia. GI: esophageal spasm, reflux, cholecystitis."},
    {front:"STEMI diagnostic criteria", back:"A major shift in cardiac biomarkers plus at least one of: myocardial ischemia signs, new ischemic ECG changes, new pathological Q waves, a new hypokinetic region on echo, or an intracoronary embolus on angiography."}
  ],
  quiz: [
    {q:"Confirming a STEMI diagnosis requires a major biomarker shift plus at least one supporting finding. Which qualifies?", options:["Normal echocardiogram","A new hypokinetic region on echo","Resolved chest pain","Normal ECG"], answer:1, explain:"Supporting findings include myocardial ischemia signs, new ischemic ECG changes, new pathological Q waves, a new hypokinetic region on echo, or an intracoronary embolus on angiography."},
    {q:"Which biomarker is the gold standard and stays elevated 10–14 days?", options:["Myoglobin","CPK-MB","Troponin","LDH"], answer:2, explain:"Troponin appears at 3–4 h, peaks ~4 days and normalizes over 10–14 days — the gold standard."},
    {q:"After roughly how long is the ischemic region fully necrotic in STEMI?", options:["1–2 h","3–4 h","6–12 h","24–48 h"], answer:2, explain:"Ischemia spreads exponentially; after 6–12 h the affected region is fully necrotic — 'time is myocardium'."},
    {q:"A STEMI patient in cardiogenic shock undergoing PCI — revascularization strategy?", options:["Complete revascularization always","Treat only the infarct-related artery","Thrombolysis first","No PCI, medical therapy only"], answer:1, explain:"In cardiogenic shock, incomplete revascularization (IRA only) is used."},
    {q:"Hypotension + JVD but clear lungs after inferior STEMI suggests:", options:["LV free-wall rupture","RV infarction","Pericarditis","Pulmonary edema"], answer:1, explain:"RV infarction: hypotension and jugular venous distension WITHOUT pulmonary edema; look for STE in V4R. Treat with fluids and dobutamine."},
    {q:"Killip class III corresponds to:", options:["No CHF","S3/basilar rales","Pulmonary edema","Cardiogenic shock"], answer:2, explain:"Killip: I none, II S3/rales, III pulmonary edema, IV cardiogenic shock."},
    {q:"LDL fails to reach target 6 weeks after high-intensity statin. Next step:", options:["Add ezetimibe","Start PCSK9 inhibitor","Double the statin","Stop statin"], answer:0, explain:"Add ezetimibe first; only after another 6 weeks without improvement do you add a PCSK9 inhibitor."},
    {q:"Reperfusion of choice for STEMI when available:", options:["Thrombolysis (tPA)","Primary PCI","CABG","Medical therapy"], answer:1, explain:"Primary PCI is always preferred over thrombolysis due to better efficacy and fewer adverse effects."}
  ]
},
{
  id: "chestpain",
  name: "Chest Pain (ER work-up)",
  blurb: "Risk stratification, serial troponins, functional & anatomical tests.",
  flashcards: [
    {front:"High-risk chest-pain features", back:"Prior AMI with similar symptoms, non-ST ECG changes with elevated biomarkers, or CHF."},
    {front:"Intermediate-risk chest-pain features", back:"Age >70, DM, PVD, ECG changes without cardiac biomarker elevation."},
    {front:"Low-risk chest-pain features", back:"Stable patient, normal ECG, atypical complaints."},
    {front:"How to rule out NSTEMI", back:"Two serial troponins 2–3 h apart. If no troponin dynamic and no ECG change → discharge or additional testing."},
    {front:"Drug-induced stress agents (if patient can't exercise)", back:"Dipyridamole (vasodilator) or dobutamine (positive inotrope)."},
    {front:"Stress ECG performance", back:"Targets 85% of max pulse; low specificity."},
    {front:"Stress echo — what it detects", back:"US before and after stress; detects hypokinesis near stenotic arteries."},
    {front:"CTA — nature, findings, contraindications", back:"Anatomical test; detects wall calcifications (not limited to luminal stenosis); >50% calcification is clinically significant. Contraindications: CKD, iodine allergy. Useful to rule out coronary disease, PE, or aortic dissection."},
    {front:"Chest-pain evaluation protocol (ACP, negative ECG + troponin)", back:"Overnight admission → repeat troponin. Positive = NSTEMI. Negative = CTA/MPI plus labs (lipids, HbA1c) for comorbidity assessment."}
  ],
  quiz: [
    {q:"Which patient is HIGH risk in chest-pain triage?", options:["Age 72, DM, ECG changes without biomarkers","Normal ECG, atypical complaints","Prior AMI, non-ST ECG changes + elevated biomarkers","Stable young patient"], answer:2, explain:"High risk = prior AMI with similar symptoms, non-ST changes with elevated biomarkers, or CHF. Age 70+/DM/ECG-changes-without-biomarkers is intermediate."},
    {q:"Correct approach to rule out NSTEMI in the ER:", options:["Single troponin","Two troponins 2–3 h apart","Immediate catheterization","Chest X-ray only"], answer:1, explain:"Serial troponins 2–3 h apart; no dynamic change plus stable ECG allows discharge or further testing."},
    {q:"A patient who cannot exercise needs stress testing. Pharmacologic vasodilator option:", options:["Dobutamine","Dipyridamole","Atropine","Adenosine antagonist"], answer:1, explain:"Dipyridamole is a vasodilator; dobutamine is the positive-inotrope alternative."},
    {q:"CTA is contraindicated in:", options:["Young low-risk patients","CKD or iodine allergy","Known coronary disease workup","Suspected aortic dissection"], answer:1, explain:"CKD and iodine allergy are contraindications (contrast-based anatomical test)."}
  ]
},
{
  id: "aortic",
  name: "Aortic Valve Disease",
  blurb: "Aortic stenosis & regurgitation — pathogenesis, murmurs, AVR/TAVI.",
  flashcards: [
    {front:"Aortic valve anatomy", back:"Semilunar valve with 3 cusps: right, left, and non-coronary."},
    {front:"Common causes of aortic stenosis", back:"Calcific AS (mechanical stress, inflammation, fibrosis → osteoblast formation), bicuspid valve (congenital NOTCH1 mutation, or acquired fusion of right+left cusps with raphe), rheumatic disease (childhood strep, AS decades later), congenital (quadricuspid/unicuspid → young-age AS)."},
    {front:"AS vs ACS — a key difference", back:"Unlike ACS, lifestyle change does NOT prevent AS progression."},
    {front:"Cardiac effects of AS", back:"Concentric LVH (low ventricular volume, high myocardial demand), LV diastolic dysfunction → ischemia and reduced compliance, raised LA pressure → pulmonary HTN, reduced coronary flow; severe AS → LV systolic dysfunction."},
    {front:"Severe AS quantitative criteria", back:"Valve area <1 cm² (normal 3–4), peak velocity >4 m/s, mean gradient >40 mmHg."},
    {front:"Low-gradient AS variants", back:"Classic low-flow low-gradient (low LVEF) and paradoxical low-flow low-gradient (low SV — hypertrophic ventricle reduces EDV). Use inotrope to reveal true flow."},
    {front:"Classic AS symptom triad", back:"Dyspnea, angina, syncope — after a long asymptomatic latent phase; onset marks decreased prognosis."},
    {front:"AS syncope mechanisms", back:"CO drop, orthostatic hypotension, atrial fibrillation, AV block (AVN calcification)."},
    {front:"AS physical exam signs", back:"Systolic murmur; prevented S2 splitting (delayed A2); pulsus parvus et tardus (slow, low-peaking pulse)."},
    {front:"AS imaging: TTE and cardiac CT", back:"TTE parasternal long axis for anatomy/calcification/severity (Ca hyperechoic/white); Doppler for Vmax → gradient and valve area; planimetry for manual area. CT calcium score >1000 = severe AS; also sizes valve for replacement."},
    {front:"AS treatment by stage", back:"Mild — echo every 6–12 mo, treat risk factors. Asymptomatic — no clear indication (stress echo / BNP may help). Symptomatic — AVR."},
    {front:"SAVR valve choice by age", back:"Biological valve (~10 y, no anticoagulation) vs mechanical (long-term, needs anticoagulation). Under 65 → mechanical (longer life expectancy)."},
    {front:"TAVI/TAVR — indications", back:"'Valve in valve' via PCI. For high surgical risk, older patients (>70), or prior cardiac surgery. Improvement expected after ~1 week."},
    {front:"Aortic regurgitation — pathophysiology", back:"Blood flows aorta→LV in diastole → increased EDV. Cor bovinum = massive eccentric hypertrophy (preserved volume). Later: fibrosis, reduced compliance, ischemia, HF."},
    {front:"AR peripheral signs", back:"Quincke sign (nail-bed pulsations), Traube sign ('pistol shot' over femorals), wide pulse pressure."},
    {front:"AR murmurs", back:"Early diastolic (decreases as pressures equalize), systolic (increased SV), and Austin Flint (mid-diastolic — regurgitant jet closing the mitral valve)."},
    {front:"AR — gold standard for volumes / when to intervene", back:"Cardiac MRI is gold standard for heart volumes (non-conclusive cases). Intervene (TAVI/SAVR) in dilated aorta, severe symptomatic AR, or severe asymptomatic AR with EF <50% / LVESD >50 mm."},
    {front:"Aortic stenosis / sclerosis epidemiology", back:"About 25% of people over 65 have aortic sclerosis and 1–2% have AS. Over age 75, roughly 35% have sclerosis and 12% have AS."}
  ],
  quiz: [
    {q:"Approximately what fraction of patients over 75 have aortic sclerosis?", options:["5%","15%","35%","60%"], answer:2, explain:"About 35% of patients over 75 have aortic sclerosis, and roughly 12% have aortic stenosis."},
    {q:"Which finding is characteristic of severe aortic stenosis?", options:["Wide pulse pressure","Pulsus parvus et tardus","Quincke sign","Austin Flint murmur"], answer:1, explain:"Pulsus parvus et tardus (slow, low-peaking pulse) and prevented S2 splitting are AS signs. Wide pulse pressure, Quincke and Austin Flint belong to AR."},
    {q:"Severe AS by echo is defined by valve area:", options:["<3 cm²","<2 cm²","<1 cm²","<0.5 cm²"], answer:2, explain:"Valve area <1 cm² (normal 3–4), peak velocity >4 m/s, mean gradient >40 mmHg."},
    {q:"A 60-year-old needs SAVR and wants to avoid a second operation. Best valve given age <65:", options:["Biological valve","Mechanical valve","TAVI valve-in-valve","No replacement"], answer:1, explain:"Under 65, mechanical valve is favored (longer durability matches longer life expectancy) despite needing anticoagulation."},
    {q:"Congenital bicuspid aortic valve is usually caused by a mutation in:", options:["MYBPC3","NOTCH1","Titin","FBN1"], answer:1, explain:"Congenital (true) bicuspid aortic valve is usually caused by a NOTCH1 mutation."},
    {q:"A mid-diastolic murmur from the regurgitant jet closing the mitral valve is called:", options:["Graham Steell","Austin Flint","Carey Coombs","Still murmur"], answer:1, explain:"Austin Flint murmur — mid-diastolic, caused by regurgitant AR blood closing the mitral valve."},
    {q:"Classic AS calcium score on cardiac CT indicating severe disease:", options:[">100",">500",">1000",">2000"], answer:2, explain:"Calcium score >1000 indicates severe AS; CT is used when US is non-definitive."},
    {q:"Paradoxical low-flow low-gradient AS occurs because:", options:["Low LVEF reduces flow","Hypertrophic ventricle reduces EDV/stroke volume","Bicuspid valve leaks","Coronary flow rises"], answer:1, explain:"A hypertrophic ventricle reduces EDV, lowering stroke volume so less blood reaches the valve despite preserved EF."}
  ]
},
{
  id: "syncope",
  name: "Syncope",
  blurb: "Reflex, orthostatic, and cardiac syncope; risk scoring; tilt test.",
  flashcards: [
    {front:"Definition of syncope", back:"Transient loss of consciousness from global cerebral hypoperfusion, quick onset (up to minutes), with spontaneous full recovery."},
    {front:"Presyncope", back:"Near-fainting with lightheadedness, dizziness and severe weakness (no full LOC)."},
    {front:"Non-syncope mimics", back:"Seizures, metabolic disorders (hypoglycemia, hypoxia, hyperventilation/hypocapnia), drug overdose/intoxication, CVA/TIA, cataplexy, psychogenic pseudosyncope (conversion)."},
    {front:"Syncope epidemiology (age peaks)", back:"Common in young women (~20 y) and the elderly (~80 y)."},
    {front:"Reflex (vasovagal) syncope", back:"Neural reflex causes hypotension; young healthy patients; associated with discomfort, often post-meal. Stress → catecholamines (prodrome) → increased vagal tone → hypotension + bradycardia."},
    {front:"Situational syncope", back:"Known triggers (micturition, defecation) activating mechanoreceptors."},
    {front:"Carotid sinus hypersensitivity", back:"ICA baroreceptor activation → syncope. Diagnosis: carotid sinus massage reproduces syncope (rule out carotid stenosis / recent CVA first). Treatment: carotid pacemaker."},
    {front:"Orthostatic syncope mechanism & test", back:"Standing pools blood; sympathetic reflex (vasoconstriction, tachycardia) is blunted (esp. elderly). Test: BP after 3 min sitting then 3 min standing. Positive: systolic drop >20, diastolic drop >10, or BP <90 with symptoms."},
    {front:"Orthostatic syncope — common etiologies", back:"Mostly drugs (alpha-blockers, diuretics, ACEi, clonidine), Parkinson, DM, alcoholism, B12 deficiency."},
    {front:"Cardiovascular syncope", back:"10–20% of cases; tachy/bradyarrhythmias (VT, complete AV block), AS, obstructive cardiomyopathy, PE. RVOT VT: young patients, tall inferior complexes, flat lead I."},
    {front:"High-risk syncope features", back:"Chest discomfort/pain, dyspnea, abdominal/headache, post-stress syncope, palpitations, syncope while lying down. Also: BP <90, GI bleeding, bradycardia <40, ECG findings, cardiac morbidity."},
    {front:"Low-risk syncope features", back:"Prodrome, triggered event fitting non-cardiac syncope, no physical findings, normal ECG, history of low-risk syncope."},
    {front:"Tilt test", back:"Patient held 'standing' ~20 min to trigger vasovagal response (isoket can induce). Reflex syncope = hypotension + bradycardia; orthostatic hypotension = tachycardia."},
    {front:"Reflex syncope treatment", back:"Education, recognize prodrome to avoid trauma, raise BP (lie down, squeeze feet to boost preload). Midodrine (alpha agonist)."},
    {front:"Orthostatic hypotension treatment", back:"Education (rise slowly), hydration + salt, reduce vasoconstrictive-drug intake, pressure socks, sleep position, midodrine."}
  ],
  quiz: [
    {q:"On tilt testing, hypotension WITH bradycardia indicates:", options:["Orthostatic hypotension","Reflex (vasovagal) syncope","Cardiac arrhythmia","Carotid stenosis"], answer:1, explain:"Reflex syncope = hypotension + bradycardia. Orthostatic hypotension produces compensatory tachycardia."},
    {q:"A positive orthostatic test requires a systolic drop of at least:", options:[">10 mmHg",">20 mmHg",">30 mmHg",">40 mmHg"], answer:1, explain:"Positive: systolic drop >20, diastolic drop >10, or BP <90 with symptoms."},
    {q:"Which is a HIGH-risk syncope feature?", options:["Clear prodrome","Normal ECG","Syncope while lying down","Post-meal trigger"], answer:2, explain:"Syncope while supine, palpitations, chest pain, dyspnea and post-stress episodes are high-risk (cardiac)."},
    {q:"First-line drug for both reflex syncope and orthostatic hypotension:", options:["Beta-blocker","Midodrine","Fludrocortisone","Digoxin"], answer:1, explain:"Midodrine (alpha agonist) is used in both after non-pharmacologic measures."},
    {q:"Before carotid sinus massage you must exclude:", options:["Anemia","Carotid stenosis / recent CVA","Diabetes","Hypothyroidism"], answer:1, explain:"Rule out carotid stenosis or recent CVA before massage to avoid embolic stroke."}
  ]
},
{
  id: "ohca",
  name: "OHCA / Sudden Cardiac Death",
  blurb: "SCD etiology, chain of survival, post-arrest syndrome, ICD.",
  flashcards: [
    {front:"SCD and aborted SCD", back:"SCD = cessation of biologic activity from sudden cardiac arrest. Aborted SCD = ROSC achieved."},
    {front:"SCD timeline", back:"Prodrome (worsening cardiac symptoms, days–months) → terminal event initiation (severe symptoms ~1 h) → SCD (LOC, loss of circulation, minutes) → biological death (failed CPR)."},
    {front:"SCD etiology overview", back:"25% of cardiovascular deaths; 80% secondary to CAD (more common in men). Non-cardiac (~1/3): trauma, intoxication, ARDS, pneumonia, asthma, sepsis, neurologic disease."},
    {front:"Cardiac SCD causes by age", back:"CAD (mostly >50), cardiomyopathies, myocarditis (mostly <50), valve disease, LQTS, Brugada, channelopathies."},
    {front:"Most common arrhythmia in SCD", back:"VT (most common); also TdP and bradyarrhythmias. VF as the INITIAL rhythm is uncommon."},
    {front:"Chain of survival", back:"Call EMS (ALS > BLS) → high-quality BLS (raises survival, reduces neuro complications) → early defibrillation → ACLS by paramedics → ER. TdP: high-dose magnesium can prevent SCD. Bradyarrhythmias: pacing. Then rehabilitation."},
    {front:"SCD prognosis", back:"~10% survival rate."},
    {front:"Post-cardiac-arrest syndrome window", back:"72 hours post-ROSC."},
    {front:"Post-arrest brain injury", back:"Dysregulated ICP, brain edema, post-ischemic neurodegeneration → prolonged coma/vegetative state, seizures, cognitive disorders, stroke, parkinsonism. Treat with hypothermia, airway/hemodynamic support, anti-seizure meds."},
    {front:"Post-arrest cardiac injury & treatment", back:"Global (often transient) hypokinesia, ACS, reduced CO/BP, arrhythmias. Treat: early revascularization (PCI), inotropes, IABP, LVAD, ECMO."},
    {front:"Temperature control after arrest", back:"Keep temperature below 37°C (improves survival, esp. first 72 h). Phases: induction (early aggressive cooling) → maintenance (48–72 h) → rewarming (slow, ~¼–⅓ °C/hour)."},
    {front:"PCI indication after SCD", back:"Only when SCD is associated with STEMI, persistent arrhythmias, or cardiogenic shock."},
    {front:"ICD implant indications", back:"Idiopathic VT/VF, post-SCD with incomplete revascularization, cardiomyopathies/channelopathies at high arrhythmia risk."}
  ],
  quiz: [
    {q:"The most common arrhythmia underlying SCD is:", options:["VF as initial rhythm","VT","Complete heart block","Atrial fibrillation"], answer:1, explain:"VT is most common; VF as the INITIAL rhythm is actually uncommon."},
    {q:"Target temperature strategy after ROSC:", options:["Warm to 38°C","Maintain below 37°C for the first 72 h","No temperature control","Rewarm rapidly"], answer:1, explain:"Keep below 37°C, especially in the first 72 h: induction, maintenance (48–72 h), then slow rewarming ¼–⅓°C/h."},
    {q:"PCI after SCD is indicated when the arrest is associated with:", options:["Any syncope","STEMI, persistent arrhythmia, or cardiogenic shock","Normal ECG","Non-cardiac cause"], answer:1, explain:"PCI only when SCD is linked to STEMI, persistent arrhythmias, or cardiogenic shock."},
    {q:"In a patient under 50, a likely cardiac cause of SCD is:", options:["CAD","Myocarditis/channelopathy","Aortic stenosis","LDH elevation"], answer:1, explain:"Under 50, myocarditis and channelopathies (and cardiomyopathies) predominate; CAD dominates over 50."},
    {q:"For refractory Torsades de Pointes threatening SCD, give:", options:["High-dose magnesium","Adenosine","Digoxin","Verapamil"], answer:0, explain:"High-dose magnesium can prevent SCD in TdP."}
  ]
},
{
  id: "afib",
  name: "Atrial Fibrillation",
  blurb: "Types, rate vs rhythm control, CHA₂DS₂ scoring, anticoagulation.",
  flashcards: [
    {front:"AFib pathophysiology", back:"Multiple re-entry cycles near the pulmonary veins generate an irregular, AV-node-dependent ventricular pace. High cardioembolic risk, especially from the left atrial appendage."},
    {front:"AFib epidemiology", back:"10–15% of patients over 75 years."},
    {front:"Three types of AFib", back:"Paroxysmal (up to 7 days), persistent (week–year, still convertible), permanent (chronic, no conversion potential)."},
    {front:"Rate-control agents", back:"Reduce AV-node conduction: beta-blockers, CCBs, digoxin. Ablation + pacemaker in severe non-responsive cases."},
    {front:"Rhythm-control options", back:"Restore sinus rhythm with drugs (amiodarone), electrical cardioversion, or ablation."},
    {front:"Electrical cardioversion — timing rule", back:"Only in new AFib (24–48 h max), after TEE to exclude clot. After cardioversion, NOACs for ~4 weeks."},
    {front:"CHADS₂ components", back:"CHF, Age >75, HTN, DM, Stroke (2 points). Score >2 = class I anticoagulation indication."},
    {front:"CHA₂DS₂-VASc additions", back:"Adds Vascular disease and Age 65–74. Score >1 = class IIa."},
    {front:"Warfarin (Coumadin) in AFib", back:"Vitamin-K antagonist, narrow INR target 2–3, many interactions. Indicated for mechanical valves / severe valve disease."},
    {front:"NOAC subclasses", back:"Factor Xa inhibitors — rivaroxaban, apixaban. Factor IIa (thrombin) inhibitor — dabigatran (not for CKD). Taken PO with broader therapeutic window."},
    {front:"LAA closure — indication", back:"Patients with high hemorrhage risk — prevents clot formation from the appendage."},
    {front:"PVI ablation", back:"Removes the fib source (pulmonary veins); can be first-line. Requires NOAC therapy."}
  ],
  quiz: [
    {q:"Electrical cardioversion of AFib without prior TEE is only acceptable if onset is within:", options:["24–48 hours","3 days","1 week","1 month"], answer:0, explain:"Only new AFib (24–48 h max); otherwise perform TEE first to exclude atrial clot. Give NOACs ~4 weeks after."},
    {q:"Which NOAC should be avoided in CKD?", options:["Rivaroxaban","Apixaban","Dabigatran","Edoxaban"], answer:2, explain:"Dabigatran (factor IIa inhibitor) is not used in CKD."},
    {q:"In CHADS₂, a prior stroke contributes how many points?", options:["1","2","3","0"], answer:1, explain:"Stroke = 2 points in CHADS₂; a score >2 gives a class I anticoagulation indication."},
    {q:"Preferred anticoagulant for AFib with a mechanical heart valve:", options:["Apixaban","Warfarin","Dabigatran","Rivaroxaban"], answer:1, explain:"Warfarin (INR 2–3) is indicated for mechanical valves and severe valve disease; NOACs are not."},
    {q:"Persistent AFib is defined as an episode lasting:", options:["Up to 7 days","Week to a year, still convertible","Chronic, non-convertible","Under 24 hours"], answer:1, explain:"Persistent = week to a year with conversion potential; paroxysmal up to 7 days; permanent = non-convertible."},
    {q:"Digoxin in AFib works primarily by:", options:["Restoring sinus rhythm","Reducing AV-node conduction (rate control)","Anticoagulation","Pulmonary vein isolation"], answer:1, explain:"Digoxin is a rate-control agent — it reduces AV-node conduction."}
  ]
},
{
  id: "arrhythmias",
  name: "Arrhythmias (WCT & WPW)",
  blurb: "Wide-complex tachycardia, Brugada algorithm, WPW pathways.",
  flashcards: [
    {front:"WCT clues favoring VT", back:"Prior MI or cardiomyopathy → VT until proven otherwise. Young, no heart disease, SVT history → likely SVT with aberration. Antiarrhythmics (flecainide, propafenone) → drug-related WCT."},
    {front:"Brugada algorithm criteria (favor VT)", back:"No RS complexes in precordial leads; R-to-S interval >100 ms in precordial leads; AV dissociation (capture beats); QRS >160 ms; northwest axis (−90 to 180); morphology (monophasic R or qR in V1, QS/RS in V6)."},
    {front:"WPW definition", back:"Congenital accessory pathway (bundle of Kent) causing pre-excitation and potential tachyarrhythmias."},
    {front:"WPW ECG criteria", back:"PR <120 ms + delta wave + wide QRS."},
    {front:"Accessory-pathway localization from delta wave", back:"Negative delta in aVL → left lateral AP (most common). Positive delta in V1 → left-sided AP. Negative delta in V1 → right-sided/septal AP."},
    {front:"AVRT circuit types", back:"Orthodromic — antegrade through AV node → narrow complex, loss of delta wave (90%). Antidromic — retrograde through AV node → wide-complex tachycardia."},
    {front:"Pre-excited AF danger", back:"Severe tachycardia that can degenerate into VF."},
    {front:"WPW investigation", back:"Exercise test — loss of pre-excitation favors low risk. Electrophysiology study — gold standard for risk stratification (AP refractory period, AF inducibility)."},
    {front:"WPW treatment", back:"Catheter ablation (95% success, <1% complications). Asymptomatic WPW → individualized after risk stratification. Pre-excited AF → DC cardioversion (unstable) or procainamide (stable)."},
    {front:"Drugs to AVOID in WPW", back:"Adenosine, verapamil, diltiazem, digoxin, beta-blockers (AV-nodal blockers can accelerate conduction down the accessory pathway)."}
  ],
  quiz: [
    {q:"Which drug class must be AVOIDED in pre-excited AF (WPW)?", options:["Procainamide","AV-nodal blockers (adenosine, verapamil, digoxin, beta-blockers)","Class Ia antiarrhythmics","Anticoagulants"], answer:1, explain:"AV-nodal blockers can push conduction down the accessory pathway → VF. Avoid adenosine, verapamil, diltiazem, digoxin, beta-blockers."},
    {q:"WPW ECG triad:", options:["Long PR + narrow QRS + U wave","PR <120 ms + delta wave + wide QRS","ST elevation + Q waves","Peaked T + wide QRS"], answer:1, explain:"WPW: short PR (<120 ms), delta wave, and wide QRS from pre-excitation."},
    {q:"A patient with prior MI presents with wide-complex tachycardia. Best assumption:", options:["SVT with aberration","VT until proven otherwise","Sinus tachycardia","Artefact"], answer:1, explain:"With prior MI or cardiomyopathy, treat WCT as VT until proven otherwise."},
    {q:"Orthodromic AVRT produces:", options:["Wide-complex tachycardia","Narrow complex with loss of delta wave","ST elevation","Complete AV block"], answer:1, explain:"Orthodromic AVRT goes antegrade through the AV node → narrow complex, delta wave lost (90% of AVRT)."},
    {q:"Gold-standard test for WPW risk stratification:", options:["Exercise test","Electrophysiology study","Echocardiography","Holter monitor"], answer:1, explain:"EP study is gold standard — measures accessory-pathway refractory period and AF inducibility."},
    {q:"A stable patient with pre-excited AF should be treated with:", options:["Adenosine","Verapamil","Procainamide","Digoxin"], answer:2, explain:"Stable pre-excited AF → procainamide; unstable → DC cardioversion. Avoid AV-nodal blockers."}
  ]
},
{
  id: "hf",
  name: "Heart Failure",
  blurb: "Staging, HFrEF/HFpEF, four-pillar therapy, devices, transplant.",
  flashcards: [
    {front:"Heart failure definition", back:"Clinical syndrome with structural and functional (systolic/diastolic) cardiac changes resulting in hypoperfusion of peripheral tissues."},
    {front:"HF stages A–D", back:"A = pre-HF (risk factors, e.g. DM/HTN). B = asymptomatic HF (incidental; drugs slow decline). C = symptomatic HF. D = refractory, progresses on treatment."},
    {front:"NYHA classes", back:"I = asymptomatic, no lifestyle change. II–III = symptoms on mild/intermediate exertion. IV = symptoms at rest / minimal effort."},
    {front:"Forward vs backward failure", back:"Forward = systolic HF (can't pump forward to periphery). Backward = diastolic HF (pulmonary hypertension)."},
    {front:"HFrEF vs HFpEF vs HFmrEF", back:"HFrEF — reduced EF, systolic, usually ischemic (men), eccentric remodeling, volume overload. HFpEF — preserved EF, poor prognosis, usually HTN (women), pressure overload. HFmrEF — 40–50%, early disease."},
    {front:"Right HF causes", back:"Left HF, cor pulmonale (pulmonary HTN), ischemia, ARVC (genetic myocardial fibrosis)."},
    {front:"BNP — what it signals", back:"Secreted by myocardium sensing increased wall tension; causes vasodilation and diuresis to reduce afterload. Rises with age; can be falsely normal with high fat mass."},
    {front:"H2FPEF score components", back:"Heavy (BMI>30), Hypertension (≥2 drugs), Fib (AF), Pulmonary HTN, Elder (>60), Filling pressure (>9)."},
    {front:"Four-pillar HFrEF therapy", back:"Beta-blocker, ACEi/ARNI, MRA, SGLT2i."},
    {front:"Ivabradine (Coralan) — mechanism & indication", back:"SA-node channel inhibitor. For NYHA II, EF <35%, sinus tachycardia >75, or repeated hospitalizations while on beta-blockers."},
    {front:"Entresto (ARNI) details", back:"Sacubitril (neprilysin inhibitor → raises BNP) + valsartan (ARB). Replaces ACEi in HF with EF <35%, NYHA II, GFR >30. When switching from ACEi, wait 36 h to prevent angioedema."},
    {front:"Vericiguat", back:"NO activator inducing vasodilation; used when optimal therapy fails."},
    {front:"ICD indications in HF", back:"Secondary prevention post-ventricular arrhythmia, or primary prevention with EF <35%, NYHA II, and ischemic history."},
    {front:"Biventricular (CRT) pacing", back:"For LBBB to improve synchronization; class IIa for incomplete LBBB / non-LBBB wide complex."},
    {front:"HFpEF treatment", back:"Only SGLT2i proven effective (IIa); otherwise treat the primary cause (HTN, cardiomyopathies, restrictive/systemic disease)."},
    {front:"Cardiac amyloidosis — bone scan grading & Tafamidis", back:"Bone scan detects ATTR: 0 none, 1 bone, 2 heart+bone, 3 hyper-signal on heart. Tafamidis stabilizes the tetramer (does NOT remove fibrils); prevents HF (mostly HFpEF) worsening."},
    {front:"I-NEED-HELP markers of advanced HF", back:"IV inotropes/diuretics, NYHA 3b/4, End-organ (liver BUN>43 / kidney Cr>1.8) dysfunction, EF<35%, Defibrillator shocks, Hospitalizations, Edema on escalating diuretics, Low BP with tachycardia, Prognostic-med intolerance."},
    {front:"LVAD basics", back:"Mechanical pump LV→aorta. Bridge to transplant or destination therapy. Continuous (non-pulsatile) flow. Contraindicated in severe right HF. Chronic therapy: warfarin + aspirin."},
    {front:"Heart transplant", back:"Gold standard; ~13-year life expectancy with high complication rate. Complications: graft failure, immunodeficiency issues. Contraindication: pulmonary hypertension. Chronic immunosuppression required."}
  ],
  quiz: [
    {q:"The four foundational drug classes for HFrEF are:", options:["Beta-blocker, ACEi/ARNI, MRA, SGLT2i","Digoxin, diuretic, nitrate, aspirin","CCB, statin, ARB, warfarin","Ivabradine, vericiguat, MRA, ARB"], answer:0, explain:"Guideline four-pillar therapy: beta-blocker, ACEi/ARNI, MRA, and SGLT2i."},
    {q:"When switching from an ACEi to Entresto (ARNI), you must:", options:["Start immediately","Wait 36 hours to avoid angioedema","Halve the ARB dose","Add a diuretic"], answer:1, explain:"A 36-hour washout prevents angioedema from overlapping ACEi + neprilysin inhibition."},
    {q:"Which HF phenotype is most associated with HTN in women and pressure overload?", options:["HFrEF","HFpEF","HFmrEF","Right HF"], answer:1, explain:"HFpEF: preserved EF, poor prognosis, typically HTN-driven in women with pressure overload."},
    {q:"Ivabradine is indicated when EF <35%, NYHA II, and:", options:["Atrial fibrillation","Sinus tachycardia >75 on beta-blockers","Bradycardia","Complete heart block"], answer:1, explain:"Ivabradine (SA-node inhibitor) needs sinus rhythm — used for sinus tachycardia >75 despite beta-blockade."},
    {q:"Tafamidis in ATTR cardiac amyloidosis:", options:["Removes amyloid fibrils","Stabilizes the transthyretin tetramer","Is a diuretic","Replaces transplant"], answer:1, explain:"Tafamidis stabilizes the native tetramer to slow progression but does NOT remove deposited fibrils."},
    {q:"A contraindication to heart transplant is:", options:["EF <35%","Pulmonary hypertension","Prior ICD","NYHA IV"], answer:1, explain:"Pulmonary hypertension is a contraindication; pulmonary resistance is followed before transplant."},
    {q:"Primary-prevention ICD in HF requires EF <35%, ischemic history, and:", options:["NYHA I","NYHA II","AFib","Prior stroke"], answer:1, explain:"Primary prevention: EF <35%, NYHA II, ischemic history. Secondary prevention follows a ventricular arrhythmia."}
  ]
},
{
  id: "mitral",
  name: "Mitral Valve Pathologies",
  blurb: "MR classification, acute vs chronic, surgery vs TEER.",
  flashcards: [
    {front:"Mitral valve anatomy landmarks", back:"Aorta at 12 o'clock, LAA at 11 o'clock; anterior and posterior leaflets. Chordae: primary (leaflet edge) and secondary (leaflet base). Annulus is an asymmetric saddle shape helping withstand high pressure."},
    {front:"Carpentier MR classification", back:"Type 1 — normal leaflet motion (annulus pathology). Type 2 — excess motion (prolapse). Type 3 — restricted motion: 3a in systole AND diastole (rheumatic), 3b in systole only (HF)."},
    {front:"Degenerative MR forms", back:"Mitral prolapse (Barlow disease) and fibroelastic deficiency (older age, end-systolic leakage)."},
    {front:"Acute MR — mechanism & consequence", back:"Retrograde flow raises atrial and pulmonary venous pressure → pulmonary edema. Mostly from ischemia/papillary muscle death — usually postero-medial papillary muscle (RCA)."},
    {front:"Acute MR treatment", back:"Immediate support (IABP, intubation) then surgery (valve repair/replacement)."},
    {front:"Chronic MR pathophysiology", back:"Progressive left atrial dilatation WITHOUT pressure rise (increased compliance); symptoms appear when compensation is exhausted."},
    {front:"Primary MR murmurs", back:"Mostly degenerative (prolapse >2 mm below annulus) → end-systolic murmur. Flail (loss of chorda → upward leaflet motion) → holosystolic murmur."},
    {front:"Primary MR treatment", back:"For symptomatic patients or asymptomatic with LV dysfunction: surgery (class I) or TEER (class IIa). Surgery = repair annulus (remove excess) or replace ± chordae."},
    {front:"TEER — what it is and indications", back:"Edge-to-edge clip creating a figure-8 to reduce leakage. Indications: NYHA II, moderate–severe FMR, HFrEF (EF 20–50%), LVESD <70 mm, SPAP <70 mmHg, no RV dysfunction / severe TR."},
    {front:"Secondary (functional) MR", back:"Ventricular remodeling after AMI causes FMR. Treat with guideline medical therapy (remodeling); if CABG-bound or no improvement → surgery."}
  ],
  quiz: [
    {q:"Acute severe MR after inferior MI most often results from rupture of which papillary muscle?", options:["Antero-lateral (LAD/Cx)","Postero-medial (RCA)","Both equally","Neither — annular dilation"], answer:1, explain:"The postero-medial papillary muscle has single (RCA) blood supply, making it vulnerable in ischemia."},
    {q:"A holosystolic murmur from a flail leaflet is caused by:", options:["Annular calcification","Loss of a chorda causing upward leaflet motion","Rheumatic fusion","Papillary hypertrophy"], answer:1, explain:"Flail = chorda loss → upward leaflet movement → holosystolic murmur (vs end-systolic in simple prolapse)."},
    {q:"Carpentier Type 3a (restricted motion in systole AND diastole) is typical of:", options:["Prolapse","Rheumatic disease","Functional MR","Annular dilation"], answer:1, explain:"Type 3a restricted motion in both phases is rheumatic; 3b (systole only) is HF-related."},
    {q:"Why is chronic MR often asymptomatic for years?", options:["The valve heals","LA dilates with increased compliance, avoiding pressure rise","Pulmonary edema is prevented by drugs","EF always stays normal"], answer:1, explain:"Progressive LA dilatation raises compliance so pressure stays low until compensation fails."},
    {q:"TEER is contraindicated when there is:", options:["NYHA II","EF 20–50%","Severe RV dysfunction / severe TR","LVESD <70 mm"], answer:2, explain:"TEER indications require no RV dysfunction and no severe TR, plus SPAP <70 and LVESD <70 mm."}
  ]
},
{
  id: "myocarditis",
  name: "Myocarditis",
  blurb: "Presentation, Lake Louise criteria, etiologies, biopsy, treatment.",
  flashcards: [
    {front:"Typical myocarditis patient", back:"Usually young, no cardiac background. Non-specific symptoms; physical exam helps differentiate from AMI, pneumonia, PE."},
    {front:"Myocarditis lab clues", back:"Eosinophils (allergic/parasitic myocarditis); electrolytes, kidney/liver function; thyroid (hypothyroidism association); troponin (mild vs MI but strongly associated)."},
    {front:"Myocarditis ECG & US findings", back:"ECG: tachycardia, PR depression, diffuse ST elevation. US: usually normal LV, sometimes global hypokinesis; rules out pericardial effusion."},
    {front:"Cardiac MRI in myocarditis", back:"Gold standard imaging — detects myocardial inflammation and fibrosis."},
    {front:"Lake Louise criteria", back:"Myocardial edema (T2), hyperemia (early gadolinium enhancement), necrosis (late gadolinium enhancement). Pericardial involvement raises sensitivity (~90%)."},
    {front:"Viral & toxic etiologies", back:"Coxsackie, parvovirus, herpes-6, HIV; cocaine intoxication; autoimmune disease."},
    {front:"Giant cell myocarditis", back:"Massive immune-cell clusters with necrosis; very severe presentation (MRI not recommended); needs intense immunosuppression."},
    {front:"Sarcoid myocarditis", back:"Sarcoidosis causes myocarditis in ~25%; biopsy shows non-caseating granuloma. If sarcoidosis proven in another organ, cardiac biopsy is unnecessary."},
    {front:"COVID-associated myocarditis", back:"Can occur from infection or vaccine; usually mild and self-limiting."},
    {front:"Myocarditis pathophysiology", back:"Pathogen localizes in myocardium, activates immune response; even after eradication, disproportionate activation and antigen mimicry sustain prolonged immune injury."},
    {front:"Myocardial biopsy — site & indication", back:"Usually the septum (MRI-guided). Indicated in acute, severe HF with LV dysfunction and arrhythmias."},
    {front:"Myocarditis treatment", back:"Mostly follow-up; severe cases need supportive care (treat primary infection), inotropic/mechanical support (IABP, Impella, ECMO). Immunomodulation: prednisone + cyclosporine/azathioprine. Avoid NSAIDs (aspirin acceptable for pain). Avoid strenuous effort/stress for months."}
  ],
  quiz: [
    {q:"The gold-standard non-invasive imaging test for myocarditis is:", options:["Echocardiography","Cardiac MRI","Chest X-ray","Coronary CT"], answer:1, explain:"Cardiac MRI detects inflammation and fibrosis; Lake Louise criteria apply."},
    {q:"Lake Louise 'late gadolinium enhancement' represents:", options:["Edema","Hyperemia","Necrosis","Normal myocardium"], answer:2, explain:"T2 = edema, early gadolinium = hyperemia, late gadolinium = necrosis. Pericardial involvement raises sensitivity."},
    {q:"Which myocarditis form is severe, discourages MRI, and needs aggressive immunosuppression?", options:["Viral myocarditis","Giant cell myocarditis","COVID-vaccine myocarditis","Eosinophilic myocarditis"], answer:1, explain:"Giant cell myocarditis — massive immune clusters with necrosis, very severe; intense immunosuppression required."},
    {q:"Cardiac biopsy for suspected sarcoid myocarditis can be skipped if:", options:["Troponin is normal","Sarcoidosis is already proven in another organ","ECG is normal","The patient is young"], answer:1, explain:"If sarcoidosis is proven elsewhere, cardiac biopsy is unnecessary; biopsy shows non-caseating granuloma."},
    {q:"Which analgesic is preferred for myocarditis pain?", options:["Ibuprofen","Naproxen","Aspirin","Indomethacin"], answer:2, explain:"NSAIDs are not recommended in myocarditis; aspirin may be used for pain relief."}
  ]
},
{
  id: "pericarditis",
  name: "Pericarditis & Tamponade",
  blurb: "ECG, treatment, tamponade triad, constrictive pericarditis.",
  flashcards: [
    {front:"Pericarditis pain vs AMI", back:"Sharp, retrosternal pain, unaffected by stress, changes with posture. Acute onset, lasts hours–days."},
    {front:"Pericarditis etiologies", back:"Idiopathic (80%), infectious (viral, bacterial, TB), autoimmune, drugs (cyclosporine, procainamide, hydralazine), cancer, post-MI, CKD, thyroid disease."},
    {front:"Pericarditis ECG", back:"Diffuse ST elevation with PR depression."},
    {front:"Pericarditis labs & imaging", back:"Mild troponin elevation, CRP, TSH, autoimmune serology. Chest X-ray usually normal (effusion if large). US shows pericardial effusion."},
    {front:"Pericarditis treatment", back:"High-dose NSAIDs (ibuprofen 600–800 mg + aspirin 1000 mg 3×/day). Colchicine to prevent recurrence (0.5 mg 2×/day young, 1×/day elderly). Steroids only if NSAIDs ineffective. Rilonacept (anti-IL1) rare/expensive."},
    {front:"Cardiac tamponade triad", back:"Cardiogenic shock, tachycardia, high JVP with muffled heart sounds."},
    {front:"Acute vs chronic effusion behavior", back:"Chronic — slow accumulation, symptoms only at high volume. Acute — rapid accumulation causes symptoms at relatively low volume."},
    {front:"Tamponade pathophysiology & Y descent", back:"Rising pericardial pressure collapses the right heart → cardiogenic shock. Y-wave flattening: high pericardial pressure prevents RV filling."},
    {front:"Pulsus paradoxus", back:"Inspiration lowers chest pressure allowing right-heart function; expiration worsens compression → BP drops on expiration."},
    {front:"Tamponade etiologies", back:"Chronic — mediastinal cancers (breast, lung, esophagus). Acute — AMI with necrosis, aortic dissection, iatrogenic (PCI)."},
    {front:"Tamponade treatment", back:"Supportive (fluids, medications); definitive = pericardial puncture (pericardiocentesis)."},
    {front:"Constrictive pericarditis", back:"~1% of acute pericarditis; complete LV–RV dissociation (PCWP vs LV diastolic mismatch) from a rigid pericardium."},
    {front:"Constrictive pericarditis signs", back:"Kussmaul sign (JVP doesn't drop on inspiration), exaggerated Y descent (raised RV pressure), square-root sign in diastole on catheterization."},
    {front:"Constrictive pericarditis treatment", back:"Early — like pericarditis. Late (>6 months) — surgical removal of excess pericardial tissue."}
  ],
  quiz: [
    {q:"The classic ECG of acute pericarditis shows:", options:["Localized ST elevation with reciprocal changes","Diffuse ST elevation with PR depression","Peaked T waves","Delta waves"], answer:1, explain:"Diffuse ST elevation with PR depression distinguishes pericarditis from localized STEMI changes."},
    {q:"Beck's-style tamponade triad includes hypotension/shock, muffled heart sounds and:", options:["Bradycardia","Elevated JVP","Wide pulse pressure","Bounding pulses"], answer:1, explain:"Triad: cardiogenic shock, tachycardia, and high JVP with muffled heart sounds."},
    {q:"Pulsus paradoxus in tamponade means BP drops during:", options:["Inspiration","Expiration","Standing","Exercise"], answer:1, explain:"Inspiration relieves compression; expiration worsens it, so BP drops on expiration."},
    {q:"Kussmaul sign (JVP fails to fall on inspiration) is characteristic of:", options:["Simple pericarditis","Constrictive pericarditis","Aortic stenosis","Acute MR"], answer:1, explain:"Constrictive pericarditis: rigid pericardium → Kussmaul sign, exaggerated Y descent, square-root sign."},
    {q:"First-line drug added to NSAIDs to prevent recurrent pericarditis:", options:["Prednisone","Colchicine","Rilonacept","Azathioprine"], answer:1, explain:"Colchicine prevents recurrence; steroids only if NSAIDs fail."},
    {q:"Definitive treatment for symptomatic cardiac tamponade:", options:["IV fluids","High-dose NSAIDs","Pericardial puncture","Colchicine"], answer:2, explain:"Pericardiocentesis (puncture) is definitive; fluids/meds are supportive."}
  ]
},
{
  id: "cmp",
  name: "Cardiomyopathies",
  blurb: "Dilated, hypertrophic, restrictive, ARVC — genetics & workup.",
  flashcards: [
    {front:"Cardiomyopathy definition & classification basis", back:"Intrinsic myocardial disease with progressive course; classified by morphology."},
    {front:"Dilated cardiomyopathy (DCM)", back:"Ventricular dilation (LV>RV), hypokinetic ventricles with normal wall thickness. Mainly systolic (minor diastolic) dysfunction."},
    {front:"DCM etiologies", back:"Ischemic (2/3), genetic, infections, myocarditis, toxicities, nutritional (thiamine, selenium, carnitine), peripartum, end-stage of other CMPs. Genetic DCM mostly titin mutations, may carry arrhythmias."},
    {front:"Hypertrophic cardiomyopathy (HCM)", back:"Increased LV thickness, normal-to-hyperkinetic LV with high filling pressure."},
    {front:"HOCM mechanism", back:"Systolic anterior motion (SAM) of the mitral valve causes LVOT obstruction with increased gradient (>50 mmHg)."},
    {front:"HCM genetics", back:"Up to 50% carry an autosomal-dominant sarcomere variant (MYBPC3, MYH7). Metabolic mimics: Fabry, LAMP2. Once a mutation is found, screen family members."},
    {front:"HCM complications & SCD risk", back:"High risk of ventricular tachyarrhythmias (especially in athletes). SCD risk score combines clinical signs to guide ICD. Prevent high-intensity physical activity."},
    {front:"HCM/HOCM treatment", back:"Beta-blockers, CCBs, nitrates, ranolazine (Na-channel blocker). HOCM adds myosin inhibitors, disopyramide (Na-channel blocker), septal reduction therapy (surgery)."},
    {front:"NDLVC and ARVC", back:"NDLVC — non-dilated LV dysfunction (hypokinetic). ARVC — RV (sometimes LV) myocardial fibrosis with arrhythmias (normokinetic)."},
    {front:"Restrictive cardiomyopathy (RCM)", back:"Reduced LV compliance, normokinetic with increased filling pressure. Causes: amyloidosis (ATTR/AL — PET CT), sarcoidosis (RCM/DCM — PET CT)."},
    {front:"CMP imaging: MRI & PET CT roles", back:"MRI — myocardial fibrosis, scarring, inflammation. PET CT — high sarcoidosis risk (early restrictive, late dilated/arrhythmogenic)."},
    {front:"CMP labs & other tests", back:"Troponin (high chronic secretion = high risk), BNP (raised pressure), CPK, LDH. ECG for amplitude (amyloidosis) and arrhythmias. Holter for chronic arrhythmias (multiple PVCs). Genetic workup mostly in HCM."},
    {front:"CMP exercise test finding", back:"Arrhythmias and BP response — HCM WITHOUT a BP rise on exercise = high risk."}
  ],
  quiz: [
    {q:"HOCM outflow obstruction is caused by:", options:["Aortic valve calcification","Systolic anterior motion (SAM) of the mitral valve","Pericardial constriction","Chordal rupture"], answer:1, explain:"SAM of the mitral valve narrows the LVOT, raising the gradient (>50 mmHg)."},
    {q:"The most common genetic cause of dilated cardiomyopathy is a mutation in:", options:["MYH7","Titin","MYBPC3","LAMP2"], answer:1, explain:"Genetic DCM is mostly due to titin mutations, sometimes with arrhythmias."},
    {q:"On exercise testing, which HCM finding flags HIGH risk?", options:["Normal BP rise","Failure of BP to rise","Sinus tachycardia","Normal ECG"], answer:1, explain:"In HCM, absence of a normal BP increase on exertion indicates high risk."},
    {q:"Restrictive cardiomyopathy is characterized by:", options:["Dilated hypokinetic ventricles","Reduced LV compliance, normokinetic, high filling pressure","Increased wall thickness with SAM","RV fibrosis with arrhythmias"], answer:1, explain:"RCM: stiff ventricle, reduced compliance, normokinetic, increased filling pressure — think amyloid/sarcoid."},
    {q:"ARVC is best described as:", options:["LV dilation with normal thickness","RV (sometimes LV) fibrosis with arrhythmias, normokinetic","Concentric LVH","Restrictive filling"], answer:1, explain:"ARVC: RV (± LV) myocardial fibrosis associated with arrhythmias; typically normokinetic."},
    {q:"Which sarcomere genes are classically linked to HCM?", options:["Titin & lamin","MYBPC3 & MYH7","NOTCH1 & FBN1","LMNA & SCN5A"], answer:1, explain:"Autosomal-dominant HCM commonly involves MYBPC3 and MYH7 sarcomere genes."}
  ]
},
{
  id: "pe",
  name: "Pulmonary Embolism",
  blurb: "Virchow's triad, D-dimer, risk stratification, PESI, treatment.",
  flashcards: [
    {front:"PE epidemiology", back:"3rd most common cardiovascular disease; part of the venous thromboembolic (VTE) spectrum (DVT, PE)."},
    {front:"Virchow's triad", back:"Thrombophilia, endothelial damage, and stasis (hemostasis)."},
    {front:"PE pathophysiology", back:"Unstable DVT clot embolizes → blocks pulmonary arteries → V/Q mismatch. Broad blockage (30–50% cross-section) raises pulmonary pressure → RV dysfunction (>40 mmHg) → collapse → reduced LV preload → cardiogenic shock."},
    {front:"PE clinical presentation", back:"Dyspnea, chest pain, pre-syncope/syncope, hemoptysis. Sometimes asymptomatic."},
    {front:"Pre-test probability scores", back:"Geneva / Wells scale — VTE risk based on differential, DVT signs, tachycardia, medical history."},
    {front:"PE ECG findings", back:"Tachycardia, RV strain — S1Q3T3, RBBB, T-wave inversion in V1–V4."},
    {front:"D-dimer thresholds & use", back:">500 (age-adjusted: >600 over 60, >800 over 80). Rules OUT PE (negative = unlikely) but cannot diagnose (low specificity)."},
    {front:"PE imaging", back:"CT pulmonary angiography — gold standard for perfusion mapping. Lung perfusion (V/Q) imaging for non-conclusive cases. Compression venous US detects DVT (30–50%); echo detects cardiac stress."},
    {front:"Echo signs in PE", back:"McConnell's sign (hypokinetic RV with apical sparing), D-shaped septum (RV pressure pushes septum). A normally functioning RV RULES OUT PE-caused cardiogenic shock — find another cause!"},
    {front:"PE risk stratification", back:"High — cardiogenic shock, hypotension, HF symptoms, positive biomarkers. Intermediate — RV strain + positive troponin. Mild — stable with troponin elevation. Low — no hemodynamic stress signs."},
    {front:"PESI class components", back:"Age >80, malignancy, CHF, chronic pulmonary disease, tachycardia >100, BP <100, saturation <90%."},
    {front:"Hestia criteria — purpose", back:"Decides if the patient can be discharged (only if ALL = No): needs thrombolysis/embolectomy, hemodynamic instability, active bleeding, respiratory support, severe pain, hepatic failure, pregnancy, HIT history."},
    {front:"PE treatment overview", back:"By risk: heparin/LMWH, NOAC, thrombolysis, or surgery. Thrombolysis in unstable high-risk without contraindications (CVA, CNS malignancy, active bleeding). Surgery = embolectomy for proximal emboli + anticoagulation."},
    {front:"CDI, IVC filters", back:"CDI — catheter to remove emboli (CDE) or inject thrombolytics directly (CDT). IVC filter prevents emboli reaching the heart but does NOT replace anticoagulation."},
    {front:"Anticoagulation duration & choice", back:"Initial phase 5–21 days; some long-term (3–6 months) or extended. Coumadin for APLA, mechanical valve, CKD. NOACs for prolonged therapy (reduced dose possible for intermediate risk)."}
  ],
  quiz: [
    {q:"A negative D-dimer is most useful to:", options:["Confirm PE","Rule out PE in low-probability patients","Grade RV strain","Choose anticoagulant"], answer:1, explain:"D-dimer has low specificity — a negative result helps rule PE out, but it cannot diagnose."},
    {q:"The gold-standard imaging test for diagnosing PE is:", options:["V/Q scan","CT pulmonary angiography","Compression venous US","Chest X-ray"], answer:1, explain:"CTPA is gold standard for mapping pulmonary perfusion; V/Q is for non-conclusive cases."},
    {q:"A normally contracting RV on echo in suspected massive PE means:", options:["Confirm PE","PE-caused cardiogenic shock is ruled out — seek another cause","Start thrombolysis","Insert IVC filter"], answer:1, explain:"A functioning RV rules out PE as the cause of cardiogenic shock — look for an alternative explanation."},
    {q:"Classic PE ECG strain pattern:", options:["Delta wave","S1Q3T3 with RBBB","Diffuse ST elevation","Peaked T waves"], answer:1, explain:"RV strain shows S1Q3T3, RBBB, and T-wave inversion in V1–V4, plus tachycardia."},
    {q:"An IVC filter:", options:["Replaces anticoagulation","Prevents emboli reaching the heart but does NOT replace anticoagulation","Dissolves clots","Is first-line for all PE"], answer:1, explain:"IVC filters physically block emboli but anticoagulation is still required."},
    {q:"Thrombolysis in PE is reserved for:", options:["All PE patients","Unstable high-risk patients without contraindications","Low-risk outpatients","DVT without PE"], answer:1, explain:"Thrombolysis is for unstable, high-risk PE without contraindications (e.g. CVA, active bleeding, CNS malignancy)."},
    {q:"McConnell's sign on echo refers to:", options:["D-shaped septum","Hypokinetic RV free wall with apical sparing","LV hypertrophy","Pericardial effusion"], answer:1, explain:"McConnell's sign is RV free-wall hypokinesis with relative apical sparing, suggesting acute PE strain."}
  ]
}
];
