import { Fragment } from "react"
import { Metadata } from "next/types"
import NewTransactionModal from "./_components/NewTransactionModal/NewTransactionModal"
import TransactionsPage from "./_components/TransactionsPage"
import { getTransactionsOverview } from "@/actions/transactions"

export const metadata = {
  title: "Transactions",
  description: "View and track all your spending in one place.",
} as Metadata

export default async function Page() {
  const overview = await getTransactionsOverview()

  return (
    <Fragment>
      <section className="w-full flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Transactions</h1>
        <NewTransactionModal />
      </section>

      <TransactionsPage
        transactions={overview.transactions}
        categories={overview.categories}
      />
    </Fragment>
  )
}
