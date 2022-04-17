import { docker } from "./commands";

const { exec } = window.require("child_process");

const DockerCommand = () => {

  const fetchContainer = async (userPassword) => (
    new Promise((resolve, reject) => {
      exec(
        cmd(docker.listContainers, userPassword), (error, stdout, stderr) => {
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
            resolve(handleCommand(stdout))
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
            resolve(handleCommand(stdout))
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
            resolve(handleCommand(stdout))
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
    return error.split('|')[1]
  }

  const cmd = (cmdLine, userPassword) => {
    return cmdLine.replace('{password}', userPassword)
  }

  const cmdWithId = (cmdLine, id, userPassword) => {
    return cmdLine.replace('{password}', userPassword).replace('{id}', id)
  }

  return {
    fetchContainer,
    startContainer,
    stopContainer,
    removeContainer
  }
}

const parseCmdLsToArray = (cmdLs) => {
  return cmdLs.split('\n').map(line => {
    // const [id, image, command, created, status, names, ports] = line.split('   ');
    const lineArray = line.split('   ');
    const infoArray = []

    lineArray.map(item => {
      if (item.trim()) {
        infoArray.push(item);
      }
    })

    if (infoArray.length < 7) {
      infoArray.push('');
    }

    if (infoArray[4]?.indexOf('Exited') !== -1) {
      infoArray.push(false)
    } else {
      infoArray.push(true)
    }

    // console.log(infoArray);

    return {
      id: infoArray[0],
      image: infoArray[1],
      command: infoArray[2],
      created: infoArray[3],
      status: infoArray[4],
      name: infoArray[5],
      ports: infoArray[6],
      isRunning: infoArray[7]
    }

    // 	const [id, image, command, created, status, name, ports] = lineArray

    // 	return {
    // 		id,
    // 		image,
    // 		command,
    // 		created,
    // 		status,
    // 		name,
    // 		ports
    // 	}

  }).filter(item => {
    if (item.id && !item.id.includes("CONTAINER ID")) {
      return item
    }
  });
}

export default DockerCommand
