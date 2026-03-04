import Link from "next/link";
import { siteConfig } from "@/config/site";
import AnimatedSection from "@/components/ui/animated-section";
import SectionHeading from "@/components/ui/section-heading";
import Container from "@/components/ui/container";
import { getImagePath } from "@/lib/utils";

const genreImages: Record<string, string> = {
  wildlife: "/images/wildlife/wildlife-cover.jpg",
  portraits: "/images/portraits/portraits-cover.jpg",
  pets: "/images/pets/pets-cover.jpg",
};

export default function GenreGrid() {
  return (
    <section className="pb-24 pt-6 sm:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <AnimatedSection>
            <div className="rounded-[2rem] border border-foreground/10 bg-white/74 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8">
              <SectionHeading
                title="Explore The Archive"
                subtitle="The homepage now moves from the lead image into a cleaner set of categories so mobile visitors can choose a lane immediately."
              />
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/portfolio"
                  className="rounded-full bg-foreground px-5 py-3 text-xs tracking-[0.18em] text-surface uppercase transition-colors duration-200 hover:bg-accent"
                >
                  Browse All Work
                </Link>
                <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
                  Wildlife, portraits, pets
                </p>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.categories.map((category, index) => (
              <AnimatedSection key={category.slug} animation="scale-in" delay={index * 90}>
                <Link
                  href={`/portfolio?category=${category.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-[1.7rem] border border-foreground/12"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                    style={{ backgroundImage: `url(${getImagePath(genreImages[category.slug])})` }}
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.12)_10%,rgba(15,23,42,0.82)_100%)] transition-[opacity,background] duration-400 ease-out group-hover:bg-[linear-gradient(180deg,rgba(15,23,42,0.08)_10%,rgba(15,23,42,0.64)_100%)]" />

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="font-mono text-[10px] tracking-[0.22em] text-white/72 uppercase">
                      Collection {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3
                      className="mt-2 font-heading text-surface"
                      style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
                    >
                      {category.label}
                    </h3>
                    <div className="mt-3 h-[2px] w-12 origin-left bg-accent transition-transform duration-400 ease-out group-hover:scale-x-150" />
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
