'use client'

import { Checkbox, DatePicker, Label } from '@/components/ui'
import { RecipientSenderSelect, SubmitButton } from '@/components'

import AmountField from './AmountField'
import CategoryField from './CategoryField'
import { Transaction } from '@/types'
import { useTransactionForm } from '../../_hooks/useTransactionForm'

interface TransactionFormProps {
  onSuccess: () => void
  transaction?: Transaction
  transaction_id?: string
}

const TransactionForm = ({
  onSuccess,
  transaction,
  transaction_id,
}: TransactionFormProps) => {
  const {
    register,
    setValue,
    errors,
    isSubmitting,
    handleSubmit,
    onSubmit,
    handleCategoryChange,
    handleRecipientSenderChange,
    handleDateChange,
    watch,
  } = useTransactionForm(transaction, transaction_id, onSuccess)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <fieldset>
        <div className='label'>
          <Label className={(errors.recipient_sender_name || errors.avatar) ? 'label-error' : ''}>
            Recipient / Sender
          </Label>
          {(errors.recipient_sender_name || errors.avatar) && (
            <p className='error-text'>{errors.recipient_sender_name?.message}</p>
          )}
        </div>
        <RecipientSenderSelect
          value={{ name: watch().recipient_sender_name, avatar: watch().avatar }}
          onChange={handleRecipientSenderChange}
          error={errors.recipient_sender_name?.message}
        />
      </fieldset>
      <CategoryField
        categoryId={watch().category_id}
        handleCategoryChange={handleCategoryChange}
        error={errors.category_id?.message}
      />
      <fieldset>
        <div className='label'>
          <Label className={errors.date ? 'label-error' : ''}>Date</Label>
          {errors.date && <p className='error-text'>{errors.date.message}</p>}
        </div>
        <DatePicker selected={watch().date} onSelect={handleDateChange} />
      </fieldset>
      <AmountField isRecurring={watch('recurring')} register={register} error={errors.amount?.message} />
      <Label className='flex items-center gap-2'>
        <Checkbox
          checked={watch('recurring')}
          onCheckedChange={(checked) => setValue('recurring', checked === true)}
        />
        <span>Recurring Transaction</span>
      </Label>
      <SubmitButton className='w-full min-h-12' loading={isSubmitting}>
        {transaction ? 'Update Transaction' : 'Add Transaction'}
      </SubmitButton>
    </form>
  )
}

export default TransactionForm
