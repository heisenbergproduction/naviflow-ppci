/**
 * NaviFlow - PPCI Pronto Soccorso
 * Definizione Tipi TypeScript e Database dei 13 PPCI (ARNAS Civico Rev. 1)
 */

export interface OperationalStep {
  id: string;
  title: string;
  timing: string;
  type: 'triage' | 'lab' | 'ecg' | 'imaging' | 'therapy' | 'monitoring';
  actions: string[];
  snippet: string;
}

export interface DecisionOption {
  label: string;
  outcomeType: 'area_critica' | 't2_attesa' | 'fast_track' | 'alt';
  outcomeTitle: string;
  description: string;
  snippet: string;
}

export interface DecisionNode {
  id: string;
  question: string;
  options: DecisionOption[];
}

export interface Protocol {
  id: string;
  number: number;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  badgeColor: string;
  applicableCodes: string[];
  targetT1: string;
  keywords: string[];
  inclusions: string[];
  exclusions: string[];
  redFlags: string[];
  operationalSteps: OperationalStep[];
  decisionNodes: DecisionNode[];
}

export interface GeneralSnippet {
  category: string;
  title: string;
  text: string;
}

export { PROTOCOLS, GENERAL_SNIPPETS } from './protocols.js';
