# iOS experience

Safari on iPhone and iPad is a first-class GeForce NOW client for this product, not an afterthought.

## Constraints

- No native GeForce NOW iOS overlay we control
- Safari Web Extensions have a narrower API than Chrome
- Touch replaces Shift+Tab; overlay toggle must be a visible control
- Controllers (Xbox, PlayStation, MFi) may be attached while the page is in Safari
- Background tabs and Low Power Mode change session behavior

## Plan

1. Make the website usable in Safari at phone and iPad sizes (tap targets ≥ 44px, no horizontal overflow).
2. Overlay open/close must work with a tap, not only a keyboard chord.
3. Capture workflow must be completable with one thumb.
4. Investigate a Safari extension only after the website capture path is solid.
5. Never assume the extension can inject into `play.geforcenow.com` until that is verified on iOS.

## Bandwidth Investigation on iOS

Users on Safari / iPhone should still be able to log available vs used bandwidth from the GeForce NOW diagnostics UI, even if that means typing the numbers. Membership (often Free) and client (`safari-iphone`) are required fields because they change the meaning of low utilization.
