import { useInnerWidth } from '@/hooks/useInnerWidth';
import { usePageYOffset } from '../../../../hooks/usePageYOffset';
import styled from '@emotion/styled';
import { useState } from 'react';

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
  height: 50%;

  z-index: 1;

  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 100%
  );

  @media screen and (max-width: 500px) {
    height: 30%;

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
          controls
          pageYOffset={pageYOffset}
          width="250"
          playsInline
          poster="/assets/images/common/poster.png"
          title="ohtani news"
          onPlay={(e: any) => (e.target.currentTime = 129)}
        >
          <source src="/assets/videos/news.mp4" type="video/mp4" />
        </Video>
      </figure>
    </SectionStyle>
  );
};
