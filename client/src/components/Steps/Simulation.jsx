import React from 'react';

// Custom components
import { Step, StepBody, StepDesc, StepTitle } from '../Step';

// Chakra-UI components
import { Center, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { GiGears } from 'react-icons/gi';

export const Simulation = ({ ...rest }) => {
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
