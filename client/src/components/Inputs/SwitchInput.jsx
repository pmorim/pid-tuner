import React from 'react';

import { HStack, Text, VStack } from '@chakra-ui/layout';
import { Switch } from '@chakra-ui/switch';
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control';

export const SwitchInput = ({
  title,
  labels,
  desc,
  value,
  toggleValue,
  ...rest
}) => {
  return (
    <FormControl>
      <VStack {...rest}>
        <FormLabel>{title}</FormLabel>
        <HStack>
          <Text>{labels.off}</Text>
          <Switch size="lg" value={value} onChange={toggleValue} />
          <Text>{labels.on}</Text>
        </HStack>
        <FormHelperText align="center">{desc}</FormHelperText>
      </VStack>
    </FormControl>
  );
};
