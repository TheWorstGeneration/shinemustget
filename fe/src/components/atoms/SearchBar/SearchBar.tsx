import { useAppSelector } from '@/hooks/useRedux';
import { selectModal } from '@/store/modules/modal';
import styled from '@emotion/styled';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const SearchBarContainer = styled.div<{
  isClicked: boolean;
  isMailBox: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: end;
  width: ${({ isClicked }) => (isClicked ? '15rem' : '3rem')};
  max-width: 30vw;

  height: 3rem;
  border: none;
  border-radius: 1.5rem;
  background-color: #ffffff;
  box-shadow: 0 0 0.5rem 1px #22222225;
  padding: 1rem;

  overflow: hidden;

  &:hover {
    width: 15rem;
    max-width: 30vw;
  }

  margin-right: ${({ isMailBox }) => (isMailBox ? '0' : '4rem')};
`;

const Input = styled.input`
  margin-right: 1rem;
  width: 100%;
  border: none;
  outline: none;
  height: 100%;
`;

export const SearchBar = () => {
  const { isMailBox } = useAppSelector(selectModal);
  const [isClicked, setIsClicked] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const inputRef = useRef(null);
  const router = useRouter();
  const { pathname } = router;
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
      if (pathname === '/create') {
        const result = window.confirm(
          '생성중인 만다라트가 있어요.\n검색 시 만다라트 삭제가 취소됩니다.',
        );

        if (!result) return;
      }

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
    <SearchBarContainer isClicked={isClicked} isMailBox={isMailBox}>
      <Input
        ref={inputRef}
        value={searchKey}
        onClick={handleClick}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="만다라트를 검색해 보세요."
      />
      <button type="button" title="검색" onClick={handleKeyDown}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </SearchBarContainer>
  );
};
