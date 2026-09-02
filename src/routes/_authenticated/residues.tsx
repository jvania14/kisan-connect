import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  Clock3,
  IndianRupee,
  Leaf,
  MapPin,
  Package,
  Recycle,
  ShieldCheck,
  Truck,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/residues")({
  component: Residues,
});

type ResidueStatus =
  | "Available"
  | "Offer Received"
  | "Accepted"
  | "Pickup Scheduled"
  | "Completed";

type ResidueListing = {
  id: number;
  crop: string;
  residue: string;
  quantity: number;
  price: number;
  location: string;
  buyerCount: number;
  status: ResidueStatus;
  created: string;
};

type ResidueBuyer = {
  id: number;
  name: string;
  type: string;
  price: number;
  required: string;
  distance: string;
  match: number;
  purpose: string;
};

const INITIAL_LISTINGS: ResidueListing[] = [
  {
    id: 1,
    crop: "Wheat",
    residue: "Wheat Straw",
    quantity: 800,
    price: 320,
    location: "Nashik",
    buyerCount: 3,
    status: "Offer Received",
    created: "Today",
  },
  {
    id: 2,
    crop: "Rice",
    residue: "Rice Straw",
    quantity: 1200,
    price: 280,
    location: "Pune",
    buyerCount: 2,
    status: "Available",
    created: "2 days ago",
  },
  {
    id: 3,
    crop: "Sugarcane",
    residue: "Sugarcane Trash",
    quantity: 1500,
    price: 450,
    location: "Ahmednagar",
    buyerCount: 4,
    status: "Accepted",
    created: "4 days ago",
  },
];

const BUYERS: ResidueBuyer[] = [
  {
    id: 1,
    name: "GreenFuel Energy",
    type: "Biomass / Bioenergy",
    price: 340,
    required: "500–2,000 kg",
    distance: "22 km",
    match: 97,
    purpose: "Biomass fuel",
  },
  {
    id: 2,
    name: "Maharashtra Cattle Feed",
    type: "Animal Feed",
    price: 330,
    required: "500–1,500 kg",
    distance: "31 km",
    match: 94,
    purpose: "Animal feed",
  },
  {
    id: 3,
    name: "EcoCompost Solutions",
    type: "Compost Producer",
    price: 300,
    required: "300–1,000 kg",
    distance: "18 km",
    match: 91,
    purpose: "Organic compost",
  },
];

