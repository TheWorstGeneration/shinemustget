import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import SearchDetailContainer from '@/components/molecules/SearchDetailContainer/SearchDetailContainer';
import searchDetail from '../api/searchDetail';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { MANDALART_SEARCH_DETAIL } from '@/constants/queryKey';
import { QueryClient, dehydrate, useQuery } from 'react-query';
import { useGoToLandingPage } from '@/hooks/useGoToLandingPage';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh + 7rem);
`;

const SearchDetail = (props: any) => {
  useGoToLandingPage();

  const { query } = useRouter();
  const searchData = query.id;
  const mandalart = useQuery(MANDALART_SEARCH_DETAIL, () =>
    searchDetail(searchData),
  );

  return (
    <>
      <Head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <Container>
        {mandalart.isSuccess && (
          <SearchDetailContainer mandalart={mandalart.data} />
        )}
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
