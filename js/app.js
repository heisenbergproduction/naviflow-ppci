/**
 * NaviFlow - PPCI Pronto Soccorso
 * Main Application Logic (100% Offline, Pure Modern JS / ESM)
 */

import { PROTOCOLS, GENERAL_SNIPPETS } from '../data/protocols.js';

// SVG Icons Dictionary (Lucide-compatible offline SVGs)
const ICONS = {
  search: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  clear: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  copy: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
  check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  back: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`,
  clock: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  alertTriangle: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  checkCircle: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
  xCircle: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
  sun: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
  moon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
  download: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
  fileText: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
  arrowRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`,
  droplet: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>`,
  wind: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path></svg>`,
  bone: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 10c.7-.7 1.6-1 2.5-1a3.5 3.5 0 1 1 0 7c-.9 0-1.8-.3-2.5-1l-10 10c-.7.7-1.6 1-2.5 1a3.5 3.5 0 1 1 0-7c.9 0 1.8.3 2.5 1l10-10z"></path></svg>`,
  activity: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
  brain: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54z"></path></svg>`,
  heartPulse: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"></path></svg>`,
  shieldAlert: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
  thermometer: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>`,
  database: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`,
  flame: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`,
  stethoscope: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path><circle cx="20" cy="10" r="2"></circle></svg>`
};

function getProtocolIcon(iconName) {
  switch (iconName) {
    case 'droplet': return ICONS.droplet;
    case 'wind': return ICONS.wind;
    case 'bone': return ICONS.bone;
    case 'activity': return ICONS.activity;
    case 'brain': return ICONS.brain;
    case 'heart-pulse': return ICONS.heartPulse;
    case 'shield-alert': return ICONS.shieldAlert;
    case 'thermometer-snowflake': return ICONS.thermometer;
    case 'database': return ICONS.database;
    case 'flame': return ICONS.flame;
    default: return ICONS.stethoscope;
  }
}

// Application State
const state = {
  currentProtocol: null,
  searchQuery: '',
  activeFilter: 'all',
  theme: localStorage.getItem('naviflow_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  checkedSteps: new Set(),
  checkedStepActions: new Map(), // step_id -> Set of checked action indices (0, 1, 2...)
  selectedDecisions: new Map(), // node_id -> option index
  deferredInstallPrompt: null
};

// DOM References
const elements = {
  themeToggle: document.getElementById('theme-toggle'),
  themeIcon: document.getElementById('theme-icon'),
  statusBadge: document.getElementById('status-badge'),
  statusText: document.getElementById('status-text'),
  pwaInstallBtn: document.getElementById('pwa-install-btn'),
  searchInput: document.getElementById('search-input'),
  searchClear: document.getElementById('search-clear'),
  filterPills: document.querySelectorAll('.filter-pill'),
  dashboardView: document.getElementById('dashboard-view'),
  protocolDetailView: document.getElementById('protocol-detail-view'),
  protocolsGrid: document.getElementById('protocols-grid'),
  btnBack: document.getElementById('btn-back'),
  detailHeaderContent: document.getElementById('detail-header-content'),
  inclusionList: document.getElementById('inclusion-list'),
  exclusionList: document.getElementById('exclusion-list'),
  redFlagsList: document.getElementById('red-flags-list'),
  stepsContainer: document.getElementById('steps-container'),
  decisionsContainer: document.getElementById('decisions-container'),
  diaryBottomBar: document.getElementById('diary-bottom-bar'),
  diaryActionCount: document.getElementById('diary-action-count'),
  btnOpenDiaryModal: document.getElementById('btn-open-diary-modal'),
  btnQuickCopyAll: document.getElementById('btn-quick-copy-all'),
  diaryModal: document.getElementById('diary-modal'),
  fullDiaryTextarea: document.getElementById('full-diary-textarea'),
  btnCloseDiaryModal: document.getElementById('btn-close-diary-modal'),
  btnCopyFullDiary: document.getElementById('btn-copy-full-diary'),
  btnGeneralSnippets: document.getElementById('btn-general-snippets'),
  snippetsModal: document.getElementById('snippets-modal'),
  btnCloseSnippetsModal: document.getElementById('btn-close-snippets-modal'),
  snippetsModalList: document.getElementById('snippets-modal-list'),
  toastContainer: document.getElementById('toast-container'),
  logoHomeLink: document.getElementById('logo-home-link')
};

// Initialize Application
function init() {
  applyTheme(state.theme);
  setupEventListeners();
  setupOnlineStatus();
  setupPWA();
  renderProtocolsGrid();
  renderGeneralSnippetsModal();
}

// Theme Handling
function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('naviflow_theme', theme);
  if (elements.themeIcon) {
    elements.themeIcon.innerHTML = theme === 'dark' ? ICONS.sun : ICONS.moon;
  }
}

