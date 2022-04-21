import { docker } from "./commands";

const { exec, spawn } = window.require("child_process");

const DockerCommand = () => {

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

  const fetchContainerStop = async (userPassword) => (
    new Promise((resolve, reject) => {
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

  const startContainer = (id, userPassword) => (
    new Promise((resolve, reject) => {
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

  const restartContainer = (id, userPassword) => (
    new Promise((resolve, reject) => {
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

  const stopContainer = (id, userPassword) => (
    new Promise((resolve, reject) => {
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

  const removeContainer = (id, userPassword) => (
    new Promise((resolve, reject) => {
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
  const tailLogsContainer = (id, userPassword) => (
    spawn(cmdWithId(docker.tailLogs, id, userPassword), [], { shell: true })
  )

  const logsContainer = (id, userPassword) => (
    new Promise((resolve, reject) => {
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

  const isPermissionDenied = (error) => {
    // console.log(error)
    if (
      error.includes('permission denied')
      || error.includes('senha')
      || error.includes('password')
    ) {
      console.log('isPermissionDenied');
      return true
    } return false
  }

  const handleCommand = (stdout) => (
    {
      message: stdout,
      isPermissionDenied: false
    }
  )

  const handleErros = (error) => (
    {
      message: removePasswdInsertInErrorMessage(`${error}`),
      isPermissionDenied: isPermissionDenied(`${error}`),
    }
  )

  const removePasswdInsertInErrorMessage = (error) => {
    return error.split('|')[1].split('-S')[1]
  }

  const cmd = (cmdLine, userPassword) => {
    return cmdLine.replace('{password}', userPassword)
  }

  const cmdWithId = (cmdLine, id, userPassword) => {
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
  }
}

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
