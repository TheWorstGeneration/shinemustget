import styled from '@emotion/styled';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 1.5rem;
  background-color: #ffffff;
  box-shadow: 0 0 0.5rem 1px #22222225;
  padding: 1rem;
  
  &:hover {
    width: 30rem;
  }
`;

export const SearchBar = () => {
  return (
    <SearchBarContainer>
      <FontAwesomeIcon icon={faSearch} />
    </SearchBarContainer>
  );
};
