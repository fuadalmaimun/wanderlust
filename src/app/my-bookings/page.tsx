import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MyBookingCard from "./MyBookingCard";
import IDestination from "@/lib/destination";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div>Please log in to see your bookings.</div>;
  }

  const res = await fetch(
    `http://localhost:5000/my-bookings/${encodeURIComponent(session.user.email)}`,
  );

  const bookings: IDestination[] = await res.json();

  return (
    <div className="w-full flex-1 px-6 py-13 lg:px-12">
      <h1 className="font-serif text-3xl font-bold tracking-tight lg:text-4xl">
        My Bookings ({bookings.length})
      </h1>

      <p className="mt-2 text-sm text-muted-foreground">
        Manage and view your upcoming travel plans
      </p>

      {bookings.length === 0 ? (
        <div className="mt-8 rounded-xl ring-1 ring-foreground/10 bg-card p-12 text-center text-muted-foreground">
          No bookings found. Book a travel package to see it here.
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-5">
          {bookings.map((booking: IDestination) => (
            <MyBookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingPage;
