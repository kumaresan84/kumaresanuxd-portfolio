"use client";

import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type LightboxImage = { src: string; section?: string };

export default function Lightbox({
  images,
  index,
  title,
  onClose,
  onPrev,
  onNext,
}: {
  images: LightboxImage[];
  index: number | null;
  title: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const open = index !== null;
  const many = images.length > 1;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, onPrev, onNext]);

  if (!open) return null;
  const current = images[index];
  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-background"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — image viewer`}
    >
      {/* header */}
      <div
        className="flex items-center justify-between gap-4 px-6 py-5 lg:px-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-medium">{title}</p>
          {current.section && (
            <p className="mt-0.5 truncate text-sm text-muted">{current.section}</p>
          )}
        </div>
        <div className="flex flex-none items-center gap-4">
          {many && (
            <span className="text-sm tabular-nums text-muted">
              {index + 1} / {images.length}
            </span>
          )}
          <button
            onClick={onClose}
            aria-label="Close viewer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-foreground hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* stage */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-8 lg:px-24"
        onClick={onClose}
      >
        {many && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-foreground lg:left-8"
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={current.src}
          src={current.src}
          alt={current.section ? `${title} — ${current.section}` : title}
          onClick={(e) => e.stopPropagation()}
          className="lb-pop max-h-[80vh] max-w-[86vw] rounded-xl border border-border bg-surface object-contain shadow-lg"
        />

        {many && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-foreground lg:right-8"
          >
            <ChevronRight size={22} />
          </button>
        )}
      </div>
    </div>
  );
}
