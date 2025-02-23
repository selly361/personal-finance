import { CategorySelect } from '@/components'
import { Label } from '@/components/ui'

interface CategoryFieldProps {
  categoryId: string
  handleCategoryChange: (categId: string) => void
  error: string | undefined
}

const CategoryField = ({
  categoryId,
  handleCategoryChange,
  error,
}: CategoryFieldProps) => {
  return (
    <fieldset>
      <div className='label'>
        <Label className={error ? 'label-error' : ''}>Budget Category</Label>
        {error && <p className='error-text'>{error}</p>}
      </div>
      <CategorySelect
        onChange={handleCategoryChange}
        value={categoryId}
      />
    </fieldset>
  )
}

export default CategoryField
