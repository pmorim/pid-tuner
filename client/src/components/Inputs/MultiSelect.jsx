import React from 'react';

import {
  FormControl,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control';
import { HStack, VStack } from '@chakra-ui/layout';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react';

export const MultiSelect = ({
  title,
  desc,
  options,
  set,
  toggleSet,
  ...rest
}) => {
  return (
    <FormControl>
      <VStack {...rest}>
        <FormLabel>{title}</FormLabel>

        <CheckboxGroup colorScheme="blue" defaultValue={[...set]}>
          <HStack spacing={5}>
            {options.map(option => (
              <Checkbox
                key={option}
                size="lg"
                value={option}
                isChecked={set.has(option)}
                onChange={() => toggleSet(option)}
              >
                {option}
              </Checkbox>
            ))}
          </HStack>
        </CheckboxGroup>

        <FormHelperText align="center">{desc}</FormHelperText>
      </VStack>
    </FormControl>
  );
};
