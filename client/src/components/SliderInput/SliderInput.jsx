import React from 'react';

// Chakra-UI components
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/input';
import { HStack } from '@chakra-ui/layout';
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/slider';

export const SliderInput = ({
  label,
  min,
  max,
  step,
  value,
  setValue,
  ...rest
}) => (
  <HStack {...rest}>
    <InputGroup w="50%">
      <InputLeftAddon w="12" children={label} />
      <Input
        w="5rem"
        type="number"
        value={value}
        onChange={event => setValue(event.target.value)}
      />
    </InputGroup>
    <Slider
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={val => setValue(val)}
      focusThumbOnChange={false}
      colorScheme="teal"
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  </HStack>
);
