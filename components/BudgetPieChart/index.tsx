'use client'

import { ChartConfig, ChartContainer } from '@/components/ui'
import { Label, Pie, PieChart } from 'recharts'

import { BudgetDetails } from '@/types'
import { cn } from '@/lib/utils'
import millify from 'millify'

interface BudgetPieChartProps {
  budgets: BudgetDetails[]
  className?: string
}

export default function BudgetPieChart({ budgets, className }: BudgetPieChartProps) {
  const data = budgets.map(({ category, max_spend, total_spent, theme }) => ({
    category,
    spent: total_spent || 0,
    maximum: max_spend,
    fill: theme,
  }))
  const config = budgets.reduce<ChartConfig>((acc, { category, theme }) => {
    acc[category] = { label: category, color: theme }
    return acc
  }, {})
  const [totalSpent, totalBudget] = budgets.reduce(
    ([sumSpent, sumMax], { total_spent, max_spend }) => [
      sumSpent + (total_spent || 0),
      sumMax + max_spend,
    ],
    [0, 0]
  )
  return (
    <ChartContainer
      config={config}
      className={cn('aspect-square h-[16rem] md:h-[20rem]', className)}
    >
      <PieChart>
        <Pie dataKey='spent' nameKey='category' data={data} innerRadius='50%'>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                const { cx, cy } = viewBox
                return (
                  <text x={cx} y={cy} textAnchor='middle' dominantBaseline='middle'>
                    <tspan
                      x={cx}
                      y={cy}
                      className='fill-foreground text-xl font-bold text-grey-900'
                    >
                      ${millify(totalSpent, { precision: 3 })}
                    </tspan>
                    <tspan
                      x={cx}
                      y={(cy || 0) + 24}
                      className='fill-muted-foreground text-xs text-grey-500'
                    >
                      of ${millify(totalBudget, { precision: 3 })} limit
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
