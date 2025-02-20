interface BudgetItemProps {
  title: string
  amount: number
  maximum: number
  theme: string
}

const BudgetItem = ({ title, amount, maximum, theme }: BudgetItemProps) => {
  return (
    <div className='flex justify-between items-center py-2'>
      <div className='flex items-center gap-2'>
        <span
          className='w-1 h-5 rounded-full'
          style={{ backgroundColor: theme }}
        />
        <span className='text-grey-500 text-sm'>{title}</span>
      </div>
      <span className='text-md text-grey-900 font-bold'>
        ${amount.toFixed(2)}{' '}
        <span className='text-grey-500 text-xs'>of ${maximum.toFixed(2)}</span>
      </span>
    </div>
  )
}

export default BudgetItem
