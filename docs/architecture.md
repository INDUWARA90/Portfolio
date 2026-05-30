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
  lib/              Firebase, Cloudinary, and utility clients
```

## Firestore Collections

- `siteSettings`: profile, socials, stats, hero, about, GitHub numbers
- `projects`: project case studies, links, images, featured status
- `certificates`: Cloudinary image URLs and verification links
- `messages`: contact form submissions
- `analytics`: visitor count, resume downloads, project views

## Cloudinary Folders

- `portfolio/profile`
- `portfolio/projects`
- `portfolio/certificates`

## Environment Variables

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=
```

The dashboard drag-and-drop uploader expects a Cloudinary unsigned upload preset. Uploaded images store the returned `secure_url` in the local content state.

## Deployment

1. Add real Firebase and Cloudinary environment variables.
2. Replace `public/resume.pdf` with your real resume.
3. Replace placeholder project/certificate images with Cloudinary URLs.
4. Run `npm run build`.
5. Deploy `dist` with Firebase Hosting.
