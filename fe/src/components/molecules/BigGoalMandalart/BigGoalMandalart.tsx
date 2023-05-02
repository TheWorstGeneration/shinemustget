import Like from '@/components/atoms/Like/Like';
import styled from '@emotion/styled';

const Title = styled.div`
  margin-top: 1rem;
  margin-left: 10%;
  font-size: 1.5rem;
`;

const MandalartContainer = styled.div`
  width: 100%;
  height: 65%;
  display: flex;
  justify-content: center;
`;

const MandalartdBox = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  border: 2px solid blue;

  overflow: scroll;
`;

const Mandalart = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  width: 32%;
  height: 32%;

  margin: 0.5%;

  border: 1px solid tomato;
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

export const BigGoalMandalart = (prop: ClearMandalart) => {
  const title: string = prop.SearchDto.title;
  const likeCnt: number = prop.SearchDto.likeCnt;
  const isLike: boolean = prop.SearchDto.isLike;
  const bigGoalList: SearchBigDto[] = prop.SearchDto.bigGoalList.sort(
    (o1, o2) => {
      return o1.location - o2.location;
    },
  );
  return (
    <>
      <Title>{title}</Title>
      <MandalartContainer>
        <MandalartdBox>
          {bigGoalList.map(bigGoal =>
            bigGoal.location == 6 ? (
              <>
                <Mandalart key={5}>{title}</Mandalart>
                <Mandalart key={bigGoal.location}>{bigGoal.content}</Mandalart>
              </>
            ) : (
              <Mandalart key={bigGoal.location}>{bigGoal.content}</Mandalart>
            ),
          )}
        </MandalartdBox>
      </MandalartContainer>
      <Like isLike={isLike} likeCnt={likeCnt} />
    </>
  );
};
