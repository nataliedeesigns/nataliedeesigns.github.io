export const slug = (text) =>
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
