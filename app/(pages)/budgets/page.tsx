import { getBudgetsWithDetails } from '@/actions'

import BudgetPieChart from './_components/BudgetPieChart'
import { Fragment } from 'react'
import { Metadata } from 'next/types'
import NewBudgetModal from './_components/NewBudgetModal'
import SpendingSummary from './_components/SpendingSummary'
import Budgets from './_components/Budgets'

export const metadata = {
  title: 'Budgets',
  description: 'Set limits and track your expenses effectively.',
} as Metadata

async function Page() {
  const budgets = await getBudgetsWithDetails()

  return (
    <Fragment>
      <section className='w-full flex justify-between items-center'>
        <h1>Budgets</h1>
        <NewBudgetModal />
      </section>
      <section className='w-full flex gap-8'>
        <div className='w-1/3 bg-white p-8 rounded-xl h-max'>
          <BudgetPieChart className='mx-auto' budgets={budgets} />
          <SpendingSummary budgets={budgets} />
        </div>
        <Budgets />
      </section>
    </Fragment>
  )
}

export default Page
