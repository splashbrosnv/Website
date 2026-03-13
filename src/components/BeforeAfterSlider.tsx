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
  const barRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isBarDragging, setIsBarDragging] = useState(false);
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
    const maxScroll = container.scrollWidth - container.offsetWidth;
    setScrollProgress(maxScroll > 0 ? container.scrollLeft / maxScroll : 0);
  }, []);

  const prev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const next = () =>
    scrollToIndex(Math.min(slides.length - 1, activeIndex + 1));

  // Drag handlers (mouse only — touch uses native scroll + snap)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
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

  // Scrubber bar drag handlers — smooth continuous scroll
  const scrollToRatio = useCallback((ratio: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const maxScroll = container.scrollWidth - container.offsetWidth;
    container.scrollTo({ left: ratio * maxScroll });
  }, []);

  const onBarPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsBarDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    jumpBarToPosition(e.clientX);
  };

  const onBarPointerMove = (e: React.PointerEvent) => {
    if (!isBarDragging) return;
    jumpBarToPosition(e.clientX);
  };

  const onBarPointerUp = (e: React.PointerEvent) => {
    if (!isBarDragging) return;
    setIsBarDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    // Snap to nearest slide on release
    const container = scrollRef.current;
    if (!container) return;
    const index = Math.round(container.scrollLeft / container.offsetWidth);
    scrollToIndex(index);
  };

  const jumpBarToPosition = (clientX: number) => {
    const bar = barRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    scrollToRatio(ratio);
  };

  // Thumb width as fraction, and max left so thumb stays within track
  const thumbFraction = 1 / slides.length;
  const thumbLeft = scrollProgress * (1 - thumbFraction) * 100;

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
        className={`flex overflow-x-auto touch-pan-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isBarDragging ? "" : "snap-x snap-mandatory"}`}
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

      {/* Scrubber Bar — horizontal pill slider */}
      <div className="flex justify-center mt-5 px-4">
        <div
          ref={barRef}
          className="relative w-36 h-1.5 bg-gray-300/80 rounded-full cursor-pointer touch-none"
          onPointerDown={onBarPointerDown}
          onPointerMove={onBarPointerMove}
          onPointerUp={onBarPointerUp}
          onPointerCancel={onBarPointerUp}
        >
          {/* Sliding pill thumb */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-gray-500 ${isBarDragging ? "" : "transition-all duration-300"}`}
            style={{
              width: `${thumbFraction * 100}%`,
              left: `${thumbLeft}%`,
            }}
          />
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
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
