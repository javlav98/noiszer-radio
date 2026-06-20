"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type AlbumPick = {
  id: string;
  name: string;
  artist: string;
  image: string | null;
  year: string | null;
  genre: string | null;
  style: string | null;
};

function AlbumCard({ album }: { album: AlbumPick }) {
  return (
    <article className="min-w-[18rem] snap-start bg-[var(--surface)] md:min-w-[22rem] lg:min-w-[calc((100%_-_3rem)/4)]">
      <div className="relative aspect-square overflow-hidden bg-[var(--surface-muted)]">
        {album.image ? (
          <Image
            src={album.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center text-sm text-[var(--muted)]">
            No artwork
          </div>
        )}
      </div>
      <div className="border border-t-0 border-[var(--rule)] p-5">
        <p className="text-sm text-[var(--muted)]">{album.artist}</p>
        <h3 className="mt-3 text-2xl font-normal leading-tight">
          {album.name}
        </h3>
        <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
          {[album.year, album.genre || album.style].filter(Boolean).join(" / ")}
        </p>
      </div>
    </article>
  );
}

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
      aria-label={direction === "left" ? "Previous albums" : "Next albums"}
    >
      <Icon size={18} strokeWidth={1.8} />
    </button>
  );
}

export default function AlbumPicks() {
  const [albums, setAlbums] = useState<AlbumPick[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const card = scroller.querySelector("article, [data-album-skeleton]");
    const distance =
      card instanceof HTMLElement ? card.offsetWidth + 16 : scroller.clientWidth * 0.85;

    scroller.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    let active = true;

    async function loadAlbums() {
      try {
        const response = await fetch("/api/audiodb");
        if (!response.ok) throw new Error("Album request failed");

        const data = (await response.json()) as AlbumPick[];
        if (!active) return;

        setAlbums(data);
        setStatus("ready");
      } catch {
        if (!active) return;
        setStatus("error");
      }
    }

    loadAlbums();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="border-b border-[var(--rule)] px-5 py-10 sm:px-8 lg:px-12 lg:py-12">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm text-[var(--muted)]">Station picks</p>
          <h2 className="mt-3 text-4xl font-normal sm:text-5xl">
            Albums of the week
          </h2>
        </div>
        <div className="flex items-end justify-between gap-4 sm:flex-col sm:items-end">
          <p className="max-w-sm text-sm leading-6 text-[var(--muted)] sm:text-right">
            Pulled from TheAudioDB for this week&apos;s station rotation.
          </p>
          <div className="flex shrink-0 gap-2">
            <ArrowButton direction="left" onClick={() => scroll("left")} />
            <ArrowButton direction="right" onClick={() => scroll("right")} />
          </div>
        </div>
      </div>

      {status === "loading" ? (
        <div className="overflow-hidden">
          <div
            ref={scrollerRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1"
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                data-album-skeleton
                className="min-w-[18rem] snap-start bg-[var(--surface)] md:min-w-[22rem] lg:min-w-[calc((100%_-_3rem)/4)]"
              >
                <div className="aspect-square animate-pulse bg-[var(--surface-muted)]" />
                <div className="border border-t-0 border-[var(--rule)] p-5">
                  <div className="h-3 w-24 animate-pulse bg-black/10" />
                  <div className="mt-4 h-7 w-40 animate-pulse bg-black/10" />
                  <div className="mt-5 h-3 w-32 animate-pulse bg-black/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : status === "error" || albums.length === 0 ? (
        <div className="border border-[var(--rule)] bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
          Album picks are unavailable right now.
        </div>
      ) : (
        <div className="overflow-hidden">
          <div
            ref={scrollerRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1"
          >
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
