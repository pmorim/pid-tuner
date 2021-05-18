import React, { useState } from 'react';

function Stepper({ children }) {
  const [active, setActive] = useState(0);

  return React.Children.map(children, (child, i) => {
    if (i === active)
      return React.cloneElement(child, {
        onBack: () => setActive(i - 1),
        onNext: () => setActive(i + 1),

        canBack: i !== 0 ? true : false,
        canNext: i !== React.Children.count(children) - 1 ? true : false,
      });
  });
}

export default Stepper;
