import styled from '@emotion/styled';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Circle = styled.div`
  transform: scale(0.8);
`;

export function ProgressCircle(props: any) {
  const rate = props.rate;
  return (
    <Circle>
      <CircularProgressbar
        value={rate}
        text={`${rate}%`}
        styles={buildStyles({
          strokeLinecap: 'butt',
          textSize: '1.5rem',
          pathColor: `#A3DA08`,
          textColor: '#A3DA08',
          trailColor: '#d6d6d6',
        })}
      />
    </Circle>
  );
}
