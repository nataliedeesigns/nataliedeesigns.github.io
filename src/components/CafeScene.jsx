// The pixel-art café. Everything sits on a grid of P x P "pixels" inside a
// 1200 x 900 scene (200 x 150 cells); the wall and floor extend past it so
// wide or tall screens never see an edge.
//
// Sprites are drawn as strings: each character is a color from PAL, '.' is empty.

import { P, c, PAL } from './pixel'

const LAMP = [
  '.......kk.......',
  '.....kkmmkk.....',
  '...kkmmmmmmkk...',
  '..kmmmmmmmmmmk..',
  '.kmmmmmmmmmmmmk.',
  'kkkkkkkkkkkkkkkk',
  '......yyyy......',
]
const PLANT = [
  '....MM....',
  '..MMmmM...',
  '.MmmMmmM..',
  '..MmmMmMM.',
  '...MMMM...',
  '....MM....',
  '.kkkkkkkk.',
  '.kooooook.',
  '.kokookok.',
  '.kroooork.',
  '..kooook..',
  '..kkkkkk..',
]
const STEAM = ['...w..w...', '..w..w....']
const MUG = ['kkkkkkkk..', 'kcccccckk.', 'kckcckck.k', 'krckkcrk.k', 'kcccccckk.', '.kkkkkk...']
const CAT = [
  '.k....k.......',
  'kgk..kgk......',
  'kggkkggk......',
  'kggggggkkkkk..',
  'kgkkgkkgggggk.',
  'krggggrgggggk.',
  'kgggggggggggkk',
  '.kkkkkkkkkkkk.',
]
const HEART = ['.PP.PP.', 'PPPPPPP', 'PPPPPPP', '.PPPPP.', '..PPP..', '...P...']

// Draws a sprite at scene position (x, y), merging same-color runs into one rect.
export function Sprite({ x, y, rows, className }) {
  const rects = []
  rows.forEach((row, j) => {
    let i = 0
    while (i < row.length) {
      let k = i
      while (k < row.length && row[k] === row[i]) k++
      if (row[i] !== '.') {
        rects.push(
          <rect
            key={`${i}-${j}`}
            x={x + c(i)}
            y={y + c(j)}
            width={c(k - i)}
            height={P}
            fill={PAL[row[i]]}
          />,
        )
      }
      i = k
    }
  })
  return <g className={className}>{rects}</g>
}

// A rectangle in cell units, optionally with a one-pixel outline.
export function Box({ x, y, w, h, fill, outline }) {
  if (!outline) return <rect x={c(x)} y={c(y)} width={c(w)} height={c(h)} fill={fill} />
  return (
    <>
      <rect x={c(x)} y={c(y)} width={c(w)} height={c(h)} fill={PAL.k} />
      <rect x={c(x + 1)} y={c(y + 1)} width={c(w - 2)} height={c(h - 2)} fill={fill} />
    </>
  )
}

export function Hotspot({ label, onActivate, disabled, children }) {
  return (
    <g
      className="hotspot"
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={label}
      onClick={disabled ? undefined : onActivate}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          onActivate()
        }
      }}
    >
      {children}
    </g>
  )
}

function Computer({ onSelect, disabled }) {
  return (
    <Hotspot
      label="Look at the computer: resume and engineering projects"
      onActivate={() => onSelect('computer')}
      disabled={disabled}
    >
      <g className="lift">
        <Box x={92} y={93} w={16} h={4} fill={PAL.c} outline />
        <Box x={84} y={96} w={32} h={4} fill={PAL.c} outline />
        <Box x={74} y={61} w={52} h={33} fill={PAL.c} outline />
        <Box x={76} y={63} w={48} h={27} fill={PAL.m} outline />
        {[0, 1, 2].map((i) => (
          <Box key={i} x={79} y={66 + i * 6} w={4} h={4} fill={[PAL.w, PAL.y, PAL.p][i]} outline />
        ))}
        <Box x={89} y={67} w={31} h={19} fill={PAL.w} outline />
        <Box x={89} y={67} w={31} h={4} fill={PAL.P} outline />
        <Sprite x={c(101)} y={c(74)} rows={HEART} />
        <Sprite x={c(98)} y={c(91)} rows={['rr.rr']} />
        <rect className="ring" x={c(74) - 6} y={c(61) - 6} width={c(52) + 12} height={c(39) + 12} />
      </g>
    </Hotspot>
  )
}

