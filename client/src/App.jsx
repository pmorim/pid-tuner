import React, { useState } from 'react';
import { KInfo, tauInfo, tauDInfo } from './components/Steps/data/system';

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
  // Control Type
  const [control, setControl] = useState('PID');

  // System Parameters
  const [system, setSystem] = useState({
    K: KInfo.defaultValue,
    tau: tauInfo.defaultValue,
    tauD: tauDInfo.defaultValue,
  });
  const updateSystem = param => setSystem({ ...system, ...param });

  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" alignItems="center">
        <Nav />

        <SystemStep state={{ system, updateSystem }} />
        <ControlStep state={{ control, setControl }} bgColor="gray.900" />
        <TuningStep />

        <Footer />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
