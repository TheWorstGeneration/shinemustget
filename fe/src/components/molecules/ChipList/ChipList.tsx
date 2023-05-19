import { keyframes } from '@emotion/react';
import { Chip } from '../../atoms/Chip/Chip';
import styled from '@emotion/styled';
import React from 'react';

interface ChipListProps {
  chipList: string[];
  move: number;
}

const scrollX = keyframes`
  from {
    transform: translateX(50%);
  }
  to {
    transform: translateX(-50%);
  }
`;

const ChipContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
`;

const ChipGroup = styled.div<{ move: number }>`
  display: flex;
  align-items: center;
  justify-content: space-around;

  animation: ${scrollX} ${({ move }) => move * 5 + 40}s linear infinite;
`;

const ReverseChipGroup = styled(ChipGroup)`
  animation-direction: reverse;
`;

export const ChipList = ({ chipList, move }: ChipListProps) => {
  return move % 2 === 0 ? (
    <ChipContainer>
      <ChipGroup move={move}>
        {chipList.map((chip: string) => (
          <Chip key={chip} context={chip} />
        ))}
      </ChipGroup>
      <ChipGroup aria-hidden="true" move={move}>
        {chipList.map((chip: string) => (
          <Chip key={chip} context={chip} />
        ))}
      </ChipGroup>
    </ChipContainer>
  ) : (
    <ChipContainer>
      <ReverseChipGroup aria-hidden="true" move={move}>
        {chipList.map((chip: string) => (
          <Chip key={chip} context={chip} />
        ))}
      </ReverseChipGroup>
      <ReverseChipGroup move={move}>
        {chipList.map((chip: string) => (
          <Chip key={chip} context={chip} />
        ))}
      </ReverseChipGroup>
    </ChipContainer>
  );
};
