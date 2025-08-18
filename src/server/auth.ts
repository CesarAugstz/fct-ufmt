import { type PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs'
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from 'next-auth'
import { type Adapter } from 'next-auth/adapters'
import CredentialsProvider from 'next-auth/providers/credentials'
import { db } from './db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: string
    } & DefaultSession['user']
  }

  interface User {
    role: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: { signIn: '/login', error: '/login' },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }

      return session
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      id: 'admin-login',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      authorize: authorize(db),
    }),
    CredentialsProvider({
      id: 'professor-login',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      authorize: authorize(db),
    }),
  ],
}

function authorize(prisma: PrismaClient) {
  return async (
    credentials: Record<'email' | 'password', string> | undefined,
  ) => {
    if (!credentials) throw new Error('Missing credentials')

    if (!credentials.email)
      throw new Error('"email" is required in credentials')

    if (!credentials.password)
      throw new Error('"password" is required in credentials')

    const maybeUser = await prisma.user.findFirst({
      where: {
        email: credentials.email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        role: true,
        isFirstAccess: true,
      },
    })

    if (!maybeUser) return null

    if (!maybeUser.password && maybeUser.isFirstAccess) {
      throw new Error(
        'Primeiro acesso necessário. Use a opção "Esqueceu sua senha?" para criar sua senha.',
      )
    }

    const isValid = await compare(credentials.password, maybeUser.password!)
    if (!isValid) return null

    return {
      id: maybeUser.id,
      email: maybeUser.email,
      name: maybeUser.name,
      role: maybeUser.role,
    }
  }
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions)

export const getCurrentUser = async () => {
  const session = await getServerAuthSession()
  const userId = session?.user?.id

  if (!userId) return null

  const user = await db.user.findUnique({
    where: { id: userId },
  })
  return user
}
