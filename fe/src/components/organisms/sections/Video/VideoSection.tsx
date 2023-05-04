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

  transition: all 0s ease-in-out !important;

  overflow: hidden;
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

const Video = styled.video<{ pageYOffset: number }>`
  width: 100vw;
  height: 100vh;
  border: none;

  transition: all 0s ease-in-out !important;
  scale: calc(1 + ${props => props.pageYOffset / 500});

  @media screen and (max-width: 500px) {
    height: 50vh;
  }
`;

export const VideoSection = () => {
  const pageYOffset = usePageYOffset();
  return (
    <SectionStyle>
      <Dim />
      <figure>
        <Video
          pageYOffset={pageYOffset}
          width="250"
          autoPlay
          playsInline
          muted
          loop
          poster="/assets/images/common/front-image.png"
          title="zelda"
        >
          <source src="/assets/videos/zelda.mp4" type="video/mp4" />
        </Video>
      </figure>
    </SectionStyle>
  );
};
