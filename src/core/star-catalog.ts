/**
 * Bright stars and constellation figures.
 *
 * ## Where this data comes from, and why that is safe
 *
 * The numbers below are **measurements**: right ascension, declination and
 * apparent magnitude of the brightest stars, at epoch J2000. A measured fact is
 * not an authored work and carries no copyright — these same figures appear in
 * every almanac, textbook and encyclopaedia entry.
 *
 * What *can* be protected is a compiled catalogue: in the EU a database may
 * carry a sui generis right against extraction of a substantial part, and some
 * widely used star databases ship under share-alike licences that would reach
 * into this project. So Aurora deliberately does **not** embed anyone's file.
 * This is a small, hand-entered set of about sixty naked-eye stars, which is
 * neither a substantial part of any catalogue nor a copy of one.
 *
 * The constellation **lines** are our own. Which stars to join is an editorial
 * choice, not a standard — the IAU defines only boundaries, never figures — and
 * published line sets belong to the projects that drew them. The shapes here
 * are the traditional ones (they predate copyright by a few thousand years),
 * drawn from scratch as index pairs.
 *
 * If you add stars, keep to this rule: type in individual well-known values,
 * never paste a catalogue.
 */

export interface CatalogStar {
  name: string;
  /** Right ascension in hours, J2000. */
  ra: number;
  /** Declination in degrees, J2000. */
  dec: number;
  /** Apparent visual magnitude – smaller is brighter. */
  mag: number;
}

export interface Constellation {
  name: string;
  /** Index pairs into `BRIGHT_STARS`. */
  lines: [number, number][];
}

