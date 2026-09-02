import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  IndianRupee,
  MapPin,
  PackageCheck,
  Phone,
  ShieldCheck,
  Tractor,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute(
  "/_authenticated/bookings",
)({
  component: MachineryBookings,
});

type BookingStatus =
  | "Requested"
  | "Confirmed"
  | "In Progress"
  | "Completed"
  | "Cancelled";

type Booking = {
  id: string;
  machine: string;
  category: string;
  owner: string;
  location: string;
  distance: number;
  date: string;
  time: string;
  duration: string;
  rate: number;
  total: number;
  status: BookingStatus;
  verified: boolean;
};

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "BK-1048",
    machine: "Mahindra 575 DI Tractor",
    category: "Tractor",
    owner: "Ramesh Patil",
    location: "Nashik",
    distance: 12,
    date: "Sep 04, 2026",
    time: "08:00 AM",
    duration: "1 day",
    rate: 4500,
    total: 4500,
    status: "Confirmed",
    verified: true,
  },
  {
    id: "BK-1032",
    machine: "Fieldking Rotavator",
    category: "Rotavator",
    owner: "Ganesh Shinde",
    location: "Ahmednagar",
    distance: 24,
    date: "Sep 07, 2026",
    time: "07:30 AM",
    duration: "6 hours",
    rate: 550,
    total: 3300,
    status: "Requested",
    verified: true,
  },
  {
    id: "BK-0981",
    machine: "Sonalika Multi Crop Harvester",
    category: "Harvester",
    owner: "Maharashtra Farm Services",
    location: "Nashik",
    distance: 18,
    date: "Aug 28, 2026",
    time: "09:00 AM",
    duration: "1 day",
    rate: 8000,
    total: 8000,
    status: "Completed",
    verified: true,
  },
];

const STATUS_FILTERS = [
  "All",
  "Requested",
  "Confirmed",
  "In Progress",
  "Completed",
  "Cancelled",
] as const;

function MachineryBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] =
    useState<Booking[]>(INITIAL_BOOKINGS);

  const [filter, setFilter] =
    useState<(typeof STATUS_FILTERS)[number]>("All");

  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);

  const [search, setSearch] = useState("");

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesStatus =
        filter === "All" ||
        booking.status === filter;

      const matchesSearch =
        !query ||
        booking.machine.toLowerCase().includes(query) ||
        booking.owner.toLowerCase().includes(query) ||
        booking.location.toLowerCase().includes(query) ||
        booking.id.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [bookings, filter, search]);

  const activeCount = bookings.filter(
    (booking) =>
      booking.status === "Requested" ||
      booking.status === "Confirmed" ||
      booking.status === "In Progress",
  ).length;

  const completedCount = bookings.filter(
    (booking) => booking.status === "Completed",
  ).length;

  const totalSpent = bookings
    .filter((booking) => booking.status === "Completed")
    .reduce((sum, booking) => sum + booking.total, 0);

  function cancelBooking(id: string) {
    setBookings((current) =>
      current.map((booking) =>
        booking.id === id
          ? { ...booking, status: "Cancelled" }
          : booking,
      ),
    );

    setSelectedBooking(null);
  }

  function simulateConfirmation(id: string) {
    setBookings((current) =>
      current.map((booking) =>
        booking.id === id
          ? { ...booking, status: "Confirmed" }
          : booking,
      ),
    );

    setSelectedBooking((current) =>
      current?.id === id
        ? { ...current, status: "Confirmed" }
        : current,
    );
  }

  return (
    <div className="space-y-6">
      {/* =====================================================
          HEADER
      ===================================================== */}

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
                Track equipment requests, confirmed rentals,
                work progress and completed bookings from one
                place.
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

      {/* =====================================================
          SUMMARY
      ===================================================== */}

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
          label="Completed spend"
          value={`₹${totalSpent.toLocaleString("en-IN")}`}
          description="Across completed demo bookings"
        />
      </section>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <section className="card-surface p-4">
        <Input
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search booking, machine, owner or location..."
        />

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilter(status)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold ${
                filter === status
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/70"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </section>

      {/* =====================================================
          BOOKINGS
      ===================================================== */}

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">
            Your bookings
          </h2>

          <p className="text-sm text-muted-foreground">
            {filteredBookings.length} booking
            {filteredBookings.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {filteredBookings.length === 0 ? (
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
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onView={() =>
                  setSelectedBooking(booking)
                }
              />
            ))}
          </div>
        )}
      </section>

      {/* =====================================================
          BOOKING FLOW
      ===================================================== */}

      <section className="card-surface p-6">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-primary" />

          <div>
            <h2 className="font-semibold">
              How machinery booking works
            </h2>

            <p className="text-sm text-muted-foreground">
              A simple verified flow for local equipment
              sharing.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <FlowStep
            number="01"
            title="Request"
            text="Select equipment and submit your requirement."
          />

          <FlowStep
            number="02"
            title="Confirm"
            text="Owner confirms the date, rate and availability."
          />

          <FlowStep
            number="03"
            title="Use"
            text="Equipment is delivered or collected as agreed."
          />

          <FlowStep
            number="04"
            title="Complete"
            text="Booking is closed after successful work."
          />
        </div>
      </section>

      {/* =====================================================
          MARKET LINKAGE CONNECTION
      ===================================================== */}

      <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold text-primary">
              WHY THIS MODULE EXISTS
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Machinery cost affects your final crop income
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Before accepting a buyer offer, farmers can
              understand their operating costs and make a
              better net-realization decision.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() =>
              navigate({
                to: "/dashboard",
              })
            }
          >
            Open Market Dashboard
          </Button>
        </div>
      </section>

      {/* =====================================================
          DETAILS
      ===================================================== */}

      {selectedBooking && (
        <BookingDetails
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onCancel={() =>
            cancelBooking(selectedBooking.id)
          }
          onConfirm={() =>
            simulateConfirmation(selectedBooking.id)
          }
        />
      )}

      <div className="rounded-xl bg-secondary p-4 text-xs leading-5 text-muted-foreground">
        <strong>Prototype note:</strong> booking records and
        statuses shown here are demonstration data. Production
        deployment should connect these actions to verified
        owners, real availability, payment records and
        transaction history.
      </div>
    </div>
  );
}

