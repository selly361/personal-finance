'use client'

import BudgetForm from './BudgetForm'
import { ModalDialog } from '@/components'
import { useState } from 'react'

function NewBudgetModal() {
  const [open, setOpen] = useState(false)

  return (
    <ModalDialog
      title='Add New Budget'
      description='Choose a category to set a spending budget. These categories can help you monitor spending.'
      triggerLabel='+ Add New Budget'
      isOpen={open}
      setOpen={setOpen}
    >
      <BudgetForm onSuccess={() => setOpen(false)} />
    </ModalDialog>
  )
}

export default NewBudgetModal
