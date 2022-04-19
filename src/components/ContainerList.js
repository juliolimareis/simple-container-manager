import { useState, useEffect } from 'react'

import Terminal from '../components/Terminal'
import TableContainer from '../components/TableContainer'

import useAlert from '../core/hooks/useAlert.ts'
import DockerCommand from '../core/dockerCommand'

import { BiRefresh } from 'react-icons/bi'

import {
  Box,
  Heading,
} from '@chakra-ui/react'

const ContainerList = ({
  passwd,
  permissionDenied,
  setPermissionDenied,
}) => {

  const alertMessage = useAlert()

  const {
    stopContainer,
    fetchContainer,
    startContainer,
    removeContainer,
    tailLogsContainer,
    isPermissionDenied,
  } = DockerCommand();

  const [tailLogs, setTailLogs] = useState(undefined)
  const [containerList, setContainerList] = useState([])
  const [terminalLines, setTerminalLines] = useState([])
  const [openTerminal, setOpenTerminal] = useState(false)
  const [lastCommand, setLastCommand] = useState(undefined)
  const [containerSelected, setContainerSelected] = useState(undefined)
  const [containerSelectedLogs, setContainerSelectedLogs] = useState(undefined)

  useEffect(() => {
    if (!permissionDenied) {
      if (lastCommand) {
        execFunction[lastCommand](containerSelected)
        setLastCommand(undefined)
      } else {
        getAllContainers()
      }
    }
  }, [passwd, permissionDenied])

  useEffect(() => {
    if (openTerminal && tailLogs) {
      tailLogs.stdout.setEncoding('utf8');
      tailLogs.stdout.on('data', data => {
        setTerminalLines(`${data}`.split('\n').reverse())
      })
      tailLogs.on('error', error => {
        if (isPermissionDenied(`${error}`)) {
          setPermissionDenied(true)
        }
        console.log(error)
      })
    }
  }, [tailLogs])

  const getAllContainers = () => {
    setContainerList([])
    fetchContainer(passwd).then(response => {
      setContainerList(response.message)
    }).catch(error => handleError(error, 'getAllContainers'))
  }

  const tailContainer = (container) => {
    setTailLogs(tailLogsContainer(container.id, passwd))
    setOpenTerminal(true)
    setContainerSelected(container)
    setContainerSelectedLogs(container)
  }

  const start = (container) => {
    setContainerSelected(container)
    startContainer(container.id, passwd).then(() => {
      getAllContainers()
      alertMessage(
        "success",
        "Container ".concat(container.name, " is running.")
      )
    }).catch(error => handleError(error, 'start'))
  }

  const restart = (container) => {
    setContainerSelected(container)
    startContainer(container.id, passwd).then(() => {
      getAllContainers()
      alertMessage(
        "success",
        String(container.name).concat(" has been restarted.")
      )
    }).catch(error => handleError(error, 'restart'))
  }

  const stop = (container) => {
    setContainerSelected(container)
    stopContainer(container.id, passwd).then(() => {
      getAllContainers()
      alertMessage(
        "success",
        "Container ".concat(container.name, " is stopped.")
      )
      if (isContainerSelectLogs(container)) {
        disableTerminalLogs(container)
      }
    }).catch(error => handleError(error, 'stop'))
  }

  const remove = (container) => {
    setContainerSelected(container)
    removeContainer(container.id, passwd).then(() => {
      getAllContainers()
      alertMessage(
        "success",
        "Container ".concat(container.name, " has been removed.")
      )
    }).catch(error => handleError(error))
  }

  const handleError = (error, lastCommandName) => {
    if (error.isPermissionDenied) {
      setPermissionDenied(true)
      setLastCommand(lastCommandName)
    } else {
      alertMessage('error', error.message)
      console.log(error)
    }
  }

  const isContainerSelectLogs = (container) => {
    if (containerSelectedLogs && container.id == containerSelectedLogs.id) {
      return true
    } return false
  }

  const execFunction = {
    stop,
    start,
    remove,
    restart,
    getAllContainers,
  }

  const disableTerminalLogs = (container) => {
    if (isContainerSelectLogs(container)) {
      setOpenTerminal(false)
      setTailLogs(undefined)
      setContainerSelectedLogs(undefined)
    }
  }

  return (
    <Box>
      {
        openTerminal && (
          <Terminal container={containerSelectedLogs} terminalLines={terminalLines} />
        )
      }

      <Box textAlign='center'>
        <Heading as="h3" fontSize={20} mt={6}>
          Containers
          <BiRefresh onClick={getAllContainers} color="#04aacd" fontSize={25} cursor='pointer' title="refresh container list" />
        </Heading>
      </Box>

      <TableContainer
        stopContainer={stop}
        startContainer={start}
        restartContainer={restart}
        removeContainer={remove}
        containerList={containerList}
        tailContainer={tailContainer}
        disableTerminalLogs={disableTerminalLogs}
        containerSelectedLogs={containerSelectedLogs}
      />
    </Box>
  )
}

export default ContainerList
