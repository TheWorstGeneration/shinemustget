import Like from '@/components/atoms/Like/Like';
import styled from '@emotion/styled';

const Title = styled.div`
  margin-top: 1rem;
  margin-left: 20%;
  font-size: 1.5rem;
`;

const MandalartContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const MandalartdBox = styled.div`
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  border: 2px solid blue;

  overflow: hidden;
`;

const Mandalart = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  width: 32%;

  padding-bottom: 32%;
  margin: 0.5%;

  border: 1px solid tomato;

  > p {
    position: absolute;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    font-size: 0.8rem;
  }

  @media (max-width: 610px) {
    > p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 6ch;
    }
  }

  @media (max-width: 500px) {
    > p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 20ch;
    }
  }
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
                <Mandalart key={5}>
                  <p>{title}</p>
                </Mandalart>
                <Mandalart key={bigGoal.location}>
                  <p>{bigGoal.content}</p>
                </Mandalart>
              </>
            ) : (
              <Mandalart key={bigGoal.location}>
                <p>{bigGoal.content}</p>
              </Mandalart>
            ),
          )}
        </MandalartdBox>
      </MandalartContainer>
      <Like isLike={isLike} likeCnt={likeCnt} />
    </>
  );
};
