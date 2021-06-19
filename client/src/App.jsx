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
  // Force Dark-Mode
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  },

  // Custom Scroll-bar
  styles: {
    global: {
      '&::-webkit-scrollbar': {
        width: '10px',
      },
      '&::-webkit-scrollbar-thumb': {
        bgGradient: 'linear(to-t, cyan.700, purple.500)',
        borderRadius: '10px',
      },
    },
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
      // Update system parameters
      return { ...state, system: { ...state.system, ...action.payload } };

    case 'control':
      // Delete from set
      if (state.controls.delete(action.payload))
        return { ...state, controls: state.controls };

      // Add to set
      return { ...state, controls: state.controls.add(action.payload) };

    case 'anti-windup':
      // Toggle antiWindup bool
      return { ...state, antiWindup: !state.antiWindup };

    case 'method':
      // Turn payload to array
      if (!Array.isArray(action.payload)) action.payload = [action.payload];

      // Apply to each of array
      action.payload.forEach(payload => {
        // Delete from set
        if (!state.methods.delete(payload)) state.methods.add(payload);
      });

      // Update state
      return { ...state, methods: state.methods };

    case 'simulation':
      // Update simulation parameters
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
