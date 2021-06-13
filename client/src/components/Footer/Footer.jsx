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
import { Author } from '../Author/Author';

export const Footer = ({ ...rest }) => {
  return (
    <Box width="100%" bgColor="gray.900" py="25px" {...rest}>
      <Container maxW="container.xl">
        <VStack spacing="20px">
          <Heading size="md">Proudly created by</Heading>

          <HStack spacing="20px">
            <Author number="1180798" name="Pedro Morim" />
            <Author number="1180799" name="Rui Sargo" />
            <Author number="1180872" name="Miguel Santos" />
          </HStack>

          <Text>@CONDIG - ISEP 2021</Text>
        </VStack>
      </Container>
    </Box>
  );
};
