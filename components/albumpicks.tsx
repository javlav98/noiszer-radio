"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Album = {
  idAlbum: string;
  strAlbum: string;
  strArtist: string;
  strAlbumThumb?: string;
};

type AlbumResponse = {
  album?: Album[] | null;
};

export default function AlbumPicks() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const visibleCount = 4;

  useEffect(() => {
    async function getAlbums() {
      try {
        setLoading(true);

        const artists = [
          "Radiohead",
          "Aphex Twin",
          "Portishead",
          "Joy Division",
          "Cocteau Twins",
          "Daft Punk",
          "Massive Attack",
          "The Smiths",
          "Talking Heads",
          "Depeche Mode",
          "The Strokes",
          "The Avalanches",
          "Primal Scream",
          "Animal Collective",
          "My Bloody Valentine",
        ];

        const results = await Promise.all(
          artists.map(async (artist): Promise<Album | null> => {
            const res = await fetch(
              `https://www.theaudiodb.com/api/v1/json/2/searchalbum.php?s=${encodeURIComponent(
                artist
              )}`
            );

            const data: AlbumResponse = await res.json();
            return data.album?.[0] ?? null;
          })
        );

        setAlbums(results.filter((album): album is Album => album !== null));
        setIndex(0);
      } finally {
        setLoading(false);
      }
    }

    getAlbums();
  }, []);

  const visibleAlbums = useMemo(
    () => albums.slice(index, index + visibleCount),
    [albums, index]
  );

  const featuredAlbum = visibleAlbums[0];
  const sideAlbums = visibleAlbums.slice(1);

  const canGoBack = index > 0;
  const canGoNext = index + visibleCount < albums.length;

  const goBack = () => {
    setIndex((prev) => Math.max(prev - visibleCount, 0));
  };

  const goNext = () => {
    setIndex((prev) =>
      Math.min(prev + visibleCount, Math.max(albums.length - visibleCount, 0))
    );
  };

  return (
    <section className="w-full bg-black px-4 text-white sm:px-6 md:px-8">
      <div className="mx-auto flex h-[calc(100dvh-4rem-5.5rem)] max-w-[1800px] flex-col pt-4 pb-4 sm:h-[calc(100dvh-4rem-5.75rem)] md:h-[calc(100dvh-4rem-6rem)]">
        
        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/60 sm:text-xs">
              Noiszer Selects
            </p>

            <h2 className="mt-1 text-lg font-normal tracking-tight sm:text-xl md:text-2xl">
              Album Picks
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={goBack}
              disabled={!canGoBack}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition hover:bg-white hover:text-black disabled:opacity-20"
              aria-label="Previous albums"
            >
              <ArrowLeft size={16} />
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={!canGoNext}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition hover:bg-white hover:text-black disabled:opacity-20"
              aria-label="Next albums"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex min-h-0 flex-1 items-center pt-3">
          {loading && (
            <div className="grid h-full w-full gap-3 md:grid-cols-[1.1fr_0.9fr] md:gap-4">
              <div className="min-h-0 rounded-3xl border border-white/10 bg-white/[0.03]" />

              <div className="grid min-h-0 grid-rows-3 gap-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="min-h-0 rounded-2xl border border-white/10 bg-white/[0.03]"
                  />
                ))}
              </div>
            </div>
          )}

          {!loading && featuredAlbum && (
            <div className="grid h-full w-full gap-3 md:grid-cols-[1.1fr_0.9fr] md:gap-4">
              
              {/* FEATURED */}
              <article className="group relative min-h-0 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                {featuredAlbum.strAlbumThumb && (
                  <img
                    src={featuredAlbum.strAlbumThumb}
                    alt={featuredAlbum.strAlbum}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-80"
                  />
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/75 to-transparent p-4 sm:p-5">
                  <p className="mb-2 text-[9px] uppercase tracking-[0.35em] text-white/50 sm:text-[10px]">
                    Featured Pick
                  </p>

                  <h3 className="truncate text-xl leading-none sm:text-2xl md:text-3xl">
                    {featuredAlbum.strAlbum}
                  </h3>

                  <p className="mt-2 truncate text-xs text-white/60 sm:text-sm">
                    {featuredAlbum.strArtist}
                  </p>
                </div>
              </article>

              {/* SIDE PICKS */}
              <div className="grid min-h-0 grid-rows-3 gap-3">
                {sideAlbums.map((album, albumIndex) => (
                  <article
                    key={album.idAlbum}
                    className="group grid min-h-0 grid-cols-[4.75rem_1fr] gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2 sm:grid-cols-[5.5rem_1fr] md:grid-cols-[6.5rem_1fr]"
                  >
                    <div className="aspect-square self-center overflow-hidden rounded-xl bg-white/[0.04]">
                      {album.strAlbumThumb && (
                        <img
                          src={album.strAlbumThumb}
                          alt={album.strAlbum}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                        />
                      )}
                    </div>

                    <div className="flex min-w-0 flex-col justify-center">
                      <p className="mb-1 text-[9px] uppercase tracking-[0.3em] text-white/35 sm:text-[10px]">
                        Pick 0{albumIndex + 2}
                      </p>

                      <h3 className="truncate text-xs leading-tight sm:text-sm md:text-base">
                        {album.strAlbum}
                      </h3>

                      <p className="mt-1 truncate text-[10px] text-white/40 sm:text-xs">
                        {album.strArtist}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}