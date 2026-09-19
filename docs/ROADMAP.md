# Roadmap

## How this changes the plan

GeForce NOW’s actual bandwidth behavior is a first-class investigation, not a secondary feature. Bandwidth Investigation Mode is the first network-related deliverable.

## Phase 1 — Plan and establish

- Finalize working product scope
- Establish the repository
- Create the documentation
- Configure the development environment
- Create the first GitHub milestones and issues

## Phase 2 — Website

- Design system (Steam overlay + NVIDIA HUD)
- GitHub Pages site: https://matthewcodergamer.github.io/gravityforce/
- Dashboard / investigation calculator
- Extension download
- Responsive layouts

## Phase 3 — Extension

- Chrome extension (Manifest V3)
- GitHub Actions packs `gravity-force-extension.zip` on every `main` push
- GitHub Release attaches the zip
- Popup capture, page scan, keyboard actions
- Compatibility tests against NVIDIA overlay labels

## Phase 4 — Optimization

- Optimization profiles
- Supported automatic changes
- Before-and-after measurements
- Restoration and error handling

## Phase 5 — iOS experience

- Test the website in Safari
- Investigate touch behavior
- Prototype the Safari extension
- Verify supported controller and browser capabilities

## Phase 6 — Test and release

- Internal testing
- Fix compatibility problems
- Publish the beta
- Collect feedback
- Prioritize improvements from actual results

## Immediate next step

Lock NVIDIA’s exact diagnostic labels from a real overlay screenshot, then investigate whether the extension can read those fields. Until then, guided capture is the source of truth.
