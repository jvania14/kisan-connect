import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DtNBHlnt.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as useAuth } from "./router-CBtCpRAA.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { F as CheckCheck, P as Check, R as Bell, r as Trash2, x as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-iG9XqQt9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NotificationsPage() {
	const { user } = useAuth();
	const [notifications, setNotifications] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (user?.id) loadNotifications();
	}, [user?.id]);
	async function loadNotifications() {
		if (!user?.id) return;
		setLoading(true);
		setError("");
		const { data, error } = await supabase.from("notifications").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
		if (error) {
			console.error("Notifications error:", error);
			setError(error.message);
			setNotifications([]);
		} else setNotifications(data ?? []);
		setLoading(false);
	}
	async function markAsRead(id) {
		if (!user?.id) return;
		const { error } = await supabase.from("notifications").update({ is_read: true }).eq("id", id).eq("user_id", user.id);
		if (error) {
			console.error(error);
			return;
		}
		setNotifications((current) => current.map((notification) => notification.id === id ? {
			...notification,
			is_read: true
		} : notification));
	}
	async function markAllAsRead() {
		if (!user?.id) return;
		const { error } = await supabase.from("notifications").update({ is_read: true }).eq("user_id", user.id).eq("is_read", false);
		if (error) {
			console.error(error);
			return;
		}
		setNotifications((current) => current.map((notification) => ({
			...notification,
			is_read: true
		})));
	}
	async function deleteNotification(id) {
		if (!user?.id) return;
		const { error } = await supabase.from("notifications").delete().eq("id", id).eq("user_id", user.id);
		if (error) {
			console.error(error);
			return;
		}
		setNotifications((current) => current.filter((notification) => notification.id !== id));
	}
	const unreadCount = notifications.filter((notification) => !notification.is_read).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-[#faf9f1] px-6 py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-4xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-8 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-12 w-12 items-center justify-center rounded-full bg-green-100",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-6 w-6 text-green-700" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-4xl font-semibold text-slate-900",
							children: "Notifications"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg text-slate-600",
						children: "Stay updated about your bookings and requests."
					})] }), unreadCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: markAllAsRead,
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "h-4 w-4" }), "Mark all as read"]
					})]
				}),
				loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-h-[300px] items-center justify-center rounded-2xl border bg-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-slate-600",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin" }), "Loading notifications..."]
					})
				}),
				!loading && error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-red-200 bg-red-50 p-8 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-2 text-xl font-semibold text-red-800",
							children: "Could not load notifications"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-5 text-red-700",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: loadNotifications,
							className: "bg-green-700 hover:bg-green-800",
							children: "Try Again"
						})
					]
				}),
				!loading && !error && notifications.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border bg-white p-16 text-center shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "mx-auto mb-5 h-14 w-14 text-green-700" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-2 text-2xl font-semibold text-slate-900",
							children: "No notifications yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-slate-600",
							children: "Booking requests and other updates will appear here."
						})
					]
				}),
				!loading && !error && notifications.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: notifications.map((notification) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `rounded-2xl border bg-white p-6 shadow-sm transition ${notification.is_read ? "" : "border-green-200 bg-green-50/40"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5 text-green-700" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-lg font-semibold text-slate-900",
											children: notification.title
										}), notification.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-slate-600",
											children: notification.message
										})] }), !notification.is_read && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-green-700 px-3 py-1 text-xs font-semibold text-white",
											children: "New"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex flex-wrap items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-slate-500",
											children: new Date(notification.created_at).toLocaleString("en-IN")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600",
											children: notification.type
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex gap-2",
										children: [!notification.is_read && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "outline",
											size: "sm",
											onClick: () => markAsRead(notification.id),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-2 h-4 w-4" }), "Mark as read"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "ghost",
											size: "sm",
											onClick: () => deleteNotification(notification.id),
											className: "text-red-600 hover:text-red-700",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 h-4 w-4" }), "Delete"]
										})]
									})
								]
							})]
						})
					}, notification.id))
				})
			]
		})
	});
}
//#endregion
export { NotificationsPage as component };
