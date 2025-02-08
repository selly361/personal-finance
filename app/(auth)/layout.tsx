import { Metadata } from 'next/types'
import { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  description:
    'Securely sign in, sign up, or recover your account to start managing your finances.',
}

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className='max-w-7xl flex flex-col gap-12 items-start'>
      <div>Side image</div>
      {children}
    </div>
  )
}
