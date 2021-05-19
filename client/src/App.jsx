import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

import { Stepper, Step } from './components';
import steps from './steps';

import {
  ChakraProvider,
  Box,
  theme,
  Heading,
  Text,
  VStack,
  Center,
} from '@chakra-ui/react';

function App() {
  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('server_client', msg => {
      socket.emit('client_server', { hello: 'world', json: 123 });
      alert(msg);
    });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Center p={10}>
        <VStack>
          <Box mb={10}>
            <Heading color="teal.200" as="h1" size="3xl">
              PID Tuner
            </Heading>
            <Text color="gray.400" fontSize="3xl">
              A simple way to tune your PID system
            </Text>
          </Box>

          <Stepper>
            {steps.map((step, idx) => (
              <Step key={idx} title={step.title} desc={step.desc}>
                {step.body}
              </Step>
            ))}
          </Stepper>
        </VStack>
      </Center>
    </ChakraProvider>
  );
}

export default App;
