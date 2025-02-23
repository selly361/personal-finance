import { createTransaction, updateTransaction } from '@/actions'

import { Transaction } from '@/types'
import { transactionValidation } from '@/lib/validations'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export const useTransactionForm = (
  transaction?: Transaction,
  transaction_id?: string,
  onSuccess?: () => void
) => {
  const {
    register,
    setValue,
    watch,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Transaction>({
    resolver: zodResolver(transactionValidation),
    mode: 'onBlur',
    defaultValues: transaction || {
      recipient_sender_name: '',
      category_id: '',
      date: new Date(),
      recurring: false,
    },
  })

  const onSubmit = async (values: Transaction) => {
    const result = transaction
      ? await updateTransaction(transaction_id as string, values)
      : await createTransaction(values)

    if (result.error) {
      const error = result.error.toString()
      if (error.includes('category_id')) {
        setError('category_id', { type: 'server', message: error })
      } else if (error.includes('recipient_sender')) {
        setError('recipient_sender_name', { type: 'server', message: error })
      } else if (error.includes('date')) {
        setError('date', { type: 'server', message: error })
      } else {
        setError('root', { type: 'server', message: error })
      }
      return false
    }

    onSuccess?.()
    return true
  }

  return {
    register,
    setValue,
    watch,
    errors,
    isSubmitting,
    handleSubmit,
    onSubmit,
    handleCategoryChange: (categId: string) => {
      setValue('category_id', categId)
      clearErrors('category_id')
    },
    handleRecipientSenderChange: (value: { name: string; avatar: string }) => {
      setValue('recipient_sender_name', value.name)
      setValue('avatar', value.avatar)
      clearErrors('recipient_sender_name')
      clearErrors('avatar')
    },
    handleDateChange: (date: Date | undefined) => {
      setValue('date', date || new Date())
    },
  }
}
