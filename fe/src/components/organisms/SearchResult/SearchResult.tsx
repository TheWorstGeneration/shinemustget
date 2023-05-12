import SortButton from '@/components/atoms/SortButton/SortButton';
import { BigGoalMandalart } from '@/components/molecules/BigGoalMandalart/BigGoalMandalart';
import { MANDALART_SEARCH } from '@/constants/queryKey';
import getClearMandalart from '@/pages/api/getClearMandalart';
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

  const router = useRouter();
  const id: string | string[] | undefined = router.query.id; // 경로 변수 가져오기

  const nextData = useQuery(MANDALART_SEARCH, () => getSearch(id, page));

  useEffect(() => {
    if (nextData.isSuccess) {
      setSearchList(prevSearchList => [...prevSearchList, ...nextData.data]);
    }
  }, [nextData.data]);

  // 검색 결과 인덱스
  const [sortIndex, setSortIndex] = useState<string>('like');

  // 좋아요, 최신순 변경
  useEffect(() => {
    if (sortIndex === 'like') {
      // 좋아요순으로 요청
    } else {
      // 최신순으로 요청
    }
  }, [sortIndex]);

  // 좋아요, 최신순 변경
  const handleChangeSort = (index: string) => {
    setSortIndex(index);
  };

  // 다음 페이지 불러오기
  useEffect(() => {
    nextData.refetch();
  }, [page]);

  // 바닥인지 감지
  const [isBottom, setIsBottom] = useState(false);

  // 스크롤 위치 감지
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 스크롤이 바닥에 왔을 때 실행할거
  useEffect(() => {
    if (isBottom) {
      if (nextData.data?.length === 10) {
        setPage(prevPage => prevPage + 1);
      }
    }
  }, [isBottom]);

  return (
    <>
      <SearchResultContainer>
        <SortButton onClick={handleChangeSort} />
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
