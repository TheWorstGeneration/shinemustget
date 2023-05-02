import { CompletedLog } from '@/components/atoms/CompletedLog/CompletedLog';
import styled from '@emotion/styled';

const ProfileCompletedContainer = styled.div`
  width: 50%;
  height: 100%;
  border-radius: 5px;
  margin: 0rem 0.5rem 1rem;

  padding: 0.5rem 1rem 0;
  box-sizing: border-box;

  overflow: hidden;

  box-shadow: 0 0 0.5rem 1px #22222225;
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

interface CompletedLogs {
  content: string;
  clearAt: string;
}

export function getCompletedLogs(): CompletedLogs[] {
  return [
    {
      content: '자기주도성',
      clearAt: '2023년 4월 19일',
    },
    {
      content: '시장분석',
      clearAt: '2023년 4월 20일',
    },
    {
      content: '인내심',
      clearAt: '2023년 4월 25일',
    },
    {
      content: '경제지식',
      clearAt: '2023년 4월 30일',
    },
    {
      content: '유튜브 보기',
      clearAt: '2023년 5월 1일',
    },
    {
      content: '유튜브 보기',
      clearAt: '2023년 5월 1일',
    },
    {
      content: '유튜브 보기',
      clearAt: '2023년 5월 1일',
    },
    {
      content: '유튜브 보기',
      clearAt: '2023년 5월 1일',
    },
  ];
}

export function ProfileCompleted() {
  const CompletedLogs: CompletedLogs[] = getCompletedLogs();
  return (
    <ProfileCompletedContainer>
      <Title>달성목표</Title>
      <CompletedBox>
        {CompletedLogs.map(Log => (
          <CompletedLog
            key={Log.content}
            content={Log.content}
            clearAt={Log.clearAt}
          />
        ))}
      </CompletedBox>
    </ProfileCompletedContainer>
  );
}
