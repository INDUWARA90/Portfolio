# Portfolio Architecture

## Folder Structure

```text
src/
  components/
    dashboard/      Admin content manager
    layout/         Header and footer
    sections/       Public portfolio sections
    ui/             Shared presentation components such as Reveal and EmptyState
  data/             Initial content model
  lib/              Firebase and content persistence helpers
```

## Public Sections

- Header
- Hero
- Tech marquee
- About
- Skills
- Projects
- Experience
- Certificates
- GitHub panel
- Feedback
- Contact
- Contact CTA
- Footer

Sections that have no public content render visitor-facing empty states instead of dashboard/admin instructions.

## Content Model

Default content lives in `src/data/siteContent.js`.

Main editable fields:

- `profile`
- `socials`
- `stats`
- `skills`
- `services`
- `projects`
- `experience`
- `education`
- `certifications`
- `feedback`
- `github`

Older Firestore content saved with `testimonials` is normalized into `feedback` by `src/lib/portfolioContent.js`.

## Firestore Collections

- `portfolio/content`: the full editable portfolio content document.

## Environment Variables

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

The dashboard stores portfolio content in Firestore. Image fields store hosted image URLs or bundled fallback asset URLs.

## Deployment

1. Add real Firebase environment variables in Vercel.
2. Replace `src/assets/CV.pdf` with the real resume or update the resume URL from the dashboard.
3. Replace project/certificate fallback images with hosted image URLs when real content is ready.
4. Run `npm.cmd run lint` and `npm.cmd run build` on Windows PowerShell, or `npm run lint` and `npm run build` in shells where npm scripts are allowed.
5. Deploy the project to Vercel, Netlify, or another static host.
