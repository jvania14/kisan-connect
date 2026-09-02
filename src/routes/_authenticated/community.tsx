import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Eye,
  Heart,
  Leaf,
  MapPin,
  MessageCircle,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  ShoppingCart,
  Sprout,
  Tag,
  TrendingUp,
  Tractor,
  Users,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/community")({
  component: Community,
});

type Category =
  | "All"
  | "Market"
  | "Crop"
  | "Machinery"
  | "Farming Tips"
  | "Buyers";

type Post = {
  id: number;
  farmer: string;
  location: string;
  time: string;
  category: Exclude<Category, "All">;
  title: string;
  content: string;
  likes: number;
  comments: number;
  views: number;
  liked: boolean;
  verified: boolean;
  tag?: string;
};

const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    farmer: "Suresh Patil",
    location: "Nashik, Maharashtra",
    time: "18 min ago",
    category: "Market",
    title: "Tomato prices are moving up in Nashik",
    content:
      "Today's modal price is around ₹2,850/q. I am seeing stronger buyer demand compared with the last few days. Anyone else planning to sell this week?",
    likes: 24,
    comments: 8,
    views: 184,
    liked: false,
    verified: true,
    tag: "Tomato",
  },
  {
    id: 2,
    farmer: "Priya Jadhav",
    location: "Pune, Maharashtra",
    time: "42 min ago",
    category: "Buyers",
    title: "Looking for a bulk buyer for onions",
    content:
      "I have approximately 1.2 tonnes of Grade A onions ready for sale. Prefer a verified buyer within 50 km of Pune.",
    likes: 18,
    comments: 11,
    views: 143,
    liked: false,
    verified: true,
    tag: "Onion",
  },
  {
    id: 3,
    farmer: "Ganesh Shinde",
    location: "Ahmednagar, Maharashtra",
    time: "1 hr ago",
    category: "Machinery",
    title: "Tractor available after tomorrow",
    content:
      "My tractor will be available for rental from Thursday. Suitable for field preparation and transport. Farmers nearby can check the machinery section for details.",
    likes: 13,
    comments: 5,
    views: 97,
    liked: false,
    verified: true,
    tag: "Tractor",
  },
  {
    id: 4,
    farmer: "Ravi More",
    location: "Nandurbar, Maharashtra",
    time: "2 hrs ago",
    category: "Farming Tips",
    title: "How are you reducing post-harvest losses?",
    content:
      "I started sorting produce into separate quality grades before approaching buyers. It has made price discussions much easier.",
    likes: 31,
    comments: 14,
    views: 221,
    liked: false,
    verified: false,
    tag: "Quality",
  },
  {
    id: 5,
    farmer: "Meena Pawar",
    location: "Washim, Maharashtra",
    time: "4 hrs ago",
    category: "Crop",
    title: "Anyone growing soybean this season?",
    content:
      "Looking to compare input costs and expected selling prices with farmers from nearby districts.",
    likes: 17,
    comments: 9,
    views: 132,
    liked: false,
    verified: true,
    tag: "Soybean",
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Market",
  "Crop",
  "Machinery",
  "Farming Tips",
  "Buyers",
];

