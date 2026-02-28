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
    <section className="py-24">
      <Container>
        <AnimatedSection>
          <SectionHeading
            title="Explore The Archive"
            subtitle="From quiet animal portraits to high-energy moments, each collection holds a different rhythm."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.categories.map((category, index) => (
            <AnimatedSection key={category.slug} animation="scale-in" delay={index * 90}>
              <Link
                href={`/portfolio?category=${category.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-sm border border-foreground/15"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${getImagePath(genreImages[category.slug])})` }}
                />

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,18,13,0.2)_10%,rgba(23,18,13,0.78)_100%)] transition-all duration-300 group-hover:bg-[linear-gradient(180deg,rgba(23,18,13,0.15)_10%,rgba(23,18,13,0.6)_100%)]" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-heading text-3xl text-surface">{category.label}</h3>
                  <div className="mt-3 h-[2px] w-12 bg-accent transition-all duration-300 group-hover:w-24" />
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
