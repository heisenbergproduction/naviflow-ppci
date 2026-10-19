/**
 * NaviFlow - PPCI Pronto Soccorso
 * Database dei 13 Protocolli di Presa in Carico Infermieristica (PPCI)
 * Basato su documento aziendale ARNAS Civico Rev. 1 (Nucleo NAVI)
 */

export const PROTOCOLS = [
  {
    id: "anemia",
    number: 1,
    name: "Anemia",
    shortName: "Anemia",
    icon: "droplet",
    color: "#dc2626", // Red-600
    badgeColor: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
    applicableCodes: ["Codice 3 (Azzurro - Urgenza Differibile)", "Codice 4 (Verde - Urgenza Minore)"],
    targetT1: "Entro 30-45 min (EGA Venoso immediato)",
    keywords: ["anemia", "hgb", "emoglobina", "astenia", "pallore", "sangue", "trasfusione", "emocomponenti"],
    
    inclusions: [
      "Sospetta anemia sintomatica o cronica riacutizzata.",
      "Valori di Emoglobina HGB < 7 g/dL (o HGB < 8 g/dL in presenza di comorbidità cardiovascolari, cerebrovascolari o respiratorie).",
      "Quadro clinico caratterizzato da astenia grave, marcato pallore cutaneo-mucoso, tachicardia compensatoria senza shock.",
      "Paziente vigile, emodinamicamente stabile (Codici 3 e 4 al Triage)."
    ],
    
    exclusions: [
      "Emorragia massiva attiva in atto con instabilità emodinamica (PAS < 90 mmHg) -> Codice 1 / 2 (Area Critica).",
      "Politrauma o trauma maggiore recente con shock emorragico.",
      "Sincope in atto o non regredita."
    ],
    
    redFlags: [
      "Ipotensione arteriosa severa (PAS < 90 mmHg, PAM < 65 mmHg) o comparsa di shock ipovolemico.",
      "Tachicardia marcata (> 120 bpm a riposo) associata a dispnea a riposo o dolore toracico anginoso.",
      "Perdita di coscienza acuta, lipotimia non regredita o marcato stato confusionale.",
      "Sanguinamento massivo acuto (ematemesi conclamata, melena abbondante con instabilità, enteroraggia massiva)."
    ],
    
    operationalSteps: [
      {
        id: "anemia-step-1",
        title: "Valutazione Iniziale & Parametri Vitali",
        timing: "T0 - Immediato",
        type: "triage",
        actions: [
          "Rilevazione parametri vitali completi: PAO bimanuale, FC, SpO2 in aria ambiente, Frequenza Respiratoria, TC.",
          "Valutazione dello stato di perfusione periferica (tempo di refill capillare, temperatura estremità, pallore congiuntivale).",
          "Anamnesi mirata su perdite ematiche recenti (feci picee, epistassi, menometrorragie, ematuria)."
        ],
        snippet: "Attivato PPCI Anemia. Rilevati parametri vitali: PAO, FC, SpO2, FR nella norma. Paziente vigile, orientato, cute e mucose diffusamente pallide, non segni di sanguinamento attivo macroscopico in atto. Informato il medico NAVI."
      },
      {
        id: "anemia-step-2",
        title: "Accesso Venoso, Prelievo Urgenza & EGA Venoso",
        timing: "T1 - < 15 min",
        type: "lab",
        actions: [
          "Posizionamento accesso venoso periferico (cannula 18G o 20G in sede idonea).",
          "Prelievo ematico d'urgenza: Emocromo con formula, Coagulazione (PT/INR, aPTT, fibrinogeno), Biochimica completa (funzionalità renale, epatica, elettroliti, sideremia, ferritina - senza troponina se assente dolore toracico).",
          "Esecuzione immediata di EGA Venoso al point-of-care per stima rapida di HGB, ematocrito e lattati.",
          "Prelievo di provetta dedicata per la Banca del Sangue (Gruppo sanguigno e Tipo & Screen / Test di Coombs indiretto)."
        ],
        snippet: "Posizionato accesso venoso periferico calibro 18G. Eseguiti prelievi ematici per profilo urgenza, assetto marziale e provetta Banca Sangue per Tipo & Screen. Eseguito EGA venoso di controllo rapido. Campioni inviati al laboratorio."
      },
      {
        id: "anemia-step-3",
        title: "Verifica HGB ed Eventuale Richiesta Emocomponenti",
        timing: "T1 - < 30 min",
        type: "therapy",
        actions: [
          "Se EGA venoso o emocromo evidenziano HGB < 7 g/dL (o < 8 g/dL con cardiopatia/comorbidità nota): avvisare tempestivamente il medico di guardia.",
          "Concordare con il medico NAVI/di guardia la prescrizione e prenotazione di Emazie Concentrate (EC).",
          "Mantenimento del paziente in posizione supina o Fowler, evitando cambi posturali bruschi."
        ],
        snippet: "Refertata/stimata emoglobina con valore critico (HGB < 7 g/dL o < 8 g/dL con comorbidità). Informato tempestivamente il medico NAVI per la richiesta e prenotazione di Sacche di Emazie Concentrate (EC) presso il SIMT/Banca del Sangue."
      }
    ],
    
    decisionNodes: [
      {
        id: "anemia-dec-1",
        question: "L'EGA venoso o l'emocromo confermano HGB < 7 g/dL (o < 8 con cardiopatia/comorbidità) oppure paziente sintomatico?",
        options: [
          {
            label: "SÌ - HGB < 7 (o < 8 g/dL con comorbidità)",
            outcomeType: "area_critica",
            outcomeTitle: "Allerta Medico NAVI / Richiesta Emocomponenti (EC)",
            description: "Avviso immediato del medico di guardia. Predisposizione immediata consenso trasfusionale, doppio controllo gruppo sanguigno e richiesta di 2 unità di Emazie Concentrate al Centro Trasfusionale.",
            snippet: "Valore di emoglobina critico confermato (HGB < 7 g/dL o < 8 g/dL con comorbidità). Avvisato il medico di guardia: concordata richiesta urgente di Emazie Concentrate. Paziente monitorato con parametri stabili in attesa di assegnazione sangue."
          },
          {
            label: "NO - HGB >= 7-8 g/dL stabile e asintomatico",
            outcomeType: "t2_attesa",
            outcomeTitle: "Attesa Presa in Carico Medica T2",
            description: "Paziente emodinamicamente stabile senza necessità di trasfusione d'urgenza. Attesa dei referti di laboratorio biochimico e presa in carico medica T2.",
            snippet: "Valori di HGB non critici e assenza di sintomi da ipoperfusione acuta. Prelievi completati, paziente stabile a riposo. In attesa di completamento referti biochimici e presa in carico medica T2."
          }
        ]
      }
    ]
  },
  {
    id: "dispnea",
    number: 2,
    name: "Dispnea",
    shortName: "Dispnea",
    icon: "wind",
    color: "#0284c7", // Sky-600
    badgeColor: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300",
    applicableCodes: ["Codice 3 (Azzurro - Urgenza Differibile)", "Codice 4 (Verde - Urgenza Minore)"],
    targetT1: "< 10 min (ECG 12 derivazioni + EGA obbligatori)",
    keywords: ["dispnea", "respiro", "ega", "ecg", "asma", "bpco", "polmonite", "spo2", "bnp", "edema"],
    
    inclusions: [
      "Paziente giunto in PS con dispnea lieve-moderata non traumatica.",
      "Codici 3 e 4 al Triage con respiro difficoltoso ma senza segni di esaurimento della pompa respiratoria.",
      "Sospetta riacutizzazione di BPCO, asma bronchiale, infezione respiratoria, scompenso cardiaco congestizio compensato."
    ],
    
    exclusions: [
      "Arresto respiratorio o braditipnea estrema (< 8 atti/min) -> Codice 1.",
      "Insufficienza respiratoria acuta severa (SpO2 < 85% in aria, cianosi centrale, incapacità a parlare) -> Codice 1 / 2.",
      "Stridore laringeo acuto o sospetto shock anafilattico / corpo estraneo -> Codice 1.",
      "Trauma toracico recente (applicare PPCI Trauma Toracico)."
    ],
    
    redFlags: [
      "SpO2 < 90% refrattaria ad O2 terapia a bassi flussi.",
      "Tachipnea severa (> 30 atti/min) con tirage intercostale e uso evidente dei muscoli respiratori accessori.",
      "Respiro paradosso o comparsa di bradipnea con obnubilamento del sensorio (ipercapnia grave / fatica muscolare).",
      "Ipotensione o shock concomitante.",
      "Presenza all'ECG di STEMI acuto o aritmie ventricolari/sopraventricolari instabili."
    ],
    
    operationalSteps: [
      {
        id: "dispnea-step-1",
        title: "ECG a 12 derivazioni & EGA entro 10 Minuti (T1 Obbligatorio)",
        timing: "T1 - Entro 10 min (CRITICO)",
        type: "ecg",
        actions: [
          "Esecuzione immediata di ECG a 12 derivazioni entro 10 min dal T0.",
          "Esecuzione contestuale di EGA (arterioso da arteria radiale o venoso se già reperibile con saturimetria attendibile).",
          "Visione immediata del tracciato ECG e dei valori EGA da parte del medico NAVI per validazione.",
          "Posizionamento del paziente in posizione semiseduta (Fowler a 45°-90°)."
        ],
        snippet: "Eseguito ECG a 12 derivazioni ed EGA entro 10 minuti dal T0 come da protocollo PPCI Dispnea. Tracciato ed emogasanalisi sottoposti tempestivamente a visione del medico NAVI per validazione."
      },
      {
        id: "dispnea-step-2",
        title: "Accesso Venoso & Profilo Ematochimico Urgenza + BNP",
        timing: "T1 - < 20 min",
        type: "lab",
        actions: [
          "Reperimento di accesso venoso periferico.",
          "Prelievi ematici urgenza: Emocromo con formula, Elettroliti, Funzionalità renale/epatica, Troponina hs, D-Dimero se sospetto di embolia polmonare, BNP / NT-proBNP.",
          "Avvio ossigenoterapia mirata se SpO2 < 92% (target 94-98% in pz non ipercapnico; target 88-92% con Venturi in pz noto per BPCO/ritentore)."
        ],
        snippet: "Reperito accesso venoso periferico. Eseguiti prelievi ematici secondo profilo urgenza comprensivi di biomarcatori cardiaci (Troponina hs e BNP). Impostata ossigenoterapia mirata al mantenimento della saturazione target."
      },
      {
        id: "dispnea-step-3",
        title: "Esami Strumentali (Rx Torace / Ecografia Polmonare)",
        timing: "T1 - Concordato",
        type: "imaging",
        actions: [
          "Concordare con il medico NAVI/di guardia l'esecuzione di Rx Torace in 2 proiezioni o a letto del paziente.",
          "Eventuale supporto ecografico point-of-care (ecografia polmonare LUS per linee B / versamento pleurico / PNX)."
        ],
        snippet: "Concordata con il medico di guardia ed inoltrata richiesta di Rx Torace / ecografia polmonare come da protocollo aziendale. Paziente assistito in posizione semiseduta."
      }
    ],
    
    decisionNodes: [
      {
        id: "dispnea-dec-1",
        question: "L'ECG o l'EGA mostrano anomalie acute critiche (STEMI, aritmia grave, pH < 7.25, pCO2 > 60 con acidosi, P/F < 200, lattati > 2)?",
        options: [
          {
            label: "SÌ - Reperti EGA/ECG Alterati o Distress Respiratorio",
            outcomeType: "area_critica",
            outcomeTitle: "Rivalutazione Immediata Codice 1 o 2 -> Invio Area Critica",
            description: "Immediata rivalutazione del Triage. Assegnazione di codice a priorità superiore (Codice 1 o 2) e trasferimento immediato in Area Critica / Sala Rossa per NIV/intubazione o terapia intensiva.",
            snippet: "Rilevati valori critici all'EGA/ECG (acidosi respiratoria/ipossiemia/anomalie ischemiche). Effettuata rivalutazione immediata del codice Triage con attribuzione di priorità superiore e immediato trasferimento del paziente in Area Critica."
          },
          {
            label: "NO - EGA nei limiti / compenso stabile, ECG non ischemico acuto",
            outcomeType: "t2_attesa",
            outcomeTitle: "Attesa Presa in Carico Medica T2",
            description: "Paziente stabile, saturazione mantenuta nei range target, esami di laboratorio e Rx Torace in elaborazione. Attesa della presa in carico medica T2.",
            snippet: "Visionati i referti dell'ECG ed EGA: non si evidenziano quadri acuti di scompenso critico immediato. Parametri stabili. Notificato al medico di guardia. Paziente in attesa di presa in carico medica (T2)."
          }
        ]
      }
    ]
  },
  {
    id: "frattura-femore",
    number: 3,
    name: "Frattura di Femore",
    shortName: "Frattura Femore",
    icon: "bone",
    color: "#f59e0b", // Amber-500
    badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
    applicableCodes: ["Codice 3 (Azzurro - Urgenza Differibile)", "Codice 4 (Verde - Urgenza Minore)"],
    targetT1: "Entro 30 min (Antalgica precoce + Rx concordata)",
    keywords: ["femore", "frattura", "anca", "anziano", "arto", "rx", "dolore", "ec", "sangue"],
    
    inclusions: [
      "Paziente (frequentemente anziano) con caduta accidentale a terra e dolore all'anca/inguine.",
      "Impotenza funzionale dell'arto inferiore con tipico atteggiamento in extrarotazione e accorciamento.",
      "Condizioni emodinamiche stabili al Triage (Codici 3 e 4)."
    ],
    
    exclusions: [
      "Politrauma ad alta dinamica o frattura bilaterale con instabilità emodinamica (shock ipovolemico) -> Codice 1 / 2.",
      "Trauma con sospetta frattura del bacino instabile o frattura esposta con emorragia attiva."
    ],
    
    redFlags: [
      "Assenza di polsi arteriosi a valle (polso pedidio o tibiale posteriore non palpabile, arto freddo/cianotico).",
      "Ipotensione arteriosa ingravescente o anemizzazione rapida (ematoma espansivo della coscia con sequestro ematico > 1000-1500 ml).",
      "Grave alterazione dello stato di coscienza o dolore non controllabile con analgesici di I linea."
    ],
    
    operationalSteps: [
      {
        id: "femore-step-1",
        title: "Valutazione Neurovascolare, Immobilizzazione & Gestione Dolore",
        timing: "T0 - Immediato",
        type: "therapy",
        actions: [
          "Rilevazione parametri vitali completi.",
          "Valutazione della scala del dolore NRS (spesso 8-10/10) e mobilità/sensibilità distale dell'arto.",
          "Verifica della presenza e simmetria dei polsi periferici (pedidio e tibiale posteriore).",
          "Immobilizzazione dell'arto in asse con cuscini/tutore evitando manovre brusche di mobilizzazione.",
          "Somministrazione di terapia antalgica precoce concordata con il medico NAVI per target NRS < 4."
        ],
        snippet: "Attivato PPCI Frattura di Femore. Riscontrato arto inferiore dx/sn accorciato ed extraruotato con impotenza funzionale totale. Polsi periferici presenti e simmetrici. Valutata scala del dolore NRS: somministrata analgesia su indicazione medica NAVI."
      },
      {
        id: "femore-step-2",
        title: "Accesso Venoso, Esami Urgenza, EGA & Banca Sangue",
        timing: "T1 - < 20 min",
        type: "lab",
        actions: [
          "Posizionamento di accesso venoso periferico di buon calibro (18G preferenziale).",
          "Prelievi ematici preoperatori d'urgenza: Emocromo, Coagulazione (PT, aPTT, fibrinogeno), Elettroliti, Funzionalità renale ed epatica, Glicemia.",
          "Esecuzione di EGA Venoso per valutazione emoglobina di partenza e acido-base.",
          "Prelievo e invio immediato al Centro Trasfusionale di provetta per Gruppo e Tipo & Screen, con richiesta di predisposizione di 2 unità di Emazie Concentrate (EC)."
        ],
        snippet: "Posizionato CVP 18G. Eseguiti prelievi ematici preoperatori ed EGA venoso. Inviata provetta al Centro Trasfusionale per gruppo e tipo con predisposizione di 2 EC disponibili come da protocollo aziendale fratture di femore."
      },
      {
        id: "femore-step-3",
        title: "Esami Radiologici Concordati (Rx Bacino / Anca / Torace) ed ECG",
        timing: "T1 - < 30 min",
        type: "imaging",
        actions: [
          "Esecuzione di ECG a 12 derivazioni preoperatorio.",
          "Concordata con il medico NAVI/di guardia la richiesta radiologica: Rx Bacino per anche, Rx Femore e anca interessata in 2 proiezioni, Rx Torace standard preoperatorio.",
          "Accompagnamento protetto del paziente con barella spinale o materassino antidecubito."
        ],
        snippet: "Eseguito ECG a 12 derivazioni. Concordata ed inoltrata al reparto di Radiologia richiesta urgente di Rx Bacino, Rx Anca/Femore e Rx Torace preoperatori. Paziente mantenuto immobilizzato e monitorato."
      }
    ],
    
    decisionNodes: [
      {
        id: "femore-dec-1",
        question: "L'esame radiologico conferma la presenza di frattura di femore (collo, pertrocanterica o diafisaria)?",
        options: [
          {
            label: "SÌ - Frattura confermata radiologicamente",
            outcomeType: "fast_track",
            outcomeTitle: "Attivazione Percorso Fast Track Frattura Femore Anziano",
            description: "Notifica tempestiva all'Ortopedico di guardia per presa in carico chirurgica precoce (target intervento entro 48h). Posizionamento profilassi antitrombotica ed eventuale calza elastica secondo prescrizione.",
            snippet: "Rx conferma frattura femorale. Attivato percorso aziendale Fast Track Femore: esami preoperatori ed ECG eseguiti, sangue predisposto. Informato lo specialista ortopedico per la presa in carico e programmazione chirurgica."
          },
          {
            label: "NO - Assenza di lesioni ossee evidenti",
            outcomeType: "t2_attesa",
            outcomeTitle: "Attesa Presa in Carico Medica T2 per Approfondimento",
            description: "Esame radiologico negativo per fratture evidenti. Paziente mantenuto a riposo per valutazione medica T2 (esclusione frattura ingranata o contusione bacino/anca tramite eventuale TC o visita clinica).",
            snippet: "Rx negativo per fratture ossee grossolane evidenti. Persiste dolenzia funzionale. Paziente mantenuto a riposo a letto con parametri stabili in attesa di rivalutazione clinica medica T2."
          }
        ]
      }
    ]
  },
  {
    id: "dolore-addominale",
    number: 4,
    name: "Dolore Addominale",
    shortName: "Dolore Addominale",
    icon: "activity",
    color: "#eab308", // Yellow-500
    badgeColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
    applicableCodes: ["Codice 3 (Azzurro - Urgenza Differibile)", "Codice 4 (Verde - Urgenza Minore)"],
    targetT1: "Entro 20 min (Esclusione RAU + ECG se quadranti sup.)",
    keywords: ["addome", "dolore", "vomito", "fianco", "fegato", "colecisti", "appendicite", "urinario", "beta-hcg"],
    
    inclusions: [
      "Dolore addominale acuto o subacuto non traumatico.",
      "Paziente emodinamicamente stabile (Codice 3 o 4 al Triage).",
      "Sospetta colica biliare, colica renale, gastroenterite, diverticolite o appendicite in fase iniziale non complicata."
    ],
    
    exclusions: [
      "Addome a tavola con peritonite acuta perforativa conclamata -> Codice 1 / 2.",
      "Shock settico o ipovolemico (rottura di aneurisma aorta addominale - AAA, gravidanza ectopica rotta) -> Codice 1.",
      "Quadro di Ritenzione Acuta di Urine (da escludere prioritariamente e trattare con PPCI RAU)."
    ],
    
    redFlags: [
      "Difesa addominale involontaria diffusa, segno di Blumberg positivo spiccato, addome teso e non trattabile.",
      "Ipotensione arteriosa (PAS < 90 mmHg) associata a dolore lombare/addominale acuto (sospetto AAA rotto).",
      "Febbre elevata con brivido scuotente associata a ittero e dolore ipocondrio destro (triade di Charcot per colangite).",
      "Sincope all'esordio o anemizzazione acuta in donna in età fertile (sospetta rottura di GEU)."
    ],
    
    operationalSteps: [
      {
        id: "addome-step-1",
        title: "Esclusione RAU & Rilevazione Parametri Vitali",
        timing: "T0 - Immediato",
        type: "triage",
        actions: [
          "Rilevazione parametri vitali completi (PAO, FC, TC, SpO2).",
          "Esame obiettivo sommario dei quadranti addominali ed esclusione prioritaria di globo vescicale (se presente globo, dirottare su PPCI RAU).",
          "Se donna in età fertile (12-55 anni): raccolta urine obbligatoria per test di gravidanza (Beta-HCG urinario rapido)."
        ],
        snippet: "Attivato PPCI Dolore Addominale. Esclusa ritenzione acuta d'urina (globo assente). Rilevati parametri vitali stabili. Verificata anamnesi ginecologica: eseguito test rapido di gravidanza urinario ove indicato."
      },
      {
        id: "addome-step-2",
        title: "ECG (se Quadranti Superiori) & Prelievo Urgenza Completo",
        timing: "T1 - < 15 min",
        type: "ecg",
        actions: [
          "Se il dolore è localizzato ai quadranti superiori (epigastrio, ipocondrio dx/sn) o in paziente > 50 anni/diabetico: eseguire subito ECG a 12 derivazioni per escludere infarto miocardico inferiore.",
          "Accesso venoso periferico.",
          "Prelievi ematici urgenza: Emocromo con formula, Funzionalità epatica completa (AST, ALT, Bilirubina totale e frazionata, GammaGT), Lipasi / Amilasi, Funzionalità renale ed elettroliti, PCR e Procalcitonina (PCT), EGA venoso."
        ],
        snippet: "Eseguito ECG a 12 derivazioni per dolore quadranti superiori (tracciato esente da alterazioni ischemiche acute inferiori). Reperito accesso venoso ed eseguiti prelievi urgenza completi con enzimi epato-biliari, lipasi, PCT ed EGA venoso."
      },
      {
        id: "addome-step-3",
        title: "Valutazione Dolore al Fianco & Richieste Strumentali Concordate",
        timing: "T1 - < 25 min",
        type: "imaging",
        actions: [
          "Se dolore localizzato al fianco con irradiazione inguinale (sospetta colica renale): esame urine stick al letto del paziente + richiesta concordata di Ecografia apparato urinario.",
          "Se dolore quadranti inferiori o colecistite sospetta: concordare con il medico NAVI ecografia addome completo o addome superiore.",
          "Valutazione scala NRS e somministrazione di terapia antalgica concordata con il medico NAVI."
        ],
        snippet: "Eseguito esame chimico-fisico urine al letto del pz. Concordata ed inoltrata con il medico di guardia richiesta di esami ecografici. Somministrata terapia antalgica su prescrizione medica NAVI per controllo del dolore."
      }
    ],
    
    decisionNodes: [
      {
        id: "addome-dec-1",
        question: "Gli esami o la clinica evidenziano quadro di addome acuto chirurgico o instabilità (lipasi > 3x, leucocitosi marcata, peritonite, GEU positiva)?",
        options: [
          {
            label: "SÌ - Segni di Allarme o Addome Chirurgico Acuto",
            outcomeType: "area_critica",
            outcomeTitle: "Notifica Immediata Medico NAVI / Consulenza Chirurgica d'Urgenza",
            description: "Immediata rivalutazione medica. Predisposizione digiuno assoluto, eventuale SNG se occlusione e consulenza chirurgica generale o ginecologica d'urgenza.",
            snippet: "Riscontrati indici infiammatori/biochimici marcatamente alterati e sospetto addome acuto. Informato tempestivamente il medico di guardia per rivalutazione codice e richiesta di consulenza chirurgica d'urgenza."
          },
          {
            label: "NO - Parametri stabili, reperti non occlusivi / non peritonitici",
            outcomeType: "t2_attesa",
            outcomeTitle: "Attesa Presa in Carico Medica T2",
            description: "Paziente con dolore controllato dopo antalgico, parametri stabili, esami strumentali in attesa di refertazione definitiva. Presa in carico medica T2.",
            snippet: "Esami biochimici eseguiti, dolore regredito dopo antalgico, addome trattabile senza peritonismo. Notificato al medico di guardia. Paziente in attesa di presa in carico medica T2."
          }
        ]
      }
    ]
  },
  {
    id: "alterazione-stato-coscienza",
    number: 5,
    name: "Alterazione Stato di Coscienza",
    shortName: "Stato di Coscienza",
    icon: "brain",
    color: "#8b5cf6", // Purple-500
    badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
    applicableCodes: ["Codice 3 (Azzurro - Urgenza Differibile)", "Codice 4 (Verde - Urgenza Minore)"],
    targetT1: "< 10 min (ECG 12 derivazioni + EGA + Glicemia entro 10 min)",
    keywords: ["coscienza", "sincope", "lipotimia", "svenimento", "gcs", "glicemia", "ecg", "ega", "neurologico"],
    
    inclusions: [
      "Episodi riferiti di perdita transitoria di coscienza (sincope, presincope, lipotimia, obnubilamento) RISOLTI all'arrivo in Triage.",
      "Paziente attualmente VIGILE, collaborante e lucido al momento della valutazione (GCS = 15).",
      "Codice 3 o 4 al Triage con anamnesi di malore transitorio."
    ],
    
    exclusions: [
      "Alterazione dello stato di coscienza OBIETTIVATA ed in atto al Triage (GCS < 14, stupor, coma, confusione acuta) -> Codice 1 / 2.",
      "Presenza di deficit neurologici focali acuti in atto (asimmetria facciale, ipostenia arti, afasia -> Rete Ictus Stroke Unit).",
      "Crisi epilettica prolungata o stato di male epilettico in corso."
    ],
    
    redFlags: [
      "Ricomparsa durante la permanenza di sonnolenza progressiva, sopore o calo del punteggio GCS (< 15).",
      "Comparsa improvvisa di deficit stenici focali, disartria, deviazione della rima buccale o atassia acuta.",
      "Presenza all'EGA di grave acidosi (pH < 7.25), iperlattatemia (> 2.5 mmol/L), grave disionemia (Na < 125 o > 155 mEq/L, K < 2.8 o > 6.0 mEq/L).",
      "ECG diagnostico per blocco atrio-ventricolare avanzato (BAV II grado Mobitz 2 o BAV III grado), pause > 3 secondi o sindrome di Brugada."
    ],
    
    operationalSteps: [
      {
        id: "coscienza-step-1",
        title: "Target T1 < 10 Min: Stick Glicemico, ECG ed EGA",
        timing: "T1 - Entro 10 min (CRITICO)",
        type: "ecg",
        actions: [
          "Rilevazione immediata della glicemia capillare al point-of-care (escludere ipoglicemia acuta < 60 mg/dL o iperglicemia severa).",
          "Esecuzione di ECG a 12 derivazioni entro 10 min dal T0.",
          "Esecuzione di EGA (venoso o arterioso) entro 10 min con valutazione immediata di pH, Lattati, Elettroliti e HGB.",
          "Sottomissione immediata del tracciato ECG ed EGA al medico NAVI."
        ],
        snippet: "Eseguito stick glicemico immediato, ECG a 12 derivazioni ed EGA entro 10 minuti dal T0 come da protocollo PPCI Alterazione Coscienza. Referti sottoposti a visione immediata del medico NAVI per validazione."
      },
      {
        id: "coscienza-step-2",
        title: "Accesso Venoso & Profilo Urgenza con Tossicologico",
        timing: "T1 - < 20 min",
        type: "lab",
        actions: [
          "Posizionamento accesso venoso periferico.",
          "Prelievi ematici urgenza: Emocromo, Coagulazione, Elettroliti, Funzionalità renale/epatica, Troponina hs, Alcolemia ed eventuale screening tossicologico su urine se indicato.",
          "Valutazione neurologica seriale (GCS e reattività pupillare)."
        ],
        snippet: "Posizionato accesso venoso periferico ed eseguiti prelievi ematici d'urgenza comprensivi di dosaggio alcolemico e screening tossicologico urinario. Monitoraggio GCS pari a 15 con pupille isocoriche e isocicliche."
      },
      {
        id: "coscienza-step-3",
        title: "Eventuale TC Cranio Concordata con Medico NAVI",
        timing: "T1 - Concordato",
        type: "imaging",
        actions: [
          "Se la sincope ha comportato caduta a terra con trauma cranico o se pz in terapia anticoagulante orale (TAO/DOAC): concordare con il medico NAVI la richiesta urgente di TC Cranio senza mdc."
        ],
        snippet: "Concordata con il medico di guardia richiesta di TC Cranio senza mdc per trauma secondario da caduta a terra in corso di sincope in paziente in trattamento con farmaci anticoagulanti."
      }
    ],
    
    decisionNodes: [
      {
        id: "coscienza-dec-1",
        question: "L'EGA, l'ECG o il monitoraggio mostrano alterazioni acute (aritmie severe, BAV, ipossia, acidosi, squilibri Na/K o nuovo deficit neurologico)?",
        options: [
          {
            label: "SÌ - Anomalie acute rilevanti riscontrate",
            outcomeType: "area_critica",
            outcomeTitle: "Rivalutazione Triage Codice 1 o 2 -> Invio Area Critica",
            description: "Immediata rivalutazione del Triage ed escalation di priorità. Trasferimento del paziente in Area Critica / Sala Rossa per monitoraggio continuo e gestione specialistica.",
            snippet: "Riscontrate alterazioni acute significative a ECG/EGA (disionemia severa / aritmia cardiaca / ipossiemia). Effettuata rivalutazione del codice Triage a priorità superiore e immediato invio in Area Critica."
          },
          {
            label: "NO - ECG nei limiti, EGA normale, GCS 15 costante",
            outcomeType: "t2_attesa",
            outcomeTitle: "Attesa Presa in Carico Medica T2",
            description: "Paziente asintomatico, lucido ed orientato, tracciato ECG sinusale privo di anomalie di conduzione, equilibrio acido-base ed elettroliti nella norma. Attesa T2.",
            snippet: "Visionati i referti di ECG ed EGA: assenza di anomalie del ritmo o squilibri metabolici acuti. GCS 15 stabile. Notificato al medico di guardia. Paziente in attesa di presa in carico medica T2."
          }
        ]
      }
    ]
  },
  {
    id: "cardiopalmo",
    number: 6,
    name: "Cardiopalmo",
    shortName: "Cardiopalmo",
    icon: "heart-pulse",
    color: "#f43f5e", // Rose-500
    badgeColor: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
    applicableCodes: ["Codice 3 (Azzurro - Urgenza Differibile)", "Codice 4 (Verde - Urgenza Minore)"],
    targetT1: "< 10 min (ECG 12 derivazioni obbligatorio)",
    keywords: ["cardiopalmo", "palpitazioni", "batticuore", "fibrillazione", "aritmia", "ecg", "ega", "tachicardia", "extrasistoli"],
    
    inclusions: [
      "Paziente che lamenta sensazione di battito cardiaco accelerato, irregolare o 'tuffo al cuore'.",
      "Paziente cosciente, emodinamicamente stabile (PAS > 90 mmHg, assenza di shock).",
      "Codici 3 e 4 al Triage con sintomi attivi o insorti da poco tempo."
    ],
    
    exclusions: [
      "Instabilità emodinamica conclamata (PAS < 90 mmHg, polso centrale filiforme, sincope in atto) -> Codice 1.",
      "Cardiopalmo associato a dolore toracico ischemico oppressivo in atto o dispnea grave a riposo -> Codice 1 / 2."
    ],
    
    redFlags: [
      "Ipotensione arteriosa sistemica (PAS < 90 mmHg) associata a tachiaritmia (> 150 bpm) o bradiaritmia (< 40 bpm).",
      "Segni clinici di ipoperfusione tissutale (sudorazione algida, confusione mentale, tempo di refill > 3 sec).",
      "Comparsa improvvisa di dolore toracico retrosternale costrittivo o dispnea severa.",
      "Riscontro all'ECG di Tachicardia Ventricolare (TV), Fibrillazione Atriale pre-eccitata (WPW) o TPSV con instabilità."
    ],
    
    operationalSteps: [
      {
        id: "cardiopalmo-step-1",
        title: "ECG a 12 Derivazioni entro 10 Minuti (T1 Obbligatorio)",
        timing: "T1 - Entro 10 min (CRITICO)",
        type: "ecg",
        actions: [
          "Esecuzione immediata di ECG a 12 derivazioni con tracciato lungo (almeno 30 secondi di ritmo su DII/V1).",
          "Visione e interpretazione immediata del tracciato da parte del medico NAVI per identificare aritmie sopraventricolari o ventricolari.",
          "Applicazione immediata del monitor continuo dei parametri (traccia ECG e saturimetro a dito)."
        ],
        snippet: "Eseguito ECG a 12 derivazioni entro 10 minuti dal T0 come da protocollo PPCI Cardiopalmo. Tracciato sottoposto a visione immediata del medico NAVI. Posizionato monitoraggio continuo con cardiofrequenzimetro."
      },
      {
        id: "cardiopalmo-step-2",
        title: "Accesso Venoso, Profilo Urgenza & EGA Arterioso",
        timing: "T1 - < 20 min",
        type: "lab",
        actions: [
          "Posizionamento accesso venoso periferico (cannula 18G/20G).",
          "Prelievi ematici urgenza: Emocromo, Elettroliti con focus su Potassio (K+), Magnesio (Mg2+) e Calcio ionizzato, Funzionalità renale/tiroidea (TSH se concordato), Troponina hs.",
          "Esecuzione di EGA Arterioso o Venoso con emogasanalizzatore."
        ],
        snippet: "Posizionato accesso venoso periferico. Eseguiti prelievi ematici d'urgenza comprensivi di dosaggio ionico, troponina hs ed EGA arterioso/venoso per assetto metabolico ed elettrolitico. Campioni inviati al laboratorio."
      }
    ],
    
    decisionNodes: [
      {
        id: "cardiopalmo-dec-1",
        question: "L'ECG evidenzia aritmia acuta instabile o potenzialmente maligna (TV, FA ad elevata risposta ventricolare > 150 bpm, TPSV refrattaria, BAV avanzato)?",
        options: [
          {
            label: "SÌ - Aritmia acuta / tachicardia complessa riscontrata",
            outcomeType: "area_critica",
            outcomeTitle: "Rivalutazione Triage Codice 1 o 2 -> Invio Area Critica",
            description: "Rivalutazione immediata del codice Triage. Trasferimento d'urgenza in Area Critica / Sala Rossa per eventuale cardioversione elettrica o farmacologica sincronizzata.",
            snippet: "Rilevata all'ECG aritmia cardiaca acuta a frequenza elevata (FA ad elevata risposta / tachiaritmia). Effettuata immediata rivalutazione del Triage ed invio del paziente in Area Critica per terapia antiaritmica tempestiva."
          },
          {
            label: "NO - Ritmo sinusale, extrasistolia isolata o FA a frequenza controllata",
            outcomeType: "t2_attesa",
            outcomeTitle: "Attesa Presa in Carico Medica T2",
            description: "Tracciato ECG non indicativo di instabilità ritmica immediata, parametri emodinamici stabili a riposo. Monitoraggio continuo e attesa T2.",
            snippet: "Visionati i referti di ECG ed EGA: tracciato non indicativo di anomalie aritmiche maggiori a rischio acuto. Parametri stabili. Notificato al medico di guardia. Paziente in attesa di presa in carico medica T2."
          }
        ]
      }
    ]
  },
  {
    id: "dolore-toracico",
    number: 7,
    name: "Dolore Toracico (Atraumatico)",
    shortName: "Dolore Toracico",
    icon: "shield-alert",
    color: "#b91c1c", // Red-700
    badgeColor: "bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-200",
    applicableCodes: ["Codice 3 (Azzurro - Urgenza Differibile)", "Codice 4 (Verde - Urgenza Minore)"],
    targetT1: "< 10 min (ECG 12 derivazioni con visione immediata)",
    keywords: ["torace", "stemi", "infarto", "ecg", "troponina", "bnp", "angina", "dissezione", "retrosternale"],
    
    inclusions: [
      "Dolore o fastidio toracico, precordiale o retrosternale atraumatico insorto di recente.",
      "Paziente cosciente, emodinamicamente stabile (Codice 3 o 4 al Triage).",
      "Presenza di caratteristiche atipiche o pz a basso/medio rischio cardiovascolare."
    ],
    
    exclusions: [
      "Dolore toracico oppressivo tipico conclamato con shock cardiogeno o arresto cardiaco -> Codice 1.",
      "Sospetta dissezione aortica acuta (dolore lancinante irradiato al dorso con asimmetria marcata dei polsi/PAO > 20 mmHg) -> Codice 1.",
      "Trauma toracico contusivo o penetrante recente (usare PPCI Trauma Toracico)."
    ],
    
    redFlags: [
      "ECG diagnostico per sopraslivellamento del tratto ST (STEMI) o nuovo blocco di branca sinistra (BBS).",
      "Sottoslivellamento marcato dell'ST (> 1 mm in due o più derivazioni contigue) o onde T iperacute negative simmetriche.",
      "Ipotensione sistemica (PAS < 90 mmHg), sudorazione algida profusa o sincope concomitante.",
      "Dolore toracico irradiato a entrambi gli arti superiori con dispnea acuta o desaturazione."
    ],
    
    operationalSteps: [
      {
        id: "toracico-step-1",
        title: "ECG a 12 Derivazioni con Visione Immediata (< 10 min)",
        timing: "T1 - Entro 10 min (CRITICO)",
        type: "ecg",
        actions: [
          "Esecuzione immediata dell'ECG a 12 derivazioni entro 10 min dall'ingresso.",
          "Visione tempestiva del tracciato da parte del medico NAVI entro i 10 minuti per escludere sindrome coronarica acuta con STEMI.",
          "Applicazione di monitor defibrillatore / monitor continuo delle derivazioni.",
          "Se presenti sintomi respiratori concomitanti (dispnea, tosse con espettorato, desaturazione): eseguire contestualmente EGA arterioso."
        ],
        snippet: "Eseguito ECG a 12 derivazioni entro 10 minuti dal T0 come da protocollo PPCI Dolore Toracico. Tracciato visionato immediatamente dal medico NAVI per validazione ischemica. Applicato monitoraggio multiparametrico continuo."
      },
      {
        id: "toracico-step-2",
        title: "Accesso Venoso & Profilo Urgenza con Troponina hs + BNP",
        timing: "T1 - < 20 min",
        type: "lab",
        actions: [
          "Posizionamento accesso venoso periferico (18G preferenziale).",
          "Prelievi ematici urgenza: Emocromo, Coagulazione, Elettroliti, Funzionalità renale/epatica, Troponina ad alta sensibilità (hs-cTn T0), BNP / NT-proBNP, D-Dimero se concordato per sospetta TEP.",
          "Valutazione del dolore toracico su scala NRS."
        ],
        snippet: "Reperito accesso venoso periferico. Eseguiti prelievi ematici profilo urgenza comprendenti curva della Troponina hs (T0) e BNP. Valutata intensità del dolore toracico su scala numerica NRS."
      },
      {
        id: "toracico-step-3",
        title: "Rx Torace Concordato & Gestione del Dolore",
        timing: "T1 - Concordato",
        type: "imaging",
        actions: [
          "Concordare con il medico NAVI/di guardia richiesta di Rx Torace standard in 2 proiezioni.",
          "Somministrazione di terapia sintomatica antalgica o nitroderivato sublinguale ESCLUSIVAMENTE previa indicazione medica e verifica di PAS > 100 mmHg."
        ],
        snippet: "Concordata con il medico di guardia ed inoltrata richiesta di Rx Torace. Somministrata terapia antalgica concordata con il medico NAVI previa verifica di adeguati valori pressori."
      }
    ],
    
    decisionNodes: [
      {
        id: "toracico-dec-1",
        question: "L'ECG evidenzia sopraslivellamento ST diagnostico per STEMI o ischemia acuta ad alto rischio?",
        options: [
          {
            label: "SÌ - Quadro di STEMI o Ischemia Acuta Grave",
            outcomeType: "area_critica",
            outcomeTitle: "Attivazione Rete Infarto / Trasferimento Immediato Emodinamica o Area Critica",
            description: "Immediata rivalutazione a Codice 1 Rosso. Allerta del cardiologo emodinamista di guardia per angioplastica coronarica primaria (PCI) d'emergenza e trasferimento immediato in Area Critica.",
            snippet: "Rilevato quadro elettrocardiografico diagnostico per STEMI acuto. Attivata immediatamente la Rete Infarto aziendale con allerta del Cardiologo Emodinamista e contestuale trasferimento urgente del paziente in Area Critica/Sala Rossa."
          },
          {
            label: "NO - ECG non diagnostico per STEMI, parametri stabili",
            outcomeType: "t2_attesa",
            outcomeTitle: "Attesa Presa in Carico Medica T2 (Curva Troponina)",
            description: "Tracciato ECG non indicativo di alterazioni ischemiche acute stabili, paziente asintomatico o con dolore modesto. Attesa referto Troponina T0 e presa in carico medica T2.",
            snippet: "Visionato il tracciato ECG: non si evidenziano alterazioni ischemiche acute o lesioni STEMI. Parametri emodinamici stabili. Notificato al medico di guardia. Paziente in attesa di dosaggio enzimatico (hs-cTn) e presa in carico medica T2."
          }
        ]
      }
    ]
  },
  {
    id: "trauma-toracico",
    number: 8,
    name: "Trauma Toracico Diretto",
    shortName: "Trauma Toracico",
    icon: "shield-alert",
    color: "#ea580c", // Orange-600
    badgeColor: "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300",
    applicableCodes: ["Codice 3 (Azzurro - Urgenza Differibile)", "Codice 4 (Verde - Urgenza Minore)"],
    targetT1: "Entro 20 min (EGA + ECG + Rx Torace ed Emitorace)",
    keywords: ["trauma", "torace", "costole", "frattura costale", "pnx", "pneumotorace", "ecg", "ega", "fast"],
    
    inclusions: [
      "Trauma contusivo isolato accidentale a carico del torace (es. caduta da altezza < 1 metro, contusione isolata da impatto a bassa dinamica).",
      "Paziente vigile e orientato con parametri emodinamici stabili.",
      "Codice 3 o 4 al Triage con dolore localizzato alla gabbia toracica o emitorace."
    ],
    
    exclusions: [
      "Politrauma o trauma ad alta dinamica (es. sbalzamento da veicolo, investimento pedone, caduta da altezza > 2 metri) -> Trauma Center.",
      "Shock Index (FC / PAS) > 0.7 o ipotensione sistemica conclamata -> Codice 1 / 2.",
      "Ferite penetranti o trapassanti del torace con soffio toracico."
    ],
    
    redFlags: [
      "Desaturazione (SpO2 < 92% in aria ambiente) o comparsa di dispnea ingravescente a riposo.",
      "Enfisema sottocutaneo palpabile (crepitio alla palpazione del collo o del torace) indicativo di PNX.",
      "Asimmetria marcata dell'espansione toracica o respiro paradosso (lembo toracico mobile da focolai di frattura multipli).",
      "Emottisi conclamata o Shock Index (FC / PAS) > 0.7.",
      "Trauma contusivo a livello dell'emicostato sinistro mediobasale (rischio di rottura di milza)."
    ],
    
    operationalSteps: [
      {
        id: "traumatorace-step-1",
        title: "Valutazione Parametri, Shock Index & Gestione Dolore",
        timing: "T0 - Immediato",
        type: "triage",
        actions: [
          "Rilevazione parametri vitali completi.",
          "Calcolo dello Shock Index: FC / PAS (se valore > 0.7 -> criterio di esclusione immediato ed invio in Area Critica).",
          "Valutazione della motilità della gabbia toracica, palpazione di crepiti (enfisema sottocutaneo) e valutazione scala NRS del dolore."
        ],
        snippet: "Attivato PPCI Trauma Toracico Diretto. Rilevati parametri vitali: Shock Index < 0.7 calcolato nella norma. Esclusi segni di enfisema sottocutaneo o respiro paradosso. Valutata scala del dolore toracico."
      },
      {
        id: "traumatorace-step-2",
        title: "ECG a 12 Derivazioni ed EGA (T1)",
        timing: "T1 - < 15 min",
        type: "ecg",
        actions: [
          "Esecuzione di ECG a 12 derivazioni per escludere contusione miocardica, anomalie di conduzione o commotio cordis.",
          "Esecuzione di EGA (venoso o arterioso) per determinazione di pO2, pCO2, rapporto P/F e lattati.",
          "Posizionamento accesso venoso periferico e prelievo urgenza (Emocromo, Coagulazione, Troponina hs)."
        ],
        snippet: "Eseguito ECG a 12 derivazioni (esclusi segni di contusione miocardica acuta) ed EGA per valutazione della riserva respiratoria e degli scambi gassosi. Posizionato CVP ed eseguiti prelievi ematici."
      },
      {
        id: "traumatorace-step-3",
        title: "Accertamenti Radiologici ed Ecografici Concordati",
        timing: "T1 - Concordato",
        type: "imaging",
        actions: [
          "Concordare con il medico NAVI/di guardia richiesta di Rx Torace standard e Rx Emitorace costale mirato.",
          "Se il trauma interessa l'emicostato sinistro medio-basale (dalla VII alla XII costa): concordare con il medico NAVI esecuzione tempestiva di Ecografia addome / FAST mirata ad escludere ematoma o lesione splenica traumatica."
        ],
        snippet: "Concordata con il medico di guardia richiesta radiologica di Rx Torace in 2P e Rx Emitorace costale. Richiesta ecografia mirata per trauma medio-basale per esclusione di lesioni parenchimali associate."
      }
    ],
    
    decisionNodes: [
      {
        id: "traumatorace-dec-1",
        question: "L'esame radiologico o ecografico evidenzia pneumotorace (PNX), emotorace o lesione d'organo addominale (milza)?",
        options: [
          {
            label: "SÌ - PNX / Emotorace o sospetta lesione d'organo",
            outcomeType: "area_critica",
            outcomeTitle: "Rivalutazione Triage Codice 1 o 2 -> Allerta Chirurgo / Area Critica",
            description: "Immediata rivalutazione a Codice 1 o 2. Trasferimento in Area Critica per eventuale posizionamento urgente di drenaggio toracico e valutazione chirurgica d'emergenza.",
            snippet: "Riscontrato reperto radiologico di pneumotorace / emotorace traumatico. Rivalutato il codice Triage a priorità superiore con immediata notifica al medico di guardia ed allerta del chirurgo per drenaggio pleurico."
          },
          {
            label: "NO - Frattura costale isolata composta o contusione semplice",
            outcomeType: "t2_attesa",
            outcomeTitle: "Attesa Presa in Carico Medica T2",
            description: "Assenza di PNX o emotorace, espansione polmonare regolare, parametri respiratori ed emodinamici stabili. Terapia antalgica e attesa T2.",
            snippet: "Visionati i referti radiologici: non si evidenziano pneumotorace, emotorace o focolai di frattura complicati. EGA e parametri stabili. Notificato al medico di guardia. Paziente in attesa di presa in carico medica T2."
          }
        ]
      }
    ]
  },
  {
    id: "trauma-arti",
    number: 9,
    name: "Trauma 4 Arti Distali",
    shortName: "Trauma 4 Arti",
    icon: "activity",
    color: "#14b8a6", // Teal-500
    badgeColor: "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300",
    applicableCodes: ["Codice 3 (Azzurro - Urgenza Differibile)", "Codice 4 (Verde - Urgenza Minore)"],
    targetT1: "Entro 30 min (Immobilizzazione + Rx concordato)",
    keywords: ["arto", "polso", "mano", "caviglia", "piede", "gomito", "ginocchio", "frattura", "distorsione", "rx"],
    
    inclusions: [
      "Trauma contusivo o distorsivo isolato a carico dei 4 arti distali: gomito, avambraccio, polso, mano/dita, ginocchio, gamba, caviglia, piede/dita.",
      "Trauma isolato a bassa dinamica, assenza di lesioni associate.",
      "Paziente cosciente, emodinamicamente stabile (Codici 3 e 4 al Triage)."
    ],
    
    exclusions: [
      "Gravidanza accertata (richiede cautele e consenso radiologico specialistico prima di esposizione a RX).",
      "Politrauma o trauma da precipitazione ad elevata energia.",
      "Fratture aperte / esposte con esposizione di monconi ossei o sanguinamento attivo -> Codice 2."
    ],
    
    redFlags: [
      "Assenza di polsi arteriosi a valle del trauma (polso radiale/ulnare o pedidio/tibiale non palpabile).",
      "Estremità fredda, pallida o cianotica con refill capillare ritardato (> 3 secondi) o assente.",
      "Deficit neurologico sensitivo-motorio periferico ingravescente a monte/valle.",
      "Sospetta sindrome compartimentale: dolore sproporzionato incoercibile esacerbato dallo stiramento passivo dei muscoli e tensione lignea dei compartimenti."
    ],
    
    operationalSteps: [
      {
        id: "traumaarti-step-1",
        title: "Valutazione Neurovascolare, Rimozione Monili & Immobilizzazione",
        timing: "T0 - Immediato",
        type: "triage",
        actions: [
          "Valutazione immediata dello stato neurovascolare distale: polsi periferici, temperatura, colorito, sensibilità tattile e mobilità delle dita.",
          "Rimozione immediata di tutti i monili (anelli, bracciali) dall'arto traumatizzato PRIMA dell'insorgenza di edema massivo.",
          "Immobilizzazione provvisoria dell'arto con idoneo tutore, stecca a depressione o doccia di cartone in posizione di scarico.",
          "Applicazione di crioterapia locale (borsa del ghiaccio sintetico protetta da telo) per 15-20 minuti ed elevazione dell'arto."
        ],
        snippet: "Attivato PPCI Trauma 4 Arti Distali. Valutata perfusione periferica e polsi distali presenti e validi. Rimossi anelli e monili dall'estremità interessata. Posizionato tutore di immobilizzazione provvisoria e applicato ghiaccio locale."
      },
      {
        id: "traumaarti-step-2",
        title: "Valutazione Gravidanza (Donne Fertili) & Esame Radiologico Concordato",
        timing: "T1 - < 25 min",
        type: "imaging",
        actions: [
          "Nelle donne in età fertile: verificare e accertare assenza di stato di gravidanza presunto o noto prima dell'invio ad esame radiologico.",
          "Concordare con il medico NAVI/di guardia la richiesta mirata dell'esame Rx per il segmento scheletrico interessato in almeno 2 proiezioni ortogonali.",
          "Valutazione del dolore su scala NRS e somministrazione di terapia antalgica concordata con il medico NAVI."
        ],
        snippet: "Escluso stato di gravidanza in donna fertile. Concordata con il medico di guardia ed inoltrata richiesta di esame radiologico mirato del distretto articolare. Somministrata terapia analgesica come da prescrizione medica NAVI."
      }
    ],
    
    decisionNodes: [
      {
        id: "traumaarti-dec-1",
        question: "L'esame radiologico evidenzia frattura ossea scomposta, lussazione articolare o impotenza funzionale grave?",
        options: [
          {
            label: "SÌ - Frattura scomposta / Lussazione evidente",
            outcomeType: "fast_track",
            outcomeTitle: "Consulenza Ortopedica Urgente / Manovra Riduttiva",
            description: "Richiesta urgente di consulenza ortopedica di PS per eventuale riduzione della frattura/lussazione in analgesia o confezionamento di apparecchio gessato.",
            snippet: "Rx distrettuale evidenzia focolai di frattura / lussazione articolare. Mantenuta immobilizzazione dell'arto. Richiesta consulenza ortopedica urgente per manovra riduttiva e confezionamento di apparecchio gessato definitivo."
          },
          {
            label: "NO - Rx negativo per fratture (trauma contusivo / distorsivo)",
            outcomeType: "t2_attesa",
            outcomeTitle: "Attesa Presa in Carico Medica T2 per Bendaggio / Dimissione",
            description: "Esame radiografico negativo per lesioni scheletriche acute. Applicazione di bendaggio elastico funzionale ad otto, istruzioni R.I.C.E. e attesa T2 per chiusura verbale.",
            snippet: "Visionato l'esame radiografico: assenza di lesioni scheletriche fratturative acute evidenti. Eseguito bendaggio elastico funzionale di sostegno e fornite indicazioni sul riposo e crioterapia. Paziente in attesa di presa in carico medica T2."
          }
        ]
      }
    ]
  },
  {
    id: "vomito-diarrea",
    number: 10,
    name: "Vomito / Diarrea",
    shortName: "Vomito / Diarrea",
    icon: "thermometer-snowflake",
    color: "#06b6d4", // Cyan-500
    badgeColor: "bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300",
    applicableCodes: ["Codice 3 (Azzurro - Urgenza Differibile)", "Codice 4 (Verde - Urgenza Minore)"],
    targetT1: "Entro 20 min (Accesso venoso + Reidratazione EV + EGA)",
    keywords: ["vomito", "diarrea", "gastroenterite", "disidratazione", "lattati", "pct", "fisiologica", "elettroliti"],
    
    inclusions: [
      "Paziente che presenta episodi ripetuti di vomito incoercibile e/o scariche diarroiche profuse.",
      "Segni di disidratazione lieve-moderata (secchezza delle fauci, sete, oliguria relativa).",
      "Paziente emodinamicamente stabile al Triage (Codici 3 e 4)."
    ],
    
    exclusions: [
      "Vomito cerebrale a getto conseguente a recente trauma cranico -> Codice 1 / 2 (Area Critica).",
      "Ematemesi attiva massiva o melena emorragica abbondante con instabilità emodinamica.",
      "Addome acuto peritonitico con arresto dell'alvo a gas e feci (occlusione intestinale acuta)."
    ],
    
    redFlags: [
      "Ipotensione arteriosa sistemica (PAS < 90 mmHg, PAM < 65 mmHg) o tachicardia marcata (> 120 bpm) non responsiva ai fluidi.",
      "Anuria conclamata o grave oliguria persistente.",
      "Alterazione acuta dello stato di coscienza, torpore, letargia o sonnolenza da grave squilibrio elettrolitico.",
      "Presenza all'EGA di grave acidosi metabolica con iperlattatemia (> 3.0 mmol/L) o ipokaliemia severa (< 2.8 mEq/L) con rischio aritmico."
    ],
    
    operationalSteps: [
      {
        id: "vomito-step-1",
        title: "Accesso Venoso & Avvio Idratazione con Soluzione Fisiologica 0.9%",
        timing: "T1 - < 15 min",
        type: "therapy",
        actions: [
          "Posizionamento di accesso venoso periferico di calibro adeguato (18G o 20G).",
          "Avvio immediato di idratazione parenterale con Soluzione Fisiologica (NaCl 0.9%) 500 ml EV a deflusso rapido (salvo controindicazioni cardiologiche per insufficienza cardiaca severa).",
          "Rilevazione parametri vitali completi e temperatura corporea."
        ],
        snippet: "Attivato PPCI Vomito/Diarrea. Reperito accesso venoso periferico. Avviata infusione endovenosa di NaCl 0.9% 500 ml come da protocollo aziendale di riequilibrio idro-elettrolitico."
      },
      {
        id: "vomito-step-2",
        title: "Prelievi Urgenza ed EGA Venoso (con PCT se Febbre)",
        timing: "T1 - < 20 min",
        type: "lab",
        actions: [
          "Prelievi ematici urgenza: Emocromo con formula, Elettroliti sierici (sodio, potassio, cloro), Funzionalità renale (Creatinina, Urea), Glicemia.",
          "Esecuzione di EGA Venoso per valutazione immediata dell'equilibrio acido-base e dei lattati.",
          "Se la temperatura corporea è TC > 38°C: prelevare provetta per Procalcitonina (PCT) ed attivare in parallelo le procedure del PPCI Febbre."
        ],
        snippet: "Eseguiti prelievi ematici per profilo urgenza ed assetto elettrolitico. Eseguito EGA venoso di controllo acido-base e lattati. Inviati campioni al laboratorio analisi."
      },
      {
        id: "vomito-step-3",
        title: "Terapia Antiemetica Sintomatica Concordata",
        timing: "T1 - < 30 min",
        type: "therapy",
        actions: [
          "Concordare con il medico NAVI/di guardia la somministrazione di terapia antiemetica sintomatica endovenosa (es. Metoclopramide 10 mg EV o Ondansetron 4 mg EV secondo scheda clinica e controindicazioni)."
        ],
        snippet: "Somministrata terapia antiemetica endovenosa su indicazione e prescrizione del medico NAVI per il controllo della sintomatologia emetica."
      }
    ],
    
    decisionNodes: [
      {
        id: "vomito-dec-1",
        question: "L'EGA evidenzia grave acidosi metabolica, iperlattatemia o squilibri elettrolitici severi (K < 3.0 mEq/L, insufficienza renale acuta)?",
        options: [
          {
            label: "SÌ - Squilibri metabolici/elettrolitici severi riscontrati",
            outcomeType: "area_critica",
            outcomeTitle: "Notifica Urgente Medico di Guardia per Terapia di Ripristino",
            description: "Avviso immediato del medico. Rivalutazione del volume idroelettrolitico, reintegro di potassio e monitoraggio dei parametri emodinamici e diuresi.",
            snippet: "Riscontrati valori critici all'EGA venoso (acidosi metabolica con iperlattatemia / disionemia). Notificato tempestivamente al medico di guardia per prosecuzione della terapia correttiva ed eventuale ricovero."
          },
          {
            label: "NO - EGA e parametri stabili, regressione del vomito",
            outcomeType: "t2_attesa",
            outcomeTitle: "Attesa Presa in Carico Medica T2",
            description: "Paziente idratato, miglioramento soggettivo dei sintomi, tolleranza di piccoli sorsi d'acqua per os a fine infusione, parametri stabili. Attesa T2.",
            snippet: "Visionati i referti di laboratorio ed EGA: assenza di gravi squilibri acido-base o idroelettrolitici. Sintomatologia emetica controllata. Notificato al medico di guardia. Paziente in attesa di presa in carico medica T2."
          }
        ]
      }
    ]
  },
  {
    id: "epistassi",
    number: 11,
    name: "Epistassi",
    shortName: "Epistassi",
    icon: "wind",
    color: "#e11d48", // Rose-600
    badgeColor: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
    applicableCodes: ["Codice 3 (Azzurro - Urgenza Differibile)", "Codice 4 (Verde - Urgenza Minore)"],
    targetT1: "Entro 10-15 min (Compressione + Tamponamento con Tranex)",
    keywords: ["epistassi", "naso", "sangue", "tranex", "acido tranexamico", "orl", "tamponamento", "pressione"],
    
    inclusions: [
      "Sanguinamento ematico attivo dalle fosse nasali (anteriore o bilaterale).",
      "Paziente cosciente ed orientato con parametri emodinamici stabili (Codici 3 e 4).",
      "Epistassi spontanea o susseguente a trauma facciale minore isolato."
    ],
    
    exclusions: [
      "Trauma cranio-facciale maggiore ad alta cinematica con sospetto di frattura della base cranica o rinoliquorrea -> Codice 1 / 2.",
      "Instabilità emodinamica con shock emorragico (PAS < 90 mmHg, polso piccolo e frequente)."
    ],
    
    redFlags: [
      "Epistassi massiva a getto o posteriore con impossibilità a contenere il flusso e deglutizione continua di abbondante sangue.",
      "Ostruzione delle vie aeree o rischio di inalazione ematica con comparsa di tosse, stridore o desaturazione.",
      "Grave crisi ipertensiva non controllata (PA sistolica > 200 mmHg o PA diastolica > 120 mmHg).",
      "Paziente in terapia anticoagulante orale (Warfarin/DOAC) con INR marcatamente sovraterapeutico o diatesi emorragica grave."
    ],
    
    operationalSteps: [
      {
        id: "epistassi-step-1",
        title: "Posizionamento Posturale Corretto & Compressione Meccanica",
        timing: "T0 - Immediato",
        type: "therapy",
        actions: [
          "Posizionare il paziente rigorosamente seduto (o semiseduto) con la testa leggermente inclinata in AVANTI (MAI estesa all'indietro per evitare ingestione o inalazione di sangue).",
          "Invitare il paziente ad evacuare delicatamente i coaguli soffiando una sola volta con delicatezza.",
          "Eseguire compressione bimanuale continua e costante delle ali nasali contro il setto per almeno 5-10 minuti consecutivi con l'orologio alla mano.",
          "Applicare ghiaccio o impacchi freddi sulla radice del naso e sulla nuca per favorire la vasocostrizione riflessa."
        ],
        snippet: "Attivato PPCI Epistassi. Paziente posizionato seduto con capo flesso in avanti; evacuati coaguli dalle cavità nasali ed eseguita compressione continua delle ali nasali per oltre 5 minuti associata a crioterapia locale."
      },
      {
        id: "epistassi-step-2",
        title: "Tamponamento Anteriore con Acido Tranexamico (se Persiste)",
        timing: "T1 - < 15 min",
        type: "therapy",
        actions: [
          "Se il sanguinamento persiste dopo compressione digitale continua: procedere al tamponamento nasale anteriore di prima istanza introducendo una garza orlata o tampone espandibile (Merocel) imbevuto di Acido Tranexamico (fiala da 500 mg).",
          "Monitoraggio dei parametri vitali con particolare attenzione alla Pressione Arteriosa (PAO) e frequenza cardiaca."
        ],
        snippet: "Persistendo stillicidio ematico, eseguito tamponamento nasale anteriore con idoneo presidio imbevuto di soluzione di Acido Tranexamico. Verificata stabilità emodinamica e valori pressori."
      },
      {
        id: "epistassi-step-3",
        title: "Accesso Venoso & Prelievi Coagulativi Urgenza + EGA Venoso",
        timing: "T1 - < 20 min",
        type: "lab",
        actions: [
          "Posizionamento accesso venoso periferico.",
          "Prelievi ematici: Emocromo con conta piastrinica, Coagulazione completa (PT/INR, aPTT, fibrinogeno), Biochimica generale.",
          "Esecuzione di EGA Venoso per monitoraggio rapido dell'emoglobina e stato acido-base."
        ],
        snippet: "Posizionato accesso venoso periferico ed eseguiti prelievi ematici urgenza con particolare riguardo a emocromo e profilo coagulativo (PT/INR, aPTT). Eseguito EGA venoso di controllo."
      }
    ],
    
    decisionNodes: [
      {
        id: "epistassi-dec-1",
        question: "Il sanguinamento si è completamente arrestato dopo tamponamento/compressione e i parametri emodinamici sono stabili?",
        options: [
          {
            label: "SÌ - Arresto del sanguinamento e parametri stabili",
            outcomeType: "fast_track",
            outcomeTitle: "Invio a Percorso Fast Track Specialistico ORL",
            description: "Sanguinamento anteriore controllato, emocromo e coagulazione nei range accettabili. Avvio della scheda Fast Track per visita specialistica Otorinolaringoiatrica (ORL) per cauterizzazione o rimozione protetta del tampone.",
            snippet: "Sanguinamento nasale arrestato con successo tramite tamponamento anteriore. Parametri emodinamici stabili. Paziente indirizzato al percorso Fast Track Specialistico ORL per valutazione rinosinusale di competenza."
          },
          {
            label: "NO - Sanguinamento incoercibile / sospetta epistassi posteriore",
            outcomeType: "area_critica",
            outcomeTitle: "Chiamata Urgente Specialista ORL / Rivalutazione Medico PS",
            description: "Persistenza di copioso sanguinamento posteriore, discesa di sangue nel faringe, comparsa di instabilità emodinamica o marcata anemizzazione. Allerta immediata dello specialista ORL per tamponamento posteriore con palloncino o emostasi chirurgica.",
            snippet: "Sanguinamento persistente non arrestato dalle manovre di primo livello, sospetta epistassi posteriore. Informato tempestivamente il medico di guardia ed attivata consulenza urgente Otorinolaringoiatrica (ORL) al letto del paziente."
          }
        ]
      }
    ]
  },
  {
    id: "rau",
    number: 12,
    name: "Ritenzione Acuta di Urine (RAU)",
    shortName: "Ritenzione Urine (RAU)",
    icon: "database",
    color: "#4f46e5", // Indigo-600
    badgeColor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300",
    applicableCodes: ["Codice 3 (Azzurro - Urgenza Differibile)", "Codice 4 (Verde - Urgenza Minore)"],
    targetT1: "Entro 15 min (Cateterismo vescicale evacuativo con Foley)",
    keywords: ["rau", "urina", "globo", "vescica", "catetere", "foley", "prostata", "ristagno", "disuria"],
    
    inclusions: [
      "Paziente che presenta impossibilità improvvisa e completa alla minzione associata a dolore/tensione ipogastrica ingravescente.",
      "Obiettività di globo vescicale palpabile o confermato ecograficamente alla loggia ipogastrica.",
      "Paziente emodinamicamente stabile (Codici 3 e 4 al Triage)."
    ],
    
    exclusions: [
      "Sospetta lesione traumatica dell'uretra (presenza di sangue al meato uretrale esterno - uretrorragia, ematoma perineale o scrotale da frattura del bacino -> Controindicazione assoluta a cateterismo alla cieca, riservato all'Urologo).",
      "Pazienti reduci da chirurgia urologica recente maggiore (es. prostatectomia radicale, anastomosi uretrale recente)."
    ],
    
    redFlags: [
      "Quadro di globo vescicale associato a febbre settica elevata con brivido (urosepsi acuta) e ipotensione sistemica -> Codice 1 / 2.",
      "Uretrorragia conclamata o presenza di marcato falso lume uretrale da pregressi tentativi incongrui.",
      "Comparsa di lipotimia o reazione vagale profonda da svuotamento vescicale eccessivamente repentino."
    ],
    
    operationalSteps: [
      {
        id: "rau-step-1",
        title: "Conferma Globo Vescicale & Cateterismo Vescicale con Foley",
        timing: "T1 - < 15 min (CRITICO)",
        type: "therapy",
        actions: [
          "Verifica obiettiva del globo vescicale mediante palpazione e percussione dell'ipogastrio o mediante Bladder Scan ecografico.",
          "Preparazione sterile e lubrificazione dell'uretra con gel anestetico sterile (lidocaina).",
          "Posizionamento di catetere vescicale a permanenza Foley in silicone/latex (calibro ch 14-16 o secondo conformazione anatomica) con rigorosa tecnica asettica.",
          "Gonfiaggio del palloncino con 10 ml di acqua distillata e connessione a sacca di raccolta graduata a circuito chiuso."
        ],
        snippet: "Attivato PPCI RAU. Rilevato globo vescicale palpabile e dolente in ipogastrio. Con tecnica asettica e previa instillazione di gel anestetico, posizionato catetere vescicale Foley Ch 14/16 a circuito chiuso. Manovra eseguita senza complicanze."
      },
      {
        id: "rau-step-2",
        title: "Misurazione del Ristagno Vescicale & Prevenzione 'Ex Vacuo'",
        timing: "T1 - < 20 min",
        type: "monitoring",
        actions: [
          "Misurazione quantitativa immediata del volume di urine drenato nella sacca graduata.",
          "IMPORTANTE: Se il ristagno urinario supera i 700-1000 ml, procedere allo svuotamento frazionato (clampare il deflusso ogni 400-500 ml per 15 minuti) per prevenire complicanze da emorragia 'ex vacuo' e collasso ipotensivo neurovegetativo.",
          "Esecuzione di stick chimico-fisico delle urine drenate per rilevare leucociti, nitriti, proteine ed ematuria.",
          "Valutazione della regressione della sintomatologia dolorosa ipogastrica."
        ],
        snippet: "Drenato ristagno urinario di [Volume] ml con immediato sollievo della sintomatologia algica ipogastrica. Svuotamento eseguito con cautela per prevenzione emorragia ex vacuo. Eseguito stick chimico-fisico urine."
      },
      {
        id: "rau-step-3",
        title: "Gestione Ematuria Macroscopica Eventuale",
        timing: "T1 - Se necessario",
        type: "lab",
        actions: [
          "Se le urine drenate si presentano francamente ematiche con coaguli (ematuria macroscopica conclamata): posizionare accesso venoso ed eseguire prelievi ematici (Emocromo, Coagulazione, Creatinina, Azotemia) ed EGA venoso per HGB."
        ],
        snippet: "Verificate caratteristiche macroscopiche delle urine. In presenza di ematuria, posizionato CVP ed eseguiti prelievi ematici d'urgenza comprensivi di emocromo, coagulazione, funzione renale ed EGA venoso."
      }
    ],
    
    decisionNodes: [
      {
        id: "rau-dec-1",
        question: "Il ristagno urinario è stato drenato con successo, con immediato beneficio e ASSENZA di ematuria macroscopica o complicanze?",
        options: [
          {
            label: "SÌ - Svuotamento efficace, urine chiare, assenza di ematuria",
            outcomeType: "fast_track",
            outcomeTitle: "Percorso Fast Track Urologico / Dimissione con Catetere",
            description: "Paziente con parametri normali, urine limpide senza ematuria, sintomatologia algica azzerata. Indirizzamento al Fast Track specialistico Urologico o dimissione con catetere a dimora, sacca da gamba e prescrizione visita urologica per rimozione protetta.",
            snippet: "Drenaggio urinario avvenuto regolarmente con risoluzione completa della sintomatologia. Urine limpide, assenza di ematuria macroscopica. Paziente con parametri vitali stabili indirizzato a percorso Fast Track Specialistico Urologico."
          },
          {
            label: "NO - Ematuria con coaguli, dolore persistente o impossibilità al cateterismo",
            outcomeType: "area_critica",
            outcomeTitle: "Notifica Medico NAVI / Transizione PPCI Addome o Visita Urologica",
            description: "Persistenza di dolore nonostante il drenaggio, comparsa di ematuria massiva o ostacolo insormontabile all'introduzione del catetere (stenosi/falso lume). Avviso immediato del medico di PS per transizione al PPCI Dolore Addominale e chiamata urologo d'urgenza.",
            snippet: "Evidenziata ematuria macroscopica / dolore persistente / difficoltà di cateterismo. Informato tempestivamente il medico di guardia per rivalutazione clinica, gestione del PPCI Dolore Addominale e chiamata consulenza urologica d'urgenza."
          }
        ]
      }
    ]
  },
  {
    id: "febbre",
    number: 13,
    name: "Febbre",
    shortName: "Febbre",
    icon: "flame",
    color: "#f97316", // Orange-500
    badgeColor: "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300",
    applicableCodes: ["Codice 3 (Azzurro - Urgenza Differibile)", "Codice 4 (Verde - Urgenza Minore)"],
    targetT1: "Entro 30 min (Accesso venoso + Prelievi + PCT + EGA)",
    keywords: ["febbre", "temperatura", "tc", "sepsi", "emocolture", "paracetamolo", "pct", "procalcitonina", "infezione"],
    
    inclusions: [
      "Paziente che presenta febbre con Temperatura Corporea (TC) > 38.0°C riscontrata al Triage.",
      "Oppure paziente apirettico al momento della visita ma con anamnesi di picco febbrile > 38.0°C nelle ultime 4 ore post-antipiretico.",
      "Paziente vigile e orientato con parametri emodinamici stabili (Codici 3 e 4)."
    ],
    
    exclusions: [
      "Quadro clinico suggestivo di SEPSI GRAVE o SHOCK SETTICO: qSOFA >= 2 (Frequenza Respiratoria > 22 atti/min, Alterazione stato di coscienza/GCS < 15, Pressione Arteriosa Sistolica PAS <= 100 mmHg) -> Codice 1 / 2 (Area Critica).",
      "Rigidità nucale con segni meningei conclamati o rash petecchiale a rapida estensione (sospetta meningococcemia) -> Area Critica e Isolamento immediato."
    ],
    
    redFlags: [
      "Ipotensione arteriosa sistemica (PAS < 90 mmHg, PAM < 65 mmHg) o lattati all'EGA > 2.0 mmol/L (segno cardinale di sepsi/shock settico).",
      "Tachipnea marcata (> 24 atti/min) con distress respiratorio o desaturazione (SpO2 < 92%).",
      "Comparsa di petecchie, porpora o lesioni emorragiche cutanee.",
      "Alterazione acuta dello stato mentale (disorientamento, sopore, delirium febbrile nell'anziano)."
    ],
    
    operationalSteps: [
      {
        id: "febbre-step-1",
        title: "Accesso Venoso, Profilo Urgenza con PCT ed Emocolture",
        timing: "T1 - < 15 min",
        type: "lab",
        actions: [
          "Reperimento di accesso venoso periferico.",
          "Prelievi ematici urgenza: Emocromo con formula leucocitaria, PCR e Procalcitonina (PCT), Elettroliti, Funzionalità renale ed epatica.",
          "IMPORTANTE: Se indicato dal medico NAVI per sospetta sepsi/infezione sistemica, eseguire 2 set di EMOCOLTURE (2 flaconi per aerobi + 2 per anaerobi da 2 accessi venosi distinti) TASSATIVAMENTE PRIMA dell'eventuale avvio di terapia antibiotica."
        ],
        snippet: "Attivato PPCI Febbre per TC > 38°C. Reperito accesso venoso periferico. Eseguiti prelievi ematici profilo urgenza comprendenti biomarcatori infiammatori (PCR, Procalcitonina PCT). Eseguiti set di emocolture prima di qualsiasi terapia antibiotica."
      },
      {
        id: "febbre-step-2",
        title: "EGA Venoso/Arterioso ed Esame Urine al Letto del Paziente",
        timing: "T1 - < 20 min",
        type: "lab",
        actions: [
          "Esecuzione di EGA Venoso (o EGA Arterioso se presenti sintomi respiratori o desaturazione) con focus su Lattati, pH e compenso metabolico.",
          "Raccolta di campione di urina ed esecuzione immediata di esame chimico-fisico mediante stick al point-of-care (leucociti, nitriti, proteine per sospetta ITU)."
        ],
        snippet: "Eseguito EGA per determinazione acido-base e dosaggio dei lattati. Raccolto campione urine ed eseguito stick chimico-fisico (positivo/negativo per indici di infezione delle vie urinarie)."
      },
      {
        id: "febbre-step-3",
        title: "Trattamento Sintomatico Antipiretico Concordato",
        timing: "T1 - < 30 min",
        type: "therapy",
        actions: [
          "Se TC > 38.0°C con malessere generale: somministrazione di terapia antipiretica su prescrizione del medico NAVI (es. Paracetamolo 1g EV in 100 ml di fisiologica in 15 minuti).",
          "Monitoraggio della defervescenza e della frequenza cardiaca a 30-60 minuti."
        ],
        snippet: "Rilevata TC > 38°C associata a brivido. Somministrata terapia antipiretica con Paracetamolo 1g EV su indicazione e prescrizione del medico NAVI. Paziente mantenuto a riposo con monitoraggio della temperatura."
      }
    ],
    
    decisionNodes: [
      {
        id: "febbre-dec-1",
        question: "I parametri o l'EGA mostrano segni di sepsi sistemica (lattati > 2 mmol/L, ipotensione PAS < 90, ipossia o PCT marcatamente elevata)?",
        options: [
          {
            label: "SÌ - Sospetta Sepsi Sistemica / Lattati elevati",
            outcomeType: "area_critica",
            outcomeTitle: "Rivalutazione Codice 1 o 2 -> Bundle Sepsi & Area Critica",
            description: "Immediata rivalutazione a priorità superiore (Codice 1 o 2). Allerta immediata del medico di guardia per avvio del protocollo Sepsis Bundle (fluidoterapia 30 ml/kg EV, terapia antibiotica mirata ad ampio spettro e monitoraggio diuresi oraria).",
            snippet: "Riscontrati segni di allarme per sepsi sistemica (iperlattatemia > 2 mmol/L / ipotensione / tachipnea). Effettuata rivalutazione immediata del codice Triage con attribuzione di priorità superiore e immediato trasferimento in Area Critica per avvio Sepsis Bundle."
          },
          {
            label: "NO - Paziente emodinamicamente stabile, defervescenza in corso",
            outcomeType: "t2_attesa",
            outcomeTitle: "Attesa Presa in Carico Medica T2",
            description: "Parametri vitali stabili, assenza di acidosi o iperlattatemia, temperatura corporea in diminuzione dopo terapia antipiretica. Attesa referti ematochimici e presa in carico medica T2.",
            snippet: "Visionati i referti dell'EGA: lattati ed equilibrio acido-base nella norma. Parametri emodinamici stabili a riposo, progressiva defervescenza dopo terapia sintomatica. Notificato al medico di guardia. Paziente in attesa di presa in carico medica T2."
          }
        ]
      }
    ]
  }
];

