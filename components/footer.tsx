import Link from "next/link";

const links = [
  { label: "Shows", href: "/shows" },
  { label: "Schedule", href: "/schedule" },
  { label: "Archive", href: "/archive" },
  { label: "About", href: "/about" },
  { label: "Support", href: "/support" },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-black bg-white text-black">
      <div className="grid min-h-16 border-b-2 border-black md:grid-cols-[1fr_auto]">
        <div className="flex items-center px-4 py-4 sm:px-6">
          <p className="max-w-2xl text-xs font-black uppercase leading-relaxed">
            Noiszer Radio broadcasts independent shows, archives, and visual
            records from the underground.
          </p>
        </div>

        <nav className="grid grid-cols-2 border-t-2 border-black md:flex md:border-l-2 md:border-t-0">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="flex h-12 items-center border-r-2 border-black px-4 text-[10px] font-black uppercase transition last:border-r-0 hover:bg-black hover:text-[#e7ff00]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="grid gap-2 px-4 py-3 text-[10px] font-black uppercase text-black/50 sm:px-6 md:grid-cols-3">
        <p>HNL / Web Radio</p>
        <p className="md:text-center">Live / Archive / Community</p>
        <p className="md:text-right">
          <a href="mailto:hello@noiszer.com" className="hover:text-black">
            hello@noiszer.com
          </a>
        </p>
      </div>
    </footer>
  );
}
