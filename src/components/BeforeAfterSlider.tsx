"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";

const slides = [
  {
    src: "/before-after-glass.jpg",
    alt: "Window washing before and after",
    label: "Window Washing",
  },
  {
    src: "/before-after-patio.jpg",
    alt: "Power washing before and after",
    label: "Power Washing",
  },
  {
    src: "/before-after-driveway.jpg",
    alt: "Driveway power washing before and after",
    label: "Power Washing",
  },
  {
    src: "/before-after-hottub.jpg",
    alt: "Hot tub power washing before and after",
    label: "Power Washing",
  },
];

export default function BeforeAfterSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const slideWidth = container.offsetWidth;
    container.scrollTo({ left: slideWidth * index, behavior: "smooth" });
  }, []);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const index = Math.round(container.scrollLeft / container.offsetWidth);
    setActiveIndex(index);
  }, []);

  const prev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const next = () =>
    scrollToIndex(Math.min(slides.length - 1, activeIndex + 1));

  // Drag handlers
  const onPointerDown = (e: React.PointerEvent) => {
    const container = scrollRef.current;
    if (!container) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, scrollLeft: container.scrollLeft };
    container.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const container = scrollRef.current;
    if (!container) return;
    const dx = e.clientX - dragStart.current.x;
    container.scrollLeft = dragStart.current.scrollLeft - dx;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const container = scrollRef.current;
    if (!container) return;
    container.releasePointerCapture(e.pointerId);
    const index = Math.round(container.scrollLeft / container.offsetWidth);
    scrollToIndex(index);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="relative group">
      {/* Slides */}
      <div
        ref={scrollRef}
        className="flex overflow-x-hidden snap-x snap-mandatory touch-pan-x"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {slides.map((slide) => (
          <div
            key={slide.src}
            className="w-full flex-shrink-0 snap-center"
          >
            <div className="aspect-[16/9] sm:aspect-[2/1] relative rounded-2xl overflow-hidden mx-auto max-w-5xl">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover select-none pointer-events-none"
                draggable={false}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <span className="text-white font-semibold text-lg">
                  {slide.label}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrow Buttons */}
      {activeIndex > 0 && (
        <button
          onClick={prev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          aria-label="Previous slide"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      {activeIndex < slides.length - 1 && (
        <button
          onClick={next}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          aria-label="Next slide"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            onClick={() => scrollToIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === activeIndex ? "bg-brand-blue" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
