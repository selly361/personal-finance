import { BudgetDetails } from '@/types'
import BudgetItem from './BudgetItem'
import { cn } from '@/lib/utils'

interface SpendingSummaryProps {
  budgets: BudgetDetails[]
}

export default function SpendingSummary({ budgets }: SpendingSummaryProps) {
  return (
    <div className='bg-white rounded-xl'>
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
