import { dockerWithoutSudo, dockerSudo, } from "./commands";

const { exec, spawn } = window.require("child_process") as ChildProcessProps;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const DockerCommand = () => {
  const fetchContainerRunning = async (userPassword: string) => (
    new Promise<HandleCommand>((resolve, reject) => {
      const docker = userPassword ? dockerSudo : dockerWithoutSudo;

      exec(
        cmd(docker.listContainersRunning, userPassword), (error, stdout) => {
          if (error) {
            // console.error('stderr:', stderr);
            reject(handleErros(error));
          } else {
            resolve(handleCommand(parseCmdLsToArray(stdout)));
          }
        }
      );
    })
  );

  const fetchContainerStop = async (userPassword: string) => (
    new Promise<HandleCommand>((resolve, reject) => {
      const docker = userPassword ? dockerSudo : dockerWithoutSudo;

      exec(
        cmd(docker.listContainersStop, userPassword), (error, stdout ) => {
          if (error) {
            // console.error('stderr:', stderr);
            reject(handleErros(error));
          } else {
            resolve(handleCommand(parseCmdLsToArray(stdout)));
          }
        }
      );
    })
  );

  const startContainer = (id: string, userPassword: string) => (
    new Promise<void>((resolve, reject) => {
      const docker = userPassword ? dockerSudo : dockerWithoutSudo;

      exec(
        cmdWithId(docker.startContainer, id, userPassword), (error ) => {
          if (error) {
            reject(handleErros(error));
          } else {
            resolve();
          }
        }
      );
    })
  );

  const restartContainer = (id: string, userPassword: string) => (
    new Promise<void>((resolve, reject) => {
      const docker = userPassword ? dockerSudo : dockerWithoutSudo;

      exec(
        cmdWithId(docker.restartContainer, id, userPassword), (error) => {
          if (error) {
            reject(handleErros(error));
          } else {
            resolve();
          }
        }
      );
    })
  );

  const stopContainer = (id: string, userPassword: string) => (
    new Promise<void>((resolve, reject) => {
      const docker = userPassword ? dockerSudo : dockerWithoutSudo;

      exec(
        cmdWithId(docker.stopContainer, id, userPassword), (error) => {
          if (error) {
            reject(handleErros(error));
          } else {
            resolve();
          }
        }
      );
    })
  );

  const removeContainer = (id: string, userPassword: string) => (
    new Promise<void>((resolve, reject) => {
      const docker = userPassword ? dockerSudo : dockerWithoutSudo;

      exec(
        cmdWithId(docker.removeContainer, id, userPassword), (error) => {
          if (error) {
            reject(handleErros(error));
          } else {
            resolve();
          }
        }
      );
    })
  );

  //return object stdout with event.on
  const tailLogsContainer = (id: string, userPassword: string) => {
    const docker = userPassword ? dockerSudo : dockerWithoutSudo;

    return spawn(cmdWithId(docker.tailLogs, id, userPassword), { shell: true });
  };

  const logsContainer = (id: string, userPassword: string) => (
    new Promise<string[]>((resolve, reject) => {
      const docker = userPassword ? dockerSudo : dockerWithoutSudo;

      exec(
        cmdWithId(docker.logs, id, userPassword), (error, stdout) => {
          if (error) {
            reject(handleErros(error));
          } else {
            resolve(stdout.split("\n").reverse());
          }
        }
      );
    })
  );

  const isPermissionDenied = (error: string) => {
    if (
      error.includes("permission denied")
      || error.includes("senha")
      || error.includes("password")
    ) {
      console.log("isPermissionDenied");

      return true;
    }

    return false;
  };

  const handleCommand = (containers: Container[]): HandleCommand => (
    {
      message: containers,
      isPermissionDenied: false
    }
  );

  const handleErros = (error: string): HandleCommand<string> => (
    {
      message: removePasswdInsertInErrorMessage(`${error}`),
      isPermissionDenied: isPermissionDenied(`${error}`),
    }
  );

  const removePasswdInsertInErrorMessage = (error: string) => {
    if(error.includes("sudo")){
      return error.split("|")[1].split("-S")[1];
    }

    return error;
  };

  const cmd = (cmdLine: string, userPassword: string) => {
    return cmdLine.replace("{password}", userPassword);
  };

  const cmdWithId = (cmdLine: string, id: string, userPassword: string) => {
    return cmdLine.replace("{password}", userPassword).replace("{id}", id);
  };

  return {
    restartContainer,
    fetchContainerRunning,
    fetchContainerStop,
    startContainer,
    stopContainer,
    removeContainer,
    logsContainer,
    tailLogsContainer,
    isPermissionDenied,
  };
};

const parseCmdLsToArray = (cmdLs: string): Container[] => {
  const lines = cmdLs.split("\n");

  if (Array.isArray(lines)) {
    //remove last line(empty)
    lines.pop();

    return lines.map((line) => {
      const lineElements = line.split("   ");

      const [
        id,
        image,
        runningFor,
        size,
        status,
        ports,
        name
      ] = lineElements;

      return {
        id,
        image,
        runningFor,
        size,
        status,
        ports,
        name,
        isRunning: !`${status}`.includes("Exited")
      };
    });
  }

  return [];
};

export default DockerCommand;
