import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DtNBHlnt.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as useAuth } from "./router-B64XXRor.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { B as IndianRupee, F as MapPin, J as CircleX, L as LoaderCircle, Q as CircleAlert, Z as CircleCheck, b as ShieldCheck, dt as ArrowRight, f as Tractor, it as CalendarDays, k as PackageCheck, o as Users, q as Clock3 } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings-fnc2rPeO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function formatDate(value) {
	return (/* @__PURE__ */ new Date(`${value}T00:00:00`)).toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function getDuration(start, end) {
	const startDate = /* @__PURE__ */ new Date(`${start}T00:00:00`);
	const endDate = /* @__PURE__ */ new Date(`${end}T00:00:00`);
	const diff = Math.floor((endDate.getTime() - startDate.getTime()) / 864e5) + 1;
	return Math.max(diff, 1);
}
function statusLabel(status) {
	switch (status) {
		case "pending": return "Requested";
		case "confirmed": return "Confirmed";
		case "completed": return "Completed";
		case "cancelled": return "Cancelled";
		default: return status;
	}
}
function MachineryBookings() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [search, setSearch] = (0, import_react.useState)("");
	const [selectedBooking, setSelectedBooking] = (0, import_react.useState)(null);
	const [actionLoading, setActionLoading] = (0, import_react.useState)(false);
	const [actionError, setActionError] = (0, import_react.useState)("");
	const { data: bookings = [], isLoading, error } = useQuery({
		queryKey: ["my-machinery-bookings", user?.id],
		enabled: !!user?.id,
		queryFn: async () => {
			if (!user?.id) return [];
			const { data, error } = await supabase.from("bookings").select(`
            id,
            machinery_id,
            renter_id,
            owner_id,
            start_date,
            end_date,
            total_price,
            status,
            created_at,
            machinery:machinery_id (
              name,
              category,
              district,
              village,
              price_per_day,
              image_url
            )
          `).or(`renter_id.eq.${user.id},owner_id.eq.${user.id}`).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const filteredBookings = (0, import_react.useMemo)(() => {
		const query = search.trim().toLowerCase();
		return bookings.filter((booking) => {
			const matchesStatus = filter === "all" || booking.status === filter;
			const machineName = booking.machinery?.name ?? "";
			const category = booking.machinery?.category ?? "";
			const district = booking.machinery?.district ?? "";
			const matchesSearch = !query || machineName.toLowerCase().includes(query) || category.toLowerCase().includes(query) || district.toLowerCase().includes(query) || booking.id.toLowerCase().includes(query);
			return matchesStatus && matchesSearch;
		});
	}, [
		bookings,
		filter,
		search
	]);
	const activeCount = bookings.filter((booking) => booking.status === "pending" || booking.status === "confirmed").length;
	const completedCount = bookings.filter((booking) => booking.status === "completed").length;
	const totalSpent = bookings.filter((booking) => booking.renter_id === user?.id && booking.status !== "cancelled").reduce((sum, booking) => sum + Number(booking.total_price), 0);
	async function cancelBooking(id) {
		if (!user?.id) return;
		setActionLoading(true);
		setActionError("");
		try {
			const { error } = await supabase.from("bookings").update({ status: "cancelled" }).eq("id", id).eq("renter_id", user.id).eq("status", "pending");
			if (error) throw error;
			await queryClient.invalidateQueries({ queryKey: ["my-machinery-bookings"] });
			setSelectedBooking(null);
		} catch (err) {
			console.error(err);
			setActionError(err instanceof Error ? err.message : "Unable to cancel booking.");
		} finally {
			setActionLoading(false);
		}
	}
	async function confirmBooking(id) {
		if (!user?.id) return;
		setActionLoading(true);
		setActionError("");
		try {
			const { error } = await supabase.from("bookings").update({ status: "confirmed" }).eq("id", id).eq("owner_id", user.id).eq("status", "pending");
			if (error) throw error;
			await queryClient.invalidateQueries({ queryKey: ["my-machinery-bookings"] });
			setSelectedBooking(null);
		} catch (err) {
			console.error(err);
			setActionError(err instanceof Error ? err.message : "Unable to confirm booking.");
		} finally {
			setActionLoading(false);
		}
	}
	async function completeBooking(id) {
		if (!user?.id) return;
		setActionLoading(true);
		setActionError("");
		try {
			const booking = bookings.find((item) => item.id === id);
			if (!booking) throw new Error("Booking not found.");
			if (!(booking.renter_id === user.id || booking.owner_id === user.id)) throw new Error("You are not allowed to update this booking.");
			const { error } = await supabase.from("bookings").update({ status: "completed" }).eq("id", id).in("status", ["confirmed"]);
			if (error) throw error;
			await queryClient.invalidateQueries({ queryKey: ["my-machinery-bookings"] });
			setSelectedBooking(null);
		} catch (err) {
			console.error(err);
			setActionError(err instanceof Error ? err.message : "Unable to complete booking.");
		} finally {
			setActionLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "card-surface p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-between gap-5 md:flex-row md:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-6 w-6 text-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-bold",
							children: "Machinery Bookings"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-2xl text-sm leading-6 text-muted-foreground",
							children: "Track your machinery requests, confirmed rentals and completed bookings."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => navigate({
							to: "/machinery",
							search: {
								q: "",
								category: "",
								start: "",
								end: ""
							}
						}),
						children: ["Find Machinery", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						icon: Clock3,
						label: "Active bookings",
						value: activeCount.toString(),
						description: "Requests and confirmed rentals"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						icon: PackageCheck,
						label: "Completed",
						value: completedCount.toString(),
						description: "Successfully completed rentals"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						icon: IndianRupee,
						label: "Rental value",
						value: `₹${totalSpent.toLocaleString("en-IN")}`,
						description: "Your machinery rental transactions"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: search,
					onChange: (event) => setSearch(event.target.value),
					placeholder: "Search machine, category, location or booking ID..."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex gap-2 overflow-x-auto pb-1",
					children: [
						["all", "All"],
						["pending", "Requested"],
						["confirmed", "Confirmed"],
						["completed", "Completed"],
						["cancelled", "Cancelled"]
					].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setFilter(value),
						className: `whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold ${filter === value ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/70"}`,
						children: label
					}, value))
				})]
			}),
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "card-surface flex min-h-60 items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }), "Loading your bookings..."]
				})
			}),
			error && !isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-surface p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mx-auto h-10 w-10 text-destructive" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-bold",
						children: "Could not load bookings"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: error instanceof Error ? error.message : "Please try again."
					})
				]
			}),
			!isLoading && !error && filteredBookings.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyBookings, { onFind: () => navigate({
				to: "/machinery",
				search: {
					q: "",
					category: "",
					start: "",
					end: ""
				}
			}) }),
			!isLoading && !error && filteredBookings.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: "Your bookings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						filteredBookings.length,
						" booking",
						filteredBookings.length !== 1 ? "s" : "",
						" ",
						"found"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: filteredBookings.map((booking) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingCard, {
						booking,
						currentUserId: user?.id,
						onView: () => setSelectedBooking(booking)
					}, booking.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-surface p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "How machinery booking works"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "A verified availability and booking flow."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-4 md:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowStep, {
							number: "01",
							title: "Request",
							text: "Choose machinery and dates."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowStep, {
							number: "02",
							title: "Confirm",
							text: "Owner confirms the request."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowStep, {
							number: "03",
							title: "Use",
							text: "Use the machinery during the booked period."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowStep, {
							number: "04",
							title: "Complete",
							text: "Close the booking after successful work."
						})
					]
				})]
			}),
			selectedBooking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingDetails, {
				booking: selectedBooking,
				currentUserId: user?.id,
				loading: actionLoading,
				error: actionError,
				onClose: () => {
					setSelectedBooking(null);
					setActionError("");
				},
				onCancel: () => void cancelBooking(selectedBooking.id),
				onConfirm: () => void confirmBooking(selectedBooking.id),
				onComplete: () => void completeBooking(selectedBooking.id)
			})
		]
	});
}
function BookingCard({ booking, currentUserId, onView }) {
	const machine = booking.machinery;
	const isOwner = booking.owner_id === currentUserId;
	const location = [machine?.village, machine?.district].filter(Boolean).join(", ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "card-surface p-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tractor, { className: "h-7 w-7 text-muted-foreground" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold",
							children: machine?.name ?? "Agricultural Machinery"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: booking.status })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [
							"Booking ",
							booking.id.slice(0, 8),
							" •",
							" ",
							machine?.category ?? "Machinery"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								icon: CalendarDays,
								text: `${formatDate(booking.start_date)} → ${formatDate(booking.end_date)}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								icon: Clock3,
								text: `${getDuration(booking.start_date, booking.end_date)} day${getDuration(booking.start_date, booking.end_date) === 1 ? "" : "s"}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								icon: MapPin,
								text: location || "Location not specified"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								icon: Users,
								text: isOwner ? "You are the machinery owner" : "You requested this machinery"
							})
						]
					})
				] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-5 border-t border-border pt-4 lg:min-w-60 lg:border-l lg:border-t-0 lg:pl-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Total rental"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-lg font-bold",
					children: ["₹", Number(booking.total_price).toLocaleString("en-IN")]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: onView,
					children: "Details"
				})]
			})]
		})
	});
}
function BookingDetails({ booking, currentUserId, loading, error, onClose, onCancel, onConfirm, onComplete }) {
	const isOwner = booking.owner_id === currentUserId;
	const isRenter = booking.renter_id === currentUserId;
	const canCancel = isRenter && booking.status === "pending";
	const canConfirm = isOwner && booking.status === "pending";
	const canComplete = (isOwner || isRenter) && booking.status === "confirmed";
	const machine = booking.machinery;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between border-b border-border p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-semibold text-primary",
						children: ["Booking #", booking.id.slice(0, 8)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-xl font-bold",
						children: machine?.name ?? "Agricultural Machinery"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: machine?.category ?? "Machinery"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "rounded-lg px-3 py-2 text-sm hover:bg-secondary",
					children: "Close"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingTimeline, { status: booking.status }),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-5 w-5 shrink-0" }), error]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailBox, {
								icon: CalendarDays,
								label: "Start date",
								value: formatDate(booking.start_date)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailBox, {
								icon: CalendarDays,
								label: "End date",
								value: formatDate(booking.end_date)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailBox, {
								icon: Clock3,
								label: "Duration",
								value: `${getDuration(booking.start_date, booking.end_date)} day${getDuration(booking.start_date, booking.end_date) === 1 ? "" : "s"}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailBox, {
								icon: IndianRupee,
								label: "Total",
								value: `₹${Number(booking.total_price).toLocaleString("en-IN")}`
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-secondary p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: "Booking status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: booking.status }),
								isOwner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "You are the machinery owner"
								}),
								isRenter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "You requested this machinery"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 sm:flex-row",
						children: [
							canConfirm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "flex-1",
								disabled: loading,
								onClick: onConfirm,
								children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mr-2 h-4 w-4" }), "Confirm Booking"]
							}),
							canComplete && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "flex-1",
								disabled: loading,
								onClick: onComplete,
								children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mr-2 h-4 w-4" }), "Mark Completed"]
							}),
							canCancel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "flex-1",
								disabled: loading,
								onClick: onCancel,
								children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "mr-2 h-4 w-4" }), "Cancel Request"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: onClose,
								children: "Close"
							})
						]
					})
				]
			})]
		})
	});
}
function BookingTimeline({ status }) {
	const steps = [
		{
			label: "Requested",
			icon: Clock3
		},
		{
			label: "Confirmed",
			icon: ShieldCheck
		},
		{
			label: "Completed",
			icon: CircleCheck
		}
	];
	const statusIndex = status === "pending" ? 0 : status === "confirmed" ? 1 : status === "completed" ? 2 : -1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 text-sm font-semibold",
			children: "Booking progress"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-3 gap-3",
			children: steps.map((step, index) => {
				const Icon = step.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `mx-auto flex h-10 w-10 items-center justify-center rounded-full ${statusIndex >= index ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs font-medium",
						children: step.label
					})]
				}, step.label);
			})
		}),
		status === "cancelled" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" }), "This booking has been cancelled."]
		})
	] });
}
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `rounded-full px-2.5 py-1 text-[10px] font-bold ${{
			pending: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
			confirmed: "bg-primary/10 text-primary",
			completed: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
			cancelled: "bg-destructive/10 text-destructive"
		}[status]}`,
		children: statusLabel(status)
	});
}
function SummaryCard({ icon: Icon, label, value, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-10 w-10 items-center justify-center rounded-xl bg-secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-primary" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xl font-bold",
					children: value
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm font-semibold",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: description
			})
		]
	});
}
function Info({ icon: Icon, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text })]
	});
}
function DetailBox({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" }), label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm font-semibold",
			children: value
		})]
	});
}
function FlowStep({ number, title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-bold text-primary",
				children: number
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-2 text-sm font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs leading-5 text-muted-foreground",
				children: text
			})
		]
	});
}
function EmptyBookings({ onFind }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-surface p-10 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-7 w-7 text-muted-foreground" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 font-semibold",
				children: "No bookings found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Your real machinery bookings will appear here."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-5",
				onClick: onFind,
				children: "Find Machinery"
			})
		]
	});
}
//#endregion
export { MachineryBookings as component };
