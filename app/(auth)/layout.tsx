import { LargeLogo } from '@/components/icons'
import { Metadata } from 'next/types'
import { PropsWithChildren } from 'react'

export const metadata: Metadata = {
  description:
    'Securely sign in, sign up, or recover your account to start managing your finances.',
}

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <main className='w-screen h-screen p-5 flex max-lg:h-max max-lg:p-0 max-lg:flex-col max-lg:justify-between max-lg:pb-10 max-lg:gap-10 max-lg:items-center'>
      <header className='hidden max-lg:flex w-screen min-h-20 bg-grey-900 justify-center items-center'>
        <LargeLogo />
      </header>
      <div className="bg-[url('/illustration-authentication.svg')] bg-cover bg-no-repeat bg-center max-h-screen rounded-md pt-5 pl-20 pb-10 pr-5 flex flex-col justify-between max-w-[35%] max-lg:hidden">
        <LargeLogo />
        <div className='text-white'>
          <h2>Keep track of your money and save for your future</h2>
          <p className='mt-6'>
            Personal finance app puts you in control of your spending. Track
            transactions, set budgets, and add to savings pots easily.
          </p>
        </div>
      </div>

      <div className='max-lg:w-[70vw] max-sm:w-[90vw] lg:w-full lg:flex lg:justify-center lg:items-center'>
        <div className='lg:w-[35rem] bg-white rounded-xl p-8'>{children}</div>
      </div>
    </main>
  )
}
