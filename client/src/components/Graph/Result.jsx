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
const colors = ['blue', 'purple', 'red', 'green', 'yellow', 'white', 'black', 'brown', 'gray'];

const NUM_POINTS = 200;

export const Result = ({data}) => {
    var graph = [];

    // Restructure the data
    for(let k = 0; k < NUM_POINTS; k++) {
            let temp = {};
            for(let j = 0; j < data.length; j++) {
                if (j == 0) {
                    temp.t = data.points[k].t;
                }
                temp['u_' + j] = data.points[k].u;
                temp['u_d_' + j] = data.points[k].u_d;
                temp['u_i_' + j] = data.points[k].u_i;
                temp['u_p_' + j] = data.points[k].u_p;
                temp['y_' + j] = data.points[k].y;
            }
            graph.push(temp);
    }

    return (
        <VStack width="100%" height="300px">
            <FormLabel>Analytical Model</FormLabel>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={graph}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <XAxis dataKey="points[0].t" stroke="white"/>
                <YAxis stroke="white"/>
                <Tooltip />
                
                {
                    graph.map((points, index) => {
                            return(
                                <Line 
                                type="monotone"
                                dataKey={"y_" + index}
                                stroke={colors[index]}
                                strokeWidth={3}
                                dot={false}
                                />
                            )
                        })
                }
                </LineChart>
            </ResponsiveContainer>
        </VStack>
    );
}