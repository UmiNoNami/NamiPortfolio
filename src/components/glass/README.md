# Glass portfolio screens

HomeWorld in the root layout keeps KeyboardHome mounted for /, /projects, /about,
/contact, and /playground. GlassOverlay owns native dialog semantics, animation,
focus containment/return, scroll lock, and a shared navigation bar. The route pages
provide metadata; their content lives in the corresponding panel components.
Navigation between panels replaces the current overlay history entry. Close,
Escape, and Back return home. Direct entries receive a home history entry after
Next's history integration initializes. The 3D scene pauses while covered.

ProjectsPanel uses src/data/projects.ts and actual artwork, filters, and case-study
links. Current source content includes KnockKnock, Gear4Music, and Pluto. Cairenn
Foy content is not present in this repository; it has not been invented. About uses
existing biography, illustration, tools, and resume. Playground reuses DumplingGame.

## Contact AI

ContactPanel connects to /api/assistant using the OpenAI Responses API:
https://developers.openai.com/api/reference/resources/responses/methods/create

Copy .env.local.example to .env.local and set OPENAI_API_KEY and OPENAI_CHAT_MODEL
to a Responses API model available to your OpenAI project, then restart Next.js.
Use the same private environment variables on your deployment. Never prefix the
key with NEXT_PUBLIC_. No API key was available during implementation, so live
model replies require this configuration. Without it, the UI shows an offline
state with direct email and project links rather than simulated AI replies.

The endpoint provides portfolio facts from existing project data and biography,
limits request size/history/output, applies a per-instance burst limit, times out
upstream requests, and sets store:false. It does not save conversations, send
emails, book calls, or claim availability/pricing. Visitors can open their own
email app with an enquiry made from their messages. UI disclosures identify the
assistant as AI and explain that OpenAI processes messages. For a public deployment
at scale, configure distributed/edge rate limiting; the in-memory limiter is local
to each server instance and depends on the deployment's trusted proxy headers.

## Visual controls

GlassOverlay.module.css: the final clear-glass section sets --glass-alpha (.27)
and --glass-blur-strength (16px), edge highlights and reflections.
GlassOverlay.tsx: GLASS_OPEN_SECONDS (.62), GLASS_CLOSE_SECONDS (.42).
ProjectsPanel.module.css: desktop three-window staggered grid; two columns on
tablet and one column on phones. WorldPanels.module.css: other panels and chat.

No new dependencies. TypeScript and ESLint checked with the installed project tools.
