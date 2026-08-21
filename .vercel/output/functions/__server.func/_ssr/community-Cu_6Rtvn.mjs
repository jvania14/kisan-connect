import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DtNBHlnt.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as useAuth } from "./router-CBtCpRAA.mjs";
import { t as Button } from "./button-DRsC1qZi.mjs";
import { t as Input } from "./input-DicJzR9-.mjs";
import { E as Heart, _ as MessageCircle, f as Plus, n as Users, t as X, u as Send, x as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community-Cu_6Rtvn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	"All",
	"Machinery",
	"Crops",
	"Prices",
	"Government Schemes",
	"Farming Advice"
];
function Community() {
	const { user, profile } = useAuth();
	const [posts, setPosts] = (0, import_react.useState)([]);
	const [comments, setComments] = (0, import_react.useState)({});
	const [likes, setLikes] = (0, import_react.useState)({});
	const [likedByMe, setLikedByMe] = (0, import_react.useState)({});
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("All");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const [showCreate, setShowCreate] = (0, import_react.useState)(false);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)("");
	const [content, setContent] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("Farming Advice");
	const [openComments, setOpenComments] = (0, import_react.useState)({});
	const [commentText, setCommentText] = (0, import_react.useState)({});
	const [commentLoading, setCommentLoading] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		loadPosts();
	}, []);
	async function loadPosts() {
		setLoading(true);
		setError("");
		const { data, error: postsError } = await supabase.from("community_posts").select(`
        id,
        author_id,
        title,
        content,
        category,
        created_at,
        profiles:author_id (
          name,
          is_verified,
          rating
        )
      `).order("created_at", { ascending: false });
		if (postsError) {
			console.error(postsError);
			setError(postsError.message);
			setLoading(false);
			return;
		}
		const loadedPosts = (data ?? []).map((post) => ({
			...post,
			author: Array.isArray(post.profiles) ? post.profiles[0] ?? null : post.profiles ?? null
		}));
		setPosts(loadedPosts);
		if (loadedPosts.length > 0) await loadLikes(loadedPosts.map((p) => p.id));
		setLoading(false);
	}
	async function loadLikes(postIds) {
		const { data, error } = await supabase.from("post_likes").select("post_id, user_id").in("post_id", postIds);
		if (error) {
			console.error("Could not load likes:", error);
			return;
		}
		const likeCounts = {};
		const myLikes = {};
		for (const like of data ?? []) {
			likeCounts[like.post_id] = (likeCounts[like.post_id] ?? 0) + 1;
			if (user?.id && like.user_id === user.id) myLikes[like.post_id] = true;
		}
		setLikes(likeCounts);
		setLikedByMe(myLikes);
	}
	async function createPost() {
		if (!user?.id) {
			setError("Please log in to create a post.");
			return;
		}
		if (!title.trim() || !content.trim()) {
			setError("Please enter a title and message.");
			return;
		}
		setCreating(true);
		setError("");
		const { error: insertError } = await supabase.from("community_posts").insert({
			author_id: user.id,
			title: title.trim(),
			content: content.trim(),
			category
		});
		if (insertError) {
			console.error(insertError);
			setError(insertError.message);
			setCreating(false);
			return;
		}
		setTitle("");
		setContent("");
		setCategory("Farming Advice");
		setShowCreate(false);
		setCreating(false);
		await loadPosts();
	}
	async function toggleLike(postId) {
		if (!user?.id) {
			setError("Please log in to like a post.");
			return;
		}
		if (likedByMe[postId] === true) {
			const { error } = await supabase.from("post_likes").delete().eq("post_id", postId).eq("user_id", user.id);
			if (error) {
				setError(error.message);
				return;
			}
			setLikedByMe((prev) => ({
				...prev,
				[postId]: false
			}));
			setLikes((prev) => ({
				...prev,
				[postId]: Math.max((prev[postId] ?? 1) - 1, 0)
			}));
		} else {
			const { error } = await supabase.from("post_likes").insert({
				post_id: postId,
				user_id: user.id
			});
			if (error) {
				setError(error.message);
				return;
			}
			setLikedByMe((prev) => ({
				...prev,
				[postId]: true
			}));
			setLikes((prev) => ({
				...prev,
				[postId]: (prev[postId] ?? 0) + 1
			}));
		}
	}
	async function loadComments(postId) {
		const { data, error } = await supabase.from("community_comments").select(`
        id,
        post_id,
        author_id,
        content,
        created_at,
        profiles:author_id (
          name
        )
      `).eq("post_id", postId).order("created_at", { ascending: true });
		if (error) {
			setError(error.message);
			return;
		}
		const loaded = (data ?? []).map((comment) => ({
			...comment,
			author: Array.isArray(comment.profiles) ? comment.profiles[0] ?? null : comment.profiles ?? null
		}));
		setComments((prev) => ({
			...prev,
			[postId]: loaded
		}));
	}
	async function toggleComments(postId) {
		const isOpen = openComments[postId];
		setOpenComments((prev) => ({
			...prev,
			[postId]: !isOpen
		}));
		if (!isOpen && !comments[postId]) await loadComments(postId);
	}
	async function addComment(postId) {
		if (!user?.id) {
			setError("Please log in to comment.");
			return;
		}
		const text = commentText[postId]?.trim();
		if (!text) return;
		setCommentLoading((prev) => ({
			...prev,
			[postId]: true
		}));
		const { error } = await supabase.from("community_comments").insert({
			post_id: postId,
			author_id: user.id,
			content: text
		});
		if (error) {
			setError(error.message);
			setCommentLoading((prev) => ({
				...prev,
				[postId]: false
			}));
			return;
		}
		setCommentText((prev) => ({
			...prev,
			[postId]: ""
		}));
		await loadComments(postId);
		setCommentLoading((prev) => ({
			...prev,
			[postId]: false
		}));
	}
	const filteredPosts = selectedCategory === "All" ? posts : posts.filter((post) => post.category === selectedCategory);
	function formatDate(date) {
		return new Date(date).toLocaleDateString("en-IN", {
			day: "numeric",
			month: "short",
			year: "numeric"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-12 w-12 items-center justify-center rounded-full bg-green-100",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-6 w-6 text-green-700" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-semibold tracking-tight",
						children: "Farmer Community"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Connect, ask questions and share farming knowledge."
					})] })]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "gap-2",
					onClick: () => {
						setShowCreate(true);
						setError("");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Create Post"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setError(""),
					className: "ml-4",
					"aria-label": "Close error",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "card-surface p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSelectedCategory(item),
						className: `rounded-full border px-4 py-2 text-sm font-medium transition ${selectedCategory === item ? "border-green-700 bg-green-700 text-white" : "border-border bg-background hover:bg-muted"}`,
						children: item
					}, item))
				})
			}),
			showCreate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-semibold",
						children: "Create a Post"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Share something useful with other farmers."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setShowCreate(false),
						className: "rounded-full p-2 hover:bg-muted",
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Post title",
							value: title,
							onChange: (e) => setTitle(e.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: category,
							onChange: (e) => setCategory(e.target.value),
							className: "h-11 w-full rounded-md border border-input bg-background px-3 text-sm",
							children: CATEGORIES.filter((c) => c !== "All").map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item,
								children: item
							}, item))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							placeholder: "Write your question, advice or farming experience...",
							value: content,
							onChange: (e) => setContent(e.target.value),
							rows: 5,
							className: "w-full resize-none rounded-md border border-input bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => void createPost(),
								disabled: creating,
								className: "gap-2",
								children: [creating ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" }), creating ? "Publishing..." : "Publish Post"]
							})
						})
					]
				})]
			}),
			loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "card-surface flex min-h-[250px] items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }), "Loading community..."]
				})
			}),
			!loading && filteredPosts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card-surface p-12 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "mx-auto mb-4 h-12 w-12 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: selectedCategory === "All" ? "No community posts yet" : `No posts in ${selectedCategory}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Be the first farmer to start a discussion."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "mt-5 gap-2",
						onClick: () => setShowCreate(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), "Create First Post"]
					})
				]
			}),
			!loading && filteredPosts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: filteredPosts.map((post) => {
					const postComments = comments[post.id] ?? [];
					const isCommentsOpen = openComments[post.id] === true;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
						className: "card-surface overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-lg font-semibold text-green-700",
											children: (post.author?.name?.[0] ?? "F").toUpperCase()
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: post.author?.name ?? "Farmer"
											}), post.author?.is_verified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700",
												children: "✓ Verified Farmer"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: formatDate(post.created_at)
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700",
										children: post.category
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-semibold",
										children: post.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 whitespace-pre-wrap leading-7 text-muted-foreground",
										children: post.content
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 flex items-center gap-5 border-t pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => void toggleLike(post.id),
										className: `flex items-center gap-2 text-sm font-medium transition ${likedByMe[post.id] ? "text-red-600" : "text-muted-foreground hover:text-red-600"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
												className: "h-5 w-5",
												fill: likedByMe[post.id] ? "currentColor" : "none"
											}),
											likes[post.id] ?? 0,
											" Helpful"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => void toggleComments(post.id),
										className: "flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-green-700",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-5 w-5" }),
											postComments.length,
											" Comments"
										]
									})]
								}),
								isCommentsOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 border-t pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-3",
										children: postComments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground",
											children: "No comments yet. Start the conversation."
										}) : postComments.map((comment) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg bg-muted/50 p-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-semibold",
													children: comment.author?.name ?? "Farmer"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-muted-foreground",
													children: formatDate(comment.created_at)
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-sm text-muted-foreground",
												children: comment.content
											})]
										}, comment.id))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Write a comment...",
											value: commentText[post.id] ?? "",
											onChange: (e) => setCommentText((prev) => ({
												...prev,
												[post.id]: e.target.value
											})),
											onKeyDown: (e) => {
												if (e.key === "Enter" && !e.shiftKey) {
													e.preventDefault();
													addComment(post.id);
												}
											}
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											onClick: () => void addComment(post.id),
											disabled: commentLoading[post.id],
											size: "icon",
											"aria-label": "Send comment",
											children: commentLoading[post.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
										})]
									})]
								})
							]
						})
					}, post.id);
				})
			}),
			profile?.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-center text-xs text-muted-foreground",
				children: ["Posting as ", profile.name]
			})
		]
	});
}
//#endregion
export { Community as component };
