import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Heart,
  MessageCircle,
  Plus,
  Send,
  Loader2,
  Users,
  X,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_authenticated/community")({
  component: Community,
});

type Post = {
  id: string;
  author_id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  author?: {
    name: string | null;
    is_verified: boolean | null;
    rating: number | null;
  } | null;
};

type Comment = {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
  author?: {
    name: string | null;
  } | null;
};

const CATEGORIES = [
  "All",
  "Machinery",
  "Crops",
  "Prices",
  "Government Schemes",
  "Farming Advice",
];

function Community() {
  const { user, profile } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [likedByMe, setLikedByMe] = useState<Record<string, boolean>>({});

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Farming Advice");

  const [openComments, setOpenComments] = useState<Record<string, boolean>>(
    {},
  );

  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [commentLoading, setCommentLoading] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    void loadPosts();
  }, []);

  async function loadPosts() {
    setLoading(true);
    setError("");

    const { data, error: postsError } = await supabase
      .from("community_posts")
      .select(
        `
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
      `,
      )
      .order("created_at", { ascending: false });

    if (postsError) {
      console.error(postsError);
      setError(postsError.message);
      setLoading(false);
      return;
    }

    const loadedPosts = (data ?? []).map((post) => ({
      ...post,
      author: Array.isArray(post.profiles)
        ? post.profiles[0] ?? null
        : post.profiles ?? null,
    })) as unknown as Post[];

    setPosts(loadedPosts);

    if (loadedPosts.length > 0) {
      await loadLikes(loadedPosts.map((p) => p.id));
    }

    setLoading(false);
  }

  async function loadLikes(postIds: string[]) {
    const { data, error } = await supabase
      .from("post_likes")
      .select("post_id, user_id")
      .in("post_id", postIds);

    if (error) {
      console.error("Could not load likes:", error);
      return;
    }

    const likeCounts: Record<string, number> = {};
    const myLikes: Record<string, boolean> = {};

    for (const like of data ?? []) {
      likeCounts[like.post_id] = (likeCounts[like.post_id] ?? 0) + 1;

      if (user?.id && like.user_id === user.id) {
        myLikes[like.post_id] = true;
      }
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

    const { error: insertError } = await supabase
      .from("community_posts")
      .insert({
        author_id: user.id,
        title: title.trim(),
        content: content.trim(),
        category,
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

  async function toggleLike(postId: string) {
    if (!user?.id) {
      setError("Please log in to like a post.");
      return;
    }

    const alreadyLiked = likedByMe[postId] === true;

    if (alreadyLiked) {
      const { error } = await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", user.id);

      if (error) {
        setError(error.message);
        return;
      }

      setLikedByMe((prev) => ({
        ...prev,
        [postId]: false,
      }));

      setLikes((prev) => ({
        ...prev,
        [postId]: Math.max((prev[postId] ?? 1) - 1, 0),
      }));
    } else {
      const { error } = await supabase.from("post_likes").insert({
        post_id: postId,
        user_id: user.id,
      });

      if (error) {
        setError(error.message);
        return;
      }

      setLikedByMe((prev) => ({
        ...prev,
        [postId]: true,
      }));

      setLikes((prev) => ({
        ...prev,
        [postId]: (prev[postId] ?? 0) + 1,
      }));
    }
  }

  async function loadComments(postId: string) {
    const { data, error } = await supabase
      .from("community_comments")
      .select(
        `
        id,
        post_id,
        author_id,
        content,
        created_at,
        profiles:author_id (
          name
        )
      `,
      )
      .eq("post_id", postId)
      .order("created_at", { ascending: true });

    if (error) {
      setError(error.message);
      return;
    }

    const loaded = (data ?? []).map((comment) => ({
      ...comment,
      author: Array.isArray(comment.profiles)
        ? comment.profiles[0] ?? null
        : comment.profiles ?? null,
    })) as unknown as Comment[];

    setComments((prev) => ({
      ...prev,
      [postId]: loaded,
    }));
  }

  async function toggleComments(postId: string) {
    const isOpen = openComments[postId];

    setOpenComments((prev) => ({
      ...prev,
      [postId]: !isOpen,
    }));

    if (!isOpen && !comments[postId]) {
      await loadComments(postId);
    }
  }

  async function addComment(postId: string) {
    if (!user?.id) {
      setError("Please log in to comment.");
      return;
    }

    const text = commentText[postId]?.trim();

    if (!text) {
      return;
    }

    setCommentLoading((prev) => ({
      ...prev,
      [postId]: true,
    }));

    const { error } = await supabase.from("community_comments").insert({
      post_id: postId,
      author_id: user.id,
      content: text,
    });

    if (error) {
      setError(error.message);
      setCommentLoading((prev) => ({
        ...prev,
        [postId]: false,
      }));
      return;
    }

    setCommentText((prev) => ({
      ...prev,
      [postId]: "",
    }));

    await loadComments(postId);

    setCommentLoading((prev) => ({
      ...prev,
      [postId]: false,
    }));
  }

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Users className="h-6 w-6 text-green-700" />
            </div>

            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Farmer Community
              </h1>

              <p className="text-sm text-muted-foreground">
                Connect, ask questions and share farming knowledge.
              </p>
            </div>
          </div>
        </div>

        <Button
          className="gap-2"
          onClick={() => {
            setShowCreate(true);
            setError("");
          }}
        >
          <Plus className="h-4 w-4" />
          Create Post
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start justify-between rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <span>{error}</span>

          <button
            type="button"
            onClick={() => setError("")}
            className="ml-4"
            aria-label="Close error"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Categories */}
      <div className="card-surface p-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSelectedCategory(item)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                selectedCategory === item
                  ? "border-green-700 bg-green-700 text-white"
                  : "border-border bg-background hover:bg-muted"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Create Post */}
      {showCreate && (
        <div className="card-surface p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Create a Post</h2>
              <p className="text-sm text-muted-foreground">
                Share something useful with other farmers.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowCreate(false)}
              className="rounded-full p-2 hover:bg-muted"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <Input
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {CATEGORIES.filter((c) => c !== "All").map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <textarea
              placeholder="Write your question, advice or farming experience..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="w-full resize-none rounded-md border border-input bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />

            <div className="flex justify-end">
              <Button
                onClick={() => void createPost()}
                disabled={creating}
                className="gap-2"
              >
                {creating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}

                {creating ? "Publishing..." : "Publish Post"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="card-surface flex min-h-[250px] items-center justify-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading community...
          </div>
        </div>
      )}

      {/* Empty */}
      {!loading && filteredPosts.length === 0 && (
        <div className="card-surface p-12 text-center">
          <Users className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

          <h2 className="text-lg font-semibold">
            {selectedCategory === "All"
              ? "No community posts yet"
              : `No posts in ${selectedCategory}`}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Be the first farmer to start a discussion.
          </p>

          <Button
            className="mt-5 gap-2"
            onClick={() => setShowCreate(true)}
          >
            <Plus className="h-4 w-4" />
            Create First Post
          </Button>
        </div>
      )}

      {/* Posts */}
      {!loading && filteredPosts.length > 0 && (
        <div className="space-y-4">
          {filteredPosts.map((post) => {
            const postComments = comments[post.id] ?? [];
            const isCommentsOpen = openComments[post.id] === true;

            return (
              <article key={post.id} className="card-surface overflow-hidden">
                <div className="p-5">
                  {/* Author */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-lg font-semibold text-green-700">
                        {(post.author?.name?.[0] ?? "F").toUpperCase()}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold">
                            {post.author?.name ?? "Farmer"}
                          </span>

                          {post.author?.is_verified && (
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                              ✓ Verified Farmer
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-muted-foreground">
                          {formatDate(post.created_at)}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mt-5">
                    <h2 className="text-xl font-semibold">{post.title}</h2>

                    <p className="mt-2 whitespace-pre-wrap leading-7 text-muted-foreground">
                      {post.content}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex items-center gap-5 border-t pt-4">
                    <button
                      type="button"
                      onClick={() => void toggleLike(post.id)}
                      className={`flex items-center gap-2 text-sm font-medium transition ${
                        likedByMe[post.id]
                          ? "text-red-600"
                          : "text-muted-foreground hover:text-red-600"
                      }`}
                    >
                      <Heart
                        className="h-5 w-5"
                        fill={likedByMe[post.id] ? "currentColor" : "none"}
                      />

                      {likes[post.id] ?? 0} Helpful
                    </button>

                    <button
                      type="button"
                      onClick={() => void toggleComments(post.id)}
                      className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-green-700"
                    >
                      <MessageCircle className="h-5 w-5" />

                      {postComments.length} Comments
                    </button>
                  </div>

                  {/* Comments */}
                  {isCommentsOpen && (
                    <div className="mt-4 border-t pt-4">
                      <div className="space-y-3">
                        {postComments.length === 0 ? (
                          <p className="text-sm text-muted-foreground">
                            No comments yet. Start the conversation.
                          </p>
                        ) : (
                          postComments.map((comment) => (
                            <div
                              key={comment.id}
                              className="rounded-lg bg-muted/50 p-3"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold">
                                  {comment.author?.name ?? "Farmer"}
                                </span>

                                <span className="text-xs text-muted-foreground">
                                  {formatDate(comment.created_at)}
                                </span>
                              </div>

                              <p className="mt-1 text-sm text-muted-foreground">
                                {comment.content}
                              </p>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Add comment */}
                      <div className="mt-4 flex gap-2">
                        <Input
                          placeholder="Write a comment..."
                          value={commentText[post.id] ?? ""}
                          onChange={(e) =>
                            setCommentText((prev) => ({
                              ...prev,
                              [post.id]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              void addComment(post.id);
                            }
                          }}
                        />

                        <Button
                          onClick={() => void addComment(post.id)}
                          disabled={commentLoading[post.id]}
                          size="icon"
                          aria-label="Send comment"
                        >
                          {commentLoading[post.id] ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Current user hint */}
      {profile?.name && (
        <p className="text-center text-xs text-muted-foreground">
          Posting as {profile.name}
        </p>
      )}
    </div>
  );
}