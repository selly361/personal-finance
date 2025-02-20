'use server'

import { Pot } from '@/types'
import { createServer } from '@/lib/supabase'
import { potValidation } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

export const getPots = async () => {
  const supabase = await createServer()

  const { data, error } = await supabase.from('budgets').select('*')

  if (error) throw error

  return data
}

export const getPotsWithDetails = async () => {
  const supabase = await createServer()

  const { data, error } = await supabase.rpc('get_pots_with_details')

  if (error) throw error

  return data
}

export const createPot = async (potData: Pot) => {
  const result = potValidation.safeParse(potData)

  if (!result.success) return { error: result.error.format() }

  const supabase = await createServer()

  const { data, error } = await supabase
    .from('pots')
    .insert([potData])
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/pots')
  return { data }
}

export const updatePot = async (pot_id: string, potData: Pot) => {
  const result = potValidation.safeParse(potData)

  if (!result.success) return { error: result.error.format() }

  const supabase = await createServer()

  const { data, error } = await supabase
    .from('pots')
    .update(potData)
    .eq('id', pot_id)
    .select()
    .single()

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/pots')
  return { data }
}

export const deletePot = async (pot_id: string) => {
  const supabase = await createServer()

  const { error } = await supabase.from('pots').delete().eq('id', pot_id)

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/pots')
  return { success: true }
}
