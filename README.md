# nataliedeesigns.github.io

My UX/UI design portfolio: a cozy café you can explore. Click a framed picture to read a case study, or the computer for my resume and engineering projects.

Built with React and Vite. Deployed to GitHub Pages on every push to `main`.

## Editing content

Everything you'd want to change lives in **`src/data.js`**: bio, links, the four case studies, engineering projects, and resume.

- **Photo:** add `public/photo.jpg` and set `photo: '/photo.jpg'` in `data.js`.
- **Resume PDF:** add `public/resume.pdf` (the "Download PDF" button links to it).
- **Colors and fonts:** the tokens at the top of `src/index.css`.
- **The café illustration:** `src/components/CafeScene.jsx`.

## Running locally

```sh
npm install
npm run dev
```