// Clipboard Copy Helper with Visual Feedback and Vibration
async function copyToClipboard(text, buttonElement = null) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    // Haptic feedback if supported
    if (navigator.vibrate) {
      navigator.vibrate(40);
    }

    showToast('Snippet copiato negli appunti!');

    if (buttonElement) {
      const originalHtml = buttonElement.innerHTML;
      buttonElement.classList.add('copied');
      buttonElement.innerHTML = `${ICONS.check} <span>Copiato!</span>`;
      setTimeout(() => {
        buttonElement.classList.remove('copied');
        buttonElement.innerHTML = originalHtml;
      }, 1800);
    }
  } catch (err) {
    console.error('Errore durante la copia:', err);
    showToast('Errore durante la copia negli appunti.');
  }
}

// Toast Notification
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `${ICONS.checkCircle} <span>${message}</span>`;
  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 2600);
}

// Filter and Search Protocols
function getFilteredProtocols() {
  const query = state.searchQuery.toLowerCase().trim();
  const filter = state.activeFilter;

  return PROTOCOLS.filter(protocol => {
    // Category / Tag filtering
    if (filter === 'c3' && !protocol.applicableCodes.some(c => c.includes('Codice 3'))) return false;
    if (filter === 'c4' && !protocol.applicableCodes.some(c => c.includes('Codice 4'))) return false;
    if (filter === 't1_10min' && !protocol.targetT1.includes('10 min')) return false;
    if (filter === 'fast_track' && !protocol.decisionNodes.some(dn => dn.options.some(o => o.outcomeType === 'fast_track'))) return false;

    // Search query matching
    if (!query) return true;

    const matchName = protocol.name.toLowerCase().includes(query);
    const matchNumber = protocol.number.toString() === query;
    const matchKeywords = protocol.keywords.some(k => k.toLowerCase().includes(query));
    const matchInclusion = protocol.inclusions.some(i => i.toLowerCase().includes(query));
    const matchSteps = protocol.operationalSteps.some(s => 
      s.title.toLowerCase().includes(query) || s.snippet.toLowerCase().includes(query)
    );

    return matchName || matchNumber || matchKeywords || matchInclusion || matchSteps;
  });
}

