# Technical architecture

## Principles

- Measure first. Do not pretend to own NVIDIA’s encoder or bitrate controls.
- Prefer reading GeForce NOW’s own diagnostics over inventing parallel speed tests.
- If a statistic cannot be read, capture it manually with NVIDIA’s labels intact.
- Every automated change needs a purpose and a before/after measurement.
- Failed diagnostics produce understandable errors.

## Prototype (current)

The live prototype is a web overlay:

- Stream stage (simulated session) so the HUD and overlay can be judged in context
- NVIDIA-style statistics HUD: FPS, available, used, utilization, latency
- Steam-style overlay shell: left rail, session bar, Shift+Tab to toggle
- Guided capture of membership, client, quality, bandwidth, and picture symptoms
- Local session log (`localStorage`) and comparison chart
- Evidence-based verdicts (healthy underuse, encoder holdback, congestion, timing)

No accounts. No server-side personal data.

## Planned packages

```
apps/web            Overlay dashboard and documentation
apps/extension      Chrome extension (popup, page enhancements)
packages/shared     Session types, utilization, diagnosis
packages/ios        Safari extension investigation (later)
```

## Bandwidth Investigation Mode

Inputs:

- Available Mbps (GFN-reported)
- Used Mbps (GFN-reported)
- Optional ping / packet loss
- Resolution, frame rate, streaming quality
- Membership and client
- Picture symptoms (fine / blurry / stuttering / lagging)

Outputs:

- Utilization %
- Expected used-bitrate band for that quality
- Verdict kind
- Recommendations

## Reading statistics

Phase 1: manual / guided capture. Confirm NVIDIA’s exact overlay labels from a real diagnostics screenshot before treating any copy as canonical.

Phase 2: investigate whether the extension can read the same fields from the GeForce NOW page or client. If it can, ingest them. If it cannot, keep the guided workflow.

## Non-goals

- Impersonating NVIDIA or GeForce NOW
- Claiming unused bandwidth is always a defect
- Changing GeForce NOW streaming settings we cannot actually change
