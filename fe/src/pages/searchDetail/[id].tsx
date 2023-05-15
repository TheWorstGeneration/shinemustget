import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import SearchDetailContainer from '@/components/molecules/SearchDetailContainer/SearchDetailContainer';
import searchDetail from '../api/searchDetail';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh + 6rem);
`;

const SearchDetail = (mandalart: any) => {
  return (
    <Container>
      {mandalart != null} <SearchDetailContainer mandalart={mandalart} />
    </Container>
  );
};

export async function getServerSideProps(context: any) {
  try {
    const mandalart = searchDetail(8);

    return {
      props: mandalart,
    };
  } catch (err) {
    console.log('에러 발생함띠', err);
  }
}

export default SearchDetail;