function Community() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [activeCategory, setActiveCategory] =
    useState<Category>("All");
  const [search, setSearch] = useState("");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showComments, setShowComments] = useState<number | null>(
    null,
  );
  const [commentText, setCommentText] = useState("");

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "Market" as Exclude<Category, "All">,
    tag: "",
  });

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" ||
        post.category === activeCategory;

      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.farmer.toLowerCase().includes(query) ||
        post.location.toLowerCase().includes(query) ||
        post.tag?.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, posts, search]);

  const toggleLike = (id: number) => {
    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked
                ? post.likes - 1
                : post.likes + 1,
            }
          : post,
      ),
    );
  };

  const createPost = () => {
    if (
      !newPost.title.trim() ||
      !newPost.content.trim()
    ) {
      return;
    }

    const post: Post = {
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
      tag: newPost.tag.trim() || undefined,
    };

    setPosts((current) => [post, ...current]);

    setNewPost({
      title: "",
      content: "",
      category: "Market",
      tag: "",
    });

    setShowCreatePost(false);
  };

  const addComment = (id: number) => {
    if (!commentText.trim()) {
      return;
    }

    setPosts((current) =>
      current.map((post) =>
        post.id === id
          ? {
              ...post,
              comments: post.comments + 1,
            }
          : post,
      ),
    );

    setCommentText("");
  };

  return (
    <div className="space-y-6">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="card-surface overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold">
                    Farmer Community
                  </h1>

                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Local Knowledge Network
                  </span>
                </div>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Share market information, connect with
                  nearby farmers, find buyers and exchange
                  practical farming knowledge.
                </p>
              </div>
            </div>

            <Button
              onClick={() => setShowCreatePost(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Post
            </Button>
          </div>

          {/* COMMUNITY STATS */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <CommunityStat
              icon={Users}
              value="2,840+"
              label="Farmers connected"
            />

            <CommunityStat
              icon={MapPin}
              value="18"
              label="Districts active"
            />

            <CommunityStat
              icon={TrendingUp}
              value="640+"
              label="Market discussions"
            />

            <CommunityStat
              icon={ShoppingCart}
              value="320+"
              label="Buyer connections"
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          MARKET INFORMATION BANNER
      ===================================================== */}

      <section className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-3">
            <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

            <div>
              <p className="font-semibold">
                Today's community market signal
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Nashik farmers are reporting stronger tomato
                demand. Check official market prices before
                making a selling decision.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() =>
              navigate({
                to: "/dashboard",
              })
            }
          >
            Open Market Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* =====================================================
          SEARCH + FILTER
      ===================================================== */}

      <section className="card-surface p-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search farmers, crops, market discussions..."
              className="pl-9"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() =>
                  setActiveCategory(category)
                }
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/70"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* POSTS */}
        <main className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Community discussions
              </h2>

              <p className="text-sm text-muted-foreground">
                {filteredPosts.length} discussion
                {filteredPosts.length !== 1 ? "s" : ""}
              </p>
            </div>

            <button
              type="button"
              className="flex items-center gap-1 text-sm text-muted-foreground"
            >
              Latest
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {filteredPosts.length === 0 ? (
            <EmptyPosts />
          ) : (
            filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={() => toggleLike(post.id)}
                onComment={() =>
                  setShowComments(
                    showComments === post.id
                      ? null
                      : post.id,
                  )
                }
                showComments={showComments === post.id}
                commentText={commentText}
                onCommentTextChange={setCommentText}
                onAddComment={() =>
                  addComment(post.id)
                }
              />
            ))
          )}
        </main>

        {/* SIDEBAR */}
        <aside className="space-y-4">
          <NearbyFarmers />

          <QuickLinks
            onMarket={() =>
              navigate({
                to: "/dashboard",
              })
            }
            onBuyers={() =>
              navigate({
                to: "/dashboard#buyer-demand" as never,
              })
            }
            onMachinery={() =>
              navigate({
                to: "/machinery",
                search: {
                  q: "",
                  category: "",
                  start: "",
                  end: "",
                },
              })
            }
          />

          <CommunityGuidelines />
        </aside>
      </div>

      {/* =====================================================
          CREATE POST MODAL
      ===================================================== */}

      {showCreatePost && (
        <CreatePostModal
          post={newPost}
          onChange={setNewPost}
          onClose={() => setShowCreatePost(false)}
          onPublish={createPost}
        />
      )}

      {/* =====================================================
          FOOTER NOTE
      ===================================================== */}

      <div className="rounded-xl bg-secondary p-4 text-xs leading-5 text-muted-foreground">
        <strong>Community principle:</strong> farmer posts
        provide local knowledge and experience. Always verify
        market prices, buyer details and transaction terms
        through trusted sources before completing a sale.
      </div>
    </div>
  );
}

/* =========================================================
   POST CARD
========================================================= */

