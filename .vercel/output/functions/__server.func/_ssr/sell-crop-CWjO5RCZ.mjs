import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as Package, V as ImagePlus, Z as CircleCheck, _ as Sparkles, ct as BadgeCheck, ft as ArrowLeft, x as Send } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sell-crop-CWjO5RCZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SellCrop() {
	const [crop, setCrop] = (0, import_react.useState)("Tomato");
	const [quantity, setQuantity] = (0, import_react.useState)("500");
	const [grade, setGrade] = (0, import_react.useState)("Grade A");
	const [expectedPrice, setExpectedPrice] = (0, import_react.useState)("3000");
	const [location, setLocation] = (0, import_react.useState)("Nashik");
	const [published, setPublished] = (0, import_react.useState)(false);
	const publishLot = () => {
		setPublished(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-[#faf9f2] px-4 py-8 md:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-8 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/dashboard",
					className: "rounded-xl border bg-white p-2 hover:bg-gray-50",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 20 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold uppercase tracking-wider text-green-700",
						children: "Direct Selling"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-bold",
						children: "Create Sale Lot"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-gray-600",
						children: "Publish your crop once and receive offers from matching buyers."
					})
				] })]
			}), published ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border bg-white p-10 text-center shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
						size: 70,
						className: "mx-auto mb-5 text-green-600"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-bold",
						children: "Sale Lot Published!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mx-auto mt-3 max-w-xl text-gray-600",
						children: [
							"Your ",
							quantity,
							" kg ",
							crop,
							" lot has been published for verified buyers."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto mt-7 max-w-md rounded-2xl bg-green-50 p-5 text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-green-700",
								children: "Expected Price"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-2xl font-bold text-green-900",
								children: [
									"₹",
									expectedPrice,
									"/q"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid grid-cols-2 gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gray-500",
									children: "Quantity"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-bold",
									children: [quantity, " kg"]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gray-500",
									children: "Quality"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold",
									children: grade
								})] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 flex flex-col justify-center gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/buyer-marketplace",
							className: "rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800",
							children: "Find Matching Buyers"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setPublished(false),
							className: "rounded-xl border px-6 py-3 font-semibold hover:bg-gray-50",
							children: "Create Another Lot"
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-7 lg:grid-cols-[1fr_350px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-3xl border bg-white p-6 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-xl bg-green-100 p-3 text-green-700",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { size: 24 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold",
								children: "Crop Details"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-gray-500",
								children: "Add details buyers need before making an offer."
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-5 md:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Crop",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: crop,
										onChange: (e) => setCrop(e.target.value),
										className: "input",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Tomato" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Onion" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Potato" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Wheat" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Rice" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Sugarcane" })
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Quantity (kg)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: quantity,
										onChange: (e) => setQuantity(e.target.value),
										type: "number",
										className: "input",
										placeholder: "500"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Quality / Grade",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: grade,
										onChange: (e) => setGrade(e.target.value),
										className: "input",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Grade A" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Grade B" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Grade C" })
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Expected Price (₹/quintal)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: expectedPrice,
										onChange: (e) => setExpectedPrice(e.target.value),
										type: "number",
										className: "input"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Pickup / Collection Location",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: location,
										onChange: (e) => setLocation(e.target.value),
										className: "input"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-2 block text-sm font-semibold",
									children: "Crop Photos"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "flex h-[50px] w-full items-center justify-center gap-2 rounded-xl border border-dashed text-gray-600 hover:bg-gray-50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { size: 19 }), "Add Photos"]
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 rounded-2xl bg-blue-50 p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {
									className: "mt-0.5 text-blue-700",
									size: 20
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-blue-900",
									children: "Quality improves price discovery"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-blue-800",
									children: "Add accurate quality information so buyers can compare your lot fairly."
								})] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: publishLot,
							className: "mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3.5 font-bold text-white hover:bg-green-800",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 18 }), "Publish Sale Lot"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border bg-white p-6 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
									className: "text-green-700",
									size: 21
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold",
									children: "Smart Selling Insight"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-6 text-gray-600",
								children: "Current market conditions show strong buyer demand for tomatoes. Your expected price is within the current market range."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 rounded-2xl bg-green-50 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-green-700",
									children: "Suggested market range"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-2xl font-bold text-green-900",
									children: "₹2,850 – ₹3,070/q"
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border bg-white p-6 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold",
							children: "What happens next?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
									number: "1",
									text: "Your lot is published"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
									number: "2",
									text: "Matching buyers are notified"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
									number: "3",
									text: "You compare digital offers"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
									number: "4",
									text: "Accept the best offer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
									number: "5",
									text: "Track payment & delivery"
								})
							]
						})]
					})]
				})]
			})]
		})
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "mb-2 block text-sm font-semibold",
		children: label
	}), children] });
}
function Step({ number, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-800",
			children: number
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-gray-700",
			children: text
		})]
	});
}
//#endregion
export { SellCrop as component };
