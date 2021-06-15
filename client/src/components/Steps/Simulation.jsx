import React from 'react';

// Custom components
import { Step, StepBody, StepDesc, StepTitle } from '../Step';
import { NumberInput, NumberInputGroup } from '../Inputs';

// Chakra-UI components
import { Center, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { GiGears } from 'react-icons/gi';

export const Simulation = ({ simulation, updateSimulation, ...rest }) => {
  return (
    <Step {...rest}>
      <StepTitle>Simulation</StepTitle>
      <StepDesc>
        <Text pb="20px">
          For you to best analyse, and visually compare, the different{' '}
          <b>types of control</b> and <b>tuning methods</b>, you can simulate
          them together.
        </Text>
        <Text></Text>
      </StepDesc>

      <StepBody>
        <NumberInputGroup title="Simulation parameters">
          <NumberInput
            label="Start"
            labelWidth={20}
            value={simulation.start}
            setValue={x => updateSimulation({ start: x })}
          />
          <NumberInput
            label="Target"
            labelWidth={20}
            value={simulation.target}
            setValue={x => updateSimulation({ target: x })}
          />
        </NumberInputGroup>

        <NumberInputGroup title="Gaussian Noise">
          <NumberInput
            label="µ"
            labelWidth={10}
            value={simulation.mean}
            setValue={x => updateSimulation({ mean: x })}
          />
          <NumberInput
            label="σ"
            labelWidth={10}
            value={simulation.sd}
            setValue={x => updateSimulation({ sd: x })}
          />
        </NumberInputGroup>

        <Center
          w="100%"
          h="300px"
          bgGradient="linear(to-br, cyan.700, purple.500)"
          fontSize="4xl"
        >
          Graph
        </Center>
        <Button
          size="lg"
          variant="outline"
          leftIcon={<GiGears />}
          loadingText="Simulating..."
          isLoading={false}
        >
          Simulate
        </Button>
      </StepBody>
    </Step>
  );
};
