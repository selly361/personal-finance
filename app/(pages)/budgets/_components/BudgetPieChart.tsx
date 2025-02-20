'use client'

import { ChartConfig, ChartContainer } from '@/components/ui'
import { Label, Pie, PieChart } from 'recharts'
import { cn } from '@/lib/utils'
import { BudgetDetails } from '@/types'

interface BudgetPieChartProps {
  budgets: BudgetDetails[]
  className?: string
}

export default function BudgetPieChart({
  budgets,
  className,
}: BudgetPieChartProps) {
  const budgetSpendingData = budgets.map(
    ({ category, max_spend, total_spent, theme }) => ({
      category,
      spent: total_spent || 0,
      maximum: max_spend,
      fill: theme,
    })
  )

  const chartConfig = budgets.reduce<ChartConfig>(
    (acc, { category, theme }) => {
      acc[category] = { label: category, color: theme }
      return acc
    },
    {}
  )

  const [totalSpent, totalBudget] = budgets.reduce(
    ([spentSum, maxSum], { total_spent, max_spend }) => [
      spentSum + (total_spent || 0),
      maxSum + max_spend,
    ],
    [0, 0]
  )

  return (
    <ChartContainer
      config={chartConfig}
      className={cn('aspect-square h-[16rem] md:h-[20rem]', className)}
    >
      <PieChart>
        <Pie
          dataKey='spent'
          nameKey='category'
          data={budgetSpendingData}
          innerRadius='50%'
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                const { cx, cy } = viewBox
                return (
                  <text
                    x={cx}
                    y={cy}
                    textAnchor='middle'
                    dominantBaseline='middle'
                  >
                    <tspan
                      x={cx}
                      y={cy}
                      className='fill-foreground text-xl font-bold text-grey-900'
                    >
                      ${totalSpent.toLocaleString()}
                    </tspan>
                    <tspan
                      x={cx}
                      y={(cy || 0) + 24}
                      className='fill-muted-foreground text-xs text-grey-500'
                    >
                      of ${totalBudget.toLocaleString('en-US')} limit
                    </tspan>
                  </text>
                )
              }
              return null
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
