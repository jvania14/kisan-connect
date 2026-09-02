import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },

  nitro: {
    preset: "vercel",
    externals: {
      inline: [
        "tslib",
        "@supabase/supabase-js",
        "@supabase/auth-js",
        "@supabase/functions-js",
        "@supabase/postgrest-js",
        "@supabase/realtime-js",
        "@supabase/storage-js",
      ],
    },
  },
});