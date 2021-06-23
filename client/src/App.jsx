import React, { useState, useReducer, useCallback, useEffect } from 'react';
import axios from 'axios';

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
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react';
import {
  Box,
  ChakraProvider,
  extendTheme,
  useDisclosure,
  useBoolean,
} from '@chakra-ui/react';

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
  simulation: { start: 22.5, target: 50, mean: 0, sd: 0.1 },
};

// The State-Manager function
function reducer(state, action) {
  switch (action.type) {
    case 'system':
      return { ...state, system: { ...state.system, ...action.payload } };

    case 'control':
      if (state.controls.delete(action.payload))
        return { ...state, controls: state.controls };
      return { ...state, controls: state.controls.add(action.payload) };

    case 'anti-windup':
      return { ...state, antiWindup: !state.antiWindup };

    case 'method':
      if (!Array.isArray(action.payload)) action.payload = [action.payload];
      action.payload.forEach(payload => {
        if (!state.methods.delete(payload)) state.methods.add(payload);
      });
      return { ...state, methods: state.methods };

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

  const [simulations, setSimulations] = useState([]);
  const [simulationErrors, setSimulationErrors] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useBoolean();

  const executeSimulation = useCallback(async () => {
    setLoading.on();

    // Reset
    const newSimulations = [];
    const newSimulationErrors = [];

    // Execute them one by one
    for (const control of state.controls) {
      for (const method of state.methods) {
        try {
          const res = await axios.post(
            'https://pid-tuner-condig.herokuapp.com/api/control',
            { ...state, control, method }
          );

          newSimulations.push(res.data);
        } catch (e) {
          newSimulationErrors.push(e.message);
        }
      }
    }

    // Apply changes
    setSimulations(newSimulations);
    setSimulationErrors(newSimulationErrors);

    // Stop loading animation
    setLoading.off();

    // Open Error Modal
    if (newSimulationErrors.length) onOpen();
  }, [onOpen, setLoading, state]);

  // Simulate with the starter values
  useEffect(() => {
    const fetchData = async () => {
      await executeSimulation();
    };

    fetchData();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Nav />
      <Box>
        <System
          system={state.system}
          updateSystem={x => dispatch({ type: 'system', payload: x })}
        />
        <ControlTuning bgColor="gray.900" state={state} dispatch={dispatch} />
        <Simulation
          simulationParams={state.simulation}
          updateSimulationParams={x =>
            dispatch({ type: 'simulation', payload: x })
          }
          simulationGraphs={simulations}
          executeSimulation={executeSimulation}
          loading={loading}
        />
        <SimulationData
          bgColor="gray.900"
          simulations={simulations}
          loading={loading}
        />
      </Box>
      <Footer />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Simulation Errors</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {simulationErrors.map((error, i) => (
              <Text key={i}>{error}</Text>
            ))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
}

export default App;
