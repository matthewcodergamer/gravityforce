# Controller support

Controller testing is a later website feature. It must not disrupt an active GeForce NOW session.

## Goals

- Detect a connected gamepad via the browser Gamepad API where available
- Show mapping / dead-zone / connection state
- Allow a test without stealing input from the game when the overlay is closed
- Document which controllers are supported on Chrome, Safari iOS, and the native GFN app

## Rules

- Overlay closed: do not capture gamepad input.
- Overlay open: test mode is explicit and clearly on/off.
- Never claim a controller “works in GFN” solely because the browser sees it.

## iOS notes

Safari gamepad support varies by controller and iOS version. Treat detection failures as “not visible to this browser,” not as a broken pad.
