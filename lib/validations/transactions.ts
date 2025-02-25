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

  category_id: z
    .string()
    .uuid('Please select a valid category or theme')
    .min(1, 'Category or theme is required'),

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
        date.toISOString().split('T')[0] >=
        new Date().toISOString().split('T')[0],
      'Date cannot be in the past'
    )
    .refine(
      (date) => date.toISOString().split('T')[0] !== '',
      'Date is required'
    ),

  amount: z
    .number()
    .min(100, 'Amount must be at least 100')
    .max(1_000_000, 'Amount must be less than 1,000,000')
    .refine((value) => Number.isInteger(value) || Number(value) === value, {
      message: 'Amount must be a valid integer or a valid decimal',
    })
    .refine(
      (value) => value !== undefined && value !== null,
      'Amount is required'
    ),

  recurring: z
    .boolean()
    .refine((value) => value !== undefined, 'Recurring is required'),
})
