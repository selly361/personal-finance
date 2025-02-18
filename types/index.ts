import { budgetValidation, potValidation, transactionValidation } from '@/lib/validations'

import { z } from 'zod'

/* ------------------- Budget Type ------------------- */

export type Budget = z.infer<typeof budgetValidation>

/* ------------------- Pot Type ------------------- */

export type Pot = z.infer<typeof potValidation>

/* ------------------- Transaction Type ------------------- */

export type Transaction = z.infer<typeof transactionValidation>

/* ------------------- Theme Type ------------------- */

export type Theme = {
  id: string
  name: string
  color_code: string
  isUsed: boolean
}

/* ------------------- Category Type ------------------- */

export type Category = {
  id: string
  name: string
  isUsed: boolean
}
