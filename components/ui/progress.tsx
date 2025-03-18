'use client'

import * as ProgressPrimitive from '@radix-ui/react-progress'
import * as React from 'react'

import { cn } from '@/lib/utils'

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  currentProgress: number
  progressChange?: number
  theme: string
}

const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      currentProgress = 0,
      progressChange = 0,
      theme = '#22c55e',
      ...props
    },
    ref
  ) => {
    const isIncrease = progressChange > 0
    const isDecrease = progressChange < 0

    const increasePercent = isIncrease ? progressChange : 0
    const decreasePercent = isDecrease ? Math.abs(progressChange) : 0
    const baseProgress = isDecrease ? currentProgress - decreasePercent : currentProgress

    return (
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          'relative h-2 w-full overflow-hidden rounded-full bg-beige-100',
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className='h-full flex-1 transition-all rounded-l-full border-r-2 border-white bg-primary'
          style={{ width: `${baseProgress}%` }}
        />

        {isIncrease && (
          <ProgressPrimitive.Indicator
            className='absolute top-0 h-full transition-all rounded-r-full'
            style={{
              width: `${increasePercent}%`,
              left: `${baseProgress}%`,
              backgroundColor: theme,
            }}
          />
        )}

        {isDecrease && (
          <ProgressPrimitive.Indicator
            className='absolute top-0 h-full transition-all rounded-r-full bg-red-500 z-10'
            style={{ width: `${decreasePercent}%`, left: `${baseProgress}%` }}
          />
        )}
      </ProgressPrimitive.Root>
    )
  }
)

Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
