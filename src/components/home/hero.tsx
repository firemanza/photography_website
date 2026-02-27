"use client";

import { useState, useEffect, useCallback } from "react";
import { siteConfig } from "@/config/site";
import Button from "@/components/ui/button";
import ScrambleTagline from "@/components/home/scramble-tagline";

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
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Images */}
      {heroImages.map((src, index) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: index === currentIndex ? 1 : 0 }}
        >
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${src})` }}
          />
        </div>
      ))}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/20 to-background/80" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="font-heading text-4xl text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          {siteConfig.name}
        </h1>
        <div className="mt-6">
          <ScrambleTagline />
        </div>
        <div className="mt-8 flex gap-4">
          <Button href="/portfolio" variant="primary">
            View Portfolio
          </Button>
          <Button href="/contact" variant="secondary">
            Get in Touch
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest text-foreground/50 uppercase">
            Scroll
          </span>
          <div className="h-8 w-px animate-pulse bg-foreground/30" />
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-8 z-10 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-accent"
                : "w-1.5 bg-foreground/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
