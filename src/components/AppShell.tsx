import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Sprout,
  TrendingUp,
  Users,
  Tractor,
  ShoppingCart,
  BarChart3,
  PackageSearch,
  Handshake,
  CalendarDays,
  PlusCircle,
  Wheat,
  Store,
  CircleDollarSign,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const MAIN_NAV = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/voice", label: "Voice" },
  { to: "/community", label: "Community" },
  { to: "/bookings", label: "Transactions" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { profile, signOut, user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { data: unread = 0 } = useQuery({
    queryKey: ["notifications-unread", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { count, error } = await supabase
        .from("notifications")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user!.id)
        .eq("is_read", false);

      if (error) throw error;
      return count ?? 0;
    },
  });

  const handleSignOut = async () => {
    await signOut();
    void navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-[1400px] items-center gap-3 px-4">

          {/* LOGO */}
          <Link
            to="/dashboard"
            className="flex shrink-0 items-center gap-2"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sprout className="h-5 w-5" />
            </span>

            <span className="text-lg font-semibold leading-tight">
              Kisan Connect
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="ml-5 hidden items-center gap-1 xl:flex">

            {/* DASHBOARD */}
            <Link
              to="/dashboard"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{
                className: "rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-foreground",
              }}
            >
              Dashboard
            </Link>

            {/* MARKET */}
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <TrendingUp className="h-4 w-4" />
                Market
                <ChevronDown className="h-3.5 w-3.5" />
              </button>

              <div className="invisible absolute left-0 top-full mt-1 w-72 rounded-xl border border-border bg-card p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">

                <a
                  href="/dashboard#market-prices"
                  className="flex items-start gap-3 rounded-lg p-3 hover:bg-secondary"
                >
                  <BarChart3 className="mt-0.5 h-5 w-5 text-primary" />
                  <span>
                    <span className="block font-medium">
                      Live Market Prices
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Mandi prices, arrivals & trends
                    </span>
                  </span>
                </a>

                <a
                  href="/dashboard#best-mandi"
                  className="flex items-start gap-3 rounded-lg p-3 hover:bg-secondary"
                >
                  <Store className="mt-0.5 h-5 w-5 text-primary" />
                  <span>
                    <span className="block font-medium">
                      Best Mandi
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Compare nearby markets
                    </span>
                  </span>
                </a>

                <a
                  href="/dashboard#buyer-demand"
                  className="flex items-start gap-3 rounded-lg p-3 hover:bg-secondary"
                >
                  <ShoppingCart className="mt-0.5 h-5 w-5 text-primary" />
                  <span>
                    <span className="block font-medium">
                      Buyer Demand
                    </span>
                    <span className="text-xs text-muted-foreground">
                      See who is looking for your crop
                    </span>
                  </span>
                </a>

                <a
                  href="/dashboard#sale-lots"
                  className="flex items-start gap-3 rounded-lg p-3 hover:bg-secondary"
                >
                  <PackageSearch className="mt-0.5 h-5 w-5 text-primary" />
                  <span>
                    <span className="block font-medium">
                      My Sale Lots
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Manage crops listed for sale
                    </span>
                  </span>
                </a>

                <a
                  href="/dashboard#offers"
                  className="flex items-start gap-3 rounded-lg p-3 hover:bg-secondary"
                >
                  <Handshake className="mt-0.5 h-5 w-5 text-primary" />
                  <span>
                    <span className="block font-medium">
                      My Offers
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Offers, negotiation & buyers
                    </span>
                  </span>
                </a>
              </div>
            </div>

            {/* AI INSIGHTS */}
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <TrendingUp className="h-4 w-4" />
                AI Insights
                <ChevronDown className="h-3.5 w-3.5" />
              </button>

              <div className="invisible absolute left-0 top-full mt-1 w-72 rounded-xl border border-border bg-card p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">

                <a
                  href="/dashboard#price-forecast"
                  className="flex items-start gap-3 rounded-lg p-3 hover:bg-secondary"
                >
                  <TrendingUp className="mt-0.5 h-5 w-5 text-primary" />
                  <span>
                    <span className="block font-medium">
                      Price Forecast
                    </span>
                    <span className="text-xs text-muted-foreground">
                      7-day & future price prediction
                    </span>
                  </span>
                </a>

                <a
                  href="/dashboard#sell-window"
                  className="flex items-start gap-3 rounded-lg p-3 hover:bg-secondary"
                >
                  <CircleDollarSign className="mt-0.5 h-5 w-5 text-primary" />
                  <span>
                    <span className="block font-medium">
                      Sell Now or Wait
                    </span>
                    <span className="text-xs text-muted-foreground">
                      AI recommendation with confidence
                    </span>
                  </span>
                </a>

                <a
                  href="/dashboard#market-opportunity"
                  className="flex items-start gap-3 rounded-lg p-3 hover:bg-secondary"
                >
                  <BarChart3 className="mt-0.5 h-5 w-5 text-primary" />
                  <span>
                    <span className="block font-medium">
                      Market Opportunity
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Find profitable selling opportunities
                    </span>
                  </span>
                </a>
              </div>
            </div>

            {/* BUYERS */}
            <a
              href="/dashboard#find-buyers"
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Users className="h-4 w-4" />
              Find Buyers
            </a>

            {/* SELL CROP */}
            <a
              href="/dashboard#sell-crop"
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Wheat className="h-4 w-4" />
              Sell Crop
            </a>

            {/* MACHINERY */}
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Tractor className="h-4 w-4" />
                Machinery
                <ChevronDown className="h-3.5 w-3.5" />
              </button>

              <div className="invisible absolute left-0 top-full mt-1 w-72 rounded-xl border border-border bg-card p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">

                <Link
                  to="/machinery"
                  className="flex items-start gap-3 rounded-lg p-3 hover:bg-secondary"
                >
                  <Tractor className="mt-0.5 h-5 w-5 text-primary" />
                  <span>
                    <span className="block font-medium">
                      Find Machinery
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Rent tractors & equipment
                    </span>
                  </span>
                </Link>

                <Link
                  to="/list-machinery"
                  className="flex items-start gap-3 rounded-lg p-3 hover:bg-secondary"
                >
                  <PlusCircle className="mt-0.5 h-5 w-5 text-primary" />
                  <span>
                    <span className="block font-medium">
                      List / Sell Machinery
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Earn from unused equipment
                    </span>
                  </span>
                </Link>

                <Link
                  to="/bookings"
                  className="flex items-start gap-3 rounded-lg p-3 hover:bg-secondary"
                >
                  <CalendarDays className="mt-0.5 h-5 w-5 text-primary" />
                  <span>
                    <span className="block font-medium">
                      Machinery Bookings
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Manage rentals & availability
                    </span>
                  </span>
                </Link>

                <Link
                  to="/listings"
                  className="flex items-start gap-3 rounded-lg p-3 hover:bg-secondary"
                >
                  <PackageSearch className="mt-0.5 h-5 w-5 text-primary" />
                  <span>
                    <span className="block font-medium">
                      My Machinery
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Manage your equipment
                    </span>
                  </span>
                </Link>
              </div>
            </div>

            {/* VOICE */}
            <Link
              to="/voice"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Voice
            </Link>

            {/* COMMUNITY */}
            <Link
              to="/community"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Community
            </Link>
          </nav>

          {/* RIGHT SIDE */}
          <div className="ml-auto flex items-center gap-1">

            <Link to="/notifications" className="relative">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </Button>

              {unread > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[11px] font-semibold text-destructive-foreground">
                  {unread}
                </span>
              )}
            </Link>

            <Link to="/profile" className="hidden sm:block">
              <Button variant="ghost" size="sm">
                {profile?.name ?? "Profile"}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              aria-label="Sign out"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5" />
            </Button>

            {/* MOBILE MENU */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="xl:hidden"
                  aria-label="Menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-80 overflow-y-auto"
              >
                <div className="mt-8">

                  <p className="px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Market Linkage
                  </p>

                  <div className="mt-2 flex flex-col gap-1">

                    <a
                      href="/dashboard#market-prices"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-4 py-3 font-medium hover:bg-secondary"
                    >
                      📊 Live Market Prices
                    </a>

                    <a
                      href="/dashboard#best-mandi"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-4 py-3 font-medium hover:bg-secondary"
                    >
                      🏪 Best Mandi
                    </a>

                    <a
                      href="/dashboard#find-buyers"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-4 py-3 font-medium hover:bg-secondary"
                    >
                      🤝 Find Buyers
                    </a>

                    <a
                      href="/dashboard#sell-crop"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-4 py-3 font-medium hover:bg-secondary"
                    >
                      🌾 Sell Crop
                    </a>

                    <a
                      href="/dashboard#price-forecast"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-4 py-3 font-medium hover:bg-secondary"
                    >
                      📈 AI Price Forecast
                    </a>

                    <a
                      href="/dashboard#sell-window"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-4 py-3 font-medium hover:bg-secondary"
                    >
                      💰 Sell Now or Wait
                    </a>
                  </div>

                  <p className="mt-6 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Farm Services
                  </p>

                  <div className="mt-2 flex flex-col gap-1">

                    <Link
                      to="/machinery"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-4 py-3 font-medium hover:bg-secondary"
                    >
                      🚜 Find Machinery
                    </Link>

                    <Link
                      to="/list-machinery"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-4 py-3 font-medium hover:bg-secondary"
                    >
                      💼 List / Sell Machinery
                    </Link>

                    <Link
                      to="/residues"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-4 py-3 font-medium hover:bg-secondary"
                    >
                      🌱 Crop Residues
                    </Link>

                    <Link
                      to="/community"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-4 py-3 font-medium hover:bg-secondary"
                    >
                      👨‍🌾 Community
                    </Link>

                    <Link
                      to="/bookings"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-4 py-3 font-medium hover:bg-secondary"
                    >
                      📅 Transactions & Bookings
                    </Link>

                    <Link
                      to="/listings"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-4 py-3 font-medium hover:bg-secondary"
                    >
                      📦 My Listings
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-4 py-3 font-medium hover:bg-secondary"
                    >
                      👤 My Profile
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 py-6 pb-24">
        {children}
      </main>
    </div>
  );
}