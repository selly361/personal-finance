'use server'

import { createServer } from '@/lib/supabase'
import { Category } from '@/types'

export const getCategories = async () => {
  const supabase = await createServer()

  const { data, error } = await supabase.from('categories').select('*')

  if (error) throw error

  const categories: Category[] = data.map((category) => ({
    ...category,
    isUsed: false,
  }))
  return categories
}

export const getCategoriesWithBudgetUsage = async () => {
  const supabase = await createServer()
  const { data, error } = await supabase.rpc('get_categories_with_budget_usage')

  if (error) throw error

  const categories: Category[] = data.map((category) => ({
    ...category,
    isUsed: category.isused,
  }))
  return categories
}
