'use client'

import BudgetForm from './BudgetForm'
import { ModalDialog } from '@/components'
import { useState } from 'react'

function NewBudgetModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ModalDialog
      title='Add New Budget'
      description='Choose a category to set a spending budget. These categories can help you monitor spending.'
      triggerLabel='+ Add New Budget'
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
    >
      <BudgetForm onSuccess={() => setIsOpen(false)} />
    </ModalDialog>
  )
}

export default NewBudgetModal
