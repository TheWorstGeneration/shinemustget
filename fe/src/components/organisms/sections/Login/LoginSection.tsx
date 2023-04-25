import { GOAL_LISTS } from '../../../../constants/goalLists';
import { KakaoButton } from '../../../atoms/KakaoButton/KakaoButton';
import { ChipList } from '../../../molecules/ChipList/ChipList';
import styled from '@emotion/styled';

const SectionStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 10vh;

  z-index: 1;

  width: 100vw;
  height: 100vh;

  background-color: #ffffff;
`;

const LoginText = styled.h1`
  font-size: 3rem;
  font-weight: 600;
`;

const ChipListContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100vw;
  mask-image: linear-gradient(
    to right,
    hsl(0 0% 0% / 0),
    hsl(0 0% 0% / 1) 20%,
    hsl(0 0% 0% / 1) 80%,
    hsl(0 0% 0% / 0)
  );

  row-gap: 1rem;

  position: absolute;
  top: 270vh;
`;

export const LoginSection = () => {
  return (
    <SectionStyle id="login">
      <LoginText>만다트라를 만들어 목표를 달성해 보세요.</LoginText>
      <KakaoButton size={'lg'} />
      <ChipListContainer>
        {GOAL_LISTS.map((goalList, idx) => (
          <ChipList key={idx} chipList={goalList} move={idx} />
        ))}
      </ChipListContainer>
    </SectionStyle>
  );
};
