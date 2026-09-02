import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  IndianRupee,
  Leaf,
  MapPin,
  Mic,
  Package,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star,
  Tractor,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

/*
 * DEMO MARKET DATA
 *
 * These values are intentionally kept separate from Supabase.
 * Later we can replace them with AGMARKNET / e-NAM connected data.
 */

const PRICE_FORECAST = [
  { day: "Aug 29", actual: 2780, forecast: null },
  { day: "Aug 30", actual: 2810, forecast: null },
  { day: "Aug 31", actual: 2835, forecast: null },
  { day: "Sep 1", actual: 2845, forecast: null },
  { day: "Today", actual: 2850, forecast: 2850 },
  { day: "Sep 3", actual: null, forecast: 2910 },
  { day: "Sep 4", actual: null, forecast: 2960 },
  { day: "Sep 5", actual: null, forecast: 3000 },
  { day: "Sep 6", actual: null, forecast: 3040 },
  { day: "Sep 7", actual: null, forecast: 3070 },
];

const MANDIS = [
  {
    name: "Mumbai",
    price: 3020,
    change: 9.1,
    arrivals: 1240,
    distance: "168 km",
    transport: 450,
    handling: 100,
    other: 100,
    score: 91,
  },
  {
    name: "Nashik",
    price: 2850,
    change: 8.4,
    arrivals: 1840,
    distance: "42 km",
    transport: 180,
    handling: 80,
    other: 50,
    score: 88,
  },
  {
    name: "Pune",
    price: 2720,
    change: 5.2,
    arrivals: 2140,
    distance: "156 km",
    transport: 420,
    handling: 100,
    other: 80,
    score: 79,
  },
  {
    name: "Ahmednagar",
    price: 2610,
    change: 3.8,
    arrivals: 2430,
    distance: "92 km",
    transport: 260,
    handling: 80,
    other: 60,
    score: 74,
  },
];

const BUYERS = [
  {
    name: "FreshKart Foods",
    price: 3000,
    quantity: "500–2,000 kg",
    distance: "18 km",
    match: 98,
  },
  {
    name: "Maharashtra Agro",
    price: 2950,
    quantity: "1,000 kg",
    distance: "32 km",
    match: 94,
  },
  {
    name: "Fresh Harvest Traders",
    price: 2900,
    quantity: "750 kg",
    distance: "25 km",
    match: 91,
  },
];

