import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import { Stepper, Step } from './components';

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
      <Box textAlign="center" fontSize="xl" p={20}>
        <Stepper>
          <Step
            title="Step 1"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget libero quis metus ullamcorper convallis. Integer bibendum erat tellus. Phasellus suscipit leo eget lectus sodales, in efficitur mauris fermentum. Donec gravida bibendum lorem."
          >
            <Box>test1</Box>
          </Step>
          <Step
            title="Step 2"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget libero quis metus ullamcorper convallis. Integer bibendum erat tellus. Phasellus suscipit leo eget lectus sodales, in efficitur mauris fermentum. Donec gravida bibendum lorem."
          >
            <Box>test2</Box>
          </Step>
          <Step
            title="Step 3"
            desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget libero quis metus ullamcorper convallis. Integer bibendum erat tellus. Phasellus suscipit leo eget lectus sodales, in efficitur mauris fermentum. Donec gravida bibendum lorem."
          >
            <Box>test3</Box>
          </Step>
        </Stepper>
      </Box>
    </ChakraProvider>
  );
}

export default App;
