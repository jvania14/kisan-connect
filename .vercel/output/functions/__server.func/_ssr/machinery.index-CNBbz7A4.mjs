import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { $ as ChevronRight, I as MapPin, S as Search, V as IndianRupee, b as ShieldCheck, it as CalendarDays, n as X, p as Tractor, q as Clock3, t as Zap, v as SlidersHorizontal } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/machinery.index-CNBbz7A4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MACHINERY = [
	{
		id: "tractor-1",
		name: "Mahindra 575 DI Tractor",
		category: "Tractor",
		owner: "Ramesh Patil",
		location: "Nashik",
		distance: 12,
		hourlyRate: 700,
		dailyRate: 4500,
		availability: "Available today",
		rating: 4.8,
		reviews: 27,
		verified: true,
		suitableFor: "Field preparation • Transport"
	},
	{
		id: "harvester-1",
		name: "Sonalika Multi Crop Harvester",
		category: "Harvester",
		owner: "Maharashtra Farm Services",
		location: "Nashik",
		distance: 18,
		hourlyRate: 1200,
		dailyRate: 8e3,
		availability: "Available tomorrow",
		rating: 4.7,
		reviews: 19,
		verified: true,
		suitableFor: "Wheat • Soybean • Pulses"
	},
	{
		id: "rotavator-1",
		name: "Fieldking Rotavator",
		category: "Rotavator",
		owner: "Ganesh Shinde",
		location: "Ahmednagar",
		distance: 24,
		hourlyRate: 550,
		dailyRate: 3200,
		availability: "Available today",
		rating: 4.6,
		reviews: 14,
		verified: true,
		suitableFor: "Seedbed preparation"
	},
	{
		id: "cultivator-1",
		name: "Heavy Duty Cultivator",
		category: "Cultivator",
		owner: "Shivaji Agro Rentals",
		location: "Pune",
		distance: 38,
		hourlyRate: 450,
		dailyRate: 2800,
		availability: "Available in 2 days",
		rating: 4.5,
		reviews: 11,
		verified: true,
		suitableFor: "Soil cultivation"
	},
	{
		id: "seeder-1",
		name: "Precision Seed Drill",
		category: "Seeder",
		owner: "Kisan Equipment Hub",
		location: "Pune",
		distance: 42,
		hourlyRate: 600,
		dailyRate: 3500,
		availability: "Available today",
		rating: 4.7,
		reviews: 16,
		verified: true,
		suitableFor: "Soybean • Wheat • Pulses"
	},
	{
		id: "tractor-2",
		name: "Swaraj 744 FE Tractor",
		category: "Tractor",
		owner: "Vijay More",
		location: "Washim",
		distance: 56,
		hourlyRate: 650,
		dailyRate: 4200,
		availability: "Available today",
		rating: 4.4,
		reviews: 9,
		verified: false,
		suitableFor: "Ploughing • Transport"
	}
];
var CATEGORIES = [
	"All",
	"Tractor",
	"Harvester",
	"Rotavator",
	"Cultivator",
	"Seeder"
];
function MachineryMarketplace() {
	const navigate = useNavigate();
	const [search, setSearch] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("All");
	const [maxDistance, setMaxDistance] = (0, import_react.useState)(100);
	const [sortBy, setSortBy] = (0, import_react.useState)("distance");
	const [selectedMachine, setSelectedMachine] = (0, import_react.useState)(null);
	const filteredMachinery = (0, import_react.useMemo)(() => {
		const query = search.trim().toLowerCase();
		return [...MACHINERY.filter((machine) => {
			const matchesSearch = !query || machine.name.toLowerCase().includes(query) || machine.owner.toLowerCase().includes(query) || machine.location.toLowerCase().includes(query) || machine.suitableFor.toLowerCase().includes(query);
			const matchesCategory = category === "All" || machine.category === category;
			const matchesDistance = machine.distance <= maxDistance;
			return matchesSearch && matchesCategory && matchesDistance;
		})].sort((a, b) => {
			if (sortBy === "price") return a.dailyRate - b.dailyRate;
			if (sortBy === "rating") return b.rating - a.rating;
			return a.distance - b.distance;
		});
	}, [
		search,
		category,
		maxDistance,
		sortBy
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "card-surface overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-between gap-5 md:flex-row md:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tractor, { className: "h-6 w-6 text-primary" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl font-bold",
									children: "Machinery Marketplace"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-secondary px-3 py-1 text-xs font-semibold",
									children: "Cost Reduction Module"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 max-w-2xl text-sm leading-6 text-muted-foreground",
								children: "Find nearby tractors and farm equipment without purchasing expensive machinery. Lower your cultivation cost and improve your final crop income."
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => navigate({ to: "/list-machinery" }),
							children: "List Your Machinery"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueCard, {
								icon: MapPin,
								title: "Nearby equipment",
								text: "Search by distance and location."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueCard, {
								icon: IndianRupee,
								title: "Transparent rental",
								text: "Compare hourly and daily rates."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueCard, {
								icon: ShieldCheck,
								title: "Verified owners",
								text: "Prefer trusted local providers."
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-2xl border border-primary/20 bg-primary/5 p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "mt-0.5 h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: "Why machinery matters to Kisan Connect"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-6 text-muted-foreground",
							children: "Lowering cultivation and harvesting costs can increase a farmer's net realization even when the mandi selling price stays unchanged."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: () => navigate({ to: "/dashboard" }),
						children: ["Check Market Prices", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-2 h-4 w-4" })]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "card-surface p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 md:flex-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: search,
									onChange: (event) => setSearch(event.target.value),
									placeholder: "Search tractor, harvester, rotavator...",
									className: "pl-9"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								onClick: () => {
									setSearch("");
									setCategory("All");
									setMaxDistance(100);
									setSortBy("distance");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "mr-2 h-4 w-4" }), "Reset"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setCategory(item),
								className: `rounded-full px-4 py-2 text-sm font-medium transition ${category === item ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/70"}`,
								children: item
							}, item))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 border-t border-border pt-4 md:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									children: "Maximum distance"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm font-semibold text-primary",
									children: [maxDistance, " km"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: "5",
								max: "100",
								step: "5",
								value: maxDistance,
								onChange: (event) => setMaxDistance(Number(event.target.value)),
								className: "w-full"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-2 block text-sm font-medium",
								children: "Sort machinery"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortButton, {
										active: sortBy === "distance",
										onClick: () => setSortBy("distance"),
										children: "Nearest"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortButton, {
										active: sortBy === "price",
										onClick: () => setSortBy("price"),
										children: "Lowest price"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortButton, {
										active: sortBy === "rating",
										onClick: () => setSortBy("rating"),
										children: "Top rated"
									})
								]
							})] })]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: "Available machinery"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						filteredMachinery.length,
						" machine",
						filteredMachinery.length !== 1 ? "s" : "",
						" ",
						"match your search"
					]
				})] })
			}),
			filteredMachinery.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyMachinery, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 md:grid-cols-2 xl:grid-cols-3",
				children: filteredMachinery.map((machine) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MachineryCard, {
					machine,
					onView: () => setSelectedMachine(machine)
				}, machine.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-surface p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "mt-0.5 h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold text-primary",
							children: "CONNECTED TO MARKET LINKAGE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-xl font-semibold",
							children: "Reduce cost. Improve net realization."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-3xl text-sm leading-6 text-muted-foreground",
							children: "Kisan Connect doesn't treat machinery as the main marketplace problem. It is a supporting service that helps farmers reduce operating costs so more of the crop's selling value reaches the farmer."
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-3 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Benefit, {
							title: "Without purchase",
							text: "Access equipment when you need it."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Benefit, {
							title: "Local availability",
							text: "Reduce waiting and transportation costs."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Benefit, {
							title: "Better economics",
							text: "Compare machinery cost before accepting a sale."
						})
					]
				})]
			}),
			selectedMachine && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MachineryDetails, {
				machine: selectedMachine,
				onClose: () => setSelectedMachine(null),
				onBook: () => {
					setSelectedMachine(null);
					navigate({ to: `/machinery/${selectedMachine.id}` });
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-secondary p-4 text-xs leading-5 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Prototype note:" }), " machinery listings, prices, distances and availability shown here are demonstration data. Production deployment should use verified owner profiles, real availability and location data."]
			})
		]
	});
}
function MachineryCard({ machine, onView }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card-surface overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex h-40 items-center justify-center bg-secondary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tractor, { className: "h-20 w-20 text-muted-foreground/40" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold",
					children: machine.category
				}),
				machine.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "absolute right-4 top-4 flex items-center gap-1 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }), "Verified"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: machine.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: ["Owner: ", machine.owner]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 text-sm font-semibold",
						children: ["★ ", machine.rating]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
							icon: MapPin,
							text: `${machine.distance} km • ${machine.location}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
							icon: Clock3,
							text: machine.availability
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoRow, {
							icon: Tractor,
							text: machine.suitableFor
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceBox, {
						label: "Per hour",
						value: `₹${machine.hourlyRate}`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceBox, {
						label: "Per day",
						value: `₹${machine.dailyRate}`
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "mt-4 w-full",
					onClick: onView,
					children: ["View Details", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-2 h-4 w-4" })]
				})
			]
		})]
	});
}
function MachineryDetails({ machine, onClose, onBook }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between border-b border-border p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold text-primary",
						children: machine.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-xl font-bold",
						children: machine.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							machine.owner,
							" • ",
							machine.location
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "rounded-lg p-2 hover:bg-secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Distance",
								value: `${machine.distance} km`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Rating",
								value: `★ ${machine.rating}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Reviews",
								value: machine.reviews.toString()
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-secondary p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: "Rental pricing"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceBox, {
								label: "Hourly",
								value: `₹${machine.hourlyRate}`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceBox, {
								label: "Daily",
								value: `₹${machine.dailyRate}`
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-semibold",
								children: "Availability"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: machine.availability
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-primary/20 bg-primary/5 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: "Why this can improve your economics"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-6 text-muted-foreground",
							children: "Renting instead of purchasing can reduce fixed machinery costs. Compare this cost with your expected crop revenue before finalizing the sale."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "flex-1",
							onClick: onBook,
							children: "Request Booking"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: onClose,
							children: "Close"
						})]
					})
				]
			})]
		})
	});
}
function ValueCard({ icon: Icon, title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-9 w-9 items-center justify-center rounded-lg bg-secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-primary" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 text-sm font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs leading-5 text-muted-foreground",
				children: text
			})
		]
	});
}
function InfoRow({ icon: Icon, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: text
		})]
	});
}
function PriceBox({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-secondary p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-bold",
			children: value
		})]
	});
}
function SortButton({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: `rounded-lg px-3 py-2 text-xs font-medium ${active ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/70"}`,
		children
	});
}
function Metric({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-secondary p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-bold",
			children: value
		})]
	});
}
function Benefit({ title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs leading-5 text-muted-foreground",
			children: text
		})]
	});
}
function EmptyMachinery() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-surface p-10 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tractor, { className: "h-7 w-7 text-muted-foreground" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 font-semibold",
				children: "No machinery found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Try increasing the distance or changing your search filters."
			})
		]
	});
}
//#endregion
export { MachineryMarketplace as component };
