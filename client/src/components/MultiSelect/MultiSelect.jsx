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
  data,
  value,
  setValue,
  ...rest
}) => {
  return (
    <FormControl>
      <VStack {...rest}>
        <FormLabel>{title}</FormLabel>

        <CheckboxGroup colorScheme="blue" defaultValue={[]}>
          <HStack spacing={5}>
            {data.map(x => (
              <Checkbox key={x} size="lg" value={x} isChecked={} onChange={(e) => }>
                {x}
              </Checkbox>
            ))}
          </HStack>
        </CheckboxGroup>

        <FormHelperText align="center">{desc}</FormHelperText>
      </VStack>
    </FormControl>
  );
};
