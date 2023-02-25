import { useRef } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  ModalContent,
  FormControl,
  Button,
  Text,
  Input,
  ModalFooter,
} from '@chakra-ui/react'

const ModalFormPassword = ({
  onSubmit,
  modalPasswdOpen,
  setModalPasswdOpen,
}) => {
  const refPasswd = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSubmit(refPasswd.current.value)
    }
  }

  return (
    <Modal
      isOpen={modalPasswdOpen}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      onClose={() => setModalPasswdOpen(false)}
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader textAlign='center'>
          Permission Admin
        </ModalHeader>

        <ModalBody>
          <Text p={3}>To continue you need the superuser password:</Text>

          <FormControl>
            <Input
              ref={refPasswd}
              required
              autoFocus
              type='password'
              placeholder='sudo password'
              onKeyDown={handleKeyDown}
            />

          </FormControl>

        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => onSubmit(refPasswd.current.value)}
          >
            Confirm
          </Button>
        </ModalFooter>

      </ModalContent>
    </Modal>
  )
}

export default ModalFormPassword
