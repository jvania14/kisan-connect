import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  IndianRupee,
  Loader2,
  MapPin,
  Package,
  Plus,
  RefreshCw,
  ShieldCheck,
  Truck,
  UserRound,
  X,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/_authenticated/listings")({
  component: ListingsPage,
});

/* =========================================================
   TYPES
========================================================= */

type SaleLotStatus =
  | "draft"
  | "active"
  | "offer_received"
  | "accepted"
  | "sold"
  | "cancelled";

type OfferStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "withdrawn";

type TransactionStatus =
  | "offer_accepted"
  | "payment_pending"
  | "paid"
  | "delivery_pending"
  | "delivered"
  | "completed"
  | "cancelled"
  | "disputed";

interface SaleLot {
  id: string;
  farmer_id: string;
  crop_name: string;
  quantity: number;
  unit: string;
  grade: string | null;
  expected_price: number | null;
  description: string | null;
  state: string | null;
  district: string | null;
  village: string | null;
  status: SaleLotStatus;
  created_at: string;
  updated_at: string;
}

interface BuyerOffer {
  id: string;
  sale_lot_id: string;
  buyer_id: string;
  offered_price: number;
  quantity: number;
  message: string | null;
  status: OfferStatus;
  created_at: string;
  buyer?: {
    id: string;
    name: string | null;
    is_verified: boolean | null;
    rating: number | null;
    phone: string | null;
  } | null;
}

interface MarketTransaction {
  id: string;
  sale_lot_id: string;
  offer_id: string | null;
  farmer_id: string;
  buyer_id: string;
  agreed_price: number;
  quantity: number;
  payment_status: string;
  delivery_status: string;
  transaction_status: TransactionStatus;
  created_at: string;
}

/* =========================================================
   HELPERS
========================================================= */

