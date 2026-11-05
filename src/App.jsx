import { useCallback, useEffect, useRef, useState } from 'react'
import Sidebar, { CaseSidebar } from './components/Sidebar'
import ZoomScene from './components/ZoomScene'
import Corkboard from './components/Corkboard'
import { boardLayout } from './components/boardLayout'
import CafeScene from './components/CafeScene'
import { MONITOR, SCREEN } from './components/pixel'
import CaseStudy from './components/CaseStudy'
import { caseOutline } from './components/caseOutline'
import ComputerScreen from './components/ComputerScreen'
import { navigate, useRoute } from './router'
import { scrollBehavior } from './motion'
import { profile, caseStudies } from './data'

// The first thing a keyboard user reaches. It moves focus in code because a plain
// "#main" link would be read as a page address by the router.
function SkipLink() {
  return (
    <a
      className="skip-link"
      href="#main"
      onClick={(e) => {
        e.preventDefault()
        document.getElementById('main')?.focus()
      }}
    >
      Skip to content
    </a>
  )
}

// Move keyboard focus to a scene's hotspot (a note or the computer).
const focusHotspot = (id) =>
  document.querySelector(`[data-hotspot="${id}"]`)?.focus({ preventScroll: true })

const pad = (b, n) => ({ x: b.x - n, y: b.y - n, w: b.w + n * 2, h: b.h + n * 2 })

function corkboardLayout(aspect) {
  const { board, notes } = boardLayout(caseStudies.length, aspect)
  return {
    home: pad(board, 24),
    targets: Object.fromEntries(caseStudies.map((s, i) => [s.id, { camera: pad(notes[i], 40) }])),
  }
}

function deskLayout(aspect) {
  return {
    // The desk is framed at the same scale as the corkboard (1248 units across on wide
    // screens, 768 on narrow ones), so a pixel is the same size in both sections.
    home: aspect >= 0.9 ? { x: -24, y: 285, w: 1248, h: 600 } : { x: 216, y: 300, w: 768, h: 560 },
    targets: {
      computer: {
        camera: { x: MONITOR.x - 16, y: MONITOR.y - 16, w: MONITOR.w + 32, h: MONITOR.h + 24 },
        panel: SCREEN,
      },
    },
  }
}

