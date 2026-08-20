import { Link } from "@tanstack/react-router";
import { BadgeCheck, MapPin, Star } from "lucide-react";
import { categoryImage, formatINR, type Machinery } from "@/lib/kisan";
import { Button } from "@/components/ui/button";

interface Props {
  item: Machinery;
  distance?: number | null;
  matchScore?: number;
  reasons?: string[];
  best?: boolean;
}

export function MachineryCard({ item, distance, matchScore, reasons, best }: Props) {
  return (
    <article className="card-surface flex flex-col overflow-hidden transition-shadow hover:shadow-[var(--shadow-lift)]">
      <div className="relative">
        <img
          src={item.image_url || categoryImage(item.category)}
          alt={item.name}
          loading="lazy"
          width={1024}
          height={640}
          className="h-44 w-full object-cover"
        />
        {typeof matchScore === "number" && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow">
            {best ? "⭐ Best Match · " : ""}
            {matchScore}% match
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-card/95 px-3 py-1 text-xs font-semibold">
          {item.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold leading-tight">{item.name}</h3>
          <span className="flex shrink-0 items-center gap-1 text-sm font-medium">
            <Star className="h-4 w-4 fill-warning text-warning" />
            {Number(item.rating).toFixed(1)}
          </span>
        </div>

        <p className="text-sm text-muted-foreground">
          {[item.brand, item.model].filter(Boolean).join(" · ") || "—"}
        </p>

        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {[item.village, item.district].filter(Boolean).join(", ") || "Location not set"}
          {distance != null && <span className="text-foreground">· {distance} km away</span>}
        </p>

        <p className="text-sm">
          <span className="font-medium">{item.profiles?.name ?? "Farmer"}</span>
          {item.profiles?.is_verified && (
            <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-success/12 px-2 py-0.5 text-xs font-medium text-success">
              <BadgeCheck className="h-3.5 w-3.5" /> Verified
            </span>
          )}
        </p>

        {reasons && reasons.length > 0 && (
          <ul className="mt-1 space-y-0.5 text-xs text-muted-foreground">
            {reasons.slice(0, 4).map((r) => (
              <li key={r}>✓ {r}</li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-lg font-semibold">
            {formatINR(item.price_per_day)}
            <span className="text-sm font-normal text-muted-foreground">/day</span>
          </span>
          <Link to="/machinery/$id" params={{ id: item.id }}>
            <Button size="sm">View Details</Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
