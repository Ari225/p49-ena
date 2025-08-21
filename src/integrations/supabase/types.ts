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
          brief_description: string | null
          category: string
          created_at: string
          created_by: string | null
          date: string
          description: string
          end_time: string | null
          id: string
          image_url: string | null
          location: string
          other_category: string | null
          start_time: string | null
          status: string
          time: string | null
          title: string
          updated_at: string
        }
        Insert: {
          brief_description?: string | null
          category: string
          created_at?: string
          created_by?: string | null
          date: string
          description: string
          end_time?: string | null
          id?: string
          image_url?: string | null
          location: string
          other_category?: string | null
          start_time?: string | null
          status?: string
          time?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          brief_description?: string | null
          category?: string
          created_at?: string
          created_by?: string | null
          date?: string
          description?: string
          end_time?: string | null
          id?: string
          image_url?: string | null
          location?: string
          other_category?: string | null
          start_time?: string | null
          status?: string
          time?: string | null
          title?: string
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
          author_function: string | null
          author_id: string | null
          author_image: string | null
          author_name: string | null
          category: string | null
          content: string
          created_at: string
          id: string
          image_url: string | null
          matricule: string | null
          published_date: string | null
          reading_time: number | null
          status: Database["public"]["Enums"]["article_status"]
          summary: string | null
          title: string
          updated_at: string
          validated_by: string | null
        }
        Insert: {
          author_function?: string | null
          author_id?: string | null
          author_image?: string | null
          author_name?: string | null
          category?: string | null
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          matricule?: string | null
          published_date?: string | null
          reading_time?: number | null
          status?: Database["public"]["Enums"]["article_status"]
          summary?: string | null
          title: string
          updated_at?: string
          validated_by?: string | null
        }
        Update: {
          author_function?: string | null
          author_id?: string | null
          author_image?: string | null
          author_name?: string | null
          category?: string | null
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          matricule?: string | null
          published_date?: string | null
          reading_time?: number | null
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
      communiques: {
        Row: {
          created_at: string
          created_by: string | null
          description: string
          id: string
          image_url: string | null
          published_date: string
          title: string
          updated_at: string
          urgency: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description: string
          id?: string
          image_url?: string | null
          published_date?: string
          title: string
          updated_at?: string
          urgency?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          image_url?: string | null
          published_date?: string
          title?: string
          updated_at?: string
          urgency?: string
        }
        Relationships: []
      }
      difficult_events: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          custom_category: string | null
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
          custom_category?: string | null
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
          custom_category?: string | null
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
          custom_category: string | null
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
          custom_category?: string | null
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
          custom_category?: string | null
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
      popups: {
        Row: {
          author: string
          created_at: string
          created_by: string | null
          created_date: string
          id: string
          image_url: string | null
          is_active: boolean
          message: string | null
          other_type: string | null
          position: string | null
          target_audience: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          author: string
          created_at?: string
          created_by?: string | null
          created_date?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          message?: string | null
          other_type?: string | null
          position?: string | null
          target_audience: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          author?: string
          created_at?: string
          created_by?: string | null
          created_date?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          message?: string | null
          other_type?: string | null
          position?: string | null
          target_audience?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      retirement_departures: {
        Row: {
          category: string | null
          created_at: string
          created_by: string | null
          custom_category: string | null
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
          category?: string | null
          created_at?: string
          created_by?: string | null
          custom_category?: string | null
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
          category?: string | null
          created_at?: string
          created_by?: string | null
          custom_category?: string | null
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
      suggestions: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          description: string
          email: string
          id: string
          name: string
          phone: string | null
          priority: string
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          created_by?: string | null
          description: string
          email: string
          id?: string
          name: string
          phone?: string | null
          priority?: string
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          priority?: string
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          content: string
          created_at: string
          id: string
          image_url: string | null
          is_active: boolean
          member_id: number
          member_name: string
          member_position: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          member_id: number
          member_name: string
          member_position: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          member_id?: number
          member_name?: string
          member_position?: string
          updated_at?: string
        }
        Relationships: []
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
      can_access_full_member_data: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      confirm_security_lockdown: {
        Args: Record<PropertyKey, never>
        Returns: {
          security_metric: string
          status: string
          threat_level: string
        }[]
      }
      create_supabase_user_if_needed: {
        Args: { app_user_id: string; user_email: string }
        Returns: string
      }
      create_testimonial_with_verification: {
        Args: { p_content: string; p_image_url?: string; p_matricule: string }
        Returns: {
          message: string
          success: boolean
          testimonial_id: string
        }[]
      }
      delete_testimonial_secure: {
        Args: { testimonial_id: string }
        Returns: boolean
      }
      final_security_check: {
        Args: Record<PropertyKey, never>
        Returns: {
          check_name: string
          details: string
          risk_level: string
          status: string
        }[]
      }
      final_vulnerability_test: {
        Args: Record<PropertyKey, never>
        Returns: {
          details: string
          result: string
          severity: string
          test_name: string
        }[]
      }
      get_all_members_public: {
        Args: Record<PropertyKey, never>
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
          matricule: string
          ministere: string
          nom_famille: string
          photo: string
          prenoms: string
          region: string
          whatsapp: number
        }[]
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_daily_testimonials: {
        Args: Record<PropertyKey, never>
        Returns: {
          content: string
          created_at: string
          id: string
          image_url: string
          member_name: string
          member_position: string
        }[]
      }
      get_editorial_team: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          email: string
          first_name: string
          id: string
          image_url: string
          last_name: string
          role: Database["public"]["Enums"]["user_role"]
          username: string
        }[]
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
      get_member_details_public: {
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
          matricule: string
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
      get_newsletter_subscribers: {
        Args: Record<PropertyKey, never>
        Returns: {
          email: string
          id: string
          is_active: boolean
          subscribed_at: string
        }[]
      }
      get_public_difficult_events: {
        Args: Record<PropertyKey, never>
        Returns: {
          category: string
          event_date: string
          general_message: string
          id: string
          image_url: string
          masked_member_name: string
          title: string
        }[]
      }
      get_public_happy_events: {
        Args: Record<PropertyKey, never>
        Returns: {
          category: string
          event_date: string
          general_message: string
          id: string
          image_url: string
          location: string
          masked_member_name: string
          title: string
        }[]
      }
      get_public_member_directory: {
        Args: Record<PropertyKey, never>
        Returns: {
          emploi_fonction_publique: string
          has_facebook: boolean
          has_instagram: boolean
          has_linkedin: boolean
          has_whatsapp: boolean
          id: number
          lieu_exercice: string
          nom_famille_masque: string
          prenoms_masque: string
          region: string
        }[]
      }
      get_public_retirement_departures: {
        Args: Record<PropertyKey, never>
        Returns: {
          category: string
          general_tribute: string
          id: string
          image_url: string
          masked_member_name: string
          retirement_date: string
          years_of_service: number
        }[]
      }
      get_secure_member_details: {
        Args: { target_member_id: number }
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
      get_secure_user_info: {
        Args: { target_user_id: string }
        Returns: {
          email: string
          first_name: string
          id: string
          image_url: string
          last_name: string
          role: string
          username: string
        }[]
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      get_users_list: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          email: string
          first_name: string
          id: string
          image_url: string
          last_name: string
          role: Database["public"]["Enums"]["user_role"]
          username: string
        }[]
      }
      log_security_event: {
        Args: { details?: Json; event_type: string; user_id?: string }
        Returns: undefined
      }
      mask_sensitive_data: {
        Args: { data_value: string; show_full?: boolean }
        Returns: string
      }
      secure_newsletter_subscribe: {
        Args: { subscriber_email: string }
        Returns: Json
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
      security_status_final: {
        Args: Record<PropertyKey, never>
        Returns: {
          check_category: string
          details: string
          risk_level: string
          status: string
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
      update_member_info: {
        Args: { p_member_id: number; p_update_data: Json }
        Returns: boolean
      }
      update_testimonial_secure: {
        Args: { new_content: string; testimonial_id: string }
        Returns: boolean
      }
      update_user_profile: {
        Args: {
          new_email: string
          new_first_name: string
          new_last_name: string
          new_password_hash?: string
          new_username: string
          user_id: string
        }
        Returns: Json
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
