import React from 'react';
import { VStack } from '@chakra-ui/layout';

export const StepBody = ({ children, ...rest }) => {
  return (
    <VStack justify="center" align="center" spacing={10} {...rest}>
      {children}
    </VStack>
  );
};
