'use server'

import { createServer } from '@/lib/supabase'

export const getThemesWithBudgetUsage = async () => {
  const supabase = await createServer()
  const { data, error } = await supabase.rpc('get_themes_with_budget_usage')
  
  if (error) throw error
  
  return data.map((theme) => ({ ...theme, isUsed: theme.isused }))
}

export const getThemesWithPotUsage = async () => {
  const supabase = await createServer()
  const { data, error } = await supabase.rpc('get_themes_with_pot_usage')

  if (error) throw error

  return data.map((theme) => ({ ...theme, isUsed: theme.isused }))
}
