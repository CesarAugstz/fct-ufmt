'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ReactNode, useState } from 'react'
import ImageViewerDialog from '@/components/ui/image-viewer-dialog'

export interface TutorialStep {
  number: number
  title?: string
  description: string | ReactNode
  image?: {
    src: string
    alt: string
    width: number
    height: number
  }
  warning?: string | ReactNode
}

export interface DocumentCard {
  title: string
  description: string
  href: string
}

export interface StepByStepTutorialProps {
  title: string
  subtitle: string
  icon?: ReactNode
  steps: TutorialStep[]
  videoUrl?: string
  videoTitle?: string
  documents?: DocumentCard[]
  socialMessage?:
    | {
        title: string
        description: ReactNode
      }
    | ReactNode
}

export default function StepByStepTutorial({
  title,
  subtitle,
  icon,
  steps,
  videoUrl,
  videoTitle,
  documents,
  socialMessage,
}: StepByStepTutorialProps) {
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<{
    src: string
    alt: string
    title?: string
  } | null>(null)

  const handleImageClick = (
    image: { src: string; alt: string },
    stepTitle?: string,
  ) => {
    setSelectedImage({
      src: image.src,
      alt: image.alt,
      title: stepTitle || image.alt,
    })
    setImageDialogOpen(true)
  }
  const defaultIcon = (
    <svg
      className="w-8 h-8 text-primary"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  )

  return (
    <div>
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
          {icon || defaultIcon}
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
        <p className="text-lg text-muted-foreground">{subtitle}</p>
      </div>

      <div className="space-y-8">
        <div className="bg-card rounded-2xl p-8 shadow-lg">
          <h4 className="text-xl font-semibold text-foreground mb-6">
            Para {title.toLowerCase()}, siga os passos a seguir:
          </h4>

          <div className="space-y-8">
            {steps.map(step => (
              <div key={step.number} className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  {step.number}
                </div>
                <div className="flex-1">
                  {step.title && (
                    <h5 className="font-semibold text-foreground mb-2">
                      {step.title}
                    </h5>
                  )}
                  <div className="text-foreground leading-relaxed">
                    {step.description}
                  </div>

                  {step.image && (
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() =>
                          handleImageClick(step.image!, step.title)
                        }
                        className="cursor-pointer transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
                        type="button"
                      >
                        <Image
                          src={step.image.src}
                          alt={step.image.alt}
                          className="rounded-lg shadow-md"
                          width={step.image.width}
                          height={step.image.height}
                        />
                      </button>
                    </div>
                  )}

                  {step.warning && (
                    <div className="mt-4 p-4 bg-warning/10 border border-warning/20 rounded-lg">
                      <div className="text-sm">{step.warning}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {socialMessage ? (
            typeof socialMessage === 'object' &&
            'description' in socialMessage ? (
              <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
                <div className="flex flex-wrap md:flex-nowrap items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-2">
                      {socialMessage.title}
                    </p>
                    <div className="text-muted-foreground">
                      {socialMessage.description}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              socialMessage
            )
          ) : null}
        </div>

        {videoUrl && (
          <div className="bg-card rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              {videoTitle || 'Vídeo Tutorial'}
            </h3>
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                className="w-full h-full"
                src={videoUrl}
                title={videoTitle || 'Tutorial'}
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />
            </div>
          </div>
        )}

        {documents && documents.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 shadow-lg grid grid-cols-1 gap-4 grid-rows-[20%_1fr_10%]"
              >
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {doc.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {doc.description}
                </p>
                <div className="size-full">
                  <Button asChild className="w-full">
                    <Link href={doc.href} target="_blank">
                      Acessar Documento
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ImageViewerDialog
        open={imageDialogOpen}
        onOpenChange={setImageDialogOpen}
        className=" min-w-[90vw] "
        imageClassName="size-full max-h-[80vh]"
        imageSrc={selectedImage?.src || ''}
        imageAlt={selectedImage?.alt || ''}
        imageTitle={selectedImage?.title}
      />
    </div>
  )
}
