import React from 'react';

import { IconLink } from '../IconLink';
import logo from '../../assets/logo.svg';

import { Box, Container, Heading, HStack } from '@chakra-ui/layout';
import { FaGithub } from 'react-icons/fa';
import { Image } from '@chakra-ui/image';

export const Nav = ({ ...rest }) => {
  return (
    <Box
      bgGradient="linear(to-r, cyan.700, purple.500)"
      direction="row"
      width="100%"
      py="20px"
      zIndex={1}
      {...rest}
    >
      <Container maxW="container.xl">
        <HStack align="center">
          <Image height={8} src={logo} alt="Logo" mr={5} />
          <Heading color="white" as="h1" size="2xl">
            PID Tuner
          </Heading>

          <Box flexGrow="1" />

          <HStack>
            <IconLink
              icon={<FaGithub size="3rem" />}
              href="https://github.com/pmorim/pid-tuner"
            />
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
};
