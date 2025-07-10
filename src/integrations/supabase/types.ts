export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          date: string
          description: string
          id: string
          image_url: string | null
          location: string
          participants: string
          status: string
          time: string
          title: string
          type: string | null
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          date: string
          description: string
          id?: string
          image_url?: string | null
          location: string
          participants: string
          status?: string
          time: string
          title: string
          type?: string | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          date?: string
          description?: string
          id?: string
          image_url?: string | null
          location?: string
          participants?: string
          status?: string
          time?: string
          title?: string
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "activities_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
      }
      app_users: {
        Row: {
          address: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          password_hash: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          username: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          password_hash: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          username: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          password_hash?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      blog_articles: {
        Row: {
          author_id: string | null
          content: string
          created_at: string
          id: string
          image_url: string | null
          published_date: string | null
          status: Database["public"]["Enums"]["article_status"]
          summary: string | null
          title: string
          updated_at: string
          validated_by: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          published_date?: string | null
          status?: Database["public"]["Enums"]["article_status"]
          summary?: string | null
          title: string
          updated_at?: string
          validated_by?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          published_date?: string | null
          status?: Database["public"]["Enums"]["article_status"]
          summary?: string | null
          title?: string
          updated_at?: string
          validated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_articles_validated_by_fkey"
            columns: ["validated_by"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
      }
      difficult_events: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          event_date: string
          family_support_message: string | null
          id: string
          image_url: string | null
          member_name: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_date: string
          family_support_message?: string | null
          id?: string
          image_url?: string | null
          member_name: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_date?: string
          family_support_message?: string | null
          id?: string
          image_url?: string | null
          member_name?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "difficult_events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
      }
      journal_editions: {
        Row: {
          cover_image_url: string | null
          created_at: string
          created_by: string | null
          id: string
          page_count: number | null
          pdf_url: string | null
          publish_date: string
          status: Database["public"]["Enums"]["journal_status"]
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          page_count?: number | null
          pdf_url?: string | null
          publish_date: string
          status?: Database["public"]["Enums"]["journal_status"]
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          page_count?: number | null
          pdf_url?: string | null
          publish_date?: string
          status?: Database["public"]["Enums"]["journal_status"]
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "journal_editions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
      }
      media_items: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          date: string
          description: string
          id: string
          media_urls: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          date: string
          description: string
          id?: string
          media_urls?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          date?: string
          description?: string
          id?: string
          media_urls?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_items_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          id: string
          image_url: string | null
          published_date: string
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          id?: string
          image_url?: string | null
          published_date: string
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          id?: string
          image_url?: string | null
          published_date?: string
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
      }
      retirement_departures: {
        Row: {
          created_at: string
          created_by: string | null
          department: string | null
          id: string
          image_url: string | null
          member_name: string
          position: string | null
          retirement_date: string
          tribute_message: string | null
          updated_at: string
          years_of_service: number | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          department?: string | null
          id?: string
          image_url?: string | null
          member_name: string
          position?: string | null
          retirement_date: string
          tribute_message?: string | null
          updated_at?: string
          years_of_service?: number | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          department?: string | null
          id?: string
          image_url?: string | null
          member_name?: string
          position?: string | null
          retirement_date?: string
          tribute_message?: string | null
          updated_at?: string
          years_of_service?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "retirement_departures_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
      }
      social_events: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          event_date: string
          id: string
          image_url: string | null
          member_name: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_date: string
          id?: string
          image_url?: string | null
          member_name: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_date?: string
          id?: string
          image_url?: string | null
          member_name?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "app_users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      article_status: "en_attente" | "valide" | "refuse"
      journal_status: "publie" | "archive"
      user_role: "admin_principal" | "admin_secondaire" | "redacteur"
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
    Enums: {
      article_status: ["en_attente", "valide", "refuse"],
      journal_status: ["publie", "archive"],
      user_role: ["admin_principal", "admin_secondaire", "redacteur"],
    },
  },
} as const
