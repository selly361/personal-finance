import { Fragment } from 'react'
import { Metadata } from 'next/types'
import NewTransactionModal from './_components/NewTransactionModal'

export const metadata = {
  title: 'Transactions',
  description: 'View and track all your spending in one place.',
} as Metadata

async function Page() {
  return (
    <Fragment>
      <section className='w-full flex justify-between items-center'>
        <h1>Transactions</h1>
        <NewTransactionModal />
      </section>
    </Fragment>
  )
}

export default Page
