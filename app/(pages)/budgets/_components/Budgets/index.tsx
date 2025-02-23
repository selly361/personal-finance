import { getBudgetsWithDetails } from '@/actions'
import BudgetCard from './BudgetCard'

const Budgets = async () => {
  const budgets = await getBudgetsWithDetails()

  return (
    <div className='w-2/3 grid grid-cols-1 gap-6'>
      {budgets.map((budget) => (
        <BudgetCard key={budget.id} {...budget} />
      ))}
    </div>
  )
}

export default Budgets