// Render Dashboard Grid
function renderProtocolsGrid() {
  const filtered = getFilteredProtocols();
  elements.protocolsGrid.innerHTML = '';

  if (filtered.length === 0) {
    elements.protocolsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <p style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem;">Nessun protocollo trovato</p>
        <p style="font-size: 0.85rem;">Prova a cercare con altri termini (es. "ECG", "dolore", "febbre", "femore")</p>
      </div>
    `;
    return;
  }

  filtered.forEach(protocol => {
    const card = document.createElement('div');
    card.className = 'protocol-card';
    card.style.setProperty('--protocol-color', protocol.color);

    const firstSnippet = protocol.operationalSteps[0]?.snippet || '';

    card.innerHTML = `
      <div class="card-top">
        <span class="card-number-badge">PPCI #${protocol.number}</span>
        <div class="card-codes-row">
          <span class="code-pill c3">C3</span>
          <span class="code-pill c4">C4</span>
        </div>
      </div>
      
      <div class="card-icon-box" style="color: ${protocol.color};">
        ${getProtocolIcon(protocol.icon)}
      </div>

      <h3 class="card-title">${protocol.name}</h3>

      <div class="card-timing">
        ${ICONS.clock}
        <span>Target: ${protocol.targetT1}</span>
      </div>

      <p class="card-snippet-preview">"${firstSnippet}"</p>

      <div class="card-footer">
        <span>${protocol.operationalSteps.length} step guidati</span>
        <div class="card-arrow" style="color: ${protocol.color};">
          <span>Consulta</span>
          ${ICONS.arrowRight}
        </div>
      </div>
    `;

    card.addEventListener('click', () => openProtocolDetail(protocol));
    elements.protocolsGrid.appendChild(card);
  });
}

// Open Protocol Detail View
function openProtocolDetail(protocol) {
  state.currentProtocol = protocol;
  state.checkedSteps.clear();
  state.checkedStepActions.clear();
  state.selectedDecisions.clear();

  // Switch views
  elements.dashboardView.classList.add('hidden');
  elements.protocolDetailView.classList.remove('hidden');
  elements.protocolDetailView.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  renderProtocolHeader(protocol);
  renderCriteria(protocol);
  renderRedFlags(protocol);
  renderSteps(protocol);
  renderDecisions(protocol);
  updateDiaryBottomBar();
}

// Compute dynamic snippet for a step based on checked actions
function computeStepDynamicSnippet(step, checkedIndices) {
  if (!checkedIndices || checkedIndices.size === 0) {
    return step.defaultSnippet || step.snippet || 'Presa in carico avviata secondo protocollo PPCI.';
  }

  const sortedIndices = Array.from(checkedIndices).sort((a, b) => a - b);
  const fragments = sortedIndices.map(idx => {
    if (step.actionSnippets && step.actionSnippets[idx]) {
      return step.actionSnippets[idx];
    }
    return step.actions[idx];
  });

  return fragments.join(' ');
}

// Close Detail View and Return to Dashboard
function closeProtocolDetail() {
  state.currentProtocol = null;
  state.checkedSteps.clear();
  state.checkedStepActions.clear();
  elements.protocolDetailView.classList.remove('active');
  elements.protocolDetailView.classList.add('hidden');
  elements.dashboardView.classList.remove('hidden');
  elements.diaryBottomBar.classList.add('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render Header in Detail View
function renderProtocolHeader(protocol) {
  elements.detailHeaderContent.innerHTML = `
    <div class="detail-title-row">
      <div>
        <div style="font-size: 0.8rem; font-weight: 800; color: ${protocol.color}; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">
          PPCI Protocollo #${protocol.number} - Presa in Carico Infermieristica NAVI
        </div>
        <h1 class="detail-title">${protocol.name}</h1>
      </div>
      <div class="card-icon-box" style="color: ${protocol.color}; width: 52px; height: 52px; flex-shrink: 0;">
        ${getProtocolIcon(protocol.icon)}
      </div>
    </div>

    <div class="detail-badge-group">
      <span class="code-pill c3" style="font-size: 0.825rem; font-weight: 700;">Codice 3 (Urgenza Differibile)</span>
      <span class="code-pill c4" style="font-size: 0.825rem; font-weight: 700;">Codice 4 (Urgenza Minore)</span>
      <div class="target-badge">
        ${ICONS.clock}
        <span>Target T1: <strong>${protocol.targetT1}</strong></span>
      </div>
    </div>
  `;
}

// Render Inclusions and Exclusions
function renderCriteria(protocol) {
  elements.inclusionList.innerHTML = protocol.inclusions
    .map(item => `<li>${item}</li>`)
    .join('');

  elements.exclusionList.innerHTML = protocol.exclusions
    .map(item => `<li>${item}</li>`)
    .join('');
}

// Render Red Flags Box
function renderRedFlags(protocol) {
  elements.redFlagsList.innerHTML = protocol.redFlags
    .map(flag => `<li>${flag}</li>`)
    .join('');
}

// Render Operational Steps (T1 Step-by-Step with Dynamic Snippet Generation)
function renderSteps(protocol) {
  elements.stepsContainer.innerHTML = '';

  protocol.operationalSteps.forEach((step, index) => {
    const actionSet = state.checkedStepActions.get(step.id);
    const hasChecked = !!(actionSet && actionSet.size > 0);
    const currentSnippet = computeStepDynamicSnippet(step, actionSet);
    const pillClass = hasChecked ? 'customized' : 'default';
    const pillText = hasChecked
      ? `Personalizzato (${actionSet.size}/${step.actions.length} spunte)`
      : 'Predefinito di Fase';

    const stepEl = document.createElement('div');
    stepEl.className = 'step-card';
    stepEl.id = `step-card-${step.id}`;

    stepEl.innerHTML = `
      <div class="step-header">
        <div class="step-title-group">
          <div class="step-number-circle">${index + 1}</div>
          <div>
            <h3 class="step-title">${step.title}</h3>
            <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">
              Tipologia: <strong style="text-transform: capitalize;">${step.type}</strong>
            </div>
          </div>
        </div>
        <span class="step-timing-pill">${step.timing}</span>
      </div>

      <div class="concurred-note">
        ${ICONS.stethoscope}
        <span>Concordato con il medico NAVI / medico in servizio</span>
      </div>

      <ul class="step-actions-list">
        ${step.actions.map((action, aIdx) => {
          const isActionChecked = actionSet ? actionSet.has(aIdx) : false;
          return `
            <li class="step-action-item">
              <input type="checkbox" id="chk-${step.id}-${aIdx}" class="step-action-checkbox" data-step-id="${step.id}" data-action-idx="${aIdx}" ${isActionChecked ? 'checked' : ''}>
              <label for="chk-${step.id}-${aIdx}">${action}</label>
            </li>
          `;
        }).join('')}
      </ul>

      <!-- Dedicated Clinical Diary Dynamic Snippet Box -->
      <div class="snippet-box">
        <div class="snippet-top">
          <span class="snippet-label">
            ${ICONS.fileText}
            <span>Diario Clinico</span>
            <span class="snippet-mode-pill ${pillClass}" id="snippet-pill-${step.id}">${pillText}</span>
          </span>
          <button class="btn-copy-snippet" id="btn-copy-step-${step.id}">
            ${ICONS.copy}
            <span>Copia Frase</span>
          </button>
        </div>
        <div class="snippet-text" id="snippet-text-${step.id}">"${currentSnippet}"</div>
      </div>
    `;

    // Step Individual Action Checkbox handler
    const checkboxes = stepEl.querySelectorAll('.step-action-checkbox');
    checkboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const actionIdx = parseInt(cb.dataset.actionIdx, 10);
        if (!state.checkedStepActions.has(step.id)) {
          state.checkedStepActions.set(step.id, new Set());
        }
        const set = state.checkedStepActions.get(step.id);

        if (cb.checked) {
          set.add(actionIdx);
          state.checkedSteps.add(step.id);
        } else {
          set.delete(actionIdx);
          if (set.size === 0) {
            state.checkedSteps.delete(step.id);
          }
        }

        // Live update the displayed snippet and status pill
        const newSnippet = computeStepDynamicSnippet(step, set);
        const textEl = stepEl.querySelector(`#snippet-text-${step.id}`);
        const pillEl = stepEl.querySelector(`#snippet-pill-${step.id}`);

        if (textEl) {
          textEl.textContent = `"${newSnippet}"`;
        }
        if (pillEl) {
          if (!set || set.size === 0) {
            pillEl.className = 'snippet-mode-pill default';
            pillEl.textContent = 'Predefinito di Fase';
          } else {
            pillEl.className = 'snippet-mode-pill customized';
            pillEl.textContent = `Personalizzato (${set.size}/${step.actions.length} spunte)`;
          }
        }

        updateDiaryBottomBar();
      });
    });

    // Copy Button Listener (copies dynamic snippet as currently formed)
    const copyBtn = stepEl.querySelector(`#btn-copy-step-${step.id}`);
    copyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const set = state.checkedStepActions.get(step.id);
      const textToCopy = computeStepDynamicSnippet(step, set);
      copyToClipboard(textToCopy, copyBtn);
      
      // Ensure step is tracked in bottom bar
      state.checkedSteps.add(step.id);
      updateDiaryBottomBar();
    });

    elements.stepsContainer.appendChild(stepEl);
  });
}

