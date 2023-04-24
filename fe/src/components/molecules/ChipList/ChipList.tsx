import { Chip } from '../../atoms/Chip/Chip';
import styled from '@emotion/styled';
import React from 'react';

interface ChipListProps {
  chip_list: string[];
}

const ChipContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;

  flex-wrap: nowrap;
`;

export const ChipList = ({ chip_list }: ChipListProps) => {
  return (
    <ChipContainer>
      {chip_list.map((chip: string) => (
        <Chip context={chip} />
      ))}
    </ChipContainer>
  );
};
