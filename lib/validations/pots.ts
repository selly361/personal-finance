import { z } from 'zod'

export const potValidation = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Pot name must be at least 3 characters')
    .max(30, 'Pot name must be less than 30 characters'),
  target: z
    .number()
    .min(0, 'Target amount must be a positive number')
    .max(1_000_000_000, 'Target amount is too large')
    .refine((val) => Number.isFinite(val), { message: 'Invalid number' }),
  theme_id: z.string().uuid(),
})