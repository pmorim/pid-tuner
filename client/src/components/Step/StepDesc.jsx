import React from 'react';
import { VStack } from '@chakra-ui/layout';

export const StepDesc = ({ children, ...rest }) => {
  return (
    // 'as="div"' removes an error with MathJax
    <VStack fontSize="xl" spacing={5} {...rest}>
      {children}
    </VStack>
  );
};
