import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  IndianRupee,
  MapPin,
  Package,
  Tractor,
  Upload,
  Wrench,
} from "lucide-react"

const CATEGORIES = [
  "Tractor",
  "Harvester",
  "Rotavator",
  "Cultivator",
  "Seeder",
  "Sprayer",
  "Other",
]

export const Route = createFileRoute("/_authenticated/list-machinery")({
  component: ListMachineryPage,
})

function ListMachineryPage() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [category, setCategory] = useState("Tractor")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [pricePerHour, setPricePerHour] = useState("")
  const [pricePerDay, setPricePerDay] = useState("")
  const [availableFrom, setAvailableFrom] = useState("")
  const [availableTo, setAvailableTo] = useState("")
  const [imageName, setImageName] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back */}
        <button
          type="button"
          onClick={() => navigate({ to: "/machinery" })}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Machinery
        </button>

        {/* Header */}
        <section className="mb-8 rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Tractor className="h-3.5 w-3.5" />
                Machinery Lending
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                List Your Machinery
              </h1>

              <p className="mt-3 max-w-2xl text-muted-foreground">
                Turn unused machinery into additional income while helping
                nearby farmers access equipment at a lower cost.
              </p>
            </div>

            <div className="hidden rounded-2xl bg-primary/10 p-5 md:block">
              <Wrench className="h-12 w-12 text-primary" />
            </div>
          </div>
        </section>

        {submitted ? (
          <SuccessCard
            onViewMachinery={() => navigate({ to: "/machinery" })}
            onListAnother={() => {
              setSubmitted(false)
              setName("")
              setDescription("")
              setLocation("")
              setPricePerHour("")
              setPricePerDay("")
              setAvailableFrom("")
              setAvailableTo("")
              setImageName("")
            }}
          />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Main form */}
              <div className="space-y-6 lg:col-span-2">
                <section className="rounded-3xl border bg-card p-6 shadow-sm">
                  <SectionTitle
                    icon={<Tractor className="h-5 w-5" />}
                    title="Machinery Details"
                    description="Tell farmers what equipment you are offering."
                  />

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Machinery Name"
                      required
                      value={name}
                      onChange={setName}
                      placeholder="e.g. Mahindra 575 DI Tractor"
                    />

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Category <span className="text-destructive">*</span>
                      </label>

                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      >
                        {CATEGORIES.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-semibold">
                        Description
                      </label>

                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Mention condition, model year, attachments, operating capacity, etc."
                        rows={5}
                        className="w-full resize-none rounded-xl border bg-background px-3 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </section>

                {/* Location */}
                <section className="rounded-3xl border bg-card p-6 shadow-sm">
                  <SectionTitle
                    icon={<MapPin className="h-5 w-5" />}
                    title="Location"
                    description="Help nearby farmers discover your machinery."
                  />

                  <div className="mt-6">
                    <Field
                      label="Village / District"
                      required
                      value={location}
                      onChange={setLocation}
                      placeholder="e.g. Nashik, Maharashtra"
                    />
                  </div>
                </section>

                {/* Pricing */}
                <section className="rounded-3xl border bg-card p-6 shadow-sm">
                  <SectionTitle
                    icon={<IndianRupee className="h-5 w-5" />}
                    title="Rental Pricing"
                    description="Set transparent rental rates for farmers."
                  />

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Price per Hour"
                      required
                      type="number"
                      value={pricePerHour}
                      onChange={setPricePerHour}
                      placeholder="700"
                    />

                    <Field
                      label="Price per Day"
                      required
                      type="number"
                      value={pricePerDay}
                      onChange={setPricePerDay}
                      placeholder="4500"
                    />
                  </div>

                  <div className="mt-4 rounded-2xl bg-muted/50 p-4">
                    <p className="text-sm font-medium">
                      💡 Tip for better bookings
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      Competitive pricing and clear machinery details help
                      farmers compare options and reduce unnecessary
                      negotiation.
                    </p>
                  </div>
                </section>

                {/* Availability */}
                <section className="rounded-3xl border bg-card p-6 shadow-sm">
                  <SectionTitle
                    icon={<CalendarDays className="h-5 w-5" />}
                    title="Availability"
                    description="Choose the period when farmers can request your machinery."
                  />

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Available From"
                      required
                      type="date"
                      value={availableFrom}
                      onChange={setAvailableFrom}
                    />

                    <Field
                      label="Available Until"
                      required
                      type="date"
                      value={availableTo}
                      onChange={setAvailableTo}
                    />
                  </div>
                </section>

                {/* Image */}
                <section className="rounded-3xl border bg-card p-6 shadow-sm">
                  <SectionTitle
                    icon={<Upload className="h-5 w-5" />}
                    title="Machinery Photo"
                    description="A real photo increases trust and helps farmers evaluate condition."
                  />

                  <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition hover:border-primary hover:bg-primary/5">
                    <Upload className="h-8 w-8 text-muted-foreground" />

                    <p className="mt-3 text-sm font-semibold">
                      {imageName || "Upload machinery photo"}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      PNG, JPG or WEBP
                    </p>

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        setImageName(file?.name ?? "")
                      }}
                    />
                  </label>
                </section>
              </div>

              {/* Preview / summary */}
              <aside className="lg:col-span-1">
                <div className="sticky top-6 space-y-5">
                  <section className="rounded-3xl border bg-card p-6 shadow-sm">
                    <h2 className="text-lg font-bold">Listing Preview</h2>

                    <div className="mt-5 rounded-2xl bg-muted/40 p-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
                        <Tractor className="h-10 w-10 text-primary" />
                      </div>

                      <h3 className="mt-4 font-bold">
                        {name || "Your Machinery Name"}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {category}
                      </p>

                      <div className="mt-4 space-y-2 text-sm">
                        <PreviewRow
                          icon={<MapPin className="h-4 w-4" />}
                          value={location || "Location not added"}
                        />

                        <PreviewRow
                          icon={<IndianRupee className="h-4 w-4" />}
                          value={
                            pricePerHour
                              ? `₹${pricePerHour}/hour`
                              : "Hourly price not added"
                          }
                        />

                        <PreviewRow
                          icon={<CalendarDays className="h-4 w-4" />}
                          value={
                            availableFrom && availableTo
                              ? `${availableFrom} → ${availableTo}`
                              : "Availability not added"
                          }
                        />
                      </div>
                    </div>
                  </section>

                  <section className="rounded-3xl border bg-card p-6 shadow-sm">
                    <h2 className="font-bold">Why list here?</h2>

                    <div className="mt-4 space-y-4">
                      <Benefit
                        title="Earn from idle equipment"
                        text="Generate additional income when machinery is not in use."
                      />

                      <Benefit
                        title="Reach nearby farmers"
                        text="Farmers can discover equipment based on location and availability."
                      />

                      <Benefit
                        title="Reduce farming costs"
                        text="Shared machinery access can reduce the need for expensive ownership."
                      />
                    </div>
                  </section>

                  <button
                    type="submit"
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
                  >
                    <CheckCircle2 className="h-5 w-5" />
                    Publish Machinery
                  </button>

                  <p className="text-center text-xs leading-5 text-muted-foreground">
                    Prototype listing flow. Connect verified machinery records
                    and booking persistence before production deployment.
                  </p>
                </div>
              </aside>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}

