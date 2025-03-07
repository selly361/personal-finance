'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'

interface ModalDialogProps {
  triggerLabel?: string
  title: string
  description?: string
  triggerButtonProps?: React.ComponentProps<typeof Button>
  className?: string
  children: React.ReactNode
  isOpen?: boolean
  setOpen?: (open: boolean) => void
}

export default function ModalDialog({
  triggerLabel,
  title,
  description,
  triggerButtonProps,
  className,
  children,
  isOpen,
  setOpen,
}: ModalDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {triggerLabel ? (
        <DialogTrigger asChild>
          <Button {...triggerButtonProps}>{triggerLabel}</Button>
        </DialogTrigger>
      ) : null}
      <DialogContent className={className || 'w-11/12'}>
        <DialogHeader className='mb-4'>
          <DialogTitle className='text-xl text-grey-900'>{title}</DialogTitle>
          {description && (
            <DialogDescription className='text-sm text-grey-500 mb-4'>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
