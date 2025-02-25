import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Input, Label } from '@/components/ui'
import { Pot } from '@/types'
import { useState } from 'react'

interface NameFieldProps {
  register: UseFormRegister<Pot>
  error: string | undefined
}

const NameField = ({ register, error }: NameFieldProps) => {
  const [remainingChars, setRemainingChars] = useState(30)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setRemainingChars(30 - value.trim().length)
  }

  return (
    <fieldset>
      <div className='label'>
        <Label className={error ? 'label-error' : ''}>Name</Label>
        {error && <p className='error-text'>{error}</p>}
      </div>
      <div className='flex flex-col gap-1'>
        <Input
          {...register('name')}
          className={`input w-full pl-6 ${error ? 'input-error' : ''}`}
          aria-invalid={error ? 'true' : 'false'}
          maxLength={30}
          onChange={handleChange}
        />
        <p className='text-right text-grey-500 text-xs'>
          {remainingChars} characters left
        </p>
      </div>
    </fieldset>
  )
}

export default NameField