function SectionTitle({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-xl bg-primary/10 p-2 text-primary">{icon}</div>

      <div>
        <h2 className="font-bold">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold">
        {label}{" "}
        {required && <span className="text-destructive">*</span>}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        min={type === "number" ? "0" : undefined}
        className="h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  )
}

function PreviewRow({
  icon,
  value,
}: {
  icon: React.ReactNode
  value: string
}) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      {icon}
      <span className="truncate">{value}</span>
    </div>
  )
}

function Benefit({
  title,
  text,
}: {
  title: string
  text: string
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 rounded-full bg-primary/10 p-1.5">
        <CheckCircle2 className="h-4 w-4 text-primary" />
      </div>

      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {text}
        </p>
      </div>
    </div>
  )
}

function SuccessCard({
  onViewMachinery,
  onListAnother,
}: {
  onViewMachinery: () => void
  onListAnother: () => void
}) {
  return (
    <section className="mx-auto max-w-2xl rounded-3xl border bg-card p-8 text-center shadow-sm sm:p-12">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <CheckCircle2 className="h-10 w-10 text-primary" />
      </div>

      <h2 className="mt-6 text-2xl font-bold">Machinery Listed Successfully</h2>

      <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
        Your machinery listing has been prepared successfully. Farmers can
        discover it through the machinery marketplace.
      </p>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onViewMachinery}
          className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          View Machinery
        </button>

        <button
          type="button"
          onClick={onListAnother}
          className="rounded-xl border px-5 py-3 text-sm font-semibold transition hover:bg-muted"
        >
          List Another
        </button>
      </div>
    </section>
  )
}