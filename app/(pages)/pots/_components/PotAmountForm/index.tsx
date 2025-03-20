'use client'

import { Controller, useForm } from 'react-hook-form'
import { Input, Label, Progress } from '@/components/ui'

import { PotDetails } from '@/types'
import { SubmitButton } from '@/components'
import { potAmountValidation } from '@/lib/validations'
import { updatePotAmount } from '@/actions'
import { zodResolver } from '@hookform/resolvers/zod'

interface PotAmountFormProps extends PotDetails {
  mode: 'add' | 'withdraw'
  onSuccess?: (updated: any) => void
}

interface FormValues {
  amount: number | ''
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
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { amount: '' },
  })

  const typedAmount = watch('amount') || 0
  const newTotal =
    mode === 'withdraw' ? total - (typedAmount || 0) : total + (typedAmount || 0)
  const currentProgress = (total / target) * 100
  const newProgress = (newTotal / target) * 100
  const progressChange = newProgress - currentProgress

  async function onSubmitHandler({ amount }: FormValues) {
    if (amount === '') return
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

      <form onSubmit={handleSubmit(onSubmitHandler)} className='space-y-3'>
        <div className='label'>
          <Label className={errors.amount ? 'label-error' : ''}>
            Amount to {mode === 'withdraw' ? 'Withdraw' : 'Add'}
          </Label>
          {errors.amount && <p className='error-text'>{errors.amount.message}</p>}
        </div>

        <Controller
          name='amount'
          control={control}
          render={({ field: { onChange, value, ref } }) => (
            <Input
              type='number'
              step='0.01'
              min={1}
              max={max}
              value={value === '' ? '' : value}
              onChange={(e) => {
                const raw = e.target.value
                if (raw === '') {
                  onChange('')
                  clearErrors('amount')
                  return
                }
                const num = parseFloat(raw)
                if (Number.isNaN(num)) {
                  onChange('')
                  setError('amount', {
                    type: 'manual',
                    message: 'Please enter a valid number',
                  })
                  return
                }
                if (num < 1) {
                  setError('amount', {
                    type: 'manual',
                    message: 'Amount must be at least £1',
                  })
                  return
                }
                if (num > max) {
                  setError('amount', {
                    type: 'manual',
                    message: `Amount cannot exceed £${max}`,
                  })
                  return
                }
                clearErrors('amount')
                onChange(num)
              }}
              ref={ref}
              withPoundPrefix
              className={`input w-full pl-6 ${errors.amount ? 'input-error' : ''}`}
            />
          )}
        />

        <SubmitButton loading={isSubmitting} className='w-full h-[53px]'>
          {mode === 'withdraw' ? 'Confirm Withdrawal' : 'Confirm Addition'}
        </SubmitButton>
      </form>
    </div>
  )
}
