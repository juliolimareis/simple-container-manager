import { useToast } from "@chakra-ui/react"

const useAlert = () => {
  const toast = useToast()

  const alertMessage = (status?: "info" | "warning" | "success" | "error", message?: string) => (
    toast(
      {
        status: status,
        duration: status == 'error' ? 15000 : 7000,
        isClosable: true,
        description: message,
        position: 'top-right',
      }
    )
  )

  return alertMessage
}

export default useAlert
