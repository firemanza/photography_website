/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { siteConfig } from "@/config/site";
import Button from "@/components/ui/button";
import ScrambleTagline from "@/components/home/scramble-tagline";
import { getImagePath } from "@/lib/utils";

const heroSlides = [
  {
    desktop: "/images/hero/hero-1.jpg",
    mobile: "/images/wildlife/lioness-green-field.jpg",
    alt: "Lioness standing in tall green grass",
  },
  {
    desktop: "/images/wildlife/goose-walking.jpg",
    mobile: "/images/wildlife/white-lion-portrait.jpg",
    alt: "Goose crossing a green yard",
  },
  {
    desktop: "/images/hero/hero-3.jpg",
    mobile: "/images/wildlife/rhino-portrait.jpg",
    alt: "White rhino portrait in warm light",
  },
];

export default function Hero() {
  const [requestedIndex, setRequestedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const activeSlides = useMemo(
    () =>
      heroSlides.map((slide) => ({
        src: isMobile ? slide.mobile : slide.desktop,
        alt: slide.alt,
      })),
    [isMobile]
  );

  const nextSlide = useCallback(() => {
    setRequestedIndex((prev) => (prev + 1) % activeSlides.length);
  }, [activeSlides.length]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5200);
    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => {
    activeSlides.forEach((slide) => {
      if (loadedImages[slide.src]) return;

      const preloader = new window.Image();
      preloader.decoding = "async";
      preloader.onload = () => {
        setLoadedImages((current) => {
          if (current[slide.src]) return current;
          return { ...current, [slide.src]: true };
        });
      };
      preloader.src = getImagePath(slide.src);
    });
  }, [activeSlides, loadedImages]);

  const visibleIndex = useMemo(() => {
    const requestedSlide = activeSlides[requestedIndex];
    if (requestedSlide && loadedImages[requestedSlide.src]) {
      return requestedIndex;
    }

    const firstLoadedIndex = activeSlides.findIndex((slide) => loadedImages[slide.src]);
    return firstLoadedIndex >= 0 ? firstLoadedIndex : 0;
  }, [activeSlides, loadedImages, requestedIndex]);

  const currentSlideLoaded = Boolean(activeSlides[visibleIndex] && loadedImages[activeSlides[visibleIndex].src]);

  return (
    <section className="relative min-h-screen overflow-hidden px-4 pb-12 pt-28 sm:px-6 sm:pt-32">
      <div className="absolute inset-0 bg-[linear-gradient(140deg,#1b140f_0%,#30231a_52%,#1a1310_100%)]" />
      <div className="absolute inset-0 opacity-90 [background-image:radial-gradient(circle_at_18%_24%,rgba(214,101,56,0.24),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(255,246,222,0.12),transparent_24%)]" />

      {activeSlides.map((slide, index) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
          style={{ opacity: index === visibleIndex && loadedImages[slide.src] ? 1 : 0 }}
        >
          <img
            src={getImagePath(slide.src)}
            alt={slide.alt}
            className="h-full w-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
          />
        </div>
      ))}

      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: currentSlideLoaded ? 0 : 1 }}
      >
        <div className="h-full w-full bg-[linear-gradient(135deg,rgba(52,39,29,0.9),rgba(26,20,16,0.96))]" />
        <div className="absolute inset-0 opacity-80 [background-image:radial-gradient(circle_at_25%_20%,rgba(214,101,56,0.24),transparent_24%),radial-gradient(circle_at_72%_30%,rgba(255,244,220,0.08),transparent_20%)]" />
      </div>

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
        {activeSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setRequestedIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === requestedIndex ? "w-10 bg-accent" : "w-4 bg-surface/45"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
