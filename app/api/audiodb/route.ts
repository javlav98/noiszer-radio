import { NextResponse } from "next/server";

const API_KEY = "123";

const picks = [
  { artist: "Portishead", album: "Dummy" },
  { artist: "Tame Impala", album: "Currents" },
  { artist: "Arctic Monkeys", album: "AM" },
  { artist: "Daft Punk", album: "Random Access Memories" },
];

export async function GET() {
  try {
    const albums = await Promise.all(
      picks.map(async (pick) => {
        const res = await fetch(
          `https://www.theaudiodb.com/api/v1/json/${API_KEY}/searchalbum.php?s=${encodeURIComponent(
            pick.artist
          )}&a=${encodeURIComponent(pick.album)}`
        );

        if (!res.ok) return null;

        const data = await res.json();
        const album = data.album?.[0];

        if (!album) return null;

        return {
          id: album.idAlbum,
          name: album.strAlbum,
          artist: album.strArtist,
          image: album.strAlbumThumb,
          year: album.intYearReleased,
        };
      })
    );

    return NextResponse.json(albums.filter(Boolean));
  } catch (error) {
    console.error("AudioDB error:", error);
    return NextResponse.json([]);
  }
}