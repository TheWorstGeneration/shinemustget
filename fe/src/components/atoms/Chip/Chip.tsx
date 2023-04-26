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
  font-size: 0.75rem;
  font-weight: 600;

  background-color: #a2da08ee;
  border-radius: 0.25rem;
  padding: 0.75rem;
  // Must used margin-right instead of gap for the loop to be smooth
  margin-right: 1rem;
  white-space: nowrap;
`;

export const Chip = ({ context }: ChipProps) => {
  const handleEasterEgg = () => {
    alert('SSAFY 8기 경험치 1등은 대전 1반의 양희제님입니다.');
    // https://github.com/HeeJeYang 열기
    window.open('https://github.com/HeeJeYang');
  };

  return context == 'SSAFY 경험치 1등하기' ||
    context == 'Get the most SSAFY experience points' ? (
    <StyledChip onClick={handleEasterEgg}>{context}</StyledChip>
  ) : (
    <StyledChip>{context}</StyledChip>
  );
};
