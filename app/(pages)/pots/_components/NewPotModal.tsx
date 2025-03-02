'use client'

import { ModalDialog } from '@/components'
import PotForm from './PotForm'
import { useState } from 'react'

function NewPotModal() {
  const [Open, setOpen] = useState(false)

  return (
    <ModalDialog
      title='Add New Pot'
      description='Create a pot to set savings targets. These can help keep you on track as you save for special purchases.'
      triggerLabel='+ Add New Pot'
      isOpen={Open}
      setOpen={setOpen}
    >
      <PotForm onSuccess={() => setOpen(false)} />
    </ModalDialog>
  )
}

export default NewPotModal
