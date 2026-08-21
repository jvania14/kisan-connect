import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DtNBHlnt.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, k as redirect, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CBtCpRAA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var AuthContext = (0, import_react.createContext)(void 0);
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [profileLoading, setProfileLoading] = (0, import_react.useState)(false);
	const loadProfile = (0, import_react.useCallback)(async (userId) => {
		if (!userId) {
			setProfile(null);
			return;
		}
		setProfileLoading(true);
		const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
		if (error) console.error("Failed to load profile", error);
		setProfile(data ?? null);
		setProfileLoading(false);
	}, []);
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
			setSession(newSession);
			if (!newSession) setProfile(null);
		});
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setLoading(false);
		});
		return () => sub.subscription.unsubscribe();
	}, []);
	(0, import_react.useEffect)(() => {
		loadProfile(session?.user?.id);
	}, [session?.user?.id, loadProfile]);
	const value = {
		session,
		user: session?.user ?? null,
		profile,
		loading,
		profileLoading,
		refreshProfile: () => loadProfile(session?.user?.id),
		signOut: async () => {
			await supabase.auth.signOut();
			setProfile(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	const ctx = (0, import_react.useContext)(AuthContext);
	if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
	return ctx;
}
var styles_default = "/assets/styles-kA4ob56U.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$14 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Kisan Connect" },
			{
				name: "description",
				content: "Kisan Connect — rural resource-exchange platform for farm machinery and crop residues."
			},
			{
				property: "og:title",
				content: "Kisan Connect"
			},
			{
				property: "og:description",
				content: "Rent and lend farm machinery near you. जोड़ें किसान, बढ़े हिंदुस्तान."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/favicon.ico",
			type: "image/x-icon"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$14.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-center",
			richColors: true
		})] })
	});
}
var $$splitComponentImporter$13 = () => import("./routes-BkvjlcK9.mjs");
var Route$13 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Kisan Connect — Rent Farm Machinery Near You" },
		{
			name: "description",
			content: "Kisan Connect lets farmers discover, rent and lend tractors, harvesters and crop residues nearby, with voice search in Hindi."
		},
		{
			property: "og:title",
			content: "Kisan Connect — Rent Farm Machinery Near You"
		},
		{
			property: "og:description",
			content: "A rural resource-exchange platform: find machinery nearby, check real availability and book in a few taps."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./route-2HznHBD1.mjs");
var Route$12 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./auth-CKFSYqOC.mjs");
var Route$11 = createFileRoute("/auth")({
	ssr: false,
	validateSearch: (search) => ({ mode: search["mode"] === "signup" ? "signup" : "login" }),
	head: () => ({ meta: [
		{ title: "Login or Sign Up — Kisan Connect" },
		{
			name: "description",
			content: "Sign in to Kisan Connect to rent farm machinery, list your equipment and manage bookings."
		},
		{
			property: "og:title",
			content: "Login or Sign Up — Kisan Connect"
		},
		{
			property: "og:description",
			content: "Access your Kisan Connect farmer account."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./bookings-BS68_g-G.mjs");
var Route$10 = createFileRoute("/_authenticated/bookings")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./community-Cu_6Rtvn.mjs");
var Route$9 = createFileRoute("/_authenticated/community")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./dashboard-DR5XYgSA.mjs");
var Route$8 = createFileRoute("/_authenticated/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./list-machinery-DSd8vf-r.mjs");
var Route$7 = createFileRoute("/_authenticated/list-machinery")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./listings-CsbBpzir.mjs");
var Route$6 = createFileRoute("/_authenticated/listings")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./notifications-iG9XqQt9.mjs");
var Route$5 = createFileRoute("/_authenticated/notifications")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./profile-CMvN3kgK.mjs");
var Route$4 = createFileRoute("/_authenticated/profile")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./residues-BjQL3srJ.mjs");
var Route$3 = createFileRoute("/_authenticated/residues")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./voice-CJ6ThAXY.mjs");
var Route$2 = createFileRoute("/_authenticated/voice")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./machinery.index-BunogeCU.mjs");
var Route$1 = createFileRoute("/_authenticated/machinery/")({
	validateSearch: (search) => ({
		q: typeof search["q"] === "string" ? search["q"] : "",
		category: typeof search["category"] === "string" ? search["category"] : "",
		start: typeof search["start"] === "string" ? search["start"] : "",
		end: typeof search["end"] === "string" ? search["end"] : ""
	}),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./machinery._id-ByCKiowj.mjs");
var Route = createFileRoute("/_authenticated/machinery/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$13.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$14
});
var AuthenticatedRouteRoute = Route$12.update({
	id: "/_authenticated",
	getParentRoute: () => Route$14
});
var AuthRoute = Route$11.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$14
});
var AuthenticatedBookingsRoute = Route$10.update({
	id: "/bookings",
	path: "/bookings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCommunityRoute = Route$9.update({
	id: "/community",
	path: "/community",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$8.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedListMachineryRoute = Route$7.update({
	id: "/list-machinery",
	path: "/list-machinery",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedListingsRoute = Route$6.update({
	id: "/listings",
	path: "/listings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedNotificationsRoute = Route$5.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedProfileRoute = Route$4.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedResiduesRoute = Route$3.update({
	id: "/residues",
	path: "/residues",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedVoiceRoute = Route$2.update({
	id: "/voice",
	path: "/voice",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedMachineryIndexRoute = Route$1.update({
	id: "/machinery/",
	path: "/machinery/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedBookingsRoute,
	AuthenticatedCommunityRoute,
	AuthenticatedDashboardRoute,
	AuthenticatedListMachineryRoute,
	AuthenticatedListingsRoute,
	AuthenticatedNotificationsRoute,
	AuthenticatedProfileRoute,
	AuthenticatedResiduesRoute,
	AuthenticatedVoiceRoute,
	AuthenticatedMachineryIdRoute: Route.update({
		id: "/machinery/$id",
		path: "/machinery/$id",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedMachineryIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute
};
var routeTree = Route$14._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { useAuth as a, Route$11 as i, Route as n, Route$1 as r, router_exports as t };
