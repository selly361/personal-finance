'use client'

import PotForm from './PotForm'
import { ModalDialog } from '@/components'
import { useState } from 'react'

function NewPotModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <ModalDialog
      title='Add New Pot'
      description='Create a pot to set savings targets. These can help keep you on track as you save for special purchases.'
      triggerLabel='+ Add New Pot'
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
    >
      <PotForm onSuccess={() => setIsOpen(false)} />
    </ModalDialog>
  )
}

export default NewPotModal
