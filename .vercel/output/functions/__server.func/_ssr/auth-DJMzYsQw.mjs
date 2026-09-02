import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DtNBHlnt.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route$12 } from "./router-DPCKUlNX.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { t as Label } from "./label-B4PTMSG2.mjs";
import { R as LoaderCircle, _ as Sprout } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-DJMzYsQw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const { mode } = Route$12.useSearch();
	const navigate = useNavigate();
	const [isSignup, setIsSignup] = (0, import_react.useState)(mode === "signup");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) navigate({ to: "/dashboard" });
		});
	}, [navigate]);
	const submit = async (e) => {
		e.preventDefault();
		if (busy) return;
		if (!email.trim() || password.length < 6) {
			toast.error("Enter a valid email and a password of at least 6 characters.");
			return;
		}
		if (isSignup && name.trim().length < 2) {
			toast.error("Please enter your name.");
			return;
		}
		setBusy(true);
		try {
			if (isSignup) {
				const { data, error } = await supabase.auth.signUp({
					email: email.trim(),
					password,
					options: {
						emailRedirectTo: `${window.location.origin}/dashboard`,
						data: { name: name.trim() }
					}
				});
				if (error) throw error;
				if (!data.session) {
					toast.success("Account created. Please confirm your email, then log in.");
					setIsSignup(false);
					return;
				}
				toast.success("Account created");
				navigate({ to: "/profile" });
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email: email.trim(),
					password
				});
				if (error) throw error;
				toast.success("Welcome back");
				navigate({ to: "/dashboard" });
			}
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Authentication failed");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "mb-6 flex items-center justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xl font-semibold",
					children: "Kisan Connect"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-semibold",
						children: isSignup ? "Create your account" : "Login"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: isSignup ? "Join the farmer network and start renting or lending machinery." : "Welcome back. Enter your details to continue."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "mt-6 space-y-4",
						children: [
							isSignup && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "name",
									children: "Full name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "name",
									value: name,
									onChange: (e) => setName(e.target.value),
									placeholder: "Ramesh Choudhary",
									className: "h-12",
									autoComplete: "name"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "email",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "email",
									type: "email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									placeholder: "you@example.com",
									className: "h-12",
									autoComplete: "email"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "password",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "password",
									type: "password",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									placeholder: "At least 6 characters",
									className: "h-12",
									autoComplete: isSignup ? "new-password" : "current-password"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								className: "h-12 w-full text-base",
								disabled: busy,
								children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), isSignup ? "Create account" : "Login"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setIsSignup((v) => !v),
						className: "mt-5 w-full text-sm text-muted-foreground underline-offset-4 hover:underline",
						children: isSignup ? "Already have an account? Login" : "New here? Create an account"
					})
				]
			})]
		})
	});
}
//#endregion
export { AuthPage as component };
