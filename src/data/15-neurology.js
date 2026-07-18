// Neurology chapter — extracted from a neurology course summary covering the localization-based
// approach to neurological cases, altered mental status/coma/delirium, dizziness & vertigo, and
// acute ischemic/hemorrhagic stroke. Quiz items carry an optional `ref` field — the index into
// that topic's own `flashcards` array that the question is grounded in — used by the app's
// "View in Reference" deep link.
const NEURO_TOPICS = [
{
  id: "neuro-localization-approach",
  name: "Neurological Localization & the UMN/LMN Approach",
  blurb: "Using lesion site and symptom time-course to localize neurological disease, and distinguishing upper motor neuron, lower motor neuron, myopathic, and psychogenic weakness.",
  flashcards: [
    {front:"What are the two key axes used to diagnose a neurological complaint?", back:"The localization of the lesion within the nervous system, and its time course (e.g. hyperacute, acute, subacute, or chronic)."},
    {front:"What is the classic presentation of a hemispheric lesion?", back:"Contralateral deficits in facial and peripheral (limb) muscles."},
    {front:"What symptoms suggest a cerebral (cortical) lesion?", back:"Cognitive/mental changes, seizures, and movement disorders."},
    {front:"What is the classic presentation of a brainstem lesion?", back:"Ipsilateral facial weakness with contralateral peripheral (limb) weakness — a \"crossed\" pattern."},
    {front:"What is the classic presentation of a spinal cord lesion?", back:"Lower limb deficits, usually with sensory involvement, and incontinence."},
    {front:"How does a nerve root lesion typically present, versus a peripheral nerve lesion?", back:"A root/nerve lesion causes a single-limb deficit that can follow a specific myotome/dermatome. A peripheral nerve lesion causes weakness in the middle/distal part of a limb with loss of the corresponding reflex."},
    {front:"What is the classic pattern of a polyneuropathy, and what is a classic example?", back:"A systemic, symmetric deficit in a \"gloves and socks\" (distal, length-dependent) distribution — classically diabetic neuropathy."},
    {front:"How does myopathy typically present, and how does this differ from a neuromuscular junction (NMJ) lesion like myasthenia gravis?", back:"Myopathy causes symmetric, proximal weakness. NMJ lesions (e.g. myasthenia gravis) cause weakness that characteristically worsens with physical effort (fatigability)."},
    {front:"What four features are used to distinguish upper motor neuron (UMN), lower motor neuron (LMN), myopathic, and psychogenic weakness on exam?", back:"The presence of atrophy/fasciculation, muscle tone, reflexes, and the pattern of spread."},
    {front:"What are the exam findings of an upper motor neuron (UMN) lesion?", back:"No atrophy or fasciculation, spastic tone with hyperactive reflexes, a pyramidal/regional pattern of spread, and a positive Babinski sign."},
    {front:"What are the exam findings of a lower motor neuron (LMN) lesion?", back:"Common atrophy and fasciculation, decreased tone with hypoactive reflexes, and a distal/segmental pattern of spread."},
    {front:"What are the exam findings of myopathic weakness?", back:"Mild atrophy/fasciculation, normal-to-decreased tone and reflexes, and a proximal pattern of spread."},
    {front:"What are the exam findings of psychogenic weakness?", back:"No atrophy or fasciculation, variable tone and pattern of spread, and normal reflexes."},
    {front:"How do the typical time courses of a hyperacute, acute, subacute, and chronic neurological presentation differ, with examples?", back:"Hyperacute (rapid onset): can be self-limited (migraine) or severe (stroke, seizure), and can also reflect a metabolic disorder or intoxication. Acute (hours to days): multiple sclerosis, infections. Subacute (weeks to months): B12 deficiency. Chronic (years): neurodegenerative disorders."},
    {front:"Why is \"confusion\" a nonspecific chief complaint in neurology?", back:"It can be mistaken for aphasia, a psychological disorder, amnesia, or thiamine (B1) deficiency, so the underlying process must be clarified rather than taken at face value."},
    {front:"Why is only true muscle weakness (not generalized weakness/fatigue) considered directly relevant to CNS localization?", back:"Generalized weakness/fatigue has many non-neurological causes, while true muscle weakness is the finding that localizes to the motor pathway."},
    {front:"What does the ABC2 initial evaluation stand for in a neurological emergency?", back:"Airway, Breathing, Circulation, and Cognitive assessment."}
  ],
  quiz: [
    {q:"A patient has hyperreflexia, spastic tone, a positive Babinski sign, and no muscle atrophy. Which lesion type is this?", options:["Upper motor neuron (UMN) lesion","Lower motor neuron (LMN) lesion","Myopathy","Psychogenic weakness"], answer:0, explain:"UMN lesions show no atrophy/fasciculation, spastic tone, hyperactive reflexes, a pyramidal pattern of spread, and a positive Babinski sign.", ref:9},
    {q:"A patient has facial weakness on one side and limb weakness on the opposite side. Where is the lesion most likely localized?", options:["Brainstem","Cerebral hemisphere","Spinal cord","Peripheral nerve"], answer:0, explain:"A brainstem lesion classically produces an ipsilateral facial deficit with a contralateral (\"crossed\") peripheral limb deficit.", ref:3},
    {q:"A diabetic patient develops symmetric numbness and weakness starting in the feet and hands in a \"gloves and socks\" distribution. What is this pattern called?", options:["Polyneuropathy","Myopathy","Upper motor neuron lesion","Root lesion"], answer:0, explain:"Polyneuropathy causes a systemic, symmetric, distal (\"gloves and socks\") deficit, classically from diabetes.", ref:6},
    {q:"A patient's weakness characteristically worsens with repeated physical effort throughout the day. Which lesion location is most consistent with this pattern?", options:["Neuromuscular junction (e.g. myasthenia gravis)","Upper motor neuron","Lower motor neuron","Myopathy"], answer:0, explain:"NMJ lesions like myasthenia gravis classically cause fatigable weakness that worsens with sustained or repeated effort.", ref:7},
    {q:"A patient develops progressive weakness and sensory loss over several weeks, and is found to have a low B12 level. What time-course category does this best fit?", options:["Subacute","Hyperacute","Acute","Chronic"], answer:0, explain:"A subacute time course (weeks to months) is classic for B12 deficiency, distinct from the rapid onset of stroke/seizure or the years-long course of neurodegenerative disease.", ref:13},
    {q:"Which of the following findings is characteristic of a lower motor neuron (LMN) lesion rather than an upper motor neuron (UMN) lesion?", options:["Fasciculations with decreased tone and hypoactive reflexes","A positive Babinski sign","Spastic tone","No atrophy or fasciculation"], answer:0, explain:"LMN lesions classically show atrophy and fasciculations, decreased tone, and hypoactive reflexes in a distal/segmental pattern — the opposite of the UMN picture.", ref:10}
  ]
},
{
  id: "neuro-coma-delirium",
  name: "Altered Mental Status, Coma & Delirium",
  blurb: "The Glasgow Coma Scale, pupillary and brainstem exam findings, and diagnosing delirium.",
  flashcards: [
    {front:"What is the first step when evaluating a patient with decreased consciousness?", back:"Assess the ABCs (airway, breathing, circulation) and rule out systemic causes such as hypoxia, hypotension, or hypoglycemia."},
    {front:"What three domains does the Glasgow Coma Scale (GCS) assess?", back:"Eye opening, verbal response, and motor response."},
    {front:"What are the graded motor responses on the GCS, from best to worst?", back:"Moves freely/localizes pain, withdraws from pain, decorticate posturing, decerebrate posturing, no response."},
    {front:"What are the graded verbal responses on the GCS, from best to worst?", back:"No deficit (oriented), confused, isolated/inappropriate words, incomprehensible sounds, no response."},
    {front:"What are the graded eye-opening responses on the GCS, from best to worst?", back:"Spontaneous, opens to voice, opens to pain, no eye opening (closed)."},
    {front:"What does asymmetric pupillary response to light suggest in a patient with altered consciousness?", back:"Brainstem damage."},
    {front:"What is the vestibulo-ocular reflex (\"doll's eyes\") test, and what does a fixed (abnormal) result indicate?", back:"The eyes are observed for appropriate movement relative to head turning; if the eyes remain fixed rather than moving appropriately, this indicates brainstem damage."},
    {front:"What are the meningeal signs on physical exam?", back:"Neck stiffness, and Kernig's and Brudzinski's signs."},
    {front:"What five domains make up a mental status assessment?", back:"Orientation, attention, verbal ability (language), memory, and judgment."},
    {front:"How does anisocoria (unequal pupils) that is worse in the dark differ from anisocoria that is worse in the light, in terms of localization?", back:"Anisocoria worse in the dark suggests the smaller pupil is abnormal (a sympathetic pathway lesion, e.g. Horner's syndrome). Anisocoria worse in the light suggests the larger pupil is abnormal (a parasympathetic lesion, e.g. cranial nerve III compression)."},
    {front:"What defines delirium (acute confusional state)?", back:"An acute onset, a fluctuating course, and a hallmark deficit in attention."},
    {front:"What is the clinical spectrum of delirium presentations?", back:"From hyperactive (agitation, hallucinations, severe autonomic instability) to hypoactive (apathy, psychomotor slowing, quietness)."},
    {front:"What are the risk factors for delirium?", back:"Advanced age, baseline cognitive impairment (dementia), sensory deprivation, immobility, and physical restraints."},
    {front:"What are the broad etiologic categories of delirium?", back:"Systemic or CNS infections, endocrine abnormalities (e.g. thyroid or adrenal disease), electrolyte imbalances, toxins, and autoimmune disorders."},
    {front:"What is the management approach for delirium, and when are benzodiazepines appropriate?", back:"Identify and treat the underlying medical illness, alongside environmental reorientation (clocks, windows, a proper sleep-wake cycle, minimizing restraints). Benzodiazepines should be avoided unless treating delirium tremens or another withdrawal syndrome."}
  ],
  quiz: [
    {q:"A patient has anisocoria that becomes more pronounced in dim light. Which pupil is abnormal, and what does this suggest?", options:["The smaller pupil is abnormal, suggesting a sympathetic lesion (e.g. Horner's syndrome)","The larger pupil is abnormal, suggesting a parasympathetic lesion (e.g. CN III compression)","Neither pupil is abnormal; this is a normal variant","Both pupils are abnormal, indicating bilateral CN III palsy"], answer:0, explain:"Anisocoria worse in the dark indicates the smaller pupil is failing to dilate normally, pointing to a sympathetic pathway lesion such as Horner's syndrome.", ref:9},
    {q:"Which three domains are assessed by the Glasgow Coma Scale?", options:["Eye opening, verbal response, motor response","Pupil size, reflexes, and orientation","Airway, breathing, circulation","Attention, memory, and language"], answer:0, explain:"The GCS standardizes level of consciousness based on eye opening, verbal response, and motor response.", ref:1},
    {q:"A comatose patient's eyes remain fixed in position when the head is turned, rather than moving to maintain gaze. What does this \"doll's eyes\" finding indicate?", options:["Brainstem damage","A normal, intact brainstem reflex","Purely psychogenic unresponsiveness","Isolated cranial nerve II damage"], answer:0, explain:"A normal vestibulo-ocular reflex keeps the eyes fixed on a target as the head turns; a fixed, non-moving gaze relative to head movement (an abnormal/absent doll's eyes response) indicates brainstem damage.", ref:6},
    {q:"What is the hallmark clinical feature that defines delirium, distinguishing it from other causes of confusion?", options:["An attention deficit, with acute onset and a fluctuating course","A slowly progressive memory deficit","A stable, unchanging level of confusion","Symmetric limb weakness"], answer:0, explain:"Delirium is defined by acute onset, a fluctuating course, and a hallmark deficit in attention — distinguishing it from chronic, stable cognitive disorders like dementia.", ref:10},
    {q:"Which medication class should generally be avoided in delirium management, except when treating alcohol withdrawal (delirium tremens)?", options:["Benzodiazepines","Antipyretics","IV fluids","Antibiotics for an underlying infection"], answer:0, explain:"Benzodiazepines are generally avoided in delirium (they can worsen confusion) unless the delirium is due to alcohol withdrawal/delirium tremens.", ref:14}
  ]
},
{
  id: "neuro-vertigo",
  name: "Dizziness & Vertigo",
  blurb: "Distinguishing peripheral from central vertigo, and the major peripheral vestibular syndromes.",
  flashcards: [
    {front:"What is vertigo, and how is it broadly categorized?", back:"The illusion of spinning or motion; broadly categorized into peripheral (inner ear/vestibular nerve) and central (brainstem/cerebellum) causes."},
    {front:"What is BPPV, what causes it, and how is it treated?", back:"Benign paroxysmal positional vertigo — the most common cause of recurrent vertigo, triggered by head position changes due to dislodged otoconia (calcium carbonate crystals) in the semicircular canals; treated with repositioning maneuvers such as the Epley maneuver."},
    {front:"What is the most common cause of acute, continuous vertigo, and what causes it?", back:"Vestibular neuritis, resulting from inflammation of the vestibulocochlear nerve."},
    {front:"What is Meniere's disease, what is its classic symptom triad, and how is it treated?", back:"Caused by excess endolymphatic fluid; causes attacks of vertigo accompanied by hearing loss, tinnitus, and ear fullness. Treated with diuretics and sodium restriction."},
    {front:"What distinguishes central vertigo from peripheral vertigo?", back:"Central vertigo stems from brainstem or cerebellar lesions and is typically accompanied by other neurological signs or cranial nerve deficits, unlike isolated peripheral vertigo."}
  ],
  quiz: [
    {q:"A patient develops brief episodes of vertigo triggered specifically by rolling over in bed or looking up. What is the diagnosis and its mechanism?", options:["BPPV, from dislodged otoconia in the semicircular canals","Vestibular neuritis, from vestibulocochlear nerve inflammation","Meniere's disease, from excess endolymphatic fluid","Central vertigo, from a cerebellar lesion"], answer:0, explain:"BPPV is triggered by head position changes due to dislodged otoconia in the semicircular canals, and is treated with repositioning maneuvers like the Epley maneuver.", ref:1},
    {q:"What is the most common cause of acute, continuous (non-positional) vertigo?", options:["Vestibular neuritis","BPPV","Meniere's disease","A brainstem stroke"], answer:0, explain:"Vestibular neuritis, from inflammation of the vestibulocochlear nerve, is the most common cause of acute continuous vertigo.", ref:2},
    {q:"A patient has recurrent vertigo attacks accompanied by hearing loss, tinnitus, and a sensation of ear fullness. What is the diagnosis and treatment?", options:["Meniere's disease; diuretics and sodium restriction","BPPV; the Epley maneuver","Vestibular neuritis; supportive care","Central vertigo; neuroimaging and treatment of the underlying lesion"], answer:0, explain:"The triad of vertigo, hearing loss, and tinnitus/ear fullness from excess endolymphatic fluid defines Meniere's disease, treated with diuretics and sodium restriction.", ref:3},
    {q:"A patient with vertigo also has dysarthria, limb ataxia, and diplopia. What does this combination suggest?", options:["Central vertigo, from a brainstem or cerebellar lesion","Peripheral vertigo, from BPPV","Peripheral vertigo, from Meniere's disease","Peripheral vertigo, from vestibular neuritis"], answer:0, explain:"Vertigo accompanied by other neurological or cranial nerve signs (dysarthria, ataxia, diplopia) points to a central (brainstem/cerebellar) cause rather than an isolated peripheral vestibular process.", ref:4}
  ]
},
{
  id: "neuro-stroke-acute",
  name: "Acute Ischemic & Hemorrhagic Stroke",
  blurb: "Stroke epidemiology, the ischemic penumbra, thrombolysis/thrombectomy, and localizing stroke syndromes by vascular territory.",
  flashcards: [
    {front:"What is a stroke, and what tool is used to track its functional outcome?", back:"An abrupt-onset focal neurological deficit attributable to a vascular cause; functional outcome is tracked using the Modified Rankin Scale (mRS)."},
    {front:"What proportion of strokes are ischemic versus hemorrhagic?", back:"About 90% are ischemic; about 10% are intracranial hemorrhages (ICH)."},
    {front:"What is the ischemic penumbra, and why is it the treatment target in acute ischemic stroke?", back:"Brain tissue that is hypoperfused but not yet infarcted; the goal of acute treatment is to salvage this tissue before it progresses to permanent infarction."},
    {front:"What is the time window for IV tPA (thrombolysis) in acute ischemic stroke, and how does its benefit change with time?", back:"Within 4.5 hours of symptom onset; the number needed to treat for excellent recovery worsens the longer treatment is delayed."},
    {front:"What is endovascular thrombectomy used for, and what is its effect on outcomes?", back:"Used for large vessel occlusions; it significantly shifts outcomes toward functional independence."},
    {front:"What is the stroke syndrome of an anterior cerebral artery (ACA) occlusion?", back:"Leg weakness greater than arm weakness, abulia, and incontinence."},
    {front:"What is the stroke syndrome of a middle cerebral artery (MCA) occlusion?", back:"Face and arm weakness, aphasia (if the dominant hemisphere is affected), or neglect."},
    {front:"What is the stroke syndrome of a posterior cerebral artery (PCA) occlusion?", back:"Hemianopia."},
    {front:"What is the stroke syndrome of a vertebrobasilar occlusion?", back:"Cranial nerve palsies, ataxia, vertigo, or (in severe cases) \"locked-in\" syndrome."}
  ],
  quiz: [
    {q:"Approximately what proportion of strokes are ischemic rather than hemorrhagic?", options:["About 90%","About 50%","About 10%","About 99%"], answer:0, explain:"Roughly 90% of strokes are ischemic, while about 10% are intracranial hemorrhages.", ref:1},
    {q:"What is the standard time window for administering IV tPA in acute ischemic stroke?", options:["Within 4.5 hours of symptom onset","Within 24 hours of symptom onset","Within 15 minutes of symptom onset","There is no time limit"], answer:0, explain:"IV tPA is given within 4.5 hours of symptom onset, with the benefit (number needed to treat) worsening as time elapses.", ref:3},
    {q:"A patient has leg weakness greater than arm weakness, abulia, and urinary incontinence. Which vascular territory is most likely affected?", options:["Anterior cerebral artery (ACA)","Middle cerebral artery (MCA)","Posterior cerebral artery (PCA)","Vertebrobasilar system"], answer:0, explain:"ACA territory strokes classically cause leg-predominant weakness, abulia, and incontinence.", ref:5},
    {q:"A patient has right face and arm weakness with aphasia. Which vascular territory is most likely affected?", options:["Middle cerebral artery (MCA), dominant hemisphere","Anterior cerebral artery (ACA)","Posterior cerebral artery (PCA)","Vertebrobasilar system"], answer:0, explain:"MCA occlusion causes face and arm weakness, with aphasia if the dominant hemisphere is involved (or neglect if the non-dominant hemisphere is involved).", ref:6},
    {q:"A patient develops sudden vertigo, diplopia, ataxia, and cranial nerve palsies, progressing to a \"locked-in\" state. Which vascular territory is affected?", options:["Vertebrobasilar system","Middle cerebral artery","Anterior cerebral artery","Posterior cerebral artery only"], answer:0, explain:"Vertebrobasilar strokes cause cranial nerve palsies, ataxia, and vertigo, and in severe cases can cause locked-in syndrome.", ref:8}
  ]
},
{
  id: "neuro-stroke-secondary-prevention",
  name: "Secondary Stroke Prevention",
  blurb: "Matching secondary prevention strategy to stroke etiology — small vessel, carotid, cardioembolic, and cryptogenic stroke.",
  flashcards: [
    {front:"What causes small vessel (lacunar) strokes, what proportion of ischemic strokes do they account for, and how do they present?", back:"Occlusion of small penetrating arteries from lipohyalinosis, heavily driven by chronic hypertension; they account for about 25% of ischemic strokes and produce specific syndromes (e.g. pure motor hemiplegia, pure hemianesthesia) without higher cortical deficits like aphasia."},
    {front:"What is the mainstay of secondary prevention for lacunar (small vessel) strokes?", back:"Intensive blood pressure control."},
    {front:"What carotid stenosis threshold benefits from carotid endarterectomy (CEA), and when is CEA most effective?", back:"Symptomatic, severe extracranial carotid stenosis (>70%); CEA is most effective when performed within two weeks of the event."},
    {front:"What is the alternative to CEA for high-risk surgical patients with symptomatic carotid stenosis?", back:"Carotid artery stenting (CAS)."},
    {front:"What is the most common cause of cardioembolic stroke, and what is the preferred anticoagulation strategy?", back:"Non-valvular atrial fibrillation; direct oral anticoagulants (DOACs) are generally preferred over warfarin for safety and efficacy."},
    {front:"What option exists for stroke prevention in AFib patients who cannot tolerate long-term anticoagulation?", back:"Percutaneous closure of the left atrial appendage (LAA)."},
    {front:"What is a cryptogenic stroke (ESUS), and what is highly suspected as the underlying cause?", back:"An embolic stroke of undetermined source, where no obvious cause is found on standard workup; occult atrial fibrillation is highly suspected."},
    {front:"How does prolonged cardiac monitoring change AFib detection in cryptogenic stroke, and what device is used?", back:"An implantable loop recorder (ILR) provides prolonged monitoring that significantly increases the AFib detection rate compared to standard short-term monitoring."},
    {front:"What is a patent foramen ovale (PFO), and how can it cause stroke in younger patients?", back:"A PFO can allow a paradoxical embolus — a venous clot crossing from the right to the left side of the heart and then traveling to the brain."},
    {front:"What is the recommended management for a PFO-associated stroke in a younger patient, and what tool helps guide this decision?", back:"Transcatheter PFO closure combined with antiplatelet therapy is generally recommended over medical therapy alone, guided by tools such as the RoPE score."}
  ],
  quiz: [
    {q:"A patient has a pure motor hemiplegia without aphasia or neglect, attributed to chronic poorly-controlled hypertension. What is the likely stroke mechanism and its main secondary prevention strategy?", options:["Small vessel (lacunar) stroke from lipohyalinosis; intensive blood pressure control","Cardioembolic stroke from AFib; DOAC therapy","Large artery atherosclerosis; carotid endarterectomy","Cryptogenic stroke; implantable loop recorder"], answer:0, explain:"Lacunar strokes from lipohyalinosis (driven by chronic hypertension) classically cause isolated motor or sensory syndromes without cortical signs, and are best prevented with intensive BP control.", ref:0},
    {q:"A patient has a TIA and is found to have 80% symptomatic extracranial carotid stenosis. When is carotid endarterectomy most effective if performed?", options:["Within two weeks of the event","Only after 6 months of medical therapy first","Only if the patient is under age 50","There is no time-dependent benefit"], answer:0, explain:"CEA for symptomatic severe carotid stenosis (>70%) is most effective when performed within two weeks of the qualifying event.", ref:2},
    {q:"A patient with newly diagnosed non-valvular atrial fibrillation has a cardioembolic stroke. What is the generally preferred anticoagulation strategy?", options:["A direct oral anticoagulant (DOAC)","Warfarin","Aspirin alone","No anticoagulation is needed"], answer:0, explain:"DOACs are generally preferred over warfarin for AFib-related stroke prevention due to their safety and efficacy profile.", ref:4, caseQ:true},
    {q:"A patient with a cryptogenic stroke (ESUS) has no cause found on standard short-term cardiac monitoring. What is the next step to improve detection of a suspected occult cause?", options:["Implantable loop recorder for prolonged cardiac monitoring","Immediate anticoagulation without further workup","Carotid endarterectomy","Repeat the same short-term monitoring"], answer:0, explain:"An implantable loop recorder provides prolonged monitoring that significantly increases the detection rate of occult AFib in cryptogenic stroke, compared to standard short-term monitoring.", ref:7},
    {q:"A young patient with a cryptogenic stroke is found to have a PFO. What is the generally recommended management, and what tool helps guide the decision?", options:["Transcatheter PFO closure plus antiplatelet therapy, guided by the RoPE score","Medical (antiplatelet) therapy alone in all cases","Warfarin anticoagulation alone","Observation only, with no intervention"], answer:0, explain:"For PFO-associated stroke in younger patients, transcatheter closure combined with antiplatelet therapy is generally recommended over medical therapy alone, with the RoPE score helping assess how likely the PFO is the true stroke cause.", ref:9}
  ]
},
{
  id: "neuro-ich",
  name: "Intracerebral Hemorrhage (ICH)",
  blurb: "Localizing hemorrhagic stroke by location — deep hypertensive hemorrhage vs. lobar cerebral amyloid angiopathy.",
  flashcards: [
    {front:"What are the two broad location-based categories of intracerebral hemorrhage, and why does location matter?", back:"Deep ICH and lobar ICH; the location points to the underlying cause."},
    {front:"What causes deep ICH (basal ganglia, thalamus, or pons), and in whom is it most common?", back:"Hypertensive arteriopathy (lipohyalinosis) of small vessels; most common in younger patients or those with uncontrolled hypertension."},
    {front:"What causes lobar ICH in elderly patients, and what is the underlying pathology?", back:"Cerebral amyloid angiopathy (CAA) — amyloid-beta deposition in blood vessel walls, making them brittle and prone to recurrent microbleeds and macrohemorrhages."},
    {front:"What is the treatment and recurrence risk for cerebral amyloid angiopathy (CAA)?", back:"There is currently no effective treatment for CAA, and recurrence rates are high."}
  ],
  quiz: [
    {q:"An elderly patient has a lobar hemorrhage and a history of recurrent cortical microbleeds. What is the most likely underlying cause?", options:["Cerebral amyloid angiopathy (CAA)","Hypertensive arteriopathy (lipohyalinosis)","Aneurysmal subarachnoid hemorrhage","Cardioembolic stroke"], answer:0, explain:"Lobar ICH in the elderly, especially with recurrent microbleeds, is classically caused by cerebral amyloid angiopathy — amyloid-beta deposition making vessel walls brittle.", ref:2},
    {q:"A younger patient with poorly controlled hypertension has a hemorrhage in the thalamus. What is the most likely mechanism?", options:["Hypertensive arteriopathy (lipohyalinosis) of small vessels","Cerebral amyloid angiopathy","A ruptured berry aneurysm","Cardioembolic hemorrhagic transformation"], answer:0, explain:"Deep ICH (basal ganglia, thalamus, pons) is classically caused by hypertensive small-vessel arteriopathy (lipohyalinosis), most common with uncontrolled hypertension.", ref:1},
    {q:"What is the current treatment for cerebral amyloid angiopathy, and what is the expected recurrence risk?", options:["No effective treatment exists, and recurrence rates are high","Long-term anticoagulation is curative","Statins reliably prevent recurrence","Surgical clipping eliminates recurrence risk"], answer:0, explain:"There is currently no effective treatment for CAA, and recurrent hemorrhage (microbleeds and macrohemorrhages) is common.", ref:3},
    {q:"Why does the location of an intracerebral hemorrhage (deep vs. lobar) matter clinically?", options:["It points to the underlying cause (hypertensive arteriopathy vs. cerebral amyloid angiopathy)","Location has no bearing on etiology","Only lobar hemorrhages are ever hypertensive in origin","Only deep hemorrhages carry any recurrence risk"], answer:0, explain:"Deep ICH points toward hypertensive small-vessel disease, while lobar ICH (especially in the elderly) points toward cerebral amyloid angiopathy — the location itself is a key diagnostic clue.", ref:0}
  ]
}
];
