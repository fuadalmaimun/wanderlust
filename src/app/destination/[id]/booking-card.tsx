"use client";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import IDestination from "@/lib/destination";
import { authClient } from "@/lib/auth-client";
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
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const departureDate = formData.get("departureDate");

    console.log(departureDate);

    const data = {
      ...user,
      ...destination,
      destinationId: destination._id,
      departureDate: departureDate,
      bookingDate: new Date(),
    };

    const res = await fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const bookingData = await res.json();
    console.log(bookingData);
    toast.success(`${destination.name} booked successfully`, {
      autoClose: 1000,
    });
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
          className="mt-4"
        />

        <Button
          type="submit"
          className="mt-3 w-full bg-teal-600 text-white hover:bg-teal-700"
          size="lg"
        >
          Book Now
          <ArrowRight data-icon="inline-end" />
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
