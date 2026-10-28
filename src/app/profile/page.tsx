import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileView from "./ProfileView";

type Booking = {
  country?: string;
  price?: string | number;
  departureDate?: string;
  location?: string;
  nationality?: string;
};

const getStats = async (email: string) => {
  const stats = {
    totalBookings: 0,
    countriesVisited: 0,
    upcomingTrips: 0,
    totalSpent: 0,
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${encodeURIComponent(email)}`,
      { cache: "no-store" },
    );

    if (!res.ok) return stats;

    const data = await res.json();
    if (!Array.isArray(data)) return stats;

    const bookings: Booking[] = data;
    const now = Date.now();
    const countries = new Set<string>();

    for (const booking of bookings) {
      if (booking.country) countries.add(booking.country);

      const price = Number(booking.price);
      if (!Number.isNaN(price)) stats.totalSpent += price;

      const departure = booking.departureDate
        ? new Date(booking.departureDate).getTime()
        : NaN;
      if (!Number.isNaN(departure) && departure >= now) {
        stats.upcomingTrips += 1;
      }
    }

    stats.totalBookings = bookings.length;
    stats.countriesVisited = countries.size;
  } catch {
    // Backend not running — show zeroed stats instead of crashing.
  }

  return stats;
};

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  const stats = await getStats(session.user.email);

  return (
    <ProfileView
      user={{
        name: session.user.name,
        email: session.user.email,
        image: session.user.image ?? null,
        location: session.user.location ?? null,
        nationality: session.user.nationality ?? null,
        createdAt: session.user.createdAt,
      }}
      stats={stats}
    />
  );
};

export default ProfilePage;
