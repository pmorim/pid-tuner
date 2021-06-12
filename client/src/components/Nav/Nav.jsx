import React from 'react';

import { Box, Heading, HStack } from '@chakra-ui/layout';
import { FaGithub } from 'react-icons/fa';

import { ExternalLink } from '../ExternalLink';

export const Nav = ({ ...rest }) => {
  return (
    <HStack
      bgGradient="linear(to-r, cyan.700, purple.500)"
      direction="row"
      width="100%"
      py="10px"
      {...rest}
    >
      <HStack width="75%" margin="auto">
        <Heading color="white" as="h1" size="xl">
          PID Tuner
        </Heading>

        <Box flexGrow="1" />

        <HStack>
          <ExternalLink
            icon={<FaGithub />}
            href="https://github.com/pmorim/pid-tuner"
          />
        </HStack>
      </HStack>
    </HStack>
  );
};
