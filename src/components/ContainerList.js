import { useState, useEffect } from 'react';
import { AiOutlineFileText } from 'react-icons/ai'
import useAlert from '../core/hooks/useAlert.ts';
import DockerCommand from '../core/dockerCommand'
import { BsFillPlayFill, BsStopFill, BsFillTrashFill } from 'react-icons/bs'
import { Text, SimpleGrid, Button, Box, TableContainer, Table, TableCaption, Thead, Tr, Td, Th, Tbody, Tfoot } from '@chakra-ui/react'

const ContainerList = ({
  passwd,
  permissionDenied,
  setPermissionDenied,
}) => {

  const alertMessage = useAlert()

  const {
    fetchContainer,
    stopContainer,
    startContainer,
    removeContainer
  } = DockerCommand();

  const [containerList, setContainerList] = useState([])

  useEffect(() => {
    if (!permissionDenied) {
      fetch()
    }
  }, [passwd, permissionDenied])

  const fetch = () => {
    fetchContainer(passwd).then(response => {
      // console.log(response)
      setContainerList(response.message)
    }).catch(error => handleError(error))
  }

  const start = (container) => {
    startContainer(container.id, passwd).then(() => {
      fetch()
      alertMessage(
        "success",
        "Container ".concat(container.name, " is running.")
      )
    }).catch(error => handleError(error))
  }

  const stop = (container) => {
    stopContainer(container.id, passwd).then(() => {
      fetch()
      alertMessage(
        "success",
        "Container ".concat(container.name, " is stopped.")
      )
    }).catch(error => handleError(error))
  }

  const remove = (container) => {
    removeContainer(container.id, passwd).then(() => {
      fetch()
      alertMessage(
        "success",
        "Container ".concat(container.name, " has been removed.")
      )
    }).catch(error => handleError(error))
  }

  const handleError = (error) => {
    if (error.isPermissionDenied) {
      setPermissionDenied(true)
      console.log('Erro permisson denied!')
    } else {
      alertMessage('error', error.message)
      console.log(error)
    }
  }

  return (
    <TableContainer>
      <Table colorScheme='teal'>

        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Name</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>

        <Tbody>
          {
            containerList.map((container, i) => (
              <Tr key={i}>
                <Td><Id container={container} /></Td>
                <Td>{container.name}</Td>
                <Td>{container.status}</Td>
                <Td>
                  <Actions
                    container={container}
                    startContainer={start}
                    stopContainer={stop}
                    removeContainer={remove}
                  />
                </Td>
              </Tr>
            ))
          }

        </Tbody>
      </Table>
    </TableContainer>
  )
}

const Actions = ({
  container,
  stopContainer,
  startContainer,
  removeContainer,
}) => {

  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing={1}>
      <Button
        title='Show logs'
        // onClick={() => showContainer(container.id)}
        disabled={!container.isRunning}
      >
        <AiOutlineFileText color='white' />
      </Button>
      <Button
        title='Start container'
        onClick={() => startContainer(container)}
        disabled={container.isRunning}
      >
        <BsFillPlayFill color='green' />
      </Button>
      <Button
        title='Stop container'
        onClick={() => stopContainer(container)}
        disabled={!container.isRunning}
      >
        <BsStopFill color='orange' />
      </Button>
      <Button
        title='Remove container'
        onClick={() => removeContainer(container)}
        disabled={container.isRunning}
      >
        <BsFillTrashFill color='red' />
      </Button>
    </SimpleGrid>
  )
}

const Id = ({ container }) => {
  return (
    <Box as='span' textAlign='center' display='flex'>
      <Box
        w={2}
        h={2}
        mr={2}
        mt={1}
        borderRadius='100%'
        backgroundColor={
          container.isRunning ? '#04aa6d' : 'red'
        }
        title={container.isRunning ? 'Running' : 'Stopped'}
      />
      <Text>{container.id}</Text>
    </Box>
  )
}

export default ContainerList
