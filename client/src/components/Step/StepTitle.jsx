import React from 'react';
import { Heading } from '@chakra-ui/layout';

export const StepTitle = ({ children, ...rest }) => {
  return (
    <Heading
      bgGradient="linear(to-br, cyan.700, purple.500)"
      bgClip="text"
      as="h2"
      size="xl"
      pb="20px"
      {...rest}
    >
      {children}
    </Heading>
  );
};
