import React from "react";
import { Box, Heading, } from "@chakra-ui/react";

interface TerminalProps {
  container: Container,
  terminalLines: string[];
}

const Terminal = ({ container, terminalLines }: TerminalProps): JSX.Element => {
  const erros = ["error", "errors"];
  const warn = ["warn", "warnings", "warning"];

  const Line = (props: { line: string }): JSX.Element => {
    let color = "#04aa6d";

    if(erros.some(e => props.line.includes(e))){
      color = "#e96031";
    }else if(warn.some(w => props.line.includes(w))){
      color = "#e9e028";
    }

    return <Box as='p' color={color}>{props.line}</Box>;
  };

  return (
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
          terminalLines.map((line, i) => (
            <Line line={line} key={i}/>
          ))
        }
      </Box>
    </Box>
  );
};

export default Terminal;
