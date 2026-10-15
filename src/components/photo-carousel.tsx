import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { carouselImages } from "@/lib/security-slam-data";

export function PhotoCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % carouselImages.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const previous = () => setIndex((value) => (value - 1 + carouselImages.length) % carouselImages.length);
  const next = () => setIndex((value) => (value + 1) % carouselImages.length);

  return (
    <div className="photo-carousel" role="region" aria-label="Slam photos">
      {carouselImages.map((image, imageIndex) => (
        <img
          key={image}
          src={image}
          alt=""
          className={imageIndex === index ? "carousel-image is-active" : "carousel-image"}
          loading={imageIndex === 0 ? "eager" : "lazy"}
        />
      ))}
      <div className="photo-scrim" />
      <div className="carousel-controls">
        <Button type="button" variant="carousel" size="icon" onClick={previous} aria-label="Previous image">
          <ChevronLeft />
        </Button>
        <div className="carousel-dots" role="tablist" aria-label="Slide indicators">
          {carouselImages.map((image, dotIndex) => (
            <button
              key={image}
              type="button"
              className={dotIndex === index ? "carousel-dot is-active" : "carousel-dot"}
              onClick={() => setIndex(dotIndex)}
              aria-label={`Go to image ${dotIndex + 1}`}
              aria-selected={dotIndex === index}
              role="tab"
            />
          ))}
        </div>
        <Button type="button" variant="carousel" size="icon" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play slideshow" : "Pause slideshow"}>
          {paused ? <Play /> : <Pause />}
        </Button>
        <Button type="button" variant="carousel" size="icon" onClick={next} aria-label="Next image">
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}