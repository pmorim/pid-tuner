import React from 'react';

import { Heading, HStack, StackDivider, Text, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { ArrowUpIcon } from '@chakra-ui/icons';

const StepBody = ({ title, desc }) => (
  <VStack w="50%" p={10}>
    <Heading as="h2" size="2xl" pb={5}>
      {title}
    </Heading>
    <Text align="left" fontSize="2xl">
      {desc}
    </Text>
  </VStack>
);

const StepNav = ({ buttonData }) => (
  <HStack pt={20} align="flex-start">
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
    <HStack
      divider={<StackDivider borderColor="gray.200" borderWidth="0.1rem" />}
    >
      <StepBody title={props.title} desc={props.desc} />
      <VStack w="50%" align="left" p={10}>
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
    </HStack>
  );
}

export default Step;
