# Induwara Vishwakantha Portfolio

A modern recruiter-focused portfolio built with React, Vite, Tailwind CSS, Motion, React Icons, and Firebase.

## Features

- Premium SaaS-style landing page
- Dark and light mode
- Searchable skills and projects
- Project case-study modal
- Certificates gallery
- Experience and education timelines
- GitHub profile panel
- Firebase-backed admin dashboard for content editing
- Portfolio chatbot
- Command palette with `Ctrl + K`
- PWA, SEO, robots, sitemap, and Firebase content storage

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
  lib/              Firebase and content persistence helpers
```

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Environment Variables

Copy `.env.example` to `.env` and add your Firebase values. Add the same variables in Vercel before deployment.

## Before Deployment

- Keep your resume PDF at `src/assets/CV.pdf`.
- Add real project and certificate image URLs.
- Add Firebase environment variables in Vercel.
- Add Firestore rules from the Firebase Console.