function Dashboard() {
  const { user, profile, profileLoading } = useAuth();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [selectedBuyer, setSelectedBuyer] = useState<(typeof BUYERS)[number] | null>(null);
  const [offerSent, setOfferSent] = useState<string | null>(null);
  const [saleLotOpen, setSaleLotOpen] = useState(false);
  const [saleLotCreated, setSaleLotCreated] = useState(false);
  const [saleLot, setSaleLot] = useState({
    crop: "Tomato",
    quantity: "500",
    grade: "Grade A",
    expectedPrice: "3000",
  });

  const bestMandiIndex = MANDIS.reduce((bestIndex, current, currentIndex) => {
    const currentNet =
      current.price - current.transport - current.handling - current.other;
    const best = MANDIS[bestIndex];
    const bestNet = best
      ? best.price - best.transport - best.handling - best.other
      : -Infinity;
    return currentNet > bestNet ? currentIndex : bestIndex;
  }, 0);

  useEffect(() => {
    if (!profileLoading && user && !profile) {
      void navigate({ to: "/profile" });
    }
  }, [profile, profileLoading, user, navigate]);

  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const uid = user!.id;

      const [active, listed, residues, requests] = await Promise.all([
        supabase
          .from("bookings")
          .select("id", { count: "exact", head: true })
          .eq("renter_id", uid)
          .in("status", ["pending", "confirmed"]),

        supabase
          .from("machinery")
          .select("id", { count: "exact", head: true })
          .eq("owner_id", uid),

        supabase
          .from("crop_residues")
          .select("id", { count: "exact", head: true })
          .eq("owner_id", uid),

        supabase
          .from("bookings")
          .select("id", { count: "exact", head: true })
          .eq("owner_id", uid)
          .eq("status", "pending"),
      ]);

      const err =
        active.error ||
        listed.error ||
        residues.error ||
        requests.error;

      if (err) throw err;

      return {
        active: active.count ?? 0,
        listed: listed.count ?? 0,
        residues: residues.count ?? 0,
        requests: requests.count ?? 0,
      };
    },
  });

  const search = (e: React.FormEvent) => {
    e.preventDefault();

    void navigate({
      to: "/machinery",
      search: {
        q: q.trim(),
        category: "",
        start: "",
        end: "",
      },
    });
  };

  return (
    <div className="space-y-6">

      {/* =========================================================
          HEADER
      ========================================================= */}

      <section className="card-surface p-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-semibold">
              Namaste, {profile?.name ?? "Kisan"} 👋
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {[profile?.village, profile?.district, profile?.state]
                  .filter(Boolean)
                  .join(", ") || "Location not set"}
              </span>

              <span className="flex items-center gap-1">
                <BadgeCheck
                  className={`h-4 w-4 ${
                    profile?.is_verified
                      ? "text-success"
                      : "text-muted-foreground"
                  }`}
                />
                {profile?.is_verified
                  ? "Verified farmer"
                  : "Verification pending"}
              </span>

              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                {Number(profile?.rating ?? 0).toFixed(1)} rating
              </span>

              <Link
                to="/profile"
                className="underline underline-offset-4"
              >
                Edit profile
              </Link>
            </div>
          </div>

          <Link to="/voice">
            <Button className="h-12 gap-2">
              <Mic className="h-5 w-5" />
              बोलकर पूछें
            </Button>
          </Link>
        </div>
      </section>

      {/* =========================================================
          MARKET SNAPSHOT
      ========================================================= */}

      <section id="market-prices">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-primary">
              MARKET INTELLIGENCE
            </p>
            <h2 className="text-2xl font-semibold">
              Your Market Snapshot
            </h2>
            <p className="text-sm text-muted-foreground">
              Tomato market • Today's mandi information
            </p>
          </div>

          <span className="hidden text-xs text-muted-foreground sm:block">
            Updated today
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

          <MarketCard
            icon={IndianRupee}
            label="Current Best Price"
            value="₹3,020/q"
            subtitle="Mumbai"
            trend="+9.1%"
            positive
          />

          <MarketCard
            icon={TrendingUp}
            label="Average Price"
            value="₹2,800/q"
            subtitle="Nearby markets"
            trend="+6.6%"
            positive
          />

          <MarketCard
            icon={Package}
            label="Market Arrivals"
            value="1,240 q"
            subtitle="Mumbai"
            trend="↓ 14%"
            positive
          />

          <MarketCard
            icon={ShoppingCart}
            label="Buyer Demand"
            value="High"
            subtitle="3 active buyers"
            trend="↑ 18%"
            positive
          />

        </div>
      </section>

      {/* =========================================================
          PRICE FORECAST
      ========================================================= */}

      <section id="price-forecast" className="card-surface overflow-hidden">

        <div className="border-b border-border p-5">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />

                <p className="font-semibold">
                  AI Price Forecast
                </p>

                <span className="rounded-full bg-secondary px-2 py-1 text-xs font-medium">
                  7-day outlook
                </span>
              </div>

              <h2 className="mt-2 text-2xl font-bold">
                Tomato price may continue rising
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Historical market movement + arrival trend + buyer demand
              </p>
            </div>

            <div className="rounded-xl border border-border bg-background p-4">
              <p className="text-xs text-muted-foreground">
                Today's price
              </p>

              <p className="text-2xl font-bold">
                ₹2,850/q
              </p>

              <div className="mt-1 flex items-center gap-1 text-sm text-primary">
                <ArrowUp className="h-4 w-4" />
                Forecast ₹3,070/q
              </div>
            </div>

          </div>
        </div>

        <div className="grid gap-6 p-5 lg:grid-cols-[1fr_280px]">

          {/* CHART */}

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={PRICE_FORECAST}
                margin={{ top: 10, right: 10, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" tick={{ fontSize: 12 }} />

                <YAxis
                  domain={["auto", "auto"]}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `₹${value}`}
                />

                <Tooltip
                  formatter={(value, name) => [
                    `₹${Number(value).toLocaleString("en-IN")}/q`,
                    name === "actual" ? "Actual price" : "Forecast price",
                  ]}
                />

                <Line
                  type="monotone"
                  dataKey="actual"
                  name="actual"
                  stroke="currentColor"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 7 }}
                  connectNulls={false}
                />

                <Line
                  type="monotone"
                  dataKey="forecast"
                  name="forecast"
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeDasharray="8 6"
                  dot={{ r: 4 }}
                  activeDot={{ r: 7 }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* SELL / WAIT DECISION */}

          <div id="sell-window" className="rounded-2xl border border-primary/20 bg-primary/5 p-5">

            <p className="text-sm font-semibold text-primary">
              SMART SELL ADVISOR
            </p>

            <div className="mt-3 flex items-center gap-2">
              <Clock3 className="h-6 w-6 text-primary" />

              <h3 className="text-2xl font-bold">
                WAIT 2–3 DAYS
              </h3>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              The model currently sees a stronger short-term price signal.
            </p>

            <div className="mt-5 space-y-3">

              <Signal
                label="Price momentum"
                value="Strong"
                icon={ArrowUp}
              />

              <Signal
                label="Mandi arrivals"
                value="Falling"
                icon={ArrowDown}
              />

              <Signal
                label="Buyer demand"
                value="Increasing"
                icon={ArrowUp}
              />

              <Signal
                label="Nearby prices"
                value="Rising"
                icon={ArrowUp}
              />

            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-background p-4">
                <p className="text-xs text-muted-foreground">Current price</p>
                <p className="mt-1 text-xl font-bold">₹2,850/q</p>
              </div>

              <div className="rounded-xl bg-background p-4">
                <p className="text-xs text-muted-foreground">Expected price</p>
                <p className="mt-1 text-xl font-bold text-primary">
                  ₹2,950–₹3,100/q
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-background p-4">
              <p className="text-xs font-semibold">Why wait?</p>
              <ul className="mt-2 space-y-2 text-xs text-muted-foreground">
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  Short-term prices are trending upward.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  Mandi arrivals are currently decreasing.
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  Verified buyer demand is increasing.
                </li>
              </ul>
            </div>

            <div className="mt-4 flex gap-2">
              <Button className="flex-1">Wait & Watch</Button>
              <Button variant="outline" className="flex-1">Sell Now</Button>
            </div>

            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              Recommendation is an estimate. Final selling decision remains with the farmer.
            </p>

          </div>

        </div>

        <div className="border-t border-border px-5 py-3">
          <p className="text-xs text-muted-foreground">
            ⚠️ Forecasts are estimates, not guaranteed prices. Actual
            recommendations will use verified mandi price and arrival data.
          </p>
        </div>

      </section>

      {/* =========================================================
          BEST MARKET
      ========================================================= */}

      <section id="best-mandi" className="card-surface p-5">

        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-medium text-primary">
              PRICE DISCOVERY
            </p>

            <h2 className="text-2xl font-semibold">
              Best Market To Sell
            </h2>

            <p className="text-sm text-muted-foreground">
              Compare price, arrivals, distance and selling opportunity.
            </p>
          </div>

          <Button variant="outline">
            View All Mandis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-4">
          {MANDIS.map((mandi, index) => (
            <div
              key={mandi.name}
              className={`rounded-2xl border p-4 ${
                index === 0
                  ? "border-primary/40 bg-primary/5"
                  : "border-border"
              }`}
            >

              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">
                    {mandi.name}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {mandi.distance}
                  </p>
                </div>

                {index === bestMandiIndex && (
                  <span className="rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
                    Best Net Realization
                  </span>
                )}
              </div>

              <p className="mt-4 text-2xl font-bold">
                ₹{mandi.price.toLocaleString("en-IN")}/q
              </p>

              <div className="mt-4 rounded-xl bg-secondary p-3">
                <p className="text-xs text-muted-foreground">
                  Estimated net realization
                </p>
                <p className="mt-1 text-xl font-bold">
                  ₹{(
                    mandi.price -
                    mandi.transport -
                    mandi.handling -
                    mandi.other
                  ).toLocaleString("en-IN")}/q
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  After transport & selling costs
                </p>
              </div>

              <div className="mt-2 flex items-center gap-1 text-sm text-primary">
                <ArrowUp className="h-4 w-4" />
                +{mandi.change}%
              </div>

              <div className="mt-4 space-y-2 text-xs text-muted-foreground">

                <div className="flex justify-between">
                  <span>Arrivals</span>
                  <span className="font-medium text-foreground">
                    {mandi.arrivals.toLocaleString("en-IN")} q
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Opportunity score</span>
                  <span className="font-semibold text-primary">
                    {mandi.score}/100
                  </span>
                </div>

              </div>

              <Button
                variant={index === 0 ? "default" : "outline"}
                className="mt-4 w-full"
              >
                View Market
              </Button>

            </div>
          ))}
        </div>

      </section>

      {/* =========================================================
          NET REALIZATION
      ========================================================= */}

      <section className="card-surface p-5">

        <div className="flex items-center gap-2">
          <IndianRupee className="h-5 w-5 text-primary" />

          <div>
            <p className="text-sm font-medium text-primary">
              SMART CALCULATION
            </p>

            <h2 className="text-xl font-semibold">
              What will you actually earn?
            </h2>
          </div>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          Highest mandi price does not always mean highest farmer realization.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

          <MoneyBox
            label="Market price"
            value="₹15,100"
          />

          <MoneyBox
            label="Transport"
            value="− ₹450"
          />

          <MoneyBox
            label="Handling"
            value="− ₹100"
          />

          <MoneyBox
            label="Other costs"
            value="− ₹100"
          />

          <MoneyBox
            label="Estimated net"
            value="₹14,450"
            highlight
          />

        </div>

        <div className="mt-4 rounded-xl bg-secondary p-4 text-sm">
          <strong>💡 Kisan Connect insight:</strong>{" "}
          Mumbai has the highest headline price, but the system should compare
          transportation and other selling costs before recommending the market.
        </div>

      </section>

      {/* =========================================================
          BUYERS
      ========================================================= */}

      <section id="buyer-demand" className="card-surface p-5">

        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

          <div>
            <p className="text-sm font-medium text-primary">
              DIRECT MARKET LINKAGE
            </p>

            <h2 className="text-2xl font-semibold">
              Buyers Looking For Your Crop
            </h2>

            <p className="text-sm text-muted-foreground">
              Verified buyers matched using crop, quantity, location and quality.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => window.location.assign("/dashboard#buyer-demand")}
          >
            Find More Buyers
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-3">

          {BUYERS.map((buyer) => (
            <div
              key={buyer.name}
              className="rounded-2xl border border-border p-5"
            >

              <div className="flex items-start justify-between">

                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">
                      {buyer.name}
                    </p>

                    <ShieldCheck className="h-4 w-4 text-primary" />
                  </div>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Verified buyer
                  </p>
                </div>

                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                  {buyer.match}% match
                </span>

              </div>

              <p className="mt-5 text-2xl font-bold">
                ₹{buyer.price.toLocaleString("en-IN")}/q
              </p>

              <div className="mt-3 space-y-2 text-sm text-muted-foreground">

                <div className="flex justify-between">
                  <span>Required quantity</span>
                  <span className="font-medium text-foreground">
                    {buyer.quantity}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Distance</span>
                  <span className="font-medium text-foreground">
                    {buyer.distance}
                  </span>
                </div>

              </div>

              <Button
                className="mt-5 w-full"
                onClick={() => setSelectedBuyer(buyer)}
              >
                View Offer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

            </div>
          ))}

        </div>

      </section>

      {/* =========================================================
          ACTIVE SALE LOT
      ========================================================= */}

      <section id="sale-lots" className="grid gap-4 lg:grid-cols-2">

        <div className="card-surface p-5">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-primary">
                YOUR SALE LOT
              </p>

              <h2 className="text-xl font-semibold">
                Tomato • 500 kg
              </h2>
            </div>

            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
              2 offers
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">

            <InfoBox
              label="Expected price"
              value="₹3,000/q"
            />

            <InfoBox
              label="Quality"
              value="Grade A"
            />

            <InfoBox
              label="Best offer"
              value="₹3,000/q"
            />

            <InfoBox
              label="Buyer"
              value="FreshKart"
            />

          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Button
              id="offers"
              onClick={() => setSelectedBuyer(BUYERS[0])}
            >
              View Offers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              onClick={() => setSaleLotOpen(true)}
            >
              Create Sale Lot
              <Package className="ml-2 h-4 w-4" />
            </Button>
          </div>

        </div>

        {/* TRANSACTION */}

        <div className="card-surface p-5">

          <p className="text-sm font-medium text-primary">
            TRANSACTION TRACKING
          </p>

          <h2 className="text-xl font-semibold">
            Current Sale Status
          </h2>

          <div className="mt-5 flex items-center justify-between">

            <TransactionStep
              label="Offer"
              active
              completed
            />

            <TransactionLine completed />

            <TransactionStep
              label="Accepted"
              active
              completed
            />

            <TransactionLine />

            <TransactionStep
              label="Payment"
              active={offerSent !== null}
            />

            <TransactionLine />

            <TransactionStep
              label="Delivered"
            />

          </div>

          <div className="mt-5 rounded-xl bg-secondary p-4 text-sm">
            <CheckCircle2 className="mr-1 inline h-4 w-4 text-primary" />
            {offerSent
              ? "Buyer offer accepted. Payment is the next step."
              : "Review verified buyer offers and accept the one that gives you the best realization."}
          </div>

        </div>

      </section>

      {/* =========================================================
          FARMER -> BUYER INTERACTION
      ========================================================= */}

      {selectedBuyer && (
        <section className="card-surface border-primary/20 p-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-semibold text-primary">
                BUYER OFFER
              </p>
              <h2 className="mt-1 text-xl font-semibold">
                {selectedBuyer.name}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Verified buyer • {selectedBuyer.distance} away • {selectedBuyer.match}% match
              </p>
            </div>

            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setSelectedBuyer(null)}
            >
              Close
            </button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            <InfoBox
              label="Offer price"
              value={`₹${selectedBuyer.price.toLocaleString("en-IN")}/q`}
              highlight
            />
            <InfoBox
              label="Required quantity"
              value={selectedBuyer.quantity}
            />
            <InfoBox
              label="Distance"
              value={selectedBuyer.distance}
            />
            <InfoBox
              label="Buyer match"
              value={`${selectedBuyer.match}%`}
            />
          </div>

          {offerSent === selectedBuyer.name ? (
            <div className="mt-5 rounded-xl bg-secondary p-4 text-sm">
              <CheckCircle2 className="mr-2 inline h-4 w-4 text-primary" />
              Offer accepted. Transaction moved to <strong>Payment Pending</strong>.
            </div>
          ) : (
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button
                className="flex-1"
                onClick={() => setOfferSent(selectedBuyer.name)}
              >
                Accept Offer
                <CheckCircle2 className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setSelectedBuyer(null)}
              >
                Reject / Close
              </Button>
            </div>
          )}
        </section>
      )}

      {saleLotOpen && (
        <section className="card-surface border-primary/20 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary">
                CREATE SALE LOT
              </p>
              <h2 className="mt-1 text-xl font-semibold">
                Connect your crop directly to buyers
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Add quantity, quality and expected price so verified buyers can respond.
              </p>
            </div>

            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setSaleLotOpen(false)}
            >
              Close
            </button>
          </div>

          {saleLotCreated ? (
            <div className="mt-5 rounded-2xl bg-secondary p-5">
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Sale lot published successfully
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-4">
                <InfoBox label="Crop" value={saleLot.crop} />
                <InfoBox label="Quantity" value={`${saleLot.quantity} kg`} />
                <InfoBox label="Quality" value={saleLot.grade} />
                <InfoBox label="Expected price" value={`₹${Number(saleLot.expectedPrice).toLocaleString("en-IN")}/q`} />
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                Matching buyers can now review this lot and send offers.
              </p>

              <Button
                className="mt-4"
                onClick={() => {
                  setSaleLotCreated(false);
                  setSaleLotOpen(false);
                  setSelectedBuyer(BUYERS[0]);
                }}
              >
                View Matching Buyers
                <Users className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ) : (
            <form
              className="mt-5 grid gap-4 sm:grid-cols-2"
              onSubmit={(event) => {
                event.preventDefault();
                setSaleLotCreated(true);
              }}
            >
              <div>
                <label className="text-sm font-medium">Crop</label>
                <Input
                  className="mt-2"
                  value={saleLot.crop}
                  onChange={(event) =>
                    setSaleLot((current) => ({ ...current, crop: event.target.value }))
                  }
                  placeholder="Tomato"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Quantity (kg)</label>
                <Input
                  className="mt-2"
                  type="number"
                  min="1"
                  value={saleLot.quantity}
                  onChange={(event) =>
                    setSaleLot((current) => ({ ...current, quantity: event.target.value }))
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">Quality / Grade</label>
                <select
                  className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={saleLot.grade}
                  onChange={(event) =>
                    setSaleLot((current) => ({ ...current, grade: event.target.value }))
                  }
                >
                  <option>Grade A</option>
                  <option>Grade B</option>
                  <option>Grade C</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Expected price (₹/q)</label>
                <Input
                  className="mt-2"
                  type="number"
                  min="1"
                  value={saleLot.expectedPrice}
                  onChange={(event) =>
                    setSaleLot((current) => ({ ...current, expectedPrice: event.target.value }))
                  }
                />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSaleLotOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Publish Sale Lot
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          )}
        </section>
      )}

      {/* =========================================================
          VOICE + SEARCH
          ========================================================= */}

      <section className="card-surface p-5">

        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />

          <div>
            <h2 className="font-semibold">
              Search Farm Services
            </h2>

            <p className="text-sm text-muted-foreground">
              Machinery, transport and other farm resources.
            </p>
          </div>
        </div>

        <form
          onSubmit={search}
          className="mt-4 flex gap-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              className="h-12 pl-9"
              placeholder="Search tractor, harvester, rotavator…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            variant="secondary"
            className="h-12 px-6"
          >
            Search
          </Button>
        </form>

      </section>

      {/* =========================================================
          SECONDARY FARM SERVICES
      ========================================================= */}

      <section>

        <div className="mb-3">
          <p className="text-sm font-medium text-primary">
            FARM COST & RESOURCE SUPPORT
          </p>

          <h2 className="text-xl font-semibold">
            More Kisan Connect Services
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

          <ServiceCard
            to="/machinery"
            label="Machinery Lending"
            icon={Tractor}
          />

          <ServiceCard
            to="/residues"
            label="Crop Residues"
            icon={Leaf}
          />

          <ServiceCard
            to="/community"
            label="Farmer Community"
            icon={Users}
          />

          <ServiceCard
            to="/bookings"
            label="My Bookings"
            icon={CalendarDays}
          />

        </div>

      </section>

      {/* =========================================================
          OLD DATABASE STATS — SECONDARY
      ========================================================= */}

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">

        <Stat
          label="Active bookings"
          value={stats?.active}
        />

        <Stat
          label="Machinery listed"
          value={stats?.listed}
        />

        <Stat
          label="Residue listings"
          value={stats?.residues}
        />

        <Stat
          label="Requests received"
          value={stats?.requests}
        />

      </section>

    </div>
  );
}

