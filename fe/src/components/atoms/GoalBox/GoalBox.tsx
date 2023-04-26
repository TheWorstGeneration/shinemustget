import styled from '@emotion/styled';
import Link from 'next/link';

export interface GoalBoxProps {
  id?: number;
  location: number;
  content: string;
  isPodo?: boolean;
  isClear: boolean;
  isCenter?: number | undefined;
}

const CenterBox = styled.div<{ isClear: boolean; isCenter: number }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100px;
  height: 100px;

  background-color: ${({ isCenter }) =>
    isCenter === 2 ? '#fa5d5d' : '#5bd98b'};
  border: 1px solid #888888;
`;

const Box = styled(Link)<{ isClear: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100px;
  height: 100px;

  background-color: #f5f5f5;
  border: 1px solid #888888;

  &:hover {
    opacity: 0.8;
    background-color: #e5e5e5;
    border-color: #000000;
  }
`;

export const GoalBox = ({
  id,
  location,
  content,
  isPodo,
  isClear,
  isCenter,
}: GoalBoxProps) => {
  return isCenter ? (
    <CenterBox isClear={isClear} isCenter={isCenter}>
      {content}
    </CenterBox>
  ) : (
    <Box href={`/detail/${id}`} isClear={isClear}>
      {content}
    </Box>
  );
};
