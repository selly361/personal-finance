'use client'

import { BillDueIcon, BillPaidIcon, RecurringBillsIcon } from '@/components/icons'
import {
  Card,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { useMemo, useState } from 'react'

import { RecurringBillsSummary } from '@/types'
import RecurringBillsTable from './RecurringBillsTable'
import { Search } from 'lucide-react'

type SortOption = 'latest' | 'oldest' | 'az' | 'za' | 'highest' | 'lowest'

interface RecurringBillsPageProps {
  data: RecurringBillsSummary
}

export default function RecurringBillsPage({ data }: RecurringBillsPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('latest')

  const filteredBills = useMemo(() => {
    return data.bills.filter((bill) =>
      bill.bill_title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [data.bills, searchTerm])

  const sortedBills = useMemo(() => {
    const billsCopy = [...filteredBills]
    billsCopy.sort((a, b) => {
      const dateA = new Date(a.due_date).getTime()
      const dateB = new Date(b.due_date).getTime()

      switch (sortBy) {
        case 'latest':
          return dateB - dateA
        case 'oldest':
          return dateA - dateB
        case 'az':
          return a.bill_title.localeCompare(b.bill_title)
        case 'za':
          return b.bill_title.localeCompare(a.bill_title)
        case 'highest':
          return b.amount - a.amount
        case 'lowest':
          return a.amount - b.amount
        default:
          return 0
      }
    })
    return billsCopy
  }, [filteredBills, sortBy])

  return (
    <div className='flex flex-col lg:flex-row gap-8'>
      <aside className='lg:w-1/3 space-y-4'>
        <Card className='bg-grey-900 text-white p-6 space-y-4 rounded-xl shadow'>
          <RecurringBillsIcon className='mb-6' />

          <div className='flex flex-col gap-2.5'>
            <h2 className='text-sm'>Total Bills</h2>
            <h3 className='text-xl font-bold'>£{data.summary.total_bills.toFixed(2)}</h3>
          </div>
        </Card>

        <Card className='p-6 space-y-3 rounded-xl shadow'>
          <h2 className='text-md font-bold text-grey-900'>Summary</h2>

          <div className='flex justify-between text-sm text-grey-700'>
            <span>Paid Bills</span>
            <span className='font-bold'>
              {data.summary.count_paid} ( £{data.summary.total_paid.toFixed(2)} )
            </span>
          </div>
          <hr />
          <div className='flex justify-between text-sm text-grey-700'>
            <span>Total Upcoming</span>
            <span className='font-bold'>
              {data.summary.count_upcoming} ( £{data.summary.total_upcoming.toFixed(2)} )
            </span>
          </div>
          <hr />
          <div className='flex justify-between text-sm text-red-500'>
            <span>Due Soon</span>
            <span className='font-bold'>
              {data.summary.count_due_soon} ( £{data.summary.total_due_soon.toFixed(2)} )
            </span>
          </div>
        </Card>
      </aside>

      {/* RIGHT COLUMN: Search + Sort + Table */}
      <section className='flex-1 space-y-6 bg-white p-6 h-max rounded-xl'>
        {/* Search + Sort */}
        <div className='flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between'>
          {/* Search with icon on right */}
          <div className='relative w-full sm:w-auto sm:min-w-[200px]'>
            <Input
              type='text'
              placeholder='Search bills'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='pr-10'
            />
            <Search
              className='absolute right-3 top-1/2 -translate-y-1/2 text-grey-500'
              size={16}
            />
          </div>

          <div className='flex items-center gap-2'>
            <span className='text-sm font-medium text-grey-900'>Sort by</span>
            <Select
              defaultValue='latest'
              onValueChange={(val) => setSortBy(val as SortOption)}
            >
              <SelectTrigger className='w-[120px]'>
                <SelectValue placeholder='Latest' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='latest'>Latest</SelectItem>
                <SelectItem value='oldest'>Oldest</SelectItem>
                <SelectItem value='az'>A to Z</SelectItem>
                <SelectItem value='za'>Z to A</SelectItem>
                <SelectItem value='highest'>Highest</SelectItem>
                <SelectItem value='lowest'>Lowest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table of bills */}
        <RecurringBillsTable bills={sortedBills} />
      </section>
    </div>
  )
}
