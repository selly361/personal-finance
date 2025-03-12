'use client'

import { OptionsDropdown } from '@/components'
import { PotDetails } from '@/types'
import { motion } from 'framer-motion'

const PotCard = ({ id, name, theme, theme_id, target, total }: PotDetails) => {
  const progress = (total / target) * 100

  return (
    <div className='bg-white p-6 rounded-xl relative shadow-sm w-128'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-2'>
          <span className='h-3 w-3 rounded-full' style={{ background: theme }} />
          <h3 className='text-lg font-bold text-gray-900'>{name}</h3>
        </div>

        <OptionsDropdown
          type='Pot'
          title={name}
          id={id}
          pot={{ name, theme_id, target }}
        />
      </div>

      <div className='flex items-center gap-10 pl-4 mt-4'>
        <div className='flex flex-col items-center gap-2'>
          <div style={{ background: theme }} className='w-[47px] h-1 rounded-md'></div>
          <div
            style={{ borderColor: theme }}
            className='relative w-[68px] h-24 border-4  rounded-xl overflow-hidden flex flex-col justify-end items-center'
          >
            <motion.div
              className='absolute bottom-0 w-full mx-auto left-0 right-0 border-x-4'
              style={{ background: theme, borderColor: theme }}
              initial={{ height: 0 }}
              animate={{ height: `${progress}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </div>
        </div>

        <div className='flex flex-col w-full gap-4'>
          <div className='flex items-center justify-between w-full'>
            <p className='text-gray-500 text-sm'>Total Saved</p>
            <h2 className='text-xl font-bold text-gray-900'>£{total.toFixed(2)}</h2>
          </div>

          <div className='flex flex-col gap-3'>
            <div className='w-full bg-beige-100 rounded-full h-2 relative'>
              <motion.div
                className='h-2 rounded-full'
                style={{ background: theme }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </div>
            <div className='flex justify-between'>
              <span className='text-sm font-bold text-gray-700'>
                {progress.toFixed(2)}%
              </span>
              <span className='text-sm text-gray-500'>
                Target of £{target.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-5 flex gap-3'>
        <button className='w-full bg-beige-100 text-gray-900 py-2 rounded-lg font-bold h-button text-sm'>
          + Add Money
        </button>
        <button className='w-full bg-beige-100 text-gray-900 py-2 rounded-lg font-bold h-button text-sm'>
          Withdraw
        </button>
      </div>
    </div>
  )
}

export default PotCard
