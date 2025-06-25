// Example pixel art library data (replace with real data or a loader)
export const pixelArtLibrary: number[][][] = [
  Array(32).fill(0).map(() => Array(32).fill(Math.floor(Math.random() * 8))),
  Array(32).fill(0).map(() => Array(32).fill(Math.floor(Math.random() * 8))),
  // ... more pixel art
];
