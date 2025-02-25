'use client'

import { Budget } from '@/types'
import CategoryField from './CategoryField'
import MaxSpendField from './MaxSpendField'
import { SubmitButton } from '@/components'
import ThemeField from './ThemeField'
import { useBudgetForm } from '../../_hooks/useBudgetForm'

interface BudgetFormProps {
  onSuccess: () => void
  budget?: Budget
  budget_id?: string
}

const BudgetForm = ({ onSuccess, budget, budget_id }: BudgetFormProps) => {
  const {
    register,
    errors,
    isSubmitting,
    handleSubmit,
    onSubmit,
    handleCategoryChange,
    handleThemeChange,
    watch,
  } = useBudgetForm(budget, budget_id, onSuccess)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <CategoryField
        categoryId={watch().category_id}
        handleCategoryChange={handleCategoryChange}
        error={errors.category_id?.message}
      />
      <MaxSpendField register={register} error={errors.max_spend?.message} />
      <ThemeField
        themeId={watch().theme_id}
        handleThemeChange={handleThemeChange}
        error={errors.theme_id?.message}
      />
      <SubmitButton className='w-full min-h-12' loading={isSubmitting}>
        {budget ? 'Update Budget' : 'Add Budget'}
      </SubmitButton>
    </form>
  )
}

export default BudgetForm
