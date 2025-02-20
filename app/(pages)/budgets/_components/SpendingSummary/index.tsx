import { cn } from '@/lib/utils'
import BudgetItem from './BudgetItem'
import { BudgetDetails } from '@/types'

interface SpendingSummaryProps {
  budgets: BudgetDetails[]
}

export default function SpendingSummary({ budgets }: SpendingSummaryProps) {
  return (
    <div className='bg-white p-6 rounded-xl'>
      <h2 className='text-lg mb-4'>Spending Summary</h2>
      <div className='divide-y'>
        {budgets.map(({ id, category, total_spent, max_spend, theme }) => (
          <BudgetItem
            key={id}
            title={category}
            amount={total_spent || 0}
            maximum={max_spend}
            theme={theme}
          />
        ))}
      </div>
    </div>
  )
}
