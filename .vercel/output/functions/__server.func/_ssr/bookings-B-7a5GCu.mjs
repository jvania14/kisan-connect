import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { A as PackageCheck, I as MapPin, J as CircleX, V as IndianRupee, Z as CircleCheck, b as ShieldCheck, it as CalendarDays, p as Tractor, q as Clock3, ut as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings-B-7a5GCu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INITIAL_BOOKINGS = [
	{
		id: "BK-1048",
		machine: "Mahindra 575 DI Tractor",
		category: "Tractor",
		owner: "Ramesh Patil",
		location: "Nashik",
		distance: 12,
		date: "Sep 04, 2026",
		time: "08:00 AM",
		duration: "1 day",
		rate: 4500,
		total: 4500,
		status: "Confirmed",
		verified: true
	},
	{
		id: "BK-1032",
		machine: "Fieldking Rotavator",
		category: "Rotavator",
		owner: "Ganesh Shinde",
		location: "Ahmednagar",
		distance: 24,
		date: "Sep 07, 2026",
		time: "07:30 AM",
		duration: "6 hours",
		rate: 550,
		total: 3300,
		status: "Requested",
		verified: true
	},
	{
		id: "BK-0981",
		machine: "Sonalika Multi Crop Harvester",
		category: "Harvester",
		owner: "Maharashtra Farm Services",
		location: "Nashik",
		distance: 18,
		date: "Aug 28, 2026",
		time: "09:00 AM",
		duration: "1 day",
		rate: 8e3,
		total: 8e3,
		status: "Completed",
		verified: true
	}
];
var STATUS_FILTERS = [
	"All",
	"Requested",
	"Confirmed",
	"In Progress",
	"Completed",
	"Cancelled"
];
function MachineryBookings() {
	const navigate = useNavigate();
	const [bookings, setBookings] = (0, import_react.useState)(INITIAL_BOOKINGS);
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [selectedBooking, setSelectedBooking] = (0, import_react.useState)(null);
	const [search, setSearch] = (0, import_react.useState)("");
	const filteredBookings = (0, import_react.useMemo)(() => {
		const query = search.trim().toLowerCase();
		return bookings.filter((booking) => {
			const matchesStatus = filter === "All" || booking.status === filter;
			const matchesSearch = !query || booking.machine.toLowerCase().includes(query) || booking.owner.toLowerCase().includes(query) || booking.location.toLowerCase().includes(query) || booking.id.toLowerCase().includes(query);
			return matchesStatus && matchesSearch;
		});
	}, [
		bookings,
		filter,
		search
	]);
	const activeCount = bookings.filter((booking) => booking.status === "Requested" || booking.status === "Confirmed" || booking.status === "In Progress").length;
	const completedCount = bookings.filter((booking) => booking.status === "Completed").length;
	const totalSpent = bookings.filter((booking) => booking.status === "Completed").reduce((sum, booking) => sum + booking.total, 0);
	function cancelBooking(id) {
		setBookings((current) => current.map((booking) => booking.id === id ? {
			...booking,
			status: "Cancelled"
		} : booking));
		setSelectedBooking(null);
	}
	function simulateConfirmation(id) {
		setBookings((current) => current.map((booking) => booking.id === id ? {
			...booking,
			status: "Confirmed"
		} : booking));
		setSelectedBooking((current) => current?.id === id ? {
			...current,
			status: "Confirmed"
		} : current);
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
							children: "Track equipment requests, confirmed rentals, work progress and completed bookings from one place."
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
						label: "Completed spend",
						value: `₹${totalSpent.toLocaleString("en-IN")}`,
						description: "Across completed demo bookings"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: search,
					onChange: (event) => setSearch(event.target.value),
					placeholder: "Search booking, machine, owner or location..."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex gap-2 overflow-x-auto pb-1",
					children: STATUS_FILTERS.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setFilter(status),
						className: `whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold ${filter === status ? "bg-primary text-primary-foreground" : "bg-secondary hover:bg-secondary/70"}`,
						children: status
					}, status))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
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
						" found"
					]
				})] }), filteredBookings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyBookings, { onFind: () => navigate({
					to: "/machinery",
					search: {
						q: "",
						category: "",
						start: "",
						end: ""
					}
				}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: filteredBookings.map((booking) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingCard, {
						booking,
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
						children: "A simple verified flow for local equipment sharing."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-4 md:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowStep, {
							number: "01",
							title: "Request",
							text: "Select equipment and submit your requirement."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowStep, {
							number: "02",
							title: "Confirm",
							text: "Owner confirms the date, rate and availability."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowStep, {
							number: "03",
							title: "Use",
							text: "Equipment is delivered or collected as agreed."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlowStep, {
							number: "04",
							title: "Complete",
							text: "Booking is closed after successful work."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-2xl border border-primary/20 bg-primary/5 p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-primary",
							children: "WHY THIS MODULE EXISTS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-xl font-bold",
							children: "Machinery cost affects your final crop income"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-2xl text-sm leading-6 text-muted-foreground",
							children: "Before accepting a buyer offer, farmers can understand their operating costs and make a better net-realization decision."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => navigate({ to: "/dashboard" }),
						children: "Open Market Dashboard"
					})]
				})
			}),
			selectedBooking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingDetails, {
				booking: selectedBooking,
				onClose: () => setSelectedBooking(null),
				onCancel: () => cancelBooking(selectedBooking.id),
				onConfirm: () => simulateConfirmation(selectedBooking.id)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-secondary p-4 text-xs leading-5 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Prototype note:" }), " booking records and statuses shown here are demonstration data. Production deployment should connect these actions to verified owners, real availability, payment records and transaction history."]
			})
		]
	});
}
function BookingCard({ booking, onView }) {
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
							children: booking.machine
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: booking.status })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [
							"Booking ",
							booking.id,
							" • ",
							booking.category
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								icon: Users,
								text: booking.owner
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								icon: MapPin,
								text: `${booking.location} • ${booking.distance} km`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								icon: CalendarDays,
								text: booking.date
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
								icon: Clock3,
								text: `${booking.time} • ${booking.duration}`
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
					children: ["₹", booking.total.toLocaleString("en-IN")]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: onView,
					children: "Details"
				})]
			})]
		})
	});
}
function BookingDetails({ booking, onClose, onCancel, onConfirm }) {
	const canCancel = booking.status === "Requested" || booking.status === "Confirmed";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between border-b border-border p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold text-primary",
						children: booking.id
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-xl font-bold",
						children: booking.machine
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							booking.owner,
							" • ",
							booking.location
						]
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailBox, {
								icon: CalendarDays,
								label: "Date",
								value: booking.date
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailBox, {
								icon: Clock3,
								label: "Time",
								value: booking.time
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailBox, {
								icon: MapPin,
								label: "Location",
								value: `${booking.location} (${booking.distance} km)`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailBox, {
								icon: IndianRupee,
								label: "Total",
								value: `₹${booking.total.toLocaleString("en-IN")}`
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-secondary p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: "Rental summary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Duration"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: booking.duration })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Rental rate"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", booking.rate.toLocaleString("en-IN")] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between border-t border-border pt-2 font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", booking.total.toLocaleString("en-IN")] })]
								})
							]
						})]
					}),
					booking.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: "Verified equipment provider"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs leading-5 text-muted-foreground",
							children: "This prototype marks the owner as verified. Production verification should include identity, equipment ownership and contact verification."
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 sm:flex-row",
						children: [
							booking.status === "Requested" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "flex-1",
								onClick: onConfirm,
								children: "Simulate Owner Confirmation"
							}),
							canCancel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "flex-1",
								onClick: onCancel,
								children: "Cancel Booking"
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
			label: "In Progress",
			icon: Tractor
		},
		{
			label: "Completed",
			icon: CircleCheck
		}
	];
	const statusIndex = status === "Cancelled" ? -1 : steps.findIndex((step) => step.label === status);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 text-sm font-semibold",
			children: "Booking progress"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-4 gap-2",
			children: steps.map((step, index) => {
				const Icon = step.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `mx-auto flex h-9 w-9 items-center justify-center rounded-full ${statusIndex >= index ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[10px] font-medium sm:text-xs",
						children: step.label
					})]
				}, step.label);
			})
		}),
		status === "Cancelled" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" }), "This booking has been cancelled."]
		})
	] });
}
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `rounded-full px-2.5 py-1 text-[10px] font-bold ${{
			Requested: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
			Confirmed: "bg-primary/10 text-primary",
			"In Progress": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
			Completed: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
			Cancelled: "bg-destructive/10 text-destructive"
		}[status]}`,
		children: status
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
				children: "Try another filter or find machinery to create a booking."
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
