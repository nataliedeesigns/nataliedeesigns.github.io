// The pixel-art café. Everything sits on a grid of P x P "pixels" inside a
// 1200 x 900 scene (200 x 150 cells); the wall and floor extend past it so
// wide or tall screens never see an edge.
//
// Sprites are drawn as strings: each character is a color from PAL, '.' is empty.

const P = 6
const c = (n) => n * P

export const FRAMES = [
  { x: c(50), y: c(34), w: c(22), h: c(27) },
  { x: c(76), y: c(27), w: c(25), h: c(33) },
  { x: c(105), y: c(31), w: c(26), h: c(21) },
  { x: c(135), y: c(33), w: c(20), h: c(24) },
]

export const MONITOR = { x: c(83), y: c(74), w: c(34), h: c(26) }
export const SCREEN = { x: c(86), y: c(77), w: c(28), h: c(16) }

const PAL = {
  k: '#4b3832', // outline
  w: '#fffdf7',
  c: '#f5e6ca',
  p: '#ffe8d6',
  P: '#b2774c',
  r: '#e3a47a', // blush
  y: '#ffd6a5',
  m: '#b7b7a4',
  M: '#798468',
  o: '#dcc7aa',
  l: '#b2774c',
  L: '#6f4e37',
  v: '#dcc7aa',
  s: '#b7b7a4',
  g: '#ffd6a5',
  G: '#6b705c',
}

const ART = {
  coffee: {
    bg: PAL.p,
    rows: [
      '............',
      '...w...w....',
      '....w...w...',
      '............',
      '.kkkkkkkkk..',
      '.kwwwwwwwkk.',
      '.kwkwwwkwk.k',
      '.krwwwwwrk.k',
      '.kwwwkwwwkk.',
      '..kwwwwwk...',
      '...kkkkk....',
      '............',
    ],
  },
  cat: {
    bg: PAL.m,
    rows: [
      '............',
      '.k........k.',
      '.kk......kk.',
      '.kokkkkkkok.',
      '.kooooooook.',
      '.kokooookok.',
      '.kroooooork.',
      '.koookokook.',
      '.kooooooook.',
      '..kkkkkkkk..',
      '............',
      '............',
    ],
  },
  strawberry: {
    bg: PAL.c,
    rows: [
      '............',
      '.....MM.....',
      '...MMMMMM...',
      '..kkkkkkkk..',
      '.kPPPPPPPPk.',
      '.kPkPPPPkPk.',
      '.kPrPPPPrPk.',
      '.kPPPkkPPPk.',
      '..kPyPPyPk..',
      '...kPPPPk...',
      '....kkkk....',
      '............',
    ],
  },
  cloud: {
    bg: PAL.s,
    rows: [
      'y...........',
      '..........y.',
      '....kkkk....',
      '...kwwwwk...',
      '.kkwwwwwwkk.',
      'kwwwwwwwwwwk',
      'kwwkwwwwkwwk',
      'kwrwwkkwwrwk',
      'kwwwwwwwwwwk',
      '.kkkkkkkkkk.',
      '..p..y..m..v',
      '............',
    ],
  },
}

const BOW = ['kk...kk', 'kpkkkpk', 'kpkPkpk', 'kpkkkpk', 'kk...kk']
const LAMP = [
  '.......kk.......',
  '.....kkmmkk.....',
  '...kkmmmmmmkk...',
  '..kmmmmmmmmmmk..',
  '.kmmmmmmmmmmmmk.',
  'kkkkkkkkkkkkkkkk',
  '......yyyy......',
]
const SUN = ['..kkkk..', '.kyyyyk.', 'kykyykyk', 'kryyyyrk', 'kyykkyyk', 'kyyyyyyk', '.kyyyyk.', '..kkkk..']
const CLOUD = ['...kkk....', '.kkwwwkk..', 'kwwwwwwwk.', '.kkkkkkk..']
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
const MUG = [
  'kkkkkkkk..',
  'kcccccckk.',
  'kckcckck.k',
  'krckkcrk.k',
  'kcccccckk.',
  '.kkkkkk...',
]
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
const HEART = ['PP.PP', 'PPPPP', '.PPP.', '..P..']
const JAR = (fill) => ['.kkk.', 'kPPPk', 'kwwwk', `k${fill}${fill}${fill}k`, `k${fill}${fill}${fill}k`, `k${fill}${fill}${fill}k`, '.kkk.']

