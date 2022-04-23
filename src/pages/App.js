import { useState, useEffect, } from 'react';

import useAlert from '../core/hooks/useAlert.ts';

import ContainerList from '../components/ContainerList';
import ModalFormPassword from '../components/ModalFormPassword'

import {
  Box,
} from '@chakra-ui/react'

const App = () => {
  const alertMessage = useAlert();
  const [passwd, setPasswd] = useState('')
  const [modalPasswdOpen, setModalPasswdOpen] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(true)

  useEffect(() => {
    if (permissionDenied) {
      setModalPasswdOpen(true)
    }
  }, [permissionDenied])

  const onSubmit = (value) => {
    if (value && value !== '') {
      setPasswd(value)
      setModalPasswdOpen(false)
      setPermissionDenied(false)
    } else {
      alertMessage('error', 'Password is required')
    }
  }

  return (
    <Box textAlign='center' p={3}>

      <ContainerList
        passwd={passwd}
        permissionDenied={permissionDenied}
        setPermissionDenied={setPermissionDenied}
      />

      <ModalFormPassword
        onSubmit={onSubmit}
        modalPasswdOpen={modalPasswdOpen}
        setModalPasswdOpen={setModalPasswdOpen}
      />

    </Box>
  );
}

export default App;
