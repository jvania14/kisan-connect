import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronRight,
  FileCheck2,
  IndianRupee,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  Store,
  Tractor,
  User,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute(
  "/_authenticated/profile",
)({
  component: ProfilePage,
});

type Role = "Farmer" | "Buyer" | "Machinery Owner";

function ProfilePage() {
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [name, setName] = useState("Vania Farmer");
  const [phone, setPhone] = useState("+91 98XXXXXX42");
  const [village, setVillage] = useState("Nashik");
  const [district, setDistrict] = useState("Nashik");
  const [role, setRole] = useState<Role>("Farmer");

  const saveProfile = () => {
    setEditing(false);
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="card-surface overflow-hidden">
        <div className="h-24 bg-primary/10" />

        <div className="-mt-10 px-6 pb-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="flex items-end gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-background bg-secondary shadow-sm">
                <User className="h-9 w-9 text-muted-foreground" />
              </div>

              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-bold">
                    {name}
                  </h1>

                  <VerifiedBadge />
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {role} • {district}, Maharashtra
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => setEditing(true)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </div>
      </section>

      {/* =====================================================
          SUCCESS
      ===================================================== */}

      {saved && (
        <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <Check className="h-5 w-5 text-primary" />

          <p className="text-sm font-medium">
            Profile updated successfully.
          </p>
        </div>
      )}

      {/* =====================================================
          VERIFICATION
      ===================================================== */}

      <section className="card-surface p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>

            <div>
              <p className="text-xs font-bold text-primary">
                TRUST & VERIFICATION
              </p>

              <h2 className="mt-1 text-lg font-semibold">
                Verified profile
              </h2>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                Verification helps farmers and buyers make
                safer direct transactions and reduces
                information asymmetry.
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-2 self-start rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
            <BadgeCheck className="h-4 w-4" />
            Verified
          </span>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <VerificationItem
            icon={User}
            title="Identity"
            status="Verified"
          />

          <VerificationItem
            icon={Phone}
            title="Mobile"
            status="Verified"
          />

          <VerificationItem
            icon={MapPin}
            title="Location"
            status="Verified"
          />
        </div>
      </section>

      {/* =====================================================
          PROFILE INFORMATION
      ===================================================== */}

      <section className="grid gap-6 lg:grid-cols-2">
        <section className="card-surface p-6">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-primary" />

            <div>
              <h2 className="font-semibold">
                Profile information
              </h2>

              <p className="text-sm text-muted-foreground">
                Information used across your Kisan Connect
                account.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <ProfileRow
              icon={User}
              label="Name"
              value={name}
            />

            <ProfileRow
              icon={Phone}
              label="Mobile"
              value={phone}
            />

            <ProfileRow
              icon={MapPin}
              label="Village / Location"
              value={village}
            />

            <ProfileRow
              icon={MapPin}
              label="District"
              value={district}
            />

            <ProfileRow
              icon={Users}
              label="Account type"
              value={role}
            />
          </div>
        </section>

        {/* ===================================================
            ROLE
        =================================================== */}

        <section className="card-surface p-6">
          <div className="flex items-center gap-3">
            <Store className="h-5 w-5 text-primary" />

            <div>
              <h2 className="font-semibold">
                Your role on Kisan Connect
              </h2>

              <p className="text-sm text-muted-foreground">
                Your role determines the services you can
                use.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <RoleCard
              active={role === "Farmer"}
              icon={User}
              title="Farmer"
              text="Sell crops, compare mandi prices and find buyers."
              onClick={() => setRole("Farmer")}
            />

            <RoleCard
              active={role === "Buyer"}
              icon={Store}
              title="Buyer"
              text="Discover verified farmers and purchase sale lots."
              onClick={() => setRole("Buyer")}
            />

            <RoleCard
              active={role === "Machinery Owner"}
              icon={Tractor}
              title="Machinery Owner"
              text="List equipment and earn from idle machinery."
              onClick={() =>
                setRole("Machinery Owner")
              }
            />
          </div>
        </section>
      </section>

      {/* =====================================================
          ACTIVITY
      ===================================================== */}

      <section className="card-surface p-6">
        <div className="flex items-center gap-3">
          <CalendarDays className="h-5 w-5 text-primary" />

          <div>
            <h2 className="font-semibold">
              Account activity
            </h2>

            <p className="text-sm text-muted-foreground">
              Your activity across the platform.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ActivityCard
            label="Sale lots"
            value="3"
            description="Created"
          />

          <ActivityCard
            label="Buyer offers"
            value="7"
            description="Received"
          />

          <ActivityCard
            label="Transactions"
            value="2"
            description="Completed"
          />

          <ActivityCard
            label="Community"
            value="14"
            description="Posts & replies"
          />
        </div>
      </section>

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            Quick actions
          </h2>

          <p className="text-sm text-muted-foreground">
            Jump directly to the tools you use most.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <QuickAction
            icon={IndianRupee}
            title="Market Prices"
            text="Compare mandi prices"
            onClick={() =>
              navigate({
                to: "/dashboard",
              })
            }
          />

          <QuickAction
            icon={Store}
            title="Find Buyers"
            text="View matched buyers"
            onClick={() =>
              navigate({
                to: "/dashboard",
              })
            }
          />

          <QuickAction
            icon={Tractor}
            title="Machinery"
            text="Find farm equipment"
            onClick={() =>
              navigate({
                to: "/machinery",
                search: {
                  q: "",
                  category: "",
                  start: "",
                  end: "",
                },
              })
            }
          />

          <QuickAction
            icon={Users}
            title="Community"
            text="Connect with farmers"
            onClick={() =>
              navigate({
                to: "/community",
              })
            }
          />
        </div>
      </section>

      {/* =====================================================
          TRUST PRINCIPLES
      ===================================================== */}

      <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <div className="flex items-start gap-3">
          <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

          <div>
            <p className="text-xs font-bold text-primary">
              TRUSTED MARKETPLACE
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Better information leads to better decisions
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Kisan Connect is designed around evidence:
              market prices, arrivals, buyer offers, quality
              information, distance, transaction status and
              verified participants. The objective is to help
              farmers make informed selling decisions rather
              than simply repeat what a buyer says.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <TrustCard
            title="Price transparency"
            text="Compare market prices before accepting an offer."
          />

          <TrustCard
            title="Verified participants"
            text="Build trust between farmers and direct buyers."
          />

          <TrustCard
            title="Digital records"
            text="Keep offers and transaction progress traceable."
          />
        </div>
      </section>

      {/* =====================================================
          EDIT MODAL
      ===================================================== */}

      {editing && (
        <EditProfileModal
          name={name}
          phone={phone}
          village={village}
          district={district}
          role={role}
          setName={setName}
          setPhone={setPhone}
          setVillage={setVillage}
          setDistrict={setDistrict}
          setRole={setRole}
          onClose={() => setEditing(false)}
          onSave={saveProfile}
        />
      )}

      <div className="rounded-xl bg-secondary p-4 text-xs leading-5 text-muted-foreground">
        <strong>Prototype note:</strong> verification status
        and profile statistics shown here are demonstration
        data. Production deployment should connect identity,
        farmer/buyer verification and profile information to
        the application's database.
      </div>
    </div>
  );
}

