import React from 'react';

// Chakra-UI components
import { Stack, Text } from '@chakra-ui/layout';

export const Author = ({ number, name, ...rest }) => {
  return (
    <Stack align="center" direction={{ base: 'column', md: 'row' }} {...rest}>
      <Text as="b">{number}</Text>
      <Text>{name}</Text>
    </Stack>
  );
};
