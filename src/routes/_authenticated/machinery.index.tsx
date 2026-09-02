import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  IndianRupee,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Tractor,
  Users,
  X,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute(
  "/_authenticated/machinery/",
)({
  component: MachineryMarketplace,
});

type MachineryCategory =
  | "All"
  | "Tractor"
  | "Harvester"
  | "Rotavator"
  | "Cultivator"
  | "Seeder";

type MachineryItem = {
  id: string;
  name: string;
  category: Exclude<MachineryCategory, "All">;
  owner: string;
  location: string;
  distance: number;
  hourlyRate: number;
  dailyRate: number;
  availability: string;
  rating: number;
  reviews: number;
  verified: boolean;
  suitableFor: string;
};

const MACHINERY: MachineryItem[] = [
  {
    id: "tractor-1",
    name: "Mahindra 575 DI Tractor",
    category: "Tractor",
    owner: "Ramesh Patil",
    location: "Nashik",
    distance: 12,
    hourlyRate: 700,
    dailyRate: 4500,
    availability: "Available today",
    rating: 4.8,
    reviews: 27,
    verified: true,
    suitableFor: "Field preparation • Transport",
  },
  {
    id: "harvester-1",
    name: "Sonalika Multi Crop Harvester",
    category: "Harvester",
    owner: "Maharashtra Farm Services",
    location: "Nashik",
    distance: 18,
    hourlyRate: 1200,
    dailyRate: 8000,
    availability: "Available tomorrow",
    rating: 4.7,
    reviews: 19,
    verified: true,
    suitableFor: "Wheat • Soybean • Pulses",
  },
  {
    id: "rotavator-1",
    name: "Fieldking Rotavator",
    category: "Rotavator",
    owner: "Ganesh Shinde",
    location: "Ahmednagar",
    distance: 24,
    hourlyRate: 550,
    dailyRate: 3200,
    availability: "Available today",
    rating: 4.6,
    reviews: 14,
    verified: true,
    suitableFor: "Seedbed preparation",
  },
  {
    id: "cultivator-1",
    name: "Heavy Duty Cultivator",
    category: "Cultivator",
    owner: "Shivaji Agro Rentals",
    location: "Pune",
    distance: 38,
    hourlyRate: 450,
    dailyRate: 2800,
    availability: "Available in 2 days",
    rating: 4.5,
    reviews: 11,
    verified: true,
    suitableFor: "Soil cultivation",
  },
  {
    id: "seeder-1",
    name: "Precision Seed Drill",
    category: "Seeder",
    owner: "Kisan Equipment Hub",
    location: "Pune",
    distance: 42,
    hourlyRate: 600,
    dailyRate: 3500,
    availability: "Available today",
    rating: 4.7,
    reviews: 16,
    verified: true,
    suitableFor: "Soybean • Wheat • Pulses",
  },
  {
    id: "tractor-2",
    name: "Swaraj 744 FE Tractor",
    category: "Tractor",
    owner: "Vijay More",
    location: "Washim",
    distance: 56,
    hourlyRate: 650,
    dailyRate: 4200,
    availability: "Available today",
    rating: 4.4,
    reviews: 9,
    verified: false,
    suitableFor: "Ploughing • Transport",
  },
];

const CATEGORIES: MachineryCategory[] = [
  "All",
  "Tractor",
  "Harvester",
  "Rotavator",
  "Cultivator",
  "Seeder",
];

