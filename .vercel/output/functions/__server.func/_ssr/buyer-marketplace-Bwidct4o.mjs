import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DtNBHlnt.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { r as useAuth } from "./router-DPCKUlNX.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { t as Label } from "./label-B4PTMSG2.mjs";
import { I as MapPin, O as Package, R as LoaderCircle, S as Search, V as IndianRupee, Z as CircleCheck, b as ShieldCheck, n as X, ut as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/buyer-marketplace-Bwidct4o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var db = supabase;
function formatMoney(value) {
	if (value === null || value === void 0 || Number.isNaN(Number(value))) return "—";
	return `₹${Number(value).toLocaleString("en-IN")}`;
}
function formatDate(value) {
	try {
		return new Date(value).toLocaleDateString("en-IN", {
			day: "numeric",
			month: "short",
			year: "numeric"
		});
	} catch {
		return "Recently";
	}
}
function BuyerMarketplace() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const [search, setSearch] = (0, import_react.useState)("");
	const [district, setDistrict] = (0, import_react.useState)("");
	const [selectedLot, setSelectedLot] = (0, import_react.useState)(null);
	const [offerPrice, setOfferPrice] = (0, import_react.useState)("");
	const [offerQuantity, setOfferQuantity] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	const [sending, setSending] = (0, import_react.useState)(false);
	const [success, setSuccess] = (0, import_react.useState)(false);
	const lotsQuery = useQuery({
		queryKey: ["buyer-marketplace-sale-lots"],
		queryFn: async () => {
			const { data, error } = await db.from("sale_lots").select("*").in("status", ["active", "offer_received"]).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const lots = lotsQuery.data ?? [];
	const filteredLots = (0, import_react.useMemo)(() => {
		const searchValue = search.trim().toLowerCase();
		const districtValue = district.trim().toLowerCase();
		return lots.filter((lot) => {
			const crop = lot.crop_name?.toLowerCase() ?? "";
			const grade = lot.grade?.toLowerCase() ?? "";
			const lotDistrict = lot.district?.toLowerCase() ?? "";
			const village = lot.village?.toLowerCase() ?? "";
			const matchesSearch = !searchValue || crop.includes(searchValue) || grade.includes(searchValue) || lotDistrict.includes(searchValue) || village.includes(searchValue);
			const matchesDistrict = !districtValue || lotDistrict.includes(districtValue);
			return matchesSearch && matchesDistrict;
		});
	}, [
		lots,
		search,
		district
	]);
	function openOffer(lot) {
		setSelectedLot(lot);
		setOfferPrice(lot.expected_price ? String(lot.expected_price) : "");
		setOfferQuantity(String(lot.quantity));
		setMessage("");
		setSuccess(false);
	}
	function closeOffer() {
		setSelectedLot(null);
		setOfferPrice("");
		setOfferQuantity("");
		setMessage("");
		setSuccess(false);
	}
	async function submitOffer() {
		if (!user?.id) {
			alert("Please log in before making an offer.");
			return;
		}
		if (!selectedLot) return;
		if (selectedLot.farmer_id === user.id) {
			alert("You cannot make an offer on your own sale lot.");
			return;
		}
		const price = Number(offerPrice);
		const quantity = Number(offerQuantity);
		if (!Number.isFinite(price) || price <= 0) {
			alert("Please enter a valid offer price.");
			return;
		}
		if (!Number.isFinite(quantity) || quantity <= 0) {
			alert("Please enter a valid quantity.");
			return;
		}
		if (quantity > Number(selectedLot.quantity)) {
			alert(`Only ${selectedLot.quantity} ${selectedLot.unit} is available.`);
			return;
		}
		setSending(true);
		try {
			const { data: existingOffer, error: existingOfferError } = await db.from("buyer_offers").select("id").eq("sale_lot_id", selectedLot.id).eq("buyer_id", user.id).eq("status", "pending").maybeSingle();
			if (existingOfferError) throw existingOfferError;
			if (existingOffer) {
				alert("You already have a pending offer for this sale lot.");
				return;
			}
			const { error: offerError } = await db.from("buyer_offers").insert({
				sale_lot_id: selectedLot.id,
				buyer_id: user.id,
				offered_price: price,
				quantity,
				message: message.trim() || null,
				status: "pending"
			});
			if (offerError) throw offerError;
			const { error: lotUpdateError } = await db.from("sale_lots").update({ status: "offer_received" }).eq("id", selectedLot.id).eq("status", "active");
			if (lotUpdateError) console.warn("Sale lot status could not be updated:", lotUpdateError);
			try {
				await db.from("notifications").insert({
					user_id: selectedLot.farmer_id,
					type: "new_buyer_offer",
					title: "New Buyer Offer",
					message: `A buyer offered ${formatMoney(price)}/q for ${quantity} ${selectedLot.unit} of ${selectedLot.crop_name}.`,
					is_read: false
				});
			} catch (notificationError) {
				console.warn("Notification could not be created:", notificationError);
			}
			await queryClient.invalidateQueries({ queryKey: ["buyer-marketplace-sale-lots"] });
			setSuccess(true);
		} catch (error) {
			console.error("Offer submission error:", error);
			alert(error instanceof Error ? error.message : "Unable to submit the offer. Please try again.");
		} finally {
			setSending(false);
		}
	}
	if (lotsQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Loading farmer sale lots..." })]
		})
	});
	if (lotsQuery.error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto max-w-7xl px-4 py-10 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-3xl border border-red-200 bg-red-50 p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-7 w-7 text-red-600" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-bold text-red-800",
					children: "Unable to load marketplace"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto mt-2 max-w-xl text-sm leading-6 text-red-700",
					children: lotsQuery.error instanceof Error ? lotsQuery.error.message : "Something went wrong while loading sale lots."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-6",
					onClick: () => lotsQuery.refetch(),
					children: "Try Again"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "overflow-hidden rounded-3xl border bg-card shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6 sm:p-8 lg:p-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-3xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold tracking-wider text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" }), "DIRECT FARM MARKETPLACE"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-5 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
								children: "Find Fresh Crops Directly From Farmers"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg",
								children: "Discover available farmer lots, compare expected prices and submit a digital offer directly to the farmer."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid gap-3 md:grid-cols-[1fr_280px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: search,
								onChange: (event) => setSearch(event.target.value),
								placeholder: "Search tomato, onion, wheat...",
								className: "h-12 pl-10"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: district,
							onChange: (event) => setDistrict(event.target.value),
							placeholder: "Filter by district",
							className: "h-12"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid border-t sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketStat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-5 w-5" }),
							label: "Available Lots",
							value: lots.length
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketStat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "h-5 w-5" }),
							label: "Price Discovery",
							value: "Direct"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketStat, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" }),
							label: "Offer System",
							value: "Digital"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold tracking-[0.2em] text-primary",
						children: "AVAILABLE SUPPLY"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-2xl font-bold sm:text-3xl",
						children: "Farmer Sale Lots"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							"Showing",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: filteredLots.length
							}),
							" ",
							"of",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: lots.length
							}),
							" ",
							"lots"
						]
					})]
				}), filteredLots.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					search,
					district,
					onClear: () => {
						setSearch("");
						setDistrict("");
					}
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-5 md:grid-cols-2 xl:grid-cols-3",
					children: filteredLots.map((lot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotCard, {
						lot,
						onOffer: () => openOffer(lot)
					}, lot.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold tracking-[0.2em] text-primary",
						children: "SIMPLE DIGITAL TRADE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-2xl font-bold",
						children: "How Buyer-Seller Matching Works"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessCard, {
							number: "01",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-5 w-5" }),
							title: "Discover",
							description: "Browse crop lots published directly by farmers."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessCard, {
							number: "02",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "h-5 w-5" }),
							title: "Make an Offer",
							description: "Enter your price, quantity and requirements digitally."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProcessCard, {
							number: "03",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5" }),
							title: "Trade",
							description: "The farmer can accept the offer and continue the transaction."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 grid gap-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "h-5 w-5" }),
						title: "Transparent pricing",
						description: "Buyers can see the farmer's expected price before negotiating."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" }),
						title: "Digital records",
						description: "Every offer is linked to a specific crop lot for traceability."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5" }),
						title: "Local sourcing",
						description: "Find nearby farmer supply and reduce unnecessary transaction distance."
					})
				]
			}),
			selectedLot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferModal, {
				lot: selectedLot,
				offerPrice,
				offerQuantity,
				message,
				sending,
				success,
				setOfferPrice,
				setOfferQuantity,
				setMessage,
				onClose: closeOffer,
				onSubmit: submitOffer
			})
		]
	});
}
function LotCard({ lot, onOffer }) {
	const location = [
		lot.village,
		lot.district,
		lot.state
	].filter(Boolean).join(", ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group rounded-3xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: lot.status === "offer_received" ? "inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700" : "inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700",
						children: lot.status === "offer_received" ? "Offer Received" : "Available"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-4 text-2xl font-bold",
						children: lot.crop_name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							"Posted",
							" ",
							formatDate(lot.created_at)
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-2xl bg-primary/10 p-3 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-6 w-6" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataBox, {
						label: "Quantity",
						value: `${lot.quantity} ${lot.unit}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataBox, {
						label: "Quality",
						value: lot.grade || "Not specified"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataBox, {
						label: "Expected price",
						value: lot.expected_price ? `${formatMoney(lot.expected_price)}/q` : "Negotiable"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataBox, {
						label: "District",
						value: lot.district || "Not specified"
					})
				]
			}),
			lot.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 line-clamp-2 text-sm leading-6 text-muted-foreground",
				children: lot.description
			}),
			location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex items-start gap-2 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: location })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "mt-6 w-full",
				onClick: onOffer,
				children: ["Make an Offer", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" })]
			})
		]
	});
}
function OfferModal({ lot, offerPrice, offerQuantity, message, sending, success, setOfferPrice, setOfferQuantity, setMessage, onClose, onSubmit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl border bg-card p-6 shadow-2xl sm:p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold tracking-wide text-primary",
						children: "BUYER OFFER"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-2xl font-bold",
						children: lot.crop_name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							lot.quantity,
							" ",
							lot.unit,
							" available"
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Close",
					onClick: onClose,
					className: "rounded-full p-2 transition hover:bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}), success ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-8 w-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-5 text-xl font-bold text-emerald-800",
						children: "Offer Submitted Successfully"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-6 text-emerald-700",
						children: "Your offer has been recorded and sent to the farmer. The farmer can now accept or reject your offer."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-2xl bg-white/70 p-4 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-4 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Offer price"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [formatMoney(Number(offerPrice)), "/q"] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex justify-between gap-4 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Quantity"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
								offerQuantity,
								" ",
								lot.unit
							] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-6",
						onClick: onClose,
						children: "Done"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-7 rounded-2xl border bg-muted/40 p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Farmer expected"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-lg font-bold",
							children: lot.expected_price ? `${formatMoney(lot.expected_price)}/q` : "Negotiable"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Available"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-lg font-bold",
							children: [
								lot.quantity,
								" ",
								lot.unit
							]
						})] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-7 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: ["Your Offer Price", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: [" ", "(₹ / quintal)"]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: "1",
									value: offerPrice,
									onChange: (event) => setOfferPrice(event.target.value),
									placeholder: "3000",
									className: "h-11 pl-9"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [
									"Quantity (",
									lot.unit,
									")"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: "1",
									max: lot.quantity,
									value: offerQuantity,
									onChange: (event) => setOfferQuantity(event.target.value),
									className: "h-11"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										"Maximum available:",
										" ",
										lot.quantity,
										" ",
										lot.unit
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Message to Farmer" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: message,
								onChange: (event) => setMessage(event.target.value),
								placeholder: "Mention pickup date, payment terms, packaging or other requirements...",
								className: "min-h-[120px] w-full resize-none rounded-xl border bg-background px-3 py-3 text-sm outline-none transition focus:ring-2 focus:ring-primary/30"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 rounded-2xl border bg-primary/5 p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: "Transparent digital offer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs leading-5 text-muted-foreground",
							children: "Your price and quantity are recorded against this specific farmer sale lot. The farmer decides whether to accept the offer."
						})] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: onClose,
						disabled: sending,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: onSubmit,
						disabled: sending,
						children: sending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Sending..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Submit Offer", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })] })
					})]
				})
			] })]
		})
	});
}
function EmptyState({ search, district, onClear }) {
	const hasFilter = Boolean(search.trim() || district.trim());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-dashed p-12 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-6 w-6 text-muted-foreground" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-5 text-lg font-bold",
				children: "No sale lots found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground",
				children: hasFilter ? "Try changing your crop or district search." : "There are currently no active farmer sale lots."
			}),
			hasFilter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				className: "mt-5",
				onClick: onClear,
				children: "Clear Filters"
			})
		]
	});
}
function MarketStat({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 border-b p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 font-bold",
			children: value
		})] })]
	});
}
function DataBox({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-muted/50 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 truncate text-sm font-semibold",
			children: value
		})]
	});
}
function ProcessCard({ number, icon, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border bg-card p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary",
					children: icon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-2xl font-bold text-muted-foreground/30",
					children: number
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-5 font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm leading-6 text-muted-foreground",
				children: description
			})
		]
	});
}
function ValueCard({ icon, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border bg-card p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm leading-6 text-muted-foreground",
				children: description
			})
		]
	});
}
//#endregion
export { BuyerMarketplace as component };
