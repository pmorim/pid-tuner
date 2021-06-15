import React from 'react';

// Custom components
import { Step, StepBody, StepDesc, StepTitle } from '../Step';

// Chakra-UI components
import { DownloadIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/toast';
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

export const SimulationData = ({ ...rest }) => {
  const toast = useToast();

  return (
    <Step {...rest}>
      <StepTitle>Simulation Data</StepTitle>
      <StepDesc>
        Here is a table with all the values calculated in the simulation above.
        You can download the values from the table so that you don't need to
        simulate it again.
      </StepDesc>
      <StepBody>
        <Table variant="simple">
          <TableCaption>Values calculated in the simulation</TableCaption>
          <Thead>
            <Tr>
              <Th>Control</Th>
              <Th>Tuning</Th>
              <Th isNumeric>Kp</Th>
              <Th isNumeric>Ti</Th>
              <Th isNumeric>Td</Th>
              <Th isNumeric>Ka</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>PI</Td>
              <Td>Ziegler-Nichols</Td>
              <Td isNumeric>5</Td>
              <Td isNumeric>20</Td>
              <Td isNumeric>-</Td>
              <Td isNumeric>-</Td>
            </Tr>
          </Tbody>
        </Table>

        <Button
          size="lg"
          variant="outline"
          leftIcon={<DownloadIcon />}
          loadingText="Simulating..."
          isLoading={false}
          onClick={() =>
            toast({
              title: 'Not yet implemented',
              status: 'warning',
              isClosable: true,
            })
          }
        >
          Download
        </Button>
      </StepBody>
    </Step>
  );
};
