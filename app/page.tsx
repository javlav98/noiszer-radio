import HeroCarousel from "../components/carousel";
import AlbumPicks from "../components/albumpicks";

export default function Home() {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black text-white">
      <section className="h-screen snap-start">
        <HeroCarousel />
      </section>

      <section className="snap-start bg-black">
        <AlbumPicks />
      </section>
    </main>
  );
}