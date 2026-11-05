import { useEffect, useState } from 'react'

// Pages live in the URL hash (#/ and #/work/<id>) so GitHub Pages can serve
// every page from the one index.html.
function parse() {
  const match = window.location.hash.match(/^#\/work\/([\w-]+)/)
  return match ? { page: 'work', id: match[1] } : { page: 'home' }
}

export function navigate(path) {
  window.location.hash = path
}

// The current page, plus the page we just came from.
export function useRoute() {
  const [state, setState] = useState(() => ({ route: parse(), from: null }))
  useEffect(() => {
    const onChange = () => setState((s) => ({ route: parse(), from: s.route }))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return state
}
