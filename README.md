# Aurora UI

A modular UI suite for Home Assistant. One HACS repository, one resource, five
cards so far:

| Card | What it is |
|---|---|
| **Aurora Background** | A procedural, weather- and sun-aware animated sky behind the whole dashboard. No wallpaper JPEGs, no video loops — the sky is drawn on a canvas and interpolated continuously from your actual solar elevation, so dawn really does fade through violet and rose into blue. |
| **Aurora Light** | A light tile that takes the bulb's own colour. Drag for brightness, tap to toggle, hold for more info. |
| **Aurora Climate** | A thermostat with a large target temperature and a surface that shifts from blue to amber as it warms. |
| **Aurora Style** | Wraps *any* card — built-in, third-party, yours — in an Aurora surface. Five presets, no theme editing. |
| **Aurora Layout** | Different cards and column counts for phone, tablet, desktop and wallpanel. A phone is not a small desktop. |

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
| **The real night sky** | About seventy named stars at their actual positions for your latitude, longitude and clock, joined into the traditional constellation figures — and they turn overhead as the night goes on. The Milky Way arcs through them on dark, clear nights, with the bulge toward Sagittarius and the Great Rift where they really are. Plus a moon with a real phase and occasional shooting stars. |
| **Light in the air** | Crepuscular rays fan out from a low sun through gaps in the cloud — strongest around half cover, gone on a clear sky and on an overcast one. |
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

All `true` by default: `sun`, `moon`, `stars`, `shooting_stars`,
`constellations`, `milky_way`, `sun_rays`, `clouds`, `rain`, `snow`, `fog`,
`lightning`, `season`, `parallax`.

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
| `header` | `auto` | `auto` \| `glass` \| `transparent` \| `keep`. See below. |
| `z_index` | `-1` | Stacking position of the layer. |
| `ambient_variables` | `true` | Publish the live sky as `--aurora-*` CSS properties. |
| `css_variables` | `{}` | Force extra CSS custom properties to transparent. See [troubleshooting](docs/TROUBLESHOOTING.md). |

A visual editor is included – Aurora appears in the card picker as
**Aurora Background**.

### The toolbar

Home Assistant's toolbar is opaque by default, and on a dark sky that leaves a
bright slab across the top of an otherwise finished dashboard.

| `header:` | What happens |
|---|---|
| `auto` *(default)* | `glass` when Aurora Glass is on, `transparent` when it is not. |
| `glass` | Translucent, sky-tinted toolbar with a matching text colour. Usually what you want. |
| `transparent` | Clears it completely. Note that your theme's toolbar text colour then sits directly on the sky. |
| `keep` | Leaves the toolbar to your theme. |

```yaml
background:
  header: glass
```

> `transparent_header: true/false` from before 0.6.1 still works and maps to
> `transparent` / `keep`.

---

## Aurora Glass

Opt-in card styling that pulls the sky into the surfaces in front of it:

```yaml
type: custom:aurora-background
weather_entity: weather.home
glass: true
```

Two things it does on its own, because a glass card is only worth having if you
can still read it:

**The surface follows your theme, not the sky.** A light panel over a dark sky
looks milky and hides the thing it is meant to float over. A dark theme gets a
dark translucent surface with a light hairline; a light theme gets the reverse.
Aurora reads your theme's own `--primary-text-color` to decide, so a custom dark
theme works even when Home Assistant reports light mode.

**Opacity is solved for, not guessed.** A translucent card over a bright midday
sky composites to a mid-tone, and mid-tone is where text loses. Aurora
composites the surface over the sky, composites the text over that, and raises
the opacity until the *secondary* text — the faintest thing on the card — clears
`glass.contrast` (default `4.5`, the WCAG AA ratio for normal text). Measured:

| Sky | Opacity | Primary text | Secondary text |
|---|---|---|---|
| Clear night | 0.38, as configured | 15.9:1 | 10.0:1 |
| Midday sun | 0.79, raised | 6.9:1 | 5.0:1 |

So the glass is barely there at night and more substantial at noon, which is
also how real glass behaves. Set `contrast: 0` to switch the adjustment off and
keep your opacity exactly as written.

Pick a preset — the same five Aurora Style uses:

```yaml
glass: frosted # glass | frosted | tinted | outline | minimal | plain
```

Or spell it out. Any value you set explicitly beats the preset it came from:

```yaml
glass:
  enabled: true
  preset: glass
  blur: 14 # backdrop blur in px, 0 disables
  opacity: 0.45 # card surface opacity
  saturate: 1.4 # backdrop saturation
  border: true
  glow: 0.8 # ambient glow around cards, 0–2
  radius: 18 # corner radius in px, -1 keeps your theme's
  contrast: 4.5 # minimum text contrast to hold; 0 disables the adjustment
  adaptive_text: true # raise the theme's text contrast on the glass
```

`adaptive_text` keeps your theme's polarity and raises the contrast of its text
colours — the secondary one in particular, which a theme picks against its own
solid cards and which is the first thing to become unreadable on glass. When
Aurora has scoped itself to a view it writes the text colours there only, so
dialogs and the sidebar keep your theme untouched.

### What if my view has its own theme?

It still works. A theme set on a view is applied by Home Assistant **to the view
element**, which sits between `<html>` and every card in it — and CSS custom
properties resolve from the nearest ancestor that sets them. So a view theme
beats anything written on the document, and `!important` changes nothing,
because the cascade only arbitrates between declarations on the *same* element.

Aurora checks what the cards in your view actually resolve. If a theme is
winning, it finds that element — by walking up from its own card until it
reaches whoever declares the property inline, so no tag names are assumed — and
writes there too. The debug overlay shows `glass (view scope)` when this
happened.

