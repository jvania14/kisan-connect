import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Package, Plus, Pencil, MapPin, IndianRupee } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/listings")({
  component: MyListings,
});

function MyListings() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: listings = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["my-listings", user?.id],
    enabled: !!user?.id,

    queryFn: async () => {
      if (!user?.id) {
        return [];
      }

      const { data, error } = await supabase
        .from("machinery")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("My Listings error:", error);
        throw error;
      }

      return data ?? [];
    },
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-3">
            Please login
          </h1>

          <Button onClick={() => navigate({ to: "/auth" })}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f1] px-6 py-8 md:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-semibold text-[#092b18]">
              My Listings
            </h1>

            <p className="text-gray-600 mt-2">
              View and manage the agricultural machinery you have listed.
            </p>
          </div>

          <Button
            className="bg-[#146b35] hover:bg-[#0f572b] text-white"
            onClick={() => navigate({ to: "/list-machinery" })}
          >
            <Plus className="mr-2 h-5 w-5" />
            List Machinery
          </Button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="bg-white rounded-2xl border p-10 text-center">
            <p className="text-gray-600">
              Loading your listings...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-red-700">
              Could not load your listings
            </h2>

            <p className="text-red-600 mt-2">
              {error instanceof Error
                ? error.message
                : "Something went wrong while loading your listings."}
            </p>

            <p className="text-sm text-gray-600 mt-3">
              Open the browser console or VS Code terminal to see the
              Supabase error.
            </p>
          </div>
        )}

        {/* No listings */}
        {!isLoading && !error && listings.length === 0 && (
          <div className="bg-white rounded-2xl border shadow-sm p-12 text-center">

            <div className="mx-auto w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-5">
              <Package className="w-10 h-10 text-[#146b35]" />
            </div>

            <h2 className="text-2xl font-semibold text-[#092b18]">
              You haven't listed any machinery yet
            </h2>

            <p className="text-gray-600 mt-2 mb-6">
              List your tractor, harvester, rotavator or other agricultural
              machinery so nearby farmers can find it.
            </p>

            <Button
              className="bg-[#146b35] hover:bg-[#0f572b] text-white"
              onClick={() => navigate({ to: "/list-machinery" })}
            >
              <Plus className="mr-2 h-5 w-5" />
              List Your Machinery
            </Button>
          </div>
        )}

        {/* Listings */}
        {!isLoading && !error && listings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {listings.map((machine: any) => (
              <div
                key={machine.id}
                className="bg-white rounded-2xl border shadow-sm overflow-hidden"
              >

                {/* Image */}
                <div className="h-52 bg-gray-100 overflow-hidden">
                  {machine.image_url ? (
                    <img
                      src={machine.image_url}
                      alt={machine.name || "Agricultural machinery"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-16 h-16 text-[#146b35]" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold text-[#092b18]">
                        {machine.name ||
                          machine.title ||
                          "Agricultural Machinery"}
                      </h2>

                      {machine.category && (
                        <p className="text-gray-500 mt-1">
                          {machine.category}
                        </p>
                      )}
                    </div>

                    {machine.price_per_day != null && (
                      <div className="flex items-center font-semibold text-[#146b35]">
                        <IndianRupee className="w-4 h-4" />
                        {machine.price_per_day}
                        <span className="text-gray-500 font-normal text-sm">
                          /day
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Location */}
                  {(machine.location || machine.district) && (
                    <div className="flex items-center gap-2 text-gray-600 mt-4">
                      <MapPin className="w-4 h-4" />

                      <span>
                        {machine.location || machine.district}
                      </span>
                    </div>
                  )}

                  {/* Edit */}
                  <Button
                    variant="outline"
                    className="w-full mt-5"
                    onClick={() =>
                      navigate({
                        to: "/machinery/$id",
                        params: {
                          id: machine.id,
                        },
                      })
                    }
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    View / Manage
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}