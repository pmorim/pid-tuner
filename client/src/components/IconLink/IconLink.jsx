import React from 'react';

import { Link } from '@chakra-ui/layout';

export const IconLink = ({ icon, href, ...rest }) => (
  <Link fontSize="xl" href={href} isExternal {...rest}>
    {icon}
  </Link>
);
