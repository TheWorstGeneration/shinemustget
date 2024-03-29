import { GoalBox, GoalBoxProps } from '@/components/atoms/GoalBox/GoalBox';
import styled from '@emotion/styled';

export interface GoalBoxContainerProps {
  location: number;
  content: string;
  isClear: boolean | undefined;
  smallList: GoalBoxProps[];
  isCenter: number | undefined;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 210px;
  height: 210px;

  @media screen and (max-width: 960px) {
    width: 150px;
    height: 150px;
  }

  @media screen and (max-width: 500px) {
    width: 135px;
    height: 135px;
  }

  @media screen and (max-width: 450px) {
    width: calc((100vw - 2rem - 50px) / 3);
    height: calc((100vw - 2rem - 50px) / 3);
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

export const GoalBoxContainer = ({
  content,
  location,
  isClear,
  smallList,
  isCenter,
}: GoalBoxContainerProps) => {
  smallList.sort((a, b) => {
    return a.location - b.location;
  });

  const fristRow = smallList.slice(0, 3);
  const secondRow = smallList.slice(3, 5);
  const thirdRow = smallList.slice(5, 8);

  const center = {
    location: 0,
    content,
    isPodo: false,
    isClear,
    isCenter: isCenter ? isCenter : 1,
  };

  secondRow.splice(1, 0, center);

  return (
    <Container>
      <Row>
        {fristRow.map((smallList, index) => {
          return (
            <GoalBox
              key={index + 1}
              id={smallList?.id}
              i={location}
              location={smallList.location}
              content={smallList.content}
              isPodo={smallList?.isPodo}
              isToday={smallList?.isToday}
              isClear={smallList.isClear}
              isCenter={smallList?.isCenter}
            />
          );
        })}
      </Row>
      <Row>
        {secondRow.map((smallList, index) => {
          return (
            <GoalBox
              key={(index + 1) * 10}
              id={smallList.id}
              i={location}
              location={smallList.location}
              content={smallList.content}
              isPodo={smallList.isPodo}
              isToday={smallList?.isToday}
              isClear={smallList.isClear}
              isCenter={smallList?.isCenter}
            />
          );
        })}
      </Row>
      <Row>
        {thirdRow.map((smallList, index) => {
          return (
            <GoalBox
              key={(index + 1) * 100}
              id={smallList.id}
              i={location}
              location={smallList.location}
              content={smallList.content}
              isPodo={smallList.isPodo}
              isToday={smallList?.isToday}
              isClear={smallList.isClear}
              isCenter={smallList?.isCenter}
            />
          );
        })}
      </Row>
    </Container>
  );
};
