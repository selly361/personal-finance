'use client'

import { BillDueIcon, BillPaidIcon } from '@/components/icons'

import { RecurringBill } from '@/types'

interface RecurringBillsTableProps {
  bills: RecurringBill[]
}

export default function RecurringBillsTable({ bills }: RecurringBillsTableProps) {
  if (bills.length === 0) {
    return <p className='text-sm text-grey-500 mt-4'>No bills found.</p>
  }

  return (
    <div className='rounded-md overflow-hidden'>
      <table className='w-full border-collapse'>
        <thead className='text-xs text-grey-500 border-b'>
          <tr>
            <th className='py-3 px-4 text-left'>Bill Title</th>
            <th className='py-3 px-4 text-left'>Due Date</th>
            <th className='py-3 px-4 text-right'>Amount</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => {
            let Icon = null
            let amountClass = 'text-grey-900'
            if (bill.status === 'paid') {
              Icon = <BillPaidIcon />
              amountClass = 'text-green'
            } else if (bill.status === 'due_soon') {
              Icon = <BillDueIcon />
              amountClass = 'text-red-500'
            }

            return (
              <tr key={bill.id} className='border-b last:border-none'>
                <td className='py-3 px-4 text-sm text-grey-900'>
                  <div className='flex items-center gap-2'>
                    {bill.avatar && (
                      <div className='w-6 h-6 rounded-full overflow-hidden'>
                        <img
                          src={bill.avatar}
                          alt={bill.bill_title}
                          className='w-full h-full object-cover'
                        />
                      </div>
                    )}

                    <span>{bill.bill_title}</span>
                  </div>
                </td>

                <td style={{ color: bill.status === 'paid' ? '#277C78' : '#696868' }} className='py-3 px-4 text-sm text-grey-500 flex items-center gap-2'>
                  {bill.due_date_label} {Icon}
                </td>
                <td style={{ color: bill.status === 'due_soon' ? '#C94736' : '#201F24' }} className='py-3 px-4 text-sm text-right font-bold text-grey-900'>
                  £{bill.amount.toFixed(2)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
