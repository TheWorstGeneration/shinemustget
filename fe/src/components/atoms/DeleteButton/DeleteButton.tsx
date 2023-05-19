import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { deleteMandalart } from '@/pages/api/deleteMandalart';
import { setResetGoal } from '@/store/modules/goal';
import { setResetCreateButton, setResetInputBox } from '@/store/modules/modal';
import { selectProfile } from '@/store/modules/profile';
import styled from '@emotion/styled';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import React from 'react';

const ButtonStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45%;
  height: 3rem;

  border-radius: 0.5rem;
  background-color: #ffffff;
  margin: 1rem 0;
  padding: 0.5rem 1rem;

  z-index: 200;

  box-shadow: 0px 0px 10px rgba(255, 0, 0, 0.2);

  &:hover {
    background-color: #fff4f4;
    box-shadow: inset 0px 0px 10px rgba(255, 0, 0, 0.2);

    & > * {
      color: #ff0909;
    }
  }

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const ButtonText = styled.span`
  font-size: 0.75rem;
  font-weight: 900;

  margin-left: 0.5rem;

  color: #ff090988;
`;

export const DeleteButton = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const { canCreate } = useAppSelector(selectProfile);

  const handleDeleteMandalart = () => {
    // if (!canCreate) {
    //   alert('생성 후 24시간이 지나야 새로운 만다라트를 생설할 수 있어요.');
    //   return;
    // }

    const result = confirm('정말로 만다라트를 삭제하시나요?');
    if (result) {
      deleteMandalart();
      dispatch(setResetGoal());
      dispatch(setResetInputBox());
      dispatch(setResetCreateButton());
      router.push('/create');
    }
  };

  return (
    <ButtonStyle type="button" onClick={handleDeleteMandalart}>
      <FontAwesomeIcon icon={faTrashCan} color="#ff090988" />
      <ButtonText>만다라트 삭제</ButtonText>
    </ButtonStyle>
  );
};
