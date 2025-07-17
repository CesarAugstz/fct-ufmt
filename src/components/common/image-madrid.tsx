import Image from 'next/image'

type ImageProps = Omit<Parameters<typeof Image>[0], 'src'>

interface ImageMadridProps extends ImageProps {
  imageId?: string | null
  src?: string | null
}

export default function ImageMadrid({
  imageId,
  src,
  ...props
}: ImageMadridProps) {
  const srcImage = src ? src : imageId ? `/api/images?id=${imageId}` : ''
  return <Image src={srcImage} {...props} />
}