// Render Decision Nodes (Snodi Decisionali)
function renderDecisions(protocol) {
  elements.decisionsContainer.innerHTML = '';

  if (!protocol.decisionNodes || protocol.decisionNodes.length === 0) {
    return;
  }

  protocol.decisionNodes.forEach((node, nodeIdx) => {
    const nodeEl = document.createElement('div');
    nodeEl.className = 'decision-card';
    nodeEl.id = `decision-card-${node.id}`;

    const selectedOptionIdx = state.selectedDecisions.get(node.id);

    nodeEl.innerHTML = `
      <div class="decision-question">
        <span style="color: var(--accent-blue); font-weight: 800;">Snodo #${nodeIdx + 1}:</span>
        <span>${node.question}</span>
      </div>

      <div class="decision-buttons">
        ${node.options.map((option, optIdx) => `
          <button class="btn-decision ${selectedOptionIdx === optIdx ? 'active' : ''}" data-node-id="${node.id}" data-opt-idx="${optIdx}">
            <span>${option.label}</span>
            ${selectedOptionIdx === optIdx ? ICONS.checkCircle : ICONS.arrowRight}
          </button>
        `).join('')}
      </div>

      <div class="decision-outcome-container" id="outcome-container-${node.id}">
        ${selectedOptionIdx !== undefined ? renderOutcomeHtml(node.options[selectedOptionIdx], node.id) : ''}
      </div>
    `;

    // Decision option button listeners
    const buttons = nodeEl.querySelectorAll('.btn-decision');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const nodeId = btn.dataset.nodeId;
        const optIdx = parseInt(btn.dataset.optIdx, 10);

        state.selectedDecisions.set(nodeId, optIdx);

        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const outcomeContainer = nodeEl.querySelector(`#outcome-container-${nodeId}`);
        outcomeContainer.innerHTML = renderOutcomeHtml(node.options[optIdx], nodeId);

        // Bind copy button on the new outcome
        const outcomeCopyBtn = outcomeContainer.querySelector(`#btn-copy-outcome-${nodeId}`);
        if (outcomeCopyBtn) {
          outcomeCopyBtn.addEventListener('click', () => {
            copyToClipboard(node.options[optIdx].snippet, outcomeCopyBtn);
          });
        }

        updateDiaryBottomBar();
      });
    });

    // Bind existing outcome copy button if already rendered
    if (selectedOptionIdx !== undefined) {
      const outcomeCopyBtn = nodeEl.querySelector(`#btn-copy-outcome-${node.id}`);
      if (outcomeCopyBtn) {
        outcomeCopyBtn.addEventListener('click', () => {
          copyToClipboard(node.options[selectedOptionIdx].snippet, outcomeCopyBtn);
        });
      }
    }

    elements.decisionsContainer.appendChild(nodeEl);
  });
}

