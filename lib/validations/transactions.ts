import { z } from "zod"

export const transactionValidation = z
  .object({
    recipient_sender_name: z
      .string()
      .trim()
      .min(1, "Please select a recipient")
      .max(40),
    avatar: z
      .string()
      .trim()
      .min(1, "Please select a recipient")
      .url("Avatar must be a valid URL"),
    category_id: z
      .string()
      .uuid("Please select a valid category or theme")
      .min(1, "Category or theme is required"),
    date: z
      .date()
      .refine((date) => !isNaN(date.getTime()), "Date must be a valid date")
      .refine(
        (date) =>
          date.toISOString().split("T")[0] >= new Date().toISOString().split("T")[0],
        "Date cannot be in the past"
      )
      .refine(
        (date) => date.toISOString().split("T")[0] !== "",
        "Date is required"
      ),
    amount: z
      .number({ invalid_type_error: "Amount must be a number" })
      .refine((val) => val !== undefined && val !== null, "Amount is required"),
    recurring: z
      .boolean()
      .refine((val) => val !== undefined, "Recurring is required"),
  })
  .superRefine((data, ctx) => {
    if (data.recurring && data.amount <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["amount"],
        message: "Recurring bills must have a positive amount",
      })
    }
    if (!data.recurring && data.amount === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["amount"],
        message: "Amount cannot be zero",
      })
    }
  })
