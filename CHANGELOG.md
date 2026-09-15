# Changelog

All notable changes to Aurora Background are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project uses [Semantic Versioning](https://semver.org/).

## [0.5.0-alpha] – 2026-09-15

Aurora Cards, and the project becomes a suite.

### Added

- **Aurora Light** (`custom:aurora-light`) – a light tile that takes the bulb's
  own colour, from `rgb_color` or from `color_temp_kelvin` converted to RGB.
  Drag across the card for brightness, tap to toggle, hold for more-info.
  Brightness is optimistic while Home Assistant catches up, and lights that
  only support on/off get a plain toggle instead of a slider.
- **Aurora Climate** (`custom:aurora-climate`) – a thermostat with a large
  target temperature, − / + buttons, a drag row, and HVAC mode buttons. The
  surface shifts from blue to amber across the thermostat's own
  `min_temp`/`max_temp` range. Service calls are debounced, so a drag from 18
  to 24 sends one command rather than twelve.
- Visual editors for both cards, and entries in the Lovelace card picker.
- `DragControl`, a shared pointer helper. A horizontal slider declares
  `touch-action: pan-y`, so the browser keeps vertical scrolling and a user can
  flick past a card without fighting it; pointer capture is only taken once a
  press is definitely a drag.
- `examples/dev-cards.html` – a bench where service calls really mutate the
  mock state and are echoed back, like the real state loop.

### Changed

- **The project is now Aurora UI**, published from one repository as a single
  `aurora-ui.js`, the way Mushroom ships its cards. The background card type is
  unchanged (`custom:aurora-background`), so existing configuration keeps working.
- **License is AGPL-3.0-or-later**, matching the choice made for the
  repository. The bundle banner points recipients at the source, as the license
  requires.

## [0.4.0-alpha] – 2026-09-15

Aurora Glass: the sky now styles the cards in front of it.

### Added

- **Aurora Glass** (`glass:`, opt-in) – translucent, sky-tinted Lovelace cards
  driven entirely by Home Assistant's documented `--ha-card-*` theme variables:
  surface colour, backdrop blur and saturation, border, ambient glow in the box
  shadow, and corner radius. The card surface tracks the ambient sky colour and
  gains opacity when the sky is bright, so contrast holds at noon and at
  midnight. Disabling it removes every property again and hands the dashboard
  back to the user's own theme untouched.
- `glass: true` as shorthand for "on, with the defaults".
- Optional `glass.adaptive_text` drives `--primary-text-color` /
  `--secondary-text-color`. Off by default, because those reach beyond cards.

### Changed

- `rgbToCss()` rounds alpha to three decimals, keeping float noise out of the
  CSS handed to the browser.

## [0.3.0-alpha] – 2026-09-15

### Added

- **Season engine** – a continuous, hemisphere-aware seasonal cast. The four
  seasons are blended with cosine lobes around their solstice and equinox
  centres, so 20 March looks like 21 March. Summer is warmer and hazier, autumn
  carries amber, winter is cooler and paler, spring is fresh and clear. The
  effect is deliberately faint and fades out at night, when nothing lights the
  sky seasonally. Seasonal haze feeds the fog renderer through the normal
  weather cross-fade.
- **Ambient weather lighting** – the live sky is published as `--aurora-*` CSS
  custom properties on `<html>`: ambient/sky/horizon/accent colours (as both
  `rgb()` and bare `r, g, b` lists), glow strength, day and night factors, a
  readable contrast colour, a ready-made card tint and border, plus the current
  season and weather condition as strings. Throttled and change-gated, because
  writing custom properties on the root element restyles the whole document.
- **Parallax** – scene layers drift with dashboard scrolling and pointer
  movement, near layers further than far ones. Scroll is observed in the
  capture phase, which catches whichever container the current Home Assistant
  view scrolls, and saturates after one viewport. Disabled under
  `prefers-reduced-motion`.
- New effect toggles `season` and `parallax`, and `background.ambient_variables`.
- The debug overlay now reports precipitation values, season and warmth, and
  the live parallax offset.

## [0.2.0-alpha] – 2026-09-15

### Added

- **Rain renderer** – depth-banded streaks with wind-driven slant, batched into
  one stroke per band, plus ground spray during heavy rain.
- **Snow renderer** – flakes varying in size, fall speed and sway width, with a
  wind push; one batched fill per size band.
- **Fog renderer** – drifting, horizontally seamless haze bands at several
  heights and speeds, over a flat wash. Takes over the temporary haze band that
  the cloud renderer carried in v0.1.
- **Lightning renderer** – a strike is two to four short flashes with a fast
  attack and slow decay, capped well below full white, and about half of them
  carry a midpoint-displacement bolt with branches. Silent under
  `prefers-reduced-motion`.
- **Better clouds** – two families are now generated: flat stratus sheets for
  the distant layers and puffy cumulus heaps for the near ones, with a wider
  internal shading range so tinted clouds show volume. An overcast sheet
  underneath closes the bright gap that used to remain near the horizon.
- Quality profiles gained `rainParticles`, `snowParticles`, `fogLayers` and
  `lightningBolts`.

## [0.1.0-alpha] – 2026-09-15

First working release. Everything in this list is implemented and rendering.

### Added

- **Home Assistant custom card** `custom:aurora-background`, registered in the
  card picker with a visual `ha-form` editor.
- **Continuous sky model** – eight key palettes interpolated on the live solar
  elevation, so dawn and dusk fade rather than switch. Sunrise is tinted toward
  pink and violet, sunset toward amber and gold.
- **Sun** with a layered halo and a horizon glow that survives overcast skies.
- **Moon** with a real synodic phase and a correctly carved terminator.
- **Stars** – seeded field, per-star twinkle, occasional shooting stars on
  `high` and `ultra`.
- **Clouds** – procedurally generated grayscale sprites, tinted from the sky
  palette, parallax layers, wind-driven speed, viewport-relative sizing.
- **Weather engine** – all fifteen Home Assistant `weather` conditions plus
  common aliases, mapped to cloud cover, darkness, desaturation, haze and wind,
  and cross-faded over ~4 s. Uses `cloud_coverage` and `wind_speed` attributes
  when the integration provides them.
- **Full-view dashboard background** via a fixed, `pointer-events: none` layer
  and the documented `--lovelace-background` theme variable. Reference-counted
  so view switches never leave two canvases running.
- **`mode: card`** for using Aurora as an ordinary card.
- **Quality tiers** `low` / `medium` / `high` / `ultra` plus `auto`, with
  frame-cost measurement that steps quality down (and never oscillates back).
- **Solar fallback** – a NOAA low-accuracy model driven by
  `hass.config.latitude/longitude` when `sun.sun` is unavailable.
- **Debug overlay** (`debug: true`) showing FPS, quality, canvas size, particle
  count, weather state, sun elevation and its source, day/night/twilight
  factors, moon phase and reduced-motion state.
- Respects `prefers-reduced-motion`, `visibilitychange` and viewport visibility;
  device-pixel-ratio aware with a ~4.2 megapixel backing-store cap.
- HACS packaging, release workflow that attaches the built bundle, and a
  validation workflow that fails when `dist/` drifts from `src/`.

### Known limitations

- `rain`, `snow`, `fog` and `lightning` are accepted in the config but only
  `fog` currently contributes (a haze band). The renderers land in v0.2.
- In a **sections** view the card still occupies one small grid cell.
- A theme that paints the dashboard surface through a variable other than
  `--lovelace-background` needs `background.css_variables`.

## Still open

- **Aurora Layout** (v0.6) is not started yet.
- More cards — media player, sensor overview, covers — follow the same pattern.
- Aurora Glass depends on `--ha-card-backdrop-filter`. On a Home Assistant
  version that does not read it, cards stay translucent but unblurred.
- Nothing has been exercised inside a real Home Assistant yet; every check so
  far ran against a faithful mock.

[0.5.0-alpha]: https://github.com/iiNoNoNoii/Aurora-UI/releases/tag/v0.5.0-alpha
[0.4.0-alpha]: https://github.com/iiNoNoNoii/Aurora-UI/releases/tag/v0.4.0-alpha
[0.3.0-alpha]: https://github.com/iiNoNoNoii/Aurora-UI/releases/tag/v0.3.0-alpha
[0.2.0-alpha]: https://github.com/iiNoNoNoii/Aurora-UI/releases/tag/v0.2.0-alpha
[0.1.0-alpha]: https://github.com/iiNoNoNoii/Aurora-UI/releases/tag/v0.1.0-alpha
