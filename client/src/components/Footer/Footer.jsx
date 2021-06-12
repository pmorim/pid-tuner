import React from 'react';

// Chakra-UI components
import {
  Box,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/layout';

export const Footer = ({ ...rest }) => {
  return (
    <Box width="100%" bgColor="gray.900" py="25px" {...rest}>
      <Container maxW="container.xl">
        <VStack spacing="20px">
          <Heading size="md">Proudly created by</Heading>

          <HStack spacing="20px">
            <Text>
              1180798 <b>Pedro Morim</b>
            </Text>
            <Text>
              1180799 <b>Rui Sargo</b>
            </Text>
            <Text>
              1180872 <b>Miguel Santos</b>
            </Text>
          </HStack>

          <Text>@CONDIG - ISEP 2021</Text>
        </VStack>
      </Container>
    </Box>
  );
};
