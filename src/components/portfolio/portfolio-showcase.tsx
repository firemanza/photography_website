/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/config/site";
import { portfolioImages } from "@/data/portfolio";
import { cn, getImagePath } from "@/lib/utils";

const tiltPattern = [
  "rotate-[-1.8deg]",
  "rotate-[1.1deg]",
  "rotate-[-0.9deg]",
  "rotate-[1.6deg]",
  "rotate-[-1.3deg]",
  "rotate-[0.5deg]",
  "rotate-[-0.4deg]",
];

const offsetPattern = [
  "translate-y-0",
  "translate-y-2",
  "-translate-y-1",
  "translate-y-1",
  "-translate-y-2",
  "translate-y-0",
];

const tapePattern = [
  "left-[12%] -top-3 -rotate-2",
  "right-[12%] -top-3 rotate-2",
  "left-[40%] -top-3 -rotate-1",
  "left-[20%] -top-3 rotate-1",
];

function frameWidth(width: number, height: number) {
  const ratio = width / height;
  if (ratio > 1.15) return "w-[255px] sm:w-[290px]";
  if (ratio < 0.9) return "w-[210px] sm:w-[235px]";
  return "w-[225px] sm:w-[250px]";
}

function imageWindowSize(width: number, height: number) {
  const ratio = width / height;
  if (ratio > 1.15) return "aspect-[16/10]";
  if (ratio < 0.9) return "aspect-[5/6]";
  return "aspect-square";
}

function categoryAccent(category: string) {
  if (category === "wildlife") return "bg-emerald-600";
  if (category === "portraits") return "bg-amber-700";
  if (category === "pets") return "bg-rose-700";
  return "bg-accent";
}

export default function PortfolioShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    if (activeCategory === "all") return portfolioImages;
    return portfolioImages.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    const preloadTargets = filteredImages.slice(0, 12);

    preloadTargets.forEach((image) => {
      const preloader = new window.Image();
      preloader.decoding = "async";
      preloader.src = getImagePath(image.src);
    });
  }, [filteredImages]);

  const previewImage =
    hoveredIndex !== null && hoveredIndex < filteredImages.length
      ? filteredImages[hoveredIndex]
      : filteredImages[0] ?? null;

  const previewIsPortrait = previewImage
    ? previewImage.width / previewImage.height < 0.9
    : false;

  const setCategory = (slug: string) => {
    setActiveCategory(slug);
    setHoveredIndex(null);
  };

  return (
    <>
      <div className="mb-8 hidden items-center justify-center gap-3 lg:flex">
        <span className="h-px w-16 bg-foreground/20" />
        <p className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
          Curated Contact Wall
        </p>
        <span className="h-px w-16 bg-foreground/20" />
      </div>

      <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3">
        <button
          onClick={() => setCategory("all")}
          className={cn(
            "rounded-sm border px-4 py-2 text-xs tracking-[0.14em] uppercase transition-all duration-200 sm:px-5",
            activeCategory === "all"
              ? "border-foreground bg-foreground text-surface"
              : "border-foreground/20 bg-surface/70 text-muted hover:border-accent hover:text-accent"
          )}
        >
          All Work
        </button>
        {siteConfig.categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => setCategory(category.slug)}
            className={cn(
              "rounded-sm border px-4 py-2 text-xs tracking-[0.14em] uppercase transition-all duration-200 sm:px-5",
              activeCategory === category.slug
                ? "border-foreground bg-foreground text-surface"
                : "border-foreground/20 bg-surface/70 text-muted hover:border-accent hover:text-accent"
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      {filteredImages.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-lg text-muted">No images in this category yet.</p>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(360px,30vw)] lg:gap-6">
          <div className="relative overflow-hidden rounded-sm border border-foreground/12 bg-[linear-gradient(150deg,rgba(250,245,234,0.98),rgba(236,226,205,0.95))] p-5 shadow-[0_20px_40px_rgba(35,28,20,0.12)] sm:p-7">
            <div className="pointer-events-none absolute -left-10 top-8 h-36 w-36 rounded-full bg-accent/10 blur-2xl" />
            <div className="pointer-events-none absolute -right-10 bottom-0 h-44 w-44 rounded-full bg-foreground/8 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(30,24,20,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(30,24,20,0.08)_1px,transparent_1px)] [background-size:32px_32px]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.35),transparent)]" />

            <div className="relative flex flex-wrap items-end justify-center gap-5 sm:gap-6">
              {filteredImages.map((image, index) => (
                <button
                  key={image.src}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onFocus={() => setHoveredIndex(index)}
                    className={cn(
                      "group relative overflow-visible bg-[#fffdf8] p-3 pb-7 text-left shadow-[0_16px_28px_rgba(35,28,20,0.16)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_40px_rgba(35,28,20,0.24)]",
                      frameWidth(image.width, image.height),
                      tiltPattern[index % tiltPattern.length],
                      offsetPattern[index % offsetPattern.length],
                    hoveredIndex === index && "ring-2 ring-accent/45"
                  )}
                    style={{ animation: `slide-up 0.5s ease-out ${index * 35}ms both` }}
                  >
                    <span
                      className={cn(
                        "pointer-events-none absolute z-10 h-5 w-14 rounded-[2px] border border-amber-200/70 bg-[linear-gradient(180deg,rgba(245,238,215,0.95),rgba(235,224,193,0.9))] shadow-sm",
                        tapePattern[index % tapePattern.length]
                      )}
                    />
                  <div
                    className={cn(
                      "grid place-items-center border border-foreground/12 bg-[#efe5d1] p-2",
                      imageWindowSize(image.width, image.height)
                    )}
                  >
                    <img
                      src={getImagePath(image.src)}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      loading={index < 8 ? "eager" : "lazy"}
                      fetchPriority={index < 4 ? "high" : "auto"}
                      decoding="async"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                        Frame {String(index + 1).padStart(2, "0")}
                      </p>
                      <span
                        className={cn("h-1.5 w-8 rounded-full opacity-85", categoryAccent(image.category))}
                        aria-hidden="true"
                      />
                    </div>
                </button>
              ))}
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-20 overflow-hidden rounded-sm border border-foreground/16 bg-[linear-gradient(170deg,#fffef9,#f5ebd8)] p-3 shadow-[0_24px_60px_rgba(25,20,14,0.28)]">
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#d66538,#c63d2f,#d66538)]" />
              <div className="mb-2 flex items-center justify-between border-b border-foreground/12 pb-2">
                <span className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                  Live Preview
                </span>
                <span className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                  {hoveredIndex !== null ? String(hoveredIndex + 1).padStart(2, "0") : "01"}
                </span>
              </div>
              <div
                className={cn(
                  "grid w-full place-items-center border border-foreground/12 bg-[#efe5d1] p-3 shadow-inner",
                  previewIsPortrait ? "aspect-[4/5] max-h-[80dvh]" : "aspect-[16/10] max-h-[66dvh]"
                )}
              >
                {previewImage ? (
                  <img
                    src={getImagePath(previewImage.src)}
                    alt=""
                    width={previewImage.width}
                    height={previewImage.height}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
