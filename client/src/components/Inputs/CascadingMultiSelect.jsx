import React from 'react';

import { Checkbox } from '@chakra-ui/checkbox';
import { VStack } from '@chakra-ui/layout';

export const CascadingMultiSelect = ({
  main,
  types,
  set,
  toggleSet,
  ...rest
}) => {
  const allChecked = types
    .map(type => set.has(`${main} ${type}`))
    .every(Boolean);

  const someChecked =
    types.map(type => set.has(`${main} ${type}`)).some(Boolean) && !allChecked;

  const checkAll = () => {
    types.map(type => `${main} ${type}`);
    toggleSet(types.filter(type => !set.has(type)));
  };

  return (
    <VStack align="flex-start" {...rest}>
      <Checkbox
        size="lg"
        isChecked={allChecked}
        isIndeterminate={someChecked}
        onChange={checkAll}
      >
        {main}
      </Checkbox>

      <VStack align="flex-start" pl={5}>
        {types.map(type => (
          <Checkbox
            size="lg"
            key={type}
            isChecked={set.has(`${main} ${type}`)}
            onChange={() => toggleSet(`${main} ${type}`)}
          >
            {type}
          </Checkbox>
        ))}
      </VStack>
    </VStack>
  );
};
