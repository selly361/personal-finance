'use client'

import { Category, Theme } from '@/types'
import { ChartConfig, ChartContainer } from '@/components/ui'
import { Label, Pie, PieChart } from 'recharts'

import { cn } from '@/lib/utils'

interface Budget {
  category_id: string
  theme_id: string
  id: string
  max_spend: number
  total_spent: number | null
}

interface BudgetPieChartProps {
  budgets: Budget[]
  categories: Category[]
  themes: Theme[]
  className?: string
}

export default function BudgetPieChart({
  budgets,
  categories,
  themes,
  className,
}: BudgetPieChartProps) {
  const budgetSpendingData = budgets.map(
    ({ category_id, max_spend, total_spent, theme_id }) => {
      const category = categories.find((c) => c.id === category_id)?.name || 'Unknown'
      const theme = themes.find((t) => t.id === theme_id)?.color_code || '#ccc'
      return { category, spent: total_spent || 0, maximum: max_spend, theme }
    }
  )

  console.log(budgetSpendingData)
  
  const chartConfig = budgetSpendingData.reduce<ChartConfig>(
    (acc, { category, theme }) => {
      acc[category] = { label: category, color: theme }
      return acc
    },
    {}
  )

  const chartData = budgetSpendingData.map(({ category, spent, theme }) => ({
    category,
    spent,
    fill: theme,
  }))

  const [totalSpent, totalBudget] = budgetSpendingData.reduce(
    ([spentSum, maxSum], { spent, maximum }) => [spentSum + spent, maxSum + maximum],
    [0, 0]
  )

  return (
    <ChartContainer
      config={chartConfig}
      className={cn('aspect-square h-[16rem] md:h-[20rem]', className)}
    >
      <PieChart>
        <Pie dataKey='spent' nameKey='category' data={chartData} innerRadius='50%'>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                const { cx, cy } = viewBox
                return (
                  <text x={cx} y={cy} textAnchor='middle' dominantBaseline='middle'>
                    <tspan
                      x={cx}
                      y={cy}
                      className='fill-foreground text-2xl md:text-3xl font-bold'
                    >
                      ${totalSpent.toLocaleString()}
                    </tspan>
                    <tspan x={cx} y={(cy || 0) + 24} className='fill-muted-foreground'>
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
