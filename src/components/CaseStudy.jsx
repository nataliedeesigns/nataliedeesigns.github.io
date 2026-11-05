// The case study page that opens when a note on the corkboard is clicked.
// Its content comes from `caseStudies` in src/data.js.

const slug = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

// The headings shown in the sidebar while reading a case study.
export function caseOutline(study) {
  return [
    { id: 'overview', label: 'Overview' },
    ...study.sections.map((s) => ({ id: slug(s.heading), label: s.heading })),
  ]
}

function Placeholder({ label, hint, className = '' }) {
  return (
    <div className={`media-placeholder ${className}`}>
      <strong>{label}</strong>
      {hint && <span>{hint}</span>}
    </div>
  )
}

function Prototype({ study }) {
  const { device = 'phone', video, poster, link } = study.prototype ?? {}
  return (
    <figure className="prototype">
      <div className={`device device-${device}`}>
        {device === 'desktop' && (
          <div className="browser-bar" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        )}
        <div className="device-screen">
          {video ? (
            <video
              src={video}
              poster={poster ?? undefined}
              autoPlay
              muted
              loop
              playsInline
              controls
            />
          ) : (
            <Placeholder
              label="Prototype video"
              hint={`Add prototype.video in data.js (public/case-studies/${study.id}/)`}
            />
          )}
        </div>
      </div>
      {link && (
        <a className="pill-button" href={link} target="_blank" rel="noreferrer">
          Try the interactive prototype ↗
        </a>
      )}
    </figure>
  )
}

function Media({ item }) {
  let content
  if (item.video) {
    content = (
      <video src={item.video} poster={item.poster ?? undefined} controls muted playsInline loop />
    )
  } else if (item.src) {
    content = <img src={item.src} alt={item.alt ?? ''} loading="lazy" />
  } else {
    content = <Placeholder label={item.alt ?? 'Image'} hint="Add an image src in data.js" />
  }
  return (
    <figure className="cs-media">
      {content}
      {item.caption && <figcaption>{item.caption}</figcaption>}
    </figure>
  )
}

export default function CaseStudy({ study, next }) {
  const paragraphs = (body) => (Array.isArray(body) ? body : [body])
  return (
    <article className="case-study">
      <header className="cs-hero" id="overview">
        <div className="cs-intro">
          <p className="eyebrow">{study.subtitle}</p>
          <h1>{study.title}</h1>
          <p className="case-summary">{study.summary}</p>
          <dl className="case-meta">
            {study.meta.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Prototype study={study} />
      </header>

      {study.cover && <img className="cs-cover" src={study.cover} alt="" />}

      {study.sections.map((s) => (
        <section key={s.heading} className="cs-section" id={slug(s.heading)}>
          <h3>{s.heading}</h3>
          {paragraphs(s.body).map((p) => (
            <p key={p}>{p}</p>
          ))}
          {s.media?.length > 0 && (
            <div className="cs-media-grid">
              {s.media.map((m, i) => (
                <Media key={i} item={m} />
              ))}
            </div>
          )}
        </section>
      ))}

      <nav className="cs-footer" aria-label="More case studies">
        <a className="pill-button" href="#/">
          ← All case studies
        </a>
        {next && (
          <a className="next-study" href={`#/work/${next.id}`}>
            Next: {next.title} →
          </a>
        )}
      </nav>
    </article>
  )
}
