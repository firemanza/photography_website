import type { Metadata } from "next";
import Container from "@/components/ui/container";
import AnimatedSection from "@/components/ui/animated-section";
import { siteConfig } from "@/config/site";
import { aboutContent } from "@/data/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Johannesburg-based photographer passionate about wildlife, animals, and motorsport. Learn more about my story and approach.",
};

export default function AboutPage() {
  return (
    <section className="pt-32 pb-24">
      <Container>
        {/* Hero Section */}
        <AnimatedSection>
          <div className="flex flex-col gap-12">
            {/* Portrait */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <div
                className="h-full w-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${aboutContent.portrait})`,
                  backgroundColor: "#1e1e1e",
                }}
              />
            </div>

            {/* Bio */}
            <div className="mx-auto max-w-3xl">
              <h1 className="font-heading text-4xl text-foreground md:text-5xl">
                About Me
              </h1>
              <div className="mt-4 h-px w-16 bg-accent" />
              <div className="mt-8 space-y-4">
                {aboutContent.bio.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Gear Section */}
        <AnimatedSection className="mt-24">
          <div className="rounded-lg border border-surface-light bg-surface p-8">
            <h2 className="font-heading text-2xl text-foreground">
              Gear & Approach
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {aboutContent.gear.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-surface-light px-4 py-1.5 text-sm text-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* SPCA Section */}
        <AnimatedSection className="mt-12">
          <div className="rounded-lg border border-accent/20 bg-accent/5 p-8">
            <h2 className="font-heading text-2xl text-accent">
              {aboutContent.spca.title}
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              {aboutContent.spca.description}
            </p>
          </div>
        </AnimatedSection>

        {/* Social Links */}
        <AnimatedSection className="mt-12 text-center">
          <p className="mb-4 text-muted">Find me on socials</p>
          <div className="flex justify-center gap-4">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-surface-light px-6 py-2.5 text-sm text-muted transition-all hover:border-accent hover:text-accent"
            >
              <svg
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Instagram
            </a>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
