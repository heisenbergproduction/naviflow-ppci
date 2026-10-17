import React from 'react';
import { Protocol } from '../data/protocols';
import { Clock, ChevronRight, Activity, Droplet, Wind, ShieldAlert, HeartPulse, Brain, Database, Flame, Thermometer } from 'lucide-react';

interface ProtocolCardProps {
  protocol: Protocol;
  onSelect: (protocol: Protocol) => void;
}

export const ProtocolCard: React.FC<ProtocolCardProps> = ({ protocol, onSelect }) => {
  const getIcon = () => {
    switch (protocol.icon) {
      case 'droplet': return <Droplet className="w-6 h-6" />;
      case 'wind': return <Wind className="w-6 h-6" />;
      case 'activity': return <Activity className="w-6 h-6" />;
      case 'shield-alert': return <ShieldAlert className="w-6 h-6" />;
      case 'heart-pulse': return <HeartPulse className="w-6 h-6" />;
      case 'brain': return <Brain className="w-6 h-6" />;
      case 'database': return <Database className="w-6 h-6" />;
      case 'flame': return <Flame className="w-6 h-6" />;
      case 'thermometer-snowflake': return <Thermometer className="w-6 h-6" />;
      default: return <Activity className="w-6 h-6" />;
    }
  };

  const firstSnippet = protocol.operationalSteps[0]?.snippet || '';

  return (
    <div
      onClick={() => onSelect(protocol)}
      className="group relative bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col overflow-hidden"
    >
      {/* Top Protocol Color Accent Bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-1.5 opacity-90 transition-all group-hover:h-2"
        style={{ backgroundColor: protocol.color }}
      />

      {/* Card Header & Badges */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
          PPCI #{protocol.number}
        </span>
        <div className="flex gap-1.5">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
            C3
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
            C4
          </span>
        </div>
      </div>

      {/* Icon */}
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-105"
        style={{ 
          backgroundColor: `${protocol.color}18`,
          color: protocol.color
        }}
      >
        {getIcon()}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
        {protocol.name}
      </h3>

      {/* T1 Target Badge */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-100 dark:border-sky-900/40 mb-3 w-fit">
        <Clock className="w-3.5 h-3.5" />
        <span>Target: <strong>{protocol.targetT1}</strong></span>
      </div>

      {/* First Snippet Preview */}
      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 italic mb-4 flex-grow">
        "{firstSnippet}"
      </p>

      {/* Card Footer */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-auto">
        <span>{protocol.operationalSteps.length} step operativi</span>
        <div 
          className="flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform"
          style={{ color: protocol.color }}
        >
          <span>Apri Flusso</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
