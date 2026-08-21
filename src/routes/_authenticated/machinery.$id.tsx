import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Loader2,
  MapPin,
  Star,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { createNotification } from "@/lib/notify";
import {
  categoryImage,
  daysBetween,
  distanceKm,
  formatINR,
  overlaps,
  toISODate,
  type Machinery,
} from "@/lib/kisan";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_authenticated/machinery/$id")({
  component: MachineryDetail,
});

interface BookedRange {
  id: string;
  start_date: string;
  end_date: string;
  status: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  reviewer: { name: string } | null;
}

function MachineryDetail() {
  const { id } = Route.useParams();
  const { profile, user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [booking, setBooking] = useState(false);
  const [confirmed, setConfirmed] = useState<{ id: string; total: number } | null>(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["machinery", id],
    queryFn: async () => {
      const [m, b, r] = await Promise.all([
        supabase
          .from("machinery")
          .select("*, profiles:owner_id(id, name, is_verified, rating, phone)")
          .eq("id", id)
          .maybeSingle(),
        supabase
          .from("bookings")
          .select("id, start_date, end_date, status")
          .eq("machinery_id", id)
          .in("status", ["pending", "confirmed"]),
        supabase
          .from("reviews")
          .select("id, rating, comment, created_at, reviewer:reviewer_id(name)")
          .eq("machinery_id", id)
          .order("created_at", { ascending: false }),
      ]);
      if (m.error) throw m.error;
      if (b.error) throw b.error;
      if (r.error) throw r.error;
      return {
        machinery: (m.data ?? null) as unknown as Machinery | null,
        booked: (b.data ?? []) as BookedRange[],
        reviews: (r.data ?? []) as unknown as Review[],
      };
    },
  });

  const machinery = data?.machinery ?? null;
  const booked = useMemo(() => data?.booked ?? [], [data]);

  const distance = distanceKm(
    profile?.latitude,
    profile?.longitude,
    machinery?.latitude,
    machinery?.longitude,
  );

  const days = start && end && end >= start ? daysBetween(start, end) : 0;
  const total = machinery ? days * Number(machinery.price_per_day) : 0;

  const conflict = useMemo(() => {
    if (!start || !end || end < start) return null;
    const clash = booked.find((b) => overlaps(start, end, b.start_date, b.end_date));
    if (clash) return "booked" as const;
    if (machinery?.available_from && machinery.available_from > start) return "window" as const;
    if (machinery?.available_until && machinery.available_until < end) return "window" as const;
    return null;
  }, [start, end, booked, machinery]);

  const confirmBooking = async () => {
    if (!machinery || !user) return;
    if (!start || !end) {
      toast.error("Please select start and end dates.");
      return;
    }
    if (end < start) {
      toast.error("End date must be on or after the start date.");
      return;
    }
    if (machinery.owner_id === user.id) {
      toast.error("You cannot book your own machinery.");
      return;
    }
    if (conflict) {
      toast.error("These dates are not available.");
      return;
    }
    setBooking(true);
    // Re-check availability against the database right before inserting.
    const { data: fresh, error: freshErr } = await supabase
      .from("bookings")
      .select("id, start_date, end_date")
      .eq("machinery_id", machinery.id)
      .in("status", ["pending", "confirmed"]);
    if (freshErr) {
      setBooking(false);
      toast.error(`Availability check failed: ${freshErr.message}`);
      return;
    }
    if ((fresh ?? []).some((b) => overlaps(start, end, b.start_date, b.end_date))) {
      setBooking(false);
      await refetch();
      toast.error("Someone just booked these dates. Please pick different dates.");
      return;
    }

    const { data: inserted, error: insertErr } = await supabase
      .from("bookings")
      .insert({
        machinery_id: machinery.id,
        renter_id: user.id,
        owner_id: machinery.owner_id,
        start_date: start,
        end_date: end,
        total_price: total,
        status: "pending",
      })
      .select("id")
      .single();

    if (insertErr || !inserted) {
      setBooking(false);
      toast.error(`Booking failed: ${insertErr?.message ?? "unknown error"}`);
      return;
    }

    await createNotification({
      userId: machinery.owner_id,
      type: "booking_request",
      title: "New booking request",
      message: `${profile?.name ?? "A farmer"} requested ${machinery.name} from ${start} to ${end}.`,
    });
    await createNotification({
      userId: user.id,
      type: "booking_created",
      title: "Booking request sent",
      message: `Your request for ${machinery.name} (${start} → ${end}) is pending owner confirmation.`,
    });

    setBooking(false);
    setConfirmed({ id: inserted.id, total });
    await queryClient.invalidateQueries({ queryKey: ["machinery", id] });
    await queryClient.invalidateQueries({ queryKey: ["machinery-all"] });
    await queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
    toast.success("Booking saved");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-surface p-8 text-center">
        <p className="text-sm text-destructive">Could not load this listing: {error.message}</p>
        <Button className="mt-3" onClick={() => void refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  if (!machinery) {
    return (
      <div className="card-surface p-10 text-center">
        <p className="font-medium">This machinery listing no longer exists.</p>
        <Link to="/machinery" search={{ q: '', category: '', start: '', end: '' }} className="mt-4 inline-block">
          <Button>Back to marketplace</Button>
        </Link>
      </div>
    );
  }

  if (confirmed) {
    return (
      <div className="mx-auto max-w-xl">
        <div className="card-surface p-8 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-success" />
          <h1 className="mt-4 text-2xl font-semibold">Booking confirmed</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your request has been saved and the owner has been notified.
          </p>
          <dl className="mt-6 space-y-2 text-left text-sm">
            <Row label="Machinery" value={machinery.name} />
            <Row label="Owner" value={machinery.profiles?.name ?? "Farmer"} />
            <Row label="Dates" value={`${start} → ${end} (${days} day${days > 1 ? "s" : ""})`} />
            <Row label="Total" value={formatINR(confirmed.total)} />
            <Row label="Status" value="Pending owner confirmation" />
            <Row label="Booking ID" value={confirmed.id.slice(0, 8)} />
          </dl>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/bookings">
              <Button className="h-12 px-6">Go to My Bookings</Button>
            </Link>
            <Link to="/machinery" search={{ q: '', category: '', start: '', end: '' }}>
              <Button variant="outline" className="h-12 px-6">
                Keep browsing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isOwner = machinery.owner_id === user?.id;

  return (
    <div className="space-y-5">
      <Link to="/machinery" search={{ q: '', category: '', start: '', end: '' }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to marketplace
      </Link>

      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-5">
          <img
            src={machinery.image_url || categoryImage(machinery.category)}
            alt={machinery.name}
            width={1024}
            height={640}
            className="h-64 w-full rounded-2xl border border-border object-cover sm:h-80"
          />

          <div className="card-surface p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-muted-foreground">
                  {machinery.category}
                </span>
                <h1 className="text-2xl font-semibold">{machinery.name}</h1>
                <p className="text-sm text-muted-foreground">
                  {[machinery.brand, machinery.model].filter(Boolean).join(" · ")}
                </p>
              </div>
              <span className="flex items-center gap-1 text-lg font-semibold">
                <Star className="h-5 w-5 fill-warning text-warning" />
                {Number(machinery.rating).toFixed(1)}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {[machinery.village, machinery.district, machinery.state]
                  .filter(Boolean)
                  .join(", ") || "Location not set"}
              </span>
              {distance != null && <span>📏 {distance} km away</span>}
              <span className="flex items-center gap-1">
                Owner: <span className="font-medium text-foreground">{machinery.profiles?.name}</span>
                {machinery.profiles?.is_verified && (
                  <BadgeCheck className="h-4 w-4 text-success" />
                )}
              </span>
            </div>

            {machinery.description && (
              <p className="mt-4 whitespace-pre-line text-sm">{machinery.description}</p>
            )}
            {machinery.terms && (
              <div className="mt-4 rounded-xl bg-muted p-4 text-sm">
                <p className="font-medium">Rental terms</p>
                <p className="mt-1 whitespace-pre-line text-muted-foreground">{machinery.terms}</p>
              </div>
            )}
          </div>

          <div className="card-surface p-5">
            <h2 className="flex items-center gap-2 font-semibold">
              <CalendarDays className="h-5 w-5" /> Availability
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Listed as available{" "}
              {machinery.available_from ? `from ${machinery.available_from}` : "immediately"}
              {machinery.available_until ? ` until ${machinery.available_until}` : ""}.
            </p>
            <div className="mt-3">
              <p className="text-sm font-medium">Already booked dates</p>
              {booked.length === 0 ? (
                <p className="mt-1 text-sm text-muted-foreground">
                  No bookings yet — all dates in the window are open.
                </p>
              ) : (
                <ul className="mt-2 space-y-1 text-sm">
                  {booked.map((b) => (
                    <li key={b.id} className="rounded-lg bg-muted px-3 py-2">
                      {b.start_date} → {b.end_date}{" "}
                      <span className="text-muted-foreground">({b.status})</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="card-surface p-5">
            <h2 className="font-semibold">Reviews ({data?.reviews.length ?? 0})</h2>
            {(data?.reviews.length ?? 0) === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">
                No reviews yet. Reviews appear after a rental is completed.
              </p>
            ) : (
              <ul className="mt-3 space-y-3">
                {data?.reviews.map((r) => (
                  <li key={r.id} className="rounded-xl bg-muted p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{r.reviewer?.name ?? "Farmer"}</span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-warning text-warning" /> {r.rating}
                      </span>
                    </div>
                    {r.comment && <p className="mt-1 text-sm text-muted-foreground">{r.comment}</p>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="card-surface p-5">
            <p className="text-2xl font-semibold">
              {formatINR(machinery.price_per_day)}
              <span className="text-base font-normal text-muted-foreground">/day</span>
            </p>

            <div className="mt-4 space-y-3">
              <div className="space-y-2">
                <Label htmlFor="s">Start date</Label>
                <Input
                  id="s"
                  type="date"
                  className="h-12"
                  min={toISODate(new Date())}
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="e">End date</Label>
                <Input
                  id="e"
                  type="date"
                  className="h-12"
                  min={start || toISODate(new Date())}
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                />
              </div>
            </div>

            {start && end && end >= start && (
              <div className="mt-4 rounded-xl bg-muted p-4 text-sm">
                {conflict === "booked" && (
                  <p className="flex items-center gap-2 font-medium text-destructive">
                    <XCircle className="h-4 w-4" /> Already booked for these dates.
                  </p>
                )}
                {conflict === "window" && (
                  <p className="flex items-center gap-2 font-medium text-destructive">
                    <XCircle className="h-4 w-4" /> Outside the owner's availability window.
                  </p>
                )}
                {!conflict && (
                  <p className="flex items-center gap-2 font-medium text-success">
                    <CheckCircle2 className="h-4 w-4" /> Available for your selected dates.
                  </p>
                )}
                <p className="mt-3 flex justify-between">
                  <span>
                    {days} day{days > 1 ? "s" : ""} × {formatINR(machinery.price_per_day)}
                  </span>
                  <span className="font-semibold">{formatINR(total)}</span>
                </p>
              </div>
            )}

            <Button
              className="mt-4 h-12 w-full text-base"
              disabled={booking || isOwner || !start || !end || !!conflict}
              onClick={() => void confirmBooking()}
            >
              {booking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isOwner ? "This is your listing" : "Confirm Booking"}
            </Button>
            {!isOwner && (
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Payment is settled directly with the owner. Kisan Connect records the booking.
              </p>
            )}
            <Button
              variant="outline"
              className="mt-3 h-12 w-full"
              onClick={() => void navigate({ to: "/bookings" })}
            >
              My Bookings
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border pb-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}