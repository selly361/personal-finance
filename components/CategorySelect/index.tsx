'use client'

import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui'
import { getCategories, getCategoriesWithBudgetUsage } from '@/actions'

import { Category } from '@/types'

type Props = {
  withBudgetUsage?: boolean
  value: string
  onChange: (value: string) => void
  error?: string | undefined
}

export default function CategorySelect({
  withBudgetUsage = false,
  value,
  onChange,
  error,
}: Props) {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    async function fetchCategories() {
      const fetchedCategories = await (withBudgetUsage
        ? getCategoriesWithBudgetUsage()
        : getCategories())

      setCategories(fetchedCategories)
    }

    fetchCategories()
  }, [withBudgetUsage])

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={`w-full shadow-md ${error ? 'border-red-500' : ''}`}
      >
        <SelectValue placeholder='Select Category' />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category, index) => (
          <div key={category.id}>
            <SelectItem value={category.id} disabled={category.isUsed}>
              <div className='min-w-full flex items-center gap-2'>
                <span className='flex-1'>{category.name}</span>
              </div>
            </SelectItem>
            {index < categories.length - 1 && <SelectSeparator />}
          </div>
        ))}
      </SelectContent>
    </Select>
  )
}