function MachineryMarketplace() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState<MachineryCategory>("All");
  const [maxDistance, setMaxDistance] = useState(100);
  const [sortBy, setSortBy] = useState<
    "distance" | "price" | "rating"
  >("distance");

  const [selectedMachine, setSelectedMachine] =
    useState<MachineryItem | null>(null);

  const filteredMachinery = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = MACHINERY.filter((machine) => {
      const matchesSearch =
        !query ||
        machine.name.toLowerCase().includes(query) ||
        machine.owner.toLowerCase().includes(query) ||
        machine.location.toLowerCase().includes(query) ||
        machine.suitableFor
          .toLowerCase()
          .includes(query);

      const matchesCategory =
        category === "All" ||
        machine.category === category;

      const matchesDistance =
        machine.distance <= maxDistance;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDistance
      );
    });

    return [...result].sort((a, b) => {
      if (sortBy === "price") {
        return a.dailyRate - b.dailyRate;
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      return a.distance - b.distance;
    });
  }, [search, category, maxDistance, sortBy]);

  return (
    <div className="space-y-6">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="card-surface overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <Tractor className="h-6 w-6 text-primary" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold">
                    Machinery Marketplace
                  </h1>

                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
                    Cost Reduction Module
                  </span>
                </div>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Find nearby tractors and farm equipment
                  without purchasing expensive machinery.
                  Lower your cultivation cost and improve
                  your final crop income.
                </p>
              </div>
            </div>

            <Button
              onClick={() =>
                navigate({
                  to: "/list-machinery",
                })
              }
            >
              List Your Machinery
            </Button>
          </div>

          {/* VALUE PROPOSITION */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <ValueCard
              icon={MapPin}
              title="Nearby equipment"
              text="Search by distance and location."
            />

            <ValueCard
              icon={IndianRupee}
              title="Transparent rental"
              text="Compare hourly and daily rates."
            />

            <ValueCard
              icon={ShieldCheck}
              title="Verified owners"
              text="Prefer trusted local providers."
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          MARKET CONNECTION
      ===================================================== */}

      <section className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-3">
            <Zap className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

            <div>
              <p className="font-semibold">
                Why machinery matters to Kisan Connect
              </p>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Lowering cultivation and harvesting costs can
                increase a farmer's net realization even when
                the mandi selling price stays unchanged.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() =>
              navigate({
                to: "/dashboard",
              })
            }
          >
            Check Market Prices
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* =====================================================
          SEARCH
      ===================================================== */}

      <section className="card-surface p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search tractor, harvester, rotavator..."
                className="pl-9"
              />
            </div>

            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setCategory("All");
                setMaxDistance(100);
                setSortBy("distance");
              }}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>

          {/* CATEGORY FILTERS */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  category === item
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/70"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* DISTANCE + SORT */}
          <div className="grid gap-4 border-t border-border pt-4 md:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium">
                  Maximum distance
                </label>

                <span className="text-sm font-semibold text-primary">
                  {maxDistance} km
                </span>
              </div>

              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={maxDistance}
                onChange={(event) =>
                  setMaxDistance(
                    Number(event.target.value),
                  )
                }
                className="w-full"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Sort machinery
              </label>

              <div className="flex flex-wrap gap-2">
                <SortButton
                  active={sortBy === "distance"}
                  onClick={() =>
                    setSortBy("distance")
                  }
                >
                  Nearest
                </SortButton>

                <SortButton
                  active={sortBy === "price"}
                  onClick={() =>
                    setSortBy("price")
                  }
                >
                  Lowest price
                </SortButton>

                <SortButton
                  active={sortBy === "rating"}
                  onClick={() =>
                    setSortBy("rating")
                  }
                >
                  Top rated
                </SortButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          RESULT HEADER
      ===================================================== */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Available machinery
          </h2>

          <p className="text-sm text-muted-foreground">
            {filteredMachinery.length} machine
            {filteredMachinery.length !== 1
              ? "s"
              : ""}{" "}
            match your search
          </p>
        </div>
      </div>

      {/* =====================================================
          MACHINERY GRID
      ===================================================== */}

      {filteredMachinery.length === 0 ? (
        <EmptyMachinery />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredMachinery.map((machine) => (
            <MachineryCard
              key={machine.id}
              machine={machine}
              onView={() =>
                setSelectedMachine(machine)
              }
            />
          ))}
        </div>
      )}

      {/* =====================================================
          COST BENEFIT
      ===================================================== */}

      <section className="card-surface p-6">
        <div className="flex items-start gap-3">
          <IndianRupee className="mt-0.5 h-5 w-5 text-primary" />

          <div>
            <p className="text-xs font-semibold text-primary">
              CONNECTED TO MARKET LINKAGE
            </p>

            <h2 className="mt-1 text-xl font-semibold">
              Reduce cost. Improve net realization.
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Kisan Connect doesn't treat machinery as the
              main marketplace problem. It is a supporting
              service that helps farmers reduce operating costs
              so more of the crop's selling value reaches the
              farmer.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <Benefit
            title="Without purchase"
            text="Access equipment when you need it."
          />

          <Benefit
            title="Local availability"
            text="Reduce waiting and transportation costs."
          />

          <Benefit
            title="Better economics"
            text="Compare machinery cost before accepting a sale."
          />
        </div>
      </section>

      {/* =====================================================
          DETAILS MODAL
      ===================================================== */}

      {selectedMachine && (
        <MachineryDetails
          machine={selectedMachine}
          onClose={() =>
            setSelectedMachine(null)
          }
          onBook={() => {
            setSelectedMachine(null);

            void navigate({
              to: `/machinery/${selectedMachine.id}` as never,
            });
          }}
        />
      )}

      {/* DISCLAIMER */}
      <div className="rounded-xl bg-secondary p-4 text-xs leading-5 text-muted-foreground">
        <strong>Prototype note:</strong> machinery listings,
        prices, distances and availability shown here are
        demonstration data. Production deployment should use
        verified owner profiles, real availability and
        location data.
      </div>
    </div>
  );
}

