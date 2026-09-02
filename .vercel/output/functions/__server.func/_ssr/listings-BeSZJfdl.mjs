import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DtNBHlnt.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { r as useAuth } from "./router-DPCKUlNX.mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { t as Label } from "./label-B4PTMSG2.mjs";
import { $ as ChevronRight, C as RefreshCw, I as MapPin, O as Package, Q as ChevronUp, R as LoaderCircle, T as Plus, V as IndianRupee, Z as CircleCheck, b as ShieldCheck, c as UserRound, d as Truck, et as ChevronDown, n as X, q as Clock3, tt as Check, ut as ArrowRight } from "../_libs/lucide-react.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/listings-BeSZJfdl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
function money(value) {
	if (value === null || value === void 0) return "—";
	return `₹${Number(value).toLocaleString("en-IN")}`;
}
function formatDate(value) {
	return new Date(value).toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function statusLabel(status) {
	switch (status) {
		case "active": return "Active";
		case "offer_received": return "Offers Received";
		case "accepted": return "Offer Accepted";
		case "sold": return "Sold";
		case "cancelled": return "Cancelled";
		default: return "Draft";
	}
}
function statusClass(status) {
	switch (status) {
		case "active": return "bg-emerald-100 text-emerald-700";
		case "offer_received": return "bg-amber-100 text-amber-700";
		case "accepted": return "bg-blue-100 text-blue-700";
		case "sold": return "bg-green-100 text-green-700";
		case "cancelled": return "bg-red-100 text-red-700";
		default: return "bg-muted text-muted-foreground";
	}
}
function useSaleLots(userId) {
	return useQuery({
		queryKey: ["sale-lots", userId],
		enabled: !!userId,
		queryFn: async () => {
			if (!userId) return [];
			const { data, error } = await supabase.from("sale_lots").select("*").eq("farmer_id", userId).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useOffers(userId) {
	return useQuery({
		queryKey: ["farmer-offers", userId],
		enabled: !!userId,
		queryFn: async () => {
			if (!userId) return [];
			const { data: lots, error: lotError } = await supabase.from("sale_lots").select("id").eq("farmer_id", userId);
			if (lotError) throw lotError;
			const lotIds = (lots ?? []).map((lot) => lot.id);
			if (lotIds.length === 0) return [];
			const { data, error } = await supabase.from("buyer_offers").select(`
          id,
          sale_lot_id,
          buyer_id,
          offered_price,
          quantity,
          message,
          status,
          created_at,
          buyer:buyer_id (
            id,
            name,
            is_verified,
            rating,
            phone
          )
        `).in("sale_lot_id", lotIds).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
}
function useTransactions(userId) {
	return useQuery({
		queryKey: ["market-transactions-farmer", userId],
		enabled: !!userId,
		queryFn: async () => {
			if (!userId) return [];
			const { data, error } = await supabase.from("market_transactions").select("*").eq("farmer_id", userId).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
}
function ListingsPage() {
	const { user, profile } = useAuth();
	useNavigate();
	const queryClient = useQueryClient();
	const [activeTab, setActiveTab] = (0, import_react.useState)("lots");
	const [selectedLot, setSelectedLot] = (0, import_react.useState)(null);
	const [showCreate, setShowCreate] = (0, import_react.useState)(false);
	const [crop, setCrop] = (0, import_react.useState)("Tomato");
	const [quantity, setQuantity] = (0, import_react.useState)("500");
	const [unit, setUnit] = (0, import_react.useState)("kg");
	const [grade, setGrade] = (0, import_react.useState)("Grade A");
	const [expectedPrice, setExpectedPrice] = (0, import_react.useState)("3000");
	const [description, setDescription] = (0, import_react.useState)("");
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [processingOffer, setProcessingOffer] = (0, import_react.useState)(null);
	const saleLotsQuery = useSaleLots(user?.id);
	const offersQuery = useOffers(user?.id);
	const transactionsQuery = useTransactions(user?.id);
	const lots = saleLotsQuery.data ?? [];
	const offers = offersQuery.data ?? [];
	const transactions = transactionsQuery.data ?? [];
	const activeLots = (0, import_react.useMemo)(() => lots.filter((lot) => lot.status !== "sold" && lot.status !== "cancelled"), [lots]);
	const completedLots = (0, import_react.useMemo)(() => lots.filter((lot) => lot.status === "sold" || lot.status === "cancelled"), [lots]);
	const pendingOffers = (0, import_react.useMemo)(() => offers.filter((offer) => offer.status === "pending"), [offers]);
	(0, import_react.useMemo)(() => offers.find((offer) => offer.status === "accepted"), [offers]);
	const currentTransaction = transactions[0];
	async function createSaleLot() {
		if (!user?.id) return;
		const numericQuantity = Number(quantity);
		const numericPrice = Number(expectedPrice);
		if (!crop.trim()) {
			alert("Please enter the crop name.");
			return;
		}
		if (!numericQuantity || numericQuantity <= 0) {
			alert("Please enter a valid quantity.");
			return;
		}
		if (!numericPrice || numericPrice <= 0) {
			alert("Please enter a valid expected price.");
			return;
		}
		setCreating(true);
		try {
			const { error } = await supabase.from("sale_lots").insert({
				farmer_id: user.id,
				crop_name: crop.trim(),
				quantity: numericQuantity,
				unit,
				grade,
				expected_price: numericPrice,
				description: description.trim() || null,
				state: profile?.state ?? null,
				district: profile?.district ?? null,
				village: profile?.village ?? null,
				status: "active"
			});
			if (error) throw error;
			await queryClient.invalidateQueries({ queryKey: ["sale-lots", user.id] });
			setShowCreate(false);
			setCrop("Tomato");
			setQuantity("500");
			setUnit("kg");
			setGrade("Grade A");
			setExpectedPrice("3000");
			setDescription("");
			setActiveTab("lots");
			alert("Sale lot published successfully.");
		} catch (error) {
			console.error(error);
			alert(error instanceof Error ? error.message : "Unable to create sale lot.");
		} finally {
			setCreating(false);
		}
	}
	async function acceptOffer(offer) {
		if (!user?.id) return;
		const lot = lots.find((item) => item.id === offer.sale_lot_id);
		if (!lot) {
			alert("Sale lot could not be found.");
			return;
		}
		if (offer.status !== "pending") return;
		if (!window.confirm(`Accept ${money(offer.offered_price)} for ${offer.quantity} ${lot.unit} of ${lot.crop_name}?`)) return;
		setProcessingOffer(offer.id);
		try {
			const { error: acceptError } = await supabase.from("buyer_offers").update({ status: "accepted" }).eq("id", offer.id).eq("status", "pending");
			if (acceptError) throw acceptError;
			const { error: rejectError } = await supabase.from("buyer_offers").update({ status: "rejected" }).eq("sale_lot_id", offer.sale_lot_id).neq("id", offer.id).eq("status", "pending");
			if (rejectError) throw rejectError;
			const { error: lotError } = await supabase.from("sale_lots").update({
				status: "accepted",
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", offer.sale_lot_id).eq("farmer_id", user.id);
			if (lotError) throw lotError;
			const { error: transactionError } = await supabase.from("market_transactions").insert({
				sale_lot_id: offer.sale_lot_id,
				offer_id: offer.id,
				farmer_id: user.id,
				buyer_id: offer.buyer_id,
				agreed_price: offer.offered_price,
				quantity: offer.quantity,
				payment_status: "pending",
				delivery_status: "pending",
				transaction_status: "payment_pending"
			});
			if (transactionError) throw transactionError;
			await supabase.from("notifications").insert({
				user_id: offer.buyer_id,
				type: "market_offer_accepted",
				title: "Offer Accepted",
				message: `Your offer of ${money(offer.offered_price)} has been accepted for ${offer.quantity} ${lot.unit} of ${lot.crop_name}.`,
				is_read: false
			});
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ["sale-lots", user.id] }),
				queryClient.invalidateQueries({ queryKey: ["farmer-offers", user.id] }),
				queryClient.invalidateQueries({ queryKey: ["market-transactions-farmer", user.id] })
			]);
			setSelectedLot({
				...lot,
				status: "accepted"
			});
			alert("Offer accepted. Transaction created successfully.");
		} catch (error) {
			console.error(error);
			alert(error instanceof Error ? error.message : "Unable to accept offer.");
		} finally {
			setProcessingOffer(null);
		}
	}
	async function refreshData() {
		await Promise.all([
			saleLotsQuery.refetch(),
			offersQuery.refetch(),
			transactionsQuery.refetch()
		]);
	}
	if (saleLotsQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }), "Loading your sale lots..."]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-3xl border bg-card p-6 shadow-sm sm:p-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" }), "MARKET LINKAGE"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-bold tracking-tight sm:text-4xl",
							children: "My Sale Lots"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-2xl text-muted-foreground",
							children: "Publish your crop, receive buyer offers, compare prices and complete the transaction digitally."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: refreshData,
							disabled: saleLotsQuery.isFetching || offersQuery.isFetching,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `mr-2 h-4 w-4 ${saleLotsQuery.isFetching ? "animate-spin" : ""}` }), "Refresh"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => setShowCreate(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), "Create Sale Lot"]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-5 w-5" }),
						label: "Active Lots",
						value: activeLots.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "h-5 w-5" }),
						label: "Offers Received",
						value: offers.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "h-5 w-5" }),
						label: "Pending Offers",
						value: pendingOffers.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5" }),
						label: "Completed Sales",
						value: completedLots.length
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-2 border-b pb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabButton, {
						active: activeTab === "lots",
						onClick: () => setActiveTab("lots"),
						children: ["Active Lots", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: activeLots.length })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabButton, {
						active: activeTab === "offers",
						onClick: () => setActiveTab("offers"),
						children: ["Offers Received", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: offers.length })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabButton, {
						active: activeTab === "completed",
						onClick: () => setActiveTab("completed"),
						children: ["Completed Sales", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: completedLots.length })]
					})
				]
			}),
			activeTab === "lots" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-6",
				children: activeLots.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No active sale lots",
					description: "Create your first sale lot to start receiving buyer offers.",
					buttonText: "Create Sale Lot",
					onClick: () => setShowCreate(true)
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-5 lg:grid-cols-2",
					children: activeLots.map((lot) => {
						const lotOffers = offers.filter((offer) => offer.sale_lot_id === lot.id);
						const bestOffer = lotOffers.filter((offer) => offer.status === "pending").sort((a, b) => b.offered_price - a.offered_price)[0];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaleLotCard, {
							lot,
							offerCount: lotOffers.length,
							bestOffer,
							onView: () => setSelectedLot(lot)
						}, lot.id);
					})
				})
			}),
			activeTab === "offers" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-6",
				children: offers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No buyer offers yet",
					description: "When buyers submit offers for your published lots, they will appear here.",
					buttonText: "View Active Lots",
					onClick: () => setActiveTab("lots")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: offers.map((offer) => {
						const lot = lots.find((item) => item.id === offer.sale_lot_id);
						if (!lot) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferCard, {
							offer,
							lot,
							processing: processingOffer === offer.id,
							onAccept: () => acceptOffer(offer)
						}, offer.id);
					})
				})
			}),
			activeTab === "completed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-6",
				children: completedLots.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No completed sales",
					description: "Completed transactions will appear here.",
					buttonText: "View Active Lots",
					onClick: () => setActiveTab("lots")
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-5 lg:grid-cols-2",
					children: completedLots.map((lot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaleLotCard, {
						lot,
						offerCount: offers.filter((offer) => offer.sale_lot_id === lot.id).length,
						onView: () => setSelectedLot(lot)
					}, lot.id))
				})
			}),
			currentTransaction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border bg-card p-6 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold tracking-wider text-primary",
								children: "TRANSACTION TRACKING"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-xl font-semibold",
								children: "Your latest market transaction"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary",
								children: currentTransaction.transaction_status.replace(/_/g, " ")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionTracker, { transaction: currentTransaction })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid gap-4 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
									label: "Agreed price",
									value: money(currentTransaction.agreed_price)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
									label: "Quantity",
									value: `${currentTransaction.quantity} kg`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
									label: "Payment",
									value: currentTransaction.payment_status
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 grid gap-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" }),
						title: "Verified marketplace",
						description: "Buyer profiles and transaction records are stored with your market activity."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "h-5 w-5" }),
						title: "Better price discovery",
						description: "Compare multiple offers instead of depending on a single buyer."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustCard, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-5 w-5" }),
						title: "Track the sale",
						description: "Follow payment and delivery status after accepting an offer."
					})
				]
			}),
			showCreate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateSaleLotModal, {
				crop,
				quantity,
				unit,
				grade,
				expectedPrice,
				description,
				creating,
				setCrop,
				setQuantity,
				setUnit,
				setGrade,
				setExpectedPrice,
				setDescription,
				onClose: () => setShowCreate(false),
				onCreate: createSaleLot
			}),
			selectedLot && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotDetailsModal, {
				lot: selectedLot,
				offers: offers.filter((offer) => offer.sale_lot_id === selectedLot.id),
				onClose: () => setSelectedLot(null),
				onAccept: acceptOffer,
				processingOffer
			})
		]
	});
}
function StatCard({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-2xl border bg-card p-5 shadow-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl bg-primary/10 p-2.5 text-primary",
				children: icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-2xl font-bold",
				children: value
			})] })]
		})
	});
}
function TabButton({ active, children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: `rounded-xl px-4 py-2 text-sm font-semibold transition ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`,
		children
	});
}
function SaleLotCard({ lot, offerCount, bestOffer, onView }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border bg-card p-6 shadow-sm transition hover:shadow-md",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `rounded-full px-3 py-1 text-xs font-semibold ${statusClass(lot.status)}`,
							children: statusLabel(lot.status)
						}), lot.grade && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-muted px-3 py-1 text-xs font-medium",
							children: lot.grade
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-4 text-2xl font-bold",
						children: lot.crop_name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-muted-foreground",
						children: [
							lot.quantity,
							" ",
							lot.unit
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl bg-primary/10 p-3 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-6 w-6" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
						label: "Expected price",
						value: lot.expected_price ? `${money(lot.expected_price)}/q` : "Not set"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
						label: "Offers",
						value: `${offerCount}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
						label: "Best offer",
						value: bestOffer ? `${money(bestOffer.offered_price)}/q` : "Waiting"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
						label: "Published",
						value: formatDate(lot.created_at)
					})
				]
			}),
			(lot.village || lot.district) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center gap-2 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }), [
					lot.village,
					lot.district,
					lot.state
				].filter(Boolean).join(", ")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "mt-6 w-full",
				onClick: onView,
				children: ["View Lot & Offers", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
			})
		]
	});
}
function OfferCard({ offer, lot, processing, onAccept }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border bg-card p-6 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "h-6 w-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold",
								children: offer.buyer?.name || "Buyer"
							}), offer.buyer?.is_verified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3 w-3" }), "Verified"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								"Offer for ",
								lot.crop_name,
								" •",
								" ",
								offer.quantity,
								" ",
								lot.unit
							]
						}),
						offer.buyer?.rating ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm",
							children: ["⭐ ", offer.buyer.rating]
						}) : null
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3 lg:min-w-[360px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
						label: "Offered price",
						value: `${money(offer.offered_price)}/q`
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
						label: "Quantity",
						value: `${offer.quantity} ${lot.unit}`
					})]
				})]
			}),
			offer.message && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 rounded-xl bg-muted/50 p-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold",
						children: "Buyer message:"
					}),
					" ",
					offer.message
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm text-muted-foreground",
					children: ["Received ", formatDate(offer.created_at)]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: offer.status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: onAccept,
						disabled: processing,
						children: processing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Processing..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-2 h-4 w-4" }), "Accept Offer"] })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `rounded-full px-3 py-2 text-sm font-semibold ${offer.status === "accepted" ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`,
						children: offer.status
					})
				})]
			})
		]
	});
}
function CreateSaleLotModal({ crop, quantity, unit, grade, expectedPrice, description, creating, setCrop, setQuantity, setUnit, setGrade, setExpectedPrice, setDescription, onClose, onCreate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalOverlay, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full max-w-2xl rounded-3xl bg-card p-6 shadow-2xl sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold tracking-wider text-primary",
						children: "SELL YOUR CROP"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-2xl font-bold",
						children: "Create Sale Lot"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Buyers will be able to discover this lot and submit offers."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "rounded-full p-2 hover:bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7 grid gap-5 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Crop" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: crop,
							onChange: (e) => setCrop(e.target.value),
							placeholder: "Tomato"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Quantity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: "1",
								value: quantity,
								onChange: (e) => setQuantity(e.target.value)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: unit,
								onValueChange: setUnit,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "w-[110px]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "kg",
										children: "kg"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "quintal",
										children: "Quintal"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "tonne",
										children: "Tonne"
									})
								] })]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Quality Grade" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: grade,
							onValueChange: setGrade,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Grade A",
									children: "Grade A"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Grade B",
									children: "Grade B"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Grade C",
									children: "Grade C"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Mixed",
									children: "Mixed"
								})
							] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Expected Price (₹ / quintal)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: "1",
							value: expectedPrice,
							onChange: (e) => setExpectedPrice(e.target.value),
							placeholder: "3000"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Additional information" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: description,
							onChange: (e) => setDescription(e.target.value),
							placeholder: "Mention harvest date, quality, packing, pickup requirements, etc.",
							className: "min-h-[100px] w-full rounded-xl border bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 rounded-2xl bg-primary/5 p-4 text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: "Your sale lot will be stored securely in Supabase and can be matched with buyers looking for the same crop and quantity."
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: onClose,
					disabled: creating,
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: onCreate,
					disabled: creating,
					children: creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Publishing..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "mr-2 h-4 w-4" }), "Publish Sale Lot"] })
				})]
			})
		]
	}) });
}
function LotDetailsModal({ lot, offers, onClose, onAccept, processingOffer }) {
	const pendingOffers = offers.filter((offer) => offer.status === "pending").sort((a, b) => b.offered_price - a.offered_price);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalOverlay, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-card p-6 shadow-2xl sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `rounded-full px-3 py-1 text-xs font-semibold ${statusClass(lot.status)}`,
						children: statusLabel(lot.status)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-3xl font-bold",
						children: lot.crop_name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-muted-foreground",
						children: [
							lot.quantity,
							" ",
							lot.unit,
							" •",
							" ",
							lot.grade || "Quality not specified"
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "rounded-full p-2 hover:bg-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
						label: "Expected",
						value: lot.expected_price ? `${money(lot.expected_price)}/q` : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
						label: "Quantity",
						value: `${lot.quantity} ${lot.unit}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
						label: "Grade",
						value: lot.grade || "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
						label: "Offers",
						value: `${offers.length}`
					})
				]
			}),
			lot.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 rounded-2xl bg-muted/50 p-4 text-sm",
				children: lot.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold tracking-wider text-primary",
						children: "BUYER OFFERS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-1 text-xl font-semibold",
						children: "Compare and choose"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-muted px-3 py-1 text-sm",
						children: [pendingOffers.length, " pending"]
					})]
				}), pendingOffers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 rounded-2xl border border-dashed p-8 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-semibold",
							children: "No pending offers"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Buyers can submit offers once they discover your lot."
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 space-y-3",
					children: pendingOffers.map((offer, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `rounded-2xl border p-4 ${index === 0 ? "border-primary/40 bg-primary/5" : ""}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: offer.buyer?.name || "Buyer"
								}), offer.buyer?.is_verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-primary" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: [
									offer.quantity,
									" ",
									lot.unit,
									" •",
									" ",
									offer.buyer?.rating ? `⭐ ${offer.buyer.rating}` : "Rating unavailable"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xl font-bold",
										children: [money(offer.offered_price), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-normal text-muted-foreground",
											children: "/q"
										})]
									}), lot.expected_price && offer.offered_price >= lot.expected_price && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold text-emerald-600",
										children: "Meets expected price"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => onAccept(offer),
									disabled: processingOffer === offer.id,
									children: processingOffer === offer.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Accept"
								})]
							})]
						})
					}, offer.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				className: "mt-7 w-full",
				onClick: onClose,
				children: "Close"
			})
		]
	}) });
}
function TransactionTracker({ transaction }) {
	const status = transaction.transaction_status;
	const stages = [
		{
			label: "Offer Accepted",
			done: true
		},
		{
			label: "Payment",
			done: status === "paid" || status === "delivery_pending" || status === "delivered" || status === "completed"
		},
		{
			label: "Delivery",
			done: status === "delivered" || status === "completed"
		},
		{
			label: "Completed",
			done: status === "completed"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 sm:grid-cols-4",
		children: stages.map((stage, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `flex items-center gap-3 rounded-2xl border p-4 ${stage.done ? "border-primary/30 bg-primary/5" : ""}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${stage.done ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`,
					children: stage.done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold",
					children: stage.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: stage.done ? "Completed" : "Pending"
				})] })]
			}), index < stages.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "absolute -right-3 top-7 hidden h-5 w-5 text-muted-foreground sm:block" })]
		}, stage.label))
	});
}
function InfoBox({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-muted/60 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-semibold",
			children: value
		})]
	});
}
function InfoItem({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-semibold capitalize",
			children: value
		})]
	});
}
function TrustCard({ icon, title, description }) {
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
function EmptyState({ title, description, buttonText, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-dashed bg-card p-10 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-7 w-7" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-5 text-xl font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-2 max-w-md text-sm text-muted-foreground",
				children: description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6",
				onClick,
				children: buttonText
			})
		]
	});
}
function ModalOverlay({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm",
		children
	});
}
//#endregion
export { ListingsPage as component };
