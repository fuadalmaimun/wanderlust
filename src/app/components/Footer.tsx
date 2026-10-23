"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight,} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#0a0a0a] text-white font-sans pt-16 pb-10 px-6 sm:px-10 lg:px-16 border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Top Header Section */}
        <div className="mb-14">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-serif tracking-tight text-white mb-3 font-medium">
            Wanderlast
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        {/* Navigation & Newsletter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16">
          {/* Column 1: Newsletter (4 cols) */}
          <div className="lg:col-span-4 pr-0 lg:pr-6">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-300 mb-3">
              NEWSLETTER
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm font-light mb-5">
              Subscribe for exclusive travel deals and inspiration.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#262626] text-zinc-200 placeholder-zinc-400 text-sm px-4 py-3 pr-12 rounded-sm focus:outline-none focus:ring-1 focus:ring-zinc-400 transition-all"
                required
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-0 top-0 bottom-0 px-3.5 bg-transparent hover:bg-zinc-700/50 text-zinc-200 hover:text-white transition-colors flex items-center justify-center rounded-r-sm cursor-pointer"
              >
                <ArrowUpRight className="w-5 h-5 stroke-[1.8]" />
              </button>
            </form>
          </div>

          {/* Spacer for large screens */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-300 mb-5">
              QUICK LINKS
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400 font-normal">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/destinations"
                  className="hover:text-white transition-colors"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="/my-bookings"
                  className="hover:text-white transition-colors"
                >
                  My Bookings
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="hover:text-white transition-colors"
                >
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-300 mb-5">
              SUPPORT
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400 font-normal">
              <li>
                <Link
                  href="/help"
                  className="hover:text-white transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-300 mb-5">
              CONTACT US
            </h3>
            <div className="space-y-3 text-sm text-zinc-400 font-normal">
              <p className="hover:text-white transition-colors">
                <a href="tel:7869011622">786 901 1622</a>
              </p>
              <p className="hover:text-white transition-colors">
                <a href="mailto:info@wandarland.com">info@wandarland.com</a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Social Icons */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-light">
          <p>© 2026 Wanderlast. All rights reserved.</p>

          <div className="flex items-center space-x-5 text-zinc-400">
            {/* Custom X (Twitter) Icon */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="hover:text-white transition-colors"
            >
              <svg
                aria-hidden="true"
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* LinkedIn Icon */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors"
            >
              
            </a>

            {/* Instagram Icon */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white transition-colors"
            >
              
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}