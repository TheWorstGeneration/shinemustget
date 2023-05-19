import SortButton from '@/components/atoms/SortButton/SortButton';
import { BigGoalMandalart } from '@/components/molecules/BigGoalMandalart/BigGoalMandalart';
import { MANDALART_SEARCH } from '@/constants/queryKey';
import getSearch from '@/pages/api/getSearch';
import styled from '@emotion/styled';
import {
  faMagnifyingGlass,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const Loading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 50vh;
`;

const LoadingText = styled.span`
  margin-top: 3rem;
  font-weight: 600;
`;

const SearchResultContainer = styled.div`
  width: 100%;

  display: flex;
  flex-wrap: wrap;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const SearchMandalartBox = styled.div`
  width: 50%;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

interface SearchDto {
  id: number;
  title: string;
  bigList: SearchBigDto[];
  likeCnt: number;
  isLike: boolean;
}

interface SearchBigDto {
  content: string;
  location: number;
}

const SearchResult = () => {
  const [searchList, setSearchList] = useState<SearchDto[] | []>([]);

  const [page, setPage] = useState<number>(0);
  const [isChange, setIsChange] = useState(false);

  const router = useRouter();
  const id: string | string[] | undefined = router.query.id;

  const searchData = useQuery(MANDALART_SEARCH, () =>
    getSearch(sortIndex, id, page),
  );

  useEffect(() => {
    if (!searchData.isRefetching && searchData.isSuccess) {
      setSearchList(prevSearchList => [...prevSearchList, ...searchData.data]);
    }
  }, [searchData.isRefetching]);

  useEffect(() => {
    if (!searchData.isRefetching && searchData.isSuccess) {
      setSearchList(prevSearchList => [...prevSearchList, ...searchData.data]);
    }
  }, [searchData.isLoading]);

  const [sortIndex, setSortIndex] = useState<string>('accuracy');

  const handleChangeSort = (index: string) => {
    setSortIndex(index);
  };

  useEffect(() => {
    if (isChange) {
      searchData.refetch();
      setIsChange(false);
    }
  }, [isChange]);

  useEffect(() => {
    setSearchList([]);
    setPage(0);
    setIsChange(true);
  }, [id, sortIndex]);

  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    let timeoutId: any = null;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const { scrollTop, clientHeight, scrollHeight } =
          document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight) {
          setIsBottom(true);
        } else {
          setIsBottom(false);
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isBottom) {
      if (searchData.data?.length === 10) {
        setPage(prevPage => prevPage + 1);
        setIsChange(true);
      }
    }
  }, [isBottom]);

  return searchData.isLoading ? (
    <Loading>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        bounce
        size={'5x'}
        color="#222222"
      />
      <LoadingText>만다라트를 찾아보고 있어요!</LoadingText>
    </Loading>
  ) : (
    <>
      <SearchResultContainer>
        <SortButton sortIndex={sortIndex} onClick={handleChangeSort} />
        {searchList.length === 0 ? (
          <Loading>
            <FontAwesomeIcon icon={faQuestion} size={'5x'} color="#222222" />
            <LoadingText>"{id}"에 대한 검색결과가 없습니다.</LoadingText>
          </Loading>
        ) : (
          searchList.map(List => (
            <SearchMandalartBox>
              <BigGoalMandalart
                key={List.id}
                id={List.id}
                searchDto={List}
                isProfile={false}
              />
            </SearchMandalartBox>
          ))
        )}
      </SearchResultContainer>
    </>
  );
};

export default SearchResult;
