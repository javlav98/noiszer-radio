import HeroCarousel from "../components/carousel";
import AlbumPicks from "../components/albumpicks";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="h-screen">
        <HeroCarousel />
      </section>

      <section className="bg-white">
        <AlbumPicks />
      </section>
    </main>
  );
}