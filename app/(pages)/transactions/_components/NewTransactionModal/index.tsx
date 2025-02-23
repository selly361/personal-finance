'use client'

import { ModalDialog } from '@/components'
import TransactionForm from './TransactionForm'
import { useState } from 'react'

function NewTransactionModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ModalDialog
      title='Add New Transaction'
      description='Enter the details of your transaction, including category, amount, and date.'
      triggerLabel='+ Add New Transaction'
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
    >
      <TransactionForm onSuccess={() => setIsOpen(false)} />
    </ModalDialog>
  )
}

export default NewTransactionModal
