import MathJax from 'react-mathjax-preview';

const control = {
  title: () => 'Control type',
  desc: () => (
    <>
      There are many ways to control a system. If you have a simple system, then
      you don't need the most complex solution. If you are not sure which one to
      choose or don't know what they mean, we recommend you go with PID since
      it's the best one. The PID formula is the one presented below:
      <MathJax
        math={String.raw`$$u(t)=K_pe(t)+K_i\int_{0}^{t}e(t)dt+K_d\frac{de(t)}{dt}$$`}
      />
    </>
  ),

  body: () => <h2>Test</h2>,
};

export default control;
