import { GoalBoxContainer } from '@/components/molecules/GoalBoxContainer/GoalBoxContainer';
import { MANDALART_READ_MAIN } from '@/constants/queryKey';
import { MandalartData, useMandalart } from '@/hooks/useMandalart';
import { getReadMain } from '@/pages/api/getReadMain';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

const Container = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: -10rem;
  left: 50%;
  transform: translateX(-50%);

  padding: 10rem 1rem;

  width: 712px;
  height: 1000px;

  @media screen and (max-width: 960px) {
    width: 512px;
    height: 800px;
  }

  @media screen and (max-width: 500px) {
    width: 457px;
    height: 745px;
  }

  @media screen and (max-width: 450px) {
    width: calc(100vw - 2rem);
    height: 700px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  margin-bottom: 25px;

  &:last-of-type {
    margin-bottom: 0;
  }

  @media screen and (max-width: 960px) {
    margin-bottom: 15px;
  }

  @media screen and (max-width: 500px) {
    margin-bottom: 10px;
  }
`;

export const Mandalart = () => {
  const { data } = useQuery<MandalartData>(MANDALART_READ_MAIN, getReadMain);
  const mandalart = useMandalart();

  const router = useRouter();
  const { pathname } = router;

  console.log('data :', data);
  console.log('mandalart :', mandalart);

  const { title, bigList }: MandalartData =
    pathname === '/home' ? (data ? data : mandalart) : mandalart;

  bigList.sort((a, b) => {
    return a.location - b.location;
  });

  const fristRow = bigList.slice(0, 3);
  const secondRow = bigList.slice(3, 5);
  const thirdRow = bigList.slice(5, 8);

  const centerSmallList = bigList.map(bigGoal => {
    return {
      id: 0,
      location: bigGoal.location,
      content: bigGoal.content,
      isClear: bigGoal?.isClear,
      isCenter: 1,
    };
  });

  const center = {
    location: 0,
    content: title,
    isClear: false,
    smallList: centerSmallList,
    isCenter: 2,
  };

  // secondRow의 두번째 요소에 center를 삽입
  secondRow.splice(1, 0, center);

  return (
    <Container id="mandalart">
      <Row>
        {fristRow.map(bigGoal => {
          return (
            <GoalBoxContainer
              key={bigGoal.location}
              location={bigGoal.location}
              content={bigGoal.content}
              isClear={bigGoal?.isClear}
              smallList={bigGoal.smallList}
              isCenter={bigGoal?.isCenter}
            />
          );
        })}
      </Row>
      <Row>
        {secondRow.map(bigGoal => {
          return (
            <GoalBoxContainer
              key={bigGoal.location}
              location={bigGoal.location}
              content={bigGoal.content}
              isClear={bigGoal.isClear}
              smallList={bigGoal.smallList}
              isCenter={bigGoal?.isCenter}
            />
          );
        })}
      </Row>
      <Row>
        {thirdRow.map(bigGoal => {
          return (
            <GoalBoxContainer
              key={bigGoal.location}
              location={bigGoal.location}
              content={bigGoal.content}
              isClear={bigGoal.isClear}
              smallList={bigGoal.smallList}
              isCenter={bigGoal?.isCenter}
            />
          );
        })}
      </Row>
    </Container>
  );
};
