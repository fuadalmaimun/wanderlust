"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Menu, X, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
} from "@/components/ui/avatar";

export default function Navbar() {
  
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [activeTab, setActiveTab] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Home page: float the white bar over the hero banner.
  // Other pages: normal sticky bar in the document flow.
  const isHome = pathname === "/";

  const leftNavs = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destination" },
    { name: "Add Destination", href: "/add-destination" },
    { name: "My Bookings", href: "/my-bookings" },
  ];

  const handleSignOut = () => {
    authClient.signOut();
  };

  return (
    <header
      className={`w-full bg-white text-slate-800 shadow-md ${
        isHome
          ? "fixed top-2 left-0 right-0 z-50 max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 rounded-md"
          : "sticky top-0 z-20"
      }`}
    >
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

          {user ? (
            <>
              <Popover>
                <PopoverTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full cursor-pointer"
                      aria-label="Open profile menu"
                    >
                      <Avatar>
                        <AvatarImage
                          referrerPolicy="no-referrer"
                          src={user?.image ?? ""}
                          alt={user?.name ?? "User"}
                        />

                        <AvatarFallback>
                          {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
                        </AvatarFallback>

                        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                      </Avatar>
                    </Button>
                  }
                />

                <PopoverContent align="start" className="w-72 p-0">
                  <div className="flex items-center gap-3 border-b p-4">
                    <Avatar className="size-10">
                      <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user?.image ?? ""}
                        alt={user?.name ?? "User"}
                      />

                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {user?.name ?? "User"}
                      </p>

                      <p className="truncate text-xs text-muted-foreground">
                        {user?.email ?? "No email available"}
                      </p>
                    </div>
                  </div>

                  <div className="p-2">
                    <Button
                      onClick={handleSignOut}
                      variant="ghost"
                      className="w-full justify-start gap-2 text-red-600 hover:text-red-700"
                    >
                      <LogOut className="size-4" />
                      Sign Out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              <Link
                href="/signin"
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
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-700 p-2 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
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
