import HeroCarousel from "../components/carousel";
import AlbumPicks from "../components/albumpicks";

export default function Home() {
  return (
    <main className="bg-white text-black overflow-x-hidden">
      <HeroCarousel />

      <section className="bg-white">
        <AlbumPicks />
      </section>
    </main>
  );
}