const TILTS = [-2.5, 2, -1.5, 2.5, -2, 1.5]
const NUDGE = [
  [-10, 6],
  [12, -8],
  [8, 10],
  [-12, -4],
  [6, -10],
  [-6, 8],
]

// Where the board and each note go. Wide screens get a landscape board,
// narrow ones a portrait board with two columns.
export function boardLayout(count, aspect) {
  const narrow = aspect < 0.9
  const W = narrow ? 720 : 1200
  const H = narrow ? 1120 : 900
  const cols = narrow || count <= 4 ? 2 : 3
  const rows = Math.max(1, Math.ceil(count / cols))
  const top = 70
  const side = narrow ? 50 : 80
  const cellW = (W - side * 2) / cols
  const cellH = (H - top - 70) / rows
  const notes = Array.from({ length: count }, (_, i) => {
    const w = cellW * 0.8
    const h = Math.min(cellH * 0.82, narrow ? w * 1.3 : w * 0.7)
    const [nx, ny] = NUDGE[i % NUDGE.length]
    return {
      x: side + (i % cols) * cellW + (cellW - w) / 2 + nx,
      y: top + Math.floor(i / cols) * cellH + (cellH - h) / 2 + ny,
      w,
      h,
      tilt: TILTS[i % TILTS.length],
    }
  })
  return { board: { x: 0, y: 0, w: W, h: H }, notes, narrow }
}
