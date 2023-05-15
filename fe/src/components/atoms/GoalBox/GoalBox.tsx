import { useAppDispatch } from '@/hooks/useRedux';
import { setSmallGoal } from '@/store/modules/goal';
import { setPodo } from '@/store/modules/detailIdx';
import styled from '@emotion/styled';
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { setIdx } from '@/store/modules/detailIdx';

export interface GoalBoxProps {
  id?: number | undefined;
  i?: number;
  location: number;
  content: string;
  isPodo?: boolean | undefined;
  isToday?: boolean | undefined;
  isClear?: boolean | undefined;
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

  background-color: ${({ isCenter, isClear }) =>
    isCenter === 2
      ? isClear
        ? '#8A0000'
        : '#FFCCCC'
      : isClear
      ? '#005C24'
      : '#D6F5E1'};
  color: ${({ isCenter, isClear }) =>
    isCenter === 2
      ? isClear
        ? '#FFCCCC'
        : '#8A0000'
      : isClear
      ? '#D6F5E1'
      : '#005C24'};
  border: 1px solid #888888;

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

  @media screen and (max-width: 450px) {
    font-size: 0.2rem;

    width: calc((100vw - 2rem - 50px) / 9);
    height: calc((100vw - 2rem - 50px) / 9);
  }
`;

const TextFieldBox = styled.textarea`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;

  width: 70px;
  height: 70px;

  white-space: wrap;
  overflow: scroll;

  line-height: 1.5;
  padding-top: 0.5rem;

  color: #333333;
  background-color: #f5f5f5;
  border-radius: 0;
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

  @media screen and (max-width: 450px) {
    font-size: 0.2rem;

    width: calc((100vw - 2rem - 50px) / 9);
    height: calc((100vw - 2rem - 50px) / 9);
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

  color: ${({ isClear }) => (isClear ? '#545700' : '#333333')};
  background-color: ${({ isClear }) => (isClear ? '#EFFFAD' : '#f5f5f5')};
  border: 1px solid #888888;

  &:hover {
    color: #000000;
    background-color: ${({ isClear }) => (isClear ? '#DFEF9D' : '#e5e5e5')};
    border-color: #000000;
  }

  white-space: wrap;
  overflow: scroll;

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

  @media screen and (max-width: 450px) {
    font-size: 0.2rem;

    width: calc((100vw - 2rem - 50px) / 9);
    height: calc((100vw - 2rem - 50px) / 9);
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 15%;
  left: 15%;

  transform: translate(-50%, -50%);

  opacity: 0.5;
`;

export const GoalBox = ({
  id,
  i,
  location,
  content,
  isPodo,
  isToday,
  isClear,
  isCenter,
}: GoalBoxProps) => {
  const [input, setInput] = useState(content ? content : '');
  const icon = isToday ? faCheckCircle : faCircle;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { pathname } = router;
  const isCreate = pathname === '/create';

  const handleChangeSmallGoal = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const smallGoal = e.target.value;
    const bigLocation = i ? i - 1 : 0;
    dispatch(setSmallGoal({ i: bigLocation, j: location - 1, smallGoal }));
    setInput(smallGoal);
  };

  const handleGoToDetail = () => {
    dispatch(
      setPodo({
        content: content,
        isPodo: isPodo,
        isToday: isToday,
        isClear: isClear,
      }),
    );
    dispatch(setIdx(id ? id : 0));
  };

  return isCenter ? (
    <CenterBox isClear={isClear ? isClear : false} isCenter={isCenter}>
      {content}
    </CenterBox>
  ) : isCreate ? (
    <TextFieldBox value={input} onChange={handleChangeSmallGoal} />
  ) : (
    <Box
      href={`/detail/${id}`}
      isClear={isClear ? isClear : false}
      onClick={handleGoToDetail}
    >
      {isPodo && !isClear ? (
        <Badge>
          <FontAwesomeIcon
            icon={icon}
            color={isToday ? '#01c027' : '#ff0909'}
          />
        </Badge>
      ) : null}
      {content}
    </Box>
  );
};
