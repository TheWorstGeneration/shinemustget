import styled from '@emotion/styled';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface CopyRightButtonProps {
  size: string;
}

const CopyRightButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: end;
  height: 3rem;
  border-radius: 0.5rem;
  padding: 0.5rem 0;

  &:hover {
    opacity: 0.8;
  }

  & > * {
    margin-right: 0.5rem;
  }
`;

export const CopyRight = ({ size }: CopyRightButtonProps) => {
  const handleCopyRight = () => {};

  return size === 'lg' ? (
    <CopyRightButton type="button" onClick={handleCopyRight}>
      <span>Copyright</span>
      <FontAwesomeIcon icon={faCopyright} />
      <span>2023 The Worst Generation, Inc. All rights reserved.</span>
    </CopyRightButton>
  ) : (
    <CopyRightButton type="button" onClick={handleCopyRight}>
      <FontAwesomeIcon icon={faCopyright} />
      <span>The Worst Generation</span>
    </CopyRightButton>
  );
};
