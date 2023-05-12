import { useState,useEffect } from 'react';
import styled from '@emotion/styled';
import SearchDetailContainer from '@/components/molecules/SearchDetailContainer/SearchDetailContainer';
import searchDetail from '../api/searchDetail';

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

const SearchDetail = (mandalart: any) => {
  console.log("mandalart", mandalart);

  return (
    <>
      { mandalart!= null} && <SearchDetailContainer mandalart={mandalart} />
    </>
  );
};

export async function getServerSideProps(context: any) {

  try {
    const mandalart = searchDetail(8);
    
    return {
       props: mandalart 
    };
  } catch (err) { 
    console.log("에러 발생함띠", err);
  }
}

export default SearchDetail;

