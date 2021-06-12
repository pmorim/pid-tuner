import React, { useState } from 'react';
import { io } from 'socket.io-client';

// Custom components
import { SystemStep, ControlStep, TuningStep } from './components/Steps';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';

// Chakra-UI components
import { ChakraProvider, extendTheme, Flex, VStack } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  },
});

function App() {
  const [control, setControl] = useState('PID');
  const [algorithm, setAlgorithm] = useState('Ziegler-Nichols');

  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" alignItems="center" w="100%">
        <Nav />

        <SystemStep />
        <ControlStep state={{ control, setControl }} bgColor="gray.900" />
        <TuningStep state={{ algorithm, setAlgorithm }} control={control} />

        <Footer />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
