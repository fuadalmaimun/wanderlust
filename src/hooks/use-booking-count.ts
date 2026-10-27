"use client";

import { useEffect, useState } from "react";

/**
 * Dispatched whenever a booking is created or cancelled so the navbar
 * badge refreshes immediately (see notifyBookingsUpdated).
 */
export const BOOKINGS_UPDATED_EVENT = "wanderlust:bookings-updated";

export const notifyBookingsUpdated = () => {
  window.dispatchEvent(new CustomEvent(BOOKINGS_UPDATED_EVENT));
};

/**
 * Number of bookings for the signed-in user, read from the same
 * `GET /my-bookings/:email` endpoint the My Bookings page uses.
 * Pass a value (e.g. the pathname) as `refreshKey` to re-fetch on navigation.
 */
const useBookingCount = (email: string | undefined, refreshKey?: unknown) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!email) return;

    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/my-bookings/${encodeURIComponent(email)}`,
          { cache: "no-store" },
        );

        if (!res.ok) return;

        const data = await res.json();
        if (!cancelled && Array.isArray(data)) {
          setCount(data.length);
        }
      } catch {
        // Backend not running — keep the last known count.
      }
    };

    load();

    // Refetch right away after a booking/cancel anywhere in the app.
    window.addEventListener(BOOKINGS_UPDATED_EVENT, load);

    return () => {
      cancelled = true;
      window.removeEventListener(BOOKINGS_UPDATED_EVENT, load);
    };
  }, [email, refreshKey]);

  // Signed-out users always show no badge.
  return email ? count : 0;
};

export default useBookingCount;
