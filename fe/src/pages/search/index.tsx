import styled from '@emotion/styled';
import { useInnerWidth } from '@/hooks/useInnerWidth';
import SearchResult from '@/components/molecules/SearchResult/SearchResult';

const SearchSection = styled.section`
  display: flex;
  justify-content: center;
  margin: 6.5rem 0 0;
`;

const SearchContainer = styled.section<{ isMaxWidth: boolean }>`
  display: flex;
  flex-direction: column;

  width: ${({ isMaxWidth }) => (isMaxWidth ? '50vw' : '100vw')};
  padding: ${({ isMaxWidth }) => (isMaxWidth ? '0' : '0 10rem')};
  height: 91vh;

  background-color: #ffffff;

  @media (max-width: 960px) {
    padding: 0rem;
  }

  @media (max-width: 500px) {
    height: 130vh;
  }
`;

const Search = () => {
  const isMaxWidth = useInnerWidth() >= 1440;

  return (
    <SearchSection>
      <SearchContainer isMaxWidth={isMaxWidth}>
        <SearchResult />
      </SearchContainer>
    </SearchSection>
  );
};

export default Search;
