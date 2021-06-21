import React from 'react';

// Custom components
import { Step, StepBody, StepDesc, StepTitle } from '../Step';
import { NumberInput, NumberInputGroup } from '../Inputs';

// Chakra-UI components
import { Center, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { GiGears } from 'react-icons/gi';

export const Simulation = ({
  simulationParams,
  updateSimulationParams,
  simulationGraphs,
  executeSimulation,
  ...rest
}) => {
  return (
    <Step {...rest}>
      <StepTitle>Simulation</StepTitle>
      <StepDesc>
        <Text>
          For you to best analyse, and visually compare, the different{' '}
          <b>types of control</b> and <b>tuning methods</b>, you can simulate
          them together. For that, you need to indicate the value at which the
          simulation starts and the <b>target</b> value for the control to try
          to stabilize at.
        </Text>

        <NumberInputGroup title="Simulation parameters">
          <NumberInput
            label="Start"
            labelWidth={20}
            value={simulationParams.start}
            setValue={x => updateSimulationParams({ start: x })}
          />
          <NumberInput
            label="Target"
            labelWidth={20}
            value={simulationParams.target}
            setValue={x => updateSimulationParams({ target: x })}
          />
        </NumberInputGroup>

        <Text>
          Besides that, you can also add some gaussian noise to better simulate
          a real life experiment. If you do not wish to do so, just set the
          following parameters to 0.
        </Text>

        <NumberInputGroup title="Gaussian Noise">
          <NumberInput
            label="µ"
            labelWidth={10}
            value={simulationParams.mean}
            setValue={x => updateSimulationParams({ mean: x })}
          />
          <NumberInput
            label="σ"
            labelWidth={10}
            value={simulationParams.sd}
            setValue={x => updateSimulationParams({ sd: x })}
          />
        </NumberInputGroup>

        <Text>
          You can then get the calculated values on the section below.
        </Text>
      </StepDesc>

      <StepBody>
        <Center
          width="100%"
          height="300px"
          bgGradient="linear(to-br, cyan.700, purple.500)"
          fontSize="4xl"
        >
          Control Variable
        </Center>

        <Center
          width="100%"
          height="300px"
          bgGradient="linear(to-br, cyan.700, purple.500)"
          fontSize="4xl"
        >
          Control Signal
        </Center>

        <Button
          size="lg"
          variant="outline"
          leftIcon={<GiGears />}
          loadingText="Simulating..."
          isLoading={false}
          onClick={executeSimulation}
        >
          Simulate
        </Button>
      </StepBody>
    </Step>
  );
};
