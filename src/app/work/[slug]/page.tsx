import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/data/projects";
import RevealOnScroll from "@/components/RevealOnScroll";
import SoundLink from "@/components/SoundLink";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BrowserFrame from "@/components/mockups/BrowserFrame";
import PhoneFrame from "@/components/mockups/PhoneFrame";
import MockupPlaceholder from "@/components/mockups/MockupPlaceholder";
import PlutoCaseStudy from "@/components/pluto/PlutoCaseStudy";
import Gear4MusicShowcase from "@/components/gear4music/Gear4MusicShowcase";
import Gear4MusicHeroPreview from "@/components/gear4music/HeroPreview";
import KnockKnockCaseStudy from "@/components/knockknock/KnockKnockCaseStudy";
import { ArrowRightIcon, GearIcon, LockIcon, OrbitIcon } from "@/components/ModernIcons";
import { getProjectDisplay } from "@/lib/projectDisplay";
import ProjectIconChip from "@/components/ProjectIconChip";
import ProjectPageIntro from "@/components/ProjectPageIntro";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  const title = `${project.title} — ${project.category}`;
  return {
    title,
    description: project.tagline,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title, description: project.tagline, url: `/work/${project.slug}` },
    twitter: { title, description: project.tagline },
  };
}

// Same icon/accent-color pairing as the Works widget on the homepage, so a
// project carries its identity through from the list into its own page.
const DISPLAY: Record<string, { Icon: typeof OrbitIcon; bg: string }> = {
  pluto: { Icon: OrbitIcon, bg: "bg-brand-orange" },
  gear4music: { Icon: GearIcon, bg: "bg-navy-soft" },
  knockknock: { Icon: LockIcon, bg: "bg-brand-yellow" },
};

