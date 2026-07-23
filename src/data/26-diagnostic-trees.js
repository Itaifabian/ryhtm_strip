// Diagnostic Trees — the Cases tab's sole interactive mode: "walk the workup yourself."
// Each tree starts from a presenting problem and branches on real test results/clinical findings
// (not a quiz — no distractors) until it reaches a specific diagnosis and its treatment.
// Cardiology entries are condensed from this app's former CASE_GUIDES reference (since removed as
// redundant — every fact traces back to it); Rheumatology, Nephrology, and Infectious Diseases
// entries are condensed from clinician-supplied chapter summaries. All content is short bullet
// fragments for at-a-glance scanning. `group` mirrors the disease-family grouping used throughout
// the rest of the app, so the Cases tab nav can be browsed/searched by chapter → group → tree.
// See docs/AUTHORING_GUIDE.md for the schema.
//
// Node shape — a node is EITHER:
//   { q: "test/finding, phrased as a question", clues: ["short tag", …] (optional),
//     options: [ {label:"short answer", next: <node>}, … ] }
//   { leaf: true, diagnosis: "...", treatment: ["short bullet", …], notes: ["short bullet", …] (optional) }
const DIAGNOSTIC_TREES = [
{
  id: "dtree-acs",
  chapter: "Cardiology",
  group: "Acute Coronary Syndrome",
  name: "Suspected ACS (Chest Pain)",
  root: {
    q: "ST elevation ≥1mm in ≥2 contiguous leads?",
    options: [
      { label: "Yes", next: {
        leaf: true, diagnosis: "STEMI",
        treatment: [
          "Primary PCI ASAP (<90 min)",
          "Thrombolysis only if PCI delayed",
          "DAPT: aspirin + P2Y12 inhibitor",
          "Anticoagulation (UFH/LMWH)",
          "GP IIb/IIIa if high thrombus burden"
        ],
        notes: [
          "Shock → urgent PCI + IABP/Impella + pressors",
          "RV infarction: IV fluids for preload, avoid nitrates/diuretics; dobutamine if needed",
          "Ensure DAPT adherence — prevents stent thrombosis",
          "Reinfarction: urgent reassessment and reperfusion",
          "Post-MI: statin, DAPT ~1yr, ACEi/ARB, beta-blocker, MRA if EF<40%"
        ]
      }},
      { label: "No", next: {
        q: "Troponin elevated?",
        options: [
          { label: "Yes", next: {
            leaf: true, diagnosis: "NSTEMI",
            treatment: [
              "Anti-ischemic: nitrates, analgesia, beta-blocker",
              "DAPT + anticoagulation (UFH/LMWH)",
              "Fondaparinux/bivalirudin if HIT history",
              "Early invasive strategy if high-risk/unstable",
              "Else: serial ECG/troponin or elective cath"
            ],
            notes: ["Shock → urgent PCI + IABP/Impella + pressors"]
          }},
          { label: "No", next: {
            q: "Ischemic symptoms consistent with ACS?",
            clues: ["Rest angina", "Crescendo pattern", "High-risk features"],
            options: [
              { label: "Yes", next: {
                leaf: true, diagnosis: "Unstable Angina",
                treatment: [
                  "Same anti-ischemic regimen as NSTEMI",
                  "DAPT + anticoagulation",
                  "Early invasive strategy if high-risk"
                ]
              }},
              { label: "No", next: {
                leaf: true, diagnosis: "Low likelihood of ACS",
                treatment: [
                  "Reconsider non-cardiac causes",
                  "Risk-stratify further before excluding ACS"
                ]
              }}
            ]
          }}
        ]
      }}
    ]
  }
},
{
  id: "dtree-valvular",
  chapter: "Cardiology",
  group: "Valvular Disease",
  name: "Suspected Valvular Disease (Aortic)",
  root: {
    q: "Which lesion, on echo?",
    options: [
      { label: "Aortic stenosis", next: {
        q: "Severe AS? (valve area <1cm², peak velocity >4m/s, or mean gradient >40mmHg)",
        options: [
          { label: "No", next: {
            leaf: true, diagnosis: "Mild/moderate AS",
            treatment: ["Serial echo follow-up", "Treat cardiovascular risk factors"]
          }},
          { label: "Yes", next: {
            q: "Symptomatic?",
            options: [
              { label: "No", next: {
                leaf: true, diagnosis: "Asymptomatic severe AS",
                treatment: [
                  "Surveillance",
                  "Consider stress echo/BNP + valve-team eval if high-risk features",
                  "If low-flow, low-gradient: dobutamine stress echo to confirm true severity vs pseudo-severe"
                ]
              }},
              { label: "Yes", next: {
                q: "Age / surgical risk?",
                options: [
                  { label: "Younger, low surgical risk", next: {
                    leaf: true, diagnosis: "Symptomatic severe AS — younger/low risk",
                    treatment: ["Aortic valve replacement", "Often SAVR (valve durability)", "Mechanical valve possible but needs lifelong anticoagulation"],
                    notes: ["Heart Team decision: age, anatomy, surgical risk, life expectancy, preference"]
                  }},
                  { label: "Older, high surgical risk", next: {
                    leaf: true, diagnosis: "Symptomatic severe AS — older/high risk",
                    treatment: ["Aortic valve replacement", "TAVI/TAVR often favored"],
                    notes: ["Heart Team decision: age, anatomy, surgical risk, life expectancy, preference"]
                  }}
                ]
              }}
            ]
          }}
        ]
      }},
      { label: "Aortic regurgitation", next: {
        q: "Severe AR?",
        options: [
          { label: "No", next: {
            leaf: true, diagnosis: "Mild/moderate AR",
            treatment: ["Echo surveillance", "Treat hypertension/underlying cause"]
          }},
          { label: "Yes", next: {
            q: "Symptomatic, or asymptomatic with LV dysfunction (EF<50% or LVESD>50mm)?",
            options: [
              { label: "Yes", next: {
                leaf: true, diagnosis: "Severe AR — intervention indicated",
                treatment: ["SAVR/TAVI depending on anatomy/risk", "Threshold for asymptomatic: EF<50% or LVESD>50mm"],
                notes: ["If due to a dilated aorta: treat the aortic pathology; surgery if diameter/severity thresholds are met"]
              }},
              { label: "No", next: {
                leaf: true, diagnosis: "Severe AR, compensated",
                treatment: ["Continue echo surveillance", "Medical therapy alone is not definitive — treat risk factors while monitoring for decompensation"]
              }}
            ]
          }}
        ]
      }}
    ]
  }
},
{
  id: "dtree-syncope",
  chapter: "Cardiology",
  group: "Syncope",
  name: "Syncope",
  root: {
    q: "High-risk features present?",
    clues: ["Exertional syncope", "Syncope while supine", "No prodrome", "Abnormal ECG", "Structural heart disease", "FHx sudden death"],
    options: [
      { label: "Yes", next: {
        q: "VT/VF documented?",
        options: [
          { label: "Yes", next: {
            leaf: true, diagnosis: "Cardiac Syncope — malignant arrhythmia",
            treatment: ["ACLS acutely", "ICD if 2° prevention indication met"]
          }},
          { label: "No", next: {
            q: "Complete AV block or severe bradycardia?",
            options: [
              { label: "Yes", next: {
                leaf: true, diagnosis: "Cardiac Syncope — conduction disease",
                treatment: ["Pacing"]
              }},
              { label: "No", next: {
                q: "Severe AS, HOCM, or PE?",
                options: [
                  { label: "Yes", next: {
                    leaf: true, diagnosis: "Cardiac Syncope — structural cause",
                    treatment: ["Treat the underlying structural/obstructive cause"]
                  }},
                  { label: "No", next: {
                    leaf: true, diagnosis: "Cardiac syncope, cause unclear",
                    treatment: ["Continue cardiac monitoring", "Further workup before calling it reflex syncope"]
                  }}
                ]
              }}
            ]
          }}
        ]
      }},
      { label: "No", next: {
        q: "Situational trigger with prodrome?",
        clues: ["Prolonged standing", "Heat", "Emotional stress", "Warmth/nausea beforehand"],
        options: [
          { label: "Yes", next: {
            leaf: true, diagnosis: "Reflex / Vasovagal Syncope",
            treatment: ["Trigger avoidance, hydration, counter-pressure maneuvers", "Midodrine if recurrent (2nd line)"]
          }},
          { label: "No", next: {
            q: "Drop in BP on standing?",
            clues: ["Volume depletion", "Causative drug"],
            options: [
              { label: "Yes", next: {
                leaf: true, diagnosis: "Orthostatic Syncope",
                treatment: [
                  "Stop causative drugs, rise slowly",
                  "Hydration, salt, compression stockings",
                  "Midodrine (2nd line)",
                  "Treat underlying cause (neuropathy, Parkinson, B12 deficiency, etc.)"
                ]
              }},
              { label: "No", next: {
                q: "Triggered by carotid sinus pressure?",
                clues: ["Tight collar", "Head-turning", "Shaving"],
                options: [
                  { label: "Yes", next: {
                    leaf: true, diagnosis: "Carotid Sinus Hypersensitivity",
                    treatment: ["Confirm via carotid sinus massage (after excluding carotid stenosis/stroke)", "Pacemaker in selected cardioinhibitory cases"]
                  }},
                  { label: "No", next: {
                    leaf: true, diagnosis: "Cause not yet clear",
                    treatment: ["Re-evaluate history and exam", "Consider prolonged monitoring"]
                  }}
                ]
              }}
            ]
          }}
        ]
      }}
    ]
  }
},
{
  id: "dtree-ohca",
  chapter: "Cardiology",
  group: "Resuscitation",
  name: "Cardiac Arrest (OHCA)",
  root: {
    q: "Rhythm on the monitor?",
    options: [
      { label: "Shockable (VF/pulseless VT)", next: {
        leaf: true, diagnosis: "Shockable arrest",
        treatment: ["High-quality BLS/CPR", "Early defibrillation", "ACLS per protocol"],
        notes: [
          "Post-ROSC: temperature control, airway/O2, hemodynamic support",
          "PCI if STEMI, persistent arrhythmia, or cardiogenic shock",
          "ICD for 2° prevention if indicated (idiopathic VT/VF, incomplete revascularization, high-risk cardiomyopathy)",
          "Shock/severe dysfunction: inotropes, IABP, LVAD, or ECMO"
        ]
      }},
      { label: "Torsades de pointes", next: {
        leaf: true, diagnosis: "Torsades de Pointes arrest",
        treatment: ["High-dose magnesium", "BLS/CPR + ACLS as needed"],
        notes: [
          "Post-ROSC: temperature control, airway/O2, hemodynamic support",
          "PCI if STEMI, persistent arrhythmia, or cardiogenic shock",
          "ICD for 2° prevention if indicated"
        ]
      }},
      { label: "Bradyarrhythmic / PEA / asystole", next: {
        leaf: true, diagnosis: "Bradyarrhythmic arrest / PEA-asystole",
        treatment: ["High-quality BLS/CPR", "ACLS per protocol", "Pacing when indicated"],
        notes: [
          "Post-ROSC: temperature control, airway/O2, hemodynamic support",
          "PCI if STEMI, persistent arrhythmia, or cardiogenic shock",
          "ICD for 2° prevention if indicated"
        ]
      }}
    ]
  }
},
{
  id: "dtree-af",
  chapter: "Cardiology",
  group: "Atrial Fibrillation",
  name: "Atrial Fibrillation",
  root: {
    q: "Hemodynamically unstable (shock, ischemia, or severe pulmonary edema)?",
    options: [
      { label: "Yes", next: {
        leaf: true, diagnosis: "Unstable AF",
        treatment: ["Immediate synchronized electrical cardioversion"],
        notes: ["Anticoagulate per stroke risk once stabilized — not based on rhythm alone"]
      }},
      { label: "No", next: {
        q: "Rate control or rhythm control strategy?",
        options: [
          { label: "Rate control", next: {
            leaf: true, diagnosis: "Stable AF — rate control",
            treatment: [
              "Beta-blocker or non-DHP CCB if EF preserved",
              "Digoxin, especially in HF or sedentary patients",
              "Escalation: AV-node ablation + pacemaker if drug-refractory"
            ],
            notes: [
              "Anticoagulate per stroke risk (CHA₂DS₂-VASc), independent of strategy",
              "DOAC preferred except mechanical valve or significant mitral stenosis (→ warfarin, INR 2–3)",
              "LAA closure if high bleeding risk but stroke-prevention need continues"
            ]
          }},
          { label: "Rhythm control", next: {
            leaf: true, diagnosis: "Stable AF — rhythm control",
            treatment: [
              "Electrical or pharmacologic cardioversion, or antiarrhythmic (e.g. amiodarone)",
              "Escalation: pulmonary vein isolation/catheter ablation (can be first-line in selected paroxysmal AF)"
            ],
            notes: [
              "Anticoagulate per stroke risk (CHA₂DS₂-VASc), independent of strategy",
              "DOAC preferred except mechanical valve or significant mitral stenosis (→ warfarin, INR 2–3)",
              "LAA closure if high bleeding risk but stroke-prevention need continues"
            ]
          }}
        ]
      }}
    ]
  }
},
{
  id: "dtree-wct",
  chapter: "Cardiology",
  group: "Arrhythmia",
  name: "Wide Complex Tachycardia",
  root: {
    q: "Hemodynamically unstable?",
    options: [
      { label: "Yes", next: {
        leaf: true, diagnosis: "Unstable WCT",
        treatment: ["Synchronized cardioversion"]
      }},
      { label: "No", next: {
        q: "Prior MI or cardiomyopathy?",
        options: [
          { label: "Yes", next: {
            leaf: true, diagnosis: "Treat as VT until proven otherwise",
            treatment: ["Antiarrhythmic (amiodarone/procainamide)", "Expert evaluation"]
          }},
          { label: "No", next: {
            leaf: true, diagnosis: "Stable monomorphic VT (default)",
            treatment: ["Antiarrhythmic (amiodarone/procainamide)", "Expert evaluation"]
          }}
        ]
      }}
    ]
  }
},
{
  id: "dtree-wpw",
  chapter: "Cardiology",
  group: "Arrhythmia",
  name: "WPW / Pre-excited Tachyarrhythmia",
  root: {
    q: "Pre-excited atrial fibrillation present?",
    options: [
      { label: "Yes", next: {
        q: "Hemodynamically unstable?",
        options: [
          { label: "Yes", next: {
            leaf: true, diagnosis: "Pre-excited AF — unstable",
            treatment: ["DC cardioversion"],
            notes: ["Avoid AV-nodal blockers (adenosine, beta-blockers, verapamil, diltiazem, digoxin) — can worsen pre-excited AF"]
          }},
          { label: "No", next: {
            leaf: true, diagnosis: "Pre-excited AF — stable",
            treatment: ["Procainamide"],
            notes: ["Avoid AV-nodal blockers (adenosine, beta-blockers, verapamil, diltiazem, digoxin) — can worsen pre-excited AF"]
          }}
        ]
      }},
      { label: "No — AVRT or asymptomatic pathway", next: {
        q: "Symptomatic WPW / recurrent AVRT?",
        options: [
          { label: "Yes", next: {
            leaf: true, diagnosis: "Symptomatic WPW / AVRT",
            treatment: ["Catheter ablation (high success)"]
          }},
          { label: "No", next: {
            leaf: true, diagnosis: "Asymptomatic WPW",
            treatment: ["Individualized decision after risk stratification", "Exercise test or EP study to assess pathway risk"]
          }}
        ]
      }}
    ]
  }
},
{
  id: "dtree-hf",
  chapter: "Cardiology",
  group: "Heart Failure",
  name: "Heart Failure by EF",
  root: {
    q: "EF category, on echo?",
    options: [
      { label: "Reduced (HFrEF, EF≤40%)", next: {
        q: "Refractory symptoms despite optimal GDMT?",
        options: [
          { label: "No", next: {
            leaf: true, diagnosis: "HFrEF",
            treatment: [
              "Foundational 4 drugs together: beta-blocker + ACEi/ARB/ARNI + MRA + SGLT2 inhibitor",
              "ARNI preferred if tolerated; ACEi if not; ARB if ACEi-intolerant",
              "Loop diuretics for congestion",
              "ICD if EF<35%, ischemic history, or post-ventricular arrhythmia",
              "CRT if LBBB/dyssynchrony"
            ],
            notes: [
              "Persistent sinus tachycardia on beta-blocker: ivabradine (selected NYHA II, EF<35%, HR>75)",
              "Vericiguat if still failing on optimal therapy"
            ]
          }},
          { label: "Yes", next: {
            leaf: true, diagnosis: "Advanced / end-stage HF",
            treatment: ["Advanced HF referral", "LVAD (bridge or destination therapy)", "Heart transplant in selected candidates"],
            notes: ["LVAD: warfarin + aspirin chronically", "Severe RV failure is a major LVAD contraindication"]
          }}
        ]
      }},
      { label: "Mildly reduced (HFmrEF, 41–49%)", next: {
        leaf: true, diagnosis: "HFmrEF",
        treatment: ["Similar direction to HFrEF — SGLT2 inhibitor + diuretics", "Evidence base less strong than HFrEF"]
      }},
      { label: "Preserved (HFpEF, ≥50%)", next: {
        leaf: true, diagnosis: "HFpEF",
        treatment: [
          "SGLT2 inhibitor — strongest evidence among drug options",
          "Treat underlying drivers: HTN, obesity, AF, ischemia, valvular disease, pulmonary hypertension, infiltrative/restrictive disease",
          "Diuretics for congestion"
        ]
      }},
      { label: "Previously reduced, now improved", next: {
        leaf: true, diagnosis: "HF with improved EF",
        treatment: ["Continue optimal therapy — do not stop GDMT once EF normalizes"]
      }}
    ]
  }
},
{
  id: "dtree-amyloid",
  chapter: "Cardiology",
  group: "Heart Failure",
  name: "Cardiac Amyloidosis",
  root: {
    q: "Monoclonal light chains / plasma-cell dyscrasia present?",
    options: [
      { label: "Yes (suggests AL)", next: {
        leaf: true, diagnosis: "AL Cardiac Amyloidosis",
        treatment: ["Hematology-directed plasma-cell-targeted therapy"],
        notes: ["Diurese carefully; avoid over-reducing preload"]
      }},
      { label: "No — bone scintigraphy positive (suggests ATTR)", next: {
        leaf: true, diagnosis: "ATTR Cardiac Amyloidosis",
        treatment: ["Tafamidis — stabilizes transthyretin, slows progression (does not remove existing deposits)"],
        notes: ["Diurese carefully; avoid over-reducing preload"]
      }}
    ]
  }
},
{
  id: "dtree-mr",
  chapter: "Cardiology",
  group: "Mitral Regurgitation",
  name: "Mitral Regurgitation",
  root: {
    q: "Onset?",
    options: [
      { label: "Acute (e.g. post-MI papillary muscle rupture)", next: {
        leaf: true, diagnosis: "Acute Severe MR",
        treatment: ["Immediate stabilization: O2/intubation if needed, afterload reduction, IABP in severe cases", "Urgent surgery — repair preferred over replacement"]
      }},
      { label: "Chronic", next: {
        q: "Primary (structural valve) or secondary (functional, from LV remodeling)?",
        options: [
          { label: "Primary", next: {
            q: "Symptomatic severe MR, or asymptomatic with LV dysfunction?",
            options: [
              { label: "Yes", next: {
                leaf: true, diagnosis: "Chronic Primary MR — intervention indicated",
                treatment: ["Surgery, preferably repair when feasible", "TEER if high surgical risk + suitable anatomy"]
              }},
              { label: "No", next: {
                leaf: true, diagnosis: "Chronic Primary MR — surveillance",
                treatment: ["Continue echo surveillance until intervention criteria are met"]
              }}
            ]
          }},
          { label: "Secondary", next: {
            leaf: true, diagnosis: "Secondary / Functional MR",
            treatment: [
              "Optimize HFrEF GDMT and treat ventricular remodeling first",
              "Surgical/transcatheter intervention if undergoing CABG or symptoms persist despite GDMT",
              "TEER if criteria met: NYHA II, moderate–severe FMR, EF 20–50%, LVESD<70mm, SPAP<70mmHg, no severe RV dysfunction/TR"
            ]
          }}
        ]
      }}
    ]
  }
},
{
  id: "dtree-myopericarditis",
  chapter: "Cardiology",
  group: "Myocarditis & Pericardial Disease",
  name: "Myocarditis & Pericardial Disease",
  root: {
    q: "Primary presentation?",
    options: [
      { label: "Suspected myocarditis (troponin ↑, normal coronaries)", next: {
        q: "Severe (HF, shock, or arrhythmias)?",
        options: [
          { label: "No", next: {
            leaf: true, diagnosis: "Mild/stable myocarditis",
            treatment: ["Follow-up", "Avoid strenuous exercise for several months"],
            notes: ["Avoid NSAIDs; aspirin may be used for pain if needed"]
          }},
          { label: "Yes", next: {
            q: "Giant cell / severe immune-mediated myocarditis?",
            options: [
              { label: "Yes", next: {
                leaf: true, diagnosis: "Giant cell / immune-mediated myocarditis",
                treatment: ["Intense immunosuppression", "Selected cases: prednisone + cyclosporine/azathioprine"]
              }},
              { label: "No", next: {
                leaf: true, diagnosis: "Severe myocarditis (HF/shock/arrhythmias)",
                treatment: ["Supportive care; treat the trigger if identified", "Inotropes/mechanical circulatory support (IABP, Impella, ECMO)"]
              }}
            ]
          }}
        ]
      }},
      { label: "Acute pericarditis (pleuritic pain, friction rub)", next: {
        leaf: true, diagnosis: "Acute Pericarditis",
        treatment: [
          "High-dose NSAID/aspirin + colchicine (first line)",
          "Steroids only if NSAIDs fail/contraindicated, after excluding infection",
          "IL-1 blockade (rilonacept, anakinra) for recurrent/refractory disease"
        ],
        notes: ["Treat the cause if identified: TB, bacterial infection, malignancy, autoimmune disease, CKD, post-MI, drug-induced"]
      }},
      { label: "Pericardial effusion, hemodynamic compromise", next: {
        leaf: true, diagnosis: "Cardiac Tamponade",
        treatment: ["Supportive fluids/pressors — bridge only", "Urgent pericardiocentesis/pericardial drainage (definitive)"]
      }},
      { label: "Chronic constrictive physiology", next: {
        q: "Chronic/established (>6 months)?",
        options: [
          { label: "No", next: {
            leaf: true, diagnosis: "Early/inflammatory constriction",
            treatment: ["Treat like pericarditis — anti-inflammatory therapy"]
          }},
          { label: "Yes", next: {
            leaf: true, diagnosis: "Chronic Constrictive Pericarditis",
            treatment: ["Surgical pericardiectomy"]
          }}
        ]
      }}
    ]
  }
},
{
  id: "dtree-cardiomyopathy",
  chapter: "Cardiology",
  group: "Cardiomyopathy",
  name: "Cardiomyopathy",
  root: {
    q: "Predominant pattern, on echo/MRI?",
    options: [
      { label: "Dilated, reduced EF (DCM)", next: {
        leaf: true, diagnosis: "Dilated Cardiomyopathy",
        treatment: [
          "Treat as HFrEF: beta-blocker, ACEi/ARB/ARNI, MRA, SGLT2 inhibitor, diuretics",
          "Remove/treat the cause: ischemia, alcohol/drug toxicity, myocarditis, nutritional deficiency, peripartum disease",
          "ICD/CRT depending on EF, arrhythmia risk, QRS/LBBB pattern"
        ],
        notes: ["Genetic counseling if inherited", "End-stage disease: LVAD/transplant evaluation"]
      }},
      { label: "Hypertrophied, outflow concern (HCM/HOCM)", next: {
        leaf: true, diagnosis: "Hypertrophic Cardiomyopathy / HOCM",
        treatment: [
          "Beta-blocker (first line)",
          "Non-DHP CCB if beta-blocker not tolerated/effective",
          "Disopyramide or cardiac myosin inhibitor for additional obstruction control",
          "Septal reduction therapy (myectomy or alcohol ablation) if refractory obstruction",
          "ICD if high SCD risk"
        ],
        notes: ["Avoid high-intensity competitive exercise if high-risk", "Family screening if a mutation is identified"]
      }},
      { label: "RV-predominant fibrosis/arrhythmia (ARVC)", next: {
        leaf: true, diagnosis: "Arrhythmogenic RV Cardiomyopathy",
        treatment: [
          "Beta-blocker/antiarrhythmic strategy with EP evaluation for ventricular arrhythmias",
          "ICD if high-risk or secondary-prevention indication",
          "Manage as cardiomyopathy/HF if progressing to RV/LV failure"
        ],
        notes: ["Avoid high-intensity exercise"]
      }},
      { label: "Restrictive/stiff ventricle (RCM)", next: {
        q: "Cause?",
        options: [
          { label: "Amyloidosis", next: {
            leaf: true, diagnosis: "Restrictive CM — Amyloidosis",
            treatment: ["ATTR: tafamidis", "AL: hematology-directed therapy", "Diurese cautiously in both"]
          }},
          { label: "Sarcoidosis", next: {
            leaf: true, diagnosis: "Restrictive CM — Sarcoidosis",
            treatment: ["Immunosuppression when active", "Rhythm/conduction monitoring", "ICD/pacing if indicated"]
          }},
          { label: "Other/idiopathic", next: {
            leaf: true, diagnosis: "Restrictive CM — general",
            treatment: ["Treat the underlying cause", "Diuretics carefully", "Advanced HF referral when severe"]
          }}
        ]
      }}
    ]
  }
},
{
  id: "dtree-pe",
  chapter: "Cardiology",
  group: "Pulmonary Embolism",
  name: "Pulmonary Embolism",
  root: {
    q: "Risk category?",
    options: [
      { label: "High-risk (hypotension/shock/RV failure)", next: {
        leaf: true, diagnosis: "High-risk PE",
        treatment: [
          "Immediate anticoagulation",
          "Reperfusion — usually systemic thrombolysis if no contraindication",
          "If contraindicated/failed: surgical embolectomy or catheter-directed therapy"
        ],
        notes: [
          "IVC filter if anticoagulation contraindicated or recurrent emboli despite it",
          "DOAC preferred after initial phase unless APS, mechanical valve, or severe CKD (→ warfarin)",
          "Duration often 3–6 months; extended therapy for unprovoked PE, persistent risk factors, recurrent VTE, or thrombophilia/cancer"
        ]
      }},
      { label: "Intermediate-risk", next: {
        leaf: true, diagnosis: "Intermediate-risk PE",
        treatment: ["Anticoagulation with close monitoring", "Thrombolysis only if deterioration or high-risk features develop"],
        notes: [
          "DOAC preferred after initial phase unless APS, mechanical valve, or severe CKD (→ warfarin)",
          "Duration often 3–6 months; extended therapy for unprovoked PE, persistent risk factors, recurrent VTE, or thrombophilia/cancer"
        ]
      }},
      { label: "Low-risk", next: {
        leaf: true, diagnosis: "Low-risk PE",
        treatment: ["Anticoagulation — often a DOAC/NOAC if eligible", "Outpatient treatment possible if Hestia/PESI low-risk and no exclusions"],
        notes: [
          "DOAC preferred after initial phase unless APS, mechanical valve, or severe CKD (→ warfarin)",
          "Duration often 3–6 months; extended therapy for unprovoked PE, persistent risk factors, recurrent VTE, or thrombophilia/cancer"
        ]
      }}
    ]
  }
},
{
  id: "dtree-rheum-pattern",
  chapter: "Rheumatology",
  group: "General Approach",
  name: "Joint Pain — What Pattern Is This?",
  root: {
    q: "One joint, a few joints, or many joints?",
    options: [
      { label: "One joint (acute monoarthritis)", next: {
        leaf: true, diagnosis: "Acute Monoarthritis",
        treatment: [
          "Treat as septic arthritis until proven otherwise",
          "Arthrocentesis immediately — don't decide on serum tests alone",
          "Send synovial fluid: WBC + differential, Gram stain, culture, crystals"
        ],
        notes: [
          "WBC>50,000 with PMN predominance → septic likely (crystals can coexist)",
          "Crystals present → gout/CPPD, but infection still possible until cultures return",
          "Gram stain/culture positive → septic arthritis confirmed"
        ]
      }},
      { label: "A few joints, esp. lower limb (oligoarthritis)", next: {
        leaf: true, diagnosis: "Oligoarthritis",
        treatment: ["Consider: reactive arthritis, psoriatic arthritis, IBD-associated arthritis, crystal disease, gonococcal arthritis, early spondyloarthritis"]
      }},
      { label: "Many joints, symmetric small-joint (polyarthritis)", next: {
        q: "Mechanical or inflammatory pain pattern?",
        clues: ["Mechanical: worse with use, better with rest, stiffness <30min", "Inflammatory: rest/night pain, better with activity, stiffness >30–60min"],
        options: [
          { label: "Mechanical", next: {
            leaf: true, diagnosis: "Mechanical pattern — think OA",
            treatment: ["Consider osteoarthritis"]
          }},
          { label: "Inflammatory", next: {
            leaf: true, diagnosis: "Inflammatory pattern",
            treatment: ["Consider: RA, SpA/PsA, SLE arthritis, PMR, vasculitis-associated arthralgia, or a crystal-arthritis flare"]
          }}
        ]
      }}
    ]
  }
},
{
  id: "dtree-rheum-hot-joint",
  chapter: "Rheumatology",
  group: "Crystal & Septic Arthritis",
  name: "Acute Hot Swollen Joint",
  root: {
    q: "Aspirate synovial fluid first — what does it show?",
    options: [
      { label: "Gram stain/culture positive", next: {
        leaf: true, diagnosis: "Septic Arthritis",
        treatment: ["IV antibiotics after cultures — often ceftriaxone initially", "Add vancomycin if MRSA risk", "Joint drainage/washout, often repeated"]
      }},
      { label: "WBC >50,000, PMN-dominant, culture pending", next: {
        leaf: true, diagnosis: "Septic arthritis likely (crystals still possible)",
        treatment: ["Treat empirically as septic until cultures return: IV antibiotics (e.g. ceftriaxone ± vancomycin) + joint drainage", "Send crystal analysis regardless — crystals can coexist with infection"]
      }},
      { label: "Needle-shaped, negatively birefringent crystals", next: {
        leaf: true, diagnosis: "Gout",
        treatment: ["Acute: NSAID, colchicine, or steroid", "Long-term: allopurinol if recurrent/tophi/CKD/stones", "Start colchicine prophylaxis when initiating allopurinol"],
        notes: ["Serum urate supports but does not diagnose — synovial urate crystals do"]
      }},
      { label: "Rhomboid, weakly positive birefringent crystals", next: {
        leaf: true, diagnosis: "CPPD",
        treatment: ["Drainage", "Intra-articular steroids", "NSAIDs/colchicine if appropriate"],
        notes: ["No disease-specific antibody — consider metabolic workup if young/unusual: calcium, magnesium, phosphate, PTH, iron studies, TSH"]
      }},
      { label: "Young, sexually active, migratory arthralgia, tenosynovitis, dermatitis", next: {
        leaf: true, diagnosis: "Gonococcal Arthritis",
        treatment: ["Ceftriaxone", "Treat chlamydia if not excluded", "Treat partners"],
        notes: ["Synovial culture often negative", "Arthroscopic lavage usually not required, unlike typical septic arthritis"]
      }}
    ]
  }
},
{
  id: "dtree-rheum-polyarthritis",
  chapter: "Rheumatology",
  group: "Inflammatory Polyarthritis",
  name: "Symmetric Small-Joint Polyarthritis",
  root: {
    q: "True synovitis on exam (swollen/tender joints, inflammatory stiffness)?",
    options: [
      { label: "No — diffuse pain, normal exam/CRP/ESR", next: {
        leaf: true, diagnosis: "Fibromyalgia / central sensitization",
        treatment: ["No immunologic escalation — this is a central pain disorder, not synovitis"],
        notes: ["Look for fatigue, insomnia, cognitive symptoms, allodynia"]
      }},
      { label: "Yes — true synovitis", next: {
        q: "Which joints, and any systemic clues?",
        options: [
          { label: "MCP/PIP/wrists, DIP spared", next: {
            leaf: true, diagnosis: "Rheumatoid Arthritis",
            treatment: [
              "Confirm: RF + anti-CCP (anti-CCP more specific; predicts future RA even with arthralgia alone)",
              "Confirm inflammatory arthritis >6 weeks",
              "Start methotrexate unless contraindicated",
              "NSAIDs/low-dose steroids as bridge only",
              "If inadequate response: biologic/JAK — anti-TNF, abatacept, tocilizumab, rituximab, or a JAK inhibitor"
            ],
            notes: ["Screen TB, hepatitis, and vaccination status before biologics — anti-TNF especially can reactivate TB"]
          }},
          { label: "DIP/PIP with bony enlargement, activity-related pain", next: {
            leaf: true, diagnosis: "Osteoarthritis",
            treatment: [
              "No specific serology — RF/anti-CCP negative, ESR/CRP usually normal",
              "X-ray: joint-space narrowing, osteophytes, subchondral sclerosis, subchondral cysts",
              "Exercise, weight loss, physiotherapy",
              "Topical NSAIDs/paracetamol; oral NSAIDs if safe",
              "Intra-articular steroids for short-term relief",
              "Joint replacement for severe end-stage large-joint disease"
            ]
          }},
          { label: "Malar/photosensitive rash, cytopenias, serositis", next: {
            leaf: true, diagnosis: "SLE",
            treatment: [
              "Confirm: ANA (sensitive) + anti-dsDNA (nephritis/activity) + anti-Sm (specific) + C3/C4 (low = active)",
              "Check urine protein/hematuria/RBC casts for nephritis",
              "All patients: hydroxychloroquine lifelong unless contraindicated",
              "Mild skin/joint disease: hydroxychloroquine ± NSAIDs/topical steroids",
              "Moderate systemic disease: steroid bridge + methotrexate/azathioprine/MMF",
              "Lupus nephritis: hydroxychloroquine + steroids + mycophenolate mofetil",
              "Severe/refractory organ disease: cyclophosphamide/biologics depending on organ"
            ]
          }}
        ]
      }}
    ]
  }
},
{
  id: "dtree-rheum-spa",
  chapter: "Rheumatology",
  group: "Spondyloarthritis",
  name: "Inflammatory Back Pain / Seronegative Arthritis",
  root: {
    q: "Inflammatory back pain pattern?",
    clues: ["Onset before 40–45", "Chronic >3 months", "Better with exercise", "Worse with rest/night", "Morning stiffness"],
    options: [
      { label: "No", next: {
        leaf: true, diagnosis: "Not typical inflammatory back pain",
        treatment: ["Reconsider mechanical back pain or another cause"]
      }},
      { label: "Yes", next: {
        q: "Which additional feature/domain dominates?",
        clues: ["Uveitis", "Psoriasis", "IBD", "Recent GU/GI infection", "Enthesitis", "Dactylitis", "Family history", "HLA-B27"],
        options: [
          { label: "Axial only — no psoriasis/IBD/preceding infection", next: {
            leaf: true, diagnosis: "Pure Axial SpA",
            treatment: [
              "Confirm: RF/anti-CCP negative; HLA-B27 supportive (not diagnostic); ESR/CRP may be elevated",
              "Imaging: SI joint x-ray; MRI SI joints if early/non-radiographic",
              "NSAIDs + exercise/physiotherapy (response usually rapid)",
              "If not controlled: TNF inhibitor (typically first biologic after NSAID failure)",
              "Second-line: IL-17 inhibitor or JAK inhibitor"
            ]
          }},
          { label: "Psoriasis, nail pitting, dactylitis, DIP disease", next: {
            leaf: true, diagnosis: "Psoriatic Arthritis",
            treatment: [
              "Confirm: RF/anti-CCP usually negative; HLA-B27 if axial disease",
              "Peripheral polyarthritis: methotrexate",
              "Axial disease: treat like axial SpA",
              "Severe skin/nails: IL-17/IL-23/TNF inhibitor depending on IBD and comorbidities"
            ],
            notes: ["Treat by domain — peripheral arthritis, axial disease, enthesitis, dactylitis, skin, and nails may each need separate consideration"]
          }},
          { label: "1–4 weeks after chlamydia or GI infection, lower-limb oligoarthritis", next: {
            leaf: true, diagnosis: "Reactive Arthritis",
            treatment: [
              "Confirm: RF/anti-CCP negative; HLA-B27 supportive; test/treat chlamydia if relevant",
              "NSAIDs",
              "Intra-articular steroids",
              "Treat the active infection",
              "DMARD/biologic only if chronic"
            ],
            notes: ["Not septic arthritis — a reaction to infection elsewhere; usually self-limited"]
          }},
          { label: "Crohn's/UC with peripheral or axial joint disease", next: {
            leaf: true, diagnosis: "IBD-Associated Arthritis",
            treatment: [
              "Confirm: seronegative; HLA-B27 if axial",
              "Peripheral disease: treat the IBD — usually parallels bowel activity",
              "Axial disease: NSAIDs cautiously, TNF inhibitor often useful"
            ],
            notes: ["Avoid IL-17 inhibitors — not suitable in IBD-associated disease"]
          }}
        ]
      }}
    ]
  }
},
{
  id: "dtree-rheum-vasculitis",
  chapter: "Rheumatology",
  group: "Vasculitis",
  name: "Suspected Vasculitis",
  root: {
    q: "Predominant vessel size / pattern?",
    clues: ["Palpable purpura", "Glomerulonephritis", "Pulmonary hemorrhage", "Mononeuritis multiplex", "Skin ulcers/nodules"],
    options: [
      { label: "Small vessel — ANCA features (ENT, lung, kidney)", next: {
        q: "Which ANCA pattern / organ combination?",
        options: [
          { label: "ENT disease + lung nodules/cavitation + RPGN", next: {
            leaf: true, diagnosis: "GPA (Granulomatosis with Polyangiitis)",
            treatment: [
              "Confirm: PR3-ANCA/c-ANCA most classic",
              "Organ-threatening disease: high-dose steroids + rituximab or cyclophosphamide",
              "Maintenance: rituximab, azathioprine, methotrexate, or MMF",
              "Avacopan can be steroid-sparing"
            ]
          }},
          { label: "Pulmonary hemorrhage + RPGN, no granulomatous ENT disease", next: {
            leaf: true, diagnosis: "MPA (Microscopic Polyangiitis)",
            treatment: [
              "Confirm: MPO-ANCA/p-ANCA most classic",
              "Organ-threatening disease: high-dose steroids + rituximab or cyclophosphamide",
              "Maintenance: rituximab, azathioprine, methotrexate, or MMF"
            ]
          }},
          { label: "Asthma + eosinophilia + neuropathy/pulmonary infiltrates", next: {
            leaf: true, diagnosis: "EGPA (Eosinophilic Granulomatosis with Polyangiitis)",
            treatment: [
              "Confirm: MPO/p-ANCA sometimes positive — can be ANCA-negative; eosinophilia is key",
              "Organ-threatening disease: high-dose steroids + rituximab or cyclophosphamide",
              "Eosinophilic disease: anti-IL5 (mepolizumab/benralizumab)"
            ],
            notes: ["ANCA-negative patients tend toward more lung/cardiac disease; ANCA-positive toward more renal/neuropathy"]
          }}
        ]
      }},
      { label: "Small vessel — immune-complex features", next: {
        q: "Which clinical/serologic pattern?",
        options: [
          { label: "HCV+, purpura, arthralgia, neuropathy, kidney disease", next: {
            leaf: true, diagnosis: "Cryoglobulinemic Vasculitis",
            treatment: [
              "Confirm: HCV positive, low C4 (often very low), RF positive, cryoglobulins positive",
              "Treat the HCV",
              "Rituximab + steroids if significant",
              "Plasmapheresis if life-threatening"
            ]
          }},
          { label: "Child, post-URI, palpable purpura, abdominal pain, hematuria", next: {
            leaf: true, diagnosis: "IgA Vasculitis",
            treatment: [
              "No standard serum antibody — IgA deposition on biopsy if needed",
              "Usually supportive",
              "Steroids for severe GI/joint symptoms",
              "Nephrology/immunosuppression if severe nephritis"
            ]
          }}
        ]
      }},
      { label: "Medium vessel — abdominal pain, neuropathy, renal ischemia, no GN", next: {
        leaf: true, diagnosis: "Polyarteritis Nodosa (PAN)",
        treatment: [
          "Confirm: ANCA negative; HBV positive sometimes; no glomerulonephritis; angiography shows microaneurysms/stenoses; biopsy shows necrotizing medium-vessel vasculitis",
          "Mild: steroids + methotrexate/azathioprine",
          "Severe: high-dose steroids + cyclophosphamide",
          "HBV-associated: antiviral therapy"
        ]
      }},
      { label: "Large vessel, age >50, headache/jaw claudication/visual symptoms", next: {
        leaf: true, diagnosis: "Giant Cell Arteritis (GCA)",
        treatment: [
          "Start high-dose steroids immediately — do not wait for biopsy",
          "Temporal artery ultrasound (halo sign) or biopsy to confirm",
          "CTA/MRA/PET-CT if large-vessel disease suspected",
          "Tocilizumab for steroid-sparing/relapse"
        ],
        notes: ["ESR/CRP high; thrombocytosis/anemia common; no specific antibody"]
      }},
      { label: "Large vessel, young woman, limb claudication, asymmetric BP/pulses", next: {
        leaf: true, diagnosis: "Takayasu Arteritis",
        treatment: ["Imaging: MRA/CTA/PET-CT", "High-dose steroids", "Steroid-sparing immunosuppression/biologics if needed"],
        notes: ["No specific antibody; ESR/CRP often high"]
      }}
    ]
  }
},
{
  id: "dtree-rheum-myositis",
  chapter: "Rheumatology",
  group: "Myositis",
  name: "Proximal Muscle Weakness (Myositis)",
  root: {
    q: "True myopathy? (rising from a chair, climbing stairs, lifting arms, neck weakness, dysphagia — not just pain)",
    options: [
      { label: "No — pain without true weakness", next: {
        leaf: true, diagnosis: "Not a true myopathy",
        treatment: ["Reconsider PMR, fibromyalgia, or another cause of pain without objective weakness"]
      }},
      { label: "Yes", next: {
        q: "Check CK/aldolase — which clinical/serologic pattern?",
        clues: ["CK/CPK", "Aldolase", "AST/ALT/LDH (can rise from muscle)", "Troponin if cardiac involvement possible"],
        options: [
          { label: "Heliotrope rash, Gottron papules, shawl sign", next: {
            leaf: true, diagnosis: "Dermatomyositis",
            treatment: ["Confirm: anti-Mi-2 (classic); ANA may be positive", "High-dose steroids", "Methotrexate/azathioprine", "IVIG/rituximab if refractory"]
          }},
          { label: "ILD + mechanic's hands/Raynaud/arthritis", next: {
            leaf: true, diagnosis: "Anti-Synthetase Syndrome",
            treatment: ["Confirm: anti-Jo-1 most common (other anti-tRNA synthetase antibodies possible)", "Steroids + a steroid-sparing agent", "If ILD prominent: MMF/tacrolimus/azathioprine/rituximab depending on severity"]
          }},
          { label: "Minimal muscle disease, hand ulcers, rapidly progressive ILD, high ferritin", next: {
            leaf: true, diagnosis: "Anti-MDA5 (Amyopathic) Dermatomyositis",
            treatment: ["Confirm: anti-MDA5", "Aggressive combination immunosuppression started early"],
            notes: ["Relatively rare but can be lethal — rapid pulmonary deterioration despite mild muscle disease"]
          }},
          { label: "Severe necrotizing weakness, very high CK, statin history", next: {
            leaf: true, diagnosis: "Immune-Mediated Necrotizing Myopathy",
            treatment: ["Confirm: anti-HMGCR if statin-associated; anti-SRP if severe dysphagia/cardiac involvement", "Stop the statin if relevant", "High-dose steroids + IVIG/rituximab or other immunosuppression"]
          }}
        ]
      }}
    ]
  }
},
{
  id: "dtree-rheum-sle-nephritis",
  chapter: "Rheumatology",
  group: "SLE & APS",
  name: "SLE, Nephritis & Complement",
  root: {
    q: "ANA ≥1:80 present? (entry criterion)",
    options: [
      { label: "No", next: {
        leaf: true, diagnosis: "SLE unlikely by current classification",
        treatment: ["ANA ≥1:80 is the required entry gate — reconsider another diagnosis if persistently negative"]
      }},
      { label: "Yes", next: {
        q: "Active nephritis suspected? (abnormal urinalysis, rising creatinine, RBC casts, low complement, anti-dsDNA positive)",
        options: [
          { label: "No — skin/joints/serositis/cytopenias only", next: {
            leaf: true, diagnosis: "SLE — no organ-threatening disease",
            treatment: [
              "Hydroxychloroquine (all patients, lifelong unless contraindicated)",
              "NSAIDs/topical steroids for mild skin/joint disease",
              "Short steroid course if needed",
              "Methotrexate/azathioprine if persistent arthritis/skin/systemic symptoms"
            ]
          }},
          { label: "Yes — active nephritis", next: {
            leaf: true, diagnosis: "Lupus Nephritis",
            treatment: [
              "Check urine protein/creatinine ratio, creatinine, RBC casts, C3/C4, anti-dsDNA",
              "Kidney biopsy if active sediment/proteinuria (\"full-house\" IgG/IgA/IgM/C3/C1q supports lupus nephritis)",
              "Hydroxychloroquine + steroids as induction/bridge",
              "Mycophenolate mofetil first-line commonly",
              "Add/consider a calcineurin inhibitor, especially in class V/membranous",
              "Cyclophosphamide if severe/refractory/emergency"
            ]
          }}
        ]
      }}
    ]
  }
},
{
  id: "dtree-rheum-aps",
  chapter: "Rheumatology",
  group: "SLE & APS",
  name: "Thrombosis, Pregnancy Loss & Prolonged PTT (APS)",
  root: {
    q: "Which clinical scenario points to antiphospholipid syndrome?",
    clues: ["Recurrent DVT/PE", "Stroke/MI at young age", "Recurrent pregnancy loss", "Livedo reticularis", "Thrombocytopenia", "Prolonged PTT but clotting clinically"],
    options: [
      { label: "First venous thrombosis", next: {
        leaf: true, diagnosis: "APS — first venous event",
        treatment: ["Confirm: lupus anticoagulant, anticardiolipin, anti-β2GP1 — repeat positive ≥12 weeks apart", "Warfarin", "Avoid DOACs in high-risk APS"]
      }},
      { label: "Arterial thrombosis or recurrent event", next: {
        leaf: true, diagnosis: "APS — arterial/recurrent",
        treatment: ["Confirm serology as above; triple positivity = highest risk", "Higher-intensity anticoagulation and/or aspirin addition depending on case", "Avoid DOACs in high-risk APS"]
      }},
      { label: "Recurrent pregnancy loss", next: {
        leaf: true, diagnosis: "APS — pregnancy",
        treatment: ["Confirm serology as above", "LMWH + aspirin during pregnancy", "Avoid DOACs in high-risk APS"]
      }}
    ]
  }
},
{
  id: "dtree-rheum-raynaud",
  chapter: "Rheumatology",
  group: "Systemic Sclerosis",
  name: "Raynaud / Skin Thickening",
  root: {
    q: "Primary or secondary Raynaud?",
    clues: ["1°: young, symmetric, mild, normal capillaroscopy, no ulcers, negative serology", "2°: later onset, painful/asymmetric, digital ulcers/pitting scars, abnormal capillaroscopy, positive ANA"],
    options: [
      { label: "Primary", next: {
        leaf: true, diagnosis: "Primary Raynaud",
        treatment: ["Reassurance, cold avoidance", "CCB if symptomatic"]
      }},
      { label: "Secondary — systemic sclerosis suspected", next: {
        q: "Antibody pattern?",
        options: [
          { label: "Anti-centromere", next: {
            leaf: true, diagnosis: "Limited SSc / CREST",
            treatment: ["Raynaud: CCB", "GERD: PPI", "Screen for pulmonary arterial hypertension — higher risk with this antibody"]
          }},
          { label: "Anti-topoisomerase I (Scl-70)", next: {
            leaf: true, diagnosis: "Diffuse SSc",
            treatment: ["Raynaud: CCB", "GERD: PPI", "Screen for ILD — higher risk with this antibody; treat with MMF/rituximab/cyclophosphamide/nintedanib depending on severity"]
          }},
          { label: "Anti-RNA polymerase III", next: {
            leaf: true, diagnosis: "SSc — renal crisis risk",
            treatment: ["Raynaud: CCB", "GERD: PPI", "Renal crisis: ACE inhibitor immediately if it occurs"],
            notes: ["Do not give prophylactic ACEi without a crisis — routine use is not recommended"]
          }}
        ]
      }}
    ]
  }
},
{
  id: "dtree-rheum-fmf",
  chapter: "Rheumatology",
  group: "Autoinflammatory Disease",
  name: "Recurrent Fever / Serositis",
  root: {
    q: "Recurrent self-limited attacks with symptom-free intervals, and no autoantibodies?",
    options: [
      { label: "No", next: {
        leaf: true, diagnosis: "Consider classic autoimmune disease instead",
        treatment: ["Autoinflammatory pattern not met — reconsider an autoantibody-driven diagnosis"]
      }},
      { label: "Yes", next: {
        q: "Mediterranean background, 1–3 day attacks, family history, colchicine-responsive?",
        clues: ["Fever + peritonitis/pleuritis", "Lower-limb monoarthritis", "Erysipelas-like erythema"],
        options: [
          { label: "Yes", next: {
            leaf: true, diagnosis: "Familial Mediterranean Fever (FMF)",
            treatment: [
              "Diagnosis is clinical (genetic testing supportive, not always diagnostic)",
              "Colchicine lifelong — prevents attacks and AA amyloidosis",
              "Monitor proteinuria for AA amyloidosis",
              "Anti-IL1 therapy if colchicine-resistant"
            ]
          }},
          { label: "No", next: {
            leaf: true, diagnosis: "Other autoinflammatory syndrome",
            treatment: ["Diagnosis is clinical/inflammatory-marker/genetics-based — no specific autoantibody test", "Specialist referral for further genetic workup"]
          }}
        ]
      }}
    ]
  }
},
{
  id: "dtree-nephro-triage",
  chapter: "Nephrology",
  group: "General Approach",
  name: "Nephrology Triage — What's the Main Problem?",
  root: {
    q: "Which pattern fits best?",
    options: [
      { label: "Electrolyte / osmolality problem", next: {
        leaf: true, diagnosis: "Electrolyte / Osmolality Problem",
        treatment: ["Check: Na, K, osmolality, urine osmolality, urine Na"]
      }},
      { label: "Kidney injury", next: {
        leaf: true, diagnosis: "Kidney Injury",
        treatment: ["Check: creatinine trend, oliguria/anuria, urine sediment, renal ultrasound"]
      }},
      { label: "Glomerular problem", next: {
        leaf: true, diagnosis: "Glomerular Problem",
        treatment: ["Check: proteinuria, hematuria, RBC casts, dysmorphic RBCs, edema, HTN"]
      }},
      { label: "Hypertension", next: {
        leaf: true, diagnosis: "Hypertension",
        treatment: ["Determine primary vs secondary, and emergency vs chronic"]
      }},
      { label: "Acid-base problem", next: {
        leaf: true, diagnosis: "Acid-Base Problem",
        treatment: ["Check: pH, HCO3, PCO2, anion gap, compensation"]
      }}
    ]
  }
},
{
  id: "dtree-nephro-hypernatremia",
  chapter: "Nephrology",
  group: "Sodium & Water",
  name: "Hypernatremia",
  root: {
    q: "Volume status? (Na >145)",
    options: [
      { label: "Hypovolemic", next: {
        leaf: true, diagnosis: "Hypovolemic Hypernatremia",
        treatment: [
          "Most common pattern",
          "Dehydration/loss of hypotonic fluids: sweating, GI/respiratory water loss, vomiting, osmotic diarrhea, osmotic diuresis (glucose/urea)",
          "Treatment: fluids"
        ],
        notes: ["Acute (<48h): correct over ~24h. Chronic: correct slowly, up to ~10 mEq/day, to avoid cerebral edema"]
      }},
      { label: "Euvolemic", next: {
        q: "Urine osmolality?",
        options: [
          { label: "<300", next: {
            q: "Responds to desmopressin?",
            options: [
              { label: "Yes — central", next: {
                leaf: true, diagnosis: "Central Diabetes Insipidus",
                treatment: ["Cause: low ADH secretion — trauma, malignancy, granuloma, infection, toxins", "Treatment: desmopressin, low-salt diet"],
                notes: ["Acute (<48h): correct over ~24h. Chronic: correct slowly, up to ~10 mEq/day, to avoid cerebral edema"]
              }},
              { label: "No — nephrogenic", next: {
                leaf: true, diagnosis: "Nephrogenic Diabetes Insipidus",
                treatment: ["Cause: renal resistance to ADH — congenital, lithium, hypercalcemia", "Treatment: low-salt diet, thiazide, NSAID"],
                notes: ["Acute (<48h): correct over ~24h. Chronic: correct slowly, up to ~10 mEq/day, to avoid cerebral edema"]
              }}
            ]
          }},
          { label: "300–600", next: {
            leaf: true, diagnosis: "Partial DI or Osmotic Diuresis",
            treatment: ["Look for a specific cause — partial DI vs osmotic diuresis (glucose, urea, mannitol)"]
          }},
          { label: ">600", next: {
            leaf: true, diagnosis: "Dehydration with Intact ADH Response",
            treatment: ["Appropriate ADH response to volume depletion", "Treatment: free water repletion"]
          }}
        ]
      }},
      { label: "Hypervolemic", next: {
        leaf: true, diagnosis: "Hypervolemic Hypernatremia",
        treatment: ["Rare — sodium gain (iatrogenic sodium/fluids)", "Treatment: treat the root cause, diuretics, hypotonic fluids"],
        notes: ["Acute (<48h): correct over ~24h. Chronic: correct slowly, up to ~10 mEq/day, to avoid cerebral edema"]
      }}
    ]
  }
},
{
  id: "dtree-nephro-hyponatremia",
  chapter: "Nephrology",
  group: "Sodium & Water",
  name: "Hyponatremia",
  root: {
    q: "Serum osmolality? (Na <135)",
    options: [
      { label: "Normal (isotonic)", next: {
        leaf: true, diagnosis: "Pseudohyponatremia",
        treatment: ["Cause: hypertriglyceridemia, high proteins (e.g. multiple myeloma)", "No true water excess — treat the underlying cause, not with fluid restriction"]
      }},
      { label: "High (hypertonic)", next: {
        leaf: true, diagnosis: "Hyperglycemia-Induced Hyponatremia",
        treatment: ["Glucose pulls water out of cells, lowering measured Na", "Correct/normalize as glucose is treated — not true hyponatremia"]
      }},
      { label: "Low (hypotonic)", next: {
        q: "Severe neurologic symptoms (seizures, severe confusion)?",
        options: [
          { label: "Yes", next: {
            leaf: true, diagnosis: "Symptomatic Severe Hyponatremia",
            treatment: ["3% hypertonic saline, carefully", "Goal: avoid osmotic demyelination syndrome from overly rapid correction"],
            notes: ["In high-risk hypovolemic hyponatremia, may aim for only 4–6 mEq rise in 24h"]
          }},
          { label: "No", next: {
            q: "Urine osmolality?",
            options: [
              { label: "Very low (~50–100)", next: {
                leaf: true, diagnosis: "Primary Polydipsia",
                treatment: ["Excessive water intake overwhelms free water excretion", "Treatment: fluid restriction; address the drive to drink"]
              }},
              { label: "High (ADH active)", next: {
                q: "Volume status?",
                options: [
                  { label: "Hypervolemic", next: {
                    leaf: true, diagnosis: "Hypervolemic Hyponatremia",
                    treatment: ["Causes: heart failure, cirrhosis, nephrotic syndrome", "Mechanism: low effective arterial blood volume → RAAS/ADH activation", "Treatment: fluid restriction, loop diuretic"]
                  }},
                  { label: "Euvolemic", next: {
                    leaf: true, diagnosis: "Euvolemic Hyponatremia (SIADH and other causes)",
                    treatment: [
                      "SIADH causes: CNS disease, lung infections, nausea, malignancy, drugs",
                      "Other causes: CKD, hypothyroidism, Addison's disease, MDMA",
                      "SIADH treatment: treat the cause, fluid restriction, PO/IV salt, furosemide, vaptans in selected cases"
                    ],
                    notes: ["Avoid isotonic saline in SIADH if urine osmolality >300 — it can worsen the hyponatremia"]
                  }},
                  { label: "Hypovolemic", next: {
                    leaf: true, diagnosis: "Hypovolemic Hyponatremia",
                    treatment: ["Causes: vomiting, diarrhea, diuretics (especially thiazides), renal salt wasting/kidney disease", "Treatment: isotonic saline"]
                  }}
                ]
              }}
            ]
          }}
        ]
      }}
    ]
  }
},
{
  id: "dtree-nephro-hypokalemia",
  chapter: "Nephrology",
  group: "Potassium",
  name: "Hypokalemia",
  root: {
    q: "Redistribution into cells, or true potassium loss? (K <3.5)",
    clues: ["Danger: K<2.5–3", "Severe weakness/paralysis", "Arrhythmia", "ECG: low T waves, U waves, ST depression"],
    options: [
      { label: "Redistribution", next: {
        leaf: true, diagnosis: "Hypokalemia from Redistribution",
        treatment: [
          "Causes: insulin, beta-adrenergic stimulation, alkalosis, hypokalemic periodic paralysis, high proliferative states, post-B12/folate/G-CSF treatment",
          "Treat the trigger; repletion often needed only if severe"
        ]
      }},
      { label: "True loss", next: {
        q: "Acid-base pattern?",
        options: [
          { label: "Metabolic alkalosis", next: {
            leaf: true, diagnosis: "Hypokalemia + Metabolic Alkalosis",
            treatment: [
              "Causes: vomiting, diuretics, Bartter syndrome, Gitelman syndrome, hyperaldosteronism/mineralocorticoid excess",
              "Check urine K: high = renal wasting, low = extrarenal loss",
              "Replete potassium (PO if mild/moderate, IV if severe); replete magnesium if low"
            ]
          }},
          { label: "Metabolic acidosis", next: {
            leaf: true, diagnosis: "Hypokalemia + Metabolic Acidosis",
            treatment: [
              "Causes: diarrhea, renal tubular acidosis (RTA)",
              "Check urine K: high = renal wasting (RTA), low = extrarenal (diarrhea)",
              "Replete potassium (PO if mild/moderate, IV if severe); replete magnesium if low"
            ]
          }}
        ]
      }}
    ]
  }
},
{
  id: "dtree-nephro-hyperkalemia",
  chapter: "Nephrology",
  group: "Potassium",
  name: "Hyperkalemia",
  root: {
    q: "Real hyperkalemia, or pseudohyperkalemia? (K >5)",
    clues: ["Pseudo: hemolysis/cell lysis in the tube", "Thrombocytosis/leukocytosis", "Difficult blood draw"],
    options: [
      { label: "Pseudohyperkalemia", next: {
        leaf: true, diagnosis: "Pseudohyperkalemia",
        treatment: ["Repeat the sample properly before treating", "No treatment needed once confirmed artifactual"]
      }},
      { label: "Real hyperkalemia", next: {
        q: "Dangerous ECG changes or symptoms?",
        clues: ["Severe weakness/paralysis", "Conduction defects: LBBB, RBBB, AV block", "Peaked/hyperacute T waves", "VT/VF"],
        options: [
          { label: "Yes — unstable", next: {
            leaf: true, diagnosis: "Hyperkalemia — Unstable",
            treatment: [
              "1) Stabilize the myocardium: calcium gluconate/chloride",
              "2) Shift K into cells: insulin + glucose, beta-agonist inhalation, bicarbonate if metabolic acidosis",
              "3) Remove K from the body: saline + furosemide if kidneys work, potassium binders, dialysis if severe/refractory"
            ]
          }},
          { label: "No — stable", next: {
            leaf: true, diagnosis: "Hyperkalemia — Stable",
            treatment: [
              "Shift K into cells: insulin + glucose, beta-agonist inhalation",
              "Remove K from the body: saline + furosemide if kidneys work, potassium binders, dialysis if severe/refractory"
            ]
          }}
        ]
      }}
    ]
  }
},
{
  id: "dtree-nephro-aki",
  chapter: "Nephrology",
  group: "AKI",
  name: "Acute Kidney Injury",
  root: {
    q: "Obstruction present?",
    clues: ["Anuria", "Urinary retention", "BPH", "Renal colic", "Malignancy", "Neurogenic bladder", "Hydronephrosis on imaging"],
    options: [
      { label: "Yes — post-renal", next: {
        leaf: true, diagnosis: "Post-Renal AKI",
        treatment: ["Renal/bladder ultrasound ± urinary catheter to relieve obstruction", "Treat the underlying obstructive cause"],
        notes: ["Dialysis indications (AEIOU): severe Acidosis, Electrolyte derangement (esp. hyperkalemia), Intoxication, volume Overload, Uremia — also drug-resistant HTN and pH <7.1"]
      }},
      { label: "No obstruction", next: {
        q: "Pre-renal or intrinsic?",
        options: [
          { label: "Pre-renal", next: {
            leaf: true, diagnosis: "Pre-Renal AKI",
            treatment: [
              "Causes: hypovolemia, shock, cardiorenal syndrome, hepatorenal syndrome, NSAIDs (afferent arteriole constriction), ACEi/ARB (efferent arteriole dilation)",
              "Findings: hypotension/orthostasis/tachycardia, bland sediment, low urine Na, low FENa, high urine osmolality, high urea",
              "Fluid-responsiveness test: GFR/creatinine should improve with fluids"
            ],
            notes: ["Dialysis indications (AEIOU): severe Acidosis, Electrolyte derangement (esp. hyperkalemia), Intoxication, volume Overload, Uremia — also drug-resistant HTN and pH <7.1"]
          }},
          { label: "Intrinsic", next: {
            q: "Urine sediment / clinical clue?",
            options: [
              { label: "Muddy brown casts", next: {
                leaf: true, diagnosis: "Acute Tubular Necrosis (ATN)",
                treatment: [
                  "Causes: prolonged ischemia, sepsis, nephrotoxins (aminoglycosides, antivirals/antifungals, cisplatin, contrast)",
                  "Findings: muddy brown casts, oliguria/anuria, low urine osmolality, FENa >2%, urine Na >40",
                  "Treatment: supportive; remove the offending nephrotoxin"
                ],
                notes: ["Dialysis indications (AEIOU): severe Acidosis, Electrolyte derangement (esp. hyperkalemia), Intoxication, volume Overload, Uremia — also drug-resistant HTN and pH <7.1"]
              }},
              { label: "Fever/rash/eosinophilia, WBC casts", next: {
                leaf: true, diagnosis: "Acute Interstitial Nephritis (AIN)",
                treatment: [
                  "Drug hypersensitivity, usually days to weeks after exposure",
                  "Causes: antibiotics, PPIs, NSAIDs, infections, granulomatous disease",
                  "Findings: fever, rash, eosinophilia, malaise, uveitis/TINU, leukocyturia, WBC casts, mild proteinuria",
                  "Treatment: stop the offending drug; steroids if persistent"
                ],
                notes: ["Dialysis indications (AEIOU): severe Acidosis, Electrolyte derangement (esp. hyperkalemia), Intoxication, volume Overload, Uremia — also drug-resistant HTN and pH <7.1"]
              }},
              { label: "RBC casts, dysmorphic RBCs, proteinuria, HTN", next: {
                leaf: true, diagnosis: "Acute GN / RPGN",
                treatment: [
                  "Categories: immune complex GN, anti-GBM disease, ANCA vasculitis, lupus nephritis, IgA nephropathy, post-infectious GN",
                  "See the Nephritic Syndrome tree for the specific differential and treatment"
                ],
                notes: ["Dialysis indications (AEIOU): severe Acidosis, Electrolyte derangement (esp. hyperkalemia), Intoxication, volume Overload, Uremia — also drug-resistant HTN and pH <7.1"]
              }},
              { label: "Thrombocytopenia, MAHA, high LDH", next: {
                leaf: true, diagnosis: "Thrombotic Microangiopathy (TMA)",
                treatment: [
                  "Findings: AKI, thrombocytopenia, microangiopathic hemolytic anemia, high LDH/bilirubin, severe HTN",
                  "Urgent hematology/nephrology involvement — treat the specific TMA syndrome (e.g. TTP, HUS, malignant HTN)"
                ],
                notes: ["Dialysis indications (AEIOU): severe Acidosis, Electrolyte derangement (esp. hyperkalemia), Intoxication, volume Overload, Uremia — also drug-resistant HTN and pH <7.1"]
              }}
            ]
          }}
        ]
      }}
    ]
  }
},
{
  id: "dtree-nephro-nephrotic",
  chapter: "Nephrology",
  group: "Glomerular Disease",
  name: "Nephrotic Syndrome",
  root: {
    q: "Which clue best fits?",
    clues: ["Proteinuria >3.5g/day", "Hypoalbuminemia", "Edema", "Hypercholesterolemia", "Urine: lipid droplets, oval fat bodies, fatty casts, Maltese cross crystals"],
    options: [
      { label: "Children, or 2° to hematologic cancer/drugs/autoimmune", next: {
        leaf: true, diagnosis: "Minimal Change Disease",
        treatment: ["Most common in children; can be secondary to hematologic malignancy, drugs, or autoimmune disease", "Treatment: steroids first-line"],
        notes: ["General nephrotic principles: ACEi/ARB to reduce proteinuria, low-salt diet + furosemide for edema, statin for hyperlipidemia, immunization (infection risk)"]
      }},
      { label: "Most common cause overall; 2° to obesity/HIV/heroin/interferon", next: {
        leaf: true, diagnosis: "FSGS",
        treatment: ["Primary (idiopathic), or secondary to obesity, HIV, heroin, interferon, chronic kidney disease", "Treatment: steroids/immunosuppression (primary); treat the cause (secondary)"],
        notes: ["General nephrotic principles: ACEi/ARB to reduce proteinuria, low-salt diet + furosemide for edema, statin for hyperlipidemia, immunization (infection risk)"]
      }},
      { label: "Adult nephrotic, associated with malignancy/infection/NSAIDs", next: {
        leaf: true, diagnosis: "Membranous Nephropathy",
        treatment: ["Classic adult nephrotic syndrome cause", "Associations: malignancy, infections, NSAIDs — screen for these", "Anticoagulation if very low albumin — high thrombosis risk"],
        notes: ["General nephrotic principles: ACEi/ARB to reduce proteinuria, low-salt diet + furosemide for edema, statin for hyperlipidemia, immunization (infection risk)"]
      }},
      { label: "Chronic inflammatory or hematologic disease", next: {
        leaf: true, diagnosis: "Amyloidosis (AL/AA)",
        treatment: ["AL (plasma-cell dyscrasia) or AA (chronic inflammatory disease)", "Treat the underlying plasma-cell or inflammatory disease"],
        notes: ["General nephrotic principles: ACEi/ARB to reduce proteinuria, low-salt diet + furosemide for edema, statin for hyperlipidemia, immunization (infection risk)"]
      }},
      { label: "Long-standing diabetes, albuminuria", next: {
        leaf: true, diagnosis: "Diabetic Nephropathy",
        treatment: ["Most common adult cause of nephrotic-range proteinuria overall", "Treatment: ACEi/ARB, SGLT2 inhibitor, glycemic control"],
        notes: ["General nephrotic principles: low-salt diet + furosemide for edema, statin for hyperlipidemia, low-protein diet in selected patients"]
      }}
    ]
  }
},
{
  id: "dtree-nephro-nephritic",
  chapter: "Nephrology",
  group: "Glomerular Disease",
  name: "Nephritic Syndrome",
  root: {
    q: "Which clue best fits?",
    clues: ["Hematuria", "Oliguria", "HTN", "Proteinuria (usually 1.5–3g/day)", "Edema", "RBC casts + dysmorphic RBCs = glomerular disease"],
    options: [
      { label: "Repeated post-infectious hematuria (esp. with URI)", next: {
        leaf: true, diagnosis: "IgA Nephropathy",
        treatment: ["Classic: gross hematuria episodes concurrent with or shortly after a URI", "Treatment: supportive (ACEi/ARB, BP control) ± steroids/immunosuppression if progressive"],
        notes: ["General nephritic support: low-salt diet, ACEi/ARB, diuretics"]
      }},
      { label: "ASLO/anti-DNase B positive, often self-limited", next: {
        leaf: true, diagnosis: "Post-Infectious GN",
        treatment: ["Follows streptococcal (or other) infection", "Usually self-limited — supportive care"],
        notes: ["General nephritic support: low-salt diet, ACEi/ARB, diuretics"]
      }},
      { label: "ANA, anti-dsDNA, anti-Sm, anti-cardiolipin positive", next: {
        leaf: true, diagnosis: "Lupus Nephritis",
        treatment: ["Treatment: steroids + immunosuppression (e.g. mycophenolate mofetil)"],
        notes: ["General nephritic support: low-salt diet, ACEi/ARB, diuretics"]
      }},
      { label: "GPA/MPA/EGPA, pauci-immune", next: {
        leaf: true, diagnosis: "ANCA Vasculitis",
        treatment: ["Treatment: steroids + immunosuppression (e.g. rituximab or cyclophosphamide)"],
        notes: ["General nephritic support: low-salt diet, ACEi/ARB, diuretics"]
      }},
      { label: "RPGN ± pulmonary hemorrhage", next: {
        leaf: true, diagnosis: "Anti-GBM Disease (Goodpasture)",
        treatment: ["Treatment: steroids + immunosuppression + plasmapheresis"],
        notes: ["General nephritic support: low-salt diet, ACEi/ARB, diuretics"]
      }},
      { label: "HCV+, RF+, low complement", next: {
        leaf: true, diagnosis: "Cryoglobulinemia",
        treatment: ["Often mild renal disease", "Treatment: treat the underlying HCV"],
        notes: ["General nephritic support: low-salt diet, ACEi/ARB, diuretics"]
      }}
    ]
  }
},
{
  id: "dtree-nephro-htn",
  chapter: "Nephrology",
  group: "Hypertension",
  name: "Hypertension",
  root: {
    q: "Hypertensive emergency? (severe BP + acute target-organ damage)",
    clues: ["Encephalopathy", "Stroke", "Pulmonary edema", "ACS", "AKI", "Aortic dissection", "Papilledema", "TMA/hemolysis"],
    options: [
      { label: "Yes — emergency", next: {
        leaf: true, diagnosis: "Hypertensive Emergency",
        treatment: ["IV BP-lowering, tailored to the specific syndrome (e.g. stroke, dissection, pulmonary edema)", "Identify and treat the specific target-organ process driving urgency"]
      }},
      { label: "No acute organ damage", next: {
        q: "Primary or secondary HTN?",
        clues: ["Suspect secondary: young patient, resistant HTN, acute severe onset, hypokalemia, renal dysfunction after ACEi/ARB, episodic headache/sweating/palpitations, renal bruit, OSA, pregnancy/eclampsia, drug-induced"],
        options: [
          { label: "Primary (essential) HTN", next: {
            leaf: true, diagnosis: "Primary Hypertension",
            treatment: [
              "Lifestyle: self-monitoring, weight/diet control, physical activity",
              "Drug choice by phenotype: young/proteinuric/diabetic → ACEi/ARB; older → CCB or diuretic; ischemic heart disease/tachycardia → beta-blocker; HF/volume overload → diuretics plus HF regimen"
            ]
          }},
          { label: "Suspected renovascular disease", next: {
            leaf: true, diagnosis: "Renovascular Hypertension",
            treatment: [
              "Clues: severe/resistant HTN, acute presentation, renal artery bruit, renal asymmetry, worsening renal function after ACEi/ARB, high renin",
              "Causes: renal artery stenosis, fibromuscular dysplasia (esp. young women/smokers)",
              "Diagnosis: renal artery imaging (Doppler US, CTA/MRA)"
            ]
          }},
          { label: "Suspected primary hyperaldosteronism", next: {
            leaf: true, diagnosis: "Primary Hyperaldosteronism",
            treatment: [
              "Clues: severe/resistant HTN; hypokalemia may be absent; high aldosterone:renin ratio",
              "Confirm: saline loading — aldosterone should suppress; failure to suppress confirms the diagnosis",
              "Then: imaging + adrenal venous sampling",
              "Surgery if unilateral; mineralocorticoid receptor antagonist if bilateral"
            ]
          }},
          { label: "Suspected pheochromocytoma", next: {
            leaf: true, diagnosis: "Pheochromocytoma",
            treatment: [
              "Clues: paroxysmal headache, sweating, tachycardia",
              "Test: plasma/urine metanephrine and normetanephrine",
              "Treatment: surgery after alpha-blockade, then beta-blockade if needed — never beta-block first"
            ]
          }}
        ]
      }}
    ]
  }
},
{
  id: "dtree-nephro-ckd",
  chapter: "Nephrology",
  group: "CKD",
  name: "Chronic Kidney Disease",
  root: {
    q: "Confirm chronicity — persistent low eGFR (<60) for >3 months, or a structural/functional abnormality?",
    clues: ["Albuminuria", "Pathological casts", "Abnormal imaging", "Abnormal biopsy"],
    options: [
      { label: "Not confirmed chronic", next: {
        leaf: true, diagnosis: "Not Yet CKD",
        treatment: ["Re-check GFR/urine findings — CKD requires persistence beyond 3 months, or a clear structural/functional abnormality"]
      }},
      { label: "CKD confirmed", next: {
        q: "GFR stage?",
        options: [
          { label: "Stage I–II (GFR >60, pathological finding)", next: {
            leaf: true, diagnosis: "CKD Stage I–II",
            treatment: ["Identify and treat the cause (diabetes, hypertension, chronic GN, ADPKD/cystic disease, cardiorenal syndrome)", "BP control, ACEi/ARB if proteinuric, low-salt diet, SGLT2 inhibitor for proteinuria/progression"],
            notes: ["Renal biopsy generally recommended unless there's a known cause with typical presentation, small cystic kidneys, longstanding severe HTN, or active UTI"]
          }},
          { label: "Stage III (GFR 30–60)", next: {
            leaf: true, diagnosis: "CKD Stage III",
            treatment: ["Same management as I–II, plus avoid/adjust nephrotoxic drugs (NSAIDs, contrast, gadolinium caution below GFR 30, metformin caution below GFR 45)", "Monitor for early complications: anemia, mild acid-base/electrolyte changes"],
            notes: ["Renal biopsy generally recommended unless there's a known cause with typical presentation, small cystic kidneys, longstanding severe HTN, or active UTI"]
          }},
          { label: "Stage IV (GFR 15–30)", next: {
            leaf: true, diagnosis: "CKD Stage IV",
            treatment: ["Intensify complication management: anemia (ESA/iron), CKD-MBD (phosphate control), acidosis correction", "Refer for dialysis/transplant planning"],
            notes: ["Renal biopsy generally recommended unless there's a known cause with typical presentation, small cystic kidneys, longstanding severe HTN, or active UTI"]
          }},
          { label: "Stage V (GFR <15)", next: {
            leaf: true, diagnosis: "CKD Stage V (ESRD range)",
            treatment: ["Dialysis/transplant range", "Manage uremic symptoms and prepare access/transplant workup"]
          }}
        ]
      }}
    ]
  }
},
{
  id: "dtree-nephro-ckd-complications",
  chapter: "Nephrology",
  group: "CKD",
  name: "CKD Complications",
  root: {
    q: "Which complication?",
    options: [
      { label: "Anemia", next: {
        leaf: true, diagnosis: "CKD-Associated Anemia",
        treatment: ["Pattern: normocytic normochromic, from low erythropoietin ± iron deficiency", "Treatment: iron repletion if needed, ESA, target Hb ~10–11 (higher targets cause harm)"]
      }},
      { label: "Bone/mineral disease", next: {
        leaf: true, diagnosis: "CKD-MBD",
        treatment: [
          "Mechanism: low vitamin D → high FGF23, hyperphosphatemia, hypocalcemia, high PTH",
          "Patterns: osteitis fibrosa cystica (high PTH/turnover), adynamic bone disease (low PTH/turnover), osteomalacia (mineralization defect)",
          "Treatment: reduce phosphate (diet, binders), vitamin D analogs, cinacalcet, dialysis, parathyroidectomy if refractory"
        ]
      }},
      { label: "Acidosis", next: {
        leaf: true, diagnosis: "CKD-Associated Acidosis",
        treatment: ["Usually mild until advanced CKD/ESRD", "Treat with sodium bicarbonate when HCO3 is low (e.g. <18)"]
      }},
      { label: "Hyperkalemia", next: {
        leaf: true, diagnosis: "CKD-Associated Hyperkalemia",
        treatment: ["Often iatrogenic — RAAS inhibitors, beta-blockers", "Dietary potassium restriction; GI potassium binders if needed"]
      }},
      { label: "Uremia / dialysis planning", next: {
        leaf: true, diagnosis: "Uremic Syndrome",
        treatment: [
          "Features: anorexia/malnutrition, GI ulcers, bleeding tendency, neuropathy, encephalopathy, pericarditis, pleuritis, systemic inflammation",
          "Acute dialysis indications: persistent HTN, hyperkalemia, acidosis, uremic pericarditis/pleuritis, neuropathy/encephalopathy, or GFR <5–7"
        ]
      }}
    ]
  }
},
{
  id: "dtree-nephro-metabolic-acidosis",
  chapter: "Nephrology",
  group: "Acid-Base",
  name: "Metabolic Acidosis",
  root: {
    q: "Anion gap?",
    clues: ["AG = Na − (Cl + HCO3), normal 5–12", "Correct for albumin: each 1g/dL drop ≈ +2.5 to expected AG"],
    options: [
      { label: "Normal AG (NAGMA)", next: {
        q: "Urine anion gap (= urine Na + urine K − urine Cl)?",
        options: [
          { label: "Negative (< −20)", next: {
            leaf: true, diagnosis: "NAGMA — Extrarenal Bicarbonate Loss",
            treatment: ["Think: diarrhea (GI bicarbonate loss)", "Treat the underlying GI cause; replace bicarbonate/potassium as needed"]
          }},
          { label: "Positive (>20)", next: {
            q: "Which RTA pattern?",
            options: [
              { label: "Low K, urine pH >5.3", next: {
                leaf: true, diagnosis: "Type 1 (Distal) RTA",
                treatment: ["Clues: nephrocalcinosis, hypercalciuria, low potassium", "Treatment: alkali (bicarbonate/citrate) replacement, correct hypokalemia"]
              }},
              { label: "Low K, HCO3 >15, Fanconi/MM/amyloid", next: {
                leaf: true, diagnosis: "Type 2 (Proximal) RTA",
                treatment: ["Clues: Fanconi syndrome, multiple myeloma, amyloidosis", "Treatment: alkali replacement (often larger doses), correct hypokalemia, treat the underlying cause"]
              }},
              { label: "High K, urine pH <5.3", next: {
                leaf: true, diagnosis: "Type 4 RTA",
                treatment: ["Mechanism: hypoaldosteronism (or resistance)", "Treatment: treat hyperkalemia, fludrocortisone if hypoaldosteronism confirmed, loop diuretic"]
              }}
            ]
          }}
        ]
      }},
      { label: "High AG (HAGMA)", next: {
        leaf: true, diagnosis: "HAGMA (MUDPILES)",
        treatment: [
          "Causes: Methanol, Uremia, Diabetic ketoacidosis, Paraldehyde, Iron/Isoniazid, Lactic acidosis, Ethylene glycol, Salicylates",
          "Workup: lactate (shock/ischemia/toxin), ketones (DKA/alcoholic ketoacidosis), GFR (uremia), osmolal gap (toxic alcohols)"
        ],
        notes: ["Delta ratio (24−HCO3)/(AG−12): <1 → combined HAGMA+NAGMA; 1–2 → isolated HAGMA; >2 → HAGMA + metabolic alkalosis"]
      }}
    ]
  }
},
{
  id: "dtree-nephro-metabolic-alkalosis",
  chapter: "Nephrology",
  group: "Acid-Base",
  name: "Metabolic Alkalosis",
  root: {
    q: "Chloride responsive or unresponsive?",
    clues: ["pH >7.45, HCO3 >28"],
    options: [
      { label: "Chloride responsive", next: {
        leaf: true, diagnosis: "Chloride-Responsive Metabolic Alkalosis",
        treatment: ["Causes: vomiting (HCl loss; hypovolemia worsens renal K loss), diuretics, contraction alkalosis", "Treatment: chloride repletion — normal saline ± KCl as appropriate"]
      }},
      { label: "Chloride unresponsive, hypertensive", next: {
        leaf: true, diagnosis: "Hyperaldosteronism-Related Alkalosis",
        treatment: ["Consider primary hyperaldosteronism or a mineralocorticoid-excess/Liddle-like state", "See the Hypertension tree for the hyperaldosteronism workup"]
      }},
      { label: "Chloride unresponsive, normotensive", next: {
        leaf: true, diagnosis: "Bartter or Gitelman Syndrome",
        treatment: [
          "Bartter (mimics a loop diuretic): hypokalemic hypochloremic metabolic alkalosis, polyuria, polydipsia",
          "Gitelman (mimics a thiazide): salt wasting, RAAS activation, hypocalciuria, hypomagnesemia",
          "Treatment: potassium and magnesium repletion, salt supplementation"
        ]
      }}
    ]
  }
},
{
  id: "dtree-nephro-respiratory-acidbase",
  chapter: "Nephrology",
  group: "Acid-Base",
  name: "Respiratory Acid-Base Disorders",
  root: {
    q: "Primary process?",
    options: [
      { label: "Respiratory acidosis (high PCO2, low pH)", next: {
        leaf: true, diagnosis: "Respiratory Acidosis",
        treatment: ["Causes: CNS depression (trauma, drugs, edema), neuromuscular disorders, restrictive breathing disorders, iatrogenic ventilation problems, airway/lung disease (pneumonia, ARDS, pulmonary edema)", "Treatment: assisted ventilation (invasive or non-invasive)"]
      }},
      { label: "Respiratory alkalosis (low PCO2, high pH)", next: {
        leaf: true, diagnosis: "Respiratory Alkalosis",
        treatment: ["Causes: psychogenic/CNS stimulation, hypoxemia, drug-induced (e.g. salicylates)", "Symptoms: seizures, deep/fast breathing, tachycardia, hypotension, hypokalemia"],
        notes: ["Salicylate toxicity classically causes respiratory alkalosis PLUS a high-anion-gap metabolic acidosis together"]
      }}
    ]
  }
},
{
  id: "dtree-id-workflow",
  chapter: "Infectious Diseases",
  group: "General Approach",
  name: "ID Master Workflow — Site, Stability & Source Control",
  root: {
    q: "What's the site/syndrome?",
    options: [
      { label: "Lung", next: {
        leaf: true, diagnosis: "Pulmonary Source",
        treatment: ["Likely organisms depend on CAP vs HAP/VAP — see the Pneumonia trees", "Check stability and need for source control (e.g. empyema drainage) before narrowing"]
      }},
      { label: "Urine", next: {
        leaf: true, diagnosis: "Urinary Source",
        treatment: ["See the Urinary Tract Infection tree for cystitis vs pyelonephritis vs catheter-associated"]
      }},
      { label: "CNS", next: {
        leaf: true, diagnosis: "CNS Source",
        treatment: ["See the Meningitis & Encephalitis tree", "CT-before-LP decision and empiric antibiotics/dexamethasone should not be delayed"]
      }},
      { label: "Abdomen/pelvis", next: {
        leaf: true, diagnosis: "Abdominal/Pelvic Source",
        treatment: ["Enteric gram-negatives + anaerobes ± Enterococcus — ensure anaerobic coverage", "Source control (drain/debride/relieve obstruction) is often required, not antibiotics alone"]
      }},
      { label: "Skin/soft tissue/bone", next: {
        leaf: true, diagnosis: "Skin/Soft Tissue/Bone Source",
        treatment: ["Think Staph/Strep first", "Consider necrotizing fasciitis red flags: pain out of proportion, bullae, necrosis — see the Necrotizing Fasciitis tree"]
      }},
      { label: "Blood/catheter/valve", next: {
        leaf: true, diagnosis: "Bloodstream/Catheter/Valve Source",
        treatment: ["See the Central Line Infection & MDRO and Infective Endocarditis trees"]
      }},
      { label: "Neutropenic fever", next: {
        leaf: true, diagnosis: "Neutropenic Fever",
        treatment: ["Emergency — see the Febrile Neutropenia tree", "Start an antipseudomonal β-lactam immediately"]
      }}
    ]
  }
},
{
  id: "dtree-id-coverage",
  chapter: "Infectious Diseases",
  group: "Antibiotic Selection",
  name: "Antibiotic Coverage Gaps — Which Agent Covers What?",
  root: {
    q: "Which coverage gap are you checking?",
    options: [
      { label: "MRSA coverage", next: {
        leaf: true, diagnosis: "MRSA Coverage",
        treatment: [
          "Severe MRSA/bacteremia/sepsis: vancomycin or daptomycin",
          "MRSA pneumonia: vancomycin or linezolid (daptomycin is inactivated by pulmonary surfactant — do not use for pneumonia)",
          "Mild/moderate CA-MRSA skin infection: TMP-SMX, doxycycline, or clindamycin if susceptible",
          "Need a β-lactam with MRSA activity: ceftaroline"
        ],
        notes: ["Add MRSA coverage for: severe sepsis with MRSA risk, HAP/VAP with MRSA risk, catheter infection, purulent SSTI with systemic toxicity, prior MRSA, post-influenza severe pneumonia, endocarditis risk"]
      }},
      { label: "Pseudomonas coverage", next: {
        leaf: true, diagnosis: "Antipseudomonal Coverage",
        treatment: [
          "Penicillin/BLI: piperacillin-tazobactam",
          "Cephalosporins: cefepime, ceftazidime",
          "Carbapenems: meropenem, imipenem, doripenem (NOT ertapenem)",
          "Monobactam: aztreonam",
          "Fluoroquinolones: ciprofloxacin, levofloxacin",
          "Aminoglycosides: amikacin, tobramycin, gentamicin"
        ],
        notes: ["Think Pseudomonas: HAP/VAP, neutropenic fever, severe complicated UTI, prior Pseudomonas, structural lung disease/bronchiectasis, severe healthcare-associated infection, ecthyma gangrenosum", "Ertapenem does NOT cover Pseudomonas"]
      }},
      { label: "Anaerobic coverage", next: {
        leaf: true, diagnosis: "Anaerobic Coverage",
        treatment: [
          "Metronidazole (anaerobes/protozoa only — no aerobic gram-positive/negative activity)",
          "Piperacillin-tazobactam, carbapenems",
          "Amoxicillin-clavulanate / ampicillin-sulbactam",
          "Cefoxitin/cefotetan",
          "Clindamycin, especially for oral anaerobes"
        ],
        notes: ["Think anaerobes: intra-abdominal infection, abscess, aspiration with abscess/empyema, diabetic foot, pelvic infection, necrotizing polymicrobial infection, human/animal bites, oral/dental source"]
      }},
      { label: "Atypical/intracellular coverage", next: {
        leaf: true, diagnosis: "Atypical/Intracellular Coverage",
        treatment: [
          "Mycoplasma/Chlamydophila/Legionella: macrolide, doxycycline, respiratory fluoroquinolone",
          "Rickettsia: doxycycline",
          "Chlamydia trachomatis: doxycycline (azithromycin in selected settings)",
          "Brucella: doxycycline + rifampin, or doxycycline + an aminoglycoside"
        ],
        notes: ["Think atypicals: CAP with dry cough, Legionella clues (diarrhea, hyponatremia, severe pneumonia), travel/exposure, rickettsial disease, chlamydia, brucella"]
      }}
    ]
  }
},
{
  id: "dtree-id-cap",
  chapter: "Infectious Diseases",
  group: "Pneumonia",
  name: "Community-Acquired Pneumonia (CAP)",
  root: {
    q: "Severity / clinical scenario?",
    clues: ["CURB-65: Confusion, Urea↑, RR>30, BP<90/60, Age>65 — 0–1 ambulatory, 1–2 admit, >2 ICU", "IDSA ICU: 1 major (septic shock/resp failure) or ≥3 minor (RR>30, PaO2/FiO2<250, multilobar, thrombocytopenia, hypotension, confusion, uremia, leukopenia, hypothermia)"],
    options: [
      { label: "Outpatient, no comorbidities", next: {
        leaf: true, diagnosis: "CAP — outpatient, healthy",
        treatment: ["Amoxicillin or doxycycline; macrolide if local resistance is low"]
      }},
      { label: "Outpatient with comorbidities", next: {
        leaf: true, diagnosis: "CAP — outpatient with comorbidities",
        treatment: ["Amoxicillin-clavulanate or oral cephalosporin + azithromycin/doxycycline", "Or a respiratory fluoroquinolone alone"]
      }},
      { label: "Inpatient, non-severe", next: {
        leaf: true, diagnosis: "CAP — inpatient, non-severe",
        treatment: ["Ceftriaxone/cefotaxime/ampicillin-sulbactam + azithromycin", "Or a respiratory fluoroquinolone alone"],
        notes: ["De-escalate once cultures return; switch IV→PO when stable; reassess for failure at 48–72h"]
      }},
      { label: "Severe CAP / ICU", next: {
        leaf: true, diagnosis: "Severe CAP",
        treatment: ["β-lactam + azithromycin, or β-lactam + respiratory fluoroquinolone", "Add vancomycin/linezolid if MRSA risk", "Add an antipseudomonal agent (cefepime/pip-tazo/meropenem) if Pseudomonas risk"],
        notes: ["De-escalate once cultures return; switch IV→PO when stable; reassess for failure at 48–72h"]
      }},
      { label: "Aspiration with abscess/empyema/necrotizing pneumonia", next: {
        leaf: true, diagnosis: "Aspiration Pneumonia with Abscess",
        treatment: ["Rule out TB/cancer", "Ampicillin-sulbactam or ceftriaxone + clindamycin for 3–4 weeks", "Surgery if abscess >6–7cm"],
        notes: ["Simple aspiration pneumonitis without abscess may not need antibiotics"]
      }},
      { label: "Suspected influenza", next: {
        leaf: true, diagnosis: "Influenza",
        treatment: ["Diagnosis: antigen/PCR", "Treatment: oseltamivir (PO/IV), zanamivir, or baloxavir for outpatients"],
        notes: ["Can be complicated by secondary bacterial pneumonia, especially S. aureus"]
      }}
    ]
  }
},
{
  id: "dtree-id-hap-vap",
  chapter: "Infectious Diseases",
  group: "Pneumonia",
  name: "Hospital-Acquired / Ventilator-Associated Pneumonia",
  root: {
    q: "Which risk factors are present?",
    options: [
      { label: "No MRSA/MDR risk", next: {
        leaf: true, diagnosis: "HAP/VAP — standard risk",
        treatment: ["Cefepime, piperacillin-tazobactam, or meropenem"]
      }},
      { label: "MRSA risk", next: {
        leaf: true, diagnosis: "HAP/VAP — MRSA risk",
        treatment: ["Add vancomycin or linezolid to a gram-negative backbone (cefepime/pip-tazo/meropenem)"]
      }},
      { label: "High mortality / MDR gram-negative risk", next: {
        leaf: true, diagnosis: "HAP/VAP — MDR risk",
        treatment: ["Consider 2 antipseudomonal agents from different classes", "Add MRSA coverage per local risk"]
      }},
      { label: "Aspiration with abscess/empyema", next: {
        leaf: true, diagnosis: "HAP/VAP — aspiration with abscess",
        treatment: ["Ensure anaerobic coverage (piperacillin-tazobactam, carbapenem, or add metronidazole/clindamycin)"]
      }}
    ]
  }
},
{
  id: "dtree-id-uti",
  chapter: "Infectious Diseases",
  group: "UTI",
  name: "Urinary Tract Infection",
  root: {
    q: "Which clinical picture?",
    options: [
      { label: "Uncomplicated cystitis", next: {
        leaf: true, diagnosis: "Acute Uncomplicated Cystitis",
        treatment: ["Nitrofurantoin, TMP-SMX (if local resistance acceptable), or fosfomycin"],
        notes: ["Clues: dysuria, lower abdominal pain, no fever, no flank pain, no gynecologic involvement", "Nitrofurantoin/fosfomycin: cystitis only — not pyelonephritis, prostatitis, or bacteremia"]
      }},
      { label: "Pyelonephritis", next: {
        q: "Outpatient-suitable? (healthy, non-pregnant, tolerates PO, no resistant-strain history, good response expected)",
        options: [
          { label: "Yes — outpatient", next: {
            leaf: true, diagnosis: "Pyelonephritis — outpatient",
            treatment: ["Fluoroquinolone if susceptible; or an initial ceftriaxone/aminoglycoside dose then oral step-down"]
          }},
          { label: "No — inpatient", next: {
            leaf: true, diagnosis: "Pyelonephritis — inpatient",
            treatment: ["IV β-lactam ± aminoglycoside", "High-risk: piperacillin-tazobactam, amikacin, or a carbapenem", "Pregnancy: β-lactams ± aminoglycoside depending on context"],
            notes: ["No response after 72h → look for obstruction, need for source control, resistance, or misdiagnosis"]
          }}
        ]
      }},
      { label: "Complicated UTI / urosepsis", next: {
        leaf: true, diagnosis: "Complicated UTI / Urosepsis",
        treatment: ["Ceftriaxone, cefepime, or piperacillin-tazobactam", "Carbapenem if ESBL risk"],
        notes: ["Complicated: male with prostatitis, pyelonephritis, bacteremia, catheter-associated, obstruction/stone, pregnancy, resistant organisms, structural abnormality"]
      }},
      { label: "Catheter-associated UTI", next: {
        leaf: true, diagnosis: "Catheter-Associated UTI",
        treatment: ["Key organisms: Pseudomonas, Enterococcus, Candida, ESBL organisms", "Remove/replace the catheter before culturing, then use the narrowest effective antibiotic"]
      }},
      { label: "Asymptomatic bacteriuria", next: {
        leaf: true, diagnosis: "Asymptomatic Bacteriuria",
        treatment: ["Treat only in pregnancy or before a urologic procedure — otherwise no treatment"]
      }}
    ]
  }
},
{
  id: "dtree-id-urethritis",
  chapter: "Infectious Diseases",
  group: "STI & Pelvic Infection",
  name: "Urethritis & Common STIs",
  root: {
    q: "Which organism/presentation?",
    clues: ["Dysuria + genital discharge → think STI", "Diagnosis: urethral/genital sample or urine PCR (first-catch urine for urethritis, midstream for cystitis)"],
    options: [
      { label: "Gonorrhea", next: {
        leaf: true, diagnosis: "Gonorrhea",
        treatment: ["Ceftriaxone", "Inform partners, avoid sex for 1 week, repeat STI screen"],
        notes: ["Presentations: urethritis/proctitis/pharyngitis (men); PID/infertility/ectopic pregnancy (women); disseminated: pustular rash, asymmetric polyarthralgia, tenosynovitis, septic arthritis"]
      }},
      { label: "Chlamydia", next: {
        leaf: true, diagnosis: "Chlamydia",
        treatment: ["Doxycycline for 7 days", "Azithromycin single dose as an alternative in selected contexts"],
        notes: ["Presentations: asymptomatic/urethritis/orchiepididymitis (men); urethritis/vaginitis (women); complications: PID, infertility, ectopic pregnancy"]
      }},
      { label: "Mycoplasma genitalium", next: {
        leaf: true, diagnosis: "Mycoplasma genitalium",
        treatment: ["Doxycycline + moxifloxacin or azithromycin"]
      }},
      { label: "Trichomonas", next: {
        leaf: true, diagnosis: "Trichomoniasis (urethritis)",
        treatment: ["Metronidazole or tinidazole"]
      }}
    ]
  }
},
{
  id: "dtree-id-vaginitis",
  chapter: "Infectious Diseases",
  group: "STI & Pelvic Infection",
  name: "Vaginitis",
  root: {
    q: "Discharge characteristics?",
    options: [
      { label: "Yellow/green, foul-smelling, strawberry cervix", next: {
        leaf: true, diagnosis: "Trichomoniasis",
        treatment: ["Diagnosis: PCR/microscopy showing a motile parasite", "Treatment: metronidazole or tinidazole"]
      }},
      { label: "Foul smell, watery discharge", next: {
        leaf: true, diagnosis: "Bacterial Vaginosis",
        treatment: ["Diagnosis: pH >4.5, clue cells", "Treatment: metronidazole or topical clindamycin"]
      }},
      { label: "Intense irritation, cottage-cheese odorless discharge", next: {
        leaf: true, diagnosis: "Candida Vaginitis",
        treatment: ["Diagnosis: pH <4.5, positive KOH", "Treatment: vaginal azole; fluconazole if needed"]
      }}
    ]
  }
},
{
  id: "dtree-id-pid",
  chapter: "Infectious Diseases",
  group: "STI & Pelvic Infection",
  name: "Pelvic Inflammatory Disease (PID)",
  root: {
    q: "Admission criteria met?",
    clues: ["Think PID: lower abdominal/pelvic pain, cervical motion tenderness, fever/leukocytosis/CRP", "Admit if: uncertain diagnosis, pregnancy, abscess, severe symptoms, HIV-positive"],
    options: [
      { label: "No — outpatient", next: {
        leaf: true, diagnosis: "PID — outpatient",
        treatment: ["Ceftriaxone IM single dose + doxycycline 14 days + metronidazole 14 days"],
        notes: ["No response in 72h → admit/reassess", "Complications: tubo-ovarian abscess, peritonitis, perihepatitis"]
      }},
      { label: "Yes — inpatient", next: {
        leaf: true, diagnosis: "PID — inpatient",
        treatment: ["Ceftriaxone IV + doxycycline + metronidazole"],
        notes: ["Complications: tubo-ovarian abscess, peritonitis, perihepatitis"]
      }}
    ]
  }
},
{
  id: "dtree-id-diarrhea",
  chapter: "Infectious Diseases",
  group: "GI Infection",
  name: "Acute Diarrhea / GI Infection",
  root: {
    q: "Watery, inflammatory/bloody, or traveler's?",
    clues: ["Acute <2wk, persistent 2–4wk, chronic >4wk"],
    options: [
      { label: "Watery", next: {
        leaf: true, diagnosis: "Watery (Secretory) Diarrhea",
        treatment: ["Think: ETEC, cholera, viral gastroenteritis, food toxin", "Pattern: large-volume, persists with fasting, low fecal osmotic gap", "Treatment: rehydration/electrolytes"]
      }},
      { label: "Inflammatory/bloody", next: {
        leaf: true, diagnosis: "Inflammatory Diarrhea",
        treatment: ["Think: Shigella, Campylobacter, Salmonella, invasive E. coli, C. difficile, amoebiasis", "Marker: stool leukocytes or calprotectin"],
        notes: [
          "Bloody stool WITHOUT fecal leukocytes → think Shiga toxin/EHEC — avoid antibiotics and antimotility drugs unless another invasive/septic picture dominates",
          "Fever → invasive disease; hypotension → severe dehydration or bacteremia; rice-water stool → cholera",
          "Systemic complications: reactive arthritis (Salmonella/Campylobacter/Shigella), HUS (EHEC/Shigella), postinfectious IBD (Campylobacter), Yersinia (thyroiditis/pericarditis/GN)",
          "Incubation clues: very fast → S. aureus/B. cereus emetic toxin; 8–16h → C. perfringens/B. cereus; >16h → cholera, ETEC/EHEC, Salmonella, Campylobacter, Shigella"
        ]
      }},
      { label: "Traveler's diarrhea", next: {
        leaf: true, diagnosis: "Traveler's Diarrhea",
        treatment: ["Typical: onset 3–5 days to 2 weeks, duration 1–5 days, usually self-limited", "Common causes: E. coli, Shigella, norovirus, rotavirus, Giardia", "Treatment: rehydration/electrolytes"]
      }}
    ]
  }
},
{
  id: "dtree-id-fever-rash",
  chapter: "Infectious Diseases",
  group: "Fever & Rash",
  name: "Fever + Rash Pattern Recognition",
  root: {
    q: "Which pattern fits?",
    options: [
      { label: "Cough, coryza, conjunctivitis, Koplik spots, cephalocaudal spread", next: {
        leaf: true, diagnosis: "Measles",
        treatment: ["Supportive care; airborne isolation", "Report to public health"]
      }},
      { label: "High fever 3–4 days, rash after fever subsides", next: {
        leaf: true, diagnosis: "Roseola",
        treatment: ["Supportive care"]
      }},
      { label: "Slapped cheek, reticular rash", next: {
        leaf: true, diagnosis: "Parvovirus B19",
        treatment: ["Supportive care"],
        notes: ["Risk in pregnancy (hydrops fetalis) and hemolytic disease (aplastic crisis)"]
      }},
      { label: "Vesicles on palms/soles/mouth", next: {
        leaf: true, diagnosis: "Coxsackie / Enterovirus (Hand-Foot-Mouth)",
        treatment: ["Supportive care"]
      }},
      { label: "Abrupt fever, lethargy, petechiae/purpura, shock", next: {
        leaf: true, diagnosis: "Meningococcemia",
        treatment: ["Immediate ceftriaxone", "Droplet precautions"],
        notes: ["Fever + nonblanching petechiae/purpura + toxicity = meningococcemia until proven otherwise"]
      }},
      { label: "Palpable purpura on legs/buttocks + abdominal pain/joint swelling", next: {
        leaf: true, diagnosis: "IgA Vasculitis (HSP)",
        treatment: ["Usually supportive; steroids for severe GI/joint symptoms"]
      }},
      { label: "Lesions in different stages simultaneously", next: {
        leaf: true, diagnosis: "Varicella",
        treatment: ["Supportive care; antivirals if severe/immunocompromised", "Airborne + contact isolation"]
      }},
      { label: "Grouped vesicles in one dermatome, not crossing midline", next: {
        leaf: true, diagnosis: "Herpes Zoster",
        treatment: ["Antiviral therapy (e.g. valacyclovir)"]
      }},
      { label: "Diffuse erythematous rash, strawberry tongue, Pastia lines", next: {
        leaf: true, diagnosis: "Scarlet Fever",
        treatment: ["Penicillin or amoxicillin"]
      }}
    ]
  }
},
{
  id: "dtree-id-cns",
  chapter: "Infectious Diseases",
  group: "CNS Infection",
  name: "Meningitis & Encephalitis",
  root: {
    q: "Meningitis or encephalitis pattern?",
    clues: ["Meningitis: fever, photophobia/phonophobia, nuchal rigidity, Kernig/Brudzinski", "Encephalitis: confusion, coma, memory loss, seizures, focal deficits"],
    options: [
      { label: "Suspected bacterial meningitis", next: {
        q: "CT needed before LP?",
        clues: ["CT-first if: immunodeficiency, focal CNS disease, lateralizing/cranial nerve signs, decreased consciousness, new seizures, papilledema"],
        options: [
          { label: "Yes", next: {
            leaf: true, diagnosis: "CT Before LP",
            treatment: ["Do NOT delay antibiotics/dexamethasone while awaiting CT — give empiric therapy first, then LP after CT if safe"]
          }},
          { label: "No — proceed to LP", next: {
            q: "Patient group?",
            options: [
              { label: "Adult, community-acquired", next: {
                leaf: true, diagnosis: "Bacterial Meningitis — Adult",
                treatment: ["Vancomycin + ceftriaxone/cefotaxime", "Add dexamethasone before or with the first antibiotic dose (especially pneumococcal)"],
                notes: ["CSF — bacterial: WBC often >1000, low glucose, high protein; viral: WBC 100–1000, normal glucose, mildly high protein; TB/fungal: WBC 5–1000, low glucose, high protein, often high opening pressure"]
              }},
              { label: "Age >50, pregnant, or immunocompromised", next: {
                leaf: true, diagnosis: "Bacterial Meningitis — Listeria Risk",
                treatment: ["Vancomycin + ceftriaxone/cefotaxime + ampicillin (for Listeria)", "Add dexamethasone before or with the first antibiotic dose"]
              }},
              { label: "Post-neurosurgery / head trauma / shunt", next: {
                leaf: true, diagnosis: "Healthcare-Associated Meningitis",
                treatment: ["Vancomycin + cefepime/ceftazidime/meropenem"]
              }},
              { label: "Suspected meningococcemia", next: {
                leaf: true, diagnosis: "Suspected Meningococcemia",
                treatment: ["Immediate ceftriaxone/cefotaxime", "Droplet precautions"]
              }}
            ]
          }}
        ]
      }},
      { label: "Suspected encephalitis", next: {
        leaf: true, diagnosis: "Encephalitis",
        treatment: ["Empiric acyclovir for HSV/VZV while workup is pending", "CSF PCR for HSV, VZV, West Nile; consider autoimmune workup if infectious workup is negative"]
      }}
    ]
  }
},
{
  id: "dtree-id-endocarditis",
  chapter: "Infectious Diseases",
  group: "Endocarditis",
  name: "Infective Endocarditis",
  root: {
    q: "Valve context or confirmed organism?",
    clues: ["Obtain 3 sets of blood cultures before antibiotics unless the patient is crashing", "Diagnosis: TTE/TEE, Duke criteria", "Duration usually 4–6 weeks after negative cultures", "Surgery if: CHF, persistent bacteremia >7–10 days, spread/abscess, high embolic risk (vegetation >10mm), prosthetic valve infection"],
    options: [
      { label: "Native valve, subacute, stable", next: {
        leaf: true, diagnosis: "Native Valve IE — subacute/stable",
        treatment: ["Empiric: vancomycin + ceftriaxone while cultures pending"],
        notes: ["Likely organisms: viridans/bovis strep, E. faecalis, HACEK, S. aureus/lugdunensis"]
      }},
      { label: "Acute severe native valve / healthcare-associated", next: {
        leaf: true, diagnosis: "Native Valve IE — acute/severe",
        treatment: ["Empiric: vancomycin + cefepime"]
      }},
      { label: "Early prosthetic valve (<2 months)", next: {
        leaf: true, diagnosis: "Early Prosthetic Valve Endocarditis",
        treatment: ["Empiric: vancomycin + cefepime ± gentamicin/rifampin depending on institution"],
        notes: ["Likely organisms: S. aureus, CoNS, gram-negatives, Corynebacterium, Candida, Enterococcus"]
      }},
      { label: "Prosthetic valve, 2–12 months", next: {
        leaf: true, diagnosis: "Prosthetic Valve Endocarditis (2–12mo)",
        treatment: ["Likely organisms: CoNS, Enterococcus, Candida, Strep — treat per confirmed organism"]
      }},
      { label: "Prosthetic valve, >12 months", next: {
        leaf: true, diagnosis: "Prosthetic Valve Endocarditis (>12mo)",
        treatment: ["Likely organisms: viridans strep, S. aureus — behaves more like native valve IE"]
      }},
      { label: "Confirmed: Enterococcus", next: {
        leaf: true, diagnosis: "Enterococcal IE",
        treatment: ["Ampicillin + ceftriaxone, or ampicillin + gentamicin"]
      }},
      { label: "Confirmed: MSSA", next: {
        leaf: true, diagnosis: "MSSA IE",
        treatment: ["Nafcillin/oxacillin or cefazolin"]
      }},
      { label: "Confirmed: MRSA", next: {
        leaf: true, diagnosis: "MRSA IE",
        treatment: ["Vancomycin or daptomycin"]
      }},
      { label: "Culture-negative", next: {
        leaf: true, diagnosis: "Culture-Negative IE",
        treatment: ["Consider: prior antibiotics, HACEK, Brucella, Coxiella, Bartonella, or a noninfectious mimic"]
      }}
    ]
  }
},
{
  id: "dtree-id-transplant",
  chapter: "Infectious Diseases",
  group: "Immunocompromised Host",
  name: "Immunocompromised Host — Transplant Timeline",
  root: {
    q: "Transplant type and timing?",
    clues: ["Diagnosis is harder in immunocompromised hosts: ~40% may not have fever, multiple simultaneous infections can occur, presentation can be advanced, resistance risk is high, drug toxicity can mimic infection"],
    options: [
      { label: "Solid organ, first 4 weeks", next: {
        leaf: true, diagnosis: "SOT — First 4 Weeks",
        treatment: ["Think: surgical/technical complications, nosocomial infection, donor-derived infection"]
      }},
      { label: "Solid organ, 2–12 months", next: {
        leaf: true, diagnosis: "SOT — 2–12 Months",
        treatment: ["Think: opportunistic infections (herpesviruses, toxoplasma, PJP), latent infection reactivation"],
        notes: ["Prophylaxis (TMP-SMX for PJP, antivirals) typically covers this window"]
      }},
      { label: "Solid organ, >1 year", next: {
        leaf: true, diagnosis: "SOT — Beyond 1 Year",
        treatment: ["Think: common community infections, as in immunocompetent hosts"],
        notes: ["Any rejection/increased immunosuppression restarts the timeline"]
      }},
      { label: "Bone marrow/HCT, first 4 weeks (neutropenic)", next: {
        leaf: true, diagnosis: "HCT — First 4 Weeks",
        treatment: ["Think: bacterial and fungal infections during neutropenia — see the Febrile Neutropenia tree"]
      }},
      { label: "Bone marrow/HCT, day 28–100", next: {
        leaf: true, diagnosis: "HCT — Day 28–100",
        treatment: ["Think: opportunistic infections, especially with acute GVHD"]
      }}
    ]
  }
},
{
  id: "dtree-id-hiv-oi",
  chapter: "Infectious Diseases",
  group: "HIV/Opportunistic",
  name: "HIV Opportunistic Infections by CD4",
  root: {
    q: "CD4 count / clinical clue?",
    options: [
      { label: "CD4 <200, subacute dyspnea/dry cough/hypoxemia", next: {
        leaf: true, diagnosis: "Pneumocystis jirovecii Pneumonia (PJP)",
        treatment: ["Diagnosis: DFA/PCR from induced sputum or BAL", "Treatment: TMP-SMX; add steroids if PaO2<70 or A-a gradient ≥35", "Primary prophylaxis with TMP-SMX if CD4 <200"]
      }},
      { label: "CD4 <100, subacute meningitis/headache", next: {
        leaf: true, diagnosis: "Cryptococcal Meningitis",
        treatment: [
          "Diagnosis: serum/CSF cryptococcal antigen; LP shows high opening pressure, lymphocytes, high protein, low/normal glucose; India ink may show budding yeast",
          "Induction: liposomal amphotericin B + flucytosine",
          "Consolidation then maintenance: fluconazole",
          "Manage intracranial pressure with therapeutic LPs"
        ],
        notes: ["Defer ART 4–6 weeks after starting antifungal therapy"]
      }},
      { label: "CD4 <50, fever/night sweats/wasting/diarrhea", next: {
        leaf: true, diagnosis: "Disseminated MAC",
        treatment: ["Diagnosis: AFB from blood/lymph node/bone marrow", "Treatment: macrolide + ethambutol"]
      }},
      { label: "Worsening after starting/restarting ART", next: {
        leaf: true, diagnosis: "IRIS",
        treatment: ["Continue ART and treat the unmasked/worsening infection", "Consider steroids in severe cases"],
        notes: ["Paradoxical worsening of a known infection, or unmasking of a subclinical one — usually CD4 <50, usually 4–8 weeks after starting ART"]
      }}
    ]
  }
},
{
  id: "dtree-id-clabsi",
  chapter: "Infectious Diseases",
  group: "Nosocomial Infection",
  name: "Central Line Infection & MDRO",
  root: {
    q: "Central line patient with fever/sepsis/bacteremia and no better source, or known MDRO?",
    options: [
      { label: "Suspected CLABSI", next: {
        leaf: true, diagnosis: "CLABSI",
        treatment: [
          "Diagnosis: same organism from central and peripheral cultures; differential time-to-positivity >2h faster from the catheter; higher CFU from the central line; catheter tip culture if removed",
          "Likely organisms: S. aureus, coagulase-negative staph, Candida, Pseudomonas, E. coli, Klebsiella",
          "Treatment: empiric coverage per organism risk; remove the line when appropriate"
        ]
      }},
      { label: "Known/suspected MDRO", next: {
        leaf: true, diagnosis: "MDRO (Multi-Drug-Resistant Organism)",
        treatment: ["Definition: resistant to >3 antibiotic groups", "Key organisms: MRSA, VRE, CRE/ESBL Enterobacterales, CRAB (Acinetobacter), CRPA (Pseudomonas)", "Prevention: equipment disinfection, hand hygiene, isolation"]
      }}
    ]
  }
},
{
  id: "dtree-id-cdiff",
  chapter: "Infectious Diseases",
  group: "Nosocomial Infection",
  name: "C. difficile Infection",
  root: {
    q: "Diarrhea after antibiotics/hospitalization, with fever/abdominal pain/leukocytosis?",
    options: [
      { label: "Yes", next: {
        leaf: true, diagnosis: "C. difficile Infection",
        treatment: ["Diagnosis: stool toxin EIA, GDH antigen, PCR", "Treatment: fidaxomicin or ORAL vancomycin"],
        notes: ["IV vancomycin does NOT treat C. difficile colitis — oral vancomycin stays in the gut where it's needed"]
      }},
      { label: "No", next: {
        leaf: true, diagnosis: "Consider Alternative Diagnosis",
        treatment: ["Reconsider other causes of diarrhea — see the Acute Diarrhea tree"]
      }}
    ]
  }
},
{
  id: "dtree-id-travel-fever",
  chapter: "Infectious Diseases",
  group: "Travel Medicine",
  name: "Travel-Associated Fever",
  root: {
    q: "Which pattern fits?",
    clues: ["Take a TRAVEL history: Time, Routine/risky exposure, Adherence to prophylaxis, Vaccines, Epidemiology, Local outbreaks"],
    options: [
      { label: "Fever, thrombocytopenia, splenomegaly", next: {
        leaf: true, diagnosis: "Malaria",
        treatment: ["Diagnosis: thick/thin smear, rapid antigen test, PCR", "Treatment: artemisinin/artesunate/artemether"],
        notes: ["Do not miss malaria — a leading cause of fever in returning travelers", "Severe/falciparum malaria is an ID emergency: cerebral malaria, ARDS, AKI, severe hemolysis, DIC, hypoglycemia"]
      }},
      { label: "Severe myalgia, rash (\"islands of white in a sea of red\"), pancytopenia", next: {
        leaf: true, diagnosis: "Dengue",
        treatment: ["Supportive care only — no NSAIDs"],
        notes: ["Severe dengue: capillary leak, shock"]
      }},
      { label: "Prolonged fever, relative bradycardia, rose spots, hepatosplenomegaly", next: {
        leaf: true, diagnosis: "Enteric (Typhoid) Fever",
        treatment: ["Diagnosis: blood culture / bone marrow culture", "Treatment: azithromycin, ceftriaxone, or a quinolone depending on context"]
      }},
      { label: "Unpasteurized dairy, undulating fever, sacroiliitis", next: {
        leaf: true, diagnosis: "Brucellosis",
        treatment: ["Diagnosis: blood cultures, Rose-Bengal serology", "Treatment: doxycycline + rifampin, or doxycycline + gentamicin/streptomycin"]
      }},
      { label: "Flu-like illness, atypical pneumonia, hepatitis, no rash (farm/animal exposure)", next: {
        leaf: true, diagnosis: "Q Fever (Coxiella) — Acute",
        treatment: ["Treatment: doxycycline for 14 days"],
        notes: ["Chronic Q fever: endocarditis risk with valve disease/grafts, Phase 1 IgG >1:800, treat with doxycycline + hydroxychloroquine for 1.5–2 years"]
      }},
      { label: "Tick exposure, eschar, rash on palms/soles day 3–5", next: {
        leaf: true, diagnosis: "Rickettsial Spotted Fever",
        treatment: ["Treatment: doxycycline immediately on suspicion — do not wait for confirmation"],
        notes: ["Delayed treatment can be fatal"]
      }},
      { label: "Contaminated water/rodent urine, severe calf myalgia, conjunctival suffusion", next: {
        leaf: true, diagnosis: "Leptospirosis",
        treatment: ["Mild: doxycycline", "Severe (Weil syndrome — jaundice + AKI + bleeding): IV penicillin"]
      }}
    ]
  }
},
{
  id: "dtree-id-neutropenic-fever",
  chapter: "Infectious Diseases",
  group: "Emergencies",
  name: "Febrile Neutropenia",
  root: {
    q: "ANC <500 with fever (single temp >38.3°C, or sustained >38.0°C for 1 hour)?",
    options: [
      { label: "Yes", next: {
        leaf: true, diagnosis: "Febrile Neutropenia",
        treatment: [
          "Blood cultures; assess hemodynamics",
          "Start an antipseudomonal β-lactam immediately: cefepime, piperacillin-tazobactam, meropenem, or imipenem",
          "Add vancomycin if: catheter infection, skin/soft-tissue infection, pneumonia, hemodynamic instability, known MRSA colonization",
          "Add an antifungal if fever persists after several days or with prolonged high-risk neutropenia"
        ],
        notes: ["Ecthyma gangrenosum = Pseudomonas bacteremia until proven otherwise"]
      }},
      { label: "No — doesn't meet the definition", next: {
        leaf: true, diagnosis: "Not Febrile Neutropenia",
        treatment: ["Re-check ANC and temperature criteria — this pathway applies specifically to ANC <500 with a qualifying fever"]
      }}
    ]
  }
},
{
  id: "dtree-id-sepsis",
  chapter: "Infectious Diseases",
  group: "Emergencies",
  name: "Sepsis / Septic Shock",
  root: {
    q: "Likely source?",
    clues: ["Septic shock = persistent hypotension needing vasopressors for MAP>65, plus lactate>2 despite adequate fluids", "Workflow: recognize shock → cultures if no delay → broad antibiotics immediately → fluids → vasopressors if needed → source control → reassess daily and narrow"],
    options: [
      { label: "Unknown source, unstable", next: {
        leaf: true, diagnosis: "Sepsis — unknown source",
        treatment: ["Vancomycin + cefepime, or vancomycin + piperacillin-tazobactam"]
      }},
      { label: "ESBL/MDR risk", next: {
        leaf: true, diagnosis: "Sepsis — ESBL/MDR risk",
        treatment: ["Vancomycin + meropenem"]
      }},
      { label: "Possible intra-abdominal source", next: {
        leaf: true, diagnosis: "Sepsis — intra-abdominal source",
        treatment: ["Piperacillin-tazobactam; or cefepime + metronidazole; or meropenem"]
      }},
      { label: "Possible catheter source", next: {
        leaf: true, diagnosis: "Sepsis — catheter source",
        treatment: ["Vancomycin + gram-negative coverage"]
      }},
      { label: "Possible urinary source", next: {
        leaf: true, diagnosis: "Sepsis — urinary source",
        treatment: ["Ceftriaxone if stable/low MDR risk", "Cefepime, piperacillin-tazobactam, or meropenem if severe/resistant risk"]
      }}
    ]
  }
},
{
  id: "dtree-id-necfasc",
  chapter: "Infectious Diseases",
  group: "Emergencies",
  name: "Necrotizing Fasciitis",
  root: {
    q: "Pain out of proportion + rapidly progressive erythema/bullae/necrosis/late anesthesia + systemic toxicity?",
    options: [
      { label: "Yes — suspected GAS type II", next: {
        leaf: true, diagnosis: "Necrotizing Fasciitis — GAS Type II",
        treatment: ["Urgent surgical debridement — primary life-saving treatment", "Penicillin + clindamycin", "IVIG in selected cases"]
      }},
      { label: "Yes — polymicrobial (type I)", next: {
        leaf: true, diagnosis: "Necrotizing Fasciitis — Polymicrobial (Type I)",
        treatment: ["Urgent surgical debridement — primary life-saving treatment", "Vancomycin + piperacillin-tazobactam/carbapenem + clindamycin (for toxin suppression)"]
      }}
    ]
  }
},
{
  id: "dtree-id-asplenia",
  chapter: "Infectious Diseases",
  group: "Emergencies",
  name: "Asplenia / OPSI",
  root: {
    q: "Asplenic/hyposplenic patient with fever?",
    options: [
      { label: "Yes", next: {
        leaf: true, diagnosis: "Fever in Asplenia (OPSI risk)",
        treatment: ["Emergency — treat immediately: IV ceftriaxone + amoxicillin-clavulanate"],
        notes: ["High risk for fulminant sepsis from encapsulated organisms: S. pneumoniae, H. influenzae, N. meningitidis", "Pneumococcus causes 40–70% of OPSI cases"]
      }},
      { label: "No — spleen intact", next: {
        leaf: true, diagnosis: "Not Asplenia-Related",
        treatment: ["Evaluate fever through the standard workup — the OPSI emergency pathway applies specifically to asplenic/hyposplenic patients"]
      }}
    ]
  }
},
];
