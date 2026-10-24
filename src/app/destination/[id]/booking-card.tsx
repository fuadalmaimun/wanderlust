"use client";

import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PERKS = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

export function BookingCard({
  price,
  departureDate,
}: {
  price: string | number;
  departureDate?: string;
}) {
  const [date, setDate] = useState(departureDate ?? "");

  const handleBook = () => {
    // TODO: persist the booking once a backend endpoint exists.
    console.log("Price:", price, "Departure Date:", date);
  };

  return (
    <aside className="w-full lg:w-80 shrink-0 self-start rounded-xl bg-card p-6 ring-1 ring-foreground/10">
      <p className="text-sm text-muted-foreground">Starting from</p>
      <p className="mt-1 font-heading text-3xl font-semibold text-teal-600">
        ${price}
      </p>
      <p className="text-sm text-muted-foreground">per person</p>

      <Input
        type="date"
        aria-label="Booking date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="mt-4"
      />

      <Button
        className="mt-3 w-full bg-teal-600 text-white hover:bg-teal-700"
        size="lg"
        onClick={handleBook}
      >
        Book Now
        <ArrowRight data-icon="inline-end" />
      </Button>

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
