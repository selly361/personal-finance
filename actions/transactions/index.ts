'use server'

import { Transaction, TransactionsOverview } from '@/types'

import { createServer } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { transactionValidation } from '@/lib/validations'

export const getTransactions = async (expenses = true) => {
  const supabase = await createServer()

  let { data, error } = await supabase.from('transactions').select('*')

  if (expenses) {
    let { data, error } = await supabase.rpc('get_expenses')
  }

  if (error) throw error

  return data
}

export const getTransactionsOverview = async (): Promise<TransactionsOverview> => {
  const supabase = await createServer()

  const { data, error } = await supabase.rpc('get_transactions_overview')

  if (error) throw error

  return data as TransactionsOverview
}

export const getLatestExpenses = async () => {
  const supabase = await createServer()

  const { data, error } = await supabase.rpc('get_latest_expenses')

  if (error) throw error

  return data
}

export const createTransaction = async (transactionData: Transaction) => {
  const result = transactionValidation.safeParse(transactionData)

  if (!result.success) return { error: result.error.format() }

  const supabase = await createServer()

  const { data, error } = await supabase
    .from('transactions')
    .insert([transactionData])
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/transactions')
  return { data }
}

export const updateTransaction = async (
  transaction_id: string,
  transactionData: Transaction
) => {
  const result = transactionValidation.safeParse(transactionData)

  if (!result.success) return { error: result.error.format() }

  const supabase = await createServer()

  const { data, error } = await supabase
    .from('transactions')
    .update(transactionData)
    .eq('id', transaction_id)
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/transactions')
  return { data }
}

export const deleteTransaction = async (transaction_id: string) => {
  const supabase = await createServer()

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', transaction_id)

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/transactions')
  return { success: true }
}
