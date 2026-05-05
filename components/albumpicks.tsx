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
    <section className="w-full overflow-hidden bg-black px-4 text-white sm:px-6 md:px-8">
      <div className="mx-auto grid h-[calc(100dvh-11rem)] max-w-[1800px] grid-rows-[auto_1fr] gap-3 pt-3 sm:h-[calc(100dvh-11.5rem)] md:h-[calc(100dvh-10.5rem)]">
        <div className="flex shrink-0 items-center justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.35em] text-white/55 sm:text-[10px] md:text-xs">
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
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition hover:bg-white hover:text-black disabled:opacity-20 sm:h-9 sm:w-9"
              aria-label="Previous albums"
            >
              <ArrowLeft size={15} />
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={!canGoNext}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition hover:bg-white hover:text-black disabled:opacity-20 sm:h-9 sm:w-9"
              aria-label="Next albums"
            >
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

        <div className="min-h-0">
          {loading && (
            <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-2 sm:gap-3 md:grid-cols-[1.1fr_0.9fr] md:grid-rows-none md:gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] md:row-span-3 md:rounded-3xl" />

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.03]"
                />
              ))}
            </div>
          )}

          {!loading && featuredAlbum && (
            <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-2 sm:gap-3 md:grid-cols-[1.1fr_0.9fr] md:grid-rows-none md:gap-4">
              <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:row-span-3 md:rounded-3xl">
                {featuredAlbum.strAlbumThumb && (
                  <img
                    src={featuredAlbum.strAlbumThumb}
                    alt={featuredAlbum.strAlbum}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-80"
                  />
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/75 to-transparent p-3 md:p-5">
                  <p className="mb-1 text-[8px] uppercase tracking-[0.3em] text-white/45 md:text-[10px]">
                    Featured Pick
                  </p>

                  <h3 className="truncate text-sm leading-tight sm:text-lg md:text-3xl">
                    {featuredAlbum.strAlbum}
                  </h3>

                  <p className="mt-1 truncate text-[10px] text-white/55 sm:text-xs md:text-sm">
                    {featuredAlbum.strArtist}
                  </p>
                </div>
              </article>

              {sideAlbums.map((album, albumIndex) => (
                <article
                  key={album.idAlbum}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:grid md:grid-cols-[5.75rem_1fr] md:gap-3 md:p-2 lg:grid-cols-[6.5rem_1fr]"
                >
                  <div className="h-full w-full overflow-hidden bg-white/[0.04] md:aspect-square md:h-auto md:self-center md:rounded-xl">
                    {album.strAlbumThumb && (
                      <img
                        src={album.strAlbumThumb}
                        alt={album.strAlbum}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                      />
                    )}
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/75 to-transparent p-3 md:relative md:inset-auto md:flex md:min-w-0 md:flex-col md:justify-center md:bg-none md:p-0">
                    <p className="mb-1 text-[8px] uppercase tracking-[0.25em] text-white/40 md:text-[10px]">
                      Pick 0{albumIndex + 2}
                    </p>

                    <h3 className="truncate text-xs leading-tight sm:text-sm md:text-base">
                      {album.strAlbum}
                    </h3>

                    <p className="mt-1 truncate text-[10px] text-white/45 sm:text-xs">
                      {album.strArtist}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-44 md:h-40" />
    </section>
  );
}