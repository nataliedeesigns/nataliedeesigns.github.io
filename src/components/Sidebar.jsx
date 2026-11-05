export default function Sidebar({ profile, caseStudies, onFocus, focus }) {
  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('')
  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        {profile.photo ? (
          <img className="avatar" src={profile.photo} alt={profile.name} />
        ) : (
          <div className="avatar" aria-hidden="true">
            {initials}
          </div>
        )}
        <h1>{profile.name}</h1>
        <p className="role">{profile.role}</p>
        <p className="intro">{profile.intro}</p>
        {profile.bio.map((p) => (
          <p className="bio" key={p}>
            {p}
          </p>
        ))}
        <p className="currently">
          <span className="dot-live" aria-hidden="true" />
          {profile.currently}
        </p>

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
              <button
                className={focus === 'computer' ? 'active' : ''}
                onClick={() => onFocus('computer')}
              >
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
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
        <p className="made">Made with React and a lot of coffee.</p>
      </div>
    </aside>
  )
}

// The sidebar while reading a case study: its headings, with the one in view highlighted.
export function CaseSidebar({ profile, study, outline, active, onJump }) {
  return (
    <aside className="sidebar case-sidebar">
      <div className="sidebar-inner">
        <a className="mini-profile" href="#/">
          <span className="nav-title">{profile.name}</span>
          <span className="nav-sub">{profile.role}</span>
        </a>
        <a className="back-link" href="#/">
          ← All case studies
        </a>

        <p className="case-eyebrow">{study.subtitle}</p>
        <p className="case-title">{study.title}</p>

        <nav className="side-nav toc" aria-label="On this page">
          <h2>On this page</h2>
          <ol>
            {outline.map((item, i) => (
              <li key={item.id}>
                <button
                  className={active === item.id ? 'active' : ''}
                  onClick={() => onJump(item.id)}
                  aria-current={active === item.id ? 'location' : undefined}
                >
                  <span className="num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="nav-title">{item.label}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="side-links">
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </aside>
  )
}
