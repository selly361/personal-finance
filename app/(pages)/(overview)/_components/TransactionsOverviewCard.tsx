"use client"

import { ArrowRightIcon } from "@/components/icons"
import Link from "next/link"
import { cn } from "@/lib/utils"
import millify from "millify"

interface TransactionItem {
  id: string
  recipient_sender_name: string
  avatar: string
  amount: number
  date: string
}

interface TransactionsOverviewCardProps {
  transactions: TransactionItem[]
}

export default function TransactionsOverviewCard({
  transactions,
}: TransactionsOverviewCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h5 className="text-md font-bold text-grey-900">Transactions</h5>
        <Link
          href="/transactions"
          className="text-sm text-grey-500 hover:underline flex items-center gap-1"
        >
          View All
          <ArrowRightIcon />
        </Link>
      </div>
      {!transactions.length ? (
        <p className="text-sm text-grey-500 mt-2 text-center">No transactions found.</p>
      ) : (
        <div className="flex flex-col">
          {transactions.map((tx, idx) => {
            const dateStr = new Date(tx.date).toLocaleDateString("en-UK", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
            const isExpense = tx.amount < 0
            const displayAmount = isExpense
              ? `-£${millify(Math.abs(tx.amount), { precision: 3 })}`
              : `+£${millify(tx.amount, { precision: 3 })}`
            return (
              <div
                key={tx.id}
                className={cn(
                  "flex items-center justify-between py-3",
                  idx < transactions.length - 1 && "border-b border-beige-100"
                )}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={tx.avatar}
                    alt={tx.recipient_sender_name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className="text-sm text-grey-900 font-bold">
                    {tx.recipient_sender_name}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span
                    className={cn(
                      "text-sm font-bold",
                      isExpense ? "text-red-500" : "text-green"
                    )}
                  >
                    {displayAmount}
                  </span>
                  <span className="text-xs text-grey-500">{dateStr}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
