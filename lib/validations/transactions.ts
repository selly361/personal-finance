import { z } from 'zod'

export const transactionValidation = z.object({
  recipient_sender_name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(20, 'Name must be less than 20 characters')
    .regex(
      /^[\w\s\-]+$/,
      'Name must only contain alphanumeric characters, spaces, and hyphens'
    ),
  category_id: z.string().uuid('Required'),
  avatar: z
    .string()
    .trim()
    .min(1, 'An avatar is required')
    .url('Avatar must be a valid URL'),
  date: z
    .date()
    .refine((date) => !isNaN(date.getTime()), 'Date must be a valid date')
    .refine(
      (date) =>
        date.toISOString().split('T')[0] >= new Date().toISOString().split('T')[0],
      'Date cannot be in the past'
    ),

  amount: z
    .number()
    .min(-1_000_000, 'Amount must be greater than -1,000,000')
    .max(1_000_000, 'Amount must be less than 1,000,000')
    .refine((value) => Number.isInteger(value) || Number(value) === value, {
      message: 'Amount must be a valid integer or a valid decimal',
    }),
  recurring: z.boolean(),
})
