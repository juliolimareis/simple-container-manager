import { AiOutlineFileText } from 'react-icons/ai'
import useAlert from '../core/hooks/useAlert.ts';
import useCommand from '../core/hooks/useCommand';
import { SystemContext } from '../core/SystemContext';
import { useState, useEffect, useContext } from 'react';
import { BsFillPlayFill, BsStopFill, BsFillTrashFill } from 'react-icons/bs'
import { Text, SimpleGrid, Button, Box, TableContainer, Table, TableCaption, Thead, Tr, Td, Th, Tbody, Tfoot } from '@chakra-ui/react'

const ContainerList = ({
  passwd,
  execCommand,
  setExecCommand,
  permissionDenied,
  setPermissionDenied,
}) => {
  // const { passwd, setPermissionDenied, execCommand } = useContext(SystemContext)
  const {
    containers,
    setContainers,
    fetchContainers,
    cmdPermissionDenied,
    setCmdPermissionDenied
  } = useCommand(passwd);

  const [containerList, setContainerList] = useState([])

  useEffect(() => {
    if (containerList !== containers) {
      setContainerList(containers)
    }
  }, [containers])

  useEffect(() => {
    console.log('useEffect => ContainerList: passwd: ', passwd)
    if (cmdPermissionDenied) {
      console.log('ContainerList: if: isPermissionDenied', cmdPermissionDenied)
      setPermissionDenied(true)
      setCmdPermissionDenied(false)
    }
  }, [cmdPermissionDenied])

  useEffect(() => {
		if(passwd){
			fetchContainers()
		}
  }, [permissionDenied, passwd])

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
                    passwd={passwd}
                    container={container}
                    containers={containers}
                    setContainers={setContainers}
                    fetchContainers={fetchContainers}
                    execCommand={execCommand}
                    setExecCommand={setExecCommand}
                    permissionDenied={permissionDenied}
                    setPermissionDenied={setPermissionDenied}
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
  passwd,
  container,
  containers,
  setContainers,
  execCommand,
  setExecCommand,
  fetchContainers,
  permissionDenied,
  setPermissionDenied,
}) => {
  // const { passwd, setPermissionDenied, setExecCommand } = useContext(SystemContext)
  const alertMessage = useAlert()
  const {
    error,
    stopContainer,
    startContainer,
    removeContainer,
    cmdPermissionDenied,
    setCmdPermissionDenied,
  } = useCommand(passwd);

	useEffect(() => {
		// console.log('isRunning ', container.isRunning)
  }, [execCommand])

  useEffect(() => {
    // console.log('Actions => useEffect')
    if (cmdPermissionDenied) {
      setPermissionDenied(true)
      setCmdPermissionDenied(false)
    }
  }, [cmdPermissionDenied])

  useEffect(() => {
    if (error) {
      alertMessage('error', error)
    } else {
      // alertMessage('success', container.name.concat(' started!'))
    }
  }, [error])

  const start = () => {
    startContainer(container.id);
    // setExecCommand('startContainer'.concat("-", container.id))
  }

  const stop = () => {
    stopContainer(container.id);
    // setExecCommand('stopContainer'.concat("-", container.id))
  }

  const remove = () => {
    removeContainer(container.id);
    // setExecCommand('removeContainer'.concat("-", container.id))
  }

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
        onClick={start}
        disabled={container.isRunning}
      >
        <BsFillPlayFill color='green' />
      </Button>
      <Button
        title='Stop container'
        onClick={stop}
        disabled={!container.isRunning}
      >
        <BsStopFill color='orange' />
      </Button>
      <Button
        title='Remove container'
        onClick={remove}
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
