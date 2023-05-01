import styled from '@emotion/styled';
import { faPagelines } from '@fortawesome/free-brands-svg-icons';
import { faAddressBook } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export interface GoalBoxProps {
  id?: number;
  location: number;
  content: string;
  isPodo?: boolean;
  isToday?: boolean;
  isClear: boolean;
  isCenter?: number | undefined;
}

const CenterBox = styled.div<{ isClear: boolean; isCenter: number }>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;

  width: 70px;
  height: 70px;

  background-color: ${({ isCenter }) =>
    isCenter === 2 ? '#fbcdcd' : '#dffbe5'};
  color: ${({ isCenter }) => (isCenter === 2 ? '#ff0909' : '#01c027')};
  border: 1px solid #888888;

  // 칸을 벗어나면 폰트 사이즈를 줄임
  white-space: wrap;
  overflow: scroll;

  @media screen and (max-width: 960px) {
    font-size: 0.5rem;

    width: 50px;
    height: 50px;
  }

  @media screen and (max-width: 500px) {
    font-size: 0.25rem;

    width: 45px;
    height: 45px;
  }
`;

const Box = styled(Link)<{ isClear: boolean }>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;

  width: 70px;
  height: 70px;

  color: #888888;
  background-color: #f5f5f5;
  border: 1px solid #888888;

  &:hover {
    color: #000000;
    background-color: #e5e5e5;
    border-color: #000000;
  }

  @media screen and (max-width: 960px) {
    font-size: 0.5rem;

    width: 50px;
    height: 50px;
  }

  @media screen and (max-width: 500px) {
    font-size: xx-small;

    width: 45px;
    height: 45px;
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

export const GoalBox = ({
  id,
  location,
  content,
  isPodo,
  isToday,
  isClear,
  isCenter,
}: GoalBoxProps) => {
  return isCenter ? (
    <CenterBox isClear={isClear} isCenter={isCenter}>
      {content}
    </CenterBox>
  ) : (
    <Box href={`/detail/${id}`} isClear={isClear}>
      {isPodo ? (
        <Badge>
          <FontAwesomeIcon icon={faPagelines} />
        </Badge>
      ) : (
        <></>
      )}
      {content}
    </Box>
  );
};