export default function CafeScene({ onSelect, disabled }) {
  // String lights: the wire sags between hooks every 50 cells.
  const wire = []
  for (let x = -60; x < 260; x++) {
    const t = (((x % 50) + 50) % 50) / 50
    wire.push({ x, y: 6 + Math.round(20 * t * (1 - t)) })
  }
  const bulbs = wire.filter(({ x }) => [12, 25, 37].includes(((x % 50) + 50) % 50))
  const panels = []
  for (let x = -160; x < 360; x += 20) panels.push(x)

  return (
    <>
      <defs>
        <pattern id="dots" width="48" height="48" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width={P} height={P} fill="#dcc7aa" />
          <rect x="24" y="24" width={P} height={P} fill="#dcc7aa" />
        </pattern>
        <pattern id="checker" width="48" height="48" patternUnits="userSpaceOnUse">
          <rect width="48" height="48" fill="#6f4e37" />
          <rect width="24" height="24" fill="#7d5a42" />
          <rect x="24" y="24" width="24" height="24" fill="#7d5a42" />
        </pattern>
      </defs>

      {/* Wall */}
      <Box x={-200} y={-120} w={600} h={214} fill="#f5e6ca" />
      <rect x={c(-200)} y={c(-120)} width={c(600)} height={c(214)} fill="url(#dots)" />

      {/* String lights */}
      {wire.map(({ x, y }) => (
        <rect key={x} x={c(x)} y={c(y)} width={P} height={P} fill={PAL.k} />
      ))}
      {bulbs.map(({ x, y }, i) => (
        <g key={x} className="twinkle" style={{ animationDelay: `${(i % 4) * 0.5}s` }}>
          <Box x={x} y={y + 1} w={2} h={2} fill={[PAL.y, PAL.w, PAL.y, PAL.p][i % 4]} />
        </g>
      ))}

      {/* Wainscoting */}
      <Box x={-200} y={93} w={600} h={44} fill="#a5a58d" />
      <Box x={-200} y={93} w={600} h={3} fill="#6b705c" />
      <Box x={-200} y={93} w={600} h={1} fill={PAL.k} />
      {panels.map((x) => (
        <rect
          key={x}
          x={c(x + 2) + 3}
          y={c(98) + 3}
          width={c(16) - 6}
          height={c(35) - 6}
          fill="none"
          stroke="#6b705c"
          strokeWidth={P}
        />
      ))}

      {/* Floor */}
      <rect x={c(-200)} y={c(137)} width={c(600)} height={c(120)} fill="url(#checker)" />
      <Box x={-200} y={137} w={600} h={1} fill={PAL.k} />

      {/* Pendant lamps */}
      {[62, 142].map((x) => (
        <g key={x}>
          <Box x={x} y={-120} w={1} h={162} fill={PAL.k} />
          <Sprite x={c(x - 7)} y={c(42)} rows={LAMP} />
        </g>
      ))}

      {/* Desk */}
      <g>
        <Box x={20} y={111} w={6} h={26} fill={PAL.L} outline />
        <Box x={174} y={111} w={6} h={26} fill={PAL.L} outline />
        <Box x={16} y={104} w={168} h={8} fill={PAL.l} outline />
        {[30, 86, 142].map((x) => (
          <g key={x}>
            <Box x={x} y={105} w={28} h={6} fill={PAL.c} outline />
            <Sprite x={c(x + 13)} y={c(107)} rows={['P.P', '.P.']} />
          </g>
        ))}
        <Box x={12} y={100} w={176} h={5} fill={PAL.l} outline />
        <Box x={13} y={103} w={174} h={1} fill={PAL.L} />
      </g>

      {/* Desk things */}
      <Sprite x={c(40)} y={c(88)} rows={PLANT} />
      <Sprite x={c(56)} y={c(91)} rows={STEAM} className="steam" />
      <Sprite x={c(56)} y={c(94)} rows={MUG} />

      <Computer onSelect={onSelect} disabled={disabled} />

      <Sprite x={c(140)} y={c(92)} rows={CAT} />
      <text x={c(148)} y={c(89)} className="zzz">
        z z
      </text>
    </>
  )
}
