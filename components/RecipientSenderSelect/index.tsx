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
import { getRecipientsSenders } from '@/actions'
import Image from 'next/image'
import { RecipientSender } from '@/types'

type Props = {
  value: { name: string; avatar: string }
  onChange: (value: { name: string; avatar: string }) => void
}

export default function RecipientSenderSelect({ value, onChange }: Props) {
  const [recipientsSenders, setRecipientsSenders] = useState<RecipientSender[]>(
    []
  )

  useEffect(() => {
    ;(async () => {
      const data = await getRecipientsSenders()

      setRecipientsSenders(data)
    })()
  }, [])

  return (
    <Select
      value={JSON.stringify(value)}
      onValueChange={(value) => onChange(JSON.parse(value))}
    >
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Select Recipient / Sender'>
          {value.name ? (
            <div className='flex items-center gap-2'>
              <Image
                height={24}
                width={24}
                src={value.avatar}
                alt={value.name}
                priority
                className='rounded-full'
              />
              <span>{value.name}</span>
            </div>
          ) : (
            'Select Recipient / Sender'
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {recipientsSenders.map((recipientSender) => (
          <div key={recipientSender.id}>
            <SelectItem value={JSON.stringify(recipientSender)}>
              <div className='min-w-full flex items-center gap-2'>
                <Image
                  height={24}
                  width={24}
                  src={recipientSender.avatar_url}
                  alt={recipientSender.name}
                  priority
                  className='rounded-full'
                />
                <span className='flex-1'>{recipientSender.name}</span>
              </div>
            </SelectItem>
            <SelectSeparator />
          </div>
        ))}
      </SelectContent>
    </Select>
  )
}
