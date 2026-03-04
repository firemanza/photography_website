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
    <section className="border-y border-foreground/10 bg-white/38 py-20 sm:py-24">
      <Container>
        <AnimatedSection>
          <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">Daily Fragments</p>
              <h3 className="mt-2 font-heading text-4xl text-foreground sm:text-5xl">Instagram Journal</h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-foreground/72 sm:text-base">
                This stays as a lighter social layer beneath the main portfolio path, giving the
                homepage texture without competing with the hero or archive sections.
              </p>
            </div>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit rounded-full border border-foreground/14 px-4 py-2 text-xs tracking-[0.16em] text-foreground uppercase transition-all hover:border-accent hover:text-accent"
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
                className="group relative block aspect-square overflow-hidden rounded-[1.35rem] border border-foreground/12"
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
