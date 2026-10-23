// The illustrated café interior. Coordinates are in a 1200 x 900 "scene" space;
// the wall and floor extend well past it so wide or tall screens never see an edge.

export const FRAMES = [
  { x: 300, y: 205, w: 130, h: 160 },
  { x: 452, y: 160, w: 150, h: 200 },
  { x: 624, y: 185, w: 160, h: 125 },
  { x: 806, y: 200, w: 106, h: 146 },
]

export const MONITOR = { x: 498, y: 446, w: 204, h: 166 }
export const SCREEN = { x: 514, y: 460, w: 172, h: 120 }

const C = {
  wall: '#ead9bf',
  wallDeep: '#dcc4a2',
  wood: '#7a4e33',
  woodDark: '#5a3824',
  woodDeep: '#3f2618',
  desk: '#8f5d3b',
  cream: '#f4ecdd',
  latte: '#c8a27a',
  terracotta: '#b9653f',
  mustard: '#d4a24c',
  sage: '#7d8a62',
  sageDark: '#5c6a48',
  brass: '#b8864b',
  espresso: '#2f221a',
  glow: '#ffd99a',
}

function Art({ kind }) {
  switch (kind) {
    case 'mountains':
      return (
        <>
          <rect width="100" height="100" fill="#f2d3a8" />
          <circle cx="68" cy="34" r="12" fill="#e39b5f" />
          <path d="M0 70 L25 42 L45 62 L62 46 L100 78 V100 H0Z" fill="#a0694a" />
          <path d="M0 84 L30 60 L55 80 L78 64 L100 82 V100 H0Z" fill="#7d4f36" />
          <path d="M0 94 Q50 82 100 94 V100 H0Z" fill="#5a3a28" />
        </>
      )
    case 'cup':
      return (
        <>
          <rect width="100" height="100" fill="#c9a37f" />
          <ellipse cx="50" cy="76" rx="34" ry="7" fill={C.cream} opacity="0.9" />
          <path d="M28 46 H72 L68 70 Q50 78 32 70Z" fill={C.cream} />
          <path d="M71 50 Q84 52 80 60 Q77 66 69 64" fill="none" stroke={C.cream} strokeWidth="4" />
          <ellipse cx="50" cy="46" rx="22" ry="4" fill="#7a4e33" />
          <path d="M42 38 Q38 30 44 24 M52 38 Q48 28 55 20 M61 38 Q58 31 63 26" stroke={C.cream} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
        </>
      )
    case 'botanical':
      return (
        <>
          <rect width="100" height="100" fill="#e8dcc4" />
          <path d="M50 96 Q48 60 52 14" stroke={C.sageDark} strokeWidth="2" fill="none" />
          {[22, 36, 50, 64, 78].map((y, i) => (
            <g key={y}>
              <ellipse cx={i % 2 ? 38 : 62} cy={y} rx="13" ry="5" fill={i % 2 ? C.sage : C.sageDark}
                transform={`rotate(${i % 2 ? 25 : -25} ${i % 2 ? 38 : 62} ${y})`} />
              <ellipse cx={i % 2 ? 63 : 37} cy={y + 6} rx="11" ry="4" fill={i % 2 ? C.sageDark : C.sage}
                transform={`rotate(${i % 2 ? -25 : 25} ${i % 2 ? 63 : 37} ${y + 6})`} />
            </g>
          ))}
        </>
      )
    default:
      return (
        <>
          <rect width="100" height="100" fill="#f1e4cf" />
          <circle cx="34" cy="38" r="22" fill={C.terracotta} />
          <path d="M40 100 Q44 56 100 52 V100Z" fill={C.sage} />
          <circle cx="72" cy="30" r="10" fill={C.mustard} />
          <path d="M0 80 Q20 70 36 82 T70 84" stroke={C.woodDark} strokeWidth="2.5" fill="none" />
        </>
      )
  }
}

