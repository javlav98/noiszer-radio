"use client";

import Image from "next/image";
import Link from "next/link";
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
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--rule)] text-black/55 transition hover:bg-[var(--ink)] hover:text-white"
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
      card instanceof HTMLElement ? card.offsetWidth + 16 : scroller.clientWidth * 0.85;

    scroller.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  return (
    <section className="border-b border-[var(--rule)] px-5 py-10 sm:px-8 lg:px-12 lg:py-12">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-[var(--muted)]">On air</p>
          <h2 className="mt-3 text-4xl font-normal sm:text-5xl">
            Current and next
          </h2>
        </div>
        <div className="flex items-end justify-between gap-4 sm:flex-col sm:items-end">
          <p className="max-w-sm text-sm leading-6 text-[var(--muted)] sm:text-right">
            A quick look at the live broadcast and what is coming through the
            station queue.
          </p>
          <div className="flex shrink-0 gap-2">
            <ArrowButton direction="left" onClick={() => scroll("left")} />
            <ArrowButton direction="right" onClick={() => scroll("right")} />
          </div>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          ref={scrollerRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1"
        >
          {shows.map((show) => (
            <article
              key={`${show.status}-${show.title}`}
              className="min-w-[18rem] snap-start bg-[var(--surface)] md:min-w-[22rem] lg:min-w-[calc((100%_-_3rem)/4)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={show.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 22rem, 18rem"
                  className="object-cover"
                  priority={show.live}
                />
                <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-white/86 px-3 py-1.5 text-xs font-medium text-black backdrop-blur-md">
                  {show.live ? (
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
                  ) : null}
                  <span>{show.status}</span>
                </div>
              </div>

              <div className="border border-t-0 border-[var(--rule)] p-5">
                <p className="text-sm text-[var(--muted)]">{show.slot}</p>
                <h3 className="mt-4 text-3xl font-normal leading-none">
                  {show.title}
                </h3>
                <p className="mt-3 text-sm text-black/70">Hosted by {show.host}</p>
                <p className="mt-5 text-sm leading-6 text-[var(--muted)]">
                  {show.genre}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/schedule"
          className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--ink)] px-5 text-sm font-medium text-white transition hover:bg-black/80"
        >
          Full schedule
        </Link>
        <Link
          href="/archive"
          className="inline-flex h-11 items-center justify-center rounded-full border border-[var(--rule)] px-5 text-sm font-medium transition hover:border-black/30"
        >
          Archive
        </Link>
      </div>
    </section>
  );
}
