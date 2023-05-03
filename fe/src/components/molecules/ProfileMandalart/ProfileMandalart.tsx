import styled from '@emotion/styled';
import { BigGoalMandalart } from '../BigGoalMandalart/BigGoalMandalart';

const ProfileMandalartContainer = styled.div`
  width: 50%;
  height: 100%;

  border-radius: 5px;
  margin: 0rem 0.5rem 1rem;

  padding: 0.5rem 0rem 1rem;
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
  margin-bottom: 1rem;
`;

const BigGoalMandalartBox = styled.div`
  height: 100%;
  padding-bottom: 2rem;
  overflow-y: scroll;
`;

interface ClearMandalart {
  id: number;
  SearchDto: SearchDto;
}

interface SearchDto {
  likeCnt: number;
  isLike: boolean;
  title: string;
  bigGoalList: SearchBigDto[];
}

interface SearchBigDto {
  content: string;
  location: number;
}

function getClearMandalart(): ClearMandalart[] {
  return [
    {
      id: 1,
      SearchDto: mandalartInfo,
    },
  ];
}

const bigGoalList: SearchBigDto[] = [
  {
    content: '자기주도성',
    location: 1,
  },
  {
    content: '시장분석',
    location: 2,
  },
  {
    content: '경제지식',
    location: 4,
  },
  {
    content: '인내심',
    location: 3,
  },
  {
    content: '등등',
    location: 6,
  },
  {
    content: '자기주도성',
    location: 8,
  },
  {
    content: '자기주도성',
    location: 9,
  },
  {
    content: '자기주도성',
    location: 7,
  },
];

const mandalartInfo: SearchDto = {
  likeCnt: 23,
  isLike: false,
  title: '부자되기',
  bigGoalList: bigGoalList,
};

export const ProfileMandalart = () => {
  const clearList = getClearMandalart();

  return (
    <ProfileMandalartContainer>
      <Title>만다라트</Title>
      <BigGoalMandalartBox>
        {clearList.map(List => (
          <BigGoalMandalart
            key={List.id}
            id={List.id}
            SearchDto={List.SearchDto}
          />
        ))}
        {clearList.map(List => (
          <BigGoalMandalart
            key={List.id + 3}
            id={List.id}
            SearchDto={List.SearchDto}
          />
        ))}
        {clearList.map(List => (
          <BigGoalMandalart
            key={List.id + 1}
            id={List.id}
            SearchDto={List.SearchDto}
          />
        ))}
        {clearList.map(List => (
          <BigGoalMandalart
            key={List.id + 2}
            id={List.id}
            SearchDto={List.SearchDto}
          />
        ))}
      </BigGoalMandalartBox>
    </ProfileMandalartContainer>
  );
};