function MetaColumn({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-navy/[0.07] bg-white/70 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-navy/[0.12] hover:shadow-sm dark:border-cream/10 dark:bg-white/[0.04] dark:hover:border-cream/20">
      <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-navy/40 dark:text-cream/40">
        {label}
      </p>
      <p className="mt-1 font-sans text-[15px] font-semibold text-navy dark:text-cream">{value}</p>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: string }) {
  return (
    <div className="group rounded-[28px] border border-navy/[0.06] bg-white p-6 shadow-[0_1px_2px_rgba(17,17,17,0.04),0_16px_36px_-20px_rgba(17,17,17,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(17,17,17,0.05),0_24px_48px_-20px_rgba(17,17,17,0.2)] dark:border-cream/[0.06] dark:bg-midnight-card sm:p-8">
      <span className="mb-3 block h-1 w-8 rounded-full bg-navy/15 transition-all duration-300 group-hover:w-12 group-hover:bg-navy/30 dark:bg-cream/15 dark:group-hover:bg-cream/30" />
      <h2 className="font-sans text-lg font-semibold text-navy dark:text-cream">{title}</h2>
      <p className="mt-3 font-sans text-[15px] leading-relaxed text-navy/70 dark:text-cream/70">{children}</p>
    </div>
  );
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const meta = DISPLAY[project.slug] ?? { Icon: OrbitIcon, bg: "bg-navy-soft" };
  const Icon = meta.Icon;
  const more = projects.filter((p) => p.slug !== project.slug).slice(0, 2);

  return (
    <main
      id="main-content"
      className="min-h-screen bg-canvas px-3 py-3 transition-colors duration-300 dark:bg-midnight sm:px-6 sm:py-6"
    >
      {project.introWord && <ProjectPageIntro word={project.introWord} subtitle={project.introSubtitle ?? ""} />}
      <div className="mx-auto max-w-[1600px] rounded-[32px] bg-cream px-6 py-6 transition-colors duration-300 dark:bg-midnight-card sm:px-10 sm:py-8 lg:px-14">
        <Navbar />

        <div className="mx-auto max-w-4xl py-10 sm:py-14">
          {/* ---------------- HEADER ---------------- */}
          <RevealOnScroll>
            <SoundLink
              href="/#work"
              className="group inline-flex items-center gap-1.5 font-sans text-sm font-medium text-navy/55 transition-colors duration-300 hover:text-navy dark:text-cream/55 dark:hover:text-cream"
            >
              <ArrowRightIcon className="h-3.5 w-3.5 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to work
            </SoundLink>

            <div className="relative mt-6">
              <h1 className="max-w-3xl font-serif text-6xl italic leading-[0.95] text-navy sm:text-7xl dark:text-cream">
                {project.title}
              </h1>

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute -right-2 top-0 hidden h-24 w-24 shrink-0 items-center justify-center rounded-full bg-brand-orange text-center font-sans text-xs font-semibold text-white shadow-md transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg sm:flex"
                >
                  Live site ↗
                </a>
              )}
            </div>

            <p className="mt-4 max-w-xl font-sans text-base leading-relaxed text-navy/70 dark:text-cream/70">
              {project.tagline}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-navy/[0.06] px-3 py-1 font-sans text-xs font-medium text-navy/70 transition-colors duration-300 hover:bg-navy/10 dark:bg-cream/10 dark:text-cream/70 dark:hover:bg-cream/[0.15]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
              <MetaColumn label="Role" value={project.role} />
              <MetaColumn label="Category" value={project.category} />
              <MetaColumn label="Year" value={project.year} />
            </div>
          </RevealOnScroll>

          {/* ---------------- MAIN PREVIEW ---------------- */}
          {project.slug === "pluto" ? (
            // Real cover shot — a plain rounded frame (no laptop/phone
            // chrome), sized to the image's own aspect ratio.
            <RevealOnScroll delay={0.1} className="mt-12">
              <div className="group relative mx-auto aspect-[6145/4573] w-full overflow-hidden rounded-[28px] shadow-[0_2px_8px_rgba(17,17,17,0.06),0_32px_64px_-24px_rgba(17,17,17,0.28)] transition-shadow duration-300 hover:shadow-[0_2px_8px_rgba(17,17,17,0.08),0_40px_80px_-24px_rgba(17,17,17,0.32)]">
                <Image
                  src="/cover.png"
                  alt="Pluto app preview"
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  priority
                />
              </div>
            </RevealOnScroll>
          ) : project.slug === "gear4music" ? (
            // Recreated hero — the real case study's dark-first headline,
            // rebuilt directly rather than a generic mockup.
            <RevealOnScroll delay={0.1} className="mt-12">
              <div className="overflow-hidden rounded-[28px] shadow-[0_2px_8px_rgba(17,17,17,0.06),0_32px_64px_-24px_rgba(17,17,17,0.28)]">
                <Gear4MusicHeroPreview />
              </div>
            </RevealOnScroll>
          ) : project.slug === "knockknock" ? (
            // Real product screenshot — same plain-frame treatment as Pluto.
            <RevealOnScroll delay={0.1} className="mt-12">
              <div className="group relative mx-auto aspect-[16/10] w-full max-w-2xl overflow-hidden rounded-[28px] shadow-[0_2px_8px_rgba(17,17,17,0.06),0_32px_64px_-24px_rgba(17,17,17,0.28)] transition-shadow duration-300 hover:shadow-[0_2px_8px_rgba(17,17,17,0.08),0_40px_80px_-24px_rgba(17,17,17,0.32)]">
                <Image
                  src="/knokknok1.png"
                  alt="KnockKnock app preview"
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  priority
                />
              </div>
            </RevealOnScroll>
          ) : (
            <RevealOnScroll delay={0.1} className="mt-12">
              {project.platform === "mobile" ? (
                <div className="flex justify-center">
                  <PhoneFrame className="max-w-[260px]">
                    <MockupPlaceholder Icon={Icon} bg={meta.bg} withPlay />
                  </PhoneFrame>
                </div>
              ) : (
                <BrowserFrame>
                  <MockupPlaceholder Icon={Icon} bg={meta.bg} withPlay />
                </BrowserFrame>
              )}
            </RevealOnScroll>
          )}

          {/* ---------------- CASE STUDY BODY ---------------- */}
          {project.slug === "pluto" ? (
            <div className="mt-12">
              <PlutoCaseStudy />
            </div>
          ) : project.slug === "gear4music" ? (
            <div className="mt-12">
              <Gear4MusicShowcase />
            </div>
          ) : project.slug === "knockknock" ? (
            <div className="mt-12">
              <KnockKnockCaseStudy />
            </div>
          ) : (
            <>
              {/* Generic fallback template — kept for any future project
                  without its own dedicated case-study component. */}
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <RevealOnScroll>
                  <SectionCard title="Overview">{project.overview}</SectionCard>
                </RevealOnScroll>
                <RevealOnScroll delay={0.05}>
                  <SectionCard title="The Problem">{project.problem}</SectionCard>
                </RevealOnScroll>
              </div>

              <RevealOnScroll delay={0.05} className="mt-16">
                <span className="mb-3 block h-1 w-8 rounded-full bg-navy/15 dark:bg-cream/15" />
                <h2 className="font-sans text-lg font-semibold text-navy dark:text-cream">A look inside</h2>
              </RevealOnScroll>

              <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {project.process.map((step, i) => (
                  <RevealOnScroll key={step.step} delay={0.05 * i}>
                    <PhoneFrame>
                      <MockupPlaceholder Icon={Icon} bg={meta.bg} />
                    </PhoneFrame>
                    <div className="mt-3 text-center">
                      <p className="font-sans text-sm font-semibold text-navy dark:text-cream">{step.step}</p>
                      <p className="mt-1 font-sans text-xs leading-relaxed text-navy/60 dark:text-cream/60">
                        {step.detail}
                      </p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>

              <RevealOnScroll delay={0.1} className="mt-8">
                <SectionCard title="Outcome">{project.outcome}</SectionCard>
              </RevealOnScroll>
            </>
          )}

          {/* ---------------- MORE PROJECTS ---------------- */}
          <RevealOnScroll delay={0.15} className="mt-14">
            <SoundLink
              href="/#work"
              className="group inline-flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 font-sans text-sm font-semibold text-cream shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg dark:bg-cream dark:text-navy"
            >
              More projects
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </SoundLink>
          </RevealOnScroll>

          {more.length > 0 && (
            <RevealOnScroll delay={0.2} className="mt-8">
              <div className="flex flex-wrap gap-3">
                {more.map((p) => {
                  // Icon is a component reference — Server Components can't
                  // pass functions to Client Components, so it's stripped
                  // out before this crosses into <ProjectIconChip>.
                  const { Icon: _pIcon, ...pMeta } = getProjectDisplay(p.slug, p.title);
                  const chipClass =
                    "group flex items-center gap-3 rounded-2xl border border-navy/[0.06] bg-white px-4 py-3 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md dark:border-cream/[0.06] dark:bg-midnight-card";
                  const chipContent = (
                    <>
                      <ProjectIconChip meta={pMeta} />
                      <span className="font-sans text-sm font-medium text-navy dark:text-cream">{pMeta.name}</span>
                      <ArrowRightIcon className="h-3.5 w-3.5 text-navy/40 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 dark:text-cream/40" />
                    </>
                  );
                  // Projects with a live site link straight out to it — no
                  // case study page to visit first.
                  return p.liveUrl ? (
                    <a key={p.slug} href={p.liveUrl} target="_blank" rel="noreferrer" className={chipClass}>
                      {chipContent}
                    </a>
                  ) : (
                    <SoundLink key={p.slug} href={`/work/${p.slug}`} className={chipClass}>
                      {chipContent}
                    </SoundLink>
                  );
                })}
              </div>
            </RevealOnScroll>
          )}
        </div>

        <Footer />
      </div>
    </main>
  );
}
