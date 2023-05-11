import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import searchDetail from '../api/searchDetail';
import { GoalBoxContainer } from '@/components/molecules/GoalBoxContainer/GoalBoxContainer';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { MandalartData, useMandalart } from '@/hooks/useMandalart';
import { selectIdx } from '@/store/modules/detailIdx';
import { GoalBoxContainer2 } from '@/components/molecules/GoalBoxContainer2/GoalBoxContainer2';
import { setBigGoal, setSmallGoal, setTitle } from '@/store/modules/goal';
import SearchDetailContainer from '@/components/molecules/SearchDetailContainer/SearchDetailContainer';

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

const SearchDetail = () => {

  // const dispatch = useAppDispatch();
  const [s,setS] = useState<any>(null);
  
  useEffect(() => {
    searchDetail(8).then((res) => {
      console.log(res, "res");
      // console.log(s.mandalartRequestDto, "ssss");
    });
  });


  // if (mandalart != null) { 
  // const bigList = mandalart;

  
  // const fristRow = bigList.slice(0, 3);
  // const secondRow = bigList.slice(3, 5);
  // const thirdRow = bigList.slice(5, 8);

  // const centerSmallList = bigList.map((bigGoal: { location: any; content: any; }) => {
  //   return {
  //     id: 0,
  //     location: bigGoal.location,
  //     content: bigGoal.content,
  //     isCenter: 1,
  //   };
  // });

  // const center = {
  //   location: 0,
  //   content: "2",
  //   smallList: centerSmallList,
  //   isCenter: 2,
  // };

  // // secondRow의 두번째 요소에 center를 삽입
  // secondRow.splice(1, 0, center);
  // }
  
  return (
      <>sdssdsd</>
  );
};

export default SearchDetail;