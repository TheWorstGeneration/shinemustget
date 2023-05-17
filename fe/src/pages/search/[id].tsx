import styled from '@emotion/styled';
import { useInnerWidth } from '@/hooks/useInnerWidth';
import SearchResult from '@/components/organisms/SearchResult/SearchResult';
import { MANDALART_SEARCH } from '@/constants/queryKey';
import { QueryClient, dehydrate } from 'react-query';
import getSearch from '../api/getSearch';
import { GetServerSideProps } from 'next';
import { useGoToLandingPage } from '@/hooks/useGoToLandingPage';
import { scrollToTop } from '@/utils/scrollToTop';

const SearchSection = styled.section`
  display: flex;
  justify-content: center;
  margin: 6.5rem 0 0;

  min-height: 80vh;
`;

const SearchContainer = styled.section<{ isMaxWidth: boolean }>`
  display: flex;
  flex-direction: column;

  width: ${({ isMaxWidth }) => (isMaxWidth ? '50vw' : '100vw')};
  padding: ${({ isMaxWidth }) => (isMaxWidth ? '0' : '0 10rem')};

  background-color: #ffffff;

  @media (max-width: 960px) {
    padding: 1rem;
  }
`;

const Search = (props: any) => {
  useGoToLandingPage();
  // scrollToTop();
  const isMaxWidth = useInnerWidth() >= 1440;

  return (
    <SearchSection>
      <SearchContainer isMaxWidth={isMaxWidth}>
        <SearchResult />
      </SearchContainer>
    </SearchSection>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const queryClient = new QueryClient();
  const { query } = context;
  const searchData = query.id;

  await queryClient.prefetchQuery(
    MANDALART_SEARCH,
    () => getSearch('accuracy/', searchData, 0),
    {
      staleTime: 10000,
      cacheTime: 20000,
    },
  );

  return {
    props: dehydrate(queryClient),
  };
};

export default Search;
