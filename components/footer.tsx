import Link from "next/link";
import { FaInstagram, FaSpotify, FaXTwitter } from "react-icons/fa6";

const links = [
  { label: "Shows", href: "/shows" },
  { label: "Schedule", href: "/schedule" },
  { label: "About", href: "/about" },
  { label: "Support", href: "/support" },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-black bg-white text-black">
      <div className="grid min-h-16 border-b-2 border-black md:grid-cols-[1fr_auto]">
        <div className="flex items-center px-4 py-4 sm:px-6">
          <p className="max-w-2xl text-xs font-black uppercase leading-relaxed">
            Noiszer Radio broadcasts independent shows, live sets, and visual
            records from the underground.
          </p>
        </div>

        <nav className="grid grid-cols-2 border-t-2 border-black md:m-3 md:flex md:items-stretch md:border-2 md:border-black">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex h-12 items-center border-r-2 border-black px-4 text-[10px] font-black uppercase transition even:border-r-0 hover:bg-black hover:text-white md:h-auto md:self-stretch md:border-r-2 md:even:border-r-2 md:last:border-r-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="grid gap-3 px-4 py-3 text-[10px] font-black uppercase text-black/50 sm:px-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <p>Coachella Valley / Web Radio</p>
        <div className="flex items-center gap-2 md:justify-center">
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center border-2 border-black text-black transition hover:bg-black hover:text-white"
            aria-label="Noiszer on X"
          >
            <FaXTwitter size={14} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center border-2 border-black text-black transition hover:bg-black hover:text-white"
            aria-label="Noiszer on Instagram"
          >
            <FaInstagram size={14} />
          </a>
          <a
            href="https://spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center border-2 border-black text-black transition hover:bg-black hover:text-white"
            aria-label="Noiszer on Spotify"
          >
            <FaSpotify size={14} />
          </a>
        </div>
        <p className="md:text-right">
          <a href="mailto:hello@noiszer.com" className="hover:text-black">
            hello@noiszer.com
          </a>
        </p>
      </div>
    </footer>
  );
}
