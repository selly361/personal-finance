export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      budgets: {
        Row: {
          category_id: string
          created_at: string | null
          id: string
          max_spend: number
          theme_id: string
          total_spent: number
          user_id: string | null
        }
        Insert: {
          category_id: string
          created_at?: string | null
          id?: string
          max_spend: number
          theme_id: string
          total_spent?: number
          user_id?: string | null
        }
        Update: {
          category_id?: string
          created_at?: string | null
          id?: string
          max_spend?: number
          theme_id?: string
          total_spent?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'budgets_category_id_fkey'
            columns: ['category_id']
            isOneToOne: true
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'budgets_theme_id_fkey'
            columns: ['theme_id']
            isOneToOne: true
            referencedRelation: 'themes'
            referencedColumns: ['id']
          },
        ]
      }
      categories: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      pots: {
        Row: {
          created_at: string | null
          id: string
          name: string
          target: number
          theme_id: string
          total: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          target?: number
          theme_id: string
          total?: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          target?: number
          theme_id?: string
          total?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'pots_theme_id_fkey'
            columns: ['theme_id']
            isOneToOne: true
            referencedRelation: 'themes'
            referencedColumns: ['id']
          },
        ]
      }
      recipients_senders: {
        Row: {
          avatar: string
          id: string
          name: string
        }
        Insert: {
          avatar: string
          id?: string
          name: string
        }
        Update: {
          avatar?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      summary: {
        Row: {
          total_expenses: number
          total_income: number
          user_id: string
        }
        Insert: {
          total_expenses?: number
          total_income?: number
          user_id: string
        }
        Update: {
          total_expenses?: number
          total_income?: number
          user_id?: string
        }
        Relationships: []
      }
      themes: {
        Row: {
          color_code: string
          id: string
          name: string
        }
        Insert: {
          color_code: string
          id?: string
          name: string
        }
        Update: {
          color_code?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          avatar: string
          category_id: string
          created_at: string | null
          date: Date
          id: string
          recipient_sender_name: string
          recurring: boolean | null
          user_id: string | null
        }
        Insert: {
          amount: number
          avatar: string
          category_id: string
          created_at?: string | null
          date: Date
          id?: string
          recipient_sender_name: string
          recurring?: boolean | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          avatar?: string
          category_id?: string
          created_at?: string | null
          date?: Date
          id?: string
          recipient_sender_name?: string
          recurring?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'transactions_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_budgets_with_details: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          category: string
          theme: string
          max_spend: number
          total_spent: number
        }[]
      }
      get_categories_with_budget_usage: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          isused: boolean
        }[]
      }
      get_expenses: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          amount: number
          category_id: string
          date: Date
          recipient_sender_name: string
          avatar: string
          recurring: boolean
        }[]
      }
      get_latest_expenses: {
        Args: Record<PropertyKey, never>
        Returns: {
          budget_id: string
          id: string
          amount: number
          category: string
          date: string
          recipient_sender_name: string
          avatar: string
        }[]
      }
      get_pots_with_details: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          theme: string
          target: number
          total: number
        }[]
      }
      get_themes_with_budget_usage: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          color_code: string
          isused: boolean
        }[]
      }
      get_themes_with_pot_usage: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          color_code: string
          isused: boolean
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never
