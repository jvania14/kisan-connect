import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Bell,
  BellRing,
  Check,
  CheckCheck,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Factory,
  IndianRupee,
  MapPin,
  MessageSquare,
  PackageCheck,
  ShoppingCart,
  Sprout,
  Tractor,
  TrendingUp,
  UserCheck,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute(
  "/_authenticated/notifications",
)({
  component: Notifications,
});

type NotificationType =
  | "market"
  | "buyer"
  | "sale"
  | "machinery"
  | "payment"
  | "community"
  | "system";

type NotificationItem = {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  action?: string;
  actionTarget?: string;
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    type: "buyer",
    title: "New buyer offer received",
    message:
      "FreshKart Foods offered ₹3,000/q for your Tomato Grade A lot.",
    time: "8 min ago",
    unread: true,
    action: "View Offer",
    actionTarget: "/listings",
  },
  {
    id: 2,
    type: "market",
    title: "Tomato prices are rising",
    message:
      "Nashik market increased by 8.4%. Today's modal price is ₹2,850/q.",
    time: "24 min ago",
    unread: true,
    action: "View Market",
    actionTarget: "/dashboard#market-prices",
  },
  {
    id: 3,
    type: "market",
    title: "Smart Sell Window updated",
    message:
      "Kisan Connect currently recommends waiting 2–3 days. Expected range: ₹2,950–₹3,100/q.",
    time: "42 min ago",
    unread: true,
    action: "View Insight",
    actionTarget: "/dashboard#sell-window",
  },
  {
    id: 4,
    type: "sale",
    title: "Sale lot is getting buyer attention",
    message:
      "Your 500 kg Tomato Grade A lot has received 3 matching buyer recommendations.",
    time: "1 hr ago",
    unread: false,
    action: "View Buyers",
    actionTarget: "/dashboard#buyer-demand",
  },
  {
    id: 5,
    type: "machinery",
    title: "Machinery booking reminder",
    message:
      "Your tractor booking request is awaiting owner confirmation.",
    time: "2 hrs ago",
    unread: false,
    action: "View Booking",
    actionTarget: "/bookings",
  },
  {
    id: 6,
    type: "payment",
    title: "Payment status updated",
    message:
      "Payment tracking is ready for your accepted FreshKart offer.",
    time: "3 hrs ago",
    unread: false,
    action: "Track Transaction",
    actionTarget: "/listings",
  },
  {
    id: 7,
    type: "community",
    title: "New farmer discussion",
    message:
      "Farmers near Nashik are discussing tomato demand and transport availability.",
    time: "5 hrs ago",
    unread: false,
    action: "Open Community",
    actionTarget: "/community",
  },
  {
    id: 8,
    type: "system",
    title: "Profile verification reminder",
    message:
      "Complete your profile to improve trust when connecting with buyers.",
    time: "Yesterday",
    unread: false,
    action: "Complete Profile",
    actionTarget: "/profile",
  },
];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "market", label: "Market" },
  { key: "buyer", label: "Buyers" },
  { key: "sale", label: "Sales" },
  { key: "machinery", label: "Machinery" },
  { key: "payment", label: "Payments" },
  { key: "community", label: "Community" },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];