Switching Aurora Glass off puts the theme's original values back exactly.

Cards that style themselves through `--ha-card-*` — which includes Mushroom,
the built-in cards and most of the ecosystem — pick this up automatically.
A card that hard-codes its own background (some `button-card` configs with an
explicit `styles: card: - background:`) will not, because nothing is reading a
variable there; point it at `var(--aurora-card-tint)` instead.

### Switching the whole dashboard's style, live

Point `preset_entity` at any entity whose state is a preset name — an
`input_select` is the obvious one:

```yaml
glass:
  enabled: true
  preset_entity: input_select.dashboard_style
```

```yaml
# configuration.yaml
input_select:
  dashboard_style:
    name: Dashboard style
    options: [glass, frosted, tinted, outline, minimal, plain]
    initial: glass
```

Drop an `entities` card with that helper on the dashboard and the whole thing
restyles as you change it — no reload. An automation can do it too: frosted
during the day when the sky is bright, minimal at night, `plain` when guests
are over.

German option names work as well (`milchglas`, `getönt`, `schlicht`, `aus`),
because people name their helpers in their own language. `plain` switches
Aurora Glass off entirely, so the dropdown doubles as an off switch.

> When `preset_entity` resolves to a preset, that preset supplies **all** the
> surface values — otherwise switching to `frosted` could not change a blur you
> had pinned, which would be a confusing control.

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

### Aurora Style — one surface, any card

```yaml
type: custom:aurora-style
style: glass
card:
  type: entities
  entities:
    - light.living_room
    - sensor.temperature
```

| Preset | Look |
|---|---|
| `glass` | Translucent, blurred, sky-tinted. The default. |
| `frosted` | Heavier blur, more opaque — better over a busy sky. |
| `tinted` | Solid surface that still takes the sky's colour. |
| `outline` | Almost no surface, just a hairline and a whisper of blur. |
| `minimal` | Flat, borderless, no glow. Quiet. |
| `plain` | Hands the card straight back to your theme. |

The same five presets drive **Aurora Glass** dashboard-wide, so `style: frosted`
on a card and `preset: frosted` on the dashboard produce exactly the same
surface — they read from one table.

Override any preset value: `blur`, `opacity`, `saturate`, `glow`, `radius`,
`border`.

It works by setting Home Assistant's own `--ha-card-*` properties on the
wrapper. Custom properties inherit into shadow roots, so the wrapped card's
`ha-card` picks them up **without Aurora touching the card at all** — that is
why it works with cards that do not exist yet.

`plain` is the escape hatch: if dashboard-wide Aurora Glass is on and one card
needs to look normal, wrap it in `style: plain`.

> Use Aurora Style when you want to choose **per card** — for example to keep a
> view theme everywhere and give three tiles a glass surface. For a whole
> dashboard, Aurora Glass is less YAML and handles view themes on its own
> (see [below](#what-if-my-view-has-its-own-theme)).

### Aurora Layout — a phone is not a small desktop

```yaml
type: custom:aurora-layout
gap: 12
cards: # the default set, used by any class without its own
  - type: custom:aurora-climate
    entity: climate.living_room
  - type: custom:aurora-light
    entity: light.living_room
layouts:
  mobile:
    columns: 1
    cards: # the phone deliberately shows less
      - type: custom:aurora-climate
        entity: climate.living_room
  tablet:
    columns: 2
  desktop:
    columns: 3
  wide:
    columns: 4
```

Each class can override the **column count**, the **cards themselves**, and the
gap. That is the point: a wallpanel can show six tiles the phone leaves out,
rather than the same six squeezed into one column.

| Class | Applies below | Default columns |
|---|---|---|
| `mobile` | 600 px | 1 |
| `tablet` | 1000 px | 2 |
| `desktop` | 1600 px | 3 |
| `wide` | — | 4 |

Change them with `breakpoints: {mobile: 700, tablet: 1100, desktop: 1800}`.

Breakpoints are measured against **the card's own width**, not the viewport —
inside a narrow sections column on a wide screen, the layout follows the space
it actually has.

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
| `--aurora-surface-rgb` | the same surface as a bare `r, g, b` list, for your own alpha |
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
| v0.5 | Aurora Cards – Light and Climate | ✅ |
| **v0.6** (current) | Aurora Layout, Aurora Style, Milky Way, sun rays | ✅ |

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

## The real sky

`effects.constellations` puts about seventy named stars where they actually
are. Right ascension and declination are converted to altitude and azimuth
using your Home Assistant latitude, longitude and the current sidereal time, so
Orion rises in winter, the Summer Triangle stands overhead in August, and the
whole sky turns 15° every hour. Southern latitudes get the Southern Cross and
Alpha Centauri instead.

The sun, the moon and the stars all share one projection — 240° of azimuth
across the width — so the moon really does sit among the constellations.

```yaml
effects:
  constellations: false # just the decorative star field, no figures
```

Where the data comes from, and why it is safe to ship, is set out in
[THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md): the positions are
measurements (facts carry no copyright), no catalogue file is embedded, and the
constellation lines were drawn for this project rather than taken from one.

---

## License

**GNU Affero General Public License v3.0 or later** – see [LICENSE](LICENSE).
Third-party components and the astronomical data are covered in
[THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md).

In short: you may use, study, change and share Aurora UI freely. If you
distribute a modified version — or run one as part of a network service —
you have to make your source available under the same license. The built
`aurora-ui.js` carries a banner pointing back at this repository so anyone who
receives the bundle can find the source.
