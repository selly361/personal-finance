import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Input, Label } from '@/components/ui'

import { Transaction } from '@/types'

interface AmountFieldProps {
  register: UseFormRegister<Transaction>
  errors: FieldErrors<Transaction>
}

const AmountField = ({ register, errors }: AmountFieldProps) => {
  return (
    <fieldset>
      <div className='label'>
        <Label>Amount</Label>
        {errors.amount && <p className='error-text'>{errors.amount.message}</p>}
      </div>
      <Input
        withPoundPrefix
        type='number'
        id='max_spend'
        {...register('amount', {
          setValueAs: (value) => (value === '' ? undefined : Number(value)),
        })}
        min={-1000000}
        max={1000000}
        className={`input w-full pl-6 ${errors.amount ? 'input-error' : ''}`}
        aria-invalid={errors.amount ? 'true' : 'false'}
      />
    </fieldset>
  )
}

export default AmountField
