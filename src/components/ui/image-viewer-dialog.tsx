import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { twMerge } from 'tailwind-merge'

interface ImageViewerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  className?: string
  imageSrc: string
  imageAlt: string
  imageTitle?: string
  imageClassName?: string
}

export default function ImageViewerDialog({
  open,
  onOpenChange,
  imageSrc,
  imageAlt,
  imageTitle,
  className,
  imageClassName,
}: ImageViewerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={twMerge(
          `max-w-7xl max-h-[90vh] p-0 overflow-hidden`,
          className,
        )}
      >
        <DialogHeader className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">
              {imageTitle || imageAlt}
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className="flex items-center justify-center p-4 pt-0">
          <div className="relative max-w-full max-h-[80vh] overflow-auto">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={1200}
              height={800}
              className={twMerge(
                'object-contain w-auto h-auto max-w-full max-h-full',
                imageClassName,
              )}
              unoptimized
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
