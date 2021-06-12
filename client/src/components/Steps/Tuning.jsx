import React from 'react';

// Custom components
import { Step, StepBody, StepDesc, StepTitle } from '../Step';

// Chakra-UI components
import { Center, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { GiGears } from 'react-icons/gi';

export const TuningStep = ({ ...rest }) => {
  return (
    <Step {...rest}>
      <StepTitle>Tuning simulation</StepTitle>
      <StepDesc>
        <Text pb="20px">
          There are many algorithms to calculate the parameters of your
          controller. Each one of them has their own set of advantages and
          disadvantages. Therefore, pick the one that fits your application the
          best.
        </Text>
        <Text>
          Not all algorithms work for all types of control. For example, the
          algorithm <b>ITAE</b> only works for systems with P or PI control.
          While <b>IMC</b> only works for PI or PID control.
        </Text>
      </StepDesc>

      <StepBody>
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
          loadingText="Submitting"
          isLoading={false}
        >
          Simulate
        </Button>
      </StepBody>
    </Step>
  );
};