// The corkboard and, below it, the desk. `returnFrom` is the case study we just
// left: the board starts zoomed in on its note and then zooms back out.
function Home({ returnFrom }) {
  const [focus, setFocus] = useState(returnFrom)
  const opening = useRef(null)
  // What to put keyboard focus back on once the camera has zoomed out.
  const returnFocus = useRef(returnFrom)
  const focusRef = useRef(focus)
  focusRef.current = focus
  const boardRef = useRef(null)
  const deskRef = useRef(null)

  // Bring the right section into view, then zoom in to the note or the computer.
  const goTo = useCallback((id) => {
    opening.current = id
    if (id) {
      const section = (id === 'computer' ? deskRef : boardRef).current
      section.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
    } else {
      returnFocus.current = focusRef.current
    }
    setFocus(id)
  }, [])

  // Once the camera reaches a note: open its page, or zoom out if we just came back from it.
  const onBoardArrive = useCallback(
    (id) => {
      if (!id) {
        if (returnFocus.current && returnFocus.current !== 'computer')
          focusHotspot(returnFocus.current)
        returnFocus.current = null
        return
      }
      if (id === opening.current) navigate(`/work/${id}`)
      else if (id === returnFrom) setTimeout(() => setFocus(null), 150)
    },
    [returnFrom],
  )

  // On phones the page itself scrolls, so hold it still while zoomed in.
  useEffect(() => {
    document.documentElement.classList.toggle('is-locked', Boolean(focus))
    return () => document.documentElement.classList.remove('is-locked')
  }, [focus])

  return (
    <div className="layout">
      <SkipLink />
      <Sidebar profile={profile} caseStudies={caseStudies} focus={focus} onFocus={goTo} />
      <main id="main" tabIndex={-1} className={`stage ${focus ? 'is-locked' : ''}`}>
        <section ref={boardRef} className="stage-section" aria-labelledby="board-heading">
          <h2 id="board-heading" className="sr-only">
            Case studies
          </h2>
          <ZoomScene
            label="A corkboard with case study notes pinned to it"
            layout={corkboardLayout}
            focus={focus && focus !== 'computer' ? focus : null}
            onFocus={goTo}
            onArrive={onBoardArrive}
          >
            {(aspect, disabled, scale) => (
              <Corkboard
                caseStudies={caseStudies}
                layout={boardLayout(caseStudies.length, aspect)}
                onSelect={goTo}
                disabled={disabled}
                minText={12 / scale}
              />
            )}
          </ZoomScene>
          {!focus && (
            <button
              className="scroll-cue"
              onClick={() => deskRef.current.scrollIntoView({ behavior: scrollBehavior() })}
            >
              ↓ Scroll down to my desk
            </button>
          )}
        </section>

        <section ref={deskRef} className="stage-section" aria-labelledby="desk-heading">
          <h2 id="desk-heading" className="sr-only">
            Resume and projects
          </h2>
          <ZoomScene
            label="A cozy café desk with a computer on it"
            layout={deskLayout}
            focus={focus === 'computer' ? 'computer' : null}
            onFocus={goTo}
            onArrive={(id) => {
              if (!id && returnFocus.current === 'computer') {
                focusHotspot('computer')
                returnFocus.current = null
              }
            }}
            panelClass={() => 'panel-screen'}
            renderPanel={() => <ComputerScreen />}
            hint="Click the computer for my resume and projects"
          >
            {(aspect, disabled) => <CafeScene onSelect={goTo} disabled={disabled} />}
          </ZoomScene>
        </section>
      </main>
    </div>
  )
}

// A case study page, with its headings in the sidebar.
function CasePage({ study, focusHeading }) {
  const outline = caseOutline(study)
  const [active, setActive] = useState(outline[0].id)
  const index = caseStudies.indexOf(study)
  const next = caseStudies.length > 1 ? caseStudies[(index + 1) % caseStudies.length] : null

  // Highlight the last heading that has scrolled past the top third of the screen.
  useEffect(() => {
    const onScroll = (e) => {
      let current = outline[0].id
      for (const { id } of outline) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) current = id
      }
      // The last sections may be too short to reach the top, so the bottom of the page counts as the end.
      const scroller = e.target === document ? document.scrollingElement : e.target
      if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 4)
        current = outline.at(-1).id
      setActive(current)
    }
    document.addEventListener('scroll', onScroll, true)
    return () => document.removeEventListener('scroll', onScroll, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [study])

  useEffect(() => {
    document.title = `${study.title} — ${profile.name}`
    window.scrollTo(0, 0)
    // Arriving from another page: start screen readers and keyboard focus at the title.
    if (focusHeading) document.querySelector('.case-study h1')?.focus({ preventScroll: true })
    return () => {
      document.title = `${profile.name} — ${profile.role}`
    }
  }, [study, focusHeading])

  const jump = (id) => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
  }

  return (
    <div className="layout">
      <SkipLink />
      <CaseSidebar
        profile={profile}
        study={study}
        outline={outline}
        active={active}
        onJump={jump}
      />
      <main id="main" tabIndex={-1} className="stage case-stage">
        <CaseStudy study={study} next={next} />
      </main>
    </div>
  )
}

export default function App() {
  const { route, from } = useRoute()
  const study = route.page === 'work' && caseStudies.find((s) => s.id === route.id)
  if (study) return <CasePage key={study.id} study={study} focusHeading={from !== null} />
  const returnFrom =
    from?.page === 'work' && caseStudies.some((s) => s.id === from.id) ? from.id : null
  return <Home key={returnFrom ?? 'home'} returnFrom={returnFrom} />
}
