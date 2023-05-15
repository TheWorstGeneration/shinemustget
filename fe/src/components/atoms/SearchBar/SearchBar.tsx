import styled from '@emotion/styled';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const SearchBarContainer = styled.div<{ isClicked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: end;
  width: ${({ isClicked }) => (isClicked ? '30rem' : '3rem')};

  height: 3rem;
  border: none;
  border-radius: 1.5rem;
  background-color: #ffffff;
  box-shadow: 0 0 0.5rem 1px #22222225;
  padding: 1rem;

  overflow: hidden;

  &:hover {
    width: 30rem;
  }
`;

const Input = styled.input`
  margin-right: 1rem;
  width: 100%;
  border: none;
  outline: none;
  height: 100%;
`;

export const SearchBar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (event.target !== inputRef.current) {
        setIsClicked(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleSearch();
      setSearchKey('');
    }
  };

  const handleSearch = () => {
    if (searchKey === '') return;
    if (router.query.id === searchKey) {
      router.replace('/search/' + searchKey);
    } else router.push('/search/' + searchKey);
  };

  const handleChange = (event: any) => {
    setSearchKey(event.target.value);
  };

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <SearchBarContainer isClicked={isClicked}>
      <Input
        ref={inputRef}
        value={searchKey}
        onClick={handleClick}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <FontAwesomeIcon icon={faSearch} />
    </SearchBarContainer>
  );
};
