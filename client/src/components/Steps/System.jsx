import React, { useState } from 'react';
import MathJax from 'react-mathjax-preview';
import axios from 'axios';

// Custom components
import { Step, StepBody, StepDesc, StepTitle } from '../Step';
import { SliderInput, SliderInputGroup } from '../Inputs';

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
import { useBoolean } from "@chakra-ui/react"

export const System = ({ system, updateSystem, ...rest }) => {
  const [graphData, setGraphData] = useState([]);
  const [graphError, setGraphError] = useState(null);
  const [loading, setLoading] = useBoolean();

  const fetchData = async () => {
    setLoading.on();

    try {
      const res = await axios.post(
        'https://pid-tuner-condig.herokuapp.com/api/control',
        system
      );

      setGraphData(res.data);
      setGraphError(null);
    } catch (err) {
      setGraphData([]);
      setGraphError(err);
    }

    setLoading.off();
  };

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
              fetchData();
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
              fetchData();
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
              fetchData();
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
              fetchData();
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
              fetchData();
            }}
          />
        </SliderInputGroup>

        <FormLabel>Analytical Model</FormLabel>
        <Skeleton width="100%" isLoaded={!loading}>
          <Box width="100%" height="300px">
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
          </Box>
        </Skeleton>
      </StepBody>
    </Step>
  );
};
