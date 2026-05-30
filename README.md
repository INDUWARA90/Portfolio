# Induwara Vishwakantha Portfolio

A modern recruiter-focused portfolio built with React, Vite, Tailwind CSS, Motion, React Icons, Firebase scaffolding, and Cloudinary scaffolding.

## Features

- Premium SaaS-style landing page
- Dark and light mode
- Searchable skills and projects
- Project case-study modal
- Certificates gallery
- Experience and education timelines
- GitHub profile panel
- Local admin dashboard for content editing
- Portfolio chatbot
- Command palette with `Ctrl + K`
- PWA, SEO, robots, sitemap, and Firestore rules scaffolding

## Project Structure

```text
src/
  components/
    dashboard/      Admin dashboard
    interactive/    Chatbot, command palette, scroll tools
    layout/         Header and footer
    sections/       Main portfolio sections
    ui/             Reusable UI pieces
  data/             Portfolio content model
  hooks/            Custom React hooks
  lib/              Firebase, Cloudinary, utilities
```

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Environment Variables

Copy `.env.example` to `.env` and add your Firebase and Cloudinary values. The real `.env` file is ignored by Git.

## Before Deployment

- Replace `public/resume.pdf` with your real resume.
- Add real project and certificate images.
- Add Firebase environment variables if you connect the dashboard to Firestore.
- Add Cloudinary environment variables if you enable dashboard image uploads. Use an unsigned upload preset for browser uploads.
