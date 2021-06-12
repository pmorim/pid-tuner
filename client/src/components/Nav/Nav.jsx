import React from 'react';

import { Box, Container, Heading, HStack } from '@chakra-ui/layout';
import { FaGithub } from 'react-icons/fa';

import { ExternalLink } from '../ExternalLink';

export const Nav = ({ ...rest }) => {
  return (
    <Box
      bgGradient="linear(to-br, cyan.700, purple.500)"
      direction="row"
      width="100%"
      py="20px"
      zIndex={1}
      {...rest}
    >
      <Container maxW="container.xl">
        <HStack>
          <Heading color="white" as="h1" size="2xl">
            PID Tuner
          </Heading>

          <Box flexGrow="1" />

          <HStack>
            <ExternalLink
              icon={<FaGithub size="3rem" />}
              href="https://github.com/pmorim/pid-tuner"
            />
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};