/* ===============================================================
   COMPONENTS
=============================================================== */

function MarketCard({
  icon: Icon,
  label,
  value,
  subtitle,
  trend,
  positive,
}: {
  icon: typeof IndianRupee;
  label: string;
  value: string;
  subtitle: string;
  trend: string;
  positive?: boolean;
}) {
  return (
    <div className="card-surface p-4">

      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {label}
        </span>

        <Icon className="h-5 w-5 text-primary" />
      </div>

      <p className="mt-3 text-2xl font-bold">
        {value}
      </p>

      <div className="mt-1 flex items-center justify-between gap-2">

        <span className="text-xs text-muted-foreground">
          {subtitle}
        </span>

        <span
          className={`flex items-center text-xs font-semibold ${
            positive ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {positive && <ArrowUp className="mr-1 h-3 w-3" />}
          {trend}
        </span>

      </div>

    </div>
  );
}

function Signal({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof ArrowUp;
}) {
  return (
    <div className="flex items-center justify-between text-sm">

      <span className="text-muted-foreground">
        {label}
      </span>

      <span className="flex items-center gap-1 font-medium">
        <Icon className="h-4 w-4 text-primary" />
        {value}
      </span>

    </div>
  );
}

function MoneyBox({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight
          ? "border-primary/30 bg-primary/5"
          : "border-border"
      }`}
    >
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-lg font-bold">
        {value}
      </p>
    </div>
  );
}

