import React from 'react';

// Custom components
import { Step, StepBody, StepDesc, StepTitle } from '../Step';

// Chakra-UI components
import { DownloadIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/button';
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/table';

export const SimulationData = ({ data, ...rest }) => {
  return (
    <Step {...rest}>
      <StepTitle>Simulation Data</StepTitle>
      <StepDesc>
        Here is a table with all the values calculated in the simulation above.
        You can download the values from the table so that you don't need to
        simulate it again.
      </StepDesc>

      <StepBody>
        <Table variant="simple" size="sm">
          <TableCaption>Values calculated in the simulation</TableCaption>
          <Thead>
            <Tr>
              <Th>Control</Th>
              <Th>Tuning</Th>
              <Th>Anti-Windup</Th>
              <Th isNumeric>Kp</Th>
              <Th isNumeric>Ti</Th>
              <Th isNumeric>Td</Th>
              <Th isNumeric>Tt</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map?.(item => (
              <Tr>
                <Td>{item.control}</Td>
                <Td>{item.tuning}</Td>
                <Td>{item.antiWindup ? 'Yes' : 'No'}</Td>
                <Td isNumeric>{item.Kp ?? '-'}</Td>
                <Td isNumeric>{item.Ti ?? '-'}</Td>
                <Td isNumeric>{item.Td ?? '-'}</Td>
                <Td isNumeric>{item.Tt ?? '-'}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Button
          as="a"
          size="lg"
          variant="outline"
          leftIcon={<DownloadIcon />}
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(data)
          )}`}
          download="pid-tuner.json"
        >
          Download
        </Button>
      </StepBody>
    </Step>
  );
};
