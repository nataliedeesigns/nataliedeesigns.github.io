import axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import App from '../App'
import { caseStudies } from '../data'

const settle = () => act(() => new Promise((resolve) => setTimeout(resolve, 50)))

async function renderAt(hash) {
  window.history.replaceState(null, '', `/${hash}`)
  render(<App />)
  await settle()
}

// Run axe's WCAG 2.2 A/AA rules and best practices on the whole page. Color contrast is
// left out because jsdom doesn't lay out or paint the page; it was checked in a browser.
async function violations() {
  const results = await axe.run(document.body, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'],
    },
    rules: { 'color-contrast': { enabled: false } },
  })
  return results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(', ')}`)
}

describe('accessibility (axe)', () => {
  it('home page', async () => {
    await renderAt('')
    expect(await violations()).toEqual([])
  })

  it.each(caseStudies.map((s) => [s.id]))('case study page #/work/%s', async (id) => {
    await renderAt(`#/work/${id}`)
    expect(await violations()).toEqual([])
  })

  it.each(['Resume', 'Projects', 'Contact'])('computer screen with %s open', async (app) => {
    await renderAt('')
    fireEvent.click(screen.getByRole('button', { name: /Look at the computer/ }))
    await settle()
    fireEvent.click(screen.getByRole('button', { name: app }))
    await settle()
    expect(await violations()).toEqual([])
  })
})