function Hotspot({ label, onActivate, disabled, children, className = '' }) {
  return (
    <g
      className={`hotspot ${className}`}
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

function Frame({ box, study, index, onSelect, disabled }) {
  const { x, y, w, h } = box
  const plaqueW = Math.min(w - 10, 112)
  return (
    <Hotspot label={`Open case study: ${study.title}`} onActivate={() => onSelect(study.id)} disabled={disabled}>
      <g className="lift">
        <line x1={x + w / 2} y1={y - 40} x2={x + 12} y2={y + 2} stroke={C.woodDeep} strokeWidth="1" opacity="0.5" />
        <line x1={x + w / 2} y1={y - 40} x2={x + w - 12} y2={y + 2} stroke={C.woodDeep} strokeWidth="1" opacity="0.5" />
        <circle cx={x + w / 2} cy={y - 40} r="3" fill={C.brass} />
        <rect x={x} y={y} width={w} height={h} rx="3" fill={index % 2 ? C.woodDark : C.brass} filter="url(#shadow)" />
        <rect x={x + 4} y={y + 4} width={w - 8} height={h - 8} fill="none" stroke="#000" strokeOpacity="0.15" />
        <rect x={x + 10} y={y + 10} width={w - 20} height={h - 20} fill={C.cream} />
        <svg x={x + 20} y={y + 20} width={w - 40} height={h - 40} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <Art kind={study.art} />
        </svg>
        <rect className="ring" x={x - 5} y={y - 5} width={w + 10} height={h + 10} rx="6" />
      </g>
      <rect x={x + (w - plaqueW) / 2} y={y + h + 8} width={plaqueW} height="16" rx="2" fill={C.brass} />
      <text x={x + w / 2} y={y + h + 19.5} textAnchor="middle" className="plaque">{study.title}</text>
    </Hotspot>
  )
}

function Computer({ onSelect, disabled }) {
  const m = MONITOR
  const s = SCREEN
  return (
    <Hotspot label="Look at the computer: resume and engineering projects" onActivate={() => onSelect('computer')} disabled={disabled}>
      <g className="lift">
        <ellipse cx="600" cy="611" rx="48" ry="5" fill={C.wallDeep} />
        <rect x="586" y="588" width="28" height="22" fill="#d9ccb4" />
        <rect x={m.x} y={m.y} width={m.w} height={148} rx="14" fill="#efe4d0" filter="url(#shadow)" />
        <rect x={s.x} y={s.y} width={s.w} height={s.h} rx="6" fill="url(#screen)" />
        <rect x={s.x} y={s.y} width={s.w} height="8" rx="3" fill="#000" opacity="0.18" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={s.x + 12} y={s.y + 18 + i * 26} width="16" height="16" rx="3" fill={C.cream} opacity="0.85" />
        ))}
        <rect x={s.x + 60} y={s.y + 26} width="80" height="56" rx="4" fill={C.cream} opacity="0.9" />
        <rect x={s.x + 60} y={s.y + 26} width="80" height="8" rx="3" fill={C.terracotta} opacity="0.9" />
        <circle cx="600" cy="585" r="3.5" fill={C.latte} />
        <rect x="540" y="603" width="120" height="9" rx="2" fill="#e3d6bf" />
        <rect x="546" y="605" width="108" height="3" rx="1" fill="#cbbb9f" />
        <rect className="ring" x={m.x - 6} y={m.y - 6} width={m.w + 12} height={m.h + 4} rx="16" />
      </g>
    </Hotspot>
  )
}

