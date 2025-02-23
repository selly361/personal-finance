'use server'

import { Theme } from '@/types'
import { createServer } from '@/lib/supabase'

export const getThemesWithBudgetUsage = async (): Promise<Theme[]> => {
  const supabase = await createServer()
  const { data, error } = await supabase.rpc('get_themes_with_budget_usage')

  if (error) throw error

  return data.map((theme) => ({
    id: theme.id,
    name: theme.name,
    color: theme.color_code,
    isUsed: theme.isused,
  }))
}

export const getThemesWithPotUsage = async (): Promise<Theme[]> => {
  const supabase = await createServer()
  const { data, error } = await supabase.rpc('get_themes_with_pot_usage')

  if (error) throw error

  return data.map((theme) => ({
    id: theme.id,
    name: theme.name,
    color: theme.color_code,
    isUsed: theme.isused,
  }))
}
