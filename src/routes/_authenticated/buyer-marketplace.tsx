import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";

import {
  ArrowRight,
  CheckCircle2,
  IndianRupee,
  Loader2,
  MapPin,
  Package,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/*
|--------------------------------------------------------------------------
| SUPABASE COMPATIBILITY
|--------------------------------------------------------------------------
| The new marketplace tables may not yet exist in the generated
| Supabase TypeScript type definition.
|
| The database itself is still used normally.
|--------------------------------------------------------------------------
*/

const db = supabase as any;

/*
|--------------------------------------------------------------------------
| ROUTE
|--------------------------------------------------------------------------
*/

export const Route = createFileRoute(
  "/_authenticated/buyer-marketplace",
)({
  component: BuyerMarketplace,
});

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

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
  status: string;
  created_at: string;
}

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

function formatMoney(
  value: number | null | undefined,
): string {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(Number(value))
  ) {
    return "—";
  }

  return `₹${Number(value).toLocaleString(
    "en-IN",
  )}`;
}

function formatDate(
  value: string,
): string {
  try {
    return new Date(value).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      },
    );
  } catch {
    return "Recently";
  }
}

/*
|--------------------------------------------------------------------------
| MAIN PAGE
|--------------------------------------------------------------------------
*/

function BuyerMarketplace() {
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");

  const [district, setDistrict] =
    useState("");

  const [selectedLot, setSelectedLot] =
    useState<SaleLot | null>(null);

  const [offerPrice, setOfferPrice] =
    useState("");

  const [offerQuantity, setOfferQuantity] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [sending, setSending] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | LOAD ACTIVE SALE LOTS
  |--------------------------------------------------------------------------
  */

  const lotsQuery = useQuery({
    queryKey: [
      "buyer-marketplace-sale-lots",
    ],

    queryFn: async (): Promise<SaleLot[]> => {
      const { data, error } = await db
        .from("sale_lots")
        .select("*")
        .in("status", [
          "active",
          "offer_received",
        ])
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      return (data ?? []) as SaleLot[];
    },
  });

  const lots =
    lotsQuery.data ?? [];

  /*
  |--------------------------------------------------------------------------
  | FILTER LISTINGS
  |--------------------------------------------------------------------------
  */

  const filteredLots = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    const districtValue =
      district.trim().toLowerCase();

    return lots.filter((lot) => {
      const crop =
        lot.crop_name
          ?.toLowerCase() ?? "";

      const grade =
        lot.grade
          ?.toLowerCase() ?? "";

      const lotDistrict =
        lot.district
          ?.toLowerCase() ?? "";

      const village =
        lot.village
          ?.toLowerCase() ?? "";

      const matchesSearch =
        !searchValue ||
        crop.includes(searchValue) ||
        grade.includes(searchValue) ||
        lotDistrict.includes(searchValue) ||
        village.includes(searchValue);

      const matchesDistrict =
        !districtValue ||
        lotDistrict.includes(
          districtValue,
        );

      return (
        matchesSearch &&
        matchesDistrict
      );
    });
  }, [
    lots,
    search,
    district,
  ]);

  /*
  |--------------------------------------------------------------------------
  | OPEN OFFER MODAL
  |--------------------------------------------------------------------------
  */

  function openOffer(
    lot: SaleLot,
  ) {
    setSelectedLot(lot);

    setOfferPrice(
      lot.expected_price
        ? String(lot.expected_price)
        : "",
    );

    setOfferQuantity(
      String(lot.quantity),
    );

    setMessage("");

    setSuccess(false);
  }

  /*
  |--------------------------------------------------------------------------
  | CLOSE OFFER MODAL
  |--------------------------------------------------------------------------
  */

  function closeOffer() {
    setSelectedLot(null);

    setOfferPrice("");

    setOfferQuantity("");

    setMessage("");

    setSuccess(false);
  }

  /*
  |--------------------------------------------------------------------------
  | SUBMIT BUYER OFFER
  |--------------------------------------------------------------------------
  */

  async function submitOffer() {
    if (!user?.id) {
      alert(
        "Please log in before making an offer.",
      );

      return;
    }

    if (!selectedLot) {
      return;
    }

    if (
      selectedLot.farmer_id ===
      user.id
    ) {
      alert(
        "You cannot make an offer on your own sale lot.",
      );

      return;
    }

    const price =
      Number(offerPrice);

    const quantity =
      Number(offerQuantity);

    /*
    |--------------------------------------------------------------------------
    | VALIDATION
    |--------------------------------------------------------------------------
    */

    if (
      !Number.isFinite(price) ||
      price <= 0
    ) {
      alert(
        "Please enter a valid offer price.",
      );

      return;
    }

    if (
      !Number.isFinite(quantity) ||
      quantity <= 0
    ) {
      alert(
        "Please enter a valid quantity.",
      );

      return;
    }

    if (
      quantity >
      Number(selectedLot.quantity)
    ) {
      alert(
        `Only ${selectedLot.quantity} ${selectedLot.unit} is available.`,
      );

      return;
    }

    setSending(true);

    try {
      /*
      |--------------------------------------------------------------------------
      | CHECK EXISTING PENDING OFFER
      |--------------------------------------------------------------------------
      */

      const {
        data: existingOffer,
        error: existingOfferError,
      } = await db
        .from("buyer_offers")
        .select("id")
        .eq(
          "sale_lot_id",
          selectedLot.id,
        )
        .eq(
          "buyer_id",
          user.id,
        )
        .eq(
          "status",
          "pending",
        )
        .maybeSingle();

      if (existingOfferError) {
        throw existingOfferError;
      }

      if (existingOffer) {
        alert(
          "You already have a pending offer for this sale lot.",
        );

        return;
      }

      /*
      |--------------------------------------------------------------------------
      | INSERT REAL BUYER OFFER
      |--------------------------------------------------------------------------
      */

      const {
        error: offerError,
      } = await db
        .from("buyer_offers")
        .insert({
          sale_lot_id:
            selectedLot.id,

          buyer_id:
            user.id,

          offered_price:
            price,

          quantity:
            quantity,

          message:
            message.trim() ||
            null,

          status:
            "pending",
        });

      if (offerError) {
        throw offerError;
      }

      /*
      |--------------------------------------------------------------------------
      | UPDATE SALE LOT STATUS
      |--------------------------------------------------------------------------
      |
      | We intentionally do not update updated_at here because
      | some existing schemas may not have that column.
      |--------------------------------------------------------------------------
      */

      const {
        error: lotUpdateError,
      } = await db
        .from("sale_lots")
        .update({
          status:
            "offer_received",
        })
        .eq(
          "id",
          selectedLot.id,
        )
        .eq(
          "status",
          "active",
        );

      /*
      |--------------------------------------------------------------------------
      | LOT STATUS UPDATE FAILURE SHOULD NOT HIDE A SUCCESSFUL OFFER
      |--------------------------------------------------------------------------
      */

      if (lotUpdateError) {
        console.warn(
          "Sale lot status could not be updated:",
          lotUpdateError,
        );
      }

      /*
      |--------------------------------------------------------------------------
      | NOTIFY FARMER
      |--------------------------------------------------------------------------
      |
      | Notification failure should not undo the offer.
      |--------------------------------------------------------------------------
      */

      try {
        await db
          .from("notifications")
          .insert({
            user_id:
              selectedLot.farmer_id,

            type:
              "new_buyer_offer",

            title:
              "New Buyer Offer",

            message:
              `A buyer offered ${formatMoney(
                price,
              )}/q for ${quantity} ${selectedLot.unit} of ${selectedLot.crop_name}.`,

            is_read:
              false,
          });
      } catch (notificationError) {
        console.warn(
          "Notification could not be created:",
          notificationError,
        );
      }

      /*
      |--------------------------------------------------------------------------
      | REFRESH MARKETPLACE
      |--------------------------------------------------------------------------
      */

      await queryClient.invalidateQueries({
        queryKey: [
          "buyer-marketplace-sale-lots",
        ],
      });

      /*
      |--------------------------------------------------------------------------
      | SUCCESS
      |--------------------------------------------------------------------------
      */

      setSuccess(true);
    } catch (error) {
      console.error(
        "Offer submission error:",
        error,
      );

      alert(
        error instanceof Error
          ? error.message
          : "Unable to submit the offer. Please try again.",
      );
    } finally {
      setSending(false);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (lotsQuery.isLoading) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />

          <span>
            Loading farmer sale lots...
          </span>
        </div>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ERROR
  |--------------------------------------------------------------------------
  */

  if (lotsQuery.error) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <X className="h-7 w-7 text-red-600" />
          </div>

          <h2 className="mt-4 text-xl font-bold text-red-800">
            Unable to load marketplace
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-red-700">
            {lotsQuery.error instanceof
            Error
              ? lotsQuery.error.message
              : "Something went wrong while loading sale lots."}
          </p>

          <Button
            className="mt-6"
            onClick={() =>
              lotsQuery.refetch()
            }
          >
            Try Again
          </Button>
        </div>
      </main>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | PAGE
  |--------------------------------------------------------------------------
  */

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="overflow-hidden rounded-3xl border bg-card shadow-sm">
        <div className="p-6 sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold tracking-wider text-primary">
              <Package className="h-4 w-4" />

              DIRECT FARM MARKETPLACE
            </div>

            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Find Fresh Crops Directly From Farmers
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Discover available farmer lots,
              compare expected prices and
              submit a digital offer directly
              to the farmer.
            </p>
          </div>

          {/* SEARCH */}

          <div className="mt-8 grid gap-3 md:grid-cols-[1fr_280px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value,
                  )
                }
                placeholder="Search tomato, onion, wheat..."
                className="h-12 pl-10"
              />
            </div>

            <Input
              value={district}
              onChange={(event) =>
                setDistrict(
                  event.target.value,
                )
              }
              placeholder="Filter by district"
              className="h-12"
            />
          </div>
        </div>

        {/* STATS */}

        <div className="grid border-t sm:grid-cols-3">
          <MarketStat
            icon={
              <Package className="h-5 w-5" />
            }
            label="Available Lots"
            value={lots.length}
          />

          <MarketStat
            icon={
              <IndianRupee className="h-5 w-5" />
            }
            label="Price Discovery"
            value="Direct"
          />

          <MarketStat
            icon={
              <ShieldCheck className="h-5 w-5" />
            }
            label="Offer System"
            value="Digital"
          />
        </div>
      </section>

      {/* =====================================================
          MARKETPLACE
      ====================================================== */}

      <section className="mt-10">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-primary">
              AVAILABLE SUPPLY
            </p>

            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
              Farmer Sale Lots
            </h2>
          </div>

          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredLots.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">
              {lots.length}
            </span>{" "}
            lots
          </p>
        </div>

        {filteredLots.length ===
        0 ? (
          <EmptyState
            search={search}
            district={district}
            onClear={() => {
              setSearch("");
              setDistrict("");
            }}
          />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredLots.map(
              (lot) => (
                <LotCard
                  key={lot.id}
                  lot={lot}
                  onOffer={() =>
                    openOffer(lot)
                  }
                />
              ),
            )}
          </div>
        )}
      </section>

      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}

      <section className="mt-12">
        <div className="mb-6">
          <p className="text-xs font-bold tracking-[0.2em] text-primary">
            SIMPLE DIGITAL TRADE
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            How Buyer-Seller Matching Works
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <ProcessCard
            number="01"
            icon={
              <Package className="h-5 w-5" />
            }
            title="Discover"
            description="Browse crop lots published directly by farmers."
          />

          <ProcessCard
            number="02"
            icon={
              <IndianRupee className="h-5 w-5" />
            }
            title="Make an Offer"
            description="Enter your price, quantity and requirements digitally."
          />

          <ProcessCard
            number="03"
            icon={
              <CheckCircle2 className="h-5 w-5" />
            }
            title="Trade"
            description="The farmer can accept the offer and continue the transaction."
          />
        </div>
      </section>

      {/* =====================================================
          VALUE CARDS
      ====================================================== */}

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <ValueCard
          icon={
            <IndianRupee className="h-5 w-5" />
          }
          title="Transparent pricing"
          description="Buyers can see the farmer's expected price before negotiating."
        />

        <ValueCard
          icon={
            <ShieldCheck className="h-5 w-5" />
          }
          title="Digital records"
          description="Every offer is linked to a specific crop lot for traceability."
        />

        <ValueCard
          icon={
            <MapPin className="h-5 w-5" />
          }
          title="Local sourcing"
          description="Find nearby farmer supply and reduce unnecessary transaction distance."
        />
      </section>

      {/* =====================================================
          OFFER MODAL
      ====================================================== */}

      {selectedLot && (
        <OfferModal
          lot={selectedLot}
          offerPrice={offerPrice}
          offerQuantity={
            offerQuantity
          }
          message={message}
          sending={sending}
          success={success}
          setOfferPrice={
            setOfferPrice
          }
          setOfferQuantity={
            setOfferQuantity
          }
          setMessage={setMessage}
          onClose={closeOffer}
          onSubmit={
            submitOffer
          }
        />
      )}
    </main>
  );
}

