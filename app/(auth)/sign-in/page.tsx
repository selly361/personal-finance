import { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Log in to your account and manage your finances securely.',
}

export default async function Login() {
  return (
    <form>
      <h1 className='text-lg'>Sign in</h1>
    </form>
  )
}
