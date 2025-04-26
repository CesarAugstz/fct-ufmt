import { InputHTMLAttributes } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
}

export function TextSearchField({ placeholder, ...props }: TextFieldProps) {
  const inputProps = { ...props, className: 'pl-10' }
  return (
    <div className={twMerge('relative ', props.className)}>
      <Search
        width={18}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <Input placeholder={placeholder} {...inputProps} />
    </div>
  )
}
