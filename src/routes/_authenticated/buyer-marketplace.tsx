import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  IndianRupee,
  Package,
  Plus,
  ShieldCheck,
  Truck,
  Users,
  X,
} from "lucide-react";

type SaleLot = {
  id: number;
  crop: string;
  quantity: number;
  grade: string;
  expectedPrice: number;
  location: string;
  status: "Active" | "Offer Received" | "Sold";
};

const INITIAL_LOTS: SaleLot[] = [
  {
    id: 1,
    crop: "Tomato",
    quantity: 500,
    grade: "Grade A",
    expectedPrice: 3000,
    location: "Nashik, Maharashtra",
    status: "Offer Received",
  },
];

export default function Listings() {
  const [lots, setLots] = useState<SaleLot[]>(INITIAL_LOTS);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedLot, setSelectedLot] = useState<SaleLot | null>(
    INITIAL_LOTS[0],
  );
  const [activeTab, setActiveTab] = useState<
    "active" | "offers" | "completed"
  >("active");

  const [crop, setCrop] = useState("Tomato");
  const [quantity, setQuantity] = useState("500");
  const [grade, setGrade] = useState("Grade A");
  const [expectedPrice, setExpectedPrice] = useState("3000");
  const [location, setLocation] = useState("Nashik, Maharashtra");

  const [created, setCreated] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const createLot = () => {
    const newLot: SaleLot = {
      id: Date.now(),
      crop,
      quantity: Number(quantity) || 0,
      grade,
      expectedPrice: Number(expectedPrice) || 0,
      location,
      status: "Active",
    };

    setLots((previous) => [newLot, ...previous]);
    setSelectedLot(newLot);
    setShowCreate(false);
    setCreated(true);
    setAccepted(false);
  };

  return (
    <main className="min-h-screen bg-[#faf9f1]">
      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-7">
          <Link
            to="/dashboard"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-green-700">
                <Package className="h-4 w-4" />
                DIRECT CROP SELLING
              </div>

              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                Sell Your Crop
              </h1>

              <p className="mt-2 max-w-2xl text-gray-600">
                Create a digital sale lot, receive buyer offers and track
                your transaction from offer to delivery.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowCreate(true);
                setCreated(false);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white shadow-sm hover:bg-green-800"
            >
              <Plus className="h-5 w-5" />
              Create Sale Lot
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-6 py-6">
        <div className="grid gap-4 md:grid-cols-4">
          <Summary
            title="Active lots"
            value={String(lots.length)}
            icon={<Package className="h-5 w-5" />}
          />

          <Summary
            title="Offers received"
            value="3"
            icon={<Users className="h-5 w-5" />}
          />

          <Summary
            title="Best offer"
            value="₹3,000/q"
            icon={<IndianRupee className="h-5 w-5" />}
          />

          <Summary
            title="Verified buyers"
            value="3"
            icon={<ShieldCheck className="h-5 w-5" />}
          />
        </div>
      </section>

      {/* Tabs */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="flex gap-2 overflow-x-auto rounded-xl border bg-white p-2">
          <Tab
            active={activeTab === "active"}
            onClick={() => setActiveTab("active")}
          >
            Active Lots
          </Tab>

          <Tab
            active={activeTab === "offers"}
            onClick={() => setActiveTab("offers")}
          >
            Offers Received
          </Tab>

          <Tab
            active={activeTab === "completed"}
            onClick={() => setActiveTab("completed")}
          >
            Completed Sales
          </Tab>
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-6 py-6">
        {activeTab === "completed" ? (
          <div className="rounded-2xl border bg-white p-12 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
            <h2 className="mt-4 text-xl font-bold">
              No completed sales yet
            </h2>
            <p className="mt-2 text-gray-500">
              Completed transactions will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
            {/* Lots */}
            <div className="space-y-4">
              {lots.map((lot) => (
                <button
                  type="button"
                  key={lot.id}
                  onClick={() => setSelectedLot(lot)}
                  className={`w-full rounded-2xl border bg-white p-5 text-left shadow-sm transition ${
                    selectedLot?.id === lot.id
                      ? "border-green-600 ring-2 ring-green-100"
                      : "hover:border-green-300"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-900">
                          {lot.crop}
                        </h3>

                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                          {lot.grade}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-gray-500">
                        {lot.quantity} kg • {lot.location}
                      </p>
                    </div>

                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>

                  <div className="mt-4 rounded-xl bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">
                      Expected price
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      ₹{lot.expectedPrice.toLocaleString()}/q
                    </p>
                  </div>

                  <div className="mt-3">
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                      {lot.status}
                    </span>
                  </div>
                </button>
              ))}

              <button
                type="button"
                onClick={() => setShowCreate(true)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 bg-white p-6 font-semibold text-gray-600 hover:border-green-500 hover:text-green-700"
              >
                <Plus className="h-5 w-5" />
                Create another sale lot
              </button>
            </div>

            {/* Details */}
            {selectedLot && (
              <div className="space-y-5">
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                  <div className="flex flex-col justify-between gap-4 md:flex-row">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {selectedLot.crop} Sale Lot
                        </h2>

                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          {selectedLot.grade}
                        </span>
                      </div>

                      <p className="mt-2 text-gray-500">
                        {selectedLot.quantity} kg •{" "}
                        {selectedLot.location}
                      </p>
                    </div>

                    <div className="rounded-xl bg-green-50 px-5 py-4">
                      <p className="text-sm text-gray-500">
                        Expected price
                      </p>
                      <p className="text-2xl font-bold text-green-800">
                        ₹
                        {selectedLot.expectedPrice.toLocaleString()}
                        /q
                      </p>
                    </div>
                  </div>

                  {created && (
                    <div className="mt-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-700" />
                      <div>
                        <p className="font-semibold text-green-900">
                          Sale lot created successfully
                        </p>
                        <p className="mt-1 text-sm text-green-800">
                          Matching buyers have been identified.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Offers */}
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Buyer Offers
                      </h2>
                      <p className="text-sm text-gray-500">
                        Compare offers before accepting.
                      </p>
                    </div>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      3 offers
                    </span>
                  </div>

                  <div className="space-y-4">
                    <Offer
                      buyer="FreshKart Foods"
                      price={3000}
                      quantity={500}
                      distance={18}
                      match={98}
                      accepted={accepted}
                      onAccept={() => setAccepted(true)}
                    />

                    <Offer
                      buyer="Maharashtra Agro"
                      price={2950}
                      quantity={1000}
                      distance={32}
                      match={94}
                      accepted={false}
                      onAccept={() => {}}
                    />

                    <Offer
                      buyer="Fresh Harvest Traders"
                      price={2900}
                      quantity={750}
                      distance={25}
                      match={91}
                      accepted={false}
                      onAccept={() => {}}
                    />
                  </div>
                </div>

                {/* Transaction tracker */}
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900">
                    Transaction Tracking
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Track your crop sale from offer to delivery.
                  </p>

                  <div className="mt-7">
                    <Tracker
                      accepted={accepted}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Create sale lot modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b p-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Create Sale Lot
                </h2>
                <p className="text-sm text-gray-500">
                  Add your crop details for buyer matching.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <Field
                label="Crop"
                value={crop}
                onChange={setCrop}
              />

              <Field
                label="Quantity (kg)"
                value={quantity}
                onChange={setQuantity}
                type="number"
              />

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Quality Grade
                </label>

                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full rounded-xl border bg-white px-4 py-3 outline-none focus:border-green-600"
                >
                  <option>Grade A</option>
                  <option>Grade B</option>
                  <option>Grade C</option>
                </select>
              </div>

              <Field
                label="Expected Price (₹/q)"
                value={expectedPrice}
                onChange={setExpectedPrice}
                type="number"
              />

              <Field
                label="Location"
                value={location}
                onChange={setLocation}
              />

              <div className="rounded-xl bg-green-50 p-4">
                <p className="text-sm font-semibold text-green-900">
                  Smart matching
                </p>
                <p className="mt-1 text-sm text-green-800">
                  Kisan Connect will compare buyer demand, price,
                  distance and payment terms.
                </p>
              </div>

              <button
                type="button"
                onClick={createLot}
                className="w-full rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
              >
                Publish Sale Lot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mx-auto max-w-7xl px-6 pb-10">
        <p className="text-center text-xs text-gray-500">
          Prototype buyer and offer data — connect verified marketplace
          records and payment services before production use.
        </p>
      </div>
    </main>
  );
}

function Summary({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3 text-green-700">
        {icon}
        <p className="text-sm text-gray-500">{title}</p>
      </div>

      <p className="mt-3 text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function Tab({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold ${
        active
          ? "bg-green-700 text-white"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

function Offer({
  buyer,
  price,
  quantity,
  distance,
  match,
  accepted,
  onAccept,
}: {
  buyer: string;
  price: number;
  quantity: number;
  distance: number;
  match: number;
  accepted: boolean;
  onAccept: () => void;
}) {
  return (
    <div className="rounded-xl border p-4">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900">{buyer}</h3>

            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">
              <ShieldCheck className="h-3 w-3" />
              Verified
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
            <span>₹{price.toLocaleString()}/q</span>
            <span>{quantity} kg</span>
            <span>{distance} km</span>
            <span>{match}% match</span>
          </div>
        </div>

        {accepted ? (
          <span className="inline-flex items-center gap-2 rounded-xl bg-green-100 px-4 py-2 font-semibold text-green-800">
            <CheckCircle2 className="h-4 w-4" />
            Accepted
          </span>
        ) : (
          <button
            type="button"
            onClick={onAccept}
            className="rounded-xl bg-green-700 px-5 py-2.5 font-semibold text-white hover:bg-green-800"
          >
            Accept Offer
          </button>
        )}
      </div>
    </div>
  );
}

function Tracker({ accepted }: { accepted: boolean }) {
  const steps = [
    { title: "Offer", done: true },
    { title: "Accepted", done: accepted },
    { title: "Payment", done: false },
    { title: "Delivered", done: false },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-4">
      {steps.map((step, index) => (
        <div key={step.title} className="relative">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                step.done
                  ? "bg-green-700 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {step.done ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>

            <div>
              <p className="text-xs text-gray-500">Step {index + 1}</p>
              <p className="font-semibold text-gray-900">
                {step.title}
              </p>
            </div>
          </div>

          {index < steps.length - 1 && (
            <div className="absolute left-10 top-5 hidden h-px w-full bg-gray-200 md:block" />
          )}
        </div>
      ))}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
      />
    </div>
  );
}