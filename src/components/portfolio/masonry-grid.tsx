/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { portfolioImages, type PortfolioImage } from "@/data/portfolio";
import Lightbox from "./lightbox";

export default function MasonryGrid() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = useMemo(() => {
    if (activeCategory === "all") return portfolioImages;
    return portfolioImages.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
  };

  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex - 1 + filteredImages.length) % filteredImages.length
    );
  };

  if (filteredImages.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-lg text-muted">
          No images in this category yet. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
        {filteredImages.map((image, index) => (
          <MasonryItem
            key={`${image.src}-${activeCategory}`}
            image={image}
            index={index}
            onClick={() => openLightbox(index)}
          />
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </>
  );
}

function MasonryItem({
  image,
  index,
  onClick,
}: {
  image: PortfolioImage;
  index: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-lg text-left"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-background/0 transition-all duration-300 group-hover:bg-background/30">
          <div className="flex h-full items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <svg
              className="h-8 w-8 text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
              />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}
