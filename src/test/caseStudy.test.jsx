import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import CaseStudy from '../components/CaseStudy'

const study = {
  id: 'example',
  title: 'Example',
  subtitle: 'Test',
  summary: 'Summary',
  meta: [],
  cover: { src: '/c.webp', width: 1600, height: 900 },
  prototype: { device: 'phone', video: null },
  sections: [
    {
      heading: 'Design',
      body: 'Body',
      media: [
        {
          src: '/a.webp',
          alt: 'Final screens',
          width: 1600,
          height: 1000,
          srcSet: '/a-800.webp 800w, /a.webp 1600w',
          sizes: '760px',
          sources: [{ type: 'image/avif', srcSet: '/a.avif' }],
        },
        { video: '/v.mp4', poster: '/v.webp', caption: 'Flow' },
      ],
    },
  ],
}

describe('case study media', () => {
  it('sizes images up front and lazy-loads the ones further down', () => {
    const { container } = render(<CaseStudy study={study} next={null} />)
    const cover = container.querySelector('img.cs-cover')
    expect(cover.getAttribute('width')).toBe('1600')
    expect(cover.getAttribute('height')).toBe('900')
    expect(cover.getAttribute('loading')).toBeNull()

    const image = container.querySelector('img[alt="Final screens"]')
    expect(image.getAttribute('loading')).toBe('lazy')
    expect(image.getAttribute('srcset')).toBe('/a-800.webp 800w, /a.webp 1600w')
    expect(image.closest('picture').querySelector('source').getAttribute('type')).toBe('image/avif')

    expect(container.querySelector('video[src="/v.mp4"]').getAttribute('preload')).toBe('none')
  })
})
