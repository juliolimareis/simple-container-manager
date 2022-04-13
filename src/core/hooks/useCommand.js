import { useState } from 'react';
import command from "../commands";

const { exec } = window.require("child_process");

const useCommand = (userPassword) => {
	const [error, setError] = useState('');
	const [containers, setContainers] = useState([]);
	const [isPermissionDenied, setPermissionDenied] = useState(false);
	//para forçar o reload do container
	const [commandName, setCommandName] = useState('');

	const handleError = (err) => {
		console.log(err);
		if(
				err.includes('permission denied')
				|| err.includes('senha')
				|| err.includes('password') != -1
			){
			setPermissionDenied(true);
		}
	}

  const fetchContainers = () => {
		console.log('fetchContainers');
    exec(
			cmd(command.listContainers), (error, stdout, stderr) => {
				if (error) {
					addErros(error);
				}else{
					// console.error('stderr:', stderr);
					setContainers(parseCmdLsToArray(stdout));
					removeErros()
				}
    	}
		);
  }
  
	const startContainer = (id) => {
    exec(
			cmdWithId(command.startContainer, id), (error, stdout, stderr) => {
				if (error) {
					addErros(error);
				}else{
					setCommandName('startContainer');
					removeErros()
				}
    	}
		);
  }
	
	const stopContainer = (id) => {
    exec(
			cmdWithId(command.stopContainer, id), (error, stdout, stderr) => {
				if (error) {
					addErros(error);
				}else{
					setCommandName('stopContainer');
					removeErros()
				}
    	}
		);
  }
	
	const removeContainer = (id) => {
    exec(
			cmdWithId(command.removeContainer, id), (error, stdout, stderr) => {
				if (error) {
					addErros(error);
				}else{
					setCommandName('removeContainer');
					removeErros()
				}
    	}
		);
  }

	const removeErros = () => {
		setError(undefined);
		setPermissionDenied(false);
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
		containers, 
		stopContainer,
		startContainer,
		fetchContainers,
		removeContainer,
		isPermissionDenied, 
	}
}

const parseCmdLsToArray = (cmdLs) => {
	return cmdLs.split('\n').map(line => {
		// const [id, image, command, created, status, names, ports] = line.split('   ');
		const lineArray = line.split('   ');
		const infoArray = []

		lineArray.map(item => {
			if(item.trim()){
				infoArray.push(item);
			}
		})

		if(infoArray.length < 7){
			infoArray.push('');
		}

		if(infoArray[4]?.indexOf('Exited') !== -1){
			infoArray.push(false)
		}else{
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
		if (item.id && !item.id.includes("CONTAINER ID")){
			return item
		}
	}
);
}

export default useCommand