/* =========================================================
   EDIT PROFILE
========================================================= */

function EditProfileModal({
  name,
  phone,
  village,
  district,
  role,
  setName,
  setPhone,
  setVillage,
  setDistrict,
  setRole,
  onClose,
  onSave,
}: {
  name: string;
  phone: string;
  village: string;
  district: string;
  role: Role;
  setName: (value: string) => void;
  setPhone: (value: string) => void;
  setVillage: (value: string) => void;
  setDistrict: (value: string) => void;
  setRole: (value: Role) => void;
  onClose: () => void;
  onSave: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl">
        <div className="flex items-start justify-between border-b border-border p-5">
          <div>
            <p className="text-xs font-bold text-primary">
              PROFILE SETTINGS
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Edit profile
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-secondary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <EditField label="Full name">
            <Input
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />
          </EditField>

          <EditField label="Mobile number">
            <Input
              value={phone}
              onChange={(event) =>
                setPhone(event.target.value)
              }
            />
          </EditField>

          <EditField label="Village / Location">
            <Input
              value={village}
              onChange={(event) =>
                setVillage(event.target.value)
              }
            />
          </EditField>

          <EditField label="District">
            <Input
              value={district}
              onChange={(event) =>
                setDistrict(event.target.value)
              }
            />
          </EditField>

          <EditField label="Account type">
            <select
              value={role}
              onChange={(event) =>
                setRole(event.target.value as Role)
              }
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option>Farmer</option>
              <option>Buyer</option>
              <option>Machinery Owner</option>
            </select>
          </EditField>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-border p-5 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button onClick={onSave}>
            <Check className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">
      <BadgeCheck className="h-3.5 w-3.5" />
      Verified
    </span>
  );
}

function VerificationItem({
  icon: Icon,
  title,
  status,
}: {
  icon: typeof User;
  title: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
          <Icon className="h-4 w-4 text-primary" />
        </div>

        <div>
          <p className="text-sm font-semibold">
            {title}
          </p>

          <p className="text-xs text-muted-foreground">
            {status}
          </p>
        </div>
      </div>

      <Check className="h-4 w-4 text-primary" />
    </div>
  );
}

function ProfileRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-secondary p-3">
      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />

      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}

function RoleCard({
  active,
  icon: Icon,
  title,
  text,
  onClick,
}: {
  active: boolean;
  icon: typeof User;
  title: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border p-4 text-left transition ${
        active
          ? "border-primary bg-primary/5"
          : "border-border hover:bg-secondary"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            active
              ? "bg-primary text-primary-foreground"
              : "bg-secondary"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {text}
          </p>
        </div>

        {active && (
          <Check className="h-5 w-5 text-primary" />
        )}
      </div>
    </button>
  );
}

function ActivityCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border p-4">
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold">
        {value}
      </p>

      <p className="mt-1 text-xs text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  title,
  text,
  onClick,
}: {
  icon: typeof User;
  title: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="card-surface flex items-center gap-4 p-4 text-left transition hover:-translate-y-0.5"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
        <Icon className="h-5 w-5 text-primary" />
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          {text}
        </p>
      </div>

      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}

function TrustCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-border p-4">
      <p className="text-sm font-semibold">{title}</p>

      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {text}
      </p>
    </div>
  );
}

function EditField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      {children}
    </div>
  );
}