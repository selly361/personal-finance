import {
  budgetValidation,
  potValidation,
  transactionValidation,
} from '@/lib/validations'

import { z } from 'zod'

/* ------------------- Budget Type ------------------- */

export type Budget = z.infer<typeof budgetValidation>

/* ------------------- Pot Type ------------------- */

export type Pot = z.infer<typeof potValidation>

/* ------------------- Budget Details Type ------------------- */

export type BudgetDetails = {
  id: string
  category: string
  theme: string
  max_spend: number
  total_spent: number | null
}

/* ------------------- Pot Details Type ------------------- */

export type PotDetails = {
  id: string
  name: string
  theme: string
  target: number
  total: number
}

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
