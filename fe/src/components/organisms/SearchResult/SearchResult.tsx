import SortButton from '@/components/atoms/SortButton/SortButton';
import { BigGoalMandalart } from '@/components/molecules/BigGoalMandalart/BigGoalMandalart';
import getClearMandalart from '@/pages/api/getClearMandalart';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

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

interface ClearMandalart {
  id: number;
  searchDto: SearchDto;
}

interface SearchDto {
  likeCnt: number;
  isLike: boolean;
  title: string;
  bigList: SearchBigDto[];
}

interface SearchBigDto {
  content: string;
  location: number;
}

const SearchResult = () => {
  const [searchList, setSearchList] = useState<ClearMandalart[] | null>(null);
  // 검색결과 요청으로 바꿔야함
  useEffect(() => {
    const axiosClearGoal = async () => {
      const data = await getClearMandalart();
      setSearchList(data);
    };

    axiosClearGoal();
  }, []);

  const [changeSortIndex, setChangeSortIndex] = useState<string>('like');

  useEffect(() => {
    if (changeSortIndex === 'like') {
      const sortedList = searchList?.sort(
        (o1: ClearMandalart, o2: ClearMandalart) => {
          return o1.searchDto.likeCnt - o2.searchDto.likeCnt;
        },
      );
    } else {
    }
  }, [changeSortIndex]);

  return (
    <>
      <SearchResultContainer>
        <SortButton />
        {searchList?.map(List => (
          <SearchMandalartBox>
            <BigGoalMandalart
              key={List.id}
              id={List.id}
              searchDto={List.searchDto}
              isProfile={false}
            />
          </SearchMandalartBox>
        ))}
        {searchList?.map(List => (
          <SearchMandalartBox>
            <BigGoalMandalart
              key={List.id}
              id={List.id}
              searchDto={List.searchDto}
              isProfile={false}
            />
          </SearchMandalartBox>
        ))}
        {searchList?.map(List => (
          <SearchMandalartBox>
            <BigGoalMandalart
              key={List.id}
              id={List.id}
              searchDto={List.searchDto}
              isProfile={false}
            />
          </SearchMandalartBox>
        ))}
        {searchList?.map(List => (
          <SearchMandalartBox>
            <BigGoalMandalart
              key={List.id}
              id={List.id}
              searchDto={List.searchDto}
              isProfile={false}
            />
          </SearchMandalartBox>
        ))}
        {searchList?.map(List => (
          <SearchMandalartBox>
            <BigGoalMandalart
              key={List.id}
              id={List.id}
              searchDto={List.searchDto}
              isProfile={false}
            />
          </SearchMandalartBox>
        ))}
        {searchList?.map(List => (
          <SearchMandalartBox>
            <BigGoalMandalart
              key={List.id}
              id={List.id}
              searchDto={List.searchDto}
              isProfile={false}
            />
          </SearchMandalartBox>
        ))}
        {searchList?.map(List => (
          <SearchMandalartBox>
            <BigGoalMandalart
              key={List.id}
              id={List.id}
              searchDto={List.searchDto}
              isProfile={false}
            />
          </SearchMandalartBox>
        ))}
        {searchList?.map(List => (
          <SearchMandalartBox>
            <BigGoalMandalart
              key={List.id}
              id={List.id}
              searchDto={List.searchDto}
              isProfile={false}
            />
          </SearchMandalartBox>
        ))}
        {searchList?.map(List => (
          <SearchMandalartBox>
            <BigGoalMandalart
              key={List.id}
              id={List.id}
              searchDto={List.searchDto}
              isProfile={false}
            />
          </SearchMandalartBox>
        ))}
      </SearchResultContainer>
    </>
  );
};

export default SearchResult;
