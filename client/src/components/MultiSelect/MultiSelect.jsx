import {
  FormControl,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control';
import { HStack, VStack } from '@chakra-ui/layout';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import React from 'react';

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

        <RadioGroup value={value} onChange={setValue}>
          <HStack spacing={5}>
            {data.map(x => (
              <Radio key={x} colorScheme="blue" size="lg" value={x}>
                {x}
              </Radio>
            ))}
          </HStack>
        </RadioGroup>

        <FormHelperText align="center">{desc}</FormHelperText>
      </VStack>
    </FormControl>
  );
};
