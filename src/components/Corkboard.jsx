import { Sprite, Hotspot } from './CafeScene'
import { ART, PAL } from './pixel'

const NOTE_COLORS = ['#fffdf7', '#ffe8d6', '#f5e6ca', '#ffd6a5']
const pin = (fill) => [
  '.kkk.',
  'k' + fill + 'w' + fill + 'k',
  'k' + fill.repeat(3) + 'k',
  '.kkk.',
  '..k..',
  '..k..',
]
const PIN_KEYS = ['P', 'M', 'L', 'G']

function Thumbnail({ study, x, y, w, h, clipId }) {
  if (study.cover) {
    return (
      <>
        <clipPath id={clipId}>
          <rect x={x} y={y} width={w} height={h} />
        </clipPath>
        <image
          href={typeof study.cover === 'string' ? study.cover : study.cover.src}
          x={x}
          y={y}
          width={w}
          height={h}
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${clipId})`}
        />
      </>
    )
  }
  const art = ART[study.art] ?? ART.coffee
  const scale = Math.min((h * 0.8) / 72, 2.4)
  return (
    <>
      <rect x={x} y={y} width={w} height={h} fill={art.bg} />
      <g
        transform={`translate(${x + (w - 72 * scale) / 2} ${y + (h - 72 * scale) / 2}) scale(${scale})`}
      >
        <Sprite x={0} y={0} rows={art.rows} />
      </g>
    </>
  )
}

// Split text into at most `maxLines` lines of about `maxChars` characters.
function wrap(text, maxChars, maxLines = 3) {
  const lines = []
  for (const word of text.split(' ')) {
    const last = lines[lines.length - 1]
    if (last !== undefined && (last + ' ' + word).length <= maxChars)
      lines[lines.length - 1] += ' ' + word
    else lines.push(word)
  }
  if (lines.length > maxLines)
    lines.splice(
      maxLines - 1,
      Infinity,
      lines
        .slice(maxLines - 1)
        .join(' ')
        .slice(0, maxChars - 1) + '…',
    )
  return lines
}

function Note({ study, box, index, onSelect, disabled, narrow, minText }) {
  const { x, y, w, h, tilt } = box
  const pad = w * 0.05
  // Narrow boards are drawn smaller on screen, so their text is relatively larger.
  // Text never renders smaller than `minText` (12px on screen), so on small screens it grows
  // and long subtitles wrap.
  const title = Math.max(narrow ? w * 0.1 : Math.max(17, Math.min(28, w * 0.065)), minText)
  const sub = Math.max(title * 0.62, minText)
  const cta = Math.max(title * 0.6, minText)
  // Georgia averages just under half an em per character.
  const subLines = wrap(study.subtitle, Math.floor((w - pad * 2) / (sub * 0.48)))
  // When the subtitle wraps, the picture gives up enough height to fit the extra lines.
  const baseThumbH = h * (narrow ? 0.5 : 0.55)
  const textH = title * 2.45 + (subLines.length - 1) * sub * 1.2 + sub * 0.4 + cta * 1.2
  const thumbH = subLines.length > 1 ? Math.min(baseThumbH, h - pad * 2 - textH) : baseThumbH
  const textY = y + pad + thumbH
  const cx = x + w / 2
  return (
    <Hotspot id={study.id} onActivate={() => onSelect(study.id)} disabled={disabled}>
      <g className="lift">
        <g transform={`rotate(${tilt} ${cx} ${y + h / 2})`} shapeRendering="geometricPrecision">
          <rect x={x + 8} y={y + 10} width={w} height={h} fill="#00000026" />
          <rect
            x={x}
            y={y}
            width={w}
            height={h}
            fill={NOTE_COLORS[index % NOTE_COLORS.length]}
            stroke={PAL.k}
            strokeWidth="5"
          />
          <Thumbnail
            study={study}
            x={x + pad}
            y={y + pad}
            w={w - pad * 2}
            h={thumbH}
            clipId={`thumb-${study.id}`}
          />
          <rect
            x={x + pad}
            y={y + pad}
            width={w - pad * 2}
            height={thumbH}
            fill="none"
            stroke={PAL.k}
            strokeWidth="3"
          />
          <text x={x + pad} y={textY + title * 1.5} className="note-title" fontSize={title}>
            {study.title}
          </text>
          <text
            x={x + pad}
            y={textY + title * 1.5 + title * 0.95}
            className="note-sub"
            fontSize={sub}
          >
            {subLines.map((line, i) => (
              <tspan key={i} x={x + pad} dy={i ? sub * 1.2 : 0}>
                {line}
              </tspan>
            ))}
          </text>
          <text
            x={x + w - pad}
            y={y + h - pad}
            textAnchor="end"
            className="note-cta"
            fontSize={cta}
          >
            Read case study <tspan aria-hidden="true">→</tspan>
          </text>
          <rect className="ring" x={x - 10} y={y - 10} width={w + 20} height={h + 20} />
        </g>
        <Sprite
          x={Math.round(cx / 6) * 6 - 15}
          y={Math.round(y / 6) * 6 - 24}
          rows={pin(PIN_KEYS[index % PIN_KEYS.length])}
        />
      </g>
    </Hotspot>
  )
}

export default function Corkboard({ caseStudies, layout, onSelect, disabled, minText = 0 }) {
  const { board, notes, narrow } = layout
  const { w: W, h: H } = board
  return (
    <>
      <defs>
        <pattern id="cork" width="36" height="36" patternUnits="userSpaceOnUse">
          <rect width="36" height="36" fill="#c69c6d" />
          <rect x="0" y="0" width="6" height="6" fill="#b2865a" />
          <rect x="18" y="12" width="6" height="6" fill="#d8b384" />
          <rect x="12" y="24" width="6" height="6" fill="#b2865a" />
          <rect x="30" y="30" width="6" height="6" fill="#d8b384" />
        </pattern>
        <pattern id="wall-dots" width="48" height="48" patternUnits="userSpaceOnUse">
          <rect width="48" height="48" fill="#f5e6ca" />
          <rect width="6" height="6" fill="#dcc7aa" />
          <rect x="24" y="24" width="6" height="6" fill="#dcc7aa" />
        </pattern>
      </defs>

      {/* Wall around the board */}
      <rect x={-2000} y={-2000} width={W + 4000} height={H + 4000} fill="url(#wall-dots)" />

      {/* Board: wooden frame around cork */}
      <rect x={-6} y={-6} width={W + 12} height={H + 12} fill={PAL.k} />
      <rect x={0} y={0} width={W} height={H} fill={PAL.l} />
      <rect x={0} y={H - 12} width={W} height={12} fill={PAL.L} />
      <rect x={24} y={24} width={W - 48} height={H - 48} fill={PAL.k} />
      <rect x={30} y={30} width={W - 60} height={H - 60} fill="url(#cork)" />

      {caseStudies.map((study, i) => (
        <Note
          key={study.id}
          study={study}
          box={notes[i]}
          index={i}
          onSelect={onSelect}
          disabled={disabled}
          narrow={narrow}
          minText={minText}
        />
      ))}
    </>
  )
}
