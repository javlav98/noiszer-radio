import HeroCarousel from "../components/carousel";
import AlbumPicks from "../components/albumpicks";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="h-screen">
        <HeroCarousel />
      </section>

      <section className="bg-black">
        <AlbumPicks />
      </section>
    </main>
  );
}