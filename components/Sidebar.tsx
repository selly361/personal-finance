'use client'

import {
  BudgetNavIcon,
  LargeLogo,
  MinimizeMenuIcon,
  OverviewNavIcon,
  PotsNavIcon,
  RecurringBillsNavIcon,
  SmallLogo,
  TransactionsNavIcon,
} from '@/components/icons'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_ITEMS = [
  { name: 'Overview', icon: OverviewNavIcon, href: '/' },
  { name: 'Transactions', icon: TransactionsNavIcon, href: '/transactions' },
  { name: 'Budgets', icon: BudgetNavIcon, href: '/budgets' },
  { name: 'Pots', icon: PotsNavIcon, href: '/pots' },
  {
    name: 'Recurring Bills',
    icon: RecurringBillsNavIcon,
    href: '/recurring-bills',
  },
]

export default function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false)
  const pathname = usePathname()

  return (
    <motion.aside
      className='h-screen bg-grey-900 text-gray-300 pt-10 flex flex-col w-64 space-y-6 overflow-hidden pb-20 rounded-r-lg'
      animate={{ width: isMinimized ? 80 : 256 }}
    >
      <div className='flex items-center space-x-2 pl-8'>
        {isMinimized ? <SmallLogo /> : <LargeLogo />}
      </div>
      <nav className='flex-1'>
        <ul className='space-y-4'>
          {NAV_ITEMS.map(({ name, icon: Icon, href }) => (
            <Link className='hover:bg-gray-800' key={name} href={href}>
              <motion.li
                className={cn(
                  'flex items-center space-x-4 p-2 rounded-r-lg cursor-pointer pl-8 w-[90%] h-14 max-h-14',
                  pathname === href ? 'active' : ''
                )}
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className='min-w-6 min-h-6'
                  initial={false}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon />
                </motion.div>
                <motion.span
                  className='text-sm whitespace-nowrap'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isMinimized ? 0 : 1 }}
                  transition={{ duration: 0.2, delay: isMinimized ? 0 : 0.1 }}
                >
                  {name}
                </motion.span>
              </motion.li>
            </Link>
          ))}
        </ul>
      </nav>
      <button
        className='flex items-center space-x-4 p-2 pl-8 hover:bg-gray-800 rounded-lg cursor-pointer h-14 max-h-14'
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <motion.div
          className='w-6 h-6'
          initial={false}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <MinimizeMenuIcon />
        </motion.div>
        <motion.span
          className='text-sm whitespace-nowrap'
          initial={{ opacity: 0 }}
          animate={{ opacity: isMinimized ? 0 : 1 }}
          transition={{ duration: 0.2, delay: isMinimized ? 0 : 0.1 }}
        >
          Minimize Menu
        </motion.span>
      </button>
    </motion.aside>
  )
}
