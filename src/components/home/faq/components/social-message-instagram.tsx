import Link from 'next/link'

export default function SocialMessageInstagram() {
  return (
    <>
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
              Um recado importante:
            </p>
            <div className="text-muted-foreground">
              Para você ficar por dentro das novidades do curso, que tal nos
              seguir no Instagram? 😊{' '}
              <Link
                href="https://www.instagram.com/cienciaetecnologiaufmt"
                className="text-primary hover:text-primary/80 underline"
                target="_blank"
              >
                @CienciaetecnologiaUFMT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
