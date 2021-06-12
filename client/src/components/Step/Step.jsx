import React from 'react';

// Chakra-UI components
import { Box, Container, Stack, VStack } from '@chakra-ui/layout';

export const Step = ({ children, ...rest }) => {
  const [StepTitle, StepDesc, StepBody] = children;

  return (
    <Box width="100%" py={{ base: '50px', xl: '100px' }} {...rest}>
      <Container maxW="container.xl">
        <Stack
          spacing={{ base: '50px', xl: '100px' }}
          direction={{ base: 'column', xl: 'row' }}
        >
          <VStack w={{ base: '100%', xl: '50%' }}>
            {StepTitle}
            {StepDesc}
          </VStack>
          <VStack w={{ base: '100%', xl: '50%' }} align="left">
            {StepBody}
          </VStack>
        </Stack>
      </Container>
    </Box>
  );
};
