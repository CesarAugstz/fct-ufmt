import { NextRequest, NextResponse } from 'next/server'

export { default } from 'next-auth/middleware'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login|register).*)',
  ],
}
