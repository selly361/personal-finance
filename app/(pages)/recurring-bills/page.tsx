import { Metadata } from 'next/types'
import RecurringBillsPage from './_components/RecurringBillsPage'
import { getRecurringBillsSummary } from '@/actions'

export const metadata = {
  title: 'Recurring Bills',
  description: 'Track and manage your recurring expenses easily.',
} as Metadata

export default async function Page() {
  const recurringBillsData = await getRecurringBillsSummary()
  return <RecurringBillsPage data={recurringBillsData} />
}
