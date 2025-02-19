import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Input, Label } from '@/components/ui'

import { Budget } from '@/types'

interface MaxSpendFieldProps {
  register: UseFormRegister<Budget>
  errors: FieldErrors<Budget>
}

const MaxSpendField = ({ register, errors }: MaxSpendFieldProps) => {
  return (
    <fieldset>
      <div className='label'>
        <Label>Maximum Spend</Label>
        {errors.max_spend && <p className='error-text'>{errors.max_spend.message}</p>}
      </div>
      <div className='relative'>
        <span className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'>
          $
        </span>
        <Input
          type='number'
          id='max_spend'
          {...register('max_spend', {
            setValueAs: (value) => (value === '' ? undefined : Number(value)),
          })}
          min={0}
          className={`input w-full pl-6 ${errors.max_spend ? 'input-error' : ''}`}
          aria-invalid={errors.max_spend ? 'true' : 'false'}
        />
      </div>
    </fieldset>
  )
}

export default MaxSpendField
