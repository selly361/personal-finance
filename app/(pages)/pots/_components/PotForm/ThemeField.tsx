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
      <ThemeSelect
        error={error}
        onChange={handleThemeChange}
        value={themeId}
        type='pots'
      />
    </fieldset>
  )
}

export default ThemeField
