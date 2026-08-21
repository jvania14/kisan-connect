import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DtNBHlnt.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useAuth } from "./router-CBtCpRAA.mjs";
import { n as cn, t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { t as Label } from "./label-B4PTMSG2.mjs";
import { x as LoaderCircle } from "../_libs/lucide-react.mjs";
import { r as MACHINERY_CATEGORIES, u as toISODate } from "./kisan-ratsXnAN.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DUy71i1r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/list-machinery-DSd8vf-r.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
function ListMachinery() {
	const { user, profile } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		category: "Tractor",
		brand: "",
		model: "",
		description: "",
		terms: "",
		price_per_day: "",
		state: profile?.state ?? "",
		district: profile?.district ?? "",
		village: profile?.village ?? "",
		image_url: "",
		available_from: toISODate(/* @__PURE__ */ new Date()),
		available_until: ""
	});
	const set = (k, v) => setForm((f) => ({
		...f,
		[k]: v
	}));
	const submit = async (e) => {
		e.preventDefault();
		if (!user) return;
		const price = Number(form.price_per_day);
		if (form.name.trim().length < 3) {
			toast.error("Enter the machinery name.");
			return;
		}
		if (!Number.isFinite(price) || price <= 0) {
			toast.error("Enter a valid price per day.");
			return;
		}
		if (form.available_until && form.available_until < form.available_from) {
			toast.error("Available-until must be after available-from.");
			return;
		}
		setBusy(true);
		const { data, error } = await supabase.from("machinery").insert({
			owner_id: user.id,
			name: form.name.trim(),
			category: form.category,
			brand: form.brand.trim() || null,
			model: form.model.trim() || null,
			description: form.description.trim() || null,
			terms: form.terms.trim() || null,
			price_per_day: price,
			state: form.state.trim() || null,
			district: form.district.trim() || null,
			village: form.village.trim() || null,
			latitude: profile?.latitude ?? null,
			longitude: profile?.longitude ?? null,
			image_url: form.image_url.trim() || null,
			available_from: form.available_from || null,
			available_until: form.available_until || null
		}).select("id").single();
		setBusy(false);
		if (error || !data) {
			toast.error(`Could not save listing: ${error?.message ?? "unknown error"}`);
			return;
		}
		await queryClient.invalidateQueries({ queryKey: ["machinery-all"] });
		await queryClient.invalidateQueries({ queryKey: ["my-listings"] });
		toast.success("Machinery listed successfully");
		navigate({
			to: "/machinery/$id",
			params: { id: data.id }
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold",
				children: "List your machinery"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Earn from equipment that is idle. Your listing appears in the marketplace immediately."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "card-surface mt-6 space-y-4 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "name",
							children: "Machinery name *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "name",
							className: "h-12",
							value: form.name,
							onChange: (e) => set("name", e.target.value),
							placeholder: "Mahindra 575 DI Tractor"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Category *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: form.category,
									onValueChange: (v) => set("category", v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "h-12",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: MACHINERY_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: c,
										children: c
									}, c)) })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "brand",
									children: "Brand"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "brand",
									className: "h-12",
									value: form.brand,
									onChange: (e) => set("brand", e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "model",
									children: "Model"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "model",
									className: "h-12",
									value: form.model,
									onChange: (e) => set("model", e.target.value)
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "desc",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "desc",
							rows: 3,
							value: form.description,
							onChange: (e) => set("description", e.target.value),
							placeholder: "Condition, horsepower, what work it suits…"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "price",
							children: "Price per day (₹) *"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "price",
							type: "number",
							inputMode: "numeric",
							min: 1,
							className: "h-12",
							value: form.price_per_day,
							onChange: (e) => set("price_per_day", e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "village",
									children: "Village"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "village",
									className: "h-12",
									value: form.village,
									onChange: (e) => set("village", e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "district",
									children: "District"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "district",
									className: "h-12",
									value: form.district,
									onChange: (e) => set("district", e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "state",
									children: "State"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "state",
									className: "h-12",
									value: form.state,
									onChange: (e) => set("state", e.target.value)
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "from",
								children: "Available from"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "from",
								type: "date",
								className: "h-12",
								value: form.available_from,
								onChange: (e) => set("available_from", e.target.value)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "until",
								children: "Available until"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "until",
								type: "date",
								className: "h-12",
								value: form.available_until,
								onChange: (e) => set("available_until", e.target.value)
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "img",
								children: "Image URL (optional)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "img",
								className: "h-12",
								value: form.image_url,
								onChange: (e) => set("image_url", e.target.value),
								placeholder: "https://…"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Leave blank to use a category illustration."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "terms",
							children: "Additional terms"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "terms",
							rows: 2,
							value: form.terms,
							onChange: (e) => set("terms", e.target.value),
							placeholder: "Fuel, driver, deposit…"
						})]
					}),
					!profile?.latitude && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-xl bg-muted p-3 text-xs text-muted-foreground",
						children: "Tip: add your map location in your profile so nearby farmers see the distance to this machine."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						className: "h-12 w-full text-base",
						disabled: busy,
						children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Publish listing"]
					})
				]
			})
		]
	});
}
//#endregion
export { ListMachinery as component };
