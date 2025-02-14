'use server'

import { createServer } from '@/lib/supabase'

export const getThemes = async () => {
  const supabase = await createServer()

  const { data, error } = await supabase.from('themes').select('*')

  if (error) throw error

  return data
}
