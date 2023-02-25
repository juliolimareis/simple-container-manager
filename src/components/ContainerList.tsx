import React, { useState, useEffect, } from "react";

import Terminal from "../components/Terminal";
import TableContainer from "../components/TableContainer";

import useAlert from "../core/hooks/useAlert";
import DockerCommand from "../core/dockerCommand";

import { BiRefresh, } from "react-icons/bi";

import { ChildProcessWithoutNullStreams, } from "child_process";

import {
  Box,
  Heading,
} from "@chakra-ui/react";

interface ContainerList {
  passwd: string;
  permissionDenied: boolean;
  setPermissionDenied(value: boolean): void;
}

interface ExecFunction {
  stop: (container: Container) => void,
  start: (container: Container) => void,
  remove: (container: Container) => void,
  restart: (container: Container) => void,
  getAllContainers: () => void,
}

const ContainerList = ({
  passwd,
  permissionDenied,
  setPermissionDenied,
}: ContainerList): JSX.Element => {
  const alertMessage = useAlert();

  const {
    stopContainer,
    startContainer,
    removeContainer,
    tailLogsContainer,
    isPermissionDenied,
    fetchContainerStop,
    fetchContainerRunning,
  } = DockerCommand();

  const [tailLogs, setTailLogs] = useState<ChildProcessWithoutNullStreams>();
  const [containerList, setContainerList] = useState<Container[]>([]);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [openTerminal, setOpenTerminal] = useState(false);
  const [lastCommand, setLastCommand] = useState<keyof ExecFunction>();
  const [containerListStop, setContainerListStop] = useState<Container[]>([]);
  const [containerSelected, setContainerSelected] = useState<Container>();
  const [containerSelectedLogs, setContainerSelectedLogs] = useState<Container>();

  useEffect(() => {
    if (!permissionDenied) {
      if (lastCommand && containerSelected) {
        execFunction[lastCommand](containerSelected);
        setLastCommand(undefined);
      } else {
        getAllContainers();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwd, permissionDenied]);

  useEffect(() => {
    if (openTerminal && tailLogs) {
      tailLogs.stdout.setEncoding("utf8");

      tailLogs.stdout.on("data", data => {
        setTerminalLines(`${data}`.split("\n").reverse());
      });

      tailLogs.on("error", error => {
        if (isPermissionDenied(`${error}`)) {
          setPermissionDenied(true);
        }

        console.log(error);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tailLogs]);

  const getAllContainers = () => {
    setContainerList([]);
    setContainerListStop([]);

    fetchContainerRunning(passwd).then(response => {
      setContainerList(response.message);
    }).catch(error => handleError(error, "getAllContainers"));

    fetchContainerStop(passwd).then(response => {
      setContainerListStop(response.message);
    }).catch(error => handleError(error, "getAllContainers"));
  };

  const tailContainer = (container: Container) => {
    setTailLogs(tailLogsContainer(container.id, passwd));
    setOpenTerminal(true);
    setContainerSelected(container);
    setContainerSelectedLogs(container);
  };

  const start = (container: Container) => {
    setContainerSelected(container);
    startContainer(container.id, passwd).then(() => {
      getAllContainers();
      alertMessage(
        "success",
        "Container ".concat(container.name, " is running.")
      );
    }).catch(error => handleError(error, "start"));
  };

  const restart = (container: Container) => {
    setContainerSelected(container);
    startContainer(container.id, passwd).then(() => {
      getAllContainers();
      alertMessage(
        "success",
        String(container.name).concat(" has been restarted.")
      );
    }).catch(error => handleError(error, "restart"));
  };

  const stop = (container: Container) => {
    setContainerSelected(container);
    stopContainer(container.id, passwd).then(() => {
      getAllContainers();
      alertMessage(
        "success",
        "Container ".concat(container.name, " is stopped.")
      );
      if (isContainerSelectLogs(container)) {
        disableTerminalLogs(container);
      }
    }).catch(error => handleError(error, "stop"));
  };

  const remove = (container: Container) => {
    setContainerSelected(container);
    removeContainer(container.id, passwd).then(() => {
      getAllContainers();
      alertMessage(
        "success",
        "Container ".concat(container.name, " has been removed.")
      );
    }).catch(error => handleError(error));
  };

  const handleError = (error: HandleCommand<string>, lastCommandName?: keyof ExecFunction) => {
    if (error.isPermissionDenied) {
      setPermissionDenied(true);
      setLastCommand(lastCommandName);
    } else {
      alertMessage("error", error.message);
      console.log(error);
    }
  };

  const isContainerSelectLogs = (container: Container) => {
    if (containerSelectedLogs && container.id === containerSelectedLogs.id) {
      return true;
    }

    return false;
  };

  const execFunction = {
    stop,
    start,
    remove,
    restart,
    getAllContainers,
  };

  const disableTerminalLogs = (container: Container) => {
    if (isContainerSelectLogs(container)) {
      setOpenTerminal(false);
      setTailLogs(undefined);
      setContainerSelectedLogs(undefined);
    }
  };

  return (
    <Box>
      {
        openTerminal && containerSelectedLogs && (
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

      <Box textAlign='center' mt={10}>
        <Heading as="h3" fontSize={20} mt={6}>
          Stop Containers
        </Heading>
      </Box>

      <TableContainer
        stopContainer={stop}
        startContainer={start}
        restartContainer={restart}
        removeContainer={remove}
        containerList={containerListStop}
        tailContainer={tailContainer}
        disableTerminalLogs={disableTerminalLogs}
        containerSelectedLogs={containerSelectedLogs}
      />

    </Box>
  );
};

export default ContainerList;
