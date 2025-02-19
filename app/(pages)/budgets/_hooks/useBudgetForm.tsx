import { createBudget, updateBudget } from '@/actions'

import { Budget } from '@/types'
import { budgetValidation } from '@/lib/validations'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export const useBudgetForm = (
  budget?: Budget,
  budget_id?: string,
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
  } = useForm<Budget>({
    resolver: zodResolver(budgetValidation),
    mode: 'onSubmit',
    defaultValues: budget || { category_id: '', max_spend: 0, theme_id: '' },
  })

  const onSubmit = async (values: Budget) => {
    const result = budget
      ? await updateBudget(budget_id as string, values)
      : await createBudget(values)

    if (result.error) {
      const error = result.error.toString()
      if (error.includes('category_id')) {
        setError('category_id', { type: 'server', message: error })
      } else if (error.includes('max_spend')) {
        setError('max_spend', { type: 'server', message: error })
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
    handleCategoryChange: (categId: string) => {
      setValue('category_id', categId)
      clearErrors('category_id')
    },
    handleThemeChange: (themeId: string) => {
      setValue('theme_id', themeId)
      clearErrors('theme_id')
    },
  }
}
