import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { I as MapPin, V as IndianRupee, b as ShieldCheck, ct as BadgeCheck, dt as ArrowLeft, it as CalendarDays, o as Users, p as Tractor, q as Clock3, tt as Check } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/machinery._id-DVhb6Pfm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MACHINERY = {
	id: "tractor-001",
	name: "Mahindra 575 DI Tractor",
	category: "Tractor",
	owner: "Ramesh Patil",
	location: "Nashik",
	distance: 12,
	pricePerHour: 700,
	pricePerDay: 4500,
	acresPerHour: 1.2,
	rating: 4.8,
	reviews: 27,
	available: true,
	image: "/src/assets/tractor.jpg"
};
function MachineryDetails() {
	const navigate = useNavigate();
	const [acres, setAcres] = (0, import_react.useState)("5");
	const [days, setDays] = (0, import_react.useState)("1");
	const [bookingSent, setBookingSent] = (0, import_react.useState)(false);
	const [pricingMode, setPricingMode] = (0, import_react.useState)("day");
	const machinery = MACHINERY;
	const calculation = (0, import_react.useMemo)(() => {
		const area = Math.max(Number(acres) || 0, 0);
		const numberOfDays = Math.max(Number(days) || 1, 1);
		const hoursNeeded = machinery.acresPerHour > 0 ? area / machinery.acresPerHour : 0;
		const rentalCost = pricingMode === "day" ? numberOfDays * machinery.pricePerDay : Math.ceil(hoursNeeded) * machinery.pricePerHour;
		const estimatedMarketAlternative = area * 1500;
		return {
			area,
			numberOfDays,
			hoursNeeded,
			rentalCost,
			estimatedMarketAlternative,
			savings: Math.max(estimatedMarketAlternative - rentalCost, 0),
			costPerAcre: area > 0 ? rentalCost / area : 0
		};
	}, [
		acres,
		days,
		pricingMode,
		machinery
	]);
	const handleBooking = () => {
		setBookingSent(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => navigate({ to: "/machinery" }),
				className: "flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), "Back to Machinery"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "card-surface overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-h-[280px] bg-secondary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: machinery.image,
							alt: machinery.name,
							className: "h-full min-h-[280px] w-full object-cover",
							onError: (event) => {
								event.currentTarget.style.display = "none";
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-xs font-semibold",
							children: machinery.category
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-semibold text-primary",
									children: "VERIFIED MACHINERY"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 text-3xl font-bold",
								children: machinery.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Reliable farm machinery available for local farmers."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
										icon: Users,
										label: "Owner",
										value: machinery.owner
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
										icon: MapPin,
										label: "Location",
										value: `${machinery.location} • ${machinery.distance} km away`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
										icon: IndianRupee,
										label: "Rental",
										value: `₹${machinery.pricePerDay.toLocaleString("en-IN")}/day`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
										icon: Clock3,
										label: "Hourly",
										value: `₹${machinery.pricePerHour.toLocaleString("en-IN")}/hour`
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-wrap gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary",
										children: ["★ ", machinery.rating]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-full bg-secondary px-3 py-1.5 text-sm",
										children: [machinery.reviews, " reviews"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded-full px-3 py-1.5 text-sm font-semibold ${machinery.available ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`,
										children: machinery.available ? "Available" : "Currently unavailable"
									})
								]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-2xl border border-primary/20 bg-primary/5 p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tractor, { className: "mt-1 h-6 w-6 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Lower your production cost → improve net realization"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-6 text-muted-foreground",
						children: "Machinery access helps farmers avoid large upfront equipment costs and reduce cultivation expenses. The money saved can improve the farmer's final net realization after selling the crop."
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-primary",
							children: "MACHINERY COST CALCULATOR"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-2xl font-semibold",
							children: "Estimate your farming cost"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Calculate the approximate machinery cost before booking."
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-5 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									children: "Area to cultivate (acres)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "mt-2",
									type: "number",
									min: "0.5",
									step: "0.5",
									value: acres,
									onChange: (event) => setAcres(event.target.value)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									children: "Number of days"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "mt-2",
									type: "number",
									min: "1",
									value: days,
									onChange: (event) => setDays(event.target.value)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-sm font-medium",
									children: "Rental calculation"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 grid grid-cols-2 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setPricingMode("day"),
										className: `rounded-xl border px-4 py-3 text-sm font-medium ${pricingMode === "day" ? "border-primary bg-primary/10 text-primary" : "border-border"}`,
										children: "Per Day"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setPricingMode("hour"),
										className: `rounded-xl border px-4 py-3 text-sm font-medium ${pricingMode === "hour" ? "border-primary bg-primary/10 text-primary" : "border-border"}`,
										children: "Per Hour"
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-secondary p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Machine capacity"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold",
											children: [machinery.acresPerHour, " acres/hour"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex justify-between text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Estimated working time"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold",
											children: [calculation.hoursNeeded.toFixed(1), " hours"]
										})]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-primary/20 bg-primary/5 p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Estimated machinery cost"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-4xl font-bold",
									children: ["₹", calculation.rentalCost.toLocaleString("en-IN", { maximumFractionDigits: 0 })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [
										"for ",
										calculation.area,
										" acre",
										calculation.area !== 1 ? "s" : ""
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultRow, {
											label: "Cost per acre",
											value: `₹${calculation.costPerAcre.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultRow, {
											label: "Estimated alternative cost",
											value: `₹${calculation.estimatedMarketAlternative.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between border-t border-border pt-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: "Potential savings"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-lg font-bold text-primary",
												children: ["₹", calculation.savings.toLocaleString("en-IN", { maximumFractionDigits: 0 })]
											})]
										})
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-muted-foreground",
						children: "Savings are an illustrative estimate for this prototype. Actual costs depend on crop, field conditions, fuel, operator charges and local rental rates."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-between gap-4 md:flex-row md:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-primary",
								children: "BOOK MACHINERY"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-2xl font-semibold",
								children: "Request this machine"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Send a booking request to the machinery owner."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-secondary px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Estimated cost"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xl font-bold",
								children: ["₹", calculation.rentalCost.toLocaleString("en-IN")]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-4 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingInfo, {
								icon: CalendarDays,
								title: "Duration",
								value: `${calculation.numberOfDays} day${calculation.numberOfDays !== 1 ? "s" : ""}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingInfo, {
								icon: MapPin,
								title: "Distance",
								value: `${machinery.distance} km`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingInfo, {
								icon: ShieldCheck,
								title: "Owner",
								value: "Verified"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: bookingSent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: "Booking request sent"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "The machinery owner can now confirm your request."
							})] })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "h-12 w-full",
							disabled: !machinery.available,
							onClick: handleBooking,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "mr-2 h-5 w-5" }), machinery.available ? "Request Machinery Booking" : "Currently Unavailable"]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: "Connect machinery savings with crop selling"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 grid gap-4 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
								number: "01",
								title: "Reduce Cost",
								text: "Rent machinery instead of purchasing expensive equipment."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
								number: "02",
								title: "Improve Net Realization",
								text: "Lower cultivation costs mean more money remains with the farmer."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
								number: "03",
								title: "Sell Better",
								text: "Use Kisan Connect's market intelligence and buyer offers to choose the best selling opportunity."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "mt-5",
						onClick: () => navigate({ to: "/dashboard" }),
						children: ["Go to Market Dashboard", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "ml-2 h-4 w-4 rotate-180" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3 rounded-xl bg-secondary p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs leading-5 text-muted-foreground",
					children: "Prototype machinery prices and calculations are illustrative. Production deployment should use actual machinery listings, availability calendars and booking records from Supabase."
				})]
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
function ResultRow({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-semibold",
			children: value
		})]
	});
}
function BookingInfo({ icon: Icon, title, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-secondary p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-primary" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-muted-foreground",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-semibold",
				children: value
			})
		]
	});
}
function Step({ number, title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-bold text-primary",
				children: number
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-2 font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm leading-5 text-muted-foreground",
				children: text
			})
		]
	});
}
//#endregion
export { MachineryDetails as component };
