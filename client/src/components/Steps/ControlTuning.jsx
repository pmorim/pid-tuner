import React from 'react';
import MathJax from 'react-mathjax-preview';

// Custom components
import { Step, StepBody, StepDesc, StepTitle } from '../Step';
import { MultiSelect, SwitchInput } from '../Inputs';

// Chakra-UI components
import { Text } from '@chakra-ui/layout';

export const ControlTuning = ({ state, dispatch, ...rest }) => {
  return (
    <Step {...rest}>
      <StepTitle>Control and Tuning</StepTitle>
      <StepDesc>
        <Text>
          The control signal is calculated with the following formula. The{' '}
          <b>Kp</b>, <b>Ti</b>, and <b>Td</b> parameters are calculated by the
          tuning method. You should choose the method that most fits your
          application.
        </Text>
        <Text as="div" fontSize={{ base: '15px', sm: '20px' }}>
          <MathJax
            math={String.raw`$$u(t)=K_pe(t)+K_i\int_{0}^{t}e(t)dt+K_d\frac{de(t)}{dt}$$`}
          />
        </Text>
        <Text>
          Not all tuning methods work for all types of control. For example, the
          algorithm <b>ITAE</b> only works for systems with P or PI control.
          While <b>IMC</b> only works for PI or PID control.
        </Text>
      </StepDesc>

      <StepBody spacing="50px">
        <MultiSelect
          title="Type of control"
          desc="If you are unsure which one to pick, we recommend PID"
          options={['P', 'PI', 'PD', 'PID']}
          set={state.controls}
          toggleSet={x => dispatch({ type: 'control', payload: x })}
        />
        <SwitchInput
          title="Integral Anti-Windup"
          labels={{ on: 'Yes', off: 'No' }}
          desc="Anti-Windup is only applicable to controls that contain an Integrative component"
          value={state.antiWindup}
          toggleValue={x => dispatch({ type: 'anti-windup' })}
        />
        <MultiSelect
          title="Tuning method"
          desc="Not all tuning methods and control types are compatible with each other"
          options={['ZN', 'CC', 'IMC', 'ITAE']}
          set={state.methods}
          toggleSet={x => dispatch({ type: 'method', payload: x })}
        />
      </StepBody>
    </Step>
  );
};
