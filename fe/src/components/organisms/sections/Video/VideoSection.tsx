import { usePageYOffset } from '../../../../hooks/usePageYOffset';
import styled from '@emotion/styled';

const SectionStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;

  /* 다음 섹션 아래로 들어감 */
  z-index: 0;

  width: 100vw;
  height: 100vh;

  background-color: #f7e600;

  @media screen and (max-width: 960) {
  }
`;

const Video = styled.iframe<{ pageYOffset: number }>`
  width: 100%;
  height: 100%;
  border: none;

  transition: all 0s ease-in-out !important;
  scale: calc(1 + ${props => props.pageYOffset / 500});

  @media screen and (max-width: 960px) {
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
    height: 50%;
  }
`;

export const VideoSection = () => {
  const pageYOffset = usePageYOffset();
  return (
    <SectionStyle>
      <Video
        pageYOffset={pageYOffset}
        src="https://www.youtube.com/embed/2R6gtTWmihE?autoplay=1&loop=1&playlist=2R6gtTWmihE"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </SectionStyle>
  );
};
