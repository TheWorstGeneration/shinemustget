import styled from '@emotion/styled';
import { useInnerWidth } from '@/hooks/useInnerWidth';
import SearchResult from '@/components/organisms/SearchResult/SearchResult';

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
