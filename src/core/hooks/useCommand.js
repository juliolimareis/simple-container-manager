import { useEffect, useState } from 'react';
import { docker, listTest } from "../commands";

const { exec } = window.require("child_process");

const useCommand = (userPassword) => {

  const [error, setError] = useState('');
  const [containers, setContainers] = useState([]);
  const [cmdPermissionDenied, setCmdPermissionDenied] = useState(false);

	useEffect(() => {
		console.log(containers)
		setContainers(containers)
	}, [containers])

  const handleError = (err) => {
    console.log(err)
    if (
      err.includes('permission denied')
      || err.includes('senha')
      || err.includes('password')
    ) {
      console.log('isPermissionDenied: ', cmdPermissionDenied);
      setCmdPermissionDenied(true);
    }
  }

	// const execTest = async () => {
	// 	return new Promise((resolve) => {
	// 		setTimeout(resolve, 500);
	// 	}).then(() => {
	// 		const newList = listTest
	// 		newList[0].isRunning = newList[0].isRunning ? false : true
	// 		newList[1].isRunning = newList[1].isRunning ? false : true
	// 		setContainers(newList)
	// 	})
	// }

  const fetchContainers = () => {
    console.log("useCommand => fetchContainers")
		// execTest()
    exec(
      cmd(docker.listContainers), (error, stdout, stderr) => {
        if (error) {
          addErros(error);
        } else {
					const newList = listTest
					newList[0].isRunning = newList[0].isRunning ? false : true
					newList[1].isRunning = newList[1].isRunning ? false : true
          setContainers(newList);
          // console.error('stderr:', stderr);
          // setContainers(parseCmdLsToArray(stdout));
          removeErros()
        }
      }
    );
  }

  const startContainer = (id) => {
		// execTest()
    exec(
      cmdWithId(docker.startContainer, id), (error, stdout, stderr) => {
        if (error) {
          addErros(error);
        } else {
          removeErros()
          fetchContainers()
        }
      }
    );
  }

  const stopContainer = (id) => {
		// execTest()
    exec(
      cmdWithId(docker.stopContainer, id), (error, stdout, stderr) => {
        if (error) {
          addErros(error);
        } else {
          removeErros()
          fetchContainers()
        }
      }
    );
  }

  const removeContainer = (id) => {
    exec(
      cmdWithId(docker.removeContainer, id), (error, stdout, stderr) => {
        if (error) {
          addErros(error);
        } else {
          removeErros()
          fetchContainers()
        }
      }
    );
  }

  const removeErros = () => {
    setError(undefined);
    setCmdPermissionDenied(false);
  }

  const addErros = (err) => {
    setError(`${err}`);
    handleError(`${err}`);
    // console.error('exec error', err);
  }

  const cmd = (cmdLine) => {
    return cmdLine.replace('{password}', userPassword)
  }

  const cmdWithId = (cmdLine, id) => {
    return cmdLine.replace('{password}', userPassword).replace('{id}', id)
  }

  return {
    error,
    setError,
    containers,
    setContainers,
    stopContainer,
    startContainer,
    fetchContainers,
    removeContainer,
    cmdPermissionDenied,
    setCmdPermissionDenied
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

export default useCommand
