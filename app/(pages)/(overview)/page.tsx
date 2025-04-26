import {
  getBudgetsWithDetails,
  getPotsWithDetails,
  getRecurringBillsSummary,
  getTransactionsOverview,
  logoutAction,
} from '@/actions'

import BudgetsOverviewCard from './_components/BudgetsOverviewCard'
import { Button } from '@/components/ui/button'
import { Fragment } from 'react'
import { LogOutIcon } from 'lucide-react'
import { Metadata } from 'next/types'
import PotsOverviewCard from './_components/PotsOverviewCard'
import RecurringBillsOverviewCard from './_components/RecurringBillsOverviewCard'
import SummaryStats from './_components/SummaryStats'
import TransactionsOverviewCard from './_components/TransactionsOverviewCard'
import { getSummary } from '@/actions/getSummary'

export const metadata: Metadata = {
  title: 'Overview',
  description: 'Get an overview of your finances...',
}

async function Page() {
  const [
    summary,
    pots,
    recurringData,
    budgets,
    transactionsOverview,
  ] = await Promise.all([
    getSummary(),
    getPotsWithDetails(),
    getRecurringBillsSummary(),
    getBudgetsWithDetails(),
    getTransactionsOverview(),
  ])

  const latestTransactions = transactionsOverview.transactions.slice(0, 5)
  const recurringBillsSummary = recurringData.summary

  return (
    <Fragment>
      <section className="w-full flex justify-between items-center">
        <h1>Overview</h1>
        <Button formAction={logoutAction}>
          <LogOutIcon />
          Logout
        </Button>
      </section>
      <SummaryStats {...summary} />
      <section className="flex gap-6 max-xl:flex-col">
        <section className="w-full flex flex-col gap-6">
          <PotsOverviewCard pots={pots} />
          <TransactionsOverviewCard transactions={latestTransactions} />
        </section>
        <section className="w-full flex flex-col gap-6">
          <BudgetsOverviewCard budgets={budgets} />
          <RecurringBillsOverviewCard summary={recurringBillsSummary} />
        </section>
      </section>
    </Fragment>
  )
}

export default Page
