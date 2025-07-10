import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/server/db'
import { sendOTPEmail } from '@/lib/email'
import { generateOTP, getOTPExpiration } from '@/lib/otp'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email é obrigatório' },
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

    const otpCode = generateOTP()
    const otpExpiration = getOTPExpiration()

    await db.user.update({
      where: { id: user.id },
      data: {
        otpCode,
        otpExpiration,
      },
    })

    await sendOTPEmail(email, otpCode, user.isFirstAccess)

    return NextResponse.json({
      message: 'Código enviado para seu email',
      isFirstAccess: user.isFirstAccess,
    })
  } catch (error) {
    console.error('Error sending OTP:', error)
    console.error('Error sending OTP:', JSON.stringify(error))
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
