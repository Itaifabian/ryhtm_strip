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
{
  "id": "dtree-ger-cga-entry",
  "chapter": "Geriatrics",
  "group": "Comprehensive Geriatric Assessment",
  "name": "CGA Entry — Screen or Full Assessment?",
  "root": {
    "q": "Any CGA trigger present?",
    "options": [
      {
        "label": "Yes — trigger present",
        "next": {
          "leaf": true,
          "diagnosis": "Proceed to full Comprehensive Geriatric Assessment",
          "treatment": [
            "Assess all 4 CGA domains: function/ability, mental health/cognition, disease severity & comorbidity, support network",
            "Actively screen for under-recognized geriatric syndromes: depression, dementia, incontinence, sexual dysfunction, recurrent falls, hearing loss, alcohol use",
            "Work through: function (ADL/IADL) → falls → cognition → depression → nutrition → polypharmacy → delirium risk"
          ],
          "notes": [
            "Geriatrics starts with function, not a single disease — frame every finding against baseline functional status"
          ]
        }
      },
      {
        "label": "No obvious trigger",
        "next": {
          "leaf": true,
          "diagnosis": "Screening first, CGA only if abnormal",
          "treatment": [
            "Two-step approach: screening test first, then full CGA only if screening is abnormal",
            "Still actively ask about the under-recognized syndromes (depression, incontinence, falls, hearing loss, alcohol use) even without an obvious trigger — they are often not volunteered"
          ]
        }
      }
    ],
    "clues": [
      "Advanced age",
      "Comorbidities: CHF/cancer/recent surgery",
      "Depression/social isolation",
      "Change in living situation"
    ]
  }
},
{
  "id": "dtree-ger-frailty",
  "chapter": "Geriatrics",
  "group": "Comprehensive Geriatric Assessment",
  "name": "Suspected Frailty",
  "root": {
    "q": "Did a relatively small stressor cause a major decline?",
    "options": [
      {
        "label": "Yes",
        "next": {
          "leaf": true,
          "diagnosis": "Frailty syndrome",
          "treatment": [
            "Rehabilitation and physiotherapy can improve frailty and help recover function",
            "Address the precipitating stressor directly (infection, iatrogenic drug effect, immobility, etc.)"
          ],
          "notes": [
            "Frailty raises risk of increased care needs, repeated hospitalization, and long-term care placement — plan proactively, not just reactively"
          ]
        }
      },
      {
        "label": "No — stable despite stressor",
        "next": {
          "leaf": true,
          "diagnosis": "Not frailty at this time",
          "treatment": [
            "Continue routine CGA screening — frailty risk can still emerge later with a bigger stressor or cumulative decline"
          ]
        }
      }
    ],
    "clues": [
      "Infection",
      "Surgery",
      "Hospitalization",
      "Immobility",
      "Incontinence",
      "Cognitive decline",
      "Iatrogenic event"
    ]
  }
},
{
  "id": "dtree-ger-function",
  "chapter": "Geriatrics",
  "group": "Comprehensive Geriatric Assessment",
  "name": "Functional Assessment — ADL vs IADL",
  "root": {
    "q": "Which functions are impaired?",
    "options": [
      {
        "label": "Basic daily survival tasks (ADL)",
        "next": {
          "leaf": true,
          "diagnosis": "ADL impairment",
          "treatment": [
            "ADL = bathing, dressing, toileting, transferring, grooming, feeding",
            "ADL impairment reflects more severe dependency — plan for higher level of care/support"
          ]
        }
      },
      {
        "label": "Independent-living tasks (IADL)",
        "next": {
          "leaf": true,
          "diagnosis": "IADL impairment",
          "treatment": [
            "IADL = telephone use, shopping, food preparation, housekeeping, laundry, transportation, taking medications, finances",
            "IADL impairment is often an early sign of functional decline — frequently the first sign of dementia or frailty",
            "Trigger cognition and dementia screening if IADL decline is new"
          ]
        }
      },
      {
        "label": "Neither impaired",
        "next": {
          "leaf": true,
          "diagnosis": "Functionally independent",
          "treatment": [
            "No ADL/IADL intervention needed now — re-screen at future CGA visits, since IADL decline is often the earliest clue to worsening cognition or frailty"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-ger-falls",
  "chapter": "Geriatrics",
  "group": "Comprehensive Geriatric Assessment",
  "name": "Falls Assessment",
  "root": {
    "q": "Get up and go test: rise from chair, walk 10 feet, turn, return, sit — time taken?",
    "options": [
      {
        "label": ">14 seconds",
        "next": {
          "q": "After the fall — pain, inability to stand/walk, and a shortened/asymmetric leg?",
          "options": [
            {
              "label": "Yes",
              "next": {
                "leaf": true,
                "diagnosis": "High fall risk + suspected proximal hip fracture",
                "treatment": [
                  "X-ray of the hip",
                  "Surgery for confirmed hip fracture"
                ],
                "notes": [
                  "A shortened/externally rotated leg after a fall is a hip fracture until proven otherwise"
                ]
              }
            },
            {
              "label": "No",
              "next": {
                "leaf": true,
                "diagnosis": "High fall risk (get up and go >14 sec)",
                "treatment": [
                  "Falls differential: prior falls (strongest predictor), vestibular decline, proprioceptive decline, visual impairment, cardiovascular disease, neurologic disease, rheumatologic disease, diabetes, infection, psychoactive drugs (sleep pills, anti-anxiety drugs, antidepressants)",
                  "Prevention: lower-limb strengthening, balance training, walking exercises, regular physical activity",
                  "Review psychoactive medications for reduction/discontinuation"
                ]
              }
            }
          ]
        }
      },
      {
        "label": "≤14 seconds",
        "next": {
          "leaf": true,
          "diagnosis": "Low fall risk on get-up-and-go screen",
          "treatment": [
            "Still ask about prior falls specifically — a prior fall is the single strongest predictor of a future fall regardless of the timed test",
            "Reinforce general prevention: lower-limb strengthening, balance training, regular activity"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-ger-cognition",
  "chapter": "Geriatrics",
  "group": "Comprehensive Geriatric Assessment",
  "name": "Cognitive Screening",
  "root": {
    "q": "Mini-Cog: recall 3 words + draw a clock set to 11:10 — result?",
    "options": [
      {
        "label": "Fails recall and/or clock drawing",
        "next": {
          "leaf": true,
          "diagnosis": "Positive cognitive screen — proceed to fuller evaluation",
          "treatment": [
            "Follow with MMSE: orientation, registration, attention/calculation, recall, language",
            "Distinguish from delirium (acute/fluctuating/inattention) and depression (mood/anhedonia) before labeling as dementia — all three can impair cognitive testing"
          ],
          "notes": [
            "IADL decline is often the earliest real-world sign of the same process — cross-check functional history"
          ]
        }
      },
      {
        "label": "Passes both",
        "next": {
          "leaf": true,
          "diagnosis": "Negative cognitive screen",
          "treatment": [
            "No further cognitive workup needed now — re-screen at future visits, especially if IADL decline or new behavioral change appears"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-ger-depression",
  "chapter": "Geriatrics",
  "group": "Comprehensive Geriatric Assessment",
  "name": "Depression Screening",
  "root": {
    "q": "Two-question screen: (1) feeling down/depressed/hopeless? (2) little interest or pleasure?",
    "options": [
      {
        "label": "Either answer positive",
        "next": {
          "q": "GDS-15 score?",
          "options": [
            {
              "label": "> 5",
              "next": {
                "leaf": true,
                "diagnosis": "Probable depression (GDS-15 > 5)",
                "treatment": [
                  "Formal evaluation and treatment for depression",
                  "Recheck the medication list — steroids, beta-blockers, and methyldopa can cause or worsen depression"
                ]
              }
            },
            {
              "label": "≤ 5",
              "next": {
                "leaf": true,
                "diagnosis": "Screen positive but GDS-15 not confirmatory",
                "treatment": [
                  "Reassess clinically and consider repeating screening at follow-up rather than dismissing the initial positive answers"
                ]
              }
            }
          ]
        }
      },
      {
        "label": "Both negative",
        "next": {
          "leaf": true,
          "diagnosis": "Negative depression screen",
          "treatment": [
            "No further action needed now; re-screen periodically, especially after new functional decline or major life stressor"
          ]
        }
      }
    ],
    "clues": [
      "Elderly depression may present atypically: fatigue, anorexia, weight loss, sleep disturbance, functional decline — not just sadness"
    ]
  }
},
{
  "id": "dtree-ger-nutrition",
  "chapter": "Geriatrics",
  "group": "Comprehensive Geriatric Assessment",
  "name": "Suspected Malnutrition",
  "root": {
    "q": "Weight loss >5% in 1 month, or >10% in 6 months?",
    "options": [
      {
        "label": "Yes",
        "next": {
          "q": "Likely contributor?",
          "options": [
            {
              "label": "Identifiable cause found",
              "next": {
                "leaf": true,
                "diagnosis": "Malnutrition with identified cause",
                "treatment": [
                  "Treat/address the specific contributor (dental/swallowing referral, social support, thyroid workup, etc.)",
                  "Use MNA to grade severity and track: intake decline, weight loss, mobility, stress/acute disease, neuropsychological problems, BMI, calf circumference"
                ]
              }
            },
            {
              "label": "No clear single cause",
              "next": {
                "leaf": true,
                "diagnosis": "Malnutrition, cause unclear",
                "treatment": [
                  "Complete the MNA (intake decline, weight loss, mobility, stress/acute disease, neuropsychological problems, BMI, calf circumference) to grade severity",
                  "Broaden workup — malnutrition in the elderly is frequently multifactorial"
                ]
              }
            }
          ],
          "clues": [
            "Chewing/swallowing difficulty",
            "Bed/chair bound",
            "Living alone",
            "Illness",
            "Socioeconomic factors",
            "Hypothyroidism"
          ]
        }
      },
      {
        "label": "No",
        "next": {
          "leaf": true,
          "diagnosis": "No malnutrition by weight-loss criteria",
          "treatment": [
            "Still consider MNA screening if other risk factors present (living alone, chewing difficulty, chronic illness)"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-ger-polypharmacy",
  "chapter": "Geriatrics",
  "group": "Medication Safety",
  "name": "New Symptom in an Elderly Patient — Is It a Drug Effect?",
  "root": {
    "q": "Consider every new symptom a drug side effect until proven otherwise. What is the pattern?",
    "options": [
      {
        "label": "Urinary retention, constipation, dry mouth, dysphagia, mental status change, vision change, orthostasis",
        "next": {
          "leaf": true,
          "diagnosis": "Anticholinergic effect",
          "treatment": [
            "Review for anticholinergic drugs and stop/substitute where possible",
            "Ask the 4 prescribing questions: Is the drug necessary? Is there a non-pharmacologic alternative? Can the dose be reduced? Is the patient taking it correctly?"
          ],
          "notes": [
            "A new drug started to treat this side effect (rather than stopping the causative drug) is a prescribing cascade — actively avoid it"
          ]
        }
      },
      {
        "label": "Falls or fractures",
        "next": {
          "leaf": true,
          "diagnosis": "Psychoactive drug effect",
          "treatment": [
            "Review sleep pills, anti-anxiety drugs, and antidepressants specifically",
            "Combine with formal falls assessment (get-up-and-go, falls differential)"
          ]
        }
      },
      {
        "label": "Delirium",
        "next": {
          "leaf": true,
          "diagnosis": "Drug-induced delirium",
          "treatment": [
            "Culprits: antidepressants, anticholinergics, steroids, H2 blockers, theophylline",
            "Work up as delirium (CAM) and stop/taper the causative agent"
          ]
        }
      },
      {
        "label": "New depression",
        "next": {
          "leaf": true,
          "diagnosis": "Drug-induced depression",
          "treatment": [
            "Culprits: steroids, beta-blockers, methyldopa",
            "Reassess necessity/dose before starting a separate antidepressant"
          ]
        }
      },
      {
        "label": "Rising creatinine / nephrotoxicity",
        "next": {
          "leaf": true,
          "diagnosis": "Drug-induced nephrotoxicity",
          "treatment": [
            "Culprits: aminoglycosides, NSAIDs, diuretics, ACE inhibitors, amphotericin B, vancomycin",
            "Review dosing, hydration status, and necessity of each nephrotoxic agent"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-ger-delirium",
  "chapter": "Geriatrics",
  "group": "Frailty & Delirium",
  "name": "Suspected Delirium",
  "root": {
    "q": "Acute cognitive decline over hours-days, with a fluctuating course and impaired attention/consciousness?",
    "options": [
      {
        "label": "Yes — matches CAM (Acute onset/fluctuation + Inattention + Disorganized thinking or altered Consciousness)",
        "next": {
          "q": "Distinguishing from dementia or depression — which fits best?",
          "options": [
            {
              "label": "Acute/fluctuating with an attention problem",
              "next": {
                "leaf": true,
                "diagnosis": "Delirium",
                "treatment": [
                  "Find and treat the trigger (infection, drug effect, electrolyte, retention/impaction, pain, withdrawal, etc.)",
                  "Calm, familiar environment; maintain sleep-wake cycle; adequate analgesia",
                  "Antipsychotics only for severe delusional/agitated states — not routine",
                  "Prevention: orientation, hydration, sleep schedule, mobility, glasses/hearing aids — no drug has been shown to prevent delirium"
                ],
                "notes": [
                  "Risk factors: older age, baseline dementia, sensory deprivation, immobility, restraints",
                  "Can be hyperactive or hypoactive — hypoactive delirium is easily missed",
                  "Avoid benzodiazepines unless the cause is alcohol withdrawal/delirium tremens"
                ]
              }
            },
            {
              "label": "Chronic decline in memory/language/calculation/learning",
              "next": {
                "leaf": true,
                "diagnosis": "More consistent with dementia than delirium",
                "treatment": [
                  "Proceed with formal cognitive screening (Mini-Cog/MMSE) and dementia workup rather than acute delirium management"
                ]
              }
            },
            {
              "label": "Mood change, anhedonia, apathy predominate",
              "next": {
                "leaf": true,
                "diagnosis": "More consistent with depression than delirium",
                "treatment": [
                  "Proceed with depression screening (GDS-15) rather than acute delirium management"
                ]
              }
            }
          ]
        }
      },
      {
        "label": "No — chronic/stable course",
        "next": {
          "leaf": true,
          "diagnosis": "Delirium unlikely",
          "treatment": [
            "Reconsider dementia (chronic decline) or depression (mood/anhedonia) as the better fit for a chronic presentation"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-rad-cxr-quality",
  "chapter": "Radiology",
  "group": "Chest Imaging",
  "name": "Chest X-Ray — Quality Check and Systematic Read",
  "root": {
    "q": "Technical quality check first — PA vs AP, inspiration vs expiration, rotation, penetration. Any quality issue?",
    "options": [
      {
        "label": "Expiratory film",
        "next": {
          "leaf": true,
          "diagnosis": "Expiration artifact",
          "treatment": [
            "Expiration enlarges the heart shadow and can mimic pneumonic/edema-like findings — repeat on inspiration or interpret with caution",
            "Do not diagnose cardiomegaly or infiltrate from an expiratory film alone"
          ]
        }
      },
      {
        "label": "Rotated or under/over-penetrated",
        "next": {
          "leaf": true,
          "diagnosis": "Suboptimal technical quality",
          "treatment": [
            "Correct positioning/exposure and repeat if a confident read is not possible",
            "Do not over-call mediastinal widening or asymmetry on a rotated film"
          ]
        }
      },
      {
        "label": "Good quality (PA, adequate inspiration, not rotated, well penetrated)",
        "next": {
          "leaf": true,
          "diagnosis": "Proceed with systematic read",
          "treatment": [
            "Read in order: soft tissue and bones → pleura → trachea → hilum → heart shadow → lungs and fissures → lateral film if available",
            "Key signs to actively check for: silhouette sign (adjacent structures of similar density obscuring a border, e.g. pneumonia/edema obscuring the heart border), air bronchogram (alveolar filling: inflammation/hemorrhage/edema), enlarged hilum (lymphoma/sarcoidosis/metastasis)"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-rad-chest-path",
  "chapter": "Radiology",
  "group": "Chest Imaging",
  "name": "Chest X-Ray — Which Pathology?",
  "root": {
    "q": "Dominant CXR pattern?",
    "options": [
      {
        "label": "Parenchymal density, no volume shift, air bronchogram present",
        "next": {
          "leaf": true,
          "diagnosis": "Pneumonia",
          "treatment": [
            "Correlate clinically (fever, productive cough, elevated inflammatory markers) and treat per standard CAP/HAP pathways"
          ]
        }
      },
      {
        "label": "Increased density with volume loss, mediastinum pulled toward the opacity",
        "next": {
          "leaf": true,
          "diagnosis": "Atelectasis",
          "treatment": [
            "Look for and treat the underlying cause of collapse (mucus plug, obstructing lesion, compression) — mediastinal shift is TOWARD the lesion, distinguishing it from effusion"
          ]
        }
      },
      {
        "label": "Blunted costophrenic angle, meniscus convex toward the lung, no air bronchogram",
        "next": {
          "leaf": true,
          "diagnosis": "Pleural effusion",
          "treatment": [
            "Ultrasound to confirm and guide diagnostic/therapeutic aspiration",
            "Proceed to the pleural-effusion workflow for transudate/exudate classification"
          ]
        }
      },
      {
        "label": "Effusion with concave margin, air bubbles, contrast enhancement, split-pleura sign on CT",
        "next": {
          "leaf": true,
          "diagnosis": "Empyema",
          "treatment": [
            "These CT features (concave effusion, air bubbles, split pleural sign, enhancement) indicate infected/loculated fluid, not simple effusion — drainage is typically required"
          ]
        }
      },
      {
        "label": "Pleural line separation, air-filled pleural cavity, small/dense lung, mediastinal shift AWAY from the side",
        "next": {
          "leaf": true,
          "diagnosis": "Pneumothorax",
          "treatment": [
            "Mediastinal shift away from the affected side with hemodynamic compromise = tension physiology — needs emergent decompression",
            "Otherwise manage per size/stability (observation, aspiration, or chest tube)"
          ]
        }
      },
      {
        "label": "Hilar blurring → interstitial lines → Kerley B lines → gravity-dependent cloudy lungs",
        "next": {
          "leaf": true,
          "diagnosis": "Pulmonary edema",
          "treatment": [
            "This is the classic radiographic progression of cardiogenic pulmonary edema — treat the underlying cardiac cause alongside diuresis/afterload reduction"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-rad-gi-imaging",
  "chapter": "Radiology",
  "group": "Abdominal Imaging",
  "name": "Suspected Small-Bowel Inflammatory Disease — Imaging Choice",
  "root": {
    "q": "Patient population?",
    "options": [
      {
        "label": "Children, young adults, or pregnancy",
        "next": {
          "leaf": true,
          "diagnosis": "Prefer MR Enterography (MRE)",
          "treatment": [
            "Very good resolution for the small intestine without ionizing radiation — preferred specifically in these groups"
          ]
        }
      },
      {
        "label": "General adult population",
        "next": {
          "leaf": true,
          "diagnosis": "CT Enterography (CTE) — gold standard for enteric imaging",
          "treatment": [
            "Preparation includes fasting, antiperistaltic agents, and IV contrast",
            "Interpret Crohn-like findings by: proximal vs distal location; focal (<5cm) vs segmental (5-40cm) vs diffuse (>40cm) extent; mucosal/submucosal/serosal vs transmural involvement; presence of lymphadenopathy; wall thickness (mild 3-5mm, intermediate 5-9mm, typical >10mm)"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-rad-hepatobiliary",
  "chapter": "Radiology",
  "group": "Abdominal Imaging",
  "name": "RUQ Pain / Hepatobiliary-Pancreatic Imaging",
  "root": {
    "q": "Clinical question?",
    "options": [
      {
        "label": "RUQ pain, suspected gallstones/cholecystitis, or cirrhosis/portal hypertension assessment",
        "next": {
          "leaf": true,
          "diagnosis": "Ultrasound — first line",
          "treatment": [
            "Gallstones appear hyperechoic",
            "Biliary colic: RUQ pain after a fatty meal",
            "Obstruction pattern: jaundice + RUQ pain + fever",
            "Murphy sign (pain on inspiration while pressing the RUQ) supports acute cholecystitis",
            "Also used for gallbladder assessment, cirrhosis, Budd-Chiari, and portal hypertension evaluation"
          ]
        }
      },
      {
        "label": "Suspected PSC, pancreatic cysts, or bile-duct evaluation (e.g. post-transplant)",
        "next": {
          "leaf": true,
          "diagnosis": "MRCP",
          "treatment": [
            "T2-based sequence, no gadolinium needed",
            "Used for PSC, pancreatic cysts, and transplant biliary assessment"
          ]
        }
      },
      {
        "label": "Suspected acute pancreatitis",
        "next": {
          "leaf": true,
          "diagnosis": "Diagnose clinically — imaging mainly for complications",
          "treatment": [
            "CT is reserved mainly for detecting complications: necrosis, infection, pseudocyst",
            "ERCP if gallstone pancreatitis is suspected (biliary obstruction)"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-rad-brain-stroke",
  "chapter": "Radiology",
  "group": "Neuroimaging",
  "name": "Acute Focal Neurologic Deficit — Imaging Sequence",
  "root": {
    "q": "First test: non-contrast CT brain. Purpose achieved (rule out hemorrhage, rule out thrombolysis contraindication, detect large established infarct) — next step?",
    "options": [
      {
        "label": "No hemorrhage, ischemic stroke still suspected — need vessel/perfusion detail",
        "next": {
          "leaf": true,
          "diagnosis": "CTA + CT perfusion",
          "treatment": [
            "CTA: higher sensitivity, confirms arterial blockage/large-vessel occlusion",
            "Perfusion: identifies the penumbra, helps extend the treatment time window, and selects patients for endovascular intervention"
          ]
        }
      },
      {
        "label": "Need higher soft-tissue resolution, or stroke mimic/tumor/venous sinus thrombosis/tumefactive demyelination suspected",
        "next": {
          "leaf": true,
          "diagnosis": "MRI",
          "treatment": [
            "Preferred when soft-tissue detail is needed beyond what CT/CTA/perfusion provide, or when the differential includes stroke mimics, tumor, cerebral venous sinus thrombosis, or tumefactive demyelination"
          ]
        }
      },
      {
        "label": "Hemorrhage identified on NCCT",
        "next": {
          "leaf": true,
          "diagnosis": "Hemorrhagic stroke confirmed on NCCT",
          "treatment": [
            "Do not proceed to thrombolysis/CTA-for-thrombectomy pathway",
            "Localize the bleed: deep (basal ganglia/thalamus/pons) suggests hypertensive arteriopathy; lobar in an elderly patient suggests cerebral amyloid angiopathy"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-rad-ir",
  "chapter": "Radiology",
  "group": "Interventional Radiology",
  "name": "When to Think Interventional Radiology",
  "root": {
    "q": "What does the problem need?",
    "options": [
      {
        "label": "Biopsy, abscess drainage, central line placement, or invasive oncology treatment",
        "next": {
          "leaf": true,
          "diagnosis": "Interventional Radiology referral",
          "treatment": [
            "IR uses image guidance for biopsy, abscess drainage, central line placement, and invasive oncology procedures (e.g. ablation, embolization)"
          ]
        }
      },
      {
        "label": "GI bleeding not controlled by initial measures",
        "next": {
          "q": "Where in the GI-bleed pathway?",
          "options": [
            {
              "label": "Just presenting — not yet endoscoped",
              "next": {
                "leaf": true,
                "diagnosis": "Stabilize and endoscope first",
                "treatment": [
                  "Stabilize with fluids/vasopressors as needed",
                  "Endoscopy to identify and treat the source first"
                ]
              }
            },
            {
              "label": "No source found on endoscopy, or bleeding continues",
              "next": {
                "leaf": true,
                "diagnosis": "Angiography ± embolization",
                "treatment": [
                  "Angiography to localize the bleeding vessel; embolize if found",
                  "TIPS for severe esophageal variceal bleeding not controlled by endoscopic/pharmacologic measures"
                ]
              }
            }
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-rad-lung-nodule",
  "chapter": "Radiology",
  "group": "Lung Nodule & Cancer Staging",
  "name": "Lung Nodule or Mass — Benign or Malignant?",
  "root": {
    "q": "Size and morphology?",
    "options": [
      {
        "label": "Solid nodule <6mm, low-risk nonsmoker, no suspicious features",
        "next": {
          "leaf": true,
          "diagnosis": "Benign — no follow-up needed",
          "treatment": [
            "A solid nodule under 6mm without suspicious features in a low-risk nonsmoker does not require follow-up imaging"
          ]
        }
      },
      {
        "label": "Calcified granuloma, or hamartoma with fat density/'popcorn' calcification",
        "next": {
          "leaf": true,
          "diagnosis": "Benign pattern",
          "treatment": [
            "These are classic benign imaging patterns — routine follow-up per standard nodule guidelines rather than urgent biopsy"
          ]
        }
      },
      {
        "label": "Spiculated margins, pleural indentation, upper-lobe location, cystic/bubble lucencies, heterogeneous ground-glass, or interval growth",
        "next": {
          "q": "Malignancy suspected — nodal staging needed?",
          "options": [
            {
              "label": "Yes, assessing nodal spread",
              "next": {
                "leaf": true,
                "diagnosis": "Proceed to PET-CT for nodal staging",
                "treatment": [
                  "PET-CT is the gold-standard test for evaluating nodal malignant risk",
                  "T-stage by size/invasion: T1 <3cm; T2 3-5cm or involves main bronchus/atelectasis/obstructive pneumonia; T3 5-7cm or pleura/chest-wall invasion; T4 >7cm or mediastinal/aortic invasion/multiple tumors in the same lung",
                  "N-stage: N1 ipsilateral peripheral/hilar; N2 ipsilateral mediastinal/subcarinal; N3 contralateral/supraclavicular/scalene"
                ]
              }
            },
            {
              "label": "Not yet — first characterizing the primary lesion",
              "next": {
                "leaf": true,
                "diagnosis": "Malignant-pattern nodule/mass — biopsy for tissue diagnosis",
                "treatment": [
                  "Tissue diagnosis needed before formal staging; proceed to PET-CT and staging once malignancy is confirmed"
                ]
              }
            }
          ]
        }
      }
    ],
    "clues": [
      "Nodule: rounded opacity <3cm",
      "Mass: rounded opacity >3cm"
    ]
  }
},
{
  "id": "dtree-neuro-localize",
  "chapter": "Neurology",
  "group": "Localization & Approach",
  "name": "Localizing a Neurologic Deficit",
  "root": {
    "q": "Which pattern is present?",
    "options": [
      {
        "label": "Contralateral face/limb deficits",
        "next": {
          "leaf": true,
          "diagnosis": "Hemisphere lesion",
          "treatment": [
            "Localize further with cortical vs subcortical signs and imaging"
          ]
        }
      },
      {
        "label": "Cognitive/mental changes, seizures, movement disorder",
        "next": {
          "leaf": true,
          "diagnosis": "Cerebral/cortical lesion",
          "treatment": [
            "Consider structural imaging and EEG if seizures are part of the picture"
          ]
        }
      },
      {
        "label": "Ipsilateral cranial nerve findings + contralateral body signs (crossed signs)",
        "next": {
          "leaf": true,
          "diagnosis": "Brainstem lesion",
          "treatment": [
            "Crossed findings (face on one side, body on the other) localize to the brainstem — correlate with the specific cranial nerves involved"
          ]
        }
      },
      {
        "label": "Lower-limb deficit + sensory level + incontinence",
        "next": {
          "leaf": true,
          "diagnosis": "Spinal cord lesion",
          "treatment": [
            "A clear sensory level plus bladder/bowel involvement strongly localizes to the cord — urgent imaging to assess for compression"
          ]
        }
      },
      {
        "label": "Single limb, single dermatome, or specific muscle group",
        "next": {
          "leaf": true,
          "diagnosis": "Root or peripheral nerve lesion",
          "treatment": [
            "Correlate the specific distribution with a dermatomal/myotomal map or named nerve"
          ]
        }
      },
      {
        "label": "Distal weakness with reflex loss",
        "next": {
          "leaf": true,
          "diagnosis": "Peripheral nerve lesion",
          "treatment": [
            "Consider nerve conduction studies/EMG"
          ]
        }
      },
      {
        "label": "Symmetric glove-and-stocking pattern",
        "next": {
          "leaf": true,
          "diagnosis": "Polyneuropathy",
          "treatment": [
            "Screen for the common causes: diabetes, B12 deficiency, alcohol, toxins, hereditary neuropathy"
          ]
        }
      },
      {
        "label": "Symmetric proximal weakness",
        "next": {
          "leaf": true,
          "diagnosis": "Myopathy",
          "treatment": [
            "Check CK and consider EMG/muscle biopsy; proceed to the UMN vs LMN vs myopathy tree for the full feature comparison"
          ]
        }
      },
      {
        "label": "Fatigable weakness that worsens with sustained activity",
        "next": {
          "leaf": true,
          "diagnosis": "Neuromuscular junction disorder",
          "treatment": [
            "Consider myasthenia gravis (repetitive nerve stimulation, antibody testing) or Lambert-Eaton"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-neuro-umn-lmn",
  "chapter": "Neurology",
  "group": "Localization & Approach",
  "name": "Weakness — UMN vs LMN vs Myopathy",
  "root": {
    "q": "Exam findings — atrophy/fasciculations, tone, reflexes, Babinski?",
    "options": [
      {
        "label": "No atrophy/fasciculations, spastic/increased tone, hyperactive reflexes, positive Babinski, pyramidal/regional weakness pattern",
        "next": {
          "leaf": true,
          "diagnosis": "Upper motor neuron (UMN) pattern",
          "treatment": [
            "Localizes to brain or spinal cord above the anterior horn cell — proceed with CNS imaging"
          ]
        }
      },
      {
        "label": "Common atrophy/fasciculations, decreased tone, hypoactive reflexes, negative Babinski, distal/segmental weakness pattern",
        "next": {
          "leaf": true,
          "diagnosis": "Lower motor neuron (LMN) pattern",
          "treatment": [
            "Localizes to anterior horn cell, root, plexus, or peripheral nerve — consider EMG/nerve conduction studies"
          ]
        }
      },
      {
        "label": "Mild/absent atrophy, normal/decreased tone, normal/decreased reflexes, negative Babinski, proximal weakness pattern",
        "next": {
          "leaf": true,
          "diagnosis": "Myopathy pattern",
          "treatment": [
            "Check CK; consider EMG and muscle biopsy if the cause is not clear from history/medications (e.g. statins, steroids)"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-neuro-emergency",
  "chapter": "Neurology",
  "group": "Altered Mental Status",
  "name": "Initial Neurologic Emergency Assessment",
  "root": {
    "q": "Start with ABC2 (Airway, Breathing, Circulation, Cognitive status) — stable?",
    "options": [
      {
        "label": "Unstable ABCs",
        "next": {
          "leaf": true,
          "diagnosis": "Stabilize before further neurologic workup",
          "treatment": [
            "Secure airway/breathing/circulation first — neurologic exam and imaging follow stabilization"
          ]
        }
      },
      {
        "label": "Stable — proceed with neuro exam",
        "next": {
          "leaf": true,
          "diagnosis": "Proceed to detailed neurologic assessment",
          "treatment": [
            "Check GCS, pupils, vestibulo-ocular reflex, meningeal signs",
            "Mental status assessment: orientation, attention, speech, memory, judgment"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-neuro-ams-coma",
  "chapter": "Neurology",
  "group": "Altered Mental Status",
  "name": "Altered Mental Status / Coma",
  "root": {
    "q": "Systemic causes first — hypoxia, hypotension, hypoglycemia ruled out?",
    "options": [
      {
        "label": "Not yet ruled out",
        "next": {
          "leaf": true,
          "diagnosis": "Stabilize and rule out systemic causes first",
          "treatment": [
            "Airway, breathing, circulation",
            "Check and correct hypoxia, hypotension, hypoglycemia before attributing the picture to a primary neurologic cause"
          ]
        }
      },
      {
        "label": "Ruled out — pupils asymmetric (anisocoria)?",
        "next": {
          "q": "Which pupil is abnormal, and is it worse in the dark or in the light?",
          "options": [
            {
              "label": "Worse in the dark (small pupil is abnormal)",
              "next": {
                "leaf": true,
                "diagnosis": "Sympathetic lesion (e.g. Horner syndrome)",
                "treatment": [
                  "The abnormally small pupil fails to dilate in the dark — localize the sympathetic pathway lesion"
                ]
              }
            },
            {
              "label": "Worse in the light (large pupil is abnormal)",
              "next": {
                "leaf": true,
                "diagnosis": "Parasympathetic lesion (e.g. CN III compression)",
                "treatment": [
                  "The abnormally large pupil fails to constrict in the light — urgent evaluation for CN III compression (e.g. uncal herniation, PCom aneurysm)"
                ]
              }
            }
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-neuro-vertigo",
  "chapter": "Neurology",
  "group": "Dizziness & Vertigo",
  "name": "Vertigo — Peripheral or Central?",
  "root": {
    "q": "True vertigo (illusion of spinning/motion) with other neurologic signs, cranial nerve deficits, ataxia, or focal weakness/sensory symptoms?",
    "options": [
      {
        "label": "Yes — other neurologic signs present",
        "next": {
          "leaf": true,
          "diagnosis": "Central vertigo (brainstem/cerebellar lesion)",
          "treatment": [
            "Urgent neuroimaging — central vertigo with focal signs needs to be worked up as a possible posterior-circulation stroke or other structural lesion"
          ]
        }
      },
      {
        "label": "No — isolated vertigo, positional or with ear symptoms",
        "next": {
          "q": "Which pattern?",
          "options": [
            {
              "label": "Recurrent, triggered by head position",
              "next": {
                "leaf": true,
                "diagnosis": "BPPV",
                "treatment": [
                  "Epley maneuver"
                ]
              }
            },
            {
              "label": "Acute, continuous",
              "next": {
                "leaf": true,
                "diagnosis": "Vestibular neuritis",
                "treatment": [
                  "Supportive care / vestibular rehabilitation"
                ]
              }
            },
            {
              "label": "Vertigo + hearing loss + tinnitus + ear fullness",
              "next": {
                "leaf": true,
                "diagnosis": "Meniere disease",
                "treatment": [
                  "Diuretics + sodium restriction"
                ]
              }
            }
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-neuro-stroke",
  "chapter": "Neurology",
  "group": "Stroke",
  "name": "Acute Stroke — Recognition and Treatment",
  "root": {
    "q": "Abrupt focal neurologic deficit of vascular origin — imaging shows?",
    "options": [
      {
        "label": "Ischemic (no hemorrhage on NCCT)",
        "next": {
          "q": "Within 4.5 hours of symptom onset, or large-vessel occlusion (LVO) confirmed on CTA?",
          "options": [
            {
              "label": "Within 4.5h window",
              "next": {
                "leaf": true,
                "diagnosis": "IV tPA candidate",
                "treatment": [
                  "Administer IV tPA if within the 4.5-hour window and no contraindication",
                  "Goal is to save the penumbra — time is brain"
                ]
              }
            },
            {
              "label": "LVO confirmed (any eligible time window)",
              "next": {
                "leaf": true,
                "diagnosis": "Endovascular thrombectomy candidate",
                "treatment": [
                  "Endovascular thrombectomy for confirmed large-vessel occlusion — benefit demonstrated beyond the tPA-only window in appropriately selected patients"
                ]
              }
            }
          ]
        }
      },
      {
        "label": "Hemorrhagic (blood on NCCT)",
        "next": {
          "leaf": true,
          "diagnosis": "Hemorrhagic stroke",
          "treatment": [
            "Do NOT give tPA or thrombectomy — manage as intracerebral hemorrhage",
            "Localize by imaging: deep (basal ganglia/thalamus/pons) → hypertensive arteriopathy; lobar in the elderly → cerebral amyloid angiopathy"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-neuro-stroke-artery",
  "chapter": "Neurology",
  "group": "Stroke",
  "name": "Stroke — Which Artery, by Syndrome",
  "root": {
    "q": "Predominant deficit pattern?",
    "options": [
      {
        "label": "Leg weakness > arm weakness, abulia, incontinence",
        "next": {
          "leaf": true,
          "diagnosis": "ACA territory",
          "treatment": [
            "Correlate with anterior cerebral artery territory on imaging"
          ]
        }
      },
      {
        "label": "Face/arm weakness, aphasia (if dominant hemisphere), neglect (if nondominant hemisphere)",
        "next": {
          "leaf": true,
          "diagnosis": "MCA territory",
          "treatment": [
            "Most common large-vessel stroke syndrome — assess LVO/thrombectomy eligibility"
          ]
        }
      },
      {
        "label": "Hemianopia",
        "next": {
          "leaf": true,
          "diagnosis": "PCA territory",
          "treatment": [
            "Correlate with posterior cerebral artery/occipital lobe territory"
          ]
        }
      },
      {
        "label": "Cranial nerve palsies, ataxia, vertigo, or locked-in syndrome",
        "next": {
          "leaf": true,
          "diagnosis": "Vertebrobasilar territory",
          "treatment": [
            "Posterior circulation stroke — has a broader symptom overlap with peripheral vertigo, so a careful exam for other neurologic signs is essential"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-neuro-stroke-secondary-prevention",
  "chapter": "Neurology",
  "group": "Stroke",
  "name": "Secondary Stroke Prevention — What Caused It?",
  "root": {
    "q": "Suspected mechanism?",
    "options": [
      {
        "label": "Pure motor or pure sensory syndrome, no cortical signs, chronic hypertension",
        "next": {
          "leaf": true,
          "diagnosis": "Lacunar / small-vessel disease",
          "treatment": [
            "Prevention centers on intensive blood-pressure control"
          ]
        }
      },
      {
        "label": "Symptomatic severe extracranial carotid stenosis (>70%)",
        "next": {
          "leaf": true,
          "diagnosis": "Large-artery / carotid disease",
          "treatment": [
            "Carotid endarterectomy, ideally within 2 weeks of the event",
            "Carotid stenting if high surgical risk"
          ]
        }
      },
      {
        "label": "Non-valvular atrial fibrillation identified",
        "next": {
          "leaf": true,
          "diagnosis": "Cardioembolic (AF)",
          "treatment": [
            "DOACs preferred over warfarin",
            "LAA closure if anticoagulation is not tolerated"
          ]
        }
      },
      {
        "label": "No clear source identified (cryptogenic / ESUS)",
        "next": {
          "leaf": true,
          "diagnosis": "Cryptogenic / embolic stroke of undetermined source",
          "treatment": [
            "Suspect occult AF — prolonged cardiac monitoring/implantable loop recorder improves AF detection",
            "In younger patients, consider PFO/paradoxical embolism; PFO closure + antiplatelet therapy may be appropriate depending on context"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-neuro-ich",
  "chapter": "Neurology",
  "group": "Stroke",
  "name": "Intracerebral Hemorrhage — Location Suggests Cause",
  "root": {
    "q": "Location of the hemorrhage on imaging?",
    "options": [
      {
        "label": "Deep — basal ganglia, thalamus, or pons",
        "next": {
          "leaf": true,
          "diagnosis": "Hypertensive arteriopathy",
          "treatment": [
            "Aggressive blood-pressure control is central to management and secondary prevention"
          ]
        }
      },
      {
        "label": "Lobar, in an elderly patient",
        "next": {
          "leaf": true,
          "diagnosis": "Cerebral amyloid angiopathy",
          "treatment": [
            "Consider this diagnosis specifically in elderly patients with lobar (rather than deep) hemorrhage — has implications for future anticoagulation decisions"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-pulm-dyspnea",
  "chapter": "Pulmonology",
  "group": "Dyspnea & Hypoxemia",
  "name": "Dyspnea — Acute or Chronic?",
  "root": {
    "q": "Onset?",
    "options": [
      {
        "label": "Acute",
        "next": {
          "leaf": true,
          "diagnosis": "Acute dyspnea — assess urgency/severity immediately",
          "treatment": [
            "Think: pneumonia, pulmonary embolism, ACS, pulmonary edema",
            "Red flags: cyanosis/pallor, inability to speak in full sentences (marks severe dyspnea) — treat as an emergency"
          ]
        }
      },
      {
        "label": "Chronic / progressive",
        "next": {
          "leaf": true,
          "diagnosis": "Chronic dyspnea — broaden the differential by system",
          "treatment": [
            "Cardiovascular: CHF",
            "Airway: COPD/asthma",
            "Parenchymal: ILD/fibrosis",
            "Vascular: pulmonary hypertension",
            "Also consider: anemia, neuromuscular disease, chest-wall disease, systemic causes",
            "Clubbing on exam points toward chronic lung disease, cancer, chronic infection, fibrosis, infective endocarditis, shunt, or IBD"
          ]
        }
      }
    ],
    "clues": [
      "History: duration, progression, worse with exertion or rest, flares, orthopnea, platypnea, cough, hemoptysis, chest pain, presyncope, fever, smoking/exposures"
    ]
  }
},
{
  "id": "dtree-pulm-hypoxemia",
  "chapter": "Pulmonology",
  "group": "Dyspnea & Hypoxemia",
  "name": "Hypoxemia — Mechanism",
  "root": {
    "q": "A-a gradient (normal ≈ age/4 + 4) and response to supplemental O2?",
    "options": [
      {
        "label": "Normal A-a gradient, improves with O2, high-altitude context",
        "next": {
          "leaf": true,
          "diagnosis": "Low FiO2",
          "treatment": [
            "Correct the environmental/inspired-oxygen problem"
          ]
        }
      },
      {
        "label": "Normal A-a gradient, improves with O2, high PaCO2",
        "next": {
          "leaf": true,
          "diagnosis": "Hypoventilation",
          "treatment": [
            "PaCO2 directly reflects ventilation — address the cause of reduced minute ventilation (drugs, neuromuscular weakness, obstruction)"
          ]
        }
      },
      {
        "label": "High A-a gradient, often improves with O2 (worse with exertion) — ILD/fibrosis picture",
        "next": {
          "leaf": true,
          "diagnosis": "Diffusion limitation",
          "treatment": [
            "Classic for ILD/pulmonary fibrosis — correlate with HRCT and DLCO"
          ]
        }
      },
      {
        "label": "High A-a gradient, poor response to O2 — consolidation, AVM, or cardiac shunt",
        "next": {
          "leaf": true,
          "diagnosis": "Shunt",
          "treatment": [
            "Poor oxygen responsiveness is the key distinguishing feature from V/Q mismatch",
            "Consider consolidation, arteriovenous malformation, or intracardiac shunt"
          ]
        }
      },
      {
        "label": "High A-a gradient, improves with O2 — most common pattern",
        "next": {
          "leaf": true,
          "diagnosis": "V/Q mismatch",
          "treatment": [
            "The most common cause of hypoxemia and it is oxygen-responsive",
            "Consider PE, pneumonia, COPD"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-pulm-pft",
  "chapter": "Pulmonology",
  "group": "Pulmonary Function Tests",
  "name": "Pulmonary Function Test Interpretation",
  "root": {
    "q": "Spirometry FEV1/FVC ratio?",
    "options": [
      {
        "label": "< 0.7 (normal ≈ 0.8)",
        "next": {
          "q": "Bronchodilator response?",
          "options": [
            {
              "label": "Improves >200mL and >12%, or provocation/exercise worsening",
              "next": {
                "leaf": true,
                "diagnosis": "Obstructive pattern supporting asthma",
                "treatment": [
                  "Significant bronchodilator reversibility supports asthma over COPD"
                ]
              }
            },
            {
              "label": "Fixed, irreversible decrease, no major bronchodilator response",
              "next": {
                "leaf": true,
                "diagnosis": "Obstructive pattern supporting COPD",
                "treatment": [
                  "Fixed obstruction without major reversibility is the classic COPD pattern"
                ]
              }
            }
          ]
        }
      },
      {
        "label": "Normal or high ratio, but low volumes",
        "next": {
          "leaf": true,
          "diagnosis": "Suggests restriction — confirm with plethysmography",
          "treatment": [
            "TLC <80% on plethysmography confirms a truly restrictive pattern"
          ]
        }
      },
      {
        "label": "Need to characterize gas exchange further (DLCO)",
        "next": {
          "q": "DLCO result?",
          "options": [
            {
              "label": "Low DLCO + restriction",
              "next": {
                "leaf": true,
                "diagnosis": "ILD",
                "treatment": [
                  "Correlate with HRCT pattern"
                ]
              }
            },
            {
              "label": "Low DLCO + obstruction",
              "next": {
                "leaf": true,
                "diagnosis": "Emphysema",
                "treatment": [
                  "Correlate with COPD severity and imaging"
                ]
              }
            },
            {
              "label": "Isolated low DLCO",
              "next": {
                "leaf": true,
                "diagnosis": "Consider pulmonary hypertension, anemia, or early ILD",
                "treatment": [
                  "Isolated DLCO reduction without a clear obstructive/restrictive pattern warrants this broader differential"
                ]
              }
            },
            {
              "label": "High DLCO",
              "next": {
                "leaf": true,
                "diagnosis": "Consider Goodpasture/anti-GBM, shunt, or erythrocytosis",
                "treatment": [
                  "An elevated DLCO is itself a diagnostic clue, not just a normal variant"
                ]
              }
            }
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-pulm-airway-obstruction",
  "chapter": "Pulmonology",
  "group": "Obstructive Lung Disease",
  "name": "Airway Obstruction — Upper vs Lower, and Which Disease",
  "root": {
    "q": "Stridor present (suggesting glottic/subglottic narrowing)?",
    "options": [
      {
        "label": "Yes — stridor",
        "next": {
          "leaf": true,
          "diagnosis": "Upper airway obstruction",
          "treatment": [
            "Consider foreign body, tumor, or post-intubation granulation tissue as causes",
            "Inspiratory or expiratory narrowing pattern helps localize the lesion further"
          ]
        }
      },
      {
        "label": "No — lower airway pattern",
        "next": {
          "q": "Which lower-airway disease?",
          "options": [
            {
              "label": "Episodic/paroxysmal obstruction, triggers (seasonal, allergens, exercise), usually onset <40",
              "next": {
                "leaf": true,
                "diagnosis": "Asthma",
                "treatment": [
                  "ICS is the central treatment",
                  "Stepwise: primary diagnosis → ICS + LABA; progressive disease → ICS + LABA + LAMA; severe disease → biologics, azithromycin, roflumilast, dupilumab",
                  "Biologics: anti-IgE (omalizumab), anti-IL4/13 (dupilumab), anti-IL5 (mepolizumab/reslizumab)"
                ]
              }
            },
            {
              "label": "Chronic bronchitis/emphysema picture, smoking history, fixed obstruction",
              "next": {
                "leaf": true,
                "diagnosis": "COPD",
                "treatment": [
                  "Baseline: LAMA/LABA without ICS",
                  "GOLD group A: LAMA or LABA; group B: combination LAMA+LABA; group E: LAMA+LABA, consider adding ICS if exacerbation-prone",
                  "Exacerbation treatment: SABA, systemic steroids for 5 days, consider antibiotics, respiratory support while trying to avoid intubation"
                ]
              }
            },
            {
              "label": "Chronic productive cough, recurrent infections, COPD-like symptoms, diagnosed on CT",
              "next": {
                "leaf": true,
                "diagnosis": "Bronchiectasis",
                "treatment": [
                  "Causes: chronic obstruction/foreign body, immunodeficiency, cystic fibrosis, primary ciliary dyskinesia, ABPA",
                  "Treatment: airway clearance physiotherapy, infection prevention, active mucus clearance, hypertonic saline/acetylcysteine/azithromycin"
                ]
              }
            },
            {
              "label": "COPD symptoms at a young age, limited smoking history, family history, liver disease, panniculitis",
              "next": {
                "leaf": true,
                "diagnosis": "Alpha-1 antitrypsin deficiency",
                "treatment": [
                  "CT typically shows lower-lobe emphysema (vs. upper-lobe predominance in typical smoking-related COPD)",
                  "Treatment: enzyme replacement"
                ]
              }
            }
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-pulm-pleural-effusion",
  "chapter": "Pulmonology",
  "group": "Pleural Disease",
  "name": "Pleural Effusion Workflow",
  "root": {
    "q": "Known heart failure with a symmetric effusion?",
    "options": [
      {
        "label": "Yes — known HF, symmetric effusion",
        "next": {
          "leaf": true,
          "diagnosis": "Presumed transudative HF effusion — tap not required",
          "treatment": [
            "Pleural puncture is done for all effusions EXCEPT known HF with a symmetric effusion",
            "High BNP supports the HF diagnosis if confirmation is needed"
          ]
        }
      },
      {
        "label": "No — perform diagnostic tap and apply Light's criteria",
        "next": {
          "q": "Exudate by Light's criteria (any of: pleural/serum protein ratio >0.5; pleural/serum LDH ratio >0.6; pleural LDH >2/3 upper limit of normal serum LDH)?",
          "options": [
            {
              "label": "No — transudate",
              "next": {
                "leaf": true,
                "diagnosis": "Transudative effusion",
                "treatment": [
                  "Causes: heart failure (most common, high BNP), cirrhosis, nephrotic syndrome, peritoneal dialysis, SVC stenosis"
                ]
              }
            },
            {
              "label": "Yes — exudate",
              "next": {
                "q": "Special exudate pattern?",
                "options": [
                  {
                    "label": "Low pH <7.2, low glucose, positive culture, pus",
                    "next": {
                      "leaf": true,
                      "diagnosis": "Parapneumonic effusion / empyema",
                      "treatment": [
                        "Requires drainage; do not treat as simple exudate"
                      ]
                    }
                  },
                  {
                    "label": "Lung/breast/lymphoma history, abnormal cytology",
                    "next": {
                      "leaf": true,
                      "diagnosis": "Malignant effusion",
                      "treatment": [
                        "Cytology and/or pleural biopsy for diagnosis"
                      ]
                    }
                  },
                  {
                    "label": "Lymphocytic exudate, high ADA/IFN-gamma",
                    "next": {
                      "leaf": true,
                      "diagnosis": "Tuberculous effusion",
                      "treatment": [
                        "Proceed to the tuberculosis workflow"
                      ]
                    }
                  },
                  {
                    "label": "Triglycerides >110",
                    "next": {
                      "leaf": true,
                      "diagnosis": "Chylothorax",
                      "treatment": [
                        "Search for thoracic duct disruption (trauma, malignancy, lymphatic disease)"
                      ]
                    }
                  },
                  {
                    "label": "Post-CABG or post-MI context",
                    "next": {
                      "leaf": true,
                      "diagnosis": "Dressler syndrome / post-cardiac injury syndrome",
                      "treatment": [
                        "Treat with NSAIDs"
                      ]
                    }
                  },
                  {
                    "label": "None of the above — general exudate",
                    "next": {
                      "leaf": true,
                      "diagnosis": "Exudative effusion, general causes",
                      "treatment": [
                        "Consider malignancy, infection, PE, GI disease, connective tissue disease, drug-induced, post-radiation"
                      ]
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-pulm-ild",
  "chapter": "Pulmonology",
  "group": "Interstitial Lung Disease",
  "name": "Suspected Interstitial Lung Disease",
  "root": {
    "q": "HRCT pattern?",
    "options": [
      {
        "label": "Peripheral, basal, subpleural honeycombing with traction bronchiectasis (UIP pattern)",
        "next": {
          "leaf": true,
          "diagnosis": "Idiopathic pulmonary fibrosis (IPF) / UIP pattern",
          "treatment": [
            "Antifibrotics: pirfenidone or nintedanib",
            "Smoking cessation and supportive care"
          ]
        }
      },
      {
        "label": "Allergen exposure (e.g. birds), upper-lobe involvement, ground-glass opacity + bronchiolitis",
        "next": {
          "leaf": true,
          "diagnosis": "Hypersensitivity pneumonitis",
          "treatment": [
            "Remove the causative exposure",
            "Prednisone"
          ]
        }
      },
      {
        "label": "Intra-alveolar granulation tissue / Masson bodies on biopsy",
        "next": {
          "leaf": true,
          "diagnosis": "Cryptogenic organizing pneumonia (COP)",
          "treatment": [
            "Steroids"
          ]
        }
      }
    ],
    "clues": [
      "Symptoms: progressive dyspnea, dry cough, systemic symptoms (fever/weight loss)",
      "Exam: dry Velcro crackles at the bases, sometimes wheeze, clubbing in IPF/asbestosis"
    ]
  }
},
{
  "id": "dtree-pulm-pht",
  "chapter": "Pulmonology",
  "group": "Pulmonary Vascular Disease",
  "name": "Pulmonary Hypertension (mPAP >20mmHg)",
  "root": {
    "q": "Right-heart catheterization: wedge pressure and PVR (PVR = (mPAP - wedge)/CO, elevated if >3)?",
    "options": [
      {
        "label": "Wedge <15 (pre-capillary), PVR elevated — idiopathic, genetic, drug-induced, HIV, connective tissue disease, or portal hypertension context",
        "next": {
          "leaf": true,
          "diagnosis": "Group 1 — Pulmonary arterial hypertension (PAH)",
          "treatment": [
            "Combine prostacyclin analogs, endothelin receptor antagonists, and NO/PDE5/cGMP-pathway drugs",
            "CCBs only if formally vasoreactive on testing"
          ]
        }
      },
      {
        "label": "Wedge ≥15 (post-capillary) — left heart failure context",
        "next": {
          "leaf": true,
          "diagnosis": "Group 2 — Due to left heart disease",
          "treatment": [
            "Treat the primary left-heart disease"
          ]
        }
      },
      {
        "label": "Pre-capillary, chronic lung disease/hypoxia context",
        "next": {
          "leaf": true,
          "diagnosis": "Group 3 — Due to lung disease/chronic hypoxia",
          "treatment": [
            "Treat the primary lung disease/hypoxia"
          ]
        }
      },
      {
        "label": "Thromboembolic disease/CTEPH context",
        "next": {
          "leaf": true,
          "diagnosis": "Group 4 — Chronic thromboembolic pulmonary hypertension (CTEPH)",
          "treatment": [
            "Pulmonary endarterectomy if the disease is surgically accessible (proximal)",
            "Balloon pulmonary angioplasty if not amenable to surgery",
            "cGMP-pathway activator (riociguat) as medical therapy"
          ]
        }
      },
      {
        "label": "Hematologic/systemic/metabolic disease or congenital heart defect context",
        "next": {
          "leaf": true,
          "diagnosis": "Group 5 — Multifactorial/unclear mechanisms",
          "treatment": [
            "Treat the underlying systemic/hematologic/metabolic condition"
          ]
        }
      },
      {
        "label": "Severe and refractory to group-specific therapy",
        "next": {
          "leaf": true,
          "diagnosis": "Consider lung transplantation",
          "treatment": [
            "Reserved for severe, refractory disease across groups"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-pulm-hemoptysis",
  "chapter": "Pulmonology",
  "group": "Hemoptysis",
  "name": "Hemoptysis Workflow",
  "root": {
    "q": "True hemoptysis (blood from the lower airways, not pseudohemoptysis from the upper airway) — life-threatening?",
    "options": [
      {
        "label": "Yes — life-threatening",
        "next": {
          "leaf": true,
          "diagnosis": "Life-threatening hemoptysis",
          "treatment": [
            "Place the bleeding side down",
            "Respiratory and hemodynamic support",
            "Intubate with a large-bore tube if needed to allow bronchoscopy",
            "Bronchoscopic interventions: cold saline, adrenaline, balloon occlusion; ablation if needed",
            "Common causes at this severity: bronchiectasis, TB, malignancy",
            "HRCT, bronchoscopy, and angiography (especially if chronic/recurrent) for diagnosis"
          ]
        }
      },
      {
        "label": "No — non-life-threatening",
        "next": {
          "leaf": true,
          "diagnosis": "Non-life-threatening hemoptysis",
          "treatment": [
            "Broad differential: bronchitis, bronchiectasis, tumor, vascular malformation, heart failure/mitral stenosis/AVM/PE, pneumonia, connective tissue disease, coagulopathy, trauma, cryptogenic",
            "HRCT and bronchoscopy for diagnosis; angiography if chronic/recurrent"
          ]
        }
      }
    ],
    "clues": [
      "Life-threatening is about risk, not just volume: airway obstruction, gas-exchange disruption, or hemodynamic instability",
      "Older volume definitions: 150cc/24h or >100cc/hour"
    ]
  }
},
{
  "id": "dtree-pulm-tb",
  "chapter": "Pulmonology",
  "group": "Tuberculosis",
  "name": "Tuberculosis — Latent vs Active",
  "root": {
    "q": "Symptomatic with prolonged fever, weight loss, night sweats, and organ-specific symptoms, or abnormal imaging?",
    "options": [
      {
        "label": "Yes — suspected active TB",
        "next": {
          "q": "Site of disease?",
          "options": [
            {
              "label": "Pulmonary — upper-lobe cavitation, hilar lymphadenopathy, granulomas (early disease can affect lower lobes and cause pleural effusion; HIV patients can have normal imaging)",
              "next": {
                "leaf": true,
                "diagnosis": "Active pulmonary TB",
                "treatment": [
                  "Diagnose with sputum culture and PCR — need 3 negative tests to rule out due to low single-test sensitivity",
                  "PCR also detects rifampin resistance",
                  "Treatment: intensive phase isoniazid + rifampin + pyrazinamide + ethambutol for 2 months, then continuation phase isoniazid + rifampin for 4 months",
                  "Extend to 9 months total if early cavitation or sputum still positive after initiation; 1 year for meningeal TB",
                  "Sputum still positive after 4 months of treatment = treatment failure",
                  "Watch for: liver enzyme elevation, isoniazid-induced peripheral neuropathy, ethambutol-induced optic neuritis"
                ]
              }
            },
            {
              "label": "Pleural involvement",
              "next": {
                "leaf": true,
                "diagnosis": "TB pleural effusion",
                "treatment": [
                  "Usually noninfectious/paucibacillary",
                  "Pleural fluid: exudate, lymphocyte-predominant, very low glucose, high ADA"
                ]
              }
            },
            {
              "label": "Non-pulmonary (extrapulmonary) site",
              "next": {
                "leaf": true,
                "diagnosis": "Extrapulmonary TB",
                "treatment": [
                  "Diagnose via biopsy showing granulomas and Ziehl-Neelsen stain",
                  "Treat with the same RIPE/continuation regimen, extending duration for site-specific disease (e.g. 1 year for meningeal TB)"
                ]
              }
            }
          ]
        }
      },
      {
        "label": "No active symptoms — testing for latent infection",
        "next": {
          "q": "Test used?",
          "options": [
            {
              "label": "TST (tuberculin skin test, read at 48-72h)",
              "next": {
                "leaf": true,
                "diagnosis": "Interpret by risk-based threshold",
                "treatment": [
                  "5mm positive: HIV, close contact, immunosuppressed",
                  "10mm positive: healthcare workers",
                  "15mm positive: general population",
                  "False negative: children, early TB, immunosuppression",
                  "False positive: BCG vaccination, non-TB mycobacteria",
                  "Close contact is defined as >15 hours/week or 180 total hours"
                ]
              }
            },
            {
              "label": "IGRA",
              "next": {
                "leaf": true,
                "diagnosis": "More specific than TST",
                "treatment": [
                  "Measures IFN-gamma response to TB-specific antigens — not confounded by prior BCG vaccination",
                  "Screen: healthcare workers, close contacts, before immunosuppression, new HIV diagnosis, silicosis"
                ]
              }
            }
          ]
        }
      },
      {
        "label": "Latent TB confirmed — treatment choice",
        "next": {
          "leaf": true,
          "diagnosis": "Latent TB treatment",
          "treatment": [
            "Isoniazid for 6-9 months, or rifampin for 4 months",
            "Most primary infections become latent; progression years to decades later is more likely with HIV, immunosuppression, malignancy, diabetes, CKD, silicosis, or severe malnutrition"
          ]
        }
      }
    ]
  }
},

{
  "id": "dtree-gastro-gib",
  "chapter": "Gastroenterology",
  "group": "GI Bleeding",
  "name": "GI Bleeding — Source and Stability",
  "root": {
    "q": "Bleeding pattern?",
    "options": [
      {
        "label": "Unstable (shock/orthostatic hypotension, Hb drop >2g/dL, or needing >2 units RBC)",
        "next": {
          "q": "Resuscitate first — vitals + orthostatics, 2 large-bore IVs, CBC/chemistry/liver tests/coagulation/crossmatch, fluids to keep SBP>100 and pulse<100, transfuse if Hb<7 (or <9 with ischemic heart disease). Suspected source?",
          "options": [
            {
              "label": "Suspected ulcer bleed",
              "next": {
                "leaf": true,
                "diagnosis": "Upper GI bleed — suspected ulcer",
                "treatment": [
                  "PPI + EGD within 24 hours"
                ]
              }
            },
            {
              "label": "Suspected variceal bleed",
              "next": {
                "leaf": true,
                "diagnosis": "Upper GI bleed — suspected varices",
                "treatment": [
                  "Band ligation/glue/coils",
                  "Octreotide or terlipressin",
                  "IV antibiotics",
                  "EGD within 6-12 hours for portal hypertensive bleeding"
                ]
              }
            },
            {
              "label": "Unstable lower GI bleeding",
              "next": {
                "leaf": true,
                "diagnosis": "Unstable LGIB",
                "treatment": [
                  "Suspect UGIB too and resuscitate the same way",
                  "CTA or endoscopy ± embolization"
                ],
                "notes": [
                  "Melena is upper GI until proven otherwise; hematochezia can still represent a massive UGIB"
                ]
              }
            }
          ]
        }
      },
      {
        "label": "Stable",
        "next": {
          "leaf": true,
          "diagnosis": "Stable GI bleed",
          "treatment": [
            "Stable LGIB may be managed as an outpatient if low-risk; consider colonoscopy",
            "Work up occult bleeding (iron-deficiency anemia/positive FOBT) or obscure bleeding (overt bleeding, no source on endoscopy) with further imaging/capsule endoscopy as appropriate"
          ]
        }
      }
    ],
    "clues": [
      "Hematemesis/coffee-ground vomiting/melena → upper GI (severe UGIB can still present as hematochezia)",
      "Hematochezia (bright red/maroon stool) → usually lower GI",
      "Iron-deficiency anemia or positive FOBT with no overt bleeding → occult",
      "Overt bleeding with no source found on endoscopy → obscure"
    ]
  }
},
{
  "id": "dtree-gastro-diarrhea",
  "chapter": "Gastroenterology",
  "group": "Chronic Diarrhea, IBS & Celiac",
  "name": "Chronic Diarrhea — Mechanism and Red Flags",
  "root": {
    "q": ">3 stools/day or >200g/day for ≥4 weeks (chronic, not acute/infectious) — any red flags?",
    "options": [
      {
        "label": "Red flags present",
        "next": {
          "leaf": true,
          "diagnosis": "Organic chronic diarrhea — full workup",
          "treatment": [
            "Do not diagnose IBS — proceed to colonoscopy and inflammatory/malignant workup",
            "Classify further by mechanism (see below) alongside structural workup"
          ]
        }
      },
      {
        "label": "No red flags — classify mechanism",
        "next": {
          "q": "Fecal osmotic gap = 290 - 2(Na+K). Result / pattern?",
          "options": [
            {
              "label": "Gap >125, improves with fasting",
              "next": {
                "leaf": true,
                "diagnosis": "Osmotic diarrhea",
                "treatment": [
                  "Consider magnesium ingestion, lactose/other sugar intolerance",
                  "Improves with fasting — a key distinguishing feature from secretory diarrhea"
                ]
              }
            },
            {
              "label": "Continues despite fasting",
              "next": {
                "leaf": true,
                "diagnosis": "Secretory diarrhea",
                "treatment": [
                  "Consider enterotoxins, neuroendocrine tumor/carcinoid, mucosal disease, ischemia"
                ]
              }
            },
            {
              "label": "Elevated fecal calprotectin/leukocytes, blood or systemic signs",
              "next": {
                "leaf": true,
                "diagnosis": "Inflammatory diarrhea",
                "treatment": [
                  "Consider infection or IBD — proceed to the IBD workflow if inflammatory markers or blood are present"
                ]
              }
            }
          ]
        }
      }
    ],
    "clues": [
      "Red flags: melena/hematochezia, weight loss, nocturnal symptoms, age >50 — these push toward colonoscopy/inflammatory/malignant workup, away from IBS"
    ]
  }
},
{
  "id": "dtree-gastro-ibs-celiac",
  "chapter": "Gastroenterology",
  "group": "Chronic Diarrhea, IBS & Celiac",
  "name": "IBS vs Celiac Disease",
  "root": {
    "q": "Which pattern fits?",
    "options": [
      {
        "label": "Chronic abdominal pain >1 day/week for 3 months, associated with defecation or a change in stool frequency/form, red flags absent",
        "next": {
          "q": "Dominant symptom?",
          "options": [
            {
              "label": "Diarrhea-predominant (IBS-D)",
              "next": {
                "leaf": true,
                "diagnosis": "IBS-D",
                "treatment": [
                  "Loperamide, cholestyramine, or rifaximin"
                ]
              }
            },
            {
              "label": "Constipation-predominant (IBS-C)",
              "next": {
                "leaf": true,
                "diagnosis": "IBS-C",
                "treatment": [
                  "Laxatives or linaclotide"
                ]
              }
            },
            {
              "label": "Pain/bloating-predominant (mixed/IBS-A)",
              "next": {
                "leaf": true,
                "diagnosis": "IBS-A / mixed",
                "treatment": [
                  "Peppermint oil, antidepressants, or antispasmodics"
                ]
              }
            }
          ]
        }
      },
      {
        "label": "Iron-deficiency anemia, osteopenia/osteoporosis, arthralgia, chronic fatigue, ataxia, amenorrhea, aphthous ulcers, or chronic diarrhea/malabsorption",
        "next": {
          "leaf": true,
          "diagnosis": "Suspected celiac disease",
          "treatment": [
            "Serology: anti-tTG",
            "Gold standard: endoscopy with villous/brush-border flattening and crypt lymphocytic infiltration"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-gastro-ibd",
  "chapter": "Gastroenterology",
  "group": "Inflammatory Bowel Disease",
  "name": "Ulcerative Colitis vs Crohn Disease",
  "root": {
    "q": "Disease pattern?",
    "options": [
      {
        "label": "Continuous inflammation starting at the rectum/anus with proximal spread, limited to mucosa/submucosa, bloody diarrhea/tenesmus, pANCA",
        "next": {
          "leaf": true,
          "diagnosis": "Ulcerative colitis",
          "treatment": [
            "Assess severity: symptoms, CRP/ESR/platelets, fecal calprotectin (100-300 intermediate inflammation, >300 severe), endoscopy",
            "Mild disease: 5-ASA induction + maintenance",
            "Moderate-severe flare: systemic steroids for INDUCTION ONLY, not maintenance",
            "Maintenance: azathioprine, biologics/small molecules (anti-TNF, vedolizumab, ustekinumab, anti-IL23, JAK inhibitors, S1P modulators)"
          ],
          "notes": [
            "Complications: toxic megacolon, colorectal cancer, PSC",
            "Exam trap: steroid response is not a maintenance plan — you must transition off steroids to a maintenance agent"
          ]
        }
      },
      {
        "label": "Segmental/skip lesions anywhere in the GI tract (terminal ileum common), transmural, rectal sparing possible, RLQ pain/diarrhea/malabsorption/fistulas, cANCA",
        "next": {
          "leaf": true,
          "diagnosis": "Crohn disease",
          "treatment": [
            "Assess severity: symptoms, CRP/ESR/platelets, fecal calprotectin, endoscopy",
            "Moderate-severe flare: systemic steroids for INDUCTION ONLY",
            "Maintenance: azathioprine, methotrexate, biologics/small molecules (anti-TNF, vedolizumab, ustekinumab, anti-IL23, JAK inhibitors, S1P modulators)"
          ],
          "notes": [
            "5-ASA is used for mild UC and is NOT effective in Crohn",
            "Complications: fistulas, strictures, malabsorption, gallstones, renal stones"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-gastro-liver-injury",
  "chapter": "Gastroenterology",
  "group": "Liver Disease",
  "name": "Acute Liver Injury — Pattern and Severity",
  "root": {
    "q": "Liver test pattern?",
    "options": [
      {
        "label": "AST/ALT high (hepatocellular)",
        "next": {
          "q": "Magnitude of AST/ALT elevation?",
          "options": [
            {
              "label": "50-100x",
              "next": {
                "leaf": true,
                "diagnosis": "Toxin- or ischemia-related hepatocellular injury",
                "treatment": [
                  "Identify and remove the toxin/ischemic insult",
                  "Supportive care"
                ]
              }
            },
            {
              "label": "5-50x with bilirubin elevation",
              "next": {
                "leaf": true,
                "diagnosis": "Viral hepatitis pattern",
                "treatment": [
                  "Proceed to viral hepatitis serology workup"
                ]
              }
            },
            {
              "label": "2-5x, usually <400",
              "next": {
                "leaf": true,
                "diagnosis": "Alcohol-related pattern",
                "treatment": [
                  "AST typically exceeds ALT in alcohol-related injury — counsel on cessation"
                ]
              }
            }
          ]
        }
      },
      {
        "label": "ALP/GGT high (cholestatic)",
        "next": {
          "leaf": true,
          "diagnosis": "Cholestatic pattern",
          "treatment": [
            "Consider cancer, TB, granulomatous disease, or other cholestatic disease",
            "Proceed to the cholestatic-disease workflow (obstruction vs PBC vs PSC vs AIH)"
          ]
        }
      },
      {
        "label": "PT/INR/albumin abnormal (synthetic dysfunction)",
        "next": {
          "q": "INR >1.5 with encephalopathy, within 26 weeks of a major liver insult, and no chronic liver disease?",
          "options": [
            {
              "label": "Yes",
              "next": {
                "leaf": true,
                "diagnosis": "Acute liver failure",
                "treatment": [
                  "ICU care at a transplant center",
                  "Supportive care",
                  "Identify the trigger and treat infection/secondary complications",
                  "N-acetylcysteine for acetaminophen",
                  "Penicillin for Amanita phalloides poisoning",
                  "Tenofovir for HBV"
                ]
              }
            },
            {
              "label": "No — synthetic dysfunction without meeting full ALF criteria",
              "next": {
                "leaf": true,
                "diagnosis": "Synthetic dysfunction, not yet acute liver failure",
                "treatment": [
                  "Continue close monitoring for progression to encephalopathy/coagulopathy meeting ALF criteria",
                  "Treat the underlying cause"
                ]
              }
            }
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-gastro-hepatitis",
  "chapter": "Gastroenterology",
  "group": "Viral Hepatitis",
  "name": "Viral Hepatitis — Which Virus, Which Marker",
  "root": {
    "q": "Suspected virus?",
    "options": [
      {
        "label": "HAV or HEV (fecal-oral)",
        "next": {
          "leaf": true,
          "diagnosis": "HAV/HEV",
          "treatment": [
            "HAV: anti-HAV IgM = acute infection, anti-HAV IgG = immunity",
            "HEV: anti-HEV IgM with ALT elevation = acute infection; chronic disease is rare, mainly in immunocompromised/transplant patients"
          ]
        }
      },
      {
        "label": "HCV",
        "next": {
          "leaf": true,
          "diagnosis": "HCV",
          "treatment": [
            "Anti-HCV = exposure, NOT immunity and not necessarily active infection",
            "Active infection requires HCV RNA PCR",
            "Chronic HCV can progress to fibrosis, cirrhosis, portal hypertension, and HCC",
            "Treatment is DAA-based"
          ]
        }
      },
      {
        "label": "HBV",
        "next": {
          "leaf": true,
          "diagnosis": "HBV",
          "treatment": [
            "HBsAg = active disease (chronic if >6 months); anti-HBs = recovery/immunity; HBeAg = active replication; anti-HBc IgM = acute/recent infection (window period); anti-HBc IgG = lifetime evidence of exposure; HBV DNA = viral load",
            "Treatment goal: suppress HBV DNA and normalize ALT, mainly with tenofovir or entecavir",
            "Screen anti-HBc before chemotherapy/immunosuppression — reactivation risk requires prophylaxis"
          ]
        }
      },
      {
        "label": "HDV",
        "next": {
          "leaf": true,
          "diagnosis": "HDV",
          "treatment": [
            "HDV requires HBV/HBsAg to replicate — check HDV specifically in HBsAg-positive patients"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-gastro-cholestasis",
  "chapter": "Gastroenterology",
  "group": "Cholestatic & Autoimmune Liver Disease",
  "name": "Cholestatic Enzymes + Jaundice/Pruritus",
  "root": {
    "q": "Extrahepatic obstruction or intrahepatic cholestasis?",
    "options": [
      {
        "label": "Extrahepatic obstruction (gallstones or malignancy — pancreatic head/distal bile duct)",
        "next": {
          "leaf": true,
          "diagnosis": "Extrahepatic biliary obstruction",
          "treatment": [
            "Gallstone obstruction/cholangitis can present with Charcot triad (RUQ pain + jaundice + fever/chills) — treat with antibiotics + ERCP",
            "An older patient with cholestasis + jaundice + weight loss needs malignancy excluded before assuming an autoimmune cause"
          ]
        }
      },
      {
        "label": "Intrahepatic — cholestatic + antimitochondrial antibody (AMA/M2)",
        "next": {
          "leaf": true,
          "diagnosis": "Primary biliary cholangitis (PBC)",
          "treatment": [
            "Diagnosis requires 2 of 3: prolonged ALP >1.5x ULN for >6 months (after ruling out obstruction/viral/fatty liver), positive AMA (especially M2), biopsy showing granulomatous destruction of intrahepatic bile ducts",
            "Treatment: UDCA",
            "Pruritus: bile-acid therapies, fibrates, or opioid antagonists; refractory pruritus can indicate need for transplant"
          ]
        }
      },
      {
        "label": "Intrahepatic — strictures on MRCP/ERCP, strong UC/IBD association, no specific autoantibody",
        "next": {
          "leaf": true,
          "diagnosis": "Primary sclerosing cholangitis (PSC)",
          "treatment": [
            "Diagnosis relies on MRCP/ERCP, NOT biopsy",
            "Poor response to immunosuppression; transplant is the definitive cure",
            "High cholangiocarcinoma risk — colonoscopy for every PSC patient given the UC association"
          ]
        }
      },
      {
        "label": "Young woman, hepatocellular pattern, arthralgia, high IgG, ANA/ASMA/LKM positive",
        "next": {
          "leaf": true,
          "diagnosis": "Autoimmune hepatitis",
          "treatment": [
            "Diagnosis requires autoantibodies, elevated IgG, biopsy with interface hepatitis/rosettes, and exclusion of viral/other liver disease",
            "Treatment: prednisone ± azathioprine"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-gastro-pancreas",
  "chapter": "Gastroenterology",
  "group": "Pancreatic & Biliary Disease",
  "name": "Pancreatic Disease — Acute, Chronic, or Malignant",
  "root": {
    "q": "Presentation?",
    "options": [
      {
        "label": "Acute severe epigastric pain, elevated pancreatic enzymes, or characteristic CT/MRI findings (2 of 3 needed for diagnosis)",
        "next": {
          "leaf": true,
          "diagnosis": "Acute pancreatitis",
          "treatment": [
            "Etiologies: gallstones, alcohol, hypertriglyceridemia >1000, hypercalcemia, drugs, post-ERCP, trauma, tumors",
            "Aggressive IV fluids in the first 24-48h, opioids for pain, monitor urine/electrolytes/glucose",
            "Enteral feeding in severe disease",
            "Antibiotics ONLY if clear infection — not prophylactic",
            "Debridement/drainage for necrotic complications"
          ]
        }
      },
      {
        "label": "Chronic epigastric pain worse after meals and relieved leaning forward, weight loss, steatorrhea, fat-soluble vitamin deficiency, late diabetes",
        "next": {
          "leaf": true,
          "diagnosis": "Chronic pancreatitis",
          "treatment": [
            "Diagnosis: CT calcifications/atrophy, MRI/MRCP, EUS; fecal elastase low in chronic exocrine failure",
            "Treatment: pancreatic enzymes with meals + PPI, pain control, celiac plexus block or surgery if needed"
          ]
        }
      },
      {
        "label": "Weight loss + abdominal/back pain, painless jaundice, Courvoisier sign, Trousseau thrombophlebitis, new diabetes, or acute pancreatitis as the presenting event",
        "next": {
          "leaf": true,
          "diagnosis": "Pancreatic cancer",
          "treatment": [
            "Gold standard: tri-phase CT for diagnosis/staging",
            "EUS for biopsy or uncertain cases",
            "CA19-9 tracks response but has low specificity for diagnosis"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-gastro-biliary-emergency",
  "chapter": "Gastroenterology",
  "group": "Pancreatic & Biliary Disease",
  "name": "Ascending Cholangitis vs Acute Cholecystitis",
  "root": {
    "q": "Presentation?",
    "options": [
      {
        "label": "Charcot triad (RUQ pain + fever + jaundice), ± hypotension/confusion (Reynolds pentad)",
        "next": {
          "leaf": true,
          "diagnosis": "Ascending cholangitis",
          "treatment": [
            "Reynolds pentad (Charcot triad + hypotension + confusion) needs IMMEDIATE ERCP",
            "US first line; MRCP/EUS diagnostic; ERCP is therapeutic (stone extraction)",
            "Treatment: fluids + antibiotics + ERCP"
          ]
        }
      },
      {
        "label": "RUQ pain + Murphy sign + fever/nausea",
        "next": {
          "leaf": true,
          "diagnosis": "Acute cholecystitis",
          "treatment": [
            "US: gallbladder wall >4mm, pericholecystic fluid, stones",
            "Treatment: early laparoscopic cholecystectomy within 72 hours",
            "Cholecystostomy for high-risk surgical patients"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-heme-anemia",
  "chapter": "Hematology",
  "group": "Red Cell Disorders",
  "name": "Anemia Workup by MCV",
  "root": {
    "q": "MCV?",
    "options": [
      {
        "label": "Microcytic (<80)",
        "next": {
          "q": "Iron studies and RDW?",
          "options": [
            {
              "label": "Very low MCV (<70), high RBC, normal RDW",
              "next": {
                "leaf": true,
                "diagnosis": "Beta-thalassemia",
                "treatment": [
                  "Diagnose with hemoglobin electrophoresis"
                ]
              }
            },
            {
              "label": "Low iron/transferrin saturation/ferritin, high RDW, pencil cells, thrombocytosis",
              "next": {
                "leaf": true,
                "diagnosis": "Iron-deficiency anemia",
                "treatment": [
                  "Causes: chronic bleeding, poor intake, pregnancy, or malabsorption (celiac, atrophic gastritis, H. pylori, IBD, post-bariatric surgery)",
                  "Treat the underlying cause and replace iron"
                ]
              }
            },
            {
              "label": "Inflammatory disease, high hepcidin",
              "next": {
                "leaf": true,
                "diagnosis": "Anemia of chronic disease",
                "treatment": [
                  "Treat the underlying inflammatory/chronic disease"
                ]
              }
            }
          ]
        }
      },
      {
        "label": "Macrocytic (>100)",
        "next": {
          "q": "Which deficiency pattern?",
          "options": [
            {
              "label": "Neuropathy, dementia/psychiatric change, optic atrophy, high MMA + high homocysteine",
              "next": {
                "leaf": true,
                "diagnosis": "B12 deficiency",
                "treatment": [
                  "Replace B12; the neuropsychiatric findings distinguish it from folate deficiency"
                ]
              }
            },
            {
              "label": "Hypersegmented neutrophils, severe macrocytosis, pancytopenia/glossitis, isolated high homocysteine",
              "next": {
                "leaf": true,
                "diagnosis": "Folate deficiency",
                "treatment": [
                  "Replace folate — always exclude B12 deficiency first since replacing folate alone can mask/worsen B12 neuropathy"
                ]
              }
            }
          ]
        }
      },
      {
        "label": "Normocytic with evidence of hemolysis",
        "next": {
          "q": "Coombs test?",
          "options": [
            {
              "label": "Positive — IgG + spherocytes",
              "next": {
                "leaf": true,
                "diagnosis": "Warm autoimmune hemolytic anemia",
                "treatment": [
                  "Coombs-positive; treat the autoimmune process"
                ]
              }
            },
            {
              "label": "Positive — IgM/C3 + intravascular hemolysis",
              "next": {
                "leaf": true,
                "diagnosis": "Cold autoimmune hemolytic anemia",
                "treatment": [
                  "Coombs-positive via complement; avoid cold exposure"
                ]
              }
            },
            {
              "label": "Negative — schistocytes on smear",
              "next": {
                "leaf": true,
                "diagnosis": "Microangiopathic hemolytic anemia (MAHA)",
                "treatment": [
                  "Consider HUS, TTP, or DIC"
                ]
              }
            },
            {
              "label": "Negative — HS/elliptocytosis/G6PD/sickle features",
              "next": {
                "leaf": true,
                "diagnosis": "Congenital hemolytic anemia",
                "treatment": [
                  "Consider hereditary spherocytosis, elliptocytosis, G6PD deficiency, or sickle cell disease"
                ]
              }
            }
          ]
        }
      }
    ],
    "clues": [
      "Anemia: Hb<13 men/<12 women, Hct<40% men/<36% women, low RBC count",
      "Reticulocytes >2% suggest a proliferative anemia"
    ]
  }
},
{
  "id": "dtree-heme-thrombocytopenia",
  "chapter": "Hematology",
  "group": "Platelet Disorders",
  "name": "Thrombocytopenia Workup",
  "root": {
    "q": "Confirm it's real — repeat with a non-EDTA tube or check the smear for pseudo-thrombocytopenia. Confirmed real — production or destruction/consumption problem?",
    "options": [
      {
        "label": "Decreased production",
        "next": {
          "leaf": true,
          "diagnosis": "Production-related thrombocytopenia",
          "treatment": [
            "Consider bone marrow failure/infiltration, drugs, B12/folate/zinc/cobalt deficiency, or CMV/HIV"
          ]
        }
      },
      {
        "label": "Peripheral destruction/consumption — isolated thrombocytopenia, high MPV, normal PT/PTT, no smear pathology, negative Coombs",
        "next": {
          "leaf": true,
          "diagnosis": "ITP",
          "treatment": [
            "Steroids, IVIG, rituximab, or anti-D",
            "Splenectomy or TPO agonists if refractory"
          ]
        }
      },
      {
        "label": "Peripheral destruction/consumption — other pattern (schistocytes, coagulopathy, pregnancy, recent heparin)",
        "next": {
          "leaf": true,
          "diagnosis": "Consider DIC/TTP/HUS/HELLP/APLA/HIT/VITT, or pregnancy-related thrombocytopenia",
          "treatment": [
            "Direct further workup by the specific clue (schistocytes → TTP/HUS/DIC; recent heparin → HIT; pregnancy → HELLP/pregnancy thrombocytopenia)"
          ]
        }
      }
    ],
    "clues": [
      "Severity: 50-150k often asymptomatic; 20-50k mild bleeding/procedure risk; 10-20k spontaneous mucocutaneous bleeding; <10k life-threatening bleeding risk"
    ]
  }
},
{
  "id": "dtree-heme-erythrocytosis",
  "chapter": "Hematology",
  "group": "Red Cell Disorders",
  "name": "Erythrocytosis / Polycythemia",
  "root": {
    "q": "Relative or absolute?",
    "options": [
      {
        "label": "Relative (dehydration, vomiting, diarrhea, burns, fever, DKA, chronic diuretics/Gaisbock)",
        "next": {
          "leaf": true,
          "diagnosis": "Relative erythrocytosis",
          "treatment": [
            "Correct the volume-depletion cause rather than treating as a primary blood disorder"
          ]
        }
      },
      {
        "label": "Absolute — check EPO",
        "next": {
          "q": "EPO level?",
          "options": [
            {
              "label": "Low EPO",
              "next": {
                "leaf": true,
                "diagnosis": "Polycythemia vera",
                "treatment": [
                  "Criteria: high Hb/Hct or RBC mass, hypercellular marrow, JAK2 mutation, low EPO as a minor criterion",
                  "Treatment: phlebotomy to Hct <45% + low-dose aspirin; hydroxyurea or interferon if high-risk"
                ]
              }
            },
            {
              "label": "High, appropriate for hypoxia",
              "next": {
                "leaf": true,
                "diagnosis": "Secondary erythrocytosis — chronic hypoxia",
                "treatment": [
                  "Treat the underlying hypoxic condition"
                ]
              }
            },
            {
              "label": "High, inappropriate for oxygen status",
              "next": {
                "leaf": true,
                "diagnosis": "Secondary erythrocytosis — tumor/renal source",
                "treatment": [
                  "Consider RCC, HCC, renal cysts/hydronephrosis/renal artery stenosis, or meningioma"
                ]
              }
            }
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-heme-thrombocytosis",
  "chapter": "Hematology",
  "group": "Platelet Disorders",
  "name": "Thrombocytosis",
  "root": {
    "q": "Category?",
    "options": [
      {
        "label": "Reactive (anemia, infection, inflammation, trauma, drugs, post-splenectomy, smoking)",
        "next": {
          "leaf": true,
          "diagnosis": "Reactive thrombocytosis",
          "treatment": [
            "Workup: smear, ESR/CRP",
            "Treat the underlying reactive cause"
          ]
        }
      },
      {
        "label": "Spurious (artifacts, cryoglobulins, cell fragments)",
        "next": {
          "leaf": true,
          "diagnosis": "Spurious thrombocytosis",
          "treatment": [
            "Repeat the count and review the smear to confirm before further workup"
          ]
        }
      },
      {
        "label": "Primary/persistent (MPN/CML/congenital)",
        "next": {
          "leaf": true,
          "diagnosis": "Primary thrombocytosis",
          "treatment": [
            "Persistent cases warrant molecular testing and marrow biopsy"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-heme-wbc",
  "chapter": "Hematology",
  "group": "White Cell Disorders",
  "name": "Leukopenia / Leukocytosis",
  "root": {
    "q": "Direction of the abnormality?",
    "options": [
      {
        "label": "Chronic isolated neutropenia (>3 months)",
        "next": {
          "leaf": true,
          "diagnosis": "Chronic neutropenia",
          "treatment": [
            "Causes: constitutional/ethnic neutropenia, cyclic neutropenia, severe congenital neutropenia, autoimmune neutropenia, Felty syndrome/LGL, postinfectious, drug-induced, chronic idiopathic"
          ]
        }
      },
      {
        "label": "Reactive neutrophilia (bacterial infection, stress/epinephrine, smoking, steroids)",
        "next": {
          "leaf": true,
          "diagnosis": "Reactive leukocytosis",
          "treatment": [
            "Treat the underlying reactive trigger"
          ]
        }
      },
      {
        "label": "Malignant-pattern leukocytosis",
        "next": {
          "q": "Which pattern?",
          "options": [
            {
              "label": "Lymphocytosis with smudge/basket cells",
              "next": {
                "leaf": true,
                "diagnosis": "CLL",
                "treatment": [
                  "Diagnose by FACS; proceed to the lymphoid-malignancy workflow"
                ]
              }
            },
            {
              "label": "Blasts with marrow failure",
              "next": {
                "leaf": true,
                "diagnosis": "AML",
                "treatment": [
                  "Proceed to the myeloid-neoplasm workflow"
                ]
              }
            },
            {
              "label": "BCR-ABL positive, anemia, B symptoms",
              "next": {
                "leaf": true,
                "diagnosis": "CML",
                "treatment": [
                  "Proceed to molecular/genetic confirmation and treatment planning"
                ]
              }
            },
            {
              "label": "Leukoerythroblastosis (marrow infiltration pattern)",
              "next": {
                "leaf": true,
                "diagnosis": "Leukoerythroblastic reaction",
                "treatment": [
                  "Suggests marrow infiltration — investigate for marrow-space disease"
                ]
              }
            }
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-heme-lymphadenopathy-splenomegaly",
  "chapter": "Hematology",
  "group": "Lymphadenopathy & Splenomegaly",
  "name": "Lymphadenopathy and Splenomegaly",
  "root": {
    "q": "Which finding?",
    "options": [
      {
        "label": "Lymphadenopathy",
        "next": {
          "q": "Location?",
          "options": [
            {
              "label": "Supraclavicular",
              "next": {
                "leaf": true,
                "diagnosis": "Suggests lung or gastric cancer",
                "treatment": [
                  "FNB preferred in adults for pathology; biopsy usually precedes treatment"
                ]
              }
            },
            {
              "label": "Axillary",
              "next": {
                "leaf": true,
                "diagnosis": "Consider Bartonella, skin infection, breast cancer, or melanoma",
                "treatment": [
                  "FNB preferred in adults for pathology"
                ]
              }
            },
            {
              "label": "Epitrochlear",
              "next": {
                "leaf": true,
                "diagnosis": "Consider lymphoma, mononucleosis, or syphilis",
                "treatment": [
                  "FNB preferred in adults for pathology; FNA more cytologic/metastasis-oriented"
                ]
              }
            }
          ]
        }
      },
      {
        "label": "Splenomegaly",
        "next": {
          "q": "Degree and context?",
          "options": [
            {
              "label": "Mild-moderate",
              "next": {
                "leaf": true,
                "diagnosis": "Splenomegaly — common causes",
                "treatment": [
                  "Consider infection/infective endocarditis/mononucleosis, RBC disease (hereditary spherocytosis, thalassemia), extramedullary hematopoiesis (myelofibrosis/MPN), or cirrhosis/right heart failure/ascites"
                ]
              }
            },
            {
              "label": "Massive",
              "next": {
                "leaf": true,
                "diagnosis": "Massive splenomegaly",
                "treatment": [
                  "Consider myelofibrosis, CML, lymphoma, beta-thalassemia major, Gaucher disease, malaria, or AIDS"
                ],
                "notes": [
                  "Post-splenectomy risks include VTE and OPSI — prevent with vaccines and prophylactic antibiotics"
                ]
              }
            }
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-heme-bleeding",
  "chapter": "Hematology",
  "group": "Bleeding Disorders",
  "name": "Bleeding Disorder Workup",
  "root": {
    "q": "Bleeding phenotype?",
    "options": [
      {
        "label": "Mucocutaneous (epistaxis, gum bleeding, petechiae)",
        "next": {
          "leaf": true,
          "diagnosis": "Suggests platelet/vWF problem",
          "treatment": [
            "Check platelet count/function and vWF studies"
          ]
        }
      },
      {
        "label": "Deep soft tissue/joint bleeding",
        "next": {
          "q": "PT/PTT pattern?",
          "options": [
            {
              "label": "Isolated PT prolonged",
              "next": {
                "leaf": true,
                "diagnosis": "Factor VII deficiency or early warfarin/vitamin K deficiency",
                "treatment": [
                  "Correlate with vitamin K status and anticoagulant use"
                ]
              }
            },
            {
              "label": "Isolated PTT prolonged",
              "next": {
                "q": "Mixing study?",
                "options": [
                  {
                    "label": "Corrects with mixing",
                    "next": {
                      "leaf": true,
                      "diagnosis": "Factor deficiency (hemophilia A/B, vWD)",
                      "treatment": [
                        "Confirm with specific factor assays"
                      ]
                    }
                  },
                  {
                    "label": "Does not correct after incubation",
                    "next": {
                      "leaf": true,
                      "diagnosis": "Inhibitor present (e.g. acquired hemophilia A)",
                      "treatment": [
                        "Acquired hemophilia A is anti-factor VIII and can be autoimmune/malignancy-associated"
                      ]
                    }
                  }
                ]
              }
            },
            {
              "label": "Both PT and PTT prolonged, with bleeding",
              "next": {
                "leaf": true,
                "diagnosis": "Liver disease, vitamin K deficiency, DIC, or a common-pathway factor deficiency",
                "treatment": [
                  "Direct workup by clinical context (liver disease, malnutrition, sepsis/malignancy for DIC)"
                ]
              }
            },
            {
              "label": "Normal PT/PTT, with bleeding",
              "next": {
                "leaf": true,
                "diagnosis": "vWD, thrombocytopenia/platelet dysfunction, factor XIII deficiency, or telangiectasia",
                "treatment": [
                  "vWD is usually mild mucocutaneous bleeding; treat with desmopressin or cryoprecipitate/vWF-containing products"
                ]
              }
            }
          ]
        }
      },
      {
        "label": "Thrombosis AND bleeding together, with schistocytes, low fibrinogen, high D-dimer, in a sepsis/trauma/malignancy/transfusion/toxin context",
        "next": {
          "leaf": true,
          "diagnosis": "DIC",
          "treatment": [
            "Treat the underlying trigger",
            "Support with platelets/plasma/fibrinogen as needed for active bleeding"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-heme-vte",
  "chapter": "Hematology",
  "group": "Thrombosis",
  "name": "Venous Thromboembolism",
  "root": {
    "q": "Suspected DVT — unilateral leg pain/cramping, redness, warmth, edema, superficial vein dilation. Diagnostic approach?",
    "options": [
      {
        "label": "Low pretest probability",
        "next": {
          "leaf": true,
          "diagnosis": "Use D-dimer to rule out",
          "treatment": [
            "A negative D-dimer in a low-risk patient effectively excludes VTE"
          ]
        }
      },
      {
        "label": "Higher pretest probability, or D-dimer positive",
        "next": {
          "q": "Doppler ultrasound (gold standard) result?",
          "options": [
            {
              "label": "Proximal DVT (up to popliteal)",
              "next": {
                "leaf": true,
                "diagnosis": "Proximal DVT — high PE risk",
                "treatment": [
                  "DOAC or LMWH; edoxaban/dabigatran require an LMWH lead-in",
                  "IVC filter only if acute VTE with active bleeding precluding anticoagulation",
                  "Duration: at least 3 months; shorter for a major transient risk factor; longer/indefinite for persistent risk (malignancy, APLA, systemic disease, IBD, prior VTE, thrombophilia)"
                ]
              }
            },
            {
              "label": "Distal DVT (below the knee)",
              "next": {
                "leaf": true,
                "diagnosis": "Distal DVT",
                "treatment": [
                  "Can propagate proximally — anticoagulate (DOAC/LMWH) or monitor closely per risk profile, same duration principles as proximal DVT"
                ]
              }
            }
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-heme-myeloid-neoplasm",
  "chapter": "Hematology",
  "group": "Hematologic Malignancy",
  "name": "Suspected Myeloid Neoplasm — MDS, AML, or APL",
  "root": {
    "q": "Blast percentage and features?",
    "options": [
      {
        "label": "t(15;17), PML-RARA, high DIC risk",
        "next": {
          "leaf": true,
          "diagnosis": "Acute promyelocytic leukemia (APL)",
          "treatment": [
            "Start ATRA even BEFORE genetic confirmation given the DIC risk, plus aggressive blood product support",
            "ATO ± anthracycline depending on risk"
          ]
        }
      },
      {
        "label": "≥20% blasts",
        "next": {
          "q": "Cytogenetic/molecular risk group?",
          "options": [
            {
              "label": "Favorable (NPM1/CEBPA, t(8;21), inv(16))",
              "next": {
                "leaf": true,
                "diagnosis": "AML — favorable risk",
                "treatment": [
                  "Fit patients: daunorubicin + cytarabine induction",
                  "Fragile patients: azacitidine + venetoclax"
                ]
              }
            },
            {
              "label": "Intermediate (FLT3-ITD)",
              "next": {
                "leaf": true,
                "diagnosis": "AML — intermediate risk",
                "treatment": [
                  "Standard induction (fit) or azacitidine + venetoclax (fragile)",
                  "Consider transplant"
                ]
              }
            },
            {
              "label": "Adverse (TP53, chromosome 3 inversion, aneuploidy)",
              "next": {
                "leaf": true,
                "diagnosis": "AML — adverse risk",
                "treatment": [
                  "Consider transplant",
                  "Fragile patients: azacitidine + venetoclax"
                ]
              }
            }
          ]
        }
      },
      {
        "label": "<20% blasts, dysplasia in ≥1 lineage, ineffective hematopoiesis, cytopenia, clonal HSC proliferation",
        "next": {
          "q": "Risk category?",
          "options": [
            {
              "label": "Low risk",
              "next": {
                "leaf": true,
                "diagnosis": "MDS — low risk",
                "treatment": [
                  "Manage anemia/cytopenias with supportive care"
                ]
              }
            },
            {
              "label": "High risk (pancytopenia/blasts)",
              "next": {
                "leaf": true,
                "diagnosis": "MDS — high risk",
                "treatment": [
                  "Hypomethylating agent (HMA) therapy",
                  "Consider allogeneic transplant"
                ]
              }
            }
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-heme-lymphoid-malignancy",
  "chapter": "Hematology",
  "group": "Hematologic Malignancy",
  "name": "Leukemia (Blood/Marrow) vs Lymphoma (Nodes)",
  "root": {
    "q": "Where is the disease predominantly found?",
    "options": [
      {
        "label": "Blood/marrow — lymphocytosis with smudge/basket cells",
        "next": {
          "leaf": true,
          "diagnosis": "CLL",
          "treatment": [
            "Diagnosed by FACS",
            "Treat only if symptomatic: BTK inhibitor, BCL2 inhibitor, or rituximab"
          ],
          "notes": [
            "Richter transformation = CLL transforming to DLBCL, presenting with B symptoms and worse prognosis"
          ]
        }
      },
      {
        "label": "Lymph nodes/lymphatic tissue — biopsy shows diffuse large B-cell lymphoma (DLBCL)",
        "next": {
          "q": "Ann Arbor stage?",
          "options": [
            {
              "label": "I — one region, one side of the diaphragm",
              "next": {
                "leaf": true,
                "diagnosis": "DLBCL Stage I",
                "treatment": [
                  "R-CHOP-21"
                ]
              }
            },
            {
              "label": "II — >2 regions, same side of the diaphragm",
              "next": {
                "leaf": true,
                "diagnosis": "DLBCL Stage II",
                "treatment": [
                  "R-CHOP-21"
                ]
              }
            },
            {
              "label": "III — both sides of the diaphragm",
              "next": {
                "leaf": true,
                "diagnosis": "DLBCL Stage III",
                "treatment": [
                  "R-CHOP-21"
                ]
              }
            },
            {
              "label": "IV — disseminated/bilateral",
              "next": {
                "leaf": true,
                "diagnosis": "DLBCL Stage IV",
                "treatment": [
                  "R-CHOP-21",
                  "Recurrence: CAR-T or intensive chemo + autologous transplant"
                ]
              }
            }
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-heme-myeloma",
  "chapter": "Hematology",
  "group": "Hematologic Malignancy",
  "name": "Suspected Multiple Myeloma",
  "root": {
    "q": "SLiM-CRAB features present?",
    "options": [
      {
        "label": "Yes — any SLiM-CRAB criterion met",
        "next": {
          "leaf": true,
          "diagnosis": "Multiple myeloma",
          "treatment": [
            "SPEP detects the monoclonal gammopathy",
            "Treatment: induction therapy, transplant/maintenance, proteasome inhibitors, immunomodulators, anti-CD38 antibodies"
          ]
        }
      },
      {
        "label": "No — monoclonal protein without SLiM-CRAB criteria",
        "next": {
          "leaf": true,
          "diagnosis": "MGUS or smoldering myeloma (not active myeloma)",
          "treatment": [
            "Monitor without treatment unless SLiM-CRAB criteria develop"
          ]
        }
      }
    ],
    "clues": [
      "CRAB: hyperCalcemia, Renal failure, Anemia, Bone lesions",
      "SLiM: ≥60% marrow plasma cells, light-chain ratio ≥100, >1 MRI focal lesion"
    ]
  }
},
{
  "id": "dtree-heme-transfusion",
  "chapter": "Hematology",
  "group": "Transfusion Medicine",
  "name": "Transfusion Reaction",
  "root": {
    "q": "Timing and clinical pattern?",
    "options": [
      {
        "label": "Immediate — sense of doom, flank pain, hypotension, hemoglobinuria",
        "next": {
          "leaf": true,
          "diagnosis": "Acute hemolytic transfusion reaction (AHTR)",
          "treatment": [
            "Stop the transfusion immediately",
            "Fluids/diuretics",
            "Full hemolysis workup"
          ]
        }
      },
      {
        "label": "2-6h — hypoxemia, bilateral pulmonary edema, hypotension/fever",
        "next": {
          "leaf": true,
          "diagnosis": "TRALI",
          "treatment": [
            "Stop the transfusion",
            "Respiratory support",
            "Avoid diuretics"
          ]
        }
      },
      {
        "label": "Volume overload — hypertension, JVD, dyspnea",
        "next": {
          "leaf": true,
          "diagnosis": "TACO",
          "treatment": [
            "Stop the transfusion",
            "Sit the patient up",
            "Oxygen and diuretics"
          ]
        }
      },
      {
        "label": "Fever/rigors/septic shock",
        "next": {
          "leaf": true,
          "diagnosis": "Bacterial contamination",
          "treatment": [
            "Fluids",
            "Broad-spectrum IV antibiotics",
            "Culture the donor blood unit"
          ]
        }
      },
      {
        "label": "Seconds to minutes — bronchospasm/angioedema/hypotension",
        "next": {
          "leaf": true,
          "diagnosis": "Anaphylactic transfusion reaction",
          "treatment": [
            "Antihistamines plus adrenaline"
          ]
        }
      },
      {
        "label": "5-12 days — fever/rash/diarrhea/pancytopenia",
        "next": {
          "leaf": true,
          "diagnosis": "TA-GVHD",
          "treatment": [
            "Prevented by irradiating blood products — treatment is largely supportive once it occurs"
          ]
        }
      },
      {
        "label": "Hypocalcemia, long QT, spasms during massive transfusion",
        "next": {
          "leaf": true,
          "diagnosis": "Citrate toxicity",
          "treatment": [
            "IV calcium"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-heme-emergencies",
  "chapter": "Hematology",
  "group": "Hematologic Emergencies",
  "name": "Hematologic Oncology Emergency",
  "root": {
    "q": "Which emergency pattern?",
    "options": [
      {
        "label": "Fever ≥38.3 once (or ≥38.0 for 1h) with ANC <500 or expected to fall",
        "next": {
          "leaf": true,
          "diagnosis": "Febrile neutropenia",
          "treatment": [
            "Cultures first",
            "Empiric cefepime, a carbapenem, or piperacillin-tazobactam",
            "Add vancomycin if hemodynamic instability, catheter infection, or MRSA risk",
            "Persistent fever: CT chest/sinus and add antifungal coverage if prolonged"
          ]
        }
      },
      {
        "label": "Uric acid >8, K >6, phosphate >4.5, or corrected Ca <7 (lab TLS), especially with AKI/arrhythmia/seizure",
        "next": {
          "leaf": true,
          "diagnosis": "Tumor lysis syndrome",
          "treatment": [
            "Aggressive hydration",
            "Allopurinol prophylactically",
            "Rasburicase if uric acid is high — CONTRAINDICATED in G6PD deficiency",
            "Treat hyperkalemia/hyperphosphatemia",
            "Usually do not treat asymptomatic hypocalcemia"
          ],
          "notes": [
            "Clinical TLS = lab TLS plus AKI, arrhythmia, or seizure"
          ]
        }
      },
      {
        "label": "WBC >100k (mostly AML/ALL) with dyspnea/hypoxemia, pulmonary infiltrates, CNS symptoms, visual symptoms, or AKI",
        "next": {
          "leaf": true,
          "diagnosis": "Hyperleukocytosis / leukostasis",
          "treatment": [
            "Fluids",
            "Prevent TLS and DIC",
            "Hydroxyurea, cytarabine, or leukapheresis",
            "Transfuse RBC only if Hb <7 or severely symptomatic — raising hematocrit can worsen viscosity/leukostasis"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-allergy-atopic",
  "chapter": "Allergy & Immunology",
  "group": "Atopic Disease",
  "name": "Atopic Disease — Which Presentation",
  "root": {
    "q": "Presentation? (Atopy = a tendency to make IgE after allergen exposure — not automatically clinical allergy; typical atopic march: food allergy/atopic dermatitis in childhood → asthma/allergic rhinitis later)",
    "options": [
      {
        "label": "Episodic itchy eczematous rash in flexural areas (wrists, behind the knees, neck), itch-scratch cycle",
        "next": {
          "leaf": true,
          "diagnosis": "Atopic dermatitis",
          "treatment": [
            "Moisturizers are sufficient in most cases",
            "Topical steroids for flares",
            "Severe/refractory: methotrexate, cyclosporine, phototherapy, or dupilumab"
          ]
        }
      },
      {
        "label": "Symmetric symptoms, clear/white rhinorrhea, allergic salute, allergic conjunctivitis, pale mucosa/enlarged turbinates",
        "next": {
          "leaf": true,
          "diagnosis": "Allergic rhinitis",
          "treatment": [
            "Skin test positive if >3mm response",
            "Allergen avoidance, second-generation antihistamines",
            "Nasal steroids for chronic/severe disease",
            "Immunotherapy for allergic rhinitis, asthma, or bee-venom allergy"
          ]
        }
      },
      {
        "label": "Poorly controlled asthma (≥2 flares/week, nocturnal symptoms, ≥2 reliever uses/week, exercise limitation)",
        "next": {
          "leaf": true,
          "diagnosis": "Uncontrolled asthma",
          "treatment": [
            "Check for reversible causes first: inhaler misuse, chronic allergen exposure/smoking, beta-blockers, stress, pollution, reflux",
            "Preferred reliever from step 1 is ICS-formoterol, not SABA-only, since every reliever use then also delivers anti-inflammatory therapy",
            "Biologics for refractory disease: anti-IL5, anti-IgE, dupilumab, anti-TSLP"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-allergy-anaphylaxis",
  "chapter": "Allergy & Immunology",
  "group": "Anaphylaxis",
  "name": "Anaphylaxis",
  "root": {
    "q": "Acute skin/mucosal involvement plus respiratory compromise or hypotension/syncope — OR, with a known exposure, ≥2 systems involved (respiratory, hypotension, rash, GI)?",
    "options": [
      {
        "label": "Criteria met",
        "next": {
          "q": "Severity — confusion, collapse, unconsciousness, or incontinence present?",
          "options": [
            {
              "label": "Yes — severe",
              "next": {
                "leaf": true,
                "diagnosis": "Severe anaphylaxis",
                "treatment": [
                  "IM epinephrine in the mid-anterolateral thigh — first-line, life-saving, given immediately",
                  "Supine position with legs elevated, oxygen, IV fluids, inhaled beta-agonist",
                  "Antihistamines are second-tier only — never given before epinephrine when anaphylaxis criteria are met"
                ]
              }
            },
            {
              "label": "No — meets criteria but not severe",
              "next": {
                "leaf": true,
                "diagnosis": "Anaphylaxis (non-severe)",
                "treatment": [
                  "Still treat with IM epinephrine as first-line immediately — do not substitute antihistamines",
                  "Supine position, oxygen, fluids, inhaled beta-agonist as needed"
                ]
              }
            }
          ]
        }
      },
      {
        "label": "Isolated urticaria after a food exposure, no other system involved",
        "next": {
          "leaf": true,
          "diagnosis": "Allergic urticaria without anaphylaxis",
          "treatment": [
            "Antihistamines and monitoring — epinephrine is reserved for when anaphylaxis criteria (respiratory/hypotension/multi-system) are met"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-allergy-drug",
  "chapter": "Allergy & Immunology",
  "group": "Drug Allergy",
  "name": "Drug Allergy Workup",
  "root": {
    "q": "Reaction type and drug?",
    "options": [
      {
        "label": "Predictable, dose/mechanism-related reaction (Type A)",
        "next": {
          "leaf": true,
          "diagnosis": "Type A drug reaction",
          "treatment": [
            "Most drug reactions are this type — manage by adjusting dose or discontinuing if the mechanism-related effect is intolerable"
          ]
        }
      },
      {
        "label": "Unpredictable hypersensitivity reaction (Type B) — penicillin history",
        "next": {
          "q": "History detail?",
          "options": [
            {
              "label": "Adverse effect only (e.g. GI upset), not a true allergy",
              "next": {
                "leaf": true,
                "diagnosis": "Not a true penicillin allergy",
                "treatment": [
                  "Continue penicillin unless the reaction was severe"
                ]
              }
            },
            {
              "label": "Delayed mild rash",
              "next": {
                "leaf": true,
                "diagnosis": "Low-risk penicillin allergy history",
                "treatment": [
                  "Graded oral challenge"
                ]
              }
            },
            {
              "label": "Immediate reaction",
              "next": {
                "leaf": true,
                "diagnosis": "Possible IgE-mediated penicillin allergy",
                "treatment": [
                  "Skin testing; if negative, proceed to challenge"
                ]
              }
            },
            {
              "label": "SJS/TEN/DRESS",
              "next": {
                "leaf": true,
                "diagnosis": "Severe delayed reaction (SCAR)",
                "treatment": [
                  "Avoid the drug forever — no desensitization"
                ],
                "notes": [
                  "Penicillin-allergic patients can often still receive cephalosporins and vice versa, depending on the severity of the original reaction"
                ]
              }
            }
          ]
        }
      },
      {
        "label": "Unpredictable hypersensitivity — NSAID",
        "next": {
          "leaf": true,
          "diagnosis": "NSAID hypersensitivity",
          "treatment": [
            "Usually non-IgE, 'anaphylactoid', mediated via a leukotriene shift",
            "Consider challenge testing or a COX-2-selective alternative; weak COX inhibitors may be tolerated"
          ]
        }
      },
      {
        "label": "Unpredictable hypersensitivity — IV contrast",
        "next": {
          "leaf": true,
          "diagnosis": "Contrast reaction",
          "treatment": [
            "Can be chemotoxic or anaphylactoid",
            "Prior reaction: premedicate with prednisone + antihistamines; low-osmolar contrast reduces recurrence risk"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-allergy-mastcell",
  "chapter": "Allergy & Immunology",
  "group": "Mast Cell Disease",
  "name": "Mast Cell Disease / Chronic Urticaria",
  "root": {
    "q": "Presentation?",
    "options": [
      {
        "label": "Episodic systemic symptoms in ≥2 organ systems (hypotension, hives, abdominal cramping, wheezing) with an acute rise in baseline tryptase and response to mast-cell-directed medications",
        "next": {
          "leaf": true,
          "diagnosis": "Mast cell activation syndrome (MCAS)",
          "treatment": [
            "Treat with mast-cell-directed medications (antihistamines, mast cell stabilizers) and avoid triggers"
          ]
        }
      },
      {
        "label": "Dense mast-cell aggregates (>15 cells) on bone marrow biopsy, often KIT D816V",
        "next": {
          "leaf": true,
          "diagnosis": "Systemic mastocytosis",
          "treatment": [
            "Can be indolent or aggressive",
            "Advanced forms: TKIs such as avapritinib or midostaurin"
          ]
        }
      },
      {
        "label": "Daily hives/angioedema for >6 weeks",
        "next": {
          "leaf": true,
          "diagnosis": "Chronic spontaneous urticaria",
          "treatment": [
            "Second-generation antihistamines up to 4x standard dose",
            "Omalizumab",
            "Cyclosporine for refractory disease"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-allergy-eosinophilia",
  "chapter": "Allergy & Immunology",
  "group": "Eosinophilia & Immunodeficiency",
  "name": "Hypereosinophilia",
  "root": {
    "q": "Secondary/reactive cause identified (allergy, drugs, parasites)?",
    "options": [
      {
        "label": "Yes",
        "next": {
          "leaf": true,
          "diagnosis": "Secondary/reactive eosinophilia",
          "treatment": [
            "Treat the underlying allergy, discontinue the causative drug, or treat the parasitic infection"
          ],
          "notes": [
            "Always rule out Strongyloides before giving systemic steroids — steroids can cause fatal disseminated strongyloidiasis"
          ]
        }
      },
      {
        "label": "No — no secondary cause found",
        "next": {
          "leaf": true,
          "diagnosis": "Consider primary/neoplastic hypereosinophilic syndrome (HES)",
          "treatment": [
            "Still rule out Strongyloides before starting steroids, given the risk of fatal dissemination if missed"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-allergy-immunodeficiency",
  "chapter": "Allergy & Immunology",
  "group": "Eosinophilia & Immunodeficiency",
  "name": "Suspected Inborn Error of Immunity",
  "root": {
    "q": "Which clue is present — recurrent pneumonias (>2/year), deep abscesses, failure to thrive, persistent thrush, family history, need for IV antibiotics, or severe/early autoimmune disease?",
    "options": [
      {
        "label": "Suspected B-cell defect",
        "next": {
          "leaf": true,
          "diagnosis": "Antibody deficiency workup",
          "treatment": [
            "Check IgG/IgA/IgM and vaccine responses"
          ]
        }
      },
      {
        "label": "Suspected T-cell defect",
        "next": {
          "leaf": true,
          "diagnosis": "T-cell deficiency workup",
          "treatment": [
            "Check CD3/CD4/CD8 counts and mitogen proliferation assays"
          ]
        }
      },
      {
        "label": "Suspected phagocyte defect",
        "next": {
          "leaf": true,
          "diagnosis": "Phagocyte deficiency workup",
          "treatment": [
            "DHR (dihydrorhodamine) test"
          ]
        }
      },
      {
        "label": "Suspected complement defect",
        "next": {
          "leaf": true,
          "diagnosis": "Complement deficiency workup",
          "treatment": [
            "CH50/AH50"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-endo-pituitary-axis",
  "chapter": "Endocrinology",
  "group": "Pituitary & Hypothalamic Axes",
  "name": "Primary vs Secondary Gland Failure",
  "root": {
    "q": "Which axis, and pattern?",
    "options": [
      {
        "label": "Thyroid axis — low T3/T4 + high TSH",
        "next": {
          "leaf": true,
          "diagnosis": "Primary hypothyroidism",
          "treatment": [
            "Proceed to the thyroid workflow"
          ]
        }
      },
      {
        "label": "Thyroid axis — low T3/T4 + low/inappropriately normal TSH",
        "next": {
          "leaf": true,
          "diagnosis": "Secondary (central) hypothyroidism",
          "treatment": [
            "Evaluate the pituitary/hypothalamus as the source"
          ]
        }
      },
      {
        "label": "Adrenal axis — low cortisol + high ACTH + hyperpigmentation",
        "next": {
          "leaf": true,
          "diagnosis": "Primary adrenal insufficiency",
          "treatment": [
            "Proceed to the adrenal insufficiency workflow"
          ]
        }
      },
      {
        "label": "Adrenal axis — low cortisol + low ACTH",
        "next": {
          "leaf": true,
          "diagnosis": "Secondary adrenal insufficiency",
          "treatment": [
            "Evaluate for pituitary disease or exogenous steroid suppression"
          ]
        }
      },
      {
        "label": "Gonadal axis — delayed puberty, amenorrhea, infertility, osteoporosis",
        "next": {
          "leaf": true,
          "diagnosis": "Gonadal axis dysfunction (central or primary)",
          "treatment": [
            "Localize with LH/FSH pattern and correlate with the clinical context"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-endo-di-polydipsia",
  "chapter": "Endocrinology",
  "group": "Pituitary & Hypothalamic Axes",
  "name": "Diabetes Insipidus vs Primary Polydipsia",
  "root": {
    "q": "Water deprivation test, then desmopressin — response pattern?",
    "options": [
      {
        "label": "Urine osmolality stays low/stable on deprivation, responds to desmopressin",
        "next": {
          "leaf": true,
          "diagnosis": "Central DI",
          "treatment": [
            "Desmopressin replacement"
          ]
        }
      },
      {
        "label": "Urine osmolality stays low on deprivation, no response to desmopressin",
        "next": {
          "leaf": true,
          "diagnosis": "Nephrogenic DI",
          "treatment": [
            "Treat the underlying renal cause; desmopressin will not work"
          ]
        }
      },
      {
        "label": "Urine osmolality rises on deprivation, no desmopressin response needed",
        "next": {
          "leaf": true,
          "diagnosis": "Primary polydipsia",
          "treatment": [
            "Address the excess fluid intake/behavioral driver"
          ]
        }
      },
      {
        "label": "Partial rise on deprivation, further rise with desmopressin",
        "next": {
          "leaf": true,
          "diagnosis": "Partial DI",
          "treatment": [
            "Desmopressin trial with close monitoring"
          ]
        }
      }
    ],
    "clues": [
      "Also rule out adrenal insufficiency and hypothyroidism before attributing polyuria/polydipsia to SIADH"
    ]
  }
},
{
  "id": "dtree-endo-pituitary-tumor",
  "chapter": "Endocrinology",
  "group": "Pituitary Tumors",
  "name": "Pituitary Tumor — Which Hormone Excess",
  "root": {
    "q": "Presenting hormone pattern?",
    "options": [
      {
        "label": "High prolactin, young woman with oligo/amenorrhea and sexual dysfunction (macroprolactinoma more common in men)",
        "next": {
          "leaf": true,
          "diagnosis": "Prolactinoma",
          "treatment": [
            "Exclude other causes of hyperprolactinemia first: pregnancy, stress, antipsychotics/antidepressants/antiemetics, cocaine/opiates, stalk effect/malignancy",
            "Treatment: dopamine agonist (bromocriptine or cabergoline)"
          ]
        }
      },
      {
        "label": "Soft tissue enlargement, hypertension/CVD, OSA, colon polyps, thyroid cysts",
        "next": {
          "leaf": true,
          "diagnosis": "Acromegaly",
          "treatment": [
            "Diagnosis: IGF-1 and failure of GH suppression after glucose",
            "Treatment: transsphenoidal surgery; somatostatin analogs are first-line medical therapy"
          ]
        }
      },
      {
        "label": "Moon face, weight gain, proximal muscle weakness, new/worsening diabetes, hypertension",
        "next": {
          "leaf": true,
          "diagnosis": "Cushing disease/syndrome",
          "treatment": [
            "Workup: establish hypercortisolism (dexamethasone testing), determine ACTH dependence, imaging",
            "IPSS is the gold standard for confirming a central ACTH gradient",
            "Treatment: surgery; radiation/adrenalectomy/drugs in severe cases"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-endo-adrenal-insufficiency",
  "chapter": "Endocrinology",
  "group": "Adrenal Disease",
  "name": "Adrenal Insufficiency — Primary vs Secondary",
  "root": {
    "q": "ACTH level and hyperpigmentation?",
    "options": [
      {
        "label": "High ACTH + hyperpigmentation + salt craving/aldosterone deficiency",
        "next": {
          "leaf": true,
          "diagnosis": "Primary adrenal insufficiency (Addison disease)",
          "treatment": [
            "Etiologies: autoimmune, TB/HIV, malignancy, ketoconazole",
            "Diagnosis: ACTH stimulation test (morning cortisol alone is nonspecific); normal stimulated cortisol >18-20mcg/dL",
            "Treatment: hydrocortisone first line, prednisone second line, fludrocortisone if mineralocorticoid deficiency; increase dose during physiologic stress"
          ]
        }
      },
      {
        "label": "Low ACTH, no hyperpigmentation",
        "next": {
          "leaf": true,
          "diagnosis": "Secondary adrenal insufficiency",
          "treatment": [
            "Etiologies: pituitary/hypothalamic disease, chronic exogenous steroid suppression",
            "Same diagnostic (ACTH stimulation test) and treatment (hydrocortisone/prednisone) approach, but mineralocorticoid deficiency is usually absent"
          ]
        }
      }
    ],
    "clues": [
      "Symptoms: weakness/fatigue, anorexia, weight loss, abdominal symptoms, hyponatremia"
    ]
  }
},
{
  "id": "dtree-endo-adrenal-incidentaloma",
  "chapter": "Endocrinology",
  "group": "Adrenal Disease",
  "name": "Adrenal Incidentaloma",
  "root": {
    "q": "Every adrenal nodule >10mm needs assessment, even if asymptomatic. Imaging/functional pattern?",
    "options": [
      {
        "label": "Homogeneous, low density pre-contrast, fast washout",
        "next": {
          "leaf": true,
          "diagnosis": "Benign adenoma",
          "treatment": [
            "Still assess cortisol secretion, catecholamines, and aldosterone (if hypertensive/hypokalemic) even for an imaging-benign nodule"
          ]
        }
      },
      {
        "label": ">4cm, heterogeneous, necrosis/calcification, irregular borders, high density",
        "next": {
          "leaf": true,
          "diagnosis": "Suspected adrenocortical carcinoma (ACC)",
          "treatment": [
            "Full functional workup plus surgical planning given malignancy risk"
          ]
        }
      },
      {
        "label": "Episodic hypertension, headaches, palpitations, sweating/anxiety",
        "next": {
          "leaf": true,
          "diagnosis": "Pheochromocytoma",
          "treatment": [
            "Test: 24h urine catecholamines + metanephrines",
            "Treatment: surgery, hydration, and alpha blockade BEFORE beta blockade"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-endo-thyroid-function",
  "chapter": "Endocrinology",
  "group": "Thyroid Disease",
  "name": "Thyroid Function — TSH First",
  "root": {
    "q": "TSH?",
    "options": [
      {
        "label": "Low",
        "next": {
          "q": "Thyroid uptake scan pattern?",
          "options": [
            {
              "label": "No uptake",
              "next": {
                "leaf": true,
                "diagnosis": "Thyroiditis",
                "treatment": [
                  "NSAIDs or steroids",
                  "Beta-blocker for symptom control"
                ]
              }
            },
            {
              "label": "Diffuse high uptake",
              "next": {
                "leaf": true,
                "diagnosis": "Graves disease",
                "treatment": [
                  "Confirm with anti-TSHR antibody",
                  "Beta-blocker for symptoms; methimazole, PTU, RAI, or surgery depending on the case"
                ]
              }
            },
            {
              "label": "One hot nodule, rest suppressed",
              "next": {
                "leaf": true,
                "diagnosis": "Toxic adenoma",
                "treatment": [
                  "Beta-blocker for symptoms; methimazole, RAI, or surgery"
                ]
              }
            },
            {
              "label": "On amiodarone, rapid resolution within 2-3 weeks",
              "next": {
                "leaf": true,
                "diagnosis": "Amiodarone-induced thyrotoxicosis, type II (destructive thyroiditis)",
                "treatment": [
                  "Steroids"
                ]
              }
            },
            {
              "label": "On amiodarone, overproduction in an abnormal gland",
              "next": {
                "leaf": true,
                "diagnosis": "Amiodarone-induced thyrotoxicosis, type I",
                "treatment": [
                  "Methimazole"
                ]
              }
            }
          ]
        }
      },
      {
        "label": "High",
        "next": {
          "leaf": true,
          "diagnosis": "Primary hypothyroidism",
          "treatment": [
            "Causes: Hashimoto thyroiditis, post-RAI/thyroidectomy, drugs, transient post-thyroiditis/Wolff-Chaikoff effect",
            "Treatment: levothyroxine with monitoring"
          ]
        }
      },
      {
        "label": "Low TSH + low T3/T4 in the setting of acute illness",
        "next": {
          "leaf": true,
          "diagnosis": "Euthyroid sick syndrome",
          "treatment": [
            "Reflects acute illness rather than true thyroid disease — recheck after the acute illness resolves rather than treating as hyperthyroidism"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-endo-thyroid-nodule",
  "chapter": "Endocrinology",
  "group": "Thyroid Disease",
  "name": "Thyroid Nodule",
  "root": {
    "q": "TSH result?",
    "options": [
      {
        "label": "Low",
        "next": {
          "leaf": true,
          "diagnosis": "Get a thyroid scan first",
          "treatment": [
            "A low TSH raises the possibility of an autonomously functioning ('hot') nodule — characterize with a scan before biopsy"
          ]
        }
      },
      {
        "label": "Normal/high — proceed to ultrasound",
        "next": {
          "q": "Ultrasound risk features (hypoechoic, calcifications, irregular borders)?",
          "options": [
            {
              "label": "Present",
              "next": {
                "leaf": true,
                "diagnosis": "Suspicious nodule",
                "treatment": [
                  "FNA/cytology"
                ],
                "notes": [
                  "Papillary carcinoma is the most common thyroid cancer; medullary carcinoma produces calcitonin and is associated with MEN2"
                ]
              }
            },
            {
              "label": "Absent",
              "next": {
                "leaf": true,
                "diagnosis": "Low-risk nodule",
                "treatment": [
                  "Routine surveillance per nodule-size guidelines rather than immediate FNA"
                ]
              }
            }
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-endo-net-hypoglycemia",
  "chapter": "Endocrinology",
  "group": "Neuroendocrine Tumors & Hypoglycemia",
  "name": "Neuroendocrine Tumor Syndrome or Hypoglycemia",
  "root": {
    "q": "Presentation?",
    "options": [
      {
        "label": "Flushing, diarrhea, abdominal pain, right-sided heart disease",
        "next": {
          "leaf": true,
          "diagnosis": "Carcinoid syndrome",
          "treatment": [
            "5-HIAA",
            "Ga-DOTATATE PET-CT is the gold-standard imaging test",
            "Surgery when possible; metastatic disease: somatostatin analogs, everolimus/sunitinib, PRRT, hepatic-directed therapy"
          ]
        }
      },
      {
        "label": "Hypoglycemia",
        "next": {
          "leaf": true,
          "diagnosis": "Insulinoma",
          "treatment": [
            "Confirm with Whipple triad: low glucose + adrenergic/neuroglycopenic symptoms + resolution with glucose correction"
          ]
        }
      },
      {
        "label": "Ulcers + diarrhea",
        "next": {
          "leaf": true,
          "diagnosis": "Gastrinoma",
          "treatment": [
            "Chromogranin A, imaging (CT/MRI/EUS), Ga-DOTATATE PET-CT"
          ]
        }
      },
      {
        "label": "Diabetes + diarrhea + rash",
        "next": {
          "leaf": true,
          "diagnosis": "Glucagonoma",
          "treatment": [
            "Chromogranin A, imaging, Ga-DOTATATE PET-CT"
          ]
        }
      },
      {
        "label": "Watery diarrhea/fluid loss",
        "next": {
          "leaf": true,
          "diagnosis": "VIPoma",
          "treatment": [
            "Chromogranin A, imaging, Ga-DOTATATE PET-CT"
          ]
        }
      },
      {
        "label": "Hypoglycemia — need to determine insulin source",
        "next": {
          "q": "Insulin and C-peptide levels?",
          "options": [
            {
              "label": "High insulin + high C-peptide",
              "next": {
                "leaf": true,
                "diagnosis": "Endogenous hyperinsulinism",
                "treatment": [
                  "Consider insulinoma or sulfonylurea use"
                ]
              }
            },
            {
              "label": "High insulin + low C-peptide",
              "next": {
                "leaf": true,
                "diagnosis": "Exogenous insulin administration",
                "treatment": [
                  "Investigate for surreptitious or accidental insulin use"
                ]
              }
            }
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-endo-calcium",
  "chapter": "Endocrinology",
  "group": "Calcium Disorders",
  "name": "Hypercalcemia Workup",
  "root": {
    "q": "PTH level?",
    "options": [
      {
        "label": "High or inappropriately normal",
        "next": {
          "leaf": true,
          "diagnosis": "PTH-dependent hypercalcemia",
          "treatment": [
            "Consider primary hyperparathyroidism or FHH/lithium-induced",
            "Complications: osteoporosis/osteopenia, renal colic",
            "Young/symptomatic patients: surgery after localization",
            "Non-surgical options: bisphosphonates, denosumab, or cinacalcet"
          ]
        }
      },
      {
        "label": "Low",
        "next": {
          "leaf": true,
          "diagnosis": "PTH-independent hypercalcemia",
          "treatment": [
            "Consider malignancy, vitamin D excess, granulomatous disease, hyperthyroidism, thiazides, or neuroendocrine tumors",
            "Workup includes vitamin D and a urine calcium/creatinine collection",
            "Treatment: hydration, loop diuretics, anti-osteoclast therapy, calcitonin, steroids for granulomatous disease, dialysis if severe"
          ]
        }
      }
    ],
    "clues": [
      "Severe hypercalcemia: >14",
      "Symptoms: polyuria/polydipsia, renal colic, GI symptoms, weakness, attention deficits, hypertension"
    ]
  }
},
{
  "id": "dtree-endo-t2dm-diagnosis",
  "chapter": "Endocrinology",
  "group": "Diabetes Mellitus",
  "name": "Type 2 Diabetes — Screening, Diagnosis, and Acute Hyperglycemic Emergencies",
  "root": {
    "q": "Screening high-risk group (age ≥35, gestational diabetes history, HIV, prediabetes, overweight) or acute presentation?",
    "options": [
      {
        "label": "Screening — diagnostic testing",
        "next": {
          "leaf": true,
          "diagnosis": "T2DM diagnosis",
          "treatment": [
            "Fasting glucose, 2h OGTT, or HbA1c",
            "Diagnosis requires two abnormal tests, OR one glucose >200 with hyperglycemic symptoms"
          ]
        }
      },
      {
        "label": "Acute — hyperglycemia + acidosis + ketones (more common in T1D)",
        "next": {
          "leaf": true,
          "diagnosis": "DKA",
          "treatment": [
            "Fluids, potassium management, insulin",
            "Maintain glucose around 250 during acute correction to avoid rapid osmotic shifts",
            "Correct sodium for the glucose level"
          ]
        }
      },
      {
        "label": "Acute — very high glucose/osmolarity/sodium, no ketoacidosis (more common in T2D)",
        "next": {
          "leaf": true,
          "diagnosis": "HHS",
          "treatment": [
            "Fluids, potassium management, insulin",
            "Same correction principles as DKA (avoid overly rapid glucose/sodium correction)"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-endo-t2dm-complications",
  "chapter": "Endocrinology",
  "group": "Diabetes Mellitus",
  "name": "Type 2 Diabetes — Chronic Complications and Targets",
  "root": {
    "q": "Complication category, or inpatient setting?",
    "options": [
      {
        "label": "Macrovascular",
        "next": {
          "leaf": true,
          "diagnosis": "Macrovascular complications",
          "treatment": [
            "Screen for/manage ischemic heart disease, TIA/CVA, and peripheral artery disease/amputation risk"
          ]
        }
      },
      {
        "label": "Microvascular",
        "next": {
          "leaf": true,
          "diagnosis": "Microvascular complications",
          "treatment": [
            "Screen for retinopathy, neuropathy, autonomic neuropathy, and nephropathy/albuminuria/CKD",
            "Treatment targets: HbA1c <7 if achievable, fasting glucose 80-130, plus diet/exercise",
            "ACEi/ARB, SGLT2 inhibitor, and GLP-1 agonist for nephropathy/cardiovascular-risk reduction"
          ]
        }
      },
      {
        "label": "Inpatient hyperglycemia",
        "next": {
          "leaf": true,
          "diagnosis": "Inpatient glucose management",
          "treatment": [
            "Stress hyperglycemia >140 correlates with complications",
            "Target 140-180 in most inpatients",
            "Basal-bolus insulin is preferred over sliding-scale-only regimens"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-endo-obesity",
  "chapter": "Endocrinology",
  "group": "Obesity",
  "name": "Obesity Treatment",
  "root": {
    "q": "BMI category?",
    "options": [
      {
        "label": "BMI >27 with comorbidities, or >30",
        "next": {
          "leaf": true,
          "diagnosis": "Candidate for pharmacotherapy",
          "treatment": [
            "Goal: 5-10% weight loss via diet, aerobic activity, and medication",
            "Options: orlistat, or GLP-1 agonists (liraglutide, semaglutide)"
          ]
        }
      },
      {
        "label": "BMI >35 with comorbidities, or >40",
        "next": {
          "leaf": true,
          "diagnosis": "Candidate for bariatric surgery",
          "treatment": [
            "Combine with the same lifestyle foundation (diet, aerobic activity); medication can still be used adjunctively"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-onco-lung-cancer",
  "chapter": "Oncology",
  "group": "Lung Cancer",
  "name": "Lung Cancer — NSCLC vs SCLC",
  "root": {
    "q": "Clinical/pathologic pattern?",
    "options": [
      {
        "label": "Central/main-bronchus location, smoker, hemoptysis/airway obstruction",
        "next": {
          "leaf": true,
          "diagnosis": "Squamous cell carcinoma (NSCLC)",
          "treatment": [
            "CT for diagnosis, biopsy of the suspected site, genetic profiling, PET-CT for staging, brain MRI if metastatic disease is suspected",
            "Treatment: target driver mutation if present, or immunotherapy (e.g. pembrolizumab/nivolumab)"
          ]
        }
      },
      {
        "label": "Peripheral/parenchymal location, weaker smoking link, KRAS/EGFR",
        "next": {
          "leaf": true,
          "diagnosis": "Adenocarcinoma (NSCLC)",
          "treatment": [
            "Same workup: CT, biopsy, genetic profiling (KRAS/EGFR and others), PET-CT staging, brain MRI if metastatic",
            "Treatment: targeted therapy against the driver mutation if present, otherwise immunotherapy"
          ]
        }
      },
      {
        "label": "Aggressive course, strongly smoking-linked, ~15% of lung cancers",
        "next": {
          "leaf": true,
          "diagnosis": "Small cell lung cancer (SCLC)",
          "treatment": [
            "Same imaging/staging workup",
            "Treatment: chemotherapy + immunotherapy given the aggressive, typically disseminated presentation"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-onco-cord-compression",
  "chapter": "Oncology",
  "group": "Oncologic Emergencies",
  "name": "Malignant Spinal Cord Compression",
  "root": {
    "q": "Severe new back pain + motor/sensory deficits or incontinence, in a patient with breast, lung, prostate, lymphoma, or myeloma cancer?",
    "options": [
      {
        "label": "Yes",
        "next": {
          "leaf": true,
          "diagnosis": "Malignant spinal cord compression",
          "treatment": [
            "MRI if high suspicion (CT if MRI unavailable)",
            "High-dose dexamethasone 16-40mg",
            "Opioids for pain",
            "Surgery if spinal instability, a focal resectable lesion, neurologic symptoms, and prognosis >3-4 months",
            "Radiotherapy if nonresectable or as an adjuvant to surgery"
          ],
          "notes": [
            "This is a time-critical oncologic emergency — delay risks permanent paralysis"
          ]
        }
      },
      {
        "label": "No — back pain without cord-compression features",
        "next": {
          "leaf": true,
          "diagnosis": "Cord compression unlikely",
          "treatment": [
            "Continue standard back-pain workup, but re-examine urgently if any new motor/sensory deficit or incontinence develops"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-onco-breast-cancer",
  "chapter": "Oncology",
  "group": "Breast Cancer",
  "name": "Breast Cancer Workup and Treatment",
  "root": {
    "q": "Workup stage: imaging (mammography screening, ultrasound for suspicious findings, MRI for neoadjuvant planning) → core needle biopsy → ER/PR/HER2 classification. Subtype?",
    "options": [
      {
        "label": "HR+, localized",
        "next": {
          "leaf": true,
          "diagnosis": "HR+ localized breast cancer",
          "treatment": [
            "Surgery + adjuvant SERM"
          ]
        }
      },
      {
        "label": "HER2+",
        "next": {
          "leaf": true,
          "diagnosis": "HER2+ breast cancer",
          "treatment": [
            "Trastuzumab + chemotherapy"
          ]
        }
      },
      {
        "label": "Triple-negative (TNBC)",
        "next": {
          "leaf": true,
          "diagnosis": "TNBC",
          "treatment": [
            "Chemotherapy + immunotherapy",
            "PARP inhibitor if BRCA-mutated"
          ]
        }
      },
      {
        "label": "HR+, metastatic",
        "next": {
          "leaf": true,
          "diagnosis": "HR+ metastatic breast cancer",
          "treatment": [
            "Endocrine therapy + CDK4/6, AKT, or PI3K inhibitor",
            "Chemotherapy after endocrine resistance develops"
          ]
        }
      },
      {
        "label": "HER2+, metastatic",
        "next": {
          "leaf": true,
          "diagnosis": "HER2+ metastatic breast cancer",
          "treatment": [
            "Trastuzumab + pertuzumab",
            "Antibody-drug conjugates"
          ]
        }
      },
      {
        "label": "Triple-negative, metastatic",
        "next": {
          "leaf": true,
          "diagnosis": "TNBC metastatic",
          "treatment": [
            "Chemotherapy ± immunotherapy if PD-L1 positive"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-onco-melanoma",
  "chapter": "Oncology",
  "group": "Melanoma",
  "name": "Melanoma — Diagnosis and Staging by Depth",
  "root": {
    "q": "ABCDE features (asymmetry, border irregularity, color variation, diameter >6mm, evolution) present — depth on biopsy?",
    "options": [
      {
        "label": "<0.8mm, no ulceration",
        "next": {
          "leaf": true,
          "diagnosis": "Thin melanoma, low risk",
          "treatment": [
            "Local excision with 1-2cm margins"
          ]
        }
      },
      {
        "label": "≥0.8mm",
        "next": {
          "leaf": true,
          "diagnosis": "Melanoma requiring nodal assessment",
          "treatment": [
            "Assess lymph nodes; biopsy + sentinel lymph node biopsy (SLNB)"
          ]
        }
      },
      {
        "label": "Metastatic disease",
        "next": {
          "leaf": true,
          "diagnosis": "Metastatic melanoma",
          "treatment": [
            "Immunotherapy",
            "BRAF/MEK inhibitors if the tumor carries an appropriate mutation"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-onco-gyn-cancer",
  "chapter": "Oncology",
  "group": "Gynecologic Cancer",
  "name": "Gynecologic Cancer — Symptom Anchors",
  "root": {
    "q": "Presenting symptom?",
    "options": [
      {
        "label": "Bloating, early satiety, abdominal swelling",
        "next": {
          "leaf": true,
          "diagnosis": "Ovarian cancer",
          "treatment": [
            "Often presents late, typically age 60-70",
            "CA-125 tracks tumor burden/response",
            "BRCA-mutated tumors respond to PARP inhibitors"
          ]
        }
      },
      {
        "label": "Postmenopausal bleeding or heavy bleeding",
        "next": {
          "leaf": true,
          "diagnosis": "Endometrial cancer",
          "treatment": [
            "Risk factors: estrogen exposure, obesity, inactivity, Lynch syndrome"
          ]
        }
      },
      {
        "label": "Postcoital bleeding/discharge",
        "next": {
          "leaf": true,
          "diagnosis": "Cervical cancer",
          "treatment": [
            "Correlate with HPV/screening history"
          ]
        }
      },
      {
        "label": "Itching, burning, discharge",
        "next": {
          "leaf": true,
          "diagnosis": "Vaginal cancer",
          "treatment": [
            "Less common — evaluate with biopsy of the suspicious lesion"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-onco-urologic-cancer",
  "chapter": "Oncology",
  "group": "Urologic Cancer",
  "name": "Urologic Cancer — Key Clues and Workflow",
  "root": {
    "q": "Presentation?",
    "options": [
      {
        "label": "Elevated PSA or abnormal DRE",
        "next": {
          "leaf": true,
          "diagnosis": "Suspected prostate cancer",
          "treatment": [
            "PSA + DRE/MRI/biopsy, Gleason score for risk stratification",
            "Low-risk Gleason 6 can be managed with active surveillance"
          ]
        }
      },
      {
        "label": "Painless/palpable testicular lump, age 20-40",
        "next": {
          "leaf": true,
          "diagnosis": "Suspected testicular cancer",
          "treatment": [
            "Ultrasound, then radical orchiectomy — NOT biopsy (biopsy risks tumor seeding)"
          ]
        }
      },
      {
        "label": "Hematuria, older male smoker",
        "next": {
          "leaf": true,
          "diagnosis": "Suspected bladder cancer",
          "treatment": [
            "Cystoscopy and imaging workup for a smoker with hematuria"
          ]
        }
      },
      {
        "label": "Renal mass, clear-cell histology most common",
        "next": {
          "leaf": true,
          "diagnosis": "Renal cell carcinoma",
          "treatment": [
            "Localized/resectable disease: surgery",
            "Metastatic disease: biologics/immunotherapy — NOT conventional chemotherapy"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-onco-pancreatic-treatment",
  "chapter": "Oncology",
  "group": "Pancreatic Cancer Treatment",
  "name": "Pancreatic Cancer — Treatment by Performance Status",
  "root": {
    "q": "ECOG performance status?",
    "options": [
      {
        "label": "ECOG 0-1",
        "next": {
          "leaf": true,
          "diagnosis": "Good performance status",
          "treatment": [
            "Intensive multi-agent chemotherapy: FOLFIRINOX or NALIRIFOX"
          ]
        }
      },
      {
        "label": "ECOG 2",
        "next": {
          "leaf": true,
          "diagnosis": "Intermediate performance status",
          "treatment": [
            "Gentler regimen: gemcitabine + nab-paclitaxel"
          ]
        }
      },
      {
        "label": "ECOG >3",
        "next": {
          "leaf": true,
          "diagnosis": "Poor performance status",
          "treatment": [
            "Supportive/palliative care only — intensive chemotherapy is not appropriate"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-onco-radiation",
  "chapter": "Oncology",
  "group": "Radiation Oncology",
  "name": "Radiation Therapy Principles",
  "root": {
    "q": "Planning consideration?",
    "options": [
      {
        "label": "Mechanism of cell kill",
        "next": {
          "leaf": true,
          "diagnosis": "DNA double-strand breaks",
          "treatment": [
            "Radiation damages tumor cells mainly via double-strand DNA breaks"
          ]
        }
      },
      {
        "label": "Why fractionate?",
        "next": {
          "leaf": true,
          "diagnosis": "The 4 R's of fractionation",
          "treatment": [
            "Repair, repopulation, redistribution, reoxygenation — fractionation exploits differences between tumor and normal tissue in each of these"
          ]
        }
      },
      {
        "label": "Target volume definition",
        "next": {
          "leaf": true,
          "diagnosis": "GTV / CTV / PTV",
          "treatment": [
            "Gross tumor volume, clinical target volume, and planning target volume are defined while protecting organs at risk"
          ]
        }
      },
      {
        "label": "Precision delivery technique",
        "next": {
          "leaf": true,
          "diagnosis": "Modern precision techniques",
          "treatment": [
            "Proton therapy exploits the Bragg peak for depth-limited dose deposition",
            "IMRT, SBRT, SRS, and IGRT are modern photon-based precision approaches"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-em-approach",
  "chapter": "Emergency Medicine",
  "group": "Emergency Medicine Approach",
  "name": "Emergency Medicine — Master Approach",
  "root": {
    "q": "Core principle: rule out immediate life threats and stabilize FIRST, then refine the diagnosis. Which timeline applies?",
    "options": [
      {
        "label": "Trauma",
        "next": {
          "leaf": true,
          "diagnosis": "Golden hour",
          "treatment": [
            "Rapid primary survey and stabilization within the first hour is the priority over a complete diagnostic workup"
          ]
        }
      },
      {
        "label": "Suspected stroke",
        "next": {
          "leaf": true,
          "diagnosis": "Door-to-needle <60 minutes for thrombolysis",
          "treatment": [
            "Prioritize rapid NCCT and tPA-eligibility assessment"
          ]
        }
      },
      {
        "label": "Suspected STEMI",
        "next": {
          "leaf": true,
          "diagnosis": "Door-to-cath <90 minutes",
          "treatment": [
            "Prioritize ECG and cath lab activation over a complete history"
          ]
        }
      },
      {
        "label": "Suspected sepsis",
        "next": {
          "leaf": true,
          "diagnosis": "Antibiotics within 1 hour",
          "treatment": [
            "Do not delay empiric antibiotics for a complete workup once sepsis is suspected"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-em-ams-coma",
  "chapter": "Emergency Medicine",
  "group": "Toxicology & Altered Mental Status",
  "name": "Altered Mental Status — AEIOU TIPS",
  "root": {
    "q": "ABC first, then glucose check within 10 minutes. Consider AEIOU TIPS: Alcohol/acidosis, Epilepsy/electrolytes, Infection, Overdose/opiates, Uremia, Temperature/trauma, Insulin, Poisoning/psychiatric, Stroke/seizure. Empiric treatment (DONT) given?",
    "options": [
      {
        "label": "Not yet given",
        "next": {
          "leaf": true,
          "diagnosis": "Give empiric DONT before further workup",
          "treatment": [
            "Dextrose, Oxygen, Naloxone, Thiamine — given empirically for undifferentiated altered mental status before structural imaging"
          ]
        }
      },
      {
        "label": "Given, pupils now assessed",
        "next": {
          "q": "Pupil finding?",
          "options": [
            {
              "label": "Pinpoint",
              "next": {
                "leaf": true,
                "diagnosis": "Suggests opioid or cholinergic toxicity",
                "treatment": [
                  "Naloxone if opioid toxidrome suspected; reassess response"
                ]
              }
            },
            {
              "label": "Fixed, mid-size",
              "next": {
                "leaf": true,
                "diagnosis": "Can indicate midbrain damage",
                "treatment": [
                  "Proceed urgently to structural imaging"
                ]
              }
            }
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-em-toxicology",
  "chapter": "Emergency Medicine",
  "group": "Toxicology & Altered Mental Status",
  "name": "Toxidrome and Specific Poison Recognition",
  "root": {
    "q": "Toxidrome pattern?",
    "options": [
      {
        "label": "Tachycardia, hypertension, hyperthermia, mydriasis, agitation",
        "next": {
          "leaf": true,
          "diagnosis": "Sympathomimetic (e.g. cocaine)",
          "treatment": [
            "Benzodiazepines + cooling",
            "Avoid beta-blockers"
          ]
        }
      },
      {
        "label": "Bradypnea, bradycardia, hypotension, miosis",
        "next": {
          "leaf": true,
          "diagnosis": "Opioid toxidrome",
          "treatment": [
            "Naloxone"
          ]
        }
      },
      {
        "label": "Hot, blind, dry, red, mad",
        "next": {
          "leaf": true,
          "diagnosis": "Anticholinergic toxidrome",
          "treatment": [
            "Supportive care ± specific antidotal care"
          ]
        }
      },
      {
        "label": "SLUDGE plus bronchorrhea/bronchospasm/bradycardia",
        "next": {
          "leaf": true,
          "diagnosis": "Cholinergic toxidrome",
          "treatment": [
            "Atropine + pralidoxime"
          ]
        }
      },
      {
        "label": "Liver injury pattern (NAPQI), nomogram-guided at 4 hours post-ingestion",
        "next": {
          "leaf": true,
          "diagnosis": "Acetaminophen toxicity",
          "treatment": [
            "N-acetylcysteine (NAC)"
          ]
        }
      },
      {
        "label": "High-anion-gap metabolic acidosis + osmolar gap + visual disturbance/blindness",
        "next": {
          "leaf": true,
          "diagnosis": "Methanol toxicity",
          "treatment": [
            "Fomepizole or ethanol"
          ]
        }
      },
      {
        "label": "High-anion-gap metabolic acidosis + osmolar gap + renal failure + calcium oxalate crystals",
        "next": {
          "leaf": true,
          "diagnosis": "Ethylene glycol toxicity",
          "treatment": [
            "Fomepizole or ethanol"
          ]
        }
      },
      {
        "label": "Wide QRS with arrhythmias",
        "next": {
          "leaf": true,
          "diagnosis": "TCA overdose",
          "treatment": [
            "Sodium bicarbonate"
          ]
        }
      },
      {
        "label": "Respiratory alkalosis + metabolic acidosis + tinnitus",
        "next": {
          "leaf": true,
          "diagnosis": "Salicylate toxicity",
          "treatment": [
            "Urinary alkalinization"
          ]
        }
      }
    ]
  }
},
{
  "id": "dtree-em-shock",
  "chapter": "Emergency Medicine",
  "group": "Shock",
  "name": "Shock — Type and Management",
  "root": {
    "q": "Shock = cellular hypoxia from oxygen demand exceeding delivery (anaerobic metabolism, rising lactate). RUSH exam (pump/tank/pipes) and IVC/passive-leg-raise findings point to which type?",
    "options": [
      {
        "label": "Distributive (sepsis/anaphylaxis)",
        "next": {
          "leaf": true,
          "diagnosis": "Distributive shock",
          "treatment": [
            "Balanced crystalloids",
            "Norepinephrine as the first vasopressor if fluids insufficient",
            "Treat the underlying cause (source control for sepsis, epinephrine for anaphylaxis)"
          ]
        }
      },
      {
        "label": "Hypovolemic",
        "next": {
          "leaf": true,
          "diagnosis": "Hypovolemic shock",
          "treatment": [
            "Balanced crystalloids for non-hemorrhagic hypovolemia",
            "Blood products if hemorrhagic"
          ]
        }
      },
      {
        "label": "Cardiogenic",
        "next": {
          "leaf": true,
          "diagnosis": "Cardiogenic shock",
          "treatment": [
            "Dobutamine for contractility support",
            "Avoid excessive fluids"
          ]
        }
      },
      {
        "label": "Obstructive (e.g. tension pneumothorax, tamponade)",
        "next": {
          "leaf": true,
          "diagnosis": "Obstructive shock",
          "treatment": [
            "Relieve the mechanical obstruction directly (needle decompression, pericardiocentesis) — fluids/pressors alone will not fix the underlying problem"
          ]
        }
      }
    ],
    "clues": [
      "Target MAP ≥65",
      "Avoid bicarbonate in lactic acidosis except in severe acidemia (pH <7.1)"
    ]
  }
},
{
  "id": "dtree-em-chest-pain",
  "chapter": "Emergency Medicine",
  "group": "Chest Pain & Dyspnea",
  "name": "ER Chest Pain / Dyspnea — Must-Not-Miss",
  "root": {
    "q": "Which pattern?",
    "options": [
      {
        "label": "ST elevation on ECG",
        "next": {
          "leaf": true,
          "diagnosis": "STEMI",
          "treatment": [
            "ECG within 10 minutes of arrival",
            "Aspirin, heparin, and cath lab activation immediately"
          ]
        }
      },
      {
        "label": "No ST elevation, troponin/risk-factor assessment needed",
        "next": {
          "leaf": true,
          "diagnosis": "NSTEMI / unstable angina",
          "treatment": [
            "Risk-stratify with the HEART score (history, ECG, age, risk factors, troponin)"
          ],
          "notes": [
            "Ischemia can present atypically in women, diabetics, and the elderly — maintain a high index of suspicion"
          ]
        }
      },
      {
        "label": "Sudden tearing pain, severe hypertension, pulse/BP differential between limbs",
        "next": {
          "leaf": true,
          "diagnosis": "Aortic dissection",
          "treatment": [
            "Urgent imaging (CTA) and blood-pressure/heart-rate control — do not treat as ACS alone"
          ]
        }
      },
      {
        "label": "Dyspnea/chest pain/syncope with VTE risk factors",
        "next": {
          "leaf": true,
          "diagnosis": "Pulmonary embolism",
          "treatment": [
            "Risk-stratify and proceed to CTA/V-Q per standard PE workup"
          ]
        }
      },
      {
        "label": "Shock with unilateral absent breath sounds/hyperresonance",
        "next": {
          "leaf": true,
          "diagnosis": "Tension pneumothorax",
          "treatment": [
            "Immediate needle decompression — do not wait for imaging"
          ]
        }
      },
      {
        "label": "Obstructive shock with JVD, hypotension, muffled heart sounds",
        "next": {
          "leaf": true,
          "diagnosis": "Cardiac tamponade",
          "treatment": [
            "Urgent pericardiocentesis"
          ]
        }
      }
    ]
  }
},

];
