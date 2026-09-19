# Security and privacy

## Rules

- No collection of GeForce NOW credentials
- No collection of unrelated browsing history
- Session captures stay on-device unless the user later opts into an account-backed sync
- Extension permissions must be the minimum required for the current feature
- Do not inject into sites other than supported GeForce NOW surfaces
- Do not present Gravity Force as NVIDIA software

## Prototype

The current overlay stores captures in `localStorage` on the user’s device. There is no account system and no server-side personal data.

## Extension (planned)

Declare host permissions only for GeForce NOW origins actually read. Document every permission in the popup. Failed diagnostics must not leak raw page content to a server.
