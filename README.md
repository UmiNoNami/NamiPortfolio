# Nami — Portfolio

A black-and-white, retro desktop-OS styled portfolio built with Next.js (App Router), Tailwind
CSS, and Framer Motion — pixel type, bordered "windows," folder-icon project cards, ASCII-style
skill bars. On desktop (`lg` and up) the entire homepage is a single, non-scrolling collage —
intro text, tag stack, and floppy icon on the left; three overlapping windows (work, about,
skills) and a bottom icon dock on the right, laid out with absolute positioning inside an
aspect-ratio-locked container. On smaller screens it falls back to a normal stacked, scrolling
layout using the same components, since the dense collage isn't legible at phone width.
A custom black pixel-arrow cursor (SVG data URI) replaces the system cursor everywhere, swapping
to a small "click" glyph over links/buttons.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Before you publish, edit these

1. **Project content** — `src/data/projects.ts` has placeholder text (in `[brackets]`) for all
   three projects (Pluto, Gear4music.ie, KnokKnok). Swap in your real overview / problem /
   process / outcome copy.
2. **Project images** — each case study page (`src/app/work/[slug]/page.tsx`) has a dashed
   placeholder box for a cover image. Drop images in `/public` and swap the box for an
   `<Image />` or `<img />` tag.
3. **Contact links** — the homepage's "Contact Me" icon (in `src/components/IconDock.tsx`) opens
   a `mailto:` link. There's currently no LinkedIn or résumé link anywhere in the live site (the
   old `Connect.tsx` had both, but that file is now orphaned — see below). Add a LinkedIn icon/
   link to `IconDock.tsx` or `AboutWindow.tsx` if you want one, and a `resume.pdf` to `/public`
   if you want a résumé download.
4. **Skill levels** — `src/components/Skills.tsx` has a `level` (out of 10) per skill, adjust
   to taste.

## Leftover files from earlier designs

This started as a hand-drawn notebook theme, then went through an early pixel/OS pass with
separate scrolling sections, before landing on the current single-viewport pixel/OS homepage.
Files from those earlier versions are still in the project but nothing imports them anymore, so
they're inert — safe to delete if you want a tidier repo, safe to ignore if not:

- Hand-drawn era: `DoodlePad.tsx`, `FlipPage.tsx`, `BorderStrip.tsx`, `GrainOverlay.tsx`,
  `PaperPanel.tsx`, `HandButton.tsx`, `ProjectCard.tsx`, `DeskIllustration.tsx`,
  `RibbonBookmark.tsx`, `Doodles.tsx`, and the images `public/notebook.png`,
  `public/nami-illustration.png`, `public/page-texture.png`. The `react-pageflip` entry in
  `package.json` is also unused (only `FlipPage.tsx` used it).
- Early pixel/OS era (separate scrolling sections, superseded by the merged single-viewport
  `Hero.tsx`): `About.tsx`, `Work.tsx`, `Connect.tsx`. `Connect.tsx` is the only place the
  LinkedIn/résumé links still exist in the codebase — see "Contact links" above.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new) — zero config needed.

## Structure

- `src/app/page.tsx` — homepage, just renders `<Hero />`
- `src/app/work/[slug]/page.tsx` — individual project case study page (also renders `<Footer />`,
  which is no longer rendered globally so the homepage stays scroll-free on desktop)
- `src/components/Hero.tsx` — the entire homepage: desktop single-viewport collage + mobile
  stacked fallback, both built from the pieces below
- `src/components/WorkWindow.tsx` / `AboutWindow.tsx` / `Skills.tsx` — the three "windows"
- `src/components/TagStack.tsx` / `IconDock.tsx` / `DesktopIcon.tsx` — ribbon tags and the
  clickable desktop-icon row (icons navigate via real links/anchors, not just decoration)
- `src/components/PixelWindow.tsx` — the reusable bordered "window" chrome used everywhere
- `src/components/PixelIcons.tsx` — the icon set (folder, floppy disk, envelope, etc.)
- `src/components/Navbar.tsx` / `Footer.tsx` — nav bar (links to `#about-window` / `#work-window`
  on the homepage) and footer (case study pages only)
- `src/data/projects.ts` — your 3 projects, edit this to update case study content

### Display preferences and case-study navigation

The homepage and `/work/[slug]` pages share `SiteHeader`. The glass project cards link to the existing KnockKnock, Pluto, and Gear4Music case studies; return links lead to `/projects`. Display controls are also available inside each glass screen.

Display preferences offer light, soft light, dark, high contrast, text sizing, reduced motion, solid surfaces, a readable font, and underlined links. Preferences are stored locally under `nami-a11y-settings` and initialized before hydration. The settings use a native modal dialog with keyboard navigation, Escape dismissal, and focus restoration. Reduced motion also pauses the Gear4Music carousel.

### Contact assistant

The glass Contact screen supports portfolio questions, project recommendations, a cumulative project brief, and an editable email draft to naransuvd57@gmail.com. Sending is handled by the visitor's mail app; the site never sends an email automatically. Copy draft is available for webmail or clients with mailto length limits.

AI setup: copy .env.local.example to .env.local, set OPENAI_API_KEY privately on the server, and set OPENAI_CHAT_MODEL to a Responses model with Structured Outputs support. The example uses gpt-4o-mini. Restart the development server after changing environment variables. Configure the same server-only variables on your host for deployment. Never use a NEXT_PUBLIC_ prefix for credentials. Without configuration, the UI explicitly runs a local guided flow. GET /api/assistant reports configuration availability, not provider health.

AI replies use the Responses API with a strict JSON schema, store:false, factual project context, bounded messages, timeout/cancellation, refusal handling and per-instance rate limiting. A distributed or edge rate limit and provider spending limits are recommended before public traffic; the in-memory limiter is not shared between server instances. There are no tools, CRM writes, automatic bookings or email sends.

Conversation and draft state are held in sessionStorage for the tab session and cleared with Start over. AI mode sends the conversation to OpenAI; guided mode processes it locally. Do not claim zero provider retention from store:false.

Run node scripts/test-assistant.cjs for isolated contract, guided-flow and mocked endpoint tests. These tests make no external requests; live model quality and account access still require a configured API key. Official schema reference: https://developers.openai.com/api/docs/guides/structured-outputs
