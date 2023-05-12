import { MandalartData } from "@/hooks/useMandalart";
import { GoalBoxContainer2 } from "../GoalBoxContainer2/GoalBoxContainer2";
import styled from "@emotion/styled";
import { GoalBoxProps } from "@/components/atoms/GoalBox/GoalBox";

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

const SearchDetailContainer = ({ mandalart }: { mandalart: any  }) => {
  
  const bigList = mandalart?.mandalartRequestDto?.bigRequestDto;
  console.log(mandalart, "4");
  console.log(bigList, "5");

  const firstRow = bigList.slice(0, 3);
  const secondRow = bigList.slice(3, 5);
  const thirdRow = bigList.slice(5, 8);

  const centerSmallList = bigList.map((bigGoal: { location: any; content: any; }) => {
    return {
      id: 0,
      location: bigGoal.location,
      content: bigGoal.content,
      isCenter: 1,
    };
  });

  // const center = {
  //   location: 0,
  //   content: title,
  //   isClear: data?.isClear
  //     ? pathname === '/home'
  //       ? data.isClear
  //       : false
  //     : false,
  //   smallList: centerSmallList,
  //   isCenter: 2,
  // };


  // secondRow의 두번째 요소에 center를 삽입
  // secondRow.splice(1, 0, center);

  return (
      <Container id="mandalart">
      <Row>
        {firstRow.map((bigGoal: { location: number; content: string; smallRequestDto: GoalBoxProps[]; isCenter: number | undefined; }) => {
          return (
            <GoalBoxContainer2
              key={bigGoal.location}
              location={bigGoal.location}
              content={bigGoal.content}
              smallList={bigGoal.smallRequestDto}
              isCenter={bigGoal?.isCenter}
            />
          );
        })}
      </Row>
      <Row>
        {secondRow.map((bigGoal: { location: number; content: string; smallRequestDto: GoalBoxProps[]; isCenter: number | undefined; }) => {
          return (
            <GoalBoxContainer2
              key={bigGoal.location}
              location={bigGoal.location}
              content={bigGoal.content}
              smallList={bigGoal.smallRequestDto}
              isCenter={bigGoal?.isCenter}
            />
          );
        })}
      </Row>
      <Row>
        {thirdRow.map((bigGoal: { location: number; content: string; smallRequestDto: GoalBoxProps[]; isCenter: number | undefined; }) => {
          return (
            <GoalBoxContainer2
              key={bigGoal.location}
              location={bigGoal.location}
              content={bigGoal.content}
              smallList={bigGoal.smallRequestDto}
              isCenter={bigGoal?.isCenter}
            />
          );
        })}
      </Row>
    </Container>
    )
    
};

export default SearchDetailContainer;
