import { AiOutlineFileText } from 'react-icons/ai'

import { BiRefresh } from 'react-icons/bi'

import {
  BsEyeFill,
  BsStopFill,
  BsFillPlayFill,
  BsFillTrashFill,
} from 'react-icons/bs'

import {
  Button,
  SimpleGrid,
interface ActionsProps {
  container: Container;
  containerSelectedLogs?: Container;
  tailContainer(value: Container): void;
  stopContainer(value: Container): void;
  startContainer(value: Container): void;
  removeContainer(value: Container): void;
  restartContainer(value: Container): void;
  disableTerminalLogs(value: Container): void;
}

const Actions = ({
  container,
  tailContainer,
  stopContainer,
  startContainer,
  removeContainer,
  restartContainer,
  disableTerminalLogs,
  containerSelectedLogs,
}: ActionsProps): JSX.Element => {
  const btnSize = { w: 50, h: 50 }

  const isContainerSelect = () => {
    if (containerSelectedLogs && container.id === containerSelectedLogs.id) {
      return true
    } return false
  }

  const activeLogs = () => {
    if (isContainerSelect()) {
      disableTerminalLogs(container)
    } else {
      tailContainer(container)
    }
  }

  return (
    <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={2}>

      <Button
        minW={btnSize.w}
        minH={btnSize.h}
        onClick={activeLogs}
        disabled={!container.isRunning}
      >
        {
          isContainerSelect() ?
            <BsEyeFill color='#04aa6d' title='close logs' />
            :
            <AiOutlineFileText color='#04aacd' title='show logs' />
        }
      </Button>

      <Button
        minW={btnSize.w}
        minH={btnSize.h}
        title='restart container'
        onClick={() => restartContainer(container)}
        disabled={!container.isRunning}
      >
        <BiRefresh color='green' />
      </Button>

      <Button
        minW={btnSize.w}
        minH={btnSize.h}
        title='start container'
        onClick={() => startContainer(container)}
        disabled={container.isRunning}
      >
        <BsFillPlayFill color='green' />
      </Button>

      <Button
        minW={btnSize.w}
        minH={btnSize.h}
        title='stop container'
        onClick={() => stopContainer(container)}
        disabled={!container.isRunning}
      >
        <BsStopFill color='orange' />
      </Button>

      <Button
        minW={btnSize.w}
        minH={btnSize.h}
        title='remove container'
        onClick={() => removeContainer(container)}
        disabled={container.isRunning}
      >
        <BsFillTrashFill color='red' />
      </Button>

    </SimpleGrid>
  )
}

export default Actions
