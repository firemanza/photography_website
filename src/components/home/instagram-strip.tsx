import { siteConfig } from "@/config/site";
import AnimatedSection from "@/components/ui/animated-section";
import Container from "@/components/ui/container";
import { getImagePath } from "@/lib/utils";

const instagramImages = [
  "/images/instagram/ig-1.jpg",
  "/images/instagram/ig-2.jpg",
  "/images/instagram/ig-3.jpg",
  "/images/instagram/ig-4.jpg",
  "/images/instagram/ig-5.jpg",
  "/images/instagram/ig-6.jpg",
];

export default function InstagramStrip() {
  return (
    <section className="border-y border-foreground/12 bg-surface/45 py-24">
      <Container>
        <AnimatedSection>
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Daily Fragments</p>
              <h3 className="mt-2 font-heading text-4xl text-foreground">Instagram Journal</h3>
            </div>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-sm border border-foreground/20 px-4 py-2 text-xs tracking-[0.16em] text-foreground uppercase transition-all hover:border-accent hover:text-accent sm:inline-flex"
            >
              Follow
            </a>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {instagramImages.map((src, index) => (
            <AnimatedSection key={src} animation="scale-in" delay={index * 50}>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-sm border border-foreground/15"
              >
                <div
                  className="h-full w-full bg-cover bg-center bg-no-repeat transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  style={{ backgroundImage: `url(${getImagePath(src)})` }}
                />
                <div className="absolute inset-0 bg-foreground/0 transition-[background-color] duration-300 ease-out group-hover:bg-foreground/20" />
              </a>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
