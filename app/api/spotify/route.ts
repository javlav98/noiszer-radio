import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;

async function getAccessToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  return data.access_token;
}

export async function GET() {
  const token = await getAccessToken();

  const albumIds = [
    "3539EbNgIdEDGBKkUf4wno", // Portishead - Dummy
    "2noRn2Aes5aoNVsU6iWThc", // Tame Impala - Currents
    "1ATL5GLyefJaxhQzSPVrLX", // Arctic Monkeys - AM
    "6JWc4iAiJ9FjyK0B59ABb4", // Daft Punk - Random Access Memories
  ];

  const albums = await Promise.all(
    albumIds.map(async (id) => {
      const res = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.json();
    })
  );

  return NextResponse.json(albums);
}