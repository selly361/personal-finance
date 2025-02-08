import { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Forgot password',
  description: 'Recover your account by resetting your password securely.',
}

export default async function ForgotPassword() {
  return (
    <form>
      <h1 className='text-lg'>Reset Password</h1>
    </form>
  )
}
