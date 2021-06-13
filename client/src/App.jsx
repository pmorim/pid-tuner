import React, { useReducer } from 'react';

// Custom components
import { System, ControlTuning, Simulation } from './components/Steps';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';

// Chakra-UI components
import { ChakraProvider, Flex, extendTheme } from '@chakra-ui/react';
const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  },
});

// The initial state of the App
const initialState = {
  system: { k: 2.5, tau: 100, tauD: 10 },
  control: new Set(['PI', 'PID']),
  method: new Set(['ZN', 'IMC']),
};

// The State-Manager function
function reducer(state, action) {
  switch (action.type) {
    case 'system':
      return { ...state, system: { ...state.system, ...action.payload } };

    case 'control':
      if (state.control.delete(action.payload))
        return { ...state, control: state.control };
      else return { ...state, control: state.control.add(action.payload) };

    case 'method':
      if (state.method.delete(action.payload))
        return { ...state, method: state.method };
      else return { ...state, method: state.method.add(action.payload) };

    default:
      throw new Error('Unknown action type');
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" alignItems="center">
        <Nav />

        <System
          system={state.system}
          updateSystem={x => dispatch({ type: 'system', payload: x })}
        />
        <ControlTuning
          control={state.control}
          method={state.method}
          toggleControl={x => dispatch({ type: 'control', payload: x })}
          toggleMethod={x => dispatch({ type: 'method', payload: x })}
          bgColor="gray.900"
        />
        <Simulation />

        <Footer />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
