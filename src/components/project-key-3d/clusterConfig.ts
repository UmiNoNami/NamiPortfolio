// 3.42-unit housings, 3.64-unit pitch: a compact 0.22-unit gap.
export const CLUSTER_KEYS = [
  { id: "about", label: "About", color: "#EEE7DA", ink: "#32383B", position: [-1.82, 0, -1.82] },
  { id: "projects", label: "Projects", color: "#F6693C", ink: "#FFF6DF", position: [1.82, 0, -1.82] },
  { id: "contact", label: "Contact", color: "#EFCB66", ink: "#32383B", position: [-1.82, 0, 1.82] },
  { id: "playground", label: "Playground", color: "#88B9EB", ink: "#26343E", position: [1.82, 0, 1.82] },
] as const;
export const CLUSTER_CAMERA = { position: [8.4, 16.8, 18] as [number, number, number], fov: 29 };
export type ClusterKeyId = typeof CLUSTER_KEYS[number]["id"];

// Projected silhouettes at rest, matching the pre-rendered loading image.
export const CLUSTER_OUTLINES = [
  "33.652,40.847 36.685,35.681 42.711,26.747 53.956,30.773 56.893,34.045 56.782,38.108 49.717,51.567 33.926,44.988",
  "50.780,52.009 50.794,47.799 57.900,34.411 59.311,32.690 71.592,37.087 74.251,40.359 73.846,44.495 68.096,59.223",
  "23.082,56.588 26.318,51.049 33.661,40.163 45.770,45.050 49.204,48.303 49.218,52.518 40.602,68.930 23.580,60.871",
  "41.590,65.140 50.290,48.747 51.562,47.388 64.909,52.776 68.021,55.991 67.688,60.269 60.609,78.403 41.753,69.475",
];
