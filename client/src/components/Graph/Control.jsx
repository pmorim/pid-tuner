import React from 'react';

// Chakra-UI components
import { FormLabel } from '@chakra-ui/form-control';
import { VStack } from '@chakra-ui/layout';

// Recharts components
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Array containing the possible colors for the graphs
const colors = [
  'blue',
  'purple',
  'red',
  'green',
  'yellow',
  'white',
  'black',
  'brown',
  'gray',
];

export const Result = ({ title, data, ...rest }) => {
  return (
    <VStack width="100%" height="300px" {...rest}>
      <FormLabel>{title}</FormLabel>
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
          <XAxis dataKey="points[0].t" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip />

          {data.map(id => {
            id.points.map(point => {
              return (
                <Line
                  type="monotone"
                  dataKey={point.u}
                  stroke={colors[0]}
                  strokeWidth={3}
                  dot={false}
                />
              );
            });
          })}
        </LineChart>
      </ResponsiveContainer>
    </VStack>
  );
};
