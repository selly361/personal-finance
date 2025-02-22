import * as React from 'react'

import { cn } from '@/lib/utils/cn'

interface InputProps extends React.ComponentProps<'input'> {
  withDollarPrefix?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, withDollarPrefix, ...props }, ref) => {
    const inputElement = (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-beige-500 bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          withDollarPrefix ? 'pl-6' : '',
          className
        )}
        ref={ref}
        {...props}
      />
    )

    if (withDollarPrefix) {
      return (
        <div className='relative'>
          <span className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'>
            $
          </span>
          {inputElement}
        </div>
      )
    }

    return inputElement
  }
)

Input.displayName = 'Input'

export { Input }
