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

const initialState = {
  system: {
    k: 2.5,
    tau: 100,
    tauD: 10,
  },
  control: new Set(['PID']),
  method: new Set(['ZN']),
};

function reducer(state = initialState, action) {
  /**
   * If the given Set already has the payload, remove it.
   * Else, add it to the set.
   *
   * @param {Set} set The Set of properties.
   * @returns The state with the updated set.
   */
  const toggleSet = (set, type) => {
    if (set.has(action.payload))
      return Object.assign(state, {
        type: new Set(new Set([...set].filter(x => x !== action.payload))),
      });
    else
      return Object.assign(state, {
        type: new Set(set.add(action.payload)),
      });
  };

  /**
   * Execute the correct action depending on the given type
   */
  switch (action.type) {
    case 'system':
      return Object.assign(state.system, action.payload);
    case 'control':
      return toggleSet(state.control, 'control');
    case 'method':
      return toggleSet(state.method, 'method');
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
          setSystem={x => dispatch({ type: 'system', payload: x })}
        />
        <ControlTuning
          control={state.control}
          method={state.method}
          setControl={x => dispatch({ type: 'control', payload: x })}
          setMethod={setMethod}
          bgColor="gray.900"
        />
        <Simulation />

        <Footer />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
