import { Navigator } from '@/components/atoms/Navigator/Navigator';
import { CharacterSection } from '@/components/organisms/sections/Character/CharacterSection';
import { LoginSection } from '@/components/organisms/sections/Login/LoginSection';
import { VideoSection } from '@/components/organisms/sections/Video/VideoSection';
import styled from '@emotion/styled';

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Landing() {
  return (
    <MainContainer>
      <Navigator />
      <VideoSection />
      <CharacterSection />
      <LoginSection />
    </MainContainer>
  );
}