/* =========================================================
   MACHINERY CARD
========================================================= */

function MachineryCard({
  machine,
  onView,
}: {
  machine: MachineryItem;
  onView: () => void;
}) {
  return (
    <article className="card-surface overflow-hidden">
      <div className="relative flex h-40 items-center justify-center bg-secondary">
        <Tractor className="h-20 w-20 text-muted-foreground/40" />

        <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold">
          {machine.category}
        </span>

        {machine.verified && (
          <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold">
              {machine.name}
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              Owner: {machine.owner}
            </p>
          </div>

          <div className="flex items-center gap-1 text-sm font-semibold">
            ★ {machine.rating}
          </div>
        </div>

        <div className="mt-4 space-y-2 text-sm">
          <InfoRow
            icon={MapPin}
            text={`${machine.distance} km • ${machine.location}`}
          />

          <InfoRow
            icon={Clock3}
            text={machine.availability}
          />

          <InfoRow
            icon={Tractor}
            text={machine.suitableFor}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <PriceBox
            label="Per hour"
            value={`₹${machine.hourlyRate}`}
          />

          <PriceBox
            label="Per day"
            value={`₹${machine.dailyRate}`}
          />
        </div>

        <Button
          className="mt-4 w-full"
          onClick={onView}
        >
          View Details
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </article>
  );
}

/* =========================================================
   DETAILS MODAL
========================================================= */

function MachineryDetails({
  machine,
  onClose,
  onBook,
}: {
  machine: MachineryItem;
  onClose: () => void;
  onBook: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl">
        <div className="flex items-start justify-between border-b border-border p-5">
          <div>
            <p className="text-xs font-semibold text-primary">
              {machine.category}
            </p>

            <h2 className="mt-1 text-xl font-bold">
              {machine.name}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {machine.owner} • {machine.location}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-secondary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 p-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <Metric
              label="Distance"
              value={`${machine.distance} km`}
            />

            <Metric
              label="Rating"
              value={`★ ${machine.rating}`}
            />

            <Metric
              label="Reviews"
              value={machine.reviews.toString()}
            />
          </div>

          <div className="rounded-xl bg-secondary p-4">
            <p className="text-sm font-semibold">
              Rental pricing
            </p>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <PriceBox
                label="Hourly"
                value={`₹${machine.hourlyRate}`}
              />

              <PriceBox
                label="Daily"
                value={`₹${machine.dailyRate}`}
              />
            </div>
          </div>

          <div className="rounded-xl border border-border p-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" />

              <span className="text-sm font-semibold">
                Availability
              </span>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              {machine.availability}
            </p>
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm font-semibold">
              Why this can improve your economics
            </p>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Renting instead of purchasing can reduce fixed
              machinery costs. Compare this cost with your
              expected crop revenue before finalizing the sale.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              className="flex-1"
              onClick={onBook}
            >
              Request Booking
            </Button>

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
   SMALL COMPONENTS
========================================================= */

function ValueCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof MapPin;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-border p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
        <Icon className="h-4 w-4 text-primary" />
      </div>

      <h3 className="mt-3 text-sm font-semibold">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {text}
      </p>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  text,
}: {
  icon: typeof MapPin;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Icon className="h-4 w-4 shrink-0" />
      <span className="truncate">{text}</span>
    </div>
  );
}

function PriceBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-secondary p-3">
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 font-bold">{value}</p>
    </div>
  );
}

function SortButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-3 py-2 text-xs font-medium ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary hover:bg-secondary/70"
      }`}
    >
      {children}
    </button>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-secondary p-3">
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 font-bold">{value}</p>
    </div>
  );
}

function Benefit({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-border p-4">
      <p className="text-sm font-semibold">{title}</p>

      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {text}
      </p>
    </div>
  );
}

function EmptyMachinery() {
  return (
    <div className="card-surface p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
        <Tractor className="h-7 w-7 text-muted-foreground" />
      </div>

      <h2 className="mt-4 font-semibold">
        No machinery found
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Try increasing the distance or changing your search
        filters.
      </p>
    </div>
  );
}