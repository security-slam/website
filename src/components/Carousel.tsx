import React, { useState, useEffect, useCallback } from "react";

export interface CarouselProps {
  images: string[];
  autoAdvanceMs?: number;
  ariaLabel?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  images,
  autoAdvanceMs,
  ariaLabel = "Image carousel"
}) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(
    () => typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const goPrev = useCallback(() => {
    setIndex((i) => (i <= 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setIndex((i) => (i >= images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    if (paused || images.length <= 1 || autoAdvanceMs == null || autoAdvanceMs <= 0) return;
    const id = setInterval(goNext, autoAdvanceMs);
    return () => clearInterval(id);
  }, [autoAdvanceMs, images.length, goNext, index, paused]);

  if (images.length === 0) return null;

  const showControls = images.length > 1;

  return (
    <div
      className="carousel"
      role="region"
      aria-label={ariaLabel}
      style={{
        position: "relative",
        aspectRatio: "4 / 3",
        width: "100%",
        maxWidth: "400px",
        borderRadius: "var(--gf-radius-lg)",
        overflow: "hidden",
        backgroundColor: "var(--gf-color-surface-subtle)"
      }}
    >
      <img
        src={images[index]}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block"
        }}
      />
      {showControls && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="carousel-btn carousel-btn-prev"
            style={{
              position: "absolute",
              left: "var(--gf-space-md)",
              top: "50%",
              transform: "translateY(-50%)",
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "var(--gf-radius-pill)",
              border: "none",
              background: "var(--gf-color-surface)",
              color: "var(--gf-color-accent)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.25rem",
              lineHeight: 1,
              boxShadow: "var(--gf-shadow-surface)"
            }}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="carousel-btn carousel-btn-next"
            style={{
              position: "absolute",
              right: "var(--gf-space-md)",
              top: "50%",
              transform: "translateY(-50%)",
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "var(--gf-radius-pill)",
              border: "none",
              background: "var(--gf-color-surface)",
              color: "var(--gf-color-accent)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.25rem",
              lineHeight: 1,
              boxShadow: "var(--gf-shadow-surface)"
            }}
          >
            ›
          </button>
          <div
            className="carousel-dots"
            role="tablist"
            aria-label="Slide indicators"
            style={{
              position: "absolute",
              bottom: "var(--gf-space-md)",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "var(--gf-space-sm)",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {autoAdvanceMs != null && autoAdvanceMs > 0 && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                aria-pressed={paused}
                className="carousel-btn"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "var(--gf-radius-pill)",
                  border: "none",
                  padding: 0,
                  background: "var(--gf-color-surface)",
                  color: "var(--gf-color-accent)",
                  cursor: "pointer",
                  fontSize: "0.7rem",
                  lineHeight: 1
                }}
              >
                {paused ? "▶" : "❚❚"}
              </button>
            )}
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to image ${i + 1}`}
                onClick={() => setIndex(i)}
                className="carousel-dot"
                style={{
                  width: i === index ? "1.25rem" : "0.5rem",
                  height: "0.5rem",
                  boxSizing: "content-box",
                  padding: "0.5rem 0.25rem",
                  backgroundClip: "content-box",
                  borderRadius: "var(--gf-radius-pill)",
                  border: "none",
                  background: i === index ? "var(--gf-color-accent)" : "var(--gf-color-surface)",
                  cursor: "pointer",
                  transition: "width 0.2s ease, background 0.2s ease"
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
