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

interface ModalFormPassword {
  isOpen: boolean;
  onSubmit: (value: string) => void;
  setOpen: (value: boolean) => void;
}

const ModalFormPassword = ({
  onSubmit,
  modalPasswdOpen,
  setModalPasswdOpen,
}: ModalFormPassword): JSX.Element => {
  const refPasswd = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.key === "Enter") {
      onSubmit(refPasswd.current?.value ?? "");
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
              onKeyDown={(e) => handleKeyDown(e)}
            />

          </FormControl>

        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => onSubmit(refPasswd.current?.value ?? "")}
          >
            Confirm
          </Button>
        </ModalFooter>

      </ModalContent>
    </Modal>
  )
}

export default ModalFormPassword
