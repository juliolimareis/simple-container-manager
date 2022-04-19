import { Box, Heading, } from '@chakra-ui/react'

const Terminal = ({ container, terminalLines }) => (
  <Box>
    <Heading as="h3"
      p={3}
      fontSize={20}
    >
      Tail Logs - <Box as="b" color="#04aa6d">{container?.name}</Box>
    </Heading>
    <Box
      p={7}
      h={300}
      maxW={1200}
      margin='auto'
      overflow='auto'
      textAlign='left'
      backgroundColor='black'
      border='solid 2px #5d8bbf'
      borderRadius={20}
      color='#04aa6d'
    >
      {
        terminalLines.map((lines, i) => (
          <Box as='p' color='#04aa6d' key={i}>{lines}</Box>
        ))
      }
    </Box>
  </Box>
)

export default Terminal
