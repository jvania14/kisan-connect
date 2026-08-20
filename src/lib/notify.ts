import { supabase } from "@/integrations/supabase/client";

/**
 * Inserts an in-app notification. Failures are logged but never block the
 * primary action (e.g. a booking that already succeeded).
 */
export async function createNotification(input: {
  userId: string;
  type: string;
  title: string;
  message?: string;
}): Promise<void> {
  const { error } = await supabase.from("notifications").insert({
    user_id: input.userId,
    type: input.type,
    title: input.title,
    message: input.message ?? null,
  });
  if (error) console.error("notification insert failed", error);
}
