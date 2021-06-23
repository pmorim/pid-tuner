import React from 'react';

// Chakra-UI components
import {
  Box,
  Container,
  Heading,
  HStack,
  Link,
  VStack,
} from '@chakra-ui/layout';
import { Author } from '../Author/Author';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export const Footer = ({ ...rest }) => {
  return (
    <Box width="100%" py="25px" {...rest}>
      <Container maxW="container.xl">
        <VStack spacing="20px">
          <Heading size="md">Proudly created by</Heading>

          <HStack spacing="20px">
            <Author number="1180798" name="Pedro Morim" />
            <Author number="1180799" name="Rui Sargo" />
            <Author number="1180872" name="Miguel Santos" />
          </HStack>

          <Link href="https://www.isep.ipp.pt/" isExternal>
            @CONDIG - ISEP 2021 <ExternalLinkIcon mx="2px" />
          </Link>
        </VStack>
      </Container>
    </Box>
  );
};
