export default function Sidebar({ profile, caseStudies, onFocus, focus }) {
  const initials = profile.name.split(' ').map((n) => n[0]).join('')
  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        {profile.photo
          ? <img className="avatar" src={profile.photo} alt={profile.name} />
          : <div className="avatar" aria-hidden="true">{initials}</div>}
        <h1>{profile.name}</h1>
        <p className="role">{profile.role}</p>
        <p className="intro">{profile.intro}</p>
        {profile.bio.map((p) => <p className="bio" key={p}>{p}</p>)}
        <p className="currently"><span className="dot-live" aria-hidden="true" />{profile.currently}</p>

        <nav className="side-nav" aria-label="Portfolio">
          <h2>Case studies</h2>
          <ol>
            {caseStudies.map((c, i) => (
              <li key={c.id}>
                <button className={focus === c.id ? 'active' : ''} onClick={() => onFocus(c.id)}>
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="nav-title">{c.title}</span>
                    <span className="nav-sub">{c.subtitle}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <h2>At the desk</h2>
          <ol>
            <li>
              <button className={focus === 'computer' ? 'active' : ''} onClick={() => onFocus('computer')}>
                <span className="num">→</span>
                <span>
                  <span className="nav-title">Resume & engineering projects</span>
                  <span className="nav-sub">On the computer</span>
                </span>
              </button>
            </li>
          </ol>
        </nav>

        <div className="side-links">
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <p className="made">Made with React and a lot of coffee.</p>
      </div>
    </aside>
  )
}
