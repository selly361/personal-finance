'use server'

import { createServer } from '@/lib/supabase'
import { encodedRedirect } from '@/lib/utils/encodedRedirect'
import { redirect } from 'next/navigation'

export const signInAction = async (formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = await createServer()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return encodedRedirect('error', '/sign-in', error.message)
  }

  return redirect('/')
}
