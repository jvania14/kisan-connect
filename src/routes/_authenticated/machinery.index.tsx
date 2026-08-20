import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Loader2, Search, SlidersHorizontal } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  MACHINERY_CATEGORIES,
  scoreMachinery,
  toISODate,
  type Machinery,
} from "@/lib/kisan";
import { MachineryCard } from "@/components/MachineryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MachinerySearch {
  q: string;
  category: string;
  start: string;
  end: string;
}

export const Route = createFileRoute("/_authenticated/machinery/")({
  validateSearch: (search: Record<string, unknown>): MachinerySearch => ({
    q: typeof search["q"] === "string" ? search["q"] : "",
    category:
      typeof search["category"] === "string" ? search["category"] : "",
    start: typeof search["start"] === "string" ? search["start"] : "",
    end: typeof search["end"] === "string" ? search["end"] : "",
  }),

  component: MarketPlace,
});

type SortKey = "best" | "nearest" | "price" | "rating";

export function useMachineryData() {
  return useQuery({
    queryKey: ["machinery-all"],

    queryFn: async () => {
      const [machineryRes, bookingRes] = await Promise.all([
        supabase
          .from("machinery")
          .select(
            "*, profiles:owner_id(id, name, is_verified, rating, phone)"
          )
          .eq("is_active", true)
          .order("created_at", { ascending: false }),

        supabase
          .from("bookings")
          .select("machinery_id, start_date, end_date, status")
          .in("status", ["pending", "confirmed"]),
      ]);

      if (machineryRes.error) {
        throw machineryRes.error;
      }

      if (bookingRes.error) {
        throw bookingRes.error;
      }

      const bookings = (bookingRes.data ?? []) as Array<{
        machinery_id: string;
        start_date: string;
        end_date: string;
      }>;

      const byMachine = new Map<
        string,
        Array<{ start: string; end: string }>
      >();

      for (const booking of bookings) {
        const list = byMachine.get(booking.machinery_id) ?? [];

        list.push({
          start: booking.start_date,
          end: booking.end_date,
        });

        byMachine.set(booking.machinery_id, list);
      }

      return {
        machinery: (machineryRes.data ?? []) as unknown as Machinery[],
        bookedRanges: byMachine,
      };
    },
  });
}

