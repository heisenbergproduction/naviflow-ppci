import React from 'react';
import { Activity, Sun, Moon, Download, FileText } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenSnippets: () => void;
  onGoHome: () => void;
  canInstallPWA?: boolean;
  onInstallPWA?: () => void;
  isOffline?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggleTheme,
  onOpenSnippets,
  onGoHome,
  canInstallPWA = false,
  onInstallPWA,
  isOffline = false
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Logo and Brand */}
        <div 
          onClick={onGoHome}
          className="flex items-center gap-3 cursor-pointer select-none group"
          title="Torna alla Dashboard dei 13 PPCI"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-sky-700 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Activity className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Navi<span className="text-sky-600 dark:text-sky-400">Flow</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              PPCI Pronto Soccorso • NAVI
            </span>
          </div>
        </div>

        {/* Status and Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Offline / Online Badge */}
          <div 
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
            title="Funziona 100% offline senza connessione"
          >
            <span className={`w-2 h-2 rounded-full ${isOffline ? 'bg-amber-500' : 'bg-emerald-500'}`} />
            <span>{isOffline ? 'Offline' : '100% Offline Ready'}</span>
          </div>

          {/* Quick General Snippets Modal Trigger */}
          <button
            onClick={onOpenSnippets}
            className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors"
            title="Frasi Rapide Diario Clinico"
          >
            <FileText className="w-5 h-5" />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors"
            title={isDark ? 'Passa al tema chiaro' : 'Passa al tema scuro'}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Install PWA Button */}
          {canInstallPWA && onInstallPWA && (
            <button
              onClick={onInstallPWA}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl border border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 hover:bg-sky-600 hover:text-white transition-colors"
              title="Installa NaviFlow su iPhone, Android o Desktop"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Installa</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
