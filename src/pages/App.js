import useAlert from '../core/hooks/useAlert.ts';
import { SystemContext } from '../core/SystemContext';
import { useState, useContext, useEffect } from 'react';
import ContainerList from '../components/ContainerList';
import { FormControl, FormErrorMessage, ModalFooter, Input, ModalContent, ModalHeader, ModalCloseButton, ModalOverlay, Modal, ModalBody, Text, Button, Box, Heading } from '@chakra-ui/react'

const App = () => {
	const alertMessage = useAlert();
	const { passwd, setPasswd, permissionDenied, setPermissionDenied } = useContext(SystemContext)
	const [ modalPasswdOpen, setIsModalPasswdOpen ] = useState(true);

	useEffect(() => {
		setIsModalPasswdOpen(permissionDenied);
	},[permissionDenied])

	const onSubmit = () => {
		if(passwd != ''){
			setIsModalPasswdOpen(false)
			setPermissionDenied(false)
			console.log('passwd: ', passwd);
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
			<ContainerList />
			
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
						
						<FormControl isInvalid={isError}>
							<Input			
								autoFocus	
								type='password'
								value={passwd}
								placeholder='sudo password'
								onKeyDown={handleKeyDown}
								onChange={(event) => setPasswd(event.target.value)}
							/>

							<FormErrorMessage>Password is required.</FormErrorMessage>

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
