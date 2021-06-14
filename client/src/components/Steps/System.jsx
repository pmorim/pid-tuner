import React from 'react';
import MathJax from 'react-mathjax-preview';

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import {data} from './data/GraphTest';

// Custom components
import { Step, StepBody, StepDesc, StepTitle } from '../Step';
import { SliderInput } from '../SliderInput';

// Chakra-UI components
import { Center, Text, VStack } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { color } from '@chakra-ui/system';


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
          We assume that both the system's time constant, τ, and the system's
          delay, τD, are in seconds.
        </Text>
      </StepDesc>

      <StepBody>
        <FormControl w="100%">
          <VStack spacing={0} w="100%">
            <FormLabel>System's Constants</FormLabel>
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
          </VStack>
        </FormControl>

        <Center
                w="100%"
                h="300px"
                bgColor="#1a202c"
                fontSize="l"
                >
        
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

          <XAxis dataKey="x" stroke="white">
            <Label value="Time" position="insideBottom" offset={-7} style={{fill: "white"}} />
          </XAxis>
          <YAxis dataKey="y" stroke="white">
            <Label value="Control Variable" position="insideLeft" angle="-90" style={{fill: "white"}} />
          </YAxis>
          <Tooltip />
          <Legend wrapperStyle={{color: "white"}} />
          <Line type="monotone" dataKey="y" stroke="url(#color)" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
      </Center>
        
      </StepBody>
    </Step>
  );
};
