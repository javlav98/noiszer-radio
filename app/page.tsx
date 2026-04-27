import Bg from "../components/bg";
import HeroCarousel from "../components/carousel";
import AlbumPicks from "../components/albumpicks";

export default function Home() {
  return (
    <main className="min-h-screen bg-black pb-24">
     {/* <Bg /> */}
      <HeroCarousel />
      <AlbumPicks />
    </main>
  );
}