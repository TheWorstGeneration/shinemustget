import SortButton from '@/components/atoms/SortButton/SortButton';
import { BigGoalMandalart } from '@/components/molecules/BigGoalMandalart/BigGoalMandalart';
import { MANDALART_SEARCH } from '@/constants/queryKey';
import getClearMandalart from '@/pages/api/getClearMandalart';
import getSearch from '@/pages/api/getSearch';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { resolve } from 'path';
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
  const id: string | string[] | undefined = router.query.id; // 경로 변수 가져오기

  // 데이터 불러오기
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

  // 검색 결과 인덱스
  const [sortIndex, setSortIndex] = useState<string>('accuracy');

  // 좋아요, 최신순 변경
  const handleChangeSort = (index: string) => {
    setSortIndex(index);
  };

  // 다음 페이지 불러오기
  useEffect(() => {
    if (isChange) {
      searchData.refetch();
      setIsChange(false);
    }
  }, [isChange]);

  // 검색어 변경 및 sortIndex 변경시 실행
  useEffect(() => {
    setSearchList([]);
    setPage(0);
    setIsChange(true);
  }, [id, sortIndex]);

  // 바닥인지 감지
  const [isBottom, setIsBottom] = useState(false);

  // 스크롤 위치 감지
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

  // 스크롤이 바닥에 왔을 때 실행할거
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
