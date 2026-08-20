export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          created_at: string
          end_date: string
          id: string
          machinery_id: string
          owner_id: string
          renter_id: string
          start_date: string
          status: string
          total_price: number
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          machinery_id: string
          owner_id: string
          renter_id: string
          start_date: string
          status?: string
          total_price: number
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          machinery_id?: string
          owner_id?: string
          renter_id?: string
          start_date?: string
          status?: string
          total_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "bookings_machinery_id_fkey"
            columns: ["machinery_id"]
            isOneToOne: false
            referencedRelation: "machinery"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_renter_id_fkey"
            columns: ["renter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      community_comments: {
        Row: {
          author_id: string
          content: string
          created_at: string
          id: string
          post_id: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          id?: string
          post_id: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          author_id: string
          category: string
          content: string
          created_at: string
          id: string
          title: string
        }
        Insert: {
          author_id: string
          category?: string
          content: string
          created_at?: string
          id?: string
          title: string
        }
        Update: {
          author_id?: string
          category?: string
          content?: string
          created_at?: string
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      crop_residues: {
        Row: {
          available: boolean
          created_at: string
          description: string | null
          district: string | null
          id: string
          image_url: string | null
          owner_id: string
          price: number
          quantity: number
          residue_type: string
          state: string | null
          unit: string
          village: string | null
        }
        Insert: {
          available?: boolean
          created_at?: string
          description?: string | null
          district?: string | null
          id?: string
          image_url?: string | null
          owner_id: string
          price?: number
          quantity: number
          residue_type: string
          state?: string | null
          unit?: string
          village?: string | null
        }
        Update: {
          available?: boolean
          created_at?: string
          description?: string | null
          district?: string | null
          id?: string
          image_url?: string | null
          owner_id?: string
          price?: number
          quantity?: number
          residue_type?: string
          state?: string | null
          unit?: string
          village?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crop_residues_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      machinery: {
        Row: {
          available_from: string | null
          available_until: string | null
          brand: string | null
          category: string
          created_at: string
          description: string | null
          district: string | null
          id: string
          image_url: string | null
          is_active: boolean
          is_verified: boolean
          latitude: number | null
          longitude: number | null
          model: string | null
          name: string
          owner_id: string
          price_per_day: number
          rating: number
          state: string | null
          terms: string | null
          village: string | null
        }
        Insert: {
          available_from?: string | null
          available_until?: string | null
          brand?: string | null
          category: string
          created_at?: string
          description?: string | null
          district?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_verified?: boolean
          latitude?: number | null
          longitude?: number | null
          model?: string | null
          name: string
          owner_id: string
          price_per_day: number
          rating?: number
          state?: string | null
          terms?: string | null
          village?: string | null
        }
        Update: {
          available_from?: string | null
          available_until?: string | null
          brand?: string | null
          category?: string
          created_at?: string
          description?: string | null
          district?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_verified?: boolean
          latitude?: number | null
          longitude?: number | null
          model?: string | null
          name?: string
          owner_id?: string
          price_per_day?: number
          rating?: number
          state?: string | null
          terms?: string | null
          village?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "machinery_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          district: string | null
          email: string | null
          farmer_type: string | null
          id: string
          is_verified: boolean
          latitude: number | null
          longitude: number | null
          name: string
          phone: string | null
          preferred_language: string
          profile_image: string | null
          rating: number
          state: string | null
          village: string | null
        }
        Insert: {
          created_at?: string
          district?: string | null
          email?: string | null
          farmer_type?: string | null
          id: string
          is_verified?: boolean
          latitude?: number | null
          longitude?: number | null
          name: string
          phone?: string | null
          preferred_language?: string
          profile_image?: string | null
          rating?: number
          state?: string | null
          village?: string | null
        }
        Update: {
          created_at?: string
          district?: string | null
          email?: string | null
          farmer_type?: string | null
          id?: string
          is_verified?: boolean
          latitude?: number | null
          longitude?: number | null
          name?: string
          phone?: string | null
          preferred_language?: string
          profile_image?: string | null
          rating?: number
          state?: string | null
          village?: string | null
        }
        Relationships: []
      }
      residue_requests: {
        Row: {
          created_at: string
          id: string
          message: string | null
          owner_id: string
          quantity: number
          requester_id: string
          residue_id: string
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          owner_id: string
          quantity: number
          requester_id: string
          residue_id: string
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          owner_id?: string
          quantity?: number
          requester_id?: string
          residue_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "residue_requests_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "residue_requests_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "residue_requests_residue_id_fkey"
            columns: ["residue_id"]
            isOneToOne: false
            referencedRelation: "crop_residues"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          booking_id: string | null
          comment: string | null
          created_at: string
          id: string
          machinery_id: string | null
          rating: number
          reviewed_user_id: string | null
          reviewer_id: string
        }
        Insert: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          machinery_id?: string | null
          rating: number
          reviewed_user_id?: string | null
          reviewer_id: string
        }
        Update: {
          booking_id?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          machinery_id?: string | null
          rating?: number
          reviewed_user_id?: string | null
          reviewer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_machinery_id_fkey"
            columns: ["machinery_id"]
            isOneToOne: false
            referencedRelation: "machinery"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewed_user_id_fkey"
            columns: ["reviewed_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_reviewer_id_fkey"
            columns: ["reviewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
