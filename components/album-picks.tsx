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

function AlbumCard({ album, index }: { album: AlbumPick; index: number }) {
  const detail = [album.year, album.genre || album.style]
    .filter(Boolean)
    .join(" / ");

  return (
    <article className="group min-w-[18rem] snap-start border border-white/22 bg-[#101010] md:min-w-[22rem] lg:min-w-[calc((100%_-_3rem)/4)]">
      <div className="flex h-11 items-center justify-between border-b border-white/22 px-4 text-[11px] font-medium uppercase tracking-[0.12em] text-white/70">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <span>Weekly rotation</span>
      </div>

      <div className="relative aspect-square overflow-hidden bg-black">
        {album.image ? (
          <Image
            src={album.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="grid h-full place-items-center text-sm text-white/45">
            No artwork
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
        <p className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.18em] text-white/70">
          Noiszer selection / {album.artist}
        </p>
      </div>

      <div className="p-5">
        <h3 className="text-2xl font-normal leading-tight text-white">{album.name}</h3>
        <div className="mt-5 grid grid-cols-[1fr_auto] gap-4 border-t border-white/22 pt-4 text-sm">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/55">
              Artist
            </p>
            <p className="mt-1.5 text-white/78">{album.artist}</p>
          </div>
          <div className="max-w-36 text-right">
            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/55">
              Release
            </p>
            <p className="mt-1.5 leading-5 text-white/60">{detail || "—"}</p>
          </div>
        </div>
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
      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/24 text-white/72 transition hover:bg-white hover:text-black"
      aria-label={direction === "left" ? "Previous albums" : "Next albums"}
    >
      <Icon size={14} strokeWidth={1.8} />
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
    <section className="border-b border-black bg-[var(--ink)] px-2 pb-6 pt-4 text-white sm:px-3 lg:px-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-white/65">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            Station selections
          </p>
          <h2 className="mt-1 text-lg font-normal sm:text-xl">
            Albums of the week
          </h2>
        </div>
        <div>
          <div className="flex shrink-0 gap-1.5">
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
                className="min-w-[18rem] snap-start border border-white/14 bg-[#151515] md:min-w-[22rem] lg:min-w-[calc((100%_-_3rem)/4)]"
              >
                <div className="h-11 border-b border-white/14" />
                <div className="aspect-square animate-pulse bg-white/8" />
                <div className="p-5">
                  <div className="h-7 w-40 animate-pulse bg-white/10" />
                  <div className="mt-5 border-t border-white/14 pt-4">
                    <div className="h-3 w-24 animate-pulse bg-white/10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : status === "error" || albums.length === 0 ? (
        <div className="border border-white/14 bg-[#151515] p-6 text-sm text-white/55">
          Album picks are unavailable right now.
        </div>
      ) : (
        <div className="overflow-hidden">
          <div
            ref={scrollerRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-1"
          >
            {albums.map((album, index) => (
              <AlbumCard key={album.id} album={album} index={index} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
