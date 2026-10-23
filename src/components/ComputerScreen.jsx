import { useEffect, useState } from 'react'
import { profile, resume, engineeringProjects } from '../data'

const ICONS = {
  resume: (
    <svg viewBox="0 0 16 16">
      <path d="M3 1h7v1h1v1h1v1h1v11H3z" fill="#4b3832" />
      <path d="M4 2h6v3h2v9H4z" fill="#fffdf7" />
      <path d="M5 6h6v1H5zM5 8h6v1H5zM5 10h4v1H5z" fill="#b2774c" />
    </svg>
  ),
  projects: (
    <svg viewBox="0 0 16 16">
      <path d="M1 3h6v1h8v10H1z" fill="#4b3832" />
      <path d="M2 4h4v1h8v8H2z" fill="#ffd6a5" />
      <path d="M2 6h12v1H2z" fill="#e8bd84" />
    </svg>
  ),
  contact: (
    <svg viewBox="0 0 16 16">
      <path d="M1 3h14v10H1z" fill="#4b3832" />
      <path d="M2 4h12v8H2z" fill="#ffe8d6" />
      <path d="M3 5h2v1h1v1h4V6h1V5h2v1h-1v1h-1v1H6V7H5V6H3z" fill="#4b3832" />
    </svg>
  ),
}

const APPS = [
  { id: 'resume', label: 'Resume' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

function Resume() {
  return (
    <div className="resume">
      <div className="resume-head">
        <div>
          <h3>{profile.name}</h3>
          <p>{profile.role}</p>
        </div>
        <a className="pill-button" href={profile.resumePdf} target="_blank" rel="noreferrer">Download PDF</a>
      </div>
      <h4>Experience</h4>
      {resume.experience.map((job) => (
        <div className="resume-item" key={job.role + job.company}>
          <div className="resume-row">
            <strong>{job.role} · {job.company}</strong>
            <span>{job.dates}</span>
          </div>
          <ul>{job.points.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
      ))}
      <h4>Education</h4>
      {resume.education.map((e) => (
        <div className="resume-row" key={e.school}>
          <strong>{e.school} · {e.detail}</strong>
          <span>{e.dates}</span>
        </div>
      ))}
      <h4>Skills</h4>
      <ul className="tags">{resume.skills.map((s) => <li key={s}>{s}</li>)}</ul>
    </div>
  )
}

function Projects() {
  return (
    <div className="projects">
      <p className="window-intro">A few things I built as a front-end engineer.</p>
      {engineeringProjects.map((p) => (
        <a className="project" key={p.title} href={p.link} target="_blank" rel="noreferrer">
          <strong>{p.title}</strong>
          <span>{p.description}</span>
          <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        </a>
      ))}
    </div>
  )
}

function Contact() {
  return (
    <div className="contact">
      <p className="window-intro">Let's grab a coffee (virtually or otherwise).</p>
      <a className="pill-button" href={`mailto:${profile.email}`}>{profile.email}</a>
      <p><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> · <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a></p>
    </div>
  )
}

const VIEWS = { resume: Resume, projects: Projects, contact: Contact }

export default function ComputerScreen() {
  const [open, setOpen] = useState(null)
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 30000)
    return () => clearInterval(id)
  }, [])

  const app = APPS.find((a) => a.id === open)
  const View = open && VIEWS[open]

  return (
    <div className="desktop">
      <div className="menubar">
        <span>{profile.name.split(' ')[0]}OS</span>
        <span>{time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
      </div>
      <div className="icons">
        {APPS.map((a) => (
          <button key={a.id} className="icon" onClick={() => setOpen(a.id)}>
            <span className="icon-glyph" aria-hidden="true">{ICONS[a.id]}</span>
            <span>{a.label}</span>
          </button>
        ))}
      </div>
      {!open && <p className="desktop-hint">Open Resume to see my experience</p>}
      {View && (
        <div className="window" role="dialog" aria-label={app.label}>
          <div className="titlebar">
            <button className="dot" aria-label="Close window" onClick={() => setOpen(null)} />
            <span>{app.label}</span>
          </div>
          <div className="window-body"><View /></div>
        </div>
      )}
    </div>
  )
}
