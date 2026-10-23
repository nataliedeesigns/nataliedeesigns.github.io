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

// The four framed pictures above the desk. Order = left to right.
// `art` picks the pixel picture inside the frame: 'coffee', 'cat', 'strawberry' or 'cloud'.
export const caseStudies = [
  {
    id: 'case-1',
    title: 'Case Study One',
    subtitle: 'Mobile app · Product design',
    art: 'coffee',
    summary: 'One-sentence summary of the project and the outcome.',
    meta: [
      ['Role', 'Lead UX/UI Designer'],
      ['Timeline', '12 weeks'],
      ['Tools', 'Figma, FigJam, Maze'],
    ],
    sections: [
      { heading: 'The problem', body: 'Describe the problem and who it affected.' },
      { heading: 'Research', body: 'What you learned from users, data, and competitors.' },
      { heading: 'Design', body: 'How you explored and narrowed down solutions.' },
      { heading: 'Outcome', body: 'Results, metrics, and what you would do next.' },
    ],
  },
  {
    id: 'case-2',
    title: 'Case Study Two',
    subtitle: 'Web platform · UX research',
    art: 'cat',
    summary: 'One-sentence summary of the project and the outcome.',
    meta: [
      ['Role', 'UX Designer'],
      ['Timeline', '8 weeks'],
      ['Tools', 'Figma'],
    ],
    sections: [
      { heading: 'The problem', body: 'Coming soon.' },
      { heading: 'Outcome', body: 'Coming soon.' },
    ],
  },
  {
    id: 'case-3',
    title: 'Case Study Three',
    subtitle: 'Design system',
    art: 'strawberry',
    summary: 'One-sentence summary of the project and the outcome.',
    meta: [
      ['Role', 'UI Designer'],
      ['Timeline', '6 weeks'],
      ['Tools', 'Figma, Storybook'],
    ],
    sections: [
      { heading: 'The problem', body: 'Coming soon.' },
      { heading: 'Outcome', body: 'Coming soon.' },
    ],
  },
  {
    id: 'case-4',
    title: 'Case Study Four',
    subtitle: 'Responsive website · Branding',
    art: 'cloud',
    summary: 'One-sentence summary of the project and the outcome.',
    meta: [
      ['Role', 'UX/UI Designer'],
      ['Timeline', '4 weeks'],
      ['Tools', 'Figma, Illustrator'],
    ],
    sections: [
      { heading: 'The problem', body: 'Coming soon.' },
      { heading: 'Outcome', body: 'Coming soon.' },
    ],
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
  skills: ['User research', 'Wireframing', 'Prototyping', 'Design systems', 'Figma', 'React', 'CSS'],
}
