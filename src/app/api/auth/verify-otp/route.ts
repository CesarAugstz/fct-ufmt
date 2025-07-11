import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { db } from '@/server/db'
import { isOTPExpired } from '@/lib/otp'

export async function POST(request: NextRequest) {
  try {
    const { email, otpCode, newPassword } = await request.json()

    if (!email || !otpCode || !newPassword) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 },
      )
    }

    const user = await db.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 },
      )
    }

    if (!user.otpCode || !user.otpExpiration) {
      return NextResponse.json(
        { error: 'Código OTP não encontrado ou expirado' },
        { status: 400 },
      )
    }

    if (user.otpCode !== otpCode) {
      return NextResponse.json(
        { error: 'Código OTP inválido' },
        { status: 400 },
      )
    }

    if (isOTPExpired(user.otpExpiration)) {
      return NextResponse.json(
        { error: 'Código OTP expirado' },
        { status: 400 },
      )
    }

    const hashedPassword = await hash(newPassword, 12)

    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        otpCode: null,
        otpExpiration: null,
        isFirstAccess: false,
      },
    })

    return NextResponse.json({
      message: user.isFirstAccess
        ? 'Senha criada com sucesso!'
        : 'Senha redefinida com sucesso!',
    })
  } catch (error) {
    console.error('Error verifying OTP:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
