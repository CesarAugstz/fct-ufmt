import { useState } from 'react'

export interface ImageCompressorOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
  format?: 'image/jpeg' | 'image/png' | 'image/webp'
  maxSizeKB?: number
}

export interface CompressedImageResult {
  file: File
  dataUrl: string
  originalSize: number
  compressedSize: number
  compressionRatio: number
  quality: number
}

export const compressImage = async (
  file: File,
  options: ImageCompressorOptions = {},
): Promise<CompressedImageResult> => {
  const {
    maxWidth,
    maxHeight,
    quality = 0.9,
    format = 'image/jpeg',
    maxSizeKB = 300,
  } = options

  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = event => {
        const img = new Image()
        img.src = event.target?.result as string

        img.onload = () => {
          let width = img.width
          let height = img.height

          const shouldResize =
            options.maxWidth !== undefined || options.maxHeight !== undefined

          if (shouldResize) {
            if (width > height) {
              if (maxWidth && width > maxWidth) {
                height = Math.round((height * maxWidth) / width)
                width = maxWidth
              }
            } else {
              if (maxHeight && height > maxHeight) {
                width = Math.round((width * maxHeight) / height)
                height = maxHeight
              }
            }
          }

          const originalSizeKB = Math.round(file.size / 1024)
          const needsResizing = width !== img.width || height !== img.height
          const needsSizeCompression = originalSizeKB > maxSizeKB

          if (!needsResizing && !needsSizeCompression) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
              resolve({
                file,
                dataUrl: reader.result as string,
                originalSize: originalSizeKB,
                compressedSize: originalSizeKB,
                compressionRatio: 1,
                quality: 1,
              })
            }
            return
          }

          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height

          const ctx = canvas.getContext('2d')
          if (!ctx) {
            reject(new Error('Could not get canvas context'))
            return
          }

          ctx.drawImage(img, 0, 0, width, height)

          let dataUrl = canvas.toDataURL(format, quality)

          let currentQuality = quality

          const getFileSizeFromDataUrl = (dataUrl: string) => {
            const base64Length = dataUrl.split(',')[1].length
            return Math.round((base64Length * 3) / 4 / 1024)
          }

          let compressedSizeKB = getFileSizeFromDataUrl(dataUrl)

          while (compressedSizeKB > maxSizeKB && currentQuality > 0.1) {
            currentQuality -= 0.1
            dataUrl = canvas.toDataURL(format, currentQuality)
            compressedSizeKB = getFileSizeFromDataUrl(dataUrl)
          }

          const byteString = atob(dataUrl.split(',')[1])
          const ab = new ArrayBuffer(byteString.length)
          const ia = new Uint8Array(ab)

          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i)
          }

          const blob = new Blob([ab], { type: format })
          const fileName = file.name.replace(/\.[^/.]+$/, '')
          const extension =
            format === 'image/jpeg'
              ? '.jpg'
              : format === 'image/png'
                ? '.png'
                : '.webp'
          const newFile = new File([blob], `${fileName}${extension}`, {
            type: format,
          })

          resolve({
            file: newFile,
            dataUrl,
            originalSize: originalSizeKB,
            compressedSize: compressedSizeKB,
            compressionRatio:
              Math.round((originalSizeKB / compressedSizeKB) * 100) / 100,
            quality: currentQuality,
          })
        }

        img.onerror = () => {
          reject(new Error('Failed to load image'))
        }
      }

      reader.onerror = () => {
        reject(new Error('Failed to read file'))
      }
    } catch (err) {
      reject(err)
    }
  })
}

export const useImageCompressor = () => {
  const [isCompressing, setIsCompressing] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const compress = async (file: File, options?: ImageCompressorOptions) => {
    try {
      setIsCompressing(true)
      setError(null)
      const response = await compressImage(file, options)
      return response
    } catch (err) {
      const error =
        err instanceof Error
          ? err
          : new Error('Unknown error during compression')
      setError(error)
      throw error
    } finally {
      setIsCompressing(false)
    }
  }

  return { compress, isCompressing, error }
}