export const BRIGHT_STARS: CatalogStar[] = [
  /* 0 */ { name: 'Betelgeuse', ra: 5.9195, dec: 7.407, mag: 0.5 },
  /* 1 */ { name: 'Rigel', ra: 5.2423, dec: -8.202, mag: 0.13 },
  /* 2 */ { name: 'Bellatrix', ra: 5.4185, dec: 6.35, mag: 1.64 },
  /* 3 */ { name: 'Mintaka', ra: 5.5334, dec: -0.299, mag: 2.23 },
  /* 4 */ { name: 'Alnilam', ra: 5.6036, dec: -1.202, mag: 1.69 },
  /* 5 */ { name: 'Alnitak', ra: 5.6793, dec: -1.943, mag: 1.77 },
  /* 6 */ { name: 'Saiph', ra: 5.7958, dec: -9.67, mag: 2.06 },

  /* 7 */ { name: 'Dubhe', ra: 11.062, dec: 61.751, mag: 1.79 },
  /* 8 */ { name: 'Merak', ra: 11.031, dec: 56.383, mag: 2.37 },
  /* 9 */ { name: 'Phecda', ra: 11.897, dec: 53.695, mag: 2.44 },
  /* 10 */ { name: 'Megrez', ra: 12.257, dec: 57.033, mag: 3.31 },
  /* 11 */ { name: 'Alioth', ra: 12.9, dec: 55.96, mag: 1.77 },
  /* 12 */ { name: 'Mizar', ra: 13.399, dec: 54.925, mag: 2.27 },
  /* 13 */ { name: 'Alkaid', ra: 13.792, dec: 49.313, mag: 1.86 },

  /* 14 */ { name: 'Caph', ra: 0.153, dec: 59.15, mag: 2.27 },
  /* 15 */ { name: 'Schedar', ra: 0.675, dec: 56.537, mag: 2.24 },
  /* 16 */ { name: 'Gamma Cassiopeiae', ra: 0.945, dec: 60.717, mag: 2.47 },
  /* 17 */ { name: 'Ruchbah', ra: 1.43, dec: 60.235, mag: 2.68 },
  /* 18 */ { name: 'Segin', ra: 1.906, dec: 63.67, mag: 3.38 },

  /* 19 */ { name: 'Deneb', ra: 20.69, dec: 45.28, mag: 1.25 },
  /* 20 */ { name: 'Sadr', ra: 20.37, dec: 40.257, mag: 2.23 },
  /* 21 */ { name: 'Gienah', ra: 20.77, dec: 33.97, mag: 2.48 },
  /* 22 */ { name: 'Delta Cygni', ra: 19.749, dec: 45.131, mag: 2.87 },
  /* 23 */ { name: 'Albireo', ra: 19.512, dec: 27.96, mag: 3.08 },

  /* 24 */ { name: 'Vega', ra: 18.615, dec: 38.784, mag: 0.03 },
  /* 25 */ { name: 'Sheliak', ra: 18.835, dec: 33.363, mag: 3.45 },
  /* 26 */ { name: 'Sulafat', ra: 18.982, dec: 32.69, mag: 3.24 },
  /* 27 */ { name: 'Zeta Lyrae', ra: 18.746, dec: 37.605, mag: 4.3 },

  /* 28 */ { name: 'Altair', ra: 19.846, dec: 8.868, mag: 0.76 },
  /* 29 */ { name: 'Tarazed', ra: 19.771, dec: 10.613, mag: 2.72 },
  /* 30 */ { name: 'Alshain', ra: 19.921, dec: 6.407, mag: 3.71 },

  /* 31 */ { name: 'Antares', ra: 16.49, dec: -26.432, mag: 1.06 },
  /* 32 */ { name: 'Dschubba', ra: 16.005, dec: -22.622, mag: 2.32 },
  /* 33 */ { name: 'Graffias', ra: 16.091, dec: -19.805, mag: 2.62 },
  /* 34 */ { name: 'Shaula', ra: 17.56, dec: -37.104, mag: 1.62 },
  /* 35 */ { name: 'Sargas', ra: 17.622, dec: -42.998, mag: 1.87 },

  /* 36 */ { name: 'Regulus', ra: 10.139, dec: 11.967, mag: 1.4 },
  /* 37 */ { name: 'Denebola', ra: 11.818, dec: 14.572, mag: 2.14 },
  /* 38 */ { name: 'Algieba', ra: 10.333, dec: 19.841, mag: 2.08 },
  /* 39 */ { name: 'Zosma', ra: 11.235, dec: 20.524, mag: 2.56 },
  /* 40 */ { name: 'Epsilon Leonis', ra: 9.764, dec: 23.774, mag: 2.98 },

  /* 41 */ { name: 'Aldebaran', ra: 4.599, dec: 16.509, mag: 0.85 },
  /* 42 */ { name: 'Elnath', ra: 5.438, dec: 28.608, mag: 1.65 },
  /* 43 */ { name: 'Ain', ra: 4.477, dec: 19.18, mag: 3.53 },

  /* 44 */ { name: 'Castor', ra: 7.577, dec: 31.888, mag: 1.58 },
  /* 45 */ { name: 'Pollux', ra: 7.755, dec: 28.026, mag: 1.14 },
  /* 46 */ { name: 'Alhena', ra: 6.629, dec: 16.399, mag: 1.93 },

  /* 47 */ { name: 'Sirius', ra: 6.752, dec: -16.716, mag: -1.46 },
  /* 48 */ { name: 'Mirzam', ra: 6.378, dec: -17.956, mag: 1.98 },
  /* 49 */ { name: 'Wezen', ra: 7.14, dec: -26.393, mag: 1.83 },
  /* 50 */ { name: 'Adhara', ra: 6.977, dec: -28.972, mag: 1.5 },

  /* 51 */ { name: 'Arcturus', ra: 14.261, dec: 19.182, mag: -0.05 },
  /* 52 */ { name: 'Izar', ra: 14.75, dec: 27.074, mag: 2.37 },
  /* 53 */ { name: 'Seginus', ra: 14.535, dec: 38.308, mag: 3.03 },
  /* 54 */ { name: 'Nekkar', ra: 15.032, dec: 40.39, mag: 3.49 },

  /* 55 */ { name: 'Capella', ra: 5.278, dec: 45.998, mag: 0.08 },
  /* 56 */ { name: 'Menkalinan', ra: 5.992, dec: 44.947, mag: 1.9 },

  /* 57 */ { name: 'Mirfak', ra: 3.405, dec: 49.861, mag: 1.79 },
  /* 58 */ { name: 'Algol', ra: 3.136, dec: 40.956, mag: 2.12 },

  /* 59 */ { name: 'Acrux', ra: 12.443, dec: -63.099, mag: 0.77 },
  /* 60 */ { name: 'Mimosa', ra: 12.795, dec: -59.689, mag: 1.25 },
  /* 61 */ { name: 'Gacrux', ra: 12.519, dec: -57.113, mag: 1.63 },
  /* 62 */ { name: 'Delta Crucis', ra: 12.252, dec: -58.749, mag: 2.79 },

  /* 63 */ { name: 'Rigil Kentaurus', ra: 14.66, dec: -60.835, mag: -0.27 },
  /* 64 */ { name: 'Hadar', ra: 14.064, dec: -60.373, mag: 0.61 },

  /* 65 */ { name: 'Procyon', ra: 7.655, dec: 5.225, mag: 0.34 },
  /* 66 */ { name: 'Spica', ra: 13.42, dec: -11.161, mag: 0.98 },
  /* 67 */ { name: 'Fomalhaut', ra: 22.961, dec: -29.622, mag: 1.16 },
  /* 68 */ { name: 'Achernar', ra: 1.629, dec: -57.237, mag: 0.46 },
  /* 69 */ { name: 'Canopus', ra: 6.399, dec: -52.696, mag: -0.74 },
  /* 70 */ { name: 'Polaris', ra: 2.53, dec: 89.264, mag: 1.98 },
];

