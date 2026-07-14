import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import {
  CONTACT_SCHEMA,
  PROJECT_TYPES,
  TIMELINES,
  type ContactInput,
} from "@/lib/contact-schema";
import { CONTACT_CONFIG } from "@/lib/contact-config";
import { CtaButton } from "@/components/ui/CtaButton";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(CONTACT_SCHEMA),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      projectType: "",
      timeline: "",
      budget: "",
      brief: "",
    },
  });

  const onSubmit = async (data: ContactInput) => {
    if (status === "sending") return; // prevent repeat submits
    // Honeypot: real users leave `company_website` blank. Bots fill every field.
    const hp = (
      document.getElementById("company_website") as HTMLInputElement | null
    )?.value;
    if (hp) {
      // Pretend success without sending anything.
      setStatus("success");
      reset();
      return;
    }
    setStatus("sending");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Something went wrong");
      }
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  const hasWhatsapp = Boolean(CONTACT_CONFIG.whatsappUrl);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative rounded-lg border border-edge bg-graphite/50 p-6 sm:p-8 cut-corners-lg"
      noValidate
      aria-busy={status === "sending"}
    >
      {/* Honeypot — visually hidden and skipped by assistive tech. */}
      <div aria-hidden className="hidden">
        <label>
          Company website
          <input
            id="company_website"
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your Name" error={errors.name?.message}>
          <input
            {...register("name")}
            placeholder="Name"
            className={inputCls}
            autoComplete="name"
          />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <input
            {...register("company")}
            placeholder="Company name"
            className={inputCls}
            autoComplete="organization"
          />
        </Field>
        <Field label="Work Email" error={errors.email?.message}>
          <input
            {...register("email")}
            placeholder="name@company.com"
            type="email"
            className={inputCls}
            autoComplete="email"
          />
        </Field>
        <Field label="Project Type" error={errors.projectType?.message}>
          <select {...register("projectType")} className={cn(inputCls, "appearance-none pr-8")}>
            <option value="">Select a service</option>
            {PROJECT_TYPES.map((p) => (
              <option key={p} value={p} className="bg-graphite text-cream">
                {p}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Timeline" error={errors.timeline?.message}>
          <select {...register("timeline")} className={cn(inputCls, "appearance-none pr-8")}>
            <option value="">Select a timeline</option>
            {TIMELINES.map((t) => (
              <option key={t} value={t} className="bg-graphite text-cream">
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Budget" error={errors.budget?.message}>
          <input
            {...register("budget")}
            placeholder="Optional"
            className={inputCls}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Project Brief" error={errors.brief?.message}>
          <textarea
            {...register("brief")}
            rows={5}
            placeholder="Tell us about the idea, objective, format, and deliverables."
            className={cn(inputCls, "min-h-[140px] resize-y")}
          />
        </Field>
      </div>

      <div role="status" aria-live="polite" className="min-h-0">
        {status === "success" ? (
          <div className="mt-5 flex items-center gap-3 border border-mint/40 bg-mint/10 px-4 py-3 text-sm text-mint">
            <CheckCircle2 size={16} aria-hidden />
            <span>
              Brief received (demo mode). No email is sent yet — we'll wire up
              the live inbox after final approval.
            </span>
          </div>
        ) : null}
        {status === "error" ? (
          <div className="mt-5 flex items-center gap-3 border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            <AlertCircle size={16} aria-hidden />
            {errorMsg ?? "Something went wrong. Please try again."}
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <CtaButton
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === "sending"}
          dot
          className="sm:min-w-[240px]"
        >
          {status === "sending" ? "Sending..." : "Send Project Brief"}
        </CtaButton>

        {hasWhatsapp ? (
          <a
            href={CONTACT_CONFIG.whatsappUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-3 border border-edge px-5 py-4 text-cream transition hover:border-mint hover:text-mint sm:min-w-[260px]"
          >
            <span className="flex-1 text-left">
              <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-cream/60">
                Prefer a conversation?
              </span>
              <span className="text-sm font-medium">Continue on WhatsApp</span>
            </span>
            <ArrowRight size={16} className="text-mint transition group-hover:translate-x-1" />
          </a>
        ) : (
          <div
            className="inline-flex cursor-not-allowed items-center gap-3 border border-edge px-5 py-4 text-cream/60 sm:min-w-[260px]"
            title="Contact channel coming soon"
            aria-disabled="true"
          >
            <span className="flex-1 text-left">
              <span className="block text-[10px] font-medium uppercase tracking-[0.22em] text-cream/40">
                Prefer a conversation?
              </span>
              <span className="text-sm font-medium">Continue on WhatsApp</span>
            </span>
            <ArrowRight size={16} className="text-cream/40" />
          </div>
        )}
      </div>
    </form>
  );
}

const inputCls =
  "w-full border border-edge bg-obsidian px-4 py-3 text-sm text-cream placeholder:text-smoke focus:border-mint focus:outline-none";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.22em] text-cream/70">
        {label}
      </span>
      {children}
      {error ? (
        <span className="mt-1 block text-[11px] text-red-300">{error}</span>
      ) : null}
    </label>
  );
}
