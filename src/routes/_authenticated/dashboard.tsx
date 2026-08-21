import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  BadgeCheck,
  CalendarDays,
  Inbox,
  Leaf,
  MapPin,
  Mic,
  Package,
  PlusCircle,
  Search,
  Star,
  Tractor,
  Users,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

const ACTIONS = [
  { to: "/machinery", label: "Find Machinery", icon: Tractor },
  { to: "/list-machinery", label: "List Machinery", icon: PlusCircle },
  { to: "/residues", label: "Crop Residues", icon: Leaf },
  { to: "/community", label: "Community", icon: Users },
  { to: "/bookings", label: "My Bookings", icon: CalendarDays },
  { to: "/listings", label: "My Listings", icon: Package },
] as const;

function Dashboard() {
  const { user, profile, profileLoading } = useAuth();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!profileLoading && user && !profile) {
      void navigate({ to: "/profile" });
    }
  }, [profile, profileLoading, user, navigate]);

  const { data: stats } = useQuery({
    queryKey: ["dashboard-stats", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const uid = user!.id;
      const [active, listed, residues, requests] = await Promise.all([
        supabase
          .from("bookings")
          .select("id", { count: "exact", head: true })
          .eq("renter_id", uid)
          .in("status", ["pending", "confirmed"]),
        supabase.from("machinery").select("id", { count: "exact", head: true }).eq("owner_id", uid),
        supabase
          .from("crop_residues")
          .select("id", { count: "exact", head: true })
          .eq("owner_id", uid),
        supabase
          .from("bookings")
          .select("id", { count: "exact", head: true })
          .eq("owner_id", uid)
          .eq("status", "pending"),
      ]);
      const err = active.error || listed.error || residues.error || requests.error;
      if (err) throw err;
      return {
        active: active.count ?? 0,
        listed: listed.count ?? 0,
        residues: residues.count ?? 0,
        requests: requests.count ?? 0,
      };
    },
  });

  const search = (e: React.FormEvent) => {
    e.preventDefault();
   void navigate({ to: "/machinery", search: { q: q.trim(), category: "", start: "", end: "" } });
  };

  return (
    <div className="space-y-6">
      <section className="card-surface p-5">
        <h1 className="text-2xl font-semibold">
          Namaste, {profile?.name ?? "Kisan"} <span aria-hidden>👋</span>
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {[profile?.village, profile?.district, profile?.state].filter(Boolean).join(", ") ||
              "Location not set"}
          </span>
          <span className="flex items-center gap-1">
            <BadgeCheck
              className={`h-4 w-4 ${profile?.is_verified ? "text-success" : "text-muted-foreground"}`}
            />
            {profile?.is_verified ? "Verified farmer" : "Verification pending"}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-warning text-warning" />
            {Number(profile?.rating ?? 0).toFixed(1)} rating
          </span>
          <Link to="/profile" className="underline underline-offset-4">
            Edit profile
          </Link>
        </div>
      </section>

      <section className="card-surface p-5">
        <Link to="/voice">
          <Button className="h-16 w-full justify-start gap-3 text-base">
            <Mic className="h-6 w-6" />
            <span>
              बोलिए, आपको क्या चाहिए?
              <span className="ml-2 hidden text-sm font-normal opacity-80 sm:inline">
                Voice search
              </span>
            </span>
          </Button>
        </Link>
        <form onSubmit={search} className="mt-3 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="h-12 pl-9"
              placeholder="Search tractor, harvester, rotavator…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <Button type="submit" variant="secondary" className="h-12 px-6">
            Search
          </Button>
        </form>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Active bookings" value={stats?.active} />
        <Stat label="Machinery listed" value={stats?.listed} />
        <Stat label="Residue listings" value={stats?.residues} />
        <Stat label="Requests received" value={stats?.requests} icon={Inbox} />
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {ACTIONS.map((a) => (
          <Link key={a.to} to={a.to} className="card-surface flex flex-col gap-3 p-5 transition-shadow hover:shadow-[var(--shadow-lift)]">
            <a.icon className="h-7 w-7 text-primary" />
            <span className="font-medium">{a.label}</span>
          </Link>
        ))}
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number | undefined;
  icon?: typeof Inbox;
}) {
  return (
    <div className="card-surface p-4">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold">{value ?? "—"}</span>
        {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}