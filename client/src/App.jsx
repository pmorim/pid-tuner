import React, { useReducer } from 'react';

// Custom components
import {
  System,
  ControlTuning,
  Simulation,
  SimulationData,
} from './components/Steps';
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
  system: { k: 2.5, tau: 100, tauD: 10, a: 50, y0: 22.5 },
  controls: new Set(['PI']),
  methods: new Set(['IMC Aggressive', 'IMC Moderate', 'IMC Conservative']),
  antiWindup: true,
  simulation: { start: 22.5, target: 50, mean: 0, sd: 2 },
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

    case 'anti-windup':
      return { ...state, antiWindup: !state.antiWindup };

    case 'method':
      if (state.methods.delete(action.payload))
        return { ...state, methods: state.methods };
      else return { ...state, methods: state.methods.add(action.payload) };

    case 'simulation':
      return {
        ...state,
        simulation: { ...state.simulation, ...action.payload },
      };

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
          bgColor="gray.900"
          system={state.system}
          updateSystem={x => dispatch({ type: 'system', payload: x })}
        />
        <ControlTuning state={state} dispatch={dispatch} />
        <Simulation
          bgColor="gray.900"
          simulation={state.simulation}
          updateSimulation={x => dispatch({ type: 'simulation', payload: x })}
        />
        <SimulationData />
      </Box>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
