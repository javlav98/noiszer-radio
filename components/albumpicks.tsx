"use client";

import { useEffect, useState } from "react";

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

          if (!res.ok) {
            throw new Error(`Failed to fetch ${artist}`);
          }

          const data = await res.json();

          console.log("AudioDB response for:", artist, data);

          if (data.album && data.album.length > 0) {
            return data.album[0] as Album;
          }

          return null;
        });

        const results = await Promise.all(requests);

        const cleanAlbums = results.filter(Boolean) as Album[];

        setAlbums(cleanAlbums);
        setIndex(0);

        if (cleanAlbums.length === 0) {
          setError("No albums came back from AudioDB.");
        }
      } catch (err) {
        console.error(err);
        setError("Could not load albums from AudioDB.");
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
    <section className="w-full bg-black px-4 py-0 text-white md:px-8">
      <div className="mx-auto max-w-[1800px]">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.35em] text-white">
              Noiszer Selects
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIndex((prev) => Math.max(prev - 1, 0))}
              disabled={!canGoBack}
              className="h-10 w-10 "
            >
              ←
            </button>

            <button
              onClick={() =>
                setIndex((prev) =>
                  Math.min(prev + 1, albums.length - visibleCount)
                )
              }
              disabled={!canGoNext}
              className="h-10 w-10 text-xl"
            >
              →
            </button>
          </div>
        </div>

        {loading && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item}>
                <div className="aspect-square rounded-2xl border border-white/10 bg-white/[0.03]" />
                <div className="mt-3 h-4 w-2/3 rounded bg-white/[0.05]" />
                <div className="mt-2 h-3 w-1/2 rounded bg-white/[0.03]" />
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-white/50">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {visibleAlbums.map((album) => (
                <div key={album.idAlbum} className="group">
                  <div className="aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                    {album.strAlbumThumb ? (
                      <img
                        src={album.strAlbumThumb}
                        alt={album.strAlbum}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-white/30">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="mt-3">
                    <h3 className="text-sm md:text-base">{album.strAlbum}</h3>

                    <p className="text-xs text-white/40">
                      {album.strArtist}
                      {album.intYearReleased
                        ? ` · ${album.intYearReleased}`
                        : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-xs uppercase tracking-[0.25em] text-white/30">
              {index + 1}–{Math.min(index + visibleCount, albums.length)} of{" "}
              {albums.length}
            </div>
          </>
        )}
      </div>
    </section>
  );
}