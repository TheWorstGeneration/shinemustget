import { useInnerWidth } from '@/hooks/useInnerWidth';
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

const VideoDiv = styled.div<{ pageYOffset: number }>`
  transition: all 0s ease-in-out !important;
  scale: calc(1 + ${props => props.pageYOffset / 500});

  @media screen and (max-width: 500px) {
    height: 50vh;
  }
`;

export const VideoSection = () => {
  const pageYOffset = usePageYOffset();
  const innerWidth = useInnerWidth();
  return (
    <SectionStyle>
      <Dim />
      <figure>
        {/* <Video
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
        </Video> */}
        <VideoDiv pageYOffset={pageYOffset}>
          <iframe
            width={innerWidth}
            height="900"
            src="https://www.youtube.com/embed/xAn5z9_AfZg?controls=0&amp;start=128&autoplay=1&mute=1&loop=1&playlist=xAn5z9_AfZg&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&enablejsapi=1&widgetid=1&cc_load_policy=1&fs=0&playsinline=1&autohide=1&color=white&theme=light"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share, fullscreen"
          />
        </VideoDiv>
      </figure>
    </SectionStyle>
  );
};
