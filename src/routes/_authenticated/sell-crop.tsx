import { createFileRoute, Link } from "@tanstack/react-router"
import { useState } from "react"
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  ImagePlus,
  Package,
  Send,
  Sparkles,
} from "lucide-react"

export const Route = createFileRoute("/_authenticated/sell-crop")({
  component: SellCrop,
})

function SellCrop() {
  const [crop, setCrop] = useState("Tomato")
  const [quantity, setQuantity] = useState("500")
  const [grade, setGrade] = useState("Grade A")
  const [expectedPrice, setExpectedPrice] = useState("3000")
  const [location, setLocation] = useState("Nashik")
  const [published, setPublished] = useState(false)

  const publishLot = () => {
    setPublished(true)
  }

  return (
    <main className="min-h-screen bg-[#faf9f2] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center gap-3">
          <Link
            to="/dashboard"
            className="rounded-xl border bg-white p-2 hover:bg-gray-50"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-green-700">
              Direct Selling
            </p>

            <h1 className="text-3xl font-bold">
              Create Sale Lot
            </h1>

            <p className="mt-1 text-gray-600">
              Publish your crop once and receive offers from matching buyers.
            </p>
          </div>
        </div>

        {published ? (
          <div className="rounded-3xl border bg-white p-10 text-center shadow-sm">
            <CheckCircle2
              size={70}
              className="mx-auto mb-5 text-green-600"
            />

            <h2 className="text-3xl font-bold">
              Sale Lot Published!
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-gray-600">
              Your {quantity} kg {crop} lot has been published for verified
              buyers.
            </p>

            <div className="mx-auto mt-7 max-w-md rounded-2xl bg-green-50 p-5 text-left">
              <p className="text-sm text-green-700">Expected Price</p>
              <p className="text-2xl font-bold text-green-900">
                ₹{expectedPrice}/q
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Quantity</span>
                  <p className="font-bold">{quantity} kg</p>
                </div>

                <div>
                  <span className="text-gray-500">Quality</span>
                  <p className="font-bold">{grade}</p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/buyer-marketplace"
                className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
              >
                Find Matching Buyers
              </Link>

              <button
                onClick={() => setPublished(false)}
                className="rounded-xl border px-6 py-3 font-semibold hover:bg-gray-50"
              >
                Create Another Lot
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-7 lg:grid-cols-[1fr_350px]">
            <section className="rounded-3xl border bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-green-100 p-3 text-green-700">
                  <Package size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    Crop Details
                  </h2>
                  <p className="text-sm text-gray-500">
                    Add details buyers need before making an offer.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Crop">
                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    className="input"
                  >
                    <option>Tomato</option>
                    <option>Onion</option>
                    <option>Potato</option>
                    <option>Wheat</option>
                    <option>Rice</option>
                    <option>Sugarcane</option>
                  </select>
                </Field>

                <Field label="Quantity (kg)">
                  <input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="number"
                    className="input"
                    placeholder="500"
                  />
                </Field>

                <Field label="Quality / Grade">
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="input"
                  >
                    <option>Grade A</option>
                    <option>Grade B</option>
                    <option>Grade C</option>
                  </select>
                </Field>

                <Field label="Expected Price (₹/quintal)">
                  <input
                    value={expectedPrice}
                    onChange={(e) => setExpectedPrice(e.target.value)}
                    type="number"
                    className="input"
                  />
                </Field>

                <Field label="Pickup / Collection Location">
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="input"
                  />
                </Field>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Crop Photos
                  </label>

                  <button className="flex h-[50px] w-full items-center justify-center gap-2 rounded-xl border border-dashed text-gray-600 hover:bg-gray-50">
                    <ImagePlus size={19} />
                    Add Photos
                  </button>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-blue-50 p-4">
                <div className="flex gap-3">
                  <BadgeCheck className="mt-0.5 text-blue-700" size={20} />

                  <div>
                    <p className="font-semibold text-blue-900">
                      Quality improves price discovery
                    </p>

                    <p className="mt-1 text-sm text-blue-800">
                      Add accurate quality information so buyers can compare
                      your lot fairly.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={publishLot}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3.5 font-bold text-white hover:bg-green-800"
              >
                <Send size={18} />
                Publish Sale Lot
              </button>
            </section>

            <aside className="space-y-5">
              <div className="rounded-3xl border bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <Sparkles className="text-green-700" size={21} />
                  <h3 className="font-bold">
                    Smart Selling Insight
                  </h3>
                </div>

                <p className="text-sm leading-6 text-gray-600">
                  Current market conditions show strong buyer demand for
                  tomatoes. Your expected price is within the current market
                  range.
                </p>

                <div className="mt-5 rounded-2xl bg-green-50 p-4">
                  <p className="text-sm text-green-700">
                    Suggested market range
                  </p>

                  <p className="mt-1 text-2xl font-bold text-green-900">
                    ₹2,850 – ₹3,070/q
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border bg-white p-6 shadow-sm">
                <h3 className="font-bold">
                  What happens next?
                </h3>

                <div className="mt-5 space-y-4">
                  <Step number="1" text="Your lot is published" />
                  <Step number="2" text="Matching buyers are notified" />
                  <Step number="3" text="You compare digital offers" />
                  <Step number="4" text="Accept the best offer" />
                  <Step number="5" text="Track payment & delivery" />
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      {children}
    </div>
  )
}

function Step({
  number,
  text,
}: {
  number: string
  text: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-800">
        {number}
      </div>

      <p className="text-sm text-gray-700">{text}</p>
    </div>
  )
}