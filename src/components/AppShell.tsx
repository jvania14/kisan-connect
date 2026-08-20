import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Bell, LogOut, Menu, Sprout } from "lucide-react";
import { useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/machinery", label: "Find Machinery" },
  { to: "/voice", label: "Voice Search" },
  { to: "/residues", label: "Crop Residues" },
  { to: "/community", label: "Community" },
  { to: "/bookings", label: "My Bookings" },
  { to: "/listings", label: "My Listings" },
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
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sprout className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold">Kisan Connect</span>
          </Link>

          <nav className="ml-6 hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "bg-secondary text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <Link to="/notifications" className="relative">
              <Button variant="ghost" size="icon" aria-label="Notifications">
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
            <Button variant="ghost" size="icon" aria-label="Sign out" onClick={handleSignOut}>
              <LogOut className="h-5 w-5" />
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <nav className="mt-8 flex flex-col gap-1">
                  {[...NAV, { to: "/profile", label: "My Profile" } as const].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                      activeProps={{ className: "bg-secondary" }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 pb-24">{children}</main>
    </div>
  );
}
