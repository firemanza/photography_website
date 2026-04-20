import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

type EnquiryPayload = {
  name?: string;
  email?: string;
  phone?: string;
  shootType?: string;
  date?: string;
  location?: string;
  budget?: string;
  message?: string;
  howFound?: string;
  website?: string;
};

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service is not configured yet." },
      { status: 500 }
    );
  }

  let payload: EnquiryPayload;
  try {
    payload = (await request.json()) as EnquiryPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const message = payload.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please include your name, email, and a message." },
      { status: 400 }
    );
  }

  const subject = `Photography enquiry from ${name}`;
  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${payload.phone?.trim() || "Not provided"}`,
    "",
    `Type of shoot: ${payload.shootType?.trim() || "Not specified"}`,
    `Preferred date: ${payload.date?.trim() || "Flexible"}`,
    `Location: ${payload.location?.trim() || "Not specified"}`,
    `Budget: ${payload.budget?.trim() || "Not specified"}`,
    "",
    "Message:",
    message,
    "",
    `How they found us: ${payload.howFound?.trim() || "Not specified"}`,
  ];

  const from = process.env.RESEND_FROM || `${siteConfig.name} <onboarding@resend.dev>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [siteConfig.contact.email],
      subject,
      text: lines.join("\n"),
      reply_to: email,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("Resend send failed", response.status, detail);
    return NextResponse.json(
      { error: "Could not send email. Please try again in a moment." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
