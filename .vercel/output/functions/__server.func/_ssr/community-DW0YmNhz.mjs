import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { F as MapPin, G as Eye, H as Heart, K as Ellipsis, M as MessageSquare, N as MessageCircle, S as Search, Z as CircleCheck, d as TrendingUp, dt as ArrowRight, et as ChevronDown, f as Tractor, n as X, o as Users, p as Tag, q as Clock3, w as Plus, x as Send, y as ShoppingCart } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community-DW0YmNhz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INITIAL_POSTS = [
	{
		id: 1,
		farmer: "Suresh Patil",
		location: "Nashik, Maharashtra",
		time: "18 min ago",
		category: "Market",
		title: "Tomato prices are moving up in Nashik",
		content: "Today's modal price is around ₹2,850/q. I am seeing stronger buyer demand compared with the last few days. Anyone else planning to sell this week?",
		likes: 24,
		comments: 8,
		views: 184,
		liked: false,
		verified: true,
		tag: "Tomato"
	},
	{
		id: 2,
		farmer: "Priya Jadhav",
		location: "Pune, Maharashtra",
		time: "42 min ago",
		category: "Buyers",
		title: "Looking for a bulk buyer for onions",
		content: "I have approximately 1.2 tonnes of Grade A onions ready for sale. Prefer a verified buyer within 50 km of Pune.",
		likes: 18,
		comments: 11,
		views: 143,
		liked: false,
		verified: true,
		tag: "Onion"
	},
	{
		id: 3,
		farmer: "Ganesh Shinde",
		location: "Ahmednagar, Maharashtra",
		time: "1 hr ago",
		category: "Machinery",
		title: "Tractor available after tomorrow",
		content: "My tractor will be available for rental from Thursday. Suitable for field preparation and transport. Farmers nearby can check the machinery section for details.",
		likes: 13,
		comments: 5,
		views: 97,
		liked: false,
		verified: true,
		tag: "Tractor"
	},
	{
		id: 4,
		farmer: "Ravi More",
		location: "Nandurbar, Maharashtra",
		time: "2 hrs ago",
		category: "Farming Tips",
		title: "How are you reducing post-harvest losses?",
		content: "I started sorting produce into separate quality grades before approaching buyers. It has made price discussions much easier.",
		likes: 31,
		comments: 14,
		views: 221,
		liked: false,
		verified: false,
		tag: "Quality"
	},
	{
		id: 5,
		farmer: "Meena Pawar",
		location: "Washim, Maharashtra",
		time: "4 hrs ago",
		category: "Crop",
		title: "Anyone growing soybean this season?",
		content: "Looking to compare input costs and expected selling prices with farmers from nearby districts.",
		likes: 17,
		comments: 9,
		views: 132,
		liked: false,
		verified: true,
		tag: "Soybean"
	}
];
var CATEGORIES = [
	"All",
	"Market",
	"Crop",
	"Machinery",
	"Farming Tips",
	"Buyers"
];
function Community() {
	const navigate = useNavigate();
	const [posts, setPosts] = (0, import_react.useState)(INITIAL_POSTS);
	const [activeCategory, setActiveCategory] = (0, import_react.useState)("All");
	const [search, setSearch] = (0, import_react.useState)("");
	const [showCreatePost, setShowCreatePost] = (0, import_react.useState)(false);
	const [showComments, setShowComments] = (0, import_react.useState)(null);
	const [commentText, setCommentText] = (0, import_react.useState)("");
	const [newPost, setNewPost] = (0, import_react.useState)({
		title: "",
		content: "",
		category: "Market",
		tag: ""
	});
	const filteredPosts = (0, import_react.useMemo)(() => {
		const query = search.trim().toLowerCase();
		return posts.filter((post) => {
			const matchesCategory = activeCategory === "All" || post.category === activeCategory;
			const matchesSearch = !query || post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query) || post.farmer.toLowerCase().includes(query) || post.location.toLowerCase().includes(query) || post.tag?.toLowerCase().includes(query);
			return matchesCategory && matchesSearch;
		});
	}, [
		activeCategory,
		posts,
		search
	]);
	const toggleLike = (id) => {
		setPosts((current) => current.map((post) => post.id === id ? {
			...post,
			liked: !post.liked,
			likes: post.liked ? post.likes - 1 : post.likes + 1
		} : post));
	};
	const createPost = () => {
		if (!newPost.title.trim() || !newPost.content.trim()) return;
		const post = {
			id: Date.now(),
			farmer: "You",
			location: "Maharashtra",
			time: "Just now",
			category: newPost.category,
			title: newPost.title.trim(),
			content: newPost.content.trim(),
			likes: 0,
			comments: 0,
			views: 0,
			liked: false,
			verified: true,
			tag: newPost.tag.trim() || void 0
		};
		setPosts((current) => [post, ...current]);
		setNewPost({
			title: "",
			content: "",
			category: "Market",
			tag: ""
		});
		setShowCreatePost(false);
	};
	const addComment = (id) => {
		if (!commentText.trim()) return;
		setPosts((current) => current.map((post) => post.id === id ? {
			...post,
			comments: post.comments + 1
		} : post));
		setCommentText("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "card-surface overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-between gap-5 md:flex-row md:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-6 w-6 text-primary" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl font-bold",
									children: "Farmer Community"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary",
									children: "Local Knowledge Network"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 max-w-2xl text-sm leading-6 text-muted-foreground",
								children: "Share market information, connect with nearby farmers, find buyers and exchange practical farming knowledge."
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => setShowCreatePost(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), "Create Post"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommunityStat, {
								icon: Users,
								value: "2,840+",
								label: "Farmers connected"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommunityStat, {
								icon: MapPin,
								value: "18",
								label: "Districts active"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommunityStat, {
								icon: TrendingUp,
								value: "640+",
								label: "Market discussions"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommunityStat, {
								icon: ShoppingCart,
								value: "320+",
								label: "Buyer connections"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-2xl border border-primary/20 bg-primary/5 p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "mt-0.5 h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: "Today's community market signal"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Nashik farmers are reporting stronger tomato demand. Check official market prices before making a selling decision."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: () => navigate({ to: "/dashboard" }),
						children: ["Open Market Dashboard", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "card-surface p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 lg:flex-row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: search,
							onChange: (event) => setSearch(event.target.value),
							placeholder: "Search farmers, crops, market discussions...",
							className: "pl-9"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: CATEGORIES.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setActiveCategory(category),
							className: `rounded-full px-4 py-2 text-sm font-medium transition ${activeCategory === category ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/70"}`,
							children: category
						}, category))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[1fr_320px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "Community discussions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								filteredPosts.length,
								" discussion",
								filteredPosts.length !== 1 ? "s" : ""
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex items-center gap-1 text-sm text-muted-foreground",
							children: ["Latest", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })]
						})]
					}), filteredPosts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyPosts, {}) : filteredPosts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostCard, {
						post,
						onLike: () => toggleLike(post.id),
						onComment: () => setShowComments(showComments === post.id ? null : post.id),
						showComments: showComments === post.id,
						commentText,
						onCommentTextChange: setCommentText,
						onAddComment: () => addComment(post.id)
					}, post.id))]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NearbyFarmers, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLinks, {
							onMarket: () => navigate({ to: "/dashboard" }),
							onBuyers: () => navigate({ to: "/dashboard#buyer-demand" }),
							onMachinery: () => navigate({
								to: "/machinery",
								search: {
									q: "",
									category: "",
									start: "",
									end: ""
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommunityGuidelines, {})
					]
				})]
			}),
			showCreatePost && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatePostModal, {
				post: newPost,
				onChange: setNewPost,
				onClose: () => setShowCreatePost(false),
				onPublish: createPost
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-secondary p-4 text-xs leading-5 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Community principle:" }), " farmer posts provide local knowledge and experience. Always verify market prices, buyer details and transaction terms through trusted sources before completing a sale."]
			})
		]
	});
}
function PostCard({ post, onLike, onComment, showComments, commentText, onCommentTextChange, onAddComment }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "card-surface overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary",
							children: post.farmer.charAt(0)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: post.farmer
							}), post.verified && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 text-xs text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), "Verified"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }), post.location]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "h-3 w-3" }), post.time]
								})
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-lg p-2 text-muted-foreground hover:bg-secondary",
						"aria-label": "More options",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-5 w-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary",
						children: post.category
					}), post.tag && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "h-3 w-3" }), post.tag]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-4 text-lg font-semibold",
					children: post.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-6 text-muted-foreground",
					children: post.content
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center gap-4 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [post.likes, " likes"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [post.comments, " comments"] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" }),
								post.views,
								" views"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex border-t border-border pt-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onLike,
							className: `flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition ${post.liked ? "text-primary" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `h-4 w-4 ${post.liked ? "fill-current" : ""}` }), "Like"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: onComment,
							className: "flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), "Comment"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground",
							children: "Share"
						})
					]
				}),
				showComments && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 rounded-xl bg-secondary/60 p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: commentText,
							onChange: (event) => onCommentTextChange(event.target.value),
							placeholder: "Add a useful comment...",
							onKeyDown: (event) => {
								if (event.key === "Enter") onAddComment();
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							onClick: onAddComment,
							disabled: !commentText.trim(),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
						})]
					})
				})
			]
		})
	});
}
function CreatePostModal({ post, onChange, onClose, onPublish }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-xl rounded-2xl border border-border bg-background shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-bold",
					children: "Create Community Post"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Share information that can help other farmers."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "rounded-lg p-2 hover:bg-secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-2 block text-sm font-medium",
						children: "Category"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							"Market",
							"Crop",
							"Machinery",
							"Farming Tips",
							"Buyers"
						].map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onChange({
								...post,
								category
							}),
							className: `rounded-full px-3 py-1.5 text-xs font-medium ${post.category === category ? "bg-primary text-primary-foreground" : "bg-secondary"}`,
							children: category
						}, category))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-2 block text-sm font-medium",
						children: "Title"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: post.title,
						onChange: (event) => onChange({
							...post,
							title: event.target.value
						}),
						placeholder: "Example: Tomato demand increasing in Nashik"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-2 block text-sm font-medium",
						children: "What do you want to share?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: post.content,
						onChange: (event) => onChange({
							...post,
							content: event.target.value
						}),
						placeholder: "Share market information, farming experience, buyer requirement, machinery availability...",
						className: "min-h-32 w-full rounded-xl border border-input bg-background px-3 py-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-2 block text-sm font-medium",
						children: "Crop / topic tag"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: post.tag,
						onChange: (event) => onChange({
							...post,
							tag: event.target.value
						}),
						placeholder: "Example: Tomato"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl bg-secondary p-3 text-xs leading-5 text-muted-foreground",
						children: "Avoid sharing private contact information or unverified price claims. Helpful, location-specific information is most valuable to the community."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: onClose,
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: onPublish,
							disabled: !post.title.trim() || !post.content.trim(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "mr-2 h-4 w-4" }), "Publish Post"]
						})]
					})
				]
			})]
		})
	});
}
function CommunityStat({ icon: Icon, value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl border border-border p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-9 w-9 items-center justify-center rounded-lg bg-secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-primary" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-bold",
				children: value
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: label
			})] })]
		})
	});
}
function NearbyFarmers() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card-surface p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold text-primary",
				children: "LOCAL NETWORK"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-semibold",
				children: "Nearby Farmers"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5 text-primary" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 space-y-3",
			children: [
				{
					name: "Suresh Patil",
					crop: "Tomato",
					distance: "4 km"
				},
				{
					name: "Priya Jadhav",
					crop: "Onion",
					distance: "12 km"
				},
				{
					name: "Ganesh Shinde",
					crop: "Soybean",
					distance: "18 km"
				}
			].map((farmer) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-semibold",
					children: farmer.name.charAt(0)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm font-medium",
						children: farmer.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							farmer.crop,
							" • ",
							farmer.distance
						]
					})]
				})]
			}, farmer.name))
		})]
	});
}
function QuickLinks({ onMarket, onBuyers, onMachinery }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card-surface p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-semibold",
			children: "Useful connections"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 space-y-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
					icon: TrendingUp,
					label: "Market Prices",
					onClick: onMarket
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
					icon: ShoppingCart,
					label: "Find Buyers",
					onClick: onBuyers
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
					icon: Tractor,
					label: "Find Machinery",
					onClick: onMachinery
				})
			]
		})]
	});
}
function QuickLink({ icon: Icon, label, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm hover:bg-secondary",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-primary" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex-1",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 text-muted-foreground" })
		]
	});
}
function CommunityGuidelines() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4 text-primary" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-semibold",
				children: "Community Guidelines"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 space-y-2 text-xs leading-5 text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• Share useful and location-specific information." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• Verify market prices before making claims." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• Do not post misleading buyer or seller details." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "• Keep discussions respectful and farmer-focused." })
				]
			})
		]
	});
}
function EmptyPosts() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card-surface p-10 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-6 w-6 text-muted-foreground" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 font-semibold",
				children: "No discussions found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Try another search term or category."
			})
		]
	});
}
//#endregion
export { Community as component };
