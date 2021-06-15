import React from 'react';

// Custom components
import { Step, StepBody, StepDesc, StepTitle } from '../Step';
import { NumberInput, NumberInputGroup } from '../Inputs';

// Chakra-UI components
import { Center, Text } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { Button } from '@chakra-ui/button';
import { GiGears } from 'react-icons/gi';

export const Simulation = ({ simulation, updateSimulation, ...rest }) => {
  const toast = useToast();

  return (
    <Step {...rest}>
      <StepTitle>Simulation</StepTitle>
      <StepDesc>
        <Text>
          For you to best analyse, and visually compare, the different{' '}
          <b>types of control</b> and <b>tuning methods</b>, you can simulate
          them together. For that, you need to indicate the value at which the
          simulation starts, <b>start</b>, and the <b>target</b> for the
          control.
        </Text>

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

        <Text>
          Besides that, you can also add some gaussian noise to better simulate
          a real life experiment. If you do not wish to do so, just set the
          following parameters to 0.
        </Text>

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
          onClick={() =>
            toast({
              title: 'Not yet implemented',
              status: 'warning',
              isClosable: true,
            })
          }
        >
          Simulate
        </Button>
      </StepBody>
    </Step>
  );
};