function PostCard({
  post,
  onLike,
  onComment,
  showComments,
  commentText,
  onCommentTextChange,
  onAddComment,
}: {
  post: Post;
  onLike: () => void;
  onComment: () => void;
  showComments: boolean;
  commentText: string;
  onCommentTextChange: (value: string) => void;
  onAddComment: () => void;
}) {
  return (
    <article className="card-surface overflow-hidden">
      <div className="p-5">
        {/* USER */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
              {post.farmer.charAt(0)}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold">
                  {post.farmer}
                </span>

                {post.verified && (
                  <span className="flex items-center gap-1 text-xs text-primary">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Verified
                  </span>
                )}
              </div>

              <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {post.location}
                </span>

                <span>•</span>

                <span className="flex items-center gap-1">
                  <Clock3 className="h-3 w-3" />
                  {post.time}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary"
            aria-label="More options"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        {/* CATEGORY */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            {post.category}
          </span>

          {post.tag && (
            <span className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">
              <Tag className="h-3 w-3" />
              {post.tag}
            </span>
          )}
        </div>

        {/* POST */}
        <h3 className="mt-4 text-lg font-semibold">
          {post.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {post.content}
        </p>

        {/* STATS */}
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span>{post.likes} likes</span>
          <span>{post.comments} comments</span>

          <span className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            {post.views} views
          </span>
        </div>

        {/* ACTIONS */}
        <div className="mt-4 flex border-t border-border pt-3">
          <button
            type="button"
            onClick={onLike}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition ${
              post.liked
                ? "text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Heart
              className={`h-4 w-4 ${
                post.liked ? "fill-current" : ""
              }`}
            />
            Like
          </button>

          <button
            type="button"
            onClick={onComment}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <MessageCircle className="h-4 w-4" />
            Comment
          </button>

          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            Share
          </button>
        </div>

        {/* COMMENTS */}
        {showComments && (
          <div className="mt-3 rounded-xl bg-secondary/60 p-3">
            <div className="flex gap-2">
              <Input
                value={commentText}
                onChange={(event) =>
                  onCommentTextChange(event.target.value)
                }
                placeholder="Add a useful comment..."
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    onAddComment();
                  }
                }}
              />

              <Button
                size="icon"
                onClick={onAddComment}
                disabled={!commentText.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

/* =========================================================
   CREATE POST MODAL
========================================================= */

function CreatePostModal({
  post,
  onChange,
  onClose,
  onPublish,
}: {
  post: {
    title: string;
    content: string;
    category: Exclude<Category, "All">;
    tag: string;
  };
  onChange: (post: typeof post) => void;
  onClose: () => void;
  onPublish: () => void;
}) {
  const categories: Exclude<Category, "All">[] = [
    "Market",
    "Crop",
    "Machinery",
    "Farming Tips",
    "Buyers",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-border bg-background shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h2 className="text-lg font-bold">
              Create Community Post
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Share information that can help other farmers.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-secondary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Category
            </label>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...post,
                      category,
                    })
                  }
                  className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                    post.category === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Title
            </label>

            <Input
              value={post.title}
              onChange={(event) =>
                onChange({
                  ...post,
                  title: event.target.value,
                })
              }
              placeholder="Example: Tomato demand increasing in Nashik"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              What do you want to share?
            </label>

            <textarea
              value={post.content}
              onChange={(event) =>
                onChange({
                  ...post,
                  content: event.target.value,
                })
              }
              placeholder="Share market information, farming experience, buyer requirement, machinery availability..."
              className="min-h-32 w-full rounded-xl border border-input bg-background px-3 py-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Crop / topic tag
            </label>

            <Input
              value={post.tag}
              onChange={(event) =>
                onChange({
                  ...post,
                  tag: event.target.value,
                })
              }
              placeholder="Example: Tomato"
            />
          </div>

          <div className="rounded-xl bg-secondary p-3 text-xs leading-5 text-muted-foreground">
            Avoid sharing private contact information or
            unverified price claims. Helpful, location-specific
            information is most valuable to the community.
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              onClick={onPublish}
              disabled={
                !post.title.trim() ||
                !post.content.trim()
              }
            >
              <Send className="mr-2 h-4 w-4" />
              Publish Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   COMMUNITY STAT
========================================================= */

function CommunityStat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Users;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-border p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
          <Icon className="h-4 w-4 text-primary" />
        </div>

        <div>
          <p className="font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   NEARBY FARMERS
========================================================= */

function NearbyFarmers() {
  const farmers = [
    {
      name: "Suresh Patil",
      crop: "Tomato",
      distance: "4 km",
    },
    {
      name: "Priya Jadhav",
      crop: "Onion",
      distance: "12 km",
    },
    {
      name: "Ganesh Shinde",
      crop: "Soybean",
      distance: "18 km",
    },
  ];

  return (
    <section className="card-surface p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-primary">
            LOCAL NETWORK
          </p>

          <h2 className="mt-1 font-semibold">
            Nearby Farmers
          </h2>
        </div>

        <MapPin className="h-5 w-5 text-primary" />
      </div>

      <div className="mt-4 space-y-3">
        {farmers.map((farmer) => (
          <div
            key={farmer.name}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-semibold">
              {farmer.name.charAt(0)}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {farmer.name}
              </p>

              <p className="text-xs text-muted-foreground">
                {farmer.crop} • {farmer.distance}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   QUICK LINKS
========================================================= */

function QuickLinks({
  onMarket,
  onBuyers,
  onMachinery,
}: {
  onMarket: () => void;
  onBuyers: () => void;
  onMachinery: () => void;
}) {
  return (
    <section className="card-surface p-5">
      <h2 className="font-semibold">
        Useful connections
      </h2>

      <div className="mt-4 space-y-2">
        <QuickLink
          icon={TrendingUp}
          label="Market Prices"
          onClick={onMarket}
        />

        <QuickLink
          icon={ShoppingCart}
          label="Find Buyers"
          onClick={onBuyers}
        />

        <QuickLink
          icon={Tractor}
          label="Find Machinery"
          onClick={onMachinery}
        />
      </div>
    </section>
  );
}

function QuickLink({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof TrendingUp;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-sm hover:bg-secondary"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>

      <span className="flex-1">{label}</span>

      <ArrowRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}

/* =========================================================
   GUIDELINES
========================================================= */

function CommunityGuidelines() {
  return (
    <section className="card-surface p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
        <MessageSquare className="h-4 w-4 text-primary" />
      </div>

      <h2 className="mt-3 font-semibold">
        Community Guidelines
      </h2>

      <div className="mt-3 space-y-2 text-xs leading-5 text-muted-foreground">
        <p>
          • Share useful and location-specific information.
        </p>

        <p>
          • Verify market prices before making claims.
        </p>

        <p>
          • Do not post misleading buyer or seller details.
        </p>

        <p>
          • Keep discussions respectful and farmer-focused.
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   EMPTY POSTS
========================================================= */

function EmptyPosts() {
  return (
    <div className="card-surface p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
        <Search className="h-6 w-6 text-muted-foreground" />
      </div>

      <h2 className="mt-4 font-semibold">
        No discussions found
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Try another search term or category.
      </p>
    </div>
  );
}