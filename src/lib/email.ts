import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
  from: process.env.SMTP_USER,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendOTPEmail(
  email: string,
  otpCode: string,
  isFirstAccess: boolean = false,
) {
  const subject = isFirstAccess
    ? 'Código de primeiro acesso - FCT UFMT'
    : 'Código de recuperação de senha - FCT UFMT'
  const title = isFirstAccess ? 'Primeiro Acesso' : 'Recuperação de Senha'
  const message = isFirstAccess
    ? 'Use o código abaixo para criar sua senha de acesso:'
    : 'Use o código abaixo para redefinir sua senha:'

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="color: #333; margin: 0; font-size: 24px;">${title}</h1>
          <p style="color: #666; margin: 10px 0;">FCT UFMT</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 30px; border-radius: 8px; text-align: center; margin-bottom: 30px;">
          <p style="color: #333; margin: 0 0 20px 0; font-size: 16px;">${message}</p>
          <div style="background-color: white; padding: 20px; border-radius: 6px; border: 2px dashed #007bff; display: inline-block;">
            <span style="font-size: 28px; font-weight: bold; color: #007bff; letter-spacing: 4px;">${otpCode}</span>
          </div>
          <p style="color: #666; margin: 20px 0 0 0; font-size: 14px;">Este código é válido por 15 minutos.</p>
        </div>
        
        <div style="text-align: center; color: #666; font-size: 14px;">
          <p style="margin: 0;">Se você não solicitou este código, ignore este email.</p>
          <p style="margin: 10px 0 0 0;">Este é um email automático, não responda.</p>
        </div>
      </div>
    </body>
    </html>
  `

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject,
    html,
  })
}
