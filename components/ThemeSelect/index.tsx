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
import { getThemesWithBudgetUsage, getThemesWithPotUsage } from '@/actions'

import { Theme } from '@/types'

type Props = {
  type: 'budgets' | 'pots'
  value: string
  onChange: (value: string) => void
}

export default function ThemeSelect({ type, value, onChange }: Props) {
  const [themes, setThemes] = useState<Theme[]>([])

  useEffect(() => {
    async function fetchThemes() {
      const fetchedThemes = await (type === 'budgets'
        ? getThemesWithBudgetUsage()
        : getThemesWithPotUsage())
      setThemes(fetchedThemes)
    }

    fetchThemes()
  }, [type])

  return (
    <Select>
      <SelectTrigger className='w-96'>
        <SelectValue placeholder='Select theme' />
      </SelectTrigger>
      <SelectContent>
        {themes.map((theme, index) => (
          <div key={theme.id}>
            <SelectItem value={theme.id} disabled={theme.isUsed}>
              <div className='min-w-full flex items-center gap-2'>
                <span
                  className='h-4 w-4 rounded-full'
                  style={{ backgroundColor: theme.color_code }}
                />
                <span className='flex-1'>{theme.name}</span>
                {theme.isUsed && (
                  <span className='text-sm text-gray-500 absolute right-2'>
                    Already Used
                  </span>
                )}
              </div>
            </SelectItem>
            {index < themes.length - 1 && <SelectSeparator />}
          </div>
        ))}
      </SelectContent>
    </Select>
  )
}
