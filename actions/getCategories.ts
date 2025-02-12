'use server'

import { createServer } from '@/lib/supabase'

export const getCategories = async () => {
  const supabase = await createServer()

  const { data, error } = await supabase.from('categories').select('*')

  if (error) throw error

  return data
}
