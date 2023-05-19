import styled from '@emotion/styled';
import { BigGoalMandalart } from '../BigGoalMandalart/BigGoalMandalart';
import getClearMandalart from '@/pages/api/getClearMandalart';
import { useQuery } from 'react-query';
import { MANDALART_READ_CLEAR_MANDALART } from '@/constants/queryKey';

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

const Err = styled.div`
  text-align: center;
`;

interface ClearMandalart {
  id: number;
  searchDto: SearchDto;
}

interface SearchDto {
  likeCnt: number;
  isLike: boolean;
  title: string;
  bigList: SearchBigDto[];
}

interface SearchBigDto {
  content: string;
  location: number;
}

export const ProfileMandalart = () => {
  const clearList: ClearMandalart[] | undefined = useQuery(
    MANDALART_READ_CLEAR_MANDALART,
    getClearMandalart,
    {
      staleTime: 5000,
      cacheTime: 20000,
    },
  ).data;

  return (
    <ProfileMandalartContainer>
      <Title>만다라트 </Title>
      <BigGoalMandalartBox>
        {clearList?.map(List => (
          <BigGoalMandalart
            key={List.id}
            id={List.id}
            searchDto={List.searchDto}
            isProfile={true}
          />
        ))}
        {clearList && clearList.length === 0 && (
          <Err>클리어한 만다라트가 없어요. 😭</Err>
        )}
      </BigGoalMandalartBox>
    </ProfileMandalartContainer>
  );
};