export const CONSTELLATIONS: Constellation[] = [
  {
    name: 'Orion',
    lines: [
      [2, 0], // shoulders
      [2, 3], // right shoulder to belt
      [0, 5], // left shoulder to belt
      [3, 4], // belt
      [4, 5],
      [3, 1], // belt to knees
      [5, 6],
      [1, 6], // lower body
    ],
  },
  {
    name: 'Ursa Major',
    lines: [
      [7, 8], // bowl
      [8, 9],
      [9, 10],
      [10, 7],
      [10, 11], // handle
      [11, 12],
      [12, 13],
    ],
  },
  {
    name: 'Cassiopeia',
    lines: [
      [14, 15],
      [15, 16],
      [16, 17],
      [17, 18],
    ],
  },
  {
    name: 'Cygnus',
    lines: [
      [19, 20], // spine
      [20, 23],
      [22, 20], // wings
      [20, 21],
    ],
  },
  {
    name: 'Lyra',
    lines: [
      [24, 27],
      [27, 25],
      [25, 26],
      [26, 27],
    ],
  },
  {
    name: 'Aquila',
    lines: [
      [29, 28],
      [28, 30],
    ],
  },
  {
    name: 'Scorpius',
    lines: [
      [33, 32],
      [32, 31],
      [31, 34],
      [34, 35],
    ],
  },
  {
    name: 'Leo',
    lines: [
      [36, 38], // sickle
      [38, 40],
      [38, 39],
      [39, 37], // back to tail
      [36, 37],
    ],
  },
  {
    name: 'Taurus',
    lines: [
      [43, 41],
      [41, 42],
    ],
  },
  {
    name: 'Gemini',
    lines: [
      [44, 45],
      [45, 46],
    ],
  },
  {
    name: 'Canis Major',
    lines: [
      [48, 47],
      [47, 49],
      [49, 50],
      [50, 48],
    ],
  },
  {
    name: 'Boötes',
    lines: [
      [51, 52],
      [52, 54],
      [54, 53],
      [53, 51],
    ],
  },
  {
    name: 'Auriga',
    lines: [
      [55, 56],
      [56, 42],
      [42, 55],
    ],
  },
  {
    name: 'Perseus',
    lines: [
      [57, 58],
      [57, 55],
    ],
  },
  {
    name: 'Crux',
    lines: [
      [59, 61],
      [60, 62],
    ],
  },
  {
    name: 'Centaurus',
    lines: [[63, 64]],
  },
];
