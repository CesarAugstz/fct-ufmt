import { twMerge } from 'tailwind-merge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface Props {
  alt: string
  src?: string
  className?: string
  size?: number
}

export default function ProfileImage({ size, src, alt, className }: Props) {
  const sizeClass = size ? `h-${size} w-${size}` : 'h-24 w-24'
  return (
    <Avatar className={twMerge(sizeClass,'border-4 border-white',  className)}>
      <AvatarImage src={src} alt="Professor" />
      <AvatarFallback className="text-xl">{alt}</AvatarFallback>
    </Avatar>
  )
}
