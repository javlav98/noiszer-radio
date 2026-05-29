"use client";

import { useRef, useState } from "react";

const slides = [
  {
    title: "Velvet Haus",
    host: "Spud Bud",
    image: "/images/velvethaus.png",
    sound: "Dark House / Minimal / Leftfield",
    description: "Late-night house and underground cuts for after-dark listening.",
  },
  {
    title: "Dead Frequency",
    host: "Noiszer Radio",
    image: "/images/deadfrequency2.jpg",
    sound: "Hardcore Punk / Noise / Underground",
    description: "Fast, loud, raw selections with no soft edges.",
  },
  {
    title: "Sunday Fade",
    host: "Noiszer Radio",
    image: "/images/sundayfade4.jpg",
    sound: "Oldies / Soul / Slow Jams",
    description: "Warm records and faded soul for the end of the week.",
  },
  {
    title: "Groove Therapy",
    host: "Noiszer Radio",
    image: "/images/groovetherapy.jpg",
    sound: "Funk / Disco / Soul",
    description: "Feel-good funk, disco, and soulful grooves.",
  },
  {
    title: "After Hours",
    host: "Noiszer Radio",
    image: "/images/afterhours.png",
    sound: "Rap / Trap / Underground",
    description: "Gritty rap, trap, and late-night underground records.",
  },
  {
    title: "Ctrl+Alt+Delete",
    host: "Noiszer Radio",
    image: "/images/ctrlaltdelete.jpg",
    sound: "Electronica / Leftfield / Experimental",
    description: "Alternative electronic sounds, texture, and experiments.",
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
  const activeSlide = slides[activeIndex];

  const goToSlide = (index: number) => {
    const nextIndex = Math.min(Math.max(index, 0), slides.length - 1);
    setActiveIndex(nextIndex);
    setDragOffset(0);
  };

  const goToPrevious = () => {
    goToSlide(activeIndex - 1);
  };

  const goToNext = () => {
    goToSlide(activeIndex + 1);
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
    const atStart = activeIndex === 0 && deltaX > 0;
    const atEnd = activeIndex === slides.length - 1 && deltaX < 0;
    setDragOffset(atStart || atEnd ? deltaX * 0.22 : deltaX);
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
      goToSlide(activeIndex + (delta < 0 ? 1 : -1));
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

    goToSlide(activeIndex + (delta > 0 ? 1 : -1));
  };

  return (
    <section
      className={`relative h-[calc(100svh-104px)] overflow-hidden border-b-2 border-black bg-black text-white lg:h-[calc(100svh-80px)] ${
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
      <div className="absolute inset-0">
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
            <img
              src={slide.image}
              alt={slide.title}
              draggable={false}
              className="block h-full w-full select-none object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </div>

      <div
        className="max-w-[min(24rem,calc(100%-2rem))] border-2 border-black bg-white p-3 text-black shadow-[4px_4px_0_#000] sm:p-4"
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "1.5rem",
          zIndex: 20,
        }}
      >
        <h1 className="text-2xl font-black uppercase leading-none sm:text-3xl">
          {activeSlide.title}
        </h1>
        <p className="mt-2 text-[9px] font-black uppercase text-black/55">
          {activeSlide.sound}
        </p>
        <p className="mt-3 max-w-xs text-xs leading-snug text-black/65">
          {activeSlide.description}
        </p>
      </div>

      <div
        className="grid border-2 border-black bg-white text-black shadow-[4px_4px_0_#000]"
        onPointerDown={(event) => event.stopPropagation()}
        onWheel={(event) => event.stopPropagation()}
        style={{
          position: "absolute",
          right: "1.5rem",
          bottom: "1.5rem",
          zIndex: 20,
        }}
      >
        <div className="grid grid-cols-6">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => goToSlide(index)}
              className={`h-3 w-4 border-r-2 border-black last:border-r-0 ${
                index === activeIndex ? "bg-black" : "bg-white hover:bg-black/20"
              }`}
              aria-label={`Show ${slide.title}`}
            />
          ))}
        </div>
        <p className="border-t-2 border-black py-1 text-center text-[9px] font-black uppercase leading-none">
          {activeIndex + 1} / {slides.length}
        </p>
      </div>
    </section>
  );
}