function Residues() {
  const [listings, setListings] =
    useState<ResidueListing[]>(INITIAL_LISTINGS);

  const [selectedListing, setSelectedListing] =
    useState<ResidueListing | null>(INITIAL_LISTINGS[0]);

  const [selectedBuyer, setSelectedBuyer] =
    useState<ResidueBuyer | null>(null);

  const [showCreate, setShowCreate] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "available" | "offers" | "completed"
  >("available");

  const [newResidue, setNewResidue] = useState({
    crop: "Wheat",
    residue: "Wheat Straw",
    quantity: "800",
    price: "320",
    location: "Nashik",
  });

  const availableListings = listings.filter(
    (item) =>
      item.status === "Available" ||
      item.status === "Offer Received",
  );

  const offerListings = listings.filter(
    (item) =>
      item.status === "Offer Received" ||
      item.status === "Accepted" ||
      item.status === "Pickup Scheduled",
  );

  const completedListings = listings.filter(
    (item) => item.status === "Completed",
  );

  const visibleListings =
    activeTab === "available"
      ? availableListings
      : activeTab === "offers"
        ? offerListings
        : completedListings;

  const totalQuantity = useMemo(
    () =>
      listings.reduce(
        (total, listing) => total + listing.quantity,
        0,
      ),
    [listings],
  );

  const createListing = (event: React.FormEvent) => {
    event.preventDefault();

    const quantity = Number(newResidue.quantity) || 0;
    const price = Number(newResidue.price) || 0;

    const listing: ResidueListing = {
      id: Date.now(),
      crop: newResidue.crop,
      residue: newResidue.residue,
      quantity,
      price,
      location: newResidue.location,
      buyerCount: 0,
      status: "Available",
      created: "Just now",
    };

    setListings((current) => [listing, ...current]);
    setSelectedListing(listing);
    setSelectedBuyer(null);
    setShowCreate(false);
    setActiveTab("available");
  };

  const acceptOffer = (buyer: ResidueBuyer) => {
    if (!selectedListing) return;

    const updated: ResidueListing = {
      ...selectedListing,
      price: buyer.price,
      status: "Accepted",
    };

    setListings((current) =>
      current.map((item) =>
        item.id === selectedListing.id ? updated : item,
      ),
    );

    setSelectedListing(updated);
    setSelectedBuyer(null);
  };

  return (
    <div className="space-y-6">
      {/* =========================================================
          HEADER
      ========================================================= */}

      <section className="card-surface overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2">
                <Recycle className="h-6 w-6 text-primary" />

                <p className="text-sm font-semibold text-primary">
                  RESIDUE EXCHANGE
                </p>
              </div>

              <h1 className="mt-2 text-3xl font-bold">
                Turn Crop Residue Into Income
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Sell agricultural residue to verified biomass, feed,
                compost and bioenergy buyers instead of burning or
                leaving it unused.
              </p>
            </div>

            <Button
              className="h-12"
              onClick={() => setShowCreate(true)}
            >
              <Leaf className="mr-2 h-5 w-5" />
              List Residue
            </Button>
          </div>

          {/* SUMMARY */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard
              label="Active listings"
              value={availableListings.length.toString()}
              icon={Leaf}
            />

            <SummaryCard
              label="Residue listed"
              value={`${totalQuantity.toLocaleString("en-IN")} kg`}
              icon={Package}
            />

            <SummaryCard
              label="Buyer matches"
              value={listings
                .reduce(
                  (total, item) => total + item.buyerCount,
                  0,
                )
                .toString()}
              icon={ShieldCheck}
            />

            <SummaryCard
              label="Potential value"
              value={`₹${listings
                .reduce(
                  (total, item) =>
                    total +
                    (item.quantity / 100) * item.price,
                  0,
                )
                .toLocaleString("en-IN")}`}
              icon={IndianRupee}
            />
          </div>
        </div>

        {/* TABS */}
        <div className="border-t border-border px-5">
          <div className="flex gap-6 overflow-x-auto">
            <TabButton
              active={activeTab === "available"}
              onClick={() => setActiveTab("available")}
            >
              Available
              <TabCount>{availableListings.length}</TabCount>
            </TabButton>

            <TabButton
              active={activeTab === "offers"}
              onClick={() => setActiveTab("offers")}
            >
              Offers & Deals
              <TabCount>{offerListings.length}</TabCount>
            </TabButton>

            <TabButton
              active={activeTab === "completed"}
              onClick={() => setActiveTab("completed")}
            >
              Completed
              <TabCount>{completedListings.length}</TabCount>
            </TabButton>
          </div>
        </div>
      </section>

      {/* =========================================================
          CREATE RESIDUE LISTING
      ========================================================= */}

      {showCreate && (
        <section className="card-surface border-primary/20 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary">
                NEW RESIDUE LISTING
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                List your agricultural residue
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Buyers will be matched according to residue type,
                quantity and location.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowCreate(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form
            onSubmit={createListing}
            className="mt-6 grid gap-4 md:grid-cols-2"
          >
            <FormField label="Crop">
              <Input
                value={newResidue.crop}
                onChange={(event) =>
                  setNewResidue({
                    ...newResidue,
                    crop: event.target.value,
                  })
                }
              />
            </FormField>

            <FormField label="Residue type">
              <select
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={newResidue.residue}
                onChange={(event) =>
                  setNewResidue({
                    ...newResidue,
                    residue: event.target.value,
                  })
                }
              >
                <option>Wheat Straw</option>
                <option>Rice Straw</option>
                <option>Sugarcane Trash</option>
                <option>Cotton Stalk</option>
                <option>Maize Stalk</option>
                <option>Groundnut Shell</option>
                <option>Other</option>
              </select>
            </FormField>

            <FormField label="Quantity (kg)">
              <Input
                type="number"
                min="1"
                value={newResidue.quantity}
                onChange={(event) =>
                  setNewResidue({
                    ...newResidue,
                    quantity: event.target.value,
                  })
                }
              />
            </FormField>

            <FormField label="Expected price (₹/quintal)">
              <Input
                type="number"
                min="1"
                value={newResidue.price}
                onChange={(event) =>
                  setNewResidue({
                    ...newResidue,
                    price: event.target.value,
                  })
                }
              />
            </FormField>

            <FormField label="Location">
              <Input
                value={newResidue.location}
                onChange={(event) =>
                  setNewResidue({
                    ...newResidue,
                    location: event.target.value,
                  })
                }
              />
            </FormField>

            <div className="flex items-end">
              <Button type="submit" className="h-10 w-full">
                Publish Residue Listing
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* VALUE PREVIEW */}
          <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-primary" />

              <p className="font-semibold">
                Estimated additional income
              </p>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              Based on your quantity and expected residue price.
            </p>

            <p className="mt-3 text-2xl font-bold">
              ₹
              {(
                ((Number(newResidue.quantity) || 0) / 100) *
                (Number(newResidue.price) || 0)
              ).toLocaleString("en-IN")}
            </p>
          </div>
        </section>
      )}

      {/* =========================================================
          LISTINGS
      ========================================================= */}

      <section>
        <div className="mb-4">
          <p className="text-sm font-semibold text-primary">
            YOUR RESIDUE
          </p>

          <h2 className="text-2xl font-semibold">
            {activeTab === "available"
              ? "Available Residue"
              : activeTab === "offers"
                ? "Residue With Buyer Activity"
                : "Completed Exchanges"}
          </h2>
        </div>

        {visibleListings.length === 0 ? (
          <div className="card-surface p-10 text-center">
            <Recycle className="mx-auto h-10 w-10 text-muted-foreground" />

            <h3 className="mt-4 font-semibold">
              No listings here yet
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              List your crop residue to start finding buyers.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-3">
            {visibleListings.map((listing) => (
              <ResidueCard
                key={listing.id}
                listing={listing}
                selected={selectedListing?.id === listing.id}
                onClick={() => {
                  setSelectedListing(listing);
                  setSelectedBuyer(null);
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* =========================================================
          SELECTED LISTING
      ========================================================= */}

      {selectedListing && (
        <section className="card-surface p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-primary">
                  SELECTED LISTING
                </p>

                <StatusBadge status={selectedListing.status} />
              </div>

              <h2 className="mt-2 text-2xl font-bold">
                {selectedListing.residue}
              </h2>

              <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>{selectedListing.crop}</span>

                <span className="flex items-center gap-1">
                  <Package className="h-4 w-4" />
                  {selectedListing.quantity} kg
                </span>

                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {selectedListing.location}
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-secondary px-4 py-3">
              <p className="text-xs text-muted-foreground">
                Current price
              </p>

              <p className="text-xl font-bold">
                ₹{selectedListing.price.toLocaleString("en-IN")}/q
              </p>
            </div>
          </div>

          {/* DETAILS */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <InfoBox
              label="Quantity"
              value={`${selectedListing.quantity} kg`}
            />

            <InfoBox
              label="Buyer matches"
              value={`${selectedListing.buyerCount}`}
            />

            <InfoBox
              label="Estimated value"
              value={`₹${(
                (selectedListing.quantity / 100) *
                selectedListing.price
              ).toLocaleString("en-IN")}`}
              highlight
            />
          </div>

          {/* BUYERS */}
          {selectedListing.status !== "Completed" && (
            <div className="mt-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm font-semibold text-primary">
                    VERIFIED BUYERS
                  </p>

                  <h3 className="text-xl font-semibold">
                    Who Can Use Your Residue?
                  </h3>
                </div>

                <span className="text-sm text-muted-foreground">
                  {BUYERS.length} matches
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {BUYERS.map((buyer) => (
                  <BuyerCard
                    key={buyer.id}
                    buyer={buyer}
                    selected={selectedBuyer?.id === buyer.id}
                    onClick={() => setSelectedBuyer(buyer)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* BUYER OFFER */}
          {selectedBuyer && (
            <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">
                      {selectedBuyer.name}
                    </h3>

                    <BadgeCheck className="h-5 w-5 text-primary" />
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {selectedBuyer.type} •{" "}
                    {selectedBuyer.match}% match
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Buyer offer
                  </p>

                  <p className="text-2xl font-bold">
                    ₹{selectedBuyer.price.toLocaleString("en-IN")}/q
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <InfoBox
                  label="Required"
                  value={selectedBuyer.required}
                />

                <InfoBox
                  label="Distance"
                  value={selectedBuyer.distance}
                />

                <InfoBox
                  label="Purpose"
                  value={selectedBuyer.purpose}
                />

                <InfoBox
                  label="Your quantity"
                  value={`${selectedListing.quantity} kg`}
                />

                <InfoBox
                  label="Estimated value"
                  value={`₹${(
                    (selectedListing.quantity / 100) *
                    selectedBuyer.price
                  ).toLocaleString("en-IN")}`}
                />

                <InfoBox
                  label="Price difference"
                  value={
                    selectedBuyer.price >= selectedListing.price
                      ? `+₹${(
                          selectedBuyer.price -
                          selectedListing.price
                        ).toLocaleString("en-IN")}/q`
                      : `₹${(
                          selectedBuyer.price -
                          selectedListing.price
                        ).toLocaleString("en-IN")}/q`
                  }
                />
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button
                  className="flex-1"
                  onClick={() => acceptOffer(selectedBuyer)}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Accept Offer
                </Button>

                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedBuyer(null)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Close
                </Button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* =========================================================
          TRANSACTION TRACKING
      ========================================================= */}

      {selectedListing &&
        ["Accepted", "Pickup Scheduled", "Completed"].includes(
          selectedListing.status,
        ) && (
          <TransactionTracker
            status={selectedListing.status}
          />
        )}

      {/* =========================================================
          VALUE PROPOSITION
      ========================================================= */}

      <section className="grid gap-4 md:grid-cols-3">
        <ValueCard
          icon={IndianRupee}
          title="Additional Income"
          text="Convert residue that would otherwise have little or no market value into an additional revenue stream."
        />

        <ValueCard
          icon={Recycle}
          title="Reduce Burning"
          text="Create a useful market for agricultural residue and encourage productive reuse instead of open-field burning."
        />

        <ValueCard
          icon={Truck}
          title="Local Buyers"
          text="Match residue with nearby biomass, feed, compost and energy users to reduce transportation costs."
        />
      </section>

      {/* DISCLAIMER */}
      <section className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
        <div className="flex gap-3">
          <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-primary" />

          <div>
            <h3 className="font-semibold">
              Transparent residue marketplace
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Buyer prices and matches shown in this prototype are
              demonstration values. Production deployment should
              connect verified buyer accounts, location services,
              logistics and transaction records through Supabase.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function SummaryCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof Leaf;
}) {
  return (
    <div className="rounded-2xl border border-border p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {label}
        </span>

        <Icon className="h-5 w-5 text-primary" />
      </div>

      <p className="mt-3 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}

function TabButton({
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
      className={`border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap ${
        active
          ? "border-primary text-primary"
          : "border-transparent text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function TabCount({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-xs">
      {children}
    </span>
  );
}

function ResidueCard({
  listing,
  selected,
  onClick,
}: {
  listing: ResidueListing;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`card-surface w-full text-left transition-all hover:-translate-y-0.5 ${
        selected
          ? "border-primary/40 ring-2 ring-primary/10"
          : ""
      }`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />

              <span className="font-semibold">
                {listing.residue}
              </span>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              {listing.crop} • {listing.quantity} kg
            </p>
          </div>

          <StatusBadge status={listing.status} />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <InfoBox
            label="Expected"
            value={`₹${listing.price.toLocaleString("en-IN")}/q`}
          />

          <InfoBox
            label="Buyers"
            value={`${listing.buyerCount} matches`}
          />
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {listing.location}
          </span>

          <span className="font-medium text-primary">
            View buyers →
          </span>
        </div>
      </div>
    </button>
  );
}

function BuyerCard({
  buyer,
  selected,
  onClick,
}: {
  buyer: ResidueBuyer;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        selected
          ? "border-primary/40 bg-primary/5"
          : "border-border"
      }`}
    >
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-semibold">
              {buyer.name}
            </h4>

            <BadgeCheck className="h-4 w-4 text-primary" />

            <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
              {buyer.match}% match
            </span>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            {buyer.type} • {buyer.purpose}
          </p>

          <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span>
              ₹{buyer.price.toLocaleString("en-IN")}/q
            </span>

            <span>{buyer.required}</span>

            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {buyer.distance}
            </span>
          </div>
        </div>

        <Button
          variant={selected ? "default" : "outline"}
          onClick={onClick}
        >
          View Offer
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: ResidueStatus;
}) {
  const styles: Record<ResidueStatus, string> = {
    Available: "bg-secondary text-foreground",
    "Offer Received": "bg-primary/10 text-primary",
    Accepted: "bg-primary/10 text-primary",
    "Pickup Scheduled": "bg-secondary text-foreground",
    Completed: "bg-primary text-primary-foreground",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function TransactionTracker({
  status,
}: {
  status: ResidueStatus;
}) {
  const accepted = [
    "Accepted",
    "Pickup Scheduled",
    "Completed",
  ].includes(status);

  const pickup = [
    "Pickup Scheduled",
    "Completed",
  ].includes(status);

  const completed = status === "Completed";

  return (
    <section className="card-surface p-6">
      <div>
        <p className="text-sm font-semibold text-primary">
          EXCHANGE TRACKING
        </p>

        <h2 className="mt-1 text-2xl font-semibold">
          Residue transaction
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Track the residue exchange from accepted offer to pickup.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <TransactionStep
          icon={CheckCircle2}
          label="Offer Accepted"
          completed={accepted}
          active={!accepted}
        />

        <TransactionStep
          icon={Truck}
          label="Pickup Scheduled"
          completed={pickup}
          active={accepted && !pickup}
        />

        <TransactionStep
          icon={CheckCircle2}
          label="Completed"
          completed={completed}
          active={pickup && !completed}
        />
      </div>

      <div className="mt-6 rounded-xl bg-secondary p-4">
        <div className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-primary" />

          <p className="text-sm font-semibold">
            Current status: {status}
          </p>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          {status === "Accepted" &&
            "The buyer offer has been accepted. Pickup can now be scheduled."}

          {status === "Pickup Scheduled" &&
            "Pickup has been scheduled with the buyer."}

          {status === "Completed" &&
            "Residue exchange completed successfully."}
        </p>
      </div>
    </section>
  );
}

function TransactionStep({
  icon: Icon,
  label,
  completed,
  active,
}: {
  icon: typeof CheckCircle2;
  label: string;
  completed?: boolean;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 md:flex-col md:justify-center">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          completed
            ? "bg-primary text-primary-foreground"
            : active
              ? "border-2 border-primary text-primary"
              : "border border-border text-muted-foreground"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>

      <span
        className={`text-sm ${
          completed || active
            ? "font-semibold"
            : "text-muted-foreground"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function InfoBox({
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
      className={`rounded-xl p-3 ${
        highlight
          ? "border border-primary/20 bg-primary/5"
          : "bg-secondary"
      }`}
    >
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 font-semibold">
        {value}
      </p>
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label}
      </label>

      <div className="mt-2">{children}</div>
    </div>
  );
}

function ValueCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof IndianRupee;
  title: string;
  text: string;
}) {
  return (
    <div className="card-surface p-5">
      <Icon className="h-6 w-6 text-primary" />

      <h3 className="mt-4 font-semibold">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        {text}
      </p>
    </div>
  );
}