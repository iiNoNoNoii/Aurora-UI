# Architecture

```
src/
├── index.ts                         entry point, card-picker registration
├── aurora-background-card.ts        the Lovelace custom element
│
├── core/
│   ├── types.ts                     shared types + the minimal `hass` surface
│   ├── config.ts                    defaults, normalisation, quality profiles
│   ├── math.ts                      lerp / smoothstep / damp / seeded RNG
│   ├── color.ts                     RGB helpers
│   ├── palette.ts                   the sky colour model
│   ├── season.ts                    hemisphere-aware seasonal cast
│   ├── solar.ts                     sun position fallback + moon phase
│   ├── animation-engine.ts          one rAF loop with a frame cap
│   ├── performance-manager.ts       frame-cost sampling and quality steps
│   ├── scene-manager.ts             HA state -> SceneState, renderer order
│   ├── aurora-layer.ts              canvas, listeners, lifecycle
│   ├── ambient-variables.ts         publishes --aurora-* to the document
│   ├── glass-styles.ts              Aurora Glass: drives --ha-card-*
│   └── background-mount.ts          the fixed full-viewport layer (singleton)
│
├── renderers/
│   ├── sky-renderer.ts
│   ├── star-renderer.ts
│   ├── moon-renderer.ts
│   ├── sun-renderer.ts
│   ├── cloud-renderer.ts
│   ├── fog-renderer.ts
│   ├── rain-renderer.ts
│   ├── snow-renderer.ts
│   └── lightning-renderer.ts
│
├── weather/
│   ├── weather-mapping.ts           HA condition -> WeatherProfile
│   └── weather-engine.ts            read `hass`, blend between profiles
│
├── editor/aurora-background-editor.ts
├── ui/debug-overlay.ts
└── styles/styles.ts
```

## Data flow

```
hass ──▶ readEnvironment() ──▶ EnvironmentSnapshot
                                     │
             computeSeason() ────────┤
                                     ├─▶ WeatherBlender  (4 s cross-fade)
                                     └─▶ damped elevation/azimuth (1.5 s)
                                                 │
                                        computePalette()
                                                 │
                                        dampPalette (0.6 s)
                                                 │
                                            SceneState ──▶ AmbientVariables
                                                 │         GlassStyles
                                                 │         (throttled, gated)
                                                 ▼
   sky ▸ stars ▸ moon ▸ sun ▸ clouds ▸ fog ▸ rain ▸ snow ▸ lightning
```

Painter's order runs back to front: the sky, then the celestial bodies, then
the clouds, then everything that happens between the clouds and the viewer.
Lightning is last because a flash lights the whole scene.

Nothing snaps. Every input that Home Assistant can change abruptly – the
weather state, `sun.sun` elevation after a 30 s update – is passed through an
exponential smoother whose half-life is expressed in seconds and applied
frame-rate independently (`damp()` in `core/math.ts`). The one exception is a
still frame painted while the loop is paused: with no time passing, damping
would never converge, so `renderOnce()` snaps.

## The sky model

`core/palette.ts` holds eight key palettes at solar elevations
`-90, -12, -6, -2, 3, 12, 35, 70`, each with nine colours (zenith → horizon,
plus sun core, sun glow, ambient and cloud tint). The palette for any elevation
is a smoothstep interpolation between the two neighbouring keys.

On top of that:

- a **twilight tint** weighted per band – pink/magenta while rising, amber while
  setting – so dawn and dusk are not mirror images,
- **weather modifiers** – desaturation, sky darkening, cloud darkening,
- the user's **appearance** multipliers.

Because the input is the continuous elevation, there is no "it is now night"
branch anywhere in the codebase.

## Why the renderers own their buffers

Each renderer implements `setup / resize / render / destroy`. `setup()` runs
once and again whenever the quality profile changes, which is where sprites and
particle arrays are (re)allocated. `resize()` is deliberately cheap: star and
cloud positions are stored normalised, so a window resize or an orientation
change never re-rolls the scene.

Two things are cached rather than recomputed per frame:

- the sky `CanvasGradient`, keyed on height plus the five gradient colours,
- the tinted cloud sprites, rebuilt only when the cloud colour drifts by more
  than ~6 per channel.

## Lifecycle and cleanup

`AuroraLayer` registers a `ResizeObserver`, an `IntersectionObserver`, a
`visibilitychange` listener, a `prefers-reduced-motion` media query listener and
one 60 s interval that refreshes the computed sun position. All of them are
created in `attachListeners()` and removed in `detachListeners()`; `destroy()`
also stops the rAF loop, tears down every renderer and removes the canvas.

`background-mount.ts` reference-counts owners. When a view is swapped, the new
card may connect before the old one disconnects – the mount hands the shared
layer over instead of destroying and rebuilding it, and only unmounts when the
last owner is gone. That also restores the dashboard's own background.

## Writing to the document

Two modules reach outside the canvas: `ambient-variables.ts` publishes the sky
as `--aurora-*` properties, and `glass-styles.ts` drives Home Assistant's
`--ha-card-*` variables for Aurora Glass.

Setting a custom property on `<html>` invalidates style for the entire
document, so both are guarded the same way: a minimum interval between writes
(400 ms / 500 ms) *and* a change gate that skips the write when no colour moved
far enough to be visible. Both also implement `clear()`, which removes every
property they own — turning Glass off hands the dashboard straight back to the
user's theme, and unmounting the last Aurora card leaves no trace.

Only the shared background layer writes these; a `mode: card` layer never does,
so two Aurora cards on one dashboard cannot fight over the document.

## Parallax input

`scroll` does not bubble, and Home Assistant scrolls an inner element rather
than the window. The layer therefore listens in the **capture** phase on
`document`, which sees scroll events from whichever container the current view
happens to use, and reads `scrollTop` off `event.target`. The offset saturates
after one viewport so a long dashboard cannot push the sky away.

Pointer parallax is only registered behind a `(pointer: fine)` media query —
on touch there is no hover and the listener would never fire.

## Home Assistant integration

The card reacts to `hass` assignments, but Home Assistant pushes a new `hass`
object on *every* state change in the entire system. The setter therefore
compares the identity of the weather and sun state objects and returns
immediately when neither changed — no polling, no timers tied to entity state.

The only public frontend API used is:

- `hass.states`, `hass.config.latitude/longitude`,
- `setConfig` / `getCardSize` / `getGridOptions` / `getStubConfig` /
  `getConfigElement`,
- `window.customCards`,
- the `--lovelace-background` and `--ha-card-*` theme variables,
- `ha-form` in the editor (with a YAML fallback if it is unavailable).

No internal Home Assistant element is queried or modified.
