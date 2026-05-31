"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Velvet Haus",
    host: "Spud Bud",
    image: "/images/velvethaus.png",
    position: "center 50%",
    sound: "Dark House / Minimal / Leftfield",
    description: "Late-night house and underground cuts for after-dark listening.",
  },
  {
    title: "Dead Frequency",
    host: "Noiszer Radio",
    image: "/images/deadfrequency2.jpg",
    position: "center 50%",
    sound: "Hardcore Punk / Noise / Underground",
    description: "Fast, loud, raw selections with no soft edges.",
  },
  {
    title: "Sunday Fade",
    host: "Noiszer Radio",
    image: "/images/sundayfade4.jpg",
    position: "center 42%",
    sound: "Oldies / Soul / Slow Jams",
    description: "Warm records and faded soul for the end of the week.",
  },
  {
    title: "Groove Therapy",
    host: "Noiszer Radio",
    image: "/images/groovetherapy.jpg",
    position: "center 50%",
    sound: "Funk / Disco / Soul",
    description: "Feel-good funk, disco, and soulful grooves.",
  },
  {
    title: "After Hours",
    host: "Noiszer Radio",
    image: "/images/afterhours.png",
    position: "center 50%",
    sound: "Rap / Trap / Underground",
    description: "Gritty rap, trap, and late-night underground records.",
  },
  {
    title: "Ctrl+Alt+Delete",
    host: "Noiszer Radio",
    image: "/images/ctrlaltdelete.jpg",
    position: "center 44%",
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
      className="relative flex h-[calc(100svh-104px)] flex-col overflow-hidden border-b-2 border-black bg-black text-white lg:h-[calc(100svh-80px)]"
    >
      <div
        className={`relative min-h-0 flex-1 overflow-hidden border-b-2 border-black ${
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
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent" />
          </div>
        ))}

        <div
          className="absolute right-3 top-3 z-20 hidden border-2 border-black bg-white text-black md:grid"
          onPointerDown={(event) => event.stopPropagation()}
          onWheel={(event) => event.stopPropagation()}
        >
          <div className="grid grid-cols-6">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => goToSlide(index)}
                className={`h-2 w-4 border-r-2 border-black last:border-r-0 sm:w-5 ${
                  index === activeIndex
                    ? "bg-black"
                    : "bg-white hover:bg-black/20"
                }`}
                aria-label={`Show ${slide.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        className="relative z-20 grid shrink-0 bg-white text-black md:grid-cols-[minmax(0,1.25fr)_minmax(12rem,0.85fr)_minmax(0,1fr)]"
        onPointerDown={(event) => event.stopPropagation()}
        onWheel={(event) => event.stopPropagation()}
      >
        <section className="grid border-b-2 border-black md:hidden">
          <div className="grid grid-cols-6">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => goToSlide(index)}
                className={`h-2 border-r-2 border-black last:border-r-0 ${
                  index === activeIndex
                    ? "bg-black"
                    : "bg-white hover:bg-black/20"
                }`}
                aria-label={`Show ${slide.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>
        </section>

        <section className="border-b-2 border-black px-3 py-2 md:border-b-0 md:border-r-2 md:px-3 md:py-1.5">
          <h1 className="break-words text-2xl font-black uppercase leading-none sm:text-3xl md:text-2xl lg:text-3xl">
            {activeSlide.title}
          </h1>
          <p className="mt-1 text-[9px] font-black uppercase leading-none text-black/45">
            With {activeSlide.host}
          </p>
        </section>

        <section className="border-b-2 border-black px-3 py-2 md:border-b-0 md:border-r-2 md:px-3 md:py-1.5">
          <p className="text-xs font-black uppercase leading-tight sm:text-sm md:text-xs">
            {activeSlide.sound}
          </p>
        </section>

        <section className="px-3 py-2 md:px-3 md:py-1.5">
          <p className="max-w-2xl text-xs leading-snug text-black/70 sm:text-sm md:text-xs">
            {activeSlide.description}
          </p>
        </section>

        <section className="grid grid-cols-2 border-t-2 border-black md:hidden">
          <button
            type="button"
            onClick={() => goToWrappedSlide(activeIndex - 1)}
            className="flex h-10 items-center justify-center border-r-2 border-black bg-white text-black transition hover:bg-black hover:text-white"
            aria-label="Previous show"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>
          <button
            type="button"
            onClick={() => goToWrappedSlide(activeIndex + 1)}
            className="flex h-10 items-center justify-center bg-white text-black transition hover:bg-black hover:text-white"
            aria-label="Next show"
          >
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </section>
      </div>
    </section>
  );
}
