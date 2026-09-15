# Aurora UI

A modular UI suite for Home Assistant. One HACS repository, one resource, three
cards so far:

| Card | What it is |
|---|---|
| **Aurora Background** | A procedural, weather- and sun-aware animated sky behind the whole dashboard. No wallpaper JPEGs, no video loops — the sky is drawn on a canvas and interpolated continuously from your actual solar elevation, so dawn really does fade through violet and rose into blue. |
| **Aurora Light** | A light tile that takes the bulb's own colour. Drag for brightness, tap to toggle, hold for more info. |
| **Aurora Climate** | A thermostat with a large target temperature and a surface that shifts from blue to amber as it warms. |

Plus **Aurora Glass**, which turns every Lovelace card into a translucent
surface that drifts with the sky.

[![Validate](https://github.com/iiNoNoNoii/Aurora-UI/actions/workflows/validate.yml/badge.svg)](https://github.com/iiNoNoNoii/Aurora-UI/actions/workflows/validate.yml)
[![hacs](https://img.shields.io/badge/HACS-custom-41BDF5.svg)](https://hacs.xyz)
[![license](https://img.shields.io/badge/license-AGPL--3.0-blue.svg)](LICENSE)

---

## Aurora Background

| | |
|---|---|
| **Continuous sky** | The palette is a function of `sun.sun` elevation, not a day/night switch. Sunrise leans pink and violet, sunset leans amber and gold. |
| **Night** | Deep blue rather than black (OLED friendly), twinkling stars, a moon with a real phase, occasional shooting stars. |
| **Real weather** | Rain, snow, drifting fog and restrained lightning, plus two families of procedural clouds. Every Home Assistant `weather` condition is mapped; unknown states fall back gracefully. |
| **Seasons** | A faint, hemisphere-aware seasonal cast — hazier and warmer in summer, amber in autumn, cool and pale in winter. Blended continuously, never switched. |
| **Ambient lighting** | The live sky is published as `--aurora-*` CSS properties, and **Aurora Glass** turns your cards into translucent surfaces that drift with it. |
| **Behind everything** | Full viewport, behind all cards, `pointer-events: none`. Scrolling and tapping the dashboard are completely unaffected. |
| **Actually fast** | One canvas, one `requestAnimationFrame` loop, device-pixel-ratio aware, four quality tiers, automatic downscaling, batched particle drawing, pauses when the tab is hidden, respects `prefers-reduced-motion`. |
| **Local only** | No network requests, no telemetry, no external scripts, no `eval`. ~33 kB gzipped. |

---

## Install via HACS

1. **HACS → three-dot menu (top right) → Custom repositories**
2. Repository: `https://github.com/iiNoNoNoii/Aurora-UI`
   Type/Category: **Dashboard** (older HACS calls this *Lovelace* or *Plugin*)
3. **Add**, then open **Aurora Background** and click **Download**.
4. HACS registers the dashboard resource for you. If it did not, add it manually:
   **Settings → Dashboards → three-dot menu → Resources → Add resource**
   - URL: `/hacsfiles/Aurora-UI/aurora-ui.js`
   - Type: **JavaScript module**
5. **Hard-reload the browser** (`Ctrl`/`Cmd` + `Shift` + `R`).

<details>
<summary>Manual install without HACS</summary>

1. Download `aurora-ui.js` from the
   [latest release](https://github.com/iiNoNoNoii/Aurora-UI/releases/latest).
2. Copy it to `<config>/www/aurora-ui.js` (create `www/` if it is missing).
3. Add the resource `/local/aurora-ui.js` as **JavaScript module**.
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

All `true` by default: `sun`, `moon`, `stars`, `shooting_stars`, `clouds`,
`rain`, `snow`, `fog`, `lightning`, `season`, `parallax`.

These are *permissions*, not switches — rain only appears when your weather
entity actually reports rain. Set one to `false` to rule the effect out entirely.

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
| `ambient_variables` | `true` | Publish the live sky as `--aurora-*` CSS properties. |
| `css_variables` | `{}` | Force extra CSS custom properties to transparent. See [troubleshooting](docs/TROUBLESHOOTING.md). |

A visual editor is included – Aurora appears in the card picker as
**Aurora Background**.

---

## Aurora Glass

Opt-in card styling that pulls the sky into the surfaces in front of it:

```yaml
type: custom:aurora-background
weather_entity: weather.home
glass: true
```

Or spelled out (these are the defaults):

```yaml
glass:
  enabled: true
  blur: 14 # backdrop blur in px, 0 disables
  opacity: 0.5 # card surface opacity
  saturate: 1.4 # backdrop saturation
  border: true
  glow: 1.0 # ambient glow around cards, 0–2
  radius: 18 # corner radius in px, -1 keeps your theme's
  adaptive_text: false # also drive --primary-text-color
```

Glass writes only Home Assistant's documented `--ha-card-*` theme variables, so
it works with any theme and any card. Turning it off removes every property it
set and hands the dashboard straight back to your theme.

`adaptive_text` is off by default because `--primary-text-color` reaches beyond
cards into dialogs and the sidebar — turn it on if your sky is bright and card
text gets hard to read.

> Blur relies on `--ha-card-backdrop-filter`. On a Home Assistant version that
> does not read it, cards stay translucent but unblurred.

---

## Aurora Cards

Both cards work with or without Aurora Background — they use `--aurora-*` when
it is there and fall back to your theme when it is not. Both appear in the card
picker with a visual editor.

### Aurora Light

```yaml
type: custom:aurora-light
entity: light.living_room
```

| | |
|---|---|
| Drag across the card | brightness |
| Tap | toggle |
| Tap the icon | toggle |
| Hold | more-info dialog |

The tile takes the light's real colour — `rgb_color`, or `color_temp_kelvin`
converted to RGB — so a column of lights reads at a glance. Lights that only
support on/off get a plain toggle, no slider.

| Option | Default | Description |
|---|---|---|
| `entity` | *required* | Any `light.*` entity. |
| `name` | friendly name | Override the label. |
| `icon` | auto | Any `mdi:` icon. |
| `slider` | `true` | `false` makes the whole card a plain toggle. |
| `use_light_color` | `true` | `false` uses a neutral warm white instead. |

> The slider claims horizontal drags but declares `touch-action: pan-y`, so
> vertical scrolling past the card still works on a phone. If you use a
> swipe-between-views plugin, set `slider: false` on cards near the edge.

### Aurora Climate

```yaml
type: custom:aurora-climate
entity: climate.living_room
```

| | |
|---|---|
| − / + | one `target_temp_step` |
| Drag across the temperature row | set the target directly |
| Mode buttons | `climate.set_hvac_mode` |
| Hold the icon | more-info dialog |

Service calls are debounced, so dragging from 18 to 24 sends one command rather
than twelve. The card's tint follows the target within the thermostat's own
`min_temp`/`max_temp` range.

| Option | Default | Description |
|---|---|---|
| `entity` | *required* | Any `climate.*` entity. |
| `name` | friendly name | Override the label. |
| `icon` | `mdi:thermostat` | Any `mdi:` icon. |
| `show_modes` | `true` | Hide the HVAC mode row. |
| `slider` | `true` | `false` leaves only the − / + buttons. |

---

### Using the ambient colours yourself

Whether or not Glass is on, these properties are live on `<html>`:

| Property | Example |
|---|---|
| `--aurora-ambient-color` / `--aurora-ambient-rgb` | `rgb(227,177,155)` / `227, 177, 155` |
| `--aurora-sky-color`, `--aurora-horizon-color` | the gradient's mid and horizon bands |
| `--aurora-accent-color` / `--aurora-accent-rgb` | the sun or moon glow |
| `--aurora-glow-strength` | `0` – `1` |
| `--aurora-night`, `--aurora-day` | `0` – `1` |
| `--aurora-contrast-color` | text colour that stays readable |
| `--aurora-card-tint`, `--aurora-card-border` | a ready-made glass surface |
| `--aurora-season`, `--aurora-condition` | `autumn`, `partlycloudy` |

Use them anywhere that accepts CSS — a theme, `card-mod`, a custom card:

```yaml
card_mod:
  style: |
    ha-card {
      background: var(--aurora-card-tint);
      box-shadow: 0 0 40px rgba(var(--aurora-accent-rgb), calc(var(--aurora-glow-strength) * 0.15));
    }
```

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

| Quality | Render scale | Max DPR | Stars | Clouds | Rain | Snow | Fog | FPS cap |
|---|---|---|---|---|---|---|---|---|
| `low` | 0.6 | 1.0 | 70 | 8 | 100 | 50 | 2 | 30 |
| `medium` | 0.8 | 1.5 | 140 | 14 | 220 | 110 | 3 | 45 |
| `high` | 1.0 | 2.0 | 240 | 22 | 400 | 200 | 4 | 60 |
| `ultra` | 1.0 | 2.5 | 380 | 32 | 650 | 320 | 5 | 60 |

Rain and snow are drawn as one batched path per depth band, so 650 drops cost
three draw calls rather than six hundred.

`quality: auto` guesses from CPU cores, device memory and pointer type, then
measures the real frame cost and steps down if the background needs more than
about half the frame budget. It never climbs back above a level it had to leave.

The backing store is additionally capped at ~4.2 megapixels, which keeps 4K
wallpanels from allocating a canvas nobody can afford to repaint.

---

## Roadmap

| Version | Contents | |
|---|---|---|
| v0.1 | Sky, sun, moon with phase, stars, shooting stars, clouds, quality tiers, HACS packaging | ✅ |
| v0.2 | Rain, snow, fog and lightning renderers; stratus/cumulus clouds | ✅ |
| v0.3 | Season engine, ambient weather lighting, parallax | ✅ |
| v0.4 | Aurora Glass – glassmorphism, card glow, adaptive colours | ✅ |
| **v0.5** (current) | Aurora Cards – Light and Climate | ✅ |
| v0.6 | Aurora Layout – genuinely different layouts for phone, tablet, desktop and wallpanel | planned |

More cards (media player, sensor overview, covers) follow the same pattern and
land as they are needed.

---

## Development

```bash
npm install
npm run build      # -> dist/aurora-ui.js
npm run typecheck
npm run dev        # rebuild on change
```

Two browser test pages run against the built bundle without Home Assistant:

```bash
npx vite
```

- `examples/dev-preview.html` – twelve sky states side by side, with an elevation slider
- `examples/dev-background.html` – the real full-viewport mount, over mock dashboard cards
- `examples/dev-cards.html` – Light and Climate against a mock Home Assistant whose service calls really mutate state
- `examples/dev-moon.html?phase=0.25` – one moon phase at a time, clock frozen to its transit
- `examples/dev-clouds.html` – the raw cloud sprites at full size, on a light and a dark sky
- `examples/dev-lightning.html` – drives the lightning renderer from source on a fixed clock

`dist/` is committed on purpose: HACS falls back to it when a release has no
attached asset, and the `Validate` workflow fails if it drifts from `src/`.

---

## License

**GNU Affero General Public License v3.0 or later** – see [LICENSE](LICENSE).

In short: you may use, study, change and share Aurora UI freely. If you
distribute a modified version — or run one as part of a network service —
you have to make your source available under the same license. The built
`aurora-ui.js` carries a banner pointing back at this repository so anyone who
receives the bundle can find the source.
