import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

// Custom components
import { Stepper } from './components/Stepper';
import { SystemStep, ControlStep, TuningStep } from './components/Steps';

// Chakra-UI components
import {
  ChakraProvider,
  Box,
  theme,
  Heading,
  Text,
  Flex,
} from '@chakra-ui/react';

function App() {
  /**
   * Socket IO test
   */
  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('server_client', msg => {
      socket.emit('client_server', { hello: 'world', json: 123 });
      alert(msg);
    });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" alignItems="center" w="100%">
        <Box mb={10} mt={10}>
          <Heading color="teal.200" as="h1" size="3xl">
            PID Tuner
          </Heading>
          <Text color="gray.400" fontSize="3xl">
            A simple way to tune your PID system
          </Text>
        </Box>

        <Stepper>
          <SystemStep />
          <ControlStep />
          <TuningStep />
        </Stepper>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
