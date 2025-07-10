import Link from 'next/link'
import { FormLabel } from '../ui/form'
import { FormText } from '../ui/form-fields/form-text'
import { FormCheckbox } from '../ui/form-fields/form-checkbox'

export default function LoginForm({ onEnter }: { onEnter?: () => void }) {
  return (
    <>
      <FormText
        autoFocus
        name="email"
        label="Email"
        placeholder="seu@email.com"
        tabIndex={1}
      />

      <FormText
        tabIndex={2}
        name="password"
        placeholder="********"
        type="password"
        onEnter={onEnter}
        showPasswordToggle
        customLabel={
          <div className="flex w-full items-center justify-between">
            <FormLabel>Senha</FormLabel>
            <Link href="#" className="text-sm text-primary hover:underline">
              Esqueceu sua senha?
            </Link>
          </div>
        }
      />

      <FormCheckbox name="remember" label="Lembrar de mim" />
    </>
  )
}
