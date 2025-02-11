import { Button } from '@/components/ui/button'
import { Metadata } from 'next/types'
import { logoutAction } from '@/actions'

export const metadata = {
  title: 'Overview',
  description:
    'Get an overview of your finances, track spending, and manage budgets all in one place.',
} as Metadata

async function Page() {
  return (
    <main>
      <h1>Home</h1>

      <form>
        <Button formAction={logoutAction}>Sign Out</Button>
      </form>
    </main>
  )
}

export default Page
