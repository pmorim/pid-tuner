import React, { useReducer } from 'react';

// Custom components
import { System, ControlTuning, Simulation } from './components/Steps';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';

// Chakra-UI components
import { Box, ChakraProvider, extendTheme } from '@chakra-ui/react';
const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  },
});

// The initial state of the App
const initialState = {
  system: { k: 2.5, tau: 100, tauD: 10 },
  controls: new Set(['PI', 'PID']),
  methods: new Set(['ZN', 'IMC']),
};

// The State-Manager function
function reducer(state, action) {
  switch (action.type) {
    case 'system':
      return { ...state, system: { ...state.system, ...action.payload } };

    case 'control':
      if (state.controls.delete(action.payload))
        return { ...state, controls: state.controls };
      else return { ...state, controls: state.controls.add(action.payload) };

    case 'method':
      if (state.methods.delete(action.payload))
        return { ...state, methods: state.methods };
      else return { ...state, methods: state.methods.add(action.payload) };

    default:
      throw new Error('Unknown action type');
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ChakraProvider theme={theme}>
      <Nav />
      <Box>
        <System
          system={state.system}
          updateSystem={x => dispatch({ type: 'system', payload: x })}
        />
        <ControlTuning
          controls={state.controls}
          methods={state.methods}
          toggleControl={x => dispatch({ type: 'control', payload: x })}
          toggleMethod={x => dispatch({ type: 'method', payload: x })}
          bgColor="gray.900"
        />
        <Simulation />
      </Box>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
