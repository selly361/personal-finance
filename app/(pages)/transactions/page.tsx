import { Metadata } from 'next/types'

export const metadata = {
  title: 'Transactions',
  description: 'View and track all your spending in one place.',
} as Metadata

async function Page() {
  return (
    <main>
      <h1>Transactions</h1>
    </main>
  )
}

export default Page
