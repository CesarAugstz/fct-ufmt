import { twMerge } from 'tailwind-merge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface Props {
  alt: string
  src?: string
  className?: string
}

export default function ProfileImage({ src, alt, className }: Props) {
  return (
    <Avatar className={twMerge('border-4 border-white h-24 w-24', className)}>
      <AvatarImage src={src} alt="Professor" />
      <AvatarFallback className="text-xl">{alt}</AvatarFallback>
    </Avatar>
  )
}
