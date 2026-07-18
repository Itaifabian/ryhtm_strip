// Pulmonology chapter — extracted from user's lecture summary (pneumology.pdf).
// Faithful to notes; obvious ligature/OCR typos normalized (e.g. "e8ort"->"effort", "di8usion"->"diffusion").
const PULM_TOPICS = [
{
  id: "pulm-dyspnea",
  name: "Dyspnea",
  blurb: "Pathophysiology, causes by system, anamnesis, mMRC scale, physical exam.",
  flashcards: [
    {front:"Dyspnea — definition", back:"A subjective symptom of breathlessness; clinically relevant when disproportionate to physical effort or when it affects quality of life."},
    {front:"Dyspnea pathophysiology", back:"A neuronal phenomenon combining a severe urge to breathe ('air hunger') with high respiratory effort."},
    {front:"Cardiovascular causes of dyspnea", back:"CHF (leading cause), CAD, cardiomyopathies, valve disease, pericarditis."},
    {front:"Pneumo-respiratory causes by anatomic level", back:"Upper airway — asthma, COPD, bronchiectasis, bronchiolitis, foreign body. Lower airway — epiglottitis, angioedema, tumor/foreign body. Parenchymal — pneumonia, fibrosis, ILD, ARDS. Vessels — PE, pulmonary hypertension. Pleura — effusion, pneumothorax. Respiratory muscles — myasthenia gravis, ALS, myositis, Guillain-Barré. Chest wall — kyphoscoliosis."},
    {front:"Non-cardiopulmonary causes of dyspnea", back:"Anemia, hypo/hyperthyroidism, fever, pregnancy, stress."},
    {front:"Kussmaul breathing", back:"Deep, rapid breathing associated with metabolic acidosis (e.g. DKA)."},
    {front:"mMRC dyspnea scale (used mainly in COPD)", back:"0 = only with strenuous exercise. 1 = none on level ground/slight slope. 2 = slow walking with repeated stops. 3 = stops every ~100 m or few minutes; dyspnea while dressing."},
    {front:"Orthopnea vs platypnea", back:"Orthopnea — dyspnea lying flat (CHF, diaphragm paralysis). Platypnea — dyspnea when upright, relieved lying down (classically a right-to-left shunt)."},
    {front:"Key dyspnea history elements", back:"Duration/onset (acute suggests pneumonia, PE, ACS, pulmonary edema), dynamic pattern with rest/activity, flare pattern (asthma/COPD), PND, associated symptoms (cough, hemoptysis, chest pain, presyncope, fever), smoking/exposure history."},
    {front:"Speech dyspnea and clubbing on exam", back:"Inability to complete a sentence = severe dyspnea. Clubbing strongly suggests lung disease (cancer, chronic infection, fibrosis, IE, shunt, IBD) — should prompt a chest X-ray."},
    {front:"CPET and VO2max", back:"Cardiopulmonary exercise testing measures cardiac (ECG) and pulmonary (CO2/O2) responses during exercise. VO2max (peak oxygen consumption) reflects fitness and can help assess prognosis."}
  ],
  quiz: [
    {q:"On the mMRC dyspnea scale, a patient who stops to rest every ~100 meters or after a few minutes of walking is graded:", options:["0","1","2","3"], answer:3, explain:"Grade 3 = stopping every 100 m or after a few minutes, and dyspnea while dressing."},
    {q:"Platypnea — dyspnea that is worse sitting/standing and improves lying down — classically suggests:", options:["CHF","Diaphragm paralysis","A right-to-left shunt","COPD"], answer:2, explain:"Platypnea (with orthodeoxia) is classic for a right-to-left shunt, unlike orthopnea which suggests CHF or diaphragm paralysis."},
    {q:"Kussmaul breathing (deep, rapid respirations) is associated with:", options:["Metabolic alkalosis","Metabolic acidosis","Respiratory alkalosis","Normal physiology"], answer:1, explain:"Kussmaul breathing is a compensatory response to metabolic acidosis, e.g. DKA."},
    {q:"Clubbing on physical exam in a dyspneic patient should prompt which first-line imaging?", options:["Chest X-ray","Cardiac MRI","V/Q scan","Echocardiogram"], answer:0, explain:"Clubbing suggests underlying lung disease (cancer, chronic infection, fibrosis, IE, shunt, IBD) — start with a chest X-ray."},
    {q:"On CPET, VO2max reflects:", options:["Airway resistance only","Peak oxygen consumption — fitness and prognosis","Blood pressure response only","Lung volume"], answer:1, explain:"VO2max is the peak oxygen consumption during exercise, used to gauge fitness and prognosis."},
    {q:"Case: A patient with dyspnea is unable to speak in full sentences and is using accessory muscles. How severe is this?", options:["Mild","Severe dyspnea","No dyspnea","Cannot be assessed"], answer:1, explain:"Inability to complete a sentence (speech dyspnea) plus accessory muscle use indicates severe dyspnea requiring urgent assessment."},
    {q:"A patient presents with acute dyspnea, pleuritic chest pain, and hemoptysis. Which diagnosis must be considered urgently?", options:["Osteoarthritis","Uncomplicated cystitis","Pulmonary embolism","Fibromyalgia","Stable latent TB only"], answer:2, explain:"Acute dyspnea with pleuritic chest pain and hemoptysis is a classic presentation of pulmonary embolism, which must be urgently ruled out."}
  ]
},
{
  id: "pulm-hypoxia",
  name: "Hypoxemia & Hypoxia",
  blurb: "A-a gradient, hypoxemic mechanisms, shunt vs V/Q mismatch, HHT.",
  flashcards: [
    {front:"Hypoxemia vs hypoxia", back:"Hypoxemia = low arterial PaO2 (normal 80–100 mmHg). Hypoxia = reduced oxygen delivery to peripheral tissue — not necessarily from hypoxemia (can also be from anemia, poor perfusion, or histotoxic causes)."},
    {front:"Pulse oximeter saturation vs PaO2 (oxyhemoglobin curve landmarks)", back:"PaO2 ~90 mmHg → ~95% saturation. ~60 mmHg → ~90%. ~40 mmHg → ~75%."},
    {front:"Arterial blood gas normal values", back:"PaO2 >80 mmHg, PaCO2 35–45 mmHg, pH 7.35–7.45, bicarbonate 22–28 mEq/L."},
    {front:"PaCO2 as a ventilation marker", back:"PaCO2 is a direct measure of alveolar ventilation (freely diffusible from blood to alveoli)."},
    {front:"PiO2 and the alveolar gas equation", back:"PiO2 = (barometric pressure 760 − water vapor pressure 47) × FiO2 (0.2093) ≈ 150 mmHg at sea level. PAO2 ≈ PiO2 − PaCO2/R (≈100 mmHg normally), where R is the respiratory quotient (≈0.8 on a mixed diet, 0.7 fat-based, 1.0 carbohydrate-based)."},
    {front:"A-a gradient", back:"The alveolar–arterial oxygen gradient, reflecting diffusion and perfusion matching. A high gradient means blood isn't being oxygenated properly. Normal ≈ age/4 + 4."},
    {front:"Hypoxic hypoxemia", back:"Low FiO2 (e.g. high altitude) — PaO2 and PAO2 both fall, so the A-a gradient stays NORMAL."},
    {front:"Hypoventilation as a cause of hypoxemia", back:"Reduced alveolar ventilation raises PaCO2; A-a gradient is normal, and it responds well to supplemental oxygen. Causes: respiratory drive depression (drugs, trauma, disease), respiratory muscle disease, upper airway disease."},
    {front:"Obesity hypoventilation syndrome (OHS)", back:"Hypercapnia with BMI >30, often with PND that can progress to apnea. Treatment: weight loss, CPAP."},
    {front:"Diffusion deficiency as a cause of hypoxemia", back:"Normal O2 diffusion takes ~0.25 s, while capillary transit time is ~0.75 s. Prolonged diffusion time (ILD, fibrosis) causes deoxygenation especially with exertion (which shortens transit time further)."},
    {front:"Shunt physiology and oxygen response", back:"A right-to-left shunt mixes de-oxygenated blood into the arterial circulation, producing a HIGH A-a gradient. Supplemental oxygen will NOT correct it — the shunted blood never contacts alveolar oxygen. Can be intrapulmonary (consolidation, AVM) or extrapulmonary (cardiac defects)."},
    {front:"Hereditary hemorrhagic telangiectasia (HHT / Osler-Weber-Rendu)", back:"Autosomal-dominant disorder causing arteriovenous malformations. Symptoms: epistaxis, skin telangiectasia, visceral (lung/liver/brain) vascular malformations. Diagnosis: contrast (bubble) echocardiography. Complications: paradoxical embolism, high-risk pregnancy, HTN, GI bleeding. Treatment: embolization (preferred over surgery), low-dose aspirin, bevacizumab (anti-VEGF); antibiotic prophylaxis before major surgery to prevent brain abscess."},
    {front:"V/Q mismatch", back:"The most common cause of hypoxemia. Low V/Q = poor ventilation relative to perfusion (extreme = shunt). High V/Q = poor perfusion relative to ventilation (extreme = PE). Unlike shunt, V/Q mismatch DOES respond to supplemental oxygen — useful to tell them apart."}
  ],
  quiz: [
    {q:"A patient's hypoxemia does not improve with supplemental oxygen. This points to:", options:["Hypoventilation","V/Q mismatch","A right-to-left shunt","High altitude"], answer:2, explain:"A shunt bypasses ventilated alveoli entirely, so extra inspired oxygen cannot reach that blood — unlike V/Q mismatch or hypoventilation, which do respond to oxygen."},
    {q:"Ascending to high altitude causes hypoxemia via low FiO2. What happens to the A-a gradient?", options:["Rises sharply","Stays normal","Falls below normal","Cannot be calculated"], answer:1, explain:"In hypoxic hypoxemia, both PAO2 and PaO2 fall together, so the A-a gradient remains normal."},
    {q:"A patient with ILD desaturates specifically during exercise. The mechanism is:", options:["Shunt","Diffusion deficiency — exercise shortens capillary transit time below the diffusion time","Hypoventilation","Hypoxic hypoxemia"], answer:1, explain:"Normal diffusion takes ~0.25s vs a 0.75s transit time; ILD/fibrosis slows diffusion, and exercise shortens transit time further, unmasking hypoxemia."},
    {q:"Which diagnostic test is most useful for hereditary hemorrhagic telangiectasia (HHT)?", options:["Pulmonary function tests","Contrast (bubble) echocardiography","Sputum culture","Tuberculin skin test"], answer:1, explain:"Bubble-contrast echo is a highly accurate way to detect the AV malformations (e.g. pulmonary AVMs) of HHT."},
    {q:"Obesity hypoventilation syndrome is characterized by:", options:["BMI >30 with hypercapnia","Normal PaCO2 regardless of BMI","Hypocapnia","Restrictive pattern only, no hypercapnia"], answer:0, explain:"OHS = hypercapnia with BMI >30, often with PND progressing to apnea; treated with weight loss and CPAP."},
    {q:"Case: A patient's hypoxemia improves substantially with supplemental oxygen, and blood gas shows a normal A-a gradient with elevated PaCO2. What is the mechanism?", options:["Shunt","Hypoventilation","V/Q mismatch with high gradient","Diffusion defect"], answer:1, explain:"A normal A-a gradient with elevated PaCO2 and good response to oxygen is classic for hypoventilation."},
    {q:"A patient has PaO2 58 mmHg, PaCO2 60 mmHg, and a normal A-a gradient. What is the most likely mechanism of hypoxemia?", options:["Hypoventilation with good response to oxygen","Right-to-left shunt with no oxygen response","Diffusion impairment only","Pulmonary embolism with high V/Q","Cyanide poisoning"], answer:0, explain:"Elevated PaCO2 with a normal A-a gradient is the signature of hypoventilation, which responds well to supplemental oxygen."},
    {q:"A patient has severe hypoxemia that does not improve significantly with supplemental oxygen. What mechanism is most likely?", options:["Anemia","Shunt physiology","Hyperventilation","Low altitude exposure","Panic attack"], answer:1, explain:"A shunt bypasses ventilated alveoli entirely, so blood never contacts the supplemental oxygen — explaining the poor response."},
    {q:"A 35-year-old patient has recurrent epistaxis, mucocutaneous telangiectasias, and pulmonary AVMs causing hypoxemia. What inherited disease is most likely?", options:["Alpha-1 antitrypsin deficiency","Cystic fibrosis","Goodpasture syndrome","Hereditary hemorrhagic telangiectasia","Sarcoidosis"], answer:3, explain:"Recurrent epistaxis, mucocutaneous telangiectasias, and pulmonary AVMs together define hereditary hemorrhagic telangiectasia (HHT)."}
  ]
},
{
  id: "pulm-function",
  name: "Pulmonary Function Testing",
  blurb: "Spirometry, plethysmography, DLCO — distinguishing obstructive vs restrictive disease.",
  flashcards: [
    {front:"Spirometry — what it diagnoses", back:"Diagnoses obstructive lung disease by measuring forced expiratory and inspiratory volume and flow."},
    {front:"FEV1/FVC ratio", back:"The fraction of vital capacity exhaled in the first second. Normal ≈0.8; <0.7 indicates obstructive lung disease."},
    {front:"Asthma diagnosis on spirometry", back:"Low FEV1/FVC PLUS either: major improvement with a bronchodilator (>200 mL and >12% increase), or significant worsening with physical (10% drop) or pharmacologic challenge (PD20 <200 mcg / PC20 <8 mg/mL)."},
    {front:"COPD diagnosis on spirometry", back:"Fixed, largely irreversible decrease in FEV1/FVC with no significant response to bronchodilators."},
    {front:"Restrictive disease pattern on spirometry", back:"A normal (or steep) FEV1/FVC slope but with uniformly smaller lung volumes — needs plethysmography to confirm."},
    {front:"Time–volume and flow–volume graph patterns in obstruction", back:"Time–volume: prolonged expiration with a reduced slope (less volume exhaled per unit time). Flow–volume loop: reduced peak flow with a downsloping (scooped) expiratory curve."},
    {front:"Plethysmography and TLC", back:"A closed chamber measuring total lung volumes via pressure changes. TLC <80% predicted is required to diagnose restrictive lung disease, usually with a proportional fall in FEV1 and FVC (so FEV1/FVC is normal or even elevated)."},
    {front:"DLCO (diffusing capacity for CO)", back:"Patient inhales a small dose of CO, holds for 10 seconds, then the exhaled concentration is measured to estimate the functional alveolar surface area for gas exchange."},
    {front:"Low vs high DLCO — differential", back:"Low DLCO — ILD (with TLC <80%) or emphysema (FEV1/FVC <0.7); if isolated (normal spirometry/volumes) consider pulmonary hypertension, anemia, or early ILD. High DLCO — anti-GBM disease (Goodpasture's), shunt, or erythrocytosis."},
    {front:"Respiratory muscle testing", back:"Maximal inspiratory/expiratory pressure (MIP/MEP) assesses neuromuscular respiratory disease."},
    {front:"Mixed obstructive-restrictive disease", back:"Seen in sarcoidosis, other fibrotic diseases with comorbidities, and hypersensitivity pneumonitis. CPFE (combined pulmonary fibrosis and emphysema) — lower-lobe fibrosis with upper-lobe emphysema."}
  ],
  quiz: [
    {q:"An FEV1/FVC of 0.55 that improves by 250 mL and 15% after a bronchodilator most supports:", options:["Restrictive lung disease","Asthma","Fixed COPD","Normal spirometry"], answer:1, explain:"A low FEV1/FVC with a bronchodilator response >200 mL and >12% supports reversible obstruction — asthma."},
    {q:"A patient has a normal FEV1/FVC ratio but low FVC and FEV1. What confirms the diagnosis?", options:["Bronchodilator challenge","Plethysmography showing TLC <80% predicted","DLCO alone","Chest X-ray"], answer:1, explain:"Restrictive disease shows proportionally reduced volumes with a normal/high FEV1/FVC; plethysmography (TLC <80%) confirms it."},
    {q:"Isolated low DLCO with otherwise normal spirometry and lung volumes should raise suspicion for:", options:["COPD","Early ILD, pulmonary hypertension, or anemia","Asthma","Normal aging"], answer:1, explain:"An isolated low DLCO (without a restrictive or obstructive pattern) suggests early ILD, pulmonary hypertension, or anemia."},
    {q:"High DLCO is characteristically seen in:", options:["Emphysema","Pulmonary fibrosis","Anti-GBM disease (Goodpasture's), shunt, or erythrocytosis","COPD"], answer:2, explain:"High DLCO is seen with increased pulmonary blood/hemoglobin availability — anti-GBM disease, intracardiac/intrapulmonary shunt, or erythrocytosis."},
    {q:"CPFE (combined pulmonary fibrosis and emphysema) is characterized by:", options:["Upper-lobe fibrosis with lower-lobe emphysema","Lower-lobe fibrosis with upper-lobe emphysema","Diffuse emphysema only","Diffuse fibrosis only"], answer:1, explain:"CPFE combines lower-lobe fibrosis with upper-lobe emphysema."},
    {q:"Case: A patient has FVC and FEV1 both reduced proportionally, a normal FEV1/FVC ratio, and TLC 65% predicted on plethysmography. What is the pattern?", options:["Obstructive","Restrictive","Mixed","Normal"], answer:1, explain:"Proportionally reduced volumes with a normal/high FEV1/FVC and TLC <80% define a restrictive pattern."},
    {q:"Spirometry shows FEV1/FVC <0.70 with improvement after bronchodilator. Which threshold supports asthma?", options:["FEV1 increase of 5 mL only","FEV1 increase >12% and >200 mL","TLC <80% only","DLCO >150%","No change after bronchodilator"], answer:1, explain:"A bronchodilator response of >12% and >200 mL in FEV1, with a low FEV1/FVC, supports a diagnosis of asthma."}
  ]
},
{
  id: "pulm-obstructive",
  name: "Obstructive Lung Disease",
  blurb: "Upper vs lower airway obstruction, asthma, COPD/GOLD groups, bronchiectasis, alpha-1 antitrypsin.",
  flashcards: [
    {front:"Upper vs lower airway obstruction on flow-volume patterns", back:"Upper airway obstruction (pharynx to carina/main bronchi) — small, rounded flattening affecting BOTH inspiration and expiration (foreign body, external compression, iatrogenic). Lower airway obstruction — mostly affects expiration."},
    {front:"Stridor — localization", back:"Suggests glottic/subglottic narrowing. Isolated inspiratory stridor → laryngeal level. Expiratory stridor → tracheobronchial level."},
    {front:"Upper airway obstruction — differential", back:"Malignant: primary lung/bronchial tumor, metastasis, or external compression from mediastinal tumors. Non-malignant: post-intubation granulation tissue, foreign body (especially children)."},
    {front:"Asthma — definition and typical onset", back:"Episodic, paroxysmal airway obstruction, usually triggered by stressors (seasonal allergens, exercise); usually presents before age 40."},
    {front:"Asthma pharmacology — core agents", back:"Inhaled (ICS) or, in severe cases, systemic (prednisone) corticosteroids are always the core of therapy. LABA (e.g. formoterol) is combined with ICS; SABA (short-acting, e.g. salbutamol/Ventolin) is used less as monotherapy today. Montelukast (LTRA) is less effective and used less today."},
    {front:"Asthma biologics", back:"Anti-IgE (omalizumab), anti-IL-4/13 (dupilumab), anti-IL-5 (reslizumab/mepolizumab) — for severe disease."},
    {front:"Asthma treatment ladder", back:"Lifestyle change plus avoiding beta-blockers/aspirin/NSAIDs. Primary: ICS + LABA. Progressive disease: ICS + LABA + LAMA. Severe disease: biologics, azithromycin, roflumilast (PDE4 inhibitor)."},
    {front:"COPD definition and core treatment", back:"Combination of chronic bronchitis and emphysema, strongly linked to smoking. Core treatment is LAMA/LABA WITHOUT routine ICS."},
    {front:"GOLD groups (symptom/exacerbation-based)", back:"Group A — mild symptoms: LAMA or LABA. Group B — severe symptoms: LAMA+LABA combination. Group E — hospitalization or ≥2 exacerbations: LAMA+LABA, consider adding ICS."},
    {front:"COPD exacerbations", back:"Very common — at least one major exacerbation roughly every 3 years. Treatment: SABA plus systemic steroids for 5 days; consider antibiotics and respiratory support, trying to avoid intubation."},
    {front:"Bronchiectasis", back:"Inflamed bronchi with extensive structural damage; presentation resembles COPD; diagnosed by CT. Causes: chronic foreign-body obstruction, immunodeficiency, cystic fibrosis, primary ciliary dyskinesia, ABPA. Treatment: airway-clearance physiotherapy, infection prevention, mucus clearance (hypertonic saline, acetylcysteine)."},
    {front:"Alpha-1 antitrypsin deficiency", back:"COPD-like disease also causing liver cirrhosis and skin panniculitis; diagnosed by enzyme blood test. On CT, emphysema is BASAL/lower-lobe (vs upper-lobe in typical smoking COPD). Treatment: enzyme replacement. Suspect when COPD symptoms occur at a young age, with limited smoking history, or a family/liver-disease history."}
  ],
  quiz: [
    {q:"A flow-volume loop shows flattening of BOTH the inspiratory and expiratory limbs. This suggests obstruction at the level of the:", options:["Small distal airways","Alveoli","Upper airway (pharynx to main bronchi)","Pulmonary capillaries"], answer:2, explain:"Upper airway obstruction flattens both inspiratory and expiratory flow; lower airway obstruction mainly affects expiration."},
    {q:"Per GOLD groups, a COPD patient with ≥2 exacerbations in the past year should receive:", options:["ICS monotherapy","LAMA+LABA, considering added ICS","SABA only","No maintenance therapy needed"], answer:1, explain:"Group E (hospitalization or ≥2 exacerbations) is treated with LAMA+LABA, with ICS considered as an add-on."},
    {q:"On CT, emphysema affecting the LOWER lobes (rather than the typical upper-lobe pattern) should raise suspicion for:", options:["Typical smoking-related COPD","Alpha-1 antitrypsin deficiency","Asthma","Bronchiectasis"], answer:1, explain:"Alpha-1 antitrypsin deficiency classically causes basal/lower-lobe emphysema, unlike the upper-lobe predominance of ordinary smoking COPD."},
    {q:"Which biologic class targets IgE in severe asthma?", options:["Omalizumab","Dupilumab","Mepolizumab","Reslizumab"], answer:0, explain:"Omalizumab is anti-IgE; dupilumab targets IL-4/13; mepolizumab and reslizumab target IL-5."},
    {q:"Core maintenance therapy for COPD, in contrast to asthma, is:", options:["ICS monotherapy","LAMA/LABA without routine ICS","Montelukast","Anti-IgE biologic"], answer:1, explain:"COPD is primarily treated with LAMA/LABA; ICS is not routine (added selectively, e.g. GOLD group E)."},
    {q:"A COPD exacerbation is treated with a short-acting bronchodilator plus:", options:["A single dose of IV antibiotics only","Systemic steroids for 5 days","Long-term biologics","Immediate intubation"], answer:1, explain:"Exacerbations are treated with SABA plus systemic steroids for 5 days; antibiotics and respiratory support are considered as needed, trying to avoid intubation."},
    {q:"Case: A 45-year-old never-smoker develops COPD-like symptoms, and CT shows basal-predominant emphysema. Family history includes liver cirrhosis. What should be tested?", options:["Sweat chloride test","Alpha-1 antitrypsin level","ANCA","IgE level"], answer:1, explain:"Young age, minimal smoking history, basal emphysema, and a family history of liver disease should prompt alpha-1 antitrypsin deficiency testing."},
    {q:"A 66-year-old smoker has chronic dyspnea, fixed airflow obstruction, and poor bronchodilator response. What diagnosis is most likely?", options:["Asthma","Acute pericarditis","COPD","Pulmonary AVM","Acute cystitis"], answer:2, explain:"Chronic dyspnea with fixed (poorly reversible) airflow obstruction in a smoker is classic COPD, unlike the reversible obstruction of asthma."},
    {q:"A young patient has emphysema with minimal smoking history, lower-lobe disease, liver disease, and panniculitis. Which condition should be evaluated?", options:["Alpha-1 antitrypsin deficiency","Pulmonary embolism","Acute bronchitis only","Aortic stenosis","Rheumatic fever"], answer:0, explain:"Lower-lobe emphysema with minimal smoking history, liver disease, and panniculitis is the classic triad for alpha-1 antitrypsin deficiency."},
    {q:"A patient has chronic cough, recurrent infections, copious sputum, and CT showing dilated bronchi. What is the diagnosis?", options:["Pulmonary embolism","Aortic regurgitation","Acute pericarditis","Bronchiectasis","Giant cell arteritis"], answer:3, explain:"Chronic cough, recurrent infections, copious sputum, and dilated bronchi on CT define bronchiectasis."}
  ]
},
{
  id: "pulm-effusion",
  name: "Pleural Effusion",
  blurb: "Transudate vs exudate, Light's criteria, thoracocentesis indications.",
  flashcards: [
    {front:"Pleural fluid physiology", back:"Normally ~12 mL/day is produced (mostly by the parietal pleura) and absorbed by lymphatics. Effusion occurs when production exceeds absorption."},
    {front:"Pleural effusion symptoms and exam", back:"Cough, pleuritic pain (worse with breathing), dyspnea — usually without gas-exchange abnormality. Exam: decreased breath sounds, reduced fremitus, dull percussion over the effusion."},
    {front:"Pleural effusion imaging", back:"Chest X-ray can detect effusions >~175 mL. Ultrasound is the gold standard — detects effusion and guides thoracentesis. Chest CT has the highest sensitivity (detects very small effusions, also rules out PE)."},
    {front:"When to perform thoracentesis", back:"For essentially all effusions EXCEPT known heart failure with a symmetric, bilateral effusion (which can be treated empirically)."},
    {front:"Light's criteria (exudate vs transudate)", back:"Exudate if any of: effusion/serum protein ratio >0.5; effusion/serum LDH ratio >0.6; effusion LDH >2/3 the upper normal serum limit. If suspicion for exudate is high but all three are borderline, a serum–effusion protein gradient <3.1 g/dL supports exudate."},
    {front:"Transudate causes", back:"Heart failure (most common — supported by high BNP), cirrhosis, nephrotic syndrome, peritoneal dialysis, SVC obstruction."},
    {front:"Exudate causes", back:"Malignancy, infection (parapneumonic — most common exudate cause), PE, GI disease, connective-tissue disease, drug-induced (e.g. TKIs, nitrofurantoin), post-radiation."},
    {front:"Parapneumonic effusion and empyema", back:"Most common exudative effusion, from lung infection; can progress to empyema (infected pleural space). Thoracentesis/drainage indicated for pH <7.2, low glucose, positive culture, or frank pus."},
    {front:"Malignant pleural effusion", back:"From lung, breast, or lymphoma malignancy; diagnosed by cytology or pleural biopsy. Management options: indwelling pleural catheter (e.g. PleurX) or pleurodesis (surgical/chemical fusion of the pleural layers)."},
    {front:"TB pleural effusion", back:"Usually not empyema; a lymphocyte-predominant exudate with high ADA and IFN-gamma."},
    {front:"Chylothorax", back:"From thoracic-duct injury; diagnosed by effusion triglycerides >110 mg/dL; treated surgically."},
    {front:"Dressler syndrome", back:"Pleural effusion after cardiac surgery (e.g. CABG); responds to NSAIDs."}
  ],
  quiz: [
    {q:"Which Light's criterion, if met, classifies a pleural effusion as an EXUDATE?", options:["Effusion/serum protein ratio <0.3","Effusion/serum LDH ratio >0.6","Effusion glucose >100","Effusion pH >7.4"], answer:1, explain:"An effusion/serum LDH ratio >0.6 (or protein ratio >0.5, or effusion LDH >2/3 the normal serum upper limit) indicates an exudate."},
    {q:"Thoracentesis can reasonably be deferred in which scenario?", options:["New unilateral effusion of unclear cause","Known heart failure with a symmetric bilateral effusion","Suspected empyema","Suspected malignant effusion"], answer:1, explain:"Thoracentesis is performed for essentially all effusions except known HF with a symmetric effusion."},
    {q:"A parapneumonic effusion with pH 7.0 and frank pus should be managed with:", options:["Observation only","Oral antibiotics alone","Drainage (thoracentesis/chest tube)","NSAIDs"], answer:2, explain:"pH <7.2, low glucose, positive culture, or pus (empyema) are indications for drainage."},
    {q:"An effusion with triglycerides >110 mg/dL indicates:", options:["Empyema","Chylothorax (thoracic duct injury)","Malignant effusion","Transudate from heart failure"], answer:1, explain:"Elevated effusion triglycerides (>110 mg/dL) diagnose chylothorax, typically treated surgically."},
    {q:"A pleural effusion with high ADA and lymphocyte predominance suggests:", options:["Bacterial empyema","Tuberculosis","Chylothorax","Transudate from cirrhosis"], answer:1, explain:"TB pleural effusion is a lymphocytic exudate with high ADA and IFN-gamma, usually non-empyemic."},
    {q:"Case: A patient with cirrhosis and ascites develops a new symmetric bilateral pleural effusion. What is the most likely explanation?", options:["Malignant effusion — biopsy required","Hepatic hydrothorax (transudate) from the cirrhosis, analogous to a symmetric HF effusion","Empyema — urgent drainage","Chylothorax — surgery"], answer:1, explain:"A symmetric effusion with a clear transudative cause (here, cirrhosis/hepatic hydrothorax) may not need immediate thoracentesis unless the diagnosis is in doubt or infection is suspected — the same logic applied to HF effusions."},
    {q:"Thoracentesis shows pleural protein/serum protein ratio >0.5 and pleural LDH/serum LDH ratio >0.6. What does this indicate?", options:["Exudative pleural effusion","Normal pleural fluid","Pure cardiogenic transudate","Latent TB without effusion","Upper airway obstruction"], answer:0, explain:"Meeting either Light's criterion (protein ratio >0.5 or LDH ratio >0.6) classifies the effusion as an exudate."},
    {q:"A patient with pneumonia develops pleural fluid pH <7.2, low glucose, and positive culture. What is the next step?", options:["Observation only","Oral antihistamines","Drainage of complicated parapneumonic effusion/empyema","Immediate anticoagulation only","No therapy"], answer:2, explain:"A pH <7.2, low glucose, and a positive culture define a complicated parapneumonic effusion/empyema, which requires drainage."}
  ]
},
{
  id: "pulm-ild",
  name: "Interstitial Lung Disease",
  blurb: "IPF/UIP pattern, hypersensitivity pneumonitis, COP, diagnostic workup.",
  flashcards: [
    {front:"ILD — general features", back:"Strongly linked to exposures and smoking; often diagnosed late (once X-ray is already abnormal). Symptoms: progressive dyspnea, dry cough, systemic symptoms (fever, weight loss)."},
    {front:"IPF (idiopathic pulmonary fibrosis)", back:"The most common ILD, strongly associated with smoking; usually diagnosed on HRCT."},
    {front:"UIP pattern on HRCT", back:"Peripheral, basal, subpleural disease with 'honeycombing' (clusters of small cysts) and traction bronchiectasis."},
    {front:"UIP pattern on biopsy", back:"Heterogeneous regions combining interstitial inflammation, fibrotic foci, and honeycombing."},
    {front:"IPF treatment", back:"Pirfenidone (anti-fibrotic) and nintedanib (tyrosine-kinase inhibitor) slow progression and reduce flares. Combine with smoking cessation and supportive care (acid suppression, oxygen, diuretics)."},
    {front:"IPF acute flares", back:"Symptom worsening over >1 month with non-classical imaging progression (ground-glass opacities, new consolidations). Treatment: high-dose maintenance steroids, antibiotics; consider lung transplant."},
    {front:"Hypersensitivity pneumonitis (HP)", back:"Associated with allergen exposure (e.g. birds); upper lobes more involved than IPF. Can show ground-glass opacity combined with bronchiolitis. Treatment: remove the triggering exposure, prednisone."},
    {front:"Cryptogenic organizing pneumonia (COP)", back:"Intra-alveolar granulation tissue (Masson bodies); treated with steroids."},
    {front:"ILD physical exam and labs", back:"Dry 'Velcro' crackles at the lung bases, wheezing, clubbing (especially IPF, asbestosis). Blood gas is usually unaffected; check serology for connective-tissue disease."},
    {front:"ILD diagnostic workup", back:"HRCT is the gold-standard imaging (PET-CT if needed). Bronchoalveolar lavage (BAL) can help diagnose or exclude ILD; transbronchial biopsy (small samples) or cryobiopsy (larger samples) as needed."},
    {front:"ILD general treatment principles", back:"Remove the causative exposure where possible, respiratory support, anti-acid treatment, and physiotherapy for symptom relief."}
  ],
  quiz: [
    {q:"Which HRCT pattern — peripheral, basal, subpleural disease with honeycombing and traction bronchiectasis — is classic for IPF?", options:["NSIP pattern","UIP pattern","OP pattern","Tree-in-bud pattern"], answer:1, explain:"The usual interstitial pneumonia (UIP) pattern — peripheral/basal honeycombing and traction bronchiectasis — is the HRCT hallmark of IPF."},
    {q:"Which two drugs are used to slow progression of IPF?", options:["Prednisone + azathioprine","Pirfenidone + nintedanib","Rituximab + cyclophosphamide","Isoniazid + rifampin"], answer:1, explain:"Pirfenidone (anti-fibrotic) and nintedanib (TKI) reduce progression and flares in IPF."},
    {q:"An ILD with upper-lobe predominance, ground-glass opacity, and bronchiolitis, associated with bird exposure, suggests:", options:["IPF","Hypersensitivity pneumonitis","COP","Chylothorax"], answer:1, explain:"Hypersensitivity pneumonitis is linked to allergen exposure (e.g. birds), upper-lobe predominant, and treated by removing the exposure plus steroids."},
    {q:"Masson bodies (intra-alveolar granulation tissue) on biopsy are characteristic of:", options:["IPF","Cryptogenic organizing pneumonia (COP)","Hypersensitivity pneumonitis","Bronchiectasis"], answer:1, explain:"COP shows intra-alveolar granulation tissue (Masson bodies) and responds to steroids."},
    {q:"An IPF flare (symptom worsening over >1 month with new ground-glass/consolidation) is treated with:", options:["Pirfenidone alone","High-dose maintenance steroids and antibiotics; consider transplant","Observation only","Bronchodilators"], answer:1, explain:"Flares need high-dose steroids and antibiotics, with lung transplant considered in refractory cases."},
    {q:"Case: A patient with longstanding IPF has 3 weeks of worsening dyspnea and new diffuse ground-glass opacities on CT, without evidence of infection or heart failure. How is this managed?", options:["Normal IPF progression — no change in management","An acute IPF exacerbation — high-dose steroids, consider transplant","Bacterial pneumonia — antibiotics only","COP — no treatment needed"], answer:1, explain:"Rapid symptomatic worsening with new ground-glass opacities in IPF (without infection/HF) defines an acute exacerbation, treated with high-dose steroids and antibiotics, with transplant considered."},
    {q:"An older smoker has progressive dyspnea, dry cough, bibasilar Velcro crackles, clubbing, and HRCT showing basal subpleural honeycombing. What is the diagnosis?", options:["Asthma","Idiopathic pulmonary fibrosis with UIP pattern","COPD exacerbation only","Pulmonary embolism","Latent TB"], answer:1, explain:"Basal subpleural honeycombing on HRCT with Velcro crackles and clubbing is the classic UIP pattern of idiopathic pulmonary fibrosis."},
    {q:"A patient with bird exposure develops dyspnea, cough, upper-lobe interstitial findings, and ground-glass changes. What is the first management step?", options:["Immediate valve replacement","Lifelong anticoagulation","Remove the triggering exposure; consider prednisone","Nitrofurantoin","Pacemaker placement"], answer:2, explain:"Bird exposure with upper-lobe interstitial/ground-glass changes suggests hypersensitivity pneumonitis, first managed by removing the exposure and considering steroids."}
  ]
},
{
  id: "pulm-htn",
  name: "Pulmonary Hypertension",
  blurb: "Definition, 5 etiologic groups, right heart catheterization, treatment by group.",
  flashcards: [
    {front:"Pulmonary hypertension — definition", back:"Mean pulmonary artery pressure (mPAP) >20 mmHg."},
    {front:"Normal pulmonary pressures", back:"RA 2–8 mmHg; pulmonary artery 15–30 mmHg systolic, 4–12 mmHg diastolic; alveolar capillaries 2–10 mmHg."},
    {front:"Recruitment during exercise", back:"Previously under-perfused pulmonary arteries can be recruited during exercise, increasing vascular capacitance and limiting the rise in pulmonary pressure."},
    {front:"Distal arteriolar changes in PH", back:"Adventitial proliferation, medial hypertrophy, and fibrotic intimal thickening narrow the vessel lumen."},
    {front:"PH pathophysiology", back:"Chronically raised pressure causes RV strain, which can progress to right heart failure."},
    {front:"The 5 PH etiologic groups", back:"Group 1 (PAH) — pre-capillary; idiopathic, genetic, drug-induced, or from systemic disease (HIV, connective tissue disease, portal HTN). Group 2 — secondary to left heart failure (post-capillary, retrograde). Group 3 — secondary to lung disease/chronic hypoxia (severe, poor prognosis). Group 4 — secondary to chronic thromboembolic disease (CTEPH) or tumor. Group 5 — multifactorial (hematologic, systemic/metabolic disease, congenital heart defects)."},
    {front:"Diagnostic approach by PH group", back:"Group 2 — ECG, echo (no need for right heart catheterization once diagnosed). Group 3 — pulse oximetry, pulmonary function tests. Group 4 — CTA, V/Q scan."},
    {front:"Right heart catheterization", back:"The gold standard, measuring right-heart pressures and mPAP directly in the pulmonary artery."},
    {front:"Wedge pressure and PVR", back:"Wedge pressure estimates post-capillary (left-heart) pressure: <15 mmHg → pre-capillary hypertension; >15 mmHg → post-capillary. Pulmonary vascular resistance (PVR) = (mPAP − wedge pressure)/CO; PVR >3 Wood units confirms true pulmonary vascular hypertension."},
    {front:"Group 1 (PAH) treatment", back:"Combine 2 or 3 of: prostacyclin analogs, endothelin-receptor antagonists, and NO-pathway agents (PDE5 inhibitors, cGMP stimulators). Some PAH patients respond to CCBs — assessed by measuring mPAP after inhaled nitric oxide."},
    {front:"Group 2/3 PH treatment", back:"Treat the underlying disease (heart failure or lung disease/hypoxia) rather than the pulmonary pressure directly."},
    {front:"Group 4 (CTEPH) treatment", back:"Pulmonary endarterectomy (only for proximal, surgically accessible disease), balloon angioplasty, or a cGMP stimulator (riociguat)."},
    {front:"General PH measures and lung transplant", back:"Physiotherapy, avoid pregnancy, supplemental oxygen. Lung transplant is reserved for severe, treatment-refractory disease."}
  ],
  quiz: [
    {q:"Pulmonary hypertension is defined as a mean pulmonary artery pressure above:", options:["10 mmHg","15 mmHg","20 mmHg","30 mmHg"], answer:2, explain:"PH is defined as mPAP >20 mmHg."},
    {q:"A wedge pressure of 22 mmHg in a patient with pulmonary hypertension points to:", options:["Pre-capillary (group 1) disease","Post-capillary disease (e.g. left heart failure)","No pulmonary hypertension","CTEPH"], answer:1, explain:"Wedge pressure >15 mmHg indicates post-capillary pulmonary hypertension, typically from left heart disease."},
    {q:"Which PH group is diagnosed with CTA and V/Q scan, and treated (in proximal disease) with pulmonary endarterectomy?", options:["Group 1 (PAH)","Group 2 (left heart disease)","Group 3 (lung disease)","Group 4 (CTEPH)"], answer:3, explain:"Group 4 (chronic thromboembolic PH) is diagnosed with CTA/V-Q scan; proximal disease is treated with pulmonary endarterectomy."},
    {q:"In a patient with known left heart failure and pulmonary hypertension (group 2), the next diagnostic step is:", options:["Right heart catheterization is required in all cases","ECG and echocardiography — catheterization is not needed once group 2 is established","CTA","Lung biopsy"], answer:1, explain:"Once PH is attributed to left heart failure (group 2), right heart catheterization is not required."},
    {q:"Pulmonary vascular resistance (PVR) for confirming true pulmonary vascular hypertension is calculated as:", options:["mPAP × CO","(mPAP − wedge pressure) / CO","Wedge pressure / CO","mPAP / wedge pressure"], answer:1, explain:"PVR = (mPAP − wedge pressure) / cardiac output; a value >3 Wood units supports pulmonary vascular hypertension."},
    {q:"Case: A patient with severe COPD and chronic hypoxemia is found to have elevated pulmonary pressures on echo. Which PH group is this, and what is the primary treatment focus?", options:["Group 1 — start prostacyclin analogs","Group 3 — treat the underlying lung disease/hypoxia","Group 4 — pulmonary endarterectomy","Group 2 — treat with diuretics for HF"], answer:1, explain:"PH secondary to chronic lung disease/hypoxia is Group 3; management centers on treating the underlying pulmonary disease rather than PAH-specific therapy."},
    {q:"Right-heart catheterization shows mPAP >20 mmHg, wedge pressure <15 mmHg, and elevated PVR. What type of pulmonary hypertension is this?", options:["Postcapillary pulmonary hypertension from left heart disease","Normal pulmonary pressure","Isolated systemic hypertension","Precapillary pulmonary arterial hypertension","Acute asthma"], answer:3, explain:"An elevated mPAP with a normal (low) wedge pressure and elevated PVR defines precapillary (Group 1, PAH) pulmonary hypertension."},
    {q:"A patient has chronic thromboembolic pulmonary hypertension with proximal disease. What treatment is potentially curative?", options:["Inhaled albuterol only","Pulmonary endarterectomy","Mitral valve replacement","Colchicine","Nitrofurantoin"], answer:1, explain:"For proximal, surgically accessible CTEPH, pulmonary endarterectomy is potentially curative."}
  ]
},
{
  id: "pulm-hemoptysis",
  name: "Hemoptysis",
  blurb: "Massive/life-threatening hemoptysis, causes, bronchoscopic treatment.",
  flashcards: [
    {front:"Hemoptysis source and blood supply", back:"Blood from the lower airways (vs pseudohemoptysis from an upper-airway source). The bronchial (systemic) arteries supply only ~2% of pulmonary blood flow but account for ~90% of hemoptysis events."},
    {front:"Massive hemoptysis — definition and risk categories", back:"≥150 mL blood loss in 24 hours, OR >100 mL/hour. Now categorized as life-threatening vs non-high-risk rather than by volume alone."},
    {front:"Life-threatening hemoptysis features", back:"Airway obstruction, diffusion disruption (functional shunting), or hemodynamic instability (less common)."},
    {front:"Non-life-threatening hemoptysis causes", back:"Airway disease (bronchitis, bronchiectasis, tumor, Dieulafoy lesion), pulmonary vessel disease (HF, mitral stenosis, AVM, PE, aneurysm), parenchymal disease (pneumonia, connective-tissue disease, genetic disease, endometriosis), coagulopathy (antiplatelets, DIC, thrombocytopenia), trauma/iatrogenic, or cryptogenic (no identified cause)."},
    {front:"Dieulafoy lesion", back:"A vascular malformation that should NOT be biopsied — high bleeding risk."},
    {front:"Life-threatening hemoptysis causes", back:"Bronchiectasis, tuberculosis, and malignancy."},
    {front:"Hemoptysis imaging clues by etiology", back:"Aspergillus — halo sign. Vasculitis/diffuse alveolar hemorrhage — ground-glass opacities. TB — cavitations."},
    {front:"Hemoptysis diagnostic workup", back:"HRCT, bronchoscopy; angiography for chronic/recurrent hemoptysis."},
    {front:"Urgent hemoptysis management", back:"Position the patient with the bleeding side DOWN (protects the healthy lung from aspiration/ARDS); respiratory and hemodynamic support (fluids, blood); intubate with a large-bore tube to allow bronchoscopy if needed."},
    {front:"Bronchoscopic treatments for hemoptysis", back:"Iced/frozen saline lavage (induces vasoconstriction), adrenaline lavage, bronchial balloon tamponade, thrombolysis, or ablation (laser, argon plasma coagulation, cryotherapy)."}
  ],
  quiz: [
    {q:"Although bronchial (systemic) arteries supply only ~2% of pulmonary blood flow, they account for what fraction of hemoptysis?", options:["10%","50%","90%","100%"], answer:2, explain:"Bronchial arteries carry only ~2% of pulmonary blood flow but are responsible for ~90% of hemoptysis events."},
    {q:"A Dieulafoy lesion found as a cause of hemoptysis should be managed by:", options:["Immediate biopsy for diagnosis","Avoiding biopsy — high bleeding risk","Observation with repeat biopsy in 6 weeks","Oral antibiotics"], answer:1, explain:"Dieulafoy lesions (vascular malformations) should not be biopsied due to high bleeding risk."},
    {q:"In acute massive hemoptysis of known unilateral origin, correct positioning is:", options:["Bleeding side up","Bleeding side down","Fully upright","Trendelenburg only"], answer:1, explain:"Lying the patient with the bleeding side down protects the healthy contralateral lung from blood aspiration and ARDS."},
    {q:"A halo sign on CT in a patient with hemoptysis suggests:", options:["Tuberculosis","Aspergillus infection","Vasculitis","Chylothorax"], answer:1, explain:"The halo sign (ground-glass halo around a nodule) is characteristic of invasive Aspergillus infection."},
    {q:"Which bronchoscopic maneuver induces local vasoconstriction to control bleeding?", options:["Warm saline lavage","Iced/frozen saline lavage","Air insufflation only","Suction alone"], answer:1, explain:"Iced (frozen) saline lavage induces vasoconstriction to help control bleeding during bronchoscopy."},
    {q:"Case: A patient with known bronchiectasis develops hemoptysis at a rate of 120 mL/hour. How should this be classified and managed initially?", options:["Non-life-threatening — outpatient follow-up","Massive hemoptysis — urgent airway/hemodynamic stabilization, bleeding side down","Pseudohemoptysis — reassurance only","No action needed"], answer:1, explain:">100 mL/hour meets the definition of massive hemoptysis, requiring urgent stabilization, positioning with the bleeding side down, and likely bronchoscopy."},
    {q:"A patient coughs up 200 mL of blood in 24 hours and becomes hypoxemic. What is the best immediate positioning?", options:["Supine with legs elevated","Prone with head elevated","Left lateral position regardless of bleeding side","Upright only","Bleeding side down to protect the unaffected lung"], answer:4, explain:"200 mL in 24 hours meets the massive-hemoptysis threshold; positioning the bleeding side down protects the healthy contralateral lung from aspirated blood."}
  ]
},
{
  id: "pulm-tb",
  name: "Tuberculosis",
  blurb: "Latent vs active TB, TST/IGRA, treatment regimens, drug resistance.",
  flashcards: [
    {front:"TB epidemiology", back:"About 10 million cases per year worldwide, mostly in Africa."},
    {front:"Mycobacterium tuberculosis — key features", back:"Acid-fast bacillus, obligate intracellular, obligate aerobe. Spread by airborne aerosol; the organism is stable and can survive for hours after being expelled. Only pulmonary TB is infectious. Close contact is defined as >15 hours/week or >180 hours total."},
    {front:"TB exposure outcomes", back:"~70% of exposures result in immune clearance. Of primary infections, ~95% result in latent TB (granuloma-contained) and ~5% progress to active disease within months."},
    {front:"Latent TB reactivation risk factors", back:"Immunosuppression (including HIV), malignancy, diabetes, CKD, silicosis, severe malnutrition. A granuloma is composed of macrophages, giant cells, and lymphocytes."},
    {front:"Tuberculin skin test (TST/PPD)", back:"Uses delayed-type hypersensitivity to heat-inactivated TB antigen; induration is measured at 48–72 hours. False negatives: children, early infection, immunosuppression. False positives: BCG vaccination, non-tuberculous mycobacteria exposure. The two-step test reveals false negatives via a 'boosting' phenomenon."},
    {front:"TST positivity thresholds", back:">5 mm — HIV, close contacts, or immunosuppressed. >10 mm — healthcare workers. >15 mm — the general population."},
    {front:"IGRA (interferon-gamma release assay)", back:"Exposes the patient's T cells to TB antigens and measures IFN-gamma secretion. Higher specificity than TST but more expensive. Uses an RD1 antigen (a genomic segment unique to TB), a mitogen control (confirms T cells can respond) and a nil control (baseline IFN-gamma). Positive if test-tube IFN-gamma is >0.35 units AND ≥25% above nil."},
    {front:"IGRA/TST testing indications", back:"Healthcare workers, close contacts of active TB, prior to immunosuppressive treatment, and new HIV or silicosis diagnosis."},
    {front:"Latent TB treatment", back:"Isoniazid for 6–9 months, or rifampin for 4 months."},
    {front:"Active TB — distribution and presentation", back:"~70% pulmonary, ~30% extrapulmonary (CNS, lymph, pleura, bone, urinary tract, vertebra — Pott's disease); can also disseminate hematogenously (miliary TB). Symptoms: prolonged fever, weight loss, night sweats, plus site-specific symptoms."},
    {front:"Active TB chest X-ray findings", back:"Classically upper-lobe cavitations, hilar lymphadenopathy, granulomas. Early-progressed (primary) TB tends to affect the LOWER lobes and cause pleural effusions. HIV patients may have a normal chest X-ray."},
    {front:"Active TB diagnosis", back:"Sputum culture and PCR (also BAL if needed). Culture sensitivity is limited — 3 negative samples are needed to reasonably exclude TB. PCR also detects rifampin resistance. Extrapulmonary TB needs biopsy of the affected tissue, showing granulomas with a positive Ziehl-Neelsen stain."},
    {front:"Pleural TB", back:"Non-infectious; diagnosed by pleural puncture (exudate, lymphocyte predominance, very low glucose, high ADA). A hypersensitivity reaction in early infection — self-limited but can progress to pulmonary TB. Empyema can develop from a bronchopleural fistula in active TB and requires pleural drainage."},
    {front:"Standard active TB treatment", back:"DOT (directly observed therapy) in designated facilities. Initiation phase: isoniazid + rifampin + pyrazinamide + ethambutol for 2 months (6 days/week). Continuation phase: isoniazid + rifampin for 4 months (6 days/week) — total 6 months."},
    {front:"When to extend active-TB treatment", back:"Early cavitation or a still-positive sputum culture after the initiation phase → extend to a total of 9 months. Meningeal TB → 1 year. A positive sputum culture after 4 months of treatment defines treatment failure."},
    {front:"TB drug adverse effects", back:"Isoniazid — hepatotoxicity (liver enzymes), peripheral neuropathy. Ethambutol — optic neuritis."},
    {front:"Assessing TB treatment response", back:"Weight gain is a good sign of response; two consecutive negative sputum cultures confirm response."},
    {front:"TB drug-resistance categories", back:"RR — rifampin-resistant. MDR — resistant to isoniazid AND rifampin. Pre-XDR — MDR plus fluoroquinolone resistance. XDR — pre-XDR plus resistance to linezolid, moxifloxacin, or bedaquiline (concentrated in China, Russia, India)."},
    {front:"XDR-TB treatment", back:"A 4-drug combination for 18–24 months, or the shorter regimens BPaL (bedaquiline + pretomanid + linezolid, 6 months) or mBPaL (adds moxifloxacin)."}
  ],
  quiz: [
    {q:"What fraction of primary TB infections progress directly to active disease within months?", options:["~5%","~30%","~70%","~95%"], answer:0, explain:"~95% of primary infections result in contained latent TB; only ~5% progress to active disease within months."},
    {q:"A TST induration of 12 mm in a healthcare worker with no other risk factors is:", options:["Negative","Positive (threshold >10 mm for healthcare workers)","Indeterminate, repeat in 3 months","Positive only if >20 mm"], answer:1, explain:"The TST positivity threshold for healthcare workers is >10 mm."},
    {q:"Compared to TST, IGRA testing offers:", options:["Lower cost and lower specificity","Higher specificity but higher cost","No advantage","Only usable in children"], answer:1, explain:"IGRA has higher specificity than TST but is considerably more expensive."},
    {q:"A patient still has a positive sputum culture after 4 months of standard TB treatment. This defines:", options:["Normal response","Treatment failure","Latent TB","A need to stop treatment"], answer:1, explain:"A positive sputum culture at 4 months defines treatment failure and requires reassessment (e.g. resistance testing)."},
    {q:"XDR-TB is defined as resistance to rifampin and isoniazid plus:", options:["Only rifampin","Fluoroquinolone plus at least one of linezolid/moxifloxacin/bedaquiline","Ethambutol only","Pyrazinamide only"], answer:1, explain:"XDR-TB = MDR (isoniazid+rifampin resistant) plus fluoroquinolone resistance plus resistance to linezolid, moxifloxacin, or bedaquiline."},
    {q:"The BPaL regimen for highly drug-resistant TB combines bedaquiline and linezolid with:", options:["Pretomanid","Isoniazid","Rifampin","Ethambutol"], answer:0, explain:"BPaL = bedaquiline + pretomanid + linezolid, given for 6 months in highly resistant TB."},
    {q:"Case: A patient from a high-TB-prevalence country has a normal chest X-ray but is HIV-positive with a cough. Does a normal X-ray exclude active TB?", options:["Yes, always excludes TB","No — HIV patients may have a normal chest X-ray despite active TB","Only excludes latent TB","Only relevant for extrapulmonary TB"], answer:1, explain:"HIV-positive patients with active TB can have a normal chest X-ray, so a normal film does not exclude TB in this population — pursue sputum/other testing."},
    {q:"A patient has chronic fever, night sweats, weight loss, hemoptysis, and upper-lobe cavitary lesions. Which diagnostic approach is best?", options:["Multiple sputum samples for AFB smear/culture and PCR because sensitivity is limited","No testing if chest x-ray is abnormal","Urine dipstick only","Spirometry only","ANA only"], answer:0, explain:"Because single-sample culture sensitivity is limited, multiple sputum samples for AFB smear/culture and PCR are needed to reliably diagnose or exclude active TB."},
    {q:"A patient has a positive IGRA but no symptoms or imaging evidence of active tuberculosis. What is the diagnosis and treatment option?", options:["Active miliary TB; RIPE for 2 weeks only","Bacterial pneumonia; azithromycin only","Latent TB; isoniazid 6–9 months or rifampin 4 months","Pulmonary embolism; heparin","Lung cancer; chemotherapy"], answer:2, explain:"A positive IGRA without symptoms or imaging evidence of active disease defines latent TB, treated with isoniazid for 6–9 months or rifampin for 4 months."},
    {q:"A patient on RIPE therapy develops visual changes. Which medication is most likely responsible?", options:["Rifampin","Ethambutol","Isoniazid","Pyrazinamide","Vancomycin"], answer:1, explain:"Ethambutol is associated with optic neuritis/visual changes among the RIPE regimen drugs.", caseQ:true}
  ]
}
];
