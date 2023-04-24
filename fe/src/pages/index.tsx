import { Character } from '@/components/atoms/Character/Character';
import styled from '@emotion/styled';

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const VideoSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background-color: #f7e600;
`;

const CharacterSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background-color: #f7e6ff;
`;

const SliderSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background-color: #f3164f;
`;

export default function Landing() {
  const image = 'favicon.ico';
  return (
    <MainContainer>
      <VideoSection></VideoSection>
      <CharacterSection>
        <Character src={image} alt={''} />
      </CharacterSection>
      <SliderSection></SliderSection>
    </MainContainer>
  );
}
