import { useAppDispatch } from '@/hooks/useRedux';
import getKakaoLogout from '@/pages/api/kakaoLogout';
import { setLogout } from '@/store/modules/profile';
import styled from '@emotion/styled';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';

const LogoutLink = styled(Link)`
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

  const handleLogout = () => {
    getKakaoLogout();

    dispatch(setLogout());
  };

  return (
    <LogoutLink href={'/'} onClick={handleLogout}>
      <FontAwesomeIcon icon={faArrowRightFromBracket} />
    </LogoutLink>
  );
};
