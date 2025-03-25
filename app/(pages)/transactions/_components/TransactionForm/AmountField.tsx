import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Input, Label } from '@/components/ui'

import { Transaction } from '@/types'

interface AmountFieldProps {
  register: UseFormRegister<Transaction>
  error?: string | undefined
  isRecurring: boolean
}

const AmountField = ({ register, error, isRecurring }: AmountFieldProps) => {
  return (
    <fieldset>
      <div className='label'>
        <Label className={error ? 'label-error' : ''}>Amount</Label>
        {(error || isRecurring) ? (
          <p className='error-text'>{error}</p>
        ) : (
          <p className='text-xs text-grey-500'>
            Negative values for expenses and positive for income
          </p>
        )}
      </div>
      <Input
        withPoundPrefix
        type='number'
        id='amount'
        {...register('amount', {
          setValueAs: (value) => (value === '' ? undefined : Number(value)),
        })}
        min={-1000000}
        max={1000000}
        className={`input w-full pl-6 ${error ? 'input-error' : ''}`}
        aria-invalid={error ? 'true' : 'false'}
      />
    </fieldset>
  )
}

export default AmountField
