# Photography Portfolio

Professional photography portfolio website built with Next.js, Tailwind CSS, and deployed to GitHub Pages.

## Quick Start

### Prerequisites

- Node.js 20+
- npm

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment file and fill in your values:
   ```bash
   cp .env.example .env.local
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Adding Images

1. Add your image files to the appropriate directory under `public/images/`:
   - `hero/` — Homepage hero slideshow (landscape, at least 1920px wide)
   - `wildlife/` — Wildlife & nature portfolio shots
   - `events/` — Event photography
   - `portraits/` — Portrait photography
   - `pets/` — Pet photography
   - `motorsport/` — Motorsport photography
   - `about/` — Photographer portrait for the About page
   - `services/` — Hero images for each service card
   - `instagram/` — Curated Instagram-style grid images (square)

2. For portfolio images, add an entry to `src/data/portfolio.ts`:
   ```typescript
   {
     src: "/images/wildlife/your-image.jpg",
     alt: "Descriptive text for accessibility",
     category: "wildlife",
     width: 1200,
     height: 800,
     title: "Optional title shown in lightbox",
   }
   ```

### Image Requirements

- Maximum 2000px on the longest edge
- Under 500KB file size
- Strip EXIF/GPS metadata before committing
- Use descriptive filenames (`leopard-tree-kruger.jpg`, not `IMG_4523.jpg`)

## Contact Form Setup (EmailJS)

1. Create a free account at [emailjs.com](https://www.emailjs.com/)
2. Create an email service (connect your email provider)
3. Create an email template with these variables: `from_name`, `from_email`, `phone`, `shoot_type`, `date`, `location`, `budget`, `message`, `how_found`
4. Copy your Service ID, Template ID, and Public Key
5. Add them to `.env.local`:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```
6. For production, add these as secrets in your GitHub repo settings (Settings > Secrets > Actions)

## Deployment

The site auto-deploys to GitHub Pages on every push to `main` via GitHub Actions.

### First-Time Setup

1. In your GitHub repo, go to **Settings > Pages**
2. Set Source to **GitHub Actions**
3. Add your EmailJS credentials as repository secrets:
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
   - `EMAILJS_PUBLIC_KEY`
4. Optionally add repository variables for site config:
   - `SITE_NAME`, `SITE_URL`, `INSTAGRAM_URL`, `CONTACT_EMAIL`, `LOCATION`, `TAGLINE`
5. Push to `main` — the workflow will build and deploy automatically

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build static export + optimize images |
| `npm run lint` | Run ESLint |

## Tech Stack

- [Next.js](https://nextjs.org/) — React framework with static export
- [Tailwind CSS v4](https://tailwindcss.com/) — Utility-first CSS
- [next-image-export-optimizer](https://github.com/Niels-IO/next-image-export-optimizer) — Build-time image optimization
- [EmailJS](https://www.emailjs.com/) — Client-side email delivery
- [GitHub Pages](https://pages.github.com/) — Free static hosting

## Documentation

- [CONTRIBUTING.md](./CONTRIBUTING.md) — Coding standards and conventions
- [CLAUDE.md](./CLAUDE.md) — Quick reference for project conventions
