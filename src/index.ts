import { AURORA_VERSION, CARD_NAME, CARD_TYPE } from './core/config';
import { CLIMATE_CARD_TYPE } from './cards/aurora-climate-card';
import { LIGHT_CARD_TYPE } from './cards/aurora-light-card';

import './aurora-background-card';
import './cards/aurora-climate-card';
import './cards/aurora-light-card';
import './cards/aurora-card-editors';

export { AuroraBackgroundCard } from './aurora-background-card';
export { AuroraBackgroundEditor } from './editor/aurora-background-editor';
export { AuroraClimateCard } from './cards/aurora-climate-card';
export { AuroraLightCard } from './cards/aurora-light-card';
export type {
  AuroraBackgroundConfig,
  AuroraBackgroundConfigInput,
  GlassConfig,
  QualityLevel,
  SeasonName,
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

const DOCS = 'https://github.com/iiNoNoNoii/Aurora-UI';

const CARDS: CustomCardEntry[] = [
  {
    type: CARD_TYPE,
    name: CARD_NAME,
    description:
      'Procedural, weather- and sun-aware animated background for the whole dashboard. Part of Aurora UI.',
    preview: false,
    documentationURL: DOCS,
  },
  {
    type: LIGHT_CARD_TYPE,
    name: 'Aurora Light',
    description: 'Light tile that takes the bulb’s own colour. Drag for brightness, tap to toggle.',
    preview: false,
    documentationURL: DOCS,
  },
  {
    type: CLIMATE_CARD_TYPE,
    name: 'Aurora Climate',
    description: 'Thermostat with a large target temperature and a surface that warms with it.',
    preview: false,
    documentationURL: DOCS,
  },
];

/** Register with the Lovelace card picker. */
const registry: CustomCardEntry[] = (window.customCards = window.customCards || []);
for (const card of CARDS) {
  if (!registry.some((existing) => existing.type === card.type)) registry.push(card);
}

/* eslint-disable no-console */
console.info(
  `%c AURORA UI %c v${AURORA_VERSION} `,
  'background:linear-gradient(135deg,#7a5cff,#34c6ff);color:#fff;font-weight:700;border-radius:4px 0 0 4px;padding:2px 6px',
  'background:#0b1224;color:#cfe4ff;border-radius:0 4px 4px 0;padding:2px 6px'
);
