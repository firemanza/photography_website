# Photography Portfolio — Project Conventions

## Tech Stack
- Next.js (App Router) with static export for GitHub Pages
- TypeScript (strict mode)
- Tailwind CSS v4 (CSS-first configuration in globals.css)
- next-image-export-optimizer for build-time image optimization
- @emailjs/browser for contact form delivery

## Project Structure
```
src/app/          — Pages (App Router)
src/components/   — React components organized by feature
src/config/       — Site configuration (single source of truth)
src/data/         — Content data files (portfolio, services, about)
src/lib/          — Utility functions
public/images/    — Static images organized by category
```

## Naming Conventions
- **Components**: PascalCase (`ServiceCard.tsx` → `export default function ServiceCard`)
- **Files**: kebab-case (`service-card.tsx`, `genre-grid.tsx`)
- **Directories**: kebab-case, grouped by feature
- **CSS classes**: Tailwind utilities only (no CSS modules)

## Component Patterns
- Server components by default
- Add `"use client"` only when component needs interactivity (state, effects, browser APIs)
- Import from `@/` path alias (maps to `./src/`)

## Security Rules
- **NEVER** hardcode personal info (email, phone, address, social URLs) in components
- All personal/configurable data lives in `src/config/site.ts` backed by env vars
- API keys go in `.env.local` (never committed)
- `.env.example` has placeholder values only
- GitHub Actions secrets for production builds

## Image Guidelines
- Store in `public/images/<category>/`
- Max 2000px on longest edge, under 500KB
- WebP preferred, JPEG acceptable
- Every image must have descriptive alt text
- Use `OptimizedImage` component wrapper, not `<img>` directly

## Content Changes
- Portfolio images: edit `src/data/portfolio.ts`
- Services: edit `src/data/services.ts`
- About page: edit `src/data/about.ts`
- Site config: edit `src/config/site.ts` or env vars

## Build & Deploy
- `npm run dev` — local development
- `npm run build` — static export + image optimization
- Push to `main` → GitHub Actions auto-deploys to GitHub Pages
