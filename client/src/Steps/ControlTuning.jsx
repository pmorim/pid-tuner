import React from 'react';
import MathJax from 'react-mathjax-preview';

// Custom components
import { Step, StepBody, StepDesc, StepTitle } from '../components/Step';
import {
  CascadingMultiSelect,
  MultiSelect,
  SwitchInput,
} from '../components/Inputs';

// Chakra-UI components
import { Stack, Text, VStack } from '@chakra-ui/layout';
import { FormLabel } from '@chakra-ui/form-control';

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
            math={String.raw`$$u(t)=K_Pe(t)+K_I\int_{0}^{t}e(t)dt+K_D\frac{de(t)}{dt}$$`}
          />
        </Text>
        <Text>
          Not all tuning methods work for all types of control. For example, the
          algorithm <b>ITAE</b> only works for systems with P or PI control.
          While <b>IMC</b> only works for PI or PID control.
        </Text>
      </StepDesc>

      <StepBody spacing="50px">
        <VStack>
          <FormLabel>Type of control</FormLabel>
          <MultiSelect
            direction="row"
            options={['P', 'PI', 'PD', 'PID']}
            set={state.controls}
            toggleSet={x => dispatch({ type: 'control', payload: x })}
          />
        </VStack>

        <SwitchInput
          title="Integral Anti-Windup"
          labels={{ on: 'Yes', off: 'No' }}
          value={state.antiWindup}
          toggleValue={() => dispatch({ type: 'anti-windup' })}
        />

        <VStack spacing={5}>
          <FormLabel>Tuning method</FormLabel>
          <MultiSelect
            direction={['column', 'row']}
            options={['Ziegler-Nichols', 'Cohen-Coon']}
            set={state.methods}
            toggleSet={x => dispatch({ type: 'method', payload: x })}
          />
          <Stack
            direction={['column', 'row']}
            align="flex-start"
            justify="center"
            spacing={5}
          >
            <CascadingMultiSelect
              main="IMC"
              types={['Aggressive', 'Moderate', 'Conservative']}
              set={state.methods}
              toggleSet={x => dispatch({ type: 'method', payload: x })}
            />
            <CascadingMultiSelect
              main="ITAE"
              types={['Reference Entry', 'Perturbation Rejection']}
              set={state.methods}
              toggleSet={x => dispatch({ type: 'method', payload: x })}
            />
          </Stack>
        </VStack>
      </StepBody>
    </Step>
  );
};
