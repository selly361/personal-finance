import { Button } from '@/components/ui/button'
import { Metadata } from 'next/types'
import { signOutAction } from '@/actions'

export const metadata = {
  title: 'Dashboard',
  description:
    'Get an overview of your finances, track spending, and manage budgets all in one place.',
} as Metadata

async function Page() {
  return (
    <main>
      <h1>Home</h1>

      <form>
        <Button formAction={signOutAction}>Sign Out</Button>
      </form>
    </main>
  )
}

export default Page
