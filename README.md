# NaviFlow - PPCI Pronto Soccorso

**Applicazione PWA (Progressive Web App) 100% Offline per Infermieri di Pronto Soccorso e Nucleo NAVI (Nucleo Avanzato di Valutazione e Intervento)**  
Basata sul Documento Aziendale **ARNAS Civico Rev. 1**.

---

## 🚑 Panoramica Clinica ed Obiettivi

**NaviFlow** nasce per supportare i professionisti sanitari di Pronto Soccorso (in particolare gli infermieri del Nucleo NAVI) nella consultazione rapida e standardizzata dei **13 Protocolli di Presa in Carico Infermieristica (PPCI)** aziendali e nella compilazione immediata del diario della cartella clinica ospedaliera tramite snippet precompilati con un solo tocco ("One-Tap Copy").

### Caratteristiche Principali
- **Funzionamento 100% Offline**: Non richiede connessione Internet dopo il primo caricamento o salvataggio in cache.
- **Installabile come PWA**: Installazione nativa su iOS (iPhone/iPad), Android e Desktop.
- **Mobile-First & Uso ad Una Mano**: Ergonomia progettata per contesti ad alto stress, turni notturni e ambienti ad alta intensità di cure.
- **Dark Mode ad Alto Contrasto**: Modalità scura ottimizzata per sale triage a bassa luminosità.
- **Red Flags Evidenziate**: Riconoscimento immediato dei criteri di allarme per rivalutazione del Triage ed escalation immediata in **Area Critica (Codice 1 o 2)**.
- **Snodi Decisionali Interattivi**: Algoritmi guidati (Sì / No) che conducono al percorso appropriato (*Area Critica*, *Attesa Presa in Carico Medica T2*, o *Fast Track Specialistico*).
- **Modulo "Snippet Diario Clinico"**: Copia istantanea delle diciture formali per la cartella clinica con feedback visivo ("Copiato!") e vibrazione tattile.
- **Generatore Integrato di Cartella**: Unione automatica di tutte le azioni spuntate in una nota clinica completa cronologica pronta per essere incollata nel gestionale di PS.

---

## 📋 I 13 Protocolli di Presa in Carico Infermieristica (PPCI)

1. **PPCI #1 - Anemia**: HGB &lt; 7 g/dL (o &lt; 8 con comorbidità). Prelievo urgenza (senza troponina) + EGA venoso + provetta Banca Sangue per Tipo &amp; Screen. Richiesta Emazie Concentrate (EC).
2. **PPCI #2 - Dispnea**: ECG 12 derivazioni + EGA obbligatori entro 10 min. Target T1 &lt; 10 min. Se alterati -&gt; Rivalutazione Codice 1 o 2 -&gt; Area Critica. Se nella norma -&gt; Prelievi urgenza + BNP.
3. **PPCI #3 - Frattura di Femore**: Arto accorciato ed extraruotato. Rx Bacino per anche, Rx Femore e Rx Torace concordati con medico NAVI + EGA venoso + 2 EC disponibili alla Banca Sangue + Analgesia precoce.
4. **PPCI #4 - Dolore Addominale**: Esclusione preliminare RAU. ECG per dolore quadranti superiori. Profilo epato-biliare + lipasi + PCT + EGA venoso. Beta-HCG in donne fertili.
5. **PPCI #5 - Alterazione Stato di Coscienza**: Sincope/lipotimia anamnestica regredita (GCS 15 al Triage). Target T1 &lt; 10 min per ECG 12 derivazioni, EGA e stick glicemico. Esclusione deficit neurologici focali in atto.
6. **PPCI #6 - Cardiopalmo**: Palpitazioni in pz emodinamicamente stabile. Target T1 &lt; 10 min per ECG 12 derivazioni. Prelievi urgenza con dosaggio ionico (K+, Mg2+) ed EGA.
7. **PPCI #7 - Dolore Toracico (Atraumatico)**: Target T1 &lt; 10 min con ECG 12 derivazioni immediato. Curva Troponina hs (T0), BNP, Rx Torace concordato e gestione dolore. Esclusione STEMI con Rete Infarto.
8. **PPCI #8 - Trauma Toracico Diretto**: Trauma isolato a bassa dinamica. Esclusione Shock Index &gt; 0.7. ECG 12 derivazioni + EGA + Rx Torace ed Emitorace (+ Ecografia FAST per emicostato sn).
9. **PPCI #9 - Trauma 4 Arti Distali**: Gomito/avambraccio/polso/mano, ginocchio/gamba/caviglia/piede. Valutazione neurovascolare distale, rimozione monili, crioterapia, immobilizzazione provvisoria e Rx concordata.
10. **PPCI #10 - Vomito / Diarrea**: Accesso venoso periferico + infusione NaCl 0.9% 500 ml EV + profilo urgenza + EGA venoso (con PCT se TC &gt; 38°C). Terapia antiemetica concordata.
11. **PPCI #11 - Epistassi**: Capo reclinato in avanti, evacuazione coaguli, compressione continua 5-10 min. Se persiste: tamponamento anteriore con Acido Tranexamico. Prelievi coagulativi ed eventuale Fast Track ORL.
12. **PPCI #12 - Ritenzione Acuta di Urine (RAU)**: Globo vescicale dolente. Cateterismo vescicale con Foley ch 14-16 sterile. Misurazione del ristagno (svuotamento graduale anti-emorragia ex vacuo). Fast Track Urologico se assente ematuria.
13. **PPCI #13 - Febbre**: TC &gt; 38°C o picco nelle 4 ore precedenti. Accesso venoso, indici di flogosi (PCR e PCT), 2 set di emocolture PRIMA dell'antibiotico, stick urine ed EGA venoso/arterioso. Trattamento antipiretico concordato.

