/** Scene units are arbitrary. Keep the cap and housing dimensions coordinated. */
export const PROJECT_KEY = {
  colors: { cap: "#F6693C", housing: "#32383B", recess: "#111619", legend: "#FFF6DF", ground: "#eee9df" },
  material: { capRoughness: 0.42, housingRoughness: 0.52, microBump: 0.0015 },
  motion: {
    idleXDegrees: 1.5,
    idleYDegrees: 3,
    idlePeriod: 10,
    pointerDegrees: 1.6,
    pressDepth: 0.07, // 8.5% of the cap's 0.82-unit visible height.
    pressDownSeconds: 0.085,
    pressUpSeconds: 0.145,
  },
  camera: { position: [4.2, 8.4, 9] as [number, number, number], fov: 29 },
  lighting: { exposure: 0.94, key: 2.3, fill: 0.85, rim: 0.8, ambient: 0.5 },
};

export type KeyInteraction = { pressed: boolean; hovered: boolean; x: number; y: number };
