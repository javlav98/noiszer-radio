"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const slides = [
  {
    title: "Signal Study",
    host: "Noiszer Radio",
    image: "/images/art2.png",
    position: "center 50%",
    sound: "Experimental / Ambient / Texture",
    description: "Atmospheric cuts, tape hiss, and late-night signal drift.",
  },
  {
    title: "No Signal",
    host: "jvii",
    image: "/images/no_signal.png",
    position: "center 50%",
    sound: "Ambient / Experimental",
    description: "Low-light atmospheres, soft interference, and overnight drift.",
  },
];

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const pointerStartX = useRef<number | null>(null);
  const pointerStartY = useRef<number | null>(null);
  const didDrag = useRef(false);
  const wheelLocked = useRef(false);

  const goToSlide = (index: number) => {
    const nextIndex = Math.min(Math.max(index, 0), slides.length - 1);
    setActiveIndex(nextIndex);
    setDragOffset(0);
  };

  const goToWrappedSlide = (index: number) => {
    const nextIndex = (index + slides.length) % slides.length;
    setActiveIndex(nextIndex);
    setDragOffset(0);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    event.preventDefault();
    pointerStartX.current = event.clientX;
    pointerStartY.current = event.clientY;
    didDrag.current = false;
    setIsDragging(true);
    setDragOffset(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (pointerStartX.current === null || pointerStartY.current === null) return;

    const deltaX = event.clientX - pointerStartX.current;
    const deltaY = event.clientY - pointerStartY.current;

    if (Math.abs(deltaX) < 4 || Math.abs(deltaX) < Math.abs(deltaY)) return;

    didDrag.current = true;
    setDragOffset(deltaX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    if (pointerStartX.current === null || pointerStartY.current === null) return;

    const delta = event.clientX - pointerStartX.current;
    const verticalDelta = event.clientY - pointerStartY.current;
    pointerStartX.current = null;
    pointerStartY.current = null;
    setIsDragging(false);
    setDragOffset(0);

    if (!didDrag.current || Math.abs(delta) < Math.abs(verticalDelta)) return;

    if (Math.abs(delta) > 24) {
      goToWrappedSlide(activeIndex + (delta < 0 ? 1 : -1));
    }
    didDrag.current = false;
  };

  const resetDrag = () => {
    pointerStartX.current = null;
    pointerStartY.current = null;
    didDrag.current = false;
    setDragOffset(0);
    setIsDragging(false);
  };

  const handleWheel = (event: React.WheelEvent<HTMLElement>) => {
    const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
    const shiftedVertical = event.shiftKey && Math.abs(event.deltaY) > 20;
    if ((!horizontal && !shiftedVertical) || wheelLocked.current) return;

    const delta = horizontal ? event.deltaX : event.deltaY;
    if (Math.abs(delta) < 18) return;

    event.preventDefault();
    event.stopPropagation();

    wheelLocked.current = true;
    window.setTimeout(() => {
      wheelLocked.current = false;
    }, 650);

    goToWrappedSlide(activeIndex + (delta > 0 ? 1 : -1));
  };

  return (
    <section
      className="relative flex h-[calc(100svh-80px)] flex-col overflow-hidden border-b-2 border-black bg-black text-white"
    >
      <div
        className={`relative min-h-0 flex-1 overflow-hidden ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          overscrollBehaviorX: "contain",
          touchAction: "pan-y",
          userSelect: "none",
        }}
        onPointerDown={handlePointerDown}
        onPointerCancel={resetDrag}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.title}
            className={`absolute inset-0 ${
              isDragging ? "" : "transition-transform duration-300 ease-out"
            }`}
            style={{
              transform: `translate3d(calc(${(index - activeIndex) * 100}% + ${dragOffset}px), 0, 0)`,
              willChange: "transform",
            }}
            aria-hidden={index !== activeIndex}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="select-none object-cover"
              style={{ objectPosition: slide.position }}
            />
            <div className="absolute inset-0 bg-black/15" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
          </div>
        ))}

        <div
          className="absolute bottom-3 left-3 z-20 grid border border-white/75 bg-black/35 text-white backdrop-blur-sm sm:left-5 md:left-6"
          onPointerDown={(event) => event.stopPropagation()}
          onWheel={(event) => event.stopPropagation()}
        >
          <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${slides.length}, minmax(0, 1fr))` }}
          >
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => goToSlide(index)}
                className={`h-1.5 w-8 border-r border-white/75 last:border-r-0 sm:w-10 ${
                  index === activeIndex
                    ? "bg-white"
                    : "bg-white/20 hover:bg-white/50"
                }`}
                aria-label={`Show ${slide.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
