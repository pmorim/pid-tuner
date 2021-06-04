import React, { useState } from 'react';
import { io } from 'socket.io-client';
import MathJax from 'react-mathjax-preview';

// Custom components
import { Step, StepBody, StepDesc, StepNav, StepTitle } from '../Stepper';
import { NextBtn } from '../Buttons';
import { SliderInput } from '../SliderInput';

// Chakra-UI components
import { Center, Text } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Button } from '@chakra-ui/button';

const KInfo = {
  label: 'K',
  min: 0,
  max: 100,
  step: 1,
  defaultValue: 50,
};

const tauInfo = {
  label: 'τ',
  min: 0,
  max: 100,
  step: 1,
  defaultValue: 50,
};

const tauDInfo = {
  label: 'τD',
  min: 0,
  max: 100,
  step: 1,
  defaultValue: 50,
};

export const SystemStep = ({ socket, ...rest }) => {
  const [k, setK] = useState(KInfo.defaultValue);
  const [tau, setTau] = useState(tauInfo.defaultValue);
  const [tauD, setTauD] = useState(tauDInfo.defaultValue);

  const [graphData, setGraphData] = useState([]);

  async function sendData() {
    await socket.emit('system_model', { k, tau, tauD });
    await socket.on('system_model_response', graphData =>
      setGraphData(graphData)
    );
  }

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
        <FormControl w="500px">
          <FormLabel>System's Constants</FormLabel>
          <SliderInput {...KInfo} value={k} setValue={setK} />
          <SliderInput {...tauInfo} value={tau} setValue={setTau} />
          <SliderInput {...tauDInfo} value={tauD} setValue={setTauD} />
        </FormControl>

        <Center
          position="relative"
          w="100%"
          h="300px"
          bg="teal.700"
          fontSize="4xl"
        >
          Graph
          <Button
            size="sm"
            position="absolute"
            right={2}
            bottom={2}
            onClick={sendData}
          >
            Visualize
          </Button>
        </Center>
      </StepBody>

      <StepNav>
        <NextBtn />
      </StepNav>
    </Step>
  );
};
