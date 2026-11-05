import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen, within } from '@testing-library/react'
import App from '../App'
import { caseStudies } from '../data'
import { caseOutline } from '../components/caseOutline'

// Let the zoom camera's animation frames and any hash change run.
// A note on the corkboard. Notes are named by their visible text, which starts with the title.
const note = (title) =>
  within(screen.getByRole('region', { name: 'Case studies' })).getByRole('button', {
    name: new RegExp(`^${title}`),
  })

const settle = () => act(() => new Promise((resolve) => setTimeout(resolve, 50)))

async function renderAt(hash) {
  window.history.replaceState(null, '', `/${hash}`)
  const view = render(<App />)
  await settle()
  return view
}

let consoleError
beforeEach(() => {
  consoleError = vi.spyOn(console, 'error')
})
afterEach(() => {
  // A render that logs an error (a React warning, a failed prop type, a crash) fails the test.
  expect(consoleError).not.toHaveBeenCalled()
  consoleError.mockRestore()
})

describe('every route renders', () => {
  it('renders the home page with a note for every case study', async () => {
    await renderAt('')
    for (const study of caseStudies) {
      expect(note(study.title)).toBeTruthy()
    }
    expect(screen.getByRole('button', { name: /Look at the computer/ })).toBeTruthy()
  })

  it.each(caseStudies.map((s) => [s.id, s]))(
    'renders the case study page #/work/%s',
    async (id, study) => {
      await renderAt(`#/work/${id}`)
      expect(screen.getByRole('heading', { level: 1, name: study.title })).toBeTruthy()
      const toc = within(screen.getByRole('navigation', { name: 'On this page' }))
      for (const { label } of caseOutline(study)) {
        expect(toc.getByRole('button', { name: new RegExp(label) })).toBeTruthy()
      }
    },
  )

  it('falls back to the home page for an unknown case study', async () => {
    await renderAt('#/work/does-not-exist')
    expect(screen.getByRole('button', { name: /Look at the computer/ })).toBeTruthy()
  })
})

describe('case study links on the home page resolve', () => {
  it.each(caseStudies.map((s) => [s.title, s]))(
    'the "%s" note opens its page',
    async (title, study) => {
      await renderAt('')
      fireEvent.click(note(title))
      await settle()
      expect(window.location.hash).toBe(`#/work/${study.id}`)
      expect(await screen.findByRole('heading', { level: 1, name: title })).toBeTruthy()
    },
  )

  it('the sidebar links open their pages too', async () => {
    await renderAt('')
    const nav = within(screen.getByRole('navigation', { name: 'Portfolio' }))
    fireEvent.click(nav.getByRole('button', { name: new RegExp(caseStudies[0].title) }))
    await settle()
    expect(
      await screen.findByRole('heading', { level: 1, name: caseStudies[0].title }),
    ).toBeTruthy()
  })

  it('every link between case studies points at a real case study', async () => {
    const ids = new Set(caseStudies.map((s) => s.id))
    for (const study of caseStudies) {
      const { container, unmount } = await renderAt(`#/work/${study.id}`)
      for (const link of container.querySelectorAll('a[href^="#/"]')) {
        const href = link.getAttribute('href')
        const match = href.match(/^#\/work\/(.+)$/)
        if (match) expect(ids, `${href} on ${study.id}`).toContain(match[1])
        else expect(href).toBe('#/')
      }
      unmount()
    }
  })

  it('every file a case study points to exists in public/', () => {
    const paths = caseStudies.flatMap((s) => [
      s.cover,
      s.prototype?.video,
      s.prototype?.poster,
      ...s.sections.flatMap((sec) => (sec.media ?? []).flatMap((m) => [m.src, m.video, m.poster])),
    ])
    for (const path of paths.filter((p) => typeof p === 'string' && p.startsWith('/'))) {
      expect(existsSync(fileURLToPath(new URL(`../../public${path}`, import.meta.url))), path).toBe(
        true,
      )
    }
  })
})
