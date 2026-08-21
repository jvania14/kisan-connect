import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DtNBHlnt.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useAuth, n as Route } from "./router-CBtCpRAA.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { t as Label } from "./label-B4PTMSG2.mjs";
import { A as CircleCheck, B as ArrowLeft, I as CalendarDays, O as CircleX, o as Star, x as LoaderCircle, y as MapPin, z as BadgeCheck } from "../_libs/lucide-react.mjs";
import { a as daysBetween, c as overlaps, i as categoryImage, o as distanceKm, s as formatINR, u as toISODate } from "./kisan-ratsXnAN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/machinery._id-ByCKiowj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Inserts an in-app notification. Failures are logged but never block the
* primary action (e.g. a booking that already succeeded).
*/
async function createNotification(input) {
	const { error } = await supabase.from("notifications").insert({
		user_id: input.userId,
		type: input.type,
		title: input.title,
		message: input.message ?? null
	});
	if (error) console.error("notification insert failed", error);
}
function MachineryDetail() {
	const { id } = Route.useParams();
	const { profile, user } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [start, setStart] = (0, import_react.useState)("");
	const [end, setEnd] = (0, import_react.useState)("");
	const [booking, setBooking] = (0, import_react.useState)(false);
	const [confirmed, setConfirmed] = (0, import_react.useState)(null);
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["machinery", id],
		queryFn: async () => {
			const [m, b, r] = await Promise.all([
				supabase.from("machinery").select("*, profiles:owner_id(id, name, is_verified, rating, phone)").eq("id", id).maybeSingle(),
				supabase.from("bookings").select("id, start_date, end_date, status").eq("machinery_id", id).in("status", ["pending", "confirmed"]),
				supabase.from("reviews").select("id, rating, comment, created_at, reviewer:reviewer_id(name)").eq("machinery_id", id).order("created_at", { ascending: false })
			]);
			if (m.error) throw m.error;
			if (b.error) throw b.error;
			if (r.error) throw r.error;
			return {
				machinery: m.data ?? null,
				booked: b.data ?? [],
				reviews: r.data ?? []
			};
		}
	});
	const machinery = data?.machinery ?? null;
	const booked = (0, import_react.useMemo)(() => data?.booked ?? [], [data]);
	const distance = distanceKm(profile?.latitude, profile?.longitude, machinery?.latitude, machinery?.longitude);
	const days = start && end && end >= start ? daysBetween(start, end) : 0;
	const total = machinery ? days * Number(machinery.price_per_day) : 0;
	const conflict = (0, import_react.useMemo)(() => {
		if (!start || !end || end < start) return null;
		if (booked.find((b) => overlaps(start, end, b.start_date, b.end_date))) return "booked";
		if (machinery?.available_from && machinery.available_from > start) return "window";
		if (machinery?.available_until && machinery.available_until < end) return "window";
		return null;
	}, [
		start,
		end,
		booked,
		machinery
	]);
	const confirmBooking = async () => {
		if (!machinery || !user) return;
		if (!start || !end) {
			toast.error("Please select start and end dates.");
			return;
		}
		if (end < start) {
			toast.error("End date must be on or after the start date.");
			return;
		}
		if (machinery.owner_id === user.id) {
			toast.error("You cannot book your own machinery.");
			return;
		}
		if (conflict) {
			toast.error("These dates are not available.");
			return;
		}
		setBooking(true);
		const { data: fresh, error: freshErr } = await supabase.from("bookings").select("id, start_date, end_date").eq("machinery_id", machinery.id).in("status", ["pending", "confirmed"]);
		if (freshErr) {
			setBooking(false);
			toast.error(`Availability check failed: ${freshErr.message}`);
			return;
		}
		if ((fresh ?? []).some((b) => overlaps(start, end, b.start_date, b.end_date))) {
			setBooking(false);
			await refetch();
			toast.error("Someone just booked these dates. Please pick different dates.");
			return;
		}
		const { data: inserted, error: insertErr } = await supabase.from("bookings").insert({
			machinery_id: machinery.id,
			renter_id: user.id,
			owner_id: machinery.owner_id,
			start_date: start,
			end_date: end,
			total_price: total,
			status: "pending"
		}).select("id").single();
		if (insertErr || !inserted) {
			setBooking(false);
			toast.error(`Booking failed: ${insertErr?.message ?? "unknown error"}`);
			return;
		}
		await createNotification({
			userId: machinery.owner_id,
			type: "booking_request",
			title: "New booking request",
			message: `${profile?.name ?? "A farmer"} requested ${machinery.name} from ${start} to ${end}.`
		});
		await createNotification({
			userId: user.id,
			type: "booking_created",
			title: "Booking request sent",
			message: `Your request for ${machinery.name} (${start} → ${end}) is pending owner confirmation.`
		});
		setBooking(false);
		setConfirmed({
			id: inserted.id,
			total
		});
		await queryClient.invalidateQueries({ queryKey: ["machinery", id] });
		await queryClient.invalidateQueries({ queryKey: ["machinery-all"] });
		await queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
		toast.success("Booking saved");
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" })
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-surface p-8 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-destructive",
			children: ["Could not load this listing: ", error.message]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-3",
			onClick: () => void refetch(),
			children: "Retry"
		})]
	});
	if (!machinery) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-surface p-10 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium",
			children: "This machinery listing no longer exists."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/machinery",
			search: {
				q: "",
				category: "",
				start: "",
				end: ""
			},
			className: "mt-4 inline-block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Back to marketplace" })
		})]
	});
	if (confirmed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card-surface p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mx-auto h-14 w-14 text-success" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-2xl font-semibold",
					children: "Booking confirmed"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Your request has been saved and the owner has been notified."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-6 space-y-2 text-left text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Machinery",
							value: machinery.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Owner",
							value: machinery.profiles?.name ?? "Farmer"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Dates",
							value: `${start} → ${end} (${days} day${days > 1 ? "s" : ""})`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Total",
							value: formatINR(confirmed.total)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Status",
							value: "Pending owner confirmation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Booking ID",
							value: confirmed.id.slice(0, 8)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/bookings",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "h-12 px-6",
							children: "Go to My Bookings"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/machinery",
						search: {
							q: "",
							category: "",
							start: "",
							end: ""
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "h-12 px-6",
							children: "Keep browsing"
						})
					})]
				})
			]
		})
	});
	const isOwner = machinery.owner_id === user?.id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/machinery",
			search: {
				q: "",
				category: "",
				start: "",
				end: ""
			},
			className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to marketplace"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 lg:grid-cols-[1.6fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: machinery.image_url || categoryImage(machinery.category),
						alt: machinery.name,
						width: 1024,
						height: 640,
						className: "h-64 w-full rounded-2xl border border-border object-cover sm:h-80"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-surface p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold text-muted-foreground",
										children: machinery.category
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-2xl font-semibold",
										children: machinery.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: [machinery.brand, machinery.model].filter(Boolean).join(" · ")
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 text-lg font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-5 w-5 fill-warning text-warning" }), Number(machinery.rating).toFixed(1)]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }), [
											machinery.village,
											machinery.district,
											machinery.state
										].filter(Boolean).join(", ") || "Location not set"]
									}),
									distance != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"📏 ",
										distance,
										" km away"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											"Owner: ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium text-foreground",
												children: machinery.profiles?.name
											}),
											machinery.profiles?.is_verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-4 w-4 text-success" })
										]
									})
								]
							}),
							machinery.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 whitespace-pre-line text-sm",
								children: machinery.description
							}),
							machinery.terms && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 rounded-xl bg-muted p-4 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: "Rental terms"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 whitespace-pre-line text-muted-foreground",
									children: machinery.terms
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-surface p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "flex items-center gap-2 font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-5 w-5" }), " Availability"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: [
									"Listed as available",
									" ",
									machinery.available_from ? `from ${machinery.available_from}` : "immediately",
									machinery.available_until ? ` until ${machinery.available_until}` : "",
									"."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: "Already booked dates"
								}), booked.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "No bookings yet — all dates in the window are open."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-2 space-y-1 text-sm",
									children: booked.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "rounded-lg bg-muted px-3 py-2",
										children: [
											b.start_date,
											" → ",
											b.end_date,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-muted-foreground",
												children: [
													"(",
													b.status,
													")"
												]
											})
										]
									}, b.id))
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card-surface p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-semibold",
							children: [
								"Reviews (",
								data?.reviews.length ?? 0,
								")"
							]
						}), (data?.reviews.length ?? 0) === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "No reviews yet. Reviews appear after a rental is completed."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-3",
							children: data?.reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-xl bg-muted p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: r.reviewer?.name ?? "Farmer"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-warning text-warning" }),
											" ",
											r.rating
										]
									})]
								}), r.comment && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: r.comment
								})]
							}, r.id))
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "lg:sticky lg:top-20 lg:self-start",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card-surface p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-2xl font-semibold",
							children: [formatINR(machinery.price_per_day), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-base font-normal text-muted-foreground",
								children: "/day"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "s",
									children: "Start date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "s",
									type: "date",
									className: "h-12",
									min: toISODate(/* @__PURE__ */ new Date()),
									value: start,
									onChange: (e) => setStart(e.target.value)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "e",
									children: "End date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "e",
									type: "date",
									className: "h-12",
									min: start || toISODate(/* @__PURE__ */ new Date()),
									value: end,
									onChange: (e) => setEnd(e.target.value)
								})]
							})]
						}),
						start && end && end >= start && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-xl bg-muted p-4 text-sm",
							children: [
								conflict === "booked" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 font-medium text-destructive",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" }), " Already booked for these dates."]
								}),
								conflict === "window" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 font-medium text-destructive",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" }), " Outside the owner's availability window."]
								}),
								!conflict && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 font-medium text-success",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), " Available for your selected dates."]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										days,
										" day",
										days > 1 ? "s" : "",
										" × ",
										formatINR(machinery.price_per_day)
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: formatINR(total)
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "mt-4 h-12 w-full text-base",
							disabled: booking || isOwner || !start || !end || !!conflict,
							onClick: () => void confirmBooking(),
							children: [booking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), isOwner ? "This is your listing" : "Confirm Booking"]
						}),
						!isOwner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-center text-xs text-muted-foreground",
							children: "Payment is settled directly with the owner. Kisan Connect records the booking."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "mt-3 h-12 w-full",
							onClick: () => void navigate({ to: "/bookings" }),
							children: "My Bookings"
						})
					]
				})
			})]
		})]
	});
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between gap-4 border-b border-border pb-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-right font-medium",
			children: value
		})]
	});
}
//#endregion
export { MachineryDetail as component };
