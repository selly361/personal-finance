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
  category_id: string
  theme_id: string
  category: string
  theme: string
  max_spend: number
  total_spent: number
}

/* ------------------- Pot Details Type ------------------- */

export type PotDetails = {
  id: string
  name: string
  theme_id: string
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
  color: string
  isUsed: boolean
}

/* ------------------- Category Type ------------------- */

export type Category = {
  id: string
  name: string
  isUsed: boolean
}

/* ------------------- RecipientSender Type ------------------- */

export type RecipientSender = {
  id: string
  name: string
  avatar: string
}

export type Summary = {
  expenses: number
  income: number
}

export type LatestExpense = {
  budget_id: string
  id: string
  amount: number
  category: string
  date: string
  recipient_sender_name: string
  avatar: string
}