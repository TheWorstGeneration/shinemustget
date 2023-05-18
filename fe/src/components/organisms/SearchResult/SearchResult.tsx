import SortButton from '@/components/atoms/SortButton/SortButton';
import { BigGoalMandalart } from '@/components/molecules/BigGoalMandalart/BigGoalMandalart';
import { MANDALART_SEARCH } from '@/constants/queryKey';
import getSearch from '@/pages/api/getSearch';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

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

  return (
    <>
      <SearchResultContainer>
        <SortButton sortIndex={sortIndex} onClick={handleChangeSort} />
        {searchList?.map(List => (
          <SearchMandalartBox>
            <BigGoalMandalart
              key={List.id}
              id={List.id}
              searchDto={List}
              isProfile={false}
            />
          </SearchMandalartBox>
        ))}
      </SearchResultContainer>
    </>
  );
};

export default SearchResult;
