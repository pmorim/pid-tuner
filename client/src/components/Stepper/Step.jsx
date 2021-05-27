import React from 'react';
import { Box, Stack, StackDivider, VStack } from '@chakra-ui/layout';

export const Step = ({ children, onNext, onBack, ...rest }) => {
  const [StepTitle, StepDesc, StepBody, StepNav] = children;

  return (
    <Stack
      w="75%"
      direction={{ base: 'column', lg: 'row' }}
      divider={<StackDivider />}
      {...rest}
    >
      <Box w={{ base: '100%', lg: '50%' }} p={10}>
        {StepTitle}
        {StepDesc}
      </Box>
      <VStack align="left" p={10}>
        {StepBody}
        {React.cloneElement(StepNav, { onNext, onBack })}
      </VStack>
    </Stack>
  );
};
