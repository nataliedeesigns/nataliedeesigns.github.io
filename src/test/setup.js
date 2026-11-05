import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// jsdom has no layout, so give the browser APIs the scenes rely on simple stand-ins.

// Every scene reports a 1024 x 768 size, so the zoom camera has something to fit.
globalThis.ResizeObserver = class {
  constructor(callback) {
    this.callback = callback
  }
  observe() {
    this.callback([{ contentRect: { width: 1024, height: 768 } }])
  }
  unobserve() {}
  disconnect() {}
}

// Ask for reduced motion so zooms finish in a single frame.
window.matchMedia = (query) => ({
  matches: query.includes('prefers-reduced-motion'),
  media: query,
  addEventListener() {},
  removeEventListener() {},
})

Element.prototype.scrollIntoView = function () {}
window.scrollTo = () => {}

afterEach(() => {
  cleanup()
  window.history.replaceState(null, '', '/')
})
