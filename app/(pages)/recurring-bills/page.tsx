import { Metadata } from 'next/types'

export const metadata = {
  title: 'Recurring Bills',
  description: 'Track and manage your recurring expenses easily.',
} as Metadata

async function Page() {
  return (
    <main>
      <h1>Recurring Bills</h1>
    </main>
  )
}

export default Page
