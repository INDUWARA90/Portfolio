# Portfolio Project Overview

This document explains the portfolio project structure, features, content model, dashboard controls, styling system, and setup requirements.

## Project Summary

This is a modern personal portfolio built with React, Vite, Tailwind CSS, React Icons, Firebase Authentication, and Firestore.

The public site displays portfolio content such as profile details, skills, projects, experience, education, certificates, feedback, GitHub stats, and contact information. Most content is editable through the admin dashboard and stored in Firestore.

## Main Technologies

- React 18 for UI components
- Vite for development and production build
- Tailwind CSS for utility-first styling
- React Icons for section and skill icons
- Firebase Authentication for dashboard login
- Firestore for portfolio content and contact messages
- Cloudinary upload helper for image uploads

## Available Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

## High-Level App Flow

The app starts in `src/main.jsx`, renders `src/App.jsx`, and loads portfolio content from Firestore.

If Firestore content exists, the app uses that saved content. If it does not exist, the app uses `src/data/siteContent.js` as the fallback content model.

The dashboard can update content. When saved, content is normalized in `src/lib/portfolioContent.js` and written to Firestore.

## Main Files

```text
src/App.jsx
```

Main app shell. It handles:

- Firebase auth state
- Loading portfolio content
- Saving dashboard updates
- Resetting content
- Rendering all public sections
- Opening dashboard login/dashboard

```text
src/data/siteContent.js
```

Default portfolio content model. This is the fallback when Firestore has no saved content.

```text
src/index.css
```

Global Tailwind setup and custom reusable component classes.

```text
src/lib/firebase.js
```

Firebase app, auth, and Firestore setup.

```text
src/lib/portfolioContent.js
```

Loads, normalizes, saves, and resets portfolio content.

```text
src/lib/messages.js
```

Stores, loads, and deletes contact form messages.

```text
src/lib/cloudinary.js
```

Uploads dashboard images to Cloudinary.

```text
src/lib/contactLinks.js
```

Normalizes email values and creates safer `mailto:` links.

## Public Sections

### Header

File:

```text
src/components/layout/Header.jsx
```

Displays the brand name, navigation links, GitHub/LinkedIn buttons, dashboard button, and hire/contact button.

Navigation includes:

- Home
- About
- Skills
- Projects
- Experience
- Feedback
- Contact

### Hero

File:

```text
src/components/sections/Hero.jsx
```

Displays:

- Availability badge
- Name
- Role
- Intro text
- Location chip
- Stack chip
- Resume download button
- Project/social links
- Hero stats
- Profile image

Dashboard-controlled data:

- `profile.name`
- `profile.role`
- `profile.intro`
- `profile.location`
- `profile.image`
- `profile.resumeUrl`
- `socials`
- `stats`

### Tech Marquee

File:

```text
src/components/sections/TechMarquee.jsx
```

Animated horizontal technology strip.

Source:

- `skills`

Required skills are automatically added visually if missing:

- Postman
- .NET
- Next.js
- Angular

`VS Code` is filtered out and not shown.

### About

File:

```text
src/components/sections/About.jsx
```

Displays:

- Objective
- Personal story
- Technical interests
- Services/help list

Dashboard-controlled data:

- `profile.objective`
- `profile.story`
- `profile.interests`
- `services`

### Skills

File:

```text
src/components/sections/Skills.jsx
```

Displays skill cards with icons and categories.

Source:

- `skills`

Supported icon names include:

- React
- JavaScript
- HTML
- CSS
- Tailwind CSS
- Firebase
- Node.js
- Node JS
- NodeJS
- Express
- Express.js
- Firestore
- MongoDB
- Mongodb
- MySQL
- Mysql
- SQL
- Git
- GitHub
- Github
- Postman
- .NET
- Next.js
- Next JS
- NextJS
- nextjs
- Angular

`VS Code` is filtered out and not shown.

### Projects

File:

```text
src/components/sections/Projects.jsx
```

