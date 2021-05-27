import React from 'react';
import { VStack } from '@chakra-ui/layout';

export const StepBody = ({ children, ...rest }) => {
  return (
    <VStack spacing={10} {...rest}>
      {children}
    </VStack>
  );
};
