import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Check,
  Clock3,
  IndianRupee,
  MapPin,
  ShieldCheck,
  Tractor,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/machinery/$id")({
  component: MachineryDetails,
});

type Machinery = {
  id: string;
  name: string;
  category: string;
  owner: string;
  location: string;
  distance: number;
  pricePerHour: number;
  pricePerDay: number;
  acresPerHour: number;
  rating: number;
  reviews: number;
  available: boolean;
  image: string;
};

const MACHINERY: Machinery = {
  id: "tractor-001",
  name: "Mahindra 575 DI Tractor",
  category: "Tractor",
  owner: "Ramesh Patil",
  location: "Nashik",
  distance: 12,
  pricePerHour: 700,
  pricePerDay: 4500,
  acresPerHour: 1.2,
  rating: 4.8,
  reviews: 27,
  available: true,
  image: "/src/assets/tractor.jpg",
};

function MachineryDetails() {
  const navigate = useNavigate();

  const [acres, setAcres] = useState("5");
  const [days, setDays] = useState("1");
  const [bookingSent, setBookingSent] = useState(false);
  const [pricingMode, setPricingMode] = useState<"hour" | "day">(
    "day",
  );

  const machinery = MACHINERY;

  const calculation = useMemo(() => {
    const area = Math.max(Number(acres) || 0, 0);
    const numberOfDays = Math.max(Number(days) || 1, 1);

    const hoursNeeded =
      machinery.acresPerHour > 0
        ? area / machinery.acresPerHour
        : 0;

    const rentalCost =
      pricingMode === "day"
        ? numberOfDays * machinery.pricePerDay
        : Math.ceil(hoursNeeded) * machinery.pricePerHour;

    const estimatedMarketAlternative = area * 1500;

    const savings = Math.max(
      estimatedMarketAlternative - rentalCost,
      0,
    );

    const costPerAcre =
      area > 0 ? rentalCost / area : 0;

    return {
      area,
      numberOfDays,
      hoursNeeded,
      rentalCost,
      estimatedMarketAlternative,
      savings,
      costPerAcre,
    };
  }, [acres, days, pricingMode, machinery]);

  const handleBooking = () => {
    setBookingSent(true);
  };

  return (
    <div className="space-y-6">
      {/* BACK */}
      <button
        type="button"
        onClick={() => navigate({ to: "/machinery" })}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Machinery
      </button>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="card-surface overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* IMAGE */}
          <div className="relative min-h-[280px] bg-secondary">
            <img
              src={machinery.image}
              alt={machinery.name}
              className="h-full min-h-[280px] w-full object-cover"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />

            <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold">
              {machinery.category}
            </div>
          </div>

          {/* DETAILS */}
          <div className="p-6">
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-primary" />

              <span className="text-sm font-semibold text-primary">
                VERIFIED MACHINERY
              </span>
            </div>

            <h1 className="mt-2 text-3xl font-bold">
              {machinery.name}
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Reliable farm machinery available for local farmers.
            </p>

            <div className="mt-5 space-y-3">
              <DetailRow
                icon={Users}
                label="Owner"
                value={machinery.owner}
              />

              <DetailRow
                icon={MapPin}
                label="Location"
                value={`${machinery.location} • ${machinery.distance} km away`}
              />

              <DetailRow
                icon={IndianRupee}
                label="Rental"
                value={`₹${machinery.pricePerDay.toLocaleString(
                  "en-IN",
                )}/day`}
              />

              <DetailRow
                icon={Clock3}
                label="Hourly"
                value={`₹${machinery.pricePerHour.toLocaleString(
                  "en-IN",
                )}/hour`}
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                ★ {machinery.rating}
              </span>

              <span className="rounded-full bg-secondary px-3 py-1.5 text-sm">
                {machinery.reviews} reviews
              </span>

              <span
                className={`rounded-full px-3 py-1.5 text-sm font-semibold ${
                  machinery.available
                    ? "bg-primary/10 text-primary"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {machinery.available
                  ? "Available"
                  : "Currently unavailable"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY MACHINERY MATTERS
      ===================================================== */}

      <section className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
        <div className="flex gap-3">
          <Tractor className="mt-1 h-6 w-6 shrink-0 text-primary" />

          <div>
            <h2 className="font-semibold">
              Lower your production cost → improve net realization
            </h2>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Machinery access helps farmers avoid large upfront
              equipment costs and reduce cultivation expenses. The
              money saved can improve the farmer's final net
              realization after selling the crop.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          COST CALCULATOR
      ===================================================== */}

      <section className="card-surface p-6">
        <div>
          <p className="text-sm font-semibold text-primary">
            MACHINERY COST CALCULATOR
          </p>

          <h2 className="mt-1 text-2xl font-semibold">
            Estimate your farming cost
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Calculate the approximate machinery cost before booking.
          </p>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {/* INPUTS */}
          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium">
                Area to cultivate (acres)
              </label>

              <Input
                className="mt-2"
                type="number"
                min="0.5"
                step="0.5"
                value={acres}
                onChange={(event) =>
                  setAcres(event.target.value)
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Number of days
              </label>

              <Input
                className="mt-2"
                type="number"
                min="1"
                value={days}
                onChange={(event) =>
                  setDays(event.target.value)
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Rental calculation
              </label>

              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPricingMode("day")}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium ${
                    pricingMode === "day"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border"
                  }`}
                >
                  Per Day
                </button>

                <button
                  type="button"
                  onClick={() => setPricingMode("hour")}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium ${
                    pricingMode === "hour"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border"
                  }`}
                >
                  Per Hour
                </button>
              </div>
            </div>

            <div className="rounded-xl bg-secondary p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Machine capacity
                </span>

                <span className="font-semibold">
                  {machinery.acresPerHour} acres/hour
                </span>
              </div>

              <div className="mt-3 flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Estimated working time
                </span>

                <span className="font-semibold">
                  {calculation.hoursNeeded.toFixed(1)} hours
                </span>
              </div>
            </div>
          </div>

          {/* RESULT */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <p className="text-sm text-muted-foreground">
              Estimated machinery cost
            </p>

            <p className="mt-2 text-4xl font-bold">
              ₹
              {calculation.rentalCost.toLocaleString(
                "en-IN",
                {
                  maximumFractionDigits: 0,
                },
              )}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              for {calculation.area} acre
              {calculation.area !== 1 ? "s" : ""}
            </p>

            <div className="mt-6 space-y-3">
              <ResultRow
                label="Cost per acre"
                value={`₹${calculation.costPerAcre.toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 0,
                  },
                )}`}
              />

              <ResultRow
                label="Estimated alternative cost"
                value={`₹${calculation.estimatedMarketAlternative.toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 0,
                  },
                )}`}
              />

              <div className="flex items-center justify-between border-t border-border pt-3">
                <span className="font-medium">
                  Potential savings
                </span>

                <span className="text-lg font-bold text-primary">
                  ₹
                  {calculation.savings.toLocaleString(
                    "en-IN",
                    {
                      maximumFractionDigits: 0,
                    },
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Savings are an illustrative estimate for this prototype.
          Actual costs depend on crop, field conditions, fuel,
          operator charges and local rental rates.
        </p>
      </section>

      {/* =====================================================
          BOOKING
      ===================================================== */}

      <section className="card-surface p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold text-primary">
              BOOK MACHINERY
            </p>

            <h2 className="mt-1 text-2xl font-semibold">
              Request this machine
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Send a booking request to the machinery owner.
            </p>
          </div>

          <div className="rounded-xl bg-secondary px-4 py-3">
            <p className="text-xs text-muted-foreground">
              Estimated cost
            </p>

            <p className="text-xl font-bold">
              ₹
              {calculation.rentalCost.toLocaleString(
                "en-IN",
              )}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <BookingInfo
            icon={CalendarDays}
            title="Duration"
            value={`${calculation.numberOfDays} day${
              calculation.numberOfDays !== 1 ? "s" : ""
            }`}
          />

          <BookingInfo
            icon={MapPin}
            title="Distance"
            value={`${machinery.distance} km`}
          />

          <BookingInfo
            icon={ShieldCheck}
            title="Owner"
            value="Verified"
          />
        </div>

        <div className="mt-6">
          {bookingSent ? (
            <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-5 w-5" />
              </div>

              <div>
                <p className="font-semibold">
                  Booking request sent
                </p>

                <p className="text-sm text-muted-foreground">
                  The machinery owner can now confirm your request.
                </p>
              </div>
            </div>
          ) : (
            <Button
              className="h-12 w-full"
              disabled={!machinery.available}
              onClick={handleBooking}
            >
              <CalendarDays className="mr-2 h-5 w-5" />

              {machinery.available
                ? "Request Machinery Booking"
                : "Currently Unavailable"}
            </Button>
          )}
        </div>
      </section>

      {/* =====================================================
          MARKET CONNECTION
      ===================================================== */}

      <section className="card-surface p-6">
        <div className="flex items-center gap-2">
          <IndianRupee className="h-5 w-5 text-primary" />

          <h2 className="text-xl font-semibold">
            Connect machinery savings with crop selling
          </h2>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Step
            number="01"
            title="Reduce Cost"
            text="Rent machinery instead of purchasing expensive equipment."
          />

          <Step
            number="02"
            title="Improve Net Realization"
            text="Lower cultivation costs mean more money remains with the farmer."
          />

          <Step
            number="03"
            title="Sell Better"
            text="Use Kisan Connect's market intelligence and buyer offers to choose the best selling opportunity."
          />
        </div>

        <Button
          variant="outline"
          className="mt-5"
          onClick={() => navigate({ to: "/dashboard" })}
        >
          Go to Market Dashboard
          <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
        </Button>
      </section>

      {/* FOOTER NOTE */}
      <div className="flex items-start gap-3 rounded-xl bg-secondary p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

        <p className="text-xs leading-5 text-muted-foreground">
          Prototype machinery prices and calculations are
          illustrative. Production deployment should use actual
          machinery listings, availability calendars and booking
          records from Supabase.
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

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

function ResultRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        {label}
      </span>

      <span className="font-semibold">
        {value}
      </span>
    </div>
  );
}

function BookingInfo({
  icon: Icon,
  title,
  value,
}: {
  icon: typeof CalendarDays;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-secondary p-4">
      <Icon className="h-5 w-5 text-primary" />

      <p className="mt-3 text-xs text-muted-foreground">
        {title}
      </p>

      <p className="mt-1 font-semibold">
        {value}
      </p>
    </div>
  );
}

function Step({
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
      <span className="text-sm font-bold text-primary">
        {number}
      </span>

      <h3 className="mt-2 font-semibold">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-5 text-muted-foreground">
        {text}
      </p>
    </div>
  );
}