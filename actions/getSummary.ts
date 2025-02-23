'use server'

import { Summary } from '@/types'
import { createServer } from '@/lib/supabase'

export const getSummary = async (): Promise<Summary> => {
  const supabase = await createServer()
  
  const { data, error } = await supabase.from('summary').select().single()

  if(!data){
    return { expenses: 0, income: 0 }
  }
  
  if (error) {
    throw error
  }
  
    return { expenses: data.total_expenses, income: data.total_income }
}
