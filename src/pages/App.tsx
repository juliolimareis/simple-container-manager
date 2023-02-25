import { useState, useEffect, } from 'react';

import useAlert from '../core/hooks/useAlert.ts';

import ContainerList from '../components/ContainerList';
import ModalFormPassword from '../components/ModalFormPassword'

import {
  Box,
} from '@chakra-ui/react'

const App = (): JSX.Element => {
  const [modalPasswdOpen, setModalPasswdOpen] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(true)

  useEffect(() => {
    if (permissionDenied) {
      setModalPasswdOpen(true)
    }
  }, [permissionDenied])

  const onSubmit = (value: string) => {

  return (
    <Box textAlign='center' p={3}>

      <ContainerList
        passwd={passwd}
        permissionDenied={permissionDenied}
        setPermissionDenied={setPermissionDenied}
      />

      <ModalFormPassword
        onSubmit={onSubmit}
        isOpen={modalPasswdOpen}
        setOpen={setModalPasswdOpen}
      />

    </Box>
  );
}

export default App;