/* =========================================================
   BOOKING CARD
========================================================= */

function BookingCard({
  booking,
  onView,
}: {
  booking: Booking;
  onView: () => void;
}) {
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
                {booking.machine}
              </h3>

              <StatusBadge status={booking.status} />
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              Booking {booking.id} • {booking.category}
            </p>

            <div className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
              <Info
                icon={Users}
                text={booking.owner}
              />

              <Info
                icon={MapPin}
                text={`${booking.location} • ${booking.distance} km`}
              />

              <Info
                icon={CalendarDays}
                text={booking.date}
              />

              <Info
                icon={Clock3}
                text={`${booking.time} • ${booking.duration}`}
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
              ₹{booking.total.toLocaleString("en-IN")}
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

/* =========================================================
   DETAILS
========================================================= */

function BookingDetails({
  booking,
  onClose,
  onCancel,
  onConfirm,
}: {
  booking: Booking;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const canCancel =
    booking.status === "Requested" ||
    booking.status === "Confirmed";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl">
        <div className="flex items-start justify-between border-b border-border p-5">
          <div>
            <p className="text-xs font-semibold text-primary">
              {booking.id}
            </p>

            <h2 className="mt-1 text-xl font-bold">
              {booking.machine}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {booking.owner} • {booking.location}
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
          <BookingTimeline status={booking.status} />

          <div className="grid gap-3 sm:grid-cols-2">
            <DetailBox
              icon={CalendarDays}
              label="Date"
              value={booking.date}
            />

            <DetailBox
              icon={Clock3}
              label="Time"
              value={booking.time}
            />

            <DetailBox
              icon={MapPin}
              label="Location"
              value={`${booking.location} (${booking.distance} km)`}
            />

            <DetailBox
              icon={IndianRupee}
              label="Total"
              value={`₹${booking.total.toLocaleString(
                "en-IN",
              )}`}
            />
          </div>

          <div className="rounded-xl bg-secondary p-4">
            <p className="text-sm font-semibold">
              Rental summary
            </p>

            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Duration
                </span>
                <span>{booking.duration}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Rental rate
                </span>
                <span>
                  ₹{booking.rate.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between border-t border-border pt-2 font-semibold">
                <span>Total</span>
                <span>
                  ₹{booking.total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {booking.verified && (
            <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />

              <div>
                <p className="text-sm font-semibold">
                  Verified equipment provider
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  This prototype marks the owner as verified.
                  Production verification should include
                  identity, equipment ownership and contact
                  verification.
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 sm:flex-row">
            {booking.status === "Requested" && (
              <Button
                className="flex-1"
                onClick={onConfirm}
              >
                Simulate Owner Confirmation
              </Button>
            )}

            {canCancel && (
              <Button
                variant="outline"
                className="flex-1"
                onClick={onCancel}
              >
                Cancel Booking
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

/* =========================================================
   TIMELINE
========================================================= */

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
      label: "In Progress",
      icon: Tractor,
    },
    {
      label: "Completed",
      icon: CheckCircle2,
    },
  ];

  const statusIndex =
    status === "Cancelled"
      ? -1
      : steps.findIndex(
          (step) => step.label === status,
        );

  return (
    <div>
      <p className="mb-4 text-sm font-semibold">
        Booking progress
      </p>

      <div className="grid grid-cols-4 gap-2">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const completed =
            statusIndex >= index;

          return (
            <div key={step.label} className="text-center">
              <div
                className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full ${
                  completed
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>

              <p className="mt-2 text-[10px] font-medium sm:text-xs">
                {step.label}
              </p>
            </div>
          );
        })}
      </div>

      {status === "Cancelled" && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          <XCircle className="h-4 w-4" />
          This booking has been cancelled.
        </div>
      )}
    </div>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function StatusBadge({
  status,
}: {
  status: BookingStatus;
}) {
  const styles: Record<BookingStatus, string> = {
    Requested:
      "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    Confirmed:
      "bg-primary/10 text-primary",
    "In Progress":
      "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    Completed:
      "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    Cancelled:
      "bg-destructive/10 text-destructive",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${styles[status]}`}
    >
      {status}
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

        <p className="text-2xl font-bold">{value}</p>
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
        Try another filter or find machinery to create a
        booking.
      </p>

      <Button className="mt-5" onClick={onFind}>
        Find Machinery
      </Button>
    </div>
  );
}