# Cinematic portfolio media briefs

The site is designed to look complete without video. These optional assets should be added only when the generated result matches the restrained visual direction below. Store files in `public/media/`; each video is loaded only by the section that uses it. Do not preload all videos.

## `public/media/hero-cinematic.mp4` (optional)

**Purpose:** slow ambient texture behind the hero, never competing with its headline.

### IMAGE PROMPT

Create a premium, photorealistic abstract digital environment for a computer science educator and full-stack engineer portfolio. Wide 16:9 composition, viewed straight into a deep near-black indigo space. A single large translucent glass-and-smoked-acrylic geometric loop floats off-center to the right, with fine etched circuit traces and a few precise cyan and violet light paths suggesting connected systems and knowledge transfer. Keep the left 45 percent nearly black and visually quiet for white headline typography. Soft volumetric rim light, controlled reflections, deep atmospheric perspective, restrained bloom, physically plausible glass, no text, no logos, no people, no UI dashboards, no stars, no particles, no clutter, no recognizable stock imagery. Camera: locked 3/4 view, 50mm lens, cinematic depth of field with the central structure crisp and background soft. Palette: midnight navy, graphite, cool cyan, muted violet, a hint of ice blue. 16:9.

### VIDEO PROMPT

Animate this source image into a seamless 7-second 16:9 ambient loop. Keep the camera almost locked with a very slow 2 percent forward dolly and tiny parallax drift. The glass loop rotates no more than 4 degrees; two thin light paths travel slowly along existing etched traces and fade before the loop point. Reflections shift gently as if from a distant moving light. Preserve the composition, dark quiet left side, object silhouette, all edges, and negative space throughout. Elegant high-end technology editorial, controlled motion, no cuts, no zoom pulses, no added objects, no text, no logos, no flicker, no warping, no bright flashes. Make first and last frames visually compatible for looping.

**Delivery:** 16:9, 6–8 seconds, 24 fps, H.264 MP4, no alpha, seamless loop, muted.

## `public/media/cgc-erp-cinematic.mp4` (optional)

**Purpose:** a short case-study reveal that communicates a real administrative system without fabricating product features or data. Prefer a screen recording of the actual product if available; generated imagery must remain abstract and must not be presented as a literal screenshot.

### IMAGE PROMPT

Create a polished product visualization of a real education administration ERP interface, framed as a floating desktop application panel in a dark editorial studio. Wide 16:9 landscape, three-quarter perspective, restrained layered glass panels with legible but non-specific dashboard structure: a top navigation bar, student list rows, fee status column, a simple monthly chart, and three role tabs labelled only by visual shape (no generated words or numbers). Use placeholder blocks instead of text or statistics. Arrange one primary panel with two smaller panels behind it, clear hierarchy, accurate flat UI surfaces, fine borders, subtle depth, realistic screen glow, clean alignment, accessible contrast. Palette: graphite, ink, muted violet, cyan accents, soft white. 50mm lens, straight-on product camera with slight perspective, crisp primary panel, dark empty margins. No fake metrics, no logos, no people, no holographic clutter, no unreadable pseudo-text, no excessive glow. 16:9.

### VIDEO PROMPT

Create a 6-second 16:9 image-to-video product reveal. The central dashboard panel glides forward by a small amount while two supporting panels align behind it with precise, calm motion; a chart line draws once and a few existing row highlights softly illuminate. Camera makes a slow 5-degree lateral move, then settles. Keep all panel geometry, spacing, palette, and blank placeholder content stable. No invented words, numbers, brands, people, interface redesign, fast movement, cuts, flicker, bending, or floating debris. Premium software product film, purposeful transitions, motion eases to a complete stop, first and last frames should be suitable for a soft loop.

**Delivery:** 16:9, 5–7 seconds, 24 fps, H.264 MP4, no alpha, muted. Use a still poster if the video is not ready.

## `public/media/robotics-cinematic.mp4` (optional)

**Purpose:** visual bridge between the engineering projects and teaching timeline; keep the visual grounded in practical robotics rather than sci-fi machinery.

### IMAGE PROMPT

Create a high-end macro editorial photograph of a small educational robotics electronics workbench, landscape 16:9. Show a real Arduino- or ESP32-class microcontroller board, a few clean jumper wires, one small sensor, and a compact servo mechanism arranged with care on a dark matte surface. The board and mechanism are the sole subject; a subtle cyan signal trace and muted amber status light suggest a working system without adding graphic overlays. Close 3/4 camera view, 70mm macro lens, shallow but useful depth of field, crisp component detail, soft directional studio light, delicate edge reflections, faint technical drawing lines far in the background. Palette: charcoal, graphite, copper, cyan, subdued amber. No hands, no person, no logos, no readable board labels, no sparks, no clutter, no giant robot, no holograms, no text. 16:9.

### VIDEO PROMPT

Animate the source image into a 6-second 16:9 calm technical loop. Make a very slow camera slide of a few centimeters across the board. One existing status LED fades up and down once; a faint light pulse travels along one existing wire toward the sensor, then disappears. A servo makes a tiny controlled movement and returns exactly to its starting position. Keep every component recognizable, physically connected, and stable in shape and position. No extra wires, no sparks, no camera shake, no fast movement, no text, no logos, no new objects, no flicker, no transformation into a robot. First and last frame should align for a seamless loop.

**Delivery:** 16:9, 5–7 seconds, 24 fps, H.264 MP4, no alpha, muted, loopable.

## `public/media/contact-cinematic.mp4` (optional)

**Purpose:** quiet closing visual behind the contact section, with text and links remaining dominant.

### IMAGE PROMPT

Create a refined abstract closing image for an engineering portfolio, 16:9 wide. A single luminous opal-like glass sphere rests slightly right of center in a deep midnight-blue space; a thin cyan-violet light path arcs gently around it and fades into the distance. The left half remains dark and uncluttered for typography. Soft diffused key light, a faint floor reflection, subtle atmospheric depth, realistic glass and polished stone, 85mm lens, centered focus, elegant gallery installation mood. Palette: near-black navy, graphite, icy cyan, soft violet, a touch of warm white. No text, no logos, no people, no stars, no particles, no lens flares, no extra geometry, no sci-fi portal. 16:9.

### VIDEO PROMPT

Create a seamless 8-second 16:9 closing loop from this image. The camera performs a barely perceptible forward drift; the light path slowly completes one gentle orbit around the sphere and returns to its initial position. Internal refraction shifts subtly, with one slow cyan-to-violet color change. Keep the sphere shape, size, location, quiet left side, and background stable. No new elements, no pulsing brightness, no fast orbit, no zoom burst, no cuts, no text, no logo, no distortion. The result should feel calm and conclusive, with matching start and end frames.

**Delivery:** 16:9, 7–9 seconds, 24 fps, H.264 MP4, no alpha, muted, seamless loop.

## Integration notes

- Keep a compressed poster image beside each video and render the poster as the default visual.
- Encode muted H.264 at a modest bitrate and provide a mobile crop only when necessary.
- Mark videos `muted`, `playsInline`, and `loop`; only set the source after the section approaches the viewport, and pause when it leaves.
- Respect `prefers-reduced-motion` by leaving the poster visible and not starting playback.
- Do not ship generated ERP text or invented dashboard values as product evidence. The actual live product or supplied screenshots are the source of truth.
