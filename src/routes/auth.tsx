import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Sprout } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>): { mode?: "signup" | "login" } => ({
    mode: search["mode"] === "signup" ? "signup" : "login",
  }),
  head: () => ({
    meta: [
      { title: "Login or Sign Up — Kisan Connect" },
      {
        name: "description",
        content: "Sign in to Kisan Connect to rent farm machinery, list your equipment and manage bookings.",
      },
      { property: "og:title", content: "Login or Sign Up — Kisan Connect" },
      { property: "og:description", content: "Access your Kisan Connect farmer account." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { mode } = Route.useSearch();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(mode === "signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) void navigate({ to: "/dashboard" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (!email.trim() || password.length < 6) {
      toast.error("Enter a valid email and a password of at least 6 characters.");
      return;
    }
    if (isSignup && name.trim().length < 2) {
      toast.error("Please enter your name.");
      return;
    }
    setBusy(true);
    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { name: name.trim() },
          },
        });
        if (error) throw error;
        if (!data.session) {
          toast.success("Account created. Please confirm your email, then log in.");
          setIsSignup(false);
          return;
        }
        toast.success("Account created");
        void navigate({ to: "/profile" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        toast.success("Welcome back");
        void navigate({ to: "/dashboard" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-6 flex items-center justify-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sprout className="h-5 w-5" />
          </span>
          <span className="text-xl font-semibold">Kisan Connect</span>
        </Link>

        <div className="card-surface p-6">
          <h1 className="text-2xl font-semibold">{isSignup ? "Create your account" : "Login"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isSignup
              ? "Join the farmer network and start renting or lending machinery."
              : "Welcome back. Enter your details to continue."}
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {isSignup && (
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ramesh Choudhary"
                  className="h-12"
                  autoComplete="name"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-12"
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="h-12"
                autoComplete={isSignup ? "new-password" : "current-password"}
              />
            </div>
            <Button type="submit" className="h-12 w-full text-base" disabled={busy}>
              {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSignup ? "Create account" : "Login"}
            </Button>
          </form>

          <button
            type="button"
            onClick={() => setIsSignup((v) => !v)}
            className="mt-5 w-full text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            {isSignup ? "Already have an account? Login" : "New here? Create an account"}
          </button>
        </div>
      </div>
    </div>
  );
}
