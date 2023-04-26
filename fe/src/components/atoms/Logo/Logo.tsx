import { useAppDispatch } from '@/hooks/useRedux';
import { setLogout } from '@/store/modules/profile';
import styled from '@emotion/styled';
import { faBuromobelexperte } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

const LogoutLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    scale: 1.1;
    opacity: 0.8;
  }
`;

export const Logo = () => {
  const dispatch = useAppDispatch();

  return (
    <LogoutLink href={'/'}>
      {/* <FontAwesomeIcon icon={faBüromöbel-ExperteGmbH&Co.KG.} /> */}
      <FontAwesomeIcon icon={faBuromobelexperte} size="2xl" />
    </LogoutLink>
  );
};
