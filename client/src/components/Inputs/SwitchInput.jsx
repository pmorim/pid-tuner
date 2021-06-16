import React from 'react';

import { HStack, Text, VStack } from '@chakra-ui/layout';
import { Switch } from '@chakra-ui/switch';
import { FormLabel } from '@chakra-ui/form-control';

export const SwitchInput = ({ title, labels, value, toggleValue, ...rest }) => {
  return (
    <VStack {...rest}>
      <FormLabel>{title}</FormLabel>
      <HStack>
        <Text>{labels.off}</Text>
        <Switch size="lg" isChecked={value} onChange={toggleValue} />
        <Text>{labels.on}</Text>
      </HStack>
    </VStack>
  );
};
