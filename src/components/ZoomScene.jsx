import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

const ZOOM_MS = 900

// Grow `box` to the container's aspect ratio so the whole box stays visible.
function fit(box, aspect) {
  const tooWide = box.w / box.h > aspect
  const w = tooWide ? box.w : box.h * aspect
  const h = tooWide ? box.w / aspect : box.h
  return { x: box.x + (box.w - w) / 2, y: box.y + (box.h - h) / 2, w, h }
}

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

// An SVG scene with a camera that flies in to a target and then shows an HTML panel.
//
// `layout(aspect)` returns { home, targets }: the box the camera rests on, and for each
// focusable id a `camera` box plus a `panel` box (scene units) or 'full' for the whole view.
// `children(aspect, disabled)` renders the SVG content. `onArrive(focus)` is called
// whenever the camera finishes moving; without `renderPanel` no panel is shown.
export default function ZoomScene({ label, layout, focus, onFocus, onArrive, renderPanel, panelClass, hint, children }) {
  const wrapRef = useRef(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [view, setView] = useState({ x: 0, y: 0, w: 1200, h: 900 })
  const [arrived, setArrived] = useState(null)
  const viewRef = useRef(view)
  const frameRef = useRef(0)
  const firstRef = useRef(true)
  const lastFocusRef = useRef(focus)
  const flightEndRef = useRef(0)

  useLayoutEffect(() => {
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ w: width, h: height })
    })
    ro.observe(wrapRef.current)
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

  const aspect = size.w && size.h ? size.w / size.h : 4 / 3
  const { home, targets } = layout(aspect)
  const target = focus ? targets[focus] : null

  // Move the camera whenever the focus or the container size changes.
  useEffect(() => {
    if (!size.w || !size.h) return
    const to = fit(target ? target.camera : home, aspect)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Animate when the focus changes. A resize mid-flight finishes the flight in the time
    // left; otherwise resizes and the first paint jump straight there.
    const remaining = Math.max(0, flightEndRef.current - performance.now())
    const duration = firstRef.current || reduced ? 0 : lastFocusRef.current === focus ? remaining : ZOOM_MS
    flightEndRef.current = performance.now() + duration
    firstRef.current = false
    lastFocusRef.current = focus
    setArrived(null)
    flyTo(to, duration, () => {
      setArrived(focus)
      onArrive?.(focus)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus, size.w, size.h, flyTo])

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])

  useEffect(() => {
    if (!focus) return
    const onKey = (e) => e.key === 'Escape' && onFocus(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [focus, onFocus])

  // Position the HTML panel over its spot in the scene, or over the whole view.
  let panelStyle = null
  if (renderPanel && target && arrived === focus && size.w) {
    const full = { left: 12, top: 64, width: size.w - 24, height: size.h - 76 }
    if (target.panel === 'full') {
      panelStyle = full
    } else {
      const scale = size.w / view.w
      const p = target.panel
      const rect = {
        left: (p.x - view.x) * scale,
        top: (p.y - view.y) * scale,
        width: p.w * scale,
        height: p.h * scale,
      }
      // On small screens the zoomed-in area is too cramped to read, so use the whole view.
      panelStyle = rect.width < 440 || rect.height < 320 ? full : rect
    }
  }

  return (
    <div className={`scene ${focus ? 'is-zoomed' : ''}`} ref={wrapRef}>
      <svg
        className="scene-svg"
        viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
        preserveAspectRatio="none"
        shapeRendering="crispEdges"
        role="img"
        aria-label={label}
      >
        {children(aspect, Boolean(focus))}
      </svg>

      {!focus && hint && <p className="scene-hint">{hint}</p>}

      {focus && renderPanel && (
        <button className="back-button" onClick={() => onFocus(null)} autoFocus>
          ← Back
        </button>
      )}

      {panelStyle && (
        <div className={`panel ${panelClass(focus)}`} style={panelStyle}>
          {renderPanel(focus)}
        </div>
      )}
    </div>
  )
}
