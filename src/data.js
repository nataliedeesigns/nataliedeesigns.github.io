// All of the site's content lives in this file.
// Edit the text here; the layout and café scene pick it up automatically.

export const profile = {
  name: 'Natalie Yip',
  role: 'UX/UI Designer',
  // Put a photo at public/photo.jpg and set this to '/photo.jpg'.
  photo: null,
  intro:
    "Hi, I'm Natalie. I design warm, thoughtful products, and I started out as a front-end engineer, so I care how designs actually ship.",
  bio: [
    'Placeholder bio. Write a few sentences about how you approach design, the kinds of problems you love, and what you are looking for next.',
    'Outside of work you can find me ... (coffee shops, presumably).',
  ],
  currently: 'Open to UX/UI design roles',
  email: 'hello@example.com',
  linkedin: 'https://www.linkedin.com/',
  github: 'https://github.com/nataliedeesigns',
  // Put your resume at public/resume.pdf to enable the download link.
  resumePdf: '/resume.pdf',
}

// Case studies, shown as notes pinned to the corkboard. Order = reading order.
//
// Put each case study's files in public/case-studies/<id>/ and refer to them as
// '/case-studies/<id>/<file>'. Anything left as null shows a labelled placeholder,
// so you can see where it goes.
//
//   cover      Image on the note (and at the top of the case study).
//              Without one, the note shows the pixel `art`: 'coffee', 'cat', 'strawberry' or 'cloud'.
//   prototype  A screen recording of the prototype in use.
//              device: 'phone' or 'desktop' picks the frame around the video.
//              link: a live prototype (e.g. a Figma prototype share link), shown as a button.
//   sections   The story. `body` is a paragraph or a list of paragraphs.
//              `media` is a list of images or videos: { src, alt, caption } or { video, poster, caption }.
const placeholderSections = [
  {
    heading: 'The problem',
    body: 'Describe the problem, who it affected, and why it mattered.',
  },
  {
    heading: 'Research',
    body: 'What you learned from users, data, and competitors.',
    media: [{ src: null, alt: 'Research synthesis', caption: 'Affinity map or key insights' }],
  },
  {
    heading: 'Design',
    body: [
      'How you explored ideas and narrowed down to a solution.',
      'Call out the decisions you are proudest of.',
    ],
    media: [
      { src: null, alt: 'Wireframes', caption: 'Early wireframes' },
      { src: null, alt: 'Final screens', caption: 'Final designs' },
    ],
  },
  {
    heading: 'Outcome',
    body: 'Results, metrics, and what you would do next.',
  },
]

export const caseStudies = [
  {
    id: 'case-1',
    title: 'Case Study One',
    subtitle: 'Mobile app · Product design',
    art: 'coffee',
    cover: null,
    summary: 'One-sentence summary of the project and the outcome.',
    meta: [
      ['Role', 'Lead UX/UI Designer'],
      ['Timeline', '12 weeks'],
      ['Tools', 'Figma, FigJam, Maze'],
    ],
    prototype: { device: 'phone', video: null, poster: null, link: null },
    sections: placeholderSections,
  },
  {
    id: 'case-2',
    title: 'Case Study Two',
    subtitle: 'Web platform · UX research',
    art: 'cat',
    cover: null,
    summary: 'One-sentence summary of the project and the outcome.',
    meta: [
      ['Role', 'UX Designer'],
      ['Timeline', '8 weeks'],
      ['Tools', 'Figma'],
    ],
    prototype: { device: 'desktop', video: null, poster: null, link: null },
    sections: placeholderSections,
  },
  {
    id: 'case-3',
    title: 'Case Study Three',
    subtitle: 'Design system',
    art: 'strawberry',
    cover: null,
    summary: 'One-sentence summary of the project and the outcome.',
    meta: [
      ['Role', 'UI Designer'],
      ['Timeline', '6 weeks'],
      ['Tools', 'Figma, Storybook'],
    ],
    prototype: { device: 'desktop', video: null, poster: null, link: null },
    sections: placeholderSections,
  },
  {
    id: 'case-4',
    title: 'Case Study Four',
    subtitle: 'Responsive website · Branding',
    art: 'cloud',
    cover: null,
    summary: 'One-sentence summary of the project and the outcome.',
    meta: [
      ['Role', 'UX/UI Designer'],
      ['Timeline', '4 weeks'],
      ['Tools', 'Figma, Illustrator'],
    ],
    prototype: { device: 'phone', video: null, poster: null, link: null },
    sections: placeholderSections,
  },
]

// Front-end projects, shown in a folder on the computer's desktop.
export const engineeringProjects = [
  {
    title: 'Shortly',
    description: 'A URL-shortening landing page built from a design mock.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://github.com/nataliedeesigns/shortly',
  },
  {
    title: 'In-Checkout Widget',
    description: 'An embeddable checkout widget.',
    tags: ['JavaScript'],
    link: 'https://github.com/nataliedeesigns/in-checkout-widget',
  },
  {
    title: 'Fridge Raider',
    description: 'Find recipes from what is already in your fridge.',
    tags: ['React'],
    link: 'https://github.com/nataliedeesigns/Fridge_Raider',
  },
]

// Shown when the visitor opens Resume on the computer.
export const resume = {
  experience: [
    {
      role: 'UX/UI Designer',
      company: 'Company Name',
      dates: '2024 – Present',
      points: ['What you did and the impact it had.', 'Another accomplishment.'],
    },
    {
      role: 'Front-End Engineer',
      company: 'Company Name',
      dates: '2019 – 2024',
      points: ['What you built and the impact it had.'],
    },
  ],
  education: [{ school: 'School Name', detail: 'Degree or certificate', dates: 'Year' }],
  skills: [
    'User research',
    'Wireframing',
    'Prototyping',
    'Design systems',
    'Figma',
    'React',
    'CSS',
  ],
}
