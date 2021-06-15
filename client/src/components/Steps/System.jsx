import React from 'react';
import MathJax from 'react-mathjax-preview';

// Custom components
import { Step, StepBody, StepDesc, StepTitle } from '../Step';
import { SliderInput, SliderInputGroup } from '../Inputs';

// Chakra-UI components
import { Text, VStack } from '@chakra-ui/layout';
import { FormLabel } from '@chakra-ui/form-control';

// Recharts components
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { data } from './data/GraphTest';

export const System = ({ system, updateSystem, ...rest }) => {
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
          We then apply a step with the specified amplitude, <b>A</b>, to a
          system that is currently at a certain start value, <b>Y₀</b>. Such as
          the following formula:
        </Text>
        <MathJax math={String.raw`$$Y(s) = A G(s) + Y_0$$`} />
      </StepDesc>

      <StepBody>
        <SliderInputGroup label="System's Model parameters">
          <SliderInput
            label="K"
            min={0}
            max={20}
            step={0.1}
            value={system.k}
            setValue={x => updateSystem({ k: x })}
          />
          <SliderInput
            label="τ"
            min={0}
            max={200}
            step={0.1}
            value={system.tau}
            setValue={x => updateSystem({ tau: x })}
          />
          <SliderInput
            label="τD"
            min={0}
            max={60}
            step={0.1}
            value={system.tauD}
            setValue={x => updateSystem({ tauD: x })}
          />
        </SliderInputGroup>

        <SliderInputGroup label="Step parameters">
          <SliderInput
            label="A"
            min={0.1}
            max={100}
            step={0.1}
            value={system.a}
            setValue={x => updateSystem({ a: x })}
          />
          <SliderInput
            label="Y₀"
            min={0}
            max={100}
            step={0.1}
            value={system.y0}
            setValue={x => updateSystem({ y0: x })}
          />
        </SliderInputGroup>

        <VStack width="100%" height="300px">
          <FormLabel>Analytical Model</FormLabel>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="color" x1="100%" x2="0%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#7b5cd3" />
                  <stop offset="100%" stopColor="#1185a4" />
                </linearGradient>
              </defs>
              <XAxis dataKey="x" stroke="white" />
              <YAxis dataKey="y" stroke="white" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="y"
                stroke="url(#color)"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </VStack>
      </StepBody>
    </Step>
  );
};
