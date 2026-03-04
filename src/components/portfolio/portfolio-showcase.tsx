/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState } from "react";
import { siteConfig } from "@/config/site";
import { portfolioImages } from "@/data/portfolio";
import { cn, getImagePath } from "@/lib/utils";
import Lightbox from "@/components/portfolio/lightbox";

function categoryLabel(slug: string) {
  if (slug === "all") return "All Work";
  return siteConfig.categories.find((category) => category.slug === slug)?.label ?? slug;
}

export default function PortfolioShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    if (activeCategory === "all") return portfolioImages;
    return portfolioImages.filter((image) => image.category === activeCategory);
  }, [activeCategory]);

  const featuredImage = filteredImages[0] ?? null;

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const nextImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % filteredImages.length);
  };

  const prevImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  if (filteredImages.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-lg text-muted">No images in this category yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-10">
        <div className="rounded-[2rem] border border-foreground/12 bg-[linear-gradient(180deg,rgba(251,247,236,0.98),rgba(244,236,219,0.95))] p-4 shadow-[0_24px_60px_rgba(35,28,20,0.12)] sm:p-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="relative overflow-hidden rounded-[1.65rem] border border-foreground/12 bg-[#e8dcc4]">
              {featuredImage ? (
                <>
                  <img
                    src={getImagePath(featuredImage.src)}
                    alt={featuredImage.alt}
                    width={featuredImage.width}
                    height={featuredImage.height}
                    className="h-full min-h-[18rem] w-full object-cover sm:min-h-[24rem] lg:min-h-[32rem]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,16,13,0.08)_0%,rgba(20,16,13,0.02)_35%,rgba(20,16,13,0.72)_100%)]" />
                  <div className="absolute inset-x-4 bottom-4 rounded-[1.25rem] border border-white/10 bg-black/25 px-4 py-4 backdrop-blur-sm sm:inset-x-5 sm:bottom-5">
                    <p className="font-mono text-[10px] tracking-[0.22em] text-white/72 uppercase">
                      Featured Selection
                    </p>
                    <p className="mt-2 font-heading text-2xl text-surface sm:text-3xl">
                      {featuredImage.title ?? "Untitled"}
                    </p>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-surface/80 sm:text-base">
                      {categoryLabel(activeCategory)}
                    </p>
                  </div>
                </>
              ) : null}
            </div>

            <div className="space-y-5">
              <div>
                <p className="font-mono text-[10px] tracking-[0.24em] text-muted uppercase">Mobile-first gallery</p>
                <h2 className="mt-3 font-heading text-4xl leading-tight text-foreground sm:text-5xl">
                  Cleaner browsing, better image focus.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
                  The portfolio now opens with a clear lead image and simple category controls, so
                  mobile visitors can scan, tap, and open work without fighting a decorative layout.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={cn(
                    "cursor-pointer rounded-full border px-4 py-2 text-xs tracking-[0.16em] uppercase transition-colors duration-200 sm:px-5",
                    activeCategory === "all"
                      ? "border-foreground bg-foreground text-surface"
                      : "border-foreground/18 bg-surface/75 text-muted hover:border-accent hover:text-accent"
                  )}
                >
                  All Work
                </button>
                {siteConfig.categories.map((category) => (
                  <button
                    key={category.slug}
                    onClick={() => setActiveCategory(category.slug)}
                    className={cn(
                      "cursor-pointer rounded-full border px-4 py-2 text-xs tracking-[0.16em] uppercase transition-colors duration-200 sm:px-5",
                      activeCategory === category.slug
                        ? "border-foreground bg-foreground text-surface"
                        : "border-foreground/18 bg-surface/75 text-muted hover:border-accent hover:text-accent"
                    )}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-[1.35rem] border border-foreground/10 bg-surface/72 px-4 py-4">
                  <p className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase">Category</p>
                  <p className="mt-2 text-base text-foreground">{categoryLabel(activeCategory)}</p>
                </div>
                <div className="rounded-[1.35rem] border border-foreground/10 bg-surface/72 px-4 py-4">
                  <p className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase">Frames</p>
                  <p className="mt-2 text-base text-foreground">{filteredImages.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredImages.map((image, index) => (
            <button
              key={`${image.src}-${activeCategory}`}
              onClick={() => openLightbox(index)}
              className="group cursor-pointer overflow-hidden rounded-[1.5rem] border border-foreground/10 bg-surface/80 text-left shadow-[0_14px_36px_rgba(35,28,20,0.08)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-[0_20px_44px_rgba(35,28,20,0.12)]"
            >
              <div className="relative overflow-hidden bg-[#e8dcc4]">
                <img
                  src={getImagePath(image.src)}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading={index < 6 ? "eager" : "lazy"}
                  fetchPriority={index < 3 ? "high" : "auto"}
                  decoding="async"
                  className="h-72 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] sm:h-80"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(33,27,21,0)_44%,rgba(33,27,21,0.58)_100%)]" />
                <div className="absolute left-4 top-4 rounded-full border border-white/16 bg-black/20 px-3 py-1 font-mono text-[10px] tracking-[0.22em] text-white/74 uppercase backdrop-blur-sm">
                  {categoryLabel(image.category)}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-5">
                <div className="min-w-0">
                  <p className="truncate font-heading text-2xl text-foreground">
                    {image.title ?? `Frame ${String(index + 1).padStart(2, "0")}`}
                  </p>
                  <p className="mt-1 truncate text-sm text-muted">
                    Tap to view full frame
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-foreground/10 px-3 py-2 font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedIndex !== null ? (
        <Lightbox
          images={filteredImages}
          currentIndex={selectedIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      ) : null}
    </>
  );
}
