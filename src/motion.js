// Whether the visitor asked their system for less motion.
export const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

// Smooth scrolling, unless the visitor prefers reduced motion.
export const scrollBehavior = () => (prefersReducedMotion() ? 'auto' : 'smooth')
