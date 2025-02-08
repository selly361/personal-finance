'use server'

import { createServer } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export const signOutAction = async () => {
  const supabase = await createServer()
  await supabase.auth.signOut()
  return redirect('/sign-in')
}