// Draws a sprite at scene position (x, y), merging same-color runs into one rect.
function Sprite({ x, y, rows, className }) {
  const rects = []
  rows.forEach((row, j) => {
    let i = 0
    while (i < row.length) {
      let k = i
      while (k < row.length && row[k] === row[i]) k++
      if (row[i] !== '.') {
        rects.push(<rect key={`${i}-${j}`} x={x + c(i)} y={y + c(j)} width={c(k - i)} height={P} fill={PAL[row[i]]} />)
      }
      i = k
    }
  })
  return <g className={className}>{rects}</g>
}

// A rectangle in cell units, optionally with a one-pixel outline.
function Box({ x, y, w, h, fill, outline }) {
  if (!outline) return <rect x={c(x)} y={c(y)} width={c(w)} height={c(h)} fill={fill} />
  return (
    <>
      <rect x={c(x)} y={c(y)} width={c(w)} height={c(h)} fill={PAL.k} />
      <rect x={c(x + 1)} y={c(y + 1)} width={c(w - 2)} height={c(h - 2)} fill={fill} />
    </>
  )
}

function Hotspot({ label, onActivate, disabled, children }) {
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

const FRAME_COLORS = [PAL.L, PAL.l, PAL.M, PAL.o]

function Frame({ box, study, index, onSelect, disabled }) {
  const x = box.x / P
  const y = box.y / P
  const w = box.w / P
  const h = box.h / P
  const art = ART[study.art] ?? ART.coffee
  const plaqueW = w
  return (
    <Hotspot label={`Open case study: ${study.title}`} onActivate={() => onSelect(study.id)} disabled={disabled}>
      <g className="lift">
        <Box x={x + 1} y={y + 1} w={w} h={h} fill="#00000022" />
        <Box x={x} y={y} w={w} h={h} fill={FRAME_COLORS[index % 4]} outline />
        <Box x={x + 3} y={y + 3} w={w - 6} h={h - 6} fill={art.bg} outline />
        <Sprite x={c(x + Math.floor((w - 12) / 2))} y={c(y + Math.floor((h - 12) / 2))} rows={art.rows} />
        <rect className="ring" x={c(x) - 6} y={c(y - 3) - 6} width={c(w) + 12} height={c(h + 3) + 12} />
      </g>
      <Box x={x + Math.floor((w - plaqueW) / 2)} y={y + h + 1} w={plaqueW} h={4} fill={PAL.w} outline />
      <text x={c(x) + c(w) / 2} y={c(y + h + 3) + 4} textAnchor="middle" className="plaque">{study.title}</text>
    </Hotspot>
  )
}

function Computer({ onSelect, disabled }) {
  return (
    <Hotspot label="Look at the computer: resume and engineering projects" onActivate={() => onSelect('computer')} disabled={disabled}>
      <g className="lift">
        <Box x={93} y={95} w={14} h={3} fill={PAL.c} outline />
        <Box x={89} y={97} w={22} h={3} fill={PAL.c} outline />
        <Box x={83} y={74} w={34} h={22} fill={PAL.c} outline />
        <Box x={85} y={76} w={30} h={18} fill={PAL.m} outline />
        {[0, 1, 2].map((i) => (
          <Box key={i} x={87} y={78 + i * 4} w={3} h={3} fill={[PAL.w, PAL.y, PAL.p][i]} outline />
        ))}
        <Box x={95} y={79} w={17} h={11} fill={PAL.w} outline />
        <Box x={95} y={79} w={17} h={3} fill={PAL.P} outline />
        <Sprite x={c(101)} y={c(83)} rows={HEART} />
        <Sprite x={c(98)} y={c(94)} rows={['PP.PP'].map((r) => r.replace(/P/g, 'r'))} />
        <rect className="ring" x={c(83) - 6} y={c(74) - 6} width={c(34) + 12} height={c(26) + 12} />
      </g>
    </Hotspot>
  )
}

export default function CafeScene({ caseStudies, onSelect, disabled }) {
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
      {wire.map(({ x, y }) => <rect key={x} x={c(x)} y={c(y)} width={P} height={P} fill={PAL.k} />)}
      {bulbs.map(({ x, y }, i) => (
        <g key={x} className="twinkle" style={{ animationDelay: `${(i % 4) * 0.5}s` }}>
          <Box x={x} y={y + 1} w={2} h={2} fill={[PAL.y, PAL.w, PAL.y, PAL.p][i % 4]} />
        </g>
      ))}

      {/* Window with curtains */}
      <g>
        <Box x={162} y={18} w={32} h={54} fill={PAL.w} outline />
        <Box x={164} y={20} w={28} h={50} fill={PAL.c} outline />
        <Box x={165} y={30} w={26} h={10} fill={PAL.p} />
        <Box x={165} y={40} w={26} h={12} fill={PAL.y} />
        <Box x={165} y={52} w={26} h={17} fill={PAL.o} />
        <Sprite x={c(167)} y={c(24)} rows={CLOUD} />
        <Sprite x={c(180)} y={c(33)} rows={CLOUD} />
        <Sprite x={c(168)} y={c(55)} rows={SUN} />
        <Box x={177} y={21} w={2} h={48} fill={PAL.w} />
        <Box x={165} y={44} w={26} h={2} fill={PAL.w} />
        <Box x={156} y={15} w={44} h={2} fill={PAL.L} outline />
        <Box x={158} y={16} w={6} h={44} fill={PAL.p} outline />
        <Box x={192} y={16} w={6} h={44} fill={PAL.p} outline />
        <Box x={160} y={71} w={36} h={3} fill={PAL.l} outline />
        <Sprite x={c(183)} y={c(59)} rows={PLANT} />
      </g>

      {/* Shelf with jars and a plant */}
      <g>
        <Box x={8} y={46} w={32} h={2} fill={PAL.l} outline />
        <Box x={11} y={48} w={1} h={3} fill={PAL.k} />
        <Box x={36} y={48} w={1} h={3} fill={PAL.k} />
        <Sprite x={c(11)} y={c(39)} rows={JAR('L')} />
        <Sprite x={c(17)} y={c(39)} rows={JAR('y')} />
        <Sprite x={c(28)} y={c(34)} rows={PLANT} />
        {[[29, 48, 4], [32, 48, 7], [35, 48, 3]].map(([x, y, h]) => (
          <Box key={x} x={x} y={y} w={1} h={h} fill={PAL.M} />
        ))}
      </g>



      {/* Wainscoting */}
      <Box x={-200} y={93} w={600} h={44} fill="#a5a58d" />
      <Box x={-200} y={93} w={600} h={3} fill="#6b705c" />
      <Box x={-200} y={93} w={600} h={1} fill={PAL.k} />
      {panels.map((x) => (
        <rect key={x} x={c(x + 2) + 3} y={c(98) + 3} width={c(16) - 6} height={c(35) - 6} fill="none" stroke="#6b705c" strokeWidth={P} />
      ))}

      {/* Floor */}
      <rect x={c(-200)} y={c(137)} width={c(600)} height={c(120)} fill="url(#checker)" />
      <Box x={-200} y={137} w={600} h={1} fill={PAL.k} />

      {/* Pendant lamps */}
      {[62, 142].map((x) => (
        <g key={x}>
          <Box x={x} y={-120} w={1} h={132} fill={PAL.k} />
          <Sprite x={c(x - 7)} y={c(12)} rows={LAMP} />
        </g>
      ))}

      {/* Framed case studies */}
      {caseStudies.slice(0, FRAMES.length).map((study, i) => (
        <Frame key={study.id} box={FRAMES[i]} study={study} index={i} onSelect={onSelect} disabled={disabled} />
      ))}

      {/* Desk */}
      <g>
        <Box x={50} y={111} w={5} h={26} fill={PAL.L} outline />
        <Box x={145} y={111} w={5} h={26} fill={PAL.L} outline />
        <Box x={47} y={104} w={106} h={8} fill={PAL.l} outline />
        <Box x={88} y={105} w={24} h={6} fill={PAL.c} outline />
        <Sprite x={c(98)} y={c(107)} rows={['P.P', '.P.']} />
        <Box x={44} y={100} w={112} h={5} fill={PAL.l} outline />
        <Box x={45} y={103} w={110} h={1} fill={PAL.L} />
      </g>

      {/* Desk things */}
      <Sprite x={c(52)} y={c(88)} rows={PLANT} />
      <Sprite x={c(68)} y={c(91)} rows={STEAM} className="steam" />
      <Sprite x={c(68)} y={c(94)} rows={MUG} />

      <Computer onSelect={onSelect} disabled={disabled} />

      <g>
        <Box x={120} y={96} w={16} h={4} fill={PAL.v} outline />
        <Box x={121} y={92} w={14} h={4} fill={PAL.M} outline />
        <Box x={119} y={88} w={15} h={4} fill={PAL.P} outline />
      </g>
      <Sprite x={c(138)} y={c(92)} rows={CAT} />
      <text x={c(146)} y={c(89)} className="zzz">z z</text>
    </>
  )
}
