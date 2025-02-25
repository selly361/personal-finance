import { UseFormRegister } from 'react-hook-form'
import { Input, Label } from '@/components/ui'

import { Budget } from '@/types'

interface MaxSpendFieldProps {
  register: UseFormRegister<Budget>
  error: string | undefined
}

const MaxSpendField = ({ register, error }: MaxSpendFieldProps) => {
  return (
    <fieldset>
      <div className='label'>
        <Label className={error ? 'label-error' : ''}>Maximum Spend</Label>
        {error && <p className='error-text'>{error}</p>}
      </div>
      <Input
        withPoundPrefix
        type='number'
        id='max_spend'
        {...register('max_spend', {
          setValueAs: (value) => (value === '' ? undefined : Number(value)),
        })}
        min={0}
        className={`input w-full pl-6 ${error ? 'input-error' : ''}`}
        aria-invalid={error ? 'true' : 'false'}
      />
    </fieldset>
  )
}

export default MaxSpendField
