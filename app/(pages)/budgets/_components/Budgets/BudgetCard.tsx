'use client'

import { motion } from 'framer-motion'
import { getLatestExpenses } from '@/actions'
import { useEffect, useState } from 'react'
import { BudgetDetails, LatestExpense } from '@/types'
import Image from 'next/image'
import { ArrowRightIcon } from '@/components/icons'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

const BudgetCard = ({
  id,
  total_spent,
  max_spend,
  category,
  theme,
}: BudgetDetails) => {
  const [transactions, setTransactions] = useState<LatestExpense[]>([])

  useEffect(() => {
    ;(async () => {
      const expenses = await getLatestExpenses()
      const filteredExpenses = expenses
        .filter((e) => e.category === category)
        .slice(0, 3)
      setTransactions(filteredExpenses)
    })()
  }, [id])

  const progress = (total_spent / max_spend) * 100

  return (
    <div className='bg-white p-6 rounded-xl w-full relative'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <span
            className={'h-3 w-3 rounded-full'}
            style={{ background: theme }}
          />
          <h3 className='text-lg font-bold text-grey-900'>{category}</h3>
        </div>
        <MoreHorizontal className='text-gray-400 cursor-pointer' />
      </div>

      <p className='text-gray-500 text-sm mt-1'>
        Maximum of £{max_spend.toFixed(2)}
      </p>

      <div className='w-full bg-gray-200 rounded-full h-6 mt-4 relative'>
        <motion.div
          className='h-6 rounded-md'
          style={{ background: theme }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>

      <div className='w-full flex justify-between mt-2'>
        <div className='w-[50%] flex gap-4'>
          <div
            className='w-1 h-full rounded-lg'
            style={{ background: theme }}
          ></div>
          <div className='flex flex-col gap-1 pl-5'>
            <h6 className='text-grey-500 text-xs'>Spent</h6>
            <p className='text-sm text-grey-900 font-bold'>
              £{total_spent.toFixed(2)}
            </p>
          </div>
        </div>
        <div className='w-[50%] flex gap-4'>
          <div className='w-1 h-full rounded-lg bg-beige-100'></div>
          <div className='flex flex-col gap-1'>
            <h6 className='text-grey-500 text-xs'>Remaining</h6>
            <p className='text-sm text-grey-900 font-bold'>
              £{(max_spend - total_spent).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className='mt-6 bg-beige-100 p-5 rounded-xl'>
        <div className='flex justify-between items-center'>
          <h4 className='text-md font-bold text-grey-900'>Latest Spending</h4>
          <Link
            href='/transactions'
            className='text-sm text-grey-500 cursor-pointer hover:gap-2 flex gap-1 transition-all ease-linear duration-100 items-center'
          >
            See All
            <ArrowRightIcon />
          </Link>
        </div>
        <ul className='mt-2'>
          {transactions.map((t, index) => (
            <li
              key={t.id}
              className='py-3 border-t first:border-t-0 border-gray-300 flex justify-between items-center'
            >
              <div className='flex items-center gap-3'>
                {t.avatar && (
                  <Image
                    height={28}
                    width={28}
                    src={t.avatar}
                    alt={t.recipient_sender_name}
                    priority
                    className='rounded-full'
                  />
                )}
                <div className='flex flex-col'>
                  <span className='text-sm font-medium'>
                    {t.recipient_sender_name}
                  </span>
                </div>
              </div>
              <div className='flex flex-col items-end'>
                <span className='text-sm text-grey-900 font-bold'>
                  -£{t.amount.toFixed(2)}
                </span>
                <span className='text-xs text-gray-500'>
                  {new Date(t.date).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BudgetCard
