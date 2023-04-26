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

  width: fit-content;
  font-size: 1.5rem;
  font-weight: 600;

  &:hover {
    scale: 1.1;
    opacity: 0.8;
  }
`;

export const Logo = () => {
  return (
    <LogoutLink href={'/'}>
      <FontAwesomeIcon
        icon={faBuromobelexperte}
        size="2xl"
        rotation={90}
        color="#238835"
      />
    </LogoutLink>
  );
};
