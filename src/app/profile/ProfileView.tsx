"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  DollarSign,
  Globe2,
  MapPin,
  Pencil,
  Plane,
  TrendingUp,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ProfileUser = {
  name: string | null;
  email: string;
  image: string | null;
  location: string | null;
  nationality: string | null;
  createdAt: string | Date | null;
};
type Stats = {
  totalBookings: number;
  countriesVisited: number;
  upcomingTrips: number;
  totalSpent: number;
};

const STAT_CARDS = [
  {
    label: "Total Bookings",
    key: "totalBookings" as const,
    icon: Plane,
    iconClassName: "bg-sky-100 text-sky-500",
    format: (value: number) => String(value),
  },
  {
    label: "Countries Visited",
    key: "countriesVisited" as const,
    icon: Globe2,
    iconClassName: "bg-emerald-100 text-emerald-500",
    format: (value: number) => String(value),
  },
  {
    label: "Upcoming Trips",
    key: "upcomingTrips" as const,
    icon: TrendingUp,
    iconClassName: "bg-orange-100 text-orange-500",
    format: (value: number) => String(value),
  },
  {
    label: "Total Spent",
    key: "totalSpent" as const,
    icon: DollarSign,
    iconClassName: "bg-pink-100 text-pink-500",
    format: (value: number) => `$${value.toLocaleString("en-US")}`,
  },
];

export default function ProfileView({
  user,
  stats,
}: {
  user: ProfileUser;
  stats: Stats;
}) {
  const router = useRouter();
  const { refetch } = authClient.useSession();

  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(user.name ?? "");
  const [image, setImage] = useState(user.image ?? "");

  const memberSince = user.createdAt
    ? format(new Date(user.createdAt), "MMM yyyy")
    : "—";

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);

    try {
      const payload: { name: string; image?: string } = { name };
      if (image) payload.image = image;

      const { error } = await authClient.updateUser(payload);

      if (error) {
        toast.error(error.message ?? "Could not update the profile");
        return;
      }

      toast.success("Profile updated successfully", {
        autoClose: 1000,
        position: "bottom-right",
      });
      setOpen(false);
      await refetch();
      router.refresh();
    } catch {
      toast.error("Could not update the profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 w-full px-6 py-13 lg:px-12">
      <h1 className="font-serif text-3xl font-bold tracking-tight lg:text-4xl">
        My Profile
      </h1>

      <p className="mt-2 text-sm text-muted-foreground">
        Manage your account settings and travel preferences
      </p>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
        {/* Profile Card */}
        <div className="w-full rounded-2xl border bg-card p-6 text-center shadow-sm lg:w-[300px] lg:shrink-0">
          <div className="relative mx-auto w-fit">
            <Avatar className="size-28">
              <AvatarImage
                referrerPolicy="no-referrer"
                src={user.image ?? ""}
                alt={user.name ?? "User"}
              />
              <AvatarFallback className="text-2xl">
                {user.name?.charAt(0)?.toUpperCase() ?? "U"}
              </AvatarFallback>
            </Avatar>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Change profile photo"
              className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full bg-[#1399B6] text-white shadow-md transition-colors hover:bg-[#10859e]"
            >
              <Camera className="size-4" />
            </button>
          </div>

          <h2 className="mt-4 text-xl font-bold">{user.name ?? "User"}</h2>

          <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            {user.location}
          </p>

          <div className="mt-5 space-y-3 border-t pt-4 text-left text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Member since</span>
              <span className="font-semibold">{memberSince}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Nationality</span>
              <span className="font-semibold">{user.nationality}</span>
            </div>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              render={
                <Button className="mt-5 w-full bg-[#1399B6] text-white hover:bg-[#10859e]">
                  <Pencil data-icon="inline-start" />
                  Edit Profile
                </Button>
              }
            />

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your display name and profile photo
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="profile-name">Full Name</Label>
                  <Input
                    id="profile-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="profile-image">Image URL</Label>
                  <Input
                    id="profile-image"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>

                <DialogFooter className="-mx-4 -mb-4 bg-transparent">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-border bg-background"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#1399B6] text-white hover:bg-[#10859e]"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Travel Statistics */}
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold">Travel Statistics</h2>

          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {STAT_CARDS.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="flex items-start justify-between gap-3 rounded-xl border bg-card p-5"
                >
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold">
                      {stat.format(stats[stat.key])}
                    </p>
                  </div>

                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full ${stat.iconClassName}`}
                  >
                    <Icon className="size-4" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
