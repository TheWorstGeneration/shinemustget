import styled from '@emotion/styled';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  box-shadow: 0 0 0.5rem 1px #22222225;
  padding: 1rem;

  &:hover {
    box-shadow: 0 0 1rem 1px #22222250;
  }
`;

export const LogoutButton = () => {
  const handleLogout = () => {};

  return (
    <Button type="button" onClick={handleLogout}>
      <FontAwesomeIcon icon={faArrowRightFromBracket} />
    </Button>
  );
};
