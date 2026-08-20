import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, CalendarCheck, Leaf, Mic, Sprout, Tractor, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/tractor.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kisan Connect — Rent Farm Machinery Near You" },
      {
        name: "description",
        content:
          "Kisan Connect lets farmers discover, rent and lend tractors, harvesters and crop residues nearby, with voice search in Hindi.",
      },
      { property: "og:title", content: "Kisan Connect — Rent Farm Machinery Near You" },
      {
        property: "og:description",
        content:
          "A rural resource-exchange platform: find machinery nearby, check real availability and book in a few taps.",
      },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  {
    icon: Tractor,
    title: "Machinery marketplace",
    body: "Search tractors, harvesters, rotavators and more listed by farmers around you.",
  },
  {
    icon: CalendarCheck,
    title: "Real availability & booking",
    body: "Every booking is checked against existing bookings, so double-booking is impossible.",
  },
  {
    icon: Mic,
    title: "Voice-first search",
    body: "Say “मुझे दो दिन के लिए ट्रैक्टर चाहिए” and get matching machinery instantly.",
  },
  {
    icon: Leaf,
    title: "Crop residue exchange",
    body: "Sell wheat straw, husk and stubble instead of burning it.",
  },
  {
    icon: Users,
    title: "Farmer community",
    body: "Ask questions about machinery, prices and government schemes.",
  },
  {
    icon: BadgeCheck,
    title: "Trust & ratings",
    body: "Verified profiles, ratings and reviews after every completed rental.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sprout className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold">Kisan Connect</span>
          </div>
          <Link to="/auth">
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
        <div>
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
            Smart India Hackathon 2026 · S12
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            जोड़ें किसान, बढ़े हिंदुस्तान
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Kisan Connect is a rural resource-exchange network. Find under-used farm machinery near
            you, check real availability, and book it — or earn by lending your own equipment.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/auth" search={{ mode: "signup" }}>
              <Button size="lg" className="h-12 px-8 text-base">
                Get Started
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                Login
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Works on any smartphone browser. No app install needed.
          </p>
        </div>

        <img
          src={heroImg}
          alt="Tractor parked beside a green field in rural India"
          width={1024}
          height={640}
          className="rounded-2xl border border-border object-cover shadow-[var(--shadow-lift)]"
        />
      </section>

      <section className="border-t border-border bg-card/60">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold">What you can do</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="card-surface p-5">
                <f.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-3 font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground">
          Kisan Connect · Integrated Rural Resource-Exchange Platform prototype.
        </div>
      </footer>
    </div>
  );
}
