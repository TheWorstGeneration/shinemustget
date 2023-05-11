import { useMandalart } from '@/hooks/useMandalart';
import { postCreate } from '@/pages/api/postCreate';
import styled from '@emotion/styled';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

interface smallRequestDto {
  content: string;
  location: number;
}

interface bigRequestDto {
  content: string;
  location: number;
  smallRequestDto: smallRequestDto[];
}

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 100vh;
  left: 50vw;
  transform: translate(-50%, -50%);

  width: 25vw;
  min-width: 15rem;
  height: 3rem;
  z-index: 100;

  border-radius: 0.5rem;
  border: none;
  background-color: #7ff691;

  padding: 0.5rem 1rem;

  &:hover {
    background-color: #4eec66;
  }

  @media screen and (max-width: 960px) {
    top: 80vh;
  }

  @media screen and (max-width: 500px) {
    top: 70vh;
  }
`;

const ButtonText = styled.span`
  margin-left: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.1rem;
`;

export const CreateButton = () => {
  const router = useRouter();
  const mandalart = useMandalart();
  const bigRequestDto: bigRequestDto[] = mandalart.bigList.map((big, index) => {
    const smallRequestDto: smallRequestDto[] = big.smallList.map(
      (small, index) => {
        return {
          content: small.content,
          location: index + 1,
        };
      },
    );
    return {
      content: big.content,
      location: index + 1,
      smallRequestDto: smallRequestDto,
    };
  });

  const handleCreateMandalart = () => {
    postCreate({ title: mandalart.title, bigRequestDto: bigRequestDto });
    router.push('/home');
  };
  return (
    <StyledButton
      type="button"
      title="만다라트 생성"
      onClick={handleCreateMandalart}
    >
      <FontAwesomeIcon icon={faPenToSquare} />
      <ButtonText>만다라트 생성</ButtonText>
    </StyledButton>
  );
};