Displays normal project cards in a grid.

Each card supports:

- Image
- Category
- Title
- Status
- Description
- Tech stack tags
- Live demo link
- Code link

Dashboard-controlled data:

- `projects`

Project fields:

```text
id
title
image
status
category
description
techstack
dlink
clink
```

### Experience

File:

```text
src/components/sections/Experience.jsx
```

Displays a centered timeline combining experience and education entries.

Experience fields:

```text
title
company
period
type
description
technologies
```

Education fields:

```text
institution
degree
period
coursework
```

### Certificates

File:

```text
src/components/sections/Certificates.jsx
```

Displays larger certificate cards with:

- Certificate image
- Issuer badge
- Year badge
- Title
- Category
- Preview button
- Optional verification link

Dashboard-controlled data:

- `certifications`

Certificate fields:

```text
id
title
issuer
year
image
verification
category
```

### GitHub Panel

File:

```text
src/components/sections/GithubPanel.jsx
```

Displays GitHub profile details and live public stats.

It fetches from:

```text
https://api.github.com/users/{username}
```

Displayed live data:

- Avatar
- Display name
- Username
- Bio
- Public repos
- Followers
- Following
- Profile link

Username source order:

1. `github.username`
2. GitHub URL from `socials`

Fallback values come from dashboard fields:

```text
github.publicRepos
github.followers
github.following
```

### Feedback

File:

```text
src/components/sections/Feedback.jsx
```

Displays:

- One featured feedback note
- Supporting feedback cards
- Visitor-facing empty state when no feedback has been added

Dashboard-controlled data:

- `feedback`

Feedback fields:

```text
quote
name
role
```

Legacy Firestore content saved under `testimonials` is normalized into `feedback` in `src/lib/portfolioContent.js` and removed from saved content on the next save.

### Contact CTA

File:

```text
src/components/sections/ContactCta.jsx
```

Displays a strong call-to-action before the contact form.

Uses:

- `profile.email`

The email button uses `getMailtoLink()` from `src/lib/contactLinks.js`.

### Contact

File:

```text
src/components/sections/Contact.jsx
```

Displays:

- Direct email link
- Phone link
- Location
- Contact form

Contact form saves messages to Firestore through `sendContactMessage()`.

Dashboard-controlled data:

- `profile.email`
- `profile.phone`
- `profile.location`

### Footer

File:

```text
src/components/layout/Footer.jsx
```

Displays profile name, role, and social links.

## Dashboard

Main file:

```text
src/components/dashboard/AdminDashboard.jsx
```

Login file:

```text
src/components/dashboard/DashboardLock.jsx
```

Image upload:

```text
src/components/dashboard/ImageUploader.jsx
```

The dashboard is protected with Firebase Authentication. Once signed in, it can manage public portfolio content.

Dashboard tabs:

- Profile
- Projects
- Skills
- Experience
- Certificates
- Feedback
- GitHub
- Socials
- Messages

## Dashboard-Controlled Content

### Profile

Controls:

- Name
- Role
- Email
- Phone
- Location
- Intro
- Story
- Objective
- Resume URL
- Profile image
- Technical interests
- Services
- Hero stats

### Projects

Controls:

- Add project
- Delete project
- Title
- Status
- Category
- Live demo link
- Code link
- Image upload
- Description
- Tech stack

### Skills

Controls:

- Add skill
- Delete skill
- Skill name
- Skill category

### Experience

Controls:

- Add experience
- Delete experience
- Title
- Company/project
- Period
- Type
- Description
- Technologies

### Education

Controls:

- Add education
- Delete education
- Institution
- Degree/course
- Period
- Coursework

### Certificates

Controls:

- Add certificate
- Delete certificate
- Title
- Issuer
- Year
- Category
- Verification link
- Certificate image upload

### Feedback

Controls:

- Add feedback
- Delete feedback
- Name
- Role/context
- Quote

### GitHub

Controls:

- GitHub username
- Public repos fallback
- Followers fallback
- Following fallback

