import styled from '@emotion/styled';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  const handleDeleteMandalart = () => {
    const result = confirm('정말로 만다라트를 삭제하시겠습니까?');
    if (result) {
      console.log('만다라트 삭제');
    }
  };

  return (
    <ButtonStyle type="button" onClick={handleDeleteMandalart}>
      <FontAwesomeIcon icon={faTrashCan} color="#ff090988" />
      <ButtonText>만다라트 삭제</ButtonText>
    </ButtonStyle>
  );
};
