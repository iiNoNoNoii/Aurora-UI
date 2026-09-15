# Third-party notices

Aurora UI itself is licensed under the GNU Affero General Public License v3.0
or later (see [LICENSE](LICENSE)). This file lists everything else that ends up
in, or informs, the distributed `dist/aurora-ui.js`.

## Bundled into the shipped file

### Lit — BSD-3-Clause

Copyright Google LLC. `lit`, `lit-html`, `lit-element` and
`@lit/reactive-element` are compiled into `dist/aurora-ui.js`.

BSD-3-Clause requires the copyright notice to accompany binary distributions.
The build keeps esbuild's `legalComments: "inline"` setting specifically so the
`@license Copyright … Google LLC / SPDX-License-Identifier: BSD-3-Clause`
headers survive minification and ship inside the bundle. **Do not set
`legalComments` to `none`.**

BSD-3-Clause is a permissive licence and is compatible with distributing the
combined work under AGPL-3.0.

## Build-time only — not shipped

| Package | Licence |
|---|---|
| Vite | MIT |
| esbuild | MIT |
| TypeScript | Apache-2.0 |

These never appear in the output, so they carry no distribution obligation
here.

## Astronomical data

`src/core/star-catalog.ts` contains about seventy bright-star positions and
magnitudes at epoch J2000, plus constellation figures.

- **The positions and magnitudes are measurements**, not authored works. Facts
  are not subject to copyright, and these particular numbers appear in every
  almanac, textbook and encyclopaedia entry.
- **No catalogue file is embedded.** A compiled database can attract protection
  — in the EU, a sui generis right against extraction of a substantial part —
  and several widely used star databases ship under share-alike terms that
  would reach into this project. The table here was entered by hand, star by
  star, and is neither a substantial part of any database nor a copy of one.
- **The constellation lines are ours.** Which stars to join is an editorial
  choice, not a standard: the IAU defines constellation *boundaries*, never
  *figures*, and published line sets belong to the projects that drew them. The
  shapes used here are the traditional ones, written out from scratch as index
  pairs.

If you contribute stars, follow the same rule: add individual well-known
values, never paste a catalogue.

## Everything else

All other code, the sky model, the procedural cloud, rain, snow, fog and
lightning renderers, and the cards are original work in this repository, under
AGPL-3.0-or-later. No fonts, images, icon sets, sounds or textures are bundled:
the visuals are generated at runtime, and icons come from Home Assistant's own
MDI set at display time rather than being redistributed here.
