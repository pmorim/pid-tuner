import React from 'react';

import { Checkbox } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/layout';

export const MultiSelect = ({ options, set, toggleSet, ...rest }) => {
  return (
    <Stack spacing={5} {...rest}>
      {options.map(option => (
        <Checkbox
          size="lg"
          key={option}
          isChecked={set.has(option)}
          onChange={() => toggleSet(option)}
        >
          {option}
        </Checkbox>
      ))}
    </Stack>
  );
};
