import React from 'react';

import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Stack, VStack } from '@chakra-ui/layout';

export const NumberInputGroup = ({ title, children, ...rest }) => {
  return (
    <FormControl w="100%">
      <VStack>
        <FormLabel>{title}</FormLabel>
        <Stack direction={['column', 'row']} spacing={[0, 2]} {...rest}>
          {children}
        </Stack>
      </VStack>
    </FormControl>
  );
};
