'use server'

import { createServer } from '@/lib/supabase'

export const getCategories = async () => {
  const supabase = await createServer()

  const { data, error } = await supabase.from('categories').select('*')

  if (error) throw error

  return data
}

export const getCategoriesWithBudgetUsage = async () => {
  const supabase = await createServer()
  const { data, error } = await supabase.rpc('get_categories_with_budget_usage')

  if (error) throw error

  return data.map((theme) => ({ ...theme, isUsed: theme.isused }))
}
