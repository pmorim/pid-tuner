import React from 'react';
import { merge } from 'lodash';
import Gradient from 'javascript-color-gradient';

// Chakra-UI components
import { FormLabel } from '@chakra-ui/form-control';
import { Box, VStack } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';

// Recharts components
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Brush,
  Legend,
} from 'recharts';

/**
 * Converts the format of the one needed by the graphs.
 *
 * It first updates the key-names of all the points of all simulations.
 * After that it merges all points onto a single array. The merge is made by the
 * [merge](https://lodash.com/docs/4.17.15#merge) method of the lodash library.
 *
 *
 * @param {Array} simulations The array of the simulation data.
 * @param {Array} filter An array of the wanted data keys. ["y", "u"].
 * @returns An array with the formatted simulation data.
 */
function toGraphFormat(simulations, filter) {
  // Update points' key-names
  simulations = simulations.map(simul =>
    simul.points.map(point => {
      const { control, tuning } = simul.meta;
      const key = `${tuning} (${control})`;

      const newPoint = { t: point.t };
      if (filter === 'y') newPoint[key] = point.y;
      if (filter === 'u') newPoint[key] = point.u;

      return newPoint;
    })
  );

  // Merge simulations
  let newFormat = [];
  for (const simul of simulations) {
    newFormat = merge(newFormat, simul);
  }

  return newFormat;
}

export const Graph = ({
  title,
  data,
  filter,
  refLine,
  unique,
  loading,
  brush,
  ...rest
}) => {
  // If there is no return an empty box
  if (!data.length) return <Box width="100%" height="300px" />;

  // Format the data if needed
  if (!unique) data = toGraphFormat(data, filter);

  // Grab all the dataKeys from 'data'
  const dataKeys = Object.keys(data[0]).filter(key => key !== 't');

  // Calculate colors
  const colorGradient = new Gradient();
  colorGradient.setGradient('#0987A0', '#805AD5');
  colorGradient.setMidpoint(dataKeys.length);
  const colors = colorGradient.getArray();

  return (
    <Skeleton width="100%" isLoaded={!loading}>
      <VStack width="100%" height="300px" {...rest}>
        <FormLabel>{title}</FormLabel>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            {unique ? (
              <defs>
                <linearGradient id="color" x1="100%" x2="0%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#805AD5" />
                  <stop offset="100%" stopColor="#0987A0" />
                </linearGradient>
              </defs>
            ) : (
              <>
                <Tooltip />
                <Legend />
              </>
            )}

            <XAxis dataKey="t" stroke="white" />
            <YAxis stroke="white" />

            {refLine && <ReferenceLine y={refLine} stroke="#4A5568" />}

            {dataKeys.map((dataKey, i) => (
              <Line
                key={i}
                dataKey={dataKey}
                type="monotone"
                stroke={unique ? 'url(#color)' : colors[i]}
                strokeWidth={3}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </VStack>
    </Skeleton>
  );
};
