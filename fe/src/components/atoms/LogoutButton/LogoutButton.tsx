import { useAppDispatch } from '@/hooks/useRedux';
import getKakaoLogout from '@/pages/api/kakaoLogout';
import { setLogout } from '@/store/modules/profile';
import styled from '@emotion/styled';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React from 'react';

const LogoutLink = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  background-color: #ffffff;
  box-shadow: 0 0 0.5rem 1px #22222225;
  padding: 1rem;

  &:hover {
    opacity: 0.8;
  }
`;

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    const result = window.confirm('로그아웃 하시겠습니까?');

    if (result) {
      getKakaoLogout();
      dispatch(setLogout());
      router.push('/');
    }
  };

  return (
    <LogoutLink type="button" onClick={handleLogout}>
      <FontAwesomeIcon icon={faArrowRightFromBracket} />
    </LogoutLink>
  );
};
