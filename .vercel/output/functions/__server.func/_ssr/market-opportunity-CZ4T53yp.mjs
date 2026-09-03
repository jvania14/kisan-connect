import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as Package, F as MapPin, Z as CircleCheck, _ as Sparkles, d as TrendingUp, ft as ArrowLeft, rt as ChartColumn, ut as ArrowUpRight, y as ShoppingCart } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market-opportunity-CZ4T53yp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var OPPORTUNITIES = [
	{
		crop: "Tomato",
		market: "Mumbai",
		price: 3020,
		change: 9.1,
		demand: "High",
		arrivals: 1240,
		distance: 168,
		score: 94,
		action: "Strong Opportunity"
	},
	{
		crop: "Tomato",
		market: "Nashik",
		price: 2850,
		change: 8.4,
		demand: "High",
		arrivals: 860,
		distance: 18,
		score: 92,
		action: "Good Opportunity"
	},
	{
		crop: "Onion",
		market: "Pune",
		price: 2750,
		change: 6.7,
		demand: "High",
		arrivals: 720,
		distance: 42,
		score: 88,
		action: "Good Opportunity"
	},
	{
		crop: "Potato",
		market: "Ahmednagar",
		price: 2410,
		change: 4.8,
		demand: "Medium",
		arrivals: 950,
		distance: 35,
		score: 81,
		action: "Watch Market"
	}
];
function MarketOpportunity() {
	const [crop, setCrop] = (0, import_react.useState)("All");
	const opportunities = crop === "All" ? OPPORTUNITIES : OPPORTUNITIES.filter((item) => item.crop === crop);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-[#faf9f2] px-4 py-8 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/dashboard",
						className: "rounded-xl border bg-white p-2 hover:bg-gray-50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 20 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold uppercase tracking-wider text-green-700",
							children: "AI Market Intelligence"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-bold",
							children: "Market Opportunity"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-gray-600",
							children: "Discover where demand, prices and market conditions create better selling opportunities."
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mb-7 rounded-3xl bg-green-900 p-6 text-white shadow-sm md:p-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-8 md:grid-cols-[1fr_auto] md:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center gap-2 text-green-200",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 19 }), "AI Market Opportunity Engine"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-3xl font-bold md:text-4xl",
								children: "Find the market with the best selling potential."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-2xl leading-7 text-green-100",
								children: "Kisan Connect combines price movement, buyer demand, arrivals, distance and estimated transaction costs to help farmers compare markets."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl bg-white/10 p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-green-200",
									children: "Top opportunity"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-3xl font-bold",
									children: "Mumbai"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-green-100",
									children: "Tomato • ₹3,020/q"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-center gap-2 font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 18 }), "+9.1%"]
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-7 grid gap-4 md:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { size: 22 }),
							title: "Price Trend",
							value: "Rising",
							description: "+7.3% average"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { size: 22 }),
							title: "Buyer Demand",
							value: "High",
							description: "3 active buyers"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { size: 22 }),
							title: "Market Arrivals",
							value: "1,240 q",
							description: "14% movement"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { size: 22 }),
							title: "Opportunity Score",
							value: "94/100",
							description: "Strong"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mb-6 rounded-2xl border bg-white p-5 shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-bold",
							children: "Compare Opportunities"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-gray-500",
							children: "Higher score means stronger overall selling conditions."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: crop,
							onChange: (e) => setCrop(e.target.value),
							className: "rounded-xl border px-4 py-3 font-medium outline-none focus:border-green-600",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Tomato" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Onion" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Potato" })
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-5 lg:grid-cols-2",
					children: opportunities.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpportunityCard, { item }, `${item.crop}-${item.market}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-7 rounded-3xl border bg-white p-6 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl bg-green-100 p-3 text-green-700",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 23 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-bold",
							children: "How Opportunity Score Works"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-gray-500",
							children: "Explainable signals instead of a black-box recommendation."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Factor, {
								title: "Price Trend",
								value: "30%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Factor, {
								title: "Buyer Demand",
								value: "25%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Factor, {
								title: "Arrivals",
								value: "15%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Factor, {
								title: "Distance",
								value: "15%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Factor, {
								title: "Net Realization",
								value: "15%"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Prototype note:" }), " Market values shown here are demonstration values. Production deployment should connect verified AGMARKNET/eNAM data and a validated forecasting model."]
				})
			]
		})
	});
}
function OpportunityCard({ item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl font-bold",
						children: item.crop
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-800",
						children: item.action
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex items-center gap-2 text-sm text-gray-500",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 15 }),
						item.market,
						" • ",
						item.distance,
						" km"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-2xl font-bold",
						children: [
							"₹",
							item.price.toLocaleString("en-IN"),
							"/q"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 flex items-center justify-end gap-1 text-sm font-semibold text-green-700",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 15 }),
							"+",
							item.change,
							"%"
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "my-6 grid grid-cols-2 gap-3 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Demand",
						value: item.demand
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Arrivals",
						value: `${item.arrivals} q`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Distance",
						value: `${item.distance} km`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Score",
						value: `${item.score}/100`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: "Opportunity score"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-bold",
						children: [item.score, "%"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-2 overflow-hidden rounded-full bg-gray-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-green-700",
						style: { width: `${item.score}%` }
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/buyer-marketplace",
					className: "flex-1 rounded-xl bg-green-700 px-4 py-3 text-center font-semibold text-white hover:bg-green-800",
					children: "Find Buyers"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/sell-crop",
					className: "flex-1 rounded-xl border px-4 py-3 text-center font-semibold hover:bg-gray-50",
					children: "Sell Crop"
				})]
			})
		]
	});
}
function Stat({ icon, title, value, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border bg-white p-5 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 text-green-700",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-gray-500",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-2xl font-bold",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-gray-500",
				children: description
			})
		]
	});
}
function Metric({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-gray-50 p-3 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-gray-500",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-bold",
			children: value
		})]
	});
}
function Factor({ title, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-gray-50 p-4 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-lg font-bold text-green-700",
			children: value
		})]
	});
}
//#endregion
export { MarketOpportunity as component };
