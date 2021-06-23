import React from 'react';

// Chakra-UI components
import { Heading, HStack, VStack } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';

export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <VStack bgColor="#2D374888" p={2}>
        <Heading as="h6" fontSize="xs">
          Time: {label}s
        </Heading>

        {payload.map(item => (
          <HStack key={item.name}>
            <Text color={item.color} fontSize="xs">
              {item.name}:
            </Text>
            <Text ml={2} fontSize="xs">
              {item.value}
            </Text>
          </HStack>
        ))}
      </VStack>
    );
  }

  return null;
};