/*
|--------------------------------------------------------------------------
| SALE LOT CARD
|--------------------------------------------------------------------------
*/

function LotCard({
  lot,
  onOffer,
}: {
  lot: SaleLot;
  onOffer: () => void;
}) {
  const location = [
    lot.village,
    lot.district,
    lot.state,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <article className="group rounded-3xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      {/* HEADER */}

      <div className="flex items-start justify-between gap-4">
        <div>
          <span
            className={
              lot.status ===
              "offer_received"
                ? "inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700"
                : "inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
            }
          >
            {lot.status ===
            "offer_received"
              ? "Offer Received"
              : "Available"}
          </span>

          <h3 className="mt-4 text-2xl font-bold">
            {lot.crop_name}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Posted{" "}
            {formatDate(
              lot.created_at,
            )}
          </p>
        </div>

        <div className="rounded-2xl bg-primary/10 p-3 text-primary">
          <Package className="h-6 w-6" />
        </div>
      </div>

      {/* DATA */}

      <div className="mt-6 grid grid-cols-2 gap-3">
        <DataBox
          label="Quantity"
          value={`${lot.quantity} ${lot.unit}`}
        />

        <DataBox
          label="Quality"
          value={
            lot.grade ||
            "Not specified"
          }
        />

        <DataBox
          label="Expected price"
          value={
            lot.expected_price
              ? `${formatMoney(
                  lot.expected_price,
                )}/q`
              : "Negotiable"
          }
        />

        <DataBox
          label="District"
          value={
            lot.district ||
            "Not specified"
          }
        />
      </div>

      {/* DESCRIPTION */}

      {lot.description && (
        <p className="mt-5 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {lot.description}
        </p>
      )}

      {/* LOCATION */}

      {location && (
        <div className="mt-5 flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" />

          <span>
            {location}
          </span>
        </div>
      )}

      {/* BUTTON */}

      <Button
        className="mt-6 w-full"
        onClick={onOffer}
      >
        Make an Offer

        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </article>
  );
}

