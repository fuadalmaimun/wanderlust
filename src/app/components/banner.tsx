"use client";

import React, { useState } from "react";
import { ArrowRight, Search, Calendar, MapPin, DollarSign, Users } from "lucide-react";

export default function Banner() {
  const [location, setLocation] = useState("Address, City Or Zip");
  const [date, setDate] = useState("Anytime/3 Days");
  const [budget, setBudget] = useState("$0-$3000");
  const [people, setPeople] = useState("5-10");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for:
• Location: ${location}
• Duration: ${date}
• Budget: ${budget}
• Travelers: ${people}`);
  };

  return (
    <div className="relative flex-1 flex flex-col justify-between text-white overflow-hidden">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transform scale-105 transition-transform duration-1000"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85')",
        }}
      >
        {/* Dark Vignette Overlay for Crisp Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60" />
      </div>

      {/* Hero Text & CTA Section */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-20 max-w-5xl mx-auto my-auto">
        {/* Main Serif Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight text-white drop-shadow-lg leading-[1.15] font-light">
          Discover Your <br className="hidden sm:inline" />
          Next Adventure
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-slate-100 max-w-2xl font-light leading-relaxed drop-shadow">
          Explore breathtaking destinations and create unforgettable memories with
          our curated travel experiences.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button className="bg-[#00a8cc] hover:bg-[#008cae] active:scale-95 text-white font-medium text-sm sm:text-base px-7 py-3.5 rounded-md transition-all duration-200 flex items-center gap-2.5 shadow-xl hover:shadow-2xl">
            EXPLORE NOW <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button className="bg-white/20 hover:bg-white/30 active:scale-95 text-white font-medium text-sm sm:text-base px-7 py-3.5 rounded-md backdrop-blur-md transition-all duration-200 border border-white/30 shadow-xl">
            VIEW DESTINATION
          </button>
        </div>
      </div>

      {/* Bottom Floating Glassmorphism Search Bar */}
      <div className="relative z-10 w-full bg-black/40 backdrop-blur-md border-t border-white/20">
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 lg:divide-x divide-white/15"
        >
          {/* Location Box */}
          <div className="p-4 sm:p-5 flex items-center gap-3 hover:bg-white/10 transition-colors group cursor-pointer">
            <MapPin className="w-5 h-5 text-[#00a8cc] shrink-0 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col w-full">
              <label className="text-sm font-semibold tracking-wide text-white">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent text-xs sm:text-sm text-slate-200 focus:outline-none focus:text-white placeholder-slate-300 w-full"
              />
            </div>
          </div>

          {/* Date / Duration Box */}
          <div className="p-4 sm:p-5 flex items-center gap-3 hover:bg-white/10 transition-colors group cursor-pointer">
            <Calendar className="w-5 h-5 text-[#00a8cc] shrink-0 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col w-full">
              <label className="text-sm font-semibold tracking-wide text-white">
                Date/Duration
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent text-xs sm:text-sm text-slate-200 focus:outline-none focus:text-white placeholder-slate-300 w-full"
              />
            </div>
          </div>

          {/* Budget Box */}
          <div className="p-4 sm:p-5 flex items-center gap-3 hover:bg-white/10 transition-colors group cursor-pointer">
            <DollarSign className="w-5 h-5 text-[#00a8cc] shrink-0 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col w-full">
              <label className="text-sm font-semibold tracking-wide text-white">
                Budget
              </label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="bg-transparent text-xs sm:text-sm text-slate-200 focus:outline-none focus:text-white placeholder-slate-300 w-full"
              />
            </div>
          </div>

          {/* People Box */}
          <div className="p-4 sm:p-5 flex items-center gap-3 hover:bg-white/10 transition-colors group cursor-pointer">
            <Users className="w-5 h-5 text-[#00a8cc] shrink-0 group-hover:scale-110 transition-transform" />
            <div className="flex flex-col w-full">
              <label className="text-sm font-semibold tracking-wide text-white">
                People
              </label>
              <input
                type="text"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                className="bg-transparent text-xs sm:text-sm text-slate-200 focus:outline-none focus:text-white placeholder-slate-300 w-full"
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="bg-[#00a8cc] hover:bg-[#008cae] active:bg-[#007b9a] transition-colors duration-200 flex items-center justify-center gap-2 text-lg font-semibold py-5 lg:py-0 text-white cursor-pointer shadow-lg hover:shadow-2xl col-span-1 sm:col-span-2 lg:col-span-1"
          >
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  );
}