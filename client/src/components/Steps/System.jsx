import React from 'react';
import MathJax from 'react-mathjax-preview';
import { KInfo, tauInfo, tauDInfo } from './data/system';

// Custom components
import { Step, StepBody, StepDesc, StepTitle } from '../Step';
import { SliderInput } from '../SliderInput';

// Chakra-UI components
import { Center, Text } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';

export const SystemStep = ({ state, ...rest }) => {
  const { system, updateSystem } = state;

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
        <Text>
          We assume that both the system's time constant, τ, and the system's
          delay, τD, are in seconds.
        </Text>
      </StepDesc>

      <StepBody>
        <FormControl w="100%">
          <FormLabel>System's Constants</FormLabel>
          <SliderInput
            {...KInfo}
            value={system.K}
            setValue={x => updateSystem({ K: x })}
          />
          <SliderInput
            {...tauInfo}
            value={system.tau}
            setValue={x => updateSystem({ tau: x })}
          />
          <SliderInput
            {...tauDInfo}
            value={system.tauD}
            setValue={x => updateSystem({ tauD: x })}
          />
        </FormControl>

        <Center
          w="100%"
          h="300px"
          bgGradient="linear(to-br, cyan.700, purple.500)"
          fontSize="4xl"
        >
          Graph
        </Center>
      </StepBody>
    </Step>
  );
};
