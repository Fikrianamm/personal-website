export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type SocialLinks = {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
  [key: string]: string | undefined;
};

export type Database = {
  public: {
    Tables: {
      profile: {
        Row: {
          id: string;
          full_name: string;
          headline: string;
          bio: string;
          avatar_url: string | null;
          resume_url: string | null;
          email: string;
          location: string | null;
          social_links: SocialLinks;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          headline?: string;
          bio?: string;
          avatar_url?: string | null;
          resume_url?: string | null;
          email: string;
          location?: string | null;
          social_links?: SocialLinks;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          headline?: string;
          bio?: string;
          avatar_url?: string | null;
          resume_url?: string | null;
          email?: string;
          location?: string | null;
          social_links?: SocialLinks;
          updated_at?: string;
        };
        Relationships: [];
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: string;
          icon_url: string | null;
          display_order: number;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          icon_url?: string | null;
          display_order?: number;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          icon_url?: string | null;
          display_order?: number;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          long_description: string | null;
          thumbnail_url: string | null;
          images: string[];
          tech_stack: string[];
          live_url: string | null;
          source_url: string | null;
          is_featured: boolean;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          long_description?: string | null;
          thumbnail_url?: string | null;
          images?: string[];
          tech_stack?: string[];
          live_url?: string | null;
          source_url?: string | null;
          is_featured?: boolean;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string;
          long_description?: string | null;
          thumbnail_url?: string | null;
          images?: string[];
          tech_stack?: string[];
          live_url?: string | null;
          source_url?: string | null;
          is_featured?: boolean;
          display_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      experiences: {
        Row: {
          id: string;
          company: string;
          role: string;
          description: string | null;
          start_date: string;
          end_date: string | null;
          company_logo_url: string | null;
          display_order: number;
        };
        Insert: {
          id?: string;
          company: string;
          role: string;
          description?: string | null;
          start_date: string;
          end_date?: string | null;
          company_logo_url?: string | null;
          display_order?: number;
        };
        Update: {
          id?: string;
          company?: string;
          role?: string;
          description?: string | null;
          start_date?: string;
          end_date?: string | null;
          company_logo_url?: string | null;
          display_order?: number;
        };
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string;
          message?: string;
          is_read?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Profile = Database["public"]["Tables"]["profile"]["Row"];
export type Skill = Database["public"]["Tables"]["skills"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Experience = Database["public"]["Tables"]["experiences"]["Row"];
export type ContactMessage = Database["public"]["Tables"]["contact_messages"]["Row"];
