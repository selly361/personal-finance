'use server'

import { createServer } from '@/lib/supabase'

export const getRecipientsSenders = async () => {
  const supabase = await createServer()
  const { data, error } = await supabase.from('recipients_senders').select('*')

  if (error) throw error

  return data
}
