import React from 'react';
import MathJax from 'react-mathjax-preview';

// Custom components
import { Step, StepBody, StepDesc, StepNav, StepTitle } from '../Stepper';
import { NextBtn } from '../Buttons';

// Chakra-UI components
import { Center, HStack, Text } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/input';
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/slider';

const ConstInput = ({ label }) => (
  <HStack>
    <InputGroup w="50%">
      <InputLeftAddon w="12" children={label} />
      <Input w="5rem" type="number" />
    </InputGroup>
    <Slider colorScheme="teal">
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  </HStack>
);

export const SystemStep = ({ ...rest }) => {
  return (
    <Step {...rest}>
      <StepTitle>System's Model</StepTitle>
      <StepDesc>
        <Text>
          To be able to properly control the system, we need to know how the
          system behaves. Therefore we need to know the system's analytical
          model. We assume that it's a <b>first degree system with delay</b>, so
          we calculate the model though the following formula:
        </Text>
        <MathJax
          math={String.raw`$$G(s) = \frac{K}{\tau s+1} e^{-\tau_D s}$$`}
        />
      </StepDesc>

      <StepBody>
        <FormControl w="500px">
          <FormLabel>System's Constants</FormLabel>
          {['K', 'τ', 'τD'].map(label => (
            <ConstInput key={label} label={label} />
          ))}
        </FormControl>

        <Center w="100%" h="300px" bg="teal.700" fontSize="4xl">
          Graph
        </Center>
      </StepBody>

      <StepNav>
        <NextBtn />
      </StepNav>
    </Step>
  );
};
