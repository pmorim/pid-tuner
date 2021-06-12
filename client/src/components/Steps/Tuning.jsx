import React, { useEffect } from 'react';
import { algos } from './data/tuning';

// Custom components
import { Step, StepBody, StepDesc, StepTitle } from '../Stepper';

// Chakra-UI components
import { WarningIcon } from '@chakra-ui/icons';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import { HStack, Text } from '@chakra-ui/layout';
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control';
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/table';

function isAlgoAllowed(algo, control) {
  return !(
    (algo === 'ITAE' && control === 'PID') ||
    (algo === 'IMC' && control === 'P')
  );
}

export const TuningStep = ({ socket, state, control, ...rest }) => {
  const { algorithm, setAlgorithm } = state;

  useEffect(() => {
    if (!isAlgoAllowed(algorithm, control)) setAlgorithm('');
  }, [control, algorithm, setAlgorithm]);

  return (
    <Step {...rest}>
      <StepTitle>Tuning algorithm</StepTitle>
      <StepDesc>
        <Text>
          There are many algorithms to calculate the constants of your
          controller.Each one of them has their own set of advantages and
          disadvantages. Therefore, pick the one that fits your application the
          best.
        </Text>
        <Text>
          Not all algorithms work for all types of control. For example, the
          algorithm <b>ITAE</b> only works for systems with P or PI control.
          While <b>IMC</b> only works for PI or PID control.
        </Text>
      </StepDesc>

      <StepBody>
        <FormControl>
          <FormLabel>Choose the tuning algorithm</FormLabel>
          <RadioGroup value={algorithm} onChange={setAlgorithm}>
            <HStack spacing={5}>
              {algos.map(algo => (
                <Radio
                  key={algo.name}
                  colorScheme="teal"
                  size="lg"
                  value={algo.name}
                  isDisabled={!isAlgoAllowed(algo.name, control)}
                >
                  {algo.name}
                </Radio>
              ))}
            </HStack>
          </RadioGroup>
          <FormHelperText>
            You can only choose the ones that support {control} control
          </FormHelperText>
        </FormControl>

        {algos
          .filter(algo => algo.name === algorithm)
          .map(algo => (
            <Table key={algo.name} variant="simple">
              <TableCaption>
                Pros and Cons of the {algo.name} algorithm
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Pros</Th>
                  <Th>Cons</Th>
                </Tr>
              </Thead>
              <Tbody>
                {algo.info.map((row, i) => (
                  <Tr key={i}>
                    <Td>{row.pro ?? '-'}</Td>
                    <Td>{row.con ?? '-'}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ))}

        {!algorithm && (
          <Text pos="relative" left={0}>
            <WarningIcon color="red.500" mr={3} />
            The algorithm you chose does not support {control} control
          </Text>
        )}
      </StepBody>
    </Step>
  );
};
