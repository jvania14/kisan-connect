import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { $ as ChevronRight, B as IndianRupee, E as Pencil, F as MapPin, T as Phone, W as FileCheckCorner, b as ShieldCheck, ct as BadgeCheck, f as Tractor, it as CalendarDays, m as Store, n as X, o as Users, s as User, tt as Check } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-BgyNJPAs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const navigate = useNavigate();
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("Vania Farmer");
	const [phone, setPhone] = (0, import_react.useState)("+91 98XXXXXX42");
	const [village, setVillage] = (0, import_react.useState)("Nashik");
	const [district, setDistrict] = (0, import_react.useState)("Nashik");
	const [role, setRole] = (0, import_react.useState)("Farmer");
	const saveProfile = () => {
		setEditing(false);
		setSaved(true);
		window.setTimeout(() => {
			setSaved(false);
		}, 3e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-surface overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-24 bg-primary/10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "-mt-10 px-6 pb-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-between gap-5 md:flex-row md:items-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-background bg-secondary shadow-sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-9 w-9 text-muted-foreground" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-2xl font-bold",
										children: name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerifiedBadge, {})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [
										role,
										" • ",
										district,
										", Maharashtra"
									]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => setEditing(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "mr-2 h-4 w-4" }), "Edit Profile"]
						})]
					})
				})]
			}),
			saved && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Profile updated successfully."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-surface p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-5 md:flex-row md:items-center md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold text-primary",
								children: "TRUST & VERIFICATION"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-lg font-semibold",
								children: "Verified profile"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 max-w-2xl text-sm leading-6 text-muted-foreground",
								children: "Verification helps farmers and buyers make safer direct transactions and reduces information asymmetry."
							})
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 self-start rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-4 w-4" }), "Verified"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-3 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerificationItem, {
							icon: User,
							title: "Identity",
							status: "Verified"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerificationItem, {
							icon: Phone,
							title: "Mobile",
							status: "Verified"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerificationItem, {
							icon: MapPin,
							title: "Location",
							status: "Verified"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "card-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold",
							children: "Profile information"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Information used across your Kisan Connect account."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileRow, {
								icon: User,
								label: "Name",
								value: name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileRow, {
								icon: Phone,
								label: "Mobile",
								value: phone
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileRow, {
								icon: MapPin,
								label: "Village / Location",
								value: village
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileRow, {
								icon: MapPin,
								label: "District",
								value: district
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileRow, {
								icon: Users,
								label: "Account type",
								value: role
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "card-surface p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold",
							children: "Your role on Kisan Connect"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Your role determines the services you can use."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleCard, {
								active: role === "Farmer",
								icon: User,
								title: "Farmer",
								text: "Sell crops, compare mandi prices and find buyers.",
								onClick: () => setRole("Farmer")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleCard, {
								active: role === "Buyer",
								icon: Store,
								title: "Buyer",
								text: "Discover verified farmers and purchase sale lots.",
								onClick: () => setRole("Buyer")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleCard, {
								active: role === "Machinery Owner",
								icon: Tractor,
								title: "Machinery Owner",
								text: "List equipment and earn from idle machinery.",
								onClick: () => setRole("Machinery Owner")
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card-surface p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Account activity"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Your activity across the platform."
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityCard, {
							label: "Sale lots",
							value: "3",
							description: "Created"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityCard, {
							label: "Buyer offers",
							value: "7",
							description: "Received"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityCard, {
							label: "Transactions",
							value: "2",
							description: "Completed"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityCard, {
							label: "Community",
							value: "14",
							description: "Posts & replies"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: "Quick actions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Jump directly to the tools you use most."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, {
						icon: IndianRupee,
						title: "Market Prices",
						text: "Compare mandi prices",
						onClick: () => navigate({ to: "/dashboard" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, {
						icon: Store,
						title: "Find Buyers",
						text: "View matched buyers",
						onClick: () => navigate({ to: "/dashboard" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, {
						icon: Tractor,
						title: "Machinery",
						text: "Find farm equipment",
						onClick: () => navigate({
							to: "/machinery",
							search: {
								q: "",
								category: "",
								start: "",
								end: ""
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAction, {
						icon: Users,
						title: "Community",
						text: "Connect with farmers",
						onClick: () => navigate({ to: "/community" })
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-primary/20 bg-primary/5 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileCheckCorner, { className: "mt-0.5 h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-primary",
							children: "TRUSTED MARKETPLACE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-xl font-bold",
							children: "Better information leads to better decisions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-3xl text-sm leading-6 text-muted-foreground",
							children: "Kisan Connect is designed around evidence: market prices, arrivals, buyer offers, quality information, distance, transaction status and verified participants. The objective is to help farmers make informed selling decisions rather than simply repeat what a buyer says."
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-3 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustCard, {
							title: "Price transparency",
							text: "Compare market prices before accepting an offer."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustCard, {
							title: "Verified participants",
							text: "Build trust between farmers and direct buyers."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustCard, {
							title: "Digital records",
							text: "Keep offers and transaction progress traceable."
						})
					]
				})]
			}),
			editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditProfileModal, {
				name,
				phone,
				village,
				district,
				role,
				setName,
				setPhone,
				setVillage,
				setDistrict,
				setRole,
				onClose: () => setEditing(false),
				onSave: saveProfile
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-secondary p-4 text-xs leading-5 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Prototype note:" }), " verification status and profile statistics shown here are demonstration data. Production deployment should connect identity, farmer/buyer verification and profile information to the application's database."]
			})
		]
	});
}
function EditProfileModal({ name, phone, village, district, role, setName, setPhone, setVillage, setDistrict, setRole, onClose, onSave }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between border-b border-border p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold text-primary",
						children: "PROFILE SETTINGS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-xl font-bold",
						children: "Edit profile"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "rounded-lg p-2 hover:bg-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditField, {
							label: "Full name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: name,
								onChange: (event) => setName(event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditField, {
							label: "Mobile number",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: phone,
								onChange: (event) => setPhone(event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditField, {
							label: "Village / Location",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: village,
								onChange: (event) => setVillage(event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditField, {
							label: "District",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: district,
								onChange: (event) => setDistrict(event.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditField, {
							label: "Account type",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: role,
								onChange: (event) => setRole(event.target.value),
								className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Farmer" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Buyer" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Machinery Owner" })
								]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col-reverse gap-2 border-t border-border p-5 sm:flex-row sm:justify-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: onClose,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: onSave,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mr-2 h-4 w-4" }), "Save Changes"]
					})]
				})
			]
		})
	});
}
function VerifiedBadge() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "h-3.5 w-3.5" }), "Verified"]
	});
}
function VerificationItem({ icon: Icon, title, status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between rounded-xl border border-border p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-9 w-9 items-center justify-center rounded-lg bg-secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-primary" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: status
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-primary" })]
	});
}
function ProfileRow({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 rounded-xl bg-secondary p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] uppercase tracking-wide text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 truncate text-sm font-medium",
				children: value
			})]
		})]
	});
}
function RoleCard({ active, icon: Icon, title, text, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: `w-full rounded-xl border p-4 text-left transition ${active ? "border-primary bg-primary/5" : "border-border hover:bg-secondary"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `flex h-10 w-10 items-center justify-center rounded-lg ${active ? "bg-primary text-primary-foreground" : "bg-secondary"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs leading-5 text-muted-foreground",
						children: text
					})]
				}),
				active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5 text-primary" })
			]
		})
	});
}
function ActivityCard({ label, value, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-2xl font-bold",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: description
			})
		]
	});
}
function QuickAction({ icon: Icon, title, text, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "card-surface flex items-center gap-4 p-4 text-left transition hover:-translate-y-0.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-primary" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: text
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
		]
	});
}
function TrustCard({ title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs leading-5 text-muted-foreground",
			children: text
		})]
	});
}
function EditField({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "mb-2 block text-sm font-medium",
		children: label
	}), children] });
}
//#endregion
export { ProfilePage as component };
