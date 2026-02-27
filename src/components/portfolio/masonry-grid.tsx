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
    setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  if (filteredImages.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-lg text-muted">No images in this category yet. Check back soon.</p>
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
      className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-sm border border-foreground/10 text-left"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(33,27,21,0)_40%,rgba(33,27,21,0.45)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </button>
  );
}
