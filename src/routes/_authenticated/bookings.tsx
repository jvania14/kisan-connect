import {
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  IndianRupee,
  Loader2,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Tractor,
  Users,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute(
  "/_authenticated/bookings",
)({
  component: MachineryBookings,
});

type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

type Booking = {
  id: string;
  machinery_id: string;
  renter_id: string;
  owner_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  status: BookingStatus;
  created_at: string;

  machinery?: {
    name: string;
    category: string;
    district: string | null;
    village: string | null;
    price_per_day: number;
    image_url: string | null;
  } | null;
};

function formatDate(value: string) {
  return new Date(
    `${value}T00:00:00`,
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getDuration(
  start: string,
  end: string,
) {
  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);

  const diff =
    Math.floor(
      (endDate.getTime() -
        startDate.getTime()) /
        (1000 * 60 * 60 * 24),
    ) + 1;

  return Math.max(diff, 1);
}

function statusLabel(status: BookingStatus) {
  switch (status) {
    case "pending":
      return "Requested";

    case "confirmed":
      return "Confirmed";

    case "completed":
      return "Completed";

    case "cancelled":
      return "Cancelled";

    default:
      return status;
  }
}

function MachineryBookings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [filter, setFilter] =
    useState<"all" | BookingStatus>("all");

  const [search, setSearch] = useState("");

  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);

  const [actionLoading, setActionLoading] =
    useState(false);

  const [actionError, setActionError] =
    useState("");

  const {
    data: bookings = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["my-machinery-bookings", user?.id],

    enabled: !!user?.id,

    queryFn: async () => {
      if (!user?.id) return [];

      /*
       * Fetch bookings where the logged-in user is either:
       * renter OR machinery owner.
       *
       * This lets the same page work for both sides of
       * the machinery-sharing marketplace.
       */
      const { data, error } = await supabase
        .from("bookings")
        .select(
          `
            id,
            machinery_id,
            renter_id,
            owner_id,
            start_date,
            end_date,
            total_price,
            status,
            created_at,
            machinery:machinery_id (
              name,
              category,
              district,
              village,
              price_per_day,
              image_url
            )
          `,
        )
        .or(
          `renter_id.eq.${user.id},owner_id.eq.${user.id}`,
        )
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      return (data ?? []) as unknown as Booking[];
    },
  });

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesStatus =
        filter === "all" ||
        booking.status === filter;

      const machineName =
        booking.machinery?.name ?? "";

      const category =
        booking.machinery?.category ?? "";

      const district =
        booking.machinery?.district ?? "";

      const matchesSearch =
        !query ||
        machineName.toLowerCase().includes(query) ||
        category.toLowerCase().includes(query) ||
        district.toLowerCase().includes(query) ||
        booking.id.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [bookings, filter, search]);

  const activeCount = bookings.filter(
    (booking) =>
      booking.status === "pending" ||
      booking.status === "confirmed",
  ).length;

  const completedCount = bookings.filter(
    (booking) =>
      booking.status === "completed",
  ).length;

  const totalSpent = bookings
    .filter(
      (booking) =>
        booking.renter_id === user?.id &&
        booking.status !== "cancelled",
    )
    .reduce(
      (sum, booking) =>
        sum + Number(booking.total_price),
      0,
    );

  async function cancelBooking(id: string) {
    if (!user?.id) return;

    setActionLoading(true);
    setActionError("");

    try {
      const { error } = await supabase
        .from("bookings")
        .update({
          status: "cancelled",
        })
        .eq("id", id)
        .eq("renter_id", user.id)
        .eq("status", "pending");

      if (error) {
        throw error;
      }

      await queryClient.invalidateQueries({
        queryKey: ["my-machinery-bookings"],
      });

      setSelectedBooking(null);
    } catch (err) {
      console.error(err);

      setActionError(
        err instanceof Error
          ? err.message
          : "Unable to cancel booking.",
      );
    } finally {
      setActionLoading(false);
    }
  }

  async function confirmBooking(id: string) {
    if (!user?.id) return;

    setActionLoading(true);
    setActionError("");

    try {
      /*
       * Only the machinery owner can confirm.
       */
      const { error } = await supabase
        .from("bookings")
        .update({
          status: "confirmed",
        })
        .eq("id", id)
        .eq("owner_id", user.id)
        .eq("status", "pending");

      if (error) {
        throw error;
      }

      await queryClient.invalidateQueries({
        queryKey: ["my-machinery-bookings"],
      });

      setSelectedBooking(null);
    } catch (err) {
      console.error(err);

      setActionError(
        err instanceof Error
          ? err.message
          : "Unable to confirm booking.",
      );
    } finally {
      setActionLoading(false);
    }
  }

  async function completeBooking(id: string) {
    if (!user?.id) return;

    setActionLoading(true);
    setActionError("");

    try {
      const booking = bookings.find(
        (item) => item.id === id,
      );

      if (!booking) {
        throw new Error("Booking not found.");
      }

      const isParty =
        booking.renter_id === user.id ||
        booking.owner_id === user.id;

      if (!isParty) {
        throw new Error(
          "You are not allowed to update this booking.",
        );
      }

      const { error } = await supabase
        .from("bookings")
        .update({
          status: "completed",
        })
        .eq("id", id)
        .in("status", ["confirmed"]);

      if (error) {
        throw error;
      }

      await queryClient.invalidateQueries({
        queryKey: ["my-machinery-bookings"],
      });

      setSelectedBooking(null);
    } catch (err) {
      console.error(err);

      setActionError(
        err instanceof Error
          ? err.message
          : "Unable to complete booking.",
      );
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <section className="card-surface p-6">

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
              <CalendarDays className="h-6 w-6 text-primary" />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                Machinery Bookings
              </h1>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                Track your machinery requests,
                confirmed rentals and completed bookings.
              </p>
            </div>
          </div>

          <Button
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
            Find Machinery
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* SUMMARY */}
      <section className="grid gap-4 md:grid-cols-3">

        <SummaryCard
          icon={Clock3}
          label="Active bookings"
          value={activeCount.toString()}
          description="Requests and confirmed rentals"
        />

        <SummaryCard
          icon={PackageCheck}
          label="Completed"
          value={completedCount.toString()}
          description="Successfully completed rentals"
        />

        <SummaryCard
          icon={IndianRupee}
          label="Rental value"
          value={`₹${totalSpent.toLocaleString(
            "en-IN",
          )}`}
          description="Your machinery rental transactions"
        />
      </section>

      {/* SEARCH */}
      <section className="card-surface p-4">

        <Input
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search machine, category, location or booking ID..."
        />

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">

          {[
            ["all", "All"],
            ["pending", "Requested"],
            ["confirmed", "Confirmed"],
            ["completed", "Completed"],
            ["cancelled", "Cancelled"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() =>
                setFilter(
                  value as
                    | "all"
                    | BookingStatus,
                )
              }
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold ${
                filter === value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/70"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* LOADING */}
      {isLoading && (
        <section className="card-surface flex min-h-60 items-center justify-center">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading your bookings...
          </div>
        </section>
      )}

      {/* ERROR */}
      {error && !isLoading && (
        <section className="card-surface p-8 text-center">

          <AlertCircle className="mx-auto h-10 w-10 text-destructive" />

          <h2 className="mt-4 font-bold">
            Could not load bookings
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Please try again."}
          </p>
        </section>
      )}

      {/* BOOKINGS */}
      {!isLoading &&
        !error &&
        filteredBookings.length === 0 && (
          <EmptyBookings
            onFind={() =>
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
          />
        )}

      {!isLoading &&
        !error &&
        filteredBookings.length > 0 && (
          <section className="space-y-4">

            <div>
              <h2 className="text-lg font-semibold">
                Your bookings
              </h2>

              <p className="text-sm text-muted-foreground">
                {filteredBookings.length} booking
                {filteredBookings.length !== 1
                  ? "s"
                  : ""}{" "}
                found
              </p>
            </div>

            <div className="space-y-4">

              {filteredBookings.map(
                (booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    currentUserId={user?.id}
                    onView={() =>
                      setSelectedBooking(
                        booking,
                      )
                    }
                  />
                ),
              )}
            </div>
          </section>
        )}

      {/* HOW IT WORKS */}
      <section className="card-surface p-6">

        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-primary" />

          <div>
            <h2 className="font-semibold">
              How machinery booking works
            </h2>

            <p className="text-sm text-muted-foreground">
              A verified availability and booking flow.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">

          <FlowStep
            number="01"
            title="Request"
            text="Choose machinery and dates."
          />

          <FlowStep
            number="02"
            title="Confirm"
            text="Owner confirms the request."
          />

          <FlowStep
            number="03"
            title="Use"
            text="Use the machinery during the booked period."
          />

          <FlowStep
            number="04"
            title="Complete"
            text="Close the booking after successful work."
          />
        </div>
      </section>

      {/* DETAILS MODAL */}
      {selectedBooking && (
        <BookingDetails
          booking={selectedBooking}
          currentUserId={user?.id}
          loading={actionLoading}
          error={actionError}
          onClose={() => {
            setSelectedBooking(null);
            setActionError("");
          }}
          onCancel={() =>
            void cancelBooking(
              selectedBooking.id,
            )
          }
          onConfirm={() =>
            void confirmBooking(
              selectedBooking.id,
            )
          }
          onComplete={() =>
            void completeBooking(
              selectedBooking.id,
            )
          }
        />
      )}
    </div>
  );
}

function BookingCard({
  booking,
  currentUserId,
  onView,
}: {
  booking: Booking;
  currentUserId?: string;
  onView: () => void;
}) {
  const machine = booking.machinery;

  const isOwner =
    booking.owner_id === currentUserId;

  const location = [
    machine?.village,
    machine?.district,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <article className="card-surface p-5">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex gap-4">

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-secondary">
            <Tractor className="h-7 w-7 text-muted-foreground" />
          </div>

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="font-semibold">
                {machine?.name ??
                  "Agricultural Machinery"}
              </h3>

              <StatusBadge
                status={booking.status}
              />
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              Booking {booking.id.slice(0, 8)} •{" "}
              {machine?.category ?? "Machinery"}
            </p>

            <div className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">

              <Info
                icon={CalendarDays}
                text={`${formatDate(
                  booking.start_date,
                )} → ${formatDate(
                  booking.end_date,
                )}`}
              />

              <Info
                icon={Clock3}
                text={`${getDuration(
                  booking.start_date,
                  booking.end_date,
                )} day${
                  getDuration(
                    booking.start_date,
                    booking.end_date,
                  ) === 1
                    ? ""
                    : "s"
                }`}
              />

              <Info
                icon={MapPin}
                text={
                  location ||
                  "Location not specified"
                }
              />

              <Info
                icon={Users}
                text={
                  isOwner
                    ? "You are the machinery owner"
                    : "You requested this machinery"
                }
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-5 border-t border-border pt-4 lg:min-w-60 lg:border-l lg:border-t-0 lg:pl-5">

          <div>
            <p className="text-xs text-muted-foreground">
              Total rental
            </p>

            <p className="mt-1 text-lg font-bold">
              ₹{Number(
                booking.total_price,
              ).toLocaleString("en-IN")}
            </p>
          </div>

          <Button
            variant="outline"
            onClick={onView}
          >
            Details
          </Button>
        </div>
      </div>
    </article>
  );
}

function BookingDetails({
  booking,
  currentUserId,
  loading,
  error,
  onClose,
  onCancel,
  onConfirm,
  onComplete,
}: {
  booking: Booking;
  currentUserId?: string;
  loading: boolean;
  error: string;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  onComplete: () => void;
}) {
  const isOwner =
    booking.owner_id === currentUserId;

  const isRenter =
    booking.renter_id === currentUserId;

  const canCancel =
    isRenter &&
    booking.status === "pending";

  const canConfirm =
    isOwner &&
    booking.status === "pending";

  const canComplete =
    (isOwner || isRenter) &&
    booking.status === "confirmed";

  const machine = booking.machinery;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl">

        <div className="flex items-start justify-between border-b border-border p-5">

          <div>
            <p className="text-xs font-semibold text-primary">
              Booking #{booking.id.slice(0, 8)}
            </p>

            <h2 className="mt-1 text-xl font-bold">
              {machine?.name ??
                "Agricultural Machinery"}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {machine?.category ?? "Machinery"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-sm hover:bg-secondary"
          >
            Close
          </button>
        </div>

        <div className="space-y-6 p-5">

          <BookingTimeline
            status={booking.status}
          />

          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
              <AlertCircle className="h-5 w-5 shrink-0" />
              {error}
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">

            <DetailBox
              icon={CalendarDays}
              label="Start date"
              value={formatDate(
                booking.start_date,
              )}
            />

            <DetailBox
              icon={CalendarDays}
              label="End date"
              value={formatDate(
                booking.end_date,
              )}
            />

            <DetailBox
              icon={Clock3}
              label="Duration"
              value={`${getDuration(
                booking.start_date,
                booking.end_date,
              )} day${
                getDuration(
                  booking.start_date,
                  booking.end_date,
                ) === 1
                  ? ""
                  : "s"
              }`}
            />

            <DetailBox
              icon={IndianRupee}
              label="Total"
              value={`₹${Number(
                booking.total_price,
              ).toLocaleString("en-IN")}`}
            />
          </div>

          <div className="rounded-xl bg-secondary p-4">

            <p className="text-sm font-semibold">
              Booking status
            </p>

            <div className="mt-3 flex items-center gap-2">
              <StatusBadge
                status={booking.status}
              />

              {isOwner && (
                <span className="text-xs text-muted-foreground">
                  You are the machinery owner
                </span>
              )}

              {isRenter && (
                <span className="text-xs text-muted-foreground">
                  You requested this machinery
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">

            {canConfirm && (
              <Button
                className="flex-1"
                disabled={loading}
                onClick={onConfirm}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                )}
                Confirm Booking
              </Button>
            )}

            {canComplete && (
              <Button
                className="flex-1"
                disabled={loading}
                onClick={onComplete}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                )}
                Mark Completed
              </Button>
            )}

            {canCancel && (
              <Button
                variant="outline"
                className="flex-1"
                disabled={loading}
                onClick={onCancel}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <XCircle className="mr-2 h-4 w-4" />
                )}
                Cancel Request
              </Button>
            )}

            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookingTimeline({
  status,
}: {
  status: BookingStatus;
}) {
  const steps = [
    {
      label: "Requested",
      icon: Clock3,
    },
    {
      label: "Confirmed",
      icon: ShieldCheck,
    },
    {
      label: "Completed",
      icon: CheckCircle2,
    },
  ];

  const statusIndex =
    status === "pending"
      ? 0
      : status === "confirmed"
        ? 1
        : status === "completed"
          ? 2
          : -1;

  return (
    <div>

      <p className="mb-4 text-sm font-semibold">
        Booking progress
      </p>

      <div className="grid grid-cols-3 gap-3">

        {steps.map((step, index) => {
          const Icon = step.icon;

          const completed =
            statusIndex >= index;

          return (
            <div
              key={step.label}
              className="text-center"
            >
              <div
                className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full ${
                  completed
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>

              <p className="mt-2 text-xs font-medium">
                {step.label}
              </p>
            </div>
          );
        })}
      </div>

      {status === "cancelled" && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          <XCircle className="h-4 w-4" />
          This booking has been cancelled.
        </div>
      )}
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: BookingStatus;
}) {
  const styles: Record<
    BookingStatus,
    string
  > = {
    pending:
      "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    confirmed:
      "bg-primary/10 text-primary",
    completed:
      "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    cancelled:
      "bg-destructive/10 text-destructive",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${styles[status]}`}
    >
      {statusLabel(status)}
    </span>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: typeof Clock3;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="card-surface p-5">

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
          <Icon className="h-5 w-5 text-primary" />
        </div>

        <p className="text-2xl font-bold">
          {value}
        </p>
      </div>

      <p className="mt-4 text-sm font-semibold">
        {label}
      </p>

      <p className="mt-1 text-xs text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function Info({
  icon: Icon,
  text,
}: {
  icon: typeof MapPin;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span>{text}</span>
    </div>
  );
}

function DetailBox({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border p-4">

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-4 w-4" />
        {label}
      </div>

      <p className="mt-2 text-sm font-semibold">
        {value}
      </p>
    </div>
  );
}

function FlowStep({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-border p-4">

      <span className="text-xs font-bold text-primary">
        {number}
      </span>

      <h3 className="mt-2 text-sm font-semibold">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {text}
      </p>
    </div>
  );
}

function EmptyBookings({
  onFind,
}: {
  onFind: () => void;
}) {
  return (
    <div className="card-surface p-10 text-center">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
        <CalendarDays className="h-7 w-7 text-muted-foreground" />
      </div>

      <h2 className="mt-4 font-semibold">
        No bookings found
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Your real machinery bookings will appear here.
      </p>

      <Button
        className="mt-5"
        onClick={onFind}
      >
        Find Machinery
      </Button>
    </div>
  );
}