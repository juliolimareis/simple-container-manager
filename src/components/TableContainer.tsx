import Id from './Id'
import Actions from './Actions'

import {
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
  Table,
interface TableContainerProps {
  containerList: Container[];
  tailContainer(value: Container): void;
  stopContainer(value: Container): void;
  startContainer(value: Container): void;
  removeContainer(value: Container): void;
  restartContainer(value: Container): void;
  disableTerminalLogs(value: Container): void;
  containerSelectedLogs?: Container;
}

const TableContainer = ({
  containerList,
  tailContainer,
  stopContainer,
  startContainer,
  removeContainer,
  restartContainer,
  disableTerminalLogs,
  containerSelectedLogs,
}: TableContainerProps): JSX.Element => (
  <Table colorScheme='teal'>

    <Thead>
      <Tr>
        <Th>Id</Th>
        <Th>Name</Th>
        <Th>Status</Th>
        <Th>Ports</Th>
        <Th>Size</Th>
        <Th>Actions</Th>
      </Tr>
    </Thead>

    <Tbody>
      {
        containerList.map((container, i) => (
          <Tr key={i}>
            <Td><Id container={container} /></Td>
            <Td>{container.name}</Td>
            <Td>{container.status}</Td>
            <Td>{container.ports}</Td>
            <Td>{container.size}</Td>
            <Td>
              <Actions
                container={container}
                tailContainer={tailContainer}
                stopContainer={stopContainer}
                startContainer={startContainer}
                restartContainer={restartContainer}
                removeContainer={removeContainer}
                disableTerminalLogs={disableTerminalLogs}
                containerSelectedLogs={containerSelectedLogs}
              />
            </Td>
          </Tr>
        ))
      }
    </Tbody>
  </Table>
)

export default TableContainer
