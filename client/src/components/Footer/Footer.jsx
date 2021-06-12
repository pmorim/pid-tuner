import React from 'react';

import {
  Heading,
  HStack,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from '@chakra-ui/layout';

export const Footer = ({ ...rest }) => {
  return (
    <VStack width="100%" pt="50px" pb="100px" bgColor="gray.900" {...rest}>
      <Heading size="md" mb="10px">
        Proudly created by
      </Heading>

      <HStack spacing="20px">
        <Text>1180798 Pedro Morim</Text>
        <Text>1180799 Rui Sargo</Text>
        <Text>1180872 Miguel Santos</Text>
      </HStack>
    </VStack>
  );
};
