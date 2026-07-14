import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";
import { CONTACT_SCHEMA } from "@/server/validation/contact";

// Public endpoint. This lives under /api/contact and receives the JSON payload
// from the site's <ContactForm />. In stage 4 we validate + persist; email/CRM
// transport slots in behind `sendContactBrief()` and stays runtime-agnostic
// (Cloudflare Worker safe: fetch + crypto only, no Node-only deps).
export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = CONTACT_SCHEMA.safeParse(body);
        if (!parsed.success) {
          return json(
            {
              error: "Validation failed",
              issues: parsed.error.flatten(),
            },
            { status: 422 },
          );
        }

        // Stubbed transport. Replace with Resend / SMTP / Cloud email later.
        // The console log is server-side only.
        console.log("[contact] brief received:", {
          ...parsed.data,
          brief: parsed.data.brief.slice(0, 120) + "…",
        });

        return json({ ok: true });
      },
    },
  },
});
