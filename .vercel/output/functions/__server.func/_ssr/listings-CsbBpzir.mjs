import { t as supabase } from "./client-DtNBHlnt.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as useAuth } from "./router-CBtCpRAA.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { f as Plus, m as Package, p as Pencil, w as IndianRupee, y as MapPin } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/listings-CsbBpzir.js
var import_jsx_runtime = require_jsx_runtime();
function MyListings() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { data: listings = [], isLoading, error } = useQuery({
		queryKey: ["my-listings", user?.id],
		enabled: !!user?.id,
		queryFn: async () => {
			if (!user?.id) return [];
			const { data, error } = await supabase.from("machinery").select("*").eq("owner_id", user.id).order("created_at", { ascending: false });
			if (error) {
				console.error("My Listings error:", error);
				throw error;
			}
			return data ?? [];
		}
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold mb-3",
				children: "Please login"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => navigate({ to: "/auth" }),
				children: "Go to Login"
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-[#faf9f1] px-6 py-8 md:px-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-4xl font-semibold text-[#092b18]",
						children: "My Listings"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-gray-600 mt-2",
						children: "View and manage the agricultural machinery you have listed."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "bg-[#146b35] hover:bg-[#0f572b] text-white",
						onClick: () => navigate({ to: "/list-machinery" }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-5 w-5" }), "List Machinery"]
					})]
				}),
				isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-white rounded-2xl border p-10 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-gray-600",
						children: "Loading your listings..."
					})
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-red-50 border border-red-200 rounded-2xl p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold text-red-700",
							children: "Could not load your listings"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-red-600 mt-2",
							children: error instanceof Error ? error.message : "Something went wrong while loading your listings."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-gray-600 mt-3",
							children: "Open the browser console or VS Code terminal to see the Supabase error."
						})
					]
				}),
				!isLoading && !error && listings.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-2xl border shadow-sm p-12 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "w-10 h-10 text-[#146b35]" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-semibold text-[#092b18]",
							children: "You haven't listed any machinery yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-gray-600 mt-2 mb-6",
							children: "List your tractor, harvester, rotavator or other agricultural machinery so nearby farmers can find it."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "bg-[#146b35] hover:bg-[#0f572b] text-white",
							onClick: () => navigate({ to: "/list-machinery" }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-5 w-5" }), "List Your Machinery"]
						})
					]
				}),
				!isLoading && !error && listings.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
					children: listings.map((machine) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white rounded-2xl border shadow-sm overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-52 bg-gray-100 overflow-hidden",
							children: machine.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: machine.image_url,
								alt: machine.name || "Agricultural machinery",
								className: "w-full h-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full h-full flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "w-16 h-16 text-[#146b35]" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-semibold text-[#092b18]",
										children: machine.name || machine.title || "Agricultural Machinery"
									}), machine.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-gray-500 mt-1",
										children: machine.category
									})] }), machine.price_per_day != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center font-semibold text-[#146b35]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "w-4 h-4" }),
											machine.price_per_day,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-gray-500 font-normal text-sm",
												children: "/day"
											})
										]
									})]
								}),
								(machine.location || machine.district) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-gray-600 mt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-4 h-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: machine.location || machine.district })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									className: "w-full mt-5",
									onClick: () => navigate({
										to: "/machinery/$id",
										params: { id: machine.id }
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "mr-2 h-4 w-4" }), "View / Manage"]
								})
							]
						})]
					}, machine.id))
				})
			]
		})
	});
}
//#endregion
export { MyListings as component };
