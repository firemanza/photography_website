"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useCallback, useMemo, useState } from "react";
import type { PortfolioImage } from "@/data/portfolio";
import { getImagePath } from "@/lib/utils";

interface LightboxProps {
  images: PortfolioImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const current = images[currentIndex];
  const [showFullResolution, setShowFullResolution] = useState(false);
  const [fullResolutionObjectUrl, setFullResolutionObjectUrl] = useState<string | null>(null);
  const [fullResolutionProgress, setFullResolutionProgress] = useState<number | null>(null);
  const [fullResolutionDownloadedBytes, setFullResolutionDownloadedBytes] = useState(0);
  const [isLoadingFullResolution, setIsLoadingFullResolution] = useState(false);
  const [fullResolutionError, setFullResolutionError] = useState<string | null>(null);

  useEffect(() => {
    setShowFullResolution(false);
    setFullResolutionProgress(null);
    setFullResolutionDownloadedBytes(0);
    setIsLoadingFullResolution(false);
    setFullResolutionError(null);
    setFullResolutionObjectUrl((currentUrl) => {
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
      return null;
    });
  }, [currentIndex]);

  const previewSrc = useMemo(() => {
    if (!current) return null;
    return current.displaySrc ?? current.src;
  }, [current]);

  const fullSrc = useMemo(() => {
    if (!current) return null;
    return current.fullSrc ?? current.displaySrc ?? current.src;
  }, [current]);

  const canShowFullResolution = Boolean(fullSrc && previewSrc && fullSrc !== previewSrc);
  const renderedSrc = showFullResolution
    ? fullResolutionObjectUrl ?? previewSrc ?? current?.src ?? null
    : previewSrc ?? current?.src ?? null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          onNext();
          break;
        case "ArrowLeft":
          onPrev();
          break;
      }
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (!showFullResolution || !fullSrc || fullResolutionObjectUrl) {
      return;
    }

    const controller = new AbortController();
    let objectUrl: string | null = null;

    async function loadFullResolution() {
      setIsLoadingFullResolution(true);
      setFullResolutionError(null);
      setFullResolutionProgress(null);
      setFullResolutionDownloadedBytes(0);

      try {
        const targetSrc = getImagePath(fullSrc ?? current.src);
        const response = await fetch(targetSrc, { signal: controller.signal });

        if (!response.ok || !response.body) {
          throw new Error("Could not load full resolution image.");
        }

        const totalBytesHeader = response.headers.get("content-length");
        const totalBytes = totalBytesHeader ? Number(totalBytesHeader) : null;
        const reader = response.body.getReader();
        const chunks: Uint8Array[] = [];
        let receivedBytes = 0;

        while (true) {
          const { done, value } = await reader.read();

          if (done) break;
          if (!value) continue;

          chunks.push(value);
          receivedBytes += value.length;
          setFullResolutionDownloadedBytes(receivedBytes);

          if (totalBytes && totalBytes > 0) {
            setFullResolutionProgress(Math.min(100, Math.round((receivedBytes / totalBytes) * 100)));
          }
        }

        const mergedBytes = new Uint8Array(receivedBytes);
        let offset = 0;

        chunks.forEach((chunk) => {
          mergedBytes.set(chunk, offset);
          offset += chunk.length;
        });

        const blob = new Blob([mergedBytes]);
        objectUrl = URL.createObjectURL(blob);
        setFullResolutionObjectUrl(objectUrl);
        setFullResolutionProgress(100);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setShowFullResolution(false);
        setFullResolutionError(error instanceof Error ? error.message : "Could not load full resolution image.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingFullResolution(false);
        }
      }
    }

    loadFullResolution();

    return () => {
      controller.abort();
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [fullResolutionObjectUrl, fullSrc, showFullResolution]);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/85 px-3 backdrop-blur-sm sm:px-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-sm border border-surface/30 text-surface/80 transition-colors hover:text-surface"
        aria-label="Close lightbox"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-sm border border-surface/30 bg-black/25 text-surface/80 transition-colors hover:text-surface sm:left-5"
        aria-label="Previous image"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-sm border border-surface/30 bg-black/25 text-surface/80 transition-colors hover:text-surface sm:right-5"
        aria-label="Next image"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="relative max-h-[86vh] max-w-[92vw]" onClick={(e) => e.stopPropagation()}>
        {renderedSrc ? (
          <img
            src={getImagePath(renderedSrc)}
            alt={current.alt}
            className="max-h-[86vh] max-w-[92vw] rounded-sm object-contain"
          />
        ) : null}
        {showFullResolution && isLoadingFullResolution ? (
          <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-surface/20 bg-black/55 px-4 py-3 text-surface backdrop-blur">
            <p className="text-xs uppercase tracking-[0.16em] text-surface/70">Loading full resolution</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface/20">
              <div
                className="h-full rounded-full bg-surface transition-all"
                style={{ width: `${fullResolutionProgress ?? 18}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-surface/80">
              <span>
                {fullResolutionProgress !== null
                  ? `${fullResolutionProgress}%`
                  : `${(fullResolutionDownloadedBytes / (1024 * 1024)).toFixed(2)} MB downloaded`}
              </span>
              <span>Preparing image…</span>
            </div>
          </div>
        ) : null}
        {fullResolutionError ? (
          <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-red-300/40 bg-red-950/65 px-4 py-3 text-sm text-red-100 backdrop-blur">
            {fullResolutionError}
          </div>
        ) : null}
      </div>

      <div className="absolute bottom-16 left-1/2 flex -translate-x-1/2 items-center gap-3">
        <div className="rounded-sm border border-surface/25 px-3 py-1 text-xs tracking-[0.1em] text-surface/80 uppercase">
          {currentIndex + 1} / {images.length}
        </div>
        {canShowFullResolution ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowFullResolution((value) => !value);
            }}
            className="rounded-sm border border-surface/25 px-3 py-1 text-xs tracking-[0.1em] text-surface/85 uppercase transition-colors hover:border-surface/50 hover:text-surface"
          >
            {showFullResolution ? "Show Web Size" : "Load Full Resolution"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
