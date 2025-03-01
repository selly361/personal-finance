import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Input, Label } from '@/components/ui'

import { Transaction } from '@/types'

interface AmountFieldProps {
  register: UseFormRegister<Transaction>
  error?: string | undefined
}

const AmountField = ({ register, error }: AmountFieldProps) => {
  return (
    <fieldset>
      <div className='label'>
        <Label className={error ? 'label-error' : ''}>Amount</Label>
        {error && <p className='error-text'>{error}</p>}
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
        className={`input w-full pl-6 ${error ? 'input-error' : ''}`}
        aria-invalid={error ? 'true' : 'false'}
      />
    </fieldset>
  )
}

export default AmountField
