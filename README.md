# Aurora Background

> Part of **Aurora UI** – a modular UI suite for Home Assistant.

A procedural, weather- and sun-aware animated background for Home Assistant
dashboards. No wallpaper JPEGs, no video loops: the sky is drawn on a canvas and
interpolated continuously from your actual solar elevation and weather entity,
so dawn really does fade through violet and rose into blue.

[![Validate](https://github.com/OWNER/aurora-background/actions/workflows/validate.yml/badge.svg)](https://github.com/OWNER/aurora-background/actions/workflows/validate.yml)
[![hacs](https://img.shields.io/badge/HACS-custom-41BDF5.svg)](https://hacs.xyz)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## What it does

| | |
|---|---|
| **Continuous sky** | The palette is a function of `sun.sun` elevation, not a day/night switch. Sunrise leans pink and violet, sunset leans amber and gold. |
| **Night** | Deep blue rather than black (OLED friendly), twinkling stars, a moon with a real phase, occasional shooting stars. |
| **Weather aware** | Every Home Assistant `weather` condition is mapped to cloud cover, sky darkness, desaturation, haze and wind. Unknown states fall back gracefully. |
| **Behind everything** | Full viewport, behind all cards, `pointer-events: none`. Scrolling and tapping the dashboard are completely unaffected. |
| **Actually fast** | One canvas, one `requestAnimationFrame` loop, device-pixel-ratio aware, four quality tiers, automatic downscaling, pauses when the tab is hidden, respects `prefers-reduced-motion`. |
| **Local only** | No network requests, no telemetry, no external scripts, no `eval`. ~26 kB gzipped. |

---

## Install via HACS

1. **HACS → three-dot menu (top right) → Custom repositories**
2. Repository: `https://github.com/OWNER/aurora-background`
   Type/Category: **Dashboard** (older HACS calls this *Lovelace* or *Plugin*)
3. **Add**, then open **Aurora Background** and click **Download**.
4. HACS registers the dashboard resource for you. If it did not, add it manually:
   **Settings → Dashboards → three-dot menu → Resources → Add resource**
   - URL: `/hacsfiles/aurora-background/aurora-background.js`
   - Type: **JavaScript module**
5. **Hard-reload the browser** (`Ctrl`/`Cmd` + `Shift` + `R`).

<details>
<summary>Manual install without HACS</summary>

1. Download `aurora-background.js` from the
   [latest release](https://github.com/OWNER/aurora-background/releases/latest).
2. Copy it to `<config>/www/aurora-background.js` (create `www/` if it is missing).
3. Add the resource `/local/aurora-background.js` as **JavaScript module**.
4. Hard-reload the browser.

</details>

---

## Use it

Add **one** card to the view you want the background on:

```yaml
type: custom:aurora-background
weather_entity: weather.home
quality: auto
```

That is the whole configuration for a working setup. `weather_entity` may be
omitted – Aurora then picks the first `weather.*` entity it finds.

Add the same card to each view that should have the background. Views without
the card keep the normal Home Assistant surface.

More snippets: [`examples/configuration-examples.yaml`](examples/configuration-examples.yaml).

---

## Configuration

| Option | Type | Default | Description |
|---|---|---|---|
| `mode` | `background` \| `card` | `background` | Paint behind the whole dashboard, or render as a normal card. |
| `weather_entity` | entity id | first `weather.*` | Source for the weather condition, cloud coverage and wind. |
| `sun_entity` | entity id \| `null` | `sun.sun` | Source for elevation and azimuth. `null` uses the built-in solar model. |
| `quality` | `auto` \| `low` \| `medium` \| `high` \| `ultra` | `auto` | Particle counts, cloud counts, render resolution, glow passes. |
| `debug` | boolean | `false` | Show the FPS / scene / sun / weather overlay. |
| `height` | CSS length | `320px` | Only used in `mode: card`. |

### `effects`

`sun`, `moon`, `stars`, `shooting_stars`, `clouds` — all `true` by default.
`rain`, `snow`, `fog`, `lightning` are accepted today and rendered from v0.2 on;
`fog` already contributes a haze band.

### `appearance`

| Option | Range | Default |
|---|---|---|
| `intensity` | 0 – 2 | 1 |
| `saturation` | 0 – 2 | 1 |
| `brightness` | 0.2 – 2 | 1 |
| `blur` | 0 – 40 px | 0 |
| `ambient_glow` | 0 – 2 | 1 |
| `opacity` | 0 – 1 | 1 |

### `performance`

| Option | Default | Description |
|---|---|---|
| `max_fps` | `60` | Hard frame cap. |
| `auto_quality` | `true` | Steps quality down when frames get expensive (only with `quality: auto`). |
| `pause_when_hidden` | `true` | Stops the loop while the tab is in the background. |

### `background`

| Option | Default | Description |
|---|---|---|
| `transparent_lovelace` | `true` | Makes the dashboard surface see-through so the layer is visible. |
| `transparent_header` | `true` | Also clears the toolbar background. |
| `z_index` | `-1` | Stacking position of the layer. |
| `css_variables` | `{}` | Force extra CSS custom properties to transparent. See [troubleshooting](docs/TROUBLESHOOTING.md). |

A visual editor is included – Aurora appears in the card picker as
**Aurora Background**.

---

## How the full-view background actually works

A Lovelace custom card is always rendered *inside* the view's card grid, and
Home Assistant offers no API for painting behind a view. Aurora therefore:

1. appends one `position: fixed; inset: 0; z-index: -1; pointer-events: none`
   element to `document.body`, and
2. makes the Lovelace surface transparent through the **documented theme
   variable** `--lovelace-background` (plus `html`/`body`, which are in the
   light DOM).

CSS custom properties inherit into shadow roots by specification, and an
`!important` declaration in a stylesheet outranks the inline properties Home
Assistant writes when a theme is applied — so this survives theme switches and
does not depend on the frontend's internal DOM structure. Aurora never reaches
into `home-assistant-main`, `ha-drawer` or any other internal element.

The card itself collapses to zero height in the view. While the dashboard is in
edit mode it shows a small chip so you can select, move and delete it.

Trade-offs you should know about:

- One card per view. Switching views tears the layer down and rebuilds it; a
  single shared, reference-counted layer makes sure two canvases never animate
  at once.
- A theme that paints an opaque background somewhere Aurora does not know about
  will hide the layer. `background.css_variables` is the escape hatch.
- In a **sections** view the card still occupies one small grid cell. Masonry
  views collapse it completely.

Details: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

---

## Performance

| Quality | Render scale | Max DPR | Stars | Clouds | FPS cap |
|---|---|---|---|---|---|
| `low` | 0.6 | 1.0 | 70 | 8 | 30 |
| `medium` | 0.8 | 1.5 | 140 | 14 | 45 |
| `high` | 1.0 | 2.0 | 240 | 22 | 60 |
| `ultra` | 1.0 | 2.5 | 380 | 32 | 60 |

`quality: auto` guesses from CPU cores, device memory and pointer type, then
measures the real frame cost and steps down if the background needs more than
about half the frame budget. It never climbs back above a level it had to leave.

The backing store is additionally capped at ~4.2 megapixels, which keeps 4K
wallpanels from allocating a canvas nobody can afford to repaint.

---

## Roadmap

| Version | Contents |
|---|---|
| **v0.1** (current) | Sky, sun, moon with phase, stars, shooting stars, clouds, quality tiers, HACS packaging |
| v0.2 | Rain, snow, fog and lightning renderers; richer cloud shapes |
| v0.3 | Season engine, ambient weather lighting, parallax |
| v0.4 | Aurora Glass – glassmorphism, card glow, adaptive colours |
| v0.5 | Aurora Cards |
| v0.6 | Aurora Layout – genuinely different layouts for phone, tablet, desktop and wallpanel |

---

## Development

```bash
npm install
npm run build      # -> dist/aurora-background.js
npm run typecheck
npm run dev        # rebuild on change
```

Two browser test pages run against the built bundle without Home Assistant:

```bash
npx vite
```

- `examples/dev-preview.html` – ten sky states side by side, with an elevation slider
- `examples/dev-background.html` – the real full-viewport mount, over mock dashboard cards

`dist/` is committed on purpose: HACS falls back to it when a release has no
attached asset, and the `Validate` workflow fails if it drifts from `src/`.

---

## License

MIT – see [LICENSE](LICENSE).
