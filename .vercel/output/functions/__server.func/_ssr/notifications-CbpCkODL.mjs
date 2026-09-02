import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { $ as ChevronRight, A as PackageCheck, N as MessageSquare, X as CircleDollarSign, dt as ArrowLeft, f as TrendingUp, l as UserCheck, n as X, nt as CheckCheck, ot as Bell, p as Tractor, q as Clock3, st as BellRing, tt as Check, y as ShoppingCart } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-CbpCkODL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INITIAL_NOTIFICATIONS = [
	{
		id: 1,
		type: "buyer",
		title: "New buyer offer received",
		message: "FreshKart Foods offered ₹3,000/q for your Tomato Grade A lot.",
		time: "8 min ago",
		unread: true,
		action: "View Offer",
		actionTarget: "/listings"
	},
	{
		id: 2,
		type: "market",
		title: "Tomato prices are rising",
		message: "Nashik market increased by 8.4%. Today's modal price is ₹2,850/q.",
		time: "24 min ago",
		unread: true,
		action: "View Market",
		actionTarget: "/dashboard#market-prices"
	},
	{
		id: 3,
		type: "market",
		title: "Smart Sell Window updated",
		message: "Kisan Connect currently recommends waiting 2–3 days. Expected range: ₹2,950–₹3,100/q.",
		time: "42 min ago",
		unread: true,
		action: "View Insight",
		actionTarget: "/dashboard#sell-window"
	},
	{
		id: 4,
		type: "sale",
		title: "Sale lot is getting buyer attention",
		message: "Your 500 kg Tomato Grade A lot has received 3 matching buyer recommendations.",
		time: "1 hr ago",
		unread: false,
		action: "View Buyers",
		actionTarget: "/dashboard#buyer-demand"
	},
	{
		id: 5,
		type: "machinery",
		title: "Machinery booking reminder",
		message: "Your tractor booking request is awaiting owner confirmation.",
		time: "2 hrs ago",
		unread: false,
		action: "View Booking",
		actionTarget: "/bookings"
	},
	{
		id: 6,
		type: "payment",
		title: "Payment status updated",
		message: "Payment tracking is ready for your accepted FreshKart offer.",
		time: "3 hrs ago",
		unread: false,
		action: "Track Transaction",
		actionTarget: "/listings"
	},
	{
		id: 7,
		type: "community",
		title: "New farmer discussion",
		message: "Farmers near Nashik are discussing tomato demand and transport availability.",
		time: "5 hrs ago",
		unread: false,
		action: "Open Community",
		actionTarget: "/community"
	},
	{
		id: 8,
		type: "system",
		title: "Profile verification reminder",
		message: "Complete your profile to improve trust when connecting with buyers.",
		time: "Yesterday",
		unread: false,
		action: "Complete Profile",
		actionTarget: "/profile"
	}
];
var FILTERS = [
	{
		key: "all",
		label: "All"
	},
	{
		key: "market",
		label: "Market"
	},
	{
		key: "buyer",
		label: "Buyers"
	},
	{
		key: "sale",
		label: "Sales"
	},
	{
		key: "machinery",
		label: "Machinery"
	},
	{
		key: "payment",
		label: "Payments"
	},
	{
		key: "community",
		label: "Community"
	}
];
function Notifications() {
	const navigate = useNavigate();
	const [notifications, setNotifications] = (0, import_react.useState)(INITIAL_NOTIFICATIONS);
	const [activeFilter, setActiveFilter] = (0, import_react.useState)("all");
	const unreadCount = (0, import_react.useMemo)(() => notifications.filter((notification) => notification.unread).length, [notifications]);
	const filteredNotifications = (0, import_react.useMemo)(() => {
		if (activeFilter === "all") return notifications;
		return notifications.filter((notification) => notification.type === activeFilter);
	}, [activeFilter, notifications]);
	const markAsRead = (id) => {
		setNotifications((current) => current.map((notification) => notification.id === id ? {
			...notification,
			unread: false
		} : notification));
	};
	const markAllAsRead = () => {
		setNotifications((current) => current.map((notification) => ({
			...notification,
			unread: false
		})));
	};
	const removeNotification = (id) => {
		setNotifications((current) => current.filter((notification) => notification.id !== id));
	};
	const handleAction = (notification) => {
		markAsRead(notification.id);
		if (notification.actionTarget) navigate({ to: notification.actionTarget });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-surface overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-between gap-5 p-6 md:flex-row md:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellRing, { className: "h-6 w-6 text-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-bold",
								children: "Notifications"
							}), unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground",
								children: [unreadCount, " new"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-2xl text-sm leading-6 text-muted-foreground",
							children: "Stay updated on market prices, buyer offers, crop sales, machinery bookings and payments."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => navigate({ to: "/dashboard" }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-2 h-4 w-4" }), "Dashboard"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							disabled: unreadCount === 0,
							onClick: markAllAsRead,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "mr-2 h-4 w-4" }), "Mark all read"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid border-t border-border sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickStat, {
							icon: Bell,
							label: "Total alerts",
							value: notifications.length.toString()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickStat, {
							icon: BellRing,
							label: "Unread",
							value: unreadCount.toString()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickStat, {
							icon: TrendingUp,
							label: "Market updates",
							value: notifications.filter((notification) => notification.type === "market").length.toString()
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-2xl border border-primary/20 bg-primary/5 p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "mt-0.5 h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: "Your most important updates are shown first"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-6 text-muted-foreground",
						children: "Kisan Connect prioritizes information that can affect your selling decision — especially price movement, buyer offers and transaction status."
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "card-surface p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: FILTERS.map((filter) => {
						const count = filter.key === "all" ? notifications.length : notifications.filter((notification) => notification.type === filter.key).length;
						const selected = activeFilter === filter.key;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setActiveFilter(filter.key),
							className: `rounded-full px-4 py-2 text-sm font-medium transition ${selected ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/70"}`,
							children: [filter.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `ml-2 rounded-full px-1.5 py-0.5 text-xs ${selected ? "bg-primary-foreground/20" : "bg-background"}`,
								children: count
							})]
						}, filter.key);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "space-y-3",
				children: filteredNotifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {}) : filteredNotifications.map((notification) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationCard, {
					notification,
					onRead: () => markAsRead(notification.id),
					onDelete: () => removeNotification(notification.id),
					onAction: () => handleAction(notification)
				}, notification.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-surface p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold text-primary",
					children: "SMART ALERTS"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 text-xl font-semibold",
					children: "What Kisan Connect can notify you about"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertType, {
							icon: TrendingUp,
							title: "Price Movement",
							text: "Important mandi price changes."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertType, {
							icon: ShoppingCart,
							title: "Buyer Offers",
							text: "New offers for your crop."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertType, {
							icon: PackageCheck,
							title: "Sale Updates",
							text: "Lot, delivery and transaction status."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertType, {
							icon: Tractor,
							title: "Machinery",
							text: "Booking and availability updates."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-secondary p-4 text-xs leading-5 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Prototype note:" }), " the notification examples shown here are demonstration data. In the production version, market alerts, buyer offers, payments and booking notifications should be generated from verified data and Supabase events."]
			})
		]
	});
}
function NotificationCard({ notification, onRead, onDelete, onAction }) {
	const Icon = getNotificationIcon(notification.type);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: `group relative rounded-2xl border p-4 transition ${notification.unread ? "border-primary/25 bg-primary/[0.035] shadow-sm" : "border-border bg-background"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${notification.unread ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-between gap-1 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold",
								children: notification.title
							}), notification.unread && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex shrink-0 items-center gap-1 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "h-3.5 w-3.5" }), notification.time]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-3xl text-sm leading-6 text-muted-foreground",
						children: notification.message
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap items-center gap-2",
						children: [
							notification.action && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: onAction,
								children: [notification.action, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-1 h-4 w-4" })]
							}),
							notification.unread && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onRead,
								className: "rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground",
								children: "Mark as read"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: onDelete,
								className: "ml-auto rounded-lg p-2 text-muted-foreground opacity-0 transition hover:bg-secondary hover:text-foreground group-hover:opacity-100",
								"aria-label": "Delete notification",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})
						]
					})
				]
			})]
		})
	});
}
function getNotificationIcon(type) {
	switch (type) {
		case "market": return TrendingUp;
		case "buyer": return UserCheck;
		case "sale": return PackageCheck;
		case "machinery": return Tractor;
		case "payment": return CircleDollarSign;
		case "community": return MessageSquare;
		default: return Bell;
	}
}
function QuickStat({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 border-b border-border p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-9 w-9 items-center justify-center rounded-lg bg-secondary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-primary" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-lg font-bold",
			children: value
		})] })]
	});
}
function AlertType({ icon: Icon, title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10",
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
function EmptyState() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-surface p-10 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-7 w-7 text-primary" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 text-lg font-semibold",
				children: "You're all caught up"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-1 max-w-md text-sm text-muted-foreground",
				children: "There are no notifications in this category right now. We'll show important market and transaction updates here."
			})
		]
	});
}
//#endregion
export { Notifications as component };
