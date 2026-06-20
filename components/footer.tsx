import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaSpotify, FaXTwitter } from "react-icons/fa6";

const links = [
  { label: "Schedule", href: "/schedule" },
  { label: "Archive", href: "/archive" },
  { label: "About", href: "/about" },
  { label: "Support", href: "/support" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--rule)] bg-[var(--ink)] text-white">
      <div className="grid min-h-72 place-items-center border-b border-white/15 p-6 sm:min-h-96 lg:min-h-[30rem]">
        <Image
          src="/images/logo5.png"
          alt="Noiszer"
          width={1536}
          height={1024}
          className="max-h-52 w-full max-w-3xl object-contain invert sm:max-h-72 lg:max-h-96"
        />
      </div>

      <div className="grid min-h-16 border-b border-white/15 md:grid-cols-[1fr_auto]">
        <div className="flex items-center px-4 py-4 sm:px-6">
          <p className="max-w-2xl text-sm leading-6 text-white/72">
            Noiszer Radio broadcasts independent shows, live sets, and visual
            records from the underground.
          </p>
        </div>

        <nav className="grid grid-cols-2 border-t border-white/15 md:m-3 md:flex md:items-stretch md:border md:border-white/15">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex h-12 items-center border-r border-white/15 px-4 text-sm text-white/72 transition even:border-r-0 hover:bg-white hover:text-black md:h-auto md:self-stretch md:border-r md:even:border-r md:last:border-r-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="grid gap-3 px-4 py-4 text-sm text-white/52 sm:px-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <p>Coachella Valley / Web Radio</p>
        <div className="flex items-center gap-2 md:justify-center">
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/72 transition hover:bg-white hover:text-black"
            aria-label="Noiszer on X"
          >
            <FaXTwitter size={14} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/72 transition hover:bg-white hover:text-black"
            aria-label="Noiszer on Instagram"
          >
            <FaInstagram size={14} />
          </a>
          <a
            href="https://spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/72 transition hover:bg-white hover:text-black"
            aria-label="Noiszer on Spotify"
          >
            <FaSpotify size={14} />
          </a>
        </div>
        <p className="md:text-right">
          <a href="mailto:hello@noiszer.com" className="hover:text-white">
            hello@noiszer.com
          </a>
        </p>
      </div>
    </footer>
  );
}
