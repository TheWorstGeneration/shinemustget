import styled from '@emotion/styled';
import { useInnerWidth } from '@/hooks/useInnerWidth';
import SearchResult from '@/components/organisms/SearchResult/SearchResult';
import { useRouter } from 'next/router';
import { MANDALART_SEARCH } from '@/constants/queryKey';
import { QueryClient } from 'react-query';

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

const Search = ({ searchData }: any) => {
  const isMaxWidth = useInnerWidth() >= 1440;

  console.log(searchData);

  return (
    <SearchSection>
      <SearchContainer isMaxWidth={isMaxWidth}>
        <SearchResult />
      </SearchContainer>
    </SearchSection>
  );
};

export async function getServerSideProps(context: any) {
  const { query } = context;
  const queryClient = new QueryClient();

  // await queryClient.prefetchQuery(MANDALART_SEARCH, getSearch, {
  //   staleTime: 10000,
  //   cacheTime: 20000,
  // });

  const searchData = query.id; // 데이터 가져오는 로직

  return {
    props: {
      searchData,
    },
  };
}

export default Search;