---

## 🚀 Come Avviare l'Applicazione Subito

L'applicazione è progettata come **Zero-Build Vanilla PWA**: non ha tempi di compilazione né dipende da installazioni di pacchetti per funzionare.

### Modalità Rapida (Server Locale)
Dal terminale nella cartella del progetto:
```bash
python3 -m http.server 3000
```
Apri il browser su:  
👉 **http://localhost:3000**

Oppure con Node:
```bash
npx serve .
```

---

## 📱 Guida all'Installazione come PWA su Dispositivi Mobili

### Su iPhone / iPad (iOS Safari)
1. Apri **Safari** e naviga all'indirizzo dell'app (es. `http://<ip-locale>:3000` o l'URL hostato).
2. Tocca l'icona **Condividi** (il quadrato con la freccia rivolta verso l'alto nella barra inferiore di Safari).
3. Scorri le opzioni e tocca **"Aggiungi a schermata Home"**.
4. Conferma con **"Aggiungi"**: l'icona ad alta risoluzione di **NaviFlow** comparirà sulla Home di iOS e si aprirà a schermo intero senza barre del browser.

### Su Android (Google Chrome)
1. Apri **Chrome** e naviga all'indirizzo dell'app.
2. Comparirà automaticamente il pulsante **"Installa"** nella barra superiore di NaviFlow, oppure tocca i tre puntini in alto a destra e seleziona **"Installa applicazione"** / **"Aggiungi a schermata Home"**.
3. L'app verrà installata come applicazione autonoma con supporto offline completo.

---

## 📁 Architettura dei File

```text
├── index.html                   # Interfaccia PWA completa (HTML5 semantico, accessibile)
├── manifest.json                # Configurazione Web App Manifest PWA (display standalone)
├── sw.js                        # Service Worker per caching completo 100% offline
├── css/
│   └── styles.css               # Sistema UI moderno, Tailwind-compatible, Dark & Light Mode
├── js/
│   └── app.js                   # Logica applicativa, ricerca istantanea, clipboard API, PWA
├── data/
│   ├── protocols.js             # Database completo dei 13 PPCI con snippet clinici (ESM)
│   └── protocols.ts             # Tipi TypeScript e interfaccia dati per progetti React/Next.js
├── components/                  # Componenti React TypeScript modulari per future integrazioni
│   ├── Navbar.tsx               # Header, toggle tema, stato PWA, ricerca
│   ├── ProtocolCard.tsx         # Card protocollo per la griglia
│   ├── ProtocolDetail.tsx       # Vista interattiva step-by-step con snodi decisionali
│   └── SnippetCopyButton.tsx    # Pulsante isolato con feedback di copia animato
└── icons/
    ├── icon.svg                 # Icona vettoriale dell'app (Croce medica, tracciato ECG)
    ├── icon-192.png             # Icona raster PWA 192x192
    └── icon-512.png             # Icona raster PWA 512x512
```

---

## 🩺 Conformità Medica e Note Operative
Tutte le procedure e gli snippet rispecchiano le buone pratiche di Medicina d'Emergenza e Triage secondo gli standard del Nucleo NAVI e le delibere aziendali ARNAS Civico Rev. 1.
Le azioni invasive o le richieste radiologiche/ecografiche riportano sempre l'esplicita indicazione di **"Concordate con il medico NAVI / di guardia"**.
