'use client'

import { Summary } from '@/types'
import millify from 'millify'

export default function SummaryStats({ income, expenses }: Summary) {
  const balance = income - expenses
  return (
    <section className='w-full flex gap-2'>
      <div className='h-32 w-full p-6 bg-grey-900 rounded-xl text-white flex flex-col gap-4'>
        <h6>Current Balance</h6>
        <p className='text-xl font-bold'>£{millify(balance, { precision: 3 })}</p>
      </div>
      <div className='h-32 w-full p-6 bg-white rounded-xl flex flex-col gap-4'>
        <h6 className='text-grey-500'>Income</h6>
        <p className='text-xl font-bold'>£{millify(income, { precision: 3 })}</p>
      </div>
      <div className='h-32 w-full p-6 bg-white rounded-xl flex flex-col gap-4'>
        <h6 className='text-grey-500'>Expenses</h6>
        <p className='text-xl font-bold'>£{millify(expenses, { precision: 3 })}</p>
      </div>
    </section>
  )
}
