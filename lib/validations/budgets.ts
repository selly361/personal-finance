import { z } from 'zod'

export const budgetValidation = z.object({
  category_id: z
    .string()
    .uuid('Please select a valid category')
    .nonempty('Category is required'),

  max_spend: z
    .number()
    .min(100, 'Max spend must be atleast 100')
    .max(10_000_000, 'Max spend cannot exceed 10,000,000')
    .refine(
      (value) => Number.isFinite(value),
      'Max spend must be a valid number'
    ),

  theme_id: z
    .string()
    .uuid('Please select a valid theme color')
    .nonempty('Theme is required'),
})
