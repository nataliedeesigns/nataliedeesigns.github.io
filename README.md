# nataliedeesigns.github.io

My UX/UI design portfolio: a cozy café you can explore. Case studies are pinned to a corkboard; scroll down to the desk and click the computer for my resume and engineering projects.

Built with React and Vite. Deployed to GitHub Pages on every push to `main`.

## Editing content

Everything you'd want to change lives in **`src/data.js`**: bio, links, case studies, engineering projects, and resume.

- **Case studies** are the notes on the corkboard; each opens its own page at `#/work/<id>`, and the sidebar lists its section headings. Put each one's files in `public/case-studies/<id>/` and point to them from `data.js` as `/case-studies/<id>/<file>`:
  - `cover`: the image on the note and at the top of the case study.
  - `prototype.video`: a screen recording of the prototype (MP4 works everywhere). `prototype.device` is `'phone'` or `'desktop'`, and `prototype.link` adds a "Try the interactive prototype" button (e.g. a Figma prototype link).
  - `sections`: each has a `heading` (also shown in the sidebar), a `body` (one paragraph or a list), and optional `media`: images `{ src, alt, caption }` or videos `{ video, poster, caption }`.
  - Anything left as `null` shows a labelled placeholder.
- **Photo:** add `public/photo.jpg` and set `photo: '/photo.jpg'`.
- **Resume PDF:** add `public/resume.pdf` (the "Download PDF" button links to it).
- **Colors and fonts:** the tokens at the top of `src/index.css`.
- **The illustrations:** `src/components/Corkboard.jsx` and `src/components/CafeScene.jsx`.

## Running locally

```sh
npm install
npm run dev
```
