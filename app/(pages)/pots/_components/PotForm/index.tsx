'use client'

import { Pot } from '@/types'
import TargetField from './TargetField'
import { SubmitButton } from '@/components'
import ThemeField from './ThemeField'
import { usePotForm } from '../../_hooks/usePotForm'
import NameField from './NameField'

interface PotFormProps {
  onSuccess: () => void
  pot?: Pot
  pot_id?: string
}

const PotForm = ({ onSuccess, pot, pot_id }: PotFormProps) => {
  const {
    register,
    errors,
    isSubmitting,
    handleSubmit,
    onSubmit,
    handleThemeChange,
    watch,
  } = usePotForm(pot, pot_id, onSuccess)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <NameField error={errors.name?.message} register={register} />
      <TargetField register={register} error={errors.target?.message} />
      <ThemeField
        themeId={watch().theme_id}
        handleThemeChange={handleThemeChange}
        error={errors.theme_id?.message}
      />
      <SubmitButton className='w-full min-h-12' loading={isSubmitting}>
        {pot ? 'Update Pot' : 'Add Pot'}
      </SubmitButton>
    </form>
  )
}

export default PotForm
