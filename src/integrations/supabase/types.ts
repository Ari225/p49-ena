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
    PostgrestVersion: "12.2.12 (cd3cf9e)"
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
          image_url: string | null
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
          image_url?: string | null
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
          image_url?: string | null
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
      happy_events: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          description: string | null
          event_date: string
          id: string
          image_url: string | null
          location: string | null
          member_name: string
          message: string | null
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
          location?: string | null
          member_name: string
          message?: string | null
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
          location?: string | null
          member_name?: string
          message?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
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
      members: {
        Row: {
          "Date de naissance": string | null
          Ecole: string | null
          Email: string | null
          "Emploi fonction publique": string | null
          Facebook: string | null
          "Fili�re_EGAD": string | null
          "Fili�re_EGEF": string | null
          id: number
          instagram: string | null
          "Lieu d'exercice": string | null
          linkedIn: string | null
          Matricule: string | null
          "Minist�re": string | null
          "Nom de famille": string | null
          Photo: string | null
          "Pr�noms": string | null
          "R�gion": string | null
          WhatsApp: number | null
        }
        Insert: {
          "Date de naissance"?: string | null
          Ecole?: string | null
          Email?: string | null
          "Emploi fonction publique"?: string | null
          Facebook?: string | null
          "Fili�re_EGAD"?: string | null
          "Fili�re_EGEF"?: string | null
          id?: number
          instagram?: string | null
          "Lieu d'exercice"?: string | null
          linkedIn?: string | null
          Matricule?: string | null
          "Minist�re"?: string | null
          "Nom de famille"?: string | null
          Photo?: string | null
          "Pr�noms"?: string | null
          "R�gion"?: string | null
          WhatsApp?: number | null
        }
        Update: {
          "Date de naissance"?: string | null
          Ecole?: string | null
          Email?: string | null
          "Emploi fonction publique"?: string | null
          Facebook?: string | null
          "Fili�re_EGAD"?: string | null
          "Fili�re_EGEF"?: string | null
          id?: number
          instagram?: string | null
          "Lieu d'exercice"?: string | null
          linkedIn?: string | null
          Matricule?: string | null
          "Minist�re"?: string | null
          "Nom de famille"?: string | null
          Photo?: string | null
          "Pr�noms"?: string | null
          "R�gion"?: string | null
          WhatsApp?: number | null
        }
        Relationships: []
      }
      news: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          details: string | null
          id: string
          image_url: string | null
          is_visible: boolean | null
          published_by: string | null
          published_date: string
          reading_time: number | null
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          details?: string | null
          id?: string
          image_url?: string | null
          is_visible?: boolean | null
          published_by?: string | null
          published_date: string
          reading_time?: number | null
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          details?: string | null
          id?: string
          image_url?: string | null
          is_visible?: boolean | null
          published_by?: string | null
          published_date?: string
          reading_time?: number | null
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
      newsletter_subscriptions: {
        Row: {
          email: string
          id: string
          is_active: boolean
          subscribed_at: string
          unsubscribe_token: string
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
          unsubscribe_token?: string
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
          unsubscribe_token?: string
        }
        Relationships: []
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
      authenticate_app_user: {
        Args: { _password: string; _username: string }
        Returns: {
          email: string
          first_name: string
          id: string
          image_url: string
          last_name: string
          role: Database["public"]["Enums"]["user_role"]
          username: string
        }[]
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_member_details: {
        Args: { member_matricule: string; verification_matricule: string }
        Returns: {
          date_naissance: string
          ecole: string
          email: string
          emploi_fonction_publique: string
          facebook: string
          filiere_egad: string
          filiere_egef: string
          id: number
          instagram: string
          lieu_exercice: string
          linkedin: string
          ministere: string
          nom_famille: string
          photo: string
          prenoms: string
          region: string
          whatsapp: number
        }[]
      }
      get_member_directory: {
        Args: Record<PropertyKey, never>
        Returns: {
          emploi_fonction_publique: string
          has_facebook: boolean
          has_instagram: boolean
          has_linkedin: boolean
          has_whatsapp: boolean
          id: number
          lieu_exercice: string
          matricule: string
          nom_famille: string
          photo: string
          prenoms: string
        }[]
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      log_security_event: {
        Args: { details?: Json; event_type: string; user_id?: string }
        Returns: undefined
      }
      security_audit_report: {
        Args: Record<PropertyKey, never>
        Returns: {
          affected_count: number
          audit_category: string
          issue_description: string
          recommendation: string
          severity_level: string
        }[]
      }
      security_monitor: {
        Args: Record<PropertyKey, never>
        Returns: {
          active_threats: number
          recommendations: string[]
          security_status: string
          timestamp_check: string
        }[]
      }
      sp_inserer_membre: {
        Args: {
          p_date_naissance: string
          p_ecole: string
          p_email: string
          p_emploi: string
          p_filiere_egad: string
          p_filiere_egef: string
          p_lieu_exercice: string
          p_matricule: string
          p_ministere: string
          p_nom_famille: string
          p_photo: string
          p_prenoms: string
          p_region: string
          p_whatsapp: string
        }
        Returns: number
      }
      test_user_rls_policies: {
        Args: Record<PropertyKey, never>
        Returns: {
          message: string
          result: string
          test_name: string
        }[]
      }
      validate_password_strength: {
        Args: { password: string }
        Returns: boolean
      }
      validate_user_security: {
        Args: Record<PropertyKey, never>
        Returns: {
          details: string
          recommendation: string
          security_check: string
          status: string
        }[]
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
