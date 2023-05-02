import { ProgressCircle } from '@/components/atoms/ProgressCircle/ProgressCircle';
import styled from '@emotion/styled';

const ProfileProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 5px;
  margin: 0rem 0.5rem 1rem;

  padding: 0 1rem;
  box-sizing: border-box;

  box-shadow: 0 0 0.5rem 1px #22222225;
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
  goalList: Goal[];
}

export function getProgress(): ProgressProp {
  return {
    title: '주식 투자로 인생 졸업하기',
    rate: 66,
    goalList: [
      { content: 'big goal 1', isClear: true },
      { content: 'big goal 2', isClear: false },
      { content: 'big goal 3', isClear: false },
      { content: 'big goal 4', isClear: false },
      { content: 'big goal 5', isClear: false },
      { content: 'big goal 6', isClear: true },
      { content: 'big goal 7', isClear: false },
      { content: 'big goal 8', isClear: false },
    ],
  };
}

export function ProfileGoals() {
  const progressProps: ProgressProp = getProgress();

  const title: string = progressProps.title;
  const rate: number = progressProps.rate;
  const goalList: Goal[] = progressProps.goalList;

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
}
