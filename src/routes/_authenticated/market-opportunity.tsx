import { createFileRoute, Link } from "@tanstack/react-router"
import { useState } from "react"
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  MapPin,
  Package,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Truck,
} from "lucide-react"

export const Route = createFileRoute("/_authenticated/market-opportunity")({
  component: MarketOpportunity,
})

const OPPORTUNITIES = [
  {
    crop: "Tomato",
    market: "Mumbai",
    price: 3020,
    change: 9.1,
    demand: "High",
    arrivals: 1240,
    distance: 168,
    score: 94,
    action: "Strong Opportunity",
  },
  {
    crop: "Tomato",
    market: "Nashik",
    price: 2850,
    change: 8.4,
    demand: "High",
    arrivals: 860,
    distance: 18,
    score: 92,
    action: "Good Opportunity",
  },
  {
    crop: "Onion",
    market: "Pune",
    price: 2750,
    change: 6.7,
    demand: "High",
    arrivals: 720,
    distance: 42,
    score: 88,
    action: "Good Opportunity",
  },
  {
    crop: "Potato",
    market: "Ahmednagar",
    price: 2410,
    change: 4.8,
    demand: "Medium",
    arrivals: 950,
    distance: 35,
    score: 81,
    action: "Watch Market",
  },
]

function MarketOpportunity() {
  const [crop, setCrop] = useState("All")

  const opportunities =
    crop === "All"
      ? OPPORTUNITIES
      : OPPORTUNITIES.filter((item) => item.crop === crop)

  return (
    <main className="min-h-screen bg-[#faf9f2] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center gap-3">
          <Link
            to="/dashboard"
            className="rounded-xl border bg-white p-2 hover:bg-gray-50"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
              AI Market Intelligence
            </p>

            <h1 className="text-3xl font-bold">
              Market Opportunity
            </h1>

            <p className="mt-1 text-gray-600">
              Discover where demand, prices and market conditions create
              better selling opportunities.
            </p>
          </div>
        </div>

        <section className="mb-7 rounded-3xl bg-green-900 p-6 text-white shadow-sm md:p-8">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-green-200">
                <Sparkles size={19} />
                AI Market Opportunity Engine
              </div>

              <h2 className="text-3xl font-bold md:text-4xl">
                Find the market with the best selling potential.
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-green-100">
                Kisan Connect combines price movement, buyer demand,
                arrivals, distance and estimated transaction costs to help
                farmers compare markets.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-5">
              <p className="text-sm text-green-200">
                Top opportunity
              </p>

              <p className="mt-1 text-3xl font-bold">
                Mumbai
              </p>

              <p className="mt-1 text-green-100">
                Tomato • ₹3,020/q
              </p>

              <div className="mt-3 flex items-center gap-2 font-semibold">
                <ArrowUpRight size={18} />
                +9.1%
              </div>
            </div>
          </div>
        </section>

        <div className="mb-7 grid gap-4 md:grid-cols-4">
          <Stat
            icon={<TrendingUp size={22} />}
            title="Price Trend"
            value="Rising"
            description="+7.3% average"
          />

          <Stat
            icon={<ShoppingCart size={22} />}
            title="Buyer Demand"
            value="High"
            description="3 active buyers"
          />

          <Stat
            icon={<Package size={22} />}
            title="Market Arrivals"
            value="1,240 q"
            description="14% movement"
          />

          <Stat
            icon={<BarChart3 size={22} />}
            title="Opportunity Score"
            value="94/100"
            description="Strong"
          />
        </div>

        <section className="mb-6 rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">
                Compare Opportunities
              </h2>

              <p className="text-sm text-gray-500">
                Higher score means stronger overall selling conditions.
              </p>
            </div>

            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="rounded-xl border px-4 py-3 font-medium outline-none focus:border-green-600"
            >
              <option>All</option>
              <option>Tomato</option>
              <option>Onion</option>
              <option>Potato</option>
            </select>
          </div>
        </section>

        <div className="grid gap-5 lg:grid-cols-2">
          {opportunities.map((item) => (
            <OpportunityCard key={`${item.crop}-${item.market}`} item={item} />
          ))}
        </div>

        <section className="mt-7 rounded-3xl border bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-green-100 p-3 text-green-700">
              <CheckCircle2 size={23} />
            </div>

            <div>
              <h2 className="text-xl font-bold">
                How Opportunity Score Works
              </h2>

              <p className="text-sm text-gray-500">
                Explainable signals instead of a black-box recommendation.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            <Factor title="Price Trend" value="30%" />
            <Factor title="Buyer Demand" value="25%" />
            <Factor title="Arrivals" value="15%" />
            <Factor title="Distance" value="15%" />
            <Factor title="Net Realization" value="15%" />
          </div>
        </section>

        <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Prototype note:</strong> Market values shown here are
          demonstration values. Production deployment should connect
          verified AGMARKNET/eNAM data and a validated forecasting model.
        </div>
      </div>
    </main>
  )
}

function OpportunityCard({
  item,
}: {
  item: (typeof OPPORTUNITIES)[number]
}) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold">{item.crop}</h3>

            <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-800">
              {item.action}
            </span>
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <MapPin size={15} />
            {item.market} • {item.distance} km
          </div>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold">
            ₹{item.price.toLocaleString("en-IN")}/q
          </p>

          <p className="mt-1 flex items-center justify-end gap-1 text-sm font-semibold text-green-700">
            <ArrowUpRight size={15} />
            +{item.change}%
          </p>
        </div>
      </div>

      <div className="my-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Metric label="Demand" value={item.demand} />
        <Metric label="Arrivals" value={`${item.arrivals} q`} />
        <Metric label="Distance" value={`${item.distance} km`} />
        <Metric label="Score" value={`${item.score}/100`} />
      </div>

      <div className="mb-4">
        <div className="mb-2 flex justify-between text-sm">
          <span className="font-medium">Opportunity score</span>
          <span className="font-bold">{item.score}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-green-700"
            style={{ width: `${item.score}%` }}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          to="/buyer-marketplace"
          className="flex-1 rounded-xl bg-green-700 px-4 py-3 text-center font-semibold text-white hover:bg-green-800"
        >
          Find Buyers
        </Link>

        <Link
          to="/sell-crop"
          className="flex-1 rounded-xl border px-4 py-3 text-center font-semibold hover:bg-gray-50"
        >
          Sell Crop
        </Link>
      </div>
    </div>
  )
}

function Stat({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode
  title: string
  value: string
  description: string
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-3 text-green-700">{icon}</div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{description}</p>
    </div>
  )
}

function Metric({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-3 text-center">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 font-bold">{value}</p>
    </div>
  )
}

function Factor({
  title,
  value,
}: {
  title: string
  value: string
}) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4 text-center">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-lg font-bold text-green-700">{value}</p>
    </div>
  )
}