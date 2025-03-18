'use client'

import { Input, Progress } from '@/components/ui'

import { PotDetails } from '@/types'
import { SubmitButton } from '@/components'
import { potAmountValidation } from '@/lib/validations'
import { updatePotAmount } from '@/actions'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface PotAmountFormProps extends PotDetails {
  mode: 'add' | 'withdraw'
  onSuccess?: (updated: any) => void
}

export default function PotAmountForm({
  id,
  theme,
  mode,
  total,
  target,
  onSuccess,
}: PotAmountFormProps) {
  const maxAdd = Math.max(0, target - total)
  const max = mode === 'withdraw' ? total : maxAdd

  const schema = potAmountValidation(max)

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const typedAmount = watch('amount') || 0
  const newTotal = mode === 'withdraw' ? total - typedAmount : total + typedAmount

  const currentProgress = (total / target) * 100
  const newProgress = (newTotal / target) * 100
  const progressChange = newProgress - currentProgress

  async function onSubmit({ amount }: { amount: number }) {
    const res = await updatePotAmount(id, amount, mode)
    if (!res?.error) {
      onSuccess?.(res.data)
    }
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <span className='text-sm font-medium text-grey-700'>New Amount</span>
        <span className='text-2xl font-bold text-grey-900'>
          £{isNaN(newTotal) ? total.toFixed(2) : newTotal.toFixed(2)}
        </span>
      </div>

      <Progress
        theme={theme}
        currentProgress={currentProgress}
        progressChange={progressChange}
      />

      <div className='flex items-center justify-between text-sm'>
        <span
          className={
            progressChange > 0
              ? 'text-green-600'
              : progressChange < 0
                ? 'text-red-500'
                : 'text-grey-700'
          }
        >
          {newProgress.toFixed(2)}%
        </span>
        <span className='text-grey-500'>Target of £{target.toFixed(2)}</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        <label className='block text-sm font-medium text-grey-700'>
          Amount to {mode === 'withdraw' ? 'Withdraw' : 'Add'}
        </label>
        <div>
          <Input
            type='number'
            step='0.01'
            min={1}
            max={max}
            {...register('amount', { valueAsNumber: true })}
            withPoundPrefix
          />
          {errors.amount && (
            <p className='mt-1 text-xs text-red-500'>{errors.amount.message}</p>
          )}
        </div>

        <SubmitButton loading={isSubmitting} className='w-full'>
          {mode === 'withdraw' ? 'Confirm Withdrawal' : 'Confirm Addition'}
        </SubmitButton>
      </form>
    </div>
  )
}
