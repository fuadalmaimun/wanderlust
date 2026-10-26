"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteDestination = ({
  destination,
}: {
  destination: {
    id?: string;
    _id?: string;
    name?: string;
    title?: string;
  };
}) => {
  const destinationId = destination._id ?? destination.id;
  const destinationName = destination.name ?? destination.title;

  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!destinationId) {
      toast.error("Cannot delete: destination id is missing");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/destinations/${destinationId}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json().catch(() => null);
      const result = Array.isArray(data) ? data[0] : data;
      const deletedCount = result?.deletedCount ?? 0;

      if (res.ok && deletedCount > 0) {
        toast.success(`${destinationName} deleted successfully`, {
          autoClose: 1500,
        });

        setTimeout(() => {
          router.push("/destination");
        }, 1000);
      } else {
        toast.error("Failed to delete destination");
      }
    } catch {
      toast.error(
        "Could not reach the backend. Make sure it is running on localhost:5000.",
      );
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger
          render={
            <Button
              variant="outline"
              className="border-destructive/40 bg-background text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 data-icon="inline-start" />
              Delete
            </Button>
          }
        />

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete <strong>{destinationName}</strong>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction variant="destructive" onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteDestination;
