import React from 'react';
import { Heading } from '@chakra-ui/layout';

export const StepTitle = ({ children, ...rest }) => {
  return (
    <Heading as="h2" size="xl" pb={5} {...rest}>
      {children}
    </Heading>
  );
};
