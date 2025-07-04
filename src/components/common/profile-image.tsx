import { twMerge } from 'tailwind-merge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface Props {
  alt: string
  src?: string
  imageId?: string | null
  className?: string
}

export default function ProfileImage({ src, alt, className, imageId }: Props) {
  console.log('src', src)
  console.log('imageId', imageId)
  const srcImage = src ? src : imageId ? `/api/images?id=${imageId}` : undefined

  return (
    <Avatar className={twMerge('border-4 border-white h-24 w-24', className)}>
      <AvatarImage src={srcImage} alt="Professor" className="object-cover" />
      <AvatarFallback className="text-xl">{alt}</AvatarFallback>
    </Avatar>
  )
}
