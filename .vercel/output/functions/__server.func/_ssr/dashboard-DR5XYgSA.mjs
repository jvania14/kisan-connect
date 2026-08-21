import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DtNBHlnt.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as useAuth } from "./router-CBtCpRAA.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { I as CalendarDays, S as Leaf, T as Inbox, d as Search, h as Mic, i as Tractor, k as CirclePlus, m as Package, n as Users, o as Star, y as MapPin, z as BadgeCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-DR5XYgSA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ACTIONS = [
	{
		to: "/machinery",
		label: "Find Machinery",
		icon: Tractor
	},
	{
		to: "/list-machinery",
		label: "List Machinery",
		icon: CirclePlus
	},
	{
		to: "/residues",
		label: "Crop Residues",
		icon: Leaf
	},
	{
		to: "/community",
		label: "Community",
		icon: Users
	},
	{
		to: "/bookings",
		label: "My Bookings",
		icon: CalendarDays
	},
	{
		to: "/listings",
		label: "My Listings",
		icon: Package
	}
];
function Dashboard() {
	const { user, profile, profileLoading } = useAuth();
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!profileLoading && user && !profile) navigate({ to: "/profile" });
	}, [
		profile,
		profileLoading,
		user,
		navigate
	]);
	const { data: stats } = useQuery({
		queryKey: ["dashboard-stats", user?.id],
		enabled: !!user?.id,
		queryFn: async () => {
			const uid = user.id;
			const [active, listed, residues, requests] = await Promise.all([
				supabase.from("bookings").select("id", {
					count: "exact",
					head: true
				}).eq("renter_id", uid).in("status", ["pending", "confirmed"]),
				supabase.from("machinery").select("id", {
					count: "exact",
					head: true
				}).eq("owner_id", uid),
				supabase.from("crop_residues").select("id", {
					count: "exact",
					head: true
				}).eq("owner_id", uid),
				supabase.from("bookings").select("id", {
					count: "exact",
					head: true
				}).eq("owner_id", uid).eq("status", "pending")
			]);
			const err = active.error || listed.error || residues.error || requests.error;
			if (err) throw err;
			return {
				active: active.count ?? 0,
				listed: listed.count ?? 0,
				residues: residues.count ?? 0,
				requests: requests.count ?? 0
			};
		}
	});
	const search = (e) => {
		e.preventDefault();
		navigate({
			to: "/machinery",
			search: {
				q: q.trim(),
				category: "",
				start: "",
				end: ""
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-2xl font-semibold",
					children: [
						"Namaste, ",
						profile?.name ?? "Kisan",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							children: "👋"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }), [
								profile?.village,
								profile?.district,
								profile?.state
							].filter(Boolean).join(", ") || "Location not set"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: `h-4 w-4 ${profile?.is_verified ? "text-success" : "text-muted-foreground"}` }), profile?.is_verified ? "Verified farmer" : "Verification pending"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-warning text-warning" }),
								Number(profile?.rating ?? 0).toFixed(1),
								" rating"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/profile",
							className: "underline underline-offset-4",
							children: "Edit profile"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/voice",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "h-16 w-full justify-start gap-3 text-base",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-6 w-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["बोलिए, आपको क्या चाहिए?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 hidden text-sm font-normal opacity-80 sm:inline",
							children: "Voice search"
						})] })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: search,
					className: "mt-3 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "h-12 pl-9",
							placeholder: "Search tractor, harvester, rotavator…",
							value: q,
							onChange: (e) => setQ(e.target.value)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						variant: "secondary",
						className: "h-12 px-6",
						children: "Search"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Active bookings",
						value: stats?.active
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Machinery listed",
						value: stats?.listed
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Residue listings",
						value: stats?.residues
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Requests received",
						value: stats?.requests,
						icon: Inbox
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-3",
				children: ACTIONS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: a.to,
					className: "card-surface flex flex-col gap-3 p-5 transition-shadow hover:shadow-[var(--shadow-lift)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(a.icon, { className: "h-7 w-7 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: a.label
					})]
				}, a.to))
			})
		]
	});
}
function Stat({ label, value, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-2xl font-semibold",
				children: value ?? "—"
			}), Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-muted-foreground" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: label
		})]
	});
}
//#endregion
export { Dashboard as component };
