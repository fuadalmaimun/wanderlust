"use client";

import {
  Calendar,
  CircleCheck,
  Clock,
  Eye,
  MapPin,
  Trash2,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { format, isValid, parseISO } from "date-fns";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import IDestination from "@/lib/destination";
import { notifyBookingsUpdated } from "@/hooks/use-booking-count";

// Booking-এর data কেমন হবে
type IBooking = IDestination;

const MyBookingCard = ({ booking }: { booking: IBooking }) => {
  const router = useRouter();

  // Cancel চলার সময় button disable রাখব
  const [isCancelling, setIsCancelling] = useState(false);

  // Status অনুযায়ী design
  const isConfirmed = booking.status?.toLowerCase() === "confirmed";

  const status = isConfirmed
    ? {
        label: "Pending",
        icon: Clock,
        className: "bg-amber-100 text-amber-600",
      }
    : {
        label: "Confirmed",
        icon: CircleCheck,
        className: "bg-emerald-100 text-emerald-600",
      };

  const StatusIcon = status.icon;

  const date = booking.departureDate;

  const departure =
    date && isValid(parseISO(date))
      ? format(parseISO(date), "MMMM d, yyyy")
      : date || "—";


  const detailId = booking.destinationId;

  // Cancel button-এর কাজ
  const handleCancelBooking = async () => {
    if (isCancelling) return;
    setIsCancelling(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${booking._id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json().catch(() => null);

      if (res.ok && (data?.deletedCount ?? 0) > 0) {
        toast.success("Booking cancelled successfully", {
          autoClose: 1000,
        });

        notifyBookingsUpdated(); // refresh the navbar "My Bookings" badge
        router.refresh();
      } else {
        toast.error("Failed to cancel booking");
      }
    } catch {
      toast.error(
        "Could not reach the backend. Make sure it is running on localhost:5000.",
      );
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <article className="flex flex-col gap-4 rounded-lg border bg-card p-3.5 shadow-sm sm:flex-row">
      {/* Destination image */}
      <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-md sm:h-32 sm:w-64">
        {booking.imageUrl ? (
          <Image
            src={booking.imageUrl}
            alt={booking.name}
            fill
            sizes="(max-width: 640px) 100vw, 256px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-teal-50">
            <MapPin className="size-6 text-teal-500" />
          </div>
        )}
      </div>

      {/* Booking details */}
      <div className="flex flex-1 flex-col">
        <Badge className={status.className}>
          <StatusIcon data-icon="inline-start" />
          {status.label}
        </Badge>

        <h2 className="mt-2 font-serif text-xl font-bold">{booking.name}</h2>

        <div className="mt-2 space-y-1.5 text-[13px] text-muted-foreground">
          <p className="flex items-center gap-2">
            <Calendar className="size-3.5" />
            Departure: {departure}
          </p>

          <p className="flex items-center gap-2">
            <MapPin className="size-3.5" />
            <span className="min-w-0 break-all">
              Booking ID: {booking.bookingId ?? booking._id}
            </span>
          </p>
        </div>

        {/* Price and buttons */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
          <p className="text-2xl font-bold text-[#1399B6]">${booking.price}</p>

          <div className="flex gap-2.5">
            <Button
              type="button"
              onClick={handleCancelBooking}
              disabled={isCancelling}
              size="sm"
              variant="outline"
              className="border-red-200 text-red-500 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 data-icon="inline-start" />
              {isCancelling ? "Cancelling..." : "Cancel"}
            </Button>

            {detailId ? (
              <Link
                href={`/destination/${detailId}`}
                className="inline-flex h-8 items-center justify-center gap-2 rounded-md bg-teal-600 px-3 text-sm font-medium text-white hover:bg-teal-700"
              >
                <Eye className="size-4" />
                View
              </Link>
            ) : (
              <Button type="button" size="sm" disabled>
                <Eye data-icon="inline-start" />
                View
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default MyBookingCard;
