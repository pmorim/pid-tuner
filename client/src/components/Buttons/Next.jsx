import React from 'react';

import { Button } from '@chakra-ui/button';

export const NextBtn = ({ ...rest }) => {
  return (
    <Button colorScheme="teal" variant="solid" {...rest}>
      Next
    </Button>
  );
};
