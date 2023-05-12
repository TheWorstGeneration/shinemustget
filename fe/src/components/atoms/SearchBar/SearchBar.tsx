import styled from '@emotion/styled';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const SearchBarContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: end;
  width: ${({ isSelected }) => (isSelected ? '30rem' : '3rem')};

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
  const [isSelected, setIsSelected] = useState(false);

  const handleSearchBarSelect = () => {
    setIsSelected(prev => !prev);
  };
  return (
    <SearchBarContainer isSelected={isSelected} onClick={handleSearchBarSelect}>
      <FontAwesomeIcon icon={faSearch} />
    </SearchBarContainer>
  );
};