function Notifications() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(
    INITIAL_NOTIFICATIONS,
  );

  const [activeFilter, setActiveFilter] =
    useState<FilterKey>("all");

  const unreadCount = useMemo(
    () =>
      notifications.filter(
        (notification) => notification.unread,
      ).length,
    [notifications],
  );

  const filteredNotifications = useMemo(() => {
    if (activeFilter === "all") {
      return notifications;
    }

    return notifications.filter(
      (notification) =>
        notification.type === activeFilter,
    );
  }, [activeFilter, notifications]);

  const markAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      })),
    );
  };

  const removeNotification = (id: number) => {
    setNotifications((current) =>
      current.filter(
        (notification) => notification.id !== id,
      ),
    );
  };

  const handleAction = (notification: NotificationItem) => {
    markAsRead(notification.id);

    if (notification.actionTarget) {
      void navigate({
        to: notification.actionTarget as never,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="card-surface overflow-hidden">
        <div className="flex flex-col justify-between gap-5 p-6 md:flex-row md:items-center">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
              <BellRing className="h-6 w-6 text-primary" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold">
                  Notifications
                </h1>

                {unreadCount > 0 && (
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    {unreadCount} new
                  </span>
                )}
              </div>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
                Stay updated on market prices, buyer offers,
                crop sales, machinery bookings and payments.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => navigate({ to: "/dashboard" })}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Dashboard
            </Button>

            <Button
              variant="outline"
              disabled={unreadCount === 0}
              onClick={markAllAsRead}
            >
              <CheckCheck className="mr-2 h-4 w-4" />
              Mark all read
            </Button>
          </div>
        </div>

        {/* QUICK STATS */}
        <div className="grid border-t border-border sm:grid-cols-3">
          <QuickStat
            icon={Bell}
            label="Total alerts"
            value={notifications.length.toString()}
          />

          <QuickStat
            icon={BellRing}
            label="Unread"
            value={unreadCount.toString()}
          />

          <QuickStat
            icon={TrendingUp}
            label="Market updates"
            value={notifications
              .filter(
                (notification) =>
                  notification.type === "market",
              )
              .length.toString()}
          />
        </div>
      </section>

      {/* =====================================================
          MARKET PRIORITY BANNER
      ===================================================== */}

      <section className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
        <div className="flex gap-3">
          <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

          <div>
            <p className="font-semibold">
              Your most important updates are shown first
            </p>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Kisan Connect prioritizes information that can
              affect your selling decision — especially price
              movement, buyer offers and transaction status.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <section className="card-surface p-4">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => {
            const count =
              filter.key === "all"
                ? notifications.length
                : notifications.filter(
                    (notification) =>
                      notification.type === filter.key,
                  ).length;

            const selected = activeFilter === filter.key;

            return (
              <button
                key={filter.key}
                type="button"
                onClick={() =>
                  setActiveFilter(filter.key)
                }
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  selected
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/70"
                }`}
              >
                {filter.label}

                <span
                  className={`ml-2 rounded-full px-1.5 py-0.5 text-xs ${
                    selected
                      ? "bg-primary-foreground/20"
                      : "bg-background"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          NOTIFICATION LIST
      ===================================================== */}

      <section className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <EmptyState />
        ) : (
          filteredNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onRead={() =>
                markAsRead(notification.id)
              }
              onDelete={() =>
                removeNotification(notification.id)
              }
              onAction={() =>
                handleAction(notification)
              }
            />
          ))
        )}
      </section>

      {/* =====================================================
          NOTIFICATION TYPES
      ===================================================== */}

      <section className="card-surface p-6">
        <div>
          <p className="text-sm font-semibold text-primary">
            SMART ALERTS
          </p>

          <h2 className="mt-1 text-xl font-semibold">
            What Kisan Connect can notify you about
          </h2>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <AlertType
            icon={TrendingUp}
            title="Price Movement"
            text="Important mandi price changes."
          />

          <AlertType
            icon={ShoppingCart}
            title="Buyer Offers"
            text="New offers for your crop."
          />

          <AlertType
            icon={PackageCheck}
            title="Sale Updates"
            text="Lot, delivery and transaction status."
          />

          <AlertType
            icon={Tractor}
            title="Machinery"
            text="Booking and availability updates."
          />
        </div>
      </section>

      {/* =====================================================
          DISCLAIMER
      ===================================================== */}

      <div className="rounded-xl bg-secondary p-4 text-xs leading-5 text-muted-foreground">
        <strong>Prototype note:</strong> the notification
        examples shown here are demonstration data. In the
        production version, market alerts, buyer offers,
        payments and booking notifications should be generated
        from verified data and Supabase events.
      </div>
    </div>
  );
}

/* =========================================================
   NOTIFICATION CARD
========================================================= */

function NotificationCard({
  notification,
  onRead,
  onDelete,
  onAction,
}: {
  notification: NotificationItem;
  onRead: () => void;
  onDelete: () => void;
  onAction: () => void;
}) {
  const Icon = getNotificationIcon(notification.type);

  return (
    <article
      className={`group relative rounded-2xl border p-4 transition ${
        notification.unread
          ? "border-primary/25 bg-primary/[0.035] shadow-sm"
          : "border-border bg-background"
      }`}
    >
      <div className="flex gap-4">
        {/* ICON */}
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            notification.unread
              ? "bg-primary/10 text-primary"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>

        {/* CONTENT */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-col justify-between gap-1 sm:flex-row">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">
                {notification.title}
              </h3>

              {notification.unread && (
                <span className="h-2 w-2 rounded-full bg-primary" />
              )}
            </div>

            <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
              <Clock3 className="h-3.5 w-3.5" />
              {notification.time}
            </span>
          </div>

          <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
            {notification.message}
          </p>

          {/* ACTIONS */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {notification.action && (
              <Button
                size="sm"
                variant="outline"
                onClick={onAction}
              >
                {notification.action}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            )}

            {notification.unread && (
              <button
                type="button"
                onClick={onRead}
                className="rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                Mark as read
              </button>
            )}

            <button
              type="button"
              onClick={onDelete}
              className="ml-auto rounded-lg p-2 text-muted-foreground opacity-0 transition hover:bg-secondary hover:text-foreground group-hover:opacity-100"
              aria-label="Delete notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   ICON MAPPING
========================================================= */

function getNotificationIcon(
  type: NotificationType,
) {
  switch (type) {
    case "market":
      return TrendingUp;

    case "buyer":
      return UserCheck;

    case "sale":
      return PackageCheck;

    case "machinery":
      return Tractor;

    case "payment":
      return CircleDollarSign;

    case "community":
      return MessageSquare;

    case "system":
    default:
      return Bell;
  }
}

/* =========================================================
   QUICK STAT
========================================================= */

function QuickStat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Bell;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-border p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
        <Icon className="h-4 w-4 text-primary" />
      </div>

      <div>
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
}

/* =========================================================
   ALERT TYPE
========================================================= */

function AlertType({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof TrendingUp;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-border p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>

      <h3 className="mt-3 text-sm font-semibold">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-muted-foreground">
        {text}
      </p>
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState() {
  return (
    <div className="card-surface p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
        <Check className="h-7 w-7 text-primary" />
      </div>

      <h2 className="mt-4 text-lg font-semibold">
        You're all caught up
      </h2>

      <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
        There are no notifications in this category right
        now. We'll show important market and transaction
        updates here.
      </p>
    </div>
  );
}