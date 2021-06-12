import React, { useState } from 'react';

// Custom components
import { SystemStep, ControlStep, TuningStep } from './components/Steps';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';

// Chakra-UI components
import { ChakraProvider, extendTheme, Flex } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  },
});

function App() {
  const [control, setControl] = useState('PID');

  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" alignItems="center">
        <Nav />

        <SystemStep />
        <ControlStep state={{ control, setControl }} bgColor="gray.900" />
        <TuningStep />

        <Footer />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
