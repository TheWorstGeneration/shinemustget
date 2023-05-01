import { useAppSelector } from '@/hooks/useRedux';
import { selectProfile } from '@/store/modules/profile';
import styled from '@emotion/styled';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import html2canvas from 'html2canvas';
import React from 'react';

const GenerateButton = styled.button`
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

  box-shadow: 0px 0px 10px rgba(0, 255, 0, 0.2);

  &:hover {
    background-color: #eefff2;
    box-shadow: inset 0px 0px 10px rgba(0, 255, 0, 0.2);

    & > * {
      color: #01c027;
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

  color: #01c02788;
`;

export const ImageButton = () => {
  const { nickname } = useAppSelector(selectProfile);
  const handleGenerateImage = () => {
    const mandalart = document.getElementById('mandalart');

    if (mandalart) {
      html2canvas(mandalart, { scale: 4 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `${nickname}님의 만다라트.png`;
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <GenerateButton type="button" onClick={handleGenerateImage}>
      <FontAwesomeIcon icon={faImage} color="#01c02788" />
      <ButtonText>만다라트 저장</ButtonText>
    </GenerateButton>
  );
};
