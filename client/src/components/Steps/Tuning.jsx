import React from 'react';

// Custom components
import { Step, StepBody, StepDesc, StepNav, StepTitle } from '../Stepper';
import { BackBtn, SubmitBtn } from '../Buttons';

// Chakra-UI components
import { Text } from '@chakra-ui/layout';

export const TuningStep = ({ socket, ...rest }) => {
  return (
    <Step {...rest}>
      <StepTitle>Tuning algorithm</StepTitle>
      <StepDesc>
        <Text>
          There are many algorithms to calculate the constants of your
          controller.Each one of them has their own set of advantages and
          disadvantages.Therefore, pick the one that fits your application the
          best.
        </Text>
      </StepDesc>

      <StepBody></StepBody>

      <StepNav>
        <BackBtn />
        <SubmitBtn />
      </StepNav>
    </Step>
  );
};
