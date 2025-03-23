'use client'

import { ModalDialog } from '@/components'
import TransactionForm from '../TransactionForm'
import { useState } from 'react'

function NewTransactionModal() {
  const [open, setOpen] = useState(false)

  return (
    <ModalDialog
      title='Add New Transaction'
      description='Enter the details of your transaction, including category, amount, and date.'
      triggerLabel='+ Add New Transaction'
      isOpen={open}
      setOpen={setOpen}
    >
      <TransactionForm onSuccess={() => setOpen(false)} />
    </ModalDialog>
  )
}

export default NewTransactionModal
