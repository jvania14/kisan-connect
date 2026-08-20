import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { FARMER_TYPES, LANGUAGES } from "@/lib/kisan";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user, profile, profileLoading, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const isNew = !profile;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    village: "",
    district: "",
    state: "",
    preferred_language: "hi",
    farmer_type: "Owner Farmer",
    profile_image: "",
  });
  const [coords, setCoords] = useState<{ lat: number | null; lng: number | null }>({
    lat: null,
    lng: null,
  });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name ?? "",
        phone: profile.phone ?? "",
        village: profile.village ?? "",
        district: profile.district ?? "",
        state: profile.state ?? "",
        preferred_language: profile.preferred_language ?? "hi",
        farmer_type: profile.farmer_type ?? "Owner Farmer",
        profile_image: profile.profile_image ?? "",
      });
      setCoords({ lat: profile.latitude, lng: profile.longitude });
    } else if (user) {
      const metaName = (user.user_metadata as { name?: string } | undefined)?.name;
      setForm((f) => ({ ...f, name: f.name || metaName || "" }));
    }
  }, [profile, user]);

  const useMyLocation = () => {
    if (!("geolocation" in navigator)) {
      toast.error("Location is not available in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        toast.success("Location captured");
      },
      () => toast.error("Could not read your location. You can still save the text address."),
    );
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (form.name.trim().length < 2) {
      toast.error("Please enter your name.");
      return;
    }
    setBusy(true);
    const payload = {
      id: user.id,
      name: form.name.trim(),
      phone: form.phone.trim() || null,
      email: user.email ?? null,
      village: form.village.trim() || null,
      district: form.district.trim() || null,
      state: form.state.trim() || null,
      latitude: coords.lat,
      longitude: coords.lng,
      preferred_language: form.preferred_language,
      farmer_type: form.farmer_type,
      profile_image: form.profile_image.trim() || null,
    };
    const { error } = await supabase.from("profiles").upsert(payload, { onConflict: "id" });
    setBusy(false);
    if (error) {
      toast.error(`Could not save profile: ${error.message}`);
      return;
    }
    toast.success("Profile saved");
    await refreshProfile();
    if (isNew) void navigate({ to: "/dashboard" });
  };

  if (profileLoading && !profile) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-semibold">
        {isNew ? "Set up your farmer profile" : "My profile"}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Your village and location help us show machinery closest to you.
      </p>

      <form onSubmit={save} className="card-surface mt-6 space-y-4 p-5">
        <Field label="Full name" required>
          <Input
            className="h-12"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Field>
        <Field label="Phone number">
          <Input
            className="h-12"
            inputMode="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+91…"
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Village / City">
            <Input
              className="h-12"
              value={form.village}
              onChange={(e) => setForm({ ...form, village: e.target.value })}
            />
          </Field>
          <Field label="District">
            <Input
              className="h-12"
              value={form.district}
              onChange={(e) => setForm({ ...form, district: e.target.value })}
            />
          </Field>
          <Field label="State">
            <Input
              className="h-12"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Preferred language">
            <Select
              value={form.preferred_language}
              onValueChange={(v) => setForm({ ...form, preferred_language: v })}
            >
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((l) => (
                  <SelectItem key={l.value} value={l.value}>
                    {l.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Farmer type">
            <Select
              value={form.farmer_type}
              onValueChange={(v) => setForm({ ...form, farmer_type: v })}
            >
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FARMER_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        <Field label="Profile image URL (optional)">
          <Input
            className="h-12"
            value={form.profile_image}
            onChange={(e) => setForm({ ...form, profile_image: e.target.value })}
            placeholder="https://…"
          />
        </Field>

        <div className="rounded-xl bg-muted p-4">
          <p className="text-sm font-medium">Map location</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {coords.lat != null && coords.lng != null
              ? `Saved: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`
              : "Not set — distances to machinery will be hidden until you add it."}
          </p>
          <Button type="button" variant="outline" className="mt-3" onClick={useMyLocation}>
            Use my current location
          </Button>
        </div>

        <Button type="submit" className="h-12 w-full text-base" disabled={busy}>
          {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isNew ? "Save and continue" : "Save changes"}
        </Button>
      </form>

      {profile && (
        <div className="card-surface mt-4 p-5 text-sm text-muted-foreground">
          Member since {new Date(profile.created_at).toLocaleDateString("en-IN")} ·{" "}
          {profile.is_verified ? "Verified farmer" : "Verification pending"} · Rating{" "}
          {Number(profile.rating).toFixed(1)}
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      {children}
    </div>
  );
}
