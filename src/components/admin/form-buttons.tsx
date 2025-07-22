import LoadingSpinner from '../common/loading-spinner'
import { Button } from '../ui/button'

interface FormButtonsProps {
  isSubmitting?: boolean
  onCancel: () => void
  onSubmit?: () => void
  submitLabel?: string
  cancelLabel?: string
}

export default function FormButtons({
  isSubmitting,
  onCancel,
  onSubmit,
  submitLabel = 'Salvar',
  cancelLabel = 'Cancelar',
}: FormButtonsProps) {
  return (
    <div className="flex justify-end gap-4 pt-6">
      <Button type="button" variant="outline" onClick={() => onCancel()}>
        {cancelLabel}
      </Button>
      <Button
        type="submit"
        onClick={() => onSubmit?.()}
        disabled={isSubmitting}
        variant="default"
      >
        {submitLabel}
        {isSubmitting ? <LoadingSpinner /> : null}
      </Button>
    </div>
  )
}