function MarketPlace() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { profile } = useAuth();

  const {
    data,
    isLoading,
    error,
    refetch,
  } = useMachineryData();

  const [text, setText] = useState(search.q);
  const [category, setCategory] = useState(
    search.category || "all"
  );
  const [district, setDistrict] = useState("all");
  const [start, setStart] = useState(search.start);
  const [end, setEnd] = useState(search.end);

  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [minRating, setMinRating] = useState("0");
  const [sort, setSort] = useState<SortKey>("best");
  const [showFilters, setShowFilters] = useState(false);

  const districts = useMemo(() => {
    const set = new Set<string>();

    (data?.machinery ?? []).forEach((machine) => {
      if (machine.district) {
        set.add(machine.district);
      }
    });

    return Array.from(set).sort();
  }, [data]);

  const results = useMemo(() => {
    const list = data?.machinery ?? [];

    if (list.length === 0) {
      return [];
    }

    const prices = list.map((machine) =>
      Number(machine.price_per_day)
    );

    const context = {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };

    const scored = list
      .filter((machine) => {
        // Category filter
        if (
          category !== "all" &&
          machine.category !== category
        ) {
          return false;
        }

        // District filter
        if (
          district !== "all" &&
          machine.district !== district
        ) {
          return false;
        }

        // Price filter
        if (
          Number(machine.price_per_day) > maxPrice
        ) {
          return false;
        }

        // Rating filter
        if (
          Number(machine.rating) < Number(minRating)
        ) {
          return false;
        }

        // Text search
        if (text.trim()) {
          const haystack = `
            ${machine.name}
            ${machine.category}
            ${machine.brand ?? ""}
            ${machine.model ?? ""}
            ${machine.village ?? ""}
            ${machine.district ?? ""}
          `.toLowerCase();

          const words = text
            .toLowerCase()
            .trim()
            .split(/\s+/)
            .filter(Boolean);

          const matches = words.some((word) =>
            haystack.includes(word)
          );

          if (!matches) {
            return false;
          }
        }

        // Availability filter
        if (start && end) {
          const clash = (
            data?.bookedRanges.get(machine.id) ?? []
          ).some(
            (range) =>
              start <= range.end &&
              end >= range.start
          );

          if (clash) {
            return false;
          }

          if (
            machine.available_from &&
            machine.available_from > start
          ) {
            return false;
          }

          if (
            machine.available_until &&
            machine.available_until < end
          ) {
            return false;
          }
        }

        return true;
      })
      .map((machine) => {
        const match = scoreMachinery(
          machine,
          {
            text,
            category,
            startDate: start,
            endDate: end,
            userLat: profile?.latitude ?? null,
            userLng: profile?.longitude ?? null,
          },
          {
            ...context,
            bookedRanges:
              data?.bookedRanges.get(machine.id) ?? [],
          }
        );

        return {
          item: machine,
          ...match,
        };
      });

    scored.sort((a, b) => {
      switch (sort) {
        case "nearest":
          return (
            (a.distance ?? 1e9) -
            (b.distance ?? 1e9)
          );

        case "price":
          return (
            Number(a.item.price_per_day) -
            Number(b.item.price_per_day)
          );

        case "rating":
          return (
            Number(b.item.rating) -
            Number(a.item.rating)
          );

        default:
          return b.score - a.score;
      }
    });

    return scored;
  }, [
    data,
    category,
    district,
    maxPrice,
    minRating,
    text,
    start,
    end,
    sort,
    profile,
  ]);

  const applySearch = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    void navigate({
      to: "/machinery",

      search: {
        q: text.trim(),
        category:
          category !== "all"
            ? category
            : "",
        start,
        end,
      },

      replace: true,
    });
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">
          Find Machinery
        </h1>

        <p className="text-sm text-muted-foreground">
          Listings from farmers around you,
          ranked by our smart matching engine.
        </p>
      </div>

      {/* Search */}
      <form
        onSubmit={applySearch}
        className="card-surface space-y-3 p-4"
      >
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              className="h-12 pl-9"
              placeholder="Search tractor, harvester, rotavator…"
              value={text}
              onChange={(e) =>
                setText(e.target.value)
              }
            />
          </div>

          <Button
            type="submit"
            className="h-12 px-6"
          >
            Search
          </Button>

          <Button
            type="button"
            variant="outline"
            className="h-12"
            onClick={() =>
              setShowFilters((value) => !value)
            }
            aria-label="Filters"
          >
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="grid gap-4 border-t border-border pt-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Category */}
            <div className="space-y-2">
              <Label>Category</Label>

              <Select
                value={category}
                onValueChange={setCategory}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">
                    All categories
                  </SelectItem>

                  {MACHINERY_CATEGORIES.map(
                    (item) => (
                      <SelectItem
                        key={item}
                        value={item}
                      >
                        {item}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* District */}
            <div className="space-y-2">
              <Label>District</Label>

              <Select
                value={district}
                onValueChange={setDistrict}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">
                    All districts
                  </SelectItem>

                  {districts.map((item) => (
                    <SelectItem
                      key={item}
                      value={item}
                    >
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <Label>
                Minimum rating
              </Label>

              <Select
                value={minRating}
                onValueChange={setMinRating}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="0">
                    Any rating
                  </SelectItem>

                  <SelectItem value="4">
                    4.0 and above
                  </SelectItem>

                  <SelectItem value="4.5">
                    4.5 and above
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Start date */}
            <div className="space-y-2">
              <Label htmlFor="start">
                Available from
              </Label>

              <Input
                id="start"
                type="date"
                className="h-11"
                value={start}
                min={toISODate(new Date())}
                onChange={(e) =>
                  setStart(e.target.value)
                }
              />
            </div>

            {/* End date */}
            <div className="space-y-2">
              <Label htmlFor="end">
                Available until
              </Label>

              <Input
                id="end"
                type="date"
                className="h-11"
                value={end}
                min={
                  start ||
                  toISODate(new Date())
                }
                onChange={(e) =>
                  setEnd(e.target.value)
                }
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label>
                Max price: ₹{maxPrice}/day
              </Label>

              <Slider
                value={[maxPrice]}
                min={100}
                max={5000}
                step={50}
                onValueChange={(value) =>
                  setMaxPrice(
                    value[0] ?? 5000
                  )
                }
              />
            </div>
          </div>
        )}

        {/* Sorting */}
        <div className="flex flex-wrap items-center gap-2 border-t border-border pt-3">
          <span className="text-sm text-muted-foreground">
            Sort by
          </span>

          {(
            [
              ["best", "Best Match"],
              ["nearest", "Nearest"],
              ["price", "Lowest Price"],
              ["rating", "Highest Rated"],
            ] as Array<
              [SortKey, string]
            >
          ).map(([key, label]) => (
            <Button
              key={key}
              type="button"
              size="sm"
              variant={
                sort === key
                  ? "default"
                  : "outline"
              }
              onClick={() =>
                setSort(key)
              }
            >
              {label}
            </Button>
          ))}
        </div>
      </form>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="card-surface p-6 text-center">
          <p className="text-sm text-destructive">
            Could not load machinery:{" "}
            {error.message}
          </p>

          <Button
            className="mt-3"
            onClick={() =>
              void refetch()
            }
          >
            Retry
          </Button>
        </div>
      )}

      {/* No results */}
      {!isLoading &&
        !error &&
        results.length === 0 && (
          <div className="card-surface p-10 text-center">
            <p className="font-medium">
              No machinery matches your filters.
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Try widening the price range,
              clearing dates or choosing another
              category.
            </p>
          </div>
        )}

      {/* Results */}
      {results.length > 0 && (
        <>
          <p className="text-sm text-muted-foreground">
            {results.length} machines found
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((result, index) => (
              <MachineryCard
                key={result.item.id}
                item={result.item}
                distance={
                  result.distance ?? null
                }
                matchScore={
                  sort === "best"
                    ? result.score
                    : 0
                }
                reasons={
                  sort === "best"
                    ? result.reasons
                    : []
                }
                best={
                  sort === "best" &&
                  index === 0
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}