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
  q?: string;
  category?: string;
  start?: string;
  end?: string;
}

export const Route = createFileRoute("/_authenticated/machinery/")({
  validateSearch: (search: Record<string, unknown>): MachinerySearch => ({
    q: typeof search["q"] === "string" ? (search["q"] as string) : undefined,
    category: typeof search["category"] === "string" ? (search["category"] as string) : undefined,
    start: typeof search["start"] === "string" ? (search["start"] as string) : undefined,
    end: typeof search["end"] === "string" ? (search["end"] as string) : undefined,
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
          .select("*, profiles:owner_id(id, name, is_verified, rating, phone)")
          .eq("is_active", true)
          .order("created_at", { ascending: false }),
        supabase
          .from("bookings")
          .select("machinery_id, start_date, end_date, status")
          .in("status", ["pending", "confirmed"]),
      ]);
      if (machineryRes.error) throw machineryRes.error;
      if (bookingRes.error) throw bookingRes.error;

      const bookings = (bookingRes.data ?? []) as Array<{
        machinery_id: string;
        start_date: string;
        end_date: string;
      }>;
      const byMachine = new Map<string, Array<{ start: string; end: string }>>();
      for (const b of bookings) {
        const list = byMachine.get(b.machinery_id) ?? [];
        list.push({ start: b.start_date, end: b.end_date });
        byMachine.set(b.machinery_id, list);
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
  const { data, isLoading, error, refetch } = useMachineryData();

  const [text, setText] = useState(search.q ?? "");
  const [category, setCategory] = useState(search.category ?? "all");
  const [district, setDistrict] = useState("all");
  const [start, setStart] = useState(search.start ?? "");
  const [end, setEnd] = useState(search.end ?? "");
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [minRating, setMinRating] = useState("0");
  const [sort, setSort] = useState<SortKey>("best");
  const [showFilters, setShowFilters] = useState(false);

  const districts = useMemo(() => {
    const set = new Set<string>();
    (data?.machinery ?? []).forEach((m) => m.district && set.add(m.district));
    return Array.from(set).sort();
  }, [data]);

  const results = useMemo(() => {
    const list = data?.machinery ?? [];
    if (list.length === 0) return [];
    const prices = list.map((m) => Number(m.price_per_day));
    const context = { minPrice: Math.min(...prices), maxPrice: Math.max(...prices) };

    const scored = list
      .filter((m) => {
        if (category !== "all" && m.category !== category) return false;
        if (district !== "all" && m.district !== district) return false;
        if (Number(m.price_per_day) > maxPrice) return false;
        if (Number(m.rating) < Number(minRating)) return false;
        if (text.trim()) {
          const hay = `${m.name} ${m.category} ${m.brand ?? ""} ${m.model ?? ""} ${m.village ?? ""} ${m.district ?? ""}`.toLowerCase();
          if (!text.toLowerCase().split(/\s+/).some((w) => hay.includes(w))) return false;
        }
        if (start && end) {
          const clash = (data?.bookedRanges.get(m.id) ?? []).some(
            (r) => start <= r.end && end >= r.start,
          );
          if (clash) return false;
          if (m.available_from && m.available_from > start) return false;
          if (m.available_until && m.available_until < end) return false;
        }
        return true;
      })
      .map((m) => {
        const match = scoreMachinery(
          m,
          {
            text,
            category,
            startDate: start || undefined,
            endDate: end || undefined,
            userLat: profile?.latitude ?? null,
            userLng: profile?.longitude ?? null,
          },
          { ...context, bookedRanges: data?.bookedRanges.get(m.id) ?? [] },
        );
        return { item: m, ...match };
      });

    scored.sort((a, b) => {
      switch (sort) {
        case "nearest":
          return (a.distance ?? 1e9) - (b.distance ?? 1e9);
        case "price":
          return Number(a.item.price_per_day) - Number(b.item.price_per_day);
        case "rating":
          return Number(b.item.rating) - Number(a.item.rating);
        default:
          return b.score - a.score;
      }
    });
    return scored;
  }, [data, category, district, maxPrice, minRating, text, start, end, sort, profile]);

  const applySearch = (e: React.FormEvent) => {
    e.preventDefault();
    void navigate({
      to: "/machinery",
      search: {
        q: text.trim() || undefined,
        category: category !== "all" ? category : undefined,
        start: start || undefined,
        end: end || undefined,
      },
      replace: true,
    });
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Find Machinery</h1>
        <p className="text-sm text-muted-foreground">
          Listings from farmers around you, ranked by our smart matching engine.
        </p>
      </div>

      <form onSubmit={applySearch} className="card-surface space-y-3 p-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-12 pl-9"
              placeholder="Search tractor, harvester, rotavator…"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <Button type="submit" className="h-12 px-6">
            Search
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12"
            onClick={() => setShowFilters((v) => !v)}
            aria-label="Filters"
          >
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
        </div>

        {showFilters && (
          <div className="grid gap-4 border-t border-border pt-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {MACHINERY_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>District</Label>
              <Select value={district} onValueChange={setDistrict}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All districts</SelectItem>
                  {districts.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Minimum rating</Label>
              <Select value={minRating} onValueChange={setMinRating}>
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Any rating</SelectItem>
                  <SelectItem value="4">4.0 and above</SelectItem>
                  <SelectItem value="4.5">4.5 and above</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="start">Available from</Label>
              <Input
                id="start"
                type="date"
                className="h-11"
                value={start}
                min={toISODate(new Date())}
                onChange={(e) => setStart(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end">Available until</Label>
              <Input
                id="end"
                type="date"
                className="h-11"
                value={end}
                min={start || toISODate(new Date())}
                onChange={(e) => setEnd(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Max price: ₹{maxPrice}/day</Label>
              <Slider
                value={[maxPrice]}
                min={100}
                max={5000}
                step={50}
                onValueChange={(v) => setMaxPrice(v[0] ?? 5000)}
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 border-t border-border pt-3">
          <span className="text-sm text-muted-foreground">Sort by</span>
          {(
            [
              ["best", "Best Match"],
              ["nearest", "Nearest"],
              ["price", "Lowest Price"],
              ["rating", "Highest Rated"],
            ] as Array<[SortKey, string]>
          ).map(([key, label]) => (
            <Button
              key={key}
              type="button"
              size="sm"
              variant={sort === key ? "default" : "outline"}
              onClick={() => setSort(key)}
            >
              {label}
            </Button>
          ))}
        </div>
      </form>

      {isLoading && (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {error && (
        <div className="card-surface p-6 text-center">
          <p className="text-sm text-destructive">Could not load machinery: {error.message}</p>
          <Button className="mt-3" onClick={() => void refetch()}>
            Retry
          </Button>
        </div>
      )}

      {!isLoading && !error && results.length === 0 && (
        <div className="card-surface p-10 text-center">
          <p className="font-medium">No machinery matches your filters.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try widening the price range, clearing dates or choosing another category.
          </p>
        </div>
      )}

      {results.length > 0 && (
        <>
          <p className="text-sm text-muted-foreground">{results.length} machines found</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((r, i) => (
              <MachineryCard
                key={r.item.id}
                item={r.item}
                distance={r.distance}
                matchScore={sort === "best" ? r.score : undefined}
                reasons={sort === "best" ? r.reasons : undefined}
                best={sort === "best" && i === 0}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
