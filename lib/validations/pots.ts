import { z } from 'zod'

export const potValidation = z.object({
  name: z
    .string()
    .trim()
    .min(3, 'Pot name must be at least 3 characters long.')
    .max(30, 'Pot name cannot exceed 30 characters.')
    .nonempty('Pot name is required.'),

  target: z
    .number()
    .min(100, 'Target amount must be at least 100.')
    .max(1_000_000_000, 'Target amount is too large. Please enter a smaller amount.')
    .refine((val) => Number.isFinite(val), {
      message: 'Please enter a valid number.',
    }),

  theme_id: z.string().uuid('Please select a valid theme color.'),
})


export const potAmountValidation = (max: number) =>
  z.object({
    amount: z
      .number({ invalid_type_error: "Amount must be a number" })
      .min(1, "Amount must be greater than 0")
      .max(max, `Amount cannot exceed £${max}`)
      .refine((value) => value !== undefined && value !== null, "Amount is required"),
  })

