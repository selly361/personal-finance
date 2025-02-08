import { Metadata } from 'next/types'

export const metadata = {
  title: 'Budgets',
  description: 'Set limits and track your expenses effectively.',
} as Metadata

async function Page() {
  return (
    <main>
      <h1>Budgets</h1>
    </main>
  )
}

export default Page