/*
|--------------------------------------------------------------------------
| OFFER MODAL
|--------------------------------------------------------------------------
*/

function OfferModal({
  lot,
  offerPrice,
  offerQuantity,
  message,
  sending,
  success,
  setOfferPrice,
  setOfferQuantity,
  setMessage,
  onClose,
  onSubmit,
}: {
  lot: SaleLot;
  offerPrice: string;
  offerQuantity: string;
  message: string;
  sending: boolean;
  success: boolean;
  setOfferPrice: (
    value: string,
  ) => void;
  setOfferQuantity: (
    value: string,
  ) => void;
  setMessage: (
    value: string,
  ) => void;
  onClose: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl border bg-card p-6 shadow-2xl sm:p-8">
        {/* HEADER */}

        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold tracking-wide text-primary">
              BUYER OFFER
            </span>

            <h2 className="mt-4 text-2xl font-bold">
              {lot.crop_name}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {lot.quantity}{" "}
              {lot.unit} available
            </p>
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* SUCCESS */}

        {success ? (
          <div className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-emerald-800">
              Offer Submitted Successfully
            </h3>

            <p className="mt-3 text-sm leading-6 text-emerald-700">
              Your offer has been
              recorded and sent to
              the farmer. The farmer
              can now accept or reject
              your offer.
            </p>

            <div className="mt-6 rounded-2xl bg-white/70 p-4 text-left">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-muted-foreground">
                  Offer price
                </span>

                <strong>
                  {formatMoney(
                    Number(
                      offerPrice,
                    ),
                  )}
                  /q
                </strong>
              </div>

              <div className="mt-2 flex justify-between gap-4 text-sm">
                <span className="text-muted-foreground">
                  Quantity
                </span>

                <strong>
                  {offerQuantity}{" "}
                  {lot.unit}
                </strong>
              </div>
            </div>

            <Button
              className="mt-6"
              onClick={onClose}
            >
              Done
            </Button>
          </div>
        ) : (
          <>
            {/* LOT SUMMARY */}

            <div className="mt-7 rounded-2xl border bg-muted/40 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Farmer expected
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    {lot.expected_price
                      ? `${formatMoney(
                          lot.expected_price,
                        )}/q`
                      : "Negotiable"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Available
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    {lot.quantity}{" "}
                    {lot.unit}
                  </p>
                </div>
              </div>
            </div>

            {/* FORM */}

            <div className="mt-7 space-y-5">
              <div className="space-y-2">
                <Label>
                  Your Offer Price
                  <span className="text-muted-foreground">
                    {" "}
                    (₹ / quintal)
                  </span>
                </Label>

                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    type="number"
                    min="1"
                    value={
                      offerPrice
                    }
                    onChange={(event) =>
                      setOfferPrice(
                        event.target
                          .value,
                      )
                    }
                    placeholder="3000"
                    className="h-11 pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>
                  Quantity (
                  {lot.unit})
                </Label>

                <Input
                  type="number"
                  min="1"
                  max={
                    lot.quantity
                  }
                  value={
                    offerQuantity
                  }
                  onChange={(event) =>
                    setOfferQuantity(
                      event.target
                        .value,
                    )
                  }
                  className="h-11"
                />

                <p className="text-xs text-muted-foreground">
                  Maximum available:
                  {" "}
                  {lot.quantity}{" "}
                  {lot.unit}
                </p>
              </div>

              <div className="space-y-2">
                <Label>
                  Message to Farmer
                </Label>

                <textarea
                  value={message}
                  onChange={(event) =>
                    setMessage(
                      event.target
                        .value,
                    )
                  }
                  placeholder="Mention pickup date, payment terms, packaging or other requirements..."
                  className="min-h-[120px] w-full resize-none rounded-xl border bg-background px-3 py-3 text-sm outline-none transition focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            {/* TRUST BOX */}

            <div className="mt-6 rounded-2xl border bg-primary/5 p-4">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                <div>
                  <p className="text-sm font-semibold">
                    Transparent digital offer
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Your price and quantity
                    are recorded against
                    this specific farmer
                    sale lot. The farmer
                    decides whether to
                    accept the offer.
                  </p>
                </div>
              </div>
            </div>

            {/* ACTIONS */}

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={sending}
              >
                Cancel
              </Button>

              <Button
                onClick={onSubmit}
                disabled={sending}
              >
                {sending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                    Sending...
                  </>
                ) : (
                  <>
                    Submit Offer

                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| EMPTY STATE
|--------------------------------------------------------------------------
*/

function EmptyState({
  search,
  district,
  onClear,
}: {
  search: string;
  district: string;
  onClear: () => void;
}) {
  const hasFilter =
    Boolean(
      search.trim() ||
        district.trim(),
    );

  return (
    <div className="rounded-3xl border border-dashed p-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
        <Search className="h-6 w-6 text-muted-foreground" />
      </div>

      <h3 className="mt-5 text-lg font-bold">
        No sale lots found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {hasFilter
          ? "Try changing your crop or district search."
          : "There are currently no active farmer sale lots."}
      </p>

      {hasFilter && (
        <Button
          variant="outline"
          className="mt-5"
          onClick={onClear}
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| MARKET STAT
|--------------------------------------------------------------------------
*/

function MarketStat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center gap-3 border-b p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>

      <div>
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="mt-0.5 font-bold">
          {value}
        </p>
      </div>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| DATA BOX
|--------------------------------------------------------------------------
*/

function DataBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-muted/50 p-3">
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 truncate text-sm font-semibold">
        {value}
      </p>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| PROCESS CARD
|--------------------------------------------------------------------------
*/

function ProcessCard({
  number,
  icon,
  title,
  description,
}: {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>

        <span className="text-2xl font-bold text-muted-foreground/30">
          {number}
        </span>
      </div>

      <h3 className="mt-5 font-semibold">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| VALUE CARD
|--------------------------------------------------------------------------
*/

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
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