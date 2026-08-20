import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, ArrowLeft, Clock, CheckCircle, XCircle } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/bookings")({
  component: Bookings,
});

function Bookings() {
  const { user } = useAuth();

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["my-bookings", user?.id],
    enabled: !!user?.id,

    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("renter_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return data ?? [];
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">
            Unable to load bookings
          </h1>

          <p className="text-muted-foreground">
            {(error as Error).message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f2] px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-700 hover:text-green-700"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <div>
            <h1 className="text-4xl font-semibold text-gray-900">
              My Bookings
            </h1>

            <p className="text-gray-600 mt-1">
              View and manage the machinery you have booked.
            </p>
          </div>
        </div>

        {/* No bookings */}
        {!bookings || bookings.length === 0 ? (
          <div className="bg-white border rounded-2xl p-12 text-center shadow-sm">
            <CalendarDays
              size={52}
              className="mx-auto mb-4 text-green-700"
            />

            <h2 className="text-2xl font-semibold mb-2">
              No bookings yet
            </h2>

            <p className="text-gray-600">
              Your machinery bookings will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">

            {bookings.map((booking: any) => (
              <div
                key={booking.id}
                className="bg-white border rounded-2xl p-6 shadow-sm"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                  {/* Booking information */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      Machinery Booking
                    </h2>

                    <div className="space-y-2 text-gray-600">

                      <p>
                        <strong>Booking ID:</strong>{" "}
                        {booking.id}
                      </p>

                      <p>
                        <strong>Machinery ID:</strong>{" "}
                        {booking.machinery_id}
                      </p>

                      <p>
                        <strong>Start date:</strong>{" "}
                        {booking.start_date || "Not specified"}
                      </p>

                      <p>
                        <strong>End date:</strong>{" "}
                        {booking.end_date || "Not specified"}
                      </p>

                      <p>
                        <strong>Total:</strong>{" "}
                        ₹{booking.total_price ?? 0}
                      </p>

                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    {booking.status === "confirmed" ? (
                      <div className="flex items-center gap-2 text-green-700 font-medium">
                        <CheckCircle size={20} />
                        Confirmed
                      </div>
                    ) : booking.status === "cancelled" ? (
                      <div className="flex items-center gap-2 text-red-600 font-medium">
                        <XCircle size={20} />
                        Cancelled
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-orange-600 font-medium">
                        <Clock size={20} />
                        Pending owner confirmation
                      </div>
                    )}
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}