function money(value: number | null | undefined) {
  if (value === null || value === undefined) return "—";

  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function statusLabel(status: SaleLotStatus) {
  switch (status) {
    case "active":
      return "Active";
    case "offer_received":
      return "Offers Received";
    case "accepted":
      return "Offer Accepted";
    case "sold":
      return "Sold";
    case "cancelled":
      return "Cancelled";
    default:
      return "Draft";
  }
}

function statusClass(status: SaleLotStatus) {
  switch (status) {
    case "active":
      return "bg-emerald-100 text-emerald-700";
    case "offer_received":
      return "bg-amber-100 text-amber-700";
    case "accepted":
      return "bg-blue-100 text-blue-700";
    case "sold":
      return "bg-green-100 text-green-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-muted text-muted-foreground";
  }
}

/* =========================================================
   DATA HOOKS
========================================================= */

function useSaleLots(userId?: string) {
  return useQuery({
    queryKey: ["sale-lots", userId],
    enabled: !!userId,

    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from("sale_lots")
        .select("*")
        .eq("farmer_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (data ?? []) as SaleLot[];
    },
  });
}

function useOffers(userId?: string) {
  return useQuery({
    queryKey: ["farmer-offers", userId],
    enabled: !!userId,

    queryFn: async () => {
      if (!userId) return [];

      const { data: lots, error: lotError } = await supabase
        .from("sale_lots")
        .select("id")
        .eq("farmer_id", userId);

      if (lotError) throw lotError;

      const lotIds = (lots ?? []).map((lot) => lot.id);

      if (lotIds.length === 0) {
        return [] as BuyerOffer[];
      }

      const { data, error } = await supabase
        .from("buyer_offers")
        .select(
          `
          id,
          sale_lot_id,
          buyer_id,
          offered_price,
          quantity,
          message,
          status,
          created_at,
          buyer:buyer_id (
            id,
            name,
            is_verified,
            rating,
            phone
          )
        `,
        )
        .in("sale_lot_id", lotIds)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (data ?? []) as unknown as BuyerOffer[];
    },
  });
}

function useTransactions(userId?: string) {
  return useQuery({
    queryKey: ["market-transactions-farmer", userId],
    enabled: !!userId,

    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await supabase
        .from("market_transactions")
        .select("*")
        .eq("farmer_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (data ?? []) as MarketTransaction[];
    },
  });
}

/* =========================================================
   MAIN PAGE
========================================================= */

function ListingsPage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<
    "lots" | "offers" | "completed"
  >("lots");

  const [selectedLot, setSelectedLot] = useState<SaleLot | null>(null);

  const [showCreate, setShowCreate] = useState(false);

  const [crop, setCrop] = useState("Tomato");
  const [quantity, setQuantity] = useState("500");
  const [unit, setUnit] = useState("kg");
  const [grade, setGrade] = useState("Grade A");
  const [expectedPrice, setExpectedPrice] = useState("3000");
  const [description, setDescription] = useState("");

  const [creating, setCreating] = useState(false);
  const [processingOffer, setProcessingOffer] = useState<string | null>(
    null,
  );

  const saleLotsQuery = useSaleLots(user?.id);
  const offersQuery = useOffers(user?.id);
  const transactionsQuery = useTransactions(user?.id);

  const lots = saleLotsQuery.data ?? [];
  const offers = offersQuery.data ?? [];
  const transactions = transactionsQuery.data ?? [];

  const activeLots = useMemo(
    () =>
      lots.filter(
        (lot) =>
          lot.status !== "sold" &&
          lot.status !== "cancelled",
      ),
    [lots],
  );

  const completedLots = useMemo(
    () =>
      lots.filter(
        (lot) =>
          lot.status === "sold" ||
          lot.status === "cancelled",
      ),
    [lots],
  );

  const pendingOffers = useMemo(
    () => offers.filter((offer) => offer.status === "pending"),
    [offers],
  );

  const acceptedOffer = useMemo(
    () => offers.find((offer) => offer.status === "accepted"),
    [offers],
  );

  const currentTransaction = transactions[0];

  /* =======================================================
     CREATE SALE LOT
  ======================================================= */

  async function createSaleLot() {
    if (!user?.id) return;

    const numericQuantity = Number(quantity);
    const numericPrice = Number(expectedPrice);

    if (!crop.trim()) {
      alert("Please enter the crop name.");
      return;
    }

    if (!numericQuantity || numericQuantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    if (!numericPrice || numericPrice <= 0) {
      alert("Please enter a valid expected price.");
      return;
    }

    setCreating(true);

    try {
      const { error } = await supabase.from("sale_lots").insert({
        farmer_id: user.id,
        crop_name: crop.trim(),
        quantity: numericQuantity,
        unit,
        grade,
        expected_price: numericPrice,
        description: description.trim() || null,
        state: profile?.state ?? null,
        district: profile?.district ?? null,
        village: profile?.village ?? null,
        status: "active",
      });

      if (error) throw error;

      await queryClient.invalidateQueries({
        queryKey: ["sale-lots", user.id],
      });

      setShowCreate(false);

      setCrop("Tomato");
      setQuantity("500");
      setUnit("kg");
      setGrade("Grade A");
      setExpectedPrice("3000");
      setDescription("");

      setActiveTab("lots");

      alert("Sale lot published successfully.");
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to create sale lot.",
      );
    } finally {
      setCreating(false);
    }
  }

  /* =======================================================
     ACCEPT OFFER
  ======================================================= */

  async function acceptOffer(offer: BuyerOffer) {
    if (!user?.id) return;

    const lot = lots.find((item) => item.id === offer.sale_lot_id);

    if (!lot) {
      alert("Sale lot could not be found.");
      return;
    }

    if (offer.status !== "pending") {
      return;
    }

    const confirmed = window.confirm(
      `Accept ${money(offer.offered_price)} for ${offer.quantity} ${lot.unit} of ${lot.crop_name}?`,
    );

    if (!confirmed) return;

    setProcessingOffer(offer.id);

    try {
      /*
       * Step 1:
       * Accept selected offer.
       */
      const { error: acceptError } = await supabase
        .from("buyer_offers")
        .update({
          status: "accepted",
        })
        .eq("id", offer.id)
        .eq("status", "pending");

      if (acceptError) throw acceptError;

      /*
       * Step 2:
       * Reject other pending offers for the same lot.
       */
      const { error: rejectError } = await supabase
        .from("buyer_offers")
        .update({
          status: "rejected",
        })
        .eq("sale_lot_id", offer.sale_lot_id)
        .neq("id", offer.id)
        .eq("status", "pending");

      if (rejectError) throw rejectError;

      /*
       * Step 3:
       * Mark sale lot as accepted.
       */
      const { error: lotError } = await supabase
        .from("sale_lots")
        .update({
          status: "accepted",
          updated_at: new Date().toISOString(),
        })
        .eq("id", offer.sale_lot_id)
        .eq("farmer_id", user.id);

      if (lotError) throw lotError;

      /*
       * Step 4:
       * Create real transaction.
       */
      const { error: transactionError } = await supabase
        .from("market_transactions")
        .insert({
          sale_lot_id: offer.sale_lot_id,
          offer_id: offer.id,
          farmer_id: user.id,
          buyer_id: offer.buyer_id,
          agreed_price: offer.offered_price,
          quantity: offer.quantity,
          payment_status: "pending",
          delivery_status: "pending",
          transaction_status: "payment_pending",
        });

      if (transactionError) throw transactionError;

      /*
       * Step 5:
       * Notify buyer.
       *
       * This uses the notifications table already
       * present in the project.
       */
      await supabase.from("notifications").insert({
        user_id: offer.buyer_id,
        type: "market_offer_accepted",
        title: "Offer Accepted",
        message: `Your offer of ${money(
          offer.offered_price,
        )} has been accepted for ${offer.quantity} ${lot.unit} of ${lot.crop_name}.`,
        is_read: false,
      });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["sale-lots", user.id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["farmer-offers", user.id],
        }),
        queryClient.invalidateQueries({
          queryKey: ["market-transactions-farmer", user.id],
        }),
      ]);

      setSelectedLot({
        ...lot,
        status: "accepted",
      });

      alert(
        "Offer accepted. Transaction created successfully.",
      );
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to accept offer.",
      );
    } finally {
      setProcessingOffer(null);
    }
  }

  /* =======================================================
     REFRESH
  ======================================================= */

  async function refreshData() {
    await Promise.all([
      saleLotsQuery.refetch(),
      offersQuery.refetch(),
      transactionsQuery.refetch(),
    ]);
  }

  /* =======================================================
     LOADING
  ======================================================= */

  if (saleLotsQuery.isLoading) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading your sale lots...
        </div>
      </main>
    );
  }

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* ===================================================
          HEADER
      =================================================== */}

      <section className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
              <Package className="h-4 w-4" />
              MARKET LINKAGE
            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Sale Lots
            </h1>

            <p className="mt-2 max-w-2xl text-muted-foreground">
              Publish your crop, receive buyer offers, compare
              prices and complete the transaction digitally.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={refreshData}
              disabled={
                saleLotsQuery.isFetching ||
                offersQuery.isFetching
              }
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${
                  saleLotsQuery.isFetching
                    ? "animate-spin"
                    : ""
                }`}
              />
              Refresh
            </Button>

            <Button onClick={() => setShowCreate(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Sale Lot
            </Button>
          </div>
        </div>
      </section>

      {/* ===================================================
          STATS
      =================================================== */}

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Package className="h-5 w-5" />}
          label="Active Lots"
          value={activeLots.length}
        />

        <StatCard
          icon={<IndianRupee className="h-5 w-5" />}
          label="Offers Received"
          value={offers.length}
        />

        <StatCard
          icon={<Clock3 className="h-5 w-5" />}
          label="Pending Offers"
          value={pendingOffers.length}
        />

        <StatCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          label="Completed Sales"
          value={completedLots.length}
        />
      </section>

      {/* ===================================================
          TABS
      =================================================== */}

      <div className="mt-8 flex flex-wrap gap-2 border-b pb-3">
        <TabButton
          active={activeTab === "lots"}
          onClick={() => setActiveTab("lots")}
        >
          Active Lots
          <span>{activeLots.length}</span>
        </TabButton>

        <TabButton
          active={activeTab === "offers"}
          onClick={() => setActiveTab("offers")}
        >
          Offers Received
          <span>{offers.length}</span>
        </TabButton>

        <TabButton
          active={activeTab === "completed"}
          onClick={() => setActiveTab("completed")}
        >
          Completed Sales
          <span>{completedLots.length}</span>
        </TabButton>
      </div>

      {/* ===================================================
          ACTIVE LOTS
      =================================================== */}

      {activeTab === "lots" && (
        <section className="mt-6">
          {activeLots.length === 0 ? (
            <EmptyState
              title="No active sale lots"
              description="Create your first sale lot to start receiving buyer offers."
              buttonText="Create Sale Lot"
              onClick={() => setShowCreate(true)}
            />
          ) : (
            <div className="grid gap-5 lg:grid-cols-2">
              {activeLots.map((lot) => {
                const lotOffers = offers.filter(
                  (offer) =>
                    offer.sale_lot_id === lot.id,
                );

                const bestOffer = lotOffers
                  .filter(
                    (offer) => offer.status === "pending",
                  )
                  .sort(
                    (a, b) =>
                      b.offered_price -
                      a.offered_price,
                  )[0];

                return (
                  <SaleLotCard
                    key={lot.id}
                    lot={lot}
                    offerCount={lotOffers.length}
                    bestOffer={bestOffer}
                    onView={() => setSelectedLot(lot)}
                  />
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* ===================================================
          OFFERS
      =================================================== */}

      {activeTab === "offers" && (
        <section className="mt-6">
          {offers.length === 0 ? (
            <EmptyState
              title="No buyer offers yet"
              description="When buyers submit offers for your published lots, they will appear here."
              buttonText="View Active Lots"
              onClick={() => setActiveTab("lots")}
            />
          ) : (
            <div className="space-y-4">
              {offers.map((offer) => {
                const lot = lots.find(
                  (item) =>
                    item.id === offer.sale_lot_id,
                );

                if (!lot) return null;

                return (
                  <OfferCard
                    key={offer.id}
                    offer={offer}
                    lot={lot}
                    processing={
                      processingOffer === offer.id
                    }
                    onAccept={() =>
                      acceptOffer(offer)
                    }
                  />
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* ===================================================
          COMPLETED
      =================================================== */}

      {activeTab === "completed" && (
        <section className="mt-6">
          {completedLots.length === 0 ? (
            <EmptyState
              title="No completed sales"
              description="Completed transactions will appear here."
              buttonText="View Active Lots"
              onClick={() => setActiveTab("lots")}
            />
          ) : (
            <div className="grid gap-5 lg:grid-cols-2">
              {completedLots.map((lot) => (
                <SaleLotCard
                  key={lot.id}
                  lot={lot}
                  offerCount={
                    offers.filter(
                      (offer) =>
                        offer.sale_lot_id === lot.id,
                    ).length
                  }
                  onView={() =>
                    setSelectedLot(lot)
                  }
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* ===================================================
          TRANSACTION TRACKER
      =================================================== */}

      {currentTransaction && (
        <section className="mt-10">
          <div className="rounded-3xl border bg-card p-6 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold tracking-wider text-primary">
                  TRANSACTION TRACKING
                </p>

                <h2 className="mt-1 text-xl font-semibold">
                  Your latest market transaction
                </h2>
              </div>

              <span className="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                {currentTransaction.transaction_status.replace(
                  /_/g,
                  " ",
                )}
              </span>
            </div>

            <div className="mt-8">
              <TransactionTracker
                transaction={currentTransaction}
              />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <InfoItem
                label="Agreed price"
                value={money(
                  currentTransaction.agreed_price,
                )}
              />

              <InfoItem
                label="Quantity"
                value={`${currentTransaction.quantity} kg`}
              />

              <InfoItem
                label="Payment"
                value={
                  currentTransaction.payment_status
                }
              />
            </div>
          </div>
        </section>
      )}

      {/* ===================================================
          TRUST SECTION
      =================================================== */}

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <TrustCard
          icon={<ShieldCheck className="h-5 w-5" />}
          title="Verified marketplace"
          description="Buyer profiles and transaction records are stored with your market activity."
        />

        <TrustCard
          icon={<IndianRupee className="h-5 w-5" />}
          title="Better price discovery"
          description="Compare multiple offers instead of depending on a single buyer."
        />

        <TrustCard
          icon={<Truck className="h-5 w-5" />}
          title="Track the sale"
          description="Follow payment and delivery status after accepting an offer."
        />
      </section>

      {/* ===================================================
          CREATE LOT MODAL
      =================================================== */}

      {showCreate && (
        <CreateSaleLotModal
          crop={crop}
          quantity={quantity}
          unit={unit}
          grade={grade}
          expectedPrice={expectedPrice}
          description={description}
          creating={creating}
          setCrop={setCrop}
          setQuantity={setQuantity}
          setUnit={setUnit}
          setGrade={setGrade}
          setExpectedPrice={setExpectedPrice}
          setDescription={setDescription}
          onClose={() => setShowCreate(false)}
          onCreate={createSaleLot}
        />
      )}

      {/* ===================================================
          LOT DETAILS MODAL
      =================================================== */}

      {selectedLot && (
        <LotDetailsModal
          lot={selectedLot}
          offers={offers.filter(
            (offer) =>
              offer.sale_lot_id ===
              selectedLot.id,
          )}
          onClose={() => setSelectedLot(null)}
          onAccept={acceptOffer}
          processingOffer={processingOffer}
        />
      )}
    </main>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
          {icon}
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            {label}
          </p>

          <p className="text-2xl font-bold">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   TAB BUTTON
========================================================= */

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}

/* =========================================================
   SALE LOT CARD
========================================================= */

function SaleLotCard({
  lot,
  offerCount,
  bestOffer,
  onView,
}: {
  lot: SaleLot;
  offerCount: number;
  bestOffer?: BuyerOffer;
  onView: () => void;
}) {
  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                lot.status,
              )}`}
            >
              {statusLabel(lot.status)}
            </span>

            {lot.grade && (
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                {lot.grade}
              </span>
            )}
          </div>

          <h3 className="mt-4 text-2xl font-bold">
            {lot.crop_name}
          </h3>

          <p className="mt-1 text-muted-foreground">
            {lot.quantity} {lot.unit}
          </p>
        </div>

        <div className="rounded-xl bg-primary/10 p-3 text-primary">
          <Package className="h-6 w-6" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <InfoBox
          label="Expected price"
          value={
            lot.expected_price
              ? `${money(lot.expected_price)}/q`
              : "Not set"
          }
        />

        <InfoBox
          label="Offers"
          value={`${offerCount}`}
        />

        <InfoBox
          label="Best offer"
          value={
            bestOffer
              ? `${money(bestOffer.offered_price)}/q`
              : "Waiting"
          }
        />

        <InfoBox
          label="Published"
          value={formatDate(lot.created_at)}
        />
      </div>

      {(lot.village || lot.district) && (
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />

          {[lot.village, lot.district, lot.state]
            .filter(Boolean)
            .join(", ")}
        </div>
      )}

      <Button
        className="mt-6 w-full"
        onClick={onView}
      >
        View Lot & Offers
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}

