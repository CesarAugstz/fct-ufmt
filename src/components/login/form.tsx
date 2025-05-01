import Link from 'next/link'
import { FormLabel } from '../ui/form'
import { FormText } from '../ui/form-fields/form-text'
import { FormCheckbox } from '../ui/form-fields/form-checkbox'

export default function LoginForm() {
  return (
    <>
      <FormText name="email" label="Email" placeholder="seu@email.com" />

      <FormText
        name="password"
        placeholder="********"
        type="password"
        showPasswordToggle
        customLabel={
          <div className="flex w-full items-center justify-between">
            <FormLabel>Senha</FormLabel>
            <Link
              href="#"
              className="text-sm text-primary hover:underline"
            >
              Esqueceu sua senha?
            </Link>
          </div>
        }
      />

      <FormCheckbox name="remember" label="Lembrar de mim" />
    </>
  )
}
