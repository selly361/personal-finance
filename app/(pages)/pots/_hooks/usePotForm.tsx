import { createPot, updatePot } from '@/actions'

import { Pot } from '@/types'
import { potValidation } from '@/lib/validations'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export const usePotForm = (
  pot?: Pot,
  pot_id?: string,
  onSuccess?: () => void
) => {
  const {
    register,
    setValue,
    watch,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Pot>({
    resolver: zodResolver(potValidation),
    mode: 'onSubmit',
    defaultValues: pot || { name: '', target: 0, theme_id: '' },
  })

  const onSubmit = async (values: Pot) => {
    const result = pot
      ? await updatePot(pot_id as string, values)
      : await createPot(values)

    if (result.error) {
      const error = result.error.toString()
      if (error.includes('name')) {
        setError('name', { type: 'server', message: error })
      } else if (error.includes('target')) {
        setError('target', { type: 'server', message: error })
      } else {
        setError('root', { type: 'server', message: error })
      }
      return false
    }

    onSuccess?.()
    return true
  }

  return {
    register,
    setValue,
    watch,
    errors,
    isSubmitting,
    handleSubmit,
    onSubmit,
    handleThemeChange: (themeId: string) => {
      setValue('theme_id', themeId)
      clearErrors('theme_id')
    },
  }
}
