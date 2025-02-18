'use client'

import { createBudget } from '@/actions'
import { CategorySelect, SubmitButton, ThemeSelect } from '@/components'
import { Input, Label } from '@/components/ui'
import { budgetValidation } from '@/lib/validations'
import { Budget } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

interface NewBudgetFormProps {
  onSuccess: () => void
}

function NewBudgetForm({ onSuccess }: NewBudgetFormProps) {
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
    defaultValues: { category_id: '', max_spend: 0, theme_id: '' },
  })

  const onSubmit = async (values: Budget) => {
    const result = await createBudget(values)
    const error = result.error?.toString()

    if (error?.includes('category_id')) {
      setError('category_id', { type: 'server', message: error })
    } else if (error?.includes('max_spend')) {
      setError('max_spend', { type: 'server', message: error })
    } else if (error) {
      setError('root', { type: 'server', message: error })
    } else {
      onSuccess()
    }
  }


  const handleCategoryChange = (categId: string) => {
    setValue('category_id', categId)
    clearErrors('category_id')
  }


  const handleThemeChange = (themeId: string) => {
    setValue('theme_id', themeId)
    clearErrors('theme_id') 
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <fieldset>
        <div className='label'>
          <Label className={errors.category_id ? 'label-error' : ''}>
            Budget Category
          </Label>
          {errors.category_id && (
            <p className='error-text'>{errors.category_id.message}</p>
          )}
        </div>
        <CategorySelect
          onChange={handleCategoryChange} 
          value={watch().category_id}
          withBudgetUsage={true}
        />
      </fieldset>

      <fieldset>
        <div className='label'>
          <Label>Maximum Spend</Label>
          {errors.max_spend && (
            <p className='error-text'>{errors.max_spend.message}</p>
          )}
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

      <fieldset>
        <div className='label'>
          <Label className={errors.theme_id ? 'label-error' : ''}>Theme</Label>
          {errors.theme_id && (
            <p className='error-text'>{errors.theme_id.message}</p>
          )}
        </div>
        <ThemeSelect
          onChange={handleThemeChange}
          value={watch().theme_id}
          type='budgets'
        />
      </fieldset>
      <SubmitButton className='w-full min-h-12' loading={isSubmitting}>
        Add Budget
      </SubmitButton>
    </form>
  )
}

export default NewBudgetForm
