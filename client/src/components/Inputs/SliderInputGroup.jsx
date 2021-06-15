import React from 'react';

import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { VStack } from '@chakra-ui/layout';

export const SliderInputGroup = ({ label, children, ...rest }) => {
  return (
    <FormControl w="100%">
      <VStack spacing={0} w="100%" {...rest}>
        <FormLabel>{label}</FormLabel>
        {children}
      </VStack>
    </FormControl>
  );
};
