// Diagnostic Trees — the Cases tab's sole interactive mode: "walk the workup yourself."
// Each tree starts from a presenting problem and branches on real test results/clinical findings
// (not a quiz — no distractors) until it reaches a specific diagnosis and its treatment.
// Content is condensed from this app's former CASE_GUIDES reference (same Cardiology source
// material, since removed as redundant — every fact below traces back to it) into short bullet
// fragments for at-a-glance scanning. `group` mirrors the disease-family grouping used throughout
// the rest of the app, so the Cases tab nav can be browsed/searched by chapter → group → tree,
// the same way Browse/Reference are. See docs/AUTHORING_GUIDE.md for the schema.
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
];
