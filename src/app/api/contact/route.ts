import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendEmail(data: {
  name: string;
  phone: string;
  email: string;
  service: string;
  address?: string;
  message?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: "Splash Bros <onboarding@resend.dev>",
      to: "splashbrosnv@gmail.com",
      subject: `New Quote Request - ${data.service} - ${data.name}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Service:</strong> ${escapeHtml(data.service)}</p>
        <p><strong>Address:</strong> ${escapeHtml(data.address || "Not provided")}</p>
        <p><strong>Message:</strong> ${escapeHtml(data.message || "Not provided")}</p>
      `,
    }),
  });
}

async function sendSMS(data: {
  name: string;
  phone: string;
  email: string;
  service: string;
  address?: string;
  message?: string;
}) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromPhone = process.env.TWILIO_PHONE_NUMBER;
  if (!accountSid || !authToken || !fromPhone) return;

  const body = [
    "New Quote Request",
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Service: ${data.service}`,
    `Address: ${data.address || "N/A"}`,
    `Message: ${data.message || "N/A"}`,
  ].join("\n");

  await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        To: "+17788682514",
        From: fromPhone,
        Body: body,
      }),
    }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, service, address, message } = body;

    if (!name || !phone || !email || !service) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { error } = await supabase.from("contact_submissions").insert([
      {
        name,
        phone,
        email,
        service,
        address: address || null,
        message: message || null,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save submission" },
        { status: 500 }
      );
    }

    // Send notifications in parallel, don't fail the request if they error
    const notificationData = { name, phone, email, service, address, message };
    await Promise.allSettled([
      sendEmail(notificationData),
      sendSMS(notificationData),
    ]);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
