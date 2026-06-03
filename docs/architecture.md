# Portfolio Architecture

## Folder Structure

```text
src/
  components/
    dashboard/      Admin content manager
    interactive/    Chatbot, command palette, scroll tools
    layout/         Header and footer
    sections/       Public portfolio sections
    ui/             Shared presentation components
  data/             Initial content model
  hooks/            Reusable React hooks
  lib/              Firebase and content persistence helpers
```

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

The dashboard stores portfolio content in Firestore. Image fields store hosted image URLs.

## Deployment

1. Add real Firebase environment variables in Vercel.
2. Replace `public/resume.pdf` with your real resume.
3. Replace placeholder project/certificate images with hosted image URLs.
4. Run `npm run build`.
5. Deploy the project to Vercel.
