import { Suspense } from "react";
import type { Metadata } from "next";
import Container from "@/components/ui/container";
import SectionHeading from "@/components/ui/section-heading";
import AnimatedSection from "@/components/ui/animated-section";
import ContactForm from "@/components/contact/contact-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch for wildlife, portrait, or pet photography enquiries in Johannesburg.",
};

export default function ContactPage() {
  return (
    <section className="pt-32 pb-24">
      <Container>
        <SectionHeading
          title="Get in Touch"
          subtitle="Tell me about your project and I'll get back to you within 48 hours"
        />

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Form */}
          <AnimatedSection className="lg:col-span-2">
            <Suspense fallback={<div className="h-96" />}>
              <ContactForm />
            </Suspense>
          </AnimatedSection>

          {/* Contact Info Sidebar */}
          <AnimatedSection animation="fade-in" delay={200}>
            <div className="space-y-8 rounded-lg border border-surface-light bg-surface p-8">
              <div>
                <h3 className="font-heading text-lg text-foreground">
                  Location
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {siteConfig.contact.location}
                </p>
              </div>

              <div>
                <h3 className="font-heading text-lg text-foreground">
                  Response Time
                </h3>
                <p className="mt-2 text-sm text-muted">
                  I typically respond within 48 hours. For urgent enquiries,
                  reach out via Instagram DM.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-lg text-foreground">
                  Social
                </h3>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-accent-light"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  Follow on Instagram
                </a>
              </div>

              <div className="border-t border-surface-light pt-6">
                <p className="text-xs text-muted">
                  This form is for enquiries only. All bookings and pricing
                  are discussed directly after initial contact.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
