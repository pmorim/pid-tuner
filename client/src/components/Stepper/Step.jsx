import React from 'react';
import { Box, Stack, VStack } from '@chakra-ui/layout';

export const Step = ({ children, ...rest }) => {
  const [StepTitle, StepDesc, StepBody] = children;

  return (
    <Stack
      px="200px"
      py="50px"
      direction={{ base: 'column', lg: 'row' }}
      {...rest}
    >
      <Box w={{ base: '100%', lg: '50%' }} p={10}>
        {StepTitle}
        {StepDesc}
      </Box>
      <VStack align="left" p={10}>
        {StepBody}
      </VStack>
    </Stack>
  );
};
