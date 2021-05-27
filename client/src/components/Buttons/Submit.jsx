import React from 'react';

import { Button } from '@chakra-ui/button';
import { ArrowUpIcon } from '@chakra-ui/icons';

export const SubmitBtn = ({ ...rest }) => {
  return (
    <Button
      colorScheme="teal"
      variant="solid"
      leftIcon={<ArrowUpIcon />}
      loadingText="Submitting"
      isLoading={false}
      {...rest}
    >
      Submit
    </Button>
  );
};
