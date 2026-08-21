import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { L as CalendarCheck, S as Leaf, h as Mic, i as Tractor, n as Users, s as Sprout, z as BadgeCheck } from "../_libs/lucide-react.mjs";
import { t as tractor_default } from "./tractor-BxFqVpAI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BkvjlcK9.js
var import_jsx_runtime = require_jsx_runtime();
var FEATURES = [
	{
		icon: Tractor,
		title: "Machinery marketplace",
		body: "Search tractors, harvesters, rotavators and more listed by farmers around you."
	},
	{
		icon: CalendarCheck,
		title: "Real availability & booking",
		body: "Every booking is checked against existing bookings, so double-booking is impossible."
	},
	{
		icon: Mic,
		title: "Voice-first search",
		body: "Say “मुझे दो दिन के लिए ट्रैक्टर चाहिए” and get matching machinery instantly."
	},
	{
		icon: Leaf,
		title: "Crop residue exchange",
		body: "Sell wheat straw, husk and stubble instead of burning it."
	},
	{
		icon: Users,
		title: "Farmer community",
		body: "Ask questions about machinery, prices and government schemes."
	},
	{
		icon: BadgeCheck,
		title: "Trust & ratings",
		body: "Verified profiles, ratings and reviews after every completed rental."
	}
];
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg font-semibold",
							children: "Kisan Connect"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							children: "Login"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground",
						children: "Smart India Hackathon 2026 · S12"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 text-4xl font-bold leading-tight md:text-5xl",
						children: "जोड़ें किसान, बढ़े हिंदुस्तान"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg text-muted-foreground",
						children: "Kisan Connect is a rural resource-exchange network. Find under-used farm machinery near you, check real availability, and book it — or earn by lending your own equipment."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							search: { mode: "signup" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								className: "h-12 px-8 text-base",
								children: "Get Started"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								variant: "outline",
								className: "h-12 px-8 text-base",
								children: "Login"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted-foreground",
						children: "Works on any smartphone browser. No app install needed."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: tractor_default,
					alt: "Tractor parked beside a green field in rural India",
					width: 1024,
					height: 640,
					className: "rounded-2xl border border-border object-cover shadow-[var(--shadow-lift)]"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border bg-card/60",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 py-14",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-semibold",
						children: "What you can do"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: FEATURES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-surface p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-6 w-6 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-3 font-semibold",
									children: f.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: f.body
								})
							]
						}, f.title))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground",
					children: "Kisan Connect · Integrated Rural Resource-Exchange Platform prototype."
				})
			})
		]
	});
}
//#endregion
export { Landing as component };
