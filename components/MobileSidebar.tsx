'use client'

import Link from 'next/link'
import { NAV_ITEMS } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <header className='hidden max-xl:flex fixed left-0 bottom-0 right-0 px-10 pt-2 w-screen h-max border-t-8 bg-grey-900 text-gray-300'>
      <nav className='flex-1'>
        <ul className='flex justify-between'>
          {NAV_ITEMS.map(({ name, icon: Icon, href }) => (
            <Link className='hover:bg-gray-800' key={name} href={href}>
              <li
                className={cn(
                  'flex flex-col justify-center items-center gap-1 p-2 rounded-t-lg cursor-pointer w-24 h-14 max-h-14 border-b-4 border-transparent box-border',
                  pathname === href ? 'active' : ''
                )}
              >
                <div>
                  <Icon />
                </div>
                <span className='text-xs whitespace-nowrap'>{name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  )
}
