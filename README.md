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
- **The illustrations:** `src/components/Corkboard.jsx` and `src/components/CafeScene.jsx`, with shared colors and pixel art in `src/components/pixel.js`.

## Running locally

Requires Node 22 (the version CI and the deploy use).

```sh
npm install
npm run dev       # dev server with hot reload at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## Linting and formatting

ESLint checks the code and Prettier formats it. One command runs both checks:

```sh
npm run check     # ESLint (warnings count as failures) + Prettier check
npm run fix       # apply ESLint auto-fixes and Prettier formatting
```

`npm run lint`, `npm run format` and `npm run format:check` run each tool on its own.

## Testing

Smoke tests (Vitest with jsdom and Testing Library) live in `src/test/`:

```sh
npm test            # run once
npm run test:watch  # re-run on save
```

They render every page (home, each case study, and an unknown link) and fail on any console error, check that each case study note and sidebar link opens its page, and check that every file a case study points to exists in `public/`.

## Continuous integration

`.github/workflows/ci.yml` runs on every pull request: install, lint, format check, build, and tests. There is no type-check step because the project is plain JavaScript.

## Deploying

Merging to `main` deploys the site. `.github/workflows/deploy.yml` builds it and publishes `dist/` to GitHub Pages at https://nataliedeesigns.github.io. You can also re-run it by hand from the repository's **Actions** tab ("Deploy to GitHub Pages" → **Run workflow**).

This relies on the repository's **Settings → Pages → Source** being set to **GitHub Actions**. Pages are linked with `#/` URLs (for example `#/work/case-1`), so every page is served by the one `index.html` and no extra Pages setup is needed.
