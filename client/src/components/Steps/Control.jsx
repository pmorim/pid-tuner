import React from 'react';
import MathJax from 'react-mathjax-preview';

// Custom components
import { Step, StepBody, StepDesc, StepNav, StepTitle } from '../Stepper';
import { NextBtn, BackBtn } from '../Buttons';

// Chakra-UI components
import { Text } from '@chakra-ui/layout';

export const ControlStep = ({ socket, ...rest }) => {
  return (
    <Step {...rest}>
      <StepTitle>Control type</StepTitle>
      <StepDesc>
        <Text>
          There are many ways to control a system. If you have a simple system,
          then you don't need the most complex solution. If you are not sure
          which one to choose or don't know what they mean, we recommend you go
          with PID since it's the best one. The PID formula is the one presented
          below:
        </Text>
        <MathJax
          math={String.raw`$$u(t)=K_pe(t)+K_i\int_{0}^{t}e(t)dt+K_d\frac{de(t)}{dt}$$`}
        />
      </StepDesc>

      <StepBody></StepBody>

      <StepNav>
        <BackBtn />
        <NextBtn />
      </StepNav>
    </Step>
  );
};
