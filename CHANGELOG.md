# Changelog

All notable changes to Aurora UI are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and the project uses [Semantic Versioning](https://semver.org/).

## [0.6.6-alpha] – 2026-09-16

From a screen recording: cards still switched to the wrong colour on
navigation after 0.6.5, and the initial double flicker on a fresh dashboard
load hadn't gone away, even though switching between already-loaded views no
longer showed it.

### Fixed

- **Aurora Glass now remembers every view it has ever had to correct, not
  just one.** The fast-detection window added in 0.6.5 only ran once, for six
  seconds after the layer was first built — a *second* themed view, switched
  to later in the session, fell back to the slow two-second poll, and
  switching *back* to an already-corrected view lost that correction entirely,
  since only a single view was ever tracked. Aurora now keeps a small map of
  every view element it has found shadowing it, keeps all of them in sync on
  every update — not only the currently visible one — and re-verifies
  **immediately** (not on the next poll tick) the moment the active view
  changes. Verified end to end: a first-time switch to a themed view is
  corrected within one animation frame instead of up to two seconds, and
  switching away and back shows the correct colour with no wait at all, since
  the view was kept in sync the whole time it was hidden.
- A related gap in `verify()`: if a view Aurora had *already* corrected got its
  theme reapplied later (a mismatch on an already-tracked host), the check
  detected it but then did nothing, because it only forced a rewrite for
  *newly* found hosts. It now forces the correction through either way.
- **The initial double flicker gets more headroom.** The debounced teardown
  added in 0.6.5 waited 800 ms for a reconnect before actually tearing down;
  a cold dashboard load has far more main-thread contention than a later
  in-app view switch — the frontend still initialising, other cards' own
  resources still parsing, a WebSocket still connecting — so the same class of
  Home-Assistant-internal re-render pass can take noticeably longer to
  reconnect there. Raised to 2.5 s. The cost of waiting longer before a
  genuine, permanent removal is a canvas quietly animating unseen for a
  couple of extra seconds — negligible next to the flicker it prevents.

## [0.6.5-alpha] – 2026-09-16

Three problems from watching a real dashboard load and navigate: the sky
flickered twice on every load or view switch, cards briefly showed the wrong
colour before settling, and dialogs/menus were unreadably transparent.

### Fixed

- **The background no longer flickers on load or view switch.** Home
  Assistant's own dashboard bootstrapping is known to recreate view and card
  elements more than once while it resolves the final config — an initial pass
  with a cached or default config, then again once the real one arrives.
  Every one of those passes disconnected Aurora's card and reconnected a new
  instance moments later, and the shared background layer treated that as
  "the background is gone": it destroyed the canvas **and** removed the
  transparency stylesheet immediately, letting the theme's own opaque
  background flash through until a new layer was built from scratch. That is
  what read as two flickers, at whatever intervals those passes happened to
  land.

  The shared layer now waits 800 ms after the last owner releases before
  actually tearing anything down. A reconnect inside that window — which is
  what every case above is — just resumes driving the exact same canvas and
  stylesheet; nothing is ever removed. Verified directly: disconnecting and
  reconnecting the card within the window leaves the root element, its canvas
  and the style element as the *same* DOM nodes throughout, while a
  disconnect with no reconnect still tears down correctly once the window
  passes.

- **Cards no longer sit in the wrong colour for a moment after navigating.**
  This was a gap in the fix that let Aurora Glass win against a view-level
  theme at all: detecting the mismatch (`GlassStyles.verify()`) cleared the
  comparison cache so the *next* write would differ, but `update()` also
  throttles on elapsed time regardless of whether anything changed — so the
  correction could still land up to `MIN_INTERVAL_MS` (500 ms) after
  detection, on a clock that had nothing to do with when the theme was
  actually applied. `verify()` now reports back when it found something to
  fix, and that forces the very next frame through immediately, the same way
  an entity-driven preset change already does. Verified end to end against a
  simulated view theme: the view element's own inline property is overwritten
  with Aurora's value, not just the document's.

  The detection cadence is also faster right after mount — every 120 ms for
  the first 6 seconds, falling back to the cheap 2 s poll once settled — since
  Home Assistant applies (or re-applies) a view theme within exactly that
  window.

- **Dialogs and menus are readable again.** The more-info dialog, this card's
  own edit dialog, and the three-dot overflow menu were all picking up
  Aurora Glass's near-transparent card colour and showing the dashboard
  straight through. The cause: `--card-background-color` is not
  card-specific — Home Assistant's base styles commonly alias the Material
  `--mdc-theme-surface` token to it, and every Material dialog and dropdown
  menu takes its surface from that token. Aurora was handing it the same
  translucent value used for `--ha-card-background`.

  `--card-background-color` and `--mdc-theme-surface` now get a solid,
  near-opaque variant of the same colour instead, written independently of
  the deliberately translucent `--ha-card-background` cards actually use.
  Verified: with Glass active, `--ha-card-background` stays at the configured
  translucent alpha while `--card-background-color` and `--mdc-theme-surface`
  both resolve to a 0.96-alpha solid of the same tone. `--mdc-theme-surface`
  is written to the document only (a dialog is not necessarily a descendant
  of whichever view got escalated) and with `!important`, since a modal
  surface has no business being glass in the first place.

## [0.6.4-alpha] – 2026-09-15

Two readability problems from a photograph of a real dashboard: the cards were
milky and swallowed the sky, and the secondary text — every temperature, every
"in 6 days" — was barely legible.

### Fixed

- **The glass surface was inverted.** It mixed the sky's ambient colour toward
  *white* on a dark sky, on contrast grounds. That is what made it milky: a pale
  panel at any useful opacity hides the thing it is supposed to be floating
  over. The surface now follows the **theme's** polarity — a dark theme gets a
  dark translucent surface with a light hairline, which is what every dark
  interface that does this well uses. Polarity is read from the theme's own
  `--primary-text-color`, so a custom dark theme works even when Home Assistant
  reports light mode; `hass.themes.darkMode` is only the fallback.

- **Opacity is now solved for rather than guessed.** A translucent card over a
  bright sky composites to a mid-tone, and mid-tone is where text of either
  polarity loses. Aurora composites the surface over the sky behind it,
  composites the text over that, and bisects for the lowest opacity at which the
  *secondary* text clears the new `glass.contrast` target (default 4.5, the WCAG
  AA ratio for normal text; 0 disables).

  Measured, on the same night sky, for the secondary text: **1.24:1 before,
  6.29:1 after** — the old value was effectively invisible, which is exactly
  what was reported. At midday the solver raises opacity from 0.43 to 0.79 and
  lifts contrast from 2.63:1 to 4.98:1, while a clear night stays at the
  configured 0.38 and needs no help at all.

### Changed

- `adaptive_text` now defaults to **on**. A theme picks its text colours against
  its own solid cards; once the card is translucent those colours are no longer
  the ones it chose. Aurora keeps the theme's polarity and raises the contrast
  rather than inventing a colour — and when it has scoped itself to a view, the
  text colours are written *there only*, so dialogs and the sidebar keep the
  user's theme.
- Preset opacities lowered so more sky shows through, now that the surface is
  dark: `glass` 0.45 → 0.38, `frosted` 0.72 → 0.58, `minimal` 0.55 → 0.42.
  The solver raises them again where a bright sky needs it.

## [0.6.3-alpha] – 2026-09-15

### Changed

- **Aurora Glass now wins against a view-level theme instead of just reporting
  it.** 0.6.2 detected the situation and told the user to work around it; that
  was the wrong end of the problem.

  When the probe shows that the cards in a view resolve something other than
  what Aurora wrote, Aurora locates the element responsible — by walking up from
  its own card until it finds whoever declares the property inline, so no
  frontend tag names are assumed and nothing is found when nothing is in the
  way — and writes its properties there as well. The debug overlay's `glass`
  line reads `(view scope)` when that has happened.

  Verified end to end against a simulated view theme: the cards keep Aurora's
  surface instead of flipping to the theme's colour.

- **Disabling Glass restores the theme exactly.** Escalating means overwriting
  part of the user's own theme on the view element, so the original inline
  declarations are captured first and put back on `clear()` — switching the
  preset to `plain` returns the view to precisely the value the theme had set,
  rather than leaving it with nothing until Home Assistant happens to reapply.

## [0.6.2-alpha] – 2026-09-15

### Added

- **Aurora Glass now notices when it is being overridden, and says so.**
  A theme set on a *view* is applied by Home Assistant to the view element,
  which sits between `<html>` and every card in that view. Custom properties
  resolve from the nearest ancestor that sets them, so the view theme wins over
  Aurora Glass — and `!important` cannot change that, because the cascade only
  arbitrates between declarations on the same element.

  Measured rather than assumed: with a view theme in place, a plain card
  resolves the theme's colour while a card wrapped in `custom:aurora-style`
  resolves Aurora's, because the wrapper sits closer still.

  Aurora now probes what the cards in the view actually resolve, reports
  *"overridden by view theme"* on the debug overlay's new `glass` line, and logs
  a one-time console warning naming the two ways out. Documented in
  [troubleshooting](docs/TROUBLESHOOTING.md).

### Fixed

- Aurora Glass re-asserts its properties if something else rewrites them on
  `<html>`. Applying a theme rewrites the same properties on the same element,
  and the change gate would have skipped the next write because Aurora's own
  inputs had not changed — leaving the theme in possession.

## [0.6.1-alpha] – 2026-09-15

From a screenshot of a real dashboard: the toolbar stayed an opaque slab across
the top, and switching the whole dashboard's style needed editing YAML.

### Added

- **One preset table** (`core/surface-presets.ts`) shared by Aurora Glass and
  Aurora Style, so `style: frosted` on a card and `preset: frosted` on the
  dashboard produce the same surface. New `minimal` preset: flat, borderless,
  no glow.
- **`glass.preset`** — pick a named surface for the whole dashboard.
  `glass: frosted` is shorthand for enabling it with that preset.
- **`glass.preset_entity`** — follow any entity whose state is a preset name,
  typically an `input_select`. The dashboard restyles live from a dropdown, an
  automation, or the time of day, with no reload. German option names are
  accepted too, and `plain` doubles as the off switch.
- **`background.header`** with four modes. `glass` gives the toolbar a
  translucent, sky-tinted surface and a matching text colour, which is what a
  dark sky actually needs — a fully transparent toolbar drops the theme's dark
  text straight onto it. `auto` (the new default) picks `glass` when Aurora
  Glass is on and `transparent` otherwise. `transparent_header: true/false`
  still works and maps to `transparent` / `keep`.

### Fixed

- Aurora Glass ignored a preset change that altered only blur and opacity.
  Its change gate compared the sky colours but not the options themselves, so
  switching `frosted` → `minimal` short-circuited and never reached the
  document. The options are part of the gate now.
- A preset change writes immediately instead of waiting out the 500 ms write
  throttle — somebody flipping a dropdown should not watch for half a second.

## [0.6.0-alpha] – 2026-09-15

Aurora Layout, Aurora Style, and the sky pushed as far as a canvas goes.

### Added — cards

- **Aurora Style** (`custom:aurora-style`) wraps *any* card — built-in,
  third-party, not yet written — in an Aurora surface. Five presets: `glass`,
  `frosted`, `tinted`, `outline` and `plain`, each overridable per option. It
  works by setting Home Assistant's own `--ha-card-*` properties on the
  wrapper; custom properties inherit into shadow roots, so the wrapped card's
  `ha-card` picks them up without Aurora touching the card. `plain` resets
  them to the guaranteed-invalid value, which makes `var()` fall through to the
  theme — that is how you exclude one card from a dashboard-wide Aurora Glass.
- **Aurora Layout** (`custom:aurora-layout`) gives each device class its own
  column count *and its own set of cards*, so a wallpanel can show tiles the
  phone deliberately leaves out instead of the same ones squeezed into a
  column. Classes are `mobile` / `tablet` / `desktop` / `wide`, and the
  breakpoints are measured against **the card's own width**, not the viewport —
  inside a narrow sections column on a wide screen, the layout follows the
  space it actually has. Cards are only rebuilt when the set changes.
- `shared/card-factory.ts`, building children through
  `window.loadCardHelpers()` — the same route every container card in the
  ecosystem uses — with a self-contained error card so a broken child config
  can never blank a dashboard.

### Added — sky

- **The Milky Way.** Sampled as several hundred soft patches along the galactic
  plane and projected exactly like the stars, so the band rises, arcs over and
  sets with the rest of the sky. Brightness follows the real structure: the
  bulge toward Sagittarius, the run through Cygnus, the thin anticentre, and
  the Great Rift subtracting from the glow in front of the inner arm. Only
  appears on a genuinely dark, clear, moonless night, as the real one does.
  Galactic → equatorial conversion is built from two measured directions rather
  than memorised identities, and checks out exactly against the known
  coordinates of the centre, the pole and the anticentre.
- **Crepuscular rays.** A fan of long, faint wedges from a low sun. Volumetric
  shafts would mean radial-blurring the cloud layer every frame, which a
  dashboard cannot afford; these are drawn directly and stacked from a few
  widths at low alpha so their edges are soft without a blur pass. They peak
  around half cloud cover and vanish on both a clear and a fully overcast sky,
  because that is when there is something for light to break through.
- `--aurora-surface-rgb`: the ambient card surface as a bare `r, g, b` list, so
  any card can pick its own alpha. Aurora Style is built on it.

### Changed

- **Dithering moved to the end of the render.** It used to be part of the sky
  gradient; every soft glow in the scene has the same 8-bit banding problem,
  and the Milky Way's very faint radial gradients showed it as visible blocks.
  Dithering the composited frame fixes all of them at once.

## [0.5.3-alpha] – 2026-09-15

The sky gets the resolution it was missing, and a real one behind it.

### Added

- **Real constellations.** About seventy named stars are placed at their actual
  altitude and azimuth for the configured latitude, longitude and the current
  sidereal time, and joined into the traditional figures. Orion rises in
  winter, the Summer Triangle stands overhead in August, southern latitudes get
  the Southern Cross. Positions are recomputed every 20 s, not per frame.
  Toggle with `effects.constellations`.
- **One shared projection** (`core/projection.ts`) for the sun, the moon and
  the stars — 240° of azimuth across the width — so the moon sits among the
  constellations instead of on its own private track.
- [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md), covering the bundled Lit
  copyright notice and where the star data comes from.

### Changed — why the sky looks sharper

Three things separated it from a premium gradient, and all three are fixed:

- **Interpolation now happens in linear light.** Mixing gamma-encoded sRGB
  darkens and muddies the midpoint of every blend, which is precisely where a
  large sky shows it — the band between two stops went grey.
- **A cubic through the palette instead of straight lines between stops.** A
  `CanvasGradient` interpolates linearly between the stops it is handed, putting
  a visible kink at each one. The five palette colours are now sampled through
  a Hermite curve and fed in as 24 stops.
- **Dithering.** A full-screen 8-bit gradient bands badly in deep twilight
  blues. One pixel of static noise, drawn with the transform reset so it lands
  on device pixels, dissolves it. Measured on a 720 px column: 704 colour
  changes and a longest flat run of 2 px, where banding means long flat runs.

### Fixed

- The vertical projection capped at 60° altitude, so everything higher — Vega,
  Deneb, Delta Cygni — collapsed onto one line. It now runs to the zenith.
- Objects outside the drawn azimuth range were clamped to the screen edge,
  stacking them there. They are culled instead.

## [0.5.2-alpha] – 2026-09-15

### Fixed

Three candidate causes for the flickering reported on Chrome for Android — it
did not appear on desktop, nor in desktop devtools device emulation, which
points at real GPU and compositing behaviour rather than at the drawing code:

- **Dropped the `desynchronized: true` canvas hint.** It is a low-latency hint
  meant for stylus input; on some Android GPUs it puts the canvas on a
  presentation path that tears. A background gains nothing from it.
- **Repaint in the same frame as a resize.** Assigning `canvas.width` clears
  the canvas, and with `alpha: false` a cleared canvas is black. Waiting for
  the next animation frame lets that black frame reach the screen. On Android
  the URL bar hides and shows while scrolling, resizing the layer again and
  again — one black flash per resize.
- **Forced a stable compositor layer** on the background element
  (`translateZ(0)` plus `backface-visibility: hidden`). A `position: fixed`
  element behind scrolling content gets promoted and demoted repeatedly on
  Android Chrome, and each change can present a partially painted frame.

Cloud shape, from the "angular and cut off at the sides" report:

- **The base no longer overflows the sprite.** It was drawn as a few wide
  ellipses spanning the whole sprite, which ran past the canvas on both sides
  and got clipped — a literal straight cut. Each lobe now carries its own piece
  of the base, so the underside follows the cloud's own profile.
- **Lobe width follows the lobe spacing, not the lobe height.** A single lobe
  could otherwise grow half a sprite wide, which flattened the outline into one
  smooth dome and pushed it over the edge.
- **A second pass of smaller lobes** breaks that dome, so the silhouette is
  irregular the way a real cloud is.
- The taper no longer reaches zero at the ends: a cloud now finishes on a
  rounded lobe instead of the thin tip of the base.

### Changed

- When a weather integration reports an actual `cloud_coverage` percentage, it
  now dominates the condition's own value (0.85 rather than 0.65) — the number
  of clouds tracks the real sky more closely.

## [0.5.1-alpha] – 2026-09-15

Clouds rewritten, after a user screen recording showed what they actually
looked like on a phone: a scatter of separate translucent discs and, at small
sizes, a row of dots.

### Fixed

- **Clouds are built as a silhouette now.** Opaque lobes are unioned into one
  shape and then blurred in a single pass, instead of stacking soft translucent
  blobs. Translucent blobs never merge — they stay legible as discs, and where
  two of them drift across each other the overlap brightens and dims. That
  shimmer is what reads as flickering.
- Lobes sit at regular intervals with jitter rather than at random positions.
  Random placement leaves gaps, which is why thin stratus sprites looked like a
  dotted line.
- **Cloud size now follows the viewport width**, with a height cap. It used to
  be derived from a height reference times the aspect ratio, which made a
  single stratus sheet wider than a phone screen.
- **Each cloud wraps over its own width** instead of over one span sized for
  the largest possible cloud. The shared span parked roughly three quarters of
  the field off-screen at any moment, so an overcast sky showed a handful of
  lonely puffs.
- **Cloudiness drives size as well as count.** An overcast sky is not a clear
  sky with more small clouds in it.
- Cloud re-tinting now triggers at ~2 per channel instead of ~6, rate-limited
  to five times a second. The coarse threshold made clouds change colour in
  visible steps while the sky behind them moved continuously.
- A quality change no longer teleports every cloud back to its seeded starting
  position; drift is carried across the rebuild.
- Fixed a `destination-in` mask in the sprite builder that filled only the
  bottom strip and therefore erased the whole cloud above it.

### Added

- `examples/dev-clouds.html` – renders the raw cloud sprites at full size
  against a light and a dark sky, which is how the above was diagnosed.

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

[0.6.6-alpha]: https://github.com/iiNoNoNoii/Aurora-UI/releases/tag/v0.6.6-alpha
[0.6.5-alpha]: https://github.com/iiNoNoNoii/Aurora-UI/releases/tag/v0.6.5-alpha
[0.6.4-alpha]: https://github.com/iiNoNoNoii/Aurora-UI/releases/tag/v0.6.4-alpha
[0.6.3-alpha]: https://github.com/iiNoNoNoii/Aurora-UI/releases/tag/v0.6.3-alpha
[0.6.2-alpha]: https://github.com/iiNoNoNoii/Aurora-UI/releases/tag/v0.6.2-alpha
[0.6.1-alpha]: https://github.com/iiNoNoNoii/Aurora-UI/releases/tag/v0.6.1-alpha
[0.6.0-alpha]: https://github.com/iiNoNoNoii/Aurora-UI/releases/tag/v0.6.0-alpha
[0.5.3-alpha]: https://github.com/iiNoNoNoii/Aurora-UI/releases/tag/v0.5.3-alpha
[0.5.2-alpha]: https://github.com/iiNoNoNoii/Aurora-UI/releases/tag/v0.5.2-alpha
[0.5.1-alpha]: https://github.com/iiNoNoNoii/Aurora-UI/releases/tag/v0.5.1-alpha
[0.5.0-alpha]: https://github.com/iiNoNoNoii/Aurora-UI/releases/tag/v0.5.0-alpha
[0.4.0-alpha]: https://github.com/iiNoNoNoii/Aurora-UI/releases/tag/v0.4.0-alpha
[0.3.0-alpha]: https://github.com/iiNoNoNoii/Aurora-UI/releases/tag/v0.3.0-alpha
[0.2.0-alpha]: https://github.com/iiNoNoNoii/Aurora-UI/releases/tag/v0.2.0-alpha
[0.1.0-alpha]: https://github.com/iiNoNoNoii/Aurora-UI/releases/tag/v0.1.0-alpha
