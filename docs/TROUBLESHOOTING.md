# Troubleshooting

Turn this on first — it answers most questions by itself:

```yaml
type: custom:aurora-background
weather_entity: weather.home
debug: true
```

The overlay shows FPS, quality level, canvas size, particle count, the weather
condition Aurora resolved, the sun elevation **and where it came from**, and
whether reduced motion is active.

---

## "Custom element doesn't exist: aurora-background"

The browser never loaded the resource.

1. **Settings → Dashboards → ⋮ → Resources** – there must be an entry
   `/hacsfiles/aurora-background/aurora-background.js` of type
   **JavaScript module**.
2. Hard-reload: `Ctrl`/`Cmd` + `Shift` + `R`. On the companion app, clear the
   frontend cache in the app settings.
3. Open the URL directly in the browser (`https://your-ha/hacsfiles/aurora-background/aurora-background.js`).
   A 404 means HACS did not place the file — reinstall it in HACS.

---

## The card is there but I see no background

Check the browser console for `AURORA BACKGROUND v0.1.0-alpha`. If it is
printed, the module loaded and something is painting over the layer.

**Almost always a theme.** Aurora clears `--lovelace-background`, `html` and
`body`. A theme that paints the surface through a different variable wins.

Find the culprit with devtools (inspect the area where the background should
be, look at which element has the opaque `background`), then force it:

```yaml
type: custom:aurora-background
background:
  css_variables:
    primary-background-color: transparent
```

Other variables worth trying, one at a time:

```yaml
    card-background-color: rgba(30, 34, 46, 0.55)
    ha-card-background: rgba(30, 34, 46, 0.55)
    app-header-background-color: transparent
    sidebar-background-color: rgba(20, 24, 34, 0.7)
```

Also check that no `card-mod` / theme rule sets a `background-image` on the
view.

---

## The background is visible but covers my cards

`z_index` is wrong for your setup. The default `-1` puts the layer behind
everything. If a theme creates a stacking context that traps it, try:

```yaml
background:
  z_index: 0
```

and if cards then disappear behind it, go back to `-1` and instead make the
cards' own background non-transparent.

---

## Cards are unreadable over the sky

Aurora is meant to be paired with translucent cards. Two options:

```yaml
appearance:
  brightness: 0.75
  saturation: 0.85
  opacity: 0.85
```

or give your cards a glass surface via your theme:

```yaml
background:
  css_variables:
    ha-card-background: rgba(20, 24, 34, 0.55)
```

---

## It stutters / the fan spins up

1. Set `debug: true` and read the FPS and quality lines.
2. Pin the quality instead of letting it guess:

```yaml
quality: low
performance:
  max_fps: 24
  auto_quality: false
effects:
  shooting_stars: false
```

3. On a wallpanel, `quality: low` plus `max_fps: 24` is usually the right
   answer — the sky changes over minutes, not milliseconds.

If FPS is fine but the *dashboard* feels slow, the cause is elsewhere: Aurora
draws to one canvas and never triggers layout.

---

## Sun elevation looks wrong

The debug overlay's `sun` line ends with the source.

- `(sun.sun)` – the value comes from Home Assistant. If it is wrong, the `sun`
  integration or your configured latitude/longitude is wrong.
- `(computed)` – Aurora fell back to its own solar model because `sun.sun` does
  not exist or has no `elevation` attribute. It uses `hass.config.latitude` and
  `longitude`, so check **Settings → System → General → Location**.

---

## The weather never changes the sky

Check the `weather` and `entity` lines in the debug overlay.

- `entity —` means no `weather.*` entity was found. Set `weather_entity`
  explicitly.
- `weather unknown` means the entity reports a state Aurora does not recognise.
  It falls back to a mild partly-cloudy sky. Please open an issue with the
  exact state string.

Aurora also overrides two combinations that integrations get wrong: `sunny`
below −4° elevation becomes `clear-night`, and `clear-night` above +2° becomes
`sunny`.

---

## Two backgrounds / flickering after switching views

Only add **one** Aurora card per view. The layer is shared and
reference-counted, so several cards in the *same* view fight over the config.

---

## Animations are frozen

Expected in three cases:

- the browser tab is in the background (`performance.pause_when_hidden`),
- the OS is set to **reduce motion** — Aurora then caps at 20 FPS and stops
  cloud drift, star twinkle and shooting stars,
- the dashboard is not visible on screen at all.

The debug overlay's `reduced mo.` line tells you which.

---

## After an update nothing changed

Home Assistant caches frontend resources aggressively.

1. Hard-reload (`Ctrl`/`Cmd` + `Shift` + `R`).
2. Companion app: **Settings → Companion App → Debugging → Reset frontend cache**.
3. Still stale? Append a version query to the resource URL:
   `/hacsfiles/aurora-background/aurora-background.js?v=0.1.0`
