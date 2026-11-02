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
          social_links: Json;
          updated_at: string;
          phone: string | null;
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
          social_links?: Json;
          updated_at?: string;
          phone?: string | null;
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
          social_links?: Json;
          updated_at?: string;
          phone?: string | null;
        };
        Relationships: [];
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: string;
          icon_url: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          icon_url?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          icon_url?: string | null;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
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
          skills: string | null;
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
          skills?: string | null;
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
          skills?: string | null;
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
export type PortfolioProfile = Omit<Profile, "social_links"> & {
  social_links: SocialLinks;
};
export type Skill = Database["public"]["Tables"]["skills"]["Row"];
export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Experience = Database["public"]["Tables"]["experiences"]["Row"];
