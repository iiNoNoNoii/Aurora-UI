import { AURORA_VERSION, CARD_NAME, CARD_TYPE } from './core/config';

import './aurora-background-card';

export { AuroraBackgroundCard } from './aurora-background-card';
export { AuroraBackgroundEditor } from './editor/aurora-background-editor';
export type {
  AuroraBackgroundConfig,
  AuroraBackgroundConfigInput,
  QualityLevel,
  WeatherCondition,
} from './core/types';

interface CustomCardEntry {
  type: string;
  name: string;
  description: string;
  preview?: boolean;
  documentationURL?: string;
}

declare global {
  interface Window {
    customCards?: CustomCardEntry[];
  }
}

/** Register with the Lovelace card picker. */
const registry: CustomCardEntry[] = (window.customCards = window.customCards || []);
if (!registry.some((card) => card.type === CARD_TYPE)) {
  registry.push({
    type: CARD_TYPE,
    name: CARD_NAME,
    description:
      'Procedural, weather- and sun-aware animated background for the whole dashboard. Part of Aurora UI.',
    preview: false,
    documentationURL: 'https://github.com/aurora-ui/aurora-background',
  });
}

/* eslint-disable no-console */
console.info(
  `%c AURORA BACKGROUND %c v${AURORA_VERSION} `,
  'background:linear-gradient(135deg,#7a5cff,#34c6ff);color:#fff;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px',
  'background:#0b1224;color:#cfe4ff;border-radius:0 4px 4px 0;padding:2px 6px'
);
