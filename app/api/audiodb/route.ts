import { NextResponse } from "next/server";

const API_KEY = "123";

const picks = [
  { artist: "Portishead", album: "Dummy" },
  { artist: "Massive Attack", album: "Mezzanine" },
  { artist: "Burial", album: "Untrue" },
  { artist: "Aphex Twin", album: "Selected Ambient Works 85-92" },
  { artist: "Boards of Canada", album: "Music Has the Right to Children" },
  { artist: "DJ Shadow", album: "Endtroducing....." },
  { artist: "Tricky", album: "Maxinquaye" },
  { artist: "The Avalanches", album: "Since I Left You" },
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
          genre: album.strGenre,
          style: album.strStyle,
        };
      })
    );

    return NextResponse.json(albums.filter(Boolean));
  } catch (error) {
    console.error("AudioDB error:", error);
    return NextResponse.json([]);
  }
}
