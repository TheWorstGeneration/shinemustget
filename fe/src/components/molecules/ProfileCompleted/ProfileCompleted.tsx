import { CompletedLog } from '@/components/atoms/CompletedLog/CompletedLog';
import { MANDALART_READ_CLEAR_GOAL } from '@/constants/queryKey';
import getClearGoal from '@/pages/api/getClearGoal';
import styled from '@emotion/styled';
import { useQuery } from 'react-query';

const ProfileCompletedContainer = styled.div`
  width: 50%;
  height: 100%;
  border-radius: 5px;
  margin: 0rem 0.5rem 1rem;

  padding: 0.5rem 1rem 0;
  box-sizing: border-box;

  overflow: hidden;

  box-shadow: 0 0 0.5rem 1px #22222225;

  @media (max-width: 500px) {
    width: 100%;
    height: 50%;
  }
`;

const Title = styled.p`
  text-align: center;
  font-size: 1.5rem;
`;

const CompletedBox = styled.div`
  height: 100%;
  padding-bottom: 2rem;
  overflow-y: scroll;
`;

const Err = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

interface CompletedLogs {
  content: string;
  clearAt: string;
}

export const ProfileCompleted = () => {
  const completedLogs: CompletedLogs[] | undefined = useQuery(
    MANDALART_READ_CLEAR_GOAL,
    getClearGoal,
    {
      staleTime: 5000,
      cacheTime: 20000,
    },
  ).data;

  return (
    <ProfileCompletedContainer>
      <Title>달성목표</Title>
      <CompletedBox>
        {completedLogs?.map(Log => (
          <CompletedLog
            key={Log.content}
            content={Log.content}
            clearAt={Log.clearAt}
          />
        ))}
        {completedLogs?.length === 0 && <Err>현재 달성한 목표가 없습니다.</Err>}
        {!completedLogs && <Err>현재 달성한 목표가 없습니다.</Err>}
      </CompletedBox>
    </ProfileCompletedContainer>
  );
};
