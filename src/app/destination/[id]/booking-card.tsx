"use client";
import { ArrowRight, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import IDestination from "@/lib/destination";
import { authClient } from "@/lib/auth-client";
import { notifyBookingsUpdated } from "@/hooks/use-booking-count";
import { toast } from "react-toastify";

const PERKS = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

interface BookingCardProps {
  destination: IDestination;
}

export function BookingCard({ destination }: BookingCardProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [booking, setBooking] = useState(false);
  const [bookedByEmail, setBookedByEmail] = useState<string | null>(null);

  const destinationId = destination._id;

  // Already booked for this destination? Check the user's bookings once.
  useEffect(() => {
    if (!user?.email || !destinationId) return;

    let cancelled = false;

    const checkExistingBooking = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${encodeURIComponent(user.email)}`,
          { cache: "no-store" },
        );

        if (!res.ok) return;

        const data = await res.json();
        if (cancelled || !Array.isArray(data)) return;

        const alreadyBooked = data.some(
          (b: { destinationId?: string }) =>
            String(b?.destinationId) === String(destinationId),
        );

        if (alreadyBooked) setBookedByEmail(user.email);
      } catch {
        // Backend not running — leave the button usable.
      }
    };

    checkExistingBooking();

    return () => {
      cancelled = true;
    };
  }, [user?.email, destinationId]);

  // Only counts for the currently signed-in user (safe across sign-outs).
  const alreadyBooked = Boolean(user?.email && bookedByEmail === user.email);

  const handleBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (booking) return;

    if (!user) {
      toast.error("Please sign in to book this trip");
      router.push("/signin");
      return;
    }

    if (alreadyBooked) {
      toast.info("You have already booked this destination");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const departureDate = formData.get("departureDate");

    if (!departureDate) {
      toast.error("Please pick a departure date");
      return;
    }

    const data = {
      ...user,
      ...destination,
      destinationId: destination._id,
      departureDate,
      bookingDate: new Date().toISOString(),
    };

    setBooking(true);
    try {
      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(`Booking failed: ${res.status}`);

      setBookedByEmail(user.email); // lock the button right away
      toast.success(`${destination.name} booked successfully!`, {
        autoClose: 1000,
        position: "bottom-right",
      });
      notifyBookingsUpdated(); 
      router.refresh();
    } catch {
      toast.error(
        "Could not complete the booking. Make sure the backend is running on localhost:5000."
      );
    } finally {
      setBooking(false);
    }
  };

  return (
    <aside className="w-full shrink-0 self-start rounded-xl bg-card p-6 ring-1 ring-foreground/10 lg:w-80">
      <p className="text-sm text-muted-foreground">Starting from</p>

      <p className="mt-1 font-heading text-3xl font-semibold text-teal-600">
        ${destination.price}
      </p>

      <p className="text-sm text-muted-foreground">per person</p>

      <form onSubmit={handleBook}>
        <Input
          type="date"
          name="departureDate"
          aria-label="Departure Date"
          defaultValue={destination.departureDate}
          required
          className="mt-4"
        />

        <Button
          type="submit"
          className={`mt-3 w-full text-white ${
            alreadyBooked
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-teal-600 hover:bg-teal-700"
          }`}
          size="lg"
          disabled={booking || alreadyBooked}
        >
          {booking ? "Booking..." : alreadyBooked ? "Already Booked" : "Book Now"}
          {alreadyBooked ? (
            <Check data-icon="inline-end" />
          ) : (
            <ArrowRight data-icon="inline-end" />
          )}
        </Button>
      </form>

      <ul className="mt-5 space-y-2 text-sm">
        {PERKS.map((perk) => (
          <li key={perk} className="flex items-center gap-2">
            <Check className="size-4 shrink-0 text-teal-600" />
            <span className="text-muted-foreground">{perk}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
