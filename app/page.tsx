import HeroCarousel from "../components/carousel";
import Footer from "../components/footer";
import AlbumPicks from "../components/album-picks";
import ShowQueue from "../components/show-queue";

const nowPlaying = {
  title: "Velvet Haus",
  host: "Spud Bud",
  genre: "House / Minimal / Leftfield",
  slot: "Monday / 7:00 PM",
  time: "Now playing",
  image: "/images/velvethaus.png",
  note:
    "Warm club records, stripped-down rhythm, and leftfield selections for the current broadcast.",
};

const showQueue = [
  {
    status: "Now playing",
    title: nowPlaying.title,
    host: nowPlaying.host,
    genre: nowPlaying.genre,
    slot: nowPlaying.slot,
    image: nowPlaying.image,
    live: true,
  },
  {
    status: "Up next",
    title: "Static Youth",
    host: "Javier",
    genre: "Post-punk / Indie",
    slot: "Monday / 9:00 PM",
    image: "/images/ctrlaltdelete.jpg",
    live: false,
  },
  {
    status: "Later",
    title: "No Signal",
    host: "jvii",
    genre: "Ambient / Experimental",
    slot: "Everyday / 12:00 AM - 5:00 AM",
    image: "/images/no_signal.png",
    live: false,
  },
  {
    status: "Tomorrow",
    title: "Concrete Echo",
    host: "Luis",
    genre: "New Wave / Alternative",
    slot: "Wednesday / 7:00 PM",
    image: "/images/art1.PNG",
    live: false,
  },
];

export default function Home() {
  return (
    <>
      <main className="overflow-x-hidden bg-[var(--paper)] text-[var(--ink)]">
        <HeroCarousel />

        <ShowQueue shows={showQueue} />
        <AlbumPicks />
      </main>
      <Footer />
    </>
  );
}
