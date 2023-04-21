import styled from '@emotion/styled';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface CopyRightButtonProps {
  size: 'sm' | 'lg';
}

const CopyRightButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: end;
  height: 3rem;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;

  &:hover {
    opacity: 0.8;
  }
`;

const CopyRightText = styled.h4`
  margin: 0 0.5rem;
`;

export const CopyRight = ({ size }: CopyRightButtonProps) => {
  const handleCopyRight = () => {};

  return size === 'lg' ? (
    <CopyRightButton type="button" onClick={handleCopyRight}>
      <CopyRightText>Copyright</CopyRightText>
      <FontAwesomeIcon icon={faCopyright} />
      <CopyRightText>
        2023 The Worst Generation, Inc. All rights reserved.
      </CopyRightText>
    </CopyRightButton>
  ) : (
    <CopyRightButton type="button" onClick={handleCopyRight}>
      <FontAwesomeIcon icon={faCopyright} />
      <CopyRightText>The Worst Generation</CopyRightText>
    </CopyRightButton>
  );
};
