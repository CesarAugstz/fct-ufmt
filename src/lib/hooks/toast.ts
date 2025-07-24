import { ExternalToast, toast } from 'sonner'

export function useToast() {
  function loading(message: string, options?: ExternalToast) {
    toast.loading(message, options)
  }
  function error(message: string, options?: ExternalToast) {
    toast.error(message, options)
  }
  function success(message: string, options?: ExternalToast) {
    toast.success(message, options)
  }
  function info(message: string, options?: ExternalToast) {
    toast.info(message, options)
  }
  function exception(error: any, fallbackMessage?: string) {
    switch (true) {
      case error?.info?.rejectedByPolicy:
        return toast.error('Você não tem permissão para executar esta ação.')

      case error?.info?.message?.includes('Unique constraint failed'): {
        const keyName = error.info.message.match(/\(`(.*)`\)/)?.[1]
        if (!keyName)
          return toast.error('Ocorreu um erro. Por favor, tente novamente.')
        return toast.error(
          `Já existe um registro com este ${keyName}. Por favor, escolha outro.`,
        )
      }
      case error?.info?.message:
        return toast.error(error.info.message)

      case error?.message:
        return toast.error(error.error.message)

      default:
        return toast.error(
          fallbackMessage || 'Ocorreu um erro. Por favor, tente novamente.',
        )
    }
  }
  return {
    loading,
    error,
    success,
    info,
    exception,
  }
}
