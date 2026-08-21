import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DtNBHlnt.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as useAuth, r as Route$1 } from "./router-CBtCpRAA.mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { t as Label } from "./label-B4PTMSG2.mjs";
import { c as SlidersHorizontal, d as Search, o as Star, x as LoaderCircle, y as MapPin, z as BadgeCheck } from "../_libs/lucide-react.mjs";
import { i as categoryImage, l as scoreMachinery, r as MACHINERY_CATEGORIES, s as formatINR, u as toISODate } from "./kisan-ratsXnAN.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DUy71i1r.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/radix-ui__react-slider.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/machinery.index-BunogeCU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MachineryCard({ item, distance, matchScore, reasons, best }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card-surface flex flex-col overflow-hidden transition-shadow hover:shadow-[var(--shadow-lift)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: item.image_url || categoryImage(item.category),
					alt: item.name,
					loading: "lazy",
					width: 1024,
					height: 640,
					className: "h-44 w-full object-cover"
				}),
				typeof matchScore === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow",
					children: [
						best ? "⭐ Best Match · " : "",
						matchScore,
						"% match"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute right-3 top-3 rounded-full bg-card/95 px-3 py-1 text-xs font-semibold",
					children: item.category
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-2 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-semibold leading-tight",
						children: item.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex shrink-0 items-center gap-1 text-sm font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-warning text-warning" }), Number(item.rating).toFixed(1)]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: [item.brand, item.model].filter(Boolean).join(" · ") || "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-1 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }),
						[item.village, item.district].filter(Boolean).join(", ") || "Location not set",
						distance != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-foreground",
							children: [
								"· ",
								distance,
								" km away"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: item.profiles?.name ?? "Farmer"
					}), item.profiles?.is_verified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-2 inline-flex items-center gap-1 rounded-full bg-success/12 px-2 py-0.5 text-xs font-medium text-success",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-3.5 w-3.5" }), " Verified"]
					})]
				}),
				reasons && reasons.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-1 space-y-0.5 text-xs text-muted-foreground",
					children: reasons.slice(0, 4).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["✓ ", r] }, r))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex items-center justify-between pt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-lg font-semibold",
						children: [formatINR(item.price_per_day), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-normal text-muted-foreground",
							children: "/day"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/machinery/$id",
						params: { id: item.id },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							children: "View Details"
						})
					})]
				})
			]
		})]
	});
}
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Slider$1.displayName;
function useMachineryData() {
	return useQuery({
		queryKey: ["machinery-all"],
		queryFn: async () => {
			const [machineryRes, bookingRes] = await Promise.all([supabase.from("machinery").select("*, profiles:owner_id(id, name, is_verified, rating, phone)").eq("is_active", true).order("created_at", { ascending: false }), supabase.from("bookings").select("machinery_id, start_date, end_date, status").in("status", ["pending", "confirmed"])]);
			if (machineryRes.error) throw machineryRes.error;
			if (bookingRes.error) throw bookingRes.error;
			const bookings = bookingRes.data ?? [];
			const byMachine = /* @__PURE__ */ new Map();
			for (const booking of bookings) {
				const list = byMachine.get(booking.machinery_id) ?? [];
				list.push({
					start: booking.start_date,
					end: booking.end_date
				});
				byMachine.set(booking.machinery_id, list);
			}
			return {
				machinery: machineryRes.data ?? [],
				bookedRanges: byMachine
			};
		}
	});
}
function MarketPlace() {
	const search = Route$1.useSearch();
	const navigate = useNavigate();
	const { profile } = useAuth();
	const { data, isLoading, error, refetch } = useMachineryData();
	const [text, setText] = (0, import_react.useState)(search.q);
	const [category, setCategory] = (0, import_react.useState)(search.category || "all");
	const [district, setDistrict] = (0, import_react.useState)("all");
	const [start, setStart] = (0, import_react.useState)(search.start);
	const [end, setEnd] = (0, import_react.useState)(search.end);
	const [maxPrice, setMaxPrice] = (0, import_react.useState)(5e3);
	const [minRating, setMinRating] = (0, import_react.useState)("0");
	const [sort, setSort] = (0, import_react.useState)("best");
	const [showFilters, setShowFilters] = (0, import_react.useState)(false);
	const districts = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		(data?.machinery ?? []).forEach((machine) => {
			if (machine.district) set.add(machine.district);
		});
		return Array.from(set).sort();
	}, [data]);
	const results = (0, import_react.useMemo)(() => {
		const list = data?.machinery ?? [];
		if (list.length === 0) return [];
		const prices = list.map((machine) => Number(machine.price_per_day));
		const context = {
			minPrice: Math.min(...prices),
			maxPrice: Math.max(...prices)
		};
		const scored = list.filter((machine) => {
			if (category !== "all" && machine.category !== category) return false;
			if (district !== "all" && machine.district !== district) return false;
			if (Number(machine.price_per_day) > maxPrice) return false;
			if (Number(machine.rating) < Number(minRating)) return false;
			if (text.trim()) {
				const haystack = `
            ${machine.name}
            ${machine.category}
            ${machine.brand ?? ""}
            ${machine.model ?? ""}
            ${machine.village ?? ""}
            ${machine.district ?? ""}
          `.toLowerCase();
				if (!text.toLowerCase().trim().split(/\s+/).filter(Boolean).some((word) => haystack.includes(word))) return false;
			}
			if (start && end) {
				if ((data?.bookedRanges.get(machine.id) ?? []).some((range) => start <= range.end && end >= range.start)) return false;
				if (machine.available_from && machine.available_from > start) return false;
				if (machine.available_until && machine.available_until < end) return false;
			}
			return true;
		}).map((machine) => {
			return {
				item: machine,
				...scoreMachinery(machine, {
					text,
					category,
					startDate: start,
					endDate: end,
					userLat: profile?.latitude ?? null,
					userLng: profile?.longitude ?? null
				}, {
					...context,
					bookedRanges: data?.bookedRanges.get(machine.id) ?? []
				})
			};
		});
		scored.sort((a, b) => {
			switch (sort) {
				case "nearest": return (a.distance ?? 1e9) - (b.distance ?? 1e9);
				case "price": return Number(a.item.price_per_day) - Number(b.item.price_per_day);
				case "rating": return Number(b.item.rating) - Number(a.item.rating);
				default: return b.score - a.score;
			}
		});
		return scored;
	}, [
		data,
		category,
		district,
		maxPrice,
		minRating,
		text,
		start,
		end,
		sort,
		profile
	]);
	const applySearch = (e) => {
		e.preventDefault();
		navigate({
			to: "/machinery",
			search: {
				q: text.trim(),
				category: category !== "all" ? category : "",
				start,
				end
			},
			replace: true
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold",
				children: "Find Machinery"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Listings from farmers around you, ranked by our smart matching engine."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: applySearch,
				className: "card-surface space-y-3 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "h-12 pl-9",
									placeholder: "Search tractor, harvester, rotavator…",
									value: text,
									onChange: (e) => setText(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "h-12 px-6",
								children: "Search"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								className: "h-12",
								onClick: () => setShowFilters((value) => !value),
								"aria-label": "Filters",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "h-5 w-5" })
							})
						]
					}),
					showFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 border-t border-border pt-4 sm:grid-cols-2 lg:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: category,
									onValueChange: setCategory,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "h-11",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "all",
										children: "All categories"
									}), MACHINERY_CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: item,
										children: item
									}, item))] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "District" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: district,
									onValueChange: setDistrict,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "h-11",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "all",
										children: "All districts"
									}), districts.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: item,
										children: item
									}, item))] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Minimum rating" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: minRating,
									onValueChange: setMinRating,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "h-11",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "0",
											children: "Any rating"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "4",
											children: "4.0 and above"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "4.5",
											children: "4.5 and above"
										})
									] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "start",
									children: "Available from"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "start",
									type: "date",
									className: "h-11",
									value: start,
									min: toISODate(/* @__PURE__ */ new Date()),
									onChange: (e) => setStart(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "end",
									children: "Available until"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "end",
									type: "date",
									className: "h-11",
									value: end,
									min: start || toISODate(/* @__PURE__ */ new Date()),
									onChange: (e) => setEnd(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [
									"Max price: ₹",
									maxPrice,
									"/day"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									value: [maxPrice],
									min: 100,
									max: 5e3,
									step: 50,
									onValueChange: (value) => setMaxPrice(value[0] ?? 5e3)
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2 border-t border-border pt-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted-foreground",
							children: "Sort by"
						}), [
							["best", "Best Match"],
							["nearest", "Nearest"],
							["price", "Lowest Price"],
							["rating", "Highest Rated"]
						].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: sort === key ? "default" : "outline",
							onClick: () => setSort(key),
							children: label
						}, key))]
					})
				]
			}),
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" })
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-surface p-6 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-destructive",
					children: [
						"Could not load machinery:",
						" ",
						error.message
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3",
					onClick: () => void refetch(),
					children: "Retry"
				})]
			}),
			!isLoading && !error && results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-surface p-10 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "No machinery matches your filters."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Try widening the price range, clearing dates or choosing another category."
				})]
			}),
			results.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [results.length, " machines found"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: results.map((result, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MachineryCard, {
					item: result.item,
					distance: result.distance ?? null,
					matchScore: sort === "best" ? result.score : 0,
					reasons: sort === "best" ? result.reasons : [],
					best: sort === "best" && index === 0
				}, result.item.id))
			})] })
		]
	});
}
//#endregion
export { MarketPlace as component, useMachineryData };