function InfoBox({
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

      <p className="mt-1 font-semibold">
        {value}
      </p>
    </div>
  );
}

function TransactionStep({
  label,
  active,
  completed,
}: {
  label: string;
  active?: boolean;
  completed?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1">

      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full ${
          completed
            ? "bg-primary text-primary-foreground"
            : active
              ? "border-2 border-primary"
              : "border border-border"
        }`}
      >
        {completed ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : (
          <span className="h-2 w-2 rounded-full bg-current" />
        )}
      </div>

      <span className="text-[10px] text-muted-foreground">
        {label}
      </span>

    </div>
  );
}

function TransactionLine({
  completed,
}: {
  completed?: boolean;
}) {
  return (
    <div
      className={`hidden h-px flex-1 sm:block ${
        completed ? "bg-primary" : "bg-border"
      }`}
    />
  );
}

function ServiceCard({
  to,
  label,
  icon: Icon,
}: {
  to: string;
  label: string;
  icon: typeof Tractor;
}) {
  return (
    <Link
      to={to}
      className="card-surface flex items-center gap-3 p-4 transition-shadow hover:shadow-[var(--shadow-lift)]"
    >
      <Icon className="h-6 w-6 text-primary" />

      <span className="text-sm font-medium">
        {label}
      </span>
    </Link>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: number | undefined;
}) {
  return (
    <div className="card-surface p-4">

      <span className="text-2xl font-semibold">
        {value ?? "—"}
      </span>

      <p className="mt-1 text-sm text-muted-foreground">
        {label}
      </p>

    </div>
  );
}