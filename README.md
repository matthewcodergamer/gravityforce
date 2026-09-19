# Gravity Force

Working name for an independent GeForce NOW investigation platform: website, Chrome extension, and iOS experience.

Gravity Force does not claim to make GeForce NOW faster. It measures what is happening, identifies what can be improved, applies changes that are technically possible, and tests whether those changes actually help.

Not affiliated with NVIDIA. Do not present this product as an official NVIDIA application.

## Links

| What | URL |
| --- | --- |
| Website | https://matthewcodergamer.github.io/gravityforce/ |
| Extension zip | https://matthewcodergamer.github.io/gravityforce/gravity-force-extension.zip |
| Latest release | https://github.com/matthewcodergamer/gravityforce/releases/latest |
| GitHub Actions | https://github.com/matthewcodergamer/gravityforce/actions |

[![Build extension and GitHub Pages](https://github.com/matthewcodergamer/gravityforce/actions/workflows/build.yml/badge.svg)](https://github.com/matthewcodergamer/gravityforce/actions/workflows/build.yml)

## First network feature

**Bandwidth Investigation Mode** is the first network-related feature, not a secondary add-on.

It records:

- Bandwidth GeForce NOW reports as available
- Bandwidth it reports as being used
- Utilization percentage (used ÷ available)
- Resolution, frame rate, and streaming-quality settings where available
- Comparison across sessions
- Whether low utilization is normal for the selected quality or associated with a performance problem
- Troubleshooting recommendations based on evidence

If the extension cannot read those statistics directly, users enter the diagnostic values or follow a guided capture.

## Chrome extension

Sideload until the Chrome Web Store listing exists.

1. Download `gravity-force-extension.zip`
2. Unzip it
3. Open `chrome://extensions`
4. Enable Developer mode
5. Load unpacked → select the folder that contains `manifest.json`

Pack it locally with `python3 scripts/pack-extension.py`. GitHub Actions packs the same zip on every push to `main`, publishes it to GitHub Pages, and attaches it to the versioned GitHub Release.

## Overlay language

- **Steam overlay** is the model for the investigation panel (Shift+Tab).
- **NVIDIA GPU statistics overlay** is the model for the live HUD (available / used / utilization / FPS).

## Working name

Gravity Force. Rename later without rebuilding the product. Chromerty is not used.

## Documentation

- [Product vision](docs/PRODUCT_VISION.md)
- [Technical architecture](docs/TECHNICAL_ARCHITECTURE.md)
- [Roadmap](docs/ROADMAP.md)
- [iOS experience](docs/IOS_EXPERIENCE.md)
- [Network diagnostics](docs/NETWORK_DIAGNOSTICS.md)
- [Controller support](docs/CONTROLLER_SUPPORT.md)
- [Security and privacy](docs/SECURITY_AND_PRIVACY.md)

## Official GeForce NOW references

- [System requirements](https://www.nvidia.com/en-us/geforce-now/system-reqs/)
- [FAQ](https://www.nvidia.com/en-us/geforce-now/faq/)
- [Game Session Diagnostic Tool](https://nvidia.custhelp.com/app/answers/detail/a_id/5478)
- [NVIDIA in-game statistics overlay](https://nvidia.custhelp.com/app/answers/detail/a_id/5084)
