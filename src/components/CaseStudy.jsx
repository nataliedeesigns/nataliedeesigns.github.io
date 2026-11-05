// The case study page that opens when a note on the corkboard is clicked.
// Its content comes from `caseStudies` in src/data.js.

import { slug } from './caseOutline'

function Placeholder({ label, hint, className = '' }) {
  return (
    <div className={`media-placeholder ${className}`}>
      <strong>{label}</strong>
      {hint && <span>{hint}</span>}
    </div>
  )
}

// An image from data.js: either a path, or { src, width, height, srcSet, sizes, sources }
// where `sources` lists modern formats, e.g. [{ type: 'image/avif', srcSet: '...' }].
// Giving width and height reserves the space before it loads, so the page doesn't jump.
function Image({ image, alt = '', className, lazy = true }) {
  const { src, width, height, srcSet, sizes, sources } =
    typeof image === 'string' ? { src: image } : image
  const img = (
    <img
      className={className}
      src={src}
      width={width}
      height={height}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={lazy ? 'lazy' : undefined}
      decoding="async"
    />
  )
  if (!sources?.length) return img
  return (
    <picture>
      {sources.map((source) => (
        <source key={source.type} type={source.type} srcSet={source.srcSet} sizes={sizes} />
      ))}
      {img}
    </picture>
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
      <video
        src={item.video}
        poster={item.poster ?? undefined}
        width={item.width}
        height={item.height}
        preload="none"
        controls
        muted
        playsInline
        loop
      />
    )
  } else if (item.src) {
    content = <Image image={item} alt={item.alt} />
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

      {study.cover && <Image image={study.cover} className="cs-cover" lazy={false} />}

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