function renderOutcomeHtml(option, nodeId) {
  let outcomeBadge = '';
  if (option.outcomeType === 'area_critica') {
    outcomeBadge = `<span class="code-pill c1" style="font-weight: 800; font-size: 0.8rem;">🚨 ESCALATION AREA CRITICA (Codice 1/2)</span>`;
  } else if (option.outcomeType === 'fast_track') {
    outcomeBadge = `<span class="code-pill c3" style="font-weight: 800; font-size: 0.8rem;">⚡ PERCORSO FAST TRACK SPECIALISTICO</span>`;
  } else {
    outcomeBadge = `<span class="code-pill c4" style="font-weight: 800; font-size: 0.8rem;">📋 PRESA IN CARICO MEDICA T2</span>`;
  }

  return `
    <div class="decision-outcome-box ${option.outcomeType}">
      <div style="margin-bottom: 0.5rem;">${outcomeBadge}</div>
      <h4 class="outcome-title">${option.outcomeTitle}</h4>
      <p class="outcome-desc">${option.description}</p>
      
      <div class="snippet-box" style="background-color: var(--bg-card);">
        <div class="snippet-top">
          <span class="snippet-label">${ICONS.fileText} <span>Snippet Diario per Esito Decisionale</span></span>
          <button class="btn-copy-snippet" id="btn-copy-outcome-${nodeId}">
            ${ICONS.copy}
            <span>Copia Frase Esito</span>
          </button>
        </div>
        <div class="snippet-text">"${option.snippet}"</div>
      </div>
    </div>
  `;
}

