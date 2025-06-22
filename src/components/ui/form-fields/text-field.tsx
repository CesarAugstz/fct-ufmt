import { InputHTMLAttributes, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  showPasswordToggle?: boolean
  helperText?: string | React.ReactNode
}

export function TextField({
  placeholder,
  showPasswordToggle,
  ...props
}: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const type = showPasswordToggle
    ? showPassword
      ? 'text'
      : 'password'
    : props.type

  return (
    <div className="relative">
      <Input
        placeholder={placeholder}
        {...props}
        type={type}
        className={showPasswordToggle ? 'pr-10' : undefined}
      />

      {props.helperText && (
        <p className="mt-1 text-xs text-muted-foreground">{props.helperText}</p>
      )}

      {showPasswordToggle && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3"
          onClick={togglePasswordVisibility}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="sr-only">
            {showPassword ? 'Hide password' : 'Show password'}
          </span>
        </Button>
      )}
    </div>
  )
}
