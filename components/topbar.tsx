"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";

export default function TopBar() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const handleToggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); }
    else { audioRef.current.play(); setIsPlaying(true); }
  };

  const navLinks = ["Shows", "Schedule", "Archive", "About"];
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit", hour12: false,
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500&display=swap');

        .tb {
          font-family: 'IBM Plex Mono', monospace;
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          background: #fff;
          border-bottom: 1px solid #000;
        }

        /* ── MAIN ROW ── */
        .tb-row {
          display: flex;
          align-items: stretch;
          height: 56px;
        }

        /* each cell shares this base */
        .tb-cell {
          display: flex;
          align-items: center;
          padding: 0 20px;
          border-right: 1px solid #000;
          flex-shrink: 0;
        }
        .tb-cell:last-child { border-right: none; }

        /* Logo */
        .tb-logo {
          text-decoration: none;
          padding: 0 24px 0 20px;
        }
        .tb-logo img {
          height: 28px;
          width: auto;
          display: block;
        }

        /* Nav */
        .tb-nav {
          display: flex;
          align-items: stretch;
          flex: 1;
        }
        .tb-nav-link {
          display: flex;
          align-items: center;
          padding: 0 20px;
          border-right: 1px solid #000;
          text-decoration: none;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #000;
          transition: background 0.06s, color 0.06s;
          white-space: nowrap;
        }
        .tb-nav-link:hover { background: #000; color: #fff; }

        /* Nav spacer */
        .tb-nav-fill {
          flex: 1;
          border-right: 1px solid #000;
        }

        /* On air pill */
        .tb-onair {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 20px;
          border-right: 1px solid #000;
        }
        .tb-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #000;
          animation: blink 1.2s step-end infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .tb-onair-label {
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #000;
        }

        /* Track */
        .tb-track {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 2px;
          padding: 0 20px;
          border-right: 1px solid #000;
          min-width: 0;
          max-width: 210px;
        }
        .tb-track-label {
          font-size: 8px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #999;
        }
        .tb-track-name {
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #000;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Waveform */
        .tb-wave {
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 0 18px;
          border-right: 1px solid #000;
        }
        .tb-wbar {
          width: 2px;
          height: 3px;
          background: #d0d0d0;
        }
        .tb-wave.on .tb-wbar {
          background: #000;
          animation: wv var(--d) ease-in-out infinite alternate;
        }
        @keyframes wv { from{height:3px} to{height:var(--h)} }
        .tb-wbar:nth-child(1){--d:.55s;--h:9px;animation-delay:0s}
        .tb-wbar:nth-child(2){--d:.7s;--h:17px;animation-delay:.1s}
        .tb-wbar:nth-child(3){--d:.5s;--h:11px;animation-delay:.2s}
        .tb-wbar:nth-child(4){--d:.65s;--h:7px;animation-delay:.05s}
        .tb-wbar:nth-child(5){--d:.6s;--h:14px;animation-delay:.15s}
        .tb-wbar:nth-child(6){--d:.58s;--h:19px;animation-delay:.08s}
        .tb-wbar:nth-child(7){--d:.72s;--h:10px;animation-delay:.18s}

        /* Play */
        .tb-play {
          width: 56px;
          border: none;
          border-right: 1px solid #000;
          background: #000;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.06s;
        }
        .tb-play:hover { background: #333; }

        /* Time */
        .tb-time {
          padding: 0 20px;
          font-size: 10px;
          letter-spacing: 0.08em;
          color: #aaa;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* ── TICKER ── */
        .tb-ticker {
          display: flex;
          align-items: stretch;
          height: 30px;
          border-top: 1px solid #000;
          overflow: hidden;
        }
        .tb-ticker-tag {
          display: flex;
          align-items: center;
          padding: 0 14px;
          background: #000;
          color: #fff;
          font-size: 8px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border-right: 1px solid #000;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .tb-ticker-scroll {
          flex: 1;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .tb-ticker-inner {
          display: inline-flex;
          gap: 0;
          animation: scroll 22s linear infinite;
          white-space: nowrap;
        }
        .tb-ticker-inner:hover { animation-play-state: paused; }
        @keyframes scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .tb-ticker-item {
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #000;
          padding-right: 40px;
        }
        .tb-ticker-item::before { content: '/ '; color: #bbb; }

        /* ── MOBILE ── */
        .tb-mob-player {
          display: flex;
          align-items: stretch;
          height: 44px;
          border-top: 1px solid #000;
        }
        .tb-mob-play {
          width: 52px;
          background: #000;
          color: #fff;
          border: none;
          border-right: 1px solid #000;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
        }
        .tb-mob-info {
          display: flex;
          align-items: center;
          flex: 1;
          padding: 0 16px;
          gap: 8px;
          min-width: 0;
          overflow: hidden;
        }
        .tb-mob-track {
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: #000;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tb-mob-menu {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.28s ease;
          border-top: 0px solid #000;
        }
        .tb-mob-menu.open {
          max-height: 300px;
          border-top: 1px solid #000;
        }
        .tb-mob-link {
          display: flex;
          align-items: center;
          height: 48px;
          padding: 0 20px;
          border-bottom: 1px solid #000;
          text-decoration: none;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #000;
          transition: background 0.06s, color 0.06s;
        }
        .tb-mob-link:last-child { border-bottom: none; }
        .tb-mob-link:hover { background: #000; color: #fff; }

        .tb-ham {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 0 20px;
          background: none;
          border: none;
          border-left: 1px solid #000;
          cursor: pointer;
          height: 100%;
          transition: background 0.06s;
          flex-shrink: 0;
        }
        .tb-ham:hover { background: #000; }
        .tb-ham:hover .tb-ham-ln { background: #fff; }
        .tb-ham-ln {
          width: 18px; height: 1.5px;
          background: #000;
          transition: transform 0.2s, opacity 0.2s, background 0.06s;
          display: block;
        }

        @media (max-width: 767px) { .tb-desk { display: none !important; } }
        @media (min-width: 768px) { .tb-mob  { display: none !important; } }
      `}</style>

      <audio ref={audioRef} src="/audio/test.mp3" preload="none" />

      <header className="tb">
        {/* ── MAIN ROW ── */}
        <div className="tb-row">

          {/* Logo */}
          <Link href="/" className="tb-cell tb-logo">
            <img src="/images/logo1.svg" alt="Noiszer" />
          </Link>

          {/* Desktop nav */}
          <nav className="tb-nav tb-desk">
            {navLinks.map((l) => (
              <Link key={l} href="#" className="tb-nav-link">{l}</Link>
            ))}
            <div className="tb-nav-fill" />
          </nav>

          {/* Mobile spacer */}
          <div className="tb-mob" style={{ flex: 1, borderRight: "1px solid #000" }} />

          {/* Desktop player */}
          <div className="tb-desk" style={{ display: "flex", alignItems: "stretch" }}>
            <div className="tb-onair">
              <div className="tb-dot" />
              <span className="tb-onair-label">On Air</span>
            </div>
            <div className="tb-track">
              <span className="tb-track-label">Now Playing</span>
              <span className="tb-track-name">Velvet Haus — spud bud</span>
            </div>
            <div className={`tb-wave${isPlaying ? " on" : ""}`}>
              {[1,2,3,4,5,6,7].map((i) => <div key={i} className="tb-wbar" />)}
            </div>
            <button onClick={handleToggle} className="tb-play" aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying
                ? <svg width="11" height="11" viewBox="0 0 10 10" fill="currentColor"><rect x="1" y="1" width="3" height="8"/><rect x="6" y="1" width="3" height="8"/></svg>
                : <svg width="11" height="11" viewBox="0 0 10 10" fill="currentColor" style={{marginLeft:1}}><path d="M2 1.5L9 5 2 8.5Z"/></svg>
              }
            </button>
            <div className="tb-cell tb-time">{timeStr}</div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="tb-ham tb-mob"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <span className="tb-ham-ln" style={{ transform: mobileMenuOpen ? "rotate(45deg) translate(0,6.5px)" : "none" }} />
            <span className="tb-ham-ln" style={{ opacity: mobileMenuOpen ? 0 : 1 }} />
            <span className="tb-ham-ln" style={{ transform: mobileMenuOpen ? "rotate(-45deg) translate(0,-6.5px)" : "none" }} />
          </button>
        </div>

        {/* ── TICKER ── */}
        <div className="tb-ticker tb-desk">
          <div className="tb-ticker-tag">Live</div>
          <div className="tb-ticker-scroll">
            <div className="tb-ticker-inner">
              {[...Array(2)].map((_, p) =>
                ["Velvet Haus — Spud Bud", "Next: DJ Stingray 313 — 22:00", "Now streaming on Noiszer", "Bristol · Online · Worldwide", "Subscribe for free"].map((item, i) => (
                  <span key={`${p}-${i}`} className="tb-ticker-item">{item}</span>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ── MOBILE PLAYER ── */}
        <div className="tb-mob-player tb-mob">
          <button onClick={handleToggle} className="tb-mob-play" aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying
              ? <svg width="11" height="11" viewBox="0 0 10 10" fill="currentColor"><rect x="1" y="1" width="3" height="8"/><rect x="6" y="1" width="3" height="8"/></svg>
              : <svg width="11" height="11" viewBox="0 0 10 10" fill="currentColor" style={{marginLeft:1}}><path d="M2 1.5L9 5 2 8.5Z"/></svg>
            }
          </button>
          <div className="tb-mob-info">
            <div className="tb-dot" />
            <span className="tb-mob-track">Velvet Haus — spud bud</span>
          </div>
          <div className={`tb-wave${isPlaying ? " on" : ""}`} style={{ padding: "0 16px", borderLeft: "1px solid #000" }}>
            {[1,2,3,4,5].map((i) => <div key={i} className="tb-wbar" />)}
          </div>
        </div>

        {/* ── MOBILE NAV ── */}
        <div className={`tb-mob-menu tb-mob${mobileMenuOpen ? " open" : ""}`}>
          {navLinks.map((l) => (
            <Link key={l} href="#" className="tb-mob-link" onClick={() => setMobileMenuOpen(false)}>{l}</Link>
          ))}
        </div>
      </header>
    </>
  );
}