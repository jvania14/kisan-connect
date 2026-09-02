import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  Package,
  ShieldCheck,
  ShoppingCart,
  Sprout,
  Tractor,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/tractor.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Kisan Connect — Smart Market Linkage & Price Discovery",
      },
      {
        name: "description",
        content:
          "Kisan Connect helps farmers discover better crop prices, find verified buyers and make informed selling decisions.",
      },
      {
        property: "og:title",
        content:
          "Kisan Connect — Smart Market Linkage & Price Discovery",
      },
      {
        property: "og:description",
        content:
          "Know the right price. Find the right buyer. Sell at the right time.",
      },
    ],
  }),
  component: Landing,
});

const MARKET_PRICES = [
  {
    market: "Nashik",
    price: "₹2,850",
    change: "+8.4%",
  },
  {
    market: "Pune",
    price: "₹2,720",
    change: "+5.2%",
  },
  {
    market: "Ahmednagar",
    price: "₹2,610",
    change: "+3.8%",
  },
  {
    market: "Mumbai",
    price: "₹3,020",
    change: "+9.1%",
  },
];

const FEATURES = [
  {
    icon: BarChart3,
    title: "Live Market Prices",
    body: "Compare mandi prices, market arrivals and price trends across nearby markets.",
  },
  {
    icon: Users,
    title: "Find Verified Buyers",
    body: "Connect directly with buyers, processors, traders and institutional buyers.",
  },
  {
    icon: Clock3,
    title: "Smart Sell Window",
    body: "Get a simple recommendation on whether to sell now or wait.",
  },
  {
    icon: Package,
    title: "Create Sale Lots",
    body: "Create crop lots with quantity, quality, photos and expected price.",
  },
  {
    icon: ShoppingCart,
    title: "Digital Offers",
    body: "Receive buyer offers, negotiate digitally and accept the best offer.",
  },
  {
    icon: ShieldCheck,
    title: "Track Transactions",
    body: "Track payment, pickup and delivery with transparent transaction records.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sprout className="h-5 w-5" />
            </span>

            <div>
              <span className="text-lg font-semibold">Kisan Connect</span>
              <p className="hidden text-[10px] text-muted-foreground sm:block">
                Market Linkage & Price Discovery
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="outline">Login</Button>
            </Link>

            <Link to="/auth" search={{ mode: "signup" }}>
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
        <div>
          <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
            Smart India Hackathon 2026 · SIH26132
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
            Know the right price.
            <span className="block text-primary">
              Find the right buyer.
            </span>
            <span className="block">Sell at the right time.</span>
          </h1>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Kisan Connect strengthens market linkages for farmers by bringing
            together market prices, buyer demand, price trends and digital
            selling tools in one platform.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#market-prices">
              <Button size="lg" className="h-12 px-7 text-base">
                Check Market Prices
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>

            <Link to="/auth" search={{ mode: "signup" }}>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-7 text-base"
              >
                Find Buyers
              </Button>
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>✓ Price Intelligence</span>
            <span>✓ Verified Buyers</span>
            <span>✓ Digital Transactions</span>
          </div>
        </div>

        <div className="relative">
          <img
            src={heroImg}
            alt="Agricultural field and farm machinery"
            width={1024}
            height={640}
            className="h-[400px] w-full rounded-2xl border border-border object-cover shadow-[var(--shadow-lift)]"
          />

          <div className="absolute -bottom-6 left-4 right-4 rounded-2xl border border-border bg-background p-5 shadow-xl sm:left-8 sm:right-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Today's Best Price
                </p>

                <p className="mt-1 text-2xl font-bold">
                  ₹3,020 / q
                </p>

                <p className="text-sm text-primary">
                  Tomato · Mumbai
                </p>
              </div>

              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <TrendingUp className="h-7 w-7" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARKET PRICES */}
      <section
        id="market-prices"
        className="border-y border-border bg-card/60"
      >
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <BarChart3 className="h-4 w-4" />
              MARKET INTELLIGENCE
            </div>

            <h2 className="mt-2 text-3xl font-bold">
              Today's Market Prices
            </h2>

            <p className="mt-2 max-w-2xl text-muted-foreground">
              Compare prices across nearby markets and identify better selling
              opportunities.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MARKET_PRICES.map((item) => (
              <div
                key={item.market}
                className="rounded-2xl border border-border bg-background p-5"
              >
                <p className="text-sm text-muted-foreground">
                  {item.market}
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {item.price}/q
                </p>

                <div className="mt-2 flex items-center gap-1 text-sm font-medium text-primary">
                  <TrendingUp className="h-4 w-4" />
                  {item.change}
                </div>

                <p className="mt-3 text-xs text-muted-foreground">
                  Tomato market price
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background p-5">
              <p className="text-sm text-muted-foreground">
                Current Best Price
              </p>
              <p className="mt-1 text-2xl font-bold">
                ₹3,020/q
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-5">
              <p className="text-sm text-muted-foreground">
                Market Arrivals
              </p>
              <p className="mt-1 text-2xl font-bold">
                1,240 q
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background p-5">
              <p className="text-sm text-muted-foreground">
                Average Price
              </p>
              <p className="mt-1 text-2xl font-bold">
                ₹2,800/q
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SMART SELL WINDOW */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Clock3 className="h-4 w-4" />
                SMART SELL WINDOW
              </div>

              <h2 className="mt-3 text-3xl font-bold">
                Sell now or wait?
              </h2>

              <p className="mt-4 text-muted-foreground">
                Our market intelligence combines price trends and arrival
                data to give farmers a simple selling recommendation.
              </p>

              <div className="mt-6 rounded-2xl border border-border bg-background p-6">
                <p className="text-sm text-muted-foreground">
                  Tomato · Current Price
                </p>

                <p className="mt-1 text-3xl font-bold">
                  ₹2,850/q
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <span className="rounded-xl bg-primary/10 px-4 py-2 font-bold text-primary">
                    WAIT 2–3 DAYS
                  </span>

                  <span className="text-sm text-muted-foreground">
                    Confidence: 78%
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6">
              <h3 className="font-semibold">
                Why wait?
              </h3>

              <div className="mt-5 space-y-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Market arrivals are showing a declining trend.
                  </p>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Buyer demand is increasing.
                  </p>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Nearby markets are showing rising prices.
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-border pt-5">
                <p className="text-sm text-muted-foreground">
                  Expected price range
                </p>

                <p className="mt-1 text-xl font-bold">
                  ₹2,950 – ₹3,100/q
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUYER MATCHING */}
      <section
        id="buyers"
        className="border-y border-border bg-card/60"
      >
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Users className="h-4 w-4" />
              DIRECT MARKET LINKAGE
            </div>

            <h2 className="mt-2 text-3xl font-bold">
              Find Verified Buyers
            </h2>

            <p className="mt-2 max-w-2xl text-muted-foreground">
              Match your crop with buyers based on price, quantity,
              location and requirements.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <BuyerCard
              name="FreshKart Foods"
              price="₹3,000/q"
              quantity="500 kg"
              distance="18 km"
              match="98% Match"
            />

            <BuyerCard
              name="Maharashtra Agro"
              price="₹2,950/q"
              quantity="1,000 kg"
              distance="32 km"
              match="94% Match"
            />

            <BuyerCard
              name="Fresh Harvest Traders"
              price="₹2,900/q"
              quantity="750 kg"
              distance="25 km"
              match="91% Match"
            />
          </div>

          <div className="mt-8 text-center">
            <Link to="/auth" search={{ mode: "signup" }}>
              <Button size="lg">
                Create Your Sale Lot
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-3xl font-bold">
            From price discovery to completed sale
          </h2>

          <p className="mt-3 max-w-2xl text-muted-foreground">
            Kisan Connect helps farmers make better selling decisions and
            connect with reliable buyers.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="card-surface p-5"
              >
                <feature.icon className="h-6 w-6 text-primary" />

                <h3 className="mt-3 font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECONDARY SERVICES */}
      <section className="border-t border-border bg-card/60">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <div className="text-center">
            <p className="text-sm font-semibold text-primary">
              SUPPORTING FARM SERVICES
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              More ways to improve farm income
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
              Market linkage and price discovery are the core of Kisan
              Connect. These services support farmers by reducing costs
              and creating additional income.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="card-surface p-6">
              <Tractor className="h-6 w-6 text-primary" />

              <h3 className="mt-3 font-semibold">
                Machinery Lending
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Share or rent farm machinery to reduce cultivation costs
                and improve net price realization.
              </p>
            </div>

            <div className="card-surface p-6">
              <Package className="h-6 w-6 text-primary" />

              <h3 className="mt-3 font-semibold">
                Crop Residue Exchange
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Turn agricultural residue into an additional source of
                income.
              </p>
            </div>

            <div className="card-surface p-6">
              <ShoppingCart className="h-6 w-6 text-primary" />

              <h3 className="mt-3 font-semibold">
                Storage & Logistics
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Explore storage and transport options to make better
                selling decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            Kisan Connect · Smart Market Linkage & Price Discovery
            Platform
          </p>

          <p>
            SIH26132 · Agriculture & Rural Development
          </p>
        </div>
      </footer>
    </div>
  );
}

function BuyerCard({
  name,
  price,
  quantity,
  distance,
  match,
}: {
  name: string;
  price: string;
  quantity: string;
  distance: string;
  match: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{name}</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Verified Buyer
          </p>
        </div>

        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {match}
        </span>
      </div>

      <div className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Crop</span>
          <span className="font-medium">Tomato</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Offer</span>
          <span className="font-medium">{price}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Required</span>
          <span className="font-medium">{quantity}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Distance</span>
          <span className="font-medium">{distance}</span>
        </div>
      </div>

      <Link
        to="/auth"
        search={{ mode: "signup" }}
        className="mt-5 block"
      >
        <Button variant="outline" className="w-full">
          View Buyer
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}