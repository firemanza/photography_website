# Contributing & Coding Standards

This document defines the coding standards, conventions, and workflows for the photography portfolio website.

---

## Table of Contents

- [Project Structure](#project-structure)
- [TypeScript Conventions](#typescript-conventions)
- [Component Patterns](#component-patterns)
- [Tailwind CSS Conventions](#tailwind-css-conventions)
- [Image Workflow](#image-workflow)
- [Data Files Pattern](#data-files-pattern)
- [Security Standards](#security-standards)
- [Git Workflow](#git-workflow)
- [Accessibility Standards](#accessibility-standards)
- [Performance Budget](#performance-budget)
- [Testing Approach](#testing-approach)

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (fonts, metadata, header/footer)
│   ├── page.tsx            # Home page
│   ├── globals.css         # Tailwind v4 theme + global styles
│   ├── not-found.tsx       # Custom 404 page
│   ├── portfolio/page.tsx
│   ├── about/page.tsx
│   ├── services/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── layout/             # Header, footer
│   ├── ui/                 # Reusable UI primitives (button, container, etc.)
│   ├── home/               # Home page sections
│   ├── portfolio/          # Portfolio page components
│   ├── services/           # Services page components
│   ├── contact/            # Contact form
│   └── seo/                # JSON-LD structured data
├── config/
│   └── site.ts             # Central site configuration
├── data/
│   ├── portfolio.ts        # Portfolio image entries
│   ├── services.ts         # Service definitions
│   └── about.ts            # About page content
└── lib/
    └── utils.ts            # Helper functions
```

---

## TypeScript Conventions

- **Strict mode** is enabled in `tsconfig.json`
- Use explicit types for component props via `interface`
- Never use `any` — use `unknown` if the type is truly unknown
- Export types alongside their related data/components
- Use `as const` for constant objects to get literal types

```typescript
// Good
interface ServiceCardProps {
  service: Service;
  reversed?: boolean;
}

// Bad
function ServiceCard(props: any) { ... }
```

---

## Component Patterns

### Server vs Client Components

- **Default to server components** (no directive needed)
- Add `"use client"` only when the component uses:
  - React hooks (`useState`, `useEffect`, etc.)
  - Browser APIs (`window`, `document`, `IntersectionObserver`)
  - Event handlers (`onClick`, `onChange`, etc.)
  - Third-party client libraries (`@emailjs/browser`)

### Naming

| Item | Convention | Example |
|------|-----------|---------|
| Component function | PascalCase | `export default function ServiceCard()` |
| Component file | kebab-case | `service-card.tsx` |
| Directory | kebab-case | `components/ui/` |
| Props interface | PascalCase + Props | `ServiceCardProps` |

### File Organization

- One component per file
- Co-locate related components in feature directories
- Keep UI primitives in `components/ui/`

---

## Tailwind CSS Conventions

- **Utility-first**: Use Tailwind classes directly in JSX
- **No CSS modules**: All styling through Tailwind utilities
- **No inline styles** except for dynamic values (background images, animation delays)
- **Theme customization**: Extend in `globals.css` via `@theme inline { }` (Tailwind v4)
- **Use the `cn()` helper** for conditional classes:

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  variant === "primary" && "primary-classes"
)} />
```

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `background` | `#0a0a0a` | Page background |
| `surface` | `#141414` | Cards, elevated surfaces |
| `surface-light` | `#1e1e1e` | Borders, subtle dividers |
| `accent` | `#c8a96e` | Gold accent, CTAs, highlights |
| `accent-light` | `#e0c992` | Hover state for accent |
| `muted` | `#8a8a8a` | Secondary text |
| `foreground` | `#f5f5f5` | Primary text |

### Typography

- **Headings**: `font-heading` (DM Serif Display)
- **Body**: `font-body` (DM Sans) — set as default on `<body>`

---

## Image Workflow

### Before Committing Images

1. Edit in Lightroom (or similar) with a consistent style
2. Export at **max 2000px on the longest edge**
3. Keep file size **under 500KB** (JPEG quality 80-85)
4. Use descriptive filenames: `leopard-tree-kruger.jpg` not `IMG_4523.jpg`

### In the Repository

- Store images in `public/images/<category>/`
- Categories: `hero/`, `wildlife/`, `events/`, `portraits/`, `pets/`, `motorsport/`, `about/`, `services/`, `instagram/`
- The build process auto-generates WebP variants and responsive sizes

### In Code

- Always use the `OptimizedImage` component (wraps `next-image-export-optimizer`)
- Every image **must** have descriptive `alt` text for accessibility
- Set `priority` only for above-the-fold images (hero section)
- Provide actual `width` and `height` to prevent layout shift

### Adding Portfolio Images

1. Add the image file to the appropriate `public/images/<category>/` directory
2. Add an entry to `src/data/portfolio.ts` with `src`, `alt`, `category`, `width`, `height`
3. Build locally to verify the image appears correctly

---

## Data Files Pattern

All content that might change is stored in data files, not hardcoded in components:

| File | Contains |
|------|----------|
| `src/config/site.ts` | Site name, URLs, social links, contact info, categories |
| `src/data/portfolio.ts` | Portfolio image entries (path, alt, category, dimensions) |
| `src/data/services.ts` | Service definitions (title, description, deliverables) |
| `src/data/about.ts` | About page text, gear list, SPCA section |

This separation ensures:
- Content changes don't require touching component logic
- No personal information is scattered across component files
- Easy to update content without deep React knowledge

---

## Security Standards

### Secrets Management

- **`.env.local`**: All API keys and personal information. **Never committed.**
- **`.env.example`**: Placeholder values showing what's needed. **Committed.**
- **GitHub Actions Secrets**: Production values for EmailJS keys
- **GitHub Actions Variables**: Non-secret config (site name, URLs, etc.)

### What Must Never Be in Source Code

- Email addresses
- Phone numbers
- Physical addresses
- API keys or tokens
- Passwords or credentials
- Any personally identifiable information (PII)

All of the above must come from environment variables via `src/config/site.ts`.

### Pre-Commit Checklist

Before committing, verify:
- [ ] No `.env.local` or other env files staged
- [ ] No personal email/phone/address hardcoded in any file
- [ ] `.gitignore` is correctly excluding sensitive files
- [ ] New images don't contain EXIF GPS data (strip metadata in Lightroom export)

### EmailJS Public Key

The EmailJS public key is exposed in client-side JavaScript by design. Mitigations:
- Restrict the key to your domain in the EmailJS dashboard
- Honeypot field catches automated spam
- EmailJS rate limiting provides additional protection

---

## Git Workflow

### Branch Strategy

- `main` — production branch, auto-deploys to GitHub Pages
- Feature branches: `feature/description` (e.g., `feature/add-motorsport-images`)
- Bug fixes: `fix/description` (e.g., `fix/mobile-menu-scroll`)

### Commit Messages

Use conventional commit format:

```
type: short description

Optional longer description explaining why this change was made.
```

Types: `feat`, `fix`, `style`, `refactor`, `docs`, `chore`, `perf`

Examples:
- `feat: add motorsport portfolio category`
- `fix: prevent body scroll when lightbox is open`
- `docs: update image workflow in contributing guide`
- `perf: optimize hero images for mobile`

### Pull Requests

- Keep PRs focused on a single change
- Include screenshots for visual changes
- Verify the build passes locally before pushing

---

## Accessibility Standards

### Requirements

- **Alt text**: Every `<img>` must have descriptive alt text. The `OptimizedImage` component enforces this via a required `alt` prop.
- **Keyboard navigation**: All interactive elements reachable via Tab. Enter/Space to activate.
- **Focus management**: Lightbox and mobile menu trap focus when open.
- **Skip-to-content**: Present as the first focusable element in the layout.
- **ARIA labels**: On icon-only buttons (hamburger, lightbox controls, social links).
- **Color contrast**: WCAG AA minimum (4.5:1 for normal text). Our accent gold `#c8a96e` on background `#0a0a0a` achieves ~7.2:1.
- **Semantic HTML**: Use appropriate heading hierarchy (h1 → h2 → h3), landmark elements (`<nav>`, `<main>`, `<footer>`).

### Testing

- Tab through every page verifying focus order makes sense
- Use a screen reader (VoiceOver/NVDA) on key flows
- Run Lighthouse accessibility audit

---

## Performance Budget

| Metric | Target |
|--------|--------|
| Lighthouse Performance (mobile) | 90+ |
| First Contentful Paint | < 2s on 4G |
| Largest Contentful Paint | < 3s on 4G |
| Cumulative Layout Shift | < 0.1 |
| Total page weight (initial load) | < 500KB |
| Individual image size | < 500KB |

### How We Achieve This

- **Images**: WebP format, responsive srcsets, blur placeholders (via `next-image-export-optimizer`)
- **Fonts**: Self-hosted via `next/font/google` with `display: swap` and preloading
- **CSS**: Tailwind purges unused styles at build time
- **JavaScript**: Server components by default; client JS only for interactive elements
- **Lazy loading**: All below-fold images use `loading="lazy"`

---

## Testing Approach

This project uses manual testing (no automated test suite for a portfolio site):

### Local Development

1. `npm run dev` — verify all pages render, navigation works, animations fire
2. `npm run build` — verify static export succeeds without errors
3. Serve `out/` directory locally to test production build

### Cross-Browser Testing

Before any release, test on:
- iPhone Safari (primary mobile audience)
- Android Chrome
- Desktop Chrome
- Desktop Firefox

### Lighthouse Audits

Run Lighthouse on every page in incognito mode:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

### Contact Form Testing

1. Set up EmailJS account and configure template
2. Submit test enquiry via the form
3. Verify email received with all form fields populated
4. Verify honeypot works (fill hidden field, confirm no email sent)
5. Verify error state displays when EmailJS keys are missing
