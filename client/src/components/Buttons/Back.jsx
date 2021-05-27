import React from 'react';

import { Button } from '@chakra-ui/button';

export const BackBtn = ({ ...rest }) => {
  return (
    <Button colorScheme="teal" variant="ghost" {...rest}>
      Back
    </Button>
  );
};
