import { HStack } from '@chakra-ui/layout';
import React from 'react';

export const StepNav = ({ children, onNext, onBack, ...rest }) => {
  return (
    <HStack pt={10} align="flex-start" {...rest}>
      {
        // Add onClick event to some buttons
        React.Children.map(children, child => {
          // Advance to the next step
          if (child.type.name === 'NextBtn')
            return React.cloneElement(child, { onClick: onNext });

          // Return to previous step
          if (child.type.name === 'BackBtn')
            return React.cloneElement(child, { onClick: onBack });

          // Nothing
          return React.cloneElement(child);
        })
      }
    </HStack>
  );
};
