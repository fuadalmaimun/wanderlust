
"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { User, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import useBookingCount from "@/hooks/use-booking-count";

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

type SessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

/**
 * Avatar + dropdown:
 * User info, Profile link and Sign Out.
 */
function ProfilePopover({
  user,
  open,
  onOpenChange,
  onSignOut,
  align = "end",
}: {
  user: SessionUser;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignOut: () => void;
  align?: "start" | "center" | "end";
}) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
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
                src={user.image ?? ""}
                alt={user.name ?? "User"}
              />

              <AvatarFallback>
                {user.name?.charAt(0)?.toUpperCase() ?? "U"}
              </AvatarFallback>

              <AvatarBadge className="bg-green-600 dark:bg-green-800" />
            </Avatar>
          </Button>
        }
      />

      <PopoverContent align={align} className="w-72 p-0">
        <div className="flex items-center gap-3 border-b p-4">
          <Avatar className="size-10">
            <AvatarImage
              referrerPolicy="no-referrer"
              src={user.image ?? ""}
              alt={user.name ?? "User"}
            />

            <AvatarFallback>
              {user.name?.charAt(0)?.toUpperCase() ?? "U"}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">
              {user.name ?? "User"}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {user.email ?? "No email available"}
            </p>
          </div>
        </div>

        <div className="space-y-1 p-2">
          <Link
            href="/profile"
            onClick={() => onOpenChange(false)}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#00a8cc]"
          >
            <User className="size-4" />
            Profile
          </Link>

          <Button
            onClick={onSignOut}
            variant="ghost"
            className="w-full justify-start gap-2 text-red-600 hover:text-red-700"
          >
            <LogOut className="size-4" />
            Sign Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const router = useRouter();
  const pathname = usePathname();

  // Desktop ও Mobile-এর Popover state আলাদা
  const [desktopProfileOpen, setDesktopProfileOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);

  // Mobile navigation menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Home page-এ navbar hero banner-এর উপরে থাকবে
  const isHome = pathname === "/";

  const leftNavs = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/destination" },
    { name: "Add Destination", href: "/add-destination" },
    { name: "My Bookings", href: "/my-bookings" },
  ];

  const isNavActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // My Bookings notification count
  const bookingCount = useBookingCount(user?.email, pathname);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();

      // দুইটি Popover-ই বন্ধ করব
      setDesktopProfileOpen(false);
      setMobileProfileOpen(false);
      setMobileMenuOpen(false);

      toast.success("Signed out successfully", {
        autoClose: 1000,
        position: "bottom-right",
      });

      router.push("/");
      router.refresh();
    } catch {
      toast.error("Could not sign out. Please try again.");
    }
  };

  return (
    <header
      className={`w-full bg-white text-slate-800 shadow-md ${
        isHome
          ? "fixed top-2 left-0 right-0 z-50 max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 rounded-md"
          : "sticky top-0 z-20"
      }`}
    >
      {/* Three-column grid keeps the brand centered */}
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 sm:gap-4 sm:px-6 lg:px-8">
        {/* Left: Desktop links / Mobile hamburger */}
        <div className="flex items-center justify-self-start">
          <nav className="hidden items-center space-x-8 md:flex">
            {leftNavs.map((item) => {
              const isActive = isNavActive(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative py-1 text-[15px] font-medium transition-all duration-200 ${
                    isActive
                      ? "font-semibold text-[#00a8cc]"
                      : "text-slate-700 hover:text-[#00a8cc]"
                  }`}
                >
                  {item.name}

                  {item.name === "My Bookings" && bookingCount > 0 && (
                    <span
                      aria-label={`${bookingCount} bookings`}
                      className="absolute -top-2.5 right-0 flex h-4 min-w-4 translate-x-1/2 items-center justify-center rounded-full bg-[#00a8cc] px-1 text-[10px] font-semibold leading-none text-white shadow-sm"
                    >
                      {bookingCount > 99 ? "99+" : bookingCount}
                    </span>
                  )}

                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#00a8cc]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 text-slate-700 focus:outline-none md:hidden"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Centered brand logo */}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="text-center font-serif text-2xl font-extrabold tracking-tight text-[#00a8cc] transition-opacity hover:opacity-90 sm:text-3xl"
        >
          Wanderlast
        </Link>

        {/* Right: Desktop profile / Mobile profile */}
        <div className="flex items-center justify-self-end">
          {/* Desktop profile */}
          <div className="hidden items-center space-x-6 text-[15px] font-medium md:flex">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 text-slate-700 transition-colors hover:text-[#00a8cc]"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>

                <ProfilePopover
                  user={user}
                  open={desktopProfileOpen}
                  onOpenChange={setDesktopProfileOpen}
                  onSignOut={handleSignOut}
                  align="start"
                />
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-slate-700 transition-colors hover:text-[#00a8cc]"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="text-slate-700 transition-colors hover:text-[#00a8cc]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile profile: separate Popover state */}
          <div className="flex items-center gap-1.5 md:hidden">
            {user ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-1.5 text-sm font-medium text-slate-700 transition-colors hover:text-[#00a8cc]"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <ProfilePopover
                  user={user}
                  open={mobileProfileOpen}
                  onOpenChange={setMobileProfileOpen}
                  onSignOut={handleSignOut}
                  align="end"
                />
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* Mobile navigation dropdown */}
      {mobileMenuOpen && (
        <div className="space-y-3 border-t border-slate-100 bg-white px-4 pt-3 pb-6 shadow-lg md:hidden">
          {leftNavs.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`relative block py-2 text-base font-medium ${
                isNavActive(item.href)
                  ? "font-semibold text-[#00a8cc]"
                  : "text-slate-700 hover:text-[#00a8cc]"
              }`}
            >
              {item.name}

              {item.name === "My Bookings" && bookingCount > 0 && (
                <span
                  aria-label={`${bookingCount} bookings`}
                  className="absolute top-0 right-0 flex h-4 min-w-4 translate-x-1/2 -translate-y-1/3 items-center justify-center rounded-full bg-[#00a8cc] px-1 text-[10px] font-semibold leading-none text-white shadow-sm"
                >
                  {bookingCount > 99 ? "99+" : bookingCount}
                </span>
              )}
            </Link>
          ))}

          {/* Guests see Login and Sign Up in the mobile menu */}
          {!user && (
            <div className="flex flex-col space-y-3 border-t border-slate-100 pt-3">
              <Link
                href="/signin"
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
          )}
        </div>
      )}
    </header>
  );
}
