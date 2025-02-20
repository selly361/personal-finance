'use server'

import { Budget } from '@/types'
import { budgetValidation } from '@/lib/validations'
import { createServer } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export const getBudgets = async () => {
  const supabase = await createServer()

  const { data, error } = await supabase.from('budgets').select('*')

  if (error) throw error

  return data
}

export const getBudgetsWithDetails = async () => {
  const supabase = await createServer()

  const { data, error } = await supabase.rpc('get_budgets_with_details')

  if (error) throw error

  return data
}

export const createBudget = async (budgetData: Budget) => {
  const result = budgetValidation.safeParse(budgetData)

  if (!result.success) return { error: result.error.format() }

  const supabase = await createServer()

  const { data, error } = await supabase
    .from('budgets')
    .insert([budgetData])
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/budgets')
  return { data }
}

export const updateBudget = async (budget_id: string, budgetData: Budget) => {
  const result = budgetValidation.safeParse(budgetData)

  if (!result.success) return { error: result.error.format() }

  const supabase = await createServer()

  const { data, error } = await supabase
    .from('budgets')
    .update(budgetData)
    .eq('id', budget_id)
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/budgets')
  return { data }
}

export const deleteBudget = async (budget_id: string) => {
  const supabase = await createServer()

  const { error } = await supabase.from('budgets').delete().eq('id', budget_id)

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/budgets')
  return { success: true }
}
