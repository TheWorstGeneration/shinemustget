import { ProgressCircle } from '@/components/atoms/ProgressCircle/ProgressCircle';
import getNowGoal from '@/pages/api/getNowGoal';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const ProfileProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 5px;
  margin: 0rem 0.5rem 1rem;

  padding: 0 1rem;
  box-sizing: border-box;

  box-shadow: 0 0 0.5rem 1px #22222225;

  @media (max-width: 500px) {
    margin: 0rem 0rem 1rem 0.5rem;
    justify-content: center;
    align-items: center;
  }
`;

const Progress = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const BigGoals = styled.div<{ isClear: boolean }>`
  margin-bottom: 0.5rem;
  color: ${({ isClear }) => (isClear ? '#A3DA08' : 'black;')};
`;

interface Goal {
  content: string;
  isClear: boolean;
}

interface ProgressProp {
  title: string;
  rate: number;
  nowBigGoalDtoList: Goal[];
}

export const ProfileProgress = () => {
  const [progressProps, setProgressProps] = useState<ProgressProp | null>(null);
  useEffect(() => {
    const axiosNowGoal = async () => {
      const data = await getNowGoal();
      setProgressProps(data);
    };

    axiosNowGoal();
  }, []);

  const title: string =
    progressProps !== null ? progressProps.title : 'Loading..';
  const rate: number = progressProps !== null ? progressProps.rate : 0;
  const goalList: Goal[] =
    progressProps !== null
      ? progressProps.nowBigGoalDtoList
      : [{ content: 'Loading..', isClear: false }];

  return (
    <ProfileProgressContainer>
      <Progress>
        <Title>{title}</Title>
        {goalList.map(Goal => (
          <BigGoals key={Goal.content} isClear={Goal.isClear}>
            {Goal.content}
          </BigGoals>
        ))}
      </Progress>
      <ProgressCircle rate={rate} />
    </ProfileProgressContainer>
  );
};
