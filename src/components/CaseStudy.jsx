export default function CaseStudy({ study }) {
  return (
    <article className="case-study" tabIndex={-1}>
      <p className="eyebrow">{study.subtitle}</p>
      <h2>{study.title}</h2>
      <p className="case-summary">{study.summary}</p>
      <dl className="case-meta">
        {study.meta.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      {study.sections.map((s) => (
        <section key={s.heading}>
          <h3>{s.heading}</h3>
          <p>{s.body}</p>
        </section>
      ))}
    </article>
  )
}
