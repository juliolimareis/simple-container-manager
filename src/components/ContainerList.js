import { AiOutlineFileText } from 'react-icons/ai'
import useAlert from '../core/hooks/useAlert.ts';
import useCommand from '../core/hooks/useCommand';
import { SystemContext } from '../core/SystemContext';
import { useState, useEffect, useContext } from 'react';
import { BsFillPlayFill, BsStopFill, BsFillTrashFill } from 'react-icons/bs'
import { useToast, Text, SimpleGrid, Button, Box, TableContainer, Table, TableCaption, Thead, Tr, Td, Th, Tbody, Tfoot } from '@chakra-ui/react'

const ContainerList = () => {
	const toast = useToast()
	const { passwd, setPasswd, permissionDenied, setPermissionDenied } = useContext(SystemContext)
	const { fetchContainers, commandName, containers, error, isPermissionDenied } = useCommand(passwd);
	const [containersList, setContainersList] = useState([]);

	useEffect(() => fetchContainers(),[])

	useEffect(() => {
		if(isPermissionDenied){
			// setPasswd(undefined)
			setPermissionDenied(true)
		}else if(error){
			//error...
		}else{
			setContainersList(containers);
		}
	}, [containers, error, isPermissionDenied, permissionDenied, commandName])

	return (
		<TableContainer>
			<Table colorScheme='teal'>
				
				<Thead>
					<Tr>
						<Th>Id</Th>
						<Th>Name</Th>
						<Th>Status</Th>
						<Th>Actions</Th>
					</Tr>
				</Thead>

				<Tbody>
					{
						containersList.map((container, i) => (
							<Tr key={i}>
								<Td><Id container={container}/></Td>
								<Td>{container.name}</Td>
								<Td>{container.status}</Td>
								<Td><Actions container={container} fetchContainers={fetchContainers}/></Td>
							</Tr>
						))
					}
				</Tbody>

			</Table>
		</TableContainer>
	)
}

const Id = ({container}) => {
	return (
		<Box as='span' textAlign='center' display='flex'>
			<Box 
				w={2}
				h={2}
				mr={2}
				mt={1}
				borderRadius='100%'
				backgroundColor={
					container.isRunning ? '#04aa6d' : 'red'
				}
				title={container.isRunning ? 'Running' : 'Stopped'}
			/>		
			<Text>{container.id}</Text>
		</Box>
	)
}

const Actions = ({container, fetchContainers}) => {
	const { passwd, setPermissionDenied } = useContext(SystemContext)
	const { 
		error,
		stopContainer,
		startContainer,
		removeContainer,
		isPermissionDenied,
	} = useCommand(passwd);
	const alertMessage = useAlert()

	useEffect(() => {
		if(isPermissionDenied){
			setPermissionDenied(true)
		}else if(error){
			alertMessage('error', error)
		}else{
			// alertMessage('success', container.name.concat(' started!'))
		}
	},[error, isPermissionDenied])

	const start = (container) => {
		startContainer(container.id); 
		fetchContainers()
	}
	const stop = (container) => {
		stopContainer(container.id); 
		fetchContainers()
	}
	const remove = (container) => {
		removeContainer(container.id); 
		fetchContainers()
	}

	return (
		<SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
			<Button 
				title='Show logs'
				// onClick={() => showContainer(container.id)}
				disabled={!container.isRunning}
			>
				<AiOutlineFileText color='white'/>
			</Button>
			<Button 
				title='Start container'
				onClick={() => start(container)}
				disabled={container.isRunning}
			>
				<BsFillPlayFill color='green'/>
			</Button>
			<Button 
				title='Stop container'
				onClick={() => stop(container.id)}
				disabled={!container.isRunning}
			>
				<BsStopFill color='orange'/>
			</Button>
			<Button 
				title='Remove container'
				onClick={() => remove(container.id)}
				disabled={container.isRunning}
			>
				<BsFillTrashFill color='red'/>
			</Button>
		</SimpleGrid>
	)
}

export default ContainerList
