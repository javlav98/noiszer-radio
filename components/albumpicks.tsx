"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Album = {
  idAlbum: string;
  strAlbum: string;
  strArtist: string;
  intYearReleased?: string;
  strAlbumThumb?: string;
};

export default function AlbumPicks() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const visibleCount = 4;

  useEffect(() => {
    async function getAlbums() {
      try {
        setLoading(true);
        setError("");

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

        const requests = artists.map(async (artist) => {
          const url = `https://www.theaudiodb.com/api/v1/json/2/searchalbum.php?s=${encodeURIComponent(
            artist
          )}`;

          const res = await fetch(url);
          const data = await res.json();

          if (data.album && data.album.length > 0) {
            return data.album[0] as Album;
          }

          return null;
        });

        const results = await Promise.all(requests);
        const cleanAlbums = results.filter(Boolean) as Album[];

        setAlbums(cleanAlbums);
        setIndex(0);
      } catch (err) {
        setError("Could not load albums.");
      } finally {
        setLoading(false);
      }
    }

    getAlbums();
  }, []);

  const visibleAlbums = albums.slice(index, index + visibleCount);

  const canGoBack = index > 0;
  const canGoNext = index + visibleCount < albums.length;

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-black px-4 text-white md:px-8">
      <div className="mx-auto flex h-full max-w-[1800px] flex-col pt-[clamp(4.5rem,9dvh,7rem)] pb-[clamp(5rem,9dvh,6.5rem)]">
        
        {/* HEADER */}
        <div className="flex shrink-0 justify-between">
          
          {/* TITLE */}
          <p className="mt-[clamp(0.5rem,1.5dvh,1.25rem)] text-xs uppercase tracking-[0.35em] text-white">
            Noiszer Selects
          </p>

          {/* ARROWS */}
          <div className="flex gap-3 pt-[clamp(0.5rem,1.5dvh,1.25rem)]">
            
            <button
              onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
              disabled={!canGoBack}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white hover:text-black disabled:opacity-20"
            >
              <ArrowLeft size={18} className="transition group-hover:-translate-x-0.5" />
            </button>

            <button
              onClick={() =>
                setIndex((prev) =>
                  Math.min(prev + 1, albums.length - visibleCount)
                )
              }
              disabled={!canGoNext}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white hover:text-black disabled:opacity-20"
            >
              <ArrowRight size={18} className="transition group-hover:translate-x-0.5" />
            </button>

          </div>
        </div>

        {/* GRID */}
        <div className="flex min-h-0 flex-1 items-center py-[clamp(1.25rem,3dvh,2.5rem)]">
          {loading && (
            <div className="grid w-full grid-cols-2 grid-rows-2 gap-x-4 gap-y-[clamp(1.75rem,4dvh,3rem)] md:gap-x-6 xl:grid-cols-4 xl:grid-rows-1 xl:gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex min-h-0 flex-col">
                  <div className="aspect-square max-h-[clamp(8rem,21dvh,14rem)] w-full rounded-2xl border border-white/10 bg-white/[0.03] md:max-h-[clamp(11rem,27dvh,18rem)] xl:max-h-[48dvh]" />
                </div>
              ))}
            </div>
          )}

          {!loading && !error && (
            <div className="grid w-full grid-cols-2 grid-rows-2 gap-x-4 gap-y-[clamp(1.75rem,4dvh,3rem)] md:gap-x-6 xl:grid-cols-4 xl:grid-rows-1 xl:gap-4">
              {visibleAlbums.map((album) => (
                <div key={album.idAlbum} className="group flex min-h-0 flex-col">
                  
                  {/* ROUNDED ALBUM */}
                  <div className="aspect-square max-h-[clamp(8rem,21dvh,14rem)] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:max-h-[clamp(11rem,27dvh,18rem)] xl:max-h-[48dvh]">
                    <img
                      src={album.strAlbumThumb || ""}
                      alt={album.strAlbum}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                    />
                  </div>

                  <div className="mt-2">
                    <h3 className="line-clamp-1 text-xs sm:text-sm md:text-sm xl:text-base">
                      {album.strAlbum}
                    </h3>

                    <p className="line-clamp-1 text-[10px] text-white/40 sm:text-xs">
                      {album.strArtist}
                    </p>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* PAGINATION */}
        <div className="shrink-0 text-xs uppercase tracking-[0.25em] text-white/30">
          {albums.length > 0
            ? `${index + 1}–${Math.min(
                index + visibleCount,
                albums.length
              )} of ${albums.length}`
            : "0 of 0"}
        </div>

      </div>
    </section>
  );
}