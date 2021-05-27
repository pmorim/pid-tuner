import React, { useState } from 'react';

export const Stepper = ({ children }) => {
  const [activeID, setActiveID] = useState(0);

  return React.Children.map(children, (child, i) => {
    if (i === activeID)
      return React.cloneElement(child, {
        onBack: () => setActiveID(i - 1),
        onNext: () => setActiveID(i + 1),
      });
  });
};
