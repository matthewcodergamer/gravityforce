# Gravity Force Chrome extension

Manifest V3. Not affiliated with NVIDIA. Not on the Chrome Web Store yet.

## Download

- Website: https://matthewcodergamer.github.io/gravityforce/
- Zip: https://matthewcodergamer.github.io/gravityforce/gravity-force-extension.zip
- Release: https://github.com/matthewcodergamer/gravityforce/releases/latest

Pack locally: `python3 scripts/pack-extension.py`

## Load unpacked

1. Unzip `gravity-force-extension.zip`
2. Open `chrome://extensions`
3. Enable Developer mode
4. Load unpacked → select this folder (the one that contains `manifest.json`)

The popup records available vs used Mbps. On `play.geforcenow.com` a corner chip looks for Mbps labels. If it cannot read NVIDIA’s overlay, type the numbers.

## Actions

| Action | Where |
| --- | --- |
| Open popup | Toolbar icon, or Ctrl+Shift+G / ⌘⇧G |
| Scan Mbps on this page | Popup **Scan page**, right-click menu, Ctrl+Shift+Y / ⌘⇧Y |
| Copy last snapshot | Popup **Copy**, toolbar-button context menu |
| Open GeForce NOW | Popup **GeForce NOW** |

The toolbar badge shows used Mbps after a scan. If NVIDIA’s overlay cannot be read, type the numbers.
