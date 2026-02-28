"use client";

import { useState, useEffect, useCallback } from "react";
import { siteConfig } from "@/config/site";
import Button from "@/components/ui/button";
import ScrambleTagline from "@/components/home/scramble-tagline";
import { getImagePath } from "@/lib/utils";

const heroImages = [
  "/images/hero/hero-1.jpg",
  "/images/hero/hero-2.jpg",
  "/images/hero/hero-3.jpg",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5200);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative min-h-screen overflow-hidden px-4 pb-12 pt-28 sm:px-6 sm:pt-32">
      {heroImages.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
          style={{ opacity: index === currentIndex ? 1 : 0 }}
        >
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${getImagePath(src)})` }}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(27,20,15,0.82)_0%,rgba(27,20,15,0.4)_45%,rgba(27,20,15,0.72)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(198,61,47,0.28),transparent_34%)]" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="max-w-3xl">
          <p className="font-mono text-xs tracking-[0.2em] text-surface/80 uppercase">
            Johannesburg, South Africa
          </p>
          <h1 className="mt-5 font-heading text-5xl leading-[0.9] text-surface sm:text-6xl md:text-7xl lg:text-8xl">
            {siteConfig.name}
          </h1>
          <div className="mt-6 max-w-2xl">
            <ScrambleTagline />
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/portfolio" variant="primary">
              View Portfolio
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              className="border-surface/70 !text-surface !hover:bg-surface !hover:text-foreground"
            >
              Start a Project
            </Button>
          </div>
        </div>

        <div className="justify-self-start rounded-sm border border-surface/25 bg-black/30 p-5 backdrop-blur-sm sm:p-6 lg:justify-self-end">
          <p className="font-mono text-[11px] tracking-[0.2em] text-surface/80 uppercase">Current Focus</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-surface/88">
            Field-driven portraiture and wildlife narratives with a tactile, cinematic finish designed for editorial and personal archives.
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-10 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-10 bg-accent" : "w-4 bg-surface/45"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
