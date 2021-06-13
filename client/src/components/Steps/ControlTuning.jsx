import React from 'react';
import MathJax from 'react-mathjax-preview';

// Custom components
import { Step, StepBody, StepDesc, StepTitle } from '../Step';
import { MultiSelect } from '../MultiSelect';

// Chakra-UI components
import { Text } from '@chakra-ui/layout';

export const ControlTuning = ({
  control,
  method,
  toggleControl,
  toggleMethod,
  ...rest
}) => {
  return (
    <Step {...rest}>
      <StepTitle>Control and Tuning</StepTitle>
      <StepDesc>
        <Text>
          The control signal is calculated with the following formula. You can
          nullify certain parts by setting their parameters to 0.
        </Text>
        <Text as="div" fontSize={{ base: '15px', sm: '20px' }}>
          <MathJax
            math={String.raw`$$u(t)=K_pe(t)+K_i\int_{0}^{t}e(t)dt+K_d\frac{de(t)}{dt}$$`}
          />
        </Text>
        <Text>
          The <b>Kp</b>, <b>Ti</b>, and <b>Td</b> parameters are calculated by
          the tuning method. You should choose the method that most fits your
          application.
        </Text>
      </StepDesc>

      <StepBody spacing={20}>
        <MultiSelect
          title="Type of control"
          desc="If you are unsure which one to pick, we recommend PID"
          options={['P', 'PI', 'PD', 'PID']}
          set={control}
          toggleSet={toggleControl}
        />
        <MultiSelect
          title="Tuning method"
          desc="Not all methods and control types are compatible with each other"
          options={['ZN', 'CC', 'IMC', 'ITAE']}
          set={method}
          toggleSet={toggleMethod}
        />
      </StepBody>
    </Step>
  );
};
