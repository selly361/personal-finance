import { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: 'Sign up',
  description:
    'Create an account to start tracking and managing your finances.',
}

export default async function Signup() {
  return (
    <form>
      <h2 className='text-lg'>Sign up</h2>
    </form>
  )
}
