import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DtNBHlnt.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as useAuth } from "./router-CBtCpRAA.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { S as Leaf, a as Tag, d as Search, f as Plus, j as CircleCheckBig, l as ShoppingCart, m as Package, t as X, x as LoaderCircle, y as MapPin } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/residues-BjQL3srJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY_SELL_FORM = {
	crop_name: "",
	residue_type: "",
	quantity: "",
	unit: "kg",
	price: "",
	location: "",
	description: ""
};
function CropResidues() {
	const { user } = useAuth();
	const [residues, setResidues] = (0, import_react.useState)([]);
	const [filteredResidues, setFilteredResidues] = (0, import_react.useState)([]);
	const [search, setSearch] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [buying, setBuying] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [success, setSuccess] = (0, import_react.useState)("");
	const [showSellForm, setShowSellForm] = (0, import_react.useState)(false);
	const [selectedResidue, setSelectedResidue] = (0, import_react.useState)(null);
	const [sellForm, setSellForm] = (0, import_react.useState)(EMPTY_SELL_FORM);
	const [buyForm, setBuyForm] = (0, import_react.useState)({ quantity: "" });
	(0, import_react.useEffect)(() => {
		loadResidues();
	}, []);
	(0, import_react.useEffect)(() => {
		const query = search.trim().toLowerCase();
		if (!query) {
			setFilteredResidues(residues);
			return;
		}
		const filtered = residues.filter((item) => {
			return [
				item.residue_type,
				item.description,
				item.state,
				item.district,
				item.village,
				item.unit,
				String(item.price ?? "")
			].filter(Boolean).join(" ").toLowerCase().includes(query);
		});
		setFilteredResidues(filtered);
	}, [search, residues]);
	async function loadResidues() {
		setLoading(true);
		setError("");
		try {
			const { data, error: loadError } = await supabase.from("crop_residues").select("*").order("created_at", { ascending: false });
			if (loadError) {
				console.error("Crop residue loading error:", loadError);
				setError(loadError.message || "Unable to load crop residues.");
				setResidues([]);
				setFilteredResidues([]);
				return;
			}
			const items = (data ?? []).map((row) => ({
				id: String(row.id),
				owner_id: String(row.owner_id),
				residue_type: row.residue_type ?? null,
				quantity: row.quantity != null ? Number(row.quantity) : null,
				unit: row.unit ?? null,
				price: row.price != null ? Number(row.price) : null,
				description: row.description ?? null,
				state: row.state ?? null,
				district: row.district ?? null,
				village: row.village ?? null,
				image_url: row.image_url ?? null,
				created_at: String(row.created_at ?? "")
			}));
			setResidues(items);
			setFilteredResidues(items);
		} catch (err) {
			console.error("Unexpected crop residue error:", err);
			setError("Something went wrong while loading crop residues.");
			setResidues([]);
			setFilteredResidues([]);
		} finally {
			setLoading(false);
		}
	}
	function updateSellField(field, value) {
		setSellForm((previous) => ({
			...previous,
			[field]: value
		}));
	}
	function openSellForm() {
		setError("");
		setSuccess("");
		if (!user) {
			setError("Please sign in before listing crop residue.");
			return;
		}
		setSellForm({ ...EMPTY_SELL_FORM });
		setShowSellForm(true);
	}
	function closeSellForm() {
		if (saving) return;
		setShowSellForm(false);
		setSellForm({ ...EMPTY_SELL_FORM });
	}
	async function handleSellResidue(event) {
		event.preventDefault();
		setError("");
		setSuccess("");
		if (!user) {
			setError("Please sign in before listing crop residue.");
			return;
		}
		const cropName = sellForm.crop_name.trim();
		const residueType = sellForm.residue_type.trim();
		const quantity = Number(sellForm.quantity);
		const price = Number(sellForm.price);
		const location = sellForm.location.trim();
		const description = sellForm.description.trim();
		if (!cropName) {
			setError("Please enter the crop name.");
			return;
		}
		if (!residueType) {
			setError("Please enter the residue type.");
			return;
		}
		if (!sellForm.quantity.trim() || !Number.isFinite(quantity) || quantity <= 0) {
			setError("Please enter a valid quantity.");
			return;
		}
		if (!sellForm.price.trim() || !Number.isFinite(price) || price < 0) {
			setError("Please enter a valid price.");
			return;
		}
		if (!location) {
			setError("Please enter the location.");
			return;
		}
		setSaving(true);
		try {
			const { error: insertError } = await supabase.from("crop_residues").insert({
				owner_id: user.id,
				residue_type: `${cropName} - ${residueType}`,
				quantity,
				unit: sellForm.unit || "kg",
				price,
				village: location,
				description: description || null
			});
			if (insertError) {
				console.error("Crop residue insert error:", insertError);
				setError(insertError.message || "Unable to create crop residue listing.");
				return;
			}
			setSuccess("Your crop residue has been listed successfully!");
			setShowSellForm(false);
			setSellForm({ ...EMPTY_SELL_FORM });
			await loadResidues();
		} catch (err) {
			console.error("Sell residue error:", err);
			setError("Something went wrong while creating the listing.");
		} finally {
			setSaving(false);
		}
	}
	function openBuyForm(residue) {
		setError("");
		setSuccess("");
		if (!user) {
			setError("Please sign in before buying crop residue.");
			return;
		}
		if (residue.owner_id === user.id) {
			setError("You cannot buy your own crop residue listing.");
			return;
		}
		setSelectedResidue(residue);
		setBuyForm({ quantity: String(residue.quantity ?? 1) });
	}
	function closeBuyForm() {
		if (buying) return;
		setSelectedResidue(null);
		setBuyForm({ quantity: "" });
	}
	async function handleBuyResidue(event) {
		event.preventDefault();
		setError("");
		setSuccess("");
		if (!user) {
			setError("Please sign in before buying.");
			return;
		}
		if (!selectedResidue) {
			setError("Please select a residue first.");
			return;
		}
		const quantity = Number(buyForm.quantity);
		if (!buyForm.quantity.trim() || !Number.isFinite(quantity) || quantity <= 0) {
			setError("Please enter a valid quantity.");
			return;
		}
		const availableQuantity = Number(selectedResidue.quantity ?? 0);
		if (availableQuantity > 0 && quantity > availableQuantity) {
			setError(`Only ${availableQuantity} ${selectedResidue.unit ?? ""} is available.`);
			return;
		}
		const totalPrice = quantity * Number(selectedResidue.price ?? 0);
		setBuying(true);
		try {
			const { error: orderError } = await supabase.from("crop_residue_orders").insert({
				residue_id: selectedResidue.id,
				buyer_id: user.id,
				quantity,
				unit: selectedResidue.unit ?? "kg",
				total_price: totalPrice,
				status: "pending"
			});
			if (orderError) {
				console.error("Crop residue order error:", orderError);
				setError(orderError.message || "Unable to place the order.");
				return;
			}
			setSuccess("Purchase request sent successfully!");
			closeBuyForm();
		} catch (err) {
			console.error("Buy residue error:", err);
			setError("Something went wrong while placing the order.");
		} finally {
			setBuying(false);
		}
	}
	function getTotalPrice() {
		if (!selectedResidue) return 0;
		const quantity = Number(buyForm.quantity);
		if (!Number.isFinite(quantity)) return 0;
		return quantity * Number(selectedResidue.price ?? 0);
	}
	function getLocation(residue) {
		return [
			residue.village,
			residue.district,
			residue.state
		].filter(Boolean).join(", ");
	}
	function getCropName(residue) {
		const value = residue.residue_type?.trim();
		if (!value) return "Crop Residue";
		const separator = value.indexOf(" - ");
		if (separator > 0) return value.slice(0, separator).trim();
		return value;
	}
	function getResidueType(residue) {
		const value = residue.residue_type?.trim();
		if (!value) return "";
		const separator = value.indexOf(" - ");
		if (separator > 0) return value.slice(separator + 3).trim();
		return value;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#faf9f1] px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-12 w-12 items-center justify-center rounded-full bg-green-100",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-6 w-6 text-green-700" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl font-semibold text-slate-900 sm:text-4xl",
								children: "Crop Residues"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base text-slate-600 sm:text-lg",
							children: "Buy and sell useful agricultural crop residues around you."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								className: "border-green-700 text-green-700 hover:bg-green-50",
								onClick: () => {
									setError("");
									setSuccess("");
									if (!user) setError("Please sign in before buying crop residue.");
									else if (filteredResidues.length === 0) setSuccess("No residue listings are currently available.");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "mr-2 h-5 w-5" }), "Buy Residue"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								className: "bg-green-700 hover:bg-green-800",
								onClick: openSellForm,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-5 w-5" }), "Sell Residue"]
							})]
						})]
					}),
					success && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-5 w-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: success })]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setError(""),
								className: "text-red-600 hover:text-red-900",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-8 rounded-2xl border bg-white p-5 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: search,
								onChange: (event) => setSearch(event.target.value),
								placeholder: "Search wheat straw, rice husk, sugarcane residue...",
								className: "h-14 pl-12 text-base sm:text-lg"
							})]
						})
					}),
					loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex min-h-[300px] items-center justify-center rounded-2xl border bg-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 text-slate-600",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin" }), "Loading crop residues..."]
						})
					}),
					!loading && error && residues.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-red-200 bg-red-50 p-8 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mb-2 text-xl font-semibold text-red-800",
								children: "Could not load crop residues"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-5 text-red-700",
								children: error
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								onClick: () => void loadResidues(),
								className: "bg-green-700 hover:bg-green-800",
								children: "Try Again"
							})
						]
					}),
					!loading && !error && filteredResidues.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border bg-white p-16 text-center shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "mx-auto mb-5 h-14 w-14 text-green-700" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mb-2 text-2xl font-semibold text-slate-900",
								children: search ? "No crop residues found" : "No crop residues listed yet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-6 text-slate-600",
								children: search ? "Try another search term." : "Be the first farmer to sell crop residue."
							}),
							!search && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								onClick: openSellForm,
								className: "bg-green-700 hover:bg-green-800",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-5 w-5" }), "Sell Crop Residue"]
							})
						]
					}),
					!loading && filteredResidues.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-lg text-slate-600",
							children: [
								filteredResidues.length,
								" residue",
								filteredResidues.length !== 1 ? "s" : "",
								" ",
								"found"
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
						children: filteredResidues.map((residue) => {
							const isOwner = user?.id === residue.owner_id;
							const location = getLocation(residue);
							const cropName = getCropName(residue);
							const residueType = getResidueType(residue);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md",
								children: [residue.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-44 overflow-hidden bg-green-50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: residue.image_url,
										alt: cropName,
										className: "h-full w-full object-cover"
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-44 items-center justify-center bg-green-50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-20 w-20 text-green-700" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-3 flex items-start justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-xl font-semibold text-slate-900",
												children: cropName
											}), residueType && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-sm text-slate-500",
												children: residueType
											})] }), residue.price != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "whitespace-nowrap rounded-lg bg-green-50 px-3 py-1 font-semibold text-green-700",
												children: [
													"₹",
													residue.price,
													residue.unit ? `/${residue.unit}` : ""
												]
											})]
										}),
										residue.quantity != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-3 flex items-center gap-2 text-slate-700",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4 text-green-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Available:" }),
												" ",
												residue.quantity,
												" ",
												residue.unit ?? ""
											] })]
										}),
										location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-3 flex items-center gap-2 text-slate-600",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 shrink-0 text-green-700" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: location })]
										}),
										residue.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mb-5 line-clamp-3 text-sm text-slate-600",
											children: residue.description
										}),
										isOwner ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 py-3 text-sm font-medium text-slate-600",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "h-4 w-4" }), "Your Listing"]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											className: "w-full bg-green-700 hover:bg-green-800",
											onClick: () => openBuyForm(residue),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "mr-2 h-5 w-5" }), "Buy Residue"]
										})
									]
								})]
							}, residue.id);
						})
					})] })
				]
			}),
			showSellForm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sticky top-0 flex items-center justify-between border-b bg-white px-6 py-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-semibold text-slate-900",
							children: "Sell Crop Residue"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-slate-500",
							children: "Add your agricultural residue for buyers."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: closeSellForm,
							className: "rounded-full p-2 hover:bg-slate-100",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSellResidue,
						className: "space-y-5 p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-2 block font-medium text-slate-700",
								children: "Crop Name *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: sellForm.crop_name,
								onChange: (event) => updateSellField("crop_name", event.target.value),
								placeholder: "e.g. Wheat",
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-2 block font-medium text-slate-700",
								children: "Residue Type *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: sellForm.residue_type,
								onChange: (event) => updateSellField("residue_type", event.target.value),
								placeholder: "e.g. Wheat Straw",
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-2 block font-medium text-slate-700",
									children: "Quantity *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									min: "0.01",
									step: "0.01",
									value: sellForm.quantity,
									onChange: (event) => updateSellField("quantity", event.target.value),
									placeholder: "e.g. 500",
									required: true
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-2 block font-medium text-slate-700",
									children: "Unit *"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: sellForm.unit,
									onChange: (event) => updateSellField("unit", event.target.value),
									className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "kg",
											children: "Kilogram (kg)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "quintal",
											children: "Quintal"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "ton",
											children: "Ton"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "bundle",
											children: "Bundle"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "bale",
											children: "Bale"
										})
									]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-2 block font-medium text-slate-700",
								children: "Price per Unit (₹) *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: "0",
								step: "0.01",
								value: sellForm.price,
								onChange: (event) => updateSellField("price", event.target.value),
								placeholder: "e.g. 8",
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-2 block font-medium text-slate-700",
								children: "Location *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: sellForm.location,
								onChange: (event) => updateSellField("location", event.target.value),
								placeholder: "Village / District / State",
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-2 block font-medium text-slate-700",
								children: "Description"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: sellForm.description,
								onChange: (event) => updateSellField("description", event.target.value),
								placeholder: "Add details about quality, condition, pickup, etc.",
								className: "min-h-[110px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									className: "flex-1",
									onClick: closeSellForm,
									disabled: saving,
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									className: "flex-1 bg-green-700 hover:bg-green-800",
									disabled: saving,
									children: saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-5 w-5 animate-spin" }), "Listing..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-5 w-5" }), "List Residue"] })
								})]
							})
						]
					})]
				})
			}),
			selectedResidue && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-lg rounded-2xl bg-white shadow-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b px-6 py-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-semibold text-slate-900",
							children: "Buy Crop Residue"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-slate-500",
							children: "Send a purchase request to the seller."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: closeBuyForm,
							className: "rounded-full p-2 hover:bg-slate-100",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-6 w-6" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleBuyResidue,
						className: "space-y-5 p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-green-50 p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-semibold text-slate-900",
										children: getCropName(selectedResidue)
									}),
									getResidueType(selectedResidue) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-slate-600",
										children: getResidueType(selectedResidue)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 font-medium text-green-700",
										children: [
											"₹",
											selectedResidue.price ?? 0,
											"/",
											selectedResidue.unit ?? "kg"
										]
									}),
									selectedResidue.quantity != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-slate-600",
										children: [
											"Available:",
											" ",
											selectedResidue.quantity,
											" ",
											selectedResidue.unit ?? ""
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-2 block font-medium text-slate-700",
								children: "Quantity *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: "0.01",
								step: "0.01",
								value: buyForm.quantity,
								onChange: (event) => setBuyForm({ quantity: event.target.value }),
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between rounded-xl border bg-slate-50 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-slate-700",
									children: "Estimated Total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-2xl font-bold text-green-700",
									children: ["₹", getTotalPrice().toFixed(2)]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									className: "flex-1",
									onClick: closeBuyForm,
									disabled: buying,
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									className: "flex-1 bg-green-700 hover:bg-green-800",
									disabled: buying,
									children: buying ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-5 w-5 animate-spin" }), "Processing..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "mr-2 h-5 w-5" }), "Confirm Buy"] })
								})]
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { CropResidues as component };
