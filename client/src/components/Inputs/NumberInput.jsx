import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/input';
import React from 'react';

export const NumberInput = ({
  label,
  labelWidth,
  numberWidth = 20,
  value,
  setValue,
  ...rest
}) => {
  return (
    <InputGroup {...rest}>
      <InputLeftAddon children={label} w={labelWidth} />
      <Input
        w={numberWidth}
        type="number"
        value={value}
        onChange={event => setValue(event.target.value)}
      />
    </InputGroup>
  );
};
