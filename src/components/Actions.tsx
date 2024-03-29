import React from "react";
import CmdIcon from "./icons/CmdIcon";
import { BiRefresh, } from "react-icons/bi";

import {
  BsStopFill,
  BsFillPlayFill,
  BsFillTrashFill,
  BsFillEyeSlashFill,
} from "react-icons/bs";

import {
  Button,
  SimpleGrid,
} from "@chakra-ui/react";

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
  const btnSize = { w: 50, h: 50 };

  const isContainerSelect = () => containerSelectedLogs && container.id === containerSelectedLogs.id;

  const activeLogs = () => {
    if (isContainerSelect()) {
      disableTerminalLogs(container);
    } else {
      tailContainer(container);
    }
  };

  return (
    <SimpleGrid columns={[1, 2, 3, 4, 5]} spacing={2}>

      <Button
        minW={btnSize.w}
        minH={btnSize.h}
        onClick={activeLogs}
        isDisabled={!container.isRunning}
      >
        {
          isContainerSelect() ?
            <BsFillEyeSlashFill color='#04aa6d' title='close logs' />
            :
            <div title='show logs'>
              <CmdIcon fill='#ffffff' />
            </div>
        }
      </Button>

      <Button
        minW={btnSize.w}
        minH={btnSize.h}
        title='restart container'
        onClick={() => restartContainer(container)}
        isDisabled={!container.isRunning}
      >
        <BiRefresh color='green'/>
      </Button>

      <Button
        minW={btnSize.w}
        minH={btnSize.h}
        title='start container'
        onClick={() => startContainer(container)}
        isDisabled={container.isRunning}
      >
        <BsFillPlayFill color='green' />
      </Button>

      <Button
        minW={btnSize.w}
        minH={btnSize.h}
        title='stop container'
        onClick={() => stopContainer(container)}
        isDisabled={!container.isRunning}
      >
        <BsStopFill color='orange' />
      </Button>

      <Button
        minW={btnSize.w}
        minH={btnSize.h}
        title='remove container'
        onClick={() => removeContainer(container)}
        isDisabled={container.isRunning}
      >
        <BsFillTrashFill color='red' />
      </Button>

    </SimpleGrid>
  );
};

export default Actions;
