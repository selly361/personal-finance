'use client'

import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useMemo, useState } from 'react'

import { Search } from 'lucide-react'
import { TransactionsOverview } from '@/types'
import TransactionsTable from './TransactionsTable'

type SortOption = 'latest' | 'oldest' | 'az' | 'za' | 'highest' | 'lowest'
type CategoryFilter = 'all' | string

interface TransactionsPageProps {
  transactions: TransactionsOverview['transactions']
  categories: TransactionsOverview['categories']
}

export default function TransactionsPage({
  transactions,
  categories,
}: TransactionsPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('latest')
  const [catFilter, setCatFilter] = useState<CategoryFilter>('all')

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredByCategory = useMemo(() => {
    if (catFilter === 'all') return transactions
    return transactions.filter((tx) => tx.category_id === catFilter)
  }, [transactions, catFilter])

  const filteredBySearch = useMemo(() => {
    return filteredByCategory.filter((tx) =>
      tx.recipient_sender_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [filteredByCategory, searchTerm])

  const sortedTx = useMemo(() => {
    const txCopy = [...filteredBySearch]
    txCopy.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()

      switch (sortBy) {
        case 'latest':
          return dateB - dateA
        case 'oldest':
          return dateA - dateB
        case 'az':
          return a.recipient_sender_name.localeCompare(b.recipient_sender_name)
        case 'za':
          return b.recipient_sender_name.localeCompare(a.recipient_sender_name)
        case 'highest':
          return b.amount - a.amount
        case 'lowest':
          return a.amount - b.amount
        default:
          return 0
      }
    })
    return txCopy
  }, [filteredBySearch, sortBy])

  const totalItems = sortedTx.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedTx = sortedTx.slice(startIndex, endIndex)
  const pages = Array.from({ length: totalPages || 1 }, (_, i) => i + 1)

  function handlePageChange(page: number) {
    setCurrentPage(page)
  }

  return (
    <div className='space-y-4 bg-white p-6 h-full rounded-xl flex flex-col justify-between'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
        <div className='relative w-full md:w-1/3'>
          <Input
            placeholder='Search transaction'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pr-10'
          />
          <Search
            className='absolute right-3 top-1/2 -translate-y-1/2 text-grey-500'
            size={16}
          />
        </div>

        <div className='flex gap-2'>
          <div className='flex items-center gap-2'>
            <span className='text-sm font-medium'>Sort by</span>
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

          <div className='flex items-center gap-2'>
            <span className='text-sm font-medium'>Select Category</span>
            <Select defaultValue='all' onValueChange={(val) => setCatFilter(val)}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='All Transactions' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Transactions</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Table */}
      <TransactionsTable
        transactions={paginatedTx}
        onDeleteSuccess={(deletedId) => {
          // Optionally update local state or re-fetch transactions
        }}
      />

        <Pagination className='mt-4 relative'>
          <PaginationContent>
            <PaginationItem className='absolute left-0'>
              <PaginationPrevious
                disabled={currentPage <= 1}
                onClick={() => {
                  if (currentPage > 1) handlePageChange(currentPage - 1)
                }}
                href='#'
              />
            </PaginationItem>

            {pages.map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={p === currentPage}
                  disabled={totalPages < 1}
                  onClick={() => handlePageChange(p)}
                  href='#'
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem className='absolute right-0'>
              <PaginationNext
                disabled={currentPage >= totalPages}
                onClick={() => {
                  if (currentPage < totalPages) handlePageChange(currentPage + 1)
                }}
                href='#'
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
    </div>
  )
}
