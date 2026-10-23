import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import CafeScene, { FRAMES, MONITOR, SCREEN } from './CafeScene'
import CaseStudy from './CaseStudy'
import ComputerScreen from './ComputerScreen'

const ZOOM_MS = 900

// Grow `box` to the container's aspect ratio so the whole box stays visible.
function fit(box, aspect) {
  const tooWide = box.w / box.h > aspect
  const w = tooWide ? box.w : box.h * aspect
  const h = tooWide ? box.w / aspect : box.h
  return { x: box.x + (box.w - w) / 2, y: box.y + (box.h - h) / 2, w, h }
}

function homeBox(aspect) {
  // Wide screens see the whole café; narrow ones crop in on the desk and frames.
  return aspect >= 0.9 ? { x: 30, y: 30, w: 1140, h: 830 } : { x: 270, y: 120, w: 660, h: 740 }
}

function targetFor(focus, caseStudies) {
  if (focus === 'computer') {
    return { camera: { x: MONITOR.x - 16, y: MONITOR.y - 16, w: MONITOR.w + 32, h: MONITOR.h + 24 }, panel: SCREEN }
  }
  const i = caseStudies.findIndex((c) => c.id === focus)
  const f = FRAMES[i]
  if (!f) return null
  return {
    camera: { x: f.x - 18, y: f.y - 18, w: f.w + 36, h: f.h + 36 },
    panel: { x: f.x + 18, y: f.y + 18, w: f.w - 36, h: f.h - 36 },
  }
}

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export default function Scene({ caseStudies, focus, onFocus }) {
  const wrapRef = useRef(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [view, setView] = useState({ x: 0, y: 0, w: 1200, h: 900 })
  const [arrived, setArrived] = useState(null)
  const viewRef = useRef(view)
  const frameRef = useRef(0)
  const firstRef = useRef(true)
  const lastFocusRef = useRef(focus)

  useLayoutEffect(() => {
    const el = wrapRef.current
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ w: width, h: height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const flyTo = useCallback((to, duration, onDone) => {
    cancelAnimationFrame(frameRef.current)
    const from = viewRef.current
    const start = performance.now()
    const step = (now) => {
      const t = duration ? Math.min(1, (now - start) / duration) : 1
      const k = ease(t)
      const v = {
        x: from.x + (to.x - from.x) * k,
        y: from.y + (to.y - from.y) * k,
        w: from.w + (to.w - from.w) * k,
        h: from.h + (to.h - from.h) * k,
      }
      viewRef.current = v
      setView(v)
      if (t < 1) frameRef.current = requestAnimationFrame(step)
      else onDone?.()
    }
    frameRef.current = requestAnimationFrame(step)
  }, [])

  // Move the camera whenever the focus or the container size changes.
  const target = focus ? targetFor(focus, caseStudies) : null
  useEffect(() => {
    if (!size.w || !size.h) return
    const aspect = size.w / size.h
    const to = fit(target ? target.camera : homeBox(aspect), aspect)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Only animate when the focus changes; resizes and the first paint jump straight there.
    const duration = firstRef.current || reduced || lastFocusRef.current === focus ? 0 : ZOOM_MS
    firstRef.current = false
    lastFocusRef.current = focus
    setArrived(null)
    flyTo(to, duration, () => setArrived(focus))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus, size.w, size.h, flyTo])

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  useEffect(() => {
    if (!focus) return
    const onKey = (e) => e.key === 'Escape' && onFocus(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [focus, onFocus])

  // Position the HTML panel over the frame's picture or the monitor's screen.
  let panelStyle = null
  if (target && arrived === focus && size.w) {
    const scale = size.w / view.w
    const p = target.panel
    let rect = {
      left: (p.x - view.x) * scale,
      top: (p.y - view.y) * scale,
      width: p.w * scale,
      height: p.h * scale,
    }
    // On small screens the zoomed-in area is too cramped to read, so use the whole scene.
    if (rect.width < 440 || rect.height < 320) {
      rect = { left: 12, top: 60, width: size.w - 24, height: size.h - 72 }
    }
    panelStyle = rect
  }

  const study = caseStudies.find((c) => c.id === focus)

  return (
    <div className={`scene ${focus ? 'is-zoomed' : ''}`} ref={wrapRef}>
      <svg
        className="scene-svg"
        viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
        preserveAspectRatio="none"
        shapeRendering="crispEdges"
        role="img"
        aria-label="A cozy coffee shop with four framed case studies above a desk and a computer"
      >
        <CafeScene caseStudies={caseStudies} onSelect={onFocus} disabled={Boolean(focus)} />
      </svg>

      {!focus && <p className="scene-hint">Click a frame or the computer to take a closer look</p>}

      {focus && (
        <button className="back-button" onClick={() => onFocus(null)} autoFocus>
          ← Back to the café
        </button>
      )}

      {panelStyle && (
        <div className={`panel ${focus === 'computer' ? 'panel-screen' : 'panel-paper'}`} style={panelStyle}>
          {focus === 'computer' ? <ComputerScreen /> : study && <CaseStudy study={study} />}
        </div>
      )}
    </div>
  )
}
