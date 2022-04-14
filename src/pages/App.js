import useAlert from '../core/hooks/useAlert.ts';
import { SystemContext } from '../core/SystemContext';
import { useState, useContext, useEffect, useRef } from 'react';
import ContainerList from '../components/ContainerList';
import { FormControl, FormErrorMessage, ModalFooter, Input, ModalContent, ModalHeader, ModalCloseButton, ModalOverlay, Modal, ModalBody, Text, Button, Box, Heading } from '@chakra-ui/react'

const App = () => {
  const alertMessage = useAlert();
  const refPasswd = useRef(null);
	const [passwd, setPasswd] = useState('')
  const [execCommand, setExecCommand] = useState('')
  const [modalPasswdOpen, setIsModalPasswdOpen] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false)

  useEffect(() => {
		console.log('useEffect => App')
    if (permissionDenied) {
      setIsModalPasswdOpen(true)
    }
  }, [permissionDenied])

  const onSubmit = () => {
    if (refPasswd.current.value !== '') {
			setPasswd(refPasswd.current.value)
      setIsModalPasswdOpen(false)
      setPermissionDenied(false)
    }else{
			alertMessage('error','Password is required')
		}
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSubmit()
    }
  }

  const isError = passwd === ''

  return (
    <Box textAlign='center' p={3}>
      <Heading as="h3" fontSize={20} mb={4}>
        Containers
      </Heading>
      <ContainerList
				passwd={passwd}
				execCommand={execCommand}
				setExecCommand={setExecCommand}
				permissionDenied={permissionDenied}
				setPermissionDenied={setPermissionDenied}
			/>

      <Modal
        isOpen={modalPasswdOpen}
        closeOnEsc={false}
        closeOnOverlayClick={false}
        onClose={() => setIsModalPasswdOpen(false)}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader textAlign='center'>
            Permission Admin
          </ModalHeader>

          <ModalBody>
            <Text p={3}>To continue you need the super user password:</Text>

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
            <Button onClick={onSubmit}>Confirm</Button>
          </ModalFooter>

        </ModalContent>
      </Modal>

    </Box>
  );
}

export default App;