### Socials

Controls:

- Add link
- Delete link
- Label
- URL

### Messages

Controls:

- View contact messages
- Delete message

## Content Model

Default content lives in:

```text
src/data/siteContent.js
```

Main object shape:

```js
{
  profile: {},
  socials: [],
  stats: [],
  skills: [],
  services: [],
  projects: [],
  experience: [],
  education: [],
  certifications: [],
  feedback: [],
  github: {}
}
```

## Firebase

Firebase is used for:

- Authentication
- Firestore content storage
- Firestore contact messages

Firestore document:

```text
portfolio/content
```

Contact messages are handled by `src/lib/messages.js`.

## Environment Variables

Required `.env` values:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Cloudinary values may also be needed if image uploads are enabled:

```env
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

Check `.env.example` for the current expected variables.

## Styling System

Main style file:

```text
src/index.css
```

Styling uses Tailwind utility classes plus custom component classes inside `@layer components`.

### Color Palette

The design is based on this palette:

```text
#EEEEEE  Light grey background
#6FCF97  Soft green accent
#2FA084  Teal accent
#1F6F5F  Deep teal text/base
```

### Main Custom Classes

```css
.page-shell
```

Global app background. Includes:

- Light grey base
- Subtle grid texture
- Green/teal angled overlays
- Fixed decorative overlay

```css
.glass-panel
```

Reusable glass-like modal/panel surface.

```css
.premium-card
```

Reusable card style with:

- White translucent surface
- Teal border
- Top gradient accent line
- Hover lift
- Soft shadow

```css
.btn-primary
```

Primary green/teal gradient button.

```css
.btn-secondary
```

Secondary white/outlined button.

```css
.section-band
```

Section wrapper style with:

- Subtle background band
- Vertical side guide lines

```css
.icon-button
```

Square icon button style for header/social actions.

```css
.profile-frame
```

Hero profile image frame with layered border and shadow.

```css
.hero-panel
```

Hero intro card surface.

```css
.soft-chip
```

Small pill/chip style for labels, stack items, and status markers.

```css
.empty-state
```

Visitor-facing empty content state for sections that do not yet have public data.

```css
.reveal-block
```

Scroll reveal animation wrapper used by `Reveal.jsx`.

```css
.tech-marquee-track
```

Horizontal animated tech stack row.

### Animation

The app uses CSS-based animation:

- Section reveal on scroll
- Tech marquee movement
- Card hover lift
- Project/certificate image zoom

Reduced-motion support exists through:

```css
@media (prefers-reduced-motion: reduce)
```

## Assets

Current local assets:

```text
src/assets/boy.png      Profile fallback image and favicon
src/assets/P01.png      Project/certificate fallback image
src/assets/CV.pdf       Resume fallback file
```

## Public Files

```text
public/robots.txt
public/sitemap.xml
public/manifest.webmanifest
```

These support basic SEO and browser metadata.

## Build Notes

Run before deployment:

```bash
npm run lint
npm run build
```

Current build may warn about large JS chunks because Firebase and React Icons increase bundle size. This is a warning, not a build failure.

## Deployment Notes

Before deploying:

1. Add Firebase environment variables.
2. Add Cloudinary environment variables if using dashboard image upload.
3. Confirm Firestore rules allow the admin workflow.
4. Add real portfolio data through the dashboard.
5. Run lint and build.
6. Deploy to Vercel, Netlify, or another static hosting provider.

## Useful Maintenance Notes

- Keep dashboard content fields aligned with `src/data/siteContent.js`.
- If adding a new public section, add dashboard controls if the content should be editable.
- If adding a new skill icon, update both `Skills.jsx` and `TechMarquee.jsx`.
- If changing the palette, update `src/index.css` first, then adjust hard-coded Tailwind color classes if needed.
- If email links fail, check the dashboard email field and `src/lib/contactLinks.js`.
- If GitHub stats fail, check `github.username` or the GitHub social link.
