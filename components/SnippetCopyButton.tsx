import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface SnippetCopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  onCopied?: () => void;
}

export const SnippetCopyButton: React.FC<SnippetCopyButtonProps> = ({
  text,
  label = 'Copia Frase',
  className = '',
  onCopied
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      if (navigator.vibrate) {
        navigator.vibrate(40);
      }

      setCopied(true);
      if (onCopied) onCopied();

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (err) {
      console.error('Errore durante la copia:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-150 ${
        copied
          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
          : 'bg-sky-600 hover:bg-sky-700 active:scale-95 text-white border-sky-600 shadow-sm'
      } ${className}`}
      title="Copia negli appunti per la cartella clinica"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>Copiato!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
