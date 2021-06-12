import React from 'react';
import { Text } from '@chakra-ui/layout';

export const StepDesc = ({ children, ...rest }) => {
  return (
    // 'as="div"' removes an error with MathJax
    <Text as="div" fontSize="xl" {...rest}>
      {children}
    </Text>
  );
};
