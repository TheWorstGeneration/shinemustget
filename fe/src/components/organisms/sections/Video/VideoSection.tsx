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

  width: 100vw;
  height: 100vh;

  background-color: #000000;
`;

const Dim = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  width: 100%;
  height: 100%;

  z-index: 1;

  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 50%
  );

  @media screen and (max-width: 500px) {
    background: none;
  }
`;

const Video = styled.iframe<{ pageYOffset: number }>`
  width: 100vw;
  height: 100vh;
  border: none;

  transition: all 0s ease-in-out !important;
  scale: calc(1 + ${props => props.pageYOffset / 500});

  @media screen and (max-width: 500px) {
    height: 30vh;
  }
`;

export const VideoSection = () => {
  const pageYOffset = usePageYOffset();
  return (
    <SectionStyle>
      <Dim />
      <Video
        pageYOffset={pageYOffset}
        src="https://www.youtube.com/embed/2R6gtTWmihE?autoplay=1&loop=1&playlist=2R6gtTWmihE&cc_load_policy=0"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </SectionStyle>
  );
};
