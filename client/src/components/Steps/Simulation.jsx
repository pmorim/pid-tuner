import React from 'react';

// Custom components
import { Step, StepBody, StepDesc, StepTitle } from '../Step';
import { NumberInput, NumberInputGroup } from '../Inputs';

// Chakra-UI components
import { Center, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { GiGears } from 'react-icons/gi';
import { Skeleton } from '@chakra-ui/skeleton';

export const Simulation = ({
  simulationParams,
  updateSimulationParams,
  simulationGraphs,
  executeSimulation,
  loading,
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
      </StepDesc>

      <StepBody>
        <Skeleton width="100%" isLoaded={!loading}>
          <Center width="100%" height="300px" bgColor="gray.700">
            Control Variable
          </Center>
        </Skeleton>

        <Skeleton width="100%" isLoaded={!loading}>
          <Center width="100%" height="300px" bgColor="gray.700">
            Control Signal
          </Center>
        </Skeleton>

        <Button
          size="lg"
          variant="outline"
          leftIcon={<GiGears />}
          loadingText="Simulating..."
          isLoading={loading}
          onClick={executeSimulation}
        >
          Simulate
        </Button>
      </StepBody>
    </Step>
  );
};
