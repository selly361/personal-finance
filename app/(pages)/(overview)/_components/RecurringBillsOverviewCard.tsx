'use client'

import { ArrowRightIcon } from '@/components/icons'
import Link from 'next/link'
import { RecurringBillsSummary } from '@/types'
import { formatNumber } from '@/lib/utils'

interface RecurringBillsOverviewCardProps {
  summary: RecurringBillsSummary['summary']
}

export default function RecurringBillsOverviewCard({
  summary,
}: RecurringBillsOverviewCardProps) {
  return (
    <div className='bg-white rounded-xl p-6 shadow flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <h5 className='text-md font-bold text-grey-900'>Recurring Bills</h5>
        <Link
          href='/recurring-bills'
          className='text-sm text-grey-500 hover:underline flex items-center gap-1'
        >
          See Details
          <ArrowRightIcon />
        </Link>
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-3 p-3 bg-beige-100 rounded-lg border-l-4 border-l-green'>
          <span className='text-sm text-grey-900'>Paid Bills</span>
          <span className='ml-auto text-sm font-bold text-grey-900'>
            £{formatNumber(summary.total_paid)}
          </span>
        </div>
        <div className='flex items-center gap-3 p-3 bg-beige-100 rounded-lg border-l-4 border-l-yellow'>
          <span className='text-sm text-grey-900'>Total Upcoming</span>
          <span className='ml-auto text-sm font-bold text-grey-900'>
            £{formatNumber(summary.total_upcoming)}
          </span>
        </div>
        <div className='flex items-center gap-3 p-3 bg-beige-100 rounded-lg border-l-4 border-l-cyan'>
          <span className='text-sm text-grey-900'>Due Soon</span>
          <span className='ml-auto text-sm font-bold text-grey-900'>
            £{formatNumber(summary.total_due_soon)}
          </span>
        </div>
      </div>
    </div>
  )
}
