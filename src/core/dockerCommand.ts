import { dockerWithoutSudo, dockerSudo, } from "./commands";

const { exec, spawn } = window.require("child_process") as ChildProcessProps;

const DockerCommand = () => {
  const fetchContainerRunning = async (userPassword: string) => (
    new Promise<HandleCommand>((resolve, reject) => {
      const docker = userPassword ? dockerSudo : dockerWithoutSudo;

  const fetchContainerRunning = async (userPassword) => (
    new Promise((resolve, reject) => {
      exec(
        cmd(docker.listContainersRunning, userPassword), (error, stdout, stderr) => {
          if (error) {
            // console.error('stderr:', stderr);
            reject(handleErros(error));
          } else {
            resolve(handleCommand(parseCmdLsToArray(stdout)))
          }
        }
      );
    })
  )

  const fetchContainerStop = async (userPassword: string) => (
    new Promise<HandleCommand>((resolve, reject) => {
      const docker = userPassword ? dockerSudo : dockerWithoutSudo;
      exec(
        cmd(docker.listContainersStop, userPassword), (error, stdout, stderr) => {
          if (error) {
            // console.error('stderr:', stderr);
            reject(handleErros(error));
          } else {
            resolve(handleCommand(parseCmdLsToArray(stdout)))
          }
        }
      );
    })
  )

  const startContainer = (id: string, userPassword: string) => (
    new Promise<void>((resolve, reject) => {
      const docker = userPassword ? dockerSudo : dockerWithoutSudo;
      exec(
        cmdWithId(docker.startContainer, id, userPassword), (error, stdout, stderr) => {
          if (error) {
            reject(handleErros(error))
          } else {
            resolve()
          }
        }
      );
    })
  )

  const restartContainer = (id: string, userPassword: string) => (
    new Promise<void>((resolve, reject) => {
      const docker = userPassword ? dockerSudo : dockerWithoutSudo;
      exec(
        cmdWithId(docker.restartContainer, id, userPassword), (error, stdout, stderr) => {
          if (error) {
            reject(handleErros(error))
          } else {
            resolve()
          }
        }
      );
    })
  )

  const stopContainer = (id: string, userPassword: string) => (
    new Promise<void>((resolve, reject) => {
      const docker = userPassword ? dockerSudo : dockerWithoutSudo;
      exec(
        cmdWithId(docker.stopContainer, id, userPassword), (error, stdout, stderr) => {
          if (error) {
            reject(handleErros(error))
          } else {
            resolve()
          }
        }
      );
    })
  )

  const removeContainer = (id: string, userPassword: string) => (
    new Promise<void>((resolve, reject) => {
      const docker = userPassword ? dockerSudo : dockerWithoutSudo;
      exec(
        cmdWithId(docker.removeContainer, id, userPassword), (error, stdout, stderr) => {
          if (error) {
            reject(handleErros(error))
          } else {
            resolve()
          }
        }
      );
    })
  )

  //return object stdout with event.on
  const tailLogsContainer = (id: string, userPassword: string) => {
    const docker = userPassword ? dockerSudo : dockerWithoutSudo;

  const logsContainer = (id: string, userPassword: string) => (
    new Promise<string[]>((resolve, reject) => {
      const docker = userPassword ? dockerSudo : dockerWithoutSudo;
      exec(
        cmdWithId(docker.logs, id, userPassword), (error, stdout, stderr) => {
          if (error) {
            reject(handleErros(error))
          } else {
            resolve(stdout.split('\n').reverse())
          }
        }
      );
    })
  )

  const isPermissionDenied = (error: string) => {
    if (
      error.includes('permission denied')
      || error.includes('senha')
      || error.includes('password')
    ) {
      console.log('isPermissionDenied');
      return true
    } return false
  }

  const handleCommand = (containers: Container[]): HandleCommand => (
    {
      message: stdout,
      isPermissionDenied: false
    }
  )

  const handleErros = (error: string): HandleCommand<string> => (
    {
      message: removePasswdInsertInErrorMessage(`${error}`),
      isPermissionDenied: isPermissionDenied(`${error}`),
    }
  )

  const removePasswdInsertInErrorMessage = (error) => {
    return error.split('|')[1].split('-S')[1]
  }

  const cmd = (cmdLine: string, userPassword: string) => {

  const cmdWithId = (cmdLine: string, id: string, userPassword: string) => {
    return cmdLine.replace('{password}', userPassword).replace('{id}', id)
  }

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
const parseCmdLsToArray = (cmdLs: string): Container[] => {

const parseCmdLsToArray = (cmdLs) => {
  const lines = cmdLs.split('\n')
  if (Array.isArray(lines)) {
    //remove last line(empty)
    lines.pop()
    return lines.map((line) => {
      const lineElements = line.split('   ')

      const [
        id,
        image,
        runningFor,
        size,
        status,
        ports,
        name
      ] = lineElements
      return {
        id,
        image,
        runningFor,
        size,
        status,
        ports,
        name,
        isRunning: !`${status}`.includes('Exited')
      }
    })
  }
  return []
}

export default DockerCommand
