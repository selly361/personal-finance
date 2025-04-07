"use client"

import { ArrowRightIcon } from "@/components/icons"
import { BudgetDetails } from "@/types"
import { BudgetPieChart } from "@/components"
import Link from "next/link"
import millify from "millify"

interface BudgetsOverviewCardProps {
  budgets: BudgetDetails[]
}

export default function BudgetsOverviewCard({ budgets }: BudgetsOverviewCardProps) {
  return (
    <div className="w-full bg-white rounded-xl p-6 shadow flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h5 className="text-md font-bold text-grey-900">Budgets</h5>
        <Link
          href="/budgets"
          className="text-sm text-grey-500 hover:underline flex items-center gap-1"
        >
          See Details
          <ArrowRightIcon />
        </Link>
      </div>
      <div className="w-max flex flex-col items-center md:flex-row md:items-center gap-2">
        <BudgetPieChart budgets={budgets} />
        <div className="md:w-max flex flex-col gap-4">
          {budgets.map((budget) => (
            <div key={budget.id} className="w-max h-12 flex items-center gap-3">
              <div
                className="w-1.5 h-full rounded-sm"
                style={{ backgroundColor: budget.theme }}
              />
              <div className="flex flex-col gap-1 items-start">
                <p className="text-sm text-grey-900">{budget.category}</p>
                <p className="text-sm font-bold text-grey-900">
                  ${millify(budget.max_spend, { precision: 3 })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
