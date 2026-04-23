"use client";

import { useState } from "react";

const schedule = {
  Monday: [
    { time: "7:00 PM", title: "Velvet Haus", host: "spud bud", genre: "House / Leftfield" },
    { time: "9:00 PM", title: "Static Youth", host: "Javier", genre: "Post-punk / Indie" },
  ],
  Tuesday: [
    { time: "8:00 PM", title: "No Signal", host: "Nina", genre: "Ambient / Experimental" },
  ],
  Wednesday: [
    { time: "7:00 PM", title: "Concrete Echo", host: "Luis", genre: "New Wave / Alternative" },
    { time: "10:00 PM", title: "After Hours", host: "Mara", genre: "Deep House / Downtempo" },
  ],
  Thursday: [
    { time: "8:00 PM", title: "Transmission", host: "Noiszer", genre: "Mixed Selections" },
  ],
  Friday: [
    { time: "6:00 PM", title: "Velvet Haus", host: "spud bud", genre: "House / Underground" },
    { time: "9:00 PM", title: "Night Service", host: "Rico", genre: "Techno / Club" },
  ],
  Saturday: [
    { time: "5:00 PM", title: "Open Air", host: "Lena", genre: "Balearic / Indie Dance" },
    { time: "8:00 PM", title: "Dead Frequency", host: "Ash", genre: "Hardcore / Punk" },
  ],
  Sunday: [
    { time: "7:00 PM", title: "Slow Fade", host: "Noiszer", genre: "Ambient / Soul / Wind-down" },
  ],
};

const days = Object.keys(schedule);

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState("Monday");

  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-12 pt-32 pb-28">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40 mb-4">
            Schedule
          </p>
          <h1 className="text-3xl md:text-5xl tracking-tight mb-4">
            Weekly Broadcasts
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base leading-7">
            A rotating lineup of shows, sounds, and selections across the week.
            Choose a day and tune into what’s on.
          </p>
        </div>

        {/* DAY SELECTOR */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-5 py-2 text-sm tracking-wide border rounded-full transition duration-200 ${
                selectedDay === day
                  ? "bg-white text-black border-white"
                  : "border-white text-white hover:bg-white hover:text-black"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* SCHEDULE LIST */}
        <div className="border-t border-white/20">
          {schedule[selectedDay as keyof typeof schedule].map((show, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-[140px_1fr_180px] gap-4 md:gap-8 py-6 border-b border-white/10"
            >
              {/* TIME */}
              <div className="text-sm text-white/50 tracking-wide">
                {show.time}
              </div>

              {/* TITLE + GENRE */}
              <div>
                <h2 className="text-lg md:text-xl text-white mb-1">
                  {show.title}
                </h2>
                <p className="text-sm text-white/50">{show.genre}</p>
              </div>

              {/* HOST */}
              <div className="text-sm text-white/70 md:text-right">
                Hosted by {show.host}
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}