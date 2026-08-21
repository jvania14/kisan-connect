
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Loader2,
  Trash2,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/notifications")({
  component: NotificationsPage,
});

type NotificationItem = {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string | null;
  is_read: boolean;
  created_at: string;
};

function NotificationsPage() {
  const { user } = useAuth();

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.id) {
      loadNotifications();
    }
  }, [user?.id]);

  async function loadNotifications() {
    if (!user?.id) return;

    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Notifications error:", error);
      setError(error.message);
      setNotifications([]);
    } else {
      setNotifications((data ?? []) as NotificationItem[]);
    }

    setLoading(false);
  }

  async function markAsRead(id: string) {
    if (!user?.id) return;

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error(error);
      return;
    }

    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, is_read: true }
          : notification,
      ),
    );
  }

  async function markAllAsRead() {
    if (!user?.id) return;

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user.id)
      .eq("is_read", false);

    if (error) {
      console.error(error);
      return;
    }

    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        is_read: true,
      })),
    );
  }

  async function deleteNotification(id: string) {
    if (!user?.id) return;

    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      console.error(error);
      return;
    }

    setNotifications((current) =>
      current.filter((notification) => notification.id !== id),
    );
  }

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read,
  ).length;

  return (
    <div className="min-h-screen bg-[#faf9f1] px-6 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Bell className="h-6 w-6 text-green-700" />
              </div>

              <h1 className="text-4xl font-semibold text-slate-900">
                Notifications
              </h1>
            </div>

            <p className="text-lg text-slate-600">
              Stay updated about your bookings and requests.
            </p>
          </div>

          {unreadCount > 0 && (
            <Button
              variant="outline"
              onClick={markAllAsRead}
              className="flex items-center gap-2"
            >
              <CheckCheck className="h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>

        {loading && (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border bg-white">
            <div className="flex items-center gap-3 text-slate-600">
              <Loader2 className="h-6 w-6 animate-spin" />
              Loading notifications...
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <h2 className="mb-2 text-xl font-semibold text-red-800">
              Could not load notifications
            </h2>

            <p className="mb-5 text-red-700">{error}</p>

            <Button
              onClick={loadNotifications}
              className="bg-green-700 hover:bg-green-800"
            >
              Try Again
            </Button>
          </div>
        )}

        {!loading && !error && notifications.length === 0 && (
          <div className="rounded-2xl border bg-white p-16 text-center shadow-sm">
            <Bell className="mx-auto mb-5 h-14 w-14 text-green-700" />

            <h2 className="mb-2 text-2xl font-semibold text-slate-900">
              No notifications yet
            </h2>

            <p className="text-slate-600">
              Booking requests and other updates will appear here.
            </p>
          </div>
        )}

        {!loading && !error && notifications.length > 0 && (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-2xl border bg-white p-6 shadow-sm transition ${
                  notification.is_read
                    ? ""
                    : "border-green-200 bg-green-50/40"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100">
                    <Bell className="h-5 w-5 text-green-700" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {notification.title}
                        </h3>

                        {notification.message && (
                          <p className="mt-1 text-slate-600">
                            {notification.message}
                          </p>
                        )}
                      </div>

                      {!notification.is_read && (
                        <span className="rounded-full bg-green-700 px-3 py-1 text-xs font-semibold text-white">
                          New
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <span className="text-sm text-slate-500">
                        {new Date(
                          notification.created_at,
                        ).toLocaleString("en-IN")}
                      </span>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                        {notification.type}
                      </span>
                    </div>

                    <div className="mt-4 flex gap-2">
                      {!notification.is_read && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Mark as read
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}