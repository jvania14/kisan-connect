import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DtNBHlnt.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { r as useAuth } from "./router-DPCKUlNX.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { I as MapPin, O as Package, S as Search, V as IndianRupee, Z as CircleCheck, b as ShieldCheck, ct as BadgeCheck, f as TrendingUp, ft as ArrowDown, g as Star, it as CalendarDays, j as Mic, lt as ArrowUp, o as Users, p as Tractor, q as Clock3, ut as ArrowRight, y as ShoppingCart, z as Leaf } from "../_libs/lucide-react.mjs";
import { a as CartesianGrid, i as Line, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as LineChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-BdsgIZHu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRICE_FORECAST = [
	{
		day: "Aug 29",
		actual: 2780,
		forecast: null
	},
	{
		day: "Aug 30",
		actual: 2810,
		forecast: null
	},
	{
		day: "Aug 31",
		actual: 2835,
		forecast: null
	},
	{
		day: "Sep 1",
		actual: 2845,
		forecast: null
	},
	{
		day: "Today",
		actual: 2850,
		forecast: 2850
	},
	{
		day: "Sep 3",
		actual: null,
		forecast: 2910
	},
	{
		day: "Sep 4",
		actual: null,
		forecast: 2960
	},
	{
		day: "Sep 5",
		actual: null,
		forecast: 3e3
	},
	{
		day: "Sep 6",
		actual: null,
		forecast: 3040
	},
	{
		day: "Sep 7",
		actual: null,
		forecast: 3070
	}
];
var MANDIS = [
	{
		name: "Mumbai",
		price: 3020,
		change: 9.1,
		arrivals: 1240,
		distance: "168 km",
		transport: 450,
		handling: 100,
		other: 100,
		score: 91
	},
	{
		name: "Nashik",
		price: 2850,
		change: 8.4,
		arrivals: 1840,
		distance: "42 km",
		transport: 180,
		handling: 80,
		other: 50,
		score: 88
	},
	{
		name: "Pune",
		price: 2720,
		change: 5.2,
		arrivals: 2140,
		distance: "156 km",
		transport: 420,
		handling: 100,
		other: 80,
		score: 79
	},
	{
		name: "Ahmednagar",
		price: 2610,
		change: 3.8,
		arrivals: 2430,
		distance: "92 km",
		transport: 260,
		handling: 80,
		other: 60,
		score: 74
	}
];
var BUYERS = [
	{
		name: "FreshKart Foods",
		price: 3e3,
		quantity: "500–2,000 kg",
		distance: "18 km",
		match: 98
	},
	{
		name: "Maharashtra Agro",
		price: 2950,
		quantity: "1,000 kg",
		distance: "32 km",
		match: 94
	},
	{
		name: "Fresh Harvest Traders",
		price: 2900,
		quantity: "750 kg",
		distance: "25 km",
		match: 91
	}
];
function Dashboard() {
	const { user, profile, profileLoading } = useAuth();
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	const [selectedBuyer, setSelectedBuyer] = (0, import_react.useState)(null);
	const [offerSent, setOfferSent] = (0, import_react.useState)(null);
	const [saleLotOpen, setSaleLotOpen] = (0, import_react.useState)(false);
	const [saleLotCreated, setSaleLotCreated] = (0, import_react.useState)(false);
	const [saleLot, setSaleLot] = (0, import_react.useState)({
		crop: "Tomato",
		quantity: "500",
		grade: "Grade A",
		expectedPrice: "3000"
	});
	const bestMandiIndex = MANDIS.reduce((bestIndex, current, currentIndex) => {
		const currentNet = current.price - current.transport - current.handling - current.other;
		const best = MANDIS[bestIndex];
		return currentNet > (best ? best.price - best.transport - best.handling - best.other : -Infinity) ? currentIndex : bestIndex;
	}, 0);
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "card-surface p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-between gap-4 md:flex-row md:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-2xl font-semibold",
						children: [
							"Namaste, ",
							profile?.name ?? "Kisan",
							" 👋"
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
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/voice",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "h-12 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "h-5 w-5" }), "बोलकर पूछें"]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "market-prices",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-primary",
							children: "MARKET INTELLIGENCE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-semibold",
							children: "Your Market Snapshot"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Tomato market • Today's mandi information"
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden text-xs text-muted-foreground sm:block",
						children: "Updated today"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketCard, {
							icon: IndianRupee,
							label: "Current Best Price",
							value: "₹3,020/q",
							subtitle: "Mumbai",
							trend: "+9.1%",
							positive: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketCard, {
							icon: TrendingUp,
							label: "Average Price",
							value: "₹2,800/q",
							subtitle: "Nearby markets",
							trend: "+6.6%",
							positive: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketCard, {
							icon: Package,
							label: "Market Arrivals",
							value: "1,240 q",
							subtitle: "Mumbai",
							trend: "↓ 14%",
							positive: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketCard, {
							icon: ShoppingCart,
							label: "Buyer Demand",
							value: "High",
							subtitle: "3 active buyers",
							trend: "↑ 18%",
							positive: true
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "price-forecast",
				className: "card-surface overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b border-border p-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col justify-between gap-4 md:flex-row md:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5 text-primary" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold",
											children: "AI Price Forecast"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-secondary px-2 py-1 text-xs font-medium",
											children: "7-day outlook"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 text-2xl font-bold",
									children: "Tomato price may continue rising"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "Historical market movement + arrival trend + buyer demand"
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-background p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Today's price"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-2xl font-bold",
										children: "₹2,850/q"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex items-center gap-1 text-sm text-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-4 w-4" }), "Forecast ₹3,070/q"]
									})
								]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 p-5 lg:grid-cols-[1fr_280px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[300px] w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
									data: PRICE_FORECAST,
									margin: {
										top: 10,
										right: 10,
										left: 5,
										bottom: 5
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { strokeDasharray: "3 3" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "day",
											tick: { fontSize: 12 }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											domain: ["auto", "auto"],
											tick: { fontSize: 12 },
											tickFormatter: (value) => `₹${value}`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { formatter: (value, name) => [`₹${Number(value).toLocaleString("en-IN")}/q`, name === "actual" ? "Actual price" : "Forecast price"] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
											type: "monotone",
											dataKey: "actual",
											name: "actual",
											stroke: "currentColor",
											strokeWidth: 3,
											dot: { r: 4 },
											activeDot: { r: 7 },
											connectNulls: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
											type: "monotone",
											dataKey: "forecast",
											name: "forecast",
											stroke: "currentColor",
											strokeWidth: 3,
											strokeDasharray: "8 6",
											dot: { r: 4 },
											activeDot: { r: 7 },
											connectNulls: false
										})
									]
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							id: "sell-window",
							className: "rounded-2xl border border-primary/20 bg-primary/5 p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-primary",
									children: "SMART SELL ADVISOR"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "h-6 w-6 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-2xl font-bold",
										children: "WAIT 2–3 DAYS"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: "The model currently sees a stronger short-term price signal."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signal, {
											label: "Price momentum",
											value: "Strong",
											icon: ArrowUp
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signal, {
											label: "Mandi arrivals",
											value: "Falling",
											icon: ArrowDown
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signal, {
											label: "Buyer demand",
											value: "Increasing",
											icon: ArrowUp
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signal, {
											label: "Nearby prices",
											value: "Rising",
											icon: ArrowUp
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl bg-background p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "Current price"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xl font-bold",
											children: "₹2,850/q"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl bg-background p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "Expected price"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xl font-bold text-primary",
											children: "₹2,950–₹3,100/q"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 rounded-xl bg-background p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold",
										children: "Why wait?"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
										className: "mt-2 space-y-2 text-xs text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 shrink-0 text-primary" }), "Short-term prices are trending upward."]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 shrink-0 text-primary" }), "Mandi arrivals are currently decreasing."]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 shrink-0 text-primary" }), "Verified buyer demand is increasing."]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "flex-1",
										children: "Wait & Watch"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										className: "flex-1",
										children: "Sell Now"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-center text-[11px] text-muted-foreground",
									children: "Recommendation is an estimate. Final selling decision remains with the farmer."
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-border px-5 py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "⚠️ Forecasts are estimates, not guaranteed prices. Actual recommendations will use verified mandi price and arrival data."
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "best-mandi",
				className: "card-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-primary",
							children: "PRICE DISCOVERY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-semibold",
							children: "Best Market To Sell"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Compare price, arrivals, distance and selling opportunity."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						children: ["View All Mandis", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid gap-3 lg:grid-cols-4",
					children: MANDIS.map((mandi, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-2xl border p-4 ${index === 0 ? "border-primary/40 bg-primary/5" : "border-border"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: mandi.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: mandi.distance
								})] }), index === bestMandiIndex && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground",
									children: "Best Net Realization"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 text-2xl font-bold",
								children: [
									"₹",
									mandi.price.toLocaleString("en-IN"),
									"/q"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 rounded-xl bg-secondary p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Estimated net realization"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xl font-bold",
										children: [
											"₹",
											(mandi.price - mandi.transport - mandi.handling - mandi.other).toLocaleString("en-IN"),
											"/q"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[11px] text-muted-foreground",
										children: "After transport & selling costs"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-center gap-1 text-sm text-primary",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-4 w-4" }),
									"+",
									mandi.change,
									"%"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 space-y-2 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Arrivals" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-medium text-foreground",
										children: [mandi.arrivals.toLocaleString("en-IN"), " q"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Opportunity score" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-semibold text-primary",
										children: [mandi.score, "/100"]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: index === 0 ? "default" : "outline",
								className: "mt-4 w-full",
								children: "View Market"
							})
						]
					}, mandi.name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-primary",
							children: "SMART CALCULATION"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: "What will you actually earn?"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Highest mandi price does not always mean highest farmer realization."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyBox, {
								label: "Market price",
								value: "₹15,100"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyBox, {
								label: "Transport",
								value: "− ₹450"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyBox, {
								label: "Handling",
								value: "− ₹100"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyBox, {
								label: "Other costs",
								value: "− ₹100"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyBox, {
								label: "Estimated net",
								value: "₹14,450",
								highlight: true
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-xl bg-secondary p-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "💡 Kisan Connect insight:" }),
							" ",
							"Mumbai has the highest headline price, but the system should compare transportation and other selling costs before recommending the market."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "buyer-demand",
				className: "card-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-primary",
							children: "DIRECT MARKET LINKAGE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-semibold",
							children: "Buyers Looking For Your Crop"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Verified buyers matched using crop, quantity, location and quality."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: () => window.location.assign("/dashboard#buyer-demand"),
						children: ["Find More Buyers", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid gap-3 lg:grid-cols-3",
					children: BUYERS.map((buyer) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: buyer.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-primary" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "Verified buyer"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary",
									children: [buyer.match, "% match"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-5 text-2xl font-bold",
								children: [
									"₹",
									buyer.price.toLocaleString("en-IN"),
									"/q"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 space-y-2 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Required quantity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: buyer.quantity
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Distance" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: buyer.distance
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "mt-5 w-full",
								onClick: () => setSelectedBuyer(buyer),
								children: ["View Offer", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
							})
						]
					}, buyer.name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "sale-lots",
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-primary",
								children: "YOUR SALE LOT"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-semibold",
								children: "Tomato • 500 kg"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-secondary px-3 py-1 text-xs font-semibold",
								children: "2 offers"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid grid-cols-2 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
									label: "Expected price",
									value: "₹3,000/q"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
									label: "Quality",
									value: "Grade A"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
									label: "Best offer",
									value: "₹3,000/q"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
									label: "Buyer",
									value: "FreshKart"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid gap-2 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								id: "offers",
								onClick: () => setSelectedBuyer(BUYERS[0]),
								children: ["View Offers", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								onClick: () => setSaleLotOpen(true),
								children: ["Create Sale Lot", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "ml-2 h-4 w-4" })]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-primary",
							children: "TRANSACTION TRACKING"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: "Current Sale Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex items-center justify-between",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionStep, {
									label: "Offer",
									active: true,
									completed: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionLine, { completed: true }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionStep, {
									label: "Accepted",
									active: true,
									completed: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionLine, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionStep, {
									label: "Payment",
									active: offerSent !== null
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionLine, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionStep, { label: "Delivered" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 rounded-xl bg-secondary p-4 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mr-1 inline h-4 w-4 text-primary" }), offerSent ? "Buyer offer accepted. Payment is the next step." : "Review verified buyer offers and accept the one that gives you the best realization."]
						})
					]
				})]
			}),
			selectedBuyer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-surface border-primary/20 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-between gap-4 sm:flex-row sm:items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-primary",
								children: "BUYER OFFER"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-xl font-semibold",
								children: selectedBuyer.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: [
									"Verified buyer • ",
									selectedBuyer.distance,
									" away • ",
									selectedBuyer.match,
									"% match"
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-sm text-muted-foreground hover:text-foreground",
							onClick: () => setSelectedBuyer(null),
							children: "Close"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid gap-3 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
								label: "Offer price",
								value: `₹${selectedBuyer.price.toLocaleString("en-IN")}/q`,
								highlight: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
								label: "Required quantity",
								value: selectedBuyer.quantity
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
								label: "Distance",
								value: selectedBuyer.distance
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
								label: "Buyer match",
								value: `${selectedBuyer.match}%`
							})
						]
					}),
					offerSent === selectedBuyer.name ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 rounded-xl bg-secondary p-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mr-2 inline h-4 w-4 text-primary" }),
							"Offer accepted. Transaction moved to ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Payment Pending" }),
							"."
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-col gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "flex-1",
							onClick: () => setOfferSent(selectedBuyer.name),
							children: ["Accept Offer", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "ml-2 h-4 w-4" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "flex-1",
							onClick: () => setSelectedBuyer(null),
							children: "Reject / Close"
						})]
					})
				]
			}),
			saleLotOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-surface border-primary/20 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-primary",
							children: "CREATE SALE LOT"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-xl font-semibold",
							children: "Connect your crop directly to buyers"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Add quantity, quality and expected price so verified buyers can respond."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-sm text-muted-foreground hover:text-foreground",
						onClick: () => setSaleLotOpen(false),
						children: "Close"
					})]
				}), saleLotCreated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 rounded-2xl bg-secondary p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 text-primary" }), "Sale lot published successfully"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid gap-3 sm:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
									label: "Crop",
									value: saleLot.crop
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
									label: "Quantity",
									value: `${saleLot.quantity} kg`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
									label: "Quality",
									value: saleLot.grade
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
									label: "Expected price",
									value: `₹${Number(saleLot.expectedPrice).toLocaleString("en-IN")}/q`
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted-foreground",
							children: "Matching buyers can now review this lot and send offers."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "mt-4",
							onClick: () => {
								setSaleLotCreated(false);
								setSaleLotOpen(false);
								setSelectedBuyer(BUYERS[0]);
							},
							children: ["View Matching Buyers", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "ml-2 h-4 w-4" })]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-5 grid gap-4 sm:grid-cols-2",
					onSubmit: (event) => {
						event.preventDefault();
						setSaleLotCreated(true);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Crop"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-2",
							value: saleLot.crop,
							onChange: (event) => setSaleLot((current) => ({
								...current,
								crop: event.target.value
							})),
							placeholder: "Tomato"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Quantity (kg)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-2",
							type: "number",
							min: "1",
							value: saleLot.quantity,
							onChange: (event) => setSaleLot((current) => ({
								...current,
								quantity: event.target.value
							}))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Quality / Grade"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
							value: saleLot.grade,
							onChange: (event) => setSaleLot((current) => ({
								...current,
								grade: event.target.value
							})),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Grade A" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Grade B" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Grade C" })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-sm font-medium",
							children: "Expected price (₹/q)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "mt-2",
							type: "number",
							min: "1",
							value: saleLot.expectedPrice,
							onChange: (event) => setSaleLot((current) => ({
								...current,
								expectedPrice: event.target.value
							}))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sm:col-span-2 flex flex-col gap-2 sm:flex-row sm:justify-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => setSaleLotOpen(false),
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								children: ["Publish Sale Lot", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Search Farm Services"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Machinery, transport and other farm resources."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: search,
					className: "mt-4 flex gap-2",
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium text-primary",
					children: "FARM COST & RESOURCE SUPPORT"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold",
					children: "More Kisan Connect Services"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceCard, {
						to: "/machinery",
						label: "Machinery Lending",
						icon: Tractor
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceCard, {
						to: "/residues",
						label: "Crop Residues",
						icon: Leaf
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceCard, {
						to: "/community",
						label: "Farmer Community",
						icon: Users
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServiceCard, {
						to: "/bookings",
						label: "My Bookings",
						icon: CalendarDays
					})
				]
			})] }),
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
						value: stats?.requests
					})
				]
			})
		]
	});
}
function MarketCard({ icon: Icon, label, value, subtitle, trend, positive }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-primary" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-2xl font-bold",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: subtitle
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `flex items-center text-xs font-semibold ${positive ? "text-primary" : "text-muted-foreground"}`,
					children: [positive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "mr-1 h-3 w-3" }), trend]
				})]
			})
		]
	});
}
function Signal({ label, value, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1 font-medium",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-primary" }), value]
		})]
	});
}
function MoneyBox({ label, value, highlight }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-xl border p-4 ${highlight ? "border-primary/30 bg-primary/5" : "border-border"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-lg font-bold",
			children: value
		})]
	});
}
function InfoBox({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-secondary p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-semibold",
			children: value
		})]
	});
}
function TransactionStep({ label, active, completed }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `flex h-8 w-8 items-center justify-center rounded-full ${completed ? "bg-primary text-primary-foreground" : active ? "border-2 border-primary" : "border border-border"}`,
			children: completed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-current" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[10px] text-muted-foreground",
			children: label
		})]
	});
}
function TransactionLine({ completed }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `hidden h-px flex-1 sm:block ${completed ? "bg-primary" : "bg-border"}` });
}
function ServiceCard({ to, label, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "card-surface flex items-center gap-3 p-4 transition-shadow hover:shadow-[var(--shadow-lift)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium",
			children: label
		})]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-2xl font-semibold",
			children: value ?? "—"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: label
		})]
	});
}
//#endregion
export { Dashboard as component };
