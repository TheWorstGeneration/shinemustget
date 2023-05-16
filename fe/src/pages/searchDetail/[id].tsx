import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import SearchDetailContainer from '@/components/molecules/SearchDetailContainer/SearchDetailContainer';
import searchDetail from '../api/searchDetail';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MANDALART_SEARCH_DETAIL } from '@/constants/queryKey';
import { QueryClient, dehydrate } from 'react-query';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh + 6rem);
`;

const SearchDetail = (props: any) => {
  const mandalart = props.queries[0].state.data;

  return (
    <>
      <Head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <Container>
        {mandalart != null} <SearchDetailContainer mandalart={mandalart} />
      </Container>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const queryClient = new QueryClient();
  const { query } = context;
  const searchData = query.id;

  await queryClient.prefetchQuery(
    MANDALART_SEARCH_DETAIL,
    () => searchDetail(searchData),
    {
      staleTime: 10000,
      cacheTime: 20000,
    },
  );

  return {
    props: dehydrate(queryClient),
  };
}

export default SearchDetail;
