import { t as supabase } from "./client-DtNBHlnt.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as useAuth } from "./router-CBtCpRAA.mjs";
import { B as ArrowLeft, D as Clock, I as CalendarDays, O as CircleX, j as CircleCheckBig } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings-BS68_g-G.js
var import_jsx_runtime = require_jsx_runtime();
function Bookings() {
	const { user } = useAuth();
	const { data: bookings, isLoading, error } = useQuery({
		queryKey: ["my-bookings", user?.id],
		enabled: !!user?.id,
		queryFn: async () => {
			if (!user?.id) return [];
			const { data, error } = await supabase.from("bookings").select("*").eq("renter_id", user.id).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-lg",
			children: "Loading your bookings..."
		})
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold mb-2",
				children: "Unable to load bookings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: error.message
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-[#faf9f2] px-6 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-6xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4 mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => window.history.back(),
					className: "flex items-center gap-2 text-gray-700 hover:text-green-700",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 20 }), "Back"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-4xl font-semibold text-gray-900",
					children: "My Bookings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-gray-600 mt-1",
					children: "View and manage the machinery you have booked."
				})] })]
			}), !bookings || bookings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white border rounded-2xl p-12 text-center shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
						size: 52,
						className: "mx-auto mb-4 text-green-700"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-semibold mb-2",
						children: "No bookings yet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-gray-600",
						children: "Your machinery bookings will appear here."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-5",
				children: bookings.map((booking) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-white border rounded-2xl p-6 shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col md:flex-row md:items-center md:justify-between gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold text-gray-900 mb-3",
							children: "Machinery Booking"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 text-gray-600",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Booking ID:" }),
									" ",
									booking.id
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Machinery ID:" }),
									" ",
									booking.machinery_id
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Start date:" }),
									" ",
									booking.start_date || "Not specified"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "End date:" }),
									" ",
									booking.end_date || "Not specified"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Total:" }),
									" ",
									"₹",
									booking.total_price ?? 0
								] })
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: booking.status === "confirmed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-green-700 font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { size: 20 }), "Confirmed"]
						}) : booking.status === "cancelled" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-red-600 font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { size: 20 }), "Cancelled"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-orange-600 font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 20 }), "Pending owner confirmation"]
						}) })]
					})
				}, booking.id))
			})]
		})
	});
}
//#endregion
export { Bookings as component };
