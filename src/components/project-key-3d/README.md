# Projects key prototype

Open `/prototypes/project-key` for the original single-key study. The homepage
uses `KeyboardCluster` with one canvas and a shared rotating group. Individual
keycaps still depress independently. Labels, colours, spacing, and camera are
configured in `clusterConfig.ts`; grouped keys reuse `Key` and `Studio` from
`ProjectKeyScene.tsx`.

`public/keyboard-cluster.png` is a transparent still render displayed immediately
while WebGL loads, and retained if WebGL fails. Regenerate it when changing the
camera, geometry, colours, or lighting. `CLUSTER_OUTLINES` contains matching rest
silhouettes for fallback hit areas and focus rings; the live scene projects these
every frame so controls follow group rotation. The homepage respects both OS and
site reduced-motion settings.

`ProjectKey3D` is a native accessible button over a lazy-loaded WebGL canvas. Its
default destination is `/projects`; supply `href` or `onActivate` to reuse it.
Enter/Space, touch, pointer cancellation, focus, reduced motion, and a non-WebGL
fallback are supported. Reduced motion stops rotation and makes press travel immediate.

## Tune

- `config.ts`: `colors.cap`, `colors.housing`, material roughness, camera, and
  `lighting` (exposure and key/fill/rim/ambient intensities).
- `config.ts`: `motion.idleXDegrees`, `idleYDegrees`, `idlePeriod`, `pointerDegrees`.
- `config.ts`: `motion.pressDepth`, `pressDownSeconds`, `pressUpSeconds`.
- `geometry.ts`: rounded ring profiles control thickness, taper and rolled edges.
- `ProjectKeyScene.tsx`: softboxes, key/fill/rim lights, shadows and lettering.

The press-depth default is 0.07 units, about 8.5% of the visible cap height.
All geometry, plastic grain, text and lighting are local/procedural. No HDRI,
external model, remote font or large image texture is fetched for the scene.

## Optional sound

Add `public/sounds/key-down.mp3` and `public/sounds/key-up.mp3`, then restart the
dev server or rebuild. The prototype checks file existence on the server and
passes only existing URLs. Reuse with `sounds={{ down: '/sounds/key-down.mp3',
up: '/sounds/key-up.mp3' }}` only when those files exist. With no sounds prop,
no audio requests occur. Playback is interaction-only; rejected playback is caught.

## Rendering budget

DPR is capped at 1.75 desktop / 1.25 compact. The scene uses demand rendering,
invalidating only during active idle/press animation. Offscreen/hidden scenes
stop invalidation. Compact devices have smaller idle motion and shadow maps.
Contact shadows update for 16 frames on mount and on each press/release so the
shadow follows the cap through its travel, then stop updating. Under reduced
motion they capture once. Moving real shadow maps supply the live geometry
shadows between those captures. Reduced motion resets the orientation immediately
instead of leaving a partially damped rotation frozen on screen.

## Visual refinement

The cap has extra profile rings around its upper bevel to soften the highlight,
with restrained clearcoat and matte housing roughness. The perspective camera
shows a broad top surface, a substantial front wall and one side. A thin local
arrow mesh accompanies the extruded top legend; both move with the keycap.

The separate attachment contained only a text brief. `public/home-keyboard.png`
in the existing project supplied a provisional proportion/material reference.
Exact matching to an additional reference image still requires that image.
