import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// 반짝이는 애니메이션 추가
const shine = keyframes`
    0% {
        opacity: 0.5;
    }
    50% {
         opacity: 1;
    }
    100% {
        opacity: 0.5;
    }
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: absolute;
  top: 80vh;
  left: calc(100vw - 20rem);
  transform: translate(-50%, -50%);

  width: 10rem;
  height: 3rem;

  border-radius: 0.5rem;
  border: none;
  background-color: #feeeef;

  padding: 0.5rem 1rem;

  animation: ${shine} 1s infinite;

  @media screen and (max-width: 960px) {
  }

  @media screen and (max-width: 500px) {
  }
`;

const ButtonText = styled.span`
  margin-left: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.1rem;
`;

export const CreateButton = () => {
  return (
    <StyledButton>
      <FontAwesomeIcon icon={faPenToSquare} />
      <ButtonText>만다라트 생성</ButtonText>
    </StyledButton>
  );
};
