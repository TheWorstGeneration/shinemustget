import SortButton from "@/components/atoms/SortButton/SortButton";
import styled from '@emotion/styled';

const SearchResultContainer = styled.div`
  width: 100%;
  height: 300px;

  border: 1px solid tomato;
`;

const SearchResult = () => {
  return (
    <>
      <SearchResultContainer>
        <SortButton />
        {/* <SearchMandalartBox>

        </SearchMandalartBox> */}
      </SearchResultContainer>
    </>
  );
};

export default SearchResult;
