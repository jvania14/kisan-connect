import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DtNBHlnt.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as Outlet, g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { r as useAuth } from "./router-DPCKUlNX.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { F as Menu, L as LogOut, U as Handshake, X as CircleDollarSign, Y as CirclePlus, _ as Sprout, et as ChevronDown, f as TrendingUp, h as Store, i as Wheat, it as CalendarDays, k as PackageSearch, n as X, o as Users, ot as Bell, p as Tractor, rt as ChartColumn, y as ShoppingCart } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-DkMx_aE0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
function AppShell({ children }) {
	const { profile, signOut, user } = useAuth();
	const navigate = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const { data: unread = 0 } = useQuery({
		queryKey: ["notifications-unread", user?.id],
		enabled: !!user?.id,
		queryFn: async () => {
			const { count, error } = await supabase.from("notifications").select("id", {
				count: "exact",
				head: true
			}).eq("user_id", user.id).eq("is_read", false);
			if (error) throw error;
			return count ?? 0;
		}
	});
	const handleSignOut = async () => {
		await signOut();
		navigate({ to: "/" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex min-h-16 max-w-[1400px] items-center gap-3 px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/dashboard",
						className: "flex shrink-0 items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg font-semibold leading-tight",
							children: "Kisan Connect"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "ml-5 hidden items-center gap-1 xl:flex",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/dashboard",
								className: "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
								activeProps: { className: "rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-foreground" },
								children: "Dashboard"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "group relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4" }),
										"Market",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5" })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "invisible absolute left-0 top-full mt-1 w-72 rounded-xl border border-border bg-card p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "/dashboard#market-prices",
											className: "flex items-start gap-3 rounded-lg p-3 hover:bg-secondary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "mt-0.5 h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block font-medium",
												children: "Live Market Prices"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "Mandi prices, arrivals & trends"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "/dashboard#best-mandi",
											className: "flex items-start gap-3 rounded-lg p-3 hover:bg-secondary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "mt-0.5 h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block font-medium",
												children: "Best Mandi"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "Compare nearby markets"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "/dashboard#buyer-demand",
											className: "flex items-start gap-3 rounded-lg p-3 hover:bg-secondary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "mt-0.5 h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block font-medium",
												children: "Buyer Demand"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "See who is looking for your crop"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "/dashboard#sale-lots",
											className: "flex items-start gap-3 rounded-lg p-3 hover:bg-secondary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageSearch, { className: "mt-0.5 h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block font-medium",
												children: "My Sale Lots"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "Manage crops listed for sale"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "/dashboard#offers",
											className: "flex items-start gap-3 rounded-lg p-3 hover:bg-secondary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handshake, { className: "mt-0.5 h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block font-medium",
												children: "My Offers"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "Offers, negotiation & buyers"
											})] })]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "group relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4" }),
										"AI Insights",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5" })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "invisible absolute left-0 top-full mt-1 w-72 rounded-xl border border-border bg-card p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "/dashboard#price-forecast",
											className: "flex items-start gap-3 rounded-lg p-3 hover:bg-secondary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "mt-0.5 h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block font-medium",
												children: "Price Forecast"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "7-day & future price prediction"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "/dashboard#sell-window",
											className: "flex items-start gap-3 rounded-lg p-3 hover:bg-secondary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDollarSign, { className: "mt-0.5 h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block font-medium",
												children: "Sell Now or Wait"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "AI recommendation with confidence"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "/dashboard#market-opportunity",
											className: "flex items-start gap-3 rounded-lg p-3 hover:bg-secondary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "mt-0.5 h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block font-medium",
												children: "Market Opportunity"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "Find profitable selling opportunities"
											})] })]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "/dashboard#find-buyers",
								className: "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" }), "Find Buyers"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "/dashboard#sell-crop",
								className: "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheat, { className: "h-4 w-4" }), "Sell Crop"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "group relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tractor, { className: "h-4 w-4" }),
										"Machinery",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5" })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "invisible absolute left-0 top-full mt-1 w-72 rounded-xl border border-border bg-card p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/machinery",
											className: "flex items-start gap-3 rounded-lg p-3 hover:bg-secondary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tractor, { className: "mt-0.5 h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block font-medium",
												children: "Find Machinery"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "Rent tractors & equipment"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/list-machinery",
											className: "flex items-start gap-3 rounded-lg p-3 hover:bg-secondary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "mt-0.5 h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block font-medium",
												children: "List / Sell Machinery"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "Earn from unused equipment"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/bookings",
											className: "flex items-start gap-3 rounded-lg p-3 hover:bg-secondary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "mt-0.5 h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block font-medium",
												children: "Machinery Bookings"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "Manage rentals & availability"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/listings",
											className: "flex items-start gap-3 rounded-lg p-3 hover:bg-secondary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageSearch, { className: "mt-0.5 h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block font-medium",
												children: "My Machinery"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "Manage your equipment"
											})] })]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/voice",
								className: "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
								children: "Voice"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/community",
								className: "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
								children: "Community"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/notifications",
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									"aria-label": "Notifications",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5" })
								}), unread > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[11px] font-semibold text-destructive-foreground",
									children: unread
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/profile",
								className: "hidden sm:block",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "sm",
									children: profile?.name ?? "Profile"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Sign out",
								onClick: handleSignOut,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
								open,
								onOpenChange: setOpen,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										className: "xl:hidden",
										"aria-label": "Menu",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
									side: "right",
									className: "w-80 overflow-y-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
												children: "Market Linkage"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2 flex flex-col gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														href: "/dashboard#market-prices",
														onClick: () => setOpen(false),
														className: "rounded-lg px-4 py-3 font-medium hover:bg-secondary",
														children: "📊 Live Market Prices"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														href: "/dashboard#best-mandi",
														onClick: () => setOpen(false),
														className: "rounded-lg px-4 py-3 font-medium hover:bg-secondary",
														children: "🏪 Best Mandi"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														href: "/dashboard#find-buyers",
														onClick: () => setOpen(false),
														className: "rounded-lg px-4 py-3 font-medium hover:bg-secondary",
														children: "🤝 Find Buyers"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														href: "/dashboard#sell-crop",
														onClick: () => setOpen(false),
														className: "rounded-lg px-4 py-3 font-medium hover:bg-secondary",
														children: "🌾 Sell Crop"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														href: "/dashboard#price-forecast",
														onClick: () => setOpen(false),
														className: "rounded-lg px-4 py-3 font-medium hover:bg-secondary",
														children: "📈 AI Price Forecast"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														href: "/dashboard#sell-window",
														onClick: () => setOpen(false),
														className: "rounded-lg px-4 py-3 font-medium hover:bg-secondary",
														children: "💰 Sell Now or Wait"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-6 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
												children: "Farm Services"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-2 flex flex-col gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/machinery",
														onClick: () => setOpen(false),
														className: "rounded-lg px-4 py-3 font-medium hover:bg-secondary",
														children: "🚜 Find Machinery"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/list-machinery",
														onClick: () => setOpen(false),
														className: "rounded-lg px-4 py-3 font-medium hover:bg-secondary",
														children: "💼 List / Sell Machinery"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/residues",
														onClick: () => setOpen(false),
														className: "rounded-lg px-4 py-3 font-medium hover:bg-secondary",
														children: "🌱 Crop Residues"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/community",
														onClick: () => setOpen(false),
														className: "rounded-lg px-4 py-3 font-medium hover:bg-secondary",
														children: "👨‍🌾 Community"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/bookings",
														onClick: () => setOpen(false),
														className: "rounded-lg px-4 py-3 font-medium hover:bg-secondary",
														children: "📅 Transactions & Bookings"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/listings",
														onClick: () => setOpen(false),
														className: "rounded-lg px-4 py-3 font-medium hover:bg-secondary",
														children: "📦 My Listings"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
														to: "/profile",
														onClick: () => setOpen(false),
														className: "rounded-lg px-4 py-3 font-medium hover:bg-secondary",
														children: "👤 My Profile"
													})
												]
											})
										]
									})
								})]
							})
						]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto max-w-[1400px] px-4 py-6 pb-24",
			children
		})]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
//#endregion
export { SplitComponent as component };
