import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Scene from './components/Scene'
import { profile, caseStudies } from './data'

export default function App() {
  const [focus, setFocus] = useState(null)
  return (
    <div className="layout">
      <Sidebar profile={profile} caseStudies={caseStudies} focus={focus} onFocus={setFocus} />
      <main className="stage">
        <Scene caseStudies={caseStudies} focus={focus} onFocus={setFocus} />
      </main>
    </div>
  )
}
