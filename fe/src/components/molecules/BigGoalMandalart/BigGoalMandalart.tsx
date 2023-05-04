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

  cursor: pointer;
`;

const MandalartdBox = styled.div`
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  overflow: hidden;
`;

const Mandalart = styled.div<{ isCenter: boolean }>`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  width: 32%;

  padding-bottom: 32%;
  margin: 0.5%;

  background-color: ${({ isCenter }) =>
    isCenter === true ? '#fbcdcd' : '#dffbe5'};
  border: 1px solid #888888;

  > p {
    position: absolute;

    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    color: ${({ isCenter }) => (isCenter === true ? '#ff0909' : '#01c027')};
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
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 20ch;
    }
  }
`;

interface SearchBigDto {
  content: string;
  location: number;
}

export const BigGoalMandalart = (props: any) => {
  const title: string = props.searchDto?.title;
  const likeCnt: number = props.searchDto?.likeCnt;
  const isLike: boolean = props.searchDto?.isLike;
  const bigGoalList: SearchBigDto[] = props.searchDto?.bigList?.sort(
    (o1: SearchBigDto, o2: SearchBigDto) => {
      return o1.location - o2.location;
    },
  );
  const isProfile: boolean = props.isProfile;

  const handleMandalartDetail = () => {
    console.log('madalart detail');
  };

  return (
    <>
      <Title>{title}</Title>
      <MandalartContainer onClick={handleMandalartDetail}>
        <MandalartdBox>
          {bigGoalList?.map(bigGoal =>
            bigGoal.location == 5 ? (
              <>
                <Mandalart key={bigGoal.location * 2 + 1} isCenter={true}>
                  <p>
                    <b>{title}</b>
                  </p>
                </Mandalart>
                <Mandalart key={bigGoal.location} isCenter={false}>
                  <p>{bigGoal.content}</p>
                </Mandalart>
              </>
            ) : (
              <Mandalart key={bigGoal.location} isCenter={false}>
                <p>{bigGoal.content}</p>
              </Mandalart>
            ),
          )}
        </MandalartdBox>
      </MandalartContainer>
      <Like isLike={isLike} likeCnt={likeCnt} isProfile={isProfile} />
    </>
  );
};
