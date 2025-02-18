import {
  BudgetNavIcon,
  OverviewNavIcon,
  PotsNavIcon,
  RecurringBillsNavIcon,
  TransactionsNavIcon,
} from '@/components/icons'

export const NAV_ITEMS = [
  { name: 'Overview', icon: OverviewNavIcon, href: '/' },
  { name: 'Transactions', icon: TransactionsNavIcon, href: '/transactions' },
  { name: 'Budgets', icon: BudgetNavIcon, href: '/budgets' },
  { name: 'Pots', icon: PotsNavIcon, href: '/pots' },
  {
    name: 'Recurring Bills',
    icon: RecurringBillsNavIcon,
    href: '/recurring-bills',
  },
]
