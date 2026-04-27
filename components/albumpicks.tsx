"use client";

import { useEffect, useState } from "react";

type Album = {
  id: string;
  name: string;
  images: { url: string }[];
  artists: { name: string }[];
  external_urls: { spotify: string };
};

export default function AlbumPicks() {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    fetch("/api/spotify")
      .then((res) => res.json())
      .then((data: Album[]) => setAlbums(data))
      .catch((err) => console.error("Error fetching albums:", err));
  }, []);

  return (
    <section className="bg-black text-white px-4 md:px-10 pb-28">
      <div className="max-w-[1400px] mx-auto">
        
        {/* HEADER */}
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40 mb-3">
            Noiszer Picks
          </p>
          <h2 className="text-2xl md:text-4xl tracking-tight">
            Album Picks
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {albums.map((album) => (
            <a
              key={album.id}
              href={album.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 hover:bg-white/[0.06] transition"
            >
              {/* ARTWORK */}
              <img
                src={album.images[0]?.url}
                alt={album.name}
                className="w-full aspect-square object-cover rounded-xl mb-3"
              />

              {/* ARTIST */}
              <p className="text-xs text-white/40 mb-1">
                {album.artists[0]?.name}
              </p>

              {/* TITLE */}
              <h3 className="text-sm text-white truncate">
                {album.name}
              </h3>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}