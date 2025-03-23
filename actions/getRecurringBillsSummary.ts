"use server"

import { RecurringBillsSummary } from "@/types"
import { createServer } from "@/lib/supabase"

export const getRecurringBillsSummary = async (): Promise<RecurringBillsSummary> => {
  const supabase = await createServer()

  const { data, error } = await supabase.rpc("get_recurring_bills_summary")
  if (error) throw error

  return data as RecurringBillsSummary
}