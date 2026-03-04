"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import Button from "@/components/ui/button";
import ScrambleTagline from "@/components/home/scramble-tagline";
import { getImagePath } from "@/lib/utils";

const heroSlides = [
  {
    desktop: "/images/hero/hero-1.jpg",
    mobile: "/images/wildlife/lioness-green-field.jpg",
    alt: "Lioness standing in tall green grass",
    label: "Wild Terrain",
  },
  {
    desktop: "/images/wildlife/goose-walking.jpg",
    mobile: "/images/wildlife/white-lion-portrait.jpg",
    alt: "Goose crossing a green yard",
    label: "Quiet Motion",
  },
  {
    desktop: "/images/hero/hero-3.jpg",
    mobile: "/images/wildlife/rhino-portrait.jpg",
    alt: "White rhino portrait in warm light",
    label: "Close Studies",
  },
];

const heroHighlights = [
  "Mobile-first image hierarchy",
  "Editorial pacing with minimal chrome",
  "Fast-loading portfolio-first sections",
];

export default function Hero() {
  const [requestedIndex, setRequestedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRequestedIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, []);

  const currentSlide = heroSlides[requestedIndex];

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32">
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#f8fbff_0%,#edf2f8_45%,#e8edf5_100%)]" />
      <div className="absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_12%_18%,rgba(37,99,235,0.16),transparent_24%),radial-gradient(circle_at_84%_22%,rgba(15,23,42,0.08),transparent_18%),radial-gradient(circle_at_72%_78%,rgba(96,165,250,0.12),transparent_24%)]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <p className="rounded-full border border-foreground/10 bg-white/70 px-3 py-1 font-mono text-[10px] tracking-[0.24em] text-muted uppercase">
              {siteConfig.contact.location}
            </p>
            <p className="rounded-full border border-accent/15 bg-accent/8 px-3 py-1 font-mono text-[10px] tracking-[0.24em] text-accent uppercase">
              Accepting Q2 commissions
            </p>
          </div>

          <h1
            className="mt-6 max-w-xl font-heading leading-[0.92] text-foreground"
            style={{ fontSize: "clamp(3.1rem, 9vw, 6.25rem)" }}
          >
            A sharper first draft for mobile and desktop.
          </h1>

          <div className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            <ScrambleTagline />
          </div>

          <p className="mt-5 max-w-xl text-sm leading-7 text-foreground/74 sm:text-base">
            This direction keeps the cinematic tone of your current desktop draft, but reworks the
            opening experience so mobile visitors land on a deliberate story instead of a loose
            full-screen image stack.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/portfolio" variant="primary" className="rounded-full px-7">
              View Portfolio
            </Button>
            <Button href="/contact" variant="secondary" className="rounded-full px-7">
              Start a Project
            </Button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {heroHighlights.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-foreground/10 bg-white/72 px-4 py-4 shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
              >
                <p className="font-mono text-[10px] tracking-[0.22em] text-accent uppercase">Direction</p>
                <p className="mt-2 text-sm leading-6 text-foreground/78">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-4 top-8 h-24 w-24 rounded-full bg-accent/12 blur-2xl sm:h-32 sm:w-32" />
          <div className="absolute -right-4 bottom-10 h-28 w-28 rounded-full bg-foreground/8 blur-2xl sm:h-36 sm:w-36" />

          <div className="relative overflow-hidden rounded-[2rem] border border-foreground/12 bg-[linear-gradient(145deg,rgba(17,19,24,0.98),rgba(31,41,55,0.96))] p-3 shadow-[0_30px_70px_rgba(15,23,42,0.22)] sm:p-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.45rem] sm:aspect-[5/4] lg:min-h-[37rem]">
              {heroSlides.map((slide, index) => {
                const src = getImagePath(isMobile ? slide.mobile : slide.desktop);

                return (
                  <div
                    key={slide.alt}
                    className="absolute inset-0 transition-opacity duration-[1400ms] ease-out"
                    style={{ opacity: index === requestedIndex ? 1 : 0 }}
                  >
                    <Image
                      src={src}
                      alt={slide.alt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1024px) 100vw, 54vw"
                      className="object-cover transition-transform duration-[2200ms] ease-out"
                    />
                  </div>
                );
              })}

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,15,25,0.1)_0%,rgba(10,15,25,0.05)_35%,rgba(10,15,25,0.78)_100%)]" />

              <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3 sm:left-5 sm:right-5 sm:top-5">
                <div className="rounded-full border border-white/14 bg-black/28 px-3 py-2 backdrop-blur-sm">
                  <p className="font-mono text-[10px] tracking-[0.22em] text-white/72 uppercase">Featured Frame</p>
                  <p className="mt-1 text-sm text-white">{currentSlide.label}</p>
                </div>
                <div className="rounded-full border border-white/14 bg-white/10 px-3 py-2 backdrop-blur-sm">
                  <p className="font-mono text-[10px] tracking-[0.22em] text-white/72 uppercase">Draft v2</p>
                </div>
              </div>

              <div className="absolute inset-x-4 bottom-4 sm:inset-x-5 sm:bottom-5">
                <div className="grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-[1.35rem] border border-white/10 bg-black/28 px-4 py-4 backdrop-blur-md">
                    <p className="font-mono text-[10px] tracking-[0.22em] text-white/68 uppercase">Archive Direction</p>
                    <p className="mt-2 font-heading text-2xl text-white sm:text-3xl">Portfolio-first storytelling.</p>
                    <p className="mt-2 text-sm leading-6 text-white/74">
                      Visuals lead, text supports, and every action points toward the work.
                    </p>
                  </div>

                  <div className="rounded-[1.35rem] border border-white/10 bg-white/10 px-4 py-4 backdrop-blur-md">
                    <p className="font-mono text-[10px] tracking-[0.22em] text-white/68 uppercase">Mobile Focus</p>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm text-white/86">Clear top navigation</p>
                      <p className="text-sm text-white/86">Contained hero media</p>
                      <p className="text-sm text-white/86">Faster scan path</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
              <div className="flex items-center gap-2">
                {heroSlides.map((slide, index) => (
                  <button
                    key={slide.label}
                    onClick={() => setRequestedIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === requestedIndex ? "w-12 bg-accent" : "w-4 bg-white/28"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <p className="font-mono text-[10px] tracking-[0.22em] text-white/58 uppercase">
                Responsive motion with reduced clutter
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
