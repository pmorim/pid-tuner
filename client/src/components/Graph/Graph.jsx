import React from 'react';
import Gradient from 'javascript-color-gradient';
import { merge } from 'lodash';

// Chakra-UI components
import { Skeleton } from '@chakra-ui/skeleton';
import { Heading, VStack } from '@chakra-ui/layout';

// Recharts components
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
  Label,
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

const cyan700 = '#0987A0';
const purple500 = '#805AD5';

export const Graph = ({ title, data, filter, refLine, unique, ...rest }) => {
  // Return a Skeleton if there is no data
  if (!data.length) return <Skeleton width="100%" height="300px" />;

  // Grab all the dataKeys from 'data'
  if (!unique) data = toGraphFormat(data, filter);
  const dataKeys = Object.keys(data[0]).filter(key => key !== 't');

  // Calculate colors
  const colorGradient = new Gradient();
  colorGradient.setGradient(cyan700, purple500);
  colorGradient.setMidpoint(dataKeys.length);
  const colors = colorGradient.getArray();

  return (
    <Skeleton width="100%" height="300px" {...rest}>
      <VStack height="100%">
        <Heading as="h4" fontSize="md">
          {title}
        </Heading>
        <ResponsiveContainer>
          <LineChart data={data}>
            {unique ? (
              <defs>
                <linearGradient id="color" x1="100%" x2="0%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor={purple500} />
                  <stop offset="100%" stopColor={cyan700} />
                </linearGradient>
              </defs>
            ) : (
              <>
                <Tooltip />
                <Legend />
              </>
            )}

            <XAxis
              dataKey="t"
              type="number"
              unit="s"
              domain={[data[0].t, data[data.length - 1].t]}
              stroke="white"
            />
            <YAxis type="number" stroke="white" />
            <Label value={title} offset={0} position="insideTop" />

            {refLine && <ReferenceLine y={refLine} stroke="#4A5568" />}

            {dataKeys.map((dataKey, i) => (
              <Line
                key={i}
                dataKey={dataKey}
                stroke={unique ? 'url(#color)' : colors[i]}
                strokeOpacity={1}
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