export default function CafeScene({ caseStudies, onSelect, disabled }) {
  const panels = []
  for (let x = -960; x < 2160; x += 120) panels.push(x)
  const planks = []
  for (let y = 842; y < 1400; y += 26) planks.push(y)
  const swags = []
  for (let x = -600; x < 1800; x += 300) swags.push(x)

  return (
    <>
      <defs>
        <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e3cfb1" />
          <stop offset="1" stopColor={C.wall} />
        </linearGradient>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0b47c" />
          <stop offset="0.6" stopColor="#f6d1a0" />
          <stop offset="1" stopColor="#f9e2bd" />
        </linearGradient>
        <linearGradient id="screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d99a6c" />
          <stop offset="1" stopColor="#8f5a3e" />
        </linearGradient>
        <radialGradient id="lampGlow">
          <stop offset="0" stopColor={C.glow} stopOpacity="0.55" />
          <stop offset="1" stopColor={C.glow} stopOpacity="0" />
        </radialGradient>
        <pattern id="wallpaper" width="36" height="36" patternUnits="userSpaceOnUse">
          <circle cx="18" cy="18" r="1.6" fill="#c9ad88" opacity="0.45" />
          <circle cx="0" cy="0" r="1.6" fill="#c9ad88" opacity="0.45" />
          <circle cx="36" cy="36" r="1.6" fill="#c9ad88" opacity="0.45" />
        </pattern>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#3f2618" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Wall */}
      <rect x="-1000" y="-600" width="3200" height="1200" fill="url(#wall)" />
      <rect x="-1000" y="-600" width="3200" height="1160" fill="url(#wallpaper)" />

      {/* String lights: a row of sagging wires, one bulb every quarter span */}
      <path d={swags.map((x) => `M${x} 40 Q${x + 150} 100 ${x + 300} 40`).join(' ')} stroke={C.woodDeep} strokeWidth="1.5" fill="none" />
      {swags.flatMap((x) => [0.25, 0.5, 0.75].map((t) => (
        <g key={`${x}-${t}`}>
          <circle cx={x + 300 * t} cy={46 + 120 * t * (1 - t)} r="9" fill={C.glow} opacity="0.35" />
          <circle cx={x + 300 * t} cy={46 + 120 * t * (1 - t)} r="4" fill={C.glow} />
        </g>
      )))}

      {/* Window */}
      <g>
        <rect x="972" y="112" width="186" height="316" rx="4" fill={C.woodDark} />
        <rect x="984" y="124" width="162" height="292" fill="url(#sky)" />
        <circle cx="1100" cy="300" r="26" fill="#f4a76a" opacity="0.8" />
        <path d="M984 360 L1010 330 L1030 345 L1060 310 L1090 340 L1120 320 L1146 345 V416 H984Z" fill="#b98a68" opacity="0.7" />
        <path d="M984 385 L1020 365 L1060 380 L1100 360 L1146 378 V416 H984Z" fill="#8f6449" opacity="0.8" />
        <rect x="1061" y="124" width="8" height="292" fill={C.woodDark} />
        <rect x="984" y="266" width="162" height="8" fill={C.woodDark} />
        <rect x="962" y="424" width="206" height="12" rx="2" fill={C.woodDeep} />
        <path d="M1110 424 h30 l-4 -26 h-22z" fill={C.terracotta} />
        <path d="M1125 398 q-18 -24 -4 -40 M1125 398 q14 -26 2 -44 M1125 398 q22 -12 20 -30" stroke={C.sageDark} strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>

      {/* Shelf with jars and trailing plant */}
      <g>
        <rect x="36" y="292" width="210" height="10" rx="2" fill={C.woodDark} />
        <path d="M60 302 v18 h16 M220 302 v18 h-16" stroke={C.woodDeep} strokeWidth="4" fill="none" />
        <rect x="58" y="246" width="34" height="46" rx="6" fill="#efe4d0" opacity="0.8" />
        <rect x="58" y="262" width="34" height="30" rx="4" fill={C.woodDark} opacity="0.85" />
        <rect x="60" y="240" width="30" height="8" rx="2" fill={C.brass} />
        <rect x="102" y="256" width="28" height="36" rx="5" fill="#efe4d0" opacity="0.8" />
        <rect x="102" y="270" width="28" height="22" rx="4" fill={C.mustard} opacity="0.8" />
        <rect x="104" y="250" width="24" height="7" rx="2" fill={C.brass} />
        <path d="M144 292 h26 l-3 -18 h-20z" fill={C.cream} />
        <path d="M144 274 h26 l-3 -18 h-20z" fill={C.latte} />
        <path d="M186 292 h44 l-6 -32 h-32z" fill={C.terracotta} />
        <path d="M200 262 q-30 40 -18 110 M212 262 q20 50 6 130 M206 262 q-4 30 -2 70" stroke={C.sageDark} strokeWidth="2" fill="none" />
        {[[184, 300], [178, 330], [186, 360], [224, 300], [226, 340], [220, 380], [204, 316], [205, 334]].map(([cx, cy], i) => (
          <ellipse key={i} cx={cx} cy={cy} rx="7" ry="4.5" fill={i % 2 ? C.sage : C.sageDark} transform={`rotate(${i % 2 ? 35 : -35} ${cx} ${cy})`} />
        ))}
        <ellipse cx="200" cy="258" rx="14" ry="7" fill={C.sage} />
      </g>

      {/* Chalkboard menu */}
      <g>
        <rect x="52" y="368" width="150" height="168" rx="4" fill={C.woodDark} />
        <rect x="60" y="376" width="134" height="152" fill="#33302b" />
        <text x="127" y="402" textAnchor="middle" className="chalk chalk-title">Menu</text>
        <text x="72" y="428" className="chalk">Latte</text><text x="182" y="428" textAnchor="end" className="chalk">4.5</text>
        <text x="72" y="448" className="chalk">Flat white</text><text x="182" y="448" textAnchor="end" className="chalk">4</text>
        <text x="72" y="468" className="chalk">Cortado</text><text x="182" y="468" textAnchor="end" className="chalk">4</text>
        <text x="72" y="496" className="chalk">Case studies</text><text x="182" y="496" textAnchor="end" className="chalk">free</text>
        <path d="M72 510 h110" stroke="#e9e1d2" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
      </g>

      {/* Wainscoting */}
      <rect x="-1000" y="560" width="3200" height="270" fill={C.wood} />
      <rect x="-1000" y="552" width="3200" height="12" fill={C.woodDark} />
      {panels.map((x) => (
        <rect key={x} x={x + 14} y="584" width="92" height="222" rx="3" fill="none" stroke={C.woodDark} strokeWidth="3" opacity="0.7" />
      ))}

      {/* Floor */}
      <rect x="-1000" y="822" width="3200" height="700" fill="#4d3021" />
      <rect x="-1000" y="822" width="3200" height="8" fill={C.woodDeep} />
      {planks.map((y, i) => (
        <g key={y} stroke="#3c2418" strokeWidth="1.5">
          <line x1="-1000" y1={y} x2="2200" y2={y} />
          {[0, 1, 2, 3, 4, 5, 6].map((k) => (
            <line key={k} x1={-200 + k * 240 + (i % 2) * 120} y1={y - 26} x2={-200 + k * 240 + (i % 2) * 120} y2={y} />
          ))}
        </g>
      ))}

      {/* Floor plant */}
      <g>
        {[[-40, 120, 640, C.sageDark], [-15, 130, 600, C.sage], [20, 150, 610, C.sageDark], [45, 165, 660, C.sage], [-60, 95, 690, C.sage]].map(([rot, cx, cy, fill], i) => (
          <g key={i} transform={`rotate(${rot} 120 760)`}>
            <path d={`M120 760 Q${cx - 10} ${cy + 60} ${cx} ${cy}`} stroke={C.sageDark} strokeWidth="3" fill="none" />
            <ellipse cx={cx} cy={cy} rx="30" ry="46" fill={fill} />
            <path d={`M${cx} ${cy - 40} V${cy + 40}`} stroke="#4e5a3c" strokeWidth="2" />
          </g>
        ))}
        <path d="M70 752 h100 l-12 76 h-76z" fill={C.terracotta} />
        <rect x="64" y="744" width="112" height="14" rx="3" fill="#a5562f" />
      </g>

      {/* Pendant lamps */}
      {[380, 840].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy="230" rx="170" ry="190" fill="url(#lampGlow)" pointerEvents="none" />
          <line x1={x} y1="-600" x2={x} y2="72" stroke={C.woodDeep} strokeWidth="2" />
          <path d={`M${x - 40} 112 Q${x - 38} 70 ${x} 68 Q${x + 38} 70 ${x + 40} 112Z`} fill="#3e5544" />
          <rect x={x - 41} y="109" width="82" height="5" rx="2" fill={C.brass} />
          <ellipse cx={x} cy="116" rx="12" ry="7" fill={C.glow} />
        </g>
      ))}

      {/* Framed case studies */}
      {caseStudies.slice(0, FRAMES.length).map((study, i) => (
        <Frame key={study.id} box={FRAMES[i]} study={study} index={i} onSelect={onSelect} disabled={disabled} />
      ))}

      {/* Desk */}
      <g>
        <rect x="292" y="664" width="20" height="160" fill={C.woodDark} />
        <rect x="888" y="664" width="20" height="160" fill={C.woodDark} />
        <rect x="282" y="626" width="636" height="44" fill={C.desk} filter="url(#shadow)" />
        <rect x="520" y="636" width="160" height="24" rx="3" fill="none" stroke={C.woodDark} strokeWidth="2" />
        <rect x="590" y="645" width="20" height="5" rx="2" fill={C.brass} />
        <rect x="268" y="610" width="664" height="18" rx="3" fill="#9c6845" />
        <rect x="268" y="624" width="664" height="4" fill={C.woodDark} opacity="0.5" />
      </g>

      {/* Desk lamp */}
      <g>
        <ellipse cx="322" cy="608" rx="24" ry="5" fill={C.brass} />
        <path d="M322 606 L340 540 L310 500" stroke={C.brass} strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M296 488 L332 506 L318 528 Q300 524 290 508Z" fill="#3e5544" />
        <ellipse cx="318" cy="540" rx="40" ry="34" fill="url(#lampGlow)" pointerEvents="none" />
      </g>

      {/* Coffee mug with steam */}
      <g>
        <path d="M402 566 h44 l-4 44 h-36z" fill={C.terracotta} />
        <path d="M444 576 q16 2 12 16 q-3 9 -14 9" stroke={C.terracotta} strokeWidth="5" fill="none" />
        <ellipse cx="424" cy="566" rx="22" ry="4" fill={C.woodDeep} />
        <path className="steam s1" d="M414 556 q-8 -12 0 -24 q8 -12 0 -24" />
        <path className="steam s2" d="M426 556 q-8 -14 0 -28 q8 -12 0 -26" />
        <path className="steam s3" d="M438 556 q-8 -12 0 -22 q8 -10 0 -20" />
      </g>

      <Computer onSelect={onSelect} disabled={disabled} />

      {/* Books and succulent */}
      <g>
        <rect x="736" y="594" width="104" height="16" rx="2" fill={C.sageDark} />
        <rect x="744" y="579" width="92" height="15" rx="2" fill={C.terracotta} />
        <rect x="740" y="565" width="96" height="14" rx="2" fill={C.mustard} />
        <line x1="746" y1="572" x2="828" y2="572" stroke={C.cream} strokeWidth="1.5" opacity="0.6" />
        <path d="M768 565 h32 l-4 -22 h-24z" fill={C.cream} />
        {[-50, -25, 0, 25, 50].map((r) => (
          <ellipse key={r} cx="784" cy="534" rx="5" ry="13" fill={r % 50 ? C.sage : C.sageDark} transform={`rotate(${r} 784 546)`} />
        ))}
      </g>

      {/* Croissant on a plate */}
      <g>
        <ellipse cx="886" cy="608" rx="30" ry="6" fill={C.cream} />
        <path d="M862 602 Q868 584 886 582 Q904 584 910 602 Q900 596 886 598 Q872 596 862 602Z" fill={C.mustard} />
        <path d="M876 586 l4 12 M886 583 v14 M896 586 l-4 12" stroke="#a8742e" strokeWidth="1.5" />
      </g>
    </>
  )
}
