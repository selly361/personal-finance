'use client'

import { Budget, Pot } from '@/types'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui'
import { Fragment, useState } from 'react'
import { deleteBudget, deletePot } from '@/actions'

import BudgetForm from '@/app/(pages)/budgets/_components/BudgetForm'
import ModalDialog from '../ModalDialog'
import { MoreHorizontal } from 'lucide-react'
import PotForm from '@/app/(pages)/pots/_components/PotForm'

type Props = {
  type?: 'Pot' | 'Budget'
  budget?: Budget
  pot?: Pot
  id: string
  title: string
}

function OptionsDropdown({ type = 'Budget', budget, pot, id, title }: Props) {
  const [isEdit, setEdit] = useState(false)
  const [isDelete, setDelete] = useState(false)

  const handleDelete = type === 'Budget' ? deleteBudget : deletePot
  
  return (
    <Fragment>
      <Popover>
        <PopoverTrigger>
          <MoreHorizontal className='text-grey-500' />
        </PopoverTrigger>
        <PopoverContent className='flex flex-col gap-4 px-5 py-3 w-[134px]'>
          <button
            onClick={() => setEdit((e) => !e)}
            className='text-sm text-grey-900 w-max'
          >
            Edit {type}
          </button>
          <div className='w-full h-px bg-grey-100'></div>
          <button
            onClick={() => setDelete((e) => !e)}
            className='text-sm text-red-500 w-max'
          >
            Delete {type}
          </button>
        </PopoverContent>
      </Popover>

      <ModalDialog
        title={`Edit ${type}`}
        description={
          type === 'Budget'
            ? 'As your budgets change, feel free to update your spending limits.'
            : 'If your saving targets change, feel free to update your pots.'
        }
        isOpen={isEdit}
        setOpen={setEdit}
      >
        {type === 'Budget' ? (
          <BudgetForm budget_id={id} budget={budget} onSuccess={() => setEdit(false)} />
        ) : (
          <PotForm pot_id={id} pot={pot} onSuccess={() => setEdit(false)} />
        )}
      </ModalDialog>

      <ModalDialog
        title={`Delete '${title}'`}
        description={`Are you sure you want to delete this ${type.toLowerCase()}? This action cannot be reversed, and all the data inside it will be removed forever.`}
        isOpen={isDelete}
        setOpen={setDelete}
      >
        <Button onClick={() => handleDelete(id)} variant='destructive' className='min-h-10'>Yes, Confirm Deletion</Button>
        <Button onClick={() => setDelete(false)} variant='ghost' className='min-h-10 text-grey-500'>No, Go Back</Button>
      </ModalDialog>
    </Fragment>
  )
}

export default OptionsDropdown
