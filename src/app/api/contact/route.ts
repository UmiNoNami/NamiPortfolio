import { NextResponse } from "next/server";

// Keys must match the `id`s used by the topic-picker buttons in
// src/components/ContactChat.tsx.
const TOPIC_LABELS: Record<string, string> = {
  hire: "Hiring / a project",
  chat: "Just saying hi",
  other: "Something else",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const { topic, message, email } = await req.json();

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }
    if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const topicLabel = TOPIC_LABELS[topic as string] ?? "General message";
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      // Using Resend's shared sandbox sender (onboarding@resend.dev) — no
      // domain verification required. `reply_to` is set to the visitor's
      // email so hitting "Reply" in Gmail goes straight back to them.
      body: JSON.stringify({
        from: "Portfolio Chat <onboarding@resend.dev>",
        to: ["naransuvd57@gmail.com"],
        reply_to: cleanEmail,
        subject: `Portfolio chat — ${topicLabel}`,
        text: `Topic: ${topicLabel}\nFrom: ${cleanEmail}\n\n${cleanMessage}`,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("Resend API error:", res.status, body);
      return NextResponse.json({ error: "Failed to send" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
