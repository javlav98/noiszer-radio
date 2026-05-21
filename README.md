# Noiszer Radio

Independent web radio for underground shows, visual experiments, and leftfield sound.

Noiszer is a Next.js site for a Coachella Valley-based station with rotating shows, a weekly schedule, support links, and a visual-first listening experience.

## Features

- Full-screen show carousel on the home page
- Station pages for About, Schedule, Shows, and Support
- Responsive navigation with social links
- Fixed audio player scaffold for local or streaming playback
- Show artwork stored in `public/images`
- Tailwind-powered black-and-white editorial interface

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React and React Icons
- p5.js, available for visual experiments

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app opens at [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev
```

Runs the local development server and opens the site in your browser.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Serves the production build.

```bash
npm run lint
```

Runs ESLint.

## Project Structure

```text
app/
  about/        Station description and values
  schedule/     Weekly show schedule
  shows/        Show catalog and artwork
  support/      Donate, volunteer, and submission links
  api/          Server routes
components/
  carousel.tsx  Home page show carousel
  player.tsx    Audio player scaffold
  topbar.tsx    Global navigation/header
public/
  images/       Logos and show artwork
```

## Content Notes

- Update show cards in `app/shows/page.tsx`.
- Update the weekly schedule in `app/schedule/page.tsx`.
- Update carousel slides in `components/carousel.tsx`.
- Replace the audio source in `components/player.tsx` when a live stream or final audio asset is ready.
- Add new artwork to `public/images` and reference it with a `/images/...` path.

## Deployment

This project can be deployed to Vercel or any platform that supports Next.js.

For a production check before deploying, run:

```bash
npm run build
```

## Status

Noiszer is in active development. The current site is focused on the public-facing station experience and can be extended with a real stream source, CMS-backed show data, event listings, and donation checkout.
