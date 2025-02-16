import { z } from 'zod'

export const budgetValidation = z.object({
  category_id: z.string().uuid(),
  max_spend: z
    .number()
    .min(0.01, 'Max spend must be greater than 0')
    .max(10_000_000, 'Max spend cannot exceed 10,000,000')
    .refine((value) => Number.isFinite(value), 'Max spend must be a finite number'),
  theme_id: z.string().uuid(),
})
