import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Leaf,
  Plus,
  Search,
  MapPin,
  Loader2,
  ShoppingCart,
  Tag,
  X,
  CheckCircle,
  Package,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/residues")({
  component: CropResidues,
});

/*
 * IMPORTANT:
 * These fields match the crop_residues table in your Supabase database.
 */
type CropResidue = {
  id: string;
  owner_id: string;
  residue_type: string | null;
  quantity: number | null;
  unit: string | null;
  price: number | null;
  description: string | null;
  state: string | null;
  district: string | null;
  village: string | null;
  image_url: string | null;
  created_at: string;
};

type SellForm = {
  crop_name: string;
  residue_type: string;
  quantity: string;
  unit: string;
  price: string;
  location: string;
  description: string;
};

type BuyForm = {
  quantity: string;
};

const EMPTY_SELL_FORM: SellForm = {
  crop_name: "",
  residue_type: "",
  quantity: "",
  unit: "kg",
  price: "",
  location: "",
  description: "",
};

function CropResidues() {
  const { user } = useAuth();

  const [residues, setResidues] = useState<CropResidue[]>([]);
  const [filteredResidues, setFilteredResidues] = useState<CropResidue[]>(
    [],
  );

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [buying, setBuying] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showSellForm, setShowSellForm] = useState(false);

  const [selectedResidue, setSelectedResidue] =
    useState<CropResidue | null>(null);

  const [sellForm, setSellForm] =
    useState<SellForm>(EMPTY_SELL_FORM);

  const [buyForm, setBuyForm] = useState<BuyForm>({
    quantity: "",
  });

  /*
   * Load crop residue listings
   */
  useEffect(() => {
    void loadResidues();
  }, []);

  /*
   * Search filtering
   */
  useEffect(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      setFilteredResidues(residues);
      return;
    }

    const filtered = residues.filter((item) => {
      const searchableText = [
        item.residue_type,
        item.description,
        item.state,
        item.district,
        item.village,
        item.unit,
        String(item.price ?? ""),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });

    setFilteredResidues(filtered);
  }, [search, residues]);

  /*
   * LOAD RESIDUES
   *
   * We use `any` here because your local generated Supabase
   * types are currently out of sync with the actual database.
   *
   * This does NOT change your database.
   */
  async function loadResidues() {
    setLoading(true);
    setError("");

    try {
      const residuesTable = (
        supabase as any
      ).from("crop_residues");

      const { data, error: loadError } = await residuesTable
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (loadError) {
        console.error(
          "Crop residue loading error:",
          loadError,
        );

        setError(
          loadError.message ||
            "Unable to load crop residues.",
        );

        setResidues([]);
        setFilteredResidues([]);
        return;
      }

      /*
       * Explicitly convert database rows into our local type.
       */
      const items: CropResidue[] = (data ?? []).map(
        (row: any) => ({
          id: String(row.id),
          owner_id: String(row.owner_id),
          residue_type:
            row.residue_type ?? null,
          quantity:
            row.quantity != null
              ? Number(row.quantity)
              : null,
          unit: row.unit ?? null,
          price:
            row.price != null
              ? Number(row.price)
              : null,
          description:
            row.description ?? null,
          state: row.state ?? null,
          district:
            row.district ?? null,
          village:
            row.village ?? null,
          image_url:
            row.image_url ?? null,
          created_at:
            String(row.created_at ?? ""),
        }),
      );

      setResidues(items);
      setFilteredResidues(items);
    } catch (err) {
      console.error(
        "Unexpected crop residue error:",
        err,
      );

      setError(
        "Something went wrong while loading crop residues.",
      );

      setResidues([]);
      setFilteredResidues([]);
    } finally {
      setLoading(false);
    }
  }

  /*
   * SELL FORM
   */
  function updateSellField(
    field: keyof SellForm,
    value: string,
  ) {
    setSellForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function openSellForm() {
    setError("");
    setSuccess("");

    if (!user) {
      setError(
        "Please sign in before listing crop residue.",
      );
      return;
    }

    setSellForm({
      ...EMPTY_SELL_FORM,
    });

    setShowSellForm(true);
  }

  function closeSellForm() {
    if (saving) {
      return;
    }

    setShowSellForm(false);

    setSellForm({
      ...EMPTY_SELL_FORM,
    });
  }

  /*
   * SELL / LIST RESIDUE
   */
  async function handleSellResidue(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!user) {
      setError(
        "Please sign in before listing crop residue.",
      );
      return;
    }

    const cropName =
      sellForm.crop_name.trim();

    const residueType =
      sellForm.residue_type.trim();

    const quantity =
      Number(sellForm.quantity);

    const price =
      Number(sellForm.price);

    const location =
      sellForm.location.trim();

    const description =
      sellForm.description.trim();

    /*
     * VALIDATION
     */
    if (!cropName) {
      setError(
        "Please enter the crop name.",
      );
      return;
    }

    if (!residueType) {
      setError(
        "Please enter the residue type.",
      );
      return;
    }

    if (
      !sellForm.quantity.trim() ||
      !Number.isFinite(quantity) ||
      quantity <= 0
    ) {
      setError(
        "Please enter a valid quantity.",
      );
      return;
    }

    if (
      !sellForm.price.trim() ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      setError(
        "Please enter a valid price.",
      );
      return;
    }

    if (!location) {
      setError(
        "Please enter the location.",
      );
      return;
    }

    setSaving(true);

    try {
      /*
       * IMPORTANT DATABASE MAPPING
       *
       * Your crop_residues table does NOT contain:
       * crop_name
       * location
       *
       * Therefore:
       *
       * crop_name + residue_type
       * are stored together in residue_type.
       *
       * location is stored in village.
       */

      const residuesTable = (
        supabase as any
      ).from("crop_residues");

      const { error: insertError } =
        await residuesTable.insert({
          owner_id: user.id,

          residue_type:
            `${cropName} - ${residueType}`,

          quantity,

          unit:
            sellForm.unit || "kg",

          price,

          village: location,

          description:
            description || null,
        });

      if (insertError) {
        console.error(
          "Crop residue insert error:",
          insertError,
        );

        setError(
          insertError.message ||
            "Unable to create crop residue listing.",
        );

        return;
      }

      setSuccess(
        "Your crop residue has been listed successfully!",
      );

      setShowSellForm(false);

      setSellForm({
        ...EMPTY_SELL_FORM,
      });

      await loadResidues();
    } catch (err) {
      console.error(
        "Sell residue error:",
        err,
      );

      setError(
        "Something went wrong while creating the listing.",
      );
    } finally {
      setSaving(false);
    }
  }

  /*
   * BUY FORM
   */
  function openBuyForm(
    residue: CropResidue,
  ) {
    setError("");
    setSuccess("");

    if (!user) {
      setError(
        "Please sign in before buying crop residue.",
      );
      return;
    }

    if (residue.owner_id === user.id) {
      setError(
        "You cannot buy your own crop residue listing.",
      );
      return;
    }

    setSelectedResidue(residue);

    setBuyForm({
      quantity: String(
        residue.quantity ?? 1,
      ),
    });
  }

  function closeBuyForm() {
    if (buying) {
      return;
    }

    setSelectedResidue(null);

    setBuyForm({
      quantity: "",
    });
  }

  /*
   * BUY / ORDER RESIDUE
   */
  async function handleBuyResidue(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!user) {
      setError(
        "Please sign in before buying.",
      );
      return;
    }

    if (!selectedResidue) {
      setError(
        "Please select a residue first.",
      );
      return;
    }

    const quantity =
      Number(buyForm.quantity);

    if (
      !buyForm.quantity.trim() ||
      !Number.isFinite(quantity) ||
      quantity <= 0
    ) {
      setError(
        "Please enter a valid quantity.",
      );
      return;
    }

    const availableQuantity =
      Number(
        selectedResidue.quantity ?? 0,
      );

    if (
      availableQuantity > 0 &&
      quantity > availableQuantity
    ) {
      setError(
        `Only ${availableQuantity} ${
          selectedResidue.unit ?? ""
        } is available.`,
      );
      return;
    }

    const pricePerUnit =
      Number(
        selectedResidue.price ?? 0,
      );

    const totalPrice =
      quantity * pricePerUnit;

    setBuying(true);

    try {
      /*
       * Your generated Supabase TypeScript types
       * currently don't contain crop_residue_orders.
       *
       * The table does exist in Supabase, so we use
       * the runtime client directly.
       */

      const ordersTable = (
        supabase as any
      ).from(
        "crop_residue_orders",
      );

      const { error: orderError } =
        await ordersTable.insert({
          residue_id:
            selectedResidue.id,

          buyer_id:
            user.id,

          quantity,

          unit:
            selectedResidue.unit ??
            "kg",

          total_price:
            totalPrice,

          status: "pending",
        });

      if (orderError) {
        console.error(
          "Crop residue order error:",
          orderError,
        );

        setError(
          orderError.message ||
            "Unable to place the order.",
        );

        return;
      }

      setSuccess(
        "Purchase request sent successfully!",
      );

      closeBuyForm();
    } catch (err) {
      console.error(
        "Buy residue error:",
        err,
      );

      setError(
        "Something went wrong while placing the order.",
      );
    } finally {
      setBuying(false);
    }
  }

  /*
   * TOTAL PRICE
   */
  function getTotalPrice(): number {
    if (!selectedResidue) {
      return 0;
    }

    const quantity =
      Number(buyForm.quantity);

    if (!Number.isFinite(quantity)) {
      return 0;
    }

    return (
      quantity *
      Number(
        selectedResidue.price ?? 0,
      )
    );
  }

  /*
   * DISPLAY LOCATION
   */
  function getLocation(
    residue: CropResidue,
  ): string {
    return [
      residue.village,
      residue.district,
      residue.state,
    ]
      .filter(Boolean)
      .join(", ");
  }

  /*
   * DISPLAY CROP NAME
   *
   * We store:
   * "Wheat - Wheat Straw"
   *
   * in residue_type.
   */
  function getCropName(
    residue: CropResidue,
  ): string {
    const value =
      residue.residue_type?.trim();

    if (!value) {
      return "Crop Residue";
    }

    const separator =
      value.indexOf(" - ");

    if (separator > 0) {
      return value
        .slice(0, separator)
        .trim();
    }

    return value;
  }

  /*
   * DISPLAY RESIDUE TYPE
   */
  function getResidueType(
    residue: CropResidue,
  ): string {
    const value =
      residue.residue_type?.trim();

    if (!value) {
      return "";
    }

    const separator =
      value.indexOf(" - ");

    if (separator > 0) {
      return value
        .slice(separator + 3)
        .trim();
    }

    return value;
  }

  return (
    <div className="min-h-screen bg-[#faf9f1] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}

        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Leaf className="h-6 w-6 text-green-700" />
              </div>

              <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                Crop Residues
              </h1>

            </div>

            <p className="text-base text-slate-600 sm:text-lg">
              Buy and sell useful agricultural
              crop residues around you.
            </p>
          </div>

          {/* BUY / SELL BUTTONS */}

          <div className="flex flex-wrap gap-3">

            <Button
              type="button"
              variant="outline"
              className="border-green-700 text-green-700 hover:bg-green-50"
              onClick={() => {
                setError("");
                setSuccess("");

                if (!user) {
                  setError(
                    "Please sign in before buying crop residue.",
                  );
                } else if (
                  filteredResidues.length === 0
                ) {
                  setSuccess(
                    "No residue listings are currently available.",
                  );
                }
              }}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Buy Residue
            </Button>

            <Button
              type="button"
              className="bg-green-700 hover:bg-green-800"
              onClick={openSellForm}
            >
              <Plus className="mr-2 h-5 w-5" />
              Sell Residue
            </Button>

          </div>
        </div>

        {/* ========================= */}
        {/* SUCCESS */}
        {/* ========================= */}

        {success && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">

            <CheckCircle className="h-5 w-5 shrink-0" />

            <span>{success}</span>

          </div>
        )}

        {/* ========================= */}
        {/* ERROR */}
        {/* ========================= */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">

            <div className="flex items-start justify-between gap-3">

              <span>{error}</span>

              <button
                type="button"
                onClick={() =>
                  setError("")
                }
                className="text-red-600 hover:text-red-900"
              >
                <X className="h-5 w-5" />
              </button>

            </div>
          </div>
        )}

        {/* ========================= */}
        {/* SEARCH */}
        {/* ========================= */}

        <div className="mb-8 rounded-2xl border bg-white p-5 shadow-sm">

          <div className="relative">

            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

            <Input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Search wheat straw, rice husk, sugarcane residue..."
              className="h-14 pl-12 text-base sm:text-lg"
            />

          </div>
        </div>

        {/* ========================= */}
        {/* LOADING */}
        {/* ========================= */}

        {loading && (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border bg-white">

            <div className="flex items-center gap-3 text-slate-600">

              <Loader2 className="h-6 w-6 animate-spin" />

              Loading crop residues...

            </div>

          </div>
        )}

        {/* ========================= */}
        {/* DATABASE ERROR */}
        {/* ========================= */}

        {!loading &&
          error &&
          residues.length === 0 && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

              <h2 className="mb-2 text-xl font-semibold text-red-800">
                Could not load crop residues
              </h2>

              <p className="mb-5 text-red-700">
                {error}
              </p>

              <Button
                type="button"
                onClick={() =>
                  void loadResidues()
                }
                className="bg-green-700 hover:bg-green-800"
              >
                Try Again
              </Button>

            </div>
          )}

        {/* ========================= */}
        {/* EMPTY */}
        {/* ========================= */}

        {!loading &&
          !error &&
          filteredResidues.length === 0 && (
            <div className="rounded-2xl border bg-white p-16 text-center shadow-sm">

              <Leaf className="mx-auto mb-5 h-14 w-14 text-green-700" />

              <h2 className="mb-2 text-2xl font-semibold text-slate-900">

                {search
                  ? "No crop residues found"
                  : "No crop residues listed yet"}

              </h2>

              <p className="mb-6 text-slate-600">

                {search
                  ? "Try another search term."
                  : "Be the first farmer to sell crop residue."}

              </p>

              {!search && (
                <Button
                  type="button"
                  onClick={openSellForm}
                  className="bg-green-700 hover:bg-green-800"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Sell Crop Residue
                </Button>
              )}

            </div>
          )}

        {/* ========================= */}
        {/* RESULTS */}
        {/* ========================= */}

        {!loading &&
          filteredResidues.length > 0 && (
            <>
              <div className="mb-5">

                <p className="text-lg text-slate-600">

                  {filteredResidues.length} residue
                  {filteredResidues.length !== 1
                    ? "s"
                    : ""}{" "}
                  found

                </p>

              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                {filteredResidues.map(
                  (residue) => {

                    const isOwner =
                      user?.id ===
                      residue.owner_id;

                    const location =
                      getLocation(
                        residue,
                      );

                    const cropName =
                      getCropName(
                        residue,
                      );

                    const residueType =
                      getResidueType(
                        residue,
                      );

                    return (
                      <div
                        key={residue.id}
                        className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                      >

                        {/* IMAGE */}

                        {residue.image_url ? (
                          <div className="h-44 overflow-hidden bg-green-50">

                            <img
                              src={
                                residue.image_url
                              }
                              alt={
                                cropName
                              }
                              className="h-full w-full object-cover"
                            />

                          </div>
                        ) : (
                          <div className="flex h-44 items-center justify-center bg-green-50">

                            <Leaf className="h-20 w-20 text-green-700" />

                          </div>
                        )}

                        <div className="p-6">

                          {/* TITLE */}

                          <div className="mb-3 flex items-start justify-between gap-3">

                            <div>

                              <h3 className="text-xl font-semibold text-slate-900">
                                {cropName}
                              </h3>

                              {residueType && (
                                <p className="mt-1 text-sm text-slate-500">
                                  {residueType}
                                </p>
                              )}

                            </div>

                            {residue.price != null && (
                              <span className="whitespace-nowrap rounded-lg bg-green-50 px-3 py-1 font-semibold text-green-700">

                                ₹
                                {residue.price}

                                {residue.unit
                                  ? `/${residue.unit}`
                                  : ""}

                              </span>
                            )}

                          </div>

                          {/* QUANTITY */}

                          {residue.quantity !=
                            null && (
                            <div className="mb-3 flex items-center gap-2 text-slate-700">

                              <Package className="h-4 w-4 text-green-700" />

                              <span>

                                <strong>
                                  Available:
                                </strong>{" "}

                                {
                                  residue.quantity
                                }{" "}

                                {
                                  residue.unit ??
                                  ""
                                }

                              </span>

                            </div>
                          )}

                          {/* LOCATION */}

                          {location && (
                            <div className="mb-3 flex items-center gap-2 text-slate-600">

                              <MapPin className="h-4 w-4 shrink-0 text-green-700" />

                              <span>
                                {location}
                              </span>

                            </div>
                          )}

                          {/* DESCRIPTION */}

                          {residue.description && (
                            <p className="mb-5 line-clamp-3 text-sm text-slate-600">
                              {
                                residue.description
                              }
                            </p>
                          )}

                          {/* BUY BUTTON */}

                          {isOwner ? (
                            <div className="flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 py-3 text-sm font-medium text-slate-600">

                              <Tag className="h-4 w-4" />

                              Your Listing

                            </div>
                          ) : (
                            <Button
                              type="button"
                              className="w-full bg-green-700 hover:bg-green-800"
                              onClick={() =>
                                openBuyForm(
                                  residue,
                                )
                              }
                            >
                              <ShoppingCart className="mr-2 h-5 w-5" />
                              Buy Residue
                            </Button>
                          )}

                        </div>
                      </div>
                    );
                  },
                )}

              </div>
            </>
          )}

      </div>

      {/* ================================================= */}
      {/* SELL MODAL */}
      {/* ================================================= */}

      {showSellForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            <div className="sticky top-0 flex items-center justify-between border-b bg-white px-6 py-5">

              <div>

                <h2 className="text-2xl font-semibold text-slate-900">
                  Sell Crop Residue
                </h2>

                <p className="text-sm text-slate-500">
                  Add your agricultural residue for buyers.
                </p>

              </div>

              <button
                type="button"
                onClick={closeSellForm}
                className="rounded-full p-2 hover:bg-slate-100"
              >
                <X className="h-6 w-6" />
              </button>

            </div>

            <form
              onSubmit={
                handleSellResidue
              }
              className="space-y-5 p-6"
            >

              {/* CROP NAME */}

              <div>

                <label className="mb-2 block font-medium text-slate-700">
                  Crop Name *
                </label>

                <Input
                  value={
                    sellForm.crop_name
                  }
                  onChange={(event) =>
                    updateSellField(
                      "crop_name",
                      event.target.value,
                    )
                  }
                  placeholder="e.g. Wheat"
                  required
                />

              </div>

              {/* RESIDUE TYPE */}

              <div>

                <label className="mb-2 block font-medium text-slate-700">
                  Residue Type *
                </label>

                <Input
                  value={
                    sellForm.residue_type
                  }
                  onChange={(event) =>
                    updateSellField(
                      "residue_type",
                      event.target.value,
                    )
                  }
                  placeholder="e.g. Wheat Straw"
                  required
                />

              </div>

              {/* QUANTITY + UNIT */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block font-medium text-slate-700">
                    Quantity *
                  </label>

                  <Input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={
                      sellForm.quantity
                    }
                    onChange={(event) =>
                      updateSellField(
                        "quantity",
                        event.target.value,
                      )
                    }
                    placeholder="e.g. 500"
                    required
                  />

                </div>

                <div>

                  <label className="mb-2 block font-medium text-slate-700">
                    Unit *
                  </label>

                  <select
                    value={
                      sellForm.unit
                    }
                    onChange={(event) =>
                      updateSellField(
                        "unit",
                        event.target.value,
                      )
                    }
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >

                    <option value="kg">
                      Kilogram (kg)
                    </option>

                    <option value="quintal">
                      Quintal
                    </option>

                    <option value="ton">
                      Ton
                    </option>

                    <option value="bundle">
                      Bundle
                    </option>

                    <option value="bale">
                      Bale
                    </option>

                  </select>

                </div>

              </div>

              {/* PRICE */}

              <div>

                <label className="mb-2 block font-medium text-slate-700">
                  Price per Unit (₹) *
                </label>

                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={
                    sellForm.price
                  }
                  onChange={(event) =>
                    updateSellField(
                      "price",
                      event.target.value,
                    )
                  }
                  placeholder="e.g. 8"
                  required
                />

              </div>

              {/* LOCATION */}

              <div>

                <label className="mb-2 block font-medium text-slate-700">
                  Location *
                </label>

                <Input
                  value={
                    sellForm.location
                  }
                  onChange={(event) =>
                    updateSellField(
                      "location",
                      event.target.value,
                    )
                  }
                  placeholder="Village / District / State"
                  required
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="mb-2 block font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  value={
                    sellForm.description
                  }
                  onChange={(event) =>
                    updateSellField(
                      "description",
                      event.target.value,
                    )
                  }
                  placeholder="Add details about quality, condition, pickup, etc."
                  className="min-h-[110px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600"
                />

              </div>

              {/* ACTIONS */}

              <div className="flex gap-3 pt-2">

                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={
                    closeSellForm
                  }
                  disabled={saving}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="flex-1 bg-green-700 hover:bg-green-800"
                  disabled={saving}
                >

                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Listing...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-5 w-5" />
                      List Residue
                    </>
                  )}

                </Button>

              </div>

            </form>

          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* BUY MODAL */}
      {/* ================================================= */}

      {selectedResidue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b px-6 py-5">

              <div>

                <h2 className="text-2xl font-semibold text-slate-900">
                  Buy Crop Residue
                </h2>

                <p className="text-sm text-slate-500">
                  Send a purchase request to the seller.
                </p>

              </div>

              <button
                type="button"
                onClick={
                  closeBuyForm
                }
                className="rounded-full p-2 hover:bg-slate-100"
              >
                <X className="h-6 w-6" />
              </button>

            </div>

            <form
              onSubmit={
                handleBuyResidue
              }
              className="space-y-5 p-6"
            >

              {/* PRODUCT */}

              <div className="rounded-xl bg-green-50 p-4">

                <h3 className="text-xl font-semibold text-slate-900">
                  {getCropName(
                    selectedResidue,
                  )}
                </h3>

                {getResidueType(
                  selectedResidue,
                ) && (
                  <p className="text-sm text-slate-600">
                    {getResidueType(
                      selectedResidue,
                    )}
                  </p>
                )}

                <p className="mt-2 font-medium text-green-700">

                  ₹
                  {selectedResidue.price ??
                    0}
                  /
                  {
                    selectedResidue.unit ??
                    "kg"
                  }

                </p>

                {selectedResidue.quantity !=
                  null && (
                  <p className="mt-1 text-sm text-slate-600">

                    Available:{" "}

                    {
                      selectedResidue.quantity
                    }{" "}

                    {
                      selectedResidue.unit ??
                      ""
                    }

                  </p>
                )}

              </div>

              {/* QUANTITY */}

              <div>

                <label className="mb-2 block font-medium text-slate-700">
                  Quantity *
                </label>

                <Input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={
                    buyForm.quantity
                  }
                  onChange={(event) =>
                    setBuyForm({
                      quantity:
                        event.target.value,
                    })
                  }
                  required
                />

              </div>

              {/* TOTAL */}

              <div className="flex items-center justify-between rounded-xl border bg-slate-50 p-4">

                <span className="font-medium text-slate-700">
                  Estimated Total
                </span>

                <span className="text-2xl font-bold text-green-700">

                  ₹
                  {getTotalPrice().toFixed(
                    2,
                  )}

                </span>

              </div>

              {/* ACTIONS */}

              <div className="flex gap-3">

                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={
                    closeBuyForm
                  }
                  disabled={buying}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="flex-1 bg-green-700 hover:bg-green-800"
                  disabled={buying}
                >

                  {buying ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Confirm Buy
                    </>
                  )}

                </Button>

              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}