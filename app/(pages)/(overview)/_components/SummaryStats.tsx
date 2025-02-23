import React from 'react'
import { Summary } from '@/types'

function SummaryStats({ income, expenses }: Summary) {
  return (
    <section className='w-full flex gap-2'>
      <div className='h-32 w-full p-6 bg-grey-900 rounded-xl text-white flex flex-col gap-4'>
        <h6>Income</h6>
        <p className='text-xl font-bold'>£{income.toLocaleString('en-UK')}</p>
      </div>
      <div className='h-32 w-full p-6 bg-white rounded-xl flex flex-col gap-4'>
        <h6 className='text-grey-500'>Expenses</h6>
        <p className='text-xl font-bold'>£{expenses.toLocaleString('en-UK')}</p>
      </div>
    </section>
  )
}

export default SummaryStats
