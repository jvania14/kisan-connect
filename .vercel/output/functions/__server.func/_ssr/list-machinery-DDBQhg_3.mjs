import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { I as MapPin, V as IndianRupee, Z as CircleCheck, dt as ArrowLeft, it as CalendarDays, p as Tractor, r as Wrench, u as Upload } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/list-machinery-DDBQhg_3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	"Tractor",
	"Harvester",
	"Rotavator",
	"Cultivator",
	"Seeder",
	"Sprayer",
	"Other"
];
function ListMachineryPage() {
	const navigate = useNavigate();
	const [name, setName] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("Tractor");
	const [description, setDescription] = (0, import_react.useState)("");
	const [location, setLocation] = (0, import_react.useState)("");
	const [pricePerHour, setPricePerHour] = (0, import_react.useState)("");
	const [pricePerDay, setPricePerDay] = (0, import_react.useState)("");
	const [availableFrom, setAvailableFrom] = (0, import_react.useState)("");
	const [availableTo, setAvailableTo] = (0, import_react.useState)("");
	const [imageName, setImageName] = (0, import_react.useState)("");
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const handleSubmit = (event) => {
		event.preventDefault();
		setSubmitted(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => navigate({ to: "/machinery" }),
					className: "mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), "Back to Machinery"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "mb-8 rounded-3xl border bg-card p-6 shadow-sm sm:p-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-5 md:flex-row md:items-center md:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tractor, { className: "h-3.5 w-3.5" }), "Machinery Lending"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl font-bold tracking-tight sm:text-4xl",
								children: "List Your Machinery"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 max-w-2xl text-muted-foreground",
								children: "Turn unused machinery into additional income while helping nearby farmers access equipment at a lower cost."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden rounded-2xl bg-primary/10 p-5 md:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "h-12 w-12 text-primary" })
						})]
					})
				}),
				submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuccessCard, {
					onViewMachinery: () => navigate({ to: "/machinery" }),
					onListAnother: () => {
						setSubmitted(false);
						setName("");
						setDescription("");
						setLocation("");
						setPricePerHour("");
						setPricePerDay("");
						setAvailableFrom("");
						setAvailableTo("");
						setImageName("");
					}
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
					onSubmit: handleSubmit,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 lg:grid-cols-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6 lg:col-span-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
									className: "rounded-3xl border bg-card p-6 shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tractor, { className: "h-5 w-5" }),
										title: "Machinery Details",
										description: "Tell farmers what equipment you are offering."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6 grid gap-5 sm:grid-cols-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Machinery Name",
												required: true,
												value: name,
												onChange: setName,
												placeholder: "e.g. Mahindra 575 DI Tractor"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "mb-2 block text-sm font-semibold",
												children: ["Category ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-destructive",
													children: "*"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												value: category,
												onChange: (e) => setCategory(e.target.value),
												className: "h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20",
												children: CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: item,
													children: item
												}, item))
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "sm:col-span-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "mb-2 block text-sm font-semibold",
													children: "Description"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
													value: description,
													onChange: (e) => setDescription(e.target.value),
													placeholder: "Mention condition, model year, attachments, operating capacity, etc.",
													rows: 5,
													className: "w-full resize-none rounded-xl border bg-background px-3 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
												})]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
									className: "rounded-3xl border bg-card p-6 shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5" }),
										title: "Location",
										description: "Help nearby farmers discover your machinery."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-6",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Village / District",
											required: true,
											value: location,
											onChange: setLocation,
											placeholder: "e.g. Nashik, Maharashtra"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
									className: "rounded-3xl border bg-card p-6 shadow-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "h-5 w-5" }),
											title: "Rental Pricing",
											description: "Set transparent rental rates for farmers."
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-6 grid gap-5 sm:grid-cols-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Price per Hour",
												required: true,
												type: "number",
												value: pricePerHour,
												onChange: setPricePerHour,
												placeholder: "700"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Price per Day",
												required: true,
												type: "number",
												value: pricePerDay,
												onChange: setPricePerDay,
												placeholder: "4500"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 rounded-2xl bg-muted/50 p-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-medium",
												children: "💡 Tip for better bookings"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-xs leading-5 text-muted-foreground",
												children: "Competitive pricing and clear machinery details help farmers compare options and reduce unnecessary negotiation."
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
									className: "rounded-3xl border bg-card p-6 shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-5 w-5" }),
										title: "Availability",
										description: "Choose the period when farmers can request your machinery."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6 grid gap-5 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Available From",
											required: true,
											type: "date",
											value: availableFrom,
											onChange: setAvailableFrom
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											label: "Available Until",
											required: true,
											type: "date",
											value: availableTo,
											onChange: setAvailableTo
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
									className: "rounded-3xl border bg-card p-6 shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-5 w-5" }),
										title: "Machinery Photo",
										description: "A real photo increases trust and helps farmers evaluate condition."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition hover:border-primary hover:bg-primary/5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-8 w-8 text-muted-foreground" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-3 text-sm font-semibold",
												children: imageName || "Upload machinery photo"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-xs text-muted-foreground",
												children: "PNG, JPG or WEBP"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "file",
												accept: "image/png,image/jpeg,image/webp",
												className: "hidden",
												onChange: (e) => {
													const file = e.target.files?.[0];
													setImageName(file?.name ?? "");
												}
											})
										]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
							className: "lg:col-span-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sticky top-6 space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
										className: "rounded-3xl border bg-card p-6 shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-lg font-bold",
											children: "Listing Preview"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-5 rounded-2xl bg-muted/40 p-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tractor, { className: "h-10 w-10 text-primary" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "mt-4 font-bold",
													children: name || "Your Machinery Name"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 text-sm text-muted-foreground",
													children: category
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-4 space-y-2 text-sm",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewRow, {
															icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }),
															value: location || "Location not added"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewRow, {
															icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, { className: "h-4 w-4" }),
															value: pricePerHour ? `₹${pricePerHour}/hour` : "Hourly price not added"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewRow, {
															icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-4 w-4" }),
															value: availableFrom && availableTo ? `${availableFrom} → ${availableTo}` : "Availability not added"
														})
													]
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
										className: "rounded-3xl border bg-card p-6 shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "font-bold",
											children: "Why list here?"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 space-y-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Benefit, {
													title: "Earn from idle equipment",
													text: "Generate additional income when machinery is not in use."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Benefit, {
													title: "Reach nearby farmers",
													text: "Farmers can discover equipment based on location and availability."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Benefit, {
													title: "Reduce farming costs",
													text: "Shared machinery access can reduce the need for expensive ownership."
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										className: "flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 font-semibold text-primary-foreground shadow-sm transition hover:opacity-90",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5" }), "Publish Machinery"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-center text-xs leading-5 text-muted-foreground",
										children: "Prototype listing flow. Connect verified machinery records and booking persistence before production deployment."
									})
								]
							})
						})]
					})
				})
			]
		})
	});
}
function SectionTitle({ icon, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl bg-primary/10 p-2 text-primary",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-bold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: description
		})] })]
	});
}
function Field({ label, value, onChange, placeholder, type = "text", required = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mb-2 block text-sm font-semibold",
		children: [
			label,
			" ",
			required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-destructive",
				children: "*"
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		value,
		onChange: (e) => onChange(e.target.value),
		placeholder,
		required,
		min: type === "number" ? "0" : void 0,
		className: "h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
	})] });
}
function PreviewRow({ icon, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 text-muted-foreground",
		children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: value
		})]
	});
}
function Benefit({ title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-0.5 rounded-full bg-primary/10 p-1.5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-primary" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs leading-5 text-muted-foreground",
			children: text
		})] })]
	});
}
function SuccessCard({ onViewMachinery, onListAnother }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto max-w-2xl rounded-3xl border bg-card p-8 text-center shadow-sm sm:p-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10 text-primary" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-6 text-2xl font-bold",
				children: "Machinery Listed Successfully"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-3 max-w-lg text-muted-foreground",
				children: "Your machinery listing has been prepared successfully. Farmers can discover it through the machinery marketplace."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col justify-center gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onViewMachinery,
					className: "rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90",
					children: "View Machinery"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onListAnother,
					className: "rounded-xl border px-5 py-3 text-sm font-semibold transition hover:bg-muted",
					children: "List Another"
				})]
			})
		]
	});
}
//#endregion
export { ListMachineryPage as component };
