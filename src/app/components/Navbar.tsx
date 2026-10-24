"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Menu, X } from "lucide-react";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const leftNavs = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destination" },
    { name: "Add Destination", href: "/add-destination" },
    { name: "My Bookings", href: "/my-bookings" },

  ];

  return (
    <header className="sticky top-0 z-20 w-full bg-white text-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {leftNavs.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setActiveTab(item.name)}
                className={`text-[15px] font-medium transition-all duration-200 relative py-1 ${
                  isActive
                    ? "text-[#00a8cc] font-semibold"
                    : "text-slate-700 hover:text-[#00a8cc]"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00a8cc] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Brand Logo - Centered */}
        <div className="flex-1 md:flex-none text-center">
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#00a8cc] font-serif hover:opacity-90 transition-opacity"
          >
            Wanderlast
          </Link>
        </div>

        {/* Right Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-[15px] font-medium">
          <Link
            href="/profile"
            className="flex items-center gap-2 text-slate-700 hover:text-[#00a8cc] transition-colors"
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </Link>
          <Link
            href="/login"
            className="text-slate-700 hover:text-[#00a8cc] transition-colors"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-slate-700 hover:text-[#00a8cc] transition-colors"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-700 p-2 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {leftNavs.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => {
                setActiveTab(item.name);
                setMobileMenuOpen(false);
              }}
              className={`block py-2 text-base font-medium ${
                activeTab === item.name
                  ? "text-[#00a8cc] font-semibold"
                  : "text-slate-700 hover:text-[#00a8cc]"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col space-y-3">
            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-slate-700 hover:text-[#00a8cc]"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 hover:text-[#00a8cc]"
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 hover:text-[#00a8cc]"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}