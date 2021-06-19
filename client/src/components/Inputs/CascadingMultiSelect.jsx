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
    toggleSet(
      types
        .map(type => `${main} ${type}`)
        .filter(type => {
          // If all children are checked, don't filter
          if (allChecked) return true;
          // else, filter the selected ones out.
          return !set.has(type);
        })
    );
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
