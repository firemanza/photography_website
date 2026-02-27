import Link from "next/link";
import { siteConfig } from "@/config/site";
import AnimatedSection from "@/components/ui/animated-section";
import SectionHeading from "@/components/ui/section-heading";
import Container from "@/components/ui/container";

const genreImages: Record<string, string> = {
  wildlife: "/images/wildlife/wildlife-cover.jpg",
  events: "/images/events/events-cover.jpg",
  portraits: "/images/portraits/portraits-cover.jpg",
  pets: "/images/pets/pets-cover.jpg",
  motorsport: "/images/motorsport/motorsport-cover.jpg",
};

export default function GenreGrid() {
  return (
    <section className="py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            title="Explore My Work"
            subtitle="From the wild to the track — photography across every genre"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {siteConfig.categories.map((category, index) => (
            <AnimatedSection
              key={category.slug}
              animation="scale-in"
              delay={index * 100}
            >
              <Link
                href={`/portfolio?category=${category.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-lg"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${genreImages[category.slug]})`,
                  }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-background/40 transition-all duration-300 group-hover:bg-background/20" />

                {/* Label */}
                <div className="absolute inset-0 flex items-end p-6">
                  <div>
                    <h3 className="font-heading text-xl text-foreground transition-colors group-hover:text-accent">
                      {category.label}
                    </h3>
                    <div className="mt-2 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
