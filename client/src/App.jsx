import React, { useState } from 'react';

// Custom components
import { System, ControlTuning, Simulation } from './components/Steps';
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
  const [method, setMethod] = useState('ZN');
  const [system, setSystem] = useState({ k: 2.5, tau: 100, tauD: 10 });
  const updateSystem = param => setSystem({ ...system, ...param });

  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" alignItems="center">
        <Nav />

        <System state={{ system, updateSystem }} />
        <ControlTuning
          controlState={{ control, setControl }}
          methodState={{ method, setMethod }}
          bgColor="gray.900"
        />
        <Simulation />

        <Footer />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
