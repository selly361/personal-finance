import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Input, Label } from '@/components/ui'

import { Pot } from '@/types'

interface TargetFieldProps {
  register: UseFormRegister<Pot>
  error: string | undefined
}

const TargetField = ({ register, error }: TargetFieldProps) => {

  return (
    <fieldset>
      <div className='label'>
        <Label className={error ? 'label-error' : ''}>Target</Label>
        {error && <p className='error-text'>{error}</p>}
      </div>
      <Input
        withPoundPrefix
        type='number'
        id='target'
        {...register('target', {
          setValueAs: (value) => (value === '' ? undefined : Number(value)),
        })}
        min={0}
        className={`input w-full pl-6 ${error ? 'input-error' : ''}`}
        aria-invalid={error ? 'true' : 'false'}
      />
    </fieldset>
  )
}

export default TargetField
