"use client";

import { useState, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import emailjs from "@emailjs/browser";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

const shootTypes = [
  { value: "", label: "Select type of shoot" },
  { value: "wildlife", label: "Wildlife & Nature" },
  { value: "pets", label: "Pet Photography" },
  { value: "portraits", label: "Portraits" },
  { value: "other", label: "Other" },
];

const budgetRanges = [
  { value: "", label: "Select budget range" },
  { value: "under-2000", label: "Under R2,000" },
  { value: "2000-5000", label: "R2,000 – R5,000" },
  { value: "5000-10000", label: "R5,000 – R10,000" },
  { value: "10000+", label: "R10,000+" },
  { value: "discuss", label: "Let's discuss" },
];

const howFoundOptions = [
  { value: "", label: "How did you find me?" },
  { value: "instagram", label: "Instagram" },
  { value: "google", label: "Google" },
  { value: "referral", label: "Referral" },
  { value: "other", label: "Other" },
];

type FormStatus = "idle" | "sending" | "success" | "error";

const inputStyles =
  "w-full rounded border border-surface-light bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted/50 transition-colors focus:border-accent focus:outline-none";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const prefilledService = searchParams.get("service") || "";

  const [status, setStatus] = useState<FormStatus>("idle");
  const [honeypot, setHoneypot] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    shootType: prefilledService,
    date: "",
    location: "",
    budget: "",
    message: "",
    howFound: "",
  });

  const updateField = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Honeypot check — bots fill hidden fields
    if (honeypot) {
      setStatus("success");
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("error");
      return;
    }

    try {
      setStatus("sending");
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || "Not provided",
          shoot_type:
            shootTypes.find((t) => t.value === formData.shootType)?.label ||
            formData.shootType,
          date: formData.date || "Flexible",
          location: formData.location,
          budget:
            budgetRanges.find((b) => b.value === formData.budget)?.label ||
            "Not specified",
          message: formData.message,
          how_found:
            howFoundOptions.find((h) => h.value === formData.howFound)?.label ||
            "Not specified",
        },
        publicKey
      );
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-lg border border-accent/20 bg-accent/5 p-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h3 className="mt-4 font-heading text-2xl text-foreground">
          Thanks for reaching out!
        </h3>
        <p className="mt-2 text-muted">
          I&apos;ll be in touch within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Honeypot — hidden from real users */}
      <div
        className="absolute -z-10 h-0 overflow-hidden opacity-0"
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="one-time-code"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* Name & Email */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm text-muted">
            Full Name <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            id="name"
            required
            className={inputStyles}
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-muted">
            Email Address <span className="text-accent">*</span>
          </label>
          <input
            type="email"
            id="email"
            required
            className={inputStyles}
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </div>
      </div>

      {/* Phone & Shoot Type */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm text-muted">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            className={inputStyles}
            placeholder="+27..."
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="shootType" className="mb-2 block text-sm text-muted">
            Type of Shoot <span className="text-accent">*</span>
          </label>
          <select
            id="shootType"
            required
            className={cn(inputStyles, "appearance-none")}
            value={formData.shootType}
            onChange={(e) => updateField("shootType", e.target.value)}
          >
            {shootTypes.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Date & Location */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="mb-2 block text-sm text-muted">
            Preferred Date
          </label>
          <input
            type="date"
            id="date"
            className={inputStyles}
            value={formData.date}
            onChange={(e) => updateField("date", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="location" className="mb-2 block text-sm text-muted">
            Location
          </label>
          <input
            type="text"
            id="location"
            className={inputStyles}
            placeholder="City or area"
            value={formData.location}
            onChange={(e) => updateField("location", e.target.value)}
          />
        </div>
      </div>

      {/* Budget & How Found */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className="mb-2 block text-sm text-muted">
            Budget Range
          </label>
          <select
            id="budget"
            className={cn(inputStyles, "appearance-none")}
            value={formData.budget}
            onChange={(e) => updateField("budget", e.target.value)}
          >
            {budgetRanges.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="howFound" className="mb-2 block text-sm text-muted">
            How did you find me?
          </label>
          <select
            id="howFound"
            className={cn(inputStyles, "appearance-none")}
            value={formData.howFound}
            onChange={(e) => updateField("howFound", e.target.value)}
          >
            {howFoundOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-muted">
          Tell me about your shoot <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
          className={cn(inputStyles, "resize-none")}
          placeholder="What are you looking for? Any specific ideas or requirements?"
          value={formData.message}
          onChange={(e) => updateField("message", e.target.value)}
        />
      </div>

      {/* Submit */}
      <div className="flex flex-col items-start gap-4">
        <Button
          type="submit"
          variant="primary"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Send Enquiry"}
        </Button>

        {status === "error" && (
          <p className="text-sm text-red-400">
            Something went wrong. Please try again or email me directly.
          </p>
        )}
      </div>
    </form>
  );
}
