'use client'

import { ArrowRightIcon, PotIcon } from '@/components/icons'

import Link from 'next/link'
import { PotDetails } from '@/types'
import { formatNumber } from '@/lib/utils'

interface PotsOverviewCardProps {
  pots: PotDetails[]
}

export default function PotsOverviewCard({ pots }: PotsOverviewCardProps) {
  const totalSaved = formatNumber(pots.reduce((sum, pot) => sum + pot.total, 0))

  return (
    <div className='h-max bg-white rounded-xl p-6 shadow flex flex-col gap-6 w-full'>
      <div className='flex items-center justify-between'>
        <h5 className='text-md font-bold text-grey-900'>Pots</h5>
        <Link
          href='/pots'
          className='text-sm text-grey-500 hover:underline flex items-center gap-1'
        >
          See Details
          <ArrowRightIcon />
        </Link>
      </div>

      <div className='flex flex-col gap-6 w-max max-xl:w-full'>
        <div className='bg-beige-100 rounded-lg p-4 flex flex-col items-start justify-center gap-2 pr-12'>
          <div className='flex items-center gap-3'>
            <PotIcon />
            <div className='flex flex-col'>
              <span className='text-sm text-grey-500'>Total Saved</span>
              <span className='text-2xl font-bold text-grey-900'>£{totalSaved}</span>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-x-6 gap-y-3'>
          {pots.slice(0, 4).map((pot) => (
            <div key={pot.id} className='flex items-center gap-2'>
              <span
                className='inline-block w-1 h-full rounded-sm'
                style={{ backgroundColor: pot.theme }}
              />
              <div className='flex-col gap-1'>
                <p className='text-sm text-grey-700 line-clamp-1'>{pot.name}</p>
                <p className='text-sm font-bold text-grey-900'>
                  £{formatNumber(pot.total)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
