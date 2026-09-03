import {
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Check,
  Clock3,
  IndianRupee,
  Loader2,
  MapPin,
  ShieldCheck,
  Tractor,
  Users,
  AlertCircle,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute(
  "/_authenticated/machinery/$id",
)({
  component: MachineryDetails,
});

type MachineryRow = {
  id: string;
  owner_id: string;
  name: string;
  category: string;
  brand: string | null;
  model: string | null;
  description: string | null;
  price_per_day: number;
  price_per_hour: number | null;
  state: string | null;
  district: string | null;
  village: string | null;
  latitude: number | null;
  longitude: number | null;
  image_url: string | null;
  available_from: string | null;
  available_until: string | null;
  rating: number | null;
  is_verified: boolean;
  is_active: boolean;
};

type BookingRow = {
  id: string;
  machinery_id: string;
  renter_id: string;
  owner_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: string;
  created_at: string;
};

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function dateDiffInclusive(start: string, end: string) {
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);

  if (
    Number.isNaN(startDate.getTime()) ||
    Number.isNaN(endDate.getTime())
  ) {
    return 0;
  }

  return Math.floor(
    (endDate.getTime() - startDate.getTime()) /
      (1000 * 60 * 60 * 24),
  ) + 1;
}

function MachineryDetails() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const { id } = Route.useParams();

  const [startDate, setStartDate] = useState(todayISO());
  const [endDate, setEndDate] = useState(todayISO());

  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");

  const { data: machinery, isLoading, error } =
    useQuery({
      queryKey: ["machinery-detail", id],

      queryFn: async () => {
        const { data, error } = await supabase
          .from("machinery")
          .select("*")
          .eq("id", id)
          .maybeSingle();

        if (error) throw error;

        return data as MachineryRow | null;
      },
    });

  const { data: existingBookings = [] } =
    useQuery({
      queryKey: ["machinery-bookings", id],

      enabled: !!id,

      queryFn: async () => {
        const { data, error } = await supabase
          .from("bookings")
          .select(
            "id, machinery_id, renter_id, owner_id, start_date, end_date, total_price, status, created_at",
          )
          .eq("machinery_id", id)
          .in("status", ["pending", "confirmed"]);

        if (error) throw error;

        return (data ?? []) as BookingRow[];
      },
    });

  const numberOfDays = useMemo(
    () => dateDiffInclusive(startDate, endDate),
    [startDate, endDate],
  );

  const pricePerDay = Number(
    machinery?.price_per_day ?? 0,
  );

  const rentalCost =
    numberOfDays > 0
      ? numberOfDays * pricePerDay
      : 0;

  const dateError =
    startDate &&
    endDate &&
    endDate < startDate
      ? "End date cannot be before start date."
      : "";

  const availabilityError = useMemo(() => {
    if (!startDate || !endDate || endDate < startDate) {
      return "";
    }

    const clash = existingBookings.some(
      (booking) =>
        booking.start_date <= endDate &&
        booking.end_date >= startDate,
    );

    return clash
      ? "This machinery is already booked for the selected dates."
      : "";
  }, [existingBookings, startDate, endDate]);

  const outsideAvailabilityError = useMemo(() => {
    if (!machinery || !startDate || !endDate) {
      return "";
    }

    if (
      machinery.available_from &&
      startDate < machinery.available_from
    ) {
      return `Available from ${machinery.available_from}.`;
    }

    if (
      machinery.available_until &&
      endDate > machinery.available_until
    ) {
      return `Available only until ${machinery.available_until}.`;
    }

    return "";
  }, [machinery, startDate, endDate]);

  const finalAvailabilityError =
    dateError ||
    availabilityError ||
    outsideAvailabilityError;

  async function handleBooking() {
    setBookingError("");
    setBookingSuccess(false);

    if (!user?.id) {
      setBookingError(
        "Please log in before booking machinery.",
      );
      return;
    }

    if (!machinery) {
      setBookingError(
        "Machinery information is unavailable.",
      );
      return;
    }

    if (machinery.owner_id === user.id) {
      setBookingError(
        "You cannot book your own machinery.",
      );
      return;
    }

    if (finalAvailabilityError) {
      setBookingError(finalAvailabilityError);
      return;
    }

    if (numberOfDays <= 0) {
      setBookingError(
        "Please select valid booking dates.",
      );
      return;
    }

    setBookingLoading(true);

    try {
      /*
       * Re-check availability immediately before INSERT.
       * This protects against another user booking the same
       * machine after our initial page load.
       */
      const { data: latestBookings, error: checkError } =
        await supabase
          .from("bookings")
          .select(
            "id, start_date, end_date, status",
          )
          .eq("machinery_id", machinery.id)
          .in("status", ["pending", "confirmed"]);

      if (checkError) {
        throw checkError;
      }

      const hasClash = (latestBookings ?? []).some(
        (booking) =>
          booking.start_date <= endDate &&
          booking.end_date >= startDate,
      );

      if (hasClash) {
        throw new Error(
          "This machinery was just booked for the selected dates. Please choose different dates.",
        );
      }

      const { error: insertError } =
        await supabase.from("bookings").insert({
          machinery_id: machinery.id,
          renter_id: user.id,
          owner_id: machinery.owner_id,
          start_date: startDate,
          end_date: endDate,
          total_price: rentalCost,
          status: "pending",
        });

      if (insertError) {
        throw insertError;
      }

      setBookingSuccess(true);
    } catch (err) {
      console.error("Booking error:", err);

      setBookingError(
        err instanceof Error
          ? err.message
          : "Unable to create booking. Please try again.",
      );
    } finally {
      setBookingLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading machinery...
        </div>
      </div>
    );
  }

  if (error || !machinery) {
    return (
      <div className="space-y-5">
        <Button
          variant="ghost"
          onClick={() =>
            navigate({
              to: "/machinery",
              search: {
                q: "",
                category: "",
                start: "",
                end: "",
              },
            })
          }
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Machinery
        </Button>

        <section className="card-surface p-10 text-center">
          <AlertCircle className="mx-auto h-10 w-10 text-destructive" />

          <h1 className="mt-4 text-xl font-bold">
            Machinery not found
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            This machinery listing may have been removed
            or is no longer available.
          </p>
        </section>
      </div>
    );
  }

  const location = [
    machinery.village,
    machinery.district,
    machinery.state,
  ]
    .filter(Boolean)
    .join(", ");

  const imageUrl =
    machinery.image_url ||
    "/src/assets/tractor.jpg";

  return (
    <div className="space-y-6">

      {/* BACK */}
      <Button
        variant="ghost"
        onClick={() =>
          navigate({
            to: "/machinery",
            search: {
              q: "",
              category: "",
              start: "",
              end: "",
            },
          })
        }
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Machinery
      </Button>

      {/* HEADER */}
      <section className="card-surface overflow-hidden">
        <div className="grid lg:grid-cols-2">

          <div className="relative min-h-[320px] bg-secondary">
            <img
              src={imageUrl}
              alt={machinery.name}
              className="h-full min-h-[320px] w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />

            <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold">
              {machinery.category}
            </div>
          </div>

          <div className="p-6 lg:p-8">

            <div className="flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-primary" />

              <span className="text-sm font-semibold text-primary">
                {machinery.is_verified
                  ? "VERIFIED MACHINERY"
                  : "MACHINERY LISTING"}
              </span>
            </div>

            <h1 className="mt-2 text-3xl font-bold">
              {machinery.name}
            </h1>

            {(machinery.brand || machinery.model) && (
              <p className="mt-2 text-sm text-muted-foreground">
                {[machinery.brand, machinery.model]
                  .filter(Boolean)
                  .join(" • ")}
              </p>
            )}

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {machinery.description ||
                "Agricultural machinery available for local farmers."}
            </p>

            <div className="mt-6 space-y-4">

              <DetailRow
                icon={Users}
                label="Owner"
                value={
                  machinery.owner_id === user?.id
                    ? "You"
                    : "Verified machinery owner"
                }
              />

              <DetailRow
                icon={MapPin}
                label="Location"
                value={location || "Location not specified"}
              />

              <DetailRow
                icon={IndianRupee}
                label="Rental"
                value={`₹${pricePerDay.toLocaleString(
                  "en-IN",
                )}/day`}
              />

              {machinery.price_per_hour && (
                <DetailRow
                  icon={Clock3}
                  label="Hourly"
                  value={`₹${Number(
                    machinery.price_per_hour,
                  ).toLocaleString("en-IN")}/hour`}
                />
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">

              {machinery.rating !== null && (
                <span className="rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                  ★ {Number(machinery.rating).toFixed(1)}
                </span>
              )}

              <span
                className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
                  machinery.is_active
                    ? "bg-primary/10 text-primary"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {machinery.is_active
                  ? "Active listing"
                  : "Inactive"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* AVAILABILITY */}
      <section className="card-surface p-6">

        <div className="flex items-start gap-3">
          <CalendarDays className="mt-1 h-6 w-6 text-primary" />

          <div>
            <h2 className="text-xl font-bold">
              Check availability
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Select the dates you need this machinery.
              Existing bookings are checked automatically.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">

          <div>
            <label
              htmlFor="start-date"
              className="text-sm font-medium"
            >
              Start date
            </label>

            <Input
              id="start-date"
              className="mt-2"
              type="date"
              min={todayISO()}
              value={startDate}
              onChange={(event) => {
                setStartDate(event.target.value);
                setBookingError("");
              }}
            />
          </div>

          <div>
            <label
              htmlFor="end-date"
              className="text-sm font-medium"
            >
              End date
            </label>

            <Input
              id="end-date"
              className="mt-2"
              type="date"
              min={startDate || todayISO()}
              value={endDate}
              onChange={(event) => {
                setEndDate(event.target.value);
                setBookingError("");
              }}
            />
          </div>
        </div>

        {finalAvailabilityError && (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{finalAvailabilityError}</span>
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-3">

          <InfoBox
            icon={CalendarDays}
            label="Duration"
            value={
              numberOfDays > 0
                ? `${numberOfDays} day${
                    numberOfDays === 1 ? "" : "s"
                  }`
                : "Invalid dates"
            }
          />

          <InfoBox
            icon={IndianRupee}
            label="Daily rate"
            value={`₹${pricePerDay.toLocaleString(
              "en-IN",
            )}`}
          />

          <InfoBox
            icon={ShieldCheck}
            label="Estimated total"
            value={`₹${rentalCost.toLocaleString(
              "en-IN",
            )}`}
          />
        </div>

        {/* BOOKING */}
        <div className="mt-6 border-t border-border pt-6">

          {bookingSuccess ? (
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-6 w-6" />
                </div>

                <div>
                  <h3 className="text-lg font-bold">
                    Booking request sent successfully
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Your request has been saved. The machinery
                    owner can now confirm the booking.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">

                <Button
                  onClick={() =>
                    navigate({
                      to: "/bookings",
                    })
                  }
                >
                  View My Bookings
                </Button>

                <Button
                  variant="outline"
                  onClick={() =>
                    navigate({
                      to: "/machinery",
                      search: {
                        q: "",
                        category: "",
                        start: "",
                        end: "",
                      },
                    })
                  }
                >
                  Find More Machinery
                </Button>
              </div>
            </div>
          ) : (
            <>
              {bookingError && (
                <div className="mb-4 flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
                  <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>{bookingError}</span>
                </div>
              )}

              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div>
                  <p className="text-sm text-muted-foreground">
                    Estimated rental cost
                  </p>

                  <p className="text-3xl font-bold">
                    ₹{rentalCost.toLocaleString(
                      "en-IN",
                    )}
                  </p>
                </div>

                <Button
                  className="h-12 px-8"
                  disabled={
                    bookingLoading ||
                    !machinery.is_active ||
                    !!finalAvailabilityError ||
                    !user?.id
                  }
                  onClick={handleBooking}
                >
                  {bookingLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>
                      <CalendarDays className="mr-2 h-5 w-5" />
                      Request Machinery Booking
                    </>
                  )}
                </Button>
              </div>

              {!user?.id && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Please log in to request a machinery booking.
                </p>
              )}

              {machinery.owner_id === user?.id && (
                <p className="mt-3 text-xs text-muted-foreground">
                  You own this machinery, so you cannot book it
                  yourself.
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {/* MARKET LINKAGE */}
      <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6">

        <div className="flex gap-3">
          <Tractor className="mt-1 h-6 w-6 shrink-0 text-primary" />

          <div>
            <h2 className="font-semibold">
              Lower production cost → improve net realization
            </h2>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Renting machinery can reduce upfront equipment
              costs. Farmers can then use Kisan Connect market
              intelligence to find better crop selling
              opportunities.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          className="mt-5"
          onClick={() =>
            navigate({
              to: "/dashboard",
            })
          }
        >
          Go to Market Dashboard
        </Button>
      </section>

      <div className="rounded-xl bg-secondary p-4 text-xs leading-5 text-muted-foreground">
        <strong>Booking protection:</strong> availability is
        checked before submission, and the Supabase database also
        prevents overlapping pending or confirmed bookings.
      </div>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
        <Icon className="h-4 w-4 text-primary" />
      </div>

      <div>
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="text-sm font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}

function InfoBox({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarDays;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-secondary p-4">
      <Icon className="h-5 w-5 text-primary" />

      <p className="mt-3 text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 font-semibold">
        {value}
      </p>
    </div>
  );
}