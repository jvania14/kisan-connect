import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Leaf, Plus, Search, MapPin, Loader2 } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/residues")({
  component: CropResidues,
});

type CropResidue = {
  id: string;
  owner_id: string;
  crop_name: string;
  residue_type: string;
  quantity: number | null;
  unit: string | null;
  price: number | null;
  location: string | null;
  description: string | null;
  created_at: string;
};

function CropResidues() {
  const { user } = useAuth();

  const [residues, setResidues] = useState<CropResidue[]>([]);
  const [filteredResidues, setFilteredResidues] = useState<CropResidue[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadResidues();
  }, []);

  async function loadResidues() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("crop_residues")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Crop residue error:", error);
      setError(error.message);
      setResidues([]);
      setFilteredResidues([]);
      setLoading(false);
      return;
    }

    const items = (data ?? []) as CropResidue[];

    setResidues(items);
    setFilteredResidues(items);
    setLoading(false);
  }

  useEffect(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      setFilteredResidues(residues);
      return;
    }

    setFilteredResidues(
      residues.filter((item) =>
        [
          item.crop_name,
          item.residue_type,
          item.location,
          item.description,
        ]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query)),
      ),
    );
  }, [search, residues]);

  return (
    <div className="min-h-screen bg-[#faf9f1] px-6 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Leaf className="h-6 w-6 text-green-700" />
              </div>

              <h1 className="text-4xl font-semibold text-slate-900">
                Crop Residues
              </h1>
            </div>

            <p className="text-lg text-slate-600">
              Find and share useful agricultural crop residues around you.
            </p>
          </div>

          <Button
            className="bg-green-700 hover:bg-green-800"
            onClick={() => {
              alert(
                user
                  ? "Listing form can be connected here."
                  : "Please sign in first.",
              );
            }}
          >
            <Plus className="mr-2 h-5 w-5" />
            List Residue
          </Button>
        </div>

        <div className="mb-8 rounded-2xl border bg-white p-5 shadow-sm">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search wheat straw, rice husk, sugarcane residue..."
              className="h-14 pl-12 text-lg"
            />
          </div>
        </div>

        {loading && (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border bg-white">
            <div className="flex items-center gap-3 text-slate-600">
              <Loader2 className="h-6 w-6 animate-spin" />
              Loading crop residues...
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <h2 className="mb-2 text-xl font-semibold text-red-800">
              Could not load crop residues
            </h2>

            <p className="mb-5 text-red-700">{error}</p>

            <Button
              onClick={loadResidues}
              className="bg-green-700 hover:bg-green-800"
            >
              Try Again
            </Button>
          </div>
        )}

        {!loading && !error && filteredResidues.length === 0 && (
          <div className="rounded-2xl border bg-white p-16 text-center shadow-sm">
            <Leaf className="mx-auto mb-5 h-14 w-14 text-green-700" />

            <h2 className="mb-2 text-2xl font-semibold text-slate-900">
              {search
                ? "No crop residues found"
                : "No crop residues listed yet"}
            </h2>

            <p className="text-slate-600">
              {search
                ? "Try another search term."
                : "Be the first farmer to list crop residue."}
            </p>
          </div>
        )}

        {!loading && !error && filteredResidues.length > 0 && (
          <>
            <div className="mb-5 text-lg text-slate-600">
              {filteredResidues.length} residue
              {filteredResidues.length !== 1 ? "s" : ""} found
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredResidues.map((residue) => (
                <div
                  key={residue.id}
                  className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-40 items-center justify-center bg-green-50">
                    <Leaf className="h-20 w-20 text-green-700" />
                  </div>

                  <div className="p-6">
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <h3 className="text-xl font-semibold text-slate-900">
                        {residue.crop_name || "Crop Residue"}
                      </h3>

                      {residue.price != null && (
                        <span className="whitespace-nowrap font-semibold text-green-700">
                          ₹{residue.price}
                        </span>
                      )}
                    </div>

                    {residue.residue_type && (
                      <p className="mb-3 text-slate-600">
                        {residue.residue_type}
                      </p>
                    )}

                    {residue.quantity != null && (
                      <p className="mb-3 text-slate-700">
                        <strong>Quantity:</strong> {residue.quantity}{" "}
                        {residue.unit ?? ""}
                      </p>
                    )}

                    {residue.location && (
                      <div className="mb-3 flex items-center gap-2 text-slate-600">
                        <MapPin className="h-4 w-4 text-green-700" />
                        {residue.location}
                      </div>
                    )}

                    {residue.description && (
                      <p className="line-clamp-3 text-sm text-slate-600">
                        {residue.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}