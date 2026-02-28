import type { Metadata } from "next";
import Container from "@/components/ui/container";
import AnimatedSection from "@/components/ui/animated-section";
import { siteConfig } from "@/config/site";
import { aboutContent } from "@/data/about";
import { getImagePath } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Johannesburg-based photographer available for wildlife, pets, portraits, events, motorsport, and more.",
};

export default function AboutPage() {
  return (
    <section className="pb-24 pt-36 sm:pt-40">
      <Container>
        <AnimatedSection>
          <div className="space-y-10">
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-foreground/14">
              <div
                className="h-full w-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${getImagePath(aboutContent.portrait)})`,
                  backgroundColor: "#d8cdb7",
                }}
              />
            </div>

            <div className="max-w-3xl">
              <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">About</p>
              <h1
                className="mt-2 font-heading text-foreground"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.75rem)" }}
              >About Me</h1>
              <div className="mt-5 h-[2px] w-20 bg-accent" />
              <div className="mt-8 space-y-4 text-muted">
                {aboutContent.bio.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-8">
          <div className="rounded-sm border border-accent/30 bg-accent/8 p-8">
            <h2 className="font-heading text-3xl text-foreground">{aboutContent.spca.title}</h2>
            <p className="mt-4 leading-relaxed text-muted">{aboutContent.spca.description}</p>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-10">
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-foreground/20 px-5 py-2 text-xs tracking-[0.14em] text-foreground uppercase transition-all hover:border-accent hover:text-accent"
          >
            Follow on Instagram
          </a>
        </AnimatedSection>
      </Container>
    </section>
  );
}
