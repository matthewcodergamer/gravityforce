# Network diagnostics

## What we measure

Gravity Force records what GeForce NOW reports, not a generic Speedtest.

| Field | Meaning | Limitation |
| --- | --- | --- |
| Available bandwidth | Path capacity GFN believes it has to the current server | Not ISP plan speed |
| Bandwidth used | Current stream bitrate | Moves with scene complexity |
| Utilization | used ÷ available | Low is often normal |
| Resolution / FPS / quality | Settings and/or overlay-reported mode | Overlay mode may differ from the setting |
| Ping | Round-trip to the streaming path, if shown | Not the same as a website ping |
| Packet loss | Dropped packets, if shown | Small percentages still hitch |

## Utilization is not a score

A Free 1080p60 session often sits in the teens of Mbps on a much larger available path. Filling the pipe would not automatically sharpen the image.

Low utilization with a clean picture → usually healthy underuse.
Low utilization with a soft picture → quality cap, adaptive fallback, or membership limit.
High utilization with hitching → the stream is sitting on the ceiling.
Hitching with spare capacity and a sharp picture → timing (ping, jitter, loss, device), not throughput.

## Capture rules

- Log available and used from the same moment / screenshot.
- Write NVIDIA’s exact labels. Do not guess.
- Pair membership, client, and quality with the numbers.
- Record whether the game looked fine, blurry, stuttering, or lagging.

## What we will not do

- Treat ISP speed-test Mbps as GFN available.
- Treat one session as a trend.
- Claim we can raise NVIDIA’s encoder bitrate from this product.