/* =========================================================
   OFFER CARD
========================================================= */

function OfferCard({
  offer,
  lot,
  processing,
  onAccept,
}: {
  offer: BuyerOffer;
  lot: SaleLot;
  processing: boolean;
  onAccept: () => void;
}) {
  return (
    <div className="rounded-3xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UserRound className="h-6 w-6" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold">
                {offer.buyer?.name ||
                  "Buyer"}
              </h3>

              {offer.buyer?.is_verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                  <ShieldCheck className="h-3 w-3" />
                  Verified
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              Offer for {lot.crop_name} •{" "}
              {offer.quantity} {lot.unit}
            </p>

            {offer.buyer?.rating ? (
              <p className="mt-1 text-sm">
                ⭐ {offer.buyer.rating}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:min-w-[360px]">
          <InfoBox
            label="Offered price"
            value={`${money(
              offer.offered_price,
            )}/q`}
          />

          <InfoBox
            label="Quantity"
            value={`${offer.quantity} ${lot.unit}`}
          />
        </div>
      </div>

      {offer.message && (
        <div className="mt-5 rounded-xl bg-muted/50 p-4 text-sm">
          <span className="font-semibold">
            Buyer message:
          </span>{" "}
          {offer.message}
        </div>
      )}

      <div className="mt-5 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted-foreground">
          Received {formatDate(offer.created_at)}
        </div>

        <div className="flex gap-2">
          {offer.status === "pending" ? (
            <Button
              onClick={onAccept}
              disabled={processing}
            >
              {processing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Accept Offer
                </>
              )}
            </Button>
          ) : (
            <span
              className={`rounded-full px-3 py-2 text-sm font-semibold ${
                offer.status === "accepted"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {offer.status}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   CREATE SALE LOT MODAL
========================================================= */

function CreateSaleLotModal({
  crop,
  quantity,
  unit,
  grade,
  expectedPrice,
  description,
  creating,
  setCrop,
  setQuantity,
  setUnit,
  setGrade,
  setExpectedPrice,
  setDescription,
  onClose,
  onCreate,
}: {
  crop: string;
  quantity: string;
  unit: string;
  grade: string;
  expectedPrice: string;
  description: string;
  creating: boolean;
  setCrop: (value: string) => void;
  setQuantity: (value: string) => void;
  setUnit: (value: string) => void;
  setGrade: (value: string) => void;
  setExpectedPrice: (value: string) => void;
  setDescription: (value: string) => void;
  onClose: () => void;
  onCreate: () => void;
}) {
  return (
    <ModalOverlay>
      <div className="w-full max-w-2xl rounded-3xl bg-card p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold tracking-wider text-primary">
              SELL YOUR CROP
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Create Sale Lot
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Buyers will be able to discover this lot
              and submit offers.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Crop</Label>
            <Input
              value={crop}
              onChange={(e) =>
                setCrop(e.target.value)
              }
              placeholder="Tomato"
            />
          </div>

          <div className="space-y-2">
            <Label>Quantity</Label>

            <div className="flex gap-2">
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) =>
                  setQuantity(e.target.value)
                }
              />

              <Select
                value={unit}
                onValueChange={setUnit}
              >
                <SelectTrigger className="w-[110px]">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="kg">
                    kg
                  </SelectItem>
                  <SelectItem value="quintal">
                    Quintal
                  </SelectItem>
                  <SelectItem value="tonne">
                    Tonne
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Quality Grade</Label>

            <Select
              value={grade}
              onValueChange={setGrade}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Grade A">
                  Grade A
                </SelectItem>
                <SelectItem value="Grade B">
                  Grade B
                </SelectItem>
                <SelectItem value="Grade C">
                  Grade C
                </SelectItem>
                <SelectItem value="Mixed">
                  Mixed
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>
              Expected Price (₹ / quintal)
            </Label>

            <Input
              type="number"
              min="1"
              value={expectedPrice}
              onChange={(e) =>
                setExpectedPrice(e.target.value)
              }
              placeholder="3000"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label>
              Additional information
            </Label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Mention harvest date, quality, packing, pickup requirements, etc."
              className="min-h-[100px] w-full rounded-xl border bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-primary/5 p-4 text-sm">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

            <p className="text-muted-foreground">
              Your sale lot will be stored securely in
              Supabase and can be matched with buyers
              looking for the same crop and quantity.
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={creating}
          >
            Cancel
          </Button>

          <Button
            onClick={onCreate}
            disabled={creating}
          >
            {creating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Package className="mr-2 h-4 w-4" />
                Publish Sale Lot
              </>
            )}
          </Button>
        </div>
      </div>
    </ModalOverlay>
  );
}

/* =========================================================
   LOT DETAILS MODAL
========================================================= */

function LotDetailsModal({
  lot,
  offers,
  onClose,
  onAccept,
  processingOffer,
}: {
  lot: SaleLot;
  offers: BuyerOffer[];
  onClose: () => void;
  onAccept: (offer: BuyerOffer) => void;
  processingOffer: string | null;
}) {
  const pendingOffers = offers
    .filter((offer) => offer.status === "pending")
    .sort(
      (a, b) =>
        b.offered_price -
        a.offered_price,
    );

  return (
    <ModalOverlay>
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-card p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                lot.status,
              )}`}
            >
              {statusLabel(lot.status)}
            </span>

            <h2 className="mt-4 text-3xl font-bold">
              {lot.crop_name}
            </h2>

            <p className="mt-1 text-muted-foreground">
              {lot.quantity} {lot.unit} •{" "}
              {lot.grade || "Quality not specified"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <InfoBox
            label="Expected"
            value={
              lot.expected_price
                ? `${money(
                    lot.expected_price,
                  )}/q`
                : "—"
            }
          />

          <InfoBox
            label="Quantity"
            value={`${lot.quantity} ${lot.unit}`}
          />

          <InfoBox
            label="Grade"
            value={lot.grade || "—"}
          />

          <InfoBox
            label="Offers"
            value={`${offers.length}`}
          />
        </div>

        {lot.description && (
          <div className="mt-5 rounded-2xl bg-muted/50 p-4 text-sm">
            {lot.description}
          </div>
        )}

        <div className="mt-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold tracking-wider text-primary">
                BUYER OFFERS
              </p>

              <h3 className="mt-1 text-xl font-semibold">
                Compare and choose
              </h3>
            </div>

            <span className="rounded-full bg-muted px-3 py-1 text-sm">
              {pendingOffers.length} pending
            </span>
          </div>

          {pendingOffers.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-dashed p-8 text-center">
              <Clock3 className="mx-auto h-8 w-8 text-muted-foreground" />

              <p className="mt-3 font-semibold">
                No pending offers
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Buyers can submit offers once they
                discover your lot.
              </p>
            </div>
          ) : (
            <div className="mt-5 space-y-3">
              {pendingOffers.map((offer, index) => (
                <div
                  key={offer.id}
                  className={`rounded-2xl border p-4 ${
                    index === 0
                      ? "border-primary/40 bg-primary/5"
                      : ""
                  }`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">
                          {offer.buyer?.name ||
                            "Buyer"}
                        </p>

                        {offer.buyer
                          ?.is_verified && (
                          <ShieldCheck className="h-4 w-4 text-primary" />
                        )}
                      </div>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {offer.quantity}{" "}
                        {lot.unit} •{" "}
                        {offer.buyer?.rating
                          ? `⭐ ${offer.buyer.rating}`
                          : "Rating unavailable"}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xl font-bold">
                          {money(
                            offer.offered_price,
                          )}
                          <span className="text-sm font-normal text-muted-foreground">
                            /q
                          </span>
                        </p>

                        {lot.expected_price &&
                          offer.offered_price >=
                            lot.expected_price && (
                            <p className="text-xs font-semibold text-emerald-600">
                              Meets expected price
                            </p>
                          )}
                      </div>

                      <Button
                        onClick={() =>
                          onAccept(offer)
                        }
                        disabled={
                          processingOffer ===
                          offer.id
                        }
                      >
                        {processingOffer ===
                        offer.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Accept"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button
          variant="outline"
          className="mt-7 w-full"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </ModalOverlay>
  );
}

/* =========================================================
   TRANSACTION TRACKER
========================================================= */

function TransactionTracker({
  transaction,
}: {
  transaction: MarketTransaction;
}) {
  const status = transaction.transaction_status;

  const stages = [
    {
      label: "Offer Accepted",
      done: true,
    },
    {
      label: "Payment",
      done:
        status === "paid" ||
        status === "delivery_pending" ||
        status === "delivered" ||
        status === "completed",
    },
    {
      label: "Delivery",
      done:
        status === "delivered" ||
        status === "completed",
    },
    {
      label: "Completed",
      done: status === "completed",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-4">
      {stages.map((stage, index) => (
        <div
          key={stage.label}
          className="relative"
        >
          <div
            className={`flex items-center gap-3 rounded-2xl border p-4 ${
              stage.done
                ? "border-primary/30 bg-primary/5"
                : ""
            }`}
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                stage.done
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {stage.done ? (
                <Check className="h-4 w-4" />
              ) : (
                <Clock3 className="h-4 w-4" />
              )}
            </div>

            <div>
              <p className="text-sm font-semibold">
                {stage.label}
              </p>

              <p className="text-xs text-muted-foreground">
                {stage.done
                  ? "Completed"
                  : "Pending"}
              </p>
            </div>
          </div>

          {index < stages.length - 1 && (
            <ChevronRight className="absolute -right-3 top-7 hidden h-5 w-5 text-muted-foreground sm:block" />
          )}
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function InfoBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-muted/60 p-3">
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 font-semibold">
        {value}
      </p>
    </div>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border p-4">
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 font-semibold capitalize">
        {value}
      </p>
    </div>
  );
}

function TrustCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function EmptyState({
  title,
  description,
  buttonText,
  onClick,
}: {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}) {
  return (
    <div className="rounded-3xl border border-dashed bg-card p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Package className="h-7 w-7" />
      </div>

      <h3 className="mt-5 text-xl font-semibold">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>

      <Button
        className="mt-6"
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </div>
  );
}

function ModalOverlay({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      {children}
    </div>
  );
}