import { useAppSelector } from '@/hooks/useRedux';
import { GOAL_LISTS } from '../../../../constants/goalLists';
import { KakaoButton } from '../../../atoms/KakaoButton/KakaoButton';
import { ChipList } from '../../../molecules/ChipList/ChipList';
import styled from '@emotion/styled';
import { selectProfile } from '@/store/modules/profile';

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

  @media screen and (max-width: 500px) {
    padding-top: 20vh;
    justify-content: flex-start;
  }
`;

const LoginText = styled.h1`
  font-size: 3rem;
  font-weight: 600;

  transition: all 0s ease-in-out;

  @media screen and (max-width: 960px) {
    font-size: clamp(1.5rem, 5vw, 3rem);
  }

  @media screen and (max-width: 500px) {
    font-size: clamp(1rem, 5vw, 1.5rem);
    text-align: center;
  }
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

  transition: width 0s ease-in-out;

  @media screen and (max-width: 500px) {
    top: 250vh;
  }
`;

export const LoginSection = () => {
  const { language } = useAppSelector(selectProfile);
  const goalLists = GOAL_LISTS[language];

  return (
    <SectionStyle id="login">
      <LoginText>
        {language == 'ko'
          ? '만다트라를 만들어 목표를 달성해 보세요.'
          : 'Try to achieve your goals by making a mandalart.'}
      </LoginText>
      <KakaoButton size={'lg'} />
      <ChipListContainer>
        {goalLists.map((goalList, idx) => (
          <ChipList key={idx} chipList={goalList} move={idx} />
        ))}
      </ChipListContainer>
    </SectionStyle>
  );
};
