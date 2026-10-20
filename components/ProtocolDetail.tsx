import React, { useState } from 'react';
import { Protocol } from '../data/protocols';
import { SnippetCopyButton } from './SnippetCopyButton';
import { 
  ArrowLeft, Clock, AlertTriangle, CheckCircle, 
  XCircle, FileText, Stethoscope, ChevronRight 
} from 'lucide-react';

interface ProtocolDetailProps {
  protocol: Protocol;
  onBack: () => void;
}

export const ProtocolDetail: React.FC<ProtocolDetailProps> = ({ protocol, onBack }) => {
  const [checkedStepActions, setCheckedStepActions] = useState<Record<string, number[]>>({});
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});
  const [selectedDecisions, setSelectedDecisions] = useState<Record<string, number>>({});

  const toggleAction = (stepId: string, actionIdx: number) => {
    setCheckedStepActions(prev => {
      const current = prev[stepId] || [];
      const exists = current.includes(actionIdx);
      const updated = exists ? current.filter(i => i !== actionIdx) : [...current, actionIdx];
      return { ...prev, [stepId]: updated };
    });
    setCheckedSteps(prev => ({ ...prev, [stepId]: true }));
  };

  const getDynamicSnippet = (step: Protocol['operationalSteps'][0]) => {
    const actions = checkedStepActions[step.id] || [];
    if (actions.length === 0) {
      return step.defaultSnippet || step.snippet;
    }
    const sorted = [...actions].sort((a, b) => a - b);
    const parts = sorted.map(idx => {
      if (step.actionSnippets && step.actionSnippets[idx]) {
        return step.actionSnippets[idx];
      }
      return step.actions[idx];
    });
    return parts.join(' ');
  };

  const handleSelectDecision = (nodeId: string, optIndex: number) => {
    setSelectedDecisions(prev => ({ ...prev, [nodeId]: optIndex }));
  };

  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      {/* Top Navigation */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700/80 shadow-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Torna a tutti i 13 PPCI</span>
        </button>
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          Uso ad una mano • Tocco per copiare
        </span>
      </div>

      {/* Protocol Header Banner */}
      <div className="relative bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm overflow-hidden">
        <div 
          className="absolute top-0 left-0 bottom-0 w-2"
          style={{ backgroundColor: protocol.color }}
        />

        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div 
              className="text-xs font-extrabold uppercase tracking-wider mb-1"
              style={{ color: protocol.color }}
            >
              PPCI Protocollo #{protocol.number} • Nucleo NAVI
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {protocol.name}
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">
            Codice 3 (Urgenza Differibile)
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
            Codice 4 (Urgenza Minore)
          </span>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
            <Clock className="w-4 h-4" />
            <span>Target T1: <strong>{protocol.targetT1}</strong></span>
          </div>
        </div>
      </div>

      {/* Criteria Grid (Inclusions & Exclusions) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Inclusions */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border-l-4 border-l-emerald-600 border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-3">
            <CheckCircle className="w-5 h-5" />
            <span>Criteri di Inclusione (Presa in Carico NAVI)</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 list-disc list-inside">
            {protocol.inclusions.map((item, idx) => (
              <li key={idx} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>

        {/* Exclusions */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border-l-4 border-l-amber-600 border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm mb-3">
            <XCircle className="w-5 h-5" />
            <span>Criteri di Esclusione (Invio Medico / Area Critica)</span>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 list-disc list-inside">
            {protocol.exclusions.map((item, idx) => (
              <li key={idx} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Red Flags / Emergency Alert Box (High Contrast) */}
      <div className="bg-red-50 dark:bg-red-950/40 border-2 border-red-300 dark:border-red-800 rounded-2xl p-5 shadow-md shadow-red-500/10">
        <div className="flex items-center gap-2.5 text-red-700 dark:text-red-300 font-black text-sm uppercase tracking-wide mb-2">
          <AlertTriangle className="w-5 h-5 animate-pulse text-red-600 dark:text-red-400" />
          <span>Red Flags / Segni di Allarme Critico</span>
        </div>
        <div className="inline-block bg-red-100 dark:bg-red-900/60 text-red-800 dark:text-red-200 text-xs font-bold px-3 py-1 rounded-md mb-3">
          Rilevazione = Rivalutazione immediata Codice 1 o 2 -&gt; Invio tempestivo in Area Critica
        </div>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-red-900 dark:text-red-200">
          {protocol.redFlags.map((flag, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-red-500 font-black">⚠️</span>
              <span>{flag}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Operational Steps (T1 Step-by-Step) */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 dark:border-slate-700 pb-2">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Flusso Operativo T1 Guidato (Step-by-Step)</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Spunta le azioni eseguite o tocca per copiare la dicitura corrispondente
          </p>
        </div>

        <div className="space-y-4">
          {protocol.operationalSteps.map((step, idx) => {
            const isChecked = !!checkedSteps[step.id];

            return (
              <div 
                key={step.id}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm space-y-4"
              >
                {/* Step Top Bar */}
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {step.title}
                      </h3>
                      <span className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                        Tipologia: {step.type}
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-slate-100 dark:bg-slate-700 text-sky-600 dark:text-sky-300 border border-slate-200 dark:border-slate-600">
                    {step.timing}
                  </span>
                </div>

                {/* Concurred Note */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border border-sky-100 dark:border-sky-900">
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Concordato con il medico NAVI / medico in servizio</span>
                </div>

                {/* Actions Checklist */}
                <div className="space-y-2">
                  {step.actions.map((action, aIdx) => {
                    const actionList = checkedStepActions[step.id] || [];
                    const isActionChecked = actionList.includes(aIdx);

                    return (
                      <label 
                        key={aIdx} 
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isActionChecked}
                          onChange={() => toggleAction(step.id, aIdx)}
                          className="mt-0.5 w-4 h-4 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                        />
                        <span>{action}</span>
                      </label>
                    );
                  })}
                </div>

                {/* Dedicated Snippet Diario Clinico Box */}
                {(() => {
                  const dynamicSnippet = getDynamicSnippet(step);
                  const checkedCount = (checkedStepActions[step.id] || []).length;
                  const isCustom = checkedCount > 0;

                  return (
                    <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700/80 p-3.5 space-y-2">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                          <FileText className="w-3.5 h-3.5" />
                          <span>Snippet Diario Clinico</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            isCustom 
                              ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 border border-sky-300 dark:border-sky-800' 
                              : 'bg-slate-200/80 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                          }`}>
                            {isCustom ? `Personalizzato (${checkedCount}/${step.actions.length})` : 'Predefinito di Fase'}
                          </span>
                        </div>
                        <SnippetCopyButton 
                          text={dynamicSnippet} 
                          onCopied={() => setCheckedSteps(prev => ({ ...prev, [step.id]: true }))}
                        />
                      </div>
                      <p className="text-xs sm:text-sm italic text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 p-2.5 rounded-lg border border-dashed border-slate-200 dark:border-slate-700 select-all transition-colors duration-150">
                        "{dynamicSnippet}"
                      </p>
                    </div>
                  );
                })()}
              </div>
            );
          })}
        </div>
      </div>

      {/* Decision Nodes (Snodi Decisionali Sì / No) */}
      {protocol.decisionNodes && protocol.decisionNodes.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-2">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Snodi Decisionali &amp; Percorsi Conclusivi
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Naviga l'algoritmo (Sì / No) per determinare l'esito finale e copiare il testo conclusivo
            </p>
          </div>

          <div className="space-y-4">
            {protocol.decisionNodes.map((node, nIdx) => {
              const selectedIdx = selectedDecisions[node.id];
              const selectedOption = selectedIdx !== undefined ? node.options[selectedIdx] : null;

              return (
                <div 
                  key={node.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-5 shadow-sm space-y-4"
                >
                  <div className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    <span className="text-sky-600 dark:text-sky-400 mr-2">Snodo #{nIdx + 1}:</span>
                    <span>{node.question}</span>
                  </div>

                  {/* Decision Buttons (Sì / No) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {node.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectDecision(node.id, oIdx)}
                        className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-bold flex items-center justify-between transition-all ${
                          selectedIdx === oIdx
                            ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 ring-2 ring-sky-500/20'
                            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {selectedIdx === oIdx ? (
                          <CheckCircle className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Dynamic Decision Outcome Box */}
                  {selectedOption && (
                    <div 
                      className={`p-4 rounded-xl border-l-4 space-y-3 animate-fadeIn ${
                        selectedOption.outcomeType === 'area_critica'
                          ? 'border-l-red-600 bg-red-50 dark:bg-red-950/30'
                          : selectedOption.outcomeType === 'fast_track'
                          ? 'border-l-sky-600 bg-sky-50 dark:bg-sky-950/30'
                          : 'border-l-emerald-600 bg-emerald-50 dark:bg-emerald-950/30'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {selectedOption.outcomeType === 'area_critica' && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-black uppercase bg-red-200 dark:bg-red-900 text-red-900 dark:text-red-100">
                            🚨 Escalation Area Critica (Codice 1/2)
                          </span>
                        )}
                        {selectedOption.outcomeType === 'fast_track' && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-black uppercase bg-sky-200 dark:bg-sky-900 text-sky-900 dark:text-sky-100">
                            ⚡ Fast Track Specialistico
                          </span>
                        )}
                        {selectedOption.outcomeType === 't2_attesa' && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-black uppercase bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100">
                            📋 Presa in Carico Medica T2
                          </span>
                        )}
                      </div>

                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                        {selectedOption.outcomeTitle}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        {selectedOption.description}
                      </p>

                      <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">
                            Snippet Diario per Esito Decisionale
                          </span>
                          <SnippetCopyButton text={selectedOption.snippet} label="Copia Esito" />
                        </div>
                        <p className="text-xs italic text-slate-700 dark:text-slate-300 select-all">
                          "{selectedOption.snippet}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
