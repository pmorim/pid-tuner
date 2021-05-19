import React from 'react';

import {
  Box,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { ArrowUpIcon } from '@chakra-ui/icons';

const StepNav = ({ buttonData }) => (
  <HStack pt={10} align="flex-start">
    {buttonData.canBack && (
      <Button colorScheme="teal" variant="ghost" onClick={buttonData.onBack}>
        Back
      </Button>
    )}

    {buttonData.canNext ? (
      <Button colorScheme="teal" variant="solid" onClick={buttonData.onNext}>
        Next
      </Button>
    ) : (
      <Button
        colorScheme="teal"
        variant="solid"
        leftIcon={<ArrowUpIcon />}
        loadingText="Submitting"
        isLoading={false}
      >
        Submit
      </Button>
    )}
  </HStack>
);

function Step(props) {
  return (
    <Stack
      w="75%"
      direction={{ base: 'column', lg: 'row' }}
      divider={<StackDivider />}
    >
      <Box w={{ base: '100%', lg: '50%' }} p={10}>
        <Heading as="h2" size="xl" pb={5}>
          {React.createElement(props.title)}
        </Heading>
        <Text fontSize="xl">{React.createElement(props.desc)}</Text>
      </Box>
      <VStack align="left" p={10}>
        {props.children}
        <StepNav
          buttonData={{
            canBack: props.canBack,
            onBack: props.onBack,
            canNext: props.canNext,
            onNext: props.onNext,
          }}
        />
      </VStack>
    </Stack>
  );
}

export default Step;
