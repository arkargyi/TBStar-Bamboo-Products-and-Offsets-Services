import { createHash, randomBytes } from "node:crypto";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitBuckets = new Map();

const INQUIRY_TYPES = new Set([
  "Bamboo Split",
  "Bamboo Sticks",
  "Activated Carbon",
  "Books Printing",
  "Voucher Books Printing",
  "Other Offset Printing Services",
  "Ball Pen (Klick / Plano)",
  "General Inquiry",
]);

function sanitizeText(value, maxLength) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

function getClientKey(req) {
  const forwardedFor = req.headers?.["x-forwarded-for"];
  const firstForwardedAddress = Array.isArray(forwardedFor)
    ? forwardedFor[0]
    : forwardedFor;
  const rawAddress =
    (typeof firstForwardedAddress === "string"
      ? firstForwardedAddress.split(",")[0].trim()
      : "") ||
    req.socket?.remoteAddress ||
    "unknown";

  return createHash("sha256").update(rawAddress).digest("hex").slice(0, 16);
}

function getBody(req) {
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return null;
    }
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  return body;
}

function jsonError(res, status, error) {
  return res.status(status).json({ ok: false, error });
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return jsonError(res, 405, "Method not allowed.");
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.INQUIRY_FROM_EMAIL?.trim();
  const to =
    process.env.INQUIRY_TO_EMAIL?.trim() || "info@tbstarcompany.com";

  if (!apiKey || !from) {
    return jsonError(
      res,
      503,
      "Email delivery is not configured yet. Please contact us by phone or WhatsApp."
    );
  }

  const now = Date.now();
  const clientKey = getClientKey(req);
  if (rateLimitBuckets.size > 1000) {
    for (const [key, bucket] of rateLimitBuckets.entries()) {
      if (bucket.resetAt <= now) rateLimitBuckets.delete(key);
    }
  }

  const bucket = rateLimitBuckets.get(clientKey);
  if (bucket && bucket.resetAt > now) {
    if (bucket.count >= RATE_LIMIT_MAX_REQUESTS) {
      const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
      res.setHeader("Retry-After", String(retryAfter));
      return jsonError(
        res,
        429,
        "Too many inquiries from this connection. Please wait 15 minutes or contact our office by phone or WhatsApp."
      );
    }
    bucket.count += 1;
  } else {
    rateLimitBuckets.set(clientKey, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
  }

  const body = getBody(req);
  if (!body) return jsonError(res, 400, "Invalid inquiry data.");

  if (sanitizeText(body.website, 200).length > 0) {
    return jsonError(res, 400, "Automated spam submission detected.");
  }

  if (
    typeof body.formRenderedAt === "number" &&
    body.formRenderedAt > 0 &&
    now - body.formRenderedAt < 800
  ) {
    return jsonError(
      res,
      400,
      "Submission was too fast. Please review your details and try again."
    );
  }

  const fullName = sanitizeText(body.fullName || body.name, 120);
  const companyName = sanitizeText(body.companyName, 160);
  const phone = sanitizeText(body.phone, 30);
  const inquiryType = sanitizeText(body.inquiryType, 80);
  const message = sanitizeText(body.message, 4000);

  if (fullName.length < 2) {
    return jsonError(res, 400, "Please enter your full name.");
  }
  if (!/^[0-9+\-\s()]{6,30}$/.test(phone)) {
    return jsonError(res, 400, "Please enter a valid phone number.");
  }
  if (!INQUIRY_TYPES.has(inquiryType)) {
    return jsonError(res, 400, "Please select a valid inquiry category.");
  }
  if (message.length < 10) {
    return jsonError(
      res,
      400,
      "Please provide at least 10 characters describing your inquiry."
    );
  }

  const referenceId =
    "TBS-" +
    Date.now().toString(36).toUpperCase() +
    "-" +
    randomBytes(2).toString("hex").toUpperCase();
  const submittedAt = new Date(now).toISOString();
  const subject = "[TB Star Website] " + inquiryType + " inquiry — " + referenceId;
  const text = [
    "TB STAR COMPANY LIMITED — WEBSITE INQUIRY",
    "Reference: " + referenceId,
    "Received: " + submittedAt,
    "",
    "Inquiry type: " + inquiryType,
    "Full name: " + fullName,
    "Company: " + (companyName || "Not specified"),
    "Phone: " + phone,
    "",
    "Message / specifications:",
    message,
  ].join("\n");

  try {
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
      }),
    });

    if (!emailResponse.ok) {
      console.error(
        "[Inquiry email] Resend rejected the message with HTTP " +
          emailResponse.status
      );
      return jsonError(
        res,
        502,
        "We could not deliver your inquiry right now. Please try again or contact our Yangon office by phone or WhatsApp."
      );
    }

    return res.status(200).json({
      ok: true,
      delivered: true,
      deliveryChannel: "resend",
      referenceId,
      inquiryId: referenceId,
    });
  } catch (error) {
    console.error("[Inquiry email] Resend request failed.", error);
    return jsonError(
      res,
      502,
      "We could not deliver your inquiry right now. Please try again or contact our Yangon office by phone or WhatsApp."
    );
  }
}
