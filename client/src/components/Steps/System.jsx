import React, { useState, useEffect, useCallback } from 'react';
import MathJax from 'react-mathjax-preview';
import axios from 'axios';

// Custom components
import { Step, StepBody, StepDesc, StepTitle } from '../Step';
import { SliderInput, SliderInputGroup } from '../Inputs';
import { Result } from '../Graph';

// Recharts components
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Chakra-UI components
import { FormLabel } from '@chakra-ui/form-control';
import { Box, Text } from '@chakra-ui/layout';
import { data } from './data/GraphTest';
import { Skeleton } from '@chakra-ui/skeleton';
import { useBoolean } from '@chakra-ui/react';

export const System = ({ system, updateSystem, ...rest }) => {
  const [graphData, setGraphData] = useState([]);
  const [graphError, setGraphError] = useState(null);
  const [loading, setLoading] = useBoolean();

  const simulate = useCallback(async () => {
    setLoading.on();

    try {
      const res = await axios.post(
        'https://pid-tuner-condig.herokuapp.com/api/model',
        system
      );

      setGraphData(res.data);
      setGraphError(null);
    } catch (err) {
      setGraphData([]);
      setGraphError(err);
    }

    setLoading.off();
  }, [setLoading, system]);

  // Fetch data when the app starts
  useEffect(() => {
    const fetchData = async () => {
      await simulate();
    };

    fetchData();
  }, []);

  return (
    <Step {...rest}>
      <StepTitle>System's Model</StepTitle>
      <StepDesc>
        <Text>
          To be able to properly control the system, we need to know how the
          system behaves. Therefore we need to know the system's analytical
          model. We use the <b>First-Order Plus Dead Time</b> (FOPDT) model, so
          we calculate it though the following formula:
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
            setValue={x => {
              updateSystem({ k: x });
              simulate();
            }}
          />
          <SliderInput
            label="τ"
            min={0}
            max={200}
            step={0.1}
            value={system.tau}
            setValue={x => {
              updateSystem({ tau: x });
              simulate();
            }}
          />
          <SliderInput
            label="τD"
            min={0}
            max={60}
            step={0.1}
            value={system.tauD}
            setValue={x => {
              updateSystem({ tauD: x });
              simulate();
            }}
          />
        </SliderInputGroup>

        <SliderInputGroup label="Step parameters">
          <SliderInput
            label="A"
            min={0.1}
            max={100}
            step={0.1}
            value={system.a}
            setValue={x => {
              updateSystem({ a: x });
              simulate();
            }}
          />
          <SliderInput
            label="Y₀"
            min={0}
            max={100}
            step={0.1}
            value={system.y0}
            setValue={x => {
              updateSystem({ y0: x });
              simulate();
            }}
          />
        </SliderInputGroup>

        <Result data={graphData}/>

      </StepBody>
    </Step>
  );
};
