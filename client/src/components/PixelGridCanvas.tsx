import React, { useState } from "react";

const GRID_SIZE = 32;
const COLORS = ["#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff", "#ff00ff"];

export default function PixelGridCanvas({ onMint }: { onMint: (pixels: number[][]) => void }) {
  const [pixels, setPixels] = useState<number[][]>(Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0)));
  const [color, setColor] = useState(1); // index in COLORS

  function handleCellClick(x: number, y: number) {
    setPixels(prev => {
      const next = prev.map(row => [...row]);
      next[y][x] = color;
      return next;
    });
  }

  function handleClear() {
    setPixels(Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0)));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ marginBottom: 8 }}>
        {COLORS.map((c, i) => (
          <button
            key={i}
            style={{ background: c, width: 24, height: 24, border: color === i ? "2px solid #333" : "1px solid #ccc", marginRight: 4 }}
            onClick={() => setColor(i)}
          />
        ))}
        <button onClick={handleClear} style={{ marginLeft: 8 }}>Clear</button>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${GRID_SIZE}, 16px)`,
        gridTemplateRows: `repeat(${GRID_SIZE}, 16px)`,
        border: "2px solid #333",
        background: "#eee"
      }}>
        {pixels.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x},${y}`}
              onClick={() => handleCellClick(x, y)}
              style={{
                width: 16,
                height: 16,
                background: COLORS[cell],
                border: "1px solid #ccc",
                boxSizing: "border-box"
              }}
            />
          ))
        )}
      </div>
      <button style={{ marginTop: 16 }} onClick={() => onMint(pixels)}>Mint as OGOR NFT</button>
    </div>
  );
}