// Update Diary Floating Bar
function updateDiaryBottomBar() {
  if (!state.currentProtocol) {
    elements.diaryBottomBar.classList.add('hidden');
    return;
  }

  const stepCount = state.checkedSteps.size;
  const decisionCount = state.selectedDecisions.size;
  const totalCount = stepCount + decisionCount;

  elements.diaryBottomBar.classList.remove('hidden');
  elements.diaryActionCount.textContent = `${totalCount} snippet selezionati`;
}

// Generate Full Clinical Diary Note
function generateFullDiaryText() {
  if (!state.currentProtocol) return '';

  const protocol = state.currentProtocol;
  const parts = [];

  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  parts.push(`[${timeStr}] DIARIO CLINICO INFERMIERISTICO - NUCLEO NAVI PS`);
  parts.push(`Protocollo: PPCI #${protocol.number} - ${protocol.name}`);
  parts.push(`Codice Triage Iniziale: Codice 3/4.`);
  parts.push('----------------------------------------');

  // Collect checked steps with dynamic action snippets or default if none checked
  if (state.checkedSteps.size > 0) {
    protocol.operationalSteps.forEach(step => {
      if (state.checkedSteps.has(step.id)) {
        const actionSet = state.checkedStepActions.get(step.id);
        const snippet = computeStepDynamicSnippet(step, actionSet);
        parts.push(`• ${snippet}`);
      }
    });
  } else {
    // If none checked, add first step standard default
    const firstStep = protocol.operationalSteps[0];
    const def = firstStep?.defaultSnippet || firstStep?.snippet || '';
    parts.push(`• ${def}`);
  }

  // Add selected decision outcome if any
  state.selectedDecisions.forEach((optIdx, nodeId) => {
    const node = protocol.decisionNodes.find(n => n.id === nodeId);
    if (node && node.options[optIdx]) {
      parts.push(`• ESITO/DECISIONE: ${node.options[optIdx].snippet}`);
    }
  });

  parts.push('----------------------------------------');
  parts.push(`Firma Infermiere NAVI: [Nome Cognome / ID Badge]`);

  return parts.join('\n');
}

// Open Integrated Diary Modal
function openDiaryModal() {
  const fullText = generateFullDiaryText();
  elements.fullDiaryTextarea.value = fullText;
  elements.diaryModal.classList.add('active');
}

function closeDiaryModal() {
  elements.diaryModal.classList.remove('active');
}

// Render General Quick Snippets Modal
function renderGeneralSnippetsModal() {
  elements.snippetsModalList.innerHTML = GENERAL_SNIPPETS.map((snippet, idx) => `
    <div class="quick-snippet-card">
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <span style="font-size: 0.75rem; font-weight: 700; color: var(--accent-blue); text-transform: uppercase;">
          ${snippet.category}
        </span>
        <button class="btn-copy-snippet" id="btn-copy-gen-${idx}" style="padding: 0.25rem 0.6rem; font-size: 0.75rem;">
          ${ICONS.copy}
          <span>Copia</span>
        </button>
      </div>
      <div style="font-weight: 700; font-size: 0.85rem; color: var(--text-primary);">${snippet.title}</div>
      <div class="snippet-text" style="font-size: 0.825rem; margin-top: 0.25rem;">"${snippet.text}"</div>
    </div>
  `).join('');

  GENERAL_SNIPPETS.forEach((snippet, idx) => {
    const btn = document.getElementById(`btn-copy-gen-${idx}`);
    if (btn) {
      btn.addEventListener('click', () => {
        copyToClipboard(snippet.text, btn);
      });
    }
  });
}

function openSnippetsModal() {
  elements.snippetsModal.classList.add('active');
}

function closeSnippetsModal() {
  elements.snippetsModal.classList.remove('active');
}

