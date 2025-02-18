'use client'

import { LargeLogo, MinimizeMenuIcon, SmallLogo } from '@/components/icons'

import Link from 'next/link'
import { NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

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
                  'flex items-center space-x-4 p-2 rounded-r-lg cursor-pointer pl-8 w-[90%] h-14 max-h-14 border-l-4 border-transparent box-border',
                  pathname === href ? 'active' : ''
                )}
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
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
        className='flex items-center space-x-4 p-2 pl-8 cursor-pointer h-14 max-h-14'
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <motion.div initial={false} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
          <MinimizeMenuIcon
            className={cn(
              'transition-transform ease-in-out duration-500',
              isMinimized ? 'transform rotate-180' : ''
            )}
          />
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
