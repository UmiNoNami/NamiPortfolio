"use client";

import RevealOnScroll from "../RevealOnScroll";
import SectionHeading from "../pluto/SectionHeading";
import { playClick } from "@/lib/sound";

const CONTRIBUTIONS = [
  "Developed the application using React Native and Expo",
  "Built Firebase authentication",
  "Structured the Firestore database",
  "Created separate Seeker and Provider experiences",
  "Implemented user profiles and accommodation listings",
  "Added image uploading",
  "Developed swiping and matching functionality",
  "Built real-time conversations and image messaging",
  "Added map-based accommodation discovery",
  "Implemented reporting, hiding and account-management features",
  "Connected the Figma designs into a functional end-to-end application",
];

const TECH_STACK = [
  "React Native",
  "Expo",
  "Firebase Authentication",
  "Firestore",
  "React Navigation",
  "Expo Image Picker",
  "React Native Maps",
  "AsyncStorage",
];

const FEATURES = [
  { title: "Role-based onboarding", detail: "Separate sign-up paths for people seeking a place and people listing one." },
  { title: "Profiles & listings", detail: "Structured profile and accommodation-listing data, with photo uploads." },
  { title: "Swipe & matching", detail: "A swipe-based interface that creates a match when interest is mutual." },
  { title: "Real-time chat", detail: "Conversations with image messaging, updating live via Firestore." },
  { title: "Map discovery", detail: "Browsing available accommodation by location on a map." },
  { title: "Reporting & account controls", detail: "Reporting, hiding and account-management tools for user safety." },
];

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[28px] border border-navy/[0.06] bg-white p-6 shadow-[0_1px_2px_rgba(17,17,17,0.04),0_16px_36px_-20px_rgba(17,17,17,0.16)] dark:border-cream/[0.06] dark:bg-midnight-card sm:p-8">
      {children}
    </div>
  );
}

function Prose({ children }: { children: string }) {
  return <p className="mt-3 font-sans text-[15px] leading-relaxed text-navy/70 dark:text-cream/70">{children}</p>;
}

export default function KnockKnockCaseStudy() {
  return (
    <div className="space-y-16">
      {/* Credits */}
      <RevealOnScroll>
        <div className="grid gap-3 rounded-2xl border border-navy/10 bg-navy/[0.03] p-5 dark:border-cream/10 dark:bg-cream/[0.04] sm:grid-cols-3">
          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-navy/40 dark:text-cream/40">
              Development
            </p>
            <p className="mt-1 font-sans text-sm font-semibold text-navy dark:text-cream">Nami Enkhjargal</p>
          </div>
          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-navy/40 dark:text-cream/40">
              UI/UX Design
            </p>
            <p className="mt-1 font-sans text-sm font-semibold text-navy dark:text-cream">Fernanda Fernandes</p>
          </div>
          <div>
            <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-navy/40 dark:text-cream/40">
              Project Type
            </p>
            <p className="mt-1 font-sans text-sm font-semibold text-navy dark:text-cream">
              Collaborative master&apos;s project
            </p>
          </div>
        </div>
      </RevealOnScroll>

      {/* Overview */}
      <RevealOnScroll>
        <Card>
          <SectionHeading index="01" title="Overview" />
          <Prose>
            KnockKnock is a roommate and accommodation-matching application created as a collaborative
            master&apos;s project. The UI/UX design was created by Fernanda Fernandes, while I was
            responsible for developing the application and connecting the experience to a working Firebase
            backend.
          </Prose>
        </Card>
      </RevealOnScroll>

      {/* My role */}
      <RevealOnScroll>
        <Card>
          <SectionHeading index="02" title="My Role" />
          <p className="mt-3 font-sans text-lg font-bold text-navy dark:text-cream">Mobile App Developer</p>
          <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
            {CONTRIBUTIONS.map((c) => (
              <li key={c} className="flex items-start gap-2 font-sans text-sm text-navy/70 dark:text-cream/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-sky" />
                {c}
              </li>
            ))}
          </ul>
        </Card>
      </RevealOnScroll>

      {/* The product */}
      <RevealOnScroll>
        <Card>
          <SectionHeading index="03" title="The Product" />
          <Prose>
            KnockKnock supports two connected user journeys. Seekers can explore accommodation and potential
            roommates, while Providers can publish and manage listings. Matching creates a connection between
            compatible users and opens a conversation.
          </Prose>
        </Card>
      </RevealOnScroll>

      {/* Technical structure */}
      <RevealOnScroll>
        <div>
          <SectionHeading index="04" title="Technical Structure" />
          <div className="mt-5 flex flex-wrap gap-2.5">
            {TECH_STACK.map((t) => (
              <span
                key={t}
                className="rounded-full border border-navy/15 bg-white px-4 py-2 font-sans text-sm font-medium text-navy dark:border-cream/15 dark:bg-midnight-card dark:text-cream"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </RevealOnScroll>

      {/* Development challenge */}
      <div className="grid gap-5 sm:grid-cols-2">
        <RevealOnScroll>
          <Card>
            <SectionHeading index="05" title="Development Challenge" />
            <Prose>
              The main challenge was connecting several dependent systems — profiles, listings, swipes,
              matches, conversations and reports — without breaking the user journey. A single action could
              affect several parts of the database, so the data structure and state management needed to
              remain consistent.
            </Prose>
          </Card>
        </RevealOnScroll>

        {/* Design collaboration */}
        <RevealOnScroll delay={0.05}>
          <Card>
            <SectionHeading index="06" title="Design Collaboration" />
            <Prose>
              I translated the provided Figma designs into reusable React Native components and working
              interactions. During implementation, I communicated technical constraints and adapted responsive
              behaviour while preserving the designer&apos;s original visual direction.
            </Prose>
          </Card>
        </RevealOnScroll>
      </div>

      {/* Key functionality */}
      <RevealOnScroll>
        <SectionHeading index="07" title="Key Functionality" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <RevealOnScroll key={f.title} delay={0.05 * i} y={14}>
              <div className="h-full rounded-2xl border border-navy/10 bg-white p-5 dark:border-cream/10 dark:bg-midnight-card">
                <p className="font-sans text-sm font-semibold text-navy dark:text-cream">{f.title}</p>
                <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-navy/65 dark:text-cream/65">
                  {f.detail}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </RevealOnScroll>

      {/* Outcome + Reflection */}
      <div className="grid gap-5 sm:grid-cols-2">
        <RevealOnScroll>
          <Card>
            <SectionHeading index="08" title="Outcome" />
            <Prose>
              The result was a functioning end-to-end mobile application rather than only a visual prototype.
              The project strengthened my ability to collaborate with a designer, translate interface designs
              into code and connect complex user flows to a real database.
            </Prose>
          </Card>
        </RevealOnScroll>
        <RevealOnScroll delay={0.05}>
          <Card>
            <SectionHeading index="09" title="Reflection" />
            <Prose>
              If I continued development, I would focus on production security rules, performance testing,
              notification handling and further validation of the matching experience.
            </Prose>
          </Card>
        </RevealOnScroll>
      </div>

      {/* CTA */}
      <RevealOnScroll className="flex flex-wrap gap-3">
        <a
          href="https://knokknokapp.com/"
          target="_blank"
          rel="noreferrer"
          onClick={() => playClick()}
          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-navy px-6 py-2.5 font-sans text-sm font-semibold text-cream shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg dark:bg-cream dark:text-navy"
        >
          Visit product website
        </a>
      </RevealOnScroll>
    </div>
  );
}
