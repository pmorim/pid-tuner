import React from 'react';
import MathJax from 'react-mathjax-preview';
import { controlTypes } from './data/control';

// Custom components
import { Step, StepBody, StepDesc, StepTitle } from '../Step';

// Chakra-UI components
import { HStack, Text, VStack } from '@chakra-ui/layout';
import {
  FormControl,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/form-control';
import { Radio, RadioGroup } from '@chakra-ui/radio';
import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/table';

export const ControlStep = ({ state, ...rest }) => {
  const { control, setControl } = state;

  return (
    <Step {...rest}>
      <StepTitle>Control type</StepTitle>
      <StepDesc>
        <Text>
          There are many ways to control a system. If you have a simple system,
          then you don't need the most complex solution. If you are not sure
          which one to choose or don't know what they mean, we recommend you go
          with PID since it's the best one. The PID formula is the one presented
          below:
        </Text>
        <Text fontSize={{ base: '15px', sm: '20px' }}>
          <MathJax
            math={String.raw`$$u(t)=K_pe(t)+K_i\int_{0}^{t}e(t)dt+K_d\frac{de(t)}{dt}$$`}
          />
        </Text>
      </StepDesc>

      <StepBody>
        <FormControl>
          <VStack>
            <FormLabel>Choose the type of control</FormLabel>
            <RadioGroup value={control} onChange={setControl}>
              <HStack spacing={5}>
                {controlTypes.map(type => (
                  <Radio
                    key={type.name}
                    colorScheme="blue"
                    size="lg"
                    value={type.name}
                  >
                    {type.name}
                  </Radio>
                ))}
              </HStack>
            </RadioGroup>
            <FormHelperText>
              If you are unsure which one to pick, we recommend: PID.
            </FormHelperText>
          </VStack>
        </FormControl>

        {controlTypes
          .filter(type => type.name === control)
          .map(type => (
            <Table key={type.name} variant="simple">
              <TableCaption>Pros and Cons of {type.name} control</TableCaption>
              <Thead>
                <Tr>
                  <Th>Pros</Th>
                  <Th>Cons</Th>
                </Tr>
              </Thead>
              <Tbody>
                {type.info.map((row, i) => (
                  <Tr key={i}>
                    <Td>{row.pro ?? '-'}</Td>
                    <Td>{row.con ?? '-'}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ))}
      </StepBody>
    </Step>
  );
};
