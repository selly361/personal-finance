import { Label } from '@/components/ui'
import { ThemeSelect } from '@/components'

interface ThemeFieldProps {
  themeId: string
  handleThemeChange: (themeId: string) => void
  error: string | undefined
}

const ThemeField = ({ themeId, handleThemeChange, error }: ThemeFieldProps) => {
  return (
    <fieldset>
      <div className='label'>
        <Label className={error ? 'label-error' : ''}>Theme</Label>
        {error && <p className='error-text'>{error}</p>}
      </div>
      <ThemeSelect onChange={handleThemeChange} value={themeId} type='budgets' />
    </fieldset>
  )
}

export default ThemeField