export const GENERAL_SNIPPETS = [
  {
    category: "Presa in Carico / Inizio PPCI",
    title: "Attivazione Standard PPCI",
    text: "Attivato PPCI per [Sintomo/Protocollo]. Rilevati parametri vitali, eseguita valutazione iniziale e informato il medico NAVI."
  },
  {
    category: "Monitoraggio & Esami",
    title: "Esecuzione ECG ed EGA (T1)",
    text: "Eseguito ECG a 12 derivazioni ed EGA entro 10 minuti dal T0. Tracciato ed emogasanalisi sottoposti a visione del medico NAVI per validazione."
  },
  {
    category: "Accesso Venoso & Laboratorio",
    title: "Accesso Venoso e Prelievo Urgenza",
    text: "Reperito accesso venoso periferico. Eseguiti prelievi ematici secondo profilo urgenza e inviati al laboratorio analisi."
  },
  {
    category: "Terapia & Sintomi",
    title: "Valutazione e Gestione Dolore",
    text: "Valutata scala del dolore (NRS/VAS). Somministrata terapia antalgica su indicazione del medico NAVI."
  },
  {
    category: "Diagnostica per Immagini",
    title: "Richiesta Esami Radiologici / Ecografici",
    text: "Concordata con il medico di guardia ed inoltrata richiesta di esami radiologici/ecografici come da protocollo aziendale."
  },
  {
    category: "Esiti & Presa in Carico Medica",
    title: "Esami Visionati Senza Alterazioni Acute (T2)",
    text: "Visionati i referti degli esami ematochimici/strumentali effettuati in PPCI: non si evidenziano alterazioni acute rilevanti. Notificato al medico di guardia. Paziente in attesa di presa in carico medica (T2)."
  },
  {
    category: "Esiti & Presa in Carico Medica",
    title: "Esami Alterati / Notifica Medico",
    text: "Visionati i referti degli esami ematochimici/strumentali: riscontrati valori alterati rispetto alla norma. Informato tempestivamente il medico di guardia per le valutazioni di competenza."
  },
  {
    category: "Allerta & Escalation",
    title: "Red Flag / Rivalutazione Triage Codice 1 o 2",
    text: "Rilevato segno/sintomo di allarme (Red Flag). Effettuata rivalutazione del codice Triage con l'assegnazione di priorità superiore e immediata notifica al medico per invio in Area Critica."
  },
  {
    category: "Percorsi Dedicati",
    title: "Fast Track Specialistico (ORL/Urologico/Ortopedico)",
    text: "Eseguite procedure di prima istanza da protocollo. Paziente con parametri stabili indirizzato a percorso Fast Track Specialistico."
  }
];
