"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

type ShowQueueItem = {
  status: string;
  title: string;
  host: string;
  genre: string;
  slot: string;
  image: string;
  live: boolean;
};

function ArrowButton({
  direction,
  onClick,
  tone = "light",
}: {
  direction: "left" | "right";
  onClick: () => void;
  tone?: "light" | "dark";
}) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
        tone === "dark"
          ? "border-white/24 text-white/72 hover:bg-white hover:text-black"
          : "border-[var(--rule)] text-black/55 hover:bg-[var(--ink)] hover:text-white"
      }`}
      aria-label={direction === "left" ? "Previous shows" : "Next shows"}
    >
      <Icon size={18} strokeWidth={1.8} />
    </button>
  );
}

export default function ShowQueue({ shows }: { shows: ShowQueueItem[] }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const card = scroller.querySelector("article");
    const distance =
      card instanceof HTMLElement
        ? card.offsetWidth + 16
        : scroller.clientWidth * 0.85;

    scroller.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  return (
    <section className="border-b border-black bg-[var(--ink)] px-2 pb-4 pt-7 text-white sm:px-3 lg:px-4 lg:pb-4 lg:pt-8">
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end lg:mb-6">
        <div>
          <p className="flex items-center gap-2 text-sm text-white/55">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
            Live transmission
          </p>
          <h2 className="mt-2 text-4xl font-normal sm:text-5xl">
            Current and next
          </h2>
        </div>
        <div className="flex items-end justify-between gap-4 sm:flex-col sm:items-end">
          <div className="flex shrink-0 gap-2">
            <ArrowButton
              direction="left"
              onClick={() => scroll("left")}
              tone="dark"
            />
            <ArrowButton
              direction="right"
              onClick={() => scroll("right")}
              tone="dark"
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          ref={scrollerRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1"
        >
          {shows.map((show, index) => (
            <article
              key={`${show.status}-${show.title}`}
              className={`group min-w-[18rem] snap-start border bg-[#151515] md:min-w-[22rem] lg:min-w-[calc((100%_-_3rem)/4)] ${
                show.live ? "border-white/45" : "border-white/14"
              }`}
            >
              <div className="flex h-11 items-center justify-between border-b border-white/14 px-4 text-[11px] uppercase tracking-[0.18em] text-white/55">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span className="flex items-center gap-2">
                  {show.live ? (
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
                  ) : null}
                  {show.status}
                </span>
              </div>

              <div className="relative aspect-square overflow-hidden bg-black">
                <Image
                  src={show.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 22rem, 18rem"
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  priority={show.live}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
                <p className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.18em] text-white/70">
                  Noiszer Radio / {show.slot}
                </p>
              </div>

              <div className="p-5">
                <h3 className="text-2xl font-normal leading-tight text-white">
                  {show.title}
                </h3>
                <div className="mt-5 grid grid-cols-[1fr_auto] gap-4 border-t border-white/14 pt-4 text-sm">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">
                      Host
                    </p>
                    <p className="mt-1.5 text-white/78">{show.host}</p>
                  </div>
                  <div className="max-w-36 text-right">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">
                      Frequency
                    </p>
                    <p className="mt-1.5 leading-5 text-white/60">{show.genre}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
