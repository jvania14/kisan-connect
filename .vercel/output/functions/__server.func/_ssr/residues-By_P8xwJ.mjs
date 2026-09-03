import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { B as IndianRupee, C as Recycle, D as Package, F as MapPin, R as Leaf, Z as CircleCheck, b as ShieldCheck, ct as BadgeCheck, dt as ArrowRight, n as X, q as Clock3, tt as Check, u as Truck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/residues-By_P8xwJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INITIAL_LISTINGS = [
	{
		id: 1,
		crop: "Wheat",
		residue: "Wheat Straw",
		quantity: 800,
		price: 320,
		location: "Nashik",
		buyerCount: 3,
		status: "Offer Received",
		created: "Today"
	},
	{
		id: 2,
		crop: "Rice",
		residue: "Rice Straw",
		quantity: 1200,
		price: 280,
		location: "Pune",
		buyerCount: 2,
		status: "Available",
		created: "2 days ago"
	},
	{
		id: 3,
		crop: "Sugarcane",
		residue: "Sugarcane Trash",
		quantity: 1500,
		price: 450,
		location: "Ahmednagar",
		buyerCount: 4,
		status: "Accepted",
		created: "4 days ago"
	}
];
var BUYERS = [
	{
		id: 1,
		name: "GreenFuel Energy",
		type: "Biomass / Bioenergy",
		price: 340,
		required: "500–2,000 kg",
		distance: "22 km",
		match: 97,
		purpose: "Biomass fuel"
	},
	{
		id: 2,
		name: "Maharashtra Cattle Feed",
		type: "Animal Feed",
		price: 330,
		required: "500–1,500 kg",
		distance: "31 km",
		match: 94,
		purpose: "Animal feed"
	},
	{
		id: 3,
		name: "EcoCompost Solutions",
		type: "Compost Producer",
		price: 300,
		required: "300–1,000 kg",
		distance: "18 km",
		match: 91,
		purpose: "Organic compost"
	}
];
function Residues() {
	const [listings, setListings] = (0, import_react.useState)(INITIAL_LISTINGS);
	const [selectedListing, setSelectedListing] = (0, import_react.useState)(INITIAL_LISTINGS[0]);
	const [selectedBuyer, setSelectedBuyer] = (0, import_react.useState)(null);
	const [showCreate, setShowCreate] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("available");
	const [newResidue, setNewResidue] = (0, import_react.useState)({
		crop: "Wheat",
		residue: "Wheat Straw",
		quantity: "800",
		price: "320",
		location: "Nashik"
	});
	const availableListings = listings.filter((item) => item.status === "Available" || item.status === "Offer Received");
	const offerListings = listings.filter((item) => item.status === "Offer Received" || item.status === "Accepted" || item.status === "Pickup Scheduled");
	const completedListings = listings.filter((item) => item.status === "Completed");
	const visibleListings = activeTab === "available" ? availableListings : activeTab === "offers" ? offerListings : completedListings;
	const totalQuantity = (0, import_react.useMemo)(() => listings.reduce((total, listing) => total + listing.quantity, 0), [listings]);
	const createListing = (event) => {
		event.preventDefault();
		const quantity = Number(newResidue.quantity) || 0;
		const price = Number(newResidue.price) || 0;
		const listing = {
			id: Date.now(),
			crop: newResidue.crop,
			residue: newResidue.residue,
			quantity,
			price,
			location: newResidue.location,
			buyerCount: 0,
			status: "Available",
			created: "Just now"
		};
		setListings((current) => [listing, ...current]);
		setSelectedListing(listing);
		setSelectedBuyer(null);
		setShowCreate(false);
		setActiveTab("available");
	};
	const acceptOffer = (buyer) => {
		if (!selectedListing) return;
		const updated = {
			...selectedListing,
			price: buyer.price,
			status: "Accepted"
		};
		setListings((current) => current.map((item) => item.id === selectedListing.id ? updated : item));
		setSelectedListing(updated);
		setSelectedBuyer(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-surface overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-between gap-5 md:flex-row md:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Recycle, { className: "h-6 w-6 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-primary",
									children: "RESIDUE EXCHANGE"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 text-3xl font-bold",
								children: "Turn Crop Residue Into Income"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-2xl text-sm text-muted-foreground",
								children: "Sell agricultural residue to verified biomass, feed, compost and bioenergy buyers instead of burning or leaving it unused."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "h-12",
							onClick: () => setShowCreate(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "mr-2 h-5 w-5" }), "List Residue"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
								label: "Active listings",
								value: availableListings.length.toString(),
								icon: Leaf
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
								label: "Residue listed",
								value: `${totalQuantity.toLocaleString("en-IN")} kg`,
								icon: Package
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
								label: "Buyer matches",
								value: listings.reduce((total, item) => total + item.buyerCount, 0).toString(),
								icon: ShieldCheck
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
								label: "Potential value",
								value: `₹${listings.reduce((total, item) => total + item.quantity / 100 * item.price, 0).toLocaleString("en-IN")}`,
								icon: IndianRupee
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-border px-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-6 overflow-x-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabButton, {
								active: activeTab === "available",
								onClick: () => setActiveTab("available"),
								children: ["Available", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabCount, { children: availableListings.length })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabButton, {
								active: activeTab === "offers",
								onClick: () => setActiveTab("offers"),
								children: ["Offers & Deals", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabCount, { children: offerListings.length })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabButton, {
								active: activeTab === "completed",
								onClick: () => setActiveTab("completed"),
								children: ["Completed", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabCount, { children: completedListings.length })]
							})
						]
					})
				})]
			}),
			showCreate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-surface border-primary/20 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-primary",
								children: "NEW RESIDUE LISTING"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-xl font-semibold",
								children: "List your agricultural residue"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Buyers will be matched according to residue type, quantity and location."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowCreate(false),
							className: "text-muted-foreground hover:text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: createListing,
						className: "mt-6 grid gap-4 md:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Crop",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: newResidue.crop,
									onChange: (event) => setNewResidue({
										...newResidue,
										crop: event.target.value
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Residue type",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
									value: newResidue.residue,
									onChange: (event) => setNewResidue({
										...newResidue,
										residue: event.target.value
									}),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Wheat Straw" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Rice Straw" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Sugarcane Trash" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Cotton Stalk" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Maize Stalk" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Groundnut Shell" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Other" })
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Quantity (kg)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: "1",
									value: newResidue.quantity,
									onChange: (event) => setNewResidue({
										...newResidue,
										quantity: event.target.value
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Expected price (₹/quintal)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: "1",
									value: newResidue.price,
									onChange: (event) => setNewResidue({
										...newResidue,
										price: event.target.value
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								label: "Location",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: newResidue.location,
									onChange: (event) => setNewResidue({
										...newResidue,
										location: event.target.value
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									className: "h-10 w-full",
									children: ["Publish Residue Listing", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: "Estimated additional income"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Based on your quantity and expected residue price."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-2xl font-bold",
								children: ["₹", ((Number(newResidue.quantity) || 0) / 100 * (Number(newResidue.price) || 0)).toLocaleString("en-IN")]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-primary",
					children: "YOUR RESIDUE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-semibold",
					children: activeTab === "available" ? "Available Residue" : activeTab === "offers" ? "Residue With Buyer Activity" : "Completed Exchanges"
				})]
			}), visibleListings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-surface p-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Recycle, { className: "mx-auto h-10 w-10 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-4 font-semibold",
						children: "No listings here yet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "List your crop residue to start finding buyers."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: visibleListings.map((listing) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResidueCard, {
					listing,
					selected: selectedListing?.id === listing.id,
					onClick: () => {
						setSelectedListing(listing);
						setSelectedBuyer(null);
					}
				}, listing.id))
			})] }),
			selectedListing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-between gap-4 md:flex-row md:items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-primary",
									children: "SELECTED LISTING"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: selectedListing.status })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 text-2xl font-bold",
								children: selectedListing.residue
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedListing.crop }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" }),
											selectedListing.quantity,
											" kg"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }), selectedListing.location]
									})
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-secondary px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Current price"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xl font-bold",
								children: [
									"₹",
									selectedListing.price.toLocaleString("en-IN"),
									"/q"
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
								label: "Quantity",
								value: `${selectedListing.quantity} kg`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
								label: "Buyer matches",
								value: `${selectedListing.buyerCount}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
								label: "Estimated value",
								value: `₹${(selectedListing.quantity / 100 * selectedListing.price).toLocaleString("en-IN")}`,
								highlight: true
							})
						]
					}),
					selectedListing.status !== "Completed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-primary",
								children: "VERIFIED BUYERS"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-semibold",
								children: "Who Can Use Your Residue?"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm text-muted-foreground",
								children: [BUYERS.length, " matches"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-3",
							children: BUYERS.map((buyer) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BuyerCard, {
								buyer,
								selected: selectedBuyer?.id === buyer.id,
								onClick: () => setSelectedBuyer(buyer)
							}, buyer.id))
						})]
					}),
					selectedBuyer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col justify-between gap-4 md:flex-row md:items-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-bold",
										children: selectedBuyer.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-5 w-5 text-primary" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [
										selectedBuyer.type,
										" •",
										" ",
										selectedBuyer.match,
										"% match"
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Buyer offer"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-2xl font-bold",
									children: [
										"₹",
										selectedBuyer.price.toLocaleString("en-IN"),
										"/q"
									]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 grid gap-3 sm:grid-cols-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
										label: "Required",
										value: selectedBuyer.required
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
										label: "Distance",
										value: selectedBuyer.distance
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
										label: "Purpose",
										value: selectedBuyer.purpose
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
										label: "Your quantity",
										value: `${selectedListing.quantity} kg`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
										label: "Estimated value",
										value: `₹${(selectedListing.quantity / 100 * selectedBuyer.price).toLocaleString("en-IN")}`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
										label: "Price difference",
										value: selectedBuyer.price >= selectedListing.price ? `+₹${(selectedBuyer.price - selectedListing.price).toLocaleString("en-IN")}/q` : `₹${(selectedBuyer.price - selectedListing.price).toLocaleString("en-IN")}/q`
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 flex flex-col gap-3 sm:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									className: "flex-1",
									onClick: () => acceptOffer(selectedBuyer),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-2 h-4 w-4" }), "Accept Offer"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									className: "flex-1",
									onClick: () => setSelectedBuyer(null),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "mr-2 h-4 w-4" }), "Close"]
								})]
							})
						]
					})
				]
			}),
			selectedListing && [
				"Accepted",
				"Pickup Scheduled",
				"Completed"
			].includes(selectedListing.status) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionTracker, { status: selectedListing.status }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueCard, {
						icon: IndianRupee,
						title: "Additional Income",
						text: "Convert residue that would otherwise have little or no market value into an additional revenue stream."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueCard, {
						icon: Recycle,
						title: "Reduce Burning",
						text: "Create a useful market for agricultural residue and encourage productive reuse instead of open-field burning."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueCard, {
						icon: Truck,
						title: "Local Buyers",
						text: "Match residue with nearby biomass, feed, compost and energy users to reduce transportation costs."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-2xl border border-primary/20 bg-primary/5 p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-1 h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: "Transparent residue marketplace"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Buyer prices and matches shown in this prototype are demonstration values. Production deployment should connect verified buyer accounts, location services, logistics and transaction records through Supabase."
					})] })]
				})
			})
		]
	});
}
function SummaryCard({ label, value, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-primary" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-2xl font-bold",
			children: value
		})]
	});
}
function TabButton({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: `border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap ${active ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`,
		children
	});
}
function TabCount({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "ml-2 rounded-full bg-secondary px-2 py-0.5 text-xs",
		children
	});
}
function ResidueCard({ listing, selected, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: `card-surface w-full text-left transition-all hover:-translate-y-0.5 ${selected ? "border-primary/40 ring-2 ring-primary/10" : ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: listing.residue
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							listing.crop,
							" • ",
							listing.quantity,
							" kg"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: listing.status })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
						label: "Expected",
						value: `₹${listing.price.toLocaleString("en-IN")}/q`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
						label: "Buyers",
						value: `${listing.buyerCount} matches`
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }), listing.location]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-primary",
						children: "View buyers →"
					})]
				})
			]
		})
	});
}
function BuyerCard({ buyer, selected, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `rounded-2xl border p-4 ${selected ? "border-primary/40 bg-primary/5" : "border-border"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col justify-between gap-4 lg:flex-row lg:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-semibold",
							children: buyer.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-4 w-4 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary",
							children: [buyer.match, "% match"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						buyer.type,
						" • ",
						buyer.purpose
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"₹",
							buyer.price.toLocaleString("en-IN"),
							"/q"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: buyer.required }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }), buyer.distance]
						})
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: selected ? "default" : "outline",
				onClick,
				children: ["View Offer", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
			})]
		})
	});
}
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `rounded-full px-2.5 py-1 text-xs font-semibold ${{
			Available: "bg-secondary text-foreground",
			"Offer Received": "bg-primary/10 text-primary",
			Accepted: "bg-primary/10 text-primary",
			"Pickup Scheduled": "bg-secondary text-foreground",
			Completed: "bg-primary text-primary-foreground"
		}[status]}`,
		children: status
	});
}
function TransactionTracker({ status }) {
	const accepted = [
		"Accepted",
		"Pickup Scheduled",
		"Completed"
	].includes(status);
	const pickup = ["Pickup Scheduled", "Completed"].includes(status);
	const completed = status === "Completed";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card-surface p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-primary",
					children: "EXCHANGE TRACKING"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-2xl font-semibold",
					children: "Residue transaction"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Track the residue exchange from accepted offer to pickup."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-5 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionStep, {
						icon: CircleCheck,
						label: "Offer Accepted",
						completed: accepted,
						active: !accepted
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionStep, {
						icon: Truck,
						label: "Pickup Scheduled",
						completed: pickup,
						active: accepted && !pickup
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionStep, {
						icon: CircleCheck,
						label: "Completed",
						completed,
						active: pickup && !completed
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-xl bg-secondary p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-semibold",
						children: ["Current status: ", status]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						status === "Accepted" && "The buyer offer has been accepted. Pickup can now be scheduled.",
						status === "Pickup Scheduled" && "Pickup has been scheduled with the buyer.",
						status === "Completed" && "Residue exchange completed successfully."
					]
				})]
			})
		]
	});
}
function TransactionStep({ icon: Icon, label, completed, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 md:flex-col md:justify-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${completed ? "bg-primary text-primary-foreground" : active ? "border-2 border-primary text-primary" : "border border-border text-muted-foreground"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `text-sm ${completed || active ? "font-semibold" : "text-muted-foreground"}`,
			children: label
		})]
	});
}
function InfoBox({ label, value, highlight }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-xl p-3 ${highlight ? "border border-primary/20 bg-primary/5" : "bg-secondary"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-semibold",
			children: value
		})]
	});
}
function FormField({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "text-sm font-medium",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2",
		children
	})] });
}
function ValueCard({ icon: Icon, title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6 text-primary" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm leading-6 text-muted-foreground",
				children: text
			})
		]
	});
}
//#endregion
export { Residues as component };
