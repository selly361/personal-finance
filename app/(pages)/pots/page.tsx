import { Metadata } from 'next/types'

export const metadata = {
  title: 'Pots',
  description: 'Save and organize money for different goals.',
} as Metadata

async function Page() {
  return (
    <main>
      <h1>Pots</h1>
    </main>
  )
}

export default Page
