import { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Reset password',
  description: 'Enter your new password to regain access to your account.',
}

export default async function ResetPassword() {
  return (
    <form>
      <h1 className='text-lg'>Reset password</h1>
    </form>
  )
}