// Setup Event Listeners
function setupEventListeners() {
  // Theme Toggle
  elements.themeToggle.addEventListener('click', () => {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  });

  // Search input and clear
  elements.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    if (state.searchQuery) {
      elements.searchClear.classList.remove('hidden');
    } else {
      elements.searchClear.classList.add('hidden');
    }
    renderProtocolsGrid();
  });

  elements.searchClear.addEventListener('click', () => {
    elements.searchInput.value = '';
    state.searchQuery = '';
    elements.searchClear.classList.add('hidden');
    renderProtocolsGrid();
    elements.searchInput.focus();
  });

  // Keyboard shortcut '/' to search
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== elements.searchInput) {
      e.preventDefault();
      elements.searchInput.focus();
    }
    if (e.key === 'Escape') {
      closeDiaryModal();
      closeSnippetsModal();
    }
  });

  // Filter pills
  elements.filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      elements.filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeFilter = pill.dataset.filter;
      renderProtocolsGrid();
    });
  });

  // Navigation Back Button
  elements.btnBack.addEventListener('click', closeProtocolDetail);
  elements.logoHomeLink.addEventListener('click', closeProtocolDetail);

  // Diary Floating Bar Buttons
  elements.btnOpenDiaryModal.addEventListener('click', openDiaryModal);
  elements.btnCloseDiaryModal.addEventListener('click', closeDiaryModal);
  elements.btnQuickCopyAll.addEventListener('click', () => {
    const text = generateFullDiaryText();
    copyToClipboard(text, elements.btnQuickCopyAll);
  });
  elements.btnCopyFullDiary.addEventListener('click', () => {
    const text = elements.fullDiaryTextarea.value;
    copyToClipboard(text, elements.btnCopyFullDiary);
  });

  // General Snippets Drawer/Modal
  elements.btnGeneralSnippets.addEventListener('click', openSnippetsModal);
  elements.btnCloseSnippetsModal.addEventListener('click', closeSnippetsModal);

  // Close modals on clicking overlay backdrop
  elements.diaryModal.addEventListener('click', (e) => {
    if (e.target === elements.diaryModal) closeDiaryModal();
  });
  elements.snippetsModal.addEventListener('click', (e) => {
    if (e.target === elements.snippetsModal) closeSnippetsModal();
  });
}

// Setup Online / Offline Status
function setupOnlineStatus() {
  function updateStatus() {
    if (navigator.onLine) {
      elements.statusBadge.classList.remove('offline');
      elements.statusText.textContent = '100% Offline Ready';
    } else {
      elements.statusBadge.classList.add('offline');
      elements.statusText.textContent = 'Modalità Offline';
    }
  }

  window.addEventListener('online', updateStatus);
  window.addEventListener('offline', updateStatus);
  updateStatus();
}

// Setup PWA Service Worker & Install Prompt
function setupPWA() {
  // Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => {
          console.log('[NaviFlow] Service Worker registrato con successo:', reg.scope);
        })
        .catch((err) => {
          console.warn('[NaviFlow] Registrazione Service Worker fallita:', err);
        });
    });
  }

  // Handle BeforeInstallPrompt (Android / Chrome / Edge)
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    state.deferredInstallPrompt = e;
    elements.pwaInstallBtn.classList.remove('hidden');
  });

  elements.pwaInstallBtn.addEventListener('click', async () => {
    if (state.deferredInstallPrompt) {
      state.deferredInstallPrompt.prompt();
      const choice = await state.deferredInstallPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        elements.pwaInstallBtn.classList.add('hidden');
      }
      state.deferredInstallPrompt = null;
    } else {
      // iOS or desktop helper modal
      alert('Per installare NaviFlow:\n- Su iPhone/iPad: tocca "Condividi" in basso su Safari e seleziona "Aggiungi a schermata Home".\n- Su Android/Desktop: usa il menu del browser "Installa applicazione".');
    }
  });

  window.addEventListener('appinstalled', () => {
    elements.pwaInstallBtn.classList.add('hidden');
    showToast('NaviFlow installata correttamente sulla schermata home!');
  });
}

// Start Application on DOM Ready
document.addEventListener('DOMContentLoaded', init);
