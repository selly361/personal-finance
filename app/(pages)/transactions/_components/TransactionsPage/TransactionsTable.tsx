"use client"

import { Trash } from "lucide-react"
import { deleteTransaction } from "@/actions"

interface TransactionsTableProps {
  transactions: {
    id: string
    recipient_sender_name: string
    avatar: string
    category_id: string
    category_name: string
    amount: number
    date: string
    created_at: string | null
  }[]
  onDeleteSuccess?: (deletedId: string) => void
}

export default function TransactionsTable({
  transactions,
  onDeleteSuccess,
}: TransactionsTableProps) {
  if (!transactions.length) {
    return <p className="text-sm text-grey-500 mt-4 text-center">No transactions found.</p>
  }

  async function handleDelete(id: string) {
    const res = await deleteTransaction(id)
    if (!res?.error && onDeleteSuccess) {
      onDeleteSuccess(id)
    }
  }

  return (
    <div className="overflow-x-auto rounded-md bg-white h-full">
      <table className="w-full border-collapse text-sm">
        <thead className="text-xs text-grey-500">
          <tr>
            <th className="py-3 px-4 text-left">Recipient / Sender</th>
            <th className="py-3 px-4 text-left">Category</th>
            <th className="py-3 px-4 text-left">Transaction Date</th>
            <th className="py-3 px-4 text-right">Amount</th>
            <th className="py-3 px-4 text-right"></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => {
            const dateStr = new Date(tx.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })

            const isExpense = tx.amount < 0
            const amountClass = isExpense ? "text-red-500" : "text-green"

            return (
              <tr key={tx.id} className="border-b last:border-none">
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <img
                      src={tx.avatar}
                      alt={tx.recipient_sender_name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span>{tx.recipient_sender_name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-grey-700">
                  {tx.category_name || "General"}
                </td>
                <td className="py-3 px-4 text-grey-700">{dateStr}</td>
                <td className={`py-3 px-4 text-right font-medium ${amountClass}`}>
                  {isExpense
                    ? `-£${Math.abs(tx.amount).toFixed(2)}`
                    : `+£${tx.amount.toFixed(2)}`}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleDelete(tx.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash className="inline-block h-4 w-4" />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
