import React from "react";
import { Box, Text, } from "@chakra-ui/react";

const Id = ({ container }) => {
  return (
    <Box as='span' textAlign='center' display='flex'>
      <Box
        w={2}
        h={2}
        mr={2}
        mt={1}
        borderRadius='100%'
        backgroundColor={
          container.isRunning ? "#04aa6d" : "red"
        }
        title={container.isRunning ? "Running" : "Stopped"}
      />
      <Text>{container.id}</Text>
    </Box>
  );
};

export default Id;
