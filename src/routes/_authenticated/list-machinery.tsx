import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { MACHINERY_CATEGORIES, toISODate } from "@/lib/kisan";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/_authenticated/list-machinery")({
  component: ListMachinery,
});

function ListMachinery() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "Tractor",
    brand: "",
    model: "",
    description: "",
    terms: "",
    price_per_day: "",
    state: profile?.state ?? "",
    district: profile?.district ?? "",
    village: profile?.village ?? "",
    image_url: "",
    available_from: toISODate(new Date()),
    available_until: "",
  });

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const price = Number(form.price_per_day);
    if (form.name.trim().length < 3) {
      toast.error("Enter the machinery name.");
      return;
    }
    if (!Number.isFinite(price) || price <= 0) {
      toast.error("Enter a valid price per day.");
      return;
    }
    if (form.available_until && form.available_until < form.available_from) {
      toast.error("Available-until must be after available-from.");
      return;
    }

    setBusy(true);
    const { data, error } = await supabase
      .from("machinery")
      .insert({
        owner_id: user.id,
        name: form.name.trim(),
        category: form.category,
        brand: form.brand.trim() || null,
        model: form.model.trim() || null,
        description: form.description.trim() || null,
        terms: form.terms.trim() || null,
        price_per_day: price,
        state: form.state.trim() || null,
        district: form.district.trim() || null,
        village: form.village.trim() || null,
        latitude: profile?.latitude ?? null,
        longitude: profile?.longitude ?? null,
        image_url: form.image_url.trim() || null,
        available_from: form.available_from || null,
        available_until: form.available_until || null,
      })
      .select("id")
      .single();
    setBusy(false);

    if (error || !data) {
      toast.error(`Could not save listing: ${error?.message ?? "unknown error"}`);
      return;
    }
    await queryClient.invalidateQueries({ queryKey: ["machinery-all"] });
    await queryClient.invalidateQueries({ queryKey: ["my-listings"] });
    toast.success("Machinery listed successfully");
    void navigate({ to: "/machinery/$id", params: { id: data.id } });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-semibold">List your machinery</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Earn from equipment that is idle. Your listing appears in the marketplace immediately.
      </p>

      <form onSubmit={submit} className="card-surface mt-6 space-y-4 p-5">
        <div className="space-y-2">
          <Label htmlFor="name">Machinery name *</Label>
          <Input
            id="name"
            className="h-12"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Mahindra 575 DI Tractor"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label>Category *</Label>
            <Select value={form.category} onValueChange={(v) => set("category", v)}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MACHINERY_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Input
              id="brand"
              className="h-12"
              value={form.brand}
              onChange={(e) => set("brand", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input
              id="model"
              className="h-12"
              value={form.model}
              onChange={(e) => set("model", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="desc">Description</Label>
          <Textarea
            id="desc"
            rows={3}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Condition, horsepower, what work it suits…"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price per day (₹) *</Label>
          <Input
            id="price"
            type="number"
            inputMode="numeric"
            min={1}
            className="h-12"
            value={form.price_per_day}
            onChange={(e) => set("price_per_day", e.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="village">Village</Label>
            <Input
              id="village"
              className="h-12"
              value={form.village}
              onChange={(e) => set("village", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="district">District</Label>
            <Input
              id="district"
              className="h-12"
              value={form.district}
              onChange={(e) => set("district", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              className="h-12"
              value={form.state}
              onChange={(e) => set("state", e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="from">Available from</Label>
            <Input
              id="from"
              type="date"
              className="h-12"
              value={form.available_from}
              onChange={(e) => set("available_from", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="until">Available until</Label>
            <Input
              id="until"
              type="date"
              className="h-12"
              value={form.available_until}
              onChange={(e) => set("available_until", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="img">Image URL (optional)</Label>
          <Input
            id="img"
            className="h-12"
            value={form.image_url}
            onChange={(e) => set("image_url", e.target.value)}
            placeholder="https://…"
          />
          <p className="text-xs text-muted-foreground">
            Leave blank to use a category illustration.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="terms">Additional terms</Label>
          <Textarea
            id="terms"
            rows={2}
            value={form.terms}
            onChange={(e) => set("terms", e.target.value)}
            placeholder="Fuel, driver, deposit…"
          />
        </div>

        {!profile?.latitude && (
          <p className="rounded-xl bg-muted p-3 text-xs text-muted-foreground">
            Tip: add your map location in your profile so nearby farmers see the distance to this
            machine.
          </p>
        )}

        <Button type="submit" className="h-12 w-full text-base" disabled={busy}>
          {busy && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Publish listing
        </Button>
      </form>
    </div>
  );
}