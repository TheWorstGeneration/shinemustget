import styled from '@emotion/styled';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { easeQuadInOut } from 'd3-ease';
import { useEffect, useState } from 'react';

const Circle = styled.div`
  transform: scale(0.8);
`;

interface AnimatedProgressProviderProps {
  valueStart: number;
  valueEnd: number;
  duration: number;
  easingFunction: (t: number) => number;
  children: (value: number) => JSX.Element;
}

function AnimatedProgressProvider(props: AnimatedProgressProviderProps) {
  const { valueStart, valueEnd, duration, easingFunction, children } = props;
  const [value, setValue] = useState(valueStart);

  useEffect(() => {
    let start: number;
    let requestId: number;

    function animate(timestamp: number) {
      if (!start) {
        start = timestamp;
      }

      const elapsed = timestamp - start;
      const progress = elapsed / duration;

      setValue(
        easingFunction(Math.min(progress, 1)) * (valueEnd - valueStart) +
          valueStart,
      );

      if (progress < 1) {
        requestId = requestAnimationFrame(animate);
      }
    }

    requestId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [valueStart, valueEnd, duration, easingFunction]);

  return children(value);
}

export const ProgressCircle = (props: { rate: number }) => {
  const [animatedRate, setAnimatedRate] = useState(0);
  const rate = props.rate;
  useEffect(() => {
    setAnimatedRate(rate);
  }, [rate]);
  return (
    <Circle>
      <AnimatedProgressProvider
        key={animatedRate}
        valueStart={0}
        valueEnd={animatedRate}
        duration={2000}
        easingFunction={easeQuadInOut}
      >
        {(value: number) => (
          <CircularProgressbar
            key={value}
            value={value}
            text={`${Math.round(value)}%`}
            styles={buildStyles({
              strokeLinecap: 'butt',
              textSize: '1.5rem',
              pathColor: `#A3DA08`,
              textColor: '#A3DA08',
              trailColor: '#d6d6d6',
            })}
          />
        )}
      </AnimatedProgressProvider>
    </Circle>
  );
};
