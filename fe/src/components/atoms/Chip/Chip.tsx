import styled from '@emotion/styled';
import React from 'react';

interface ChipProps {
  context: string;
}

const StyledChip = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  // width가 context의 길이에 따라 달라지도록 설정
  width: fit-content;

  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;

  background-color: #a2da08ee;
  border-radius: 0.5rem;
  padding: 1rem;
  // Must used margin-right instead of gap for the loop to be smooth
  margin-right: 1rem;
  box-shadow: 0 0.1rem 0.2rem rgb(0 0 0 / 10%), 0 0.1rem 0.5rem rgb(0 0 0 / 20%),
    0 0.2rem 1.5rem rgb(0 0 0 / 30%);

  white-space: nowrap;
`;

export const Chip = ({ context }: ChipProps) => {
  return <StyledChip>{context}</StyledChip>;
};
