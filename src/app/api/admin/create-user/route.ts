import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/server/db'
import { getCurrentUser } from '@/server/auth'

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
    }

    const { email, name, role } = await request.json()

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email e nome são obrigatórios' },
        { status: 400 },
      )
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: 'Usuário já existe' }, { status: 400 })
    }

    const user = await db.user.create({
      data: {
        email,
        name,
        role: role || 'USER',
        isFirstAccess: true,
        password: null,
      },
    })

    return NextResponse.json({
      message: 'Usuário criado com sucesso',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isFirstAccess: user.isFirstAccess,
      },
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
