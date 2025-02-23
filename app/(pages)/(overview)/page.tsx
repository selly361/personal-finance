import { Button } from '@/components/ui/button'
import { Fragment } from 'react'
import { LogOutIcon } from 'lucide-react'
import { Metadata } from 'next/types'
import SummaryStats from './_components/SummaryStats'
import { getSummary } from '@/actions/getSummary'
import { logoutAction } from '@/actions'

export const metadata = {
  title: 'Overview',
  description:
    'Get an overview of your finances, track spending, and manage budgets all in one place.',
} as Metadata

async function Page() {
  const summary = await getSummary()
  return (
    <Fragment>
      <section className='w-full flex justify-between items-center'>
        <h1>Overview</h1>
        <Button formAction={logoutAction}>
          <LogOutIcon />
          Logout
        </Button>
      </section>
      <SummaryStats {...summary} />
    </Fragment>
  )
}

export default Page
