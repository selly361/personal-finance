'use client'

import { Button } from '@/components/ui/button'
import { type ComponentProps } from 'react'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils' // Ensure you have this utility for conditional class merging

type Props = ComponentProps<typeof Button> & {
  pendingText?: string
}

function SubmitButton({
  children,
  pendingText = 'Submitting...',
  className,
  ...props
}: Props) {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      aria-disabled={pending}
      className={cn(className, pending ? 'hover:bg-grey-900' : '')}
      {...props}
    >
      {pending ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' /> {pendingText}
        </>
      ) : (
        children
      )}
    </Button>
  )
}

export default SubmitButton
