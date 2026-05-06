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

  const goBack = () => setIndex((prev) => Math.max(prev - visibleCount, 0));

  const goNext = () =>
    setIndex((prev) =>
      Math.min(prev + visibleCount, Math.max(albums.length - visibleCount, 0))
    );

  return (
    <section className="w-full bg-white text-black">
      <div className="mx-auto max-w-[1800px] px-3 py-4 sm:px-5 md:px-8 md:py-6">
        {/* HEADER */}
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-[9px] uppercase tracking-[0.35em] text-black/50 sm:text-[10px]">
              Noiszer Selects
            </p>

            <h2 className="mt-1 text-2xl font-medium uppercase leading-none tracking-[-0.04em] sm:text-3xl md:text-5xl">
              Album Picks
            </h2>
          </div>

          <div className="grid grid-cols-2 border border-black">
            <button
              type="button"
              onClick={goBack}
              disabled={!canGoBack}
              className="flex h-10 w-10 items-center justify-center border-r border-black transition hover:bg-black hover:text-white disabled:opacity-20 md:h-12 md:w-12"
              aria-label="Previous albums"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={!canGoNext}
              className="flex h-10 w-10 items-center justify-center transition hover:bg-black hover:text-white disabled:opacity-20 md:h-12 md:w-12"
              aria-label="Next albums"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div>
          {loading && (
            <div className="grid gap-3 md:h-[72vh] md:grid-rows-[1fr_auto]">
              <div className="bg-black/[0.04]" />
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="h-32 bg-black/[0.04] md:h-40" />
                ))}
              </div>
            </div>
          )}

          {!loading && featuredAlbum && (
            <div className="grid gap-3 md:h-[72vh] md:grid-rows-[1fr_auto]">
              {/* FEATURED WIDE IMAGE */}
              <article className="group relative min-h-[360px] overflow-hidden border border-black md:min-h-0">
                {featuredAlbum.strAlbumThumb && (
                  <img
                    src={featuredAlbum.strAlbumThumb}
                    alt={featuredAlbum.strAlbum}
                    className="h-full w-full object-cover opacity-95 transition duration-700 group-hover:scale-105 group-hover:opacity-80"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/25 to-transparent" />

                <div className="absolute left-0 top-0 border-b border-r border-black bg-white px-3 py-2 text-[9px] uppercase tracking-[0.28em] text-black/70 md:px-4 md:py-3 md:text-[10px]">
                  Featured Pick
                </div>

                <div className="absolute inset-x-0 bottom-0 border-t border-black bg-white p-4 md:p-6">
                  <h3 className="truncate text-3xl font-medium uppercase leading-none tracking-[-0.05em] sm:text-5xl md:text-7xl">
                    {featuredAlbum.strAlbum}
                  </h3>

                  <p className="mt-2 truncate text-[10px] uppercase tracking-[0.22em] text-black/50 md:text-xs">
                    {featuredAlbum.strArtist}
                  </p>
                </div>
              </article>

              {/* SIDE PICKS AS BOTTOM STRIP */}
              <div className="grid gap-3 md:grid-cols-3">
                {sideAlbums.map((album, albumIndex) => (
                  <article
                    key={album.idAlbum}
                    className="group grid grid-cols-[6rem_1fr] overflow-hidden border border-black sm:grid-cols-[8rem_1fr] md:grid-cols-[8rem_1fr]"
                  >
                    <div className="aspect-square overflow-hidden border-r border-black bg-black/[0.04]">
                      {album.strAlbumThumb && (
                        <img
                          src={album.strAlbumThumb}
                          alt={album.strAlbum}
                          className="h-full w-full object-cover opacity-95 transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                        />
                      )}
                    </div>

                    <div className="flex min-w-0 flex-col justify-between bg-white p-3">
                      <p className="text-[8px] uppercase tracking-[0.25em] text-black/40 md:text-[10px]">
                        Pick 0{albumIndex + 2}
                      </p>

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-medium uppercase leading-tight tracking-[-0.03em] md:text-base">
                          {album.strAlbum}
                        </h3>

                        <p className="mt-1 truncate text-[10px] uppercase tracking-[0.18em] text-black/45">
                          {album.strArtist}
                        </p>
                      </div>
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