# Changelog

All notable changes to Aurora Background are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project uses [Semantic Versioning](https://semver.org/).

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

[0.1.0-alpha]: https://github.com/OWNER/aurora-background/releases/tag/v0.1.0-alpha
