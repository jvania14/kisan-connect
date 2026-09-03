import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DtNBHlnt.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as useAuth, n as Route } from "./router-B64XXRor.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { B as IndianRupee, F as MapPin, L as LoaderCircle, Q as CircleAlert, b as ShieldCheck, ct as BadgeCheck, f as Tractor, ft as ArrowLeft, it as CalendarDays, o as Users, q as Clock3, tt as Check } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/machinery._id-BZEzUHxo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function todayISO() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function dateDiffInclusive(start, end) {
	const startDate = /* @__PURE__ */ new Date(`${start}T00:00:00`);
	const endDate = /* @__PURE__ */ new Date(`${end}T00:00:00`);
	if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return 0;
	return Math.floor((endDate.getTime() - startDate.getTime()) / 864e5) + 1;
}
function MachineryDetails() {
	const navigate = useNavigate();
	const { user, profile } = useAuth();
	const { id } = Route.useParams();
	const [startDate, setStartDate] = (0, import_react.useState)(todayISO());
	const [endDate, setEndDate] = (0, import_react.useState)(todayISO());
	const [bookingLoading, setBookingLoading] = (0, import_react.useState)(false);
	const [bookingSuccess, setBookingSuccess] = (0, import_react.useState)(false);
	const [bookingError, setBookingError] = (0, import_react.useState)("");
	const { data: machinery, isLoading, error } = useQuery({
		queryKey: ["machinery-detail", id],
		queryFn: async () => {
			const { data, error } = await supabase.from("machinery").select("*").eq("id", id).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const { data: existingBookings = [] } = useQuery({
		queryKey: ["machinery-bookings", id],
		enabled: !!id,
		queryFn: async () => {
			const { data, error } = await supabase.from("bookings").select("id, machinery_id, renter_id, owner_id, start_date, end_date, total_price, status, created_at").eq("machinery_id", id).in("status", ["pending", "confirmed"]);
			if (error) throw error;
			return data ?? [];
		}
	});
	const numberOfDays = (0, import_react.useMemo)(() => dateDiffInclusive(startDate, endDate), [startDate, endDate]);
	const pricePerDay = Number(machinery?.price_per_day ?? 0);
	const rentalCost = numberOfDays > 0 ? numberOfDays * pricePerDay : 0;
	const dateError = startDate && endDate && endDate < startDate ? "End date cannot be before start date." : "";
	const availabilityError = (0, import_react.useMemo)(() => {
		if (!startDate || !endDate || endDate < startDate) return "";
		return existingBookings.some((booking) => booking.start_date <= endDate && booking.end_date >= startDate) ? "This machinery is already booked for the selected dates." : "";
	}, [
		existingBookings,
		startDate,
		endDate
	]);
	const outsideAvailabilityError = (0, import_react.useMemo)(() => {
		if (!machinery || !startDate || !endDate) return "";
		if (machinery.available_from && startDate < machinery.available_from) return `Available from ${machinery.available_from}.`;
		if (machinery.available_until && endDate > machinery.available_until) return `Available only until ${machinery.available_until}.`;
		return "";
	}, [
		machinery,
		startDate,
		endDate
	]);
	const finalAvailabilityError = dateError || availabilityError || outsideAvailabilityError;
	async function handleBooking() {
		setBookingError("");
		setBookingSuccess(false);
		if (!user?.id) {
			setBookingError("Please log in before booking machinery.");
			return;
		}
		if (!machinery) {
			setBookingError("Machinery information is unavailable.");
			return;
		}
		if (machinery.owner_id === user.id) {
			setBookingError("You cannot book your own machinery.");
			return;
		}
		if (finalAvailabilityError) {
			setBookingError(finalAvailabilityError);
			return;
		}
		if (numberOfDays <= 0) {
			setBookingError("Please select valid booking dates.");
			return;
		}
		setBookingLoading(true);
		try {
			const { data: latestBookings, error: checkError } = await supabase.from("bookings").select("id, start_date, end_date, status").eq("machinery_id", machinery.id).in("status", ["pending", "confirmed"]);
			if (checkError) throw checkError;
			if ((latestBookings ?? []).some((booking) => booking.start_date <= endDate && booking.end_date >= startDate)) throw new Error("This machinery was just booked for the selected dates. Please choose different dates.");
			const { error: insertError } = await supabase.from("bookings").insert({
				machinery_id: machinery.id,
				renter_id: user.id,
				owner_id: machinery.owner_id,
				start_date: startDate,
				end_date: endDate,
				total_price: rentalCost,
				status: "pending"
			});
			if (insertError) throw insertError;
			setBookingSuccess(true);
		} catch (err) {
			console.error("Booking error:", err);
			setBookingError(err instanceof Error ? err.message : "Unable to create booking. Please try again.");
		} finally {
			setBookingLoading(false);
		}
	}
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[60vh] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }), "Loading machinery..."]
		})
	});
	if (error || !machinery) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "ghost",
			onClick: () => navigate({
				to: "/machinery",
				search: {
					q: "",
					category: "",
					start: "",
					end: ""
				}
			}),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-2 h-4 w-4" }), "Back to Machinery"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card-surface p-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mx-auto h-10 w-10 text-destructive" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-xl font-bold",
					children: "Machinery not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "This machinery listing may have been removed or is no longer available."
				})
			]
		})]
	});
	const location = [
		machinery.village,
		machinery.district,
		machinery.state
	].filter(Boolean).join(", ");
	const imageUrl = machinery.image_url || "/src/assets/tractor.jpg";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "ghost",
				onClick: () => navigate({
					to: "/machinery",
					search: {
						q: "",
						category: "",
						start: "",
						end: ""
					}
				}),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-2 h-4 w-4" }), "Back to Machinery"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "card-surface overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-h-[320px] bg-secondary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: imageUrl,
							alt: machinery.name,
							className: "h-full min-h-[320px] w-full object-cover",
							onError: (event) => {
								event.currentTarget.style.display = "none";
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold",
							children: machinery.category
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 lg:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-semibold text-primary",
									children: machinery.is_verified ? "VERIFIED MACHINERY" : "MACHINERY LISTING"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 text-3xl font-bold",
								children: machinery.name
							}),
							(machinery.brand || machinery.model) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: [machinery.brand, machinery.model].filter(Boolean).join(" • ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-6 text-muted-foreground",
								children: machinery.description || "Agricultural machinery available for local farmers."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
										icon: Users,
										label: "Owner",
										value: machinery.owner_id === user?.id ? "You" : "Verified machinery owner"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
										icon: MapPin,
										label: "Location",
										value: location || "Location not specified"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
										icon: IndianRupee,
										label: "Rental",
										value: `₹${pricePerDay.toLocaleString("en-IN")}/day`
									}),
									machinery.price_per_hour && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
										icon: Clock3,
										label: "Hourly",
										value: `₹${Number(machinery.price_per_hour).toLocaleString("en-IN")}/hour`
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-wrap gap-3",
								children: [machinery.rating !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary",
									children: ["★ ", Number(machinery.rating).toFixed(1)]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `rounded-full px-3 py-1.5 text-sm font-semibold ${machinery.is_active ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`,
									children: machinery.is_active ? "Active listing" : "Inactive"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "mt-1 h-6 w-6 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-bold",
							children: "Check availability"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Select the dates you need this machinery. Existing bookings are checked automatically."
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-5 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "start-date",
							className: "text-sm font-medium",
							children: "Start date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "start-date",
							className: "mt-2",
							type: "date",
							min: todayISO(),
							value: startDate,
							onChange: (event) => {
								setStartDate(event.target.value);
								setBookingError("");
							}
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "end-date",
							className: "text-sm font-medium",
							children: "End date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "end-date",
							className: "mt-2",
							type: "date",
							min: startDate || todayISO(),
							value: endDate,
							onChange: (event) => {
								setEndDate(event.target.value);
								setBookingError("");
							}
						})] })]
					}),
					finalAvailabilityError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 h-5 w-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: finalAvailabilityError })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
								icon: CalendarDays,
								label: "Duration",
								value: numberOfDays > 0 ? `${numberOfDays} day${numberOfDays === 1 ? "" : "s"}` : "Invalid dates"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
								icon: IndianRupee,
								label: "Daily rate",
								value: `₹${pricePerDay.toLocaleString("en-IN")}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoBox, {
								icon: ShieldCheck,
								label: "Estimated total",
								value: `₹${rentalCost.toLocaleString("en-IN")}`
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 border-t border-border pt-6",
						children: bookingSuccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-primary/20 bg-primary/5 p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-6 w-6" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-bold",
									children: "Booking request sent successfully"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm leading-6 text-muted-foreground",
									children: "Your request has been saved. The machinery owner can now confirm the booking."
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 flex flex-col gap-3 sm:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => navigate({ to: "/bookings" }),
									children: "View My Bookings"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: () => navigate({
										to: "/machinery",
										search: {
											q: "",
											category: "",
											start: "",
											end: ""
										}
									}),
									children: "Find More Machinery"
								})]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							bookingError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "mt-0.5 h-5 w-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: bookingError })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col justify-between gap-4 md:flex-row md:items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Estimated rental cost"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-3xl font-bold",
									children: ["₹", rentalCost.toLocaleString("en-IN")]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									className: "h-12 px-8",
									disabled: bookingLoading || !machinery.is_active || !!finalAvailabilityError || !user?.id,
									onClick: handleBooking,
									children: bookingLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-5 w-5 animate-spin" }), "Booking..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "mr-2 h-5 w-5" }), "Request Machinery Booking"] })
								})]
							}),
							!user?.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs text-muted-foreground",
								children: "Please log in to request a machinery booking."
							}),
							machinery.owner_id === user?.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs text-muted-foreground",
								children: "You own this machinery, so you cannot book it yourself."
							})
						] })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-primary/20 bg-primary/5 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tractor, { className: "mt-1 h-6 w-6 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Lower production cost → improve net realization"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-6 text-muted-foreground",
						children: "Renting machinery can reduce upfront equipment costs. Farmers can then use Kisan Connect market intelligence to find better crop selling opportunities."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "mt-5",
					onClick: () => navigate({ to: "/dashboard" }),
					children: "Go to Market Dashboard"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-secondary p-4 text-xs leading-5 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Booking protection:" }), " availability is checked before submission, and the Supabase database also prevents overlapping pending or confirmed bookings."]
			})
		]
	});
}
function DetailRow({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-9 w-9 items-center justify-center rounded-lg bg-secondary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-primary" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium",
			children: value
		})] })]
	});
}
function InfoBox({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-secondary p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-primary" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-semibold",
				children: value
			})
		]
	});
}
//#endregion
export { MachineryDetails as component };
