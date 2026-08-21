import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DtNBHlnt.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useAuth } from "./router-CBtCpRAA.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { t as Label } from "./label-B4PTMSG2.mjs";
import { x as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as LANGUAGES, t as FARMER_TYPES } from "./kisan-ratsXnAN.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DUy71i1r.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-CMvN3kgK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const { user, profile, profileLoading, refreshProfile } = useAuth();
	const navigate = useNavigate();
	const isNew = !profile;
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		phone: "",
		village: "",
		district: "",
		state: "",
		preferred_language: "hi",
		farmer_type: "Owner Farmer",
		profile_image: ""
	});
	const [coords, setCoords] = (0, import_react.useState)({
		lat: null,
		lng: null
	});
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (profile) {
			setForm({
				name: profile.name ?? "",
				phone: profile.phone ?? "",
				village: profile.village ?? "",
				district: profile.district ?? "",
				state: profile.state ?? "",
				preferred_language: profile.preferred_language ?? "hi",
				farmer_type: profile.farmer_type ?? "Owner Farmer",
				profile_image: profile.profile_image ?? ""
			});
			setCoords({
				lat: profile.latitude,
				lng: profile.longitude
			});
		} else if (user) {
			const metaName = user.user_metadata?.name;
			setForm((f) => ({
				...f,
				name: f.name || metaName || ""
			}));
		}
	}, [profile, user]);
	const useMyLocation = () => {
		if (!("geolocation" in navigator)) {
			toast.error("Location is not available in this browser.");
			return;
		}
		navigator.geolocation.getCurrentPosition((pos) => {
			setCoords({
				lat: pos.coords.latitude,
				lng: pos.coords.longitude
			});
			toast.success("Location captured");
		}, () => toast.error("Could not read your location. You can still save the text address."));
	};
	const save = async (e) => {
		e.preventDefault();
		if (!user) return;
		if (form.name.trim().length < 2) {
			toast.error("Please enter your name.");
			return;
		}
		setBusy(true);
		const payload = {
			id: user.id,
			name: form.name.trim(),
			phone: form.phone.trim() || null,
			email: user.email ?? null,
			village: form.village.trim() || null,
			district: form.district.trim() || null,
			state: form.state.trim() || null,
			latitude: coords.lat,
			longitude: coords.lng,
			preferred_language: form.preferred_language,
			farmer_type: form.farmer_type,
			profile_image: form.profile_image.trim() || null
		};
		const { error } = await supabase.from("profiles").upsert(payload, { onConflict: "id" });
		setBusy(false);
		if (error) {
			toast.error(`Could not save profile: ${error.message}`);
			return;
		}
		toast.success("Profile saved");
		await refreshProfile();
		if (isNew) navigate({ to: "/dashboard" });
	};
	if (profileLoading && !profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold",
				children: isNew ? "Set up your farmer profile" : "My profile"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Your village and location help us show machinery closest to you."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: save,
				className: "card-surface mt-6 space-y-4 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Full name",
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "h-12",
							value: form.name,
							onChange: (e) => setForm({
								...form,
								name: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Phone number",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "h-12",
							inputMode: "tel",
							value: form.phone,
							onChange: (e) => setForm({
								...form,
								phone: e.target.value
							}),
							placeholder: "+91…"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Village / City",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "h-12",
									value: form.village,
									onChange: (e) => setForm({
										...form,
										village: e.target.value
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "District",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "h-12",
									value: form.district,
									onChange: (e) => setForm({
										...form,
										district: e.target.value
									})
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "State",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "h-12",
									value: form.state,
									onChange: (e) => setForm({
										...form,
										state: e.target.value
									})
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Preferred language",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.preferred_language,
								onValueChange: (v) => setForm({
									...form,
									preferred_language: v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "h-12",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: LANGUAGES.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: l.value,
									children: l.label
								}, l.value)) })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Farmer type",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.farmer_type,
								onValueChange: (v) => setForm({
									...form,
									farmer_type: v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "h-12",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: FARMER_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: t,
									children: t
								}, t)) })]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Profile image URL (optional)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "h-12",
							value: form.profile_image,
							onChange: (e) => setForm({
								...form,
								profile_image: e.target.value
							}),
							placeholder: "https://…"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-muted p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: "Map location"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: coords.lat != null && coords.lng != null ? `Saved: ${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}` : "Not set — distances to machinery will be hidden until you add it."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								className: "mt-3",
								onClick: useMyLocation,
								children: "Use my current location"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						className: "h-12 w-full text-base",
						disabled: busy,
						children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), isNew ? "Save and continue" : "Save changes"]
					})
				]
			}),
			profile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-surface mt-4 p-5 text-sm text-muted-foreground",
				children: [
					"Member since ",
					new Date(profile.created_at).toLocaleDateString("en-IN"),
					" ·",
					" ",
					profile.is_verified ? "Verified farmer" : "Verification pending",
					" · Rating",
					" ",
					Number(profile.rating).toFixed(1)
				]
			})
		]
	});
}
function Field({ label, children, required }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [label, required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-destructive",
			children: " *"
		})] }), children]
	});
}
//#endregion
export { ProfilePage as component